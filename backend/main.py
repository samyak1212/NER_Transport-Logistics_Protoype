"""
Main FastAPI Application Entry Point for SIH Problem Statement 26002:
AI-Based Smart Logistics and Accessibility Intelligence Platform for North Eastern Region (MDoNER).
"""
import os
from dotenv import load_dotenv

# Load environment variables from backend/.env
dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path)

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from backend.services.routing_engine import RoutingEngine
from backend.services.vehicle_simulator import VehicleSimulator
from backend.services.field_report_service import FieldReportService

from backend.routers.routes_corridors import router as corridors_router
from backend.routers.routes_routing import router as routing_router
from backend.routers.routes_vehicles import router as vehicles_router
from backend.routers.routes_field_reports import router as field_reports_router
from backend.routers.routes_simulation import router as simulation_router
from backend.routers.routes_ai import router as ai_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize core GIS and Routing engines
    print("🏔️ Initializing NER Logistics Intelligence Platform...")
    routing_engine = RoutingEngine()
    vehicle_simulator = VehicleSimulator(routing_engine)
    field_report_service = FieldReportService(routing_engine)

    app.state.routing_engine = routing_engine
    app.state.vehicle_simulator = vehicle_simulator
    app.state.field_report_service = field_report_service
    print("✅ Core GIS Graph, Risk Engine, and Convoy Telemetry Ready.")

    yield
    print("🛑 Shutting down NER Logistics Platform.")


app = FastAPI(
    title="NER Smart Logistics & Accessibility Intelligence API",
    description=(
        "Production-ready backend for SIH Problem Statement 26002 (MDoNER). "
        "Provides risk-penalized Dijkstra routing, NASA SRTM elevation profiling, "
        "GSI landslide hazard analysis, Open-Meteo live weather feeds, "
        "and multi-stakeholder operational intelligence for the North Eastern Region."
    ),
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure uploads directory exists and mount it
uploads_dir = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs(uploads_dir, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=uploads_dir), name="uploads")

# Include Routers
app.include_router(corridors_router)
app.include_router(routing_router)
app.include_router(vehicles_router)
app.include_router(field_reports_router)
app.include_router(simulation_router)
app.include_router(ai_router)


@app.get("/health")
def health_check():
    """Health check endpoint for platform monitoring."""
    return {
        "status": "HEALTHY",
        "service": "NER Logistics & Accessibility Intelligence API",
        "version": "1.0.0",
        "active_corridor": "Guwahati -> Tawang (NH-13 Lifeline)"
    }


@app.get("/")
def root():
    """Root redirect with API metadata and Swagger links."""
    return {
        "message": "Welcome to MDoNER AI-Based Smart Logistics & Accessibility Platform",
        "documentation": "/docs",
        "problem_statement": "SIH-26002"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)
