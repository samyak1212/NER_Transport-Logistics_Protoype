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
  Sparkles
} from 'lucide-react';

export default function CommandHQ({
  corridorHealth,
  districts,
  broMachinery,
  weatherData,
  executiveBrief,
  onSelectSegment
}) {
  const [briefLang, setBriefLang] = useState('english');
  const [districtFilter, setDistrictFilter] = useState('ALL');

  const filteredDistricts = districts.filter(d => {
    if (districtFilter === 'ALL') return true;
    return d.status === districtFilter;
  });

  return (
    <div className="space-y-4 text-slate-200">
      {/* 1. Executive KPI Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Lifeline Status */}
        <div className="glass-panel p-3.5 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Western Lifeline (NH-13)</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className={`text-xl font-bold font-mono ${
              corridorHealth?.status === 'NORMAL' ? 'text-emerald-400' : 'text-amber-400'
            }`}>
              {corridorHealth?.status || 'DEGRADED'}
            </span>
            <span className="text-xs text-slate-400">({corridorHealth?.open_segments_pct || 93}% open)</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Guwahati &rarr; Tawang Strategic Link</div>
        </div>

        {/* Active Disruption Chokepoints */}
        <div className="glass-panel p-3.5 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Active Disruption Points</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-bold font-mono text-rose-400">
              {corridorHealth?.active_hazards_count || 1}
            </span>
            <span className="text-xs text-slate-400">zones monitored</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Sessa Scree Slide Belt active</div>
        </div>

        {/* Sela Pass Alpine Summit */}
        <div className="glass-panel p-3.5 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Sela Pass Summit (3,733m)</span>
            <Mountain className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-bold font-mono text-cyan-400">CAUTION</span>
            <span className="text-xs text-slate-400">4.2°C, Mist</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Sela Tunnel bypass operational</div>
        </div>

        {/* Max Rain Intensity */}
        <div className="glass-panel p-3.5 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Max 24h Precipitation</span>
            <CloudRain className="w-4 h-4 text-blue-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-bold font-mono text-blue-400">56.5 mm</span>
            <span className="text-xs text-slate-400">(West Kameng)</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Live Open-Meteo Telemetry</div>
        </div>
      </div>

      {/* 2. AI Operational Situation Briefing (Trilingual) */}
      <div className="glass-panel p-4 rounded-xl border border-cyan-900/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200">
              AI Operational Situation Briefing (MDoNER / SDMA)
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono">
              Live Synthesized
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
          {executiveBrief?.[briefLang] || executiveBrief?.english || 'Synthesizing situational intelligence from field sensors and meteorological radars...'}
        </p>
      </div>

      {/* 3. District Isolation Matrix across all 8 NER States */}
      <div className="glass-panel p-4 rounded-xl border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              Regional District Connectivity & Isolation Matrix (8 NER States)
            </h3>
            <p className="text-[11px] text-slate-400">
              Statutory accessibility tracking across border and frontier transit zones
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 text-xs font-mono">
            {['ALL', 'CUT_OFF', 'DEGRADED', 'ACCESSIBLE'].map(filter => (
              <button
                key={filter}
                onClick={() => setDistrictFilter(filter)}
                className={`px-2.5 py-1 rounded-lg transition-all text-[11px] ${
                  districtFilter === filter
                    ? 'bg-slate-700 text-white font-bold'
                    : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                {filter === 'ALL' ? 'All (15)' : filter}
              </button>
            ))}
          </div>
        </div>

        {/* District Table */}
        <div className="overflow-x-auto max-h-72">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-defense-900 text-slate-400 sticky top-0 border-b border-slate-800">
              <tr>
                <th className="py-2 px-3">District</th>
                <th className="py-2 px-3">State</th>
                <th className="py-2 px-3">Lifeline Status</th>
                <th className="py-2 px-3">Primary Artery</th>
                <th className="py-2 px-3 text-center">Chokepoints</th>
                <th className="py-2 px-3">Operational Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredDistricts.map((d, i) => (
                <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2 px-3 font-semibold text-slate-100">{d.district_name}</td>
                  <td className="py-2 px-3 text-slate-400">{d.state}</td>
                  <td className="py-2 px-3 text-[11px]">{d.lifeline_status}</td>
                  <td className="py-2 px-3 text-slate-400">{d.primary_artery}</td>
                  <td className="py-2 px-3 text-center font-bold">
                    <span className={d.active_chokepoints > 0 ? 'text-rose-400' : 'text-slate-500'}>
                      {d.active_chokepoints}
                    </span>
                  </td>
                  <td className="py-2 px-3">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. BRO 42 BRTF Heavy Machinery & Task Force Readiness */}
      <div className="glass-panel p-4 rounded-xl border border-slate-800">
        <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2 mb-3">
          <Wrench className="w-4 h-4 text-amber-400" />
          Border Roads Organisation (BRO) Heavy Clearance Task Force Readiness
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {broMachinery.map((bro, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-defense-900 border border-slate-800 flex justify-between items-start text-xs">
              <div>
                <div className="font-bold text-slate-200">{bro.unit}</div>
                <div className="text-[11px] text-cyan-400 mt-0.5">Base: {bro.base} • Sector: {bro.assigned_sector}</div>
                <div className="text-[11px] text-slate-400 mt-1">Equipment: {bro.equipment}</div>
              </div>
              <div className="text-right">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                  bro.readiness === 'DEPLOYED'
                    ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                    : bro.readiness === 'ON_PATROL'
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {bro.readiness}
                </span>
                <div className="text-[10px] text-slate-500 font-mono mt-1">Fuel: {bro.fuel_hours}h</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
