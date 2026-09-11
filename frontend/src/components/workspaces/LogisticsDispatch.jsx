import React, { useState, useEffect } from 'react';
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
  HelpCircle, 
  CornerUpRight, 
  PackageCheck,
  User,
  BadgeCheck,
  Phone,
  Layers,
  Train,
  Scale,
  Activity,
  AlertTriangle,
  Compass
} from 'lucide-react';
import MapCanvas from '../MapCanvas';
import { MULTIMODAL_LOGISTICS } from '../../data/defaultData';

export default function LogisticsDispatch({
  nodes = [],
  segments = [],
  activeRoute,
  activeVehicle,
  currentDriver,
  drivers = [],
  selectedDriverId,
  onSelectDriver = () => {},
  comparisonData,
  onCalculateRoute,
  onAdvanceVehicle,
  onPauseVehicle,
  onResumeVehicle,
  onRerouteVehicle,
  isLoadingRoute
}) {
  const [activeSubTab, setActiveSubTab] = useState('planning'); // 'planning', 'multimodal', 'throughput', 'telemetry'
  const [origin, setOrigin] = useState('Guwahati');
  const [destination, setDestination] = useState('Tawang');
  const [cargoPriority, setCargoPriority] = useState('CRITICAL_MEDICAL');

  // Keep cargo priority aligned with selected driver when driver changes
  useEffect(() => {
    if (currentDriver?.cargo_priority) {
      setCargoPriority(currentDriver.cargo_priority);
    }
  }, [currentDriver]);

  const handleCalculate = (e) => {
    e.preventDefault();
    onCalculateRoute(origin, destination, cargoPriority);
  };

  const driver = currentDriver || drivers[0] || {
    name: 'Subedar R. Thapa',
    id: 'DRV-014',
    phone: '+91 94350-12844',
    license_no: 'HMV-AR-2016-9021',
    vehicle_reg: 'AS-01-EC-9042',
    vehicle_model: 'Tata 1618 SE 4x4 Cold-Chain'
  };

  return (
    <div className="space-y-4 text-slate-200 font-sans">
      {/* 1. Automated Reactive Rerouting Alert Banner (When Convoy meets Hazard) */}
      {activeVehicle?.ahead_hazard_detected && (
        <div className="p-4 rounded-xl bg-rose-950/80 border-2 border-rose-500 shadow-2xl animate-pulse flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <AlertOctagon className="w-7 h-7 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-sm text-rose-100 flex items-center gap-2">
                AUTOMATED DISRUPTION ENGINE: HAZARD INTERCEPTED (Clause e)
                <span className="px-2 py-0.2 text-[10px] bg-rose-800 text-white rounded font-mono uppercase">
                  Action Required
                </span>
              </div>
              <p className="text-xs text-rose-200 mt-1">
                {activeVehicle.ahead_hazard_detail || 'A sudden landslide has severed the forward highway route.'}
              </p>
            </div>
          </div>

          <button
            onClick={onRerouteVehicle}
            className="px-4 py-2.5 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-900/50 flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer active:scale-95 border border-amber-300"
          >
            <CornerUpRight className="w-4 h-4" />
            <span>AUTHORIZE SAFE DETOUR (KALAKTANG BYPASS)</span>
          </button>
        </div>
      )}

      {/* 2. Sub-Tabs Bar for Logistics Dispatch */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-xl overflow-x-auto shadow-inner">
        <button
          onClick={() => setActiveSubTab('planning')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeSubTab === 'planning'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Navigation className="w-4 h-4 text-emerald-400" />
          <span>Route Planning & Comparison</span>
        </button>

        <button
          onClick={() => setActiveSubTab('multimodal')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeSubTab === 'multimodal'
              ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Train className="w-4 h-4 text-cyan-400" />
          <span>Multi-Modal Freight (Rail + Road)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('throughput')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeSubTab === 'throughput'
              ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Scale className="w-4 h-4 text-amber-400" />
          <span>Corridor Capacity & Clearances</span>
        </button>

        <button
          onClick={() => setActiveSubTab('telemetry')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeSubTab === 'telemetry'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Gauge className="w-4 h-4 text-purple-400" />
          <span>Live Fleet Telemetry & Simulator</span>
        </button>
      </div>

      {/* 3. Sub-Tab 1: ROUTE PLANNING & COMPARISON */}
      {activeSubTab === 'planning' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Mission Form */}
          <div className="glass-panel p-4 rounded-xl border border-slate-800 shadow-lg space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2 pb-2 border-b border-slate-800">
              <Navigation className="w-4 h-4 text-emerald-400" />
              <span>Consignment Dispatch Configuration</span>
            </h3>

            {/* Driver Link Card */}
            <div className="p-2.5 rounded-xl bg-defense-900 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center font-bold text-emerald-400 text-xs">
                  {driver.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <div className="font-bold text-xs text-white">{driver.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{driver.vehicle_reg} &bull; {driver.id}</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300">
                ACTIVE
              </span>
            </div>

            <form onSubmit={handleCalculate} className="space-y-3 font-sans text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-mono text-[11px]">Origin Node (Supply Hub)</label>
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full bg-defense-900 border border-slate-700 rounded-lg p-2 text-slate-100 font-mono text-xs focus:border-emerald-500 focus:outline-none"
                >
                  <option value="Guwahati">Guwahati (Central Regional Depot)</option>
                  <option value="Tezpur">Tezpur (Plains Staging Base)</option>
                  <option value="Siliguri">Siliguri (North Bengal Railhead)</option>
                  <option value="Dimapur">Dimapur (Nagaland Railhead)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-mono text-[11px]">Destination Node (Frontier)</label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-defense-900 border border-slate-700 rounded-lg p-2 text-slate-100 font-mono text-xs focus:border-emerald-500 focus:outline-none"
                >
                  <option value="Tawang">Tawang (Frontier Civil Hospital)</option>
                  <option value="Bomdila">Bomdila (District HQ)</option>
                  <option value="Gangtok">Gangtok (STNM Hospital Depot)</option>
                  <option value="Imphal">Imphal (Regional Medical Depot)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-mono text-[11px]">Cargo Priority (Weight Factor)</label>
                <select
                  value={cargoPriority}
                  onChange={(e) => setCargoPriority(e.target.value)}
                  className="w-full bg-defense-900 border border-slate-700 rounded-lg p-2 text-slate-100 font-mono text-xs focus:border-emerald-500 focus:outline-none"
                >
                  <option value="CRITICAL_MEDICAL">CRITICAL_MEDICAL (High Risk Penalty 1.8x)</option>
                  <option value="ESSENTIAL_FOOD">ESSENTIAL_FOOD (Moderate Risk Penalty 1.2x)</option>
                  <option value="FUEL_POL">FUEL_POL (High Flammability Penalty 1.5x)</option>
                  <option value="GENERAL">GENERAL (Standard Dijkstra)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoadingRoute}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shadow-lg shadow-emerald-950 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 disabled:opacity-50"
              >
                {isLoadingRoute ? (
                  <span>Evaluating Risk-Aware Path...</span>
                ) : (
                  <>
                    <Navigation className="w-4 h-4" />
                    <span>CALCULATE RISK-OPTIMAL ROUTE</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Trade-Off Comparison Analytics */}
          <div className="lg:col-span-2 glass-panel p-4 rounded-xl border border-slate-800 shadow-lg flex flex-col justify-between space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Analytical Route Trade-Off Engine (Clause d)</span>
              </h3>
              {comparisonData && (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  {comparisonData.recommendation}
                </span>
              )}
            </div>

            {comparisonData ? (
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Fastest Route */}
                  <div className="p-3 rounded-lg bg-defense-900 border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-400">FASTEST (Distance-First)</span>
                      <span className="text-rose-400 font-bold">Risk: {comparisonData.fastest?.average_risk_score}</span>
                    </div>
                    <div className="text-xl font-bold text-slate-100 font-mono">
                      {comparisonData.fastest?.total_time_hours} hrs
                      <span className="text-xs text-slate-400 font-normal ml-2">({comparisonData.fastest?.total_distance_km} km)</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Hazard Zones: <b className="text-rose-400">{comparisonData.fastest?.hazard_zones_count} Active Scree Slide(s)</b>
                    </div>
                  </div>

                  {/* Risk-Aware Route */}
                  <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-emerald-400 font-bold">RECOMMENDED (Risk-Aware)</span>
                      <span className="text-emerald-400 font-bold">Risk: {comparisonData.risk_aware?.average_risk_score}</span>
                    </div>
                    <div className="text-xl font-bold text-emerald-300 font-mono">
                      {comparisonData.risk_aware?.total_time_hours} hrs
                      <span className="text-xs text-slate-400 font-normal ml-2">({comparisonData.risk_aware?.total_distance_km} km)</span>
                    </div>
                    <div className="text-[11px] text-slate-300">
                      Hazard Zones: <b className="text-emerald-400">{comparisonData.risk_aware?.hazard_zones_count} Minor Spot(s)</b>
                    </div>
                  </div>
                </div>

                {/* Trade-Off Delta Metrics */}
                <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase">Delta Time</span>
                    <div className="text-amber-400 font-bold mt-0.5">+{comparisonData.delta_time_hours}h (+{comparisonData.delta_time_pct}%)</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase">Delta Risk Reduction</span>
                    <div className="text-emerald-400 font-bold mt-0.5">-{comparisonData.delta_risk_pct}% SAFE</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase">Strategic Advice</span>
                    <div className="text-cyan-300 font-bold mt-0.5">KALAKTANG BYPASS</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300">
                  <b>AI Rationale:</b> {comparisonData.recommendation_reason || 'Kalaktang bypass adds 35 km and ~45 minutes travel time, but reduces catastrophic landslide blockage risk by 58%.'}
                </div>
              </div>
            ) : (
              <div className="h-40 flex items-center justify-center text-slate-500 text-xs font-mono">
                Select origin and destination to compute comparative trade-off metrics.
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. Sub-Tab 2: MULTI-MODAL FREIGHT (RAIL + ROAD) */}
      {activeSubTab === 'multimodal' && (
        <div className="space-y-4">
          {/* Railhead Gateway Terminals */}
          <div className="glass-panel p-4 rounded-xl border border-cyan-500/30 space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <div>
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2">
                  <Train className="w-4 h-4 text-cyan-400" />
                  <span>North East Frontier Railway (NFR) Gateway Railheads</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Intermodal transfer points where bulk freight from Indian Railways connects to mountain road fleets.
                </p>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                4 STRATEGIC RAILHEADS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {MULTIMODAL_LOGISTICS.railhead_terminals.map((rail) => (
                <div key={rail.id} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-white">{rail.name}</span>
                  </div>
                  <div className="text-[10px] text-cyan-400 font-mono">{rail.gauge}</div>

                  <div className="p-2 rounded bg-slate-950 border border-slate-800 font-mono text-[11px] space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Daily Rakes:</span>
                      <b className="text-white">{rail.daily_freight_rakes} Rakes/Day</b>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Capacity:</span>
                      <b className="text-emerald-400">{rail.terminal_capacity_tonnes.toLocaleString()} Tonnes</b>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-300">
                    <span className="text-slate-500">Connects:</span> <b>{rail.connected_highway}</b>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {rail.transshipment_modes.map((m, idx) => (
                      <span key={idx} className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. Sub-Tab 3: CORRIDOR CAPACITY & CLEARANCES */}
      {activeSubTab === 'throughput' && (
        <div className="space-y-4">
          {/* Hourly Safe Vehicle Throughput */}
          <div className="glass-panel p-4 rounded-xl border border-amber-500/30 space-y-3">
            <div className="pb-2 border-b border-slate-800">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <Scale className="w-4 h-4 text-amber-400" />
                <span>Corridor Hourly Throughput & Safe Density Control</span>
              </h3>
              <p className="text-xs text-slate-400">
                Throttling guidelines to prevent fatal gridlocks on narrow single-lane mountain passes.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b border-slate-800 text-[11px] font-mono text-slate-400 bg-defense-900/50">
                    <th className="p-2.5">Corridor Segment</th>
                    <th className="p-2.5">Terrain Type</th>
                    <th className="p-2.5">Safe Hourly Limit</th>
                    <th className="p-2.5">Current Traffic Load</th>
                    <th className="p-2.5">Congestion State</th>
                    <th className="p-2.5 text-right">Convoy Control</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                  {MULTIMODAL_LOGISTICS.corridor_hourly_throughput.map((th, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="p-2.5 font-bold text-white font-sans">{th.corridor_segment}</td>
                      <td className="p-2.5 text-slate-300 font-sans">{th.terrain_type}</td>
                      <td className="p-2.5 text-cyan-400 font-bold">{th.max_safe_vehicles_per_hour} veh/hr</td>
                      <td className="p-2.5 text-amber-300 font-bold">{th.current_vehicle_load_per_hour} veh/hr</td>
                      <td className="p-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          th.congestion_index.includes('NEAR_CAPACITY')
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}>
                          {th.congestion_index}
                        </span>
                      </td>
                      <td className="p-2.5 text-right font-sans text-slate-300">{th.convoy_control_mode}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Vehicle Accommodation Matrix */}
          <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="pb-2 border-b border-slate-800">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-400" />
                <span>Vehicle Type Accommodation & Clearance Limitations</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {MULTIMODAL_LOGISTICS.vehicle_accommodation_matrix.map((v, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <h4 className="font-bold text-xs text-white">{v.vehicle_class.replace(/_/g, ' ')}</h4>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono p-2 rounded bg-slate-950 border border-slate-800">
                    <div>Gross Wt: <b className="text-white">{v.max_gross_weight_tonnes}T</b></div>
                    <div>Max Height: <b className="text-white">{v.max_height_m}m</b></div>
                    <div>Turn Radius: <b className="text-cyan-400">{v.turning_radius_m}m</b></div>
                    <div>Sela Tunnel: <b className={v.permitted_in_sela_tunnel ? 'text-emerald-400' : 'text-rose-400'}>{v.permitted_in_sela_tunnel ? 'YES' : 'NO'}</b></div>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans">{v.recommended_use}</p>
                  {v.restricted_corridors.length > 0 && (
                    <div className="text-[10px] text-rose-400 font-sans border-t border-slate-800 pt-1">
                      <b>Restrictions:</b> {v.restricted_corridors.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. Sub-Tab 4: LIVE FLEET TELEMETRY & SIMULATOR */}
      {activeSubTab === 'telemetry' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Simulator Controls & Vehicle Info */}
          <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2 pb-2 border-b border-slate-800">
              <Gauge className="w-4 h-4 text-purple-400" />
              <span>Vehicle Simulator & Telemetry Control</span>
            </h3>

            {/* Step Controls */}
            <div className="p-3 rounded-lg bg-defense-900 border border-slate-800 space-y-2 font-mono text-xs">
              <div className="flex justify-between items-center text-slate-400">
                <span>SIMULATOR STATUS:</span>
                <span className="font-bold text-emerald-400">{activeVehicle?.status || 'IN_TRANSIT'}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onAdvanceVehicle(4.0)}
                  className="flex-1 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Step +4%</span>
                </button>

                <button
                  onClick={onPauseVehicle}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-lg text-xs flex items-center justify-center gap-1 cursor-pointer border border-slate-700"
                >
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause</span>
                </button>

                <button
                  onClick={onResumeVehicle}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-lg text-xs flex items-center justify-center gap-1 cursor-pointer border border-slate-700"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Resume</span>
                </button>
              </div>
            </div>

            {/* Live Metrics */}
            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Vehicle ID:</span>
                <b className="text-cyan-400">{activeVehicle?.vehicle_id || 'MED_CONVOY_01'}</b>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Speed:</span>
                <b className="text-white">{activeVehicle?.speed_kmh || 42} km/h</b>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Route Progress:</span>
                <b className="text-emerald-400">{activeVehicle?.progress_pct || 68}%</b>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Next Landmark:</span>
                <b className="text-amber-400">{activeVehicle?.next_landmark || 'Dirang Valley'}</b>
              </div>
            </div>
          </div>

          {/* Map View of Route */}
          <div className="lg:col-span-2">
            <MapCanvas
              nodes={nodes}
              segments={segments}
              activeRoute={activeRoute}
              activeVehicle={activeVehicle}
              activeWorkspace="dispatch"
            />
          </div>
        </div>
      )}
    </div>
  );
}
