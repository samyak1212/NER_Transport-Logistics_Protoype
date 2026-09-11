import React, { useState } from 'react';
import { 
  Crosshair, 
  ShieldAlert, 
  Plane, 
  Wrench, 
  Truck, 
  Mountain, 
  Activity, 
  AlertTriangle, 
  Radio, 
  Navigation, 
  CheckCircle2, 
  Layers, 
  PhoneCall, 
  Zap, 
  Fuel, 
  Compass, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  Send,
  LifeBuoy
} from 'lucide-react';
import { ARMY_EMERGENCY_RESOURCES } from '../../data/defaultData';

export default function ArmyEmergencyPanel({
  emergencyData = ARMY_EMERGENCY_RESOURCES,
  onAirDropTriggered = () => {}
}) {
  const [activeSubTab, setActiveSubTab] = useState('aviation');
  const [selectedHelipad, setSelectedHelipad] = useState(emergencyData?.algs_and_helipads?.[0] || null);
  const [selectedEngineer, setSelectedEngineer] = useState(emergencyData?.combat_engineer_units?.[0] || null);
  const [airDropAlertSent, setAirDropAlertSent] = useState(false);
  const [selectedMission, setSelectedMission] = useState(null);

  const helipads = emergencyData?.algs_and_helipads || [];
  const engineers = emergencyData?.combat_engineer_units || [];
  const medicalUnits = emergencyData?.field_medical_units || [];
  const rescueMissions = emergencyData?.active_rescue_missions || [];

  const handleTriggerAirDrop = () => {
    setAirDropAlertSent(true);
    setTimeout(() => setAirDropAlertSent(false), 5000);
    onAirDropTriggered();
  };

  return (
    <div className="space-y-4 text-slate-200 font-sans">
      {/* 1. Military Tri-Service Joint Command Header */}
      <div className="glass-panel p-4 rounded-xl border border-red-500/30 bg-gradient-to-r from-red-950/80 via-slate-900 to-defense-950 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-red-600/20 border border-red-500/50 flex items-center justify-center text-red-400 font-black shadow-lg shadow-red-900/40 shrink-0">
            <Crosshair className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-400">
                HQ Eastern Command &bull; Joint HADR Cell
              </span>
              <span className="px-2 py-0.2 rounded text-[10px] font-mono font-bold bg-red-500/20 text-red-300 border border-red-500/40">
                DEFENSE_STRATEGIC_TIER_1
              </span>
              <span className="px-2 py-0.2 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 animate-pulse">
                AIR-BRIDGE READY
              </span>
            </div>
            <h2 className="text-base md:text-lg font-black text-white tracking-wide mt-0.5 flex items-center gap-2">
              Army / Emergency Response Panel
              <span className="text-xs font-normal text-slate-400 hidden sm:inline">
                (4 Corps Tezpur &bull; 33 Corps Sukna &bull; 3 Corps Spear &bull; 12 NDRF)
              </span>
            </h2>
            <p className="text-xs text-slate-300">
              High-Altitude Casualty Evacuation, Combat Engineering Bridging, and Defense Supply Arterials.
            </p>
          </div>
        </div>

        {/* Quick Rapid Action Button */}
        <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
          <button
            onClick={handleTriggerAirDrop}
            className="px-4 py-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-950 flex items-center gap-2 whitespace-nowrap active:scale-95 transition-all border border-amber-300 cursor-pointer"
          >
            <Plane className="w-4 h-4" />
            <span>AUTHORIZE EMERGENCY AIR-DROP MISSION</span>
          </button>
        </div>
      </div>

      {/* Emergency Air-Drop Confirmation Flash */}
      {airDropAlertSent && (
        <div className="p-3.5 rounded-xl bg-red-600 text-white font-bold text-xs md:text-sm flex items-center justify-between shadow-2xl animate-bounce border border-white">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 animate-spin" />
            <span>HADR TASK FORCE ALERT TRANSMITTED: 2x ALH Dhruv scrambled from Tezpur/Tawang for emergency airlift of cold-chain plasma & food bundles.</span>
          </div>
          <span className="text-[10px] bg-white/20 px-2 py-1 rounded font-mono">CODE: AIR_RELIEF_ALPHA</span>
        </div>
      )}

      {/* 2. Sub-Tabs Navigation (Eliminating Endless Scrolling) */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-xl overflow-x-auto shadow-inner">
        <button
          onClick={() => setActiveSubTab('aviation')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeSubTab === 'aviation'
              ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Plane className="w-4 h-4 text-red-400" />
          <span>HADR Aviation & Helipads ({helipads.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('engineers')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeSubTab === 'engineers'
              ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Wrench className="w-4 h-4 text-amber-400" />
          <span>Combat Engineers & Bridging ({engineers.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('medical')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeSubTab === 'medical'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Activity className="w-4 h-4 text-emerald-400" />
          <span>Military Hospitals & CASEVAC ({medicalUnits.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('missions')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeSubTab === 'missions'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <LifeBuoy className="w-4 h-4 text-cyan-400" />
          <span>Active HADR Rescue Missions ({rescueMissions.length})</span>
        </button>
      </div>

      {/* 3. Sub-Tab Content Views */}

      {/* SUB-TAB 1: HADR AVIATION & HELIPADS */}
      {activeSubTab === 'aviation' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Helipad List */}
          <div className="lg:col-span-1 space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider pb-1 flex items-center justify-between border-b border-slate-800">
              <span>Strategic ALGs & Helipads</span>
              <span className="text-red-400">All-Weather Air-Bridge</span>
            </div>
            {helipads.map((h) => {
              const isSelected = selectedHelipad?.id === h.id;
              return (
                <div
                  key={h.id}
                  onClick={() => setSelectedHelipad(h)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-red-950/40 border-red-500 shadow-lg shadow-red-950/50'
                      : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Plane className="w-3.5 h-3.5 text-red-400" />
                        <span>{h.name}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {h.location} &bull; <span className="text-slate-300 font-mono">{h.state}</span>
                      </div>
                    </div>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-slate-800 text-cyan-300 border border-slate-700">
                      {h.elevation_m}m
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-1">
                    {h.aircraft_compatibility.map((ac) => (
                      <span key={ac} className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                        {ac}
                      </span>
                    ))}
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-400">
                    <span>Helo Bays: <b className="text-slate-200">{h.capacity_helo}</b></span>
                    <span className={h.fuel_atf_available ? 'text-emerald-400 font-semibold' : 'text-amber-400'}>
                      {h.fuel_atf_available ? '✓ ATF Fuel Available' : '⚠ Limited Fuel'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Helipad Detailed Mission Profile */}
          {selectedHelipad && (
            <div className="lg:col-span-2 glass-panel p-5 rounded-xl border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-widest">
                    Tactical Helipad & Air-Bridge Asset Profile
                  </span>
                  <h3 className="text-lg font-black text-white flex items-center gap-2 mt-0.5">
                    {selectedHelipad.name}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Assigned Unit: <span className="text-cyan-300 font-semibold">{selectedHelipad.assigned_squad}</span> &bull; Tactical Radio: <span className="font-mono text-amber-300">{selectedHelipad.contact_freq}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    STATUS: {selectedHelipad.status}
                  </span>
                </div>
              </div>

              {/* Helipad Parameters Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase">Elevation</span>
                  <div className="text-base font-bold text-white mt-0.5">{selectedHelipad.elevation_m} meters</div>
                  <span className="text-[10px] text-slate-500">High Altitude Density</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase">Coordinates</span>
                  <div className="text-xs font-bold text-cyan-300 mt-1">{selectedHelipad.coordinates[0]}°N, {selectedHelipad.coordinates[1]}°E</div>
                  <span className="text-[10px] text-slate-500">WGS84 Verified</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase">Max Helo Aprons</span>
                  <div className="text-base font-bold text-emerald-400 mt-0.5">{selectedHelipad.capacity_helo} Aircraft</div>
                  <span className="text-[10px] text-slate-500">Simultaneous Landings</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase">Aviation Fuel (ATF)</span>
                  <div className="text-base font-bold text-amber-400 mt-0.5">{selectedHelipad.fuel_atf_available ? 'READY' : 'BY CAN'}</div>
                  <span className="text-[10px] text-slate-500">Underground Tank</span>
                </div>
              </div>

              {/* Helicopter Deployment Scenarios */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span>Deployment Capabilities for Isolated District Evacuation</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    <b className="text-white">ALH Dhruv (Mark III/IV)</b>
                    <p className="text-[11px] text-slate-400 mt-1">High-altitude mountain rescue, winch casualty extraction, 12-trooper payload up to 4,500m.</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    <b className="text-white">Mi-17 V5 Hip</b>
                    <p className="text-[11px] text-slate-400 mt-1">Heavy ration air-drops (4 tonnes), mobile emergency clinic transport, night NVG capable.</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    <b className="text-white">CH-47 Chinook</b>
                    <p className="text-[11px] text-slate-400 mt-1">Heavy engineering cargo, underslung delivery of mini-excavators and Bailey bridge sections to severed valleys.</p>
                  </div>
                </div>
              </div>

              {/* Scramble Helo Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-red-950/20 border border-red-500/30 rounded-xl text-xs">
                <span className="text-slate-300">
                  Ready to deploy air asset from <b className="text-white">{selectedHelipad.name}</b> to forward disaster coordinates?
                </span>
                <button
                  onClick={handleTriggerAirDrop}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg shadow cursor-pointer transition-all active:scale-95"
                >
                  Confirm Scramble Authorization
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 2: COMBAT ENGINEERS & BRIDGING */}
      {activeSubTab === 'engineers' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1 space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider pb-1 flex items-center justify-between border-b border-slate-800">
              <span>Combat Engineer Task Forces</span>
              <span className="text-amber-400">Class 40/70 Bailey</span>
            </div>
            {engineers.map((e) => {
              const isSelected = selectedEngineer?.id === e.id;
              return (
                <div
                  key={e.id}
                  onClick={() => setSelectedEngineer(e)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-950/40 border-amber-500 shadow-lg shadow-amber-950/50'
                      : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Wrench className="w-3.5 h-3.5 text-amber-400" />
                        <span>{e.regiment}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {e.base_location} &bull; <span className="text-slate-300">{e.task_force}</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                      {e.status}
                    </span>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-400">
                    <span>Bridging: <b className="text-amber-300 font-mono">{e.bailey_bridge_class}</b></span>
                    <span>Readiness: <b className="text-slate-200">{e.readiness}</b></span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Engineer Unit Detailed Specification */}
          {selectedEngineer && (
            <div className="lg:col-span-2 glass-panel p-5 rounded-xl border border-slate-800 space-y-4">
              <div className="flex justify-between items-start pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">
                    Combat Engineering Detachment Roster
                  </span>
                  <h3 className="text-lg font-black text-white mt-0.5">
                    {selectedEngineer.regiment}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Operational Base: <span className="text-slate-200 font-medium">{selectedEngineer.base_location}</span> &bull; Task Force: <span className="text-amber-300">{selectedEngineer.task_force}</span>
                  </p>
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono text-xs font-bold">
                  {selectedEngineer.readiness}
                </div>
              </div>

              {/* Machinery & Heavy Assets Inventory */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-mono">Bailey Bridge Class</span>
                  <div className="text-lg font-black text-amber-400 mt-1">{selectedEngineer.bailey_bridge_class}</div>
                  <span className="text-[10px] text-slate-500">Tanks & Multi-Axles</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-mono">Tracked Bulldozers</span>
                  <div className="text-lg font-black text-white mt-1">{selectedEngineer.tracked_dozers} Units</div>
                  <span className="text-[10px] text-slate-500">Heavy Mountain Pushers</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-mono">Snow Rotary Cutters</span>
                  <div className="text-lg font-black text-cyan-400 mt-1">{selectedEngineer.snow_cutters} Units</div>
                  <span className="text-[10px] text-slate-500">Alpine Drift Clearers</span>
                </div>
              </div>

              {/* Unit Equipment Manifest */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
                  Specialized Military & Disaster Hardware
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedEngineer.equipment.map((item, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
                      🛠️ {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Estimated Time to Arrival (ETA) to Critical Chokepoints */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Rapid Response Reach to Chokepoints</span>
                  <span className="text-[10px] font-mono text-cyan-400">Mobilization Time Included</span>
                </div>
                <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                  {Object.entries(selectedEngineer.eta_to_chokepoints).map(([point, eta]) => (
                    <div key={point} className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between items-center">
                      <span className="text-slate-400 truncate">{point.replace(/_/g, ' ')}</span>
                      <span className="text-amber-400 font-bold ml-1">{eta}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 3: MILITARY HOSPITALS & CASEVAC */}
      {activeSubTab === 'medical' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {medicalUnits.map((med) => (
            <div key={med.id} className="glass-panel p-4 rounded-xl border border-slate-800 space-y-3 bg-slate-900/80">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                    Level-3 Trauma Facility
                  </span>
                  <h4 className="text-sm font-bold text-white mt-0.5">{med.name}</h4>
                  <p className="text-xs text-slate-400">{med.location}</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  ACTIVE
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400">Hospital Beds:</span>
                  <div className="font-bold text-white">{med.beds} Total</div>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400">ICU Ventilators:</span>
                  <div className="font-bold text-cyan-300">{med.icu_ventilators} Units</div>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400">Hyperbaric Chambers:</span>
                  <div className="font-bold text-purple-300">{med.hyperbaric_chambers} High-Alt</div>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400">Cryo Oxygen:</span>
                  <div className="font-bold text-emerald-400">{med.cryogenic_oxygen_days} Days Stock</div>
                </div>
              </div>

              <div className="p-2 rounded bg-defense-900 border border-slate-800 text-[11px] flex justify-between items-center">
                <span className="text-slate-400">Mobile Surgical Units:</span>
                <span className="font-bold text-white">{med.mobile_surgical_units} Deployed</span>
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[10px] font-mono text-slate-400">
                <span>Blood Bank: <b className="text-red-400">{med.blood_reserve_units} units</b></span>
                <span className="text-cyan-400 font-bold">{med.air_evac_helipad}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUB-TAB 4: ACTIVE HADR RESCUE MISSIONS */}
      {activeSubTab === 'missions' && (
        <div className="space-y-3">
          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider pb-1 flex items-center justify-between border-b border-slate-800">
            <span>Ongoing Humanitarian Assistance & Disaster Relief (HADR) Log</span>
            <span className="text-emerald-400 font-bold">● LIVE OPERATIONAL STREAM</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rescueMissions.map((m) => (
              <div
                key={m.id}
                onClick={() => setSelectedMission(m)}
                className="glass-panel p-4 rounded-xl border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer bg-slate-900/80 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                    {m.id}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                    {m.status}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-white">{m.title}</h4>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Sector: <span className="text-slate-200">{m.sector}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400">Troopers:</span>
                    <div className="font-bold text-white">{m.personnel_deployed} Sappers</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400">Rescued:</span>
                    <div className="font-bold text-emerald-400">{m.civilian_casualties_prevented} Souls</div>
                  </div>
                  <div className="col-span-2 pt-1 border-t border-slate-800">
                    <span className="text-[10px] text-slate-400">Aviation:</span>
                    <div className="text-cyan-300 truncate">{m.helo_deployed || 'Ground Units'}</div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 line-clamp-3">
                  {m.narrative}
                </p>

                <div className="pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-400 flex justify-between">
                  <span>Start: {m.start_time}</span>
                  <span className="text-cyan-400 font-bold">Details &bull;</span>
                </div>
              </div>
            ))}
          </div>

          {/* Mission Details Modal */}
          {selectedMission && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="glass-panel w-full max-w-lg rounded-2xl border border-slate-700 p-5 shadow-2xl bg-slate-900 space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <LifeBuoy className="w-5 h-5 text-red-400" />
                    <h3 className="font-bold text-sm text-white font-sans">{selectedMission.title}</h3>
                  </div>
                  <button
                    onClick={() => setSelectedMission(null)}
                    className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div><b>Sector:</b> {selectedMission.sector}</div>
                  <div><b>Incident Type:</b> <span className="text-amber-400">{selectedMission.incident_type}</span></div>
                  <div><b>Severity:</b> <span className="text-red-400 font-bold">{selectedMission.severity}</span></div>
                  <div><b>Deployed Troops:</b> {selectedMission.personnel_deployed} Sappers & NDRF</div>
                  <div><b>Air Support:</b> {selectedMission.helo_deployed}</div>
                  <div><b>Civilians Saved:</b> <span className="text-emerald-400 font-bold">{selectedMission.civilian_casualties_prevented}</span></div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 mt-2">
                    <b>Operational Report:</b><br />
                    {selectedMission.narrative}
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setSelectedMission(null)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl"
                  >
                    Close Log
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
