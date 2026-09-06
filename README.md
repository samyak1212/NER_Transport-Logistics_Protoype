# 🏔️ AI-Based Smart Logistics & Accessibility Intelligence Platform for North Eastern Region (NER)
### Smart India Hackathon (SIH) | Problem Statement ID: 26002
**Target Ministry:** Ministry of Development of North Eastern Region (MDoNER)

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=flat&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/Frontend-React_19_+_Vite-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/GIS-Leaflet-199900?style=flat&logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 📌 1. Project Overview & Problem Statement

The **North Eastern Region (NER)** of India—comprising 8 states connected to mainland India via the narrow 22-kilometer Siliguri Corridor ("Chicken's Neck")—faces severe logistical and accessibility bottlenecks:
- **Steep Himalayan slopes (>35° to 60°)**, young fragile sedimentary rock formations, and Seismic Zone V tectonic instability.
- **Extreme monsoon rainfall (2,500 mm to 11,000 mm)** triggering sudden landslides, mudflows, and river washouts.
- **Pervasive telecom dead-zones (>65% of mountain highway corridors)** where mainstream navigation systems (Google Maps, Waze) freeze and fail.
- **Single-artery vulnerabilities**: When vital highways like **NH-13 (Trans-Arunachal)** or **NH-29 (Dimapur–Kohima)** are blocked, isolated frontier districts like **Tawang** suffer critical shortages of lifesaving medicines, vaccines, food grains (PDS), and fuel.

This platform bridges this critical national infrastructure gap. By synthesizing **NASA SRTM 30m Digital Elevation Models (DEM)**, **Geological Survey of India (GSI) historical landslide catalogs**, **live weather & precipitation APIs (Open-Meteo)**, and **real-time field incident telemetry**, it creates India's first **geologically grounded, risk-weighted, disruption-predictive logistics intelligence and accessibility management system**.

---

## 📚 2. Complete Project Documentation Index

All deep architectural research, statutory audits, and mathematical formulations are organized inside the [`docs/`](./docs) directory:

| Document | Description |
|---|---|
| 📄 [**PROBLEM_STATEMENT.md**](./docs/PROBLEM_STATEMENT.md) | Official SIH Problem Statement 26002 specifications and statutory requirements from MDoNER. |
| 📊 [**SIH_PROBLEM_STATEMENT_GAP_ANALYSIS.md**](./docs/SIH_PROBLEM_STATEMENT_GAP_ANALYSIS.md) | Comprehensive engineering audit and statutory compliance matrix against Clauses (a) through (h). |
| 👥 [**PROTOTYPE_CORE_STAKEHOLDERS_AND_FLOWS.md**](./docs/PROTOTYPE_CORE_STAKEHOLDERS_AND_FLOWS.md) | Persona-driven user journeys, UI wireframe blueprints, and operational workflows for all 6 stakeholder groups. |
| 🔬 [**COMPREHENSIVE_PS_STAKEHOLDER_USP_ANALYSIS.md**](./docs/COMPREHENSIVE_PS_STAKEHOLDER_USP_ANALYSIS.md) | Exhaustive 840-line theoretical blueprint, 80-item requirements catalog, competitive analysis, and mathematical formulations. |

---

## 👥 3. Multi-Stakeholder Persona Architecture

Rather than overwhelming users with a single cluttered screen, the platform features a modern, role-tailored workspace switcher:

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│  [MDoNER LOGISTICS]   🛡️ Command HQ   🚚 Logistics Dispatch   📍 Field Ops   🚛 Driver HUD   🏥 Public   🧪 Lab │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

1. 🛡️ **Regional Command HQ (MDoNER / SDMA / BRO Project Vartak)**:
   - **District Connectivity & Isolation Status Matrix** across all 8 North Eastern states (Accessible 🟢, Degraded 🟡, Cut-Off 🔴).
   - Executive KPI ribbon tracking active lifeline health, pass conditions (e.g. Sela Pass at 13,700 ft), and forecasted rainfall.
   - Geotechnical Segment Inspector drawer (NASA SRTM slope gradient, true elevation profile, GSI landslide history).
   - BRO 42 BRTF heavy clearance machinery status (Bulldozers/Excavators ready for deployment).

2. 🚚 **Logistics Dispatchers (FCI, Health Dept, Oil PSUs)**:
   - **Cargo-Priority Routing**: Dynamic Dijkstra pathfinding with cargo sensitivity multipliers ($\lambda_{\text{cargo}} = 4.0$ for Cold-Chain Medical, $\lambda = 2.0$ for Food Grains).
   - **Side-by-Side Trade-off Matrix**: Compares Fastest vs. Risk-Aware routes (quantifying $+ \Delta t$ travel time vs. $- \Delta \mathcal{R}$ landslide risk reduction).
   - **Real-Time Convoy Tracking**: Live simulated vehicle telemetry (Speed, Progress %, ETA countdown).
   - **Automated Disruption Rerouting**: Instant detection when an active vehicle encounters a new obstacle with 1-click detour authorization.

3. 📍 **On-Ground Field Operations (BRO Engineers / Police Checkposts)**:
   - **30-Second Mobile Incident Logger**: Map-click or auto-GPS coordinate capture, hazard categories (Landslide, Flash Flood, Road Blockage, Bridge Damaged), and severity ratings.
   - **Photo Attachment Support**: Capture and upload geo-tagged hazard site photographs.
   - **Automatic Highway Snapping**: Haversine snapping of field reports to nearest OSM highway edge within 1 km.
   - **Offline-First Synchronization**: Queues reports in browser LocalStorage/IndexedDB with automatic syncing upon signal recovery.
   - **1-Click Road Reopening**: Field engineers can mark obstacles cleared, immediately restoring the graph edge.

4. 🚛 **Convoy Drivers (Truck Unions / Commercial Drivers)**:
   - **Distraction-Free Driver HUD**: Ultra-high-contrast mountain night mode, giant digital speedometer, and route progress gauge.
   - **Ahead-Hazard Radar**: Visual safety status for upcoming road stretches (`Next 18 km: CLEAR 🟢`).
   - **Milestone Countdown**: Distance and ETA to next safe staging point (e.g., *Approaching Sela Pass: 14 km*).
   - **1-Touch Emergency SOS**: Instant offline-cached distress broadcast.

5. 🏥 **Remote Communities & District Hospitals (Tawang Civil Hospital / Citizens)**:
   - **Plain-Language Passability Cards**: Non-technical corridor statuses (*Guwahati &rarr; Tezpur: OPEN*, *Bhalukpong &rarr; Bomdila: CAUTION*).
   - **Essential Supply Inflow Radar**: Real-time arrival tracking for incoming oxygen, vaccines, and ration trucks.
   - **Monsoon Travel Advisories**: Weather alerts and night-travel warnings in plain language.

6. 🧪 **Simulation Lab & Evaluator Bench (SIH Hackathon Jury)**:
   - **Live Obstacle Injection**: Inject synthetic landslides, floods, or treefalls on any corridor segment.
   - **Real-Time Reactive Rerouting**: Stress-test the automated disruption engine and watch active convoys dynamically divert.
   - **Historical Weather Date Selector**: Slide through rainfall events to observe dynamic terrain risk recalculation.
   - **1-Click Baseline Reset**: Instantly restore the system to pristine default demonstration state.

---

## ⚙️ 4. System Architecture & Tech Stack

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                                   PLATFORM ARCHITECTURE                                  │
├──────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                          │
│  [ Modern React 19 Frontend (Vite + TailwindCSS + Lucide Icons + Leaflet GIS) ]           │
│       │               │                   │                  │                │          │
│   Command HQ    Logistics Dispatch    Field Ops PWA     Driver HUD      Simulation Lab   │
│       │               │                   │                  │                │          │
│  ═════╪═══════════════╪═══════════════════╪══════════════════╪════════════════╪════════  │
│       │               │                   │                  │                │          │
│       ▼               ▼                   ▼                  ▼                ▼          │
│  [ High-Performance FastAPI Python Backend (Python 3.13) ]                                │
│       │                                   │                                              │
│       ├── NetworkX Routing Engine         ├── Dynamic Risk & Disruption Engine           │
│       │   (Risk-Penalized Dijkstra)       │   (Slope + Elevation + Rain + GSI Slides)    │
│       │                                   │                                              │
│       ├── Convoy Simulation Telemetry     ├── Field Snapping & Incident Lifecycle        │
│       │   (Progress, Speed, AIS-140)      │   (Haversine snapped to road segments)       │
│       │                                   │                                              │
│       └── External API Connectors         └── In-Memory High-Speed Cache + SQLite        │
│           (Open-Meteo & Carto Basemaps)                                                  │
└──────────────────────────────────────────────────────────────────────────────────────────┘
```

- **Backend:** Python 3.13 + FastAPI + Pydantic + NetworkX + NumPy + Uvicorn.
- **Frontend:** React 19 + Vite + TailwindCSS + Leaflet + React-Leaflet + Lucide-React.
- **Basemaps & GIS:** CartoDB Dark Matter / Positron & OpenStreetMap vector tiles.

---

## 🌐 5. Free API Integration Guide (Zero Credit Card Required)

This platform is intentionally engineered to rely on **100% free, open-source APIs**:

| Service | Provider | Endpoint & URL | Cost / Key Requirements |
|---|---|---|---|
| **Weather & Rain** | **Open-Meteo** | `https://api.open-meteo.com/v1/forecast` | **100% FREE** for non-commercial & hackathon use. **ZERO API key or credit card needed!** |
| **Elevation & Slope** | **Open-Meteo Elevation** | `https://api.open-meteo.com/v1/elevation` | **100% FREE**, zero API key required. |
| **GIS Basemaps** | **CartoDB & OSM** | `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png` | **100% FREE** open-source map tile server. |
| **Geocoding** | **Nominatim OSM** | `https://nominatim.openstreetmap.org/search` | **100% FREE** open reverse geocoder. |
| **AI Assistant (Optional)**| **Google Gemini API** | `gemini-1.5-flash` | **Generous FREE tier** (15 RPM). Get your key at [Google AI Studio](https://aistudio.google.com/) in 30 seconds. |

Configuration is managed via `.env` (template in `.env.example`).

---

## 🚀 6. Step-by-Step Project Quickstart Guide

### Prerequisites
- **Python 3.10+** (Tested on Python 3.13)
- **Node.js 18+** and **npm** (Tested on Node v22)
- **Git**

### Step 1: Clone Repository & Configure Environment
```bash
# Clone the repository
git clone <repository-url>
cd North_India_Transport&Logistic_proto

# Create .env from template
cp .env.example .env
```

### Step 2: Start the Python Backend
```bash
# Navigate to backend directory
cd backend

# Create and activate Python virtual environment
python -m venv .venv

# On Windows:
.venv\Scripts\activate
# On Linux/macOS:
# source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI server
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```
*The interactive API documentation (Swagger) will be available at:* **`http://127.0.0.1:8000/docs`**

### Step 3: Start the React Frontend
Open a new terminal window:
```bash
# Navigate to frontend directory
cd frontend

# Install node dependencies
npm install

# Start Vite development server
npm run dev
```
*The modern web application will be accessible at:* **`http://localhost:5173`**

---

## 🧪 7. 5-Minute Evaluator Walkthrough Script

For Smart India Hackathon evaluators and reviewers:

1. **Open Command HQ (`http://localhost:5173`)**:
   - Observe the **District Isolation Matrix** (8 NER states).
   - Check the **Western Strategic Lifeline (NH-13)** connecting Guwahati to Tawang.
   - Click on any red road segment to inspect its **Geotechnical Profile** (Slope, Elevation, Landslide History).

2. **Open Logistics Dispatch**:
   - Choose `Origin: Guwahati Central Depot` and `Destination: Tawang Civil Hospital`.
   - Select `Cargo Priority: Critical Medical (Cold-Chain)`.
   - Click **Calculate Route** and review the **Side-by-Side Trade-off**: notice how the risk-aware engine selects a safer route with minimal hazard exposure.
   - Click **Dispatch Monitored Convoy** to initiate real-time GPS telemetry tracking.

3. **Open Simulation Lab (Evaluator Stress Test)**:
   - Select a road segment near Sela Pass / Bhalukpong.
   - Click **Inject Major Landslide Hazard**.
   - Return to **Logistics Dispatch**: see the automated disruption engine immediately trigger an on-screen alert: `REROUTE RECOMMENDED`. Click **Authorize Detour** to watch the vehicle seamlessly divert onto the safe bypass.

4. **Open Field Ops**:
   - Click on the map to pick incident coordinates near Bomdila.
   - Select `Category: Flash Flood`, `Severity: Total Blockage`, attach a test image, and submit.
   - Verify that the report is snapped to the nearest road segment and displayed in the alert feed.
   - Click **Mark Cleared / Reopen Road** to verify instant edge restoration.

5. **Open Driver HUD & Public Portal**:
   - View the distraction-free Driver HUD with ahead-radar and emergency SOS.
   - View the Public Portal displaying plain-language passability and hospital supply arrival countdowns.

---

## 📜 8. License & Attribution
Developed for **Smart India Hackathon 2024 / 2026** under the auspices of the **Ministry of Development of North Eastern Region (MDoNER)**.
Data sources: OpenStreetMap contributors, NASA SRTM DEM, Geological Survey of India, India Meteorological Department, Open-Meteo.
