"""
Dynamic Risk Assessment and Machine Learning Disruption Modeling Engine.
Integrates supervised Scikit-Learn Random Forest Classifier with geotechnical,
meteorological, and active incident data to evaluate multi-factor road risk.
"""
from typing import Dict, Any, Tuple
try:
    from backend.services.ml_risk_model import MLDisruptionClassifier
except ImportError:
    from services.ml_risk_model import MLDisruptionClassifier


class RiskEngine:
    """
    Computes explainable composite risk scores and disruption probabilities
    grounded in NASA SRTM elevation/slope, GSI historical landslide catalogs,
    Open-Meteo precipitation, and active field incident reports.
    """

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
        and explainable breakdown components powered by the ML Disruption Model.
        """
        if is_manually_blocked:
            return 1.0, "IMPASSABLE", {
                "slope_factor": 1.0,
                "history_factor": 1.0,
                "weather_factor": 1.0,
                "incident_factor": 1.0,
                "alpine_factor": 1.0,
                "ai_disruption_prob": 1.0,
                "ai_model": "RandomForest-NER-v2.0"
            }

        # Run supervised ML model inference
        ml_result = MLDisruptionClassifier.predict_disruption(
            geotechnical=geotechnical,
            rainfall_override=rainfall_override,
            active_incidents_count=active_incidents_count,
            is_manually_blocked=is_manually_blocked
        )

        ml_prob = ml_result["disruption_probability"]
        level = ml_result["risk_level"]
        feature_imps = ml_result["feature_importances"]

        # Composite score blends ML probability with active incident urgency
        incident_penalty = min(0.35, active_incidents_count * 0.20)
        final_score = round(min(1.0, max(0.0, (ml_prob * 0.85) + incident_penalty)), 3)

        if final_score >= 0.85 or level == "CRITICAL":
            level = "CRITICAL" if final_score < 0.95 else "IMPASSABLE"
        elif final_score >= 0.60:
            level = "HIGH"
        elif final_score >= 0.30:
            level = "MODERATE"
        else:
            level = "LOW"

        breakdown = {
            "slope_factor": round(float(feature_imps.get("slope_factor", 25.0)) / 100.0, 2),
            "weather_factor": round(float(feature_imps.get("rainfall_factor", 35.0)) / 100.0, 2),
            "lithology_factor": round(float(feature_imps.get("lithology_factor", 25.0)) / 100.0, 2),
            "alpine_factor": round(float(feature_imps.get("elevation_factor", 15.0)) / 100.0, 2),
            "incident_factor": round(float(incident_penalty), 2),
            "ai_disruption_prob": ml_prob,
            "ai_safety_factor": ml_result["safety_factor"],
            "ai_feature_contributions": feature_imps,
            "ai_advisory": ml_result["advisory"],
            "ai_model": ml_result["model_version"]
        }

        return final_score, level, breakdown

    @classmethod
    def get_full_ml_assessment(cls, geotechnical: Dict[str, Any], rainfall_override: float = None) -> Dict[str, Any]:
        """Deep ML assessment for Geotechnical Segments drawer."""
        return MLDisruptionClassifier.predict_disruption(
            geotechnical=geotechnical,
            rainfall_override=rainfall_override
        )
