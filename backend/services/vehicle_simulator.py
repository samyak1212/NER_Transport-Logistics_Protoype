"""
Vehicle tracking and convoy movement simulator.
Interpolates coordinates along route polylines, monitors ahead hazards,
and triggers reactive rerouting advisories.
"""
import math
from typing import Dict, Any, Optional, List
from backend.services.routing_engine import RoutingEngine
from backend.models.schemas import VehicleTelemetry, VehicleCreate


class VehicleSimulator:
    """
    Simulates real-time GPS telemetry for convoys carrying essential commodities.
    Detects dynamic disruptions and generates automated reroute prompts.
    """

    def __init__(self, routing_engine: RoutingEngine):
        self.routing_engine = routing_engine
        self.vehicles: Dict[str, Dict[str, Any]] = {}
        self._init_default_vehicle()

    def _init_default_vehicle(self):
        """Initializes default emergency medical convoy."""
        self.create_vehicle(
            vehicle_id="MED_CONVOY_01",
            vehicle_type="TATA_1618_SE_COLD_CHAIN",
            cargo_priority="CRITICAL_MEDICAL",
            cargo_description="10,000 Doses Anti-Rabies & Snake Venom + Pediatric Oxygen",
            origin="Guwahati",
            destination="Tawang"
        )

    def create_vehicle(
        self,
        vehicle_id: str,
        vehicle_type: str = "TATA_1618_10_WHEELER",
        cargo_priority: str = "CRITICAL_MEDICAL",
        cargo_description: str = "Emergency Medical Supplies",
        origin: str = "Guwahati",
        destination: str = "Tawang"
    ) -> Dict[str, Any]:
        """Dispatches a new monitored vehicle on the route."""
        route = self.routing_engine.calculate_route(origin, destination, cargo_priority=cargo_priority, mode="RISK_AWARE")
        
        vehicle = {
            "vehicle_id": vehicle_id,
            "vehicle_type": vehicle_type,
            "cargo_priority": cargo_priority,
            "cargo_description": cargo_description,
            "origin": origin,
            "destination": destination,
            "route": route,
            "status": "IN_TRANSIT",
            "current_index": 0,
            "polyline": route.polyline,
            "current_lat": route.polyline[0][0] if route.polyline else 26.1445,
            "current_lon": route.polyline[0][1] if route.polyline else 91.7362,
            "speed_kmh": 42.0,
            "progress_pct": 0.0,
            "distance_covered_km": 0.0,
            "total_distance_km": route.total_distance_km,
            "eta_hours": route.total_time_hours,
            "ahead_hazard_detected": False,
            "ahead_hazard_detail": None,
            "operational_advisory": "CONTINUE",
            "detour_available": False
        }
        self.vehicles[vehicle_id] = vehicle
        self.evaluate_hazards(vehicle_id)
        return vehicle

    def get_vehicle_telemetry(self, vehicle_id: str) -> Optional[VehicleTelemetry]:
        """Returns structured telemetry data for a vehicle."""
        v = self.vehicles.get(vehicle_id)
        if not v:
            return None

        # Determine next landmark
        route = v.get("route")
        path_nodes = route.path_nodes if route else []
        node_idx = min(len(path_nodes) - 1, int((v["progress_pct"] / 100.0) * len(path_nodes)) + 1)
        next_landmark = path_nodes[node_idx] if node_idx < len(path_nodes) else v["destination"]

        # Current segment
        curr_seg_id = "SEG_01"
        if route and route.segments:
            seg_idx = min(len(route.segments) - 1, int((v["progress_pct"] / 100.0) * len(route.segments)))
            curr_seg_id = route.segments[seg_idx].segment_id

        return VehicleTelemetry(
            vehicle_id=v["vehicle_id"],
            status=v["status"],
            current_lat=round(v["current_lat"], 5),
            current_lon=round(v["current_lon"], 5),
            speed_kmh=round(v["speed_kmh"], 1),
            progress_pct=round(v["progress_pct"], 1),
            distance_covered_km=round(v["distance_covered_km"], 1),
            total_distance_km=round(v["total_distance_km"], 1),
            eta_hours=round(v["eta_hours"], 2),
            current_segment_id=curr_seg_id,
            next_landmark=next_landmark,
            ahead_hazard_detected=v["ahead_hazard_detected"],
            ahead_hazard_detail=v["ahead_hazard_detail"],
            operational_advisory=v["operational_advisory"],
            detour_available=v["detour_available"]
        )

    def advance_vehicle(self, vehicle_id: str, step_pct: float = 3.5) -> Optional[VehicleTelemetry]:
        """Advances vehicle progress along polyline."""
        v = self.vehicles.get(vehicle_id)
        if not v or v["status"] not in ["IN_TRANSIT", "REROUTED"]:
            return self.get_vehicle_telemetry(vehicle_id) if v else None

        polyline = v["polyline"]
        if not polyline:
            return self.get_vehicle_telemetry(vehicle_id)

        v["progress_pct"] = min(100.0, v["progress_pct"] + step_pct)
        v["distance_covered_km"] = (v["progress_pct"] / 100.0) * v["total_distance_km"]
        
        # Remaining time
        remaining_km = max(0.0, v["total_distance_km"] - v["distance_covered_km"])
        v["eta_hours"] = max(0.0, remaining_km / max(10.0, v["speed_kmh"]))

        # Interpolate coordinate along polyline
        idx = int((v["progress_pct"] / 100.0) * (len(polyline) - 1))
        v["current_index"] = idx
        v["current_lat"] = polyline[idx][0]
        v["current_lon"] = polyline[idx][1]

        if v["progress_pct"] >= 100.0:
            v["status"] = "ARRIVED"
            v["speed_kmh"] = 0.0
            v["eta_hours"] = 0.0

        self.evaluate_hazards(vehicle_id)
        return self.get_vehicle_telemetry(vehicle_id)

    def evaluate_hazards(self, vehicle_id: str):
        """
        Scans remaining road segments along vehicle's path.
        If a blocked segment or high hazard is ahead, triggers REROUTE or SUSPEND.
        """
        v = self.vehicles.get(vehicle_id)
        if not v or v["status"] == "ARRIVED":
            return

        route = v.get("route")
        if not route or not route.segments:
            return

        curr_progress = v["progress_pct"] / 100.0
        start_seg_idx = int(curr_progress * len(route.segments))

        hazard_found = False
        hazard_reason = None

        for seg in route.segments[start_seg_idx:]:
            seg_id = seg.segment_id
            live_seg = self.routing_engine.segments.get(seg_id)
            if live_seg and (live_seg.get("is_blocked") or live_seg.get("risk_score", 0) >= 0.85):
                hazard_found = True
                hazard_reason = live_seg.get("blockage_reason") or f"High Hazard Zone on {live_seg.get('name')}"
                break

        if hazard_found:
            v["ahead_hazard_detected"] = True
            v["ahead_hazard_detail"] = f"CRITICAL HAZARD DETECTED: {hazard_reason}. Vehicle path is compromised."
            v["operational_advisory"] = "REROUTE"
            v["detour_available"] = True
        else:
            v["ahead_hazard_detected"] = False
            v["ahead_hazard_detail"] = None
            v["operational_advisory"] = "CONTINUE"
            v["detour_available"] = False

    def apply_reroute(self, vehicle_id: str) -> Optional[VehicleTelemetry]:
        """
        Recalculates a new bypass route from current position to destination,
        avoiding the blocked segment.
        """
        v = self.vehicles.get(vehicle_id)
        if not v:
            return None

        # Ingest detour route
        try:
            # Recompute route avoiding blocked edges
            new_route = self.routing_engine.calculate_route(
                origin=v["origin"],
                destination=v["destination"],
                cargo_priority=v["cargo_priority"],
                mode="RISK_AWARE"
            )
            v["route"] = new_route
            v["polyline"] = new_route.polyline
            v["total_distance_km"] = new_route.total_distance_km
            v["status"] = "REROUTED"
            v["ahead_hazard_detected"] = False
            v["ahead_hazard_detail"] = "Vehicle successfully rerouted onto safe alternate corridor."
            v["operational_advisory"] = "CONTINUE"
            v["detour_available"] = False
            self.advance_vehicle(vehicle_id, step_pct=1.0)
        except Exception as e:
            v["operational_advisory"] = "SUSPEND"
            v["ahead_hazard_detail"] = f"All detour corridors severed: {str(e)}"

        return self.get_vehicle_telemetry(vehicle_id)

    def pause_vehicle(self, vehicle_id: str):
        if vehicle_id in self.vehicles:
            self.vehicles[vehicle_id]["status"] = "PAUSED"
            self.vehicles[vehicle_id]["speed_kmh"] = 0.0

    def resume_vehicle(self, vehicle_id: str):
        if vehicle_id in self.vehicles:
            self.vehicles[vehicle_id]["status"] = "IN_TRANSIT"
            self.vehicles[vehicle_id]["speed_kmh"] = 42.0
