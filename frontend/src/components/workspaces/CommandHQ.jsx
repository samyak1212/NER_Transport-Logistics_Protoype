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
  UserCheck,
  Truck,
  User,
  Phone,
  BadgeCheck,
  X,
  FileText,
  Thermometer,
  PhoneCall,
  Send,
  Check
} from 'lucide-react';
import MapCanvas from '../MapCanvas';
import GeotechnicalDrawer from '../GeotechnicalDrawer';
import LandslideRainfallPanel from '../LandslideRainfallPanel';
import { 
  REGIONAL_CORRIDORS, 
  BRO_MACHINERY_UNITS, 
  DEFAULT_DISTRICTS, 
  ACTIVE_CONVOYS, 
  REGISTERED_DRIVERS 
} from '../../data/defaultData';

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
  allConvoys = [],
  drivers = [],
  selectedDriverId,
  onSelectDriver = () => {},
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
  const [selectedConvoyForManifest, setSelectedConvoyForManifest] = useState(null);
  const [voipCallActive, setVoipCallActive] = useState(false);
  const [advisorySent, setAdvisorySent] = useState(false);

  const authority = AUTHORITY_PROFILES[authorityKey] || AUTHORITY_PROFILES.VARTAK;

  const displayDistricts = (districts && districts.length > 0) ? districts : DEFAULT_DISTRICTS;
  const displayMachinery = (broMachinery && broMachinery.length > 0) ? broMachinery : BRO_MACHINERY_UNITS;
  const displayConvoys = (allConvoys && allConvoys.length > 0) ? allConvoys : ACTIVE_CONVOYS;
  const displayDrivers = (drivers && drivers.length > 0) ? drivers : REGISTERED_DRIVERS;

  const filteredDistricts = displayDistricts.filter(d => {
    if (districtFilter === 'ALL') return true;
    return d.status === districtFilter;
  });

  // Find linked driver for selected manifest convoy
  const activeManifestConvoy = selectedConvoyForManifest;
  const matchedDriver = activeManifestConvoy 
    ? (displayDrivers.find(d => d.id === activeManifestConvoy.driver_id || d.assigned_vehicle_id === activeManifestConvoy.id) || {
        name: activeManifestConvoy.driver_name || 'Subedar R. Thapa',
        id: activeManifestConvoy.driver_id || 'DRV-014',
        phone: activeManifestConvoy.driver_phone || '+91 94350-12844',
        license_no: activeManifestConvoy.driver_license || 'HMV-AR-2016-9021 (Hill Endorsed)',
        experience_years: 14,
        blood_group: activeManifestConvoy.blood_group || 'O+',
        emergency_contact: 'Tawang BRO Base / +91 94350-99001',
        status: 'EN_ROUTE',
        duty_hours_today: 4.5,
        max_duty_hours: 8.0,
        badge: 'ARMY_SUPPLY_CORPS_VET'
      })
    : null;

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
            onSelectConvoy={(convoy) => setSelectedConvoyForManifest(convoy)}
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

      {/* 3. Regional Monitored Convoys & Certified Driver Fleet (Clause d & Entity Connectivity) */}
      <div className="glass-panel p-4 rounded-xl border border-slate-800 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-cyan-400" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200">
              Active Regional Convoys & Driver Fleet Surveillance (Clause d)
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800">
              {displayConvoys.length} GPS Linked Units
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            Click any convoy to inspect complete Driver & Vehicle Manifest
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {displayConvoys.map((convoy) => {
            const isSelected = selectedConvoyForManifest?.id === convoy.id;
            const isMed = convoy.priority === 'CRITICAL_MEDICAL' || convoy.cargo_type === 'MEDICAL';
            const isFood = convoy.priority === 'ESSENTIAL_FOOD' || convoy.cargo_type === 'FOOD_PDS';
            const isFuel = convoy.priority === 'FUEL_POL' || convoy.cargo_type === 'FUEL_POL';
            const borderCol = isMed ? 'border-rose-500/40 hover:border-rose-400' : isFood ? 'border-emerald-500/40 hover:border-emerald-400' : isFuel ? 'border-amber-500/40 hover:border-amber-400' : 'border-cyan-500/40 hover:border-cyan-400';
            const badgeBg = isMed ? 'bg-rose-500/10 text-rose-300 border-rose-500/30' : isFood ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' : isFuel ? 'bg-amber-500/10 text-amber-300 border-amber-500/30' : 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30';

            return (
              <div
                key={convoy.id}
                onClick={() => setSelectedConvoyForManifest(convoy)}
                className={`p-3.5 rounded-xl bg-defense-900 border ${borderCol} cursor-pointer transition-all hover:scale-[1.01] hover:shadow-lg flex flex-col justify-between space-y-2 ${
                  isSelected ? 'ring-2 ring-cyan-400 bg-defense-800' : ''
                }`}
              >
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <span className="font-bold text-xs text-white flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-cyan-400" />
                      {convoy.id}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold border ${badgeBg}`}>
                      {convoy.priority}
                    </span>
                  </div>

                  <div className="mt-2 text-xs font-mono">
                    <div className="text-amber-400 font-bold flex items-center justify-between">
                      <span>Reg: {convoy.vehicle_reg || 'AS-01-EC-9042'}</span>
                      <span className="text-[10px] text-slate-400">{convoy.speed_kmh} km/h</span>
                    </div>
                    <div className="text-slate-300 font-bold mt-1 truncate">
                      {convoy.cargo}
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-800 text-[11px] space-y-1">
                    <div className="flex items-center justify-between text-slate-400">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3 text-cyan-400" />
                        Driver:
                      </span>
                      <span className="font-bold text-slate-200">{convoy.driver_name}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                      <span>Phone:</span>
                      <span className="text-cyan-400">{convoy.driver_phone}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                      <span>Destination:</span>
                      <span className="text-slate-300 truncate max-w-[130px]">{convoy.destination}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedConvoyForManifest(convoy);
                  }}
                  className="w-full mt-2 py-1.5 bg-slate-800 hover:bg-cyan-600 text-cyan-300 hover:text-white rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1"
                >
                  <FileText className="w-3 h-3" />
                  <span>Inspect Full Manifest</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Real-Time Disruption Prediction, Rainfall & Lifeline Corridors (SIH Clauses b & c) */}
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

      {/* 5. Regional Multi-Corridor Status Ribbon (All 4 Lifelines) */}
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

      {/* 6. AI Operational Situation Briefing (Trilingual MDoNER / SDMA Directive) */}
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

      {/* 7. District Isolation Matrix & Supply Headroom (Medicines & Ration Days) */}
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

      {/* 8. BRO Heavy Machinery Staging & Clearance Task Forces */}
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

      {/* ========================================================================= */}
      {/* 9. DRIVER & VEHICLE DETAILED MANIFEST INSPECTION MODAL / DRAWER           */}
      {/* ========================================================================= */}
      {activeManifestConvoy && (
        <div className="fixed inset-0 z-[2000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 md:p-6 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-4 bg-gradient-to-r from-slate-900 via-defense-900 to-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-white flex items-center gap-2">
                      COMMAND MANIFEST: {activeManifestConvoy.id}
                    </h3>
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      {activeManifestConvoy.vehicle_reg || 'AS-01-EC-9042'}
                    </span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      SEAL INTACT
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Consignment: {activeManifestConvoy.cargo} &bull; Destination: <b className="text-slate-200">{activeManifestConvoy.destination}</b>
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedConvoyForManifest(null);
                  setVoipCallActive(false);
                  setAdvisorySent(false);
                }}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Two Columns (Driver Dossier vs Vehicle Technical Manifest) */}
            <div className="p-5 overflow-y-auto space-y-4 text-xs font-sans">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Column 1: Certified Driver Dossier */}
                <div className="p-4 rounded-xl bg-defense-950/80 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                      <User className="w-4 h-4 text-cyan-400" />
                      Assigned Driver Dossier
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                      FIT TO DRIVE
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-800 flex items-center justify-center text-white font-bold text-xl shadow-lg border border-cyan-400/40 shrink-0">
                      {matchedDriver?.name?.split(' ').map(n=>n[0]).join('') || 'DR'}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white flex items-center gap-1.5">
                        <BadgeCheck className="w-4 h-4 text-cyan-400" />
                        {matchedDriver?.name}
                      </div>
                      <div className="text-[11px] font-mono text-cyan-400 mt-0.5">
                        ID: {matchedDriver?.id} &bull; {matchedDriver?.badge?.replace(/_/g, ' ')}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Mountain Experience: <b className="text-slate-200">{matchedDriver?.experience_years || 12} Years</b>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800/80 font-mono text-[11px] space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Driving License:</span>
                      <span className="text-slate-200 font-bold">{matchedDriver?.license_no}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Direct Phone:</span>
                      <span className="text-cyan-300 font-bold">{matchedDriver?.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Blood Group:</span>
                      <span className="text-rose-400 font-bold">{matchedDriver?.blood_group || 'O+'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Emergency Base:</span>
                      <span className="text-slate-300 truncate max-w-[170px]">{matchedDriver?.emergency_contact}</span>
                    </div>
                  </div>

                  {/* Driver Shift & Fatigue Meter */}
                  <div>
                    <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                      <span>Daily Shift Duty:</span>
                      <span className="text-slate-200 font-bold">{matchedDriver?.duty_hours_today || 4.5}h / {matchedDriver?.max_duty_hours || 8.0}h Max</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${((matchedDriver?.duty_hours_today || 4.5) / (matchedDriver?.max_duty_hours || 8.0)) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1 flex justify-between">
                      <span>Rest Requirement: None</span>
                      <span className="text-emerald-400">Fatigue Index: Optimal (Low)</span>
                    </div>
                  </div>
                </div>

                {/* Column 2: Vehicle Telemetry & Technical Consignment */}
                <div className="p-4 rounded-xl bg-defense-950/80 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-amber-400" />
                      Vehicle & Payload Telemetry
                    </span>
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                      ACTIVE TRANSIT
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800/80 font-mono text-[11px] space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Make & Model:</span>
                      <span className="text-slate-200 font-bold">{activeManifestConvoy.vehicle_model || matchedDriver?.vehicle_model || 'Tata 1618 SE 4x4 Mountain Cargo'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Registration Plate:</span>
                      <span className="text-amber-400 font-bold">{activeManifestConvoy.vehicle_reg || 'AS-01-EC-9042'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Consignment ID:</span>
                      <span className="text-cyan-300 font-bold">{activeManifestConvoy.consignment_id || matchedDriver?.consignment_id || 'CN-MED-TAWANG-8891'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Security Anti-Tamper:</span>
                      <span className="text-emerald-400 font-bold">{activeManifestConvoy.seal_number || matchedDriver?.seal_number || 'BRO-VARTAK-SEAL-4491'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Cargo Weight:</span>
                      <span className="text-slate-200 font-bold">{activeManifestConvoy.cargo_weight_tons || activeManifestConvoy.tonnage || 8.5} Metric Tons</span>
                    </div>
                  </div>

                  {/* Critical Environmental Sensor Telemetry */}
                  <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-800/60 font-mono text-xs space-y-1.5">
                    <div className="flex items-center justify-between text-cyan-300 font-bold">
                      <span className="flex items-center gap-1.5">
                        <Thermometer className="w-3.5 h-3.5 text-cyan-400" />
                        Storage Environmental Compliance:
                      </span>
                      {activeManifestConvoy.temperature_c ? (
                        <span className="text-emerald-400">{activeManifestConvoy.temperature_c}°C (Normal)</span>
                      ) : activeManifestConvoy.fuel_volume_liters ? (
                        <span className="text-amber-400">{activeManifestConvoy.fuel_volume_liters.toLocaleString()} Liters</span>
                      ) : (
                        <span className="text-emerald-400">Tarpaulin Sealed (Dry)</span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-300">
                      {activeManifestConvoy.cargo_type === 'MEDICAL' 
                        ? 'Cold-chain active with dual redundant compressors. Temperature steady at 3.8°C (Permissible range: 2.0°C - 8.0°C).' 
                        : activeManifestConvoy.cargo_type === 'FUEL_POL'
                        ? 'High-altitude winterized diesel bowser with pressure valve telemetry active. Zero vapor leakage.'
                        : 'PDS food grain protected against rain with BRO standard heavy-duty water-tight seals.'}
                    </div>
                  </div>

                  {/* Live GPS & Landmark */}
                  <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 text-[10px] block">Live Speed</span>
                      <span className="font-bold text-white text-sm">{activeManifestConvoy.speed_kmh} km/h</span>
                    </div>
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 text-[10px] block">Progress</span>
                      <span className="font-bold text-emerald-400 text-sm">{(activeManifestConvoy.progress_pct || 0).toFixed(0)}% Completed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Authority Command Interventions */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                    <Radio className="w-4 h-4 text-cyan-400" />
                    Direct Authority Interventions & Cockpit Communications
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400">
                    Satellite Link: GSAT-7A Active
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {/* Satellite VoIP Call Button */}
                  <button
                    type="button"
                    onClick={() => setVoipCallActive(!voipCallActive)}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md ${
                      voipCallActive
                        ? 'bg-rose-600 text-white animate-pulse'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    }`}
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>
                      {voipCallActive ? 'TERMINATE SATELLITE CALL' : `CALL DRIVER (${matchedDriver?.name?.split(' ')[1] || 'CAB'})`}
                    </span>
                  </button>

                  {/* Transmit Advisory to Cockpit */}
                  <button
                    type="button"
                    onClick={() => {
                      setAdvisorySent(true);
                      setTimeout(() => setAdvisorySent(false), 4000);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>TRANSMIT ADVISORY TO IN-CAB HUD</span>
                  </button>

                  {/* Request High Altitude Escort */}
                  <button
                    type="button"
                    onClick={() => alert(`Priority Escort Authorization dispatched to BRO Checkpost for convoy ${activeManifestConvoy.id} (${activeManifestConvoy.vehicle_reg}).`)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer border border-slate-700"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>DISPATCH BRO ESCORT</span>
                  </button>
                </div>

                {/* Simulated VoIP Active Bar */}
                {voipCallActive && (
                  <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-between text-xs text-emerald-200 animate-pulse">
                    <div className="flex items-center gap-2">
                      <Radio className="w-4 h-4 text-emerald-400" />
                      <span>
                        <b>SATELLITE VOIP CONNECTED:</b> In-Cab Cockpit Audio Active with {matchedDriver?.name} ({matchedDriver?.phone}) &bull; Latency: 118ms
                      </span>
                    </div>
                    <span className="font-mono text-[10px] bg-emerald-900 px-2 py-0.5 rounded text-emerald-300">
                      SECURE TACTICAL CH-4
                    </span>
                  </div>
                )}

                {/* Simulated Advisory Dispatched Toast */}
                {advisorySent && (
                  <div className="p-3 rounded-lg bg-cyan-950/80 border border-cyan-500/50 flex items-center justify-between text-xs text-cyan-200 animate-fadeIn">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-cyan-400" />
                      <span>
                        <b>ADVISORY TRANSMITTED:</b> Command advisory pushed to {matchedDriver?.name}'s in-cab HUD: "Maintain reduced speed across Kameng Gorge; BRO clearing team active at km 114."
                      </span>
                    </div>
                    <span className="font-mono text-[10px] bg-cyan-900 px-2 py-0.5 rounded text-cyan-300">
                      ACK RECEIVED
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
