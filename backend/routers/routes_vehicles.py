"""
API Router for Convoy Dispatch, Live GPS Telemetry, and Reactive Rerouting.
"""
from fastapi import APIRouter, HTTPException, Depends
from backend.models.schemas import VehicleTelemetry, VehicleCreate
from backend.services.vehicle_simulator import VehicleSimulator

router = APIRouter(prefix="/vehicles", tags=["GPS Telemetry & Convoy Tracking"])


def get_vehicle_simulator():
    from backend.main import app
    return app.state.vehicle_simulator


@router.get("/{vehicle_id}/telemetry", response_model=VehicleTelemetry)
def get_telemetry(vehicle_id: str, simulator: VehicleSimulator = Depends(get_vehicle_simulator)):
    """Polls real-time telemetry, ETA, ahead hazards, and operational advisory for a convoy."""
    telemetry = simulator.get_vehicle_telemetry(vehicle_id)
    if not telemetry:
        raise HTTPException(status_code=404, detail=f"Vehicle '{vehicle_id}' not found.")
    return telemetry


@router.post("/dispatch")
def dispatch_vehicle(req: VehicleCreate, simulator: VehicleSimulator = Depends(get_vehicle_simulator)):
    """Dispatches a new monitored supply convoy on the corridor."""
    v = simulator.create_vehicle(
        vehicle_id=req.vehicle_id,
        vehicle_type=req.vehicle_type,
        cargo_priority=req.cargo_priority,
        cargo_description=req.cargo_description,
        origin=req.route_origin,
        destination=req.route_destination
    )
    return {"status": "DISPATCHED", "vehicle": simulator.get_vehicle_telemetry(req.vehicle_id)}


@router.post("/{vehicle_id}/advance", response_model=VehicleTelemetry)
def advance_simulation(vehicle_id: str, step_pct: float = 4.0, simulator: VehicleSimulator = Depends(get_vehicle_simulator)):
    """Advances simulated convoy progress forward along polyline."""
    telemetry = simulator.advance_vehicle(vehicle_id, step_pct=step_pct)
    if not telemetry:
        raise HTTPException(status_code=404, detail=f"Vehicle '{vehicle_id}' not found.")
    return telemetry


@router.post("/{vehicle_id}/pause")
def pause_vehicle(vehicle_id: str, simulator: VehicleSimulator = Depends(get_vehicle_simulator)):
    """Pauses vehicle transit (e.g. driver rest or road hold)."""
    simulator.pause_vehicle(vehicle_id)
    return {"status": "PAUSED"}


@router.post("/{vehicle_id}/resume")
def resume_vehicle(vehicle_id: str, simulator: VehicleSimulator = Depends(get_vehicle_simulator)):
    """Resumes vehicle transit."""
    simulator.resume_vehicle(vehicle_id)
    return {"status": "IN_TRANSIT"}


@router.post("/{vehicle_id}/reroute", response_model=VehicleTelemetry)
def execute_reroute(vehicle_id: str, simulator: VehicleSimulator = Depends(get_vehicle_simulator)):
    """Executes dynamic detour rerouting when an ahead hazard is detected."""
    telemetry = simulator.apply_reroute(vehicle_id)
    if not telemetry:
        raise HTTPException(status_code=404, detail=f"Vehicle '{vehicle_id}' not found.")
    return telemetry
