"""
Centralized Dependency Provider and Service Singletons.
Guarantees resilient access to core engines regardless of whether the app
is invoked as `main:app` or `backend.main:app`, or in standalone test scripts.
"""
from typing import Tuple
from fastapi import Request
from backend.services.routing_engine import RoutingEngine
from backend.services.vehicle_simulator import VehicleSimulator
from backend.services.field_report_service import FieldReportService


class ServiceContainer:
    _routing_engine: RoutingEngine = None
    _vehicle_simulator: VehicleSimulator = None
    _field_report_service: FieldReportService = None

    @classmethod
    def get_routing_engine(cls) -> RoutingEngine:
        if cls._routing_engine is None:
            cls._routing_engine = RoutingEngine()
        return cls._routing_engine

    @classmethod
    def get_vehicle_simulator(cls) -> VehicleSimulator:
        if cls._vehicle_simulator is None:
            engine = cls.get_routing_engine()
            cls._vehicle_simulator = VehicleSimulator(engine)
        return cls._vehicle_simulator

    @classmethod
    def get_field_report_service(cls) -> FieldReportService:
        if cls._field_report_service is None:
            engine = cls.get_routing_engine()
            cls._field_report_service = FieldReportService(engine)
        return cls._field_report_service

    @classmethod
    def set_services(cls, engine: RoutingEngine, simulator: VehicleSimulator, field_service: FieldReportService):
        cls._routing_engine = engine
        cls._vehicle_simulator = simulator
        cls._field_report_service = field_service


def get_routing_engine(request: Request = None) -> RoutingEngine:
    if request and hasattr(request, "app") and hasattr(request.app.state, "routing_engine"):
        return request.app.state.routing_engine
    return ServiceContainer.get_routing_engine()


def get_vehicle_simulator(request: Request = None) -> VehicleSimulator:
    if request and hasattr(request, "app") and hasattr(request.app.state, "vehicle_simulator"):
        return request.app.state.vehicle_simulator
    return ServiceContainer.get_vehicle_simulator()


def get_field_service(request: Request = None) -> FieldReportService:
    if request and hasattr(request, "app") and hasattr(request.app.state, "field_report_service"):
        return request.app.state.field_report_service
    return ServiceContainer.get_field_report_service()


def get_services(request: Request = None) -> Tuple[RoutingEngine, VehicleSimulator, FieldReportService]:
    return (
        get_routing_engine(request),
        get_vehicle_simulator(request),
        get_field_service(request)
    )
