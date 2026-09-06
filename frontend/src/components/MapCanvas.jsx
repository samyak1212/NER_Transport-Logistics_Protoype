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
  Compass
} from 'lucide-react';
import { 
  DEFAULT_NODES, 
  DEFAULT_SEGMENTS, 
  LANDSLIDE_PREDICTION_ZONES,
  DEFAULT_WEATHER_STATIONS,
  BRO_MACHINERY_UNITS,
  ACTIVE_CONVOYS,
  REGIONAL_CORRIDORS
} from '../data/defaultData';

// Fix standard Leaflet default icon issues in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// 1. Helper for Town Station Markers with bold visible text labels
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

// 2. Color-Graded Rainfall Station Pill Marker
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

// 3. Custom Landslide Prediction Hazard Zone Marker
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

// 4. BRO Heavy Machinery Deployment Marker
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

// 5. Active Convoy Fleet Marker
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
  activeWorkspace = 'command'
}) {
  const [selectedCorridor, setSelectedCorridor] = useState('ALL');
  const [basemap, setBasemap] = useState('dark');
  
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
      base: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
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

  // Rule: Do NOT render turn-by-turn activeRoute when user is in Authority view (Command HQ)
  // Turn-by-turn route is only for Logistics Dispatch or Driver HUD
  const shouldRenderRoute = activeWorkspace !== 'command' && activeRoute && activeRoute.geometry_coordinates;

  return (
    <div className="relative w-full h-full min-h-[480px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
      {/* 1. Top Bar: Regional Corridor Switcher & Basemap Selector */}
      <div className="absolute top-3 left-3 right-3 z-[1000] flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Corridor Switcher Dropdown */}
        <div className="glass-panel p-1.5 rounded-lg border border-slate-700/80 shadow-lg flex items-center gap-2 pointer-events-auto">
          <Compass className="w-4 h-4 text-cyan-400 shrink-0 ml-1" />
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider hidden sm:inline">Corridor:</span>
          <select
            value={selectedCorridor}
            onChange={(e) => setSelectedCorridor(e.target.value)}
            className="bg-defense-900 border border-slate-700 text-slate-100 font-mono text-xs rounded px-2 py-1 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            {REGIONAL_CORRIDORS.map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Basemap Selector */}
        <div className="glass-panel p-1 rounded-lg flex items-center gap-1 border border-slate-700/80 shadow-lg text-[11px] font-mono pointer-events-auto">
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
            Himalayan Satellite
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

      {/* 2. Top-Left Secondary: Interactive Authority Layer Filters */}
      <div className="absolute top-14 left-3 z-[1000] glass-panel px-3 py-1.5 rounded-lg flex flex-wrap items-center gap-3 border border-slate-700/80 shadow-lg text-[11px] font-mono text-slate-300">
        <label className="flex items-center gap-1.5 cursor-pointer hover:text-cyan-300">
          <input
            type="checkbox"
            checked={showLifelines}
            onChange={(e) => setShowLifelines(e.target.checked)}
            className="accent-cyan-500 rounded"
          />
          <span className="font-bold text-cyan-400">Road Lifelines</span>
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

        {/* 3. Color-Graded Rainfall Catchment Bubbles & Stations (User Request) */}
        {showRainfall && filteredWeather.map((w, idx) => (
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

        {/* 4. High-Fidelity Curved Road Segments with Status Color Grading */}
        {showLifelines && filteredSegments.map((seg) => {
          const isSelected = selectedSegment && selectedSegment.id === seg.id;
          const isBypass = seg.corridor === 'CORRIDOR_NH13_BYPASS' || seg.id.includes('ALT');
          
          let color = '#06b6d4'; // Cyan default
          let weight = 4.5;
          let dashArray = null;

          if (seg.is_blocked) {
            color = '#ef4444'; // Red Blocked
            weight = 6;
            dashArray = '8, 8';
          } else if (isBypass) {
            color = '#f59e0b'; // Amber Bypass
            weight = 4;
            dashArray = '6, 6';
          } else if (seg.risk_score >= 0.7) {
            color = '#f97316'; // High Geotechnical Risk
            weight = 5;
          } else if (seg.risk_score >= 0.4) {
            color = '#eab308'; // Moderate Risk
            weight = 4.5;
          }

          if (isSelected) {
            color = '#ffffff';
            weight = 7;
          }

          return (
            <Polyline
              key={seg.id}
              positions={seg.coordinates}
              pathOptions={{
                color: color,
                weight: weight,
                opacity: isSelected ? 1.0 : 0.88,
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

        {/* 5. Dispatch Turn-by-Turn Route Highlight (Only shown when active in Dispatch/Driver mode) */}
        {shouldRenderRoute && (
          <Polyline
            positions={activeRoute.geometry_coordinates}
            pathOptions={{ color: '#38bdf8', weight: 6.5, opacity: 0.95 }}
          />
        )}

        {/* 6. Predictive Landslide Hazard Hotspots (Clause b) */}
        {showLandslides && filteredLandslides.map((zone) => (
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

        {/* 7. BRO Heavy Machinery Deployment Units (Authority Resource Oversight) */}
        {showMachinery && filteredMachinery.map((m) => (
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
        {showConvoys && filteredConvoys.map((convoy) => (
          <Marker
            key={convoy.id}
            position={[convoy.lat, convoy.lon]}
            icon={createConvoyIcon(convoy)}
          >
            <Popup>
              <div className="p-1 text-slate-900 font-sans text-xs">
                <div className="font-bold text-cyan-800 flex items-center gap-1">
                  🚚 {convoy.id} &bull; {convoy.cargo}
                </div>
                <div className="text-[11px] text-slate-700 mt-1 space-y-0.5 font-mono">
                  <div>Priority: <b className="text-rose-700">{convoy.priority}</b></div>
                  <div>Speed: <b>{convoy.speed_kmh} km/h</b> &bull; Status: <b>{convoy.status}</b></div>
                  <div>Destination: <b>{convoy.destination}</b></div>
                  <div>Driver: <b>{convoy.driver_name}</b></div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* 9. Strategic Town Stations & Landmarks */}
        {showStations && filteredNodes.filter(n => n.isKeyStation || n.isHazardZone).map((node) => (
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
    </div>
  );
}
