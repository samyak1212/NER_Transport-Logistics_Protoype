"""
Risk-penalized Dijkstra pathfinding engine with cargo priority multipliers and
side-by-side trade-off analysis.
"""
import networkx as nx
import urllib.request
import json
from typing import Dict, List, Any, Optional, Tuple
from backend.data.corridor_data import NODES, SEGMENTS_DATA
from backend.services.risk_engine import RiskEngine
from backend.models.schemas import RouteResponse, RouteSegmentDetail, RouteComparisonResponse



import os

_OSRM_GEOMETRY_CACHE: Dict[str, List[List[float]]] = {}
_PRELOADED_CORRIDOR_ROUTES: Dict[str, Any] = {}

# Preload cached high-resolution OSRM driving routes if available
try:
    _cache_file = os.path.join(os.path.dirname(__file__), "..", "data", "cached_osrm_routes.json")
    if os.path.exists(_cache_file):
        with open(_cache_file, "r", encoding="utf-8") as f:
            _PRELOADED_CORRIDOR_ROUTES = json.load(f)
except Exception:
    pass

def fetch_real_highway_geometry(waypoints: List[List[float]]) -> Optional[List[List[float]]]:
    """
    Fetches real-world driving highway geometry from OpenStreetMap OSRM routing engine
    so the route follows the actual asphalt road like Google Maps directions.
    """
    if not waypoints or len(waypoints) < 2:
        return None

    # Check against preloaded corridor driving routes first for sub-millisecond response
    start_pt = waypoints[0]
    end_pt = waypoints[-1]

    # Guwahati -> Tawang
    if abs(start_pt[0] - 26.14) < 0.2 and abs(end_pt[0] - 27.58) < 0.2:
        has_kalaktang = any(abs(wp[1] - 92.08) < 0.15 for wp in waypoints)
        corridor_key = "CORRIDOR_NH13_BYPASS" if has_kalaktang else "CORRIDOR_NH13"
        if corridor_key in _PRELOADED_CORRIDOR_ROUTES:
            return _PRELOADED_CORRIDOR_ROUTES[corridor_key]["coordinates"]

    # Dimapur -> Imphal
    if abs(start_pt[0] - 25.90) < 0.2 and abs(end_pt[0] - 24.81) < 0.2:
        if "CORRIDOR_NH29" in _PRELOADED_CORRIDOR_ROUTES:
            return _PRELOADED_CORRIDOR_ROUTES["CORRIDOR_NH29"]["coordinates"]

    # Siliguri -> Gangtok
    if abs(start_pt[0] - 26.72) < 0.2 and abs(end_pt[0] - 27.33) < 0.2:
        if "CORRIDOR_NH10" in _PRELOADED_CORRIDOR_ROUTES:
            return _PRELOADED_CORRIDOR_ROUTES["CORRIDOR_NH10"]["coordinates"]

    # Guwahati -> Agartala
    if abs(start_pt[0] - 26.14) < 0.2 and abs(end_pt[0] - 23.83) < 0.2:
        if "CORRIDOR_NH6" in _PRELOADED_CORRIDOR_ROUTES:
            return _PRELOADED_CORRIDOR_ROUTES["CORRIDOR_NH6"]["coordinates"]
        
    cache_key = f"{waypoints[0]}_{waypoints[-1]}_{len(waypoints)}"
    if cache_key in _OSRM_GEOMETRY_CACHE:
        return _OSRM_GEOMETRY_CACHE[cache_key]
        
    sample_nodes = waypoints
    if len(waypoints) > 10:
        step = max(1, len(waypoints) // 8)
        sample_nodes = [waypoints[i] for i in range(0, len(waypoints), step)]
        if sample_nodes[-1] != waypoints[-1]:
            sample_nodes.append(waypoints[-1])
            
    coord_str = ";".join([f"{lon},{lat}" for lat, lon in sample_nodes])
    url = f"https://router.project-osrm.org/route/v1/driving/{coord_str}?overview=full&geometries=geojson"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'NERLogisticsPlatform/1.0'})
        with urllib.request.urlopen(req, timeout=3.5) as response:
            data = json.loads(response.read().decode())
            if data.get("routes"):
                raw_coords = data["routes"][0]["geometry"]["coordinates"]
                res_coords = [[round(lat, 5), round(lon, 5)] for lon, lat in raw_coords]
                _OSRM_GEOMETRY_CACHE[cache_key] = res_coords
                return res_coords
    except Exception:
        pass
    return None

class RoutingEngine:
    """
    Constructs the road network graph and computes optimal paths using
    risk-penalized edge traversal weights.
    """

    CARGO_RISK_MULTIPLIERS = {
        "CRITICAL_MEDICAL": 4.0,  # Cold-chain vaccines, anti-venom, oxygen: safety above all
        "ESSENTIAL_FOOD": 2.0,    # PDS grains, pulses, baby food: balanced
        "FUEL_POL": 1.8,          # Diesel, kerosene tankers: high volatility
        "CONSTRUCTION": 0.8,      # Gravel, cement: cost/time oriented
        "GENERAL": 1.0            # Standard commercial cargo
    }

    def __init__(self):
        self.segments: Dict[str, Dict[str, Any]] = {}
        self.active_hazards: Dict[str, Dict[str, Any]] = {}
        self.rainfall_multiplier: float = 1.0
        self.reset_to_baseline()

    def reset_to_baseline(self):
        """Resets all segments to seed baseline data."""
        self.segments = {}
        self.active_hazards = {}
        self.rainfall_multiplier = 1.0

        for seg in SEGMENTS_DATA:
            seg_copy = dict(seg)
            seg_copy["is_blocked"] = False
            seg_copy["blockage_reason"] = None
            risk, level, breakdown = RiskEngine.calculate_segment_risk(seg_copy["geotechnical"])
            seg_copy["risk_score"] = risk
            seg_copy["risk_level"] = level
            seg_copy["risk_breakdown"] = breakdown
            seg_copy["ai_disruption_prob"] = breakdown.get("ai_disruption_prob", risk)
            self.segments[seg_copy["id"]] = seg_copy

    def update_segment_blockage(self, segment_id: str, is_blocked: bool, reason: str = None):
        """Marks a segment as blocked or open."""
        if segment_id in self.segments:
            self.segments[segment_id]["is_blocked"] = is_blocked
            self.segments[segment_id]["blockage_reason"] = reason if is_blocked else None
            # Recalculate risk
            risk, level, breakdown = RiskEngine.calculate_segment_risk(
                self.segments[segment_id]["geotechnical"],
                active_incidents_count=1 if is_blocked else 0,
                is_manually_blocked=is_blocked
            )
            self.segments[segment_id]["risk_score"] = risk
            self.segments[segment_id]["risk_level"] = level
            self.segments[segment_id]["risk_breakdown"] = breakdown
            self.segments[segment_id]["ai_disruption_prob"] = breakdown.get("ai_disruption_prob", risk)

    def set_rainfall_multiplier(self, multiplier: float):
        """Simulates monsoon rainfall variation across the network."""
        self.rainfall_multiplier = max(0.1, min(5.0, multiplier))
        for seg_id, seg in self.segments.items():
            base_rain = seg["geotechnical"].get("rainfall_intensity_mm", 20.0)
            effective_rain = base_rain * self.rainfall_multiplier
            risk, level, breakdown = RiskEngine.calculate_segment_risk(
                seg["geotechnical"],
                is_manually_blocked=seg["is_blocked"],
                rainfall_override=effective_rain
            )
            seg["risk_score"] = risk
            seg["risk_level"] = level
            seg["risk_breakdown"] = breakdown
            seg["ai_disruption_prob"] = breakdown.get("ai_disruption_prob", risk)

    def build_graph(self, mode: str, cargo_priority: str) -> nx.DiGraph:
        """
        Builds a directed network graph with edge weights calculated according to
        routing mode and cargo priority.
        """
        G = nx.DiGraph()

        # Add all nodes
        for node_id, node_attrs in NODES.items():
            G.add_node(node_id, **node_attrs)

        lambda_cargo = self.CARGO_RISK_MULTIPLIERS.get(cargo_priority.upper(), 1.0)

        # Add edges (bidirectional for two-way roads)
        for seg_id, seg in self.segments.items():
            u = seg["source"]
            v = seg["target"]
            dist = seg["distance_km"]
            speed = max(10.0, seg["base_speed_kmh"])
            travel_time_hours = dist / speed
            risk = seg["risk_score"]
            is_blocked = seg["is_blocked"]

            if is_blocked or risk >= 0.95:
                # Impassable edge cost
                weight = 1e9
            elif mode == "FASTEST":
                # Pure travel time
                weight = travel_time_hours
            else:
                # Risk-Aware: Penalize risk exponentially weighted by cargo priority
                # Cost = t * (1 + lambda * risk^1.8)
                penalty = 1.0 + lambda_cargo * (risk ** 1.8)
                weight = travel_time_hours * penalty

            # Add forward and reverse edge
            edge_attrs = {
                "segment_id": seg_id,
                "weight": weight,
                "travel_time_hours": travel_time_hours,
                "distance_km": dist,
                "risk_score": risk,
                "risk_level": seg["risk_level"],
                "data": seg
            }
            G.add_edge(u, v, **edge_attrs)
            G.add_edge(v, u, **edge_attrs)

        return G

    def calculate_route(self, origin: str, destination: str, cargo_priority: str = "GENERAL", mode: str = "RISK_AWARE") -> RouteResponse:
        """Computes optimal route between origin and destination."""
        if origin not in NODES:
            raise ValueError(f"Origin node '{origin}' not found in network.")
        if destination not in NODES:
            raise ValueError(f"Destination node '{destination}' not found in network.")

        G = self.build_graph(mode=mode, cargo_priority=cargo_priority)

        try:
            path_nodes = nx.dijkstra_path(G, source=origin, target=destination, weight="weight")
        except nx.NetworkXNoPath:
            raise ValueError(f"No viable route found between {origin} and {destination}. All connecting corridors are severed.")

        segments_detail: List[RouteSegmentDetail] = []
        polyline: List[List[float]] = []
        total_distance = 0.0
        total_time_hours = 0.0
        risk_scores = []
        hazard_zones = 0

        # Add origin coordinate
        polyline.append([NODES[origin]["lat"], NODES[origin]["lon"]])

        for i in range(len(path_nodes) - 1):
            u = path_nodes[i]
            v = path_nodes[i+1]
            edge_data = G[u][v]
            seg = edge_data["data"]

            dist = edge_data["distance_km"]
            time_h = edge_data["travel_time_hours"]
            risk = edge_data["risk_score"]

            total_distance += dist
            total_time_hours += time_h
            risk_scores.append(risk)

            if risk >= 0.60:
                hazard_zones += 1

            # Append polyline coordinates
            seg_coords = seg["coordinates"]
            if seg["source"] == u:
                polyline.extend(seg_coords[1:])
            else:
                polyline.extend(list(reversed(seg_coords))[1:])

            detail = RouteSegmentDetail(
                segment_id=seg["id"],
                name=seg["name"],
                distance_km=dist,
                travel_time_minutes=round(time_h * 60, 1),
                risk_score=risk,
                risk_level=seg["risk_level"],
                slope_deg=seg["geotechnical"]["slope_deg"],
                elevation_m=seg["geotechnical"]["elevation_m"],
                coordinates=seg["coordinates"],
                risk_breakdown=seg.get("risk_breakdown")
            )
            segments_detail.append(detail)

        avg_risk = round(sum(risk_scores) / len(risk_scores), 3) if risk_scores else 0.0
        max_risk = max(risk_scores) if risk_scores else 0.0

        summary = (
            f"Route via {' -> '.join(path_nodes[:3])}... -> {destination}. "
            f"Distance: {total_distance:.1f} km, Duration: {total_time_hours:.1f} hrs, "
            f"Hazard Zones: {hazard_zones} (Avg Risk: {avg_risk:.2f})."
        )

        # Attempt to enhance with exact real-world driving geometry (like Google Maps)
        key_waypoints = [[NODES[nid]["lat"], NODES[nid]["lon"]] for nid in path_nodes if nid in NODES]
        real_geometry = fetch_real_highway_geometry(key_waypoints)
        final_polyline = real_geometry if (real_geometry and len(real_geometry) > len(polyline)) else polyline

        return RouteResponse(
            mode=mode,
            cargo_priority=cargo_priority,
            total_distance_km=round(total_distance, 1),
            total_time_hours=round(total_time_hours, 2),
            average_risk_score=avg_risk,
            max_risk_score=max_risk,
            path_nodes=path_nodes,
            segments=segments_detail,
            hazard_zones_count=hazard_zones,
            polyline=final_polyline,
            geometry_coordinates=final_polyline,
            summary=summary
        )

    def compare_routes(self, origin: str, destination: str, cargo_priority: str = "CRITICAL_MEDICAL") -> RouteComparisonResponse:
        """
        Calculates both Fastest and Risk-Aware routes simultaneously and produces
        a side-by-side trade-off analysis.
        """
        fastest = self.calculate_route(origin, destination, cargo_priority=cargo_priority, mode="FASTEST")
        risk_aware = self.calculate_route(origin, destination, cargo_priority=cargo_priority, mode="RISK_AWARE")

        delta_time = round(risk_aware.total_time_hours - fastest.total_time_hours, 2)
        delta_time_pct = round((delta_time / max(0.1, fastest.total_time_hours)) * 100, 1)

        delta_risk = round(fastest.average_risk_score - risk_aware.average_risk_score, 3)
        delta_risk_pct = round((delta_risk / max(0.01, fastest.average_risk_score)) * 100, 1)

        if delta_risk > 0.15:
            rec = "RISK_AWARE_HIGHLY_RECOMMENDED"
            rec_reason = (
                f"Taking the Risk-Aware route adds {delta_time:.1f} hrs (+{delta_time_pct}%), "
                f"but significantly cuts landslide/disruption exposure by {delta_risk_pct}%. "
                f"For {cargo_priority} cargo, this drastically reduces loss risk."
            )
        elif delta_risk > 0.05:
            rec = "RISK_AWARE_RECOMMENDED"
            rec_reason = (
                f"Risk-Aware route provides a safer corridor with {delta_risk_pct}% lower risk "
                f"for a modest time increase of {delta_time:.1f} hrs."
            )
        else:
            rec = "FASTEST_ACCEPTABLE"
            rec_reason = "Both routes have comparable risk profiles. Fastest route is safe to dispatch."

        return RouteComparisonResponse(
            fastest=fastest,
            risk_aware=risk_aware,
            delta_time_hours=delta_time,
            delta_time_pct=delta_time_pct,
            delta_risk_score=delta_risk,
            delta_risk_pct=delta_risk_pct,
            recommendation=rec,
            recommendation_reason=rec_reason
        )
