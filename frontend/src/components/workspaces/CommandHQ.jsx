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
  Check,
  LifeBuoy,
  Waves,
  Snowflake,
  AlertOctagon,
  Clock,
  MapPin,
  ArrowRight,
  Filter,
  CheckCircle,
  Eye,
  Zap,
  Info
} from 'lucide-react';
import MapCanvas from '../MapCanvas';
import GeotechnicalDrawer from '../GeotechnicalDrawer';
import LandslideRainfallPanel from '../LandslideRainfallPanel';
import { 
  REGIONAL_CORRIDORS, 
  BRO_MACHINERY_UNITS, 
  DEFAULT_DISTRICTS, 
  ACTIVE_CONVOYS, 
  REGISTERED_DRIVERS,
  REGIONAL_HAZARD_INTELLIGENCE,
  ROADWORKS_AND_CONNECTIVITY
} from '../../data/defaultData';

export const AUTHORITY_PROFILES = {
  ASDMA_ASSAM: {
    id: 'ASDMA_ASSAM',
    name: 'Assam SDMA (Dispur Central Command)',
    state: 'Assam',
    agency: 'Assam State Disaster Management Authority (ASDMA)',
    project: 'Dispur Logistics & Flood Command Hub',
    role: 'State Logistics Coordinator & Relief Chief',
    jurisdiction: 'Kamrup Supply Hub, Brahmaputra Arterials & Transits',
    clearance: 'TRANSIT_CORRIDOR_COMMAND',
    badgeColor: 'border-amber-500/60 bg-amber-950/40 text-amber-300'
  },
  ARUNACHAL_SDMA: {
    id: 'ARUNACHAL_SDMA',
    name: 'Arunachal SDMA (Itanagar SEOC)',
    state: 'Arunachal Pradesh',
    agency: 'Arunachal Pradesh Disaster Management Authority',
    project: 'State Emergency Operations Centre (SEOC Itanagar)',
    role: 'Director of Disaster Management & Frontier Lifelines',
    jurisdiction: 'All 26 Frontier Districts, Kameng, Tawang & Siang Sectors',
    clearance: 'STATE_CIVIL_PROTECTION',
    badgeColor: 'border-cyan-500/60 bg-cyan-950/40 text-cyan-300'
  },
  MANIPUR_SDMA: {
    id: 'MANIPUR_SDMA',
    name: 'Manipur SDMA (Imphal Emergency Cell)',
    state: 'Manipur',
    agency: 'Manipur State Disaster Management Authority',
    project: 'Imphal Valley & Hills Logistics Emergency Cell',
    role: 'State Relief & Supply Logistics Officer',
    jurisdiction: 'Imphal East/West, Senapati, Churachandpur & NH-2 Corridor',
    clearance: 'STATE_CIVIL_PROTECTION',
    badgeColor: 'border-rose-500/60 bg-rose-950/40 text-rose-300'
  },
  MEGHALAYA_SDMA: {
    id: 'MEGHALAYA_SDMA',
    name: 'Meghalaya SDMA (Shillong Plateau)',
    state: 'Meghalaya',
    agency: 'Meghalaya State Disaster Management Authority',
    project: 'Shillong Plateau Corridor Control & Sonapur Monitoring',
    role: 'State Relief & Transport Officer',
    jurisdiction: 'East Khasi Hills, Ri-Bhoi, Jaintia Hills & NH-6 Transit',
    clearance: 'STATE_CIVIL_PROTECTION',
    badgeColor: 'border-blue-500/60 bg-blue-950/40 text-blue-300'
  },
  MIZORAM_SDMA: {
    id: 'MIZORAM_SDMA',
    name: 'DM&R Mizoram (Aizawl Mountain Cell)',
    state: 'Mizoram',
    agency: 'Disaster Management & Rehabilitation Department (Mizoram)',
    project: 'Aizawl Mountain Logistics & Buffer Stock Cell',
    role: 'Director of Relief Operations',
    jurisdiction: 'Aizawl, Kolasib, Lunglei & Southern Frontier Transits',
    clearance: 'STATE_CIVIL_PROTECTION',
    badgeColor: 'border-teal-500/60 bg-teal-950/40 text-teal-300'
  },
  NAGALAND_SDMA: {
    id: 'NAGALAND_SDMA',
    name: 'NSDMA Nagaland (Kohima SEOC)',
    state: 'Nagaland',
    agency: 'Nagaland State Disaster Management Authority (NSDMA)',
    project: 'Kohima Critical Ridge & Gorge Coordination SEOC',
    role: 'Chief Emergency Logistics Coordinator',
    jurisdiction: 'Kohima, Dimapur Railhead, Mokokchung & NH-29 Lifeline',
    clearance: 'STATE_CIVIL_PROTECTION',
    badgeColor: 'border-emerald-500/60 bg-emerald-950/40 text-emerald-300'
  },
  TRIPURA_SDMA: {
    id: 'TRIPURA_SDMA',
    name: 'Tripura SDMA (Agartala Multimodal)',
    state: 'Tripura',
    agency: 'Tripura State Disaster Management Authority',
    project: 'Agartala Multimodal Transit Hub & Granary Depots',
    role: 'State Logistics Director',
    jurisdiction: 'West Tripura, South Tripura & Silchar-Agartala NH-8',
    clearance: 'STATE_CIVIL_PROTECTION',
    badgeColor: 'border-orange-500/60 bg-orange-950/40 text-orange-300'
  },
  SIKKIM_SDMA: {
    id: 'SIKKIM_SDMA',
    name: 'SSDMA Sikkim (Gangtok Teesta Cell)',
    state: 'Sikkim',
    agency: 'Sikkim State Disaster Management Authority (SSDMA)',
    project: 'Gangtok Teesta Basin Operations Cell',
    role: 'Special Secretary, Disaster Management',
    jurisdiction: 'East Sikkim, North Sikkim (Lachen/Lachung) & NH-10 Teesta Gorge',
    clearance: 'STATE_CIVIL_PROTECTION',
    badgeColor: 'border-indigo-500/60 bg-indigo-950/40 text-indigo-300'
  },
  VARTAK: {
    id: 'VARTAK',
    name: 'BRO Project Vartak (Western Arunachal)',
    state: 'Arunachal Pradesh',
    agency: 'Border Roads Organisation (BRO)',
    project: 'Project Vartak (42 BRTF Tactical Headquarters)',
    role: 'Chief Engineer / Task Force Commander',
    jurisdiction: 'Western Arunachal (Kameng & Tawang Frontier Sectors)',
    clearance: 'DEFENSE_STRATEGIC_TIER_1',
    badgeColor: 'border-emerald-500/60 bg-emerald-950/40 text-emerald-300'
  },
  MDONER: {
    id: 'MDONER',
    name: 'Ministry of DoNER (Central Oversight)',
    state: 'ALL',
    agency: 'Ministry of Development of North Eastern Region (MDoNER)',
    project: 'Central Logistics & Accessibility Intelligence Unit',
    role: 'Regional Development Advisor (New Delhi)',
    jurisdiction: 'Inter-State Multi-Modal Coordination (All 8 NER States)',
    clearance: 'UNION_MINISTRY_DIRECTIVE',
    badgeColor: 'border-purple-500/60 bg-purple-950/40 text-purple-300'
  }
};

export const DEFAULT_OPERATOR_FLAGS = [
  {
    id: 'FLAG-AS-01',
    state: 'Assam',
    location: 'Brahmaputra Pancharatna Embankment (Goalpara Sector)',
    severity: 'WARNING',
    category: 'WATER_SEEPAGE',
    timestamp: '12 mins ago',
    operator_name: 'Inspector H. Baruah (ASDMA Quick Response)',
    operator_role: 'SEOC Field Hydro-Observer',
    message: 'Embankment seepage detected near Pier 4. Heavy cargo vehicles throttled to 20 km/h single-lane.',
    action_status: 'MONITORING_ESCORT',
    affected_corridor: 'NH-17 / Brahmaputra Artery'
  },
  {
    id: 'FLAG-AR-02',
    state: 'Arunachal Pradesh',
    location: 'Sessa Hairpin km 78 (West Kameng)',
    severity: 'CRITICAL',
    category: 'SCREE_FALL',
    timestamp: '18 mins ago',
    operator_name: 'Driver Subedar R. Thapa (MED_CONVOY_01)',
    operator_role: 'Senior Mountain Pilot',
    message: 'Active scree chute discharging shale across road surface. BRO Vartak wheel-loader in clearing operation.',
    action_status: 'REROUTE_SUGGESTED',
    affected_corridor: 'NH-13 (Bhalukpong-Bomdila)'
  },
  {
    id: 'FLAG-ML-03',
    state: 'Meghalaya',
    location: 'Sonapur Mudflow Tunnel (NH-6 Jaintia Hills)',
    severity: 'EMERGENCY',
    category: 'VEHICLE_BREAKDOWN',
    timestamp: '26 mins ago',
    operator_name: 'Pilot D. Hazarika (AS_OXYGEN_05)',
    operator_role: 'Cryogenic Tanker Commander',
    message: 'Rear suspension axle failure inside mud chute apron. Recovery crane unit dispatched by Pushpak detachment.',
    action_status: 'RECOVERY_IN_PROGRESS',
    affected_corridor: 'NH-6 (Shillong-Silchar)'
  },
  {
    id: 'FLAG-NL-04',
    state: 'Nagaland',
    location: 'Paglapahar Gorge km 18 (Dimapur-Kohima)',
    severity: 'HIGH',
    category: 'ROCKFALL_ALERT',
    timestamp: '34 mins ago',
    operator_name: 'Naik K. Ao (FUEL_TANKER_02)',
    operator_role: 'POL Logistics Escort',
    message: 'Intermittent falling rocks from shale overhang. Traffic halted momentarily by spotters.',
    action_status: 'PILOT_ESCORT_ACTIVE',
    affected_corridor: 'NH-29'
  },
  {
    id: 'FLAG-MN-05',
    state: 'Manipur',
    location: 'Mao Gate Border Checkpost (Senapati)',
    severity: 'WARNING',
    category: 'TRANSIT_BOTTLENECK',
    timestamp: '42 mins ago',
    operator_name: 'Pilot T. Singh (MN_MED_06)',
    operator_role: 'Medical Relief Driver',
    message: 'Truck queue congestion extending 3 km due to landslide clearing on south ramp. Medical convoys given green pass.',
    action_status: 'PRIORITY_CLEARANCE',
    affected_corridor: 'NH-2 (Kohima-Imphal)'
  },
  {
    id: 'FLAG-SK-06',
    state: 'Sikkim',
    location: 'Dikchu River Approach km 24 (North Sikkim)',
    severity: 'HIGH',
    category: 'ROAD_SUBSIDENCE',
    timestamp: '51 mins ago',
    operator_name: 'Karma Lepcha (SK_BLOOD_09)',
    operator_role: 'Emergency Blood Courier',
    message: 'Road shoulder eroded by swollen Teesta tributary. Light vehicles allowed, 10-wheelers restricted.',
    action_status: 'PILOT_ESCORT_ACTIVE',
    affected_corridor: 'NH-10 Spur'
  },
  {
    id: 'FLAG-MZ-07',
    state: 'Mizoram',
    location: 'Kolasib Northern Defile (Silchar-Aizawl Lifeline)',
    severity: 'CAUTION',
    category: 'MUD_SLIP',
    timestamp: '1 hr ago',
    operator_name: 'Lalrindika Sailo (MZ_POL_07)',
    operator_role: 'Heavy Tanker Operator',
    message: 'Shallow mud runoff cleared; wet pavement slick on descending hairpins. Speed advisory 25 km/h.',
    action_status: 'NORMAL_CAUTION',
    affected_corridor: 'NH-306 / NH-6'
  },
  {
    id: 'FLAG-TR-08',
    state: 'Tripura',
    location: 'Ambassa Culvert Stretch (Dhalai Sector)',
    severity: 'CAUTION',
    category: 'WATERLOGGING',
    timestamp: '1.4 hrs ago',
    operator_name: 'B. Debbarma (TR_GRAIN_08)',
    operator_role: 'FCI Freight Driver',
    message: 'Culvert drainage overflow after cloudburst. Water receding steadily; no impediment to multi-axles.',
    action_status: 'CLEAR_TRANSIT',
    affected_corridor: 'NH-8'
  }
];

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
  const [activeSubTab, setActiveSubTab] = useState('activity'); // 'activity', 'convoys', 'districts', 'hazards', 'roadworks', 'briefing'
  const [authorityKey, setAuthorityKey] = useState('ASDMA_ASSAM');
  const [briefLang, setBriefLang] = useState('english');
  const [districtFilter, setDistrictFilter] = useState('ALL');
  const [districtScope, setDistrictScope] = useState('STATE_ONLY'); // 'STATE_ONLY' or 'ALL_NER'
  const [selectedConvoyForManifest, setSelectedConvoyForManifest] = useState(null);
  const [voipCallActive, setVoipCallActive] = useState(false);
  const [advisorySent, setAdvisorySent] = useState(false);

  const authority = AUTHORITY_PROFILES[authorityKey] || AUTHORITY_PROFILES.ASDMA_ASSAM;
  const authState = authority.state; // 'Assam', 'Arunachal Pradesh', or 'ALL'

  const displayDistricts = (districts && districts.length > 0) ? districts : DEFAULT_DISTRICTS;
  const displayMachinery = (broMachinery && broMachinery.length > 0) ? broMachinery : BRO_MACHINERY_UNITS;
  const displayConvoys = (allConvoys && allConvoys.length > 0) ? allConvoys : ACTIVE_CONVOYS;
  const displayDrivers = (drivers && drivers.length > 0) ? drivers : REGISTERED_DRIVERS;
  const displayReports = (reports && reports.length > 0) ? reports : DEFAULT_OPERATOR_FLAGS;

  // STRICT STATE INVOLVEMENT FILTERING:
  // An authority in Assam must strictly only see transport/logistics WITHIN Assam or BETWEEN Assam and other states.
  // Must NOT see purely intra-state movements of other states.
  const stateConvoys = displayConvoys.filter(c => {
    if (!authState || authState === 'ALL') return true;
    if (c.states && Array.isArray(c.states) && c.states.includes(authState)) return true;
    if (c.origin_state === authState || c.dest_state === authState) return true;
    if (typeof c.states === 'string' && c.states.includes(authState)) return true;
    return false;
  });

  // Alerted or damaged convoys for quick operations monitoring
  const alertedConvoys = stateConvoys.filter(c => 
    c.ahead_hazard_detected || 
    c.mechanical_breakdown || 
    c.status?.includes('SLOW') || 
    c.status?.includes('DAMAGED') || 
    c.status?.includes('WARNING') || 
    c.status?.includes('CAUTION') ||
    c.priority === 'CRITICAL_MEDICAL'
  );

  // Districts within this state
  const stateDistricts = displayDistricts.filter(d => {
    if (!authState || authState === 'ALL') return true;
    return d.state === authState;
  });

  // Table districts honoring the districtScope toggle ('STATE_ONLY' vs 'ALL_NER')
  const tableDistricts = (districtScope === 'STATE_ONLY' && authState !== 'ALL') ? stateDistricts : displayDistricts;
  const filteredDistricts = tableDistricts.filter(d => {
    if (districtFilter === 'ALL') return true;
    return d.status === districtFilter;
  });

  // Single-lifeline gaps for this state
  const stateGaps = (ROADWORKS_AND_CONNECTIVITY?.connectivity_gaps || []).filter(g => {
    if (!authState || authState === 'ALL') return true;
    return g.state?.includes(authState) || g.district_or_sector?.includes(authState);
  });

  // Roadworks for this state
  const stateRoadworks = (ROADWORKS_AND_CONNECTIVITY?.ongoing_roadworks || []).filter(rw => {
    if (!authState || authState === 'ALL') return true;
    if (authState === 'Arunachal Pradesh' && rw.corridor === 'CORRIDOR_NH13') return true;
    if (authState === 'Assam' && (rw.corridor === 'CORRIDOR_NH13' || rw.corridor === 'CORRIDOR_NH6')) return true;
    if (authState === 'Nagaland' && rw.corridor === 'CORRIDOR_NH29') return true;
    if (authState === 'Manipur' && rw.corridor === 'CORRIDOR_NH29') return true;
    if (authState === 'Sikkim' && rw.corridor === 'CORRIDOR_NH10') return true;
    if (authState === 'Meghalaya' && rw.corridor === 'CORRIDOR_NH6') return true;
    if (authState === 'Tripura' && rw.corridor === 'CORRIDOR_NH6') return true;
    return rw.stretch?.includes(authState) || rw.corridor?.includes(authState);
  });

  // Ground reports filtered by state
  const stateFilteredReports = displayReports.filter(r => {
    if (!authState || authState === 'ALL') return true;
    return r.state === authState || (r.affected_corridor && r.affected_corridor.includes(authState));
  });

  // Find linked driver for selected manifest convoy
  const activeManifestConvoy = selectedConvoyForManifest;
  const manifestConvoyId = activeManifestConvoy ? (activeManifestConvoy.id || activeManifestConvoy.vehicle_id) : null;
  const matchedDriver = activeManifestConvoy 
    ? (displayDrivers.find(d => d.id === activeManifestConvoy.driver_id || d.assigned_vehicle_id === manifestConvoyId) || {
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
    <div className="space-y-4 text-slate-200 font-sans">
      {/* 1. Authority Profile & Jurisdiction Switcher Bar */}
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

        {/* Switch Authority Dropdown */}
        <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
          <span className="text-[11px] font-mono text-slate-400 hidden lg:inline">Switch Authority:</span>
          <select
            value={authorityKey}
            onChange={(e) => setAuthorityKey(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-100 font-mono text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-cyan-500 cursor-pointer shadow-inner"
          >
            <option value="ASDMA_ASSAM">Assam SDMA (Dispur Logistics Hub)</option>
            <option value="ARUNACHAL_SDMA">Arunachal SDMA (Itanagar SEOC)</option>
            <option value="MANIPUR_SDMA">Manipur SDMA (Imphal Emergency Cell)</option>
            <option value="MEGHALAYA_SDMA">Meghalaya SDMA (Shillong Plateau Control)</option>
            <option value="MIZORAM_SDMA">DM&R Mizoram (Aizawl Mountain Cell)</option>
            <option value="NAGALAND_SDMA">NSDMA Nagaland (Kohima SEOC)</option>
            <option value="TRIPURA_SDMA">Tripura SDMA (Agartala Multimodal Hub)</option>
            <option value="SIKKIM_SDMA">SSDMA Sikkim (Gangtok Teesta Cell)</option>
            <option value="VARTAK">BRO Project Vartak (Western Arunachal)</option>
            <option value="MDONER">Ministry of DoNER (All 8 NER States)</option>
          </select>
        </div>
      </div>

      {/* 2. Authority Sub-Tabs Bar (Live Operations Feed, Strategic Fleet, Districts, Hazards, Roadworks, AI Briefing) */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-xl overflow-x-auto shadow-inner">
        <button
          onClick={() => setActiveSubTab('activity')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeSubTab === 'activity'
              ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Activity className="w-4 h-4 text-cyan-400" />
          <span>Live Operations & Activity Feed</span>
          {alertedConvoys.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold bg-rose-500 text-white animate-pulse">
              {alertedConvoys.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveSubTab('convoys')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeSubTab === 'convoys'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Truck className="w-4 h-4 text-blue-400" />
          <span>Strategic Fleet & Convoys ({stateConvoys.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('districts')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeSubTab === 'districts'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Layers className="w-4 h-4 text-emerald-400" />
          <span>District Lifelines & Gaps ({stateDistricts.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('hazards')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeSubTab === 'hazards'
              ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Waves className="w-4 h-4 text-amber-400" />
          <span>Regional Hazards & Rivers</span>
        </button>

        <button
          onClick={() => setActiveSubTab('roadworks')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeSubTab === 'roadworks'
              ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Wrench className="w-4 h-4 text-orange-400" />
          <span>BRO Roadworks & Machinery</span>
        </button>

        <button
          onClick={() => setActiveSubTab('briefing')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeSubTab === 'briefing'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>Executive AI Intelligence</span>
        </button>
      </div>

      {/* 3. Sub-Tab 1: LIVE OPERATIONS & ACTIVITY FEED (Main Map + Damaged/Alerted Convoys + Disrupted Roads + Operator Flags) */}
      {activeSubTab === 'activity' && (
        <div className="space-y-4">
          {/* Interactive GIS Map Canvas & Geotechnical Drawer */}
          <div className="relative w-full h-[500px] md:h-[560px] flex rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
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
                selectedAuthorityState={authority.state}
                activeWorkspace="command"
              />
            </div>

            {/* Geotechnical Drawer appears on segment click */}
            {selectedSegment && (
              <GeotechnicalDrawer
                segment={selectedSegment}
                onClose={() => onSelectSegment(null)}
              />
            )}
          </div>

          {/* Operations Activity Panel: Vital signs, Damaged/Alerted Convoys, Disrupted Roads, Field Operator Flags */}
          <div className="space-y-4">
            {/* Jurisdiction & Vital Signs Bar */}
            <div className="glass-panel p-4 rounded-xl border border-slate-800 bg-gradient-to-r from-slate-900 via-defense-950 to-slate-900 space-y-3">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200">
                    Live Operational Activity Feed & Vital Telemetry
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
                    {authority.state === 'ALL' ? 'ALL 8 NER STATES' : `STATE SCOPE: ${authority.state.toUpperCase()}`}
                  </span>
                </div>
                <button
                  onClick={() => setActiveSubTab('convoys')}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>View Full Fleet Roster ({stateConvoys.length} Convoys)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 4 KPI Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Active State Convoys</span>
                  <div className="text-xl font-mono font-black text-white flex items-center gap-2">
                    <span>{stateConvoys.length}</span>
                    <span className="text-[10px] font-sans font-normal text-slate-400">vehicles</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {authority.state === 'ALL' ? 'Trans-regional network' : `In-transit / transiting ${authority.state}`}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-1">
                  <span className="text-[10px] font-mono text-amber-400 uppercase">Alerted / Delayed Convoys</span>
                  <div className="text-xl font-mono font-black text-amber-300 flex items-center gap-2">
                    <span>{alertedConvoys.length}</span>
                    <span className="text-[10px] font-sans font-normal text-slate-400">need action</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {alertedConvoys.length > 0 ? 'Hazard / Breakdown reported' : 'All running on schedule'}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-1">
                  <span className="text-[10px] font-mono text-rose-400 uppercase">Disrupted Arterials</span>
                  <div className="text-xl font-mono font-black text-rose-300 flex items-center gap-2">
                    <span>{stateGaps.length + stateRoadworks.filter(rw => rw.lane_status?.includes('SINGLE') || rw.lane_status?.includes('STOP')).length}</span>
                    <span className="text-[10px] font-sans font-normal text-slate-400">bottlenecks</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    Active scree / gorge chokepoints
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-1">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase">State Districts Tracked</span>
                  <div className="text-xl font-mono font-black text-emerald-300 flex items-center gap-2">
                    <span>{stateDistricts.length}</span>
                    <span className="text-[10px] font-sans font-normal text-slate-400">districts</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {stateDistricts.filter(d => d.medicine_stock_days <= 5).length > 0 ? (
                      <span className="text-rose-400 font-bold">{stateDistricts.filter(d => d.medicine_stock_days <= 5).length} Critical stock reserve</span>
                    ) : (
                      <span className="text-emerald-400">Buffer reserves stable</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Grid: 2 Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Left Column: Damaged/Alerted Convoys + Disrupted Roads */}
              <div className="space-y-4">
                {/* 1. Damaged & Alerted Convoys Card */}
                <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <h4 className="font-bold text-xs uppercase tracking-wider text-slate-200">
                        Active Incidents & Alerted Convoys
                      </h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {alertedConvoys.length} FLAGGED
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">SAT-Telemetry Stream</span>
                  </div>

                  {alertedConvoys.length === 0 ? (
                    <div className="p-6 rounded-xl bg-slate-900/60 border border-emerald-500/20 text-center space-y-2">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                      <div className="text-sm font-bold text-emerald-300">All Convoys Operating Smoothly</div>
                      <p className="text-xs text-slate-400">
                        No mechanical failures, scree slide halts, or telemetry hazards reported on routes within {authority.state}.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {alertedConvoys.map((c) => {
                        const cId = c.id || c.vehicle_id;
                        const isBreakdown = c.mechanical_breakdown;
                        return (
                          <div
                            key={cId}
                            className={`p-3.5 rounded-xl border transition-all space-y-2.5 ${
                              isBreakdown 
                                ? 'bg-rose-950/30 border-rose-500/40 hover:border-rose-400' 
                                : 'bg-slate-900 border-amber-500/30 hover:border-amber-400'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono font-black text-sm text-white">{cId}</span>
                                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                                    isBreakdown 
                                      ? 'bg-rose-600 text-white animate-pulse' 
                                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                  }`}>
                                    {c.status || (isBreakdown ? 'MECHANICAL BREAKDOWN' : 'HAZARD AHEAD')}
                                  </span>
                                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">
                                    {c.vehicle_reg}
                                  </span>
                                </div>
                                <div className="text-xs text-slate-300 font-sans">
                                  <b>Driver:</b> {c.driver_name} &bull; <span className="text-cyan-400 font-mono">{c.origin} &rarr; {c.destination}</span>
                                </div>
                              </div>
                              <div className="text-right font-mono text-xs">
                                <span className="text-cyan-300 font-bold">{c.speed_kmh} km/h</span>
                                <div className="text-[10px] text-slate-500">Progress {c.progress_pct}%</div>
                              </div>
                            </div>

                            {/* Alert Reason Banner */}
                            <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-mono space-y-1">
                              <div className="text-amber-300 flex items-center gap-1.5">
                                <AlertOctagon className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                                <span>{c.alert_reason || 'Route chokepoint telemetry triggered warning'}</span>
                              </div>
                              {c.current_landmark && (
                                <div className="text-[10px] text-slate-400">
                                  Near: <span className="text-slate-200">{c.current_landmark}</span> &bull; Advisory: <b className="text-cyan-400">{c.operational_advisory}</b>
                                </div>
                              )}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-between pt-1 text-xs">
                              <span className="text-[10px] text-slate-400 font-mono">
                                Cargo: <b className="text-slate-200">{c.cargo}</b>
                              </span>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => {
                                    setSelectedConvoyForManifest(c);
                                    setVoipCallActive(true);
                                  }}
                                  className="px-2.5 py-1 rounded bg-cyan-600/20 hover:bg-cyan-600/40 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                                >
                                  <PhoneCall className="w-3 h-3" />
                                  <span>SAT-Link Call</span>
                                </button>
                                <button
                                  onClick={() => setSelectedConvoyForManifest(c)}
                                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[10px] font-bold cursor-pointer transition-colors"
                                >
                                  Inspect Manifest
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 2. Disrupted Roads & Single-Point Failures in State */}
                <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <AlertOctagon className="w-4 h-4 text-rose-400" />
                      <h4 className="font-bold text-xs uppercase tracking-wider text-slate-200">
                        Disrupted Arterials & Vulnerable Gaps in Jurisdiction
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400">
                      {stateGaps.length} Chokepoints
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {stateGaps.map((gap, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-bold text-xs text-white">{gap.district_or_sector}</h5>
                            <div className="text-[10px] font-mono text-cyan-400">{gap.single_lifeline_artery}</div>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                            {gap.vulnerability_rating}
                          </span>
                        </div>
                        <div className="text-xs text-slate-300 font-sans">
                          <span className="text-slate-500">Chokepoint:</span> <b className="text-amber-300">{gap.isolated_if_chokepoint_fails}</b>
                        </div>
                        <div className="text-[11px] text-emerald-400 font-sans pt-1 border-t border-slate-800/80 flex items-center justify-between">
                          <span><b>Bypass:</b> {gap.alternative_bypass}</span>
                        </div>
                      </div>
                    ))}

                    {/* Also show relevant ongoing roadwork if any */}
                    {stateRoadworks.slice(0, 2).map((rw) => (
                      <div key={rw.id} className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 flex justify-between items-center text-xs">
                        <div>
                          <div className="font-bold text-slate-200">{rw.stretch}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{rw.work_type} &bull; {rw.agency}</div>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          {rw.lane_status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Field Operator SOS Flags & Incident Telemetry */}
              <div className="space-y-4">
                {/* 3. Field Operator SOS Flags Feed */}
                <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                      <h4 className="font-bold text-xs uppercase tracking-wider text-slate-200">
                        Field Operator Flags & Ground Incident Feed
                      </h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
                        {stateFilteredReports.length} REPORTS
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">Live Telemetry</span>
                  </div>

                  <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
                    {stateFilteredReports.length === 0 ? (
                      <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 text-center text-xs text-slate-400">
                        No ground incidents flagged for {authority.state} in the last 6 hours.
                      </div>
                    ) : (
                      stateFilteredReports.map((report) => {
                        const sev = report.severity;
                        const sevColor = 
                          sev === 'EMERGENCY' ? 'bg-rose-600 text-white' :
                          sev === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                          sev === 'HIGH' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40' :
                          sev === 'WARNING' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                          'bg-blue-500/20 text-blue-300 border border-blue-500/40';

                        return (
                          <div key={report.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2 hover:bg-slate-800/50 transition-colors">
                            <div className="flex justify-between items-start">
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-2">
                                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${sevColor}`}>
                                    {sev}
                                  </span>
                                  <span className="font-mono text-xs font-bold text-white">{report.id}</span>
                                  <span className="text-[10px] font-mono text-cyan-400">📍 {report.state}</span>
                                </div>
                                <div className="text-xs font-bold text-slate-200 mt-1">
                                  {report.location}
                                </div>
                              </div>
                              <span className="text-[10px] font-mono text-slate-400">{report.timestamp}</span>
                            </div>

                            <p className="text-xs text-slate-300 font-sans leading-relaxed bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
                              "{report.message}"
                            </p>

                            <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[10px] font-mono text-slate-400">
                              <div>
                                Operator: <b className="text-slate-200">{report.operator_name}</b> ({report.operator_role})
                              </div>
                              <span className="text-cyan-400 font-bold px-2 py-0.5 rounded bg-slate-800">
                                {report.action_status}
                              </span>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* 4. State Lifelines & Depots Snapshot */}
                <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-emerald-400" />
                      <h4 className="font-bold text-xs uppercase tracking-wider text-slate-200">
                        State District Buffer Reservoirs
                      </h4>
                    </div>
                    <button
                      onClick={() => setActiveSubTab('districts')}
                      className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>Open District Matrix &rarr;</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {stateDistricts.slice(0, 4).map((d, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-white">{d.name}</span>
                          <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold ${
                            d.status === 'ISOLATED_RISK' ? 'bg-rose-500/20 text-rose-400' :
                            d.status === 'DEGRADED' ? 'bg-amber-500/20 text-amber-400' :
                            'bg-emerald-500/20 text-emerald-400'
                          }`}>
                            {d.status}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          Med Stock: <b className={d.medicine_stock_days <= 5 ? 'text-rose-400' : 'text-emerald-400'}>{d.medicine_stock_days}d</b> &bull; Food: <b className="text-emerald-400">{d.food_stock_days}d</b>
                        </div>
                        <div className="text-[10px] text-slate-500 font-sans truncate">
                          Depot: {d.priority_depot}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Dedicated Sub-Tab 2: STRATEGIC FLEET & CONVOYS (Full Fleet Table Roster) */}
      {activeSubTab === 'convoys' && (
        <div className="space-y-4">
          <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-cyan-400" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200">
                  Strategic Convoys & Fleet Operations Roster
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
                  {stateConvoys.length} ACTIVE IN JURISDICTION
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                  Scope: <b className="text-cyan-400">{authority.state === 'ALL' ? 'All NER States' : `${authority.state} (Intra & Transit)`}</b>
                </span>
                <button
                  onClick={() => setActiveSubTab('activity')}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-mono font-bold border border-slate-700 transition cursor-pointer flex items-center gap-1"
                >
                  <Layers className="w-3 h-3 text-cyan-400" />
                  <span>Return to Map & Feed</span>
                </button>
              </div>
            </div>

            {/* Convoy Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b border-slate-800 text-[11px] font-mono text-slate-400 bg-defense-900/50">
                    <th className="p-2.5">Convoy ID</th>
                    <th className="p-2.5">Driver & Vehicle</th>
                    <th className="p-2.5">Corridor Route</th>
                    <th className="p-2.5">Cargo Priority</th>
                    <th className="p-2.5">Speed / Status</th>
                    <th className="p-2.5">Telemetry Condition</th>
                    <th className="p-2.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                  {stateConvoys.map((convoy) => {
                    const cId = convoy.id || convoy.vehicle_id;
                    const isHazard = convoy.ahead_hazard_detected;
                    const isBreakdown = convoy.mechanical_breakdown;
                    const linkedDriver = displayDrivers.find(d => d.id === convoy.driver_id || d.assigned_vehicle_id === cId);
                    const driverName = convoy.driver_name || linkedDriver?.name || 'Subedar R. Thapa';
                    const vehicleModel = convoy.vehicle_model || linkedDriver?.vehicle_model || 'Tata 1618 SE 4x4';
                    const vehicleReg = convoy.vehicle_reg || linkedDriver?.vehicle_reg || 'AS-01-EC-9042';

                    return (
                      <tr 
                        key={cId}
                        onClick={() => setSelectedConvoyForManifest(convoy)}
                        className={`hover:bg-slate-800/60 cursor-pointer transition-all ${
                          isBreakdown ? 'bg-rose-950/30' : isHazard ? 'bg-amber-950/20' : ''
                        }`}
                      >
                        <td className="p-2.5 font-bold text-white flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${isBreakdown ? 'bg-rose-500 animate-ping' : isHazard ? 'bg-amber-400 animate-ping' : 'bg-cyan-400'}`}></span>
                          <span>{cId}</span>
                        </td>
                        <td className="p-2.5 font-sans">
                          <div className="font-bold text-slate-200">{driverName}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{vehicleModel} &bull; <span className="text-amber-400">{vehicleReg}</span></div>
                        </td>
                        <td className="p-2.5 font-sans text-slate-300">
                          <div>{convoy.origin} &rarr; <b>{convoy.destination}</b></div>
                          <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                            <span>{convoy.corridor || 'NH-13'}</span>
                            {convoy.states && (
                              <span className="text-cyan-400 font-sans">[{Array.isArray(convoy.states) ? convoy.states.join(', ') : convoy.states}]</span>
                            )}
                          </div>
                        </td>
                        <td className="p-2.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            convoy.priority === 'CRITICAL_MEDICAL' 
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                              : convoy.priority === 'FUEL_POL'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          }`}>
                            {convoy.priority || 'ESSENTIAL_RELIEF'}
                          </span>
                        </td>
                        <td className="p-2.5 font-mono">
                          <span className="text-cyan-400 font-bold">{convoy.speed_kmh || 38} km/h</span>
                          <div className="text-[10px] text-slate-400">{convoy.status || 'IN_TRANSIT'}</div>
                        </td>
                        <td className="p-2.5 font-sans">
                          {isBreakdown ? (
                            <span className="text-rose-400 font-mono text-[10px] font-bold">MECH_FAILURE: {convoy.alert_reason?.slice(0, 32)}...</span>
                          ) : isHazard ? (
                            <span className="text-amber-400 font-mono text-[10px]">HAZARD: {convoy.alert_reason?.slice(0, 32)}...</span>
                          ) : (
                            <span className="text-emerald-400 font-mono text-[10px]">CLEAR_PASSAGE</span>
                          )}
                        </td>
                        <td className="p-2.5 text-right font-sans">
                          <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => {
                                setSelectedConvoyForManifest(convoy);
                                setVoipCallActive(true);
                              }}
                              className="px-2 py-1 rounded bg-cyan-600/20 hover:bg-cyan-600/40 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1"
                              title="Direct SAT-Link Voice Call"
                            >
                              <PhoneCall className="w-3 h-3" />
                              <span className="hidden md:inline">Call</span>
                            </button>
                            <button
                              onClick={() => setSelectedConvoyForManifest(convoy)}
                              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[10px] font-bold transition-all cursor-pointer"
                            >
                              Inspect
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}


      {/* 4. Sub-Tab 2: DISTRICT LIFELINES & CONNECTIVITY GAPS */}
      {activeSubTab === 'districts' && (
        <div className="space-y-4">
          {/* District Vulnerability Matrix */}
          <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-2 border-b border-slate-800">
              <div>
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  District Vulnerability & Supply Buffer Matrix
                </h3>
                <p className="text-xs text-slate-400">
                  Critical tracking of pharmaceutical and essential ration buffer reserves across all frontier districts.
                </p>
              </div>

              {/* Scope & Status Filter Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                {authState !== 'ALL' && (
                  <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                    <button
                      onClick={() => setDistrictScope('STATE_ONLY')}
                      className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                        districtScope === 'STATE_ONLY'
                          ? 'bg-emerald-600 text-white shadow'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {authority.state} ({stateDistricts.length})
                    </button>
                    <button
                      onClick={() => setDistrictScope('ALL_NER')}
                      className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                        districtScope === 'ALL_NER'
                          ? 'bg-emerald-600 text-white shadow'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      All 8 NER States ({displayDistricts.length})
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                  {['ALL', 'ISOLATED_RISK', 'DEGRADED', 'ACCESSIBLE'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setDistrictFilter(f)}
                      className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                        districtFilter === f 
                          ? 'bg-cyan-600 text-white shadow'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b border-slate-800 text-[11px] font-mono text-slate-400 bg-defense-900/50">
                    <th className="p-2.5">District / State</th>
                    <th className="p-2.5">Lifeline Status</th>
                    <th className="p-2.5">Active Arterials</th>
                    <th className="p-2.5">Blocked Stretches</th>
                    <th className="p-2.5">Main Hospital Depot</th>
                    <th className="p-2.5 text-right">Medicine Stock</th>
                    <th className="p-2.5 text-right">Food Stock</th>
                    <th className="p-2.5 text-center">GIS Map</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                  {filteredDistricts.map((d, i) => (
                    <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-2.5 font-bold text-slate-200 font-sans">
                        <div>{d.name}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{d.state}</div>
                      </td>
                      <td className="p-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          d.status === 'ISOLATED_RISK' || d.status === 'CUT_OFF'
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse'
                            : d.status === 'DEGRADED'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        }`}>
                          {d.status}
                        </span>
                      </td>
                      <td className="p-2.5 text-slate-300">{d.active_lifelines} Active</td>
                      <td className="p-2.5 text-rose-400 font-bold">{d.blocked_roads > 0 ? `${d.blocked_roads} Blockage` : 'None'}</td>
                      <td className="p-2.5 text-slate-400 font-sans">{d.priority_depot}</td>
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
                      <td className="p-2.5 text-center">
                        <button
                          onClick={() => setActiveSubTab('activity')}
                          className="px-2 py-1 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-[10px] font-bold border border-cyan-500/40 transition flex items-center gap-1 mx-auto"
                        >
                          <MapPin className="w-3 h-3" /> Inspect
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Connectivity Gap Analysis (Single-Point Failure Diagnostics) */}
          <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="pb-2 border-b border-slate-800">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <AlertOctagon className="w-4 h-4 text-rose-400" />
                Single-Lifeline Vulnerability & Connectivity Gaps
              </h3>
              <p className="text-xs text-slate-400">
                Critical frontier districts where failure of a single bridge, tunnel, or gorge defile causes complete civil isolation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {(stateGaps.length > 0 ? stateGaps : ROADWORKS_AND_CONNECTIVITY.connectivity_gaps).map((gap, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-sm text-white">{gap.district_or_sector}</h4>
                      <div className="text-[10px] font-mono text-cyan-400">{gap.state}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                      {gap.vulnerability_rating}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-300 font-sans">
                    <div>
                      <span className="text-slate-500">Chokepoint Failure Risk:</span>{' '}
                      <b className="text-rose-300">{gap.isolated_if_chokepoint_fails}</b>
                    </div>
                    <div>
                      <span className="text-slate-500">Population at Risk:</span>{' '}
                      <span className="font-mono text-amber-300 font-bold">{gap.population_at_risk.toLocaleString('en-IN')} Citizens</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Primary Artery:</span>{' '}
                      <span className="font-mono text-slate-200">{gap.single_lifeline_artery}</span>
                    </div>
                    <div className="pt-1 border-t border-slate-800 text-[11px] flex justify-between items-center">
                      <div>
                        <span className="text-slate-500">Alternative Bypass:</span>{' '}
                        <span className="text-emerald-400 font-medium">{gap.alternative_bypass}</span>
                      </div>
                      <button
                        onClick={() => setActiveSubTab('activity')}
                        className="px-2 py-0.5 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-[10px] font-bold border border-cyan-500/30 transition flex items-center gap-1"
                      >
                        <MapPin className="w-3 h-3" /> Inspect on GIS
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. Sub-Tab 3: REGIONAL HAZARD & CLIMATE RADAR */}
      {activeSubTab === 'hazards' && (
        <div className="space-y-4">
          {/* Brahmaputra River Flood System */}
          <div className="glass-panel p-4 rounded-xl border border-blue-500/30 bg-gradient-to-r from-blue-950/40 via-slate-900 to-defense-950 space-y-3">
            <div className="flex justify-between items-start pb-2 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <Waves className="w-4 h-4 text-cyan-400" />
                  <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200">
                    Brahmaputra River Basin Flood Telemetry (Assam Arterials)
                  </h3>
                  <span className="px-2 py-0.2 rounded text-[10px] font-mono font-bold bg-blue-500/20 text-cyan-300 border border-blue-500/40">
                    HYDROLOGICAL FEED
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {REGIONAL_HAZARD_INTELLIGENCE.brahmaputra_flood_system.flood_impact_summary}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {REGIONAL_HAZARD_INTELLIGENCE.brahmaputra_flood_system.river_stations.map((stn, idx) => {
                const isOver = stn.current_level_m >= stn.danger_level_m;
                return (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-2">
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">{stn.river}</span>
                      <h4 className="font-bold text-xs text-white mt-0.5">{stn.station}</h4>
                      <div className="text-[10px] text-slate-400 mt-1">{stn.trend}</div>
                    </div>

                    <div className="font-mono text-xs p-2 rounded bg-slate-950 border border-slate-800 space-y-0.5">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Current:</span>
                        <b className={isOver ? 'text-rose-400' : 'text-emerald-400'}>{stn.current_level_m}m</b>
                      </div>
                      <div className="flex justify-between text-[10px]">
                        <span className="text-slate-500">Danger:</span>
                        <span className="text-slate-300">{stn.danger_level_m}m</span>
                      </div>
                      <div className="flex justify-between text-[10px]">
                        <span className="text-slate-500">Discharge:</span>
                        <span className="text-cyan-300">{stn.discharge_cumecs} m³/s</span>
                      </div>
                    </div>

                    <div className={`text-[10px] font-mono font-bold truncate ${
                      stn.ferry_transit_status.includes('SUSPENDED') ? 'text-rose-400' : 'text-emerald-400'
                    }`}>
                      {stn.ferry_transit_status.replace(/_/g, ' ')}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Transboundary Nepal Catchments & Sikkim Snow Hazard Zones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nepal Transboundary Flood Risks */}
            <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="pb-2 border-b border-slate-800 flex items-center gap-2">
                <CloudRain className="w-4 h-4 text-amber-400" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200">
                  Transboundary Nepal Catchment Flood Cascades
                </h3>
              </div>
              <div className="space-y-2.5">
                {REGIONAL_HAZARD_INTELLIGENCE.transboundary_nepal_catchments.map((risk) => (
                  <div key={risk.id} className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-bold text-white">{risk.basin}</span>
                        <div className="text-[10px] text-amber-400 font-mono">Origin: {risk.origin_country}</div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {risk.risk_level}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-sans">{risk.warning_narrative}</p>
                    <div className="text-[10px] text-slate-400 font-mono">
                      Vulnerable: {risk.vulnerable_districts.join(', ')} &bull; 24h Rain: <b>{risk.upstream_rain_24h_mm} mm</b>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sikkim High-Altitude Snow & Alpine Passes */}
            <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="pb-2 border-b border-slate-800 flex items-center gap-2">
                <Snowflake className="w-4 h-4 text-cyan-400" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200">
                  High-Altitude Alpine Passes & Critical Tunnels
                </h3>
              </div>
              <div className="space-y-2.5">
                {REGIONAL_HAZARD_INTELLIGENCE.sikkim_snow_and_ice_zones.map((pass, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-bold text-white">{pass.pass_name}</span>
                        <div className="text-[10px] text-slate-400 font-mono">{pass.state} &bull; Elev: {pass.elevation_m}m</div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-slate-800 text-cyan-300 border border-slate-700">
                        {pass.temperature_c}°C
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                      <div className="p-1.5 rounded bg-slate-950 border border-slate-800">
                        Snow Depth: <b className="text-cyan-300">{pass.snow_depth_cm} cm</b>
                      </div>
                      <div className="p-1.5 rounded bg-slate-950 border border-slate-800">
                        Snow Chains: <b className={pass.snow_chain_mandate ? 'text-amber-400' : 'text-slate-400'}>{pass.snow_chain_mandate ? 'MANDATORY' : 'NOT REQUIRED'}</b>
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-300 flex justify-between items-center pt-1 border-t border-slate-800">
                      <span>Bypass: <b className="text-white">{pass.tunnel_bypass_name}</b></span>
                      <span className="text-[10px] font-mono font-bold text-emerald-400">{pass.tunnel_status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Landslide Rainfall Panel */}
          <LandslideRainfallPanel weatherData={weatherData} />
        </div>
      )}

      {/* 6. Sub-Tab 4: BRO ROADWORKS & MACHINERY */}
      {activeSubTab === 'roadworks' && (
        <div className="space-y-4">
          {/* Ongoing Roadworks Table */}
          <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="pb-2 border-b border-slate-800">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-orange-400" />
                Active Highway Construction, Widening & Slope Netting Projects
              </h3>
              <p className="text-xs text-slate-400">
                On-ground infrastructure execution updates from Border Roads Organisation and NHIDCL.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b border-slate-800 text-[11px] font-mono text-slate-400 bg-defense-900/50">
                    <th className="p-2.5">Corridor / Stretch</th>
                    <th className="p-2.5">Agency</th>
                    <th className="p-2.5">Work Type</th>
                    <th className="p-2.5">Traffic Impact</th>
                    <th className="p-2.5">Lane Status</th>
                    <th className="p-2.5 text-right">Progress</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                  {ROADWORKS_AND_CONNECTIVITY.ongoing_roadworks.map((rw) => (
                    <tr key={rw.id} className="hover:bg-slate-800/40">
                      <td className="p-2.5 font-bold text-white font-sans">
                        <div>{rw.stretch}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{rw.corridor}</div>
                      </td>
                      <td className="p-2.5 text-cyan-400 font-sans">{rw.agency}</td>
                      <td className="p-2.5 text-slate-300 font-sans">{rw.work_type}</td>
                      <td className="p-2.5 text-slate-400 font-sans">{rw.traffic_impact}</td>
                      <td className="p-2.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          {rw.lane_status}
                        </span>
                      </td>
                      <td className="p-2.5 text-right font-bold text-emerald-400">
                        {rw.progress_pct}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Seasonal Closures Table */}
          <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="pb-2 border-b border-slate-800">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                Seasonal Road Closures & Night Restrictions
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {ROADWORKS_AND_CONNECTIVITY.seasonal_closures.map((sc, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-white">{sc.corridor}</span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-red-500/20 text-red-300 border border-red-500/30">
                      {sc.closure_type}
                    </span>
                  </div>
                  <div className="text-[11px] text-cyan-300 font-mono font-semibold">{sc.stretch}</div>
                  <div className="text-[11px] text-slate-300 font-sans">
                    <b>Hours:</b> {sc.hours}
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans">{sc.reason}</p>
                  <div className="pt-2 border-t border-slate-800 text-[10px] text-emerald-400 font-sans">
                    <b>Exceptions:</b> {sc.authorized_exceptions}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BRO Machinery Units Deployment Grid */}
          <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-amber-400" />
                Border Roads Organisation (BRO) Heavy Equipment & Plant Detachments
              </h3>
              <span className="text-[10px] font-mono text-slate-400">
                Projects: Vartak &bull; Sewak &bull; Swastik &bull; Pushpak
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
      )}

      {/* 7. Sub-Tab 5: EXECUTIVE AI INTELLIGENCE BRIEFING */}
      {activeSubTab === 'briefing' && (
        <div className="space-y-4">
          <div className="glass-panel p-5 rounded-xl border border-purple-500/40 bg-gradient-to-r from-purple-950/40 via-slate-900 to-defense-950 shadow-2xl space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">
                    Automated Executive Intelligence Briefing (Clause g)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Grounded AI analysis synthesizing satellite radar, telemetry, and geotechnical sensors.
                  </p>
                </div>
              </div>

              {/* Language Switcher */}
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                {[
                  { key: 'english', label: 'English' },
                  { key: 'hindi', label: 'हिंदी' },
                  { key: 'assamese', label: 'অসমীয়া' },
                  { key: 'bengali', label: 'বাংলা' }
                ].map((l) => (
                  <button
                    key={l.key}
                    onClick={() => setBriefLang(l.key)}
                    className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                      briefLang === l.key 
                        ? 'bg-purple-600 text-white shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Brief Narrative */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-sm leading-relaxed text-slate-200 font-sans">
              {briefLang === 'english' && (
                <p>
                  {executiveBrief?.english ||
                    "Strategic Lifeline NH-13 is operating under degraded conditions due to heavy monsoonal rain between Tippi and Sessa. A high-risk scree slide is active at km 78. Heavy medical cargo must be routed via the BRO Kalaktang Bypass to prevent catastrophic choke-up. Brahmaputra water discharge at Guwahati is rising (+0.08m/6h) but remaining below bridge piers. High altitude snow chains are mandated above Jaswant Garh."}
                </p>
              )}
              {briefLang === 'hindi' && (
                <p>
                  {executiveBrief?.hindi ||
                    "रणनीतिक जीवनरेखा NH-13 पर टिप्पी और सेस्सा के बीच भारी मानसूनी वर्षा के कारण मार्ग सीमित है। किमी 78 पर सक्रिय भूस्खलन दर्ज किया गया है। आपातकालीन चिकित्सा आपूर्ति को बीआरओ कालाकतांग बाईपास के माध्यम से भेजने का निर्देश दिया जाता है। गुवाहाटी में ब्रह्मपुत्र का जलस्तर बढ़ रहा है। सेला पास मार्ग पर स्नो-चेन अनिवार्य है।"}
                </p>
              )}
              {briefLang === 'assamese' && (
                <p>
                  {executiveBrief?.assamese ||
                    "কৌশলগত ৰাষ্ট্ৰীয় ঘাইপথ NH-13ত প্ৰবল বৰষুণৰ বাবে যাতায়াত সীমিত হৈ পৰিছে। টিপ্পী আৰু চেচ্ছাৰ মাজত ভূমিস্খলনৰ সম্ভাৱনা আছে। গুৱাহাটীৰ ব্ৰহ্মপুত্ৰৰ জলপৃষ্ঠ বিপদসীমাৰ ওচৰ চাপিছে। জৰুৰীকালীন যোগান কালাকতাং বাইপাচেৰে প্ৰেৰণ কৰাৰ পৰামৰ্শ দিয়া হৈছে।"}
                </p>
              )}
              {briefLang === 'bengali' && (
                <p>
                  {executiveBrief?.bengali ||
                    "কৌশলগত মহাসড়ক NH-13 এ ভারী বৃষ্টির কারণে চলাচল সীমিত। সেসার কাছে ভূমিধসের সতর্কতা জারি করা হয়েছে। জরুরি ত্রাণ সরবরাহ কালাকটাং বাইপাস দিয়ে পাঠানোর পরামর্শ দেওয়া হচ্ছে। ব্রহ্মপুত্র নদের জলস্তর বৃদ্ধি পাচ্ছে।"}
                </p>
              )}
            </div>

            {/* Key Strategic Directives */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-sans">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="font-bold text-amber-400">1. Active Traffic Throttling:</span>
                <p className="text-slate-300 mt-1">Single-lane alternating convoy between km 48 and 78. Limit throughput to 15 vehicles/hour.</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="font-bold text-cyan-400">2. Pre-position Heavy Machinery:</span>
                <p className="text-slate-300 mt-1">Ensure Project Vartak Dozer Unit 03 remains stationed at Sessa hairpin for instant clearing.</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="font-bold text-emerald-400">3. Cold-Chain Monitoring:</span>
                <p className="text-slate-300 mt-1">Verify cryogenic vaccine carrier temperatures every 30 minutes via satellite telematics.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. DRIVER & VEHICLE DETAILED MANIFEST INSPECTION MODAL / DRAWER           */}
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
                      COMMAND MANIFEST: {activeManifestConvoy.id || activeManifestConvoy.vehicle_id}
                    </h3>
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      {activeManifestConvoy.vehicle_reg || 'AS-01-EC-9042'}
                    </span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      SEAL INTACT
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-sans mt-0.5">
                    Verified Driver & Vehicle Manifest &bull; Ministry of DoNER Strategic Lifeline
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedConvoyForManifest(null)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-xs transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-4 font-sans text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left Card: Driver Profile */}
                <div className="p-4 rounded-xl bg-defense-950 border border-slate-800 space-y-3">
                  <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    CERTIFIED MOUNTAIN PILOT PROFILE
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-bold text-base">
                      {matchedDriver?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'RT'}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white">{matchedDriver?.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">ID: {matchedDriver?.id}</div>
                      <div className="text-[10px] text-emerald-400 font-mono">Blood Group: {matchedDriver?.blood_group}</div>
                    </div>
                  </div>
                  <div className="space-y-1 text-slate-300 font-mono text-[11px] pt-2 border-t border-slate-800">
                    <div>License: <b>{matchedDriver?.license_no}</b></div>
                    <div>Experience: <b>{matchedDriver?.experience_years} years mountain transit</b></div>
                    <div>Emergency: <b className="text-cyan-300">{matchedDriver?.emergency_contact}</b></div>
                    <div>Duty Today: <b>{matchedDriver?.duty_hours_today} / {matchedDriver?.max_duty_hours} hrs</b></div>
                  </div>
                </div>

                {/* Right Card: Vehicle & Telematics */}
                <div className="p-4 rounded-xl bg-defense-950 border border-slate-800 space-y-3">
                  <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5" />
                    VEHICLE TELEMATICS & CARGO SUMMARY
                  </span>
                  <div>
                    <div className="font-bold text-sm text-white">
                      {activeManifestConvoy.vehicle_model || matchedDriver?.vehicle_model || 'Tata 1618 SE 4x4 Mountain Carrier'}
                    </div>
                    <div className="text-[11px] text-amber-400 font-mono mt-0.5">
                      Registration: {activeManifestConvoy.vehicle_reg || matchedDriver?.vehicle_reg || 'AS-01-EC-9042'}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px]">
                    <span className="text-slate-400">Cargo Manifest:</span>
                    <div className="font-bold text-slate-100 mt-0.5">
                      {activeManifestConvoy.cargo || '10,000 Doses Anti-Rabies & Snake Venom + Cryogenic Oxygen Cylinders'}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 font-mono text-[11px] text-slate-300">
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      Speed: <b className="text-cyan-400">{activeManifestConvoy.speed_kmh || 38} km/h</b>
                    </div>
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      Progress: <b className="text-emerald-400">{activeManifestConvoy.progress_pct || 65}%</b>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons in Modal */}
              <div className="pt-2 border-t border-slate-800 flex flex-wrap justify-between items-center gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setVoipCallActive(true)}
                    className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-cyan-950"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Direct SAT-Link Voice Call</span>
                  </button>

                  <button
                    onClick={() => {
                      setAdvisorySent(true);
                      setTimeout(() => setAdvisorySent(false), 4000);
                    }}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center gap-1.5 transition-all cursor-pointer border border-slate-700"
                  >
                    <Send className="w-3.5 h-3.5 text-amber-400" />
                    <span>Broadcast Weather Warning to HUD</span>
                  </button>
                </div>

                <button
                  onClick={() => setSelectedConvoyForManifest(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold cursor-pointer"
                >
                  Close Manifest
                </button>
              </div>

              {/* Advisory Feedback Notice */}
              {advisorySent && (
                <div className="p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-fadeIn">
                  <Check className="w-4 h-4" />
                  <span>Encrypted sat-telemetry alert pushed to driver HUD: Sela Pass blizzard advisory received.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* VOIP SAT-Link Active Call Simulator Modal */}
      {voipCallActive && (
        <div className="fixed inset-0 z-[2500] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="glass-panel w-full max-w-sm rounded-2xl border border-cyan-500 p-6 shadow-2xl bg-slate-900 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center mx-auto text-cyan-400 animate-pulse">
              <PhoneCall className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest">
                SAT-LINK SECURE VOIP CALL ACTIVE
              </span>
              <h4 className="text-base font-bold text-white mt-1">
                {matchedDriver?.name || 'Subedar R. Thapa'}
              </h4>
              <p className="text-xs text-slate-400 font-mono">
                {activeManifestConvoy?.vehicle_reg || 'AS-01-EC-9042'} &bull; Sela Tunnel Sector
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono">
              Encryption: <b>AES-256 SAT-COM</b><br />
              Latency: <b>142 ms</b> &bull; Signal: <b className="text-emerald-400">98% SAT-LOCK</b>
            </div>

            <button
              onClick={() => setVoipCallActive(false)}
              className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg transition-all cursor-pointer"
            >
              End Call
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
