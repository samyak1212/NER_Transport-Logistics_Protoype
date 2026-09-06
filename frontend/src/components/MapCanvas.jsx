import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, CircleMarker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { 
  AlertOctagon, 
  Mountain, 
  Shield, 
  Truck, 
  Navigation, 
  Layers, 
  MapPin, 
  AlertTriangle 
} from 'lucide-react';
import { 
  DEFAULT_NODES, 
  DEFAULT_SEGMENTS, 
  LANDSLIDE_PREDICTION_ZONES 
} from '../data/defaultData';

// Fix standard Leaflet default icon issues in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Helper for Town Station Markers with bold visible text labels
const createStationIcon = (name, type, elevation) => {
  const isHub = type === 'SUPPLY_HUB' || type === 'FRONTIER_DESTINATION' || type === 'DISTRICT_HQ';
  const bgColor = isHub ? '#06b6d4' : '#1e293b';
  const borderColor = isHub ? '#38bdf8' : '#64748b';
  
  return new L.DivIcon({
    className: 'custom-station-marker',
    html: `
      <div style="display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -50%);">
        <div style="
          background: ${bgColor};
          color: #ffffff;
          padding: 3px 7px;
          border-radius: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          font-weight: 700;
          white-space: nowrap;
          border: 1.5px solid ${borderColor};
          box-shadow: 0 4px 12px rgba(0,0,0,0.8);
          display: flex;
          align-items: center;
          gap: 4px;
        ">
          <span>${isHub ? '📍' : '▫️'}</span>
          <span>${name}</span>
          <span style="color: #94a3b8; font-size: 9px;">(${elevation}m)</span>
        </div>
        <div style="width: 2px; height: 6px; background: ${borderColor};"></div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
};

// Custom vehicle marker icon
const vehicleIcon = new L.DivIcon({
  className: 'custom-vehicle-marker',
  html: `
    <div style="
      background: #06b6d4;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid #ffffff;
      box-shadow: 0 0 20px #06b6d4;
      animation: pulse 1.2s infinite;
      transform: translate(-16px, -16px);
    ">
      <span style="font-size: 16px;">🚚</span>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

// Custom Landslide Prediction Hazard Zone Marker
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
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #ffffff;
          box-shadow: 0 0 16px ${color};
          animation: bounce 2s infinite;
        ">
          <span style="font-size: 14px;">⚠️</span>
        </div>
        <div style="
          background: rgba(15, 23, 42, 0.9);
          color: ${color};
          padding: 2px 6px;
          border-radius: 4px;
          font-family: monospace;
          font-size: 9px;
          font-weight: 800;
          margin-top: 3px;
          border: 1px solid ${color};
          white-space: nowrap;
        ">
          SLIDE: ${prob}%
        </div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
};

// Helper to center/fly map when needed
function MapRecenter({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom || map.getZoom());
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
  mapCenter = [27.15, 92.35],
  mapZoom = 8
}) {
  // Use backend segments and nodes if provided; otherwise fallback to default seed data immediately
  const displaySegments = segments && segments.length > 0 ? segments : DEFAULT_SEGMENTS;
  const displayNodes = nodes && nodes.length > 0 ? nodes : DEFAULT_NODES;

  const [basemap, setBasemap] = useState('dark');
  const [showPrimary, setShowPrimary] = useState(true);
  const [showAlternate, setShowAlternate] = useState(true);
  const [showLandslides, setShowLandslides] = useState(true);
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

  // Separate segments into Primary Lifeline (NH-13) and Alternate Bypass (Kalaktang)
  const primarySegments = displaySegments.filter(s => !s.id.includes('ALT'));
  const alternateSegments = displaySegments.filter(s => s.id.includes('ALT'));

  return (
    <div className="relative w-full h-full min-h-[480px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
      {/* 1. Top Right: Basemap Selector */}
      <div className="absolute top-3 right-3 z-[1000] glass-panel p-1 rounded-lg flex items-center gap-1 border border-slate-700/80 shadow-lg text-[11px] font-mono">
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

      {/* 2. Top Left: Interactive Layer Filter Controls */}
      <div className="absolute top-3 left-14 z-[1000] glass-panel px-3 py-2 rounded-lg flex flex-wrap items-center gap-3 border border-slate-700/80 shadow-lg text-[11px] font-mono text-slate-300">
        <label className="flex items-center gap-1.5 cursor-pointer hover:text-cyan-300">
          <input
            type="checkbox"
            checked={showPrimary}
            onChange={(e) => setShowPrimary(e.target.checked)}
            className="accent-cyan-500 rounded"
          />
          <span className="flex items-center gap-1 font-bold text-cyan-400">
            <span className="w-2.5 h-1 bg-cyan-400 inline-block"></span> Primary NH-13
          </span>
        </label>

        <label className="flex items-center gap-1.5 cursor-pointer hover:text-amber-300">
          <input
            type="checkbox"
            checked={showAlternate}
            onChange={(e) => setShowAlternate(e.target.checked)}
            className="accent-amber-500 rounded"
          />
          <span className="flex items-center gap-1 font-bold text-amber-400">
            <span className="w-2.5 h-1 bg-amber-400 border border-dashed border-amber-300 inline-block"></span> BRO Kalaktang Bypass
          </span>
        </label>

        <label className="flex items-center gap-1.5 cursor-pointer hover:text-rose-300">
          <input
            type="checkbox"
            checked={showLandslides}
            onChange={(e) => setShowLandslides(e.target.checked)}
            className="accent-rose-500 rounded"
          />
          <span className="flex items-center gap-1 font-bold text-rose-400">
            ⚠️ Landslide Predictions
          </span>
        </label>

        <label className="flex items-center gap-1.5 cursor-pointer hover:text-slate-100">
          <input
            type="checkbox"
            checked={showStations}
            onChange={(e) => setShowStations(e.target.checked)}
            className="accent-blue-500 rounded"
          />
          <span>📍 Town Stations</span>
        </label>
      </div>

      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ width: '100%', height: '100%' }}
        scrollWheelZoom={true}
      >
        <MapRecenter center={mapCenter} zoom={mapZoom} />

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

        {/* 3. Primary Lifeline (NH-13 via Bhalukpong & Sessa) */}
        {showPrimary && primarySegments.map((seg) => {
          const isSelected = selectedSegment && selectedSegment.id === seg.id;
          const isBlocked = seg.is_blocked;
          const color = isBlocked ? '#ef4444' : (seg.risk_score >= 0.7 ? '#ef4444' : (seg.risk_score >= 0.4 ? '#f97316' : '#06b6d4'));
          
          return (
            <Polyline
              key={seg.id}
              positions={seg.coordinates}
              pathOptions={{
                color: isSelected ? '#ffffff' : color,
                weight: isSelected ? 8 : (isBlocked ? 6 : 5),
                opacity: isSelected ? 1.0 : 0.9,
                dashArray: isBlocked ? '6, 6' : undefined,
              }}
              eventHandlers={{
                click: () => onSelectSegment(seg)
              }}
            >
              <Popup>
                <div className="p-1 text-slate-900 font-sans">
                  <div className="font-bold text-xs text-cyan-800 flex items-center gap-1">
                    🛣️ {seg.name}
                  </div>
                  <div className="text-[11px] text-slate-700 mt-1 space-y-0.5">
                    <div>Corridor: <b>Primary Lifeline (NH-13)</b></div>
                    <div>District: <b>{seg.district}</b> • Distance: <b>{seg.distance_km} km</b></div>
                    <div>NASA SRTM Slope: <b>{seg.geotechnical?.slope_deg}°</b> | Elev: <b>{seg.geotechnical?.elevation_m}m</b></div>
                    <div>Disruption Risk: <b style={{ color }}>{(seg.risk_score * 100).toFixed(0)}% ({seg.risk_level})</b></div>
                    {isBlocked && (
                      <div className="p-1 rounded bg-red-100 border border-red-400 text-red-700 font-bold mt-1">
                        ⛔ BLOCKED: {seg.blockage_reason}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => onSelectSegment(seg)}
                    className="mt-2 w-full py-1 text-[10px] uppercase font-bold tracking-wider bg-slate-900 text-white rounded hover:bg-slate-800"
                  >
                    Inspect Geotechnical Data
                  </button>
                </div>
              </Popup>
            </Polyline>
          );
        })}

        {/* 4. Southern BRO Kalaktang Strategic Alternate Bypass */}
        {showAlternate && alternateSegments.map((seg) => {
          const isSelected = selectedSegment && selectedSegment.id === seg.id;
          return (
            <Polyline
              key={seg.id}
              positions={seg.coordinates}
              pathOptions={{
                color: isSelected ? '#ffffff' : '#f59e0b',
                weight: isSelected ? 8 : 5,
                opacity: 0.95,
                dashArray: '8, 8'
              }}
              eventHandlers={{
                click: () => onSelectSegment(seg)
              }}
            >
              <Popup>
                <div className="p-1 text-slate-900 font-sans">
                  <div className="font-bold text-xs text-amber-700 flex items-center gap-1">
                    🛡️ {seg.name}
                  </div>
                  <div className="text-[11px] text-slate-700 mt-1 space-y-0.5">
                    <div>Corridor: <b className="text-amber-800">BRO Kalaktang Strategic Bypass</b></div>
                    <div>Status: <b className="text-emerald-700">100% CLEAR (Bypasses Sessa Slide Belt)</b></div>
                    <div>Distance: <b>{seg.distance_km} km</b> • Speed: <b>{seg.base_speed_kmh} km/h</b></div>
                    <div>Terrain Risk: <b className="text-emerald-600">{(seg.risk_score * 100).toFixed(0)}% (LOW)</b></div>
                  </div>
                  <button
                    onClick={() => onSelectSegment(seg)}
                    className="mt-2 w-full py-1 text-[10px] uppercase font-bold tracking-wider bg-amber-600 text-white rounded hover:bg-amber-700"
                  >
                    Inspect Bypass Details
                  </button>
                </div>
              </Popup>
            </Polyline>
          );
        })}

        {/* 5. Predictive Landslide Hazard Danger Zones (Clause b) */}
        {showLandslides && LANDSLIDE_PREDICTION_ZONES.map((zone) => (
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

        {/* 6. Strategic Town Stations & Landmarks */}
        {showStations && displayNodes.filter(n => n.isKeyStation || n.isHazardZone).map((node) => (
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

        {/* 7. Active Convoy Marker */}
        {activeVehicle && activeVehicle.current_lat && activeVehicle.current_lon && (
          <Marker
            position={[activeVehicle.current_lat, activeVehicle.current_lon]}
            icon={vehicleIcon}
          >
            <Popup>
              <div className="text-slate-900 text-xs font-sans">
                <div className="font-bold text-cyan-700 flex items-center gap-1">
                  🚚 {activeVehicle.vehicle_id}
                </div>
                <div className="mt-1 text-[11px]">
                  Status: <b>{activeVehicle.status}</b><br />
                  Speed: <b>{activeVehicle.speed_kmh} km/h</b><br />
                  Progress: <b>{activeVehicle.progress_pct}%</b><br />
                  Approaching: <b>{activeVehicle.next_landmark}</b><br />
                  Advisory: <b className={activeVehicle.operational_advisory === 'CONTINUE' ? 'text-green-600' : 'text-red-600'}>
                    {activeVehicle.operational_advisory}
                  </b>
                </div>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      {/* 8. Map Legend Overlay */}
      <div className="absolute bottom-3 left-3 z-[1000] glass-panel px-3 py-2 rounded-lg text-[11px] font-mono border border-slate-700/80 shadow-lg text-slate-300">
        <div className="text-[9px] font-bold text-slate-400 uppercase mb-1">Accessibility & Corridor Legend</div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-3 h-1 bg-cyan-400 inline-block"></span> Primary (NH-13)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-1 bg-amber-400 border border-dashed border-amber-300 inline-block"></span> BRO Alternate Bypass
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Safe (&lt;30%)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Impassable / Blocked
          </span>
          <span className="flex items-center gap-1">
            <span className="text-[10px]">⚠️</span> Landslide Prediction Zone
          </span>
        </div>
      </div>
    </div>
  );
}
