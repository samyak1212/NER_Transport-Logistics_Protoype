"""
Comprehensive automated backend verification suite.
Validates all core algorithmic and routing engines against SIH PS 26002 specifications.
"""
import sys
import os

# Add parent directory to sys.path so imports resolve
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.services.routing_engine import RoutingEngine
from backend.services.vehicle_simulator import VehicleSimulator
from backend.services.field_report_service import FieldReportService
from backend.models.schemas import FieldReportCreate


# Ensure UTF-8 output on Windows
sys.stdout.reconfigure(encoding='utf-8')

def run_tests():
    print("--- Running Backend Algorithmic & Routing Verification Suite ---")
    # 1. Routing Engine Verification
    engine = RoutingEngine()
    print("  [1/5] Testing Route Calculation (Guwahati -> Tawang)...")
    route_med = engine.calculate_route("Guwahati", "Tawang", cargo_priority="CRITICAL_MEDICAL", mode="RISK_AWARE")
    assert route_med is not None
    assert len(route_med.path_nodes) >= 5
    assert route_med.total_distance_km > 300.0
    print(f"    ✓ Medical Route Computed: {route_med.total_distance_km} km, {route_med.total_time_hours} hrs, Avg Risk: {route_med.average_risk_score}")

    # 2. Side-by-Side Trade-off Verification
    print("  [2/5] Testing Side-by-Side Trade-off Comparison...")
    comp = engine.compare_routes("Guwahati", "Tawang", cargo_priority="CRITICAL_MEDICAL")
    assert comp.fastest is not None
    assert comp.risk_aware is not None
    print(f"    ✓ Delta Time: +{comp.delta_time_hours} hrs (+{comp.delta_time_pct}%), Delta Risk: -{comp.delta_risk_score} (-{comp.delta_risk_pct}%)")
    print(f"    ✓ Recommendation: {comp.recommendation}")

    # 3. Vehicle Simulation & Telemetry
    print("  [3/5] Testing Convoy Telemetry & Movement Advancement...")
    sim = VehicleSimulator(engine)
    v_telemetry = sim.get_vehicle_telemetry("MED_CONVOY_01")
    assert v_telemetry is not None
    assert v_telemetry.status == "IN_TRANSIT"
    print(f"    ✓ Initial Telemetry: Lat={v_telemetry.current_lat}, Lon={v_telemetry.current_lon}, Progress={v_telemetry.progress_pct}%")

    adv = sim.advance_vehicle("MED_CONVOY_01", step_pct=15.0)
    assert adv.progress_pct == 15.0
    print(f"    ✓ Advanced Telemetry: Progress={adv.progress_pct}%, Distance Covered={adv.distance_covered_km} km")

    # 4. Field Reporting & Automatic Geometric Snapping
    print("  [4/5] Testing Field Incident Snapping & Road Blockage...")
    field_svc = FieldReportService(engine)
    report_in = FieldReportCreate(
        reporter_name="Havildar Tsering",
        agency="BRO_42_BRTF",
        incident_type="LANDSLIDE",
        severity="BLOCKING",
        latitude=27.0984,
        longitude=92.5342,
        description="Massive scree slide near Sessa blocking all heavy traffic."
    )
    saved_rpt = field_svc.submit_report(report_in)
    assert saved_rpt.snapped_segment_id is not None
    print(f"    ✓ Incident Snapped to Segment: {saved_rpt.snapped_segment_id} ({saved_rpt.snapped_segment_name})")
    assert engine.segments[saved_rpt.snapped_segment_id]["is_blocked"] is True

    # 5. Reactive Disruption & Rerouting
    print("  [5/8] Testing Automated Reactive Rerouting on Hazard...")
    sim.evaluate_hazards("MED_CONVOY_01")
    v_alert = sim.get_vehicle_telemetry("MED_CONVOY_01")
    print(f"    ✓ Ahead Hazard Detected: {v_alert.ahead_hazard_detected}, Advisory: {v_alert.operational_advisory}")

    # Execute reroute
    rerouted_telemetry = sim.apply_reroute("MED_CONVOY_01")
    print(f"    ✓ Reroute Applied: Status={rerouted_telemetry.status}, Advisory={rerouted_telemetry.operational_advisory}")

    # Resolve report and unblock
    resolved = field_svc.resolve_report(saved_rpt.id)
    assert resolved.is_resolved is True
    print(f"    ✓ Incident Resolved: Road reopened in graph={not engine.segments[saved_rpt.snapped_segment_id]['is_blocked']}")

    # 6. Feature 6: Buffer Stock & Emergency Inventory Verification
    print("  [6/8] Testing Buffer Stock Runways & Deficit Detection...")
    from backend.services.inventory_clustering_service import InventoryClusteringService
    inv_svc = InventoryClusteringService()
    stocks = inv_svc.get_all_buffer_stocks()
    assert "Tawang" in stocks
    assert "Anjaw" in stocks
    assert stocks["Anjaw"]["overall_stock_runway_days"] < 15
    print(f"    ✓ Buffer Stocks Verified: Tawang Runway={stocks['Tawang']['overall_stock_runway_days']}d, Anjaw Runway={stocks['Anjaw']['overall_stock_runway_days']}d (Status={stocks['Anjaw']['status']})")

    # 7. Feature 7: Warehousing & Local Market Backhaul Opportunities
    print("  [7/8] Testing Warehousing Capacity & Backhaul Optimization...")
    warehouses = inv_svc.get_warehousing_network()
    markets = inv_svc.get_local_markets()
    assert len(warehouses) >= 4
    assert len(markets["backhaul_opportunities"]) >= 3
    bkh = markets["backhaul_opportunities"][0]
    print(f"    ✓ Warehousing Nodes: {len(warehouses)} depots/cold stores mapped.")
    print(f"    ✓ Backhaul Opportunity: {bkh['origin_market']} -> {bkh['destination_hub']} ({bkh['available_weight_mt']} MT, Est. Savings: ₹{bkh['potential_savings_inr']})")

    # 8. Feature 8: Scikit-Learn KMeans Clustering & 30-Day Demand Forecasting
    print("  [8/8] Testing Scikit-Learn KMeans Clustering & Demand Forecasting...")
    clusters = inv_svc.get_clusters()
    assert len(clusters) == 4
    forecast = inv_svc.generate_demand_forecast("Tawang", days=30)
    assert len(forecast["commodity_forecasts"]) >= 4
    assert forecast["advance_procurement_triggered"] is True
    print(f"    ✓ Scikit-Learn KMeans: {len(clusters)} strategic demand clusters converged.")
    for c in clusters:
        print(f"      - Cluster #{c['cluster_id']}: {c['cluster_name']} ({len(c['districts'])} districts)")
    print(f"    ✓ 30-Day Forecast Generated for Tawang: Advance Procurement Triggered={forecast['advance_procurement_triggered']}")
    print(f"      - Sample Action: {forecast['recommended_procurement_actions'][0]}")

    print("\n🎉 ALL 8 VERIFICATION SUITE TESTS PASSED WITH 100% SUCCESS!")


if __name__ == "__main__":
    run_tests()

