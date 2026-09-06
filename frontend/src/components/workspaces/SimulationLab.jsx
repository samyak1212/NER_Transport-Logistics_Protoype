import React, { useState } from 'react';
import { 
  FlaskConical, 
  AlertTriangle, 
  CloudRain, 
  RotateCcw, 
  Zap, 
  CheckCircle2, 
  ShieldAlert, 
  Play 
} from 'lucide-react';
import { api } from '../../services/api';

export default function SimulationLab({
  segments = [],
  onHazardInjected = () => {},
  onWeatherChanged = () => {},
  onResetComplete = () => {}
}) {
  const [targetSegment, setTargetSegment] = useState('SEG_06');
  const [incidentType, setIncidentType] = useState('LANDSLIDE');
  const [description, setDescription] = useState('Heavy scree rockfall triggered by 80mm rain burst');
  const [rainMultiplier, setRainMultiplier] = useState(1.8);
  const [actionStatus, setActionStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInjectHazard = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await api.injectHazard(targetSegment, incidentType, description);
      setActionStatus({ type: 'success', msg: res.message });
      onHazardInjected();
    } catch (err) {
      setActionStatus({ type: 'error', msg: 'Failed to inject hazard' });
    } finally {
      setIsLoading(false);
      setTimeout(() => setActionStatus(null), 5000);
    }
  };

  const handleWeatherUpdate = async () => {
    setIsLoading(true);
    try {
      const res = await api.simulateWeather(rainMultiplier, rainMultiplier > 2.0 ? 'CLOUDBURST' : 'MONSOON_SURGE');
      setActionStatus({ type: 'success', msg: res.message });
      onWeatherChanged();
    } catch (err) {
      setActionStatus({ type: 'error', msg: 'Failed to update weather' });
    } finally {
      setIsLoading(false);
      setTimeout(() => setActionStatus(null), 5000);
    }
  };

  const handleReset = async () => {
    setIsLoading(true);
    try {
      const res = await api.resetSimulation();
      setActionStatus({ type: 'success', msg: res.message });
      onResetComplete();
    } catch (err) {
      setActionStatus({ type: 'error', msg: 'Failed to reset simulation' });
    } finally {
      setIsLoading(false);
      setTimeout(() => setActionStatus(null), 5000);
    }
  };

  return (
    <div className="space-y-4 text-slate-200">
      {/* Evaluator Welcome Banner */}
      <div className="glass-panel p-4 rounded-xl border border-purple-900/50 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <FlaskConical className="w-6 h-6 text-purple-400" />
          <div>
            <h2 className="font-bold text-sm text-slate-100 flex items-center gap-2">
              SIH Evaluator Stress-Test & Simulation Lab
              <span className="px-2 py-0.2 rounded text-[10px] bg-purple-950 text-purple-400 border border-purple-800 font-mono">
                Jury Bench
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Stress-test the AI disruption engine, inject synthetic landslides, and observe real-time reactive rerouting
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          disabled={isLoading}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs font-bold rounded-lg border border-slate-700 flex items-center gap-2 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
          <span>RESET TO PRISTINE BASELINE</span>
        </button>
      </div>

      {actionStatus && (
        <div className={`p-3 rounded-lg text-xs font-mono flex items-center gap-2 ${
          actionStatus.type === 'success'
            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
            : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
        }`}>
          <CheckCircle2 className="w-4 h-4" />
          <span>{actionStatus.msg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 1. Synthetic Obstacle Injection Console */}
        <div className="glass-panel p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Inject Synthetic Disruption Hazard
            </h3>
            <span className="text-[10px] text-amber-400 font-mono">Clause b & e</span>
          </div>

          <form onSubmit={handleInjectHazard} className="mt-3 space-y-3 text-xs">
            <div>
              <label className="text-slate-400 font-medium">Target Road Segment</label>
              <select
                value={targetSegment}
                onChange={(e) => setTargetSegment(e.target.value)}
                className="mt-1 w-full bg-defense-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs outline-none focus:border-purple-500"
              >
                {segments.map(s => (
                  <option key={s.id} value={s.id}>
                    [{s.id}] {s.name} ({s.is_blocked ? 'ALREADY BLOCKED' : `Risk: ${(s.risk_score * 100).toFixed(0)}%`})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-400 font-medium">Disruption Type</label>
                <select
                  value={incidentType}
                  onChange={(e) => setIncidentType(e.target.value)}
                  className="mt-1 w-full bg-defense-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs outline-none focus:border-purple-500"
                >
                  <option value="LANDSLIDE">Major Landslide</option>
                  <option value="FLASH_FLOOD">Flash Flood Washout</option>
                  <option value="ROAD_BLOCKAGE">Rockfall Debris</option>
                  <option value="BRIDGE_DAMAGED">Bridge Abutment Failure</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 font-medium">Severity</label>
                <input
                  type="text"
                  disabled
                  value="BLOCKING (Both Lanes)"
                  className="mt-1 w-full bg-defense-900 border border-slate-800 rounded-lg px-3 py-2 text-rose-400 font-mono text-xs"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 font-medium">Incident Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 w-full bg-defense-900 border border-slate-700 rounded-lg p-2 text-slate-100 text-xs outline-none focus:border-purple-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white font-bold rounded-lg shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>TRIGGER DISRUPTION & FORCE REROUTE</span>
            </button>
          </form>
        </div>

        {/* 2. Meteorological Surge Simulator */}
        <div className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <CloudRain className="w-4 h-4 text-blue-400" />
                Monsoon Rainfall Surge Simulator
              </h3>
              <span className="text-[10px] text-blue-400 font-mono">Clause b</span>
            </div>

            <div className="mt-3 space-y-3 text-xs">
              <p className="text-slate-400 leading-relaxed">
                Dynamically scales precipitation across all NASA SRTM slope segments. Observes how higher rainfall values propagate exponentially into landslide probabilities.
              </p>

              <div>
                <div className="flex justify-between font-mono text-slate-300 mb-1">
                  <span>Precipitation Multiplier:</span>
                  <span className="text-cyan-400 font-bold text-sm">{rainMultiplier}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="3.0"
                  step="0.1"
                  value={rainMultiplier}
                  onChange={(e) => setRainMultiplier(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>0.5x (Dry Winter)</span>
                  <span>1.0x (Normal)</span>
                  <span>2.0x (Monsoon Surge)</span>
                  <span>3.0x (Cloudburst)</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-defense-900 border border-slate-800 font-mono text-[11px] space-y-1 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Current Simulation Scenario:</span>
                  <span className="text-amber-400 font-bold">
                    {rainMultiplier >= 2.5 ? '⚡ CLOUDBURST' : rainMultiplier >= 1.5 ? '🌧️ MONSOON SURGE' : '⛅ NORMAL MONSOON'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Sessa Scree Rain:</span>
                  <span>{(55 * rainMultiplier).toFixed(1)} mm/24h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Sela Summit Rain:</span>
                  <span>{(56.5 * rainMultiplier).toFixed(1)} mm/24h</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleWeatherUpdate}
            disabled={isLoading}
            className="w-full mt-3 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold rounded-lg shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 text-xs"
          >
            <CloudRain className="w-4 h-4" />
            <span>APPLY RAINFALL SURGE TO NETWORK</span>
          </button>
        </div>
      </div>
    </div>
  );
}
