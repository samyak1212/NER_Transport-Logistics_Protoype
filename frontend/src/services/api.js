/**
 * API Client with Offline Queue and Fallback Support.
 */
import {
  ARMY_EMERGENCY_RESOURCES,
  REGIONAL_HAZARD_INTELLIGENCE,
  ROADWORKS_AND_CONNECTIVITY,
  MULTIMODAL_LOGISTICS,
  FUEL_AND_ENERGY_RESERVES,
} from '../data/defaultData';

const API_BASE = import.meta.env.VITE_API_BASE_URL ? import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '') : '/api';

export const getMediaUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('blob:') || path.startsWith('data:')) {
    return path;
  }
  const base = import.meta.env.VITE_API_BASE_URL ? import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '') : '';
  return `${base}${path.startsWith('/') ? '' : '/'}${path}`;
};

export const api = {
  // --- Corridors & Geotechnical ---
  async getCorridorHealth() {
    const res = await fetch(`${API_BASE}/corridors/health`);
    if (!res.ok) throw new Error('Failed to fetch corridor health');
    return res.json();
  },

  async getDistricts() {
    const res = await fetch(`${API_BASE}/corridors/districts`);
    if (!res.ok) throw new Error('Failed to fetch districts matrix');
    return res.json();
  },

  async getSegments() {
    const res = await fetch(`${API_BASE}/corridors/segments`);
    if (!res.ok) throw new Error('Failed to fetch segments');
    return res.json();
  },

  async getSegmentDetail(id) {
    const res = await fetch(`${API_BASE}/corridors/segments/${id}`);
    if (!res.ok) throw new Error('Failed to fetch segment details');
    return res.json();
  },

  async getBROMachinery() {
    const res = await fetch(`${API_BASE}/corridors/bro-machinery`);
    if (!res.ok) throw new Error('Failed to fetch BRO machinery status');
    return res.json();
  },

  async getEmergencyResources() {
    try {
      const res = await fetch(`${API_BASE}/corridors/emergency-resources`);
      if (res.ok) return await res.json();
    } catch (_) {}
    return ARMY_EMERGENCY_RESOURCES;
  },

  async getRegionalHazards() {
    try {
      const res = await fetch(`${API_BASE}/corridors/regional-hazards`);
      if (res.ok) return await res.json();
    } catch (_) {}
    return REGIONAL_HAZARD_INTELLIGENCE;
  },

  async getRoadworksAndConnectivity() {
    try {
      const res = await fetch(`${API_BASE}/corridors/roadworks-connectivity`);
      if (res.ok) return await res.json();
    } catch (_) {}
    return ROADWORKS_AND_CONNECTIVITY;
  },

  async getMultimodalLogistics() {
    try {
      const res = await fetch(`${API_BASE}/corridors/multimodal-logistics`);
      if (res.ok) return await res.json();
    } catch (_) {}
    return MULTIMODAL_LOGISTICS;
  },

  async getFuelAndEnergy() {
    try {
      const res = await fetch(`${API_BASE}/corridors/fuel-energy`);
      if (res.ok) return await res.json();
    } catch (_) {}
    return FUEL_AND_ENERGY_RESERVES;
  },

  // --- Weather ---
  async getCorridorWeather() {
    const res = await fetch(`${API_BASE}/weather/corridor`);
    if (!res.ok) throw new Error('Failed to fetch weather data');
    return res.json();
  },

  // --- AI & Advisories ---
  async getExecutiveBrief() {
    const res = await fetch(`${API_BASE}/ai/executive-brief`);
    if (!res.ok) throw new Error('Failed to fetch AI executive brief');
    return res.json();
  },

  // --- Routing ---
  async getNodes() {
    const res = await fetch(`${API_BASE}/routing/nodes`);
    if (!res.ok) throw new Error('Failed to fetch nodes');
    return res.json();
  },

  async calculateRoute(origin, destination, cargoPriority = 'GENERAL', mode = 'RISK_AWARE') {
    const res = await fetch(`${API_BASE}/routing/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ origin, destination, cargo_priority: cargoPriority, mode })
    });
    if (!res.ok) throw new Error('Failed to calculate route');
    return res.json();
  },

  async compareRoutes(origin, destination, cargoPriority = 'CRITICAL_MEDICAL') {
    const res = await fetch(`${API_BASE}/routing/compare`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ origin, destination, cargo_priority: cargoPriority, mode: 'RISK_AWARE' })
    });
    if (!res.ok) throw new Error('Failed to compare routes');
    return res.json();
  },

  // --- Vehicle Telemetry ---
  async getAllVehicles() {
    const res = await fetch(`${API_BASE}/vehicles`);
    if (!res.ok) throw new Error('Failed to fetch all vehicles');
    return res.json();
  },

  async getVehicleTelemetry(vehicleId = 'MED_CONVOY_01') {
    const res = await fetch(`${API_BASE}/vehicles/${vehicleId}/telemetry`);
    if (!res.ok) throw new Error('Failed to fetch vehicle telemetry');
    return res.json();
  },

  async advanceVehicle(vehicleId = 'MED_CONVOY_01', stepPct = 4.0) {
    const res = await fetch(`${API_BASE}/vehicles/${vehicleId}/advance?step_pct=${stepPct}`, {
      method: 'POST'
    });
    if (!res.ok) throw new Error('Failed to advance vehicle');
    return res.json();
  },

  async pauseVehicle(vehicleId = 'MED_CONVOY_01') {
    const res = await fetch(`${API_BASE}/vehicles/${vehicleId}/pause`, { method: 'POST' });
    return res.json();
  },

  async resumeVehicle(vehicleId = 'MED_CONVOY_01') {
    const res = await fetch(`${API_BASE}/vehicles/${vehicleId}/resume`, { method: 'POST' });
    return res.json();
  },

  async rerouteVehicle(vehicleId = 'MED_CONVOY_01') {
    const res = await fetch(`${API_BASE}/vehicles/${vehicleId}/reroute`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to execute reroute');
    return res.json();
  },

  // --- Field Reports & Offline Queue ---
  async getFieldReports(activeOnly = false) {
    const res = await fetch(`${API_BASE}/field-reports?active_only=${activeOnly}`);
    if (!res.ok) throw new Error('Failed to fetch field reports');
    return res.json();
  },

  async submitFieldReport(reportData) {
    try {
      const res = await fetch(`${API_BASE}/field-reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportData)
      });
      if (!res.ok) throw new Error('Backend failed');
      return await res.json();
    } catch (err) {
      // Offline fallback: Queue in localStorage
      console.warn('Network offline or error, saving to local store-and-forward queue...', err);
      const queue = JSON.parse(localStorage.getItem('offline_field_reports') || '[]');
      const offlineItem = {
        ...reportData,
        id: `OFFLINE_${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        is_queued_locally: true
      };
      queue.push(offlineItem);
      localStorage.setItem('offline_field_reports', JSON.stringify(queue));
      return offlineItem;
    }
  },

  async resolveFieldReport(reportId) {
    const res = await fetch(`${API_BASE}/field-reports/${reportId}/resolve`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to resolve field report');
    return res.json();
  },

  async uploadPhoto(file) {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${API_BASE}/field-reports/upload-photo`, {
      method: 'POST',
      body: formData
    });
    if (!res.ok) throw new Error('Failed to upload incident photo');
    return res.json();
  },

  // --- Simulation Lab ---
  async injectHazard(segmentId, incidentType = 'LANDSLIDE', description = 'Synthetic trigger') {
    const res = await fetch(`${API_BASE}/simulation/inject-hazard`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ segment_id: segmentId, incident_type: incidentType, description })
    });
    if (!res.ok) throw new Error('Failed to inject hazard');
    return res.json();
  },

  async simulateWeather(rainfallMultiplier = 1.5, rainScenario = 'MONSOON_SURGE') {
    const res = await fetch(`${API_BASE}/simulation/weather`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rainfall_multiplier: rainfallMultiplier, rain_scenario: rainScenario })
    });
    if (!res.ok) throw new Error('Failed to simulate weather');
    return res.json();
  },

  async resetSimulation() {
    const res = await fetch(`${API_BASE}/simulation/reset`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to reset simulation');
    return res.json();
  }
};
