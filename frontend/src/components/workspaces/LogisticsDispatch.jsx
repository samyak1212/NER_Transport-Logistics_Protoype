import React, { useState } from 'react';
import { 
  Truck, 
  Play, 
  Pause, 
  RotateCcw, 
  Navigation, 
  AlertOctagon, 
  ShieldCheck, 
  ArrowRight, 
  Gauge, 
  Clock, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';

export default function LogisticsDispatch({
  nodes = [],
  activeVehicle,
  comparisonData,
  onCalculateRoute,
  onAdvanceVehicle,
  onPauseVehicle,
  onResumeVehicle,
  onRerouteVehicle,
  isLoadingRoute
}) {
  const [origin, setOrigin] = useState('Guwahati');
  const [destination, setDestination] = useState('Tawang');
  const [cargoPriority, setCargoPriority] = useState('CRITICAL_MEDICAL');

  const handleCalculate = (e) => {
    e.preventDefault();
    onCalculateRoute(origin, destination, cargoPriority);
  };

  return (
    <div className="space-y-4 text-slate-200">
      {/* 1. Automated Reactive Rerouting Alert Banner (When Convoy meets Hazard) */}
      {activeVehicle?.ahead_hazard_detected && (
        <div className="p-4 rounded-xl bg-rose-950/80 border-2 border-rose-500 shadow-2xl animate-pulse flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <AlertOctagon className="w-7 h-7 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-sm text-rose-100 flex items-center gap-2">
                AUTOMATED DISRUPTION ENGINE: HAZARD INTERCEPTED
                <span className="px-2 py-0.2 text-[10px] bg-rose-800 text-white rounded font-mono uppercase">
                  Action Required
                </span>
              </div>
              <p className="text-xs text-rose-200 mt-1">
                {activeVehicle.ahead_hazard_detail || 'A sudden landslide has severed the convoy route.'}
              </p>
            </div>
          </div>

          <button
            onClick={onRerouteVehicle}
            className="px-4 py-2 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold text-xs rounded-lg shadow-lg shadow-rose-900/50 flex items-center gap-2 whitespace-nowrap transition-all"
          >
            <Navigation className="w-4 h-4" />
            <span>AUTHORIZE SAFE DETOUR (KALAKTANG BYPASS)</span>
          </button>
        </div>
      )}

      {/* 2. Mission Configuration Rail & Route Trade-Off */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left: Mission Form */}
        <div className="glass-panel p-4 rounded-xl border border-slate-800">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2 pb-2 border-b border-slate-800">
            <Navigation className="w-4 h-4 text-emerald-400" />
            Mission Dispatch Planner
          </h3>

          <form onSubmit={handleCalculate} className="mt-3 space-y-3 text-xs">
            <div>
              <label className="text-slate-400 font-medium">Origin Supply Hub</label>
              <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="mt-1 w-full bg-defense-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:border-cyan-500 outline-none font-mono"
              >
                {nodes.map(n => (
                  <option key={n.id} value={n.id}>{n.name} ({n.state})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-slate-400 font-medium">Destination Frontier Depot</label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="mt-1 w-full bg-defense-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:border-cyan-500 outline-none font-mono"
              >
                {nodes.map(n => (
                  <option key={n.id} value={n.id}>{n.name} ({n.state})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-slate-400 font-medium flex items-center justify-between">
                <span>Cargo Priority Sensitivity (λ)</span>
                <span className="text-[10px] text-cyan-400 font-mono">Statutory Clause c</span>
              </label>
              <select
                value={cargoPriority}
                onChange={(e) => setCargoPriority(e.target.value)}
                className="mt-1 w-full bg-defense-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:border-cyan-500 outline-none font-mono"
              >
                <option value="CRITICAL_MEDICAL">Critical Medical Cold-Chain (λ=4.0 Max Safety)</option>
                <option value="ESSENTIAL_FOOD">Essential Food & PDS Grains (λ=2.0 Balanced)</option>
                <option value="FUEL_POL">Petroleum, Oil & Lubricants (λ=1.8 High Hazard)</option>
                <option value="CONSTRUCTION">Construction & Infrastructure (λ=0.8 Distance)</option>
                <option value="GENERAL">General Commercial Freight (λ=1.0 Standard)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoadingRoute}
              className="w-full mt-2 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-lg shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isLoadingRoute ? (
                <span>Calculating Optimal Path...</span>
              ) : (
                <>
                  <Navigation className="w-4 h-4" />
                  <span>CALCULATE RISK-OPTIMAL ROUTE</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Center & Right: Side-by-Side Trade-Off Comparison Matrix */}
        <div className="lg:col-span-2 glass-panel p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                Side-by-Side Route Trade-Off Matrix (Fastest vs. Risk-Aware)
              </h3>
              <span className="text-[11px] font-mono text-cyan-400">
                Decision Support Engine
              </span>
            </div>

            {comparisonData ? (
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Fastest Route Card */}
                <div className="p-3 rounded-lg bg-defense-900 border border-slate-800 text-xs">
                  <div className="flex justify-between items-center text-slate-400 pb-1 border-b border-slate-800">
                    <span className="font-bold">Fastest Route (Baseline)</span>
                    <span className="font-mono text-slate-500">λ = 0.0</span>
                  </div>
                  <div className="mt-2 space-y-1 font-mono text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Duration:</span>
                      <span className="font-bold text-slate-100">{comparisonData.fastest.total_time_hours} hrs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Distance:</span>
                      <span>{comparisonData.fastest.total_distance_km} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Disruption Risk:</span>
                      <span className="font-bold text-rose-400">{(comparisonData.fastest.average_risk_score * 100).toFixed(0)}% (HIGH)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Hazard Zones:</span>
                      <span className="text-rose-400 font-bold">{comparisonData.fastest.hazard_zones_count} active</span>
                    </div>
                  </div>
                </div>

                {/* Risk-Aware Route Card */}
                <div className="p-3 rounded-lg bg-defense-900 border border-cyan-900/60 text-xs">
                  <div className="flex justify-between items-center text-cyan-400 pb-1 border-b border-slate-800">
                    <span className="font-bold">Risk-Aware Route (Selected)</span>
                    <span className="font-mono text-emerald-400 font-bold">RECOMMENDED</span>
                  </div>
                  <div className="mt-2 space-y-1 font-mono text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Duration:</span>
                      <span className="font-bold text-slate-100">
                        {comparisonData.risk_aware.total_time_hours} hrs
                        <span className="text-amber-400 font-normal ml-1">
                          (+{comparisonData.delta_time_hours}h)
                        </span>
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Distance:</span>
                      <span>{comparisonData.risk_aware.total_distance_km} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Disruption Risk:</span>
                      <span className="font-bold text-emerald-400">
                        {(comparisonData.risk_aware.average_risk_score * 100).toFixed(0)}%
                        <span className="text-emerald-300 font-normal ml-1">
                          (-{comparisonData.delta_risk_pct}%)
                        </span>
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Hazard Zones:</span>
                      <span className="text-emerald-400 font-bold">{comparisonData.risk_aware.hazard_zones_count} zones</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-6 text-center py-6 text-slate-500 text-xs">
                Click "Calculate Risk-Optimal Route" to compute side-by-side trade-offs.
              </div>
            )}
          </div>

          {comparisonData && (
            <div className="mt-3 p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-800/60 text-cyan-200 text-xs flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>{comparisonData.recommendation_reason}</span>
            </div>
          )}
        </div>
      </div>

      {/* 3. Live Monitored Convoy Telemetry & Controls */}
      <div className="glass-panel p-4 rounded-xl border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-cyan-400" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200">
              Active Monitored Convoy Telemetry (GPS Stream)
            </h3>
            <span className="font-mono text-xs text-slate-400">
              ID: <b className="text-slate-100">{activeVehicle?.vehicle_id || 'MED_CONVOY_01'}</b>
            </span>
          </div>

          {/* Simulation Step Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onAdvanceVehicle(5.0)}
              className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all"
            >
              <Play className="w-3.5 h-3.5" />
              <span>ADVANCE CONVOY (+5%)</span>
            </button>

            {activeVehicle?.status === 'PAUSED' ? (
              <button
                onClick={onResumeVehicle}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-lg text-xs font-bold transition-all"
              >
                Resume
              </button>
            ) : (
              <button
                onClick={onPauseVehicle}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg text-xs font-bold transition-all"
              >
                Pause
              </button>
            )}
          </div>
        </div>

        {/* Telemetry Readout Grid */}
        <div className="mt-3 grid grid-cols-2 md:grid-cols-5 gap-3 font-mono text-xs">
          <div className="p-2.5 rounded-lg bg-defense-900 border border-slate-800">
            <div className="text-[10px] text-slate-400">STATUS</div>
            <div className="text-sm font-bold text-cyan-400 mt-0.5">{activeVehicle?.status || 'IN_TRANSIT'}</div>
            <div className="text-[10px] text-slate-500">{activeVehicle?.operational_advisory}</div>
          </div>

          <div className="p-2.5 rounded-lg bg-defense-900 border border-slate-800">
            <div className="text-[10px] text-slate-400">SPEED</div>
            <div className="text-sm font-bold text-slate-100 mt-0.5">{activeVehicle?.speed_kmh || 42} km/h</div>
            <div className="text-[10px] text-slate-500">Mountain Speed</div>
          </div>

          <div className="p-2.5 rounded-lg bg-defense-900 border border-slate-800">
            <div className="text-[10px] text-slate-400">PROGRESS</div>
            <div className="text-sm font-bold text-emerald-400 mt-0.5">{activeVehicle?.progress_pct || 0}%</div>
            <div className="text-[10px] text-slate-500">
              {activeVehicle?.distance_covered_km || 0} / {activeVehicle?.total_distance_km || 380} km
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-defense-900 border border-slate-800">
            <div className="text-[10px] text-slate-400">ESTIMATED ETA</div>
            <div className="text-sm font-bold text-slate-100 mt-0.5">{activeVehicle?.eta_hours || 8.4} hrs</div>
            <div className="text-[10px] text-slate-500">to Tawang PHC</div>
          </div>

          <div className="p-2.5 rounded-lg bg-defense-900 border border-slate-800">
            <div className="text-[10px] text-slate-400">APPROACHING</div>
            <div className="text-sm font-bold text-amber-300 mt-0.5 truncate">{activeVehicle?.next_landmark || 'Bhalukpong'}</div>
            <div className="text-[10px] text-slate-500">Next Staging Hub</div>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="mt-3">
          <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
            <span>Guwahati (Origin)</span>
            <span className="font-bold text-cyan-400">{activeVehicle?.progress_pct || 0}% Completed</span>
            <span>Tawang (Destination)</span>
          </div>
          <div className="w-full h-2.5 bg-defense-900 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${activeVehicle?.progress_pct || 0}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
