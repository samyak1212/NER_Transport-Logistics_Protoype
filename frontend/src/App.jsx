import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CommandHQ from './components/workspaces/CommandHQ';
import LogisticsDispatch from './components/workspaces/LogisticsDispatch';
import FieldOps from './components/workspaces/FieldOps';
import DriverHUD from './components/workspaces/DriverHUD';
import PublicPortal from './components/workspaces/PublicPortal';
import SimulationLab from './components/workspaces/SimulationLab';
import { 
  DEFAULT_NODES, 
  DEFAULT_SEGMENTS, 
  DEFAULT_WEATHER_STATIONS, 
  DEFAULT_CORRIDOR_HEALTH, 
  DEFAULT_DISTRICTS,
  REGISTERED_DRIVERS,
  ACTIVE_CONVOYS
} from './data/defaultData';
import { api } from './services/api';

export default function App() {
  const [activeWorkspace, setActiveWorkspace] = useState('command');
  const [selectedDriverId, setSelectedDriverId] = useState('DRV-014');
  const [corridorHealth, setCorridorHealth] = useState(DEFAULT_CORRIDOR_HEALTH);
  const [districts, setDistricts] = useState(DEFAULT_DISTRICTS);
  const [segments, setSegments] = useState(DEFAULT_SEGMENTS);
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [nodes, setNodes] = useState(DEFAULT_NODES);
  const [activeRoute, setActiveRoute] = useState(null);
  const [activeVehicle, setActiveVehicle] = useState(null);
  const [convoys, setConvoys] = useState(ACTIVE_CONVOYS);
  const [comparisonData, setComparisonData] = useState(null);
  const [reports, setReports] = useState([]);
  const [broMachinery, setBroMachinery] = useState([]);
  const [weatherData, setWeatherData] = useState(DEFAULT_WEATHER_STATIONS);
  const [executiveBrief, setExecutiveBrief] = useState(null);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);

  const currentDriver = REGISTERED_DRIVERS.find(d => d.id === selectedDriverId) || REGISTERED_DRIVERS[0];
  const targetVehicleId = currentDriver?.assigned_vehicle_id || 'MED_CONVOY_01';
  const currentVehicle = convoys.find(v => v.driver_id === selectedDriverId || v.id === targetVehicleId) || activeVehicle || convoys[0];

  // Initial Data Fetch
  const refreshAllData = async () => {
    try {
      const [cHealth, dists, segs, nds, reps, bro, wthr, brief, vTele, allV] = await Promise.all([
        api.getCorridorHealth().catch(() => null),
        api.getDistricts().catch(() => []),
        api.getSegments().catch(() => []),
        api.getNodes().catch(() => []),
        api.getFieldReports().catch(() => []),
        api.getBROMachinery().catch(() => []),
        api.getCorridorWeather().catch(() => []),
        api.getExecutiveBrief().catch(() => null),
        api.getVehicleTelemetry(targetVehicleId).catch(() => null),
        api.getAllVehicles().catch(() => [])
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
      if (allV && allV.length > 0) setConvoys(allV);

      // Preload baseline comparison metrics without forcing a turn-by-turn route on the map
      if (!comparisonData) {
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
      api.getVehicleTelemetry(targetVehicleId)
        .then(v => {
          if (v) {
            setActiveVehicle(v);
            setConvoys(prev => prev.map(c => c.id === targetVehicleId ? { ...c, ...v, lat: v.current_lat || c.lat, lon: v.current_lon || c.lon } : c));
          }
        })
        .catch(() => {});
    }, 4000);

    return () => clearInterval(interval);
  }, [selectedDriverId, targetVehicleId]);

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
      const updated = await api.advanceVehicle(targetVehicleId, stepPct);
      setActiveVehicle(updated);
      setConvoys(prev => prev.map(c => c.id === targetVehicleId ? { ...c, ...updated, lat: updated.current_lat || c.lat, lon: updated.current_lon || c.lon } : c));
    } catch (err) {
      console.error('Failed to advance vehicle:', err);
    }
  };

  const handlePauseVehicle = async () => {
    await api.pauseVehicle(targetVehicleId);
    const v = await api.getVehicleTelemetry(targetVehicleId);
    if (v) {
      setActiveVehicle(v);
      setConvoys(prev => prev.map(c => c.id === targetVehicleId ? { ...c, ...v } : c));
    }
  };

  const handleResumeVehicle = async () => {
    await api.resumeVehicle(targetVehicleId);
    const v = await api.getVehicleTelemetry(targetVehicleId);
    if (v) {
      setActiveVehicle(v);
      setConvoys(prev => prev.map(c => c.id === targetVehicleId ? { ...c, ...v } : c));
    }
  };

  const handleRerouteVehicle = async () => {
    try {
      const updated = await api.rerouteVehicle(targetVehicleId);
      setActiveVehicle(updated);
      setConvoys(prev => prev.map(c => c.id === targetVehicleId ? { ...c, ...updated, lat: updated.current_lat || c.lat, lon: updated.current_lon || c.lon } : c));
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

  const handleSelectDriver = (driverId) => {
    setSelectedDriverId(driverId);
    const drv = REGISTERED_DRIVERS.find(d => d.id === driverId);
    const vId = drv?.assigned_vehicle_id;
    const matched = convoys.find(v => v.driver_id === driverId || v.id === vId);
    if (matched) {
      setActiveVehicle(matched);
    }
  };

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
        {/* Role-Tailored Workspace Views */}
        <div className="transition-all">
          {activeWorkspace === 'command' && (
            <CommandHQ
              nodes={nodes}
              segments={segments}
              activeRoute={activeRoute}
              activeVehicle={currentVehicle}
              allConvoys={convoys}
              drivers={REGISTERED_DRIVERS}
              selectedDriverId={selectedDriverId}
              onSelectDriver={handleSelectDriver}
              reports={reports}
              selectedSegment={selectedSegment}
              onSelectSegment={(seg) => setSelectedSegment(seg)}
              corridorHealth={corridorHealth}
              districts={districts}
              broMachinery={broMachinery}
              weatherData={weatherData}
              executiveBrief={executiveBrief}
              onCalculateRoute={handleCalculateRoute}
            />
          )}

          {activeWorkspace === 'dispatch' && (
            <LogisticsDispatch
              nodes={nodes}
              segments={segments}
              activeRoute={activeRoute}
              activeVehicle={currentVehicle}
              currentDriver={currentDriver}
              drivers={REGISTERED_DRIVERS}
              selectedDriverId={selectedDriverId}
              onSelectDriver={handleSelectDriver}
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
              segments={segments}
              selectedCoordinates={selectedCoordinates}
              onReportSubmitted={refreshAllData}
              onReportResolved={handleReportResolved}
            />
          )}

          {activeWorkspace === 'driver' && (
            <DriverHUD 
              activeVehicle={currentVehicle}
              currentDriver={currentDriver}
              drivers={REGISTERED_DRIVERS}
              selectedDriverId={selectedDriverId}
              onSelectDriver={handleSelectDriver}
              onRerouteVehicle={handleRerouteVehicle}
            />
          )}

          {activeWorkspace === 'public' && (
            <PublicPortal 
              activeVehicle={currentVehicle}
              currentDriver={currentDriver}
              allConvoys={convoys}
              weatherData={weatherData}
            />
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
