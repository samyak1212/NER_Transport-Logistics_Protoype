import React, { useState } from 'react';
import { 
  Gauge, 
  AlertTriangle, 
  Radio, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Compass, 
  Volume2, 
  PhoneCall,
  CornerUpRight,
  Mountain,
  Fuel,
  Coffee,
  CheckCircle2,
  Wifi,
  Navigation
} from 'lucide-react';

export default function DriverHUD({ 
  activeVehicle,
  onRerouteVehicle = () => {}
}) {
  const [sosSent, setSosSent] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);

  const handleSOS = () => {
    setSosSent(true);
    setTimeout(() => setSosSent(false), 6000);
  };

  const isHazardAhead = activeVehicle?.ahead_hazard_detected;

  const restStops = [
    {
      name: 'BRO 42 BRTF Transit Shelter',
      location: 'Bhalukpong km 48',
      distance: '18 km ahead',
      services: ['Water', 'Medical Aid', 'Satellite Phone'],
      status: 'OPEN'
    },
    {
      name: 'Indian Oil (IOCL) High-Altitude Fuel Bunk',
      location: 'Bomdila km 135',
      distance: '52 km ahead',
      services: ['Winter Diesel', 'Engine Coolant', 'Air Pressure'],
      status: 'OPERATIONAL'
    },
    {
      name: 'Dirang Highway Rest & Food Canteen',
      location: 'Dirang km 172',
      distance: '84 km ahead',
      services: ['Hot Meals', 'Driver Dormitory', 'Tire Repair'],
      status: 'OPEN'
    }
  ];

  return (
    <div className="space-y-4 text-slate-100 font-mono select-none">
      {/* 1. Driver In-Cab Top Status Bar */}
      <div className="glass-panel p-3 rounded-xl border border-slate-700/80 flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 shadow-lg">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow">
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <span>TRUCK CABIN IN-CAB NAVIGATOR</span>
              <span className="text-slate-500 font-normal">|</span>
              <span className="text-cyan-400">{activeVehicle?.vehicle_id || 'MED_CONVOY_01'}</span>
            </div>
            <div className="text-[10px] text-slate-400 font-sans">
              Cargo: <b className="text-rose-400">{activeVehicle?.cargo_description || 'Critical Medical Cold-Chain Vaccines'}</b>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Offline Cache Status */}
          <div className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>OFFLINE GPS CACHE READY</span>
          </div>

          <button
            onClick={() => setAudioMuted(!audioMuted)}
            className={`p-1.5 rounded-lg border text-xs transition-all ${
              audioMuted ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-blue-600/20 border-blue-500/40 text-blue-300'
            }`}
            title="Toggle Voice Alerts"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. SOS Distress Flash Feedback */}
      {sosSent && (
        <div className="p-4 rounded-xl bg-rose-600 text-white font-bold text-center animate-bounce shadow-2xl border-2 border-white">
          🚨 EMERGENCY SOS DISTRESS BEACON TRANSMITTED! SATELLITE BROADCAST LOGGED AT BRO 42 BRTF & DISASTER COMMAND.
        </div>
      )}

      {/* 3. Ahead Hazard Radar Banner with 1-Touch Detour Prompt */}
      <div className={`p-4 rounded-xl border-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
        isHazardAhead
          ? 'bg-rose-950/90 border-rose-500 text-rose-100 animate-pulse shadow-xl shadow-rose-950/80'
          : 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shrink-0 shadow-lg ${
            isHazardAhead ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
          }`}>
            {isHazardAhead ? '⚠️' : '🛡️'}
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-slate-400 font-mono">
              Ahead Route Radar (Next 25 km Scan)
            </div>
            <div className="text-base md:text-lg font-black tracking-tight">
              {isHazardAhead
                ? 'ALERT: ROAD DEBRIS / HAZARD REPORTED AHEAD'
                : 'FORWARD HIGHWAY CLEAR — MAINTAIN MOUNTAIN SPEED'}
            </div>
            <div className="text-xs text-slate-300 mt-0.5 font-sans">
              {isHazardAhead
                ? activeVehicle?.ahead_hazard_detail || 'Sudden scree slide blocking forward lane. Advisory detour suggested.'
                : 'Pavement clear. No active rockfalls or landslides reported in immediate sector.'}
            </div>
          </div>
        </div>

        {/* Action button if hazard is ahead */}
        {isHazardAhead && (
          <button
            onClick={onRerouteVehicle}
            className="w-full md:w-auto px-4 py-3 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white font-black text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 whitespace-nowrap active:scale-95 transition-all border border-amber-300"
          >
            <CornerUpRight className="w-4 h-4" />
            <span>AUTHORIZE SAFE DETOUR (KALAKTANG BYPASS)</span>
          </button>
        )}
      </div>

      {/* 4. Large Cockpit Instruments Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Speedometer Instrument */}
        <div className="glass-panel p-6 rounded-2xl border-2 border-slate-700 flex flex-col items-center justify-center text-center bg-slate-900/80">
          <span className="text-xs text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <Gauge className="w-4 h-4 text-cyan-400" />
            Convoy Speedometer
          </span>
          <div className="mt-3 text-7xl font-black text-cyan-400 tracking-tighter">
            {activeVehicle?.speed_kmh || 42}
          </div>
          <span className="text-sm font-bold text-slate-400 mt-1">KM / HOUR</span>
          <div className="mt-3 px-3 py-1 rounded-full bg-slate-800 text-[11px] text-slate-300 font-mono">
            Speed Limit: 45 km/h &bull; Altitude: <b>2,850m</b>
          </div>
        </div>

        {/* Turn-by-Turn Maneuver Indicator */}
        <div className="glass-panel p-6 rounded-2xl border-2 border-slate-700 flex flex-col justify-between bg-slate-900/80">
          <div>
            <span className="text-xs text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <CornerUpRight className="w-4 h-4 text-emerald-400" />
              Next Driving Maneuver
            </span>
            <div className="mt-3 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-xl shrink-0">
                ↱
              </div>
              <div>
                <div className="text-lg font-black text-white">
                  In 8.4 km: Keep Right
                </div>
                <div className="text-xs text-slate-300 font-sans mt-0.5">
                  Follow NH-13 Corridor towards Dirang & Sela Summit
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
            <div>
              <span className="text-slate-400">Remaining Dist:</span>
              <div className="text-sm font-bold text-slate-100">
                {Math.max(0, (activeVehicle?.total_distance_km || 380) - (activeVehicle?.distance_covered_km || 0)).toFixed(0)} km
              </div>
            </div>
            <div className="text-right">
              <span className="text-slate-400">ETA to Destination:</span>
              <div className="text-sm font-bold text-emerald-400">
                {activeVehicle?.eta_hours || 7.5} hrs
              </div>
            </div>
          </div>
        </div>

        {/* Emergency SOS Distress Button */}
        <div className="glass-panel p-6 rounded-2xl border-2 border-rose-900/80 bg-rose-950/30 flex flex-col items-center justify-between text-center">
          <div>
            <span className="text-xs text-rose-400 uppercase tracking-widest flex items-center justify-center gap-1.5 font-bold">
              <Radio className="w-4 h-4 text-rose-500 animate-pulse" />
              Emergency SOS Beacon
            </span>
            <p className="text-[11px] text-slate-300 mt-2 font-sans">
              One-touch satellite distress transmission. Immediately notifies nearest BRO detachment, police checkpost, and medical trauma response.
            </p>
          </div>

          <button
            onClick={handleSOS}
            className="w-full mt-4 py-4 rounded-xl bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 text-white font-black text-lg shadow-2xl shadow-rose-950 border-2 border-rose-400 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>🚨 TRANSMIT DISTRESS SOS</span>
          </button>
        </div>
      </div>

      {/* 5. Alpine Mountain Pass & High-Altitude Weather Advisory */}
      <div className="glass-panel p-4 rounded-xl border border-amber-500/40 bg-amber-950/20 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
            <Mountain className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-amber-300 flex items-center gap-2">
              <span>ALPINE PASS WEATHER ADVISORY: SELA PASS SUMMIT (3,733 METERS)</span>
              <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-[9px] text-amber-300 font-mono">
                LIVE SENSOR
              </span>
            </div>
            <div className="text-xs text-slate-300 font-sans mt-0.5">
              Current Temp: <b>-2.4°C</b> &bull; Dense fog & sleet reported. <b>Snow chains required</b> above Jaswant Garh. Sela Tunnel bypass is clear.
            </div>
          </div>
        </div>

        <div className="text-right hidden md:block">
          <span className="text-[10px] text-slate-400 font-mono">Sela Pass Distance</span>
          <div className="text-sm font-bold text-amber-400 font-mono">28 km ahead</div>
        </div>
      </div>

      {/* 6. Rest Stops, Shelters & Fuel Bunks Along Corridor */}
      <div className="glass-panel p-4 rounded-xl border border-slate-800">
        <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2 mb-3">
          <Coffee className="w-4 h-4 text-cyan-400" />
          Upcoming Mountain Rest Stops, Shelters & Fuel Stations Ahead
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {restStops.map((stop, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-col justify-between text-xs space-y-2">
              <div>
                <div className="flex justify-between items-start">
                  <span className="font-bold text-slate-100">{stop.name}</span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                    {stop.distance}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Location: {stop.location}
                </div>
              </div>

              <div className="flex flex-wrap gap-1 pt-2 border-t border-slate-800">
                {stop.services.map((srv, sIdx) => (
                  <span key={sIdx} className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">
                    {srv}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Journey Progress Gauge */}
      <div className="glass-panel p-4 rounded-xl border border-slate-800">
        <div className="flex justify-between text-xs text-slate-400 mb-2">
          <span>Guwahati Central Depot (Origin)</span>
          <span className="text-cyan-400 font-bold">{activeVehicle?.progress_pct || 0}% Traversed</span>
          <span>Tawang Civil Hospital (Destination)</span>
        </div>
        <div className="w-full h-4 bg-defense-900 rounded-full overflow-hidden border border-slate-700">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500"
            style={{ width: `${activeVehicle?.progress_pct || 0}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
