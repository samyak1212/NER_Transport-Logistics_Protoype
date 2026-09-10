"""
Vehicle tracking and convoy movement simulator.
Interpolates coordinates along route polylines, monitors ahead hazards,
and triggers reactive rerouting advisories.
"""
import math
from typing import Dict, Any, Optional, List
from backend.services.routing_engine import RoutingEngine
from backend.models.schemas import VehicleTelemetry, VehicleCreate
from backend.data.corridor_data import NODES


def haversine_dist(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Calculates great-circle distance between two points in km."""
    R = 6371.0
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat / 2.0) ** 2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2.0) ** 2
    return R * 2.0 * math.atan2(math.sqrt(a), math.sqrt(1.0 - a))


class VehicleSimulator:
    """
    Simulates real-time GPS telemetry for convoys carrying essential commodities.
    Detects dynamic disruptions and generates automated reroute prompts.
    """

    def __init__(self, routing_engine: RoutingEngine):
        self.routing_engine = routing_engine
        self.vehicles: Dict[str, Dict[str, Any]] = {}
        self.aliases: Dict[str, str] = {
            "FOOD_RATION_02": "PDS_GRAIN_04",
            "FUEL_TANKER_03": "FUEL_TANKER_02",
            "DISASTER_RELIEF_04": "RELIEF_SUPPLY_03",
        }
        self._init_default_vehicles()

    def _init_default_vehicles(self):
        """Initializes 4 realistic strategic convoys across the 8 NER states matching frontend fleet IDs."""
        # 1. Critical Medical Cold-Chain Convoy (Subedar R. Thapa)
        self.create_vehicle(
            vehicle_id="MED_CONVOY_01",
            vehicle_type="TATA_1618_SE_COLD_CHAIN",
            cargo_priority="CRITICAL_MEDICAL",
            cargo_description="10,000 Doses Anti-Rabies & Snake Venom + Pediatric Oxygen",
            origin="Guwahati",
            destination="Tawang",
            initial_progress=0.0
        )

        # 2. Food Corporation of India (FCI) Essential Food Grain Convoy (Havildar M. Saikia)
        self.create_vehicle(
            vehicle_id="PDS_GRAIN_04",
            vehicle_type="ASHOK_LEYLAND_1616_HEAVY",
            cargo_priority="ESSENTIAL_FOOD",
            cargo_description="14.5 MT Fortified Rice & Pulses (PDS Buffer Stock)",
            origin="Guwahati",
            destination="Bomdila",
            initial_progress=32.0
        )

        # 3. High-Altitude Fuel Tanker (Naik K. Ao)
        self.create_vehicle(
            vehicle_id="FUEL_TANKER_02",
            vehicle_type="BHARATBENZ_2823_POL_TANKER",
            cargo_priority="FUEL_POL",
            cargo_description="12 KL Winterized Arctic Diesel (-30°C pour point)",
            origin="Dimapur",
            destination="Kohima",
            initial_progress=28.0
        )

        # 4. Disaster Relief & Trauma Supplies (Lance Naik B. Chettri)
        self.create_vehicle(
            vehicle_id="RELIEF_SUPPLY_03",
            vehicle_type="MAHINDRA_BLAZO_X_ALL_TERRAIN",
            cargo_priority="CRITICAL_MEDICAL",
            cargo_description="Emergency Flood Sanitation & Trauma Kits",
            origin="Siliguri",
            destination="Gangtok",
            initial_progress=38.0
        )

    def create_vehicle(
        self,
        vehicle_id: str,
        vehicle_type: str = "TATA_1618_10_WHEELER",
        cargo_priority: str = "CRITICAL_MEDICAL",
        cargo_description: str = "Emergency Medical Supplies",
        origin: str = "Guwahati",
        destination: str = "Tawang",
        initial_progress: float = 0.0
    ) -> Dict[str, Any]:
        """Dispatches a new monitored vehicle on the route."""
        route = self.routing_engine.calculate_route(origin, destination, cargo_priority=cargo_priority, mode="RISK_AWARE")
        
        polyline = route.polyline if route.polyline else [[26.1445, 91.7362]]
        init_pct = max(0.0, min(100.0, initial_progress))
        idx = int((init_pct / 100.0) * (len(polyline) - 1)) if len(polyline) > 1 else 0

        curr_lat = polyline[idx][0]
        curr_lon = polyline[idx][1]
        dist_covered = (init_pct / 100.0) * route.total_distance_km
        remaining_km = max(0.0, route.total_distance_km - dist_covered)
        eta_h = remaining_km / 42.0

        vehicle = {
            "vehicle_id": vehicle_id,
            "vehicle_type": vehicle_type,
            "cargo_priority": cargo_priority,
            "cargo_description": cargo_description,
            "origin": origin,
            "destination": destination,
            "route": route,
            "status": "IN_TRANSIT",
            "current_index": idx,
            "polyline": polyline,
            "current_lat": curr_lat,
            "current_lon": curr_lon,
            "speed_kmh": 42.0,
            "progress_pct": init_pct,
            "distance_covered_km": round(dist_covered, 1),
            "total_distance_km": route.total_distance_km,
            "eta_hours": round(eta_h, 2),
            "ahead_hazard_detected": False,
            "ahead_hazard_detail": None,
            "operational_advisory": "CONTINUE",
            "detour_available": False
        }
        self.vehicles[vehicle_id] = vehicle
        self.evaluate_hazards(vehicle_id)
        return vehicle

    def _resolve_vehicle(self, vehicle_id: str) -> Optional[Dict[str, Any]]:
        """Resolves a vehicle dictionary by ID or alias; dynamically auto-provisions if missing."""
        if vehicle_id in self.vehicles:
            return self.vehicles[vehicle_id]

        if vehicle_id in self.aliases:
            canon = self.aliases[vehicle_id]
            if canon in self.vehicles:
                return self.vehicles[canon]

        for alias, canon in self.aliases.items():
            if canon == vehicle_id and alias in self.vehicles:
                return self.vehicles[alias]

        # Dynamic fallback registration to prevent 404s on unexpected vehicle IDs
        try:
            return self.create_vehicle(
                vehicle_id=vehicle_id,
                vehicle_type="ASHOK_LEYLAND_1616_HEAVY",
                cargo_priority="ESSENTIAL_FOOD",
                cargo_description="Regional Essential Supply Convoy",
                origin="Guwahati",
                destination="Bomdila",
                initial_progress=25.0
            )
        except Exception:
            return None

    def get_vehicle_telemetry(self, vehicle_id: str) -> Optional[VehicleTelemetry]:
        """Returns structured telemetry data for a vehicle."""
        v = self._resolve_vehicle(vehicle_id)
        if not v:
            return None

        # Determine next landmark
        route = v.get("route")
        path_nodes = route.path_nodes if route else []
        node_idx = min(len(path_nodes) - 1, int((v["progress_pct"] / 100.0) * len(path_nodes)) + 1)
        next_landmark = path_nodes[node_idx] if node_idx < len(path_nodes) else v["destination"]

        # Current segment
        curr_seg_id = "SEG_01"
        if route and route.segments:
            seg_idx = min(len(route.segments) - 1, int((v["progress_pct"] / 100.0) * len(route.segments)))
            curr_seg_id = route.segments[seg_idx].segment_id

        return VehicleTelemetry(
            vehicle_id=vehicle_id,
            status=v["status"],
            current_lat=round(v["current_lat"], 5),
            current_lon=round(v["current_lon"], 5),
            speed_kmh=round(v["speed_kmh"], 1),
            progress_pct=round(v["progress_pct"], 1),
            distance_covered_km=round(v["distance_covered_km"], 1),
            total_distance_km=round(v["total_distance_km"], 1),
            eta_hours=round(v["eta_hours"], 2),
            current_segment_id=curr_seg_id,
            next_landmark=next_landmark,
            ahead_hazard_detected=v["ahead_hazard_detected"],
            ahead_hazard_detail=v["ahead_hazard_detail"],
            operational_advisory=v["operational_advisory"],
            detour_available=v["detour_available"]
        )

    def get_all_vehicles(self) -> List[VehicleTelemetry]:
        """Returns telemetries for all active convoys (excluding alias duplicates)."""
        res = []
        seen = set()
        for v_id, v in list(self.vehicles.items()):
            canonical_id = v.get("vehicle_id", v_id)
            if canonical_id in seen:
                continue
            seen.add(canonical_id)
            t = self.get_vehicle_telemetry(canonical_id)
            if t:
                res.append(t)
        return res

    def advance_vehicle(self, vehicle_id: str, step_pct: float = 3.5) -> Optional[VehicleTelemetry]:
        """Advances vehicle progress along polyline."""
        v = self._resolve_vehicle(vehicle_id)
        if not v or v["status"] not in ["IN_TRANSIT", "REROUTED"]:
            return self.get_vehicle_telemetry(vehicle_id) if v else None

        polyline = v["polyline"]
        if not polyline:
            return self.get_vehicle_telemetry(vehicle_id)

        v["progress_pct"] = min(100.0, v["progress_pct"] + step_pct)
        v["distance_covered_km"] = (v["progress_pct"] / 100.0) * v["total_distance_km"]
        
        # Remaining time
        remaining_km = max(0.0, v["total_distance_km"] - v["distance_covered_km"])
        v["eta_hours"] = max(0.0, remaining_km / max(10.0, v["speed_kmh"]))

        # Interpolate coordinate along polyline
        idx = int((v["progress_pct"] / 100.0) * (len(polyline) - 1))
        v["current_index"] = idx
        v["current_lat"] = polyline[idx][0]
        v["current_lon"] = polyline[idx][1]

        if v["progress_pct"] >= 100.0:
            v["status"] = "ARRIVED"
            v["speed_kmh"] = 0.0
            v["eta_hours"] = 0.0

        self.evaluate_hazards(vehicle_id)
        return self.get_vehicle_telemetry(vehicle_id)

    def evaluate_hazards(self, vehicle_id: str):
        """
        Scans remaining road segments along vehicle's path.
        If a blocked segment or high hazard is ahead, triggers REROUTE or SUSPEND.
        """
        v = self._resolve_vehicle(vehicle_id)
        if not v or v["status"] == "ARRIVED":
            return

        route = v.get("route")
        if not route or not route.segments:
            return

        curr_progress = v["progress_pct"] / 100.0
        start_seg_idx = int(curr_progress * len(route.segments))

        hazard_found = False
        hazard_reason = None

        for seg in route.segments[start_seg_idx:]:
            seg_id = seg.segment_id
            live_seg = self.routing_engine.segments.get(seg_id)
            if live_seg and (live_seg.get("is_blocked") or live_seg.get("risk_score", 0) >= 0.85):
                hazard_found = True
                hazard_reason = live_seg.get("blockage_reason") or f"High Hazard Zone on {live_seg.get('name')}"
                break

        if hazard_found:
            v["ahead_hazard_detected"] = True
            v["ahead_hazard_detail"] = f"CRITICAL HAZARD DETECTED: {hazard_reason}. Vehicle path is compromised."
            v["operational_advisory"] = "REROUTE"
            v["detour_available"] = True
        else:
            v["ahead_hazard_detected"] = False
            v["ahead_hazard_detail"] = None
            v["operational_advisory"] = "CONTINUE"
            v["detour_available"] = False

    def find_nearest_safe_anchor(self, lat: float, lon: float, destination: str, cargo_priority: str) -> Optional[str]:
        """
        Finds the nearest network junction node from which an open route exists
        to the vehicle destination.
        """
        best_node = None
        min_dist = float("inf")

        for node_id, n_data in NODES.items():
            d = haversine_dist(lat, lon, n_data["lat"], n_data["lon"])
            if d < min_dist:
                # Test if a route exists from this candidate node
                try:
                    self.routing_engine.calculate_route(
                        origin=node_id,
                        destination=destination,
                        cargo_priority=cargo_priority,
                        mode="RISK_AWARE"
                    )
                    min_dist = d
                    best_node = node_id
                except Exception:
                    continue

        return best_node

    def apply_reroute(self, vehicle_id: str) -> Optional[VehicleTelemetry]:
        """
        Dynamically calculates a safe detour bypass from the vehicle's CURRENT position,
        preventing teleportation back to the origin.
        """
        v = self._resolve_vehicle(vehicle_id)
        if not v:
            return None

        curr_lat = v["current_lat"]
        curr_lon = v["current_lon"]
        dest = v["destination"]
        cargo_priority = v["cargo_priority"]

        try:
            # 1. Identify nearest forward/diverging junction node with an open path
            anchor_node = self.find_nearest_safe_anchor(curr_lat, curr_lon, dest, cargo_priority)
            if not anchor_node:
                # Fallback: recompute from origin if stranded
                anchor_node = v["origin"]

            # 2. Compute detour from anchor node to destination avoiding all blocked edges
            detour_route = self.routing_engine.calculate_route(
                origin=anchor_node,
                destination=dest,
                cargo_priority=cargo_priority,
                mode="RISK_AWARE"
            )

            # 3. Splice past traveled polyline with new bypass polyline
            past_idx = v["current_index"]
            traveled_polyline = v["polyline"][:past_idx + 1] if past_idx > 0 else [[curr_lat, curr_lon]]
            new_detour_polyline = detour_route.polyline

            # Ensure smooth bridge coordinate connecting current location to anchor
            combined_polyline = traveled_polyline + new_detour_polyline[1:]

            # 4. Recalculate metrics smoothly
            past_km = v["distance_covered_km"]
            new_remaining_km = detour_route.total_distance_km
            new_total_km = max(detour_route.total_distance_km, past_km + new_remaining_km)

            v["route"] = detour_route
            v["polyline"] = combined_polyline
            v["total_distance_km"] = round(new_total_km, 1)
            v["distance_covered_km"] = round(past_km, 1)
            v["progress_pct"] = round((past_km / max(1.0, new_total_km)) * 100.0, 1)
            v["eta_hours"] = round(new_remaining_km / max(10.0, v["speed_kmh"]), 2)
            v["status"] = "REROUTED"
            v["ahead_hazard_detected"] = False
            v["ahead_hazard_detail"] = f"Safe detour successfully authorized via {anchor_node} bypass corridor."
            v["operational_advisory"] = "CONTINUE"
            v["detour_available"] = False

            # Advance slightly along the new detour
            self.advance_vehicle(vehicle_id, step_pct=1.0)
        except Exception as e:
            v["operational_advisory"] = "SUSPEND"
            v["ahead_hazard_detail"] = f"All detour corridors severed: {str(e)}"

        return self.get_vehicle_telemetry(vehicle_id)

    def pause_vehicle(self, vehicle_id: str):
        v = self._resolve_vehicle(vehicle_id)
        if v:
            v["status"] = "PAUSED"
            v["speed_kmh"] = 0.0

    def resume_vehicle(self, vehicle_id: str):
        v = self._resolve_vehicle(vehicle_id)
        if v:
            v["status"] = "IN_TRANSIT"
            v["speed_kmh"] = 42.0
