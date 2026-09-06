"""
API Router for AI Summaries, Multilingual Advisories, and Open-Meteo Live Weather.
"""
from fastapi import APIRouter, Depends
from backend.services.weather_service import WeatherService
from backend.services.ai_service import AIService
from backend.services.routing_engine import RoutingEngine

router = APIRouter(prefix="", tags=["AI Advisories & Weather"])


from backend.dependencies import get_routing_engine


@router.get("/weather/corridor")
async def get_corridor_weather():
    """Fetches real-time weather and precipitation along the Guwahati-Tawang lifeline via Open-Meteo."""
    return await WeatherService.get_all_corridor_weather()


@router.get("/ai/executive-brief")
async def get_executive_brief(engine: RoutingEngine = Depends(get_routing_engine)):
    """Generates trilingual operational situation briefing for Command Authorities."""
    corridor_status = {
        "total_segments": len(engine.segments),
        "blocked": sum(1 for s in engine.segments.values() if s.get("is_blocked"))
    }
    weather = await WeatherService.get_all_corridor_weather()
    return await AIService.generate_executive_brief(corridor_status, weather)
