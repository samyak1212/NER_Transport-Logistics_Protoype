"""
Dynamic Risk Assessment and Machine Learning Disruption Modeling Engine.
Calculates multi-factor geotechnical, meteorological, and incident risk scores for road segments.
"""
from typing import Dict, Any, Tuple


class RiskEngine:
    """
    Computes explainable composite risk scores and disruption probabilities
    grounded in NASA SRTM elevation/slope, GSI historical landslide catalog,
    IMD/Open-Meteo precipitation, and active field incident flags.
    """

    # Weights for risk factors (calibrated for Himalayan fragile terrain)
    WEIGHT_SLOPE = 0.30       # Steep cut slopes (>30 deg)
    WEIGHT_GSI_HISTORY = 0.25  # Prior slide recurrence in GSI database
    WEIGHT_RAINFALL = 0.25     # Precipitation saturation (mm/24h)
    WEIGHT_ELEVATION = 0.10    # Alpine icing, freezing fog (>2,500m)
    WEIGHT_INCIDENTS = 0.10    # Active field reports / partial blockages

    @classmethod
    def calculate_segment_risk(
        cls,
        geotechnical: Dict[str, Any],
        active_incidents_count: int = 0,
        is_manually_blocked: bool = False,
        rainfall_override: float = None
    ) -> Tuple[float, str, Dict[str, float]]:
        """
        Calculates normalized risk score (0.0 to 1.0), qualitative risk level,
        and explainable breakdown components.
        """
        if is_manually_blocked:
            return 1.0, "IMPASSABLE", {
                "slope_factor": 1.0,
                "history_factor": 1.0,
                "weather_factor": 1.0,
                "incident_factor": 1.0,
                "alpine_factor": 1.0
            }

        slope = float(geotechnical.get("slope_deg", 5.0))
        elevation = float(geotechnical.get("elevation_m", 100.0))
        gsi_slides = int(geotechnical.get("gsi_landslide_history", 0))
        rainfall = rainfall_override if rainfall_override is not None else float(geotechnical.get("rainfall_intensity_mm", 10.0))
        soil_sat = float(geotechnical.get("soil_saturation_index", 0.4))

        # 1. Slope Factor (0 to 1) - steepness above 25° escalates exponentially
        if slope <= 10.0:
            slope_factor = slope / 40.0
        elif slope <= 25.0:
            slope_factor = 0.25 + (slope - 10.0) / 30.0
        else:
            slope_factor = min(1.0, 0.70 + ((slope - 25.0) / 20.0) * 0.30)

        # 2. GSI Historical Slide Recurrence Factor
        history_factor = min(1.0, gsi_slides / 10.0)

        # 3. Weather & Rain Saturation Factor
        # Monsoonal rainfall > 50 mm/day triggers high landslide probability in NER
        weather_factor = min(1.0, (rainfall / 60.0) * 0.7 + soil_sat * 0.3)

        # 4. Alpine / Elevation Hazard Factor (Sela Pass region at >2,800m)
        if elevation < 1500.0:
            alpine_factor = 0.1
        elif elevation < 2800.0:
            alpine_factor = 0.3 + (elevation - 1500.0) / 3500.0
        else:
            alpine_factor = min(1.0, 0.7 + (elevation - 2800.0) / 2000.0)

        # 5. Incident Factor from ground checkposts
        incident_factor = min(1.0, active_incidents_count * 0.5)

        # Composite weighted score
        composite_score = (
            cls.WEIGHT_SLOPE * slope_factor +
            cls.WEIGHT_GSI_HISTORY * history_factor +
            cls.WEIGHT_RAINFALL * weather_factor +
            cls.WEIGHT_ELEVATION * alpine_factor +
            cls.WEIGHT_INCIDENTS * incident_factor
        )

        composite_score = round(min(1.0, max(0.0, composite_score)), 3)

        # Qualitative Level
        if composite_score < 0.30:
            level = "LOW"
        elif composite_score < 0.60:
            level = "MODERATE"
        elif composite_score < 0.85:
            level = "HIGH"
        else:
            level = "IMPASSABLE"

        breakdown = {
            "slope_factor": round(slope_factor, 2),
            "history_factor": round(history_factor, 2),
            "weather_factor": round(weather_factor, 2),
            "alpine_factor": round(alpine_factor, 2),
            "incident_factor": round(incident_factor, 2)
        }

        return composite_score, level, breakdown
