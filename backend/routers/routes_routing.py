"""
API Router for AI Pathfinding, Cargo-Weighted Optimization, and Route Comparison.
"""
from fastapi import APIRouter, HTTPException, Depends
from backend.models.schemas import RouteRequest, RouteResponse, RouteComparisonResponse
from backend.services.routing_engine import RoutingEngine
from backend.data.corridor_data import NODES

router = APIRouter(prefix="/routing", tags=["AI Routing & Optimization"])


from backend.dependencies import get_routing_engine


@router.get("/nodes")
def get_corridor_nodes():
    """Returns list of corridor nodes, hubs, passes, and depots."""
    return [
        {
            "id": k,
            "name": v["name"],
            "district": v["district"],
            "state": v["state"],
            "elevation_m": v["elevation_m"],
            "lat": v["lat"],
            "lon": v["lon"],
            "type": v["type"]
        }
        for k, v in NODES.items()
    ]


@router.post("/calculate", response_model=RouteResponse)
def calculate_route(req: RouteRequest, engine: RoutingEngine = Depends(get_routing_engine)):
    """Computes single optimal path for requested mode and cargo priority."""
    try:
        return engine.calculate_route(
            origin=req.origin,
            destination=req.destination,
            cargo_priority=req.cargo_priority,
            mode=req.mode
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/compare", response_model=RouteComparisonResponse)
def compare_routes(req: RouteRequest, engine: RoutingEngine = Depends(get_routing_engine)):
    """Computes both Fastest and Risk-Aware paths simultaneously with trade-off delta metrics."""
    try:
        return engine.compare_routes(
            origin=req.origin,
            destination=req.destination,
            cargo_priority=req.cargo_priority
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
