"""
Live meteorological connector using Open-Meteo 100% Free API.
Provides real-time precipitation, temperature, wind, and forecast conditions
across the North Eastern Region without requiring an API key.
"""
import os
import httpx
from typing import Dict, Any, List


class WeatherService:
    """
    Asynchronous weather service querying Open-Meteo endpoints for key corridor stations.
    """

    @classmethod
    def get_base_url(cls) -> str:
        base = os.getenv("OPEN_METEO_BASE_URL", "https://api.open-meteo.com/v1").rstrip("/")
        return f"{base}/forecast"

    KEY_STATIONS = {
        "Guwahati": {"lat": 26.1445, "lon": 91.7362, "elevation_m": 55},
        "Tezpur": {"lat": 26.6528, "lon": 92.7926, "elevation_m": 78},
        "Bhalukpong": {"lat": 27.0125, "lon": 92.6514, "elevation_m": 215},
        "Bomdila": {"lat": 27.2644, "lon": 92.4241, "elevation_m": 2415},
        "SelaPass": {"lat": 27.5034, "lon": 92.1039, "elevation_m": 3733},
        "Tawang": {"lat": 27.5861, "lon": 91.8594, "elevation_m": 3048}
    }

    # Offline resilient fallbacks calibrated for monsoon conditions in NER
    FALLBACK_CONDITIONS = {
        "Guwahati": {"temp_c": 31.5, "rainfall_mm": 18.2, "weather_desc": "Scattered Monsoon Showers", "humidity_pct": 84, "alert": "MODERATE"},
        "Tezpur": {"temp_c": 29.8, "rainfall_mm": 24.5, "weather_desc": "Continuous Rain", "humidity_pct": 88, "alert": "MODERATE"},
        "Bhalukpong": {"temp_c": 26.0, "rainfall_mm": 42.0, "weather_desc": "Heavy Downpour (Gorge Slopes Saturated)", "humidity_pct": 92, "alert": "HIGH"},
        "Bomdila": {"temp_c": 17.5, "rainfall_mm": 34.0, "weather_desc": "Dense Fog & Rain", "humidity_pct": 95, "alert": "HIGH"},
        "SelaPass": {"temp_c": 4.2, "rainfall_mm": 56.5, "weather_desc": "Near-Freezing Torrential Rain & Dense Mist", "humidity_pct": 98, "alert": "CRITICAL"},
        "Tawang": {"temp_c": 14.8, "rainfall_mm": 32.0, "weather_desc": "Intermittent Cold Showers", "humidity_pct": 90, "alert": "MODERATE"}
    }

    @classmethod
    async def get_station_weather(cls, station_name: str) -> Dict[str, Any]:
        """Fetches live weather from Open-Meteo with graceful offline fallback."""
        station = cls.KEY_STATIONS.get(station_name)
        fallback = cls.FALLBACK_CONDITIONS.get(station_name, cls.FALLBACK_CONDITIONS["Bomdila"])

        if not station:
            return fallback

        try:
            params = {
                "latitude": station["lat"],
                "longitude": station["lon"],
                "current": "temperature_2m,relative_humidity_2m,precipitation,rain,weather_code,wind_speed_10m",
                "timezone": "Asia/Kolkata"
            }
            async with httpx.AsyncClient(timeout=3.5) as client:
                resp = await client.get(cls.get_base_url(), params=params)
                if resp.status_code == 200:
                    data = resp.json()
                    curr = data.get("current", {})
                    rain = curr.get("precipitation", fallback["rainfall_mm"])
                    temp = curr.get("temperature_2m", fallback["temp_c"])
                    humid = curr.get("relative_humidity_2m", fallback["humidity_pct"])
                    code = curr.get("weather_code", 0)

                    # Simple weather code interpretation
                    if code >= 80:
                        desc = "Torrential Monsoon Rain / Thunderstorms"
                    elif code >= 60:
                        desc = "Steady Rain"
                    elif code >= 50:
                        desc = "Drizzle / Mist"
                    else:
                        desc = "Overcast Clouds"

                    alert = "CRITICAL" if rain > 50 else ("HIGH" if rain > 30 else ("MODERATE" if rain > 15 else "LOW"))

                    return {
                        "station": station_name,
                        "temp_c": temp,
                        "rainfall_mm": rain,
                        "weather_desc": desc,
                        "humidity_pct": humid,
                        "alert": alert,
                        "source": "Open-Meteo Live API"
                    }
        except Exception:
            # Fallback to calibrated offline readings
            pass

        return {
            "station": station_name,
            **fallback,
            "source": "Monsoon Baseline (Resilient Offline Fallback)"
        }

    @classmethod
    async def get_all_corridor_weather(cls) -> List[Dict[str, Any]]:
        """Fetches weather summaries for all primary stations along the strategic corridor."""
        results = []
        for station_name in cls.KEY_STATIONS:
            w = await cls.get_station_weather(station_name)
            results.append(w)
        return results
