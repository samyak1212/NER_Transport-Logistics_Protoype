import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, Circle, CircleMarker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { 
  AlertOctagon, 
  Mountain, 
  Shield, 
  Truck, 
  Navigation, 
  Layers, 
  MapPin, 
  AlertTriangle,
  CloudRain,
  Wrench,
  Compass,
  Route,
  Clock,
  Eye,
  EyeOff,
  CornerUpRight
} from 'lucide-react';
import { 
  DEFAULT_NODES, 
  DEFAULT_SEGMENTS, 
  LANDSLIDE_PREDICTION_ZONES,
  DEFAULT_WEATHER_STATIONS,
  BRO_MACHINERY_UNITS,
  ACTIVE_CONVOYS,
  REGIONAL_CORRIDORS,
  CORRIDOR_DRIVING_ROUTES
} from '../data/defaultData';
import { getMediaUrl } from '../services/api';

// Fix standard Leaflet default icon issues in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// 1. Google Maps Directions Waypoint Pins ('A' Start Pin, 'B' Destination Pin)
const createGoogleWaypointIcon = (letter, label, color) => {
  return new L.DivIcon({
    className: 'google-maps-waypoint-marker',
    html: `
      <div style="display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%); pointer-events: auto; cursor: pointer; z-index: 9999;">
        <!-- Floating Label Tag -->
        <div style="
          background: rgba(15, 23, 42, 0.96);
          color: #ffffff;
          padding: 3px 8px;
          border-radius: 6px;
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 11px;
          font-weight: 700;
          white-space: nowrap;
          border: 1.5px solid ${color};
          box-shadow: 0 4px 14px rgba(0,0,0,0.85);
          margin-bottom: 3px;
          display: flex;
          align-items: center;
          gap: 5px;
        ">
          <span style="display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: ${color}; box-shadow: 0 0 6px ${color};"></span>
          <span>${label}</span>
        </div>
        <!-- Google Circular Pinhead -->
        <div style="
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: ${color};
          border: 2.5px solid #ffffff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 14px;
          font-weight: 900;
          line-height: 1;
        ">
          ${letter}
        </div>
        <!-- Downward Arrow Pointer -->
        <div style="
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 6px solid ${color};
          margin-top: -1px;
        "></div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0]
  });
};

// 2. Helper for Town Station Markers with bold visible text labels
const createStationIcon = (name, type, elevation) => {
  const isHub = type === 'SUPPLY_HUB' || type === 'FRONTIER_DESTINATION' || type === 'DISTRICT_HQ';
  const bgColor = isHub ? '#06b6d4' : '#1e293b';
  const borderColor = isHub ? '#38bdf8' : '#64748b';
  
  return new L.DivIcon({
    className: 'custom-station-marker',
    html: `
      <div style="display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -50%); pointer-events: auto;">
        <div style="
          background: ${bgColor};
          color: #ffffff;
          padding: 2.5px 6.5px;
          border-radius: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          font-weight: 700;
          white-space: nowrap;
          border: 1.5px solid ${borderColor};
          box-shadow: 0 4px 12px rgba(0,0,0,0.85);
          display: flex;
          align-items: center;
          gap: 4px;
        ">
          <span>${isHub ? '📍' : '▫️'}</span>
          <span>${name}</span>
          <span style="color: #94a3b8; font-size: 9px;">(${elevation}m)</span>
        </div>
        <div style="width: 2px; height: 5px; background: ${borderColor};"></div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
};

// 3. Color-Graded Rainfall Station Pill Marker
const createRainfallIcon = (station, rainfall_mm, color, alert_level) => {
  return new L.DivIcon({
    className: 'custom-rainfall-marker',
    html: `
      <div style="display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -50%); cursor: pointer;">
        <div style="
          background: rgba(15, 23, 42, 0.94);
          color: ${color};
          padding: 3px 8px;
          border-radius: 8px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          font-weight: 800;
          white-space: nowrap;
          border: 2px solid ${color};
          box-shadow: 0 0 16px ${color}90;
          display: flex;
          align-items: center;
          gap: 4px;
        ">
          <span>🌧️</span>
          <span style="color: #ffffff;">${station}</span>
          <span style="background: ${color}30; padding: 1px 4px; border-radius: 4px; color: ${color}; font-weight: 900;">${rainfall_mm}mm</span>
        </div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0]
  });
};

// 4. Custom Landslide Prediction Hazard Zone Marker
const createLandslideIcon = (prob, name) => {
  const isSevere = prob >= 75;
  const color = isSevere ? '#ef4444' : '#f59e0b';

  return new L.DivIcon({
    className: 'custom-landslide-marker',
    html: `
      <div style="display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -50%);">
        <div style="
          background: ${color};
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #ffffff;
          box-shadow: 0 0 16px ${color};
          animation: pulse 1.5s infinite;
        ">
          <span style="font-size: 13px;">⚠️</span>
        </div>
        <div style="
          background: rgba(15, 23, 42, 0.95);
          color: ${color};
          padding: 1px 5px;
          border-radius: 4px;
          font-size: 9px;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 800;
          margin-top: 2px;
          border: 1px solid ${color};
          white-space: nowrap;
        ">
          ${prob}% RISK
        </div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
};

// 4b. Field Incident Report Marker with Severity Status
const createIncidentReportIcon = (type, severity) => {
  const isBlocking = severity === 'BLOCKING';
  const color = isBlocking ? '#ef4444' : '#f59e0b';
  return new L.DivIcon({
    className: 'custom-incident-marker',
    html: `
      <div style="display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%); pointer-events: auto; cursor: pointer;">
        <div style="
          background: #0f172a;
          border: 2px solid ${color};
          color: #ffffff;
          padding: 2.5px 6px;
          border-radius: 6px;
          font-family: system-ui, sans-serif;
          font-size: 10px;
          font-weight: 800;
          box-shadow: 0 4px 12px rgba(0,0,0,0.85);
          display: flex;
          align-items: center;
          gap: 4px;
          white-space: nowrap;
        ">
          <span>${type === 'LANDSLIDE' ? '⛰️' : '⚠️'}</span>
          <span style="color: ${color};">${isBlocking ? 'BLOCKED' : 'OBSTACLE'}</span>
        </div>
        <div style="
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: ${color};
          border: 2px solid #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: 11px;
          font-weight: 900;
          box-shadow: 0 0 12px ${color};
          margin-top: 2px;
        ">
          !
        </div>
        <div style="
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 5px solid ${color};
        "></div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0]
  });
};

// 5. BRO Heavy Machinery Deployment Marker
const createMachineryIcon = (unit, type, status) => {
  const isClearing = status.includes('CLEARING') || status.includes('ACTIVE');
  const color = isClearing ? '#f59e0b' : '#38bdf8';
  return new L.DivIcon({
    className: 'custom-bro-marker',
    html: `
      <div style="display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -50%);">
        <div style="
          background: #0f172a;
          color: #ffffff;
          padding: 2.5px 6px;
          border-radius: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          font-weight: 700;
          white-space: nowrap;
          border: 1.5px solid ${color};
          box-shadow: 0 2px 10px rgba(0,0,0,0.85);
          display: flex;
          align-items: center;
          gap: 3px;
        ">
          <span>🚜</span>
          <span>${type.split(' ')[0]}</span>
          <span style="color: ${color}; font-size: 8px;">(${isClearing ? 'CLEARING' : 'STANDBY'})</span>
        </div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0]
  });
};

// 6. Active Convoy Fleet Marker
const createConvoyIcon = (convoy) => {
  const isMed = convoy.priority === 'CRITICAL_MEDICAL' || convoy.cargo_type === 'MEDICAL';
  const isPDS = convoy.priority === 'ESSENTIAL_FOOD' || convoy.cargo_type === 'FOOD_PDS';
  const isFuel = convoy.priority === 'FUEL_POL' || convoy.cargo_type === 'FUEL_POL';
  const icon = isMed ? '🚑' : isPDS ? '🌾' : isFuel ? '⛽' : '🚚';
  const badgeColor = isMed ? '#ef4444' : isPDS ? '#10b981' : isFuel ? '#f59e0b' : '#06b6d4';
  
  return new L.DivIcon({
    className: 'custom-fleet-convoy-marker',
    html: `
      <div style="display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -50%); cursor: pointer;">
        <div style="
          background: #0f172a;
          color: #ffffff;
          padding: 3px 6px;
          border-radius: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          font-weight: 700;
          white-space: nowrap;
          border: 1.5px solid ${badgeColor};
          box-shadow: 0 0 12px ${badgeColor}80;
          display: flex;
          align-items: center;
          gap: 4px;
        ">
          <span>${icon}</span>
          <span>${convoy.id}</span>
          <span style="color: #94a3b8; font-size: 8px;">${convoy.speed_kmh}km/h</span>
        </div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0]
  });
};

// Corridor Route Metadata for Google Directions View
const CORRIDOR_ROUTE_META = {
  CORRIDOR_NH13: {
    originName: "Guwahati Hub",
    destName: "Tawang Frontier Sector",
    highwayName: "NH-13 Trans-Himalayan Highway",
    startCoord: [26.14428, 91.73615],
    destCoord: [27.5861, 91.8594],
    primaryKey: "CORRIDOR_NH13",
    primaryLabel: "via NH-13 (Bhalukpong - Sela)",
    alternateKey: "CORRIDOR_NH13_BYPASS",
    alternateLabel: "via BRO Kalaktang Military Bypass",
    hasAlternate: true,
    avgSpeed: "40 km/h"
  },
  CORRIDOR_NH29: {
    originName: "Dimapur Railhead Hub",
    destName: "Imphal Frontier Depot",
    highwayName: "NH-29 / NH-2 Asian Highway 1",
    startCoord: [25.9068, 93.7275],
    destCoord: [24.8170, 93.9368],
    primaryKey: "CORRIDOR_NH29",
    primaryLabel: "via NH-29 (Kohima & Senapati)",
    hasAlternate: false,
    avgSpeed: "45 km/h"
  },
  CORRIDOR_NH10: {
    originName: "Siliguri Railhead",
    destName: "Gangtok Capital Hub",
    highwayName: "NH-10 Himalayan Corridor",
    startCoord: [26.7271, 88.3953],
    destCoord: [27.3389, 88.6065],
    primaryKey: "CORRIDOR_NH10",
    primaryLabel: "via NH-10 (Sevoke, Teesta & Rangpo)",
    hasAlternate: false,
    avgSpeed: "35 km/h"
  },
  CORRIDOR_NH6: {
    originName: "Guwahati Hub",
    destName: "Agartala Border Depot",
    highwayName: "NH-6 / NH-8 Arterial Lifeline",
    startCoord: [26.1445, 91.7362],
    destCoord: [23.8315, 91.2868],
    primaryKey: "CORRIDOR_NH6",
    primaryLabel: "via NH-6 (Shillong, Jowai & Silchar)",
    hasAlternate: false,
    avgSpeed: "48 km/h"
  }
};

// Helper to center/fly map when corridor selection changes
function MapController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center && zoom) {
      map.flyTo(center, zoom, { duration: 1.2 });
    }
  }, [center, zoom, map]);
  return null;
}

export default function MapCanvas({
  nodes = [],
  segments = [],
  activeRoute = null,
  activeVehicle = null,
  reports = [],
  selectedSegment = null,
  onSelectSegment = () => {},
  onSelectConvoy = null,
  activeWorkspace = 'command'
}) {
  const [selectedCorridor, setSelectedCorridor] = useState('ALL');
  const [basemap, setBasemap] = useState('dark');
  
  // Google Directions Highway Mode
  const [showGoogleDirections, setShowGoogleDirections] = useState(true);
  const [useAlternateBypass, setUseAlternateBypass] = useState(false);
  const [focusRoadOnly, setFocusRoadOnly] = useState(false);

  // Layer Toggles
  const [showLifelines, setShowLifelines] = useState(true);
  const [showRainfall, setShowRainfall] = useState(true);
  const [showLandslides, setShowLandslides] = useState(true);
  const [showMachinery, setShowMachinery] = useState(true);
  const [showConvoys, setShowConvoys] = useState(true);
  const [showStations, setShowStations] = useState(true);

  // Basemap definitions
  const basemapLayers = {
    dark: {
      base: import.meta.env.VITE_MAP_TILE_URL || 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      ref: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
      attr: '&copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
      maxZoom: 16
    },
    satellite: {
      base: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      ref: null,
      attr: '&copy; Esri &mdash; Source: USGS, NASA, Esri',
      maxZoom: 18
    },
    osm: {
      base: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      ref: null,
      attr: '&copy; OpenStreetMap contributors',
      maxZoom: 19
    }
  };

  const currentLayer = basemapLayers[basemap];

  // Current corridor config
  const currentCorridorConfig = REGIONAL_CORRIDORS.find(c => c.id === selectedCorridor) || REGIONAL_CORRIDORS[0];

  // Filter segments according to selected corridor
  const allSegments = (segments && segments.length > 0) ? segments : DEFAULT_SEGMENTS;
  const filteredSegments = selectedCorridor === 'ALL'
    ? allSegments
    : allSegments.filter(s => s.corridor === selectedCorridor || (selectedCorridor === 'CORRIDOR_NH13' && s.corridor === 'CORRIDOR_NH13_BYPASS'));

  // Filter nodes
  const allNodes = (nodes && nodes.length > 0) ? nodes : DEFAULT_NODES;
  const filteredNodes = selectedCorridor === 'ALL'
    ? allNodes
    : allNodes.filter(n => n.corridor === selectedCorridor || (selectedCorridor === 'CORRIDOR_NH13' && n.corridor === 'CORRIDOR_NH13_BYPASS'));

  // Filter weather stations
  const filteredWeather = selectedCorridor === 'ALL'
    ? DEFAULT_WEATHER_STATIONS
    : DEFAULT_WEATHER_STATIONS.filter(w => w.corridor === selectedCorridor);

  // Filter Landslide zones
  const filteredLandslides = selectedCorridor === 'ALL'
    ? LANDSLIDE_PREDICTION_ZONES
    : LANDSLIDE_PREDICTION_ZONES.filter(z => z.corridor === selectedCorridor);

  // Filter BRO Machinery
  const filteredMachinery = selectedCorridor === 'ALL'
    ? BRO_MACHINERY_UNITS
    : BRO_MACHINERY_UNITS.filter(m => m.corridor === selectedCorridor);

  // Filter Convoys
  const filteredConvoys = selectedCorridor === 'ALL'
    ? ACTIVE_CONVOYS
    : ACTIVE_CONVOYS.filter(c => c.corridor === selectedCorridor);

  // Determine active Google Maps Highway Route to render
  const isSpecificCorridor = selectedCorridor !== 'ALL' && CORRIDOR_ROUTE_META[selectedCorridor];
  const activeCorridorMeta = isSpecificCorridor ? CORRIDOR_ROUTE_META[selectedCorridor] : null;

  // Primary vs Alternate driving route coordinates
  const primaryRouteData = isSpecificCorridor && CORRIDOR_DRIVING_ROUTES ? CORRIDOR_DRIVING_ROUTES[activeCorridorMeta.primaryKey] : null;
  const alternateRouteData = (isSpecificCorridor && activeCorridorMeta.hasAlternate && CORRIDOR_DRIVING_ROUTES) 
    ? CORRIDOR_DRIVING_ROUTES[activeCorridorMeta.alternateKey] 
    : null;

  // Active driving route coordinates to emphasize
  const activeDrivingRouteData = useAlternateBypass && alternateRouteData ? alternateRouteData : primaryRouteData;

  // Active Route from Dispatch / Driver workspace
  const hasCustomActiveRoute = activeRoute && activeRoute.geometry_coordinates && activeRoute.geometry_coordinates.length > 0;

  return (
    <div className="relative w-full h-full min-h-[480px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
      {/* 1. Top Bar: Regional Corridor Switcher, Google Directions Toggle & Basemap Selector */}
      <div className="absolute top-3 left-3 right-3 z-[1000] flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Corridor Switcher Dropdown */}
        <div className="glass-panel p-1.5 rounded-lg border border-slate-700/80 shadow-lg flex items-center gap-2 pointer-events-auto">
          <Compass className="w-4 h-4 text-cyan-400 shrink-0 ml-1" />
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider hidden sm:inline">Corridor:</span>
          <select
            value={selectedCorridor}
            onChange={(e) => {
              setSelectedCorridor(e.target.value);
              setUseAlternateBypass(false);
            }}
            className="bg-defense-900 border border-slate-700 text-slate-100 font-mono text-xs rounded px-2 py-1 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            {REGIONAL_CORRIDORS.map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Center / Right Toolbar: Google Directions View Toggle & Basemap */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Google Highway Directions Toggle */}
          <button
            type="button"
            onClick={() => setShowGoogleDirections(!showGoogleDirections)}
            className={`glass-panel px-3 py-1.5 rounded-lg border shadow-lg text-xs font-bold font-sans flex items-center gap-1.5 transition-all ${
              showGoogleDirections 
                ? 'bg-blue-600/90 border-blue-400 text-white shadow-blue-900/50' 
                : 'bg-slate-900/90 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle Google Maps Directions Highway Geometry"
          >
            <Navigation className={`w-3.5 h-3.5 ${showGoogleDirections ? 'text-white' : 'text-blue-400'}`} />
            <span>Google Highway Route</span>
            <span className={`px-1.5 py-0.2 text-[9px] rounded font-mono ${showGoogleDirections ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'}`}>
              {showGoogleDirections ? 'ON' : 'OFF'}
            </span>
          </button>

          {/* Basemap Selector */}
          <div className="glass-panel p-1 rounded-lg flex items-center gap-1 border border-slate-700/80 shadow-lg text-[11px] font-mono">
            <button
              type="button"
              onClick={() => setBasemap('dark')}
              className={`px-2.5 py-1 rounded transition-all font-semibold ${
                basemap === 'dark' ? 'bg-cyan-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
              }`}
            >
              Tactical Dark
            </button>
            <button
              type="button"
              onClick={() => setBasemap('satellite')}
              className={`px-2.5 py-1 rounded transition-all font-semibold ${
                basemap === 'satellite' ? 'bg-cyan-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
              }`}
            >
              Satellite
            </button>
            <button
              type="button"
              onClick={() => setBasemap('osm')}
              className={`px-2.5 py-1 rounded transition-all font-semibold ${
                basemap === 'osm' ? 'bg-cyan-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
              }`}
            >
              Street OSM
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top-Left Secondary: Interactive Authority Layer Filters */}
      <div className="absolute top-14 left-3 z-[1000] glass-panel px-3 py-1.5 rounded-lg flex flex-wrap items-center gap-3 border border-slate-700/80 shadow-lg text-[11px] font-mono text-slate-300">
        <label className="flex items-center gap-1.5 cursor-pointer hover:text-cyan-300">
          <input
            type="checkbox"
            checked={showLifelines}
            onChange={(e) => setShowLifelines(e.target.checked)}
            className="accent-cyan-500 rounded"
          />
          <span className="font-bold text-cyan-400">Road Grid</span>
        </label>

        <label className="flex items-center gap-1.5 cursor-pointer hover:text-blue-300">
          <input
            type="checkbox"
            checked={showRainfall}
            onChange={(e) => setShowRainfall(e.target.checked)}
            className="accent-blue-500 rounded"
          />
          <span className="font-bold text-blue-400 flex items-center gap-1">
            <span>🌧️</span> Rainfall Overlay
          </span>
        </label>

        <label className="flex items-center gap-1.5 cursor-pointer hover:text-rose-300">
          <input
            type="checkbox"
            checked={showLandslides}
            onChange={(e) => setShowLandslides(e.target.checked)}
            className="accent-rose-500 rounded"
          />
          <span className="font-bold text-rose-400">⚠️ Landslides</span>
        </label>

        <label className="flex items-center gap-1.5 cursor-pointer hover:text-amber-300">
          <input
            type="checkbox"
            checked={showMachinery}
            onChange={(e) => setShowMachinery(e.target.checked)}
            className="accent-amber-500 rounded"
          />
          <span className="font-bold text-amber-400">🚜 BRO Machinery</span>
        </label>

        <label className="flex items-center gap-1.5 cursor-pointer hover:text-emerald-300">
          <input
            type="checkbox"
            checked={showConvoys}
            onChange={(e) => setShowConvoys(e.target.checked)}
            className="accent-emerald-500 rounded"
          />
          <span className="font-bold text-emerald-400">🚚 Active Convoys</span>
        </label>

        <label className="flex items-center gap-1.5 cursor-pointer hover:text-slate-100">
          <input
            type="checkbox"
            checked={showStations}
            onChange={(e) => setShowStations(e.target.checked)}
            className="accent-slate-400 rounded"
          />
          <span>📍 Stations</span>
        </label>

        {isSpecificCorridor && (
          <label className="flex items-center gap-1.5 cursor-pointer text-amber-400 border-l border-slate-700 pl-2">
            <input
              type="checkbox"
              checked={focusRoadOnly}
              onChange={(e) => setFocusRoadOnly(e.target.checked)}
              className="accent-amber-500 rounded"
            />
            <span className="font-bold flex items-center gap-1">
              {focusRoadOnly ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              Highway Focus Only
            </span>
          </label>
        )}
      </div>

      <MapContainer
        center={currentCorridorConfig.center}
        zoom={currentCorridorConfig.zoom}
        style={{ width: '100%', height: '100%' }}
        scrollWheelZoom={true}
      >
        <MapController center={currentCorridorConfig.center} zoom={currentCorridorConfig.zoom} />

        {/* 100% Free Base Tile Layer */}
        <TileLayer
          key={`base-${basemap}`}
          attribution={currentLayer.attr}
          url={currentLayer.base}
          maxZoom={currentLayer.maxZoom}
        />

        {/* Reference Labels Overlay (for Dark Canvas) */}
        {currentLayer.ref && (
          <TileLayer
            key={`ref-${basemap}`}
            url={currentLayer.ref}
            maxZoom={currentLayer.maxZoom}
            opacity={0.85}
          />
        )}

        {/* 3. Color-Graded Rainfall Catchment Bubbles & Stations */}
        {showRainfall && !focusRoadOnly && filteredWeather.map((w, idx) => (
          <React.Fragment key={`weather-${idx}`}>
            {/* Catchment Area Precipitation Circle */}
            <Circle
              center={[w.lat, w.lon]}
              radius={w.alert_radius_m || 20000}
              pathOptions={{
                color: w.color,
                fillColor: w.color,
                fillOpacity: w.alert_level === 'CRITICAL' ? 0.32 : w.alert_level === 'HIGH' ? 0.22 : 0.12,
                weight: 1.5,
                dashArray: w.alert_level === 'CRITICAL' ? '4, 4' : null
              }}
            />
            {/* Interactive Weather Station Marker */}
            <Marker
              position={[w.lat, w.lon]}
              icon={createRainfallIcon(w.station, w.rainfall_mm, w.color, w.alert_level)}
            >
              <Popup>
                <div className="p-1 text-slate-900 font-sans text-xs max-w-xs">
                  <div className="flex justify-between items-center pb-1 border-b border-slate-200">
                    <span className="font-bold text-sm text-slate-900 flex items-center gap-1">
                      🌧️ {w.station} Weather Station
                    </span>
                    <span 
                      className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold text-white"
                      style={{ background: w.color }}
                    >
                      {w.alert_level}
                    </span>
                  </div>
                  <div className="mt-2 space-y-1 text-[11px] text-slate-700 font-mono">
                    <div className="flex justify-between">
                      <span>24h Precipitation:</span>
                      <b className="text-blue-700 text-xs">{w.rainfall_mm} mm</b>
                    </div>
                    <div className="flex justify-between">
                      <span>Next 24h Forecast:</span>
                      <b className="text-amber-700">+{w.forecast_24h_mm} mm</b>
                    </div>
                    <div className="flex justify-between">
                      <span>Soil Saturation Index:</span>
                      <b className={w.soil_saturation_pct >= 80 ? 'text-rose-600' : 'text-slate-800'}>
                        {w.soil_saturation_pct}% (Water Capacity)
                      </b>
                    </div>
                    <div className="flex justify-between">
                      <span>Elevation:</span>
                      <b>{w.elevation_m} meters</b>
                    </div>
                    <div className="flex justify-between">
                      <span>Temperature:</span>
                      <b>{w.temp_c}°C ({w.humidity_pct}% RH)</b>
                    </div>
                    <div className="mt-1 p-1.5 rounded bg-slate-100 border border-slate-300 text-[10px] font-sans text-slate-800">
                      <b>Condition:</b> {w.weather_desc}
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          </React.Fragment>
        ))}

        {/* 4. Regional Road Segments Grid (When not in pure road focus mode) */}
        {showLifelines && !focusRoadOnly && filteredSegments.map((seg) => {
          const isSelected = selectedSegment && selectedSegment.id === seg.id;
          const isBypass = seg.corridor === 'CORRIDOR_NH13_BYPASS' || seg.id.includes('ALT');
          
          let color = '#06b6d4';
          let weight = 4.0;
          let dashArray = null;

          if (seg.is_blocked) {
            color = '#ef4444';
            weight = 5.5;
            dashArray = '8, 8';
          } else if (isBypass) {
            color = '#f59e0b';
            weight = 3.5;
            dashArray = '6, 6';
          } else if (seg.risk_score >= 0.7) {
            color = '#f97316';
            weight = 4.5;
          } else if (seg.risk_score >= 0.4) {
            color = '#eab308';
            weight = 4.0;
          }

          if (isSelected) {
            color = '#ffffff';
            weight = 6.5;
          }

          return (
            <Polyline
              key={seg.id}
              positions={seg.coordinates}
              pathOptions={{
                color: color,
                weight: weight,
                opacity: isSelected ? 1.0 : 0.75,
                dashArray: dashArray,
                lineCap: 'round',
                lineJoin: 'round'
              }}
              eventHandlers={{
                click: () => onSelectSegment(seg)
              }}
            >
              <Popup>
                <div className="p-1 text-slate-900 font-sans text-xs">
                  <div className="font-bold text-sm text-cyan-800 flex items-center justify-between gap-2">
                    <span>{seg.name}</span>
                    {seg.is_blocked ? (
                      <span className="px-1.5 py-0.5 bg-red-600 text-white rounded text-[10px] font-mono uppercase">BLOCKED</span>
                    ) : (
                      <span className="px-1.5 py-0.5 bg-emerald-600 text-white rounded text-[10px] font-mono uppercase">OPEN</span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-700 mt-1 space-y-1 font-mono">
                    <div>Corridor: <b>{seg.corridor}</b></div>
                    <div>Distance: <b>{seg.distance_km} km</b> • Speed: <b>{seg.base_speed_kmh} km/h</b></div>
                    <div>Slope: <b>{seg.geotechnical?.slope_deg}°</b> • Elevation: <b>{seg.geotechnical?.elevation_m}m</b></div>
                    <div>Rock Formation: <b>{seg.geotechnical?.rock_formation}</b></div>
                    <div>Risk Score: <b className={seg.risk_score >= 0.6 ? 'text-red-600 font-bold' : 'text-emerald-700'}>
                      {(seg.risk_score * 100).toFixed(0)}% ({seg.risk_level})
                    </b></div>
                  </div>
                  <button
                    onClick={() => onSelectSegment(seg)}
                    className="mt-2 w-full py-1 text-[10px] uppercase font-bold tracking-wider bg-cyan-700 hover:bg-cyan-800 text-white rounded"
                  >
                    Inspect Geotechnical Profile
                  </button>
                </div>
              </Popup>
            </Polyline>
          );
        })}

        {/* ========================================================================= */}
        {/* 5. GOOGLE MAPS DIRECTIONS HIGHWAY PATH RENDERING (Turn-by-Turn Asphalt)    */}
        {/* ========================================================================= */}

        {/* Case A: Specific Corridor Selected with Pre-Cached OSRM Road Geometry */}
        {showGoogleDirections && isSpecificCorridor && activeDrivingRouteData && (
          <>
            {/* If Alternate Route exists, render it first in Google Muted Grey */}
            {activeCorridorMeta.hasAlternate && alternateRouteData && (
              <React.Fragment key="google-alt-route">
                {/* Grey Alternate Base Casing */}
                <Polyline
                  positions={useAlternateBypass ? primaryRouteData.coordinates : alternateRouteData.coordinates}
                  pathOptions={{
                    color: '#334155',
                    weight: 7,
                    opacity: 0.7,
                    lineCap: 'round',
                    lineJoin: 'round'
                  }}
                  eventHandlers={{
                    click: () => setUseAlternateBypass(!useAlternateBypass)
                  }}
                />
                {/* Grey Alternate Core Line */}
                <Polyline
                  positions={useAlternateBypass ? primaryRouteData.coordinates : alternateRouteData.coordinates}
                  pathOptions={{
                    color: '#94a3b8',
                    weight: 4.5,
                    opacity: 0.85,
                    lineCap: 'round',
                    lineJoin: 'round'
                  }}
                  eventHandlers={{
                    click: () => setUseAlternateBypass(!useAlternateBypass)
                  }}
                >
                  <Popup>
                    <div className="p-1 text-slate-900 font-sans text-xs">
                      <b className="text-slate-800">Alternate Highway Route</b>
                      <div className="text-slate-600 text-[11px] mt-0.5">
                        Click to switch active navigation to this detour.
                      </div>
                    </div>
                  </Popup>
                </Polyline>
              </React.Fragment>
            )}

            {/* Google Maps Active Driving Polyline: Dual-Stroke Electric Blue */}
            {/* Outer Dark Blue Casing */}
            <Polyline
              positions={activeDrivingRouteData.coordinates}
              pathOptions={{
                color: '#1d4ed8',
                weight: 9,
                opacity: 0.95,
                lineCap: 'round',
                lineJoin: 'round'
              }}
            />
            {/* Inner Electric Blue Core */}
            <Polyline
              positions={activeDrivingRouteData.coordinates}
              pathOptions={{
                color: '#38bdf8',
                weight: 5.5,
                opacity: 1.0,
                lineCap: 'round',
                lineJoin: 'round'
              }}
            />

            {/* Google Start Pin 'A' */}
            <Marker
              position={activeCorridorMeta.startCoord}
              icon={createGoogleWaypointIcon('A', `A: ${activeCorridorMeta.originName}`, '#16a34a')}
            />

            {/* Google Destination Pin 'B' */}
            <Marker
              position={activeCorridorMeta.destCoord}
              icon={createGoogleWaypointIcon('B', `B: ${activeCorridorMeta.destName}`, '#dc2626')}
            />
          </>
        )}

        {/* Case B: Dynamic Mission Route Calculated in Logistics Dispatch / Driver View */}
        {showGoogleDirections && hasCustomActiveRoute && (
          <>
            {/* Outer Blue Casing */}
            <Polyline
              positions={activeRoute.geometry_coordinates}
              pathOptions={{
                color: '#1e40af',
                weight: 9,
                opacity: 0.95,
                lineCap: 'round',
                lineJoin: 'round'
              }}
            />
            {/* Inner Google Electric Blue Line */}
            <Polyline
              positions={activeRoute.geometry_coordinates}
              pathOptions={{
                color: '#3b82f6',
                weight: 5.5,
                opacity: 1.0,
                lineCap: 'round',
                lineJoin: 'round'
              }}
            />

            {/* Start Pin 'A' */}
            <Marker
              position={activeRoute.geometry_coordinates[0]}
              icon={createGoogleWaypointIcon('A', `A: ${activeRoute.path_nodes ? activeRoute.path_nodes[0] : 'Origin'}`, '#16a34a')}
            />

            {/* Destination Pin 'B' */}
            <Marker
              position={activeRoute.geometry_coordinates[activeRoute.geometry_coordinates.length - 1]}
              icon={createGoogleWaypointIcon('B', `B: ${activeRoute.path_nodes ? activeRoute.path_nodes[activeRoute.path_nodes.length - 1] : 'Destination'}`, '#dc2626')}
            />
          </>
        )}

        {/* 6. Predictive Landslide Hazard Hotspots */}
        {showLandslides && !focusRoadOnly && filteredLandslides.map((zone) => (
          <Marker
            key={zone.id}
            position={[zone.lat, zone.lon]}
            icon={createLandslideIcon(zone.probability_pct, zone.name)}
          >
            <Popup>
              <div className="p-1 text-slate-900 font-sans max-w-xs">
                <div className="font-bold text-xs text-rose-700 flex items-center gap-1">
                  ⚠️ {zone.name}
                </div>
                <div className="text-[11px] text-slate-700 mt-1 space-y-1">
                  <div>Hazard Level: <b className="text-rose-600">{zone.hazard_level}</b></div>
                  <div>Slide Probability: <b className="text-rose-600 text-sm font-mono">{zone.probability_pct}%</b></div>
                  <div>NASA SRTM Slope: <b>{zone.srtm_slope_deg}°</b> | Elevation: <b>{zone.elevation_m}m</b></div>
                  <div>GSI Slide Records: <b>{zone.gsi_historical_slides} recorded in catalog</b></div>
                  <div>Trigger Cause: {zone.trigger_cause}</div>
                  <div className="p-1 rounded bg-rose-50 border border-rose-300 text-rose-800 font-bold text-[10px]">
                    Advisory: {zone.recommendation}
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* 7. BRO Heavy Machinery Deployment Units */}
        {showMachinery && !focusRoadOnly && filteredMachinery.map((m) => (
          <Marker
            key={m.id}
            position={[m.lat, m.lon]}
            icon={createMachineryIcon(m.unit, m.type, m.status)}
          >
            <Popup>
              <div className="p-1 text-slate-900 font-sans text-xs">
                <div className="font-bold text-amber-800 flex items-center gap-1">
                  🚜 {m.type}
                </div>
                <div className="text-[11px] text-slate-700 mt-1 space-y-0.5 font-mono">
                  <div>Unit: <b>{m.unit}</b> ({m.operator})</div>
                  <div>Staging: <b>{m.location}</b></div>
                  <div>Status: <b className={m.status.includes('CLEARING') ? 'text-amber-700' : 'text-emerald-700'}>
                    {m.status}
                  </b></div>
                  {m.eta_clearance_hrs > 0 && (
                    <div>Clearance ETA: <b>{m.eta_clearance_hrs} hrs</b></div>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* 8. Regional Monitored Fleet Convoys */}
        {showConvoys && !focusRoadOnly && filteredConvoys
          .filter(c => !(activeVehicle && (c.id === activeVehicle.id || c.id === activeVehicle.vehicle_id)))
          .map((convoy) => (
          <Marker
            key={convoy.id}
            position={[convoy.lat, convoy.lon]}
            icon={createConvoyIcon(convoy)}
            eventHandlers={{
              click: () => {
                if (onSelectConvoy) onSelectConvoy(convoy);
              }
            }}
          >
            <Popup>
              <div className="p-1.5 text-slate-900 font-sans text-xs min-w-[220px]">
                <div className="font-bold text-cyan-800 flex items-center justify-between gap-1 pb-1 border-b border-slate-200">
                  <span className="flex items-center gap-1">🚚 {convoy.id}</span>
                  <span className="font-mono text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded font-bold border border-amber-300">
                    {convoy.vehicle_reg || 'REG-PENDING'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-700 mt-1 space-y-0.5 font-mono">
                  <div>Cargo: <b className="text-slate-900">{convoy.cargo}</b></div>
                  <div>Driver: <b className="text-blue-900">{convoy.driver_name}</b> ({convoy.driver_id})</div>
                  <div>Phone: <b className="text-slate-800">{convoy.driver_phone}</b></div>
                  <div>Priority: <b className="text-rose-700">{convoy.priority}</b></div>
                  <div>Speed: <b>{convoy.speed_kmh} km/h</b> &bull; Status: <b>{convoy.status}</b></div>
                  <div>Destination: <b>{convoy.destination}</b></div>
                </div>
                {onSelectConvoy && (
                  <button 
                    type="button"
                    onClick={() => onSelectConvoy(convoy)}
                    className="mt-2 w-full py-1.5 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-white rounded font-bold text-[10px] uppercase tracking-wider shadow cursor-pointer transition-all active:scale-95"
                  >
                    Inspect Driver & Vehicle Manifest ➔
                  </button>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* 9. Active Monitored Vehicle Moving Along Highway */}
        {activeVehicle && activeVehicle.current_lat && activeVehicle.current_lon && (
          <Marker
            position={[activeVehicle.current_lat, activeVehicle.current_lon]}
            icon={new L.DivIcon({
              className: 'live-active-convoy-pulse',
              html: `
                <div style="display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -50%); cursor: pointer;">
                  <div style="
                    width: 26px;
                    height: 26px;
                    border-radius: 50%;
                    background: #3b82f6;
                    border: 3px solid #ffffff;
                    box-shadow: 0 0 20px #3b82f6;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: pulse 1.2s infinite;
                  ">
                    <span style="font-size: 12px;">🚚</span>
                  </div>
                  <div style="
                    background: #1e3a8a;
                    color: #93c5fd;
                    padding: 1px 5px;
                    border-radius: 4px;
                    font-size: 8px;
                    font-family: monospace;
                    font-weight: bold;
                    margin-top: 2px;
                    white-space: nowrap;
                  ">
                    GPS LIVE (${activeVehicle.progress_pct.toFixed(0)}%)
                  </div>
                </div>
              `,
              iconSize: [0, 0],
              iconAnchor: [0, 0]
            })}
            eventHandlers={{
              click: () => {
                if (onSelectConvoy) onSelectConvoy(activeVehicle);
              }
            }}
          >
            <Popup>
              <div className="p-1.5 text-slate-900 font-sans text-xs min-w-[220px]">
                <div className="font-bold text-cyan-800 flex items-center justify-between gap-1 pb-1 border-b border-slate-200">
                  <span><b>{activeVehicle.vehicle_id}</b></span>
                  <span className="font-mono text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded font-bold border border-amber-300">
                    {activeVehicle.vehicle_reg || 'AS-01-EC-9042'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-700 mt-1 space-y-0.5 font-mono">
                  <div>Driver: <b className="text-blue-900">{activeVehicle.driver_name || 'Subedar R. Thapa'}</b></div>
                  <div>Priority: <b className="text-rose-700">{activeVehicle.cargo_priority}</b></div>
                  <div>Speed: <b>{activeVehicle.speed_kmh} km/h</b> &bull; Status: <b>{activeVehicle.status}</b></div>
                  <div>Progress: <b>{activeVehicle.progress_pct.toFixed(1)}%</b> ({activeVehicle.distance_covered_km.toFixed(1)} km)</div>
                </div>
                {onSelectConvoy && (
                  <button 
                    type="button"
                    onClick={() => onSelectConvoy(activeVehicle)}
                    className="mt-2 w-full py-1.5 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-white rounded font-bold text-[10px] uppercase tracking-wider shadow cursor-pointer transition-all active:scale-95"
                  >
                    Inspect Driver & Vehicle Manifest ➔
                  </button>
                )}
              </div>
            </Popup>
          </Marker>
        )}

        {/* 9b. Live Field Incident Reports Markers */}
        {reports.filter(r => !r.is_resolved && r.latitude && r.longitude).map((r) => (
          <Marker
            key={`field-rpt-${r.id}`}
            position={[r.latitude, r.longitude]}
            icon={createIncidentReportIcon(r.incident_type, r.severity)}
          >
            <Popup>
              <div className="text-slate-900 font-sans text-xs min-w-[210px] max-w-[270px]">
                <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                  <span className="font-bold text-rose-800 flex items-center gap-1">
                    <span>{r.incident_type === 'LANDSLIDE' ? '⛰️' : '⚠️'}</span>
                    <span>{r.incident_type}</span>
                  </span>
                  <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold ${
                    r.severity === 'BLOCKING' 
                      ? 'bg-rose-100 text-rose-800 border border-rose-300' 
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}>
                    {r.severity}
                  </span>
                </div>
                <div className="text-[11px] text-slate-700 mt-1.5 space-y-1">
                  <div><b>Reporter:</b> {r.reporter_name || 'BRO Patrol'} ({r.agency || 'BRO'})</div>
                  <div><b>Snapped Road:</b> {r.snapped_segment_name || 'Mountain Sector'}</div>
                  <div className="text-slate-600 italic bg-slate-50 p-1.5 rounded border border-slate-200">
                    "{r.description}"
                  </div>
                  {r.photo_url && (
                    <div className="mt-1.5 rounded-lg border border-slate-300 overflow-hidden shadow-sm">
                      <img 
                        src={getMediaUrl(r.photo_url)} 
                        alt="Hazard Evidence" 
                        className="w-full h-28 object-cover" 
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                      <div className="p-1 bg-slate-100 text-[9px] font-mono text-slate-600 flex justify-between">
                        <span>📷 Verified Photo</span>
                        <span className="text-cyan-700 font-bold">ON-GROUND</span>
                      </div>
                    </div>
                  )}
                  <div className="text-[10px] text-slate-400 font-mono pt-1">
                    GPS: {r.latitude?.toFixed(4)}, {r.longitude?.toFixed(4)}
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* 10. Strategic Town Stations & Landmarks */}
        {showStations && !focusRoadOnly && filteredNodes.filter(n => n.isKeyStation || n.isHazardZone).map((node) => (
          <Marker
            key={node.id}
            position={[node.lat, node.lon]}
            icon={createStationIcon(node.name || node.id, node.type, node.elevation_m)}
          >
            <Popup>
              <div className="text-slate-900 font-sans text-xs">
                <div className="font-bold text-cyan-800">{node.name}</div>
                <div className="text-[11px] text-slate-600 mt-0.5">
                  District: <b>{node.district}</b> ({node.state})<br />
                  Elevation: <b>{node.elevation_m} meters</b><br />
                  Role: <b>{node.type}</b>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* ========================================================================= */}
      {/* 11. FLOATING GOOGLE MAPS DIRECTIONS NAVIGATION HUD CARD                    */}
      {/* ========================================================================= */}
      {showGoogleDirections && isSpecificCorridor && activeDrivingRouteData && (
        <div className="absolute bottom-4 left-4 z-[1000] max-w-sm w-[330px] bg-slate-900/95 border border-slate-700/80 backdrop-blur-md rounded-2xl p-4 shadow-2xl text-slate-100 font-sans pointer-events-auto transition-all animate-fadeIn">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-white shadow-md">
                <Navigation className="w-3.5 h-3.5 rotate-45" />
              </div>
              <span className="font-bold text-xs text-white">Google Highway Directions</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              OSRM Real Road
            </span>
          </div>

          {/* Time & Distance Highlight */}
          <div className="mt-3 flex items-baseline justify-between">
            <div>
              <div className="text-2xl font-black text-emerald-400 tracking-tight flex items-baseline gap-1">
                <span>{Math.floor(activeDrivingRouteData.duration_hr)} hr {Math.round((activeDrivingRouteData.duration_hr % 1) * 60)} min</span>
              </div>
              <div className="text-xs text-slate-300 font-mono mt-0.5">
                {activeDrivingRouteData.distance_km} km &bull; {activeCorridorMeta.avgSpeed}
              </div>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-bold text-blue-400 block">
                {useAlternateBypass ? 'Recommended Detour' : 'Fastest Highway Route'}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {activeDrivingRouteData.total_points.toLocaleString()} asphalt pts
              </span>
            </div>
          </div>

          {/* Highway Summary Badge */}
          <div className="mt-2.5 text-xs text-slate-200 bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700/60 flex items-center gap-2">
            <CornerUpRight className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate font-medium">
              {useAlternateBypass ? activeCorridorMeta.alternateLabel : activeCorridorMeta.primaryLabel}
            </span>
          </div>

          {/* Alternate Route Selector (For corridors with military bypass like NH-13) */}
          {activeCorridorMeta.hasAlternate && (
            <div className="mt-3 pt-2.5 border-t border-slate-800 flex gap-2">
              <button
                type="button"
                onClick={() => setUseAlternateBypass(false)}
                className={`flex-1 py-1.5 px-2 rounded-lg text-[10px] font-bold transition-all text-center ${
                  !useAlternateBypass 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-900/50' 
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                Primary NH-13
              </button>
              <button
                type="button"
                onClick={() => setUseAlternateBypass(true)}
                className={`flex-1 py-1.5 px-2 rounded-lg text-[10px] font-bold transition-all text-center ${
                  useAlternateBypass 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-900/50' 
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                Kalaktang Detour
              </button>
            </div>
          )}
        </div>
      )}

      {/* Floating Directions Card for Custom Calculated Mission Route (Dispatch View) */}
      {showGoogleDirections && hasCustomActiveRoute && (
        <div className="absolute bottom-4 left-4 z-[1000] max-w-sm w-[330px] bg-slate-900/95 border border-slate-700/80 backdrop-blur-md rounded-2xl p-4 shadow-2xl text-slate-100 font-sans pointer-events-auto transition-all animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-white shadow-md">
                <Navigation className="w-3.5 h-3.5 rotate-45" />
              </div>
              <span className="font-bold text-xs text-white">Active Mission Navigation</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
              {activeRoute.mode}
            </span>
          </div>

          <div className="mt-3 flex items-baseline justify-between">
            <div>
              <div className="text-2xl font-black text-emerald-400 tracking-tight">
                {Math.floor(activeRoute.total_time_hours)} hr {Math.round((activeRoute.total_time_hours % 1) * 60)} min
              </div>
              <div className="text-xs text-slate-300 font-mono mt-0.5">
                {activeRoute.total_distance_km} km &bull; {activeRoute.cargo_priority}
              </div>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-bold text-cyan-400 block">
                {activeRoute.hazard_zones_count === 0 ? 'Zero Disruptions' : `${activeRoute.hazard_zones_count} Hazards Cleared`}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                Risk: {(activeRoute.average_risk_score * 100).toFixed(0)}%
              </span>
            </div>
          </div>

          <div className="mt-2 text-xs text-slate-300 bg-slate-800/80 p-2 rounded-lg border border-slate-700/60 truncate font-mono">
            {activeRoute.path_nodes ? activeRoute.path_nodes.join(' → ') : activeRoute.summary}
          </div>
        </div>
      )}
    </div>
  );
}
