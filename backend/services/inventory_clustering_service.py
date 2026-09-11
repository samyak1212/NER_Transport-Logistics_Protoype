"""
Inventory Clustering & Demand Forecasting Engine for NER Supply Chains.
Applies Scikit-Learn KMeans clustering on geomorphological, seasonal, and logistics features,
and projects 30-day forward demand curves with automated pre-disaster procurement triggers.
"""
import numpy as np
from datetime import datetime, timedelta
from typing import Dict, List, Any
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

from backend.data.inventory_data import (
    BUFFER_STOCKS_DATA,
    WAREHOUSING_NETWORK_DATA,
    LOCAL_MARKETS_AND_TRADE_DATA,
    DISTRICT_FEATURE_MATRIX
)


class InventoryClusteringService:
    """
    ML Clustering and Demand Forecasting Service for North Eastern Region Logistics.
    """

    FEATURE_NAMES = [
        "elevation_m",
        "isolation_risk_index",
        "winter_severity_index",
        "population_demand_scale",
        "monsoon_flood_vulnerability",
        "historical_inbound_freight_tpd"
    ]

    CLUSTER_METADATA = {
        "HIGH_ALTITUDE_SNOW": {
            "name": "High-Altitude Snowbound Strategic Redoubts",
            "description": "Sub-zero temperatures, Sela/Mayodia pass dependency, GLOF and blizzard risk. Requires minimum 60-day buffer.",
            "strategic_priority": "CRITICAL_DEFENSE_AND_CIVIL_SURVIVAL",
            "dominant_hazard": "Snow, Avalanche & Freezing Road Icing",
            "buffer_stock_multiplier": 2.2,
            "recommended_safety_days": 60
        },
        "RIVERINE_FLOODPLAIN": {
            "name": "Riverine & Monsoon Cutoff Floodplains",
            "description": "Brahmaputra/Subansiri embankment breach zones, river-island isolation, high waterborne disease risk.",
            "strategic_priority": "DISASTER_RELIEF_AND_PUBLIC_HEALTH",
            "dominant_hazard": "Catastrophic Riverine Inundation",
            "buffer_stock_multiplier": 1.8,
            "recommended_safety_days": 45
        },
        "ESCARPMENT_LANDSLIDE": {
            "name": "Fragile Escarpment Landslide Corridors",
            "description": "Steep Himalayan gorges with recurring scree falls and mudslides. Demands rolling cold-chain replenishment.",
            "strategic_priority": "CORRIDOR_MAINTENANCE_AND_PERISHABLES",
            "dominant_hazard": "Active Landslides & Mudflow Chutes",
            "buffer_stock_multiplier": 1.5,
            "recommended_safety_days": 30
        },
        "GATEWAY_CONSOLIDATOR": {
            "name": "Gateway Hubs & Transshipment Consolidators",
            "description": "Railhead and multi-modal transfer gateways feeding mountain corridors with massive buffer silos.",
            "strategic_priority": "STRATEGIC_BUFFER_STAGING_AND_BACKHAUL",
            "dominant_hazard": "Logistics Bottlenecks & Rail Freight Congestion",
            "buffer_stock_multiplier": 1.1,
            "recommended_safety_days": 20
        }
    }

    def __init__(self):
        self.scaler = StandardScaler()
        self.kmeans = KMeans(n_clusters=4, random_state=42, n_init=10)
        self.cluster_assignments = {}
        self.cluster_summaries = []
        self._fit_clusters()

    def _fit_clusters(self):
        """Fits KMeans model over the 16 NER strategic districts matrix."""
        districts = list(DISTRICT_FEATURE_MATRIX.keys())
        features_list = [DISTRICT_FEATURE_MATRIX[d]["features"] for d in districts]
        X = np.array(features_list)

        # Scale features
        X_scaled = self.scaler.fit_transform(X)
        labels = self.kmeans.fit_predict(X_scaled)

        # Group districts by raw cluster index
        cluster_groups = {i: [] for i in range(4)}
        for d, label in zip(districts, labels):
            cluster_groups[label].append(d)

        # Identify thematic cluster archetype by inspecting centroid characteristics
        # 1. High elevation + high winter -> High Altitude
        # 2. Low elevation + high flood -> Riverine
        # 3. High freight + high population -> Gateway
        # 4. Remaining -> Escarpment Landslide
        assigned_types = {}
        unassigned_clusters = set(range(4))

        for c_idx in list(unassigned_clusters):
            dists = cluster_groups[c_idx]
            avg_elev = np.mean([DISTRICT_FEATURE_MATRIX[d]["features"][0] for d in dists])
            avg_winter = np.mean([DISTRICT_FEATURE_MATRIX[d]["features"][2] for d in dists])
            if avg_elev > 1800.0 or avg_winter > 0.70:
                assigned_types[c_idx] = "HIGH_ALTITUDE_SNOW"
                unassigned_clusters.remove(c_idx)
                break

        for c_idx in list(unassigned_clusters):
            dists = cluster_groups[c_idx]
            avg_flood = np.mean([DISTRICT_FEATURE_MATRIX[d]["features"][4] for d in dists])
            avg_elev = np.mean([DISTRICT_FEATURE_MATRIX[d]["features"][0] for d in dists])
            if avg_flood > 0.75 and avg_elev < 500.0:
                assigned_types[c_idx] = "RIVERINE_FLOODPLAIN"
                unassigned_clusters.remove(c_idx)
                break

        for c_idx in list(unassigned_clusters):
            dists = cluster_groups[c_idx]
            avg_freight = np.mean([DISTRICT_FEATURE_MATRIX[d]["features"][5] for d in dists])
            if avg_freight > 350.0:
                assigned_types[c_idx] = "GATEWAY_CONSOLIDATOR"
                unassigned_clusters.remove(c_idx)
                break

        # Any remaining cluster is Escarpment Landslide
        for c_idx in unassigned_clusters:
            assigned_types[c_idx] = "ESCARPMENT_LANDSLIDE"

        # Build clean structured cluster response
        self.cluster_summaries = []
        for c_idx, c_type in assigned_types.items():
            meta = self.CLUSTER_METADATA[c_type]
            dist_list = cluster_groups[c_idx]
            centroid_raw = np.mean([DISTRICT_FEATURE_MATRIX[d]["features"] for d in dist_list], axis=0)

            summary = {
                "cluster_id": int(c_idx),
                "cluster_type": c_type,
                "cluster_name": meta["name"],
                "description": meta["description"],
                "strategic_priority": meta["strategic_priority"],
                "dominant_hazard": meta["dominant_hazard"],
                "buffer_stock_multiplier": meta["buffer_stock_multiplier"],
                "recommended_safety_days": meta["recommended_safety_days"],
                "districts": dist_list,
                "key_features": {
                    "avg_elevation_m": round(float(centroid_raw[0]), 1),
                    "avg_isolation_risk": round(float(centroid_raw[1]), 2),
                    "avg_winter_severity": round(float(centroid_raw[2]), 2),
                    "avg_population_scale": round(float(centroid_raw[3]), 2),
                    "avg_flood_vulnerability": round(float(centroid_raw[4]), 2),
                    "avg_inbound_freight_tpd": round(float(centroid_raw[5]), 1)
                }
            }
            self.cluster_summaries.append(summary)

            for d in dist_list:
                self.cluster_assignments[d] = summary

    def get_clusters(self) -> List[Dict[str, Any]]:
        """Returns all 4 clustered district cohorts."""
        return self.cluster_summaries

    def get_district_cluster(self, district_name: str) -> Dict[str, Any]:
        """Returns the cluster summary for a specific district."""
        clean_name = district_name.replace(" ", "_")
        return self.cluster_assignments.get(clean_name, self.cluster_summaries[0])

    def generate_demand_forecast(self, district_name: str = "Tawang", days: int = 30) -> Dict[str, Any]:
        """
        Generates 30-day forward demand trajectory for essential goods.
        Synthesizes baseline consumption with seasonal surges, tourist spikes,
        historical trade rhythms, and pre-disaster prep factors.
        """
        clean_name = district_name.replace(" ", "_")
        feat = DISTRICT_FEATURE_MATRIX.get(clean_name, DISTRICT_FEATURE_MATRIX["Tawang"])
        cluster_info = self.get_district_cluster(district_name)

        isolation_risk = feat["features"][1]
        winter_severity = feat["features"][2]
        pop_scale = feat["features"][3]
        base_freight_tpd = feat["features"][5]

        # Forecast base commodity daily consumption in MT
        base_rates = {
            "PDS Rice & Food Grains": max(5.0, base_freight_tpd * 0.35),
            "Perishable Vegetables & Fruits": max(2.0, base_freight_tpd * 0.18),
            "Winter Diesel & Sub-Zero Kerosene": max(4.0, base_freight_tpd * 0.25 * (1.0 + winter_severity)),
            "Emergency Medical & Infant Kits": max(0.5, base_freight_tpd * 0.05),
            "Tea & Regional Craft Backhaul": max(3.0, base_freight_tpd * 0.20)
        }

        # Date generator starting today
        start_date = datetime.now()
        commodity_forecasts = {}

        # Check pre-disaster advance procurement condition
        advance_procurement_triggered = (isolation_risk >= 0.70 or winter_severity >= 0.70)
        procurement_actions = []

        if advance_procurement_triggered:
            procurement_actions.append(f"Issue Advance Purchase Order for {round(base_rates['Perishable Vegetables & Fruits'] * 14, 1)} MT Potatoes/Onions to Tezpur APMC Mandi.")
            procurement_actions.append(f"Direct CWC Changsari to pre-position {round(base_rates['PDS Rice & Food Grains'] * 20, 1)} MT Rice in Forward Strategic Supply Point.")
            procurement_actions.append(f"Mobilize 15,000 Litres IOCL 527 Winter-Grade Diesel before Sela snowfall window.")

        for commodity, base_mt in base_rates.items():
            points = []
            for i in range(1, days + 1):
                cur_date = (start_date + timedelta(days=i)).strftime("%Y-%m-%d")
                
                # Seasonality wave (weekend spikes + mid-month logistics cycle)
                day_of_week = (start_date + timedelta(days=i)).weekday()
                weekend_factor = 1.15 if day_of_week in [4, 5] else 1.0

                # Impending weather disruption factor (spikes in days 7-14)
                emergency_spike = 0.0
                if 6 <= i <= 15 and isolation_risk > 0.60:
                    emergency_spike = base_mt * 0.45 * np.sin((i - 5) / 10 * np.pi)

                # Tourist surge (peaks towards festival season)
                tourist_surge = base_mt * 0.20 if "Tawang" in district_name and i > 12 else 0.0

                total_projected = round((base_mt * weekend_factor) + emergency_spike + tourist_surge, 2)

                points.append({
                    "day": i,
                    "date": cur_date,
                    "baseline_mt": round(base_mt * weekend_factor, 2),
                    "emergency_spike_mt": round(emergency_spike, 2),
                    "tourist_surge_mt": round(tourist_surge, 2),
                    "total_projected_mt": total_projected
                })
            commodity_forecasts[commodity] = points

        return {
            "district": district_name,
            "cluster_name": cluster_info["cluster_name"],
            "disruption_probability": isolation_risk,
            "forecast_days": days,
            "commodity_forecasts": commodity_forecasts,
            "advance_procurement_triggered": advance_procurement_triggered,
            "recommended_procurement_actions": procurement_actions
        }

    def get_all_buffer_stocks(self) -> Dict[str, Any]:
        """Returns all district buffer stocks with safety runway calculations."""
        return BUFFER_STOCKS_DATA

    def get_warehousing_network(self) -> List[Dict[str, Any]]:
        """Returns central silos, district godowns, and cold storages."""
        return WAREHOUSING_NETWORK_DATA

    def get_local_markets(self) -> Dict[str, Any]:
        """Returns mandis, local products catalog, and backhaul optimization opportunities."""
        return LOCAL_MARKETS_AND_TRADE_DATA
