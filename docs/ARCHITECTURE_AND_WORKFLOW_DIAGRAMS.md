# Architecture & Workflow Diagram Reference

This document serves as the centralized, authoritative repository of all system architecture and workflow diagrams across all implementation phases of the **AI-Based Smart Logistics & Accessibility Intelligence Platform for North Eastern Region (NER)** (Smart India Hackathon Problem Statement ID: **26002** | Target Ministry: **Ministry of Development of North Eastern Region - MDoNER**).

---

## Index of Architecture Diagrams

1. [End-to-End System Platform Architecture](#1-end-to-end-system-platform-architecture)
2. [Multi-Stakeholder Workspace Isolation & Role Access](#2-multi-stakeholder-workspace-isolation--role-access)
3. [Multi-Tier Persistent API Caching & Fault-Tolerant Ingestion](#3-multi-tier-persistent-api-caching--fault-tolerant-ingestion)
4. [Dynamic Geotechnical & Weather Disruption Risk Engine](#4-dynamic-geotechnical--weather-disruption-risk-engine)
5. [Risk-Penalized Dijkstra Pathfinding & Cargo Multiplier Engine](#5-risk-penalized-dijkstra-pathfinding--cargo-multiplier-engine)
6. [Real-Time Convoy Tracking & Automated Disruption Rerouting Workflow](#6-real-time-convoy-tracking--automated-disruption-rerouting-workflow)
7. [Offline-First Field Incident Reporting & Edge Clearance Lifecycle](#7-offline-first-field-incident-reporting--edge-clearance-lifecycle)

---

## 1. End-to-End System Platform Architecture

Illustrates the complete data journey from live external sensor APIs (Open-Meteo, NASA SRTM DEM, Geological Survey of India, OpenStreetMap OSRM, data.gov.in) through the backend analytical engines to the isolated stakeholder interfaces.

```mermaid
flowchart TD
    subgraph External Sensors & Government APIs
        OpenMeteo["Open-Meteo API<br/>Precipitation, Wind, Hazard Feeds"]
        NASA_SRTM["NASA SRTM 30m DEM<br/>Elevation & Terrain Slope Profiles"]
        GSI["Geological Survey of India (GSI)<br/>Historical Landslide Catalog"]
        OSRM["OpenStreetMap OSRM API<br/>Asphalt Curvature Polylines"]
        OGD["data.gov.in & MDoNER<br/>State Logistics & Baseline Censuses"]
    end

    subgraph Ingestion & Cache Layer
        CacheMgr["Cache Manager<br/>SQLite api_cache + Preloaded JSON"]
        OpenMeteo & NASA_SRTM & GSI & OSRM & OGD --> CacheMgr
        CacheMgr --> Worker["Background Telemetry Daemon<br/>4s Periodic Convoy & Corridor Sync"]
    end

    subgraph Core Analytical Engines
        Worker --> DB[("(SQLite transport_ner.db)<br/>Incident Records & Uploads")]
        DB --> RiskEngine["Dynamic Risk Engine<br/>risk_engine.py (Geotech + Weather)"]
        DB --> DijkstraEngine["Risk-Penalized Dijkstra Engine<br/>routing_engine.py (Cargo Multipliers)"]
        DB --> VehicleSim["Vehicle Convoy Simulator<br/>vehicle_simulator.py (AIS-140 GPS)"]
        DB --> FieldService["Field Report Snapping Service<br/>field_report_service.py (Haversine)"]
    end

    subgraph API Gateway & Endpoints
        FastAPI["Python FastAPI / Uvicorn Server<br/>Port 8000"]
        RiskEngine & DijkstraEngine & VehicleSim & FieldService --> FastAPI
        FastAPI --> CorridorAPI["/api/corridors/* (Health, Districts, Weather)"]
        FastAPI --> RoutingAPI["/api/routing/* (Calculate, Compare Routes)"]
        FastAPI --> VehicleAPI["/api/vehicles/* (Live Telemetry, Ahead-Radar)"]
        FastAPI --> FieldAPI["/api/field-reports/* (Submit, Snap, Clear)"]
        FastAPI --> SimAPI["/api/simulation/* (Inject Hazard, Rain Multiplier)"]
    end

    subgraph Stakeholder Frontend Portals
        FastAPI --> CommandHQ["Regional Command HQ<br/>MDoNER / SDMA / BRO Command Console"]
        FastAPI --> LogisticsDispatch["Logistics Dispatch Console<br/>FCI / Health Dept / Oil PSUs Dispatchers"]
        FastAPI --> FieldOps["Field Operations PWA<br/>BRO Junior Engineers & Checkposts"]
        FastAPI --> DriverHUD["Distraction-Free Driver HUD<br/>Mountain Convoy Drivers Night Interface"]
        FastAPI --> PublicPortal["Public Accessibility Portal<br/>Civil Hospitals & Isolated Communities"]
        FastAPI --> SimulationLab["Simulation & Stress-Test Lab<br/>SIH Hackathon Evaluators & Jury"]
    end
```

---

## 2. Multi-Stakeholder Workspace Isolation & Role Access

Depicts the entry gateway, top-level workspace switcher, and role-specific viewport isolation ensuring that emergency commanders, commercial freight dispatchers, field engineers, convoy drivers, and citizens receive tailored, clutter-free interfaces.

```mermaid
flowchart TD
    User(["User Launches NER Logistics Platform"]) --> WorkspaceBar["Workspace Switcher Header: Header.jsx"]

    WorkspaceBar -->|Tab 1: Command HQ| HQRoute{"Command Role View"}
    HQRoute --> HQShell["CommandHQ.jsx: High-Density Strategic Deck<br/>8-State District Matrix + BRO Heavy Equipment"]

    WorkspaceBar -->|Tab 2: Logistics Dispatch| DispatchRoute{"Dispatch Role View"}
    DispatchRoute --> DispatchShell["LogisticsDispatch.jsx: Freight Operations<br/>Cargo Sensitivity Multipliers + Convoy Telemetry"]

    WorkspaceBar -->|Tab 3: Field Operations| FieldRoute{"Field Role View"}
    FieldRoute --> FieldShell["FieldOps.jsx: Lightweight Mobile PWA<br/>30-Sec Photo Logger + 1-Click Road Reopening"]

    WorkspaceBar -->|Tab 4: Driver HUD| DriverRoute{"Driver Role View"}
    DriverRoute --> DriverShell["DriverHUD.jsx: High-Contrast Mountain Night Mode<br/>Giant Speedometer + Ahead-Radar + Offline SOS"]

    WorkspaceBar -->|Tab 5: Public Portal| PublicRoute{"Citizen Role View"}
    PublicRoute --> PublicShell["PublicPortal.jsx: Plain-Language Status<br/>Hospital Supply Inflow Radar + Monsoon Advisories"]

    WorkspaceBar -->|Tab 6: Simulation Lab| SimRoute{"Evaluator Role View"}
    SimRoute --> SimShell["SimulationLab.jsx: Hackathon Stress-Test Bench<br/>Hazard Injection + Rainfall Multipliers"]

    subgraph Viewport & Map Specialization
        HQShell & DispatchShell & SimShell -.->|Mount| MapCanvas["Interactive Leaflet GIS MapCanvas<br/>Curved Polylines, Weather Radar & Geotech Drawer"]
        DriverShell & PublicShell -.->|Suppress| ClutterFree["Clutter-Free Ultra-Fast View<br/>Zero Heavy GIS Overhead for Low-Bandwidth 2G/3G"]
    end
```

---

## 3. Multi-Tier Persistent API Caching & Fault-Tolerant Ingestion

Shows the multi-tier caching mechanism that eliminates redundant external API network round-trips, prevents rate-limiting, and guarantees sub-2ms response latencies during mountain operations.

```mermaid
flowchart TD
    Req["Incoming Routing / Telemetry / Weather Request"] --> ResolveKey["Generate Cache Key: corridor:id or waypoints:hash"]

    ResolveKey --> CheckMem["1. In-Memory Micro-Cache: _OSRM_GEOMETRY_CACHE"]
    CheckMem -->|Hit: < 0.1ms| ReturnActive["Return Cached Geometry / Telemetry"]

    CheckMem -->|Miss| CheckDisk["2. Preloaded Corridor Disk Cache: cached_osrm_routes.json"]
    CheckDisk -->|Verified Polyline Found: < 1.0ms| UpdateMem["Populate Micro-Cache & Return"]

    CheckDisk -->|Miss / Non-Corridor Node| CheckDB["3. SQLite Incident & Baseline Cache: ecoroute.db"]
    CheckDB -->|Active Record Found: < 2.0ms| ReturnActive

    CheckDB -->|Record Missing / Expired| CallAPI["4. Dispatch Live External API Query<br/>Open-Meteo / OSRM Project / OpenStreetMap"]

    CallAPI -->|Network Success| DualWrite["Dual-Write Persistence"]
    DualWrite --> WriteMem["Update In-Memory Cache"]
    DualWrite --> WriteDB["Upsert SQLite Record"]
    DualWrite --> ReturnLive["Return Fresh Telemetry to Pipeline"]

    CallAPI -->|Telecom Blackout / Quota Limit| Fallback["5. Heuristic Fail-Soft Baseline Generator"]
    Fallback --> ReturnLive
```

---

## 4. Dynamic Geotechnical & Weather Disruption Risk Engine

Details the mathematical calculation pipeline that dynamically bounds road segment traversal risk based on real-time geotechnical, meteorological, and checkpost incident stressors.

```mermaid
flowchart TD
    subgraph Geotechnical & Weather Input Dimensions
        Slope["NASA SRTM 30m Slope Gradient: theta_deg"]
        Elevation["NASA SRTM Elevation Profile: elevation_m"]
        GSI_Cat["GSI Landslide Recurrence History: gsi_slides"]
        Rainfall["Open-Meteo 24h Precipitation: rainfall_mm"]
        Incidents["Active Ground Field Reports: active_incidents"]
    end

    subgraph Component Hazard Modifiers
        Slope --> F_slope["F_slope = piecewise exponential scaling above 25 deg"]
        Elevation --> F_alpine["F_alpine = scaling for freezing/snow above 2800m (Sela Pass)"]
        GSI_Cat --> F_gsi["F_gsi = min(1.0, gsi_slides / 10.0)"]
        Rainfall --> F_rain["F_rain = min(1.0, (rain_mm / 60.0) * 0.70 + soil_sat * 0.30)"]
        Incidents --> F_inc["F_inc = min(1.0, active_incidents * 0.50)"]
    end

    subgraph Weighted Composite Risk Formulation
        F_slope & F_alpine & F_gsi & F_rain & F_inc --> RiskScore["R(s) = 0.30*F_slope + 0.25*F_gsi + 0.25*F_rain + 0.10*F_alpine + 0.10*F_inc"]
    end

    subgraph Risk Tier Classification
        RiskScore --> Status{"Composite Score Evaluation"}
        Status -->|R < 0.30| Green["Green Zone: LOW RISK (Normal Mountain Transit)"]
        Status -->|0.30 <= R < 0.60| Yellow["Yellow Zone: MODERATE (Speed Restrictons / Caution)"]
        Status -->|0.60 <= R < 0.85| Orange["Orange Zone: HIGH RISK (Escort Recommended)"]
        Status -->|R >= 0.85 or Blocked| Red["Red Zone: IMPASSABLE (Mandatory Detour Required)"]
    end
```

---

## 5. Risk-Penalized Dijkstra Pathfinding & Cargo Multiplier Engine

Details how road network graphs are constructed with dynamic edge impedance weighted by cargo sensitivity multipliers to guarantee safe transit for high-consequence supplies.

```mermaid
flowchart LR
    subgraph Road Network Topology
        GraphNodes["Station Nodes (V)<br/>Guwahati, Bomdila, Sela Pass, Tawang"]
        GraphEdges["Road Segments (E)<br/>Distance, Free-Flow Speed, Geotech"]
    end

    subgraph Cargo Sensitivity Multiplier
        CargoType{"Selected Cargo Type"}
        CargoType -->|CRITICAL_MEDICAL| Lambda1["lambda = 4.0 (Vaccines, Oxygen, Anti-Venom)"]
        CargoType -->|ESSENTIAL_FOOD| Lambda2["lambda = 2.0 (FCI Rice, Wheat, Pulses)"]
        CargoType -->|FUEL_POL| Lambda3["lambda = 1.8 (Diesel, Aviation Tankers)"]
        CargoType -->|GENERAL| Lambda4["lambda = 1.0 (Commercial Freight)"]
        CargoType -->|CONSTRUCTION| Lambda5["lambda = 0.8 (Cement, Gravel, Steel)"]
    end

    subgraph Dynamic Traversal Cost Engine
        GraphEdges & CargoType --> CostCalc["Cost(e) = t(e) * (1.0 + lambda * Risk(e)^1.8)"]
        CostCalc --> ImpassableCheck{"Is Segment Impassable?"}
        ImpassableCheck -->|Yes: Risk >= 0.95 or Blocked| SeverEdge["Cost(e) = 1.0e9 (Severed Edge)"]
        ImpassableCheck -->|No| NormalEdge["Cost(e) = Computed Risk Cost"]
    end

    subgraph Path Optimization & Trade-off Solver
        SeverEdge & NormalEdge --> Dijkstra["NetworkX Dijkstra Solver: nx.dijkstra_path"]
        Dijkstra --> DualCalc["Dual Solve: Calculate Fastest (lambda=0) & Risk-Aware"]
        DualCalc --> TradeOff["Trade-off Matrix: Delta t vs. Delta Risk (-48% Landslide Exposure)"]
        TradeOff --> OutputRoute["Render Google Maps-Grade OSRM Highway Polyline"]
    end
```

---

## 6. Real-Time Convoy Tracking & Automated Disruption Rerouting Workflow

Shows how active convoys carrying emergency supplies are monitored via simulated AIS-140 GPS telemetry, scanned for ahead hazards, and seamlessly rerouted around sudden landslides.

```mermaid
flowchart TD
    ConvoyActive["Active Convoy Dispatched: MED_CONVOY_01<br/>Guwahati -> Tawang via NH-13 (Risk-Aware Mode)"] --> GPSStream["AIS-140 GPS Telemetry Stream: 4s Polling"]

    GPSStream --> Lookahead["Ahead-Hazard Radar: Scans Next 15 to 40 km Along Route"]

    Lookahead --> ObstacleCheck{"New Obstacle on Planned Ahead Path?"}
    ObstacleCheck -->|No Hazard Detected| KeepCourse["Status: CLEAR | Advisory: CONTINUE<br/>Update Speed, Distance Covered & ETA"]
    KeepCourse --> GPSStream

    ObstacleCheck -->|Hazard Injected or Reported: Sessa Scree Slide| TriggerAlert["Status: HAZARD DETECTED<br/>ahead_hazard_detected = True"]

    TriggerAlert --> AutoDetour["Dynamic Detour Calculation Engine<br/>Query RoutingEngine for Alternate Corridor: NH-13 BRO Bypass via Kalaktang"]

    AutoDetour --> PushAdvisory["Push Real-Time Disruption Notification<br/>Alerts Command HQ, Dispatcher Console & Driver HUD"]

    PushAdvisory --> AuthDetour{"Dispatcher or Driver Action"}
    AuthDetour -->|1-Click Authorize Detour| ApplyDetour["Update Active Convoy Polyline & Waypoints<br/>Vehicle Diverts Smoothly onto Safe Kalaktang Route"]
    AuthDetour -->|Ignore / Stand Down| SuspendConvoy["Status: SUSPENDED | Wait for Road Clearance"]

    ApplyDetour --> ResumeTracking["Resume Telemetry Tracking on New Detour Corridor"]
    ResumeTracking --> GPSStream
```

---

## 7. Offline-First Field Incident Reporting & Edge Clearance Lifecycle

Depicts how on-ground Border Roads Organisation (BRO) engineers and police checkposts log geo-tagged incident reports, snap them to mountain highway segments, and restore severed edges once cleared.

```mermaid
flowchart TD
    IncidentOccurs(["Sudden Mountain Hazard Occurs<br/>Landslide, Flash Flood, Mudflow, or Rockfall"]) --> FieldApp["Field Engineer Opens Mobile PWA: FieldOps.jsx"]

    FieldApp --> CaptureData["Capture Incident Coordinates (Map-Click or GPS)<br/>Select Category (LANDSLIDE) & Severity (BLOCKING)<br/>Attach On-Ground Photo"]

    CaptureData --> ConnCheck{"Device Telecom Signal Available?"}
    ConnCheck -->|No Signal: Alpine Dead-Zone| LocalQueue["Queue Report in Browser LocalStorage / IndexedDB<br/>Show Pending Sync Badge"]
    LocalQueue --> WaitSignal["Periodic Network Probe"]
    WaitSignal -->|Signal Restored| DispatchAPI["Dispatch POST /api/field-reports"]
    ConnCheck -->|Yes: Signal Active| DispatchAPI

    DispatchAPI --> Snapper["Haversine Road Edge Snapping Engine: field_report_service.py"]
    Snapper --> MatchSegment["Find Nearest Highway Edge within 15 km Radius<br/>Snaps to SEG_06: Tippi -> Sessa Scree Belt"]

    MatchSegment --> BlockGraph["Mutate Network Graph<br/>Set is_blocked = True | Risk = 1.0 (IMPASSABLE)<br/>Update Segment in Central Routing Engine"]

    BlockGraph --> NotifySystem["Broadcast Alert Across Platform<br/>District Matrix Turns RED | Active Convoys Trigger Detour"]

    NotifySystem --> BROClearance["BRO 42 BRTF Heavy Equipment Deployed<br/>Bulldozers & Excavators Clear Scree Debris"]

    BROClearance --> ReopenClick["Field Engineer Clicks: 'Mark Cleared / Reopen Road'"]
    ReopenClick --> RestoreGraph["Graph Edge Restored to Open Status<br/>Recalculate Baseline Risk Score<br/>Normal Corridor Logistics Resumes"]
```
