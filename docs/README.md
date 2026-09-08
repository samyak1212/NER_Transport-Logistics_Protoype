# 📚 NER Logistics Intelligence Platform — Documentation Suite

### Smart India Hackathon (SIH) | Problem Statement ID: 26002
**Target Ministry:** Ministry of Development of North Eastern Region (MDoNER)

Welcome to the centralized documentation repository for the **AI-Based Smart Logistics & Accessibility Intelligence Platform for North Eastern Region (NER)**. This directory contains complete architectural blueprints, technical design specifications, mathematical models, statutory compliance audits, and visual workflow diagrams powering the platform.

---

## 📑 Complete Documentation Directory Index

| Document | Primary Focus | Key Contents |
|---|---|---|
| 🏗️ [**SYSTEM_ARCHITECTURE.md**](./SYSTEM_ARCHITECTURE.md) | **Technical Design & System Architecture** | High-level system architecture, FastAPI Python 3.13 backend, ServiceContainer singleton, Open-Meteo & NASA SRTM pipelines, 6 React 19 workspaces, 4-tier data provenance, and dynamic mathematical formulas. |
| 📊 [**ARCHITECTURE_AND_WORKFLOW_DIAGRAMS.md**](./ARCHITECTURE_AND_WORKFLOW_DIAGRAMS.md) | **Visual Flowcharts & Workflow Reference** | 7 comprehensive Mermaid architecture and workflow diagrams (End-to-end data flow, workspace isolation, API caching, risk engine, Dijkstra cargo multipliers, convoy rerouting, and offline field reporting). |
| 📋 [**PROBLEM_STATEMENT.md**](./PROBLEM_STATEMENT.md) | **Official Statutory Specifications** | Immutable baseline of SIH Problem Statement 26002 from MDoNER covering Clauses (a) through (h). |
| 🔍 [**SIH_PROBLEM_STATEMENT_GAP_ANALYSIS.md**](./SIH_PROBLEM_STATEMENT_GAP_ANALYSIS.md) | **Statutory Compliance & Engineering Audit** | Clause-by-clause implementation matrix validating all 8 requirements against codebase artifacts. |
| 👥 [**PROTOTYPE_CORE_STAKEHOLDERS_AND_FLOWS.md**](./PROTOTYPE_CORE_STAKEHOLDERS_AND_FLOWS.md) | **Persona User Journeys & Wireframes** | Detailed operational walkthroughs and UI blueprints for Disaster Command, Logistics Dispatchers, BRO Field Engineers, Drivers, and Citizens. |
| 🔬 [**COMPREHENSIVE_PS_STAKEHOLDER_USP_ANALYSIS.md**](./COMPREHENSIVE_PS_STAKEHOLDER_USP_ANALYSIS.md) | **Theoretical Research & Benchmark Analysis** | 80-item requirements catalog, competitive analysis against mainstream navigation apps, and geotechnical risk formulations. |

---

## 🏛️ Architectural Overview at a Glance

### 1. Multi-Stakeholder Persona Architecture
The platform eliminates monolithic UI clutter by providing 6 dedicated workspaces accessible via the top-level workspace switcher:
- 🛡️ **Regional Command HQ (`CommandHQ.jsx`)**: Real-time 8-state District Connectivity Matrix, BRO heavy machinery tracker, and geotechnical segment inspection.
- 🚚 **Logistics Dispatch Console (`LogisticsDispatch.jsx`)**: Risk-penalized Dijkstra routing with cargo criticality multipliers, side-by-side trade-off analysis, and live GPS convoy tracking.
- 📍 **Field Operations PWA (`FieldOps.jsx`)**: 30-second mobile incident logger, photo uploads, Haversine highway snapping, and 1-click road reopening.
- 🚛 **Distraction-Free Driver HUD (`DriverHUD.jsx`)**: Mountain night-mode HUD, giant digital speedometer, ahead-hazard lookahead radar, and offline-cached SOS distress beacon.
- 🏥 **Public Accessibility Portal (`PublicPortal.jsx`)**: Plain-language corridor passability cards, essential medical/food inflow tracking, and monsoon travel warnings.
- 🧪 **Simulation Lab & Evaluator Bench (`SimulationLab.jsx`)**: Synthetic obstacle injection, rainfall multiplier sliders, and real-time reactive detour stress-testing.

### 2. Core Mathematical Formulations
- **Dynamic Geotechnical & Meteorological Risk Score**:
  $$\mathcal{R}(s) = 0.30 F_{\text{slope}} + 0.25 F_{\text{gsi}} + 0.25 F_{\text{rain}} + 0.10 F_{\text{alpine}} + 0.10 F_{\text{inc}}$$
- **Risk-Penalized Traversal Cost with Cargo Multipliers ($\lambda_{\text{cargo}}$)**:
  $$\mathcal{C}(e) = t(e) \cdot \left(1.0 + \lambda_{\text{cargo}} \cdot \left(\mathcal{R}(e)\right)^{1.8}\right)$$
  *(Where $\lambda = 4.0$ for Critical Medical Cold-Chain, $\lambda = 2.0$ for Food Grains, $\lambda = 1.8$ for Fuel/POL)*
- **Data Confidence Scoring Formulation**:
  $$\text{Confidence} = \min\left(98\%, \, \max\left(50\%, \, 55 + (W_{\text{live}} \times 15) + (T_{\text{live}} \times 15) + (O_{\text{live}} \times 10) + \min(\text{reports} \times 2, \, 8)\right)\right)$$

### 3. Four-Tier Data Provenance Model
1. **Tier 1 (Ground-Truth Telemetry)**: BRO Checkpost Logs, Police Wireless Despatches, AIS-140 GPS Sensors (Sub-minute refresh).
2. **Tier 2 (Calibrated Live Feeds)**: Open-Meteo Weather APIs, OSRM Highway Curvature Feeds (60s refresh).
3. **Tier 3 (Algorithmic Disruption Fallback)**: Diurnal mountain speed models, rainfall scaling heuristics (Sub-millisecond).
4. **Tier 4 (Statutory Baselines)**: NASA SRTM 30m DEM, Geological Survey of India Landslide Atlas (Periodic audit).

---

## 🚀 Quick Reference: Accessing Documentation

- For deep system architecture, backend multithreading, and equation derivations &rarr; read [**SYSTEM_ARCHITECTURE.md**](./SYSTEM_ARCHITECTURE.md)
- For visual Mermaid flowcharts of platform data flow, caching, and convoy rerouting &rarr; read [**ARCHITECTURE_AND_WORKFLOW_DIAGRAMS.md**](./ARCHITECTURE_AND_WORKFLOW_DIAGRAMS.md)
- For hackathon problem statement requirements and statutory mapping &rarr; read [**PROBLEM_STATEMENT.md**](./PROBLEM_STATEMENT.md) and [**SIH_PROBLEM_STATEMENT_GAP_ANALYSIS.md**](./SIH_PROBLEM_STATEMENT_GAP_ANALYSIS.md)
