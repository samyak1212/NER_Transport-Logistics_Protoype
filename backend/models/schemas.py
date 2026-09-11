"""
Pydantic schemas for data models and API requests/responses.
"""
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field


# --- Segment & Corridor Models ---
class GeotechnicalProfile(BaseModel):
    slope_deg: float = Field(..., description="Terrain slope gradient in degrees")
    elevation_m: float = Field(..., description="Elevation above sea level in meters")
    gsi_landslide_history: int = Field(..., description="Count of historical landslide records in vicinity")
    rainfall_intensity_mm: float = Field(..., description="Antecedent/current rainfall in mm")
    soil_saturation_index: float = Field(0.5, description="Soil saturation index (0.0 to 1.0)")
    rock_formation: str = Field("Fragile Phyllite/Shale", description="Geological rock type")


class RoadSegment(BaseModel):
    id: str
    name: str
    source: str
    target: str
    distance_km: float
    base_speed_kmh: float
    coordinates: List[List[float]] = Field(..., description="[[lat, lon], ...]")
    geotechnical: GeotechnicalProfile
    is_blocked: bool = False
    blockage_reason: Optional[str] = None
    risk_score: float = 0.0
    risk_level: str = "LOW"  # LOW, MODERATE, HIGH, IMPASSABLE
    district: str
    bridge_limit_tons: Optional[float] = None
    risk_breakdown: Optional[Dict[str, Any]] = None
    ai_disruption_prob: Optional[float] = None


class CorridorHealth(BaseModel):
    corridor_id: str
    name: str
    state: str
    status: str  # NORMAL, DEGRADED, CUT_OFF
    total_distance_km: float
    open_segments_pct: float
    active_hazards_count: int
    last_updated: str


class DistrictHealth(BaseModel):
    district_name: str
    state: str
    status: str  # ACCESSIBLE, DEGRADED, CUT_OFF
    primary_artery: str
    lifeline_status: str
    active_chokepoints: int
    population_affected: Optional[int] = None
    last_status_check: str


# --- Routing Models ---
class RouteRequest(BaseModel):
    origin: str = Field(..., description="Node ID or hub name (e.g., 'Guwahati')")
    destination: str = Field(..., description="Node ID or hub name (e.g., 'Tawang')")
    cargo_priority: str = Field("GENERAL", description="CRITICAL_MEDICAL, ESSENTIAL_FOOD, FUEL_POL, GENERAL")
    mode: str = Field("RISK_AWARE", description="RISK_AWARE or FASTEST")


class RouteSegmentDetail(BaseModel):
    segment_id: str
    name: str
    distance_km: float
    travel_time_minutes: float
    risk_score: float
    risk_level: str
    slope_deg: float
    elevation_m: float
    coordinates: List[List[float]]
    risk_breakdown: Optional[Dict[str, Any]] = None


class RouteResponse(BaseModel):
    mode: str
    cargo_priority: str
    total_distance_km: float
    total_time_hours: float
    average_risk_score: float
    max_risk_score: float
    path_nodes: List[str]
    segments: List[RouteSegmentDetail]
    hazard_zones_count: int
    polyline: List[List[float]]
    geometry_coordinates: Optional[List[List[float]]] = None
    summary: str


class RouteComparisonResponse(BaseModel):
    fastest: RouteResponse
    risk_aware: RouteResponse
    delta_time_hours: float
    delta_time_pct: float
    delta_risk_score: float
    delta_risk_pct: float
    recommendation: str
    recommendation_reason: str


# --- Vehicle Tracking Models ---
class VehicleCreate(BaseModel):
    vehicle_id: str
    vehicle_type: str = "TATA_1618_10_WHEELER"
    cargo_priority: str = "CRITICAL_MEDICAL"
    cargo_description: str = "Emergency Vaccines & Oxygen Cylinders"
    route_origin: str = "Guwahati"
    route_destination: str = "Tawang"


class VehicleTelemetry(BaseModel):
    vehicle_id: str
    status: str  # IDLE, IN_TRANSIT, PAUSED, REROUTED, ARRIVED
    current_lat: float
    current_lon: float
    speed_kmh: float
    progress_pct: float
    distance_covered_km: float
    total_distance_km: float
    eta_hours: float
    current_segment_id: str
    next_landmark: str
    ahead_hazard_detected: bool = False
    ahead_hazard_detail: Optional[str] = None
    operational_advisory: str = "CONTINUE"  # CONTINUE, REROUTE, SUSPEND
    detour_available: bool = False
    id: Optional[str] = None
    cargo: Optional[str] = None
    cargo_priority: Optional[str] = None
    priority: Optional[str] = None
    origin: Optional[str] = None
    destination: Optional[str] = None
    driver_id: Optional[str] = None
    driver_name: Optional[str] = None
    driver_phone: Optional[str] = None
    driver_license: Optional[str] = None
    vehicle_reg: Optional[str] = None
    vehicle_model: Optional[str] = None
    corridor: Optional[str] = None
    lat: Optional[float] = None
    lon: Optional[float] = None


# --- Field Incident Models ---
class FieldReportCreate(BaseModel):
    reporter_name: str
    agency: str = "BRO_42_BRTF"
    incident_type: str = "LANDSLIDE"  # LANDSLIDE, FLASH_FLOOD, ROAD_BLOCKAGE, BRIDGE_DAMAGED, TREE_FALL
    severity: str = "BLOCKING"  # MINOR, MAJOR, BLOCKING
    latitude: float
    longitude: float
    description: str
    photo_url: Optional[str] = None


class FieldReportResponse(BaseModel):
    id: str
    timestamp: str
    reporter_name: str
    agency: str
    incident_type: str
    severity: str
    latitude: float
    longitude: float
    snapped_segment_id: Optional[str] = None
    snapped_segment_name: Optional[str] = None
    description: str
    photo_url: Optional[str] = None
    is_resolved: bool = False
    resolved_at: Optional[str] = None


# --- Simulation Lab Models ---
class HazardInjectionRequest(BaseModel):
    segment_id: str
    incident_type: str = "LANDSLIDE"
    severity: str = "BLOCKING"
    description: str = "Synthetic trigger: Heavy debris and boulder fall"


class WeatherSimulationRequest(BaseModel):
    rainfall_multiplier: float = 1.0  # 0.0 to 3.0
    rain_scenario: str = "MONSOON_SURGE"  # DRY, NORMAL_RAIN, MONSOON_SURGE, CLOUDBURST


# --- Emergency & Army Response Models ---
class HelipadResource(BaseModel):
    id: str
    name: str
    location: str
    state: str
    elevation_m: float
    coordinates: List[float]
    aircraft_compatibility: List[str]
    capacity_helo: int
    fuel_atf_available: bool
    status: str
    assigned_squad: str
    contact_freq: str


class CombatEngineerUnit(BaseModel):
    id: str
    regiment: str
    base_location: str
    task_force: str
    equipment: List[str]
    bailey_bridge_class: str
    tracked_dozers: int
    snow_cutters: int
    status: str
    readiness: str
    eta_to_chokepoints: Dict[str, str]


class ActiveRescueMission(BaseModel):
    id: str
    title: str
    sector: str
    incident_type: str
    severity: str
    personnel_deployed: int
    helo_deployed: Optional[str] = None
    civilian_casualties_prevented: int
    status: str
    start_time: str
    narrative: str


# --- Regional Hazard & Hydrology Models ---
class RiverFloodGauge(BaseModel):
    station: str
    river: str
    state: str
    danger_level_m: float
    current_level_m: float
    status: str
    trend: str
    discharge_cumecs: float
    ferry_transit_status: str


class CrossBorderRisk(BaseModel):
    id: str
    origin_country: str
    basin: str
    vulnerable_districts: List[str]
    upstream_rain_24h_mm: float
    risk_level: str
    warning_narrative: str


class HighAltitudeSnowPass(BaseModel):
    pass_name: str
    state: str
    elevation_m: float
    temperature_c: float
    snow_depth_cm: float
    snow_chain_mandate: bool
    tunnel_bypass_name: Optional[str] = None
    tunnel_status: str
    pass_status: str


# --- Roadworks & Connectivity Models ---
class OngoingRoadwork(BaseModel):
    id: str
    corridor: str
    stretch: str
    agency: str
    work_type: str
    traffic_impact: str
    lane_status: str
    progress_pct: float
    target_completion: str


class ConnectivityGap(BaseModel):
    district_or_sector: str
    state: str
    isolated_if_chokepoint_fails: str
    population_at_risk: int
    single_lifeline_artery: str
    alternative_bypass: str
    vulnerability_rating: str


# --- Multi-Modal & Freight Models ---
class RailheadHub(BaseModel):
    id: str
    name: str
    gauge: str
    daily_freight_rakes: int
    terminal_capacity_tonnes: float
    connected_highway: str
    transshipment_modes: List[str]
    status: str


class VehicleAccommodation(BaseModel):
    vehicle_class: str
    max_gross_weight_tonnes: float
    max_height_m: float
    turning_radius_m: float
    permitted_on_passes: bool
    permitted_in_sela_tunnel: bool
    restricted_corridors: List[str]


class RouteThroughputCapacity(BaseModel):
    corridor_segment: str
    terrain_type: str
    max_safe_vehicles_per_hour: int
    current_vehicle_load_per_hour: int
    congestion_index: str
    convoy_control_mode: str


# --- Fuel & Energy Models ---
class FuelStation(BaseModel):
    id: str
    name: str
    operator: str
    corridor: str
    chainage_km: str
    coordinates: List[float]
    winter_diesel_available: bool
    regular_diesel_kl: float
    petrol_kl: float
    atf_available: bool
    lpg_depot: bool
    emergency_generator_fuel_kl: float
    status: str


class LocalEnergyDependence(BaseModel):
    district: str
    remote_communities: str
    firewood_biomass_dependence_pct: float
    community_firewood_depots: int
    firewood_stock_days: int
    winter_heating_status: str
    lpg_refill_backlog_days: int


# --- Feature 6: Buffer Stock & Emergency Inventory Schemas ---
class BufferCommodity(BaseModel):
    name: str
    category: str  # GRAIN, PULSE, EDIBLE_OIL, VEGETABLE, MEDICINE, BABY_FOOD, WINTER_FUEL
    current_stock_mt: float
    safety_buffer_mt: float
    daily_burn_rate_mt: float
    days_remaining: int
    status: str  # ADEQUATE, WARNING, CRITICAL, SURPLUS


class DistrictBufferStock(BaseModel):
    district_id: str
    district_name: str
    state: str
    isolation_risk_index: float
    total_population: int
    overall_stock_runway_days: int
    status: str  # NORMAL, DEFICIT_RISK, CRITICAL_SHORTAGE
    commodities: List[BufferCommodity]
    pre_disaster_procurement_active: bool
    critical_replenishment_needed: List[str]


class AdvanceProcurementOrder(BaseModel):
    order_id: str
    district: str
    commodity: str
    category: str
    quantity_mt: float
    target_mandi_or_hub: str
    urgency: str
    trigger_reason: str
    estimated_arrival_hours: int
    status: str


# --- Feature 7: Warehousing & Local Market Network Schemas ---
class WarehouseFacility(BaseModel):
    id: str
    name: str
    operator: str  # FCI, CWC, STATE_CIVIL_SUPPLIES, BRO_DEPOT
    warehouse_type: str  # CENTRAL_RAILHEAD_SILO, DISTRICT_DEPOT, COLD_CHAIN_STORAGE, FORWARD_STRATEGIC_POINT
    location: str
    coordinates: List[float]
    total_capacity_mt: float
    utilized_mt: float
    utilization_pct: float
    cold_storage_capacity_m3: float
    cold_storage_temp_c: float
    road_connectivity: str
    vulnerable_choke_point: str
    feeder_mandis: List[str]


class LocalMarketHub(BaseModel):
    id: str
    name: str
    market_type: str  # APMC_MANDI, WEEKLY_HAAT, BORDER_TRADE_CENTRE, AGRO_COLLECTION_CENTRE
    location: str
    coordinates: List[float]
    operating_days: str
    daily_trading_volume_mt: float
    key_commodities: List[str]
    local_specialties: List[str]
    serving_warehouses: List[str]


class LocalProductItem(BaseModel):
    id: str
    name: str
    category: str  # TEA, HORTICULTURE, HANDICRAFT, SPICES, ORGANIC_PRODUCE
    origin_district: str
    harvest_peak_months: str
    annual_yield_mt_or_units: str
    backhaul_suitability: str
    preservation_requirements: str
    economic_impact: str


class BackhaulOpportunity(BaseModel):
    id: str
    origin_market: str
    destination_hub: str
    cargo_description: str
    cargo_category: str
    available_weight_mt: float
    vehicle_type_required: str
    distance_km: float
    potential_savings_inr: int
    status: str


# --- Feature 8: Demand Forecasting & ML Clustering Schemas ---
class DistrictDemandCluster(BaseModel):
    cluster_id: int
    cluster_name: str
    description: str
    strategic_priority: str
    districts: List[str]
    dominant_hazard: str
    buffer_stock_multiplier: float
    recommended_safety_days: int
    key_features: Dict[str, float]


class DemandForecastDataPoint(BaseModel):
    day: int
    date: str
    baseline_mt: float
    emergency_spike_mt: float
    tourist_surge_mt: float
    total_projected_mt: float


class DistrictDemandForecastResponse(BaseModel):
    district: str
    cluster_name: str
    disruption_probability: float
    forecast_days: int
    commodity_forecasts: Dict[str, List[DemandForecastDataPoint]]
    advance_procurement_triggered: bool
    recommended_procurement_actions: List[str]

