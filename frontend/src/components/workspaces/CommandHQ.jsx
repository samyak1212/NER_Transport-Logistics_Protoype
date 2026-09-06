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
  Compass,
  Shield,
  Radio,
  UserCheck
} from 'lucide-react';
import MapCanvas from '../MapCanvas';
import GeotechnicalDrawer from '../GeotechnicalDrawer';
import LandslideRainfallPanel from '../LandslideRainfallPanel';
import { REGIONAL_CORRIDORS, BRO_MACHINERY_UNITS, DEFAULT_DISTRICTS } from '../../data/defaultData';

const AUTHORITY_PROFILES = {
  VARTAK: {
    id: 'VARTAK',
    agency: 'Border Roads Organisation (BRO)',
    project: 'Project Vartak (42 BRTF)',
    role: 'Chief Engineer / Task Force Commander',
    jurisdiction: 'Western Arunachal (Kameng & Tawang Frontier Sectors)',
    clearance: 'DEFENSE_STRATEGIC_TIER_1',
    badgeColor: 'border-emerald-500/60 bg-emerald-950/40 text-emerald-300'
  },
  ARUNACHAL_SDMA: {
    id: 'ARUNACHAL_SDMA',
    agency: 'Arunachal Pradesh Disaster Management Authority',
    project: 'State Emergency Operations Centre (SEOC)',
    role: 'Director of Disaster Management',
    jurisdiction: 'All 26 Frontier Districts, Itanagar',
    clearance: 'STATE_CIVIL_PROTECTION',
    badgeColor: 'border-cyan-500/60 bg-cyan-950/40 text-cyan-300'
  },
  ASDMA_ASSAM: {
    id: 'ASDMA_ASSAM',
    agency: 'Assam State Disaster Management Authority',
    project: 'Dispur Logistics & Flood Command Hub',
    role: 'State Logistics Coordinator',
    jurisdiction: 'Kamrup Metro Supply Base & Brahmaputra Arterials',
    clearance: 'TRANSIT_CORRIDOR_COMMAND',
    badgeColor: 'border-amber-500/60 bg-amber-950/40 text-amber-300'
  },
  MDONER: {
    id: 'MDONER',
    agency: 'Ministry of Development of North Eastern Region (MDoNER)',
    project: 'Central Logistics & Accessibility Intelligence Unit',
    role: 'Regional Development Advisor (New Delhi)',
    jurisdiction: 'Inter-State Multi-Modal Coordination (8 NER States)',
    clearance: 'UNION_MINISTRY_DIRECTIVE',
    badgeColor: 'border-purple-500/60 bg-purple-950/40 text-purple-300'
  }
};

export default function CommandHQ({
  nodes = [],
  segments = [],
  activeRoute = null,
  activeVehicle = null,
  reports = [],
  selectedSegment = null,
  onSelectSegment = () => {},
  corridorHealth,
  districts = [],
  broMachinery = [],
  weatherData = [],
  executiveBrief,
  onCalculateRoute = () => {}
}) {
  const [authorityKey, setAuthorityKey] = useState('VARTAK');
  const [briefLang, setBriefLang] = useState('english');
  const [districtFilter, setDistrictFilter] = useState('ALL');

  const authority = AUTHORITY_PROFILES[authorityKey] || AUTHORITY_PROFILES.VARTAK;

  const displayDistricts = (districts && districts.length > 0) ? districts : DEFAULT_DISTRICTS;
  const displayMachinery = (broMachinery && broMachinery.length > 0) ? broMachinery : BRO_MACHINERY_UNITS;

  const filteredDistricts = displayDistricts.filter(d => {
    if (districtFilter === 'ALL') return true;
    return d.status === districtFilter;
  });

  return (
    <div className="space-y-4 text-slate-200">
      {/* 1. Authority Validation & Jurisdiction Quick-Switcher Bar */}
      <div className="glass-panel p-3.5 rounded-xl border border-slate-700 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-gradient-to-r from-slate-900 via-slate-900/90 to-defense-900">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-mono uppercase tracking-wider text-cyan-400">
                Command Authority Profile:
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${authority.badgeColor}`}>
                {authority.clearance}
              </span>
            </div>
            <div className="text-sm font-black text-white flex items-center gap-2 mt-0.5">
              <span>{authority.agency}</span>
              <span className="text-slate-500 font-normal">|</span>
              <span className="text-slate-300 font-medium text-xs">{authority.project}</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Jurisdiction: <span className="text-slate-200 font-medium">{authority.jurisdiction}</span> &bull; Officer: <span className="text-cyan-300">{authority.role}</span>
            </div>
          </div>
        </div>

        {/* Jurisdiction Switcher Dropdown */}
        <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
          <span className="text-[11px] font-mono text-slate-400 hidden lg:inline">Switch Authority:</span>
          <select
            value={authorityKey}
            onChange={(e) => setAuthorityKey(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-100 font-mono text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-cyan-500 cursor-pointer shadow-inner"
          >
            <option value="VARTAK">BRO Project Vartak (Western Arunachal)</option>
            <option value="ARUNACHAL_SDMA">Arunachal SDMA (Itanagar SEOC)</option>
            <option value="ASDMA_ASSAM">Assam ASDMA (Dispur Supply Hub)</option>
            <option value="MDONER">Ministry of DoNER (Central Oversight)</option>
          </select>
        </div>
      </div>

      {/* 2. Authority Strategic GIS Map Canvas & Geotechnical Drawer */}
      <div className="relative w-full h-[480px] md:h-[540px] flex rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
        <div className="flex-1 h-full">
          <MapCanvas
            nodes={nodes}
            segments={segments}
            activeRoute={activeRoute}
            activeVehicle={activeVehicle}
            reports={reports}
            selectedSegment={selectedSegment}
            onSelectSegment={(seg) => onSelectSegment(seg)}
            activeWorkspace="command"
          />
        </div>

        {/* Drawer appears when an authority clicks a road segment */}
        {selectedSegment && (
          <div className="absolute top-0 right-0 h-full z-[1100]">
            <GeotechnicalDrawer
              segment={selectedSegment}
              onClose={() => onSelectSegment(null)}
            />
          </div>
        )}
      </div>

      {/* 3. Real-Time Disruption Prediction, Rainfall & Lifeline Corridors (SIH Clauses b & c) */}
      <LandslideRainfallPanel
        weatherData={weatherData}
        onSelectZone={(zone) => {
          const match = segments.find(s => s.id === zone.id || s.name.toLowerCase().includes(zone.name.split(' ')[0].toLowerCase()));
          if (match) onSelectSegment(match);
        }}
        onSelectRoute={(routeType) => {
          if (routeType === 'bypass') {
            onCalculateRoute('Guwahati', 'Tawang', 'CRITICAL_MEDICAL');
          }
        }}
      />

      {/* 4. Regional Multi-Corridor Status Ribbon (All 4 Lifelines) */}
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

      {/* 5. AI Operational Situation Briefing (Trilingual MDoNER / SDMA Directive) */}
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

      {/* 6. District Isolation Matrix & Supply Headroom (Medicines & Ration Days) */}
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
                className={`px-2 py-1 rounded transition-all ${
                  districtFilter === filter
                    ? 'bg-slate-700 text-white font-bold'
                    : 'text-slate-400 hover:text-white bg-defense-900'
                }`}
              >
                {filter.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-defense-900/50">
                <th className="p-2.5">District / Region</th>
                <th className="p-2.5">State</th>
                <th className="p-2.5">Status</th>
                <th className="p-2.5">Active Lifelines</th>
                <th className="p-2.5">Chokepoints</th>
                <th className="p-2.5">Priority Depot</th>
                <th className="p-2.5 text-right">Medicine Stock</th>
                <th className="p-2.5 text-right">PDS Food Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredDistricts.map((d, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-2.5 font-bold text-slate-200">{d.name}</td>
                  <td className="p-2.5 text-slate-400">{d.state}</td>
                  <td className="p-2.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      d.status === 'ISOLATED_RISK'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                        : d.status === 'DEGRADED'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    }`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="p-2.5 text-slate-300">{d.active_lifelines} Arterial</td>
                  <td className="p-2.5 text-rose-400 font-bold">{d.blocked_roads > 0 ? `${d.blocked_roads} Blockage` : 'None'}</td>
                  <td className="p-2.5 text-slate-400">{d.priority_depot}</td>
                  <td className="p-2.5 text-right">
                    <span className={`font-bold ${d.medicine_stock_days <= 5 ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`}>
                      {d.medicine_stock_days} days
                    </span>
                  </td>
                  <td className="p-2.5 text-right">
                    <span className={`font-bold ${d.food_stock_days <= 8 ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {d.food_stock_days} days
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 7. BRO Heavy Machinery Staging & Clearance Task Forces */}
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
