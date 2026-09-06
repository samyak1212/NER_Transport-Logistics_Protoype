"""
Field incident reporting and road snapping service.
Snaps GPS coordinates from on-ground field engineers to nearest highway segments
and manages the blockage/reopening lifecycle.
"""
import math
import uuid
from datetime import datetime
from typing import List, Dict, Any, Optional, Tuple
from backend.services.routing_engine import RoutingEngine
from backend.models.schemas import FieldReportCreate, FieldReportResponse


def haversine_distance_km(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Calculates great-circle distance between two points in km."""
    R = 6371.0  # Earth radius in kilometers
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat / 2.0) ** 2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2.0) ** 2
    c = 2.0 * math.atan2(math.sqrt(a), math.sqrt(1.0 - a))
    return R * c


class FieldReportService:
    """
    Handles geo-tagged incident reports from BRO engineers, police checkposts,
    and first responders. Snaps incidents to highway segments and updates network status.
    """

    def __init__(self, routing_engine: RoutingEngine):
        self.routing_engine = routing_engine
        self.reports: Dict[str, Dict[str, Any]] = {}
        self._init_seed_reports()

    def _init_seed_reports(self):
        """Initializes seed field incidents on vulnerable mountain sectors."""
        # 1. Active rockfall near Sessa
        self.submit_report(FieldReportCreate(
            reporter_name="Sub-Inspector Dorjee",
            agency="Bhalukpong_Police_Checkpost",
            incident_type="LANDSLIDE",
            severity="BLOCKING",
            latitude=27.0984,
            longitude=92.5342,
            description="Massive scree slide and boulder avalanche blocking both lanes near Sessa hairpin 4.",
            photo_url="/uploads/landslide_sessa.jpg"
        ))

    def snap_to_nearest_segment(self, lat: float, lon: float, max_radius_km: float = 15.0) -> Tuple[Optional[str], Optional[str], float]:
        """
        Finds the nearest road segment to the given coordinates.
        Returns (segment_id, segment_name, distance_km).
        """
        best_seg_id = None
        best_seg_name = None
        min_dist = float("inf")

        for seg_id, seg in self.routing_engine.segments.items():
            coords = seg.get("coordinates", [])
            for pt in coords:
                dist = haversine_distance_km(lat, lon, pt[0], pt[1])
                if dist < min_dist:
                    min_dist = dist
                    best_seg_id = seg_id
                    best_seg_name = seg.get("name")

        if min_dist <= max_radius_km:
            return best_seg_id, best_seg_name, min_dist
        return None, None, min_dist

    def submit_report(self, report_in: FieldReportCreate) -> FieldReportResponse:
        """Processes a new field incident report and updates network graph."""
        report_id = f"RPT_{str(uuid.uuid4())[:8].upper()}"
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        seg_id, seg_name, dist_km = self.snap_to_nearest_segment(report_in.latitude, report_in.longitude)

        report_record = {
            "id": report_id,
            "timestamp": timestamp,
            "reporter_name": report_in.reporter_name,
            "agency": report_in.agency,
            "incident_type": report_in.incident_type,
            "severity": report_in.severity,
            "latitude": report_in.latitude,
            "longitude": report_in.longitude,
            "snapped_segment_id": seg_id,
            "snapped_segment_name": seg_name,
            "description": report_in.description,
            "photo_url": report_in.photo_url,
            "is_resolved": False,
            "resolved_at": None
        }

        self.reports[report_id] = report_record

        # If severity is BLOCKING, immediately mark the segment blocked in graph
        if report_in.severity == "BLOCKING" and seg_id:
            reason = f"{report_in.incident_type}: {report_in.description} (Reported by {report_in.agency})"
            self.routing_engine.update_segment_blockage(seg_id, is_blocked=True, reason=reason)

        return FieldReportResponse(**report_record)

    def resolve_report(self, report_id: str) -> Optional[FieldReportResponse]:
        """
        Marks an incident resolved. If no other active blocking incidents remain
        on the segment, unblocks the road segment in the network graph.
        """
        if report_id not in self.reports:
            return None

        report = self.reports[report_id]
        report["is_resolved"] = True
        report["resolved_at"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        seg_id = report.get("snapped_segment_id")
        if seg_id:
            # Check if any OTHER unresolved blocking report exists on this segment
            other_blocks = [
                r for r in self.reports.values()
                if r.get("snapped_segment_id") == seg_id
                and not r.get("is_resolved")
                and r.get("severity") == "BLOCKING"
            ]
            if not other_blocks:
                # Reopen segment in routing engine
                self.routing_engine.update_segment_blockage(seg_id, is_blocked=False)

        return FieldReportResponse(**report)

    def get_all_reports(self, active_only: bool = False) -> List[FieldReportResponse]:
        """Returns list of reports."""
        res = []
        for r in reversed(list(self.reports.values())):
            if active_only and r.get("is_resolved"):
                continue
            res.append(FieldReportResponse(**r))
        return res
