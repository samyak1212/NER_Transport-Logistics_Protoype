"""
API Router for Evaluator Simulation Lab and Synthetic Disruption Testing.
"""
from fastapi import APIRouter, HTTPException, Depends
from backend.models.schemas import HazardInjectionRequest, WeatherSimulationRequest
from backend.services.routing_engine import RoutingEngine
from backend.services.vehicle_simulator import VehicleSimulator
from backend.services.field_report_service import FieldReportService

router = APIRouter(prefix="/simulation", tags=["Simulation Lab"])


def get_services():
    from backend.main import app
    return app.state.routing_engine, app.state.vehicle_simulator, app.state.field_report_service


@router.post("/inject-hazard")
def inject_synthetic_hazard(req: HazardInjectionRequest, services=Depends(get_services)):
    """Injects a synthetic landslide or flood on a chosen segment for evaluator testing."""
    engine, simulator, _ = services
    if req.segment_id not in engine.segments:
        raise HTTPException(status_code=404, detail=f"Segment '{req.segment_id}' not found.")

    engine.update_segment_blockage(
        req.segment_id,
        is_blocked=True,
        reason=f"SYNTHETIC HAZARD: {req.description} ({req.incident_type})"
    )

    # Trigger hazard evaluation on active vehicles
    for v_id in simulator.vehicles:
        simulator.evaluate_hazards(v_id)

    return {
        "status": "INJECTED",
        "segment": engine.segments[req.segment_id],
        "message": f"Hazard injected on {engine.segments[req.segment_id]['name']}. Rerouting triggered."
    }


@router.post("/weather")
def simulate_weather(req: WeatherSimulationRequest, services=Depends(get_services)):
    """Simulates monsoon rainfall surge or cloudburst, recalculating network risks."""
    engine, simulator, _ = services
    engine.set_rainfall_multiplier(req.rainfall_multiplier)

    for v_id in simulator.vehicles:
        simulator.evaluate_hazards(v_id)

    return {
        "status": "WEATHER_UPDATED",
        "scenario": req.rain_scenario,
        "rainfall_multiplier": req.rainfall_multiplier,
        "message": f"Rainfall multiplier set to {req.rainfall_multiplier}x. Segment risks dynamically updated."
    }


@router.post("/reset")
def reset_simulation(services=Depends(get_services)):
    """Resets entire platform state to baseline demonstration state."""
    engine, simulator, field_service = services
    engine.reset_to_baseline()
    field_service.reports.clear()
    field_service._init_seed_reports()
    simulator.vehicles.clear()
    simulator._init_default_vehicle()

    return {"status": "RESET_COMPLETE", "message": "Platform baseline successfully restored."}
