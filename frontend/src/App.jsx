import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MapCanvas from './components/MapCanvas';
import GeotechnicalDrawer from './components/GeotechnicalDrawer';
import CommandHQ from './components/workspaces/CommandHQ';
import LogisticsDispatch from './components/workspaces/LogisticsDispatch';
import FieldOps from './components/workspaces/FieldOps';
import DriverHUD from './components/workspaces/DriverHUD';
import PublicPortal from './components/workspaces/PublicPortal';
import SimulationLab from './components/workspaces/SimulationLab';
import LandslideRainfallPanel from './components/LandslideRainfallPanel';
import { 
  DEFAULT_NODES, 
  DEFAULT_SEGMENTS, 
  DEFAULT_WEATHER_STATIONS, 
  DEFAULT_CORRIDOR_HEALTH, 
  DEFAULT_DISTRICTS 
} from './data/defaultData';
import { api } from './services/api';

export default function App() {
  const [activeWorkspace, setActiveWorkspace] = useState('command');
  const [corridorHealth, setCorridorHealth] = useState(DEFAULT_CORRIDOR_HEALTH);
  const [districts, setDistricts] = useState(DEFAULT_DISTRICTS);
  const [segments, setSegments] = useState(DEFAULT_SEGMENTS);
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [nodes, setNodes] = useState(DEFAULT_NODES);
  const [activeRoute, setActiveRoute] = useState(null);
  const [activeVehicle, setActiveVehicle] = useState(null);
  const [comparisonData, setComparisonData] = useState(null);
  const [reports, setReports] = useState([]);
  const [broMachinery, setBroMachinery] = useState([]);
  const [weatherData, setWeatherData] = useState(DEFAULT_WEATHER_STATIONS);
  const [executiveBrief, setExecutiveBrief] = useState(null);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);

  // Initial Data Fetch
  const refreshAllData = async () => {
    try {
      const [cHealth, dists, segs, nds, reps, bro, wthr, brief, vTele] = await Promise.all([
        api.getCorridorHealth().catch(() => null),
        api.getDistricts().catch(() => []),
        api.getSegments().catch(() => []),
        api.getNodes().catch(() => []),
        api.getFieldReports().catch(() => []),
        api.getBROMachinery().catch(() => []),
        api.getCorridorWeather().catch(() => []),
        api.getExecutiveBrief().catch(() => null),
        api.getVehicleTelemetry().catch(() => null)
      ]);

      if (cHealth) setCorridorHealth(cHealth);
      if (dists) setDistricts(dists);
      if (segs) setSegments(segs);
      if (nds) setNodes(nds);
      if (reps) setReports(reps);
      if (bro) setBroMachinery(bro);
      if (wthr) setWeatherData(wthr);
      if (brief) setExecutiveBrief(brief);
      if (vTele) setActiveVehicle(vTele);

      // Default route calculation if none active
      if (!activeRoute) {
        api.calculateRoute('Guwahati', 'Tawang', 'CRITICAL_MEDICAL', 'RISK_AWARE')
          .then(res => setActiveRoute(res))
          .catch(() => {});
        api.compareRoutes('Guwahati', 'Tawang', 'CRITICAL_MEDICAL')
          .then(comp => setComparisonData(comp))
          .catch(() => {});
      }
    } catch (err) {
      console.error('Error refreshing platform data:', err);
    }
  };

  useEffect(() => {
    refreshAllData();

    // Telemetry polling interval (every 4 seconds)
    const interval = setInterval(() => {
      api.getVehicleTelemetry('MED_CONVOY_01')
        .then(v => setActiveVehicle(v))
        .catch(() => {});
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Handlers
  const handleCalculateRoute = async (origin, dest, cargo) => {
    setIsLoadingRoute(true);
    try {
      const [routeRes, compRes] = await Promise.all([
        api.calculateRoute(origin, dest, cargo, 'RISK_AWARE'),
        api.compareRoutes(origin, dest, cargo)
      ]);
      setActiveRoute(routeRes);
      setComparisonData(compRes);
    } catch (err) {
      console.error('Routing failed:', err);
    } finally {
      setIsLoadingRoute(false);
    }
  };

  const handleAdvanceVehicle = async (stepPct = 4.0) => {
    try {
      const updated = await api.advanceVehicle('MED_CONVOY_01', stepPct);
      setActiveVehicle(updated);
    } catch (err) {
      console.error('Failed to advance vehicle:', err);
    }
  };

  const handlePauseVehicle = async () => {
    await api.pauseVehicle('MED_CONVOY_01');
    const v = await api.getVehicleTelemetry('MED_CONVOY_01');
    setActiveVehicle(v);
  };

  const handleResumeVehicle = async () => {
    await api.resumeVehicle('MED_CONVOY_01');
    const v = await api.getVehicleTelemetry('MED_CONVOY_01');
    setActiveVehicle(v);
  };

  const handleRerouteVehicle = async () => {
    try {
      const updated = await api.rerouteVehicle('MED_CONVOY_01');
      setActiveVehicle(updated);
      refreshAllData();
    } catch (err) {
      console.error('Reroute failed:', err);
    }
  };

  const handleReportResolved = async (reportId) => {
    try {
      await api.resolveFieldReport(reportId);
      refreshAllData();
    } catch (err) {
      console.error('Resolve failed:', err);
    }
  };

  const activeAlertsCount = reports.filter(r => !r.is_resolved).length;

  return (
    <div className="min-h-screen bg-defense-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        activeWorkspace={activeWorkspace}
        setActiveWorkspace={setActiveWorkspace}
        activeAlertsCount={activeAlertsCount}
      />

      {/* Main Content Layout */}
      <main className="flex-1 p-3 md:p-4 max-w-[1700px] w-full mx-auto space-y-4">
        {/* Top Split: Map Canvas & Geotechnical Inspector Drawer */}
        <div className="relative w-full h-[450px] md:h-[500px] flex rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
          <div className="flex-1 h-full">
            <MapCanvas
              nodes={nodes}
              segments={segments}
              activeRoute={activeRoute}
              activeVehicle={activeVehicle}
              reports={reports}
              selectedSegment={selectedSegment}
              onSelectSegment={(seg) => setSelectedSegment(seg)}
            />
          </div>

          {/* Drawer appears when a road segment is clicked */}
          {selectedSegment && (
            <div className="absolute top-0 right-0 h-full z-[1100]">
              <GeotechnicalDrawer
                segment={selectedSegment}
                onClose={() => setSelectedSegment(null)}
              />
            </div>
          )}
        </div>

        {/* Real-Time Disruption Prediction, Rainfall & Lifeline Corridors (SIH Clauses b & c) */}
        <LandslideRainfallPanel
          weatherData={weatherData}
          onSelectZone={(zone) => {
            const match = segments.find(s => s.id === zone.id || s.name.toLowerCase().includes(zone.name.split(' ')[0].toLowerCase()));
            if (match) setSelectedSegment(match);
          }}
          onSelectRoute={(routeType) => {
            if (routeType === 'bypass') {
              handleCalculateRoute('Guwahati', 'Tawang', 'CRITICAL_MEDICAL');
            }
          }}
        />

        {/* Lower Split: Role-Tailored Workspace Views */}
        <div className="transition-all">
          {activeWorkspace === 'command' && (
            <CommandHQ
              corridorHealth={corridorHealth}
              districts={districts}
              broMachinery={broMachinery}
              weatherData={weatherData}
              executiveBrief={executiveBrief}
              onSelectSegment={(seg) => setSelectedSegment(seg)}
            />
          )}

          {activeWorkspace === 'dispatch' && (
            <LogisticsDispatch
              nodes={nodes}
              activeVehicle={activeVehicle}
              comparisonData={comparisonData}
              onCalculateRoute={handleCalculateRoute}
              onAdvanceVehicle={handleAdvanceVehicle}
              onPauseVehicle={handlePauseVehicle}
              onResumeVehicle={handleResumeVehicle}
              onRerouteVehicle={handleRerouteVehicle}
              isLoadingRoute={isLoadingRoute}
            />
          )}

          {activeWorkspace === 'field' && (
            <FieldOps
              reports={reports}
              selectedCoordinates={selectedCoordinates}
              onReportSubmitted={refreshAllData}
              onReportResolved={handleReportResolved}
            />
          )}

          {activeWorkspace === 'driver' && (
            <DriverHUD activeVehicle={activeVehicle} />
          )}

          {activeWorkspace === 'public' && (
            <PublicPortal activeVehicle={activeVehicle} />
          )}

          {activeWorkspace === 'lab' && (
            <SimulationLab
              segments={segments}
              onHazardInjected={refreshAllData}
              onWeatherChanged={refreshAllData}
              onResetComplete={refreshAllData}
            />
          )}
        </div>
      </main>
    </div>
  );
}
