import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, CircleMarker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { AlertOctagon, Mountain, Shield, Truck } from 'lucide-react';

// Fix standard Leaflet default icon issues in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom vehicle marker icon
const vehicleIcon = new L.DivIcon({
  className: 'custom-vehicle-marker',
  html: `
    <div style="
      background: #06b6d4;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid #ffffff;
      box-shadow: 0 0 16px #06b6d4;
      animation: pulse 1.5s infinite;
    ">
      <span style="font-size: 14px;">🚚</span>
    </div>
  `,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

// Custom hazard pin icon
const hazardIcon = new L.DivIcon({
  className: 'custom-hazard-marker',
  html: `
    <div style="
      background: #ef4444;
      width: 26px;
      height: 26px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid #ffffff;
      box-shadow: 0 0 14px #ef4444;
    ">
      <span style="font-size: 13px;">⚠️</span>
    </div>
  `,
  iconSize: [26, 26],
  iconAnchor: [13, 13],
});

// Helper component to center/fly map when needed
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
  segments = [],
  activeRoute = null,
  activeVehicle = null,
  reports = [],
  selectedSegment = null,
  onSelectSegment = () => {},
  mapCenter = [27.1, 92.3],
  mapZoom = 9
}) {
  // Determine segment color based on risk score & blockage
  const getSegmentColor = (seg) => {
    if (seg.is_blocked) return '#ef4444'; // Red
    if (seg.risk_score >= 0.70) return '#ef4444'; // Crimson
    if (seg.risk_score >= 0.45) return '#f97316'; // Orange
    if (seg.risk_score >= 0.30) return '#f59e0b'; // Amber
    return '#10b981'; // Emerald
  };

  return (
    <div className="relative w-full h-full min-h-[450px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ width: '100%', height: '100%' }}
        scrollWheelZoom={true}
      >
        <MapRecenter center={mapCenter} zoom={mapZoom} />

        {/* Free CartoDB Dark Matter Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a> & OpenStreetMap'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          maxZoom={18}
        />

        {/* 1. Base Road Network Segments */}
        {segments.map((seg) => {
          const isSelected = selectedSegment && selectedSegment.id === seg.id;
          const color = getSegmentColor(seg);
          return (
            <Polyline
              key={seg.id}
              positions={seg.coordinates}
              pathOptions={{
                color: isSelected ? '#38bdf8' : color,
                weight: isSelected ? 8 : (seg.is_blocked ? 5 : 4),
                opacity: isSelected ? 1.0 : (seg.is_blocked ? 0.9 : 0.75),
                dashArray: seg.is_blocked ? '6, 6' : undefined,
              }}
              eventHandlers={{
                click: () => onSelectSegment(seg)
              }}
            >
              <Popup>
                <div className="p-1 text-slate-900">
                  <div className="font-bold text-xs">{seg.name}</div>
                  <div className="text-[11px] text-slate-600 mt-1">
                    District: <b>{seg.district}</b><br />
                    Distance: <b>{seg.distance_km} km</b><br />
                    Slope: <b>{seg.geotechnical?.slope_deg}°</b> | Elev: <b>{seg.geotechnical?.elevation_m}m</b><br />
                    Risk Score: <b style={{ color }}>{(seg.risk_score * 100).toFixed(0)}% ({seg.risk_level})</b><br />
                    {seg.is_blocked && <span className="text-red-600 font-bold">⛔ BLOCKED: {seg.blockage_reason}</span>}
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

        {/* 2. Active Mission Route Highlight */}
        {activeRoute && activeRoute.polyline && (
          <Polyline
            positions={activeRoute.polyline}
            pathOptions={{
              color: '#06b6d4',
              weight: 5,
              opacity: 0.95,
              dashArray: '8, 8'
            }}
          />
        )}

        {/* 3. Active Vehicle Convoy Marker */}
        {activeVehicle && activeVehicle.current_lat && activeVehicle.current_lon && (
          <Marker
            position={[activeVehicle.current_lat, activeVehicle.current_lon]}
            icon={vehicleIcon}
          >
            <Popup>
              <div className="text-slate-900 text-xs">
                <div className="font-bold text-cyan-600 flex items-center gap-1">
                  🚚 {activeVehicle.vehicle_id}
                </div>
                <div className="mt-1 text-[11px]">
                  Status: <b>{activeVehicle.status}</b><br />
                  Speed: <b>{activeVehicle.speed_kmh} km/h</b><br />
                  Progress: <b>{activeVehicle.progress_pct}%</b><br />
                  Distance: <b>{activeVehicle.distance_covered_km} / {activeVehicle.total_distance_km} km</b><br />
                  Next Landmark: <b>{activeVehicle.next_landmark}</b><br />
                  Advisory: <b className={activeVehicle.operational_advisory === 'CONTINUE' ? 'text-green-600' : 'text-red-600'}>
                    {activeVehicle.operational_advisory}
                  </b>
                </div>
              </div>
            </Popup>
          </Marker>
        )}

        {/* 4. Active Field Incident Hazard Warning Pins */}
        {reports.filter(r => !r.is_resolved).map((report) => (
          <Marker
            key={report.id}
            position={[report.latitude, report.longitude]}
            icon={hazardIcon}
          >
            <Popup>
              <div className="text-slate-900 text-xs max-w-xs">
                <div className="font-bold text-red-600 flex items-center gap-1">
                  ⚠️ {report.incident_type} ({report.severity})
                </div>
                <div className="text-[11px] text-slate-700 mt-1">
                  Location: <b>{report.snapped_segment_name || 'Highway Corridor'}</b><br />
                  Reported by: <b>{report.agency}</b> ({report.reporter_name})<br />
                  Details: {report.description}<br />
                  Time: {report.timestamp}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* 5. Key Mountain Pass Markers */}
        <CircleMarker
          center={[27.5034, 92.1039]}
          radius={7}
          pathOptions={{ color: '#ffffff', fillColor: '#38bdf8', fillOpacity: 0.9 }}
        >
          <Popup>
            <div className="text-slate-900 text-xs">
              <b>🏔️ Sela Pass & Tunnel (13,700 ft / 3,733 m)</b><br />
              Strategic Alpine Chokepoint to Tawang.
            </div>
          </Popup>
        </CircleMarker>
      </MapContainer>

      {/* Floating Map Legend Overlay */}
      <div className="absolute bottom-4 left-4 z-[1000] glass-panel px-3 py-2 rounded-lg text-xs font-mono border border-slate-700/60 shadow-lg text-slate-300">
        <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Accessibility Risk Legend</div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Safe (&lt;30%)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Caution (30-65%)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> High (&gt;65%)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full border border-dashed border-red-500 bg-red-950"></span> Impassable / Blocked
          </span>
        </div>
      </div>
    </div>
  );
}
