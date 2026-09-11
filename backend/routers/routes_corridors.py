"""
API Router for Corridor Information, District Isolation Matrix, and Geotechnical Details.
"""
from fastapi import APIRouter, HTTPException, Depends
from typing import List, Dict, Any
from backend.data.corridor_data import DISTRICTS_HEALTH, BRO_MACHINERY_STATUS
from backend.models.schemas import CorridorHealth, DistrictHealth
from backend.services.routing_engine import RoutingEngine

router = APIRouter(prefix="/corridors", tags=["Corridors & Districts"])


from backend.dependencies import get_routing_engine


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


@router.get("/emergency-resources")
def get_emergency_resources():
    """Returns Tri-Service Army, IAF Helipads, Combat Engineers, and active HADR rescue missions."""
    from backend.data.corridor_data import ARMY_EMERGENCY_RESOURCES
    return ARMY_EMERGENCY_RESOURCES


@router.get("/regional-hazards")
def get_regional_hazards():
    """Returns Brahmaputra river flood gauges, Nepal catchment risks, Sikkim snow zones, and critical tunnels/passes."""
    from backend.data.corridor_data import REGIONAL_HAZARD_INTELLIGENCE
    return REGIONAL_HAZARD_INTELLIGENCE


@router.get("/roadworks-connectivity")
def get_roadworks_and_connectivity():
    """Returns ongoing roadworks, seasonal closure schedules, connectivity gaps, and bypass routes."""
    from backend.data.corridor_data import ROADWORKS_AND_CONNECTIVITY
    return ROADWORKS_AND_CONNECTIVITY


@router.get("/multimodal-logistics")
def get_multimodal_logistics():
    """Returns railhead terminals, vehicle accommodation matrix, and corridor hourly throughput capacities."""
    from backend.data.corridor_data import MULTIMODAL_LOGISTICS
    return MULTIMODAL_LOGISTICS


@router.get("/fuel-energy")
def get_fuel_and_energy():
    """Returns highway fuel stations, district energy stock levels, and remote firewood/biomass heating dependence."""
    from backend.data.corridor_data import FUEL_AND_ENERGY_RESERVES
    return FUEL_AND_ENERGY_RESERVES
