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
  PhoneCall 
} from 'lucide-react';

export default function DriverHUD({ activeVehicle }) {
  const [sosSent, setSosSent] = useState(false);

  const handleSOS = () => {
    setSosSent(true);
    setTimeout(() => setSosSent(false), 5000);
  };

  const isHazardAhead = activeVehicle?.ahead_hazard_detected;

  return (
    <div className="space-y-4 text-slate-100 font-mono">
      {/* 1. SOS Broadcast Flash Feedback */}
      {sosSent && (
        <div className="p-4 rounded-xl bg-rose-600 text-white font-bold text-center animate-bounce shadow-2xl border-2 border-white">
          🚨 EMERGENCY SOS DISTRESS BEACON TRANSMITTED! SATELLITE BROADCAST LOGGED AT BRO 42 BRTF & DISASTER COMMAND.
        </div>
      )}

      {/* 2. Ahead Hazard Radar Banner */}
      <div className={`p-4 rounded-xl border-2 flex items-center justify-between ${
        isHazardAhead
          ? 'bg-rose-950/90 border-rose-500 text-rose-100 animate-pulse shadow-lg shadow-rose-900/40'
          : 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold ${
            isHazardAhead ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
          }`}>
            {isHazardAhead ? '⚠️' : '🛡️'}
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-slate-400">
              Ahead Route Radar (Next 25 km)
            </div>
            <div className="text-base font-bold">
              {isHazardAhead
                ? 'ALERT: ROAD DEBRIS / HAZARD REPORTED AHEAD'
                : 'FORWARD CORRIDOR CLEAR — MAINTAIN MOUNTAIN TRANSIT SPEED'}
            </div>
            <div className="text-xs text-slate-300 mt-0.5">
              {isHazardAhead
                ? activeVehicle?.ahead_hazard_detail || 'Caution advised. Approaching active slide zone.'
                : 'Road surface passable. No active slide reports in immediate 25 km sector.'}
            </div>
          </div>
        </div>

        <div className="text-right hidden sm:block">
          <div className="text-xs text-slate-400">Advisory:</div>
          <div className={`text-lg font-black ${
            activeVehicle?.operational_advisory === 'CONTINUE' ? 'text-emerald-400' : 'text-rose-400'
          }`}>
            {activeVehicle?.operational_advisory || 'CONTINUE'}
          </div>
        </div>
      </div>

      {/* 3. Primary Cockpit Instruments */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Speedometer Instrument */}
        <div className="glass-panel p-6 rounded-2xl border-2 border-slate-700 flex flex-col items-center justify-center text-center">
          <span className="text-xs text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <Gauge className="w-4 h-4 text-cyan-400" />
            Convoy Speedometer
          </span>
          <div className="mt-3 text-6xl font-black text-cyan-400 tracking-tighter">
            {activeVehicle?.speed_kmh || 42}
          </div>
          <span className="text-sm font-bold text-slate-400 mt-1">KM / H</span>
          <span className="text-[11px] text-slate-500 mt-2">Permitted Hill Speed: 45 km/h</span>
        </div>

        {/* Milestone & Landmark Instrument */}
        <div className="glass-panel p-6 rounded-2xl border-2 border-slate-700 flex flex-col justify-between">
          <div>
            <span className="text-xs text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-amber-400" />
              Approaching Milestone
            </span>
            <div className="mt-3 text-2xl font-black text-amber-300 truncate">
              {activeVehicle?.next_landmark || 'Sela Pass'}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Next Checkpost & Staging Hub
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
            <div>
              <span className="text-slate-400">Remaining to Dest:</span>
              <div className="text-sm font-bold text-slate-100">
                {Math.max(0, (activeVehicle?.total_distance_km || 380) - (activeVehicle?.distance_covered_km || 0)).toFixed(0)} km
              </div>
            </div>
            <div className="text-right">
              <span className="text-slate-400">ETA to Tawang:</span>
              <div className="text-sm font-bold text-emerald-400">
                {activeVehicle?.eta_hours || 7.5} hrs
              </div>
            </div>
          </div>
        </div>

        {/* Emergency SOS Distress Button */}
        <div className="glass-panel p-6 rounded-2xl border-2 border-rose-900/80 bg-rose-950/20 flex flex-col items-center justify-between text-center">
          <div>
            <span className="text-xs text-rose-400 uppercase tracking-widest flex items-center justify-center gap-1.5 font-bold">
              <Radio className="w-4 h-4 text-rose-500 animate-pulse" />
              Emergency Distress Action
            </span>
            <p className="text-[11px] text-slate-400 mt-2">
              Instant satellite distress broadcast in telecom dead-zones. Notifies nearest BRO camp.
            </p>
          </div>

          <button
            onClick={handleSOS}
            className="w-full mt-4 py-4 rounded-xl bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 text-white font-black text-lg shadow-xl shadow-rose-950/80 border-2 border-rose-400 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>🚨 EMERGENCY SOS</span>
          </button>
        </div>
      </div>

      {/* 4. Journey Progress Gauge */}
      <div className="glass-panel p-4 rounded-xl border border-slate-800">
        <div className="flex justify-between text-xs text-slate-400 mb-2">
          <span>Guwahati Central Depot</span>
          <span className="text-cyan-400 font-bold">{activeVehicle?.progress_pct || 0}% Traversed</span>
          <span>Tawang Civil Hospital</span>
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
