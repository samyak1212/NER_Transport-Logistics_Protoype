/**
 * Geospatial Inter-District Connectivity Routes & Traffic Telemetry for North East India.
 * Covers all 8 North Eastern States: Assam, Arunachal Pradesh, Manipur, Meghalaya, Mizoram, Nagaland, Tripura, Sikkim.
 * Supports Google Maps-style traffic classification:
 * - SMOOTH (#22c55e / Green): Free flow, speed >= 45 km/h
 * - MODERATE (#eab308 / Yellow): Light slowdown/rain, speed 30-44 km/h
 * - CONGESTED (#f97316 / Orange): Single-lane/heavy freight/chokepoint, speed 15-29 km/h
 * - BLOCKED (#ef4444 / Red): Active landslide/flood breach/severed, speed < 15 km/h
 */

export const NORTH_EAST_STATES = [
  { id: 'Assam', name: 'Assam', code: 'AS', capital: 'Dispur / Guwahati', flagColor: 'text-amber-400' },
  { id: 'Arunachal Pradesh', name: 'Arunachal Pradesh', code: 'AR', capital: 'Itanagar', flagColor: 'text-cyan-400' },
  { id: 'Manipur', name: 'Manipur', code: 'MN', capital: 'Imphal', flagColor: 'text-emerald-400' },
  { id: 'Meghalaya', name: 'Meghalaya', code: 'ML', capital: 'Shillong', flagColor: 'text-blue-400' },
  { id: 'Mizoram', name: 'Mizoram', code: 'MZ', capital: 'Aizawl', flagColor: 'text-rose-400' },
  { id: 'Nagaland', name: 'Nagaland', code: 'NL', capital: 'Kohima', flagColor: 'text-purple-400' },
  { id: 'Tripura', name: 'Tripura', code: 'TR', capital: 'Agartala', flagColor: 'text-teal-400' },
  { id: 'Sikkim', name: 'Sikkim', code: 'SK', capital: 'Gangtok', flagColor: 'text-indigo-400' },
];

export const DISTRICT_CENTROIDS = {
  // --- ASSAM ---
  "Kamrup Metro": { name: "Kamrup Metro", state: "Assam", coords: [26.1445, 91.7362], hq: "Guwahati Central Hub", isHub: true },
  "Sonitpur": { name: "Sonitpur", state: "Assam", coords: [26.6528, 92.7926], hq: "Tezpur Military Base", isHub: true },
  "Darrang": { name: "Darrang", state: "Assam", coords: [26.4385, 92.0354], hq: "Mangaldai Staging Point" },
  "Dhemaji": { name: "Dhemaji", state: "Assam", coords: [27.4812, 94.5784], hq: "Dhemaji Flood Depot" },
  "Majuli": { name: "Majuli", state: "Assam", coords: [26.9634, 94.2156], hq: "Kamalabari River Island" },
  "Cachar": { name: "Cachar", state: "Assam", coords: [24.8333, 92.7789], hq: "Silchar Southern Gateway", isHub: true },
  "Dima Hasao": { name: "Dima Hasao", state: "Assam", coords: [25.1783, 93.0234], hq: "Haflong Hill Station" },
  "Dibrugarh": { name: "Dibrugarh", state: "Assam", coords: [27.4728, 94.9120], hq: "Dibrugarh Rail & River Depot", isHub: true },

  // --- ARUNACHAL PRADESH ---
  "West Kameng": { name: "West Kameng", state: "Arunachal Pradesh", coords: [27.2645, 92.4215], hq: "Bomdila Civil Hospital", isHub: true },
  "Tawang": { name: "Tawang", state: "Arunachal Pradesh", coords: [27.5861, 91.8594], hq: "Tawang Frontier Sector", isHub: true },
  "Papum Pare": { name: "Papum Pare", state: "Arunachal Pradesh", coords: [27.0844, 93.6053], hq: "Itanagar Capital Hub", isHub: true },
  "Lower Dibang Valley": { name: "Lower Dibang Valley", state: "Arunachal Pradesh", coords: [28.1456, 95.8423], hq: "Roing Foothills Depot" },
  "Anjaw": { name: "Anjaw", state: "Arunachal Pradesh", coords: [27.8924, 96.5312], hq: "Hawai LAC Border Outpost" },

  // --- NAGALAND ---
  "Dimapur": { name: "Dimapur", state: "Nagaland", coords: [25.9068, 93.7275], hq: "Dimapur Railhead Depot", isHub: true },
  "Kohima": { name: "Kohima", state: "Nagaland", coords: [25.6751, 94.1086], hq: "Kohima Capital Depot", isHub: true },

  // --- MANIPUR ---
  "Senapati": { name: "Senapati", state: "Manipur", coords: [25.2678, 94.0156], hq: "Senapati Mountain Depot" },
  "Imphal West": { name: "Imphal West", state: "Manipur", coords: [24.8170, 93.9368], hq: "Imphal Regional Depot", isHub: true },
  "Churachandpur": { name: "Churachandpur", state: "Manipur", coords: [24.3312, 93.6745], hq: "Churachandpur Southern Depot" },

  // --- MEGHALAYA ---
  "East Khasi Hills": { name: "East Khasi Hills", state: "Meghalaya", coords: [25.5788, 91.8933], hq: "Shillong Plateau Hub", isHub: true },
  "Ri-Bhoi": { name: "Ri-Bhoi", state: "Meghalaya", coords: [25.9012, 91.8823], hq: "Nongpoh Transit Base" },
  "East Jaintia Hills": { name: "East Jaintia Hills", state: "Meghalaya", coords: [25.3214, 92.3654], hq: "Khliehriat Supply Base" },

  // --- MIZORAM ---
  "Kolasib": { name: "Kolasib", state: "Mizoram", coords: [24.2234, 92.6789], hq: "Kolasib Border Gateway" },
  "Aizawl": { name: "Aizawl", state: "Mizoram", coords: [23.7307, 92.7173], hq: "Aizawl Capital Logistics Base", isHub: true },
  "Lunglei": { name: "Lunglei", state: "Mizoram", coords: [22.8834, 92.7356], hq: "Lunglei Southern Depot" },

  // --- TRIPURA ---
  "North Tripura": { name: "North Tripura", state: "Tripura", coords: [24.3756, 92.1645], hq: "Dharmanagar Railhead Entry" },
  "West Tripura": { name: "West Tripura", state: "Tripura", coords: [23.8315, 91.2868], hq: "Agartala Border Trade Hub", isHub: true },

  // --- SIKKIM & GATEWAY ---
  "East Sikkim": { name: "East Sikkim", state: "Sikkim", coords: [27.3389, 88.6065], hq: "Gangtok STNM Hospital Store", isHub: true },
  "North Sikkim": { name: "North Sikkim", state: "Sikkim", coords: [27.5089, 88.5312], hq: "Mangan High-Altitude Base" },
  "West Sikkim": { name: "West Sikkim", state: "Sikkim", coords: [27.2845, 88.2456], hq: "Gyalshing Mountain Outpost" },
  "Siliguri Gateway": { name: "Siliguri Gateway", state: "West Bengal / Gateway", coords: [26.7271, 88.3953], hq: "Siliguri Junction Railhead", isHub: true }
};

export const DISTRICT_CONNECTIVITY_ROUTES = [
  // =========================================================================
  // 1. INTRA-ASSAM & INTER-STATE ROUTES INVOLVING ASSAM
  // =========================================================================
  {
    id: "ROUTE_AS_GHY_TEZ",
    name: "Guwahati - Tezpur North Bank Arterial",
    fromDistrict: "Kamrup Metro",
    toDistrict: "Sonitpur",
    fromState: "Assam",
    toState: "Assam",
    highway: "NH-15 / NH-27",
    distance_km: 185.0,
    travel_time_hrs: 3.2,
    traffic_status: "SMOOTH",
    traffic_color: "#22c55e",
    traffic_speed_kmh: 58.0,
    normal_speed_kmh: 65.0,
    delay_mins: 8,
    condition: "4-Lane Bituminous Pavement • Minimal Monsoonal Wear",
    active_chokepoints: "Kalia Bhomora River Bridge Approach (Mild Traffic)",
    alternative_bypass: "via Mangaldai - Kharupetia - Dhekiajuli Bypass",
    bridge_or_tunnel: "Kalia Bhomora 2nd Brahmaputra Bridge",
    coordinates: [
      [26.1445, 91.7362],
      [26.2341, 91.6888],
      [26.4385, 92.0354],
      [26.5124, 92.1456],
      [26.5891, 92.4215],
      [26.6528, 92.7926]
    ]
  },
  {
    id: "ROUTE_AS_GHY_DRG",
    name: "Guwahati - Mangaldai Agro Lifeline",
    fromDistrict: "Kamrup Metro",
    toDistrict: "Darrang",
    fromState: "Assam",
    toState: "Assam",
    highway: "NH-15",
    distance_km: 68.0,
    travel_time_hrs: 1.4,
    traffic_status: "SMOOTH",
    traffic_color: "#22c55e",
    traffic_speed_kmh: 50.0,
    normal_speed_kmh: 55.0,
    delay_mins: 4,
    condition: "Good 2-Lane Highway • Normal Traffic Flow",
    active_chokepoints: "Saraighat Brahmaputra crossing lane control",
    alternative_bypass: "via New Saraighat Rail-Road Bridge",
    bridge_or_tunnel: "Saraighat Bridge",
    coordinates: [
      [26.1445, 91.7362],
      [26.1856, 91.7185],
      [26.2712, 91.7045],
      [26.3456, 91.8423],
      [26.4385, 92.0354]
    ]
  },
  {
    id: "ROUTE_AS_TEZ_DHM",
    name: "Tezpur - Dhemaji Upper Brahmaputra Lifeline",
    fromDistrict: "Sonitpur",
    toDistrict: "Dhemaji",
    fromState: "Assam",
    toState: "Assam",
    highway: "NH-15",
    distance_km: 232.0,
    travel_time_hrs: 4.8,
    traffic_status: "MODERATE",
    traffic_color: "#eab308",
    traffic_speed_kmh: 42.0,
    normal_speed_kmh: 55.0,
    delay_mins: 22,
    condition: "Waterlogged shoulders near Gohpur • Reduced Night Speeds",
    active_chokepoints: "Subansiri River seasonal bridge wash risk",
    alternative_bypass: "via Biswanath Chariali inland diversion",
    bridge_or_tunnel: "Subansiri Pontoon / Concrete Culvert Axis",
    coordinates: [
      [26.6528, 92.7926],
      [26.7345, 93.1245],
      [26.8812, 93.6345],
      [27.0543, 94.0234],
      [27.2412, 94.3123],
      [27.4812, 94.5784]
    ]
  },
  {
    id: "ROUTE_AS_GHY_SIL",
    name: "Guwahati - Silchar Trans-Meghalaya Lifeline",
    fromDistrict: "Kamrup Metro",
    toDistrict: "Cachar",
    fromState: "Assam",
    toState: "Assam",
    highway: "NH-6 / NH-27",
    distance_km: 308.0,
    travel_time_hrs: 8.5,
    traffic_status: "CONGESTED",
    traffic_color: "#f97316",
    traffic_speed_kmh: 26.0,
    normal_speed_kmh: 45.0,
    delay_mins: 75,
    condition: "Heavy Coal & Fuel Tankers • Fog and Mud in Jaintia Hills",
    active_chokepoints: "Sonapur Mudflow Tunnel & Khliehriat crawl",
    alternative_bypass: "via Lumding - Haflong NH-27 East-West Corridor",
    bridge_or_tunnel: "Sonapur Mudflow Tunnel (Meghalaya border)",
    coordinates: [
      [26.1445, 91.7362],
      [25.9012, 91.8823],
      [25.5788, 91.8933],
      [25.4123, 92.1456],
      [25.3214, 92.3654],
      [25.0456, 92.5123],
      [24.8333, 92.7789]
    ]
  },
  {
    id: "ROUTE_AS_SIL_DMH",
    name: "Silchar - Haflong Barail Hill Connector",
    fromDistrict: "Cachar",
    toDistrict: "Dima Hasao",
    fromState: "Assam",
    toState: "Assam",
    highway: "NH-27",
    distance_km: 104.0,
    travel_time_hrs: 3.1,
    traffic_status: "MODERATE",
    traffic_color: "#eab308",
    traffic_speed_kmh: 34.0,
    normal_speed_kmh: 45.0,
    delay_mins: 18,
    condition: "Barail Range Sinking Zone • Landslip clearance active",
    active_chokepoints: "Jatinga Landslide Bend & Mahur defile",
    alternative_bypass: "via Harangajao hill track (light vehicles only)",
    bridge_or_tunnel: "Barail Tunnel 1",
    coordinates: [
      [24.8333, 92.7789],
      [24.9654, 92.8423],
      [25.0845, 92.9345],
      [25.1783, 93.0234]
    ]
  },
  {
    id: "ROUTE_AS_GHY_DIB",
    name: "Guwahati - Dibrugarh South Bank Freight Artery",
    fromDistrict: "Kamrup Metro",
    toDistrict: "Dibrugarh",
    fromState: "Assam",
    toState: "Assam",
    highway: "NH-715 / NH-2",
    distance_km: 435.0,
    travel_time_hrs: 7.8,
    traffic_status: "SMOOTH",
    traffic_color: "#22c55e",
    traffic_speed_kmh: 56.0,
    normal_speed_kmh: 60.0,
    delay_mins: 15,
    condition: "Kaziranga Corridor 40 km/h Wildlife restriction active",
    active_chokepoints: "Kaziranga animal crossings (speed monitored)",
    alternative_bypass: "via Tezpur - Biswanath - North Bank NH-15",
    bridge_or_tunnel: "Bogibeel Rail-Road Bridge Axis",
    coordinates: [
      [26.1445, 91.7362],
      [26.1956, 92.3123],
      [26.3124, 92.8945],
      [26.5891, 93.4123],
      [26.7456, 94.2123],
      [27.0234, 94.6123],
      [27.4728, 94.9120]
    ]
  },

  // =========================================================================
  // 2. INTER-STATE: ASSAM <-> ARUNACHAL PRADESH
  // =========================================================================
  {
    id: "ROUTE_INT_TEZ_WKM",
    name: "Tezpur (AS) - Bomdila (AR) Western Strategic Lifeline",
    fromDistrict: "Sonitpur",
    toDistrict: "West Kameng",
    fromState: "Assam",
    toState: "Arunachal Pradesh",
    highway: "NH-13 (Bhalukpong Corridor)",
    distance_km: 158.0,
    travel_time_hrs: 4.5,
    traffic_status: "BLOCKED",
    traffic_color: "#ef4444",
    traffic_speed_kmh: 12.0,
    normal_speed_kmh: 40.0,
    delay_mins: 95,
    condition: "CRITICAL: Active scree slip at Sessa km 78 • BRO Dozer on scene",
    active_chokepoints: "Sessa hairpin chokepoint (km 78)",
    alternative_bypass: "via BRO Kalaktang Military Bypass (NH-13 Alt)",
    bridge_or_tunnel: "Bhalukpong Kameng River Gateway",
    coordinates: [
      [26.6528, 92.7926],
      [26.8211, 92.8124],
      [27.0125, 92.6514],
      [27.0421, 92.6105],
      [27.0984, 92.5342],
      [27.1623, 92.4789],
      [27.2645, 92.4215]
    ]
  },
  {
    id: "ROUTE_INT_GHY_ITN",
    name: "Guwahati (AS) - Itanagar (AR) Foothill Highway",
    fromDistrict: "Kamrup Metro",
    toDistrict: "Papum Pare",
    fromState: "Assam",
    toState: "Arunachal Pradesh",
    highway: "NH-15 / NH-415",
    distance_km: 325.0,
    travel_time_hrs: 6.2,
    traffic_status: "MODERATE",
    traffic_color: "#eab308",
    traffic_speed_kmh: 44.0,
    normal_speed_kmh: 55.0,
    delay_mins: 20,
    condition: "Bandardewa Checkpost security checks • Good 4-lane surface",
    active_chokepoints: "Bandardewa Border Checkpost",
    alternative_bypass: "via Gohpur - Banderdewa alternative road",
    bridge_or_tunnel: "Dikrong River Bridge",
    coordinates: [
      [26.1445, 91.7362],
      [26.4385, 92.0354],
      [26.6528, 92.7926],
      [26.8812, 93.6345],
      [27.0234, 93.7123],
      [27.0844, 93.6053]
    ]
  },
  {
    id: "ROUTE_INT_DIB_LDV",
    name: "Dibrugarh (AS) - Roing (AR) Eastern Transshipment",
    fromDistrict: "Dibrugarh",
    toDistrict: "Lower Dibang Valley",
    fromState: "Assam",
    toState: "Arunachal Pradesh",
    highway: "NH-115 / Dhola-Sadiya Bridge",
    distance_km: 148.0,
    travel_time_hrs: 3.2,
    traffic_status: "SMOOTH",
    traffic_color: "#22c55e",
    traffic_speed_kmh: 52.0,
    normal_speed_kmh: 60.0,
    delay_mins: 5,
    condition: "Bhupen Hazarika Setu fully clear • Smooth riverine transit",
    active_chokepoints: "Shantipur Checkpost",
    alternative_bypass: "via Alubari Ghat Ferry (Standby)",
    bridge_or_tunnel: "Bhupen Hazarika Setu (9.15 km)",
    coordinates: [
      [27.4728, 94.9120],
      [27.6123, 95.3456],
      [27.7845, 95.6789],
      [27.9567, 95.7423],
      [28.1456, 95.8423]
    ]
  },

  // =========================================================================
  // 3. INTRA-ARUNACHAL PRADESH ROUTES
  // =========================================================================
  {
    id: "ROUTE_AR_WKM_TAW",
    name: "Bomdila - Tawang High-Altitude Frontier Lifeline",
    fromDistrict: "West Kameng",
    toDistrict: "Tawang",
    fromState: "Arunachal Pradesh",
    toState: "Arunachal Pradesh",
    highway: "NH-13 (Trans-Himalayan)",
    distance_km: 172.0,
    travel_time_hrs: 5.1,
    traffic_status: "CONGESTED",
    traffic_color: "#f97316",
    traffic_speed_kmh: 24.0,
    normal_speed_kmh: 35.0,
    delay_mins: 45,
    condition: "Snow Chains Mandated above Jaswant Garh • Sub-zero slush",
    active_chokepoints: "Sela Pass North slope avalanche chutes",
    alternative_bypass: "Sela Bi-Directional All-Weather Tunnel (Open)",
    bridge_or_tunnel: "Sela Tunnel (Twin Tubes: 1.5km & 1.0km)",
    coordinates: [
      [27.2645, 92.4215],
      [27.3582, 92.2384],
      [27.4612, 92.1123],
      [27.5054, 92.0543],
      [27.5345, 91.9567],
      [27.5861, 91.8594]
    ]
  },
  {
    id: "ROUTE_AR_LDV_ANJ",
    name: "Roing - Hawai Eastern Frontier Lifeline",
    fromDistrict: "Lower Dibang Valley",
    toDistrict: "Anjaw",
    fromState: "Arunachal Pradesh",
    toState: "Arunachal Pradesh",
    highway: "NH-13 / Tezu-Hayuliang Artery",
    distance_km: 218.0,
    travel_time_hrs: 6.8,
    traffic_status: "MODERATE",
    traffic_color: "#eab308",
    traffic_speed_kmh: 32.0,
    normal_speed_kmh: 40.0,
    delay_mins: 35,
    condition: "Lohit River gorge cliff-cuts • Single lane alternating in slips",
    active_chokepoints: "Hayuliang slide zone (km 92)",
    alternative_bypass: "via Chaglagam military track",
    bridge_or_tunnel: "Alubari Lohit River Bridge",
    coordinates: [
      [28.1456, 95.8423],
      [27.9123, 96.1234],
      [27.9456, 96.3456],
      [27.8924, 96.5312]
    ]
  },

  // =========================================================================
  // 4. NAGALAND & MANIPUR ARTERIAL LIFELINES
  // =========================================================================
  {
    id: "ROUTE_INT_GHY_DMP",
    name: "Guwahati (AS) - Dimapur (NL) Railhead Highway",
    fromDistrict: "Kamrup Metro",
    toDistrict: "Dimapur",
    fromState: "Assam",
    toState: "Nagaland",
    highway: "NH-27 / NH-29",
    distance_km: 278.0,
    travel_time_hrs: 5.2,
    traffic_status: "SMOOTH",
    traffic_color: "#22c55e",
    traffic_speed_kmh: 54.0,
    normal_speed_kmh: 60.0,
    delay_mins: 10,
    condition: "Dababka to Doboka 4-lane stretch • Clear freight transit",
    active_chokepoints: "Khatkhati Border Checkpost",
    alternative_bypass: "via Golaghat - Bokajan rural connection",
    bridge_or_tunnel: "Dhansiri River Bridge",
    coordinates: [
      [26.1445, 91.7362],
      [26.1956, 92.3123],
      [26.0456, 92.9345],
      [25.9812, 93.4123],
      [25.9068, 93.7275]
    ]
  },
  {
    id: "ROUTE_NL_DMP_KOH",
    name: "Dimapur - Kohima Mountain Spine Lifeline",
    fromDistrict: "Dimapur",
    toDistrict: "Kohima",
    fromState: "Nagaland",
    toState: "Nagaland",
    highway: "NH-29",
    distance_km: 74.0,
    travel_time_hrs: 2.5,
    traffic_status: "CONGESTED",
    traffic_color: "#f97316",
    traffic_speed_kmh: 28.0,
    normal_speed_kmh: 40.0,
    delay_mins: 30,
    condition: "Paglapahar gorge rockfall caution • Debris clearing on slow lane",
    active_chokepoints: "Paglapahar Gorge & Chumukedima Hairpin",
    alternative_bypass: "via Niuland - Kohima Peducha Bypass",
    bridge_or_tunnel: "Chathe River Bridge",
    coordinates: [
      [25.9068, 93.7275],
      [25.8200, 93.7740],
      [25.7512, 93.8945],
      [25.6751, 94.1086]
    ]
  },
  {
    id: "ROUTE_INT_KOH_IMP",
    name: "Kohima (NL) - Imphal West (MN) Asian Highway 1",
    fromDistrict: "Kohima",
    toDistrict: "Imphal West",
    fromState: "Nagaland",
    toState: "Manipur",
    highway: "NH-2 / Asian Highway 1",
    distance_km: 138.0,
    travel_time_hrs: 4.2,
    traffic_status: "CONGESTED",
    traffic_color: "#f97316",
    traffic_speed_kmh: 30.0,
    normal_speed_kmh: 45.0,
    delay_mins: 40,
    condition: "Mao Border checkpost queues • Periodic valley mudflats",
    active_chokepoints: "Mao Gate Checkpost & Senapati Bridge",
    alternative_bypass: "via Tadubi - Ukhrul mountain detour",
    bridge_or_tunnel: "Barak River Upper Tributary Bridge",
    coordinates: [
      [25.6751, 94.1086],
      [25.5123, 94.1245],
      [25.2678, 94.0156],
      [25.0456, 93.9845],
      [24.8170, 93.9368]
    ]
  },
  {
    id: "ROUTE_MN_IMP_CCPUR",
    name: "Imphal West - Churachandpur Southern Artery",
    fromDistrict: "Imphal West",
    toDistrict: "Churachandpur",
    fromState: "Manipur",
    toState: "Manipur",
    highway: "NH-2",
    distance_km: 62.0,
    travel_time_hrs: 1.5,
    traffic_status: "SMOOTH",
    traffic_color: "#22c55e",
    traffic_speed_kmh: 46.0,
    normal_speed_kmh: 50.0,
    delay_mins: 5,
    condition: "Plain terrain valley highway • Clear medical corridor",
    active_chokepoints: "Bishnupur bottleneck",
    alternative_bypass: "via Moirang lakeside route",
    bridge_or_tunnel: "Nambul River Culverts",
    coordinates: [
      [24.8170, 93.9368],
      [24.6345, 93.8123],
      [24.4812, 93.7456],
      [24.3312, 93.6745]
    ]
  },

  // =========================================================================
  // 5. MEGHALAYA, TRIPURA & MIZORAM LIFELINES
  // =========================================================================
  {
    id: "ROUTE_INT_GHY_SHL",
    name: "Guwahati (AS) - Shillong (ML) Expressway",
    fromDistrict: "Kamrup Metro",
    toDistrict: "East Khasi Hills",
    fromState: "Assam",
    toState: "Meghalaya",
    highway: "NH-6 4-Lane Hill Highway",
    distance_km: 98.0,
    travel_time_hrs: 2.2,
    traffic_status: "SMOOTH",
    traffic_color: "#22c55e",
    traffic_speed_kmh: 52.0,
    normal_speed_kmh: 60.0,
    delay_mins: 6,
    condition: "Modern engineered 4-lane expressway with crash barriers",
    active_chokepoints: "Byrnihat Commercial Tax Checkpost",
    alternative_bypass: "via Khanapara - Umsning Old Highway",
    bridge_or_tunnel: "Umiam Lake Viaduct",
    coordinates: [
      [26.1445, 91.7362],
      [25.9012, 91.8823],
      [25.7512, 91.8945],
      [25.6412, 91.9123],
      [25.5788, 91.8933]
    ]
  },
  {
    id: "ROUTE_ML_SHL_EJH",
    name: "Shillong - Khliehriat Coal & Freight Artery",
    fromDistrict: "East Khasi Hills",
    toDistrict: "East Jaintia Hills",
    fromState: "Meghalaya",
    toState: "Meghalaya",
    highway: "NH-6",
    distance_km: 92.0,
    travel_time_hrs: 2.8,
    traffic_status: "MODERATE",
    traffic_color: "#eab308",
    traffic_speed_kmh: 36.0,
    normal_speed_kmh: 45.0,
    delay_mins: 15,
    condition: "Dense monsoonal fog at Jowai • Heavy multi-axle coal traffic",
    active_chokepoints: "Jowai Bypass bottle-neck",
    alternative_bypass: "via Mawryngkneng - Ummulong Link",
    bridge_or_tunnel: "Myntdu River Bridge",
    coordinates: [
      [25.5788, 91.8933],
      [25.4812, 92.0543],
      [25.4123, 92.1456],
      [25.3214, 92.3654]
    ]
  },
  {
    id: "ROUTE_INT_SIL_AGT",
    name: "Silchar (AS) - Agartala (TR) Trans-National Lifeline",
    fromDistrict: "Cachar",
    toDistrict: "West Tripura",
    fromState: "Assam",
    toState: "Tripura",
    highway: "NH-8",
    distance_km: 252.0,
    travel_time_hrs: 6.2,
    traffic_status: "SMOOTH",
    traffic_color: "#22c55e",
    traffic_speed_kmh: 48.0,
    normal_speed_kmh: 55.0,
    delay_mins: 12,
    condition: "Good 2-lane bituminous highway • Railhead feeder corridor",
    active_chokepoints: "Churaibari Border Toll Gate",
    alternative_bypass: "via Kailashahar state road bypass",
    bridge_or_tunnel: "Manu River Bridge",
    coordinates: [
      [24.8333, 92.7789],
      [24.5812, 92.4215],
      [24.3756, 92.1645],
      [24.1123, 91.8456],
      [23.9567, 91.5123],
      [23.8315, 91.2868]
    ]
  },
  {
    id: "ROUTE_INT_SIL_AIZ",
    name: "Silchar (AS) - Aizawl (MZ) Mountain Lifeline",
    fromDistrict: "Cachar",
    toDistrict: "Aizawl",
    fromState: "Assam",
    toState: "Mizoram",
    highway: "NH-306 / NH-6",
    distance_km: 178.0,
    travel_time_hrs: 5.5,
    traffic_status: "MODERATE",
    traffic_color: "#eab308",
    traffic_speed_kmh: 34.0,
    normal_speed_kmh: 42.0,
    delay_mins: 28,
    condition: "Kolasib hill climb • Single lane working at road widening zones",
    active_chokepoints: "Vairengte Inter-State Checkpost",
    alternative_bypass: "via Bilkhawthlir hill bypass",
    bridge_or_tunnel: "Tlawng River Suspension Bridge Axis",
    coordinates: [
      [24.8333, 92.7789],
      [24.4812, 92.7123],
      [24.2234, 92.6789],
      [23.9845, 92.7012],
      [23.7307, 92.7173]
    ]
  },
  {
    id: "ROUTE_MZ_AIZ_LNG",
    name: "Aizawl - Lunglei South Mizoram Lifeline",
    fromDistrict: "Aizawl",
    toDistrict: "Lunglei",
    fromState: "Mizoram",
    toState: "Mizoram",
    highway: "NH-54 / World Bank Road",
    distance_km: 168.0,
    travel_time_hrs: 5.2,
    traffic_status: "SMOOTH",
    traffic_color: "#22c55e",
    traffic_speed_kmh: 38.0,
    normal_speed_kmh: 42.0,
    delay_mins: 8,
    condition: "Scenic mountain corridor • Well maintained asphalt surface",
    active_chokepoints: "Hrangchalkawn junction",
    alternative_bypass: "via Thenzawl scenic bypass",
    bridge_or_tunnel: "Mat River Bridge",
    coordinates: [
      [23.7307, 92.7173],
      [23.4123, 92.7456],
      [23.1123, 92.7645],
      [22.8834, 92.7356]
    ]
  },

  // =========================================================================
  // 6. SIKKIM & SILIGURI GATEWAY LIFELINES
  // =========================================================================
  {
    id: "ROUTE_INT_SLG_GTK",
    name: "Siliguri Gateway (WB) - Gangtok (SK) Himalayan Lifeline",
    fromDistrict: "Siliguri Gateway",
    toDistrict: "East Sikkim",
    fromState: "West Bengal / Gateway",
    toState: "Sikkim",
    highway: "NH-10 (Teesta River Canyon)",
    distance_km: 114.0,
    travel_time_hrs: 3.8,
    traffic_status: "BLOCKED",
    traffic_color: "#ef4444",
    traffic_speed_kmh: 14.0,
    normal_speed_kmh: 40.0,
    delay_mins: 85,
    condition: "CRITICAL: Teesta River flood scour at km 42 • BRO Bailey bridge launch in progress",
    active_chokepoints: "Teesta Bazaar Defile (Scour wash out)",
    alternative_bypass: "via Lava - Gorubathan - Damdim alternative pass",
    bridge_or_tunnel: "Coronation Bridge (Sevoke) & Rangpo Checkpost",
    coordinates: [
      [26.7271, 88.3953],
      [26.8850, 88.4720],
      [27.0543, 88.4987],
      [27.1789, 88.5312],
      [27.3389, 88.6065]
    ]
  },
  {
    id: "ROUTE_SK_GTK_MNG",
    name: "Gangtok - Mangan North Sikkim High-Altitude Lifeline",
    fromDistrict: "East Sikkim",
    toDistrict: "North Sikkim",
    fromState: "Sikkim",
    toState: "Sikkim",
    highway: "North Sikkim Highway",
    distance_km: 68.0,
    travel_time_hrs: 2.8,
    traffic_status: "CONGESTED",
    traffic_color: "#f97316",
    traffic_speed_kmh: 22.0,
    normal_speed_kmh: 35.0,
    delay_mins: 38,
    condition: "Active GLOF damage repairs • Single-lane convoy control by BRO Swastik",
    active_chokepoints: "Dikchu Slide & Naga Waterfalls drop",
    alternative_bypass: "via Phodong monastery feeder road",
    bridge_or_tunnel: "Dikchu River Bridge",
    coordinates: [
      [27.3389, 88.6065],
      [27.4123, 88.5845],
      [27.4612, 88.5512],
      [27.5089, 88.5312]
    ]
  },
  {
    id: "ROUTE_SK_GTK_GYL",
    name: "Gangtok - Gyalshing West Sikkim Lifeline",
    fromDistrict: "East Sikkim",
    toDistrict: "West Sikkim",
    fromState: "Sikkim",
    toState: "Sikkim",
    highway: "State Highway 1",
    distance_km: 112.0,
    travel_time_hrs: 3.5,
    traffic_status: "SMOOTH",
    traffic_color: "#22c55e",
    traffic_speed_kmh: 38.0,
    normal_speed_kmh: 42.0,
    delay_mins: 10,
    condition: "Good hill road surface • Clear agricultural freight movement",
    active_chokepoints: "Singtam bridge approach",
    alternative_bypass: "via Ravangla high road",
    bridge_or_tunnel: "Rangeet River Cable-Stayed Bridge",
    coordinates: [
      [27.3389, 88.6065],
      [27.2412, 88.4812],
      [27.2123, 88.3645],
      [27.2845, 88.2456]
    ]
  }
];

/**
 * Filter routes by state involvement:
 * Returns routes where targetState is involved as fromState or toState.
 * If targetState is 'ALL' or 'Central' or not found, returns all routes.
 */
export function getRoutesForState(targetState) {
  if (!targetState || targetState === 'ALL' || targetState === 'MDoNER' || targetState === 'Central') {
    return DISTRICT_CONNECTIVITY_ROUTES;
  }
  return DISTRICT_CONNECTIVITY_ROUTES.filter(r => 
    r.fromState === targetState || r.toState === targetState
  );
}

/**
 * Filter districts by state involvement:
 * Returns districts within the targetState plus gateway districts connected to it.
 */
export function getDistrictsForState(targetState) {
  const allDistricts = Object.values(DISTRICT_CENTROIDS);
  if (!targetState || targetState === 'ALL' || targetState === 'MDoNER' || targetState === 'Central') {
    return allDistricts;
  }
  
  // Find districts that are in targetState OR connected to targetState via routes
  const connectedDistrictNames = new Set();
  DISTRICT_CONNECTIVITY_ROUTES.forEach(r => {
    if (r.fromState === targetState) {
      connectedDistrictNames.add(r.fromDistrict);
      connectedDistrictNames.add(r.toDistrict);
    }
    if (r.toState === targetState) {
      connectedDistrictNames.add(r.fromDistrict);
      connectedDistrictNames.add(r.toDistrict);
    }
  });

  return allDistricts.filter(d => d.state === targetState || connectedDistrictNames.has(d.name));
}
