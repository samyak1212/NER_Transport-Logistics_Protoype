# System Architecture & Technical Design

This document details the internal technical architecture, component structure, data flow pipelines, and mathematical models powering the **AI-Based Smart Logistics & Accessibility Intelligence Platform for North Eastern Region (NER)** (Smart India Hackathon Problem Statement ID: **26002** | Target Ministry: **Ministry of Development of North Eastern Region - MDoNER**).

---

## 1. High-Level System Architecture

The platform is engineered as a decoupled, multi-tier system composed of a client-side reactive web application, a high-performance Python 3.13 asynchronous FastAPI service with a centralized singleton service container, an in-memory and persistent storage tier, and multiple external geotechnical, meteorological, and geospatial sensor pipelines.

The platform follows a **Multi-Stakeholder Persona-Driven Lifeline Network Architecture**: all strategic corridors and highway segments are managed through a unified geospatial graph model, while dedicated, clutter-free workspace shells conditionally expose role-tailored intelligence to Disaster Commanders, Logistics Dispatchers, BRO Field Engineers, Convoy Drivers, and Remote Mountain Communities.

```mermaid
graph TD
    subgraph External Sensors & Government Geospatial Data
        OM["Open-Meteo API<br/>Rainfall, Wind, Temp Feeds"]
        NASA_DEM["NASA SRTM 30m DEM<br/>Slope Gradient & Elevation Profiles"]
        GSI["Geological Survey of India (GSI)<br/>Historical Landslide Recurrence Catalog"]
        OSRM["OSRM Routing Engine<br/>High-Res Highway Curvature Polylines"]
        OSM["OpenStreetMap Overpass<br/>Bridges, Passes, Staging Hub Nodes"]
        OGD["data.gov.in & MDoNER<br/>State Logistics & Baseline Censuses"]
    end

    subgraph Backend Engine & Ingestion (Python 3.13 + FastAPI)
        BW["Background Telemetry Worker / Vehicle Simulator<br/>4s Polling Daemon"]
        TPE["ThreadPoolExecutor / Async Event Loop<br/>Parallel Corridor Processing"]
        ENG_RISK["Dynamic Risk Engine<br/>risk_engine.py"]
        ENG_ROUTING["Risk-Penalized Dijkstra Engine<br/>routing_engine.py"]
        ENG_FIELD["Field Report & Haversine Snapper<br/>field_report_service.py"]
        ENG_AI["AI Logistics Intelligence Assistant<br/>ai_service.py"]
        MEM_CACHE[("(In-Memory Telemetry & Corridor Cache)")]
        OSRM_CACHE[("(In-Memory & Disk OSRM Geometry Cache)")]
        HTTP_SRV["FastAPI Uvicorn REST API<br/>main.py :8000"]
    end

    subgraph Persistence Tier
        SQLITE[("(SQLite 3 Database & File Store)<br/>Incident Logs, Media Uploads & Snapshots")]
    end

    subgraph Frontend Presentation Tier (React 19 + TailwindCSS + Vite + Leaflet)
        WORKSPACE_BAR["Workspace Navigation Bar<br/>Header.jsx"]
        STATE_STORE["Central State Coordinator<br/>App.jsx & api.js"]
        MAP_CANVAS["Interactive Leaflet GIS Canvas<br/>MapCanvas.jsx"]
        GEOTECH_DRAWER["Geotechnical Segment Inspector<br/>GeotechnicalDrawer.jsx"]
        RAIN_PANEL["Landslide & Monsoon Radar Panel<br/>LandslideRainfallPanel.jsx"]

        subgraph Isolated Stakeholder Workspaces
            HQ_WORKSPACE["Regional Command HQ<br/>CommandHQ.jsx (MDoNER / SDMA / BRO)"]
            DISPATCH_WORKSPACE["Logistics Dispatch Console<br/>LogisticsDispatch.jsx (FCI / Health Dept)"]
            FIELD_WORKSPACE["Field Operations PWA<br/>FieldOps.jsx (BRO Engineers / Checkposts)"]
            DRIVER_WORKSPACE["Distraction-Free Driver HUD<br/>DriverHUD.jsx (Convoy Drivers)"]
            PUBLIC_WORKSPACE["Public Accessibility Portal<br/>PublicPortal.jsx (Hospitals / Citizens)"]
            SIM_WORKSPACE["Simulation & Stress-Test Lab<br/>SimulationLab.jsx (Jury / Evaluators)"]
        end
    end

    %% Ingestion Flow
    OM -->|HTTP GET / Forecast| TPE
    NASA_DEM -->|Topological Extract| ENG_RISK
    GSI -->|Landslide Susceptibility| ENG_RISK
    OSRM -->|Polyline Snapping| OSRM_CACHE
    OSM -->|Pass & Bridge Nodes| TPE
    OGD -->|Logistics Baselines| TPE

    BW --> TPE
    TPE --> ENG_RISK
    ENG_RISK --> MEM_CACHE
    TPE -->|Write Incidents & Uploads| SQLITE

    %% API Server
    MEM_CACHE --> HTTP_SRV
    OSRM_CACHE --> HTTP_SRV
    ENG_ROUTING --> HTTP_SRV
    ENG_FIELD --> HTTP_SRV
    ENG_AI --> HTTP_SRV
    SQLITE <-->|Read / Write| HTTP_SRV

    %% Client Routing & Flow
    HTTP_SRV -->|REST Endpoints / Corridors & Telemetry| STATE_STORE
    STATE_STORE --> WORKSPACE_BAR
    WORKSPACE_BAR --> HQ_WORKSPACE
    WORKSPACE_BAR --> DISPATCH_WORKSPACE
    WORKSPACE_BAR --> FIELD_WORKSPACE
    WORKSPACE_BAR --> DRIVER_WORKSPACE
    WORKSPACE_BAR --> PUBLIC_WORKSPACE
    WORKSPACE_BAR --> SIM_WORKSPACE

    HQ_WORKSPACE --> MAP_CANVAS
    DISPATCH_WORKSPACE --> MAP_CANVAS
    SIM_WORKSPACE --> MAP_CANVAS
    MAP_CANVAS --> GEOTECH_DRAWER
    MAP_CANVAS --> RAIN_PANEL
```

---

## 2. Backend Architecture

### 2.1 Concurrency & Asynchronous Design (`backend/main.py`)

The backend is built on **Python 3.13** and **FastAPI** utilizing an asynchronous event loop and lightweight thread pool dispatch to ensure sub-millisecond response latencies and high resilience under heavy load:

- **Asynchronous Lifespan Management**: Application initialization is orchestrated via an `@asynccontextmanager` lifespan handler, executing synchronous graph indexing, OSRM geometry preloading, and telemetry daemon startup prior to client traffic ingestion.
- **ServiceContainer Singleton Pattern**: All primary analytical engines (`RoutingEngine`, `VehicleSimulator`, `FieldReportService`) are bound to a thread-safe `ServiceContainer` singleton in `backend/dependencies.py`. This guarantees single-source-of-truth state synchronization across routes and avoids circular dependency deadlocks.
- **Cross-Origin Resource Sharing (CORS)**: Preconfigured with permissive headers (`allow_origins=["*"]`, `allow_methods=["*"]`, `allow_headers=["*"]`) to support LAN field deployments, local development servers, and isolated mobile Progressive Web Apps (PWAs).
- **Windows UTF-8 Encoding Safeguard**: Configures `sys.stdout` and `sys.stderr` with UTF-8 replacement logic upon boot to eliminate `charmap UnicodeEncodeError` exceptions across Windows PowerShell and Command Prompt terminals.
- **Automated OpenAPI / Swagger Documentation**: Serves interactive OpenAPI 3.0 documentation natively at `/docs` backed by schema metadata at `/openapi.json`.

### 2.2 Concurrent Background Telemetry & Convoy Tracking Pipeline (`backend/services/vehicle_simulator.py`)

A continuous background simulation daemon tracks essential commodity convoys moving along hazardous mountain routes:

- **AIS-140 GPS Convoy Simulation**: Interpolates vehicle position along real-world highway coordinates based on vehicle type (e.g., `TATA_1618_SE_COLD_CHAIN`), governed mountain speeds (20–45 km/h), and current road slope gradients.
- **Dynamic Ahead-Hazard Radar**: Scans upcoming route segments within a configurable lookahead window (15–40 km). When landslides, rockfalls, or flash floods trigger an impending blockage, the simulator updates `ahead_hazard_detected = True` and computes alternative detour corridors in real-time.
- **Sub-2ms In-Memory Telemetry Snapshots**: Caches live convoy coordinates, progress percentages, distance covered, and remaining ETA directly in memory to serve frontend polling cycles in under 2 milliseconds.

### 2.3 Sensor Ingestion & Geotechnical Pipelines (`backend/services/`)

All external data pipelines are fail-soft with automated fallbacks to ensure uninterrupted operation even during alpine telecom blackouts:

#### 1. Weather & Rainfall Pipeline (`weather_service.py` & `backend/routers/routes_corridors.py`)
- Queries `https://api.open-meteo.com/v1/forecast` for hourly precipitation (mm/24h), wind speed, and ambient temperature across key weather stations along Himalayan corridors (Guwahati, Tezpur, Bomdila, Sela Pass, Tawang, Dimapur, Kohima, Imphal, Siliguri, Gangtok, Shillong).
- Computes an environmental hazard factor ($F_{\text{weather}}$):
  $$\text{Weather Factor} = \min\left(1.0, \, \frac{\text{Rain mm}}{60.0} \times 0.70 + \text{Soil Saturation} \times 0.30\right)$$

#### 2. NASA SRTM 30m Elevation & Slope Pipeline (`risk_engine.py`)
- Ingests 30-meter Digital Elevation Model (DEM) data to calculate slope angles ($\theta$) and alpine elevations ($E$).
- **Slope Factor Formulation**: Non-linear escalation penalizing fragile cut-slopes $>25^\circ$:
  $$\text{Slope Factor} = \begin{cases} \frac{\theta}{40.0} & \theta \le 10^\circ \\ 0.25 + \frac{\theta - 10.0}{30.0} & 10^\circ < \theta \le 25^\circ \\ \min\left(1.0, \, 0.70 + \frac{\theta - 25.0}{20.0} \times 0.30\right) & \theta > 25^\circ \end{cases}$$
- **Alpine / Freezing Hazard Factor**: Scaled for high-altitude passes such as Sela Pass (3,733 m / 13,700 ft):
  $$\text{Alpine Factor} = \begin{cases} 0.10 & E < 1500\text{ m} \\ 0.30 + \frac{E - 1500.0}{3500.0} & 1500\text{ m} \le E < 2800\text{ m} \\ \min\left(1.0, \, 0.70 + \frac{E - 2800.0}{2000.0}\right) & E \ge 2800\text{ m} \end{cases}$$

#### 3. Geological Survey of India (GSI) Landslide Recurrence Pipeline
- Cross-references national landslide susceptibility inventories and historic slide recurrence records:
  $$\text{History Factor} = \min\left(1.0, \, \frac{\text{GSI Recorded Slides}}{10.0}\right)$$

#### 4. OSRM High-Resolution Highway Geometry Pipeline (`routing_engine.py`)
- Replaces coarse straight lines with real-world asphalt curvature polylines queried from OpenStreetMap OSRM (`router.project-osrm.org`).
- **Dual-Level Caching**:
  - *Tier A (Disk Cache)*: `cached_osrm_routes.json` stores verified driving polylines for all 4 primary strategic corridors (`CORRIDOR_NH13`, `CORRIDOR_NH13_BYPASS`, `CORRIDOR_NH29`, `CORRIDOR_NH10`, `CORRIDOR_NH6`).
  - *Tier B (In-Memory Micro-Cache)*: `_OSRM_GEOMETRY_CACHE` caches dynamic sub-segment geometries by waypoint hash.

#### 5. Haversine Field Snapping Pipeline (`field_report_service.py`)
- Receives geo-tagged mobile incident reports from BRO engineers and checkpost officials.
- Computes great-circle distances using the Haversine formula to snap raw GPS pins to the nearest road segment within a 15 km search radius:
  $$d = 2R \arcsin\left(\sqrt{\sin^2\left(\frac{\Delta \text{lat}}{2}\right) + \cos(\text{lat}_1)\cos(\text{lat}_2)\sin^2\left(\frac{\Delta \text{lon}}{2}\right)}\right)$$
- Automatically updates edge traversal impedance in the active NetworkX graph.

---

## 3. Frontend Architecture

### 3.1 Dedicated Workspace Switcher & Persona-Driven Interface

Rather than forcing all stakeholders into a single cluttered map screen, the application features a top-level **Workspace Switcher** (`App.jsx` + `Header.jsx`) providing 6 purpose-built operating environments:

1. 🛡️ **Regional Command HQ (`CommandHQ.jsx`)**: High-level situational awareness for MDoNER, State Disaster Management Authorities (SDMAs), and BRO Project Vartak/Sevak. Features the 8-state District Connectivity Matrix, pass condition monitors, heavy machinery status, and executive disaster briefs.
2. 🚚 **Logistics Dispatch Console (`LogisticsDispatch.jsx`)**: Built for Food Corporation of India (FCI), Health Department, and Indian Oil Corporation (IOCL) dispatchers. Features risk-penalized Dijkstra routing, side-by-side trade-off analysis, live convoy GPS telemetry tracking, and 1-click detour authorization.
3. 📍 **Field Operations PWA (`FieldOps.jsx`)**: A lightweight mobile-first interface for Border Roads Organisation (BRO) engineers and checkpost officers. Allows 30-second incident reporting with photos, GPS coordinate capture, offline queueing, and 1-click road reopening.
4. 🚛 **Distraction-Free Driver HUD (`DriverHUD.jsx`)**: High-contrast, mountain night-mode head-up display for civilian and military truck drivers. Shows ahead-hazard radar, distance countdowns to mountain passes, and an offline-cached 1-touch Emergency SOS button.
5. 🏥 **Public Accessibility Portal (`PublicPortal.jsx`)**: Non-technical portal for remote mountain civil hospitals (e.g., Tawang Civil Hospital) and local citizens. Displays plain-language corridor passability cards, arrival countdowns for life-saving cargo, and monsoon travel warnings.
6. 🧪 **Simulation Lab & Evaluator Bench (`SimulationLab.jsx`)**: Interactive testbed for hackathon evaluators. Allows synthetic injection of landslides and floods on any corridor segment, rainfall multiplier sweeps, and stress-testing reactive rerouting in real time.

### 3.2 Role-Isolated Shells & Viewport Specialization

- **Command & Logistics**: Receive high-density GIS map integration (`MapCanvas.jsx`) with multi-corridor filters, geotechnical drawers, and rainfall heat overlays.
- **Drivers & Citizens**: Receive stripped-down, ultra-fast interfaces optimized for low-bandwidth 2G/3G connections and high distraction avoidance during night mountain hauls.

### 3.3 State Management & Real-Time Sync (`App.jsx` & `services/api.js`)

The frontend coordinates state via a centralized reactive pattern:
- **Central Polling Loop**: Automatically polls active convoy telemetry every 4 seconds (`/api/vehicles/{id}/telemetry`).
- **Parallel Initial Hydration**: Dispatches parallel `Promise.all` requests on load to fetch corridor health, district statuses, segment risk scores, weather stations, field reports, and BRO machinery.
- **Optimistic UI Updates**: State mutations (such as marking an obstacle cleared or authorizing a detour) update local state immediately while background REST requests settle.

### 3.4 Modern Tactical & Disaster-Tech Design System

The platform adopts a high-contrast tactical operations aesthetic:
- **Dark Slate Backgrounds**: `#0f172a` (`slate-900`) and `#020617` (`slate-950`) providing high legibility in field environments and low eye fatigue during night operations.
- **Tactical Status Tokens**:
  - 🟢 **Optimal / Open**: Emerald `#10b981` (`emerald-500`)
  - 🟡 **Caution / Moderate**: Amber `#f59e0b` (`amber-500`)
  - 🔴 **Critical / Impassable**: Rose `#ef4444` (`rose-500`)
  - 🔵 **Strategic / Medical**: Sky `#0284c7` (`sky-500`)
- **Micro-Interactions**: Smooth CSS transitions, pulsing radar blips on active convoys, and responsive collapsible drawers.

### 3.5 Declarative Workspace Hierarchy & Routes

| Workspace ID | Component | Target Persona | Key Features |
|---|---|---|---|
| `command` | `CommandHQ.jsx` | MDoNER / SDMA / BRO Command | District Connectivity Matrix (8 states), Strategic Lifeline status, BRO 42 BRTF heavy machinery, Geotechnical Drawer. |
| `dispatch` | `LogisticsDispatch.jsx` | FCI / Health Logistics / Oil PSUs | Dijkstra routing with cargo multipliers, Side-by-side trade-off matrix, live convoy telemetry, reactive reroute authorization. |
| `field` | `FieldOps.jsx` | BRO Junior Engineers / Police | 30-second mobile report logger, photo uploads, Haversine edge snapping, 1-click obstacle resolution & road reopening. |
| `driver` | `DriverHUD.jsx` | Mountain Convoy Drivers | High-contrast night HUD, giant digital speedometer, ahead-hazard radar, next staging milestone countdown, offline SOS. |
| `public` | `PublicPortal.jsx` | Remote Hospitals & Citizens | Plain-language corridor passability, medical/food supply inflow countdown, monsoon travel advisories. |
| `sim` | `SimulationLab.jsx` | SIH Evaluators / Stress Testers | Synthetic obstacle injection, rainfall intensity multipliers (0.1x to 3.0x), real-time reactive reroute verification. |

### 3.6 3-Tier Spatial Query & Chokepoint Resolution Engine

The search and spatial filter system operates on a 3-tier hierarchy:
- **Tier 1 (Chokepoint & Segment Level)**: Precise matching of hazardous defiles (e.g., Sessa Scree Belt, Paglapahar Gorge, Teesta Bazaar, Sonapur Mudflow Tunnel).
- **Tier 2 (Corridor Level)**: Quick-switching across strategic lifelines (NH-13 Western Arunachal, NH-29 Nagaland-Manipur, NH-10 Sikkim, NH-6 Meghalaya-Tripura).
- **Tier 3 (Regional / State Level)**: Macro overview filtering across all 8 North Eastern states (Arunachal Pradesh, Assam, Nagaland, Manipur, Sikkim, Meghalaya, Tripura, Mizoram).

### 3.7 Interactive GIS Leaflet Canvas Architecture (`MapCanvas.jsx`)

The GIS visualization engine renders complex mountain geography with high visual fidelity:
- **Curved Polyline Geometries**: Renders high-resolution road centerlines following true mountain contours.
- **Dynamic Risk Coloring**: Corridors are split into sub-segments color-coded by real-time risk scores (Green, Amber, Red).
- **Live Vehicle Markers**: Custom pulsing SVG vehicle pins with direction-aware headings and cargo priority badges.
- **Precipitation Radar Layer**: Visual precipitation badges indicating millimeter rainfall rates along the road network.

---

## 4. Data Provenance & Confidence Scoring (Tiers 1–4)

To ensure high credibility and transparency for disaster authorities and military logistics officers, all telemetry is categorized into four auditable Data Tiers:

| Data Tier | Category | Source Systems | Refresh Rate |
|---|---|---|---|
| **Tier 1** | Ground-Truth Telemetry | BRO Checkpost Logs, Police Wireless Despatches, AIS-140 GPS Sensors, Field Incident Reports | Sub-minute (real-time) |
| **Tier 2** | Calibrated Live Feeds | Open-Meteo Precipitation & Wind APIs, OSRM Highway Curvature Feeds | 60 seconds / on-demand |
| **Tier 3** | Algorithmic Fallback & Disruption Models | Historical rainfall multipliers, diurnal mountain speed curves, synthetic landslide simulations | Sub-millisecond |
| **Tier 4** | Statutory Baselines & Geospatial Catalogs | NASA SRTM 30m DEM, Geological Survey of India (GSI) Landslide Atlas, MDoNER Census Data | Periodic audit / Static baseline |

### Dynamic Confidence Score Formulation

For any evaluated route or corridor segment, the platform computes a verifiable **Data Confidence Score**:

$$\text{Confidence} = \min\left(98\%, \, \max\left(50\%, \, 55 + (W_{\text{live}} \times 15) + (T_{\text{live}} \times 15) + (O_{\text{live}} \times 10) + \min(\text{reports} \times 2, \, 8)\right)\right)$$

Where:
- $W_{\text{live}} \in \{0, 1\}$: Binary indicator for live Open-Meteo API weather connectivity.
- $T_{\text{live}} \in \{0, 1\}$: Binary indicator for live OSRM highway geometry validation.
- $O_{\text{live}} \in \{0, 1\}$: Binary indicator for official BRO checkpost verification.
- $\text{reports}$: Number of recent corroborating field reports recorded within the corridor sector.

---

## 5. Mathematical Models

### 5.1 Dynamic Geotechnical & Meteorological Composite Risk Engine

The composite risk score $\mathcal{R}(s) \in [0.0, 1.0]$ of a road segment $s$ is computed by synthesizing five distinct geotechnical and atmospheric hazard variables:

$$\mathcal{R}(s) = w_{\text{slope}} \cdot F_{\text{slope}} + w_{\text{gsi}} \cdot F_{\text{gsi}} + w_{\text{rain}} \cdot F_{\text{rain}} + w_{\text{alpine}} \cdot F_{\text{alpine}} + w_{\text{inc}} \cdot F_{\text{inc}}$$

#### Calibrated Parameter Weights for Fragile Himalayan Terrain:
- $w_{\text{slope}} = 0.30$ (Slope steepness $>25^\circ$ cut-slopes)
- $w_{\text{gsi}} = 0.25$ (Historical landslide recurrence from GSI)
- $w_{\text{rain}} = 0.25$ (24-hour antecedent rainfall saturation)
- $w_{\text{alpine}} = 0.10$ (Freezing fog, icing, and snowfall $>2,800\text{ m}$)
- $w_{\text{inc}} = 0.10$ (Active field incident reports / partial blockages)

#### Qualitative Risk Classification Tiers:
- 🟢 **LOW**: $\mathcal{R}(s) < 0.30$ (Normal mountain transit)
- 🟡 **MODERATE**: $0.30 \le \mathcal{R}(s) < 0.60$ (Caution advised; convoy speed restrictions)
- 🟠 **HIGH**: $0.60 \le \mathcal{R}(s) < 0.85$ (Hazardous sector; escort recommended)
- 🔴 **IMPASSABLE**: $\mathcal{R}(s) \ge 0.85$ or manual obstacle report (Segment blocked; diversion mandatory)

### 5.2 Risk-Penalized Dijkstra Traversal Cost with Cargo Multipliers

Standard Dijkstra algorithms minimize pure physical distance or uncongested travel time, routing heavy convoys directly into active landslide chutes. Our engine formulates edge traversal cost $\mathcal{C}(e)$ as a function of travel time $t(e)$ and exponential risk penalty scaled by **Cargo Criticality Multiplier** $\lambda_{\text{cargo}}$:

$$\mathcal{C}(e) = \begin{cases} 10^9 & \text{if } e \text{ is blocked or } \mathcal{R}(e) \ge 0.95 \\ t(e) & \text{if Mode} = \text{FASTEST} \\ t(e) \cdot \left(1.0 + \lambda_{\text{cargo}} \cdot \left(\mathcal{R}(e)\right)^{1.8}\right) & \text{if Mode} = \text{RISK\_AWARE} \end{cases}$$

#### Cargo Criticality Sensitivity Table ($\lambda_{\text{cargo}}$):

| Cargo Category | Multiplier ($\lambda_{\text{cargo}}$) | Typical Commodities | Operational Rationale |
|---|---|---|---|
| **CRITICAL_MEDICAL** | **4.0** | Cold-chain vaccines, blood plasma, neonatal oxygen | Zero tolerance for stranding; prioritize safe bypass over speed |
| **ESSENTIAL_FOOD** | **2.0** | PDS food grains, pulses, baby food formula | Balanced trade-off; avoid high-risk scree corridors |
| **FUEL_POL** | **1.8** | Petroleum, diesel, aviation turbine fuel tankers | Hazard volatility; prevent tanker rollover in landslide zones |
| **GENERAL** | **1.0** | Standard postal parcels & commercial merchandise | Baseline commercial logistics cost model |
| **CONSTRUCTION** | **0.8** | Cement, steel TMT bars, road gravel | Time/cost priority; resilient to mild weather delays |

### 5.3 Side-by-Side Trade-off Formulation

To empower logistics commanders to make informed dispatch decisions, the platform calculates both routes simultaneously and evaluates comparative trade-offs:

$$\Delta t = t_{\text{risk-aware}} - t_{\text{fastest}}, \quad \Delta t\% = \frac{\Delta t}{t_{\text{fastest}}} \times 100$$

$$\Delta \mathcal{R} = \mathcal{R}_{\text{fastest}} - \mathcal{R}_{\text{risk-aware}}, \quad \Delta \mathcal{R}\% = \frac{\Delta \mathcal{R}}{\mathcal{R}_{\text{fastest}}} \times 100$$

#### Automated Dispatch Recommendation Rules:
- **If $\Delta \mathcal{R} > 0.15$**: `RISK_AWARE_HIGHLY_RECOMMENDED`  
  *Rationale: The modest travel time increase delivers a massive reduction in cargo loss risk.*
- **If $0.05 < \Delta \mathcal{R} \le 0.15$**: `RISK_AWARE_RECOMMENDED`  
  *Rationale: Provides a tangible safety margin for sensitive cargo.*
- **If $\Delta \mathcal{R} \le 0.05$**: `FASTEST_ACCEPTABLE`  
  *Rationale: Both corridors exhibit low ambient risk; the shortest route is cleared for dispatch.*

### 5.4 District Connectivity & Lifeline Health Index

District connectivity health is assessed by evaluating the operational status of all incoming and outgoing primary arterial lifelines ($L_1, L_2, \dots, L_n$):

$$\text{Health}(D) = \begin{cases} \text{ACCESSIBLE} & \text{if } \forall L_i \in \text{Lifelines}(D), \, \text{Status}(L_i) = \text{OPEN} \\ \text{DEGRADED} & \text{if } \exists L_i \text{ BLOCKED, but } \exists \text{Alternative Bypass OPEN} \\ \text{CUT\_OFF} & \text{if } \forall L_i \in \text{Lifelines}(D), \, \text{Status}(L_i) = \text{BLOCKED} \end{cases}$$

When a frontier district (such as Tawang or Kohima) enters **DEGRADED** or **CUT_OFF** status, the system triggers automated alerts across Command HQ, recommends BRO asset deployment, and recalculates humanitarian supply delivery schedules.
