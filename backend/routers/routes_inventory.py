"""
FastAPI Router for Features 6, 7, and 8:
- Buffer Stock & Emergency Inventory Management
- Warehousing, Cold Storages & Local Market Network
- Scikit-Learn KMeans Demand Clustering & 30-Day Predictive Forecasting
"""
import uuid
from fastapi import APIRouter, Query, HTTPException
from typing import List, Dict, Any
from pydantic import BaseModel

from backend.services.inventory_clustering_service import InventoryClusteringService
from backend.models.schemas import (
    WarehouseFacility,
    LocalMarketHub,
    LocalProductItem,
    BackhaulOpportunity,
    DistrictDemandCluster,
    DistrictDemandForecastResponse,
    AdvanceProcurementOrder
)

router = APIRouter(prefix="/inventory", tags=["Inventory, Warehousing & Demand Intelligence"])

# Singleton service instance
_service = InventoryClusteringService()


class ProcurementRequest(BaseModel):
    district: str
    commodity: str
    category: str = "VEGETABLE"
    quantity_mt: float = 25.0
    target_mandi_or_hub: str = "Tezpur Regional APMC Wholesale Mandi"
    trigger_reason: str = "Pre-disaster buffer stocking prior to Sela snowfall cutoff"


@router.get("/buffer-stocks")
def get_buffer_stocks():
    """
    Returns district-level buffer stock runway, essential commodities breakdown,
    and identifies areas facing deficit risk before disaster strikes.
    """
    return _service.get_all_buffer_stocks()


@router.get("/warehousing-network", response_model=List[WarehouseFacility])
def get_warehousing_network():
    """
    Returns the mapped warehousing network including CWC/FCI hubs, intermediate district
    depots, cold storage facilities, temperature settings, and supply lead-time choke points.
    """
    return _service.get_warehousing_network()


@router.get("/local-markets")
def get_local_markets():
    """
    Returns local APMC mandis, weekly tribal haats, local agricultural & handicraft products
    (Assam tea, Monpa paper, organic kiwi, large cardamom), and backhaul optimization opportunities.
    """
    return _service.get_local_markets()


@router.get("/demand-clusters")
def get_demand_clusters():
    """
    Returns the 4 Scikit-Learn KMeans clusters grouping districts by geomorphological,
    seasonal, and demand features for tailored emergency inventory strategies.
    """
    return _service.get_clusters()


@router.get("/demand-forecast", response_model=DistrictDemandForecastResponse)
def get_demand_forecast(district: str = Query("Tawang", description="Target district for demand projection")):
    """
    Generates a 30-day forward demand forecast for food, fuel, medicines, and trade goods,
    integrating tourist surges, weather disruption spikes, and advance procurement triggers.
    """
    try:
        return _service.generate_demand_forecast(district_name=district, days=30)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Demand forecasting failed: {str(e)}")


@router.post("/advance-procurement", response_model=AdvanceProcurementOrder)
def trigger_advance_procurement(req: ProcurementRequest):
    """
    Dispatches an emergency advance procurement requisition for perishable vegetables
    and essential supplies to prevent stockouts when a disaster or road blockage is anticipated.
    """
    order_id = f"PROC-{uuid.uuid4().hex[:8].upper()}"
    return AdvanceProcurementOrder(
        order_id=order_id,
        district=req.district,
        commodity=req.commodity,
        category=req.category,
        quantity_mt=req.quantity_mt,
        target_mandi_or_hub=req.target_mandi_or_hub,
        urgency="HIGH_PRIORITY",
        trigger_reason=req.trigger_reason,
        estimated_arrival_hours=18,
        status="DISPATCH_ORDER_CONFIRMED"
    )
