import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Mountain, 
  CloudRain, 
  Wrench, 
  Globe, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Layers,
  Activity,
  PackageCheck,
  Fuel,
  Compass
} from 'lucide-react';
import { REGIONAL_CORRIDORS, BRO_MACHINERY_UNITS, DEFAULT_DISTRICTS } from '../../data/defaultData';

export default function CommandHQ({
  corridorHealth,
  districts = [],
  broMachinery = [],
  weatherData = [],
  executiveBrief,
  onSelectSegment
}) {
  const [briefLang, setBriefLang] = useState('english');
  const [districtFilter, setDistrictFilter] = useState('ALL');

  const displayDistricts = (districts && districts.length > 0) ? districts : DEFAULT_DISTRICTS;
  const displayMachinery = (broMachinery && broMachinery.length > 0) ? broMachinery : BRO_MACHINERY_UNITS;

  const filteredDistricts = displayDistricts.filter(d => {
    if (districtFilter === 'ALL') return true;
    return d.status === districtFilter;
  });

  return (
    <div className="space-y-4 text-slate-200">
      {/* 1. Regional Multi-Corridor Status Ribbon (All 4 Lifelines) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Corridor 1: NH-13 Arunachal */}
        <div className="glass-panel p-3.5 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold text-slate-300">Arunachal (NH-13)</span>
            <ShieldCheck className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-bold font-mono text-amber-400">
              CAUTION
            </span>
            <span className="text-[11px] text-slate-400 font-mono">92% Passable</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1 font-mono flex justify-between">
            <span>Bypass:</span>
            <b className="text-emerald-400">BRO Kalaktang CLEAR</b>
          </div>
        </div>

        {/* Corridor 2: NH-29 Nagaland & Manipur */}
        <div className="glass-panel p-3.5 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold text-slate-300">Nagaland & Manipur (NH-29)</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-bold font-mono text-rose-400">
              DEGRADED
            </span>
            <span className="text-[11px] text-slate-400 font-mono">Paglapahar Active</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1 font-mono flex justify-between">
            <span>Imphal Lifeline:</span>
            <b className="text-rose-400">Single-Lane Convoy</b>
          </div>
        </div>

        {/* Corridor 3: NH-10 Sikkim */}
        <div className="glass-panel p-3.5 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold text-slate-300">Sikkim Lifeline (NH-10)</span>
            <Mountain className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-bold font-mono text-amber-400">
              RESTRICTED
            </span>
            <span className="text-[11px] text-slate-400 font-mono">Teesta River Spate</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1 font-mono flex justify-between">
            <span>Gangtok Access:</span>
            <b className="text-cyan-400">Lava-Algarah Detour</b>
          </div>
        </div>

        {/* Corridor 4: NH-6 / NH-8 Meghalaya & Tripura */}
        <div className="glass-panel p-3.5 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold text-slate-300">Meghalaya & Tripura (NH-6)</span>
            <CloudRain className="w-4 h-4 text-rose-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-bold font-mono text-rose-400">
              MUD-SIPHON
            </span>
            <span className="text-[11px] text-slate-400 font-mono">Sonapur 61mm</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1 font-mono flex justify-between">
            <span>Barak Valley:</span>
            <b className="text-amber-400">BRO Pushpak Engaged</b>
          </div>
        </div>
      </div>

      {/* 2. AI Operational Situation Briefing (Trilingual MDoNER / SDMA Directive) */}
      <div className="glass-panel p-4 rounded-xl border border-cyan-900/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200">
              AI Operational Situation Briefing (MDoNER / SDMA Command Directive)
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono">
              Real-Time Geotechnical & Radar Synthesis
            </span>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-1 text-xs">
            <button
              onClick={() => setBriefLang('english')}
              className={`px-2 py-1 rounded transition-all ${
                briefLang === 'english' ? 'bg-cyan-500 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setBriefLang('hindi')}
              className={`px-2 py-1 rounded transition-all ${
                briefLang === 'hindi' ? 'bg-cyan-500 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => setBriefLang('assamese')}
              className={`px-2 py-1 rounded transition-all ${
                briefLang === 'assamese' ? 'bg-cyan-500 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              অসমীয়া
            </button>
          </div>
        </div>

        <p className="mt-3 text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
          {executiveBrief?.[briefLang] || executiveBrief?.english || 'Regional surveillance indicates active monsoon saturation along Kameng gorge (NH-13) and Barail ranges (NH-29). BRO Project Vartak and Sewak have mobilized 6 heavy crawler dozers at km 114 and km 32. All critical cold-chain medical consignments bound for Tawang are ordered diverted via the southern BRO Kalaktang bypass.'}
        </p>
      </div>

      {/* 3. District Isolation Matrix & Supply Headroom (Medicines & Ration Days) */}
      <div className="glass-panel p-4 rounded-xl border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              Regional District Connectivity & Essential Supply Headroom
            </h3>
            <p className="text-[11px] text-slate-400">
              Monitors transport accessibility and days of life-saving medicine & food stock remaining before isolation breach
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 text-xs font-mono">
            {['ALL', 'ISOLATED_RISK', 'DEGRADED', 'ACCESSIBLE'].map(filter => (
              <button
                key={filter}
                onClick={() => setDistrictFilter(filter)}
                className={`px-2.5 py-1 rounded-lg transition-all text-[11px] ${
                  districtFilter === filter
                    ? 'bg-slate-700 text-white font-bold'
                    : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                {filter === 'ALL' ? 'All Districts' : filter}
              </button>
            ))}
          </div>
        </div>

        {/* District Table */}
        <div className="overflow-x-auto max-h-72">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-defense-900 text-slate-400 sticky top-0 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">District & State</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Active Lifelines</th>
                <th className="py-2.5 px-3">Key Staging Depot</th>
                <th className="py-2.5 px-3 text-center">Medicine Stock</th>
                <th className="py-2.5 px-3 text-center">Food Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredDistricts.map((d, i) => (
                <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-3">
                    <span className="font-semibold text-slate-100">{d.name}</span>
                    <span className="text-[10px] text-slate-400 block">{d.state}</span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      d.status === 'ACCESSIBLE'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : d.status === 'DEGRADED'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20 animate-pulse'
                    }`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-[11px]">
                    <span className="text-slate-300 font-bold">{d.active_lifelines} Open</span>
                    {d.blocked_roads > 0 && (
                      <span className="text-rose-400 ml-1">({d.blocked_roads} blocked)</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-slate-400 text-[11px]">{d.priority_depot}</td>
                  <td className="py-2.5 px-3 text-center">
                    <span className={`font-bold font-mono px-2 py-0.5 rounded ${
                      (d.medicine_stock_days || 10) <= 5
                        ? 'bg-rose-950 text-rose-400 border border-rose-800'
                        : (d.medicine_stock_days || 10) <= 10
                        ? 'bg-amber-950 text-amber-400 border border-amber-800'
                        : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    }`}>
                      {d.medicine_stock_days || 10} days
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="font-mono text-slate-300">
                      {d.food_stock_days || 15} days
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. BRO Heavy Machinery Staging & Clearance Task Forces */}
      <div className="glass-panel p-4 rounded-xl border border-slate-800">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-amber-400" />
            Border Roads Organisation (BRO) Heavy Equipment & Task Force Deployment
          </h3>
          <span className="text-[10px] font-mono text-slate-400">
            Projects: Vartak (Arunachal) &bull; Sewak (Nagaland) &bull; Swastik (Sikkim) &bull; Pushpak (Meghalaya)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {displayMachinery.map((m, idx) => {
            const isClearing = (m.status || '').includes('CLEARING') || (m.status || '').includes('ACTIVE');
            return (
              <div key={idx} className="p-3 rounded-lg bg-defense-900 border border-slate-800 flex flex-col justify-between text-xs space-y-2">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-slate-100 flex items-center gap-1.5">
                      <span>🚜</span> {m.type}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                      isClearing
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30 animate-pulse'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {m.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-cyan-400 mt-1">
                    {m.unit} &bull; {m.operator}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Location: <b>{m.location}</b>
                  </div>
                </div>

                {m.eta_clearance_hrs > 0 && (
                  <div className="pt-2 border-t border-slate-800 font-mono text-[10px] flex justify-between text-amber-400">
                    <span>Est. Debris Clearance:</span>
                    <b>{m.eta_clearance_hrs} hours</b>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
