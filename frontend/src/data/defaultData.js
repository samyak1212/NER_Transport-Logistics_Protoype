/**
 * Initial seed baseline data for the North Eastern Region logistics platform.
 * Ensures the interactive map, routes, alternate bypass, stations, and landslide
 * prediction zones render instantly with zero delay.
 */

export const DEFAULT_NODES = [
  { id: "Guwahati", name: "Guwahati Central Depot", district: "Kamrup Metro", state: "Assam", elevation_m: 55.0, lat: 26.1445, lon: 91.7362, type: "SUPPLY_HUB", isKeyStation: true },
  { id: "Mangaldai", name: "Mangaldai Staging Point", district: "Darrang", state: "Assam", elevation_m: 65.0, lat: 26.4385, lon: 92.0354, type: "TRANSIT_HUB" },
  { id: "Tezpur", name: "Tezpur Civil & Military Supply Base", district: "Sonitpur", state: "Assam", elevation_m: 78.0, lat: 26.6528, lon: 92.7926, type: "SUPPLY_BASE", isKeyStation: true },
  { id: "Balipara", name: "Balipara Strategic Junction", district: "Sonitpur", state: "Assam", elevation_m: 88.0, lat: 26.8211, lon: 92.8124, type: "JUNCTION", isKeyStation: true },
  
  // Primary Lifeline (NH-13 via Bhalukpong & Sessa)
  { id: "Bhalukpong", name: "Bhalukpong Border Checkpost", district: "West Kameng", state: "Arunachal Pradesh", elevation_m: 215.0, lat: 27.0125, lon: 92.6514, type: "BORDER_CHECKPOST", isKeyStation: true },
  { id: "Tippi", name: "Tippi Orchid Center Gorge", district: "West Kameng", state: "Arunachal Pradesh", elevation_m: 360.0, lat: 27.0421, lon: 92.6105, type: "TRANSIT_POINT" },
  { id: "Sessa", name: "Sessa Scree Slide Chokepoint", district: "West Kameng", state: "Arunachal Pradesh", elevation_m: 1100.0, lat: 27.0984, lon: 92.5342, type: "HIGH_RISK_CHOKEPOINT", isHazardZone: true },
  { id: "NagMandir", name: "Nag Mandir Mountain Cut", district: "West Kameng", state: "Arunachal Pradesh", elevation_m: 1820.0, lat: 27.1623, lon: 92.4789, type: "MOUNTAIN_CUT", isHazardZone: true },
  { id: "Kaspi", name: "Kaspi River Defile", district: "West Kameng", state: "Arunachal Pradesh", elevation_m: 1350.0, lat: 27.2014, lon: 92.4412, type: "CHOKEPOINT", isHazardZone: true },
  { id: "Tengapani", name: "Tengapani Valley Base", district: "West Kameng", state: "Arunachal Pradesh", elevation_m: 1450.0, lat: 27.2289, lon: 92.4215, type: "VALLEY_HUB" },
  
  // Southern BRO Alternate Bypass Corridor
  { id: "Orang", name: "Orang Junction", district: "Darrang", state: "Assam", elevation_m: 72.0, lat: 26.6845, lon: 92.3421, type: "JUNCTION" },
  { id: "Bhairabkunda", name: "Bhairabkunda Tri-Junction", district: "Udalguri", state: "Assam", elevation_m: 190.0, lat: 26.9023, lon: 92.1154, type: "BORDER_POINT" },
  { id: "Kalaktang", name: "Kalaktang BRO Staging Post", district: "West Kameng", state: "Arunachal Pradesh", elevation_m: 1150.0, lat: 27.1234, lon: 92.1021, type: "STAGING_POST", isKeyStation: true },
  { id: "Shergaon", name: "Shergaon Agricultural Basin", district: "West Kameng", state: "Arunachal Pradesh", elevation_m: 1950.0, lat: 27.1425, lon: 92.2614, type: "TRANSIT_POINT" },
  { id: "Rupa", name: "Rupa Sub-Divisional Base", district: "West Kameng", state: "Arunachal Pradesh", elevation_m: 1520.0, lat: 27.2012, lon: 92.3854, type: "TRANSIT_HUB", isKeyStation: true },
  
  // Upper High Himalayan Lifeline to Tawang
  { id: "Bomdila", name: "Bomdila District Headquarters", district: "West Kameng", state: "Arunachal Pradesh", elevation_m: 2415.0, lat: 27.2644, lon: 92.4241, type: "DISTRICT_HQ", isKeyStation: true },
  { id: "MunnaCamp", name: "Munna Camp Staging Area", district: "West Kameng", state: "Arunachal Pradesh", elevation_m: 2210.0, lat: 27.3112, lon: 92.3562, type: "TRANSIT_POINT" },
  { id: "Dirang", name: "Dirang Sub-Divisional Depot", district: "West Kameng", state: "Arunachal Pradesh", elevation_m: 1560.0, lat: 27.3578, lon: 92.2394, type: "SUB_DEPOT", isKeyStation: true },
  { id: "Sange", name: "Sange Mountain Outpost", district: "West Kameng", state: "Arunachal Pradesh", elevation_m: 2100.0, lat: 27.4215, lon: 92.1852, type: "TRANSIT_POINT" },
  { id: "Baisakhi", name: "Baisakhi Military Camp", district: "West Kameng", state: "Arunachal Pradesh", elevation_m: 2750.0, lat: 27.4721, lon: 92.1245, type: "MILITARY_BASE" },
  { id: "SelaPass", name: "Sela High Mountain Pass & Tunnel (3,733m)", district: "Tawang", state: "Arunachal Pradesh", elevation_m: 3733.0, lat: 27.5034, lon: 92.1039, type: "ALPINE_PASS", isKeyStation: true, isHazardZone: true },
  { id: "JaswantGarh", name: "Jaswant Garh Staging Post", district: "Tawang", state: "Arunachal Pradesh", elevation_m: 3050.0, lat: 27.5312, lon: 92.0514, type: "MEMORIAL_STAGING" },
  { id: "Jang", name: "Jang Bridge & Hydro Base", district: "Tawang", state: "Arunachal Pradesh", elevation_m: 2160.0, lat: 27.5745, lon: 91.9854, type: "BRIDGE_CROSSING", isKeyStation: true },
  { id: "Lhou", name: "Lhou Valley Checkpost", district: "Tawang", state: "Arunachal Pradesh", elevation_m: 2320.0, lat: 27.5612, lon: 91.9021, type: "TRANSIT_POINT" },
  { id: "Tawang", name: "Tawang Civil Hospital & Frontier Depot", district: "Tawang", state: "Arunachal Pradesh", elevation_m: 3048.0, lat: 27.5861, lon: 91.8594, type: "FRONTIER_DESTINATION", isKeyStation: true }
];

// Predictive Landslide Hazard Zones (Clause b)
export const LANDSLIDE_PREDICTION_ZONES = [
  {
    id: "HAZ_01",
    name: "Sessa Scree Slide Belt (NH-13 km 114)",
    lat: 27.0984,
    lon: 92.5342,
    probability_pct: 84,
    hazard_level: "SEVERE",
    trigger_cause: "High Slope (38.5°) + 55mm Antecedent Rainfall + Sheared Phyllite Rock",
    srtm_slope_deg: 38.5,
    elevation_m: 1100,
    gsi_historical_slides: 11,
    forecast_48h: "Extreme Slide Risk (Rainfall > 70mm forecasted)",
    recommendation: "DIVERT TO KALAKTANG BYPASS"
  },
  {
    id: "HAZ_02",
    name: "Bhalukpong River Cut & Gorge (NH-13 km 88)",
    lat: 27.0289,
    lon: 92.6310,
    probability_pct: 58,
    hazard_level: "MODERATE",
    trigger_cause: "Kameng River Toe Erosion + Siwalik Sandstone Scouring",
    srtm_slope_deg: 26.8,
    elevation_m: 360,
    gsi_historical_slides: 4,
    forecast_48h: "Intermittent Mudflows during heavy downpours",
    recommendation: "ESCORT HEAVY VEHICLES"
  },
  {
    id: "HAZ_03",
    name: "Nag Mandir Cut & Hairpin Escarpment",
    lat: 27.1623,
    lon: 92.4789,
    probability_pct: 68,
    hazard_level: "HIGH",
    trigger_cause: "Steep Rockface (34.2°) + Carbonaceous Shale Sliding",
    srtm_slope_deg: 34.2,
    elevation_m: 1820,
    gsi_historical_slides: 8,
    forecast_48h: "Boulder fall alert during night hours",
    recommendation: "ONE-LANE RESTRICTED ACCESS"
  },
  {
    id: "HAZ_04",
    name: "Kaspi River Defile Chokepoint",
    lat: 27.2014,
    lon: 92.4412,
    probability_pct: 62,
    hazard_level: "HIGH",
    trigger_cause: "River flash flood scouring road foundation",
    srtm_slope_deg: 29.4,
    elevation_m: 1350,
    gsi_historical_slides: 5,
    forecast_48h: "Waterlogging & Road subsidence warning",
    recommendation: "SPEED RESTRICTION 20 KM/H"
  },
  {
    id: "HAZ_05",
    name: "Sela Pass Summit & Alpine Scree (13,700 ft)",
    lat: 27.5034,
    lon: 92.1039,
    probability_pct: 76,
    hazard_level: "HIGH",
    trigger_cause: "Freeze-Thaw Rock Splitting + Dense Freezing Mist + Glacial Moraine",
    srtm_slope_deg: 36.5,
    elevation_m: 3733,
    gsi_historical_slides: 8,
    forecast_48h: "Snow-slush & Icing risk on summit switchbacks",
    recommendation: "UTILIZE SELA TUNNEL BYPASS"
  }
];

// Complete segments dataset connecting nodes
export const DEFAULT_SEGMENTS = [
  // Plains Sector (Assam)
  {
    id: "SEG_01",
    name: "Guwahati -> Mangaldai (NH-15)",
    corridor: "PRIMARY_NH13",
    source: "Guwahati",
    target: "Mangaldai",
    distance_km: 68.0,
    base_speed_kmh: 65.0,
    district: "Kamrup Metro / Darrang",
    risk_score: 0.12,
    risk_level: "LOW",
    is_blocked: false,
    geotechnical: { slope_deg: 3.2, elevation_m: 60.0, gsi_landslide_history: 0, rainfall_intensity_mm: 18.0, rock_formation: "Alluvial Floodplain" },
    coordinates: [[26.1445, 91.7362], [26.2801, 91.8905], [26.4385, 92.0354]]
  },
  {
    id: "SEG_02",
    name: "Mangaldai -> Tezpur (NH-15)",
    corridor: "PRIMARY_NH13",
    source: "Mangaldai",
    target: "Tezpur",
    distance_km: 84.0,
    base_speed_kmh: 60.0,
    district: "Darrang / Sonitpur",
    risk_score: 0.14,
    risk_level: "LOW",
    is_blocked: false,
    geotechnical: { slope_deg: 4.1, elevation_m: 72.0, gsi_landslide_history: 0, rainfall_intensity_mm: 22.0, rock_formation: "Alluvial Floodplain" },
    coordinates: [[26.4385, 92.0354], [26.5412, 92.4125], [26.6528, 92.7926]]
  },
  {
    id: "SEG_03",
    name: "Tezpur -> Balipara Junction (NH-13)",
    corridor: "PRIMARY_NH13",
    source: "Tezpur",
    target: "Balipara",
    distance_km: 22.0,
    base_speed_kmh: 55.0,
    district: "Sonitpur",
    risk_score: 0.16,
    risk_level: "LOW",
    is_blocked: false,
    geotechnical: { slope_deg: 5.0, elevation_m: 85.0, gsi_landslide_history: 0, rainfall_intensity_mm: 24.0, rock_formation: "Tertiary Piedmont" },
    coordinates: [[26.6528, 92.7926], [26.7410, 92.8050], [26.8211, 92.8124]]
  },

  // Primary Lifeline: Bhalukpong & Sessa Landslide Sector
  {
    id: "SEG_04",
    name: "Balipara -> Bhalukpong Border (NH-13)",
    corridor: "PRIMARY_NH13",
    source: "Balipara",
    target: "Bhalukpong",
    distance_km: 34.0,
    base_speed_kmh: 45.0,
    district: "Sonitpur / West Kameng",
    risk_score: 0.38,
    risk_level: "MODERATE",
    is_blocked: false,
    geotechnical: { slope_deg: 14.5, elevation_m: 215.0, gsi_landslide_history: 2, rainfall_intensity_mm: 35.0, rock_formation: "Siwalik Sandstone" },
    coordinates: [[26.8211, 92.8124], [26.9145, 92.7312], [27.0125, 92.6514]]
  },
  {
    id: "SEG_05",
    name: "Bhalukpong -> Tippi Gorge (NH-13)",
    corridor: "PRIMARY_NH13",
    source: "Bhalukpong",
    target: "Tippi",
    distance_km: 14.0,
    base_speed_kmh: 35.0,
    district: "West Kameng",
    risk_score: 0.58,
    risk_level: "MODERATE",
    is_blocked: false,
    geotechnical: { slope_deg: 26.8, elevation_m: 360.0, gsi_landslide_history: 4, rainfall_intensity_mm: 42.0, rock_formation: "Sheared Phyllite" },
    coordinates: [[27.0125, 92.6514], [27.0289, 92.6310], [27.0421, 92.6105]]
  },
  {
    id: "SEG_06",
    name: "Tippi -> Sessa Scree Slide Belt (NH-13)",
    corridor: "PRIMARY_NH13",
    source: "Tippi",
    target: "Sessa",
    distance_km: 18.0,
    base_speed_kmh: 28.0,
    district: "West Kameng",
    risk_score: 0.84,
    risk_level: "HIGH",
    is_blocked: true,
    blockage_reason: "Active Scree Landslide & Boulder Fall (BRO Clearance Underway)",
    geotechnical: { slope_deg: 38.5, elevation_m: 1100.0, gsi_landslide_history: 11, rainfall_intensity_mm: 55.0, rock_formation: "Unconsolidated Scree & Weathered Schist" },
    coordinates: [[27.0421, 92.6105], [27.0684, 92.5714], [27.0984, 92.5342]]
  },
  {
    id: "SEG_07",
    name: "Sessa -> Nag Mandir Cut (NH-13)",
    corridor: "PRIMARY_NH13",
    source: "Sessa",
    target: "NagMandir",
    distance_km: 21.0,
    base_speed_kmh: 30.0,
    district: "West Kameng",
    risk_score: 0.68,
    risk_level: "HIGH",
    is_blocked: false,
    geotechnical: { slope_deg: 34.2, elevation_m: 1820.0, gsi_landslide_history: 8, rainfall_intensity_mm: 48.0, rock_formation: "Carbonaceous Shale" },
    coordinates: [[27.0984, 92.5342], [27.1321, 92.5012], [27.1623, 92.4789]]
  },
  {
    id: "SEG_08",
    name: "Nag Mandir -> Kaspi Defile (NH-13)",
    corridor: "PRIMARY_NH13",
    source: "NagMandir",
    target: "Kaspi",
    distance_km: 16.0,
    base_speed_kmh: 32.0,
    district: "West Kameng",
    risk_score: 0.62,
    risk_level: "HIGH",
    is_blocked: false,
    geotechnical: { slope_deg: 29.4, elevation_m: 1350.0, gsi_landslide_history: 5, rainfall_intensity_mm: 40.0, rock_formation: "Weathered Biotite Gneiss" },
    coordinates: [[27.1623, 92.4789], [27.1812, 92.4587], [27.2014, 92.4412]]
  },
  {
    id: "SEG_09",
    name: "Kaspi -> Tengapani -> Bomdila (NH-13)",
    corridor: "PRIMARY_NH13",
    source: "Kaspi",
    target: "Bomdila",
    distance_km: 25.0,
    base_speed_kmh: 32.0,
    district: "West Kameng",
    risk_score: 0.44,
    risk_level: "MODERATE",
    is_blocked: false,
    geotechnical: { slope_deg: 24.1, elevation_m: 2415.0, gsi_landslide_history: 3, rainfall_intensity_mm: 32.0, rock_formation: "Bomdila Gneissic Complex" },
    coordinates: [[27.2014, 92.4412], [27.2289, 92.4215], [27.2644, 92.4241]]
  },

  // Southern BRO Alternate Bypass Corridor (Kalaktang Highway - Bypasses Sessa landslides)
  {
    id: "SEG_ALT_01",
    name: "Balipara -> Orang Junction (Southern Bypass)",
    corridor: "ALTERNATE_BYPASS",
    source: "Balipara",
    target: "Orang",
    distance_km: 42.0,
    base_speed_kmh: 60.0,
    district: "Sonitpur / Darrang",
    risk_score: 0.12,
    risk_level: "LOW",
    is_blocked: false,
    geotechnical: { slope_deg: 3.8, elevation_m: 72.0, gsi_landslide_history: 0, rainfall_intensity_mm: 20.0, rock_formation: "Alluvium" },
    coordinates: [[26.8211, 92.8124], [26.7541, 92.5812], [26.6845, 92.3421]]
  },
  {
    id: "SEG_ALT_02",
    name: "Orang -> Bhairabkunda Tri-Junction (Southern Bypass)",
    corridor: "ALTERNATE_BYPASS",
    source: "Orang",
    target: "Bhairabkunda",
    distance_km: 36.0,
    base_speed_kmh: 50.0,
    district: "Udalguri",
    risk_score: 0.18,
    risk_level: "LOW",
    is_blocked: false,
    geotechnical: { slope_deg: 7.2, elevation_m: 190.0, gsi_landslide_history: 0, rainfall_intensity_mm: 25.0, rock_formation: "Bouldery Piedmont" },
    coordinates: [[26.6845, 92.3421], [26.7912, 92.2214], [26.9023, 92.1154]]
  },
  {
    id: "SEG_ALT_03",
    name: "Bhairabkunda -> Kalaktang (BRO Road)",
    corridor: "ALTERNATE_BYPASS",
    source: "Bhairabkunda",
    target: "Kalaktang",
    distance_km: 48.0,
    base_speed_kmh: 40.0,
    district: "West Kameng",
    risk_score: 0.26,
    risk_level: "LOW",
    is_blocked: false,
    geotechnical: { slope_deg: 16.8, elevation_m: 1150.0, gsi_landslide_history: 1, rainfall_intensity_mm: 28.0, rock_formation: "Stable Quartzite & Gneiss" },
    coordinates: [[26.9023, 92.1154], [27.0124, 92.1087], [27.1234, 92.1021]]
  },
  {
    id: "SEG_ALT_04",
    name: "Kalaktang -> Shergaon -> Rupa (BRO Road)",
    corridor: "ALTERNATE_BYPASS",
    source: "Kalaktang",
    target: "Rupa",
    distance_km: 45.0,
    base_speed_kmh: 38.0,
    district: "West Kameng",
    risk_score: 0.28,
    risk_level: "LOW",
    is_blocked: false,
    geotechnical: { slope_deg: 18.2, elevation_m: 1520.0, gsi_landslide_history: 1, rainfall_intensity_mm: 30.0, rock_formation: "Granitic Intrusives" },
    coordinates: [[27.1234, 92.1021], [27.1425, 92.2614], [27.2012, 92.3854]]
  },
  {
    id: "SEG_ALT_05",
    name: "Rupa -> Bomdila Junction (BRO Road)",
    corridor: "ALTERNATE_BYPASS",
    source: "Rupa",
    target: "Bomdila",
    distance_km: 16.0,
    base_speed_kmh: 35.0,
    district: "West Kameng",
    risk_score: 0.24,
    risk_level: "LOW",
    is_blocked: false,
    geotechnical: { slope_deg: 15.4, elevation_m: 2415.0, gsi_landslide_history: 1, rainfall_intensity_mm: 30.0, rock_formation: "Gneiss" },
    coordinates: [[27.2012, 92.3854], [27.2345, 92.4089], [27.2644, 92.4241]]
  },

  // High Mountain Sector (Bomdila to Tawang)
  {
    id: "SEG_10",
    name: "Bomdila -> Dirang Valley (NH-13)",
    corridor: "PRIMARY_NH13",
    source: "Bomdila",
    target: "Dirang",
    distance_km: 42.0,
    base_speed_kmh: 35.0,
    district: "West Kameng",
    risk_score: 0.36,
    risk_level: "MODERATE",
    is_blocked: false,
    geotechnical: { slope_deg: 22.5, elevation_m: 1560.0, gsi_landslide_history: 3, rainfall_intensity_mm: 34.0, rock_formation: "Dirang Schist" },
    coordinates: [[27.2644, 92.4241], [27.3112, 92.3562], [27.3578, 92.2394]]
  },
  {
    id: "SEG_11",
    name: "Dirang -> Sange -> Baisakhi (NH-13)",
    corridor: "PRIMARY_NH13",
    source: "Dirang",
    target: "Baisakhi",
    distance_km: 36.0,
    base_speed_kmh: 28.0,
    district: "West Kameng",
    risk_score: 0.54,
    risk_level: "MODERATE",
    is_blocked: false,
    geotechnical: { slope_deg: 31.2, elevation_m: 2750.0, gsi_landslide_history: 6, rainfall_intensity_mm: 45.0, rock_formation: "Granite & Metamorphic" },
    coordinates: [[27.3578, 92.2394], [27.4215, 92.1852], [27.4721, 92.1245]]
  },
  {
    id: "SEG_12",
    name: "Baisakhi -> Sela Pass & Tunnel (3,733m Summit)",
    corridor: "PRIMARY_NH13",
    source: "Baisakhi",
    target: "SelaPass",
    distance_km: 18.0,
    base_speed_kmh: 24.0,
    district: "Tawang",
    risk_score: 0.76,
    risk_level: "HIGH",
    is_blocked: false,
    geotechnical: { slope_deg: 36.5, elevation_m: 3733.0, gsi_landslide_history: 8, rainfall_intensity_mm: 56.5, rock_formation: "High-Alpine Glacial Moraine" },
    coordinates: [[27.4721, 92.1245], [27.4889, 92.1123], [27.5034, 92.1039]]
  },
  {
    id: "SEG_13",
    name: "Sela Pass -> Jaswant Garh (NH-13)",
    corridor: "PRIMARY_NH13",
    source: "SelaPass",
    target: "JaswantGarh",
    distance_km: 16.0,
    base_speed_kmh: 26.0,
    district: "Tawang",
    risk_score: 0.48,
    risk_level: "MODERATE",
    is_blocked: false,
    geotechnical: { slope_deg: 28.4, elevation_m: 3050.0, gsi_landslide_history: 4, rainfall_intensity_mm: 38.0, rock_formation: "Gneissic Bedrock" },
    coordinates: [[27.5034, 92.1039], [27.5187, 92.0784], [27.5312, 92.0514]]
  },
  {
    id: "SEG_14",
    name: "Jaswant Garh -> Jang Bridge & Falls (NH-13)",
    corridor: "PRIMARY_NH13",
    source: "JaswantGarh",
    target: "Jang",
    distance_km: 24.0,
    base_speed_kmh: 30.0,
    district: "Tawang",
    risk_score: 0.52,
    risk_level: "MODERATE",
    is_blocked: false,
    geotechnical: { slope_deg: 25.0, elevation_m: 2160.0, gsi_landslide_history: 5, rainfall_intensity_mm: 44.0, rock_formation: "Torrential River Gorge Escarpment" },
    coordinates: [[27.5312, 92.0514], [27.5521, 92.0189], [27.5745, 91.9854]]
  },
  {
    id: "SEG_15",
    name: "Jang -> Lhou Checkpost -> Tawang Civil Hospital",
    corridor: "PRIMARY_NH13",
    source: "Jang",
    target: "Tawang",
    distance_km: 34.0,
    base_speed_kmh: 32.0,
    district: "Tawang",
    risk_score: 0.35,
    risk_level: "MODERATE",
    is_blocked: false,
    geotechnical: { slope_deg: 21.8, elevation_m: 3048.0, gsi_landslide_history: 2, rainfall_intensity_mm: 30.0, rock_formation: "Tawang Metamorphic Formation" },
    coordinates: [[27.5745, 91.9854], [27.5612, 91.9021], [27.5861, 91.8594]]
  }
];

// Weather monitoring stations along corridor
export const DEFAULT_WEATHER_STATIONS = [
  { station: "Guwahati", temp_c: 31.5, rainfall_mm: 18.2, weather_desc: "Scattered Monsoon Showers", humidity_pct: 84, alert: "MODERATE", elevation_m: 55, forecast_24h_mm: 25.0 },
  { station: "Tezpur", temp_c: 29.8, rainfall_mm: 24.5, weather_desc: "Steady Rain", humidity_pct: 88, alert: "MODERATE", elevation_m: 78, forecast_24h_mm: 32.0 },
  { station: "Bhalukpong", temp_c: 26.0, rainfall_mm: 42.0, weather_desc: "Heavy Downpour (Gorge Slopes Saturated)", humidity_pct: 92, alert: "HIGH", elevation_m: 215, forecast_24h_mm: 55.0 },
  { station: "Bomdila", temp_c: 17.5, rainfall_mm: 34.0, weather_desc: "Dense Fog & Rain", humidity_pct: 95, alert: "HIGH", elevation_m: 2415, forecast_24h_mm: 45.0 },
  { station: "SelaPass", temp_c: 4.2, rainfall_mm: 56.5, weather_desc: "Near-Freezing Torrential Rain & Mist", humidity_pct: 98, alert: "CRITICAL", elevation_m: 3733, forecast_24h_mm: 75.0 },
  { station: "Tawang", temp_c: 14.8, rainfall_mm: 32.0, weather_desc: "Cold Monsoon Showers", humidity_pct: 90, alert: "MODERATE", elevation_m: 3048, forecast_24h_mm: 40.0 }
];

export const DEFAULT_CORRIDOR_HEALTH = {
  status: "CAUTION",
  average_risk_score: 0.42,
  blocked_segments_count: 0,
  total_segments: 15,
  high_risk_segments_count: 3,
  active_advisory: "Monsoon saturated slopes between Bhalukpong and Sessa. BRO standby units deployed at km 114.",
  timestamp: "2026-09-06T12:00:00Z"
};

export const DEFAULT_DISTRICTS = [
  { name: "Kamrup Metro", state: "Assam", status: "ACCESSIBLE", active_lifelines: 2, blocked_roads: 0, priority_depot: "Guwahati Central", medicine_stock_days: 28 },
  { name: "Sonitpur", state: "Assam", status: "ACCESSIBLE", active_lifelines: 2, blocked_roads: 0, priority_depot: "Tezpur Base", medicine_stock_days: 21 },
  { name: "West Kameng", state: "Arunachal Pradesh", status: "DEGRADED", active_lifelines: 1, blocked_roads: 1, priority_depot: "Bomdila Civil Hospital", medicine_stock_days: 9 },
  { name: "Tawang", state: "Arunachal Pradesh", status: "ISOLATED_RISK", active_lifelines: 1, blocked_roads: 1, priority_depot: "Tawang Frontier Depot", medicine_stock_days: 5 }
];
