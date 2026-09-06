"""
API Router for Corridor Information, District Isolation Matrix, and Geotechnical Details.
"""
from fastapi import APIRouter, HTTPException, Depends
from typing import List, Dict, Any
from backend.data.corridor_data import DISTRICTS_HEALTH, BRO_MACHINERY_STATUS
from backend.models.schemas import CorridorHealth, DistrictHealth
from backend.services.routing_engine import RoutingEngine

router = APIRouter(prefix="/corridors", tags=["Corridors & Districts"])


def get_routing_engine():
    # Will be injected from main.app.state.routing_engine
    from backend.main import app
    return app.state.routing_engine


@router.get("/health", response_model=CorridorHealth)
def get_corridor_health(engine: RoutingEngine = Depends(get_routing_engine)):
    """Returns macro status of the primary Western Strategic Corridor (Guwahati-Tawang)."""
    total_segments = len(engine.segments)
    blocked_segments = sum(1 for s in engine.segments.values() if s.get("is_blocked") or s.get("risk_score", 0) >= 0.85)
    open_pct = round(((total_segments - blocked_segments) / max(1, total_segments)) * 100, 1)

    status = "NORMAL"
    if open_pct < 60.0:
        status = "CUT_OFF"
    elif open_pct < 90.0:
        status = "DEGRADED"

    total_dist = sum(s.get("distance_km", 0) for s in engine.segments.values())

    return CorridorHealth(
        corridor_id="CORRIDOR_NH13_WESTERN",
        name="Western Strategic Arterial (Guwahati - Tezpur - Bomdila - Tawang)",
        state="Assam & Arunachal Pradesh",
        status=status,
        total_distance_km=round(total_dist, 1),
        open_segments_pct=open_pct,
        active_hazards_count=blocked_segments,
        last_updated="Just now"
    )


@router.get("/districts", response_model=List[DistrictHealth])
def get_districts_health():
    """Returns the regional District Isolation Matrix across all 8 North Eastern States."""
    return [DistrictHealth(**d) for d in DISTRICTS_HEALTH]


@router.get("/segments")
def get_all_segments(engine: RoutingEngine = Depends(get_routing_engine)):
    """Returns list of all road segments with real-time risk scores and blockage status."""
    return list(engine.segments.values())


@router.get("/segments/{segment_id}")
def get_segment_detail(segment_id: str, engine: RoutingEngine = Depends(get_routing_engine)):
    """Deep geotechnical inspection endpoint for a single road segment."""
    if segment_id not in engine.segments:
        raise HTTPException(status_code=404, detail=f"Segment '{segment_id}' not found.")
    return engine.segments[segment_id]


@router.get("/bro-machinery")
def get_bro_machinery():
    """Returns BRO 42 BRTF heavy machinery and clearance task force status."""
    return BRO_MACHINERY_STATUS
