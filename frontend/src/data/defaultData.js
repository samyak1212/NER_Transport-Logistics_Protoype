/**
 * Complete multi-corridor geospatial, topological and telemetry dataset for the
 * North Eastern Region (NER) logistics and accessibility intelligence platform.
 * Supports 4 major strategic arterial corridors with high-fidelity curved highway geometry.
 */

export const REGIONAL_CORRIDORS = [
  {
    "id": "ALL",
    "name": "All Strategic Lifelines (NER Regional Overview)",
    "states": "Arunachal, Assam, Nagaland, Manipur, Sikkim, Meghalaya, Tripura",
    "center": [
      26.2,
      92.5
    ],
    "zoom": 7,
    "description": "Comprehensive situational awareness of all 4 vital lifelines across the 8 North Eastern states."
  },
  {
    "id": "CORRIDOR_NH13",
    "name": "Western Arunachal Lifeline (NH-13 & BRO Bypass)",
    "states": "Assam & Arunachal Pradesh",
    "center": [
      27.15,
      92.35
    ],
    "zoom": 8.5,
    "distance_km": "380 km / 415 km",
    "description": "Guwahati -> Tezpur -> Bhalukpong -> Bomdila -> Sela Pass -> Tawang"
  },
  {
    "id": "CORRIDOR_NH29",
    "name": "Nagaland & Manipur Arterial Lifeline (NH-29 / NH-2)",
    "states": "Assam, Nagaland & Manipur",
    "center": [
      25.35,
      93.9
    ],
    "zoom": 8.5,
    "distance_km": "215 km",
    "description": "Dimapur -> Paglapahar Gorge -> Kohima -> Senapati -> Imphal"
  },
  {
    "id": "CORRIDOR_NH10",
    "name": "Sikkim Himalayan Lifeline (NH-10)",
    "states": "West Bengal & Sikkim",
    "center": [
      27.05,
      88.5
    ],
    "zoom": 9.5,
    "distance_km": "114 km",
    "description": "Siliguri -> Sevoke Coronation Bridge -> Teesta Bazaar -> Rangpo -> Gangtok"
  },
  {
    "id": "CORRIDOR_NH6",
    "name": "Meghalaya, Barak Valley & Tripura Lifeline (NH-6 / NH-8)",
    "states": "Meghalaya, Assam & Tripura",
    "center": [
      24.8,
      92.1
    ],
    "zoom": 8.0,
    "distance_km": "450 km",
    "description": "Shillong -> Jowai -> Sonapur Mudflow Tunnel -> Silchar -> Agartala"
  }
];

export const DEFAULT_NODES = [
  {
    "id": "Guwahati",
    "name": "Guwahati Central Depot",
    "district": "Kamrup Metro",
    "state": "Assam",
    "elevation_m": 55.0,
    "lat": 26.1445,
    "lon": 91.7362,
    "type": "SUPPLY_HUB",
    "corridor": "CORRIDOR_NH13",
    "isKeyStation": true
  },
  {
    "id": "Mangaldai",
    "name": "Mangaldai Staging Point",
    "district": "Darrang",
    "state": "Assam",
    "elevation_m": 65.0,
    "lat": 26.4385,
    "lon": 92.0354,
    "type": "TRANSIT_HUB",
    "corridor": "CORRIDOR_NH13"
  },
  {
    "id": "Tezpur",
    "name": "Tezpur Military & Civil Supply Base",
    "district": "Sonitpur",
    "state": "Assam",
    "elevation_m": 78.0,
    "lat": 26.6528,
    "lon": 92.7926,
    "type": "SUPPLY_BASE",
    "corridor": "CORRIDOR_NH13",
    "isKeyStation": true
  },
  {
    "id": "Balipara",
    "name": "Balipara Strategic Junction",
    "district": "Sonitpur",
    "state": "Assam",
    "elevation_m": 88.0,
    "lat": 26.8211,
    "lon": 92.8124,
    "type": "JUNCTION",
    "corridor": "CORRIDOR_NH13",
    "isKeyStation": true
  },
  {
    "id": "Bhalukpong",
    "name": "Bhalukpong Border Checkpost",
    "district": "West Kameng",
    "state": "Arunachal Pradesh",
    "elevation_m": 215.0,
    "lat": 27.0125,
    "lon": 92.6514,
    "type": "BORDER_CHECKPOST",
    "corridor": "CORRIDOR_NH13",
    "isKeyStation": true
  },
  {
    "id": "Tippi",
    "name": "Tippi Orchid Gorge",
    "district": "West Kameng",
    "state": "Arunachal Pradesh",
    "elevation_m": 360.0,
    "lat": 27.0421,
    "lon": 92.6105,
    "type": "TRANSIT_POINT",
    "corridor": "CORRIDOR_NH13"
  },
  {
    "id": "Sessa",
    "name": "Sessa Scree Slide Chokepoint",
    "district": "West Kameng",
    "state": "Arunachal Pradesh",
    "elevation_m": 1100.0,
    "lat": 27.0984,
    "lon": 92.5342,
    "type": "HIGH_RISK_CHOKEPOINT",
    "corridor": "CORRIDOR_NH13",
    "isHazardZone": true,
    "isKeyStation": true
  },
  {
    "id": "NagMandir",
    "name": "Nag Mandir Mountain Cut",
    "district": "West Kameng",
    "state": "Arunachal Pradesh",
    "elevation_m": 1820.0,
    "lat": 27.1623,
    "lon": 92.4789,
    "type": "MOUNTAIN_CUT",
    "corridor": "CORRIDOR_NH13"
  },
  {
    "id": "Kaspi",
    "name": "Kaspi River Defile",
    "district": "West Kameng",
    "state": "Arunachal Pradesh",
    "elevation_m": 1350.0,
    "lat": 27.2014,
    "lon": 92.4412,
    "type": "CHOKEPOINT",
    "corridor": "CORRIDOR_NH13",
    "isHazardZone": true
  },
  {
    "id": "Tengapani",
    "name": "Tengapani Valley Base",
    "district": "West Kameng",
    "state": "Arunachal Pradesh",
    "elevation_m": 1450.0,
    "lat": 27.2289,
    "lon": 92.4215,
    "type": "VALLEY_HUB",
    "corridor": "CORRIDOR_NH13"
  },
  {
    "id": "Orang",
    "name": "Orang Junction",
    "district": "Darrang",
    "state": "Assam",
    "elevation_m": 72.0,
    "lat": 26.6845,
    "lon": 92.3421,
    "type": "JUNCTION",
    "corridor": "CORRIDOR_NH13_BYPASS"
  },
  {
    "id": "Bhairabkunda",
    "name": "Bhairabkunda Tri-Junction",
    "district": "Udalguri",
    "state": "Assam",
    "elevation_m": 190.0,
    "lat": 26.9023,
    "lon": 92.1154,
    "type": "BORDER_POINT",
    "corridor": "CORRIDOR_NH13_BYPASS"
  },
  {
    "id": "Kalaktang",
    "name": "Kalaktang BRO Staging Post",
    "district": "West Kameng",
    "state": "Arunachal Pradesh",
    "elevation_m": 1150.0,
    "lat": 27.1234,
    "lon": 92.1021,
    "type": "STAGING_POST",
    "corridor": "CORRIDOR_NH13_BYPASS",
    "isKeyStation": true
  },
  {
    "id": "Shergaon",
    "name": "Shergaon Agricultural Basin",
    "district": "West Kameng",
    "state": "Arunachal Pradesh",
    "elevation_m": 1950.0,
    "lat": 27.1425,
    "lon": 92.2614,
    "type": "TRANSIT_POINT",
    "corridor": "CORRIDOR_NH13_BYPASS"
  },
  {
    "id": "Rupa",
    "name": "Rupa Sub-Divisional Base",
    "district": "West Kameng",
    "state": "Arunachal Pradesh",
    "elevation_m": 1520.0,
    "lat": 27.2012,
    "lon": 92.3854,
    "type": "TRANSIT_HUB",
    "corridor": "CORRIDOR_NH13_BYPASS",
    "isKeyStation": true
  },
  {
    "id": "Bomdila",
    "name": "Bomdila District Headquarters",
    "district": "West Kameng",
    "state": "Arunachal Pradesh",
    "elevation_m": 2415.0,
    "lat": 27.2644,
    "lon": 92.4241,
    "type": "DISTRICT_HQ",
    "corridor": "CORRIDOR_NH13",
    "isKeyStation": true
  },
  {
    "id": "MunnaCamp",
    "name": "Munna Camp Staging Area",
    "district": "West Kameng",
    "state": "Arunachal Pradesh",
    "elevation_m": 2210.0,
    "lat": 27.3112,
    "lon": 92.3562,
    "type": "TRANSIT_POINT",
    "corridor": "CORRIDOR_NH13"
  },
  {
    "id": "Dirang",
    "name": "Dirang Sub-Divisional Depot",
    "district": "West Kameng",
    "state": "Arunachal Pradesh",
    "elevation_m": 1560.0,
    "lat": 27.3578,
    "lon": 92.2394,
    "type": "SUB_DEPOT",
    "corridor": "CORRIDOR_NH13",
    "isKeyStation": true
  },
  {
    "id": "Sange",
    "name": "Sange Mountain Outpost",
    "district": "West Kameng",
    "state": "Arunachal Pradesh",
    "elevation_m": 2100.0,
    "lat": 27.4215,
    "lon": 92.1852,
    "type": "TRANSIT_POINT",
    "corridor": "CORRIDOR_NH13"
  },
  {
    "id": "Baisakhi",
    "name": "Baisakhi Military Camp",
    "district": "West Kameng",
    "state": "Arunachal Pradesh",
    "elevation_m": 2750.0,
    "lat": 27.4721,
    "lon": 92.1245,
    "type": "MILITARY_BASE",
    "corridor": "CORRIDOR_NH13"
  },
  {
    "id": "SelaPass",
    "name": "Sela Pass Summit & Tunnel (3,733m)",
    "district": "Tawang",
    "state": "Arunachal Pradesh",
    "elevation_m": 3733.0,
    "lat": 27.5034,
    "lon": 92.1039,
    "type": "ALPINE_PASS",
    "corridor": "CORRIDOR_NH13",
    "isHazardZone": true,
    "isKeyStation": true
  },
  {
    "id": "JaswantGarh",
    "name": "Jaswant Garh Staging Post",
    "district": "Tawang",
    "state": "Arunachal Pradesh",
    "elevation_m": 3050.0,
    "lat": 27.5312,
    "lon": 92.0514,
    "type": "MEMORIAL_STAGING",
    "corridor": "CORRIDOR_NH13"
  },
  {
    "id": "Jang",
    "name": "Jang Bridge & Hydro Base",
    "district": "Tawang",
    "state": "Arunachal Pradesh",
    "elevation_m": 2160.0,
    "lat": 27.5745,
    "lon": 91.9854,
    "type": "BRIDGE_CROSSING",
    "corridor": "CORRIDOR_NH13",
    "isKeyStation": true
  },
  {
    "id": "Lhou",
    "name": "Lhou Valley Checkpost",
    "district": "Tawang",
    "state": "Arunachal Pradesh",
    "elevation_m": 2320.0,
    "lat": 27.5612,
    "lon": 91.9021,
    "type": "TRANSIT_POINT",
    "corridor": "CORRIDOR_NH13"
  },
  {
    "id": "Tawang",
    "name": "Tawang Civil Hospital & Frontier Depot",
    "district": "Tawang",
    "state": "Arunachal Pradesh",
    "elevation_m": 3048.0,
    "lat": 27.5861,
    "lon": 91.8594,
    "type": "FRONTIER_DESTINATION",
    "corridor": "CORRIDOR_NH13",
    "isKeyStation": true
  },
  {
    "id": "Dimapur",
    "name": "Dimapur Logistics Gateway & Railhead",
    "district": "Dimapur",
    "state": "Nagaland",
    "elevation_m": 145.0,
    "lat": 25.906,
    "lon": 93.727,
    "type": "SUPPLY_HUB",
    "corridor": "CORRIDOR_NH29",
    "isKeyStation": true
  },
  {
    "id": "Chumukedima",
    "name": "Chumukedima Foothill Base",
    "district": "Chumukedima",
    "state": "Nagaland",
    "elevation_m": 210.0,
    "lat": 25.82,
    "lon": 93.774,
    "type": "TRANSIT_HUB",
    "corridor": "CORRIDOR_NH29"
  },
  {
    "id": "Paglapahar",
    "name": "Paglapahar Gorge Landslide Zone",
    "district": "Chumukedima",
    "state": "Nagaland",
    "elevation_m": 420.0,
    "lat": 25.765,
    "lon": 93.842,
    "type": "HIGH_RISK_CHOKEPOINT",
    "corridor": "CORRIDOR_NH29",
    "isHazardZone": true,
    "isKeyStation": true
  },
  {
    "id": "Medziphema",
    "name": "Medziphema Staging Point",
    "district": "Chumukedima",
    "state": "Nagaland",
    "elevation_m": 310.0,
    "lat": 25.752,
    "lon": 93.865,
    "type": "TRANSIT_POINT",
    "corridor": "CORRIDOR_NH29"
  },
  {
    "id": "Zubza",
    "name": "Zubza Sinking Road Defile",
    "district": "Kohima",
    "state": "Nagaland",
    "elevation_m": 1120.0,
    "lat": 25.682,
    "lon": 94.025,
    "type": "CHOKEPOINT",
    "corridor": "CORRIDOR_NH29",
    "isHazardZone": true
  },
  {
    "id": "Kohima",
    "name": "Kohima Capital Transport Depot",
    "district": "Kohima",
    "state": "Nagaland",
    "elevation_m": 1444.0,
    "lat": 25.674,
    "lon": 94.108,
    "type": "DISTRICT_HQ",
    "corridor": "CORRIDOR_NH29",
    "isKeyStation": true
  },
  {
    "id": "MaoBorder",
    "name": "Mao Inter-State Gate (Nagaland-Manipur)",
    "district": "Senapati",
    "state": "Manipur",
    "elevation_m": 1780.0,
    "lat": 25.505,
    "lon": 94.142,
    "type": "BORDER_CHECKPOST",
    "corridor": "CORRIDOR_NH29",
    "isKeyStation": true
  },
  {
    "id": "Senapati",
    "name": "Senapati Supply Point",
    "district": "Senapati",
    "state": "Manipur",
    "elevation_m": 1050.0,
    "lat": 25.265,
    "lon": 94.015,
    "type": "SUB_DEPOT",
    "corridor": "CORRIDOR_NH29",
    "isKeyStation": true
  },
  {
    "id": "Kangpokpi",
    "name": "Kangpokpi Transit Hub",
    "district": "Kangpokpi",
    "state": "Manipur",
    "elevation_m": 980.0,
    "lat": 25.148,
    "lon": 93.972,
    "type": "TRANSIT_HUB",
    "corridor": "CORRIDOR_NH29"
  },
  {
    "id": "Imphal",
    "name": "Imphal Regional Hospital & Food Depot",
    "district": "Imphal West",
    "state": "Manipur",
    "elevation_m": 786.0,
    "lat": 24.817,
    "lon": 93.9368,
    "type": "FRONTIER_DESTINATION",
    "corridor": "CORRIDOR_NH29",
    "isKeyStation": true
  },
  {
    "id": "Siliguri",
    "name": "Siliguri North Bengal Logistics Hub",
    "district": "Darjeeling",
    "state": "West Bengal",
    "elevation_m": 122.0,
    "lat": 26.7271,
    "lon": 88.3953,
    "type": "SUPPLY_HUB",
    "corridor": "CORRIDOR_NH10",
    "isKeyStation": true
  },
  {
    "id": "Sevoke",
    "name": "Sevoke Coronation Bridge (Teesta River)",
    "district": "Darjeeling",
    "state": "West Bengal",
    "elevation_m": 180.0,
    "lat": 26.885,
    "lon": 88.472,
    "type": "BRIDGE_CROSSING",
    "corridor": "CORRIDOR_NH10",
    "isKeyStation": true
  },
  {
    "id": "TeestaBazaar",
    "name": "Teesta Bazaar Rockfall Zone",
    "district": "Kalimpong",
    "state": "West Bengal",
    "elevation_m": 220.0,
    "lat": 27.058,
    "lon": 88.435,
    "type": "HIGH_RISK_CHOKEPOINT",
    "corridor": "CORRIDOR_NH10",
    "isHazardZone": true,
    "isKeyStation": true
  },
  {
    "id": "Rangpo",
    "name": "Rangpo Border Checkpost (Sikkim Gate)",
    "district": "Pakyong",
    "state": "Sikkim",
    "elevation_m": 330.0,
    "lat": 27.176,
    "lon": 88.528,
    "type": "BORDER_CHECKPOST",
    "corridor": "CORRIDOR_NH10",
    "isKeyStation": true
  },
  {
    "id": "Singtam",
    "name": "Singtam Highway Junction",
    "district": "Gangtok",
    "state": "Sikkim",
    "elevation_m": 410.0,
    "lat": 27.234,
    "lon": 88.498,
    "type": "JUNCTION",
    "corridor": "CORRIDOR_NH10"
  },
  {
    "id": "Gangtok",
    "name": "Gangtok STNM Hospital & Supply Depot",
    "district": "Gangtok",
    "state": "Sikkim",
    "elevation_m": 1650.0,
    "lat": 27.3314,
    "lon": 88.6138,
    "type": "FRONTIER_DESTINATION",
    "corridor": "CORRIDOR_NH10",
    "isKeyStation": true
  },
  {
    "id": "Shillong",
    "name": "Shillong Central Civil Depot",
    "district": "East Khasi Hills",
    "state": "Meghalaya",
    "elevation_m": 1525.0,
    "lat": 25.5788,
    "lon": 91.8933,
    "type": "SUPPLY_HUB",
    "corridor": "CORRIDOR_NH6",
    "isKeyStation": true
  },
  {
    "id": "Jowai",
    "name": "Jowai District Transport Hub",
    "district": "West Jaintia Hills",
    "state": "Meghalaya",
    "elevation_m": 1380.0,
    "lat": 25.448,
    "lon": 92.202,
    "type": "TRANSIT_HUB",
    "corridor": "CORRIDOR_NH6",
    "isKeyStation": true
  },
  {
    "id": "Khliehriat",
    "name": "Khliehriat Mining Basin Chokepoint",
    "district": "East Jaintia Hills",
    "state": "Meghalaya",
    "elevation_m": 1200.0,
    "lat": 25.352,
    "lon": 92.365,
    "type": "TRANSIT_POINT",
    "corridor": "CORRIDOR_NH6"
  },
  {
    "id": "SonapurTunnel",
    "name": "Sonapur Mudflow Tunnel (NH-6)",
    "district": "East Jaintia Hills",
    "state": "Meghalaya",
    "elevation_m": 580.0,
    "lat": 25.125,
    "lon": 92.368,
    "type": "HIGH_RISK_CHOKEPOINT",
    "corridor": "CORRIDOR_NH6",
    "isHazardZone": true,
    "isKeyStation": true
  },
  {
    "id": "Badarpur",
    "name": "Badarpur Rail & Road Junction",
    "district": "Karimganj",
    "state": "Assam",
    "elevation_m": 42.0,
    "lat": 24.901,
    "lon": 92.585,
    "type": "JUNCTION",
    "corridor": "CORRIDOR_NH6"
  },
  {
    "id": "Silchar",
    "name": "Silchar Barak Valley Supply Depot",
    "district": "Cachar",
    "state": "Assam",
    "elevation_m": 35.0,
    "lat": 24.8333,
    "lon": 92.7789,
    "type": "SUPPLY_BASE",
    "corridor": "CORRIDOR_NH6",
    "isKeyStation": true
  },
  {
    "id": "Dharmanagar",
    "name": "Dharmanagar North Gate",
    "district": "North Tripura",
    "state": "Tripura",
    "elevation_m": 48.0,
    "lat": 24.375,
    "lon": 92.165,
    "type": "TRANSIT_HUB",
    "corridor": "CORRIDOR_NH6",
    "isKeyStation": true
  },
  {
    "id": "Agartala",
    "name": "Agartala State Depot & GB Pant Hospital",
    "district": "West Tripura",
    "state": "Tripura",
    "elevation_m": 30.0,
    "lat": 23.8315,
    "lon": 91.2868,
    "type": "FRONTIER_DESTINATION",
    "corridor": "CORRIDOR_NH6",
    "isKeyStation": true
  }
];

export const LANDSLIDE_PREDICTION_ZONES = [
  {
    "id": "HAZ_01",
    "name": "Sessa Scree Slide Belt (NH-13 km 114)",
    "corridor": "CORRIDOR_NH13",
    "lat": 27.0984,
    "lon": 92.5342,
    "probability_pct": 84,
    "hazard_level": "SEVERE",
    "trigger_cause": "High Slope (38.5\u00b0) + 55mm Antecedent Rain + Sheared Phyllite",
    "srtm_slope_deg": 38.5,
    "elevation_m": 1100,
    "gsi_historical_slides": 11,
    "forecast_48h": "Extreme Slide Risk (Rainfall > 70mm forecasted)",
    "recommendation": "DIVERT TO BRO KALAKTANG BYPASS"
  },
  {
    "id": "HAZ_02",
    "name": "Bhalukpong River Gorge (NH-13 km 88)",
    "corridor": "CORRIDOR_NH13",
    "lat": 27.0289,
    "lon": 92.631,
    "probability_pct": 58,
    "hazard_level": "MODERATE",
    "trigger_cause": "Kameng River Toe Erosion + Siwalik Sandstone Scouring",
    "srtm_slope_deg": 26.8,
    "elevation_m": 360,
    "gsi_historical_slides": 4,
    "forecast_48h": "Intermittent Mudflows during heavy downpours",
    "recommendation": "ESCORT HEAVY VEHICLES"
  },
  {
    "id": "HAZ_03",
    "name": "Kaspi River Defile Chokepoint (NH-13 km 142)",
    "corridor": "CORRIDOR_NH13",
    "lat": 27.2014,
    "lon": 92.4412,
    "probability_pct": 62,
    "hazard_level": "HIGH",
    "trigger_cause": "River flash flood scouring road foundation",
    "srtm_slope_deg": 29.4,
    "elevation_m": 1350,
    "gsi_historical_slides": 5,
    "forecast_48h": "Waterlogging & Road subsidence warning",
    "recommendation": "SPEED RESTRICTION 20 KM/H"
  },
  {
    "id": "HAZ_04",
    "name": "Sela Alpine Pass Scree (NH-13 km 285)",
    "corridor": "CORRIDOR_NH13",
    "lat": 27.5034,
    "lon": 92.1039,
    "probability_pct": 76,
    "hazard_level": "HIGH",
    "trigger_cause": "Freeze-Thaw Rock Splitting + Glacial Moraine Thaw",
    "srtm_slope_deg": 36.5,
    "elevation_m": 3733,
    "gsi_historical_slides": 8,
    "forecast_48h": "Snow-slush & Icing risk on summit switchbacks",
    "recommendation": "UTILIZE SELA TUNNEL BYPASS"
  },
  {
    "id": "HAZ_05",
    "name": "Paglapahar Gorge Mudslide Chokepoint (NH-29 km 32)",
    "corridor": "CORRIDOR_NH29",
    "lat": 25.765,
    "lon": 93.842,
    "probability_pct": 88,
    "hazard_level": "SEVERE",
    "trigger_cause": "Barail Sandstone Shear Failures + Chathe River Scouring",
    "srtm_slope_deg": 42.0,
    "elevation_m": 420,
    "gsi_historical_slides": 14,
    "forecast_48h": "Imminent rockfall risk during 48h rain event",
    "recommendation": "HALT MULTI-AXLE VEHICLES AT CHUMUKEDIMA"
  },
  {
    "id": "HAZ_06",
    "name": "Teesta Bazaar Rockfall Zone (NH-10 km 48)",
    "corridor": "CORRIDOR_NH10",
    "lat": 27.058,
    "lon": 88.435,
    "probability_pct": 85,
    "hazard_level": "SEVERE",
    "trigger_cause": "Teesta River Spate + Daling Phyllite Cliff Collapse",
    "srtm_slope_deg": 44.0,
    "elevation_m": 220,
    "gsi_historical_slides": 16,
    "forecast_48h": "High probability of complete corridor severance",
    "recommendation": "DIVERT GANGTOK TRAFFIC VIA LAVA-ALGARAH"
  },
  {
    "id": "HAZ_07",
    "name": "Sonapur Mudflow Tunnel Chokepoint (NH-6 km 142)",
    "corridor": "CORRIDOR_NH6",
    "lat": 25.125,
    "lon": 92.368,
    "probability_pct": 92,
    "hazard_level": "SEVERE",
    "trigger_cause": "Extreme Jaintia Monsoon (61mm) + Massive Coal Mine Siltation",
    "srtm_slope_deg": 46.0,
    "elevation_m": 580,
    "gsi_historical_slides": 18,
    "forecast_48h": "Debris blockage expected at tunnel mouth",
    "recommendation": "DEPLOY BRO PROJECT PUSHPAK HEAVY DOZERS"
  }
];

export const DEFAULT_SEGMENTS = [
  {
    "id": "SEG_01",
    "name": "Guwahati -> Mangaldai (NH-15)",
    "corridor": "CORRIDOR_NH13",
    "source": "Guwahati",
    "target": "Mangaldai",
    "distance_km": 68.0,
    "base_speed_kmh": 65.0,
    "district": "Kamrup Metro / Darrang",
    "risk_score": 0.12,
    "risk_level": "LOW",
    "is_blocked": false,
    "geotechnical": {
      "slope_deg": 3.2,
      "elevation_m": 60.0,
      "gsi_landslide_history": 0,
      "rainfall_intensity_mm": 18.0,
      "rock_formation": "Alluvial Floodplain"
    },
    "coordinates": [
      [
        26.1445,
        91.7362
      ],
      [
        26.15855,
        91.74916
      ],
      [
        26.16775,
        91.7665
      ],
      [
        26.18535,
        91.77626
      ],
      [
        26.19325,
        91.79476
      ],
      [
        26.20955,
        91.80569
      ],
      [
        26.221,
        91.821
      ],
      [
        26.22952,
        91.83372
      ],
      [
        26.24301,
        91.8422
      ],
      [
        26.24788,
        91.85802
      ],
      [
        26.26271,
        91.86537
      ],
      [
        26.26892,
        91.88005
      ],
      [
        26.2801,
        91.8905
      ],
      [
        26.29708,
        91.90328
      ],
      [
        26.30972,
        91.92093
      ],
      [
        26.32988,
        91.93014
      ],
      [
        26.34135,
        91.9491
      ],
      [
        26.36035,
        91.95961
      ],
      [
        26.375,
        91.975
      ],
      [
        26.38438,
        91.98633
      ],
      [
        26.39826,
        91.99294
      ],
      [
        26.40434,
        92.00774
      ],
      [
        26.41942,
        92.01307
      ],
      [
        26.42671,
        92.0266
      ],
      [
        26.4385,
        92.0354
      ]
    ]
  },
  {
    "id": "SEG_02",
    "name": "Mangaldai -> Tezpur (NH-15)",
    "corridor": "CORRIDOR_NH13",
    "source": "Mangaldai",
    "target": "Tezpur",
    "distance_km": 84.0,
    "base_speed_kmh": 60.0,
    "district": "Darrang / Sonitpur",
    "risk_score": 0.14,
    "risk_level": "LOW",
    "is_blocked": false,
    "geotechnical": {
      "slope_deg": 4.1,
      "elevation_m": 72.0,
      "gsi_landslide_history": 0,
      "rainfall_intensity_mm": 22.0,
      "rock_formation": "Alluvial Floodplain"
    },
    "coordinates": [
      [
        26.4385,
        92.0354
      ],
      [
        26.44794,
        92.06489
      ],
      [
        26.45107,
        92.09603
      ],
      [
        26.46514,
        92.12432
      ],
      [
        26.46657,
        92.15589
      ],
      [
        26.47894,
        92.18463
      ],
      [
        26.485,
        92.215
      ],
      [
        26.49268,
        92.2484
      ],
      [
        26.50665,
        92.28
      ],
      [
        26.50973,
        92.31471
      ],
      [
        26.52538,
        92.34584
      ],
      [
        26.53015,
        92.38006
      ],
      [
        26.5412,
        92.4125
      ],
      [
        26.55302,
        92.44744
      ],
      [
        26.55855,
        92.48417
      ],
      [
        26.57496,
        92.51779
      ],
      [
        26.57882,
        92.555
      ],
      [
        26.59355,
        92.5891
      ],
      [
        26.602,
        92.625
      ],
      [
        26.60879,
        92.65344
      ],
      [
        26.62183,
        92.67999
      ],
      [
        26.62405,
        92.70982
      ],
      [
        26.63877,
        92.73585
      ],
      [
        26.64266,
        92.76517
      ],
      [
        26.6528,
        92.7926
      ]
    ]
  },
  {
    "id": "SEG_03",
    "name": "Tezpur -> Balipara Junction (NH-13)",
    "corridor": "CORRIDOR_NH13",
    "source": "Tezpur",
    "target": "Balipara",
    "distance_km": 22.0,
    "base_speed_kmh": 55.0,
    "district": "Sonitpur",
    "risk_score": 0.16,
    "risk_level": "LOW",
    "is_blocked": false,
    "geotechnical": {
      "slope_deg": 5.0,
      "elevation_m": 85.0,
      "gsi_landslide_history": 0,
      "rainfall_intensity_mm": 24.0,
      "rock_formation": "Tertiary Piedmont"
    },
    "coordinates": [
      [
        26.6528,
        92.7926
      ],
      [
        26.66283,
        92.79176
      ],
      [
        26.67226,
        92.79742
      ],
      [
        26.68272,
        92.79181
      ],
      [
        26.69199,
        92.79922
      ],
      [
        26.70229,
        92.79536
      ],
      [
        26.712,
        92.798
      ],
      [
        26.72051,
        92.80139
      ],
      [
        26.73023,
        92.79835
      ],
      [
        26.73785,
        92.80644
      ],
      [
        26.7479,
        92.80169
      ],
      [
        26.75584,
        92.80805
      ],
      [
        26.765,
        92.808
      ],
      [
        26.77449,
        92.80699
      ],
      [
        26.78346,
        92.81249
      ],
      [
        26.79332,
        92.80671
      ],
      [
        26.80216,
        92.81396
      ],
      [
        26.81189,
        92.80992
      ],
      [
        26.8211,
        92.8124
      ]
    ]
  },
  {
    "id": "SEG_04",
    "name": "Balipara -> Bhalukpong Border (NH-13)",
    "corridor": "CORRIDOR_NH13",
    "source": "Balipara",
    "target": "Bhalukpong",
    "distance_km": 34.0,
    "base_speed_kmh": 45.0,
    "district": "Sonitpur / West Kameng",
    "risk_score": 0.38,
    "risk_level": "MODERATE",
    "is_blocked": false,
    "geotechnical": {
      "slope_deg": 14.5,
      "elevation_m": 215.0,
      "gsi_landslide_history": 2,
      "rainfall_intensity_mm": 35.0,
      "rock_formation": "Siwalik Sandstone"
    },
    "coordinates": [
      [
        26.8211,
        92.8124
      ],
      [
        26.82839,
        92.80322
      ],
      [
        26.84013,
        92.79882
      ],
      [
        26.84416,
        92.78614
      ],
      [
        26.8571,
        92.78302
      ],
      [
        26.86232,
        92.77162
      ],
      [
        26.872,
        92.765
      ],
      [
        26.88207,
        92.7574
      ],
      [
        26.88752,
        92.74519
      ],
      [
        26.90097,
        92.74097
      ],
      [
        26.90519,
        92.72752
      ],
      [
        26.9174,
        92.72207
      ],
      [
        26.925,
        92.712
      ],
      [
        26.93235,
        92.70489
      ],
      [
        26.94337,
        92.70317
      ],
      [
        26.94803,
        92.69211
      ],
      [
        26.96004,
        92.69184
      ],
      [
        26.96568,
        92.68222
      ],
      [
        26.975,
        92.678
      ],
      [
        26.98226,
        92.67499
      ],
      [
        26.98575,
        92.66666
      ],
      [
        26.99577,
        92.66755
      ],
      [
        26.99825,
        92.65779
      ],
      [
        27.00726,
        92.65726
      ],
      [
        27.0125,
        92.6514
      ]
    ]
  },
  {
    "id": "SEG_05",
    "name": "Bhalukpong -> Tippi Orchid Gorge (NH-13)",
    "corridor": "CORRIDOR_NH13",
    "source": "Bhalukpong",
    "target": "Tippi",
    "distance_km": 14.0,
    "base_speed_kmh": 38.0,
    "district": "West Kameng",
    "risk_score": 0.54,
    "risk_level": "MODERATE",
    "is_blocked": false,
    "geotechnical": {
      "slope_deg": 22.0,
      "elevation_m": 360.0,
      "gsi_landslide_history": 3,
      "rainfall_intensity_mm": 40.0,
      "rock_formation": "Kameng Defile Schist"
    },
    "coordinates": [
      [
        27.0125,
        92.6514
      ],
      [
        27.01247,
        92.64834
      ],
      [
        27.01783,
        92.64898
      ],
      [
        27.01386,
        92.64322
      ],
      [
        27.02067,
        92.64485
      ],
      [
        27.01814,
        92.64008
      ],
      [
        27.021,
        92.639
      ],
      [
        27.02356,
        92.6389
      ],
      [
        27.02148,
        92.6342
      ],
      [
        27.02744,
        92.63746
      ],
      [
        27.02411,
        92.63154
      ],
      [
        27.02883,
        92.63356
      ],
      [
        27.0289,
        92.631
      ],
      [
        27.02847,
        92.62852
      ],
      [
        27.03344,
        92.6297
      ],
      [
        27.02905,
        92.62454
      ],
      [
        27.03548,
        92.6267
      ],
      [
        27.03253,
        92.62252
      ],
      [
        27.035,
        92.622
      ],
      [
        27.03767,
        92.621
      ],
      [
        27.03479,
        92.61657
      ],
      [
        27.04153,
        92.61809
      ],
      [
        27.03715,
        92.61274
      ],
      [
        27.04241,
        92.61334
      ],
      [
        27.0421,
        92.6105
      ]
    ]
  },
  {
    "id": "SEG_06",
    "name": "Tippi -> Sessa Scree Belt (NH-13)",
    "corridor": "CORRIDOR_NH13",
    "source": "Tippi",
    "target": "Sessa",
    "distance_km": 18.0,
    "base_speed_kmh": 32.0,
    "district": "West Kameng",
    "risk_score": 0.84,
    "risk_level": "CRITICAL",
    "is_blocked": false,
    "geotechnical": {
      "slope_deg": 38.5,
      "elevation_m": 1100.0,
      "gsi_landslide_history": 11,
      "rainfall_intensity_mm": 55.0,
      "rock_formation": "Sheared Phyllite & Scree"
    },
    "coordinates": [
      [
        27.0421,
        92.6105
      ],
      [
        27.04342,
        92.60628
      ],
      [
        27.0497,
        92.60631
      ],
      [
        27.0474,
        92.59897
      ],
      [
        27.055,
        92.60014
      ],
      [
        27.05402,
        92.59394
      ],
      [
        27.058,
        92.592
      ],
      [
        27.06179,
        92.58947
      ],
      [
        27.06014,
        92.58332
      ],
      [
        27.06791,
        92.58344
      ],
      [
        27.06481,
        92.57632
      ],
      [
        27.07112,
        92.57547
      ],
      [
        27.072,
        92.571
      ],
      [
        27.0729,
        92.56666
      ],
      [
        27.07915,
        92.56607
      ],
      [
        27.07613,
        92.55899
      ],
      [
        27.08382,
        92.5594
      ],
      [
        27.08223,
        92.55333
      ],
      [
        27.086,
        92.551
      ],
      [
        27.08947,
        92.54924
      ],
      [
        27.08769,
        92.5436
      ],
      [
        27.09502,
        92.54468
      ],
      [
        27.09183,
        92.538
      ],
      [
        27.09774,
        92.53804
      ],
      [
        27.0984,
        92.5342
      ]
    ]
  },
  {
    "id": "SEG_07",
    "name": "Sessa -> Nag Mandir Mountain Cut (NH-13)",
    "corridor": "CORRIDOR_NH13",
    "source": "Sessa",
    "target": "NagMandir",
    "distance_km": 16.0,
    "base_speed_kmh": 28.0,
    "district": "West Kameng",
    "risk_score": 0.68,
    "risk_level": "HIGH",
    "is_blocked": false,
    "geotechnical": {
      "slope_deg": 34.2,
      "elevation_m": 1820.0,
      "gsi_landslide_history": 8,
      "rainfall_intensity_mm": 48.0,
      "rock_formation": "Carbonaceous Shale"
    },
    "coordinates": [
      [
        27.0984,
        92.5342
      ],
      [
        27.10055,
        92.53015
      ],
      [
        27.10686,
        92.53114
      ],
      [
        27.10597,
        92.5234
      ],
      [
        27.1134,
        92.52574
      ],
      [
        27.11362,
        92.51935
      ],
      [
        27.118,
        92.518
      ],
      [
        27.12203,
        92.51661
      ],
      [
        27.12159,
        92.51046
      ],
      [
        27.1289,
        92.51255
      ],
      [
        27.12726,
        92.50513
      ],
      [
        27.13337,
        92.50594
      ],
      [
        27.135,
        92.502
      ],
      [
        27.13656,
        92.49848
      ],
      [
        27.14224,
        92.50002
      ],
      [
        27.14079,
        92.49278
      ],
      [
        27.14758,
        92.49569
      ],
      [
        27.14723,
        92.48981
      ],
      [
        27.151,
        92.489
      ],
      [
        27.15405,
        92.48862
      ],
      [
        27.15275,
        92.48337
      ],
      [
        27.15898,
        92.48656
      ],
      [
        27.15651,
        92.48001
      ],
      [
        27.16158,
        92.48189
      ],
      [
        27.1623,
        92.4789
      ]
    ]
  },
  {
    "id": "SEG_08",
    "name": "Nag Mandir -> Kaspi River Defile (NH-13)",
    "corridor": "CORRIDOR_NH13",
    "source": "NagMandir",
    "target": "Kaspi",
    "distance_km": 12.0,
    "base_speed_kmh": 30.0,
    "district": "West Kameng",
    "risk_score": 0.62,
    "risk_level": "HIGH",
    "is_blocked": false,
    "geotechnical": {
      "slope_deg": 29.4,
      "elevation_m": 1350.0,
      "gsi_landslide_history": 5,
      "rainfall_intensity_mm": 42.0,
      "rock_formation": "Crushed Quartzite"
    },
    "coordinates": [
      [
        27.1623,
        92.4789
      ],
      [
        27.16306,
        92.4758
      ],
      [
        27.16827,
        92.47748
      ],
      [
        27.16576,
        92.47089
      ],
      [
        27.17217,
        92.47385
      ],
      [
        27.17086,
        92.46854
      ],
      [
        27.174,
        92.468
      ],
      [
        27.17729,
        92.46702
      ],
      [
        27.17577,
        92.46161
      ],
      [
        27.18257,
        92.46387
      ],
      [
        27.17977,
        92.45728
      ],
      [
        27.18529,
        92.45835
      ],
      [
        27.186,
        92.455
      ],
      [
        27.1874,
        92.4514
      ],
      [
        27.19316,
        92.45266
      ],
      [
        27.19136,
        92.44549
      ],
      [
        27.19829,
        92.44806
      ],
      [
        27.19767,
        92.4422
      ],
      [
        27.2014,
        92.4412
      ]
    ]
  },
  {
    "id": "SEG_09",
    "name": "Kaspi -> Tengapani -> Bomdila HQ (NH-13)",
    "corridor": "CORRIDOR_NH13",
    "source": "Kaspi",
    "target": "Bomdila",
    "distance_km": 25.0,
    "base_speed_kmh": 32.0,
    "district": "West Kameng",
    "risk_score": 0.45,
    "risk_level": "MODERATE",
    "is_blocked": false,
    "geotechnical": {
      "slope_deg": 24.1,
      "elevation_m": 2415.0,
      "gsi_landslide_history": 3,
      "rainfall_intensity_mm": 32.0,
      "rock_formation": "Bomdila Gneissic Complex"
    },
    "coordinates": [
      [
        27.2014,
        92.4412
      ],
      [
        27.20325,
        92.43801
      ],
      [
        27.20852,
        92.44038
      ],
      [
        27.20787,
        92.43312
      ],
      [
        27.21405,
        92.43698
      ],
      [
        27.21432,
        92.43121
      ],
      [
        27.218,
        92.431
      ],
      [
        27.22097,
        92.43074
      ],
      [
        27.21964,
        92.42555
      ],
      [
        27.22575,
        92.42889
      ],
      [
        27.22328,
        92.42238
      ],
      [
        27.22823,
        92.4244
      ],
      [
        27.2289,
        92.4215
      ],
      [
        27.23217,
        92.41992
      ],
      [
        27.23511,
        92.42486
      ],
      [
        27.23863,
        92.4185
      ],
      [
        27.24147,
        92.42519
      ],
      [
        27.24491,
        92.42059
      ],
      [
        27.248,
        92.4225
      ],
      [
        27.25056,
        92.42451
      ],
      [
        27.25376,
        92.42002
      ],
      [
        27.25586,
        92.42678
      ],
      [
        27.25923,
        92.42055
      ],
      [
        27.2615,
        92.42558
      ],
      [
        27.2644,
        92.4241
      ]
    ]
  },
  {
    "id": "SEG_10",
    "name": "Bomdila -> Munna Camp (NH-13)",
    "corridor": "CORRIDOR_NH13",
    "source": "Bomdila",
    "target": "MunnaCamp",
    "distance_km": 15.0,
    "base_speed_kmh": 30.0,
    "district": "West Kameng",
    "risk_score": 0.42,
    "risk_level": "MODERATE",
    "is_blocked": false,
    "geotechnical": {
      "slope_deg": 22.5,
      "elevation_m": 2210.0,
      "gsi_landslide_history": 2,
      "rainfall_intensity_mm": 28.0,
      "rock_formation": "Gneissic Bedrock"
    },
    "coordinates": [
      [
        27.2644,
        92.4241
      ],
      [
        27.26569,
        92.41881
      ],
      [
        27.27249,
        92.41703
      ],
      [
        27.26975,
        92.40917
      ],
      [
        27.27802,
        92.40833
      ],
      [
        27.27676,
        92.40141
      ],
      [
        27.281,
        92.398
      ],
      [
        27.28477,
        92.39567
      ],
      [
        27.28318,
        92.3896
      ],
      [
        27.29087,
        92.39001
      ],
      [
        27.28785,
        92.38293
      ],
      [
        27.2941,
        92.38234
      ],
      [
        27.295,
        92.378
      ],
      [
        27.2963,
        92.37332
      ],
      [
        27.30283,
        92.37254
      ],
      [
        27.30029,
        92.36501
      ],
      [
        27.30823,
        92.36527
      ],
      [
        27.3071,
        92.35879
      ],
      [
        27.3112,
        92.3562
      ]
    ]
  },
  {
    "id": "SEG_11",
    "name": "Munna Camp -> Dirang Sub-Depot (NH-13)",
    "corridor": "CORRIDOR_NH13",
    "source": "MunnaCamp",
    "target": "Dirang",
    "distance_km": 28.0,
    "base_speed_kmh": 35.0,
    "district": "West Kameng",
    "risk_score": 0.35,
    "risk_level": "MODERATE",
    "is_blocked": false,
    "geotechnical": {
      "slope_deg": 19.8,
      "elevation_m": 1560.0,
      "gsi_landslide_history": 2,
      "rainfall_intensity_mm": 25.0,
      "rock_formation": "Dirang Schist"
    },
    "coordinates": [
      [
        27.3112,
        92.3562
      ],
      [
        27.31238,
        92.34867
      ],
      [
        27.31961,
        92.34361
      ],
      [
        27.31636,
        92.33428
      ],
      [
        27.32521,
        92.32988
      ],
      [
        27.32358,
        92.32121
      ],
      [
        27.328,
        92.315
      ],
      [
        27.33197,
        92.30945
      ],
      [
        27.32983,
        92.30159
      ],
      [
        27.33827,
        92.29774
      ],
      [
        27.3345,
        92.28926
      ],
      [
        27.3413,
        92.28479
      ],
      [
        27.342,
        92.278
      ],
      [
        27.34301,
        92.2709
      ],
      [
        27.35007,
        92.26628
      ],
      [
        27.34666,
        92.25737
      ],
      [
        27.35534,
        92.25341
      ],
      [
        27.35355,
        92.24517
      ],
      [
        27.3578,
        92.2394
      ]
    ]
  },
  {
    "id": "SEG_12",
    "name": "Dirang -> Sela Pass Alpine Summit (NH-13)",
    "corridor": "CORRIDOR_NH13",
    "source": "Dirang",
    "target": "SelaPass",
    "distance_km": 42.0,
    "base_speed_kmh": 24.0,
    "district": "West Kameng / Tawang",
    "risk_score": 0.76,
    "risk_level": "HIGH",
    "is_blocked": false,
    "geotechnical": {
      "slope_deg": 36.5,
      "elevation_m": 3733.0,
      "gsi_landslide_history": 8,
      "rainfall_intensity_mm": 56.5,
      "rock_formation": "Glacial Moraine & High Altitude Scree"
    },
    "coordinates": [
      [
        27.3578,
        92.2394
      ],
      [
        27.3622,
        92.23334
      ],
      [
        27.37084,
        92.23224
      ],
      [
        27.37212,
        92.22254
      ],
      [
        27.3819,
        92.22277
      ],
      [
        27.38433,
        92.2144
      ],
      [
        27.391,
        92.211
      ],
      [
        27.39721,
        92.20804
      ],
      [
        27.39921,
        92.20009
      ],
      [
        27.40851,
        92.20077
      ],
      [
        27.40938,
        92.19149
      ],
      [
        27.41755,
        92.19084
      ],
      [
        27.4215,
        92.1852
      ],
      [
        27.42528,
        92.17834
      ],
      [
        27.43393,
        92.17582
      ],
      [
        27.43414,
        92.16577
      ],
      [
        27.4441,
        92.16442
      ],
      [
        27.44561,
        92.15554
      ],
      [
        27.452,
        92.151
      ],
      [
        27.45674,
        92.14764
      ],
      [
        27.45629,
        92.14033
      ],
      [
        27.46484,
        92.13987
      ],
      [
        27.46299,
        92.1315
      ],
      [
        27.47014,
        92.12997
      ],
      [
        27.4721,
        92.1245
      ],
      [
        27.47428,
        92.12096
      ],
      [
        27.48007,
        92.12286
      ],
      [
        27.47962,
        92.11533
      ],
      [
        27.48637,
        92.11869
      ],
      [
        27.48688,
        92.11262
      ],
      [
        27.491,
        92.112
      ],
      [
        27.49402,
        92.11212
      ],
      [
        27.49348,
        92.10676
      ],
      [
        27.49911,
        92.11088
      ],
      [
        27.49761,
        92.10406
      ],
      [
        27.50229,
        92.10672
      ],
      [
        27.5034,
        92.1039
      ]
    ]
  },
  {
    "id": "SEG_13",
    "name": "Sela Pass -> Jaswant Garh (NH-13)",
    "corridor": "CORRIDOR_NH13",
    "source": "SelaPass",
    "target": "JaswantGarh",
    "distance_km": 16.0,
    "base_speed_kmh": 26.0,
    "district": "Tawang",
    "risk_score": 0.48,
    "risk_level": "MODERATE",
    "is_blocked": false,
    "geotechnical": {
      "slope_deg": 28.4,
      "elevation_m": 3050.0,
      "gsi_landslide_history": 4,
      "rainfall_intensity_mm": 38.0,
      "rock_formation": "Gneissic Bedrock"
    },
    "coordinates": [
      [
        27.5034,
        92.1039
      ],
      [
        27.50364,
        92.09989
      ],
      [
        27.50958,
        92.09908
      ],
      [
        27.50565,
        92.09274
      ],
      [
        27.51311,
        92.09278
      ],
      [
        27.51071,
        92.08729
      ],
      [
        27.514,
        92.085
      ],
      [
        27.51692,
        92.08291
      ],
      [
        27.51392,
        92.07804
      ],
      [
        27.52117,
        92.07799
      ],
      [
        27.51659,
        92.07238
      ],
      [
        27.52225,
        92.07158
      ],
      [
        27.522,
        92.068
      ],
      [
        27.522,
        92.06439
      ],
      [
        27.52772,
        92.06394
      ],
      [
        27.52354,
        92.058
      ],
      [
        27.53078,
        92.0584
      ],
      [
        27.52814,
        92.05332
      ],
      [
        27.5312,
        92.0514
      ]
    ]
  },
  {
    "id": "SEG_14",
    "name": "Jaswant Garh -> Jang Bridge & Falls (NH-13)",
    "corridor": "CORRIDOR_NH13",
    "source": "JaswantGarh",
    "target": "Jang",
    "distance_km": 24.0,
    "base_speed_kmh": 30.0,
    "district": "Tawang",
    "risk_score": 0.52,
    "risk_level": "MODERATE",
    "is_blocked": false,
    "geotechnical": {
      "slope_deg": 25.0,
      "elevation_m": 2160.0,
      "gsi_landslide_history": 5,
      "rainfall_intensity_mm": 44.0,
      "rock_formation": "Torrential River Gorge Escarpment"
    },
    "coordinates": [
      [
        27.5312,
        92.0514
      ],
      [
        27.53205,
        92.04702
      ],
      [
        27.53831,
        92.0463
      ],
      [
        27.5352,
        92.03924
      ],
      [
        27.54291,
        92.0395
      ],
      [
        27.54125,
        92.03342
      ],
      [
        27.545,
        92.031
      ],
      [
        27.5491,
        92.02817
      ],
      [
        27.54785,
        92.0216
      ],
      [
        27.55587,
        92.0215
      ],
      [
        27.55318,
        92.01394
      ],
      [
        27.55977,
        92.01283
      ],
      [
        27.561,
        92.008
      ],
      [
        27.56175,
        92.00334
      ],
      [
        27.5681,
        92.00202
      ],
      [
        27.56475,
        91.99491
      ],
      [
        27.5726,
        91.99449
      ],
      [
        27.57075,
        91.98827
      ],
      [
        27.5745,
        91.9854
      ]
    ]
  },
  {
    "id": "SEG_15",
    "name": "Jang -> Lhou -> Tawang Civil Hospital (NH-13)",
    "corridor": "CORRIDOR_NH13",
    "source": "Jang",
    "target": "Tawang",
    "distance_km": 34.0,
    "base_speed_kmh": 32.0,
    "district": "Tawang",
    "risk_score": 0.35,
    "risk_level": "MODERATE",
    "is_blocked": false,
    "geotechnical": {
      "slope_deg": 21.8,
      "elevation_m": 3048.0,
      "gsi_landslide_history": 2,
      "rainfall_intensity_mm": 30.0,
      "rock_formation": "Tawang Metamorphic Formation"
    },
    "coordinates": [
      [
        27.5745,
        91.9854
      ],
      [
        27.57169,
        91.97894
      ],
      [
        27.57533,
        91.97145
      ],
      [
        27.56779,
        91.96576
      ],
      [
        27.57316,
        91.95799
      ],
      [
        27.56736,
        91.95201
      ],
      [
        27.568,
        91.945
      ],
      [
        27.5686,
        91.93758
      ],
      [
        27.56274,
        91.93117
      ],
      [
        27.56806,
        91.923
      ],
      [
        27.56047,
        91.91687
      ],
      [
        27.56406,
        91.90898
      ],
      [
        27.5612,
        91.9021
      ],
      [
        27.562,
        91.89735
      ],
      [
        27.5684,
        91.89595
      ],
      [
        27.5651,
        91.88876
      ],
      [
        27.573,
        91.88825
      ],
      [
        27.5712,
        91.88195
      ],
      [
        27.575,
        91.879
      ],
      [
        27.57837,
        91.8766
      ],
      [
        27.57606,
        91.87097
      ],
      [
        27.5836,
        91.87092
      ],
      [
        27.57976,
        91.86444
      ],
      [
        27.58577,
        91.86353
      ],
      [
        27.5861,
        91.8594
      ]
    ]
  },
  {
    "id": "SEG_ALT_01",
    "name": "Balipara -> Orang Junction",
    "corridor": "CORRIDOR_NH13_BYPASS",
    "source": "Balipara",
    "target": "Orang",
    "distance_km": 42.0,
    "base_speed_kmh": 60.0,
    "district": "Sonitpur / Darrang",
    "risk_score": 0.12,
    "risk_level": "LOW",
    "is_blocked": false,
    "geotechnical": {
      "slope_deg": 3.8,
      "elevation_m": 72.0,
      "gsi_landslide_history": 0,
      "rainfall_intensity_mm": 20.0,
      "rock_formation": "Alluvium"
    },
    "coordinates": [
      [
        26.8211,
        92.8124
      ],
      [
        26.81173,
        92.78598
      ],
      [
        26.80865,
        92.75777
      ],
      [
        26.79468,
        92.73266
      ],
      [
        26.79328,
        92.70397
      ],
      [
        26.781,
        92.67838
      ],
      [
        26.775,
        92.651
      ],
      [
        26.76766,
        92.62279
      ],
      [
        26.75412,
        92.5966
      ],
      [
        26.75133,
        92.56692
      ],
      [
        26.73612,
        92.54127
      ],
      [
        26.73166,
        92.51213
      ],
      [
        26.721,
        92.485
      ],
      [
        26.71322,
        92.46162
      ],
      [
        26.71177,
        92.43662
      ],
      [
        26.69936,
        92.41442
      ],
      [
        26.6996,
        92.38898
      ],
      [
        26.68889,
        92.36635
      ],
      [
        26.6845,
        92.3421
      ]
    ]
  },
  {
    "id": "SEG_ALT_02",
    "name": "Orang -> Bhairabkunda Tri-Junction",
    "corridor": "CORRIDOR_NH13_BYPASS",
    "source": "Orang",
    "target": "Bhairabkunda",
    "distance_km": 36.0,
    "base_speed_kmh": 50.0,
    "district": "Udalguri",
    "risk_score": 0.15,
    "risk_level": "LOW",
    "is_blocked": false,
    "geotechnical": {
      "slope_deg": 7.2,
      "elevation_m": 190.0,
      "gsi_landslide_history": 0,
      "rainfall_intensity_mm": 25.0,
      "rock_formation": "Bouldery Piedmont"
    },
    "coordinates": [
      [
        26.6845,
        92.3421
      ],
      [
        26.69496,
        92.32807
      ],
      [
        26.71024,
        92.31845
      ],
      [
        26.71717,
        92.30119
      ],
      [
        26.73374,
        92.29275
      ],
      [
        26.74196,
        92.27667
      ],
      [
        26.755,
        92.265
      ],
      [
        26.76909,
        92.25288
      ],
      [
        26.77848,
        92.23623
      ],
      [
        26.79602,
        92.22743
      ],
      [
        26.80415,
        92.20956
      ],
      [
        26.82043,
        92.19955
      ],
      [
        26.832,
        92.185
      ],
      [
        26.84249,
        92.17216
      ],
      [
        26.85757,
        92.16395
      ],
      [
        26.86469,
        92.14771
      ],
      [
        26.881,
        92.14075
      ],
      [
        26.88935,
        92.12576
      ],
      [
        26.9023,
        92.1154
      ]
    ]
  },
  {
    "id": "SEG_ALT_03",
    "name": "Bhairabkunda -> Kalaktang BRO Staging Post",
    "corridor": "CORRIDOR_NH13_BYPASS",
    "source": "Bhairabkunda",
    "target": "Kalaktang",
    "distance_km": 38.0,
    "base_speed_kmh": 40.0,
    "district": "Udalguri / West Kameng",
    "risk_score": 0.22,
    "risk_level": "LOW",
    "is_blocked": false,
    "geotechnical": {
      "slope_deg": 14.5,
      "elevation_m": 1150.0,
      "gsi_landslide_history": 1,
      "rainfall_intensity_mm": 28.0,
      "rock_formation": "Granite & Stable Gneiss"
    },
    "coordinates": [
      [
        26.9023,
        92.1154
      ],
      [
        26.91426,
        92.11259
      ],
      [
        26.9268,
        92.11629
      ],
      [
        26.93834,
        92.10871
      ],
      [
        26.95103,
        92.11415
      ],
      [
        26.96273,
        92.10832
      ],
      [
        26.975,
        92.109
      ],
      [
        26.98792,
        92.11008
      ],
      [
        27.00051,
        92.10464
      ],
      [
        27.01368,
        92.1105
      ],
      [
        27.02618,
        92.10331
      ],
      [
        27.03926,
        92.10741
      ],
      [
        27.052,
        92.105
      ],
      [
        27.06383,
        92.10277
      ],
      [
        27.07592,
        92.10706
      ],
      [
        27.08756,
        92.10005
      ],
      [
        27.09972,
        92.1061
      ],
      [
        27.11143,
        92.10083
      ],
      [
        27.1234,
        92.1021
      ]
    ]
  },
  {
    "id": "SEG_ALT_04",
    "name": "Kalaktang -> Shergaon Basin",
    "corridor": "CORRIDOR_NH13_BYPASS",
    "source": "Kalaktang",
    "target": "Shergaon",
    "distance_km": 32.0,
    "base_speed_kmh": 38.0,
    "district": "West Kameng",
    "risk_score": 0.25,
    "risk_level": "LOW",
    "is_blocked": false,
    "geotechnical": {
      "slope_deg": 16.8,
      "elevation_m": 1950.0,
      "gsi_landslide_history": 1,
      "rainfall_intensity_mm": 26.0,
      "rock_formation": "Massive Quartzite"
    },
    "coordinates": [
      [
        27.1234,
        92.1021
      ],
      [
        27.12656,
        92.11064
      ],
      [
        27.12327,
        92.12022
      ],
      [
        27.13115,
        92.12799
      ],
      [
        27.12614,
        92.13785
      ],
      [
        27.13229,
        92.1459
      ],
      [
        27.132,
        92.155
      ],
      [
        27.13126,
        92.16452
      ],
      [
        27.13701,
        92.17334
      ],
      [
        27.13152,
        92.18337
      ],
      [
        27.13901,
        92.19201
      ],
      [
        27.13526,
        92.20185
      ],
      [
        27.138,
        92.211
      ],
      [
        27.14049,
        92.21924
      ],
      [
        27.13648,
        92.22807
      ],
      [
        27.14374,
        92.23589
      ],
      [
        27.13798,
        92.24487
      ],
      [
        27.14349,
        92.25284
      ],
      [
        27.1425,
        92.2614
      ]
    ]
  },
  {
    "id": "SEG_ALT_05",
    "name": "Shergaon -> Rupa Sub-Divisional Base",
    "corridor": "CORRIDOR_NH13_BYPASS",
    "source": "Shergaon",
    "target": "Rupa",
    "distance_km": 26.0,
    "base_speed_kmh": 42.0,
    "district": "West Kameng",
    "risk_score": 0.2,
    "risk_level": "LOW",
    "is_blocked": false,
    "geotechnical": {
      "slope_deg": 12.0,
      "elevation_m": 1520.0,
      "gsi_landslide_history": 0,
      "rainfall_intensity_mm": 22.0,
      "rock_formation": "Metamorphic Basin"
    },
    "coordinates": [
      [
        27.1425,
        92.2614
      ],
      [
        27.14738,
        92.2692
      ],
      [
        27.14617,
        92.27936
      ],
      [
        27.15552,
        92.28544
      ],
      [
        27.15267,
        92.29622
      ],
      [
        27.16038,
        92.30294
      ],
      [
        27.162,
        92.312
      ],
      [
        27.16429,
        92.31999
      ],
      [
        27.17234,
        92.3249
      ],
      [
        27.17041,
        92.33515
      ],
      [
        27.18001,
        92.33924
      ],
      [
        27.17962,
        92.34866
      ],
      [
        27.185,
        92.355
      ],
      [
        27.18924,
        92.35924
      ],
      [
        27.18773,
        92.36656
      ],
      [
        27.19619,
        92.36855
      ],
      [
        27.19313,
        92.37669
      ],
      [
        27.20004,
        92.37951
      ],
      [
        27.2012,
        92.3854
      ]
    ]
  },
  {
    "id": "SEG_ALT_06",
    "name": "Rupa -> Bomdila Connect (NH-13)",
    "corridor": "CORRIDOR_NH13_BYPASS",
    "source": "Rupa",
    "target": "Bomdila",
    "distance_km": 16.0,
    "base_speed_kmh": 35.0,
    "district": "West Kameng",
    "risk_score": 0.28,
    "risk_level": "LOW",
    "is_blocked": false,
    "geotechnical": {
      "slope_deg": 15.0,
      "elevation_m": 2415.0,
      "gsi_landslide_history": 1,
      "rainfall_intensity_mm": 25.0,
      "rock_formation": "Bomdila Gneiss"
    },
    "coordinates": [
      [
        27.2012,
        92.3854
      ],
      [
        27.20599,
        92.38595
      ],
      [
        27.20772,
        92.39228
      ],
      [
        27.21474,
        92.38861
      ],
      [
        27.21565,
        92.39648
      ],
      [
        27.22185,
        92.39435
      ],
      [
        27.225,
        92.398
      ],
      [
        27.22792,
        92.40183
      ],
      [
        27.23424,
        92.40008
      ],
      [
        27.23468,
        92.40799
      ],
      [
        27.24191,
        92.40474
      ],
      [
        27.24326,
        92.41116
      ],
      [
        27.248,
        92.412
      ],
      [
        27.25177,
        92.41261
      ],
      [
        27.25167,
        92.41847
      ],
      [
        27.25828,
        92.41523
      ],
      [
        27.25713,
        92.42251
      ],
      [
        27.26271,
        92.42068
      ],
      [
        27.2644,
        92.4241
      ]
    ]
  },
  {
    "id": "SEG_29_01",
    "name": "Dimapur Gateway -> Chumukedima (NH-29)",
    "corridor": "CORRIDOR_NH29",
    "source": "Dimapur",
    "target": "Chumukedima",
    "distance_km": 14.0,
    "base_speed_kmh": 55.0,
    "district": "Dimapur / Chumukedima",
    "risk_score": 0.18,
    "risk_level": "LOW",
    "is_blocked": false,
    "geotechnical": {
      "slope_deg": 6.2,
      "elevation_m": 210.0,
      "gsi_landslide_history": 0,
      "rainfall_intensity_mm": 22.0,
      "rock_formation": "Alluvial Piedmont"
    },
    "coordinates": [
      [
        25.906,
        93.727
      ],
      [
        25.89996,
        93.73206
      ],
      [
        25.89095,
        93.7313
      ],
      [
        25.8871,
        93.74062
      ],
      [
        25.87728,
        93.7383
      ],
      [
        25.87263,
        93.74606
      ],
      [
        25.865,
        93.748
      ],
      [
        25.85662,
        93.75082
      ],
      [
        25.85152,
        93.75929
      ],
      [
        25.84075,
        93.75797
      ],
      [
        25.83652,
        93.76796
      ],
      [
        25.82662,
        93.76815
      ],
      [
        25.82,
        93.774
      ]
    ]
  },
  {
    "id": "SEG_29_02",
    "name": "Chumukedima -> Paglapahar Gorge Chokepoint (NH-29)",
    "corridor": "CORRIDOR_NH29",
    "source": "Chumukedima",
    "target": "Paglapahar",
    "distance_km": 16.0,
    "base_speed_kmh": 30.0,
    "district": "Chumukedima",
    "risk_score": 0.88,
    "risk_level": "CRITICAL",
    "is_blocked": false,
    "geotechnical": {
      "slope_deg": 42.0,
      "elevation_m": 420.0,
      "gsi_landslide_history": 14,
      "rainfall_intensity_mm": 48.0,
      "rock_formation": "Disrupive Barail Sandstone Cliff"
    },
    "coordinates": [
      [
        25.82,
        93.774
      ],
      [
        25.8172,
        93.78027
      ],
      [
        25.80931,
        93.78243
      ],
      [
        25.81022,
        93.7917
      ],
      [
        25.80097,
        93.79276
      ],
      [
        25.80053,
        93.80093
      ],
      [
        25.795,
        93.805
      ],
      [
        25.79083,
        93.8072
      ],
      [
        25.79164,
        93.81363
      ],
      [
        25.78383,
        93.81273
      ],
      [
        25.78598,
        93.8203
      ],
      [
        25.7795,
        93.82053
      ],
      [
        25.778,
        93.825
      ],
      [
        25.77722,
        93.8289
      ],
      [
        25.77126,
        93.82883
      ],
      [
        25.77428,
        93.83563
      ],
      [
        25.76693,
        93.83449
      ],
      [
        25.76856,
        93.84023
      ],
      [
        25.765,
        93.842
      ]
    ]
  },
  {
    "id": "SEG_29_03",
    "name": "Paglapahar -> Medziphema (NH-29)",
    "corridor": "CORRIDOR_NH29",
    "source": "Paglapahar",
    "target": "Medziphema",
    "distance_km": 12.0,
    "base_speed_kmh": 35.0,
    "district": "Chumukedima",
    "risk_score": 0.45,
    "risk_level": "MODERATE",
    "is_blocked": false,
    "geotechnical": {
      "slope_deg": 18.5,
      "elevation_m": 310.0,
      "gsi_landslide_history": 3,
      "rainfall_intensity_mm": 30.0,
      "rock_formation": "Tertiary Sandstone"
    },
    "coordinates": [
      [
        25.765,
        93.842
      ],
      [
        25.76534,
        93.84488
      ],
      [
        25.76005,
        93.84447
      ],
      [
        25.76452,
        93.84976
      ],
      [
        25.75772,
        93.84847
      ],
      [
        25.76068,
        93.85288
      ],
      [
        25.758,
        93.854
      ],
      [
        25.75546,
        93.855
      ],
      [
        25.75866,
        93.85912
      ],
      [
        25.75193,
        93.85782
      ],
      [
        25.75666,
        93.86278
      ],
      [
        25.75146,
        93.86233
      ],
      [
        25.752,
        93.865
      ]
    ]
  },
  {
    "id": "SEG_29_04",
    "name": "Medziphema -> Zubza Sinking Zone (NH-29)",
    "corridor": "CORRIDOR_NH29",
    "source": "Medziphema",
    "target": "Zubza",
    "distance_km": 28.0,
    "base_speed_kmh": 32.0,
    "district": "Chumukedima / Kohima",
    "risk_score": 0.72,
    "risk_level": "HIGH",
    "is_blocked": false,
    "geotechnical": {
      "slope_deg": 35.0,
      "elevation_m": 1120.0,
      "gsi_landslide_history": 9,
      "rainfall_intensity_mm": 44.0,
      "rock_formation": "Disik Sinking Clay-Shale"
    },
    "coordinates": [
      [
        25.752,
        93.865
      ],
      [
        25.74961,
        93.87502
      ],
      [
        25.74121,
        93.88247
      ],
      [
        25.74322,
        93.89438
      ],
      [
        25.73321,
        93.90114
      ],
      [
        25.73361,
        93.91236
      ],
      [
        25.728,
        93.921
      ],
      [
        25.72254,
        93.92985
      ],
      [
        25.72314,
        93.94113
      ],
      [
        25.71325,
        93.94819
      ],
      [
        25.71548,
        93.96013
      ],
      [
        25.70721,
        93.96785
      ],
      [
        25.705,
        93.978
      ],
      [
        25.70274,
        93.9866
      ],
      [
        25.69461,
        93.99233
      ],
      [
        25.69664,
        94.00304
      ],
      [
        25.68694,
        94.008
      ],
      [
        25.68741,
        94.01794
      ],
      [
        25.682,
        94.025
      ]
    ]
  },
  {
    "id": "SEG_29_05",
    "name": "Zubza -> Kohima Capital Transport Depot (NH-29)",
    "corridor": "CORRIDOR_NH29",
    "source": "Zubza",
    "target": "Kohima",
    "distance_km": 15.0,
    "base_speed_kmh": 28.0,
    "district": "Kohima",
    "risk_score": 0.42,
    "risk_level": "MODERATE",
    "is_blocked": false,
    "geotechnical": {
      "slope_deg": 24.0,
      "elevation_m": 1444.0,
      "gsi_landslide_history": 4,
      "rainfall_intensity_mm": 38.0,
      "rock_formation": "Disang Metasedimentary Ridge"
    },
    "coordinates": [
      [
        25.682,
        94.025
      ],
      [
        25.68324,
        94.03131
      ],
      [
        25.67798,
        94.03709
      ],
      [
        25.68399,
        94.04378
      ],
      [
        25.67698,
        94.04942
      ],
      [
        25.68124,
        94.05597
      ],
      [
        25.679,
        94.062
      ],
      [
        25.67643,
        94.06948
      ],
      [
        25.68035,
        94.07766
      ],
      [
        25.67302,
        94.08462
      ],
      [
        25.67868,
        94.09299
      ],
      [
        25.67309,
        94.10014
      ],
      [
        25.674,
        94.108
      ]
    ]
  },
  {
    "id": "SEG_29_06",
    "name": "Kohima -> Mao Inter-State Border Gate (NH-2)",
    "corridor": "CORRIDOR_NH29",
    "source": "Kohima",
    "target": "MaoBorder",
    "distance_km": 32.0,
    "base_speed_kmh": 36.0,
    "district": "Kohima / Senapati",
    "risk_score": 0.58,
    "risk_level": "MODERATE",
    "is_blocked": false,
    "geotechnical": {
      "slope_deg": 26.5,
      "elevation_m": 1780.0,
      "gsi_landslide_history": 5,
      "rainfall_intensity_mm": 42.0,
      "rock_formation": "Barail Arenaceous Group"
    },
    "coordinates": [
      [
        25.674,
        94.108
      ],
      [
        25.66805,
        94.11183
      ],
      [
        25.66004,
        94.10946
      ],
      [
        25.65561,
        94.11782
      ],
      [
        25.64704,
        94.11379
      ],
      [
        25.64205,
        94.12049
      ],
      [
        25.635,
        94.121
      ],
      [
        25.62508,
        94.12163
      ],
      [
        25.61672,
        94.12861
      ],
      [
        25.60567,
        94.1246
      ],
      [
        25.59772,
        94.13328
      ],
      [
        25.58708,
        94.13097
      ],
      [
        25.578,
        94.135
      ],
      [
        25.566,
        94.13791
      ],
      [
        25.55338,
        94.13432
      ],
      [
        25.54183,
        94.14198
      ],
      [
        25.52904,
        94.13665
      ],
      [
        25.51733,
        94.14258
      ],
      [
        25.505,
        94.142
      ]
    ]
  },
  {
    "id": "SEG_29_07",
    "name": "Mao Gate -> Senapati Supply Point (NH-2)",
    "corridor": "CORRIDOR_NH29",
    "source": "MaoBorder",
    "target": "Senapati",
    "distance_km": 35.0,
    "base_speed_kmh": 40.0,
    "district": "Senapati",
    "risk_score": 0.38,
    "risk_level": "MODERATE",
    "is_blocked": false,
    "geotechnical": {
      "slope_deg": 20.0,
      "elevation_m": 1050.0,
      "gsi_landslide_history": 2,
      "rainfall_intensity_mm": 30.0,
      "rock_formation": "Disang Shale Formation"
    },
    "coordinates": [
      [
        25.505,
        94.142
      ],
      [
        25.49029,
        94.13743
      ],
      [
        25.47822,
        94.12689
      ],
      [
        25.46159,
        94.1267
      ],
      [
        25.45022,
        94.11456
      ],
      [
        25.43429,
        94.11277
      ],
      [
        25.421,
        94.105
      ],
      [
        25.40873,
        94.09566
      ],
      [
        25.39312,
        94.09194
      ],
      [
        25.38329,
        94.07849
      ],
      [
        25.36678,
        94.07627
      ],
      [
        25.35606,
        94.06433
      ],
      [
        25.342,
        94.058
      ],
      [
        25.32831,
        94.05236
      ],
      [
        25.31781,
        94.04102
      ],
      [
        25.30179,
        94.03956
      ],
      [
        25.29214,
        94.02669
      ],
      [
        25.27698,
        94.02369
      ],
      [
        25.265,
        94.015
      ]
    ]
  },
  {
    "id": "SEG_29_08",
    "name": "Senapati -> Kangpokpi Transit Hub (NH-2)",
    "corridor": "CORRIDOR_NH29",
    "source": "Senapati",
    "target": "Kangpokpi",
    "distance_km": 24.0,
    "base_speed_kmh": 42.0,
    "district": "Senapati / Kangpokpi",
    "risk_score": 0.32,
    "risk_level": "LOW",
    "is_blocked": false,
    "geotechnical": {
      "slope_deg": 16.0,
      "elevation_m": 980.0,
      "gsi_landslide_history": 1,
      "rainfall_intensity_mm": 26.0,
      "rock_formation": "River Terrace Alluvium"
    },
    "coordinates": [
      [
        25.265,
        94.015
      ],
      [
        25.25437,
        94.0128
      ],
      [
        25.24608,
        94.0045
      ],
      [
        25.23375,
        94.00677
      ],
      [
        25.22608,
        93.99684
      ],
      [
        25.21437,
        93.99747
      ],
      [
        25.205,
        93.992
      ],
      [
        25.19608,
        93.98702
      ],
      [
        25.185,
        93.98819
      ],
      [
        25.17766,
        93.9787
      ],
      [
        25.166,
        93.98153
      ],
      [
        25.15808,
        93.97368
      ],
      [
        25.148,
        93.972
      ]
    ]
  },
  {
    "id": "SEG_29_09",
    "name": "Kangpokpi -> Imphal Regional Food & Med Depot (NH-2)",
    "corridor": "CORRIDOR_NH29",
    "source": "Kangpokpi",
    "target": "Imphal",
    "distance_km": 45.0,
    "base_speed_kmh": 50.0,
    "district": "Kangpokpi / Imphal West",
    "risk_score": 0.22,
    "risk_level": "LOW",
    "is_blocked": false,
    "geotechnical": {
      "slope_deg": 8.5,
      "elevation_m": 786.0,
      "gsi_landslide_history": 0,
      "rainfall_intensity_mm": 25.0,
      "rock_formation": "Manipur Valley Alluvial Basin"
    },
    "coordinates": [
      [
        25.148,
        93.972
      ],
      [
        25.1299,
        93.9692
      ],
      [
        25.11341,
        93.96006
      ],
      [
        25.09414,
        93.96189
      ],
      [
        25.07808,
        93.95106
      ],
      [
        25.05923,
        93.9512
      ],
      [
        25.042,
        93.945
      ],
      [
        25.02596,
        93.94209
      ],
      [
        25.00945,
        93.94569
      ],
      [
        24.99375,
        93.93801
      ],
      [
        24.97712,
        93.94336
      ],
      [
        24.96129,
        93.93742
      ],
      [
        24.945,
        93.938
      ],
      [
        24.92365,
        93.93955
      ],
      [
        24.90236,
        93.93457
      ],
      [
        24.88097,
        93.9409
      ],
      [
        24.8597,
        93.93417
      ],
      [
        24.83832,
        93.93875
      ],
      [
        24.817,
        93.9368
      ]
    ]
  },
  {
    "id": "SEG_10_01",
    "name": "Siliguri Hub -> Sevoke Coronation Bridge (NH-10)",
    "corridor": "CORRIDOR_NH10",
    "source": "Siliguri",
    "target": "Sevoke",
    "distance_km": 22.0,
    "base_speed_kmh": 50.0,
    "district": "Darjeeling",
    "risk_score": 0.25,
    "risk_level": "LOW",
    "is_blocked": false,
    "geotechnical": {
      "slope_deg": 10.2,
      "elevation_m": 180.0,
      "gsi_landslide_history": 1,
      "rainfall_intensity_mm": 22.0,
      "rock_formation": "Piedmont Gravels"
    },
    "coordinates": [
      [
        26.7271,
        88.3953
      ],
      [
        26.73925,
        88.39988
      ],
      [
        26.74829,
        88.4102
      ],
      [
        26.76271,
        88.41057
      ],
      [
        26.77093,
        88.42243
      ],
      [
        26.78452,
        88.42434
      ],
      [
        26.795,
        88.432
      ],
      [
        26.80246,
        88.43835
      ],
      [
        26.81319,
        88.43904
      ],
      [
        26.81824,
        88.44953
      ],
      [
        26.82985,
        88.44871
      ],
      [
        26.83579,
        88.45768
      ],
      [
        26.845,
        88.461
      ],
      [
        26.85213,
        88.46115
      ],
      [
        26.85753,
        88.46759
      ],
      [
        26.86593,
        88.46313
      ],
      [
        26.87086,
        88.47126
      ],
      [
        26.8788,
        88.46848
      ],
      [
        26.885,
        88.472
      ]
    ]
  },
  {
    "id": "SEG_10_02",
    "name": "Sevoke Bridge -> Teesta Bazaar Scour Zone (NH-10)",
    "corridor": "CORRIDOR_NH10",
    "source": "Sevoke",
    "target": "TeestaBazaar",
    "distance_km": 26.0,
    "base_speed_kmh": 32.0,
    "district": "Darjeeling / Kalimpong",
    "risk_score": 0.85,
    "risk_level": "CRITICAL",
    "is_blocked": false,
    "geotechnical": {
      "slope_deg": 44.0,
      "elevation_m": 220.0,
      "gsi_landslide_history": 16,
      "rainfall_intensity_mm": 52.0,
      "rock_formation": "Daling Phyllite Gorge Escarpment"
    },
    "coordinates": [
      [
        26.885,
        88.472
      ],
      [
        26.89417,
        88.46845
      ],
      [
        26.90457,
        88.47131
      ],
      [
        26.91284,
        88.46306
      ],
      [
        26.92357,
        88.46764
      ],
      [
        26.93217,
        88.46112
      ],
      [
        26.942,
        88.461
      ],
      [
        26.95181,
        88.46002
      ],
      [
        26.95983,
        88.45275
      ],
      [
        26.97096,
        88.45637
      ],
      [
        26.9785,
        88.44742
      ],
      [
        26.98915,
        88.44935
      ],
      [
        26.998,
        88.445
      ],
      [
        27.00771,
        88.44161
      ],
      [
        27.0185,
        88.44466
      ],
      [
        27.02742,
        88.43655
      ],
      [
        27.0385,
        88.44132
      ],
      [
        27.04771,
        88.43494
      ],
      [
        27.058,
        88.435
      ]
    ]
  },
  {
    "id": "SEG_10_03",
    "name": "Teesta Bazaar -> Rangpo Sikkim Checkpost (NH-10)",
    "corridor": "CORRIDOR_NH10",
    "source": "TeestaBazaar",
    "target": "Rangpo",
    "distance_km": 24.0,
    "base_speed_kmh": 35.0,
    "district": "Kalimpong / Pakyong",
    "risk_score": 0.65,
    "risk_level": "HIGH",
    "is_blocked": false,
    "geotechnical": {
      "slope_deg": 32.0,
      "elevation_m": 330.0,
      "gsi_landslide_history": 7,
      "rainfall_intensity_mm": 45.0,
      "rock_formation": "Reyang Phyllite & Slate"
    },
    "coordinates": [
      [
        27.058,
        88.435
      ],
      [
        27.065,
        88.43679
      ],
      [
        27.06889,
        88.44433
      ],
      [
        27.07816,
        88.44192
      ],
      [
        27.08123,
        88.451
      ],
      [
        27.08967,
        88.45013
      ],
      [
        27.095,
        88.455
      ],
      [
        27.10048,
        88.46245
      ],
      [
        27.11039,
        88.46511
      ],
      [
        27.11262,
        88.47607
      ],
      [
        27.12372,
        88.47744
      ],
      [
        27.12715,
        88.48712
      ],
      [
        27.135,
        88.492
      ],
      [
        27.14299,
        88.49668
      ],
      [
        27.14667,
        88.50628
      ],
      [
        27.15781,
        88.50737
      ],
      [
        27.16033,
        88.51828
      ],
      [
        27.17032,
        88.52068
      ],
      [
        27.176,
        88.528
      ]
    ]
  },
  {
    "id": "SEG_10_04",
    "name": "Rangpo Border -> Singtam Junction (NH-10)",
    "corridor": "CORRIDOR_NH10",
    "source": "Rangpo",
    "target": "Singtam",
    "distance_km": 14.0,
    "base_speed_kmh": 38.0,
    "district": "Pakyong / Gangtok",
    "risk_score": 0.4,
    "risk_level": "MODERATE",
    "is_blocked": false,
    "geotechnical": {
      "slope_deg": 22.0,
      "elevation_m": 410.0,
      "gsi_landslide_history": 3,
      "rainfall_intensity_mm": 35.0,
      "rock_formation": "Gorubathan Gneiss"
    },
    "coordinates": [
      [
        27.176,
        88.528
      ],
      [
        27.17999,
        88.5238
      ],
      [
        27.18713,
        88.52532
      ],
      [
        27.18881,
        88.51694
      ],
      [
        27.1968,
        88.51999
      ],
      [
        27.19932,
        88.51313
      ],
      [
        27.205,
        88.512
      ],
      [
        27.21059,
        88.51124
      ],
      [
        27.21335,
        88.5046
      ],
      [
        27.22102,
        88.50815
      ],
      [
        27.22302,
        88.49994
      ],
      [
        27.22993,
        88.50191
      ],
      [
        27.234,
        88.498
      ]
    ]
  },
  {
    "id": "SEG_10_05",
    "name": "Singtam -> Gangtok STNM Hospital & Base (NH-10)",
    "corridor": "CORRIDOR_NH10",
    "source": "Singtam",
    "target": "Gangtok",
    "distance_km": 28.0,
    "base_speed_kmh": 32.0,
    "district": "Gangtok",
    "risk_score": 0.48,
    "risk_level": "MODERATE",
    "is_blocked": false,
    "geotechnical": {
      "slope_deg": 26.5,
      "elevation_m": 1650.0,
      "gsi_landslide_history": 4,
      "rainfall_intensity_mm": 38.0,
      "rock_formation": "Central Gneissic Complex"
    },
    "coordinates": [
      [
        27.234,
        88.498
      ],
      [
        27.24063,
        88.50487
      ],
      [
        27.2418,
        88.51534
      ],
      [
        27.25242,
        88.51957
      ],
      [
        27.25214,
        88.531
      ],
      [
        27.26129,
        88.5362
      ],
      [
        27.265,
        88.545
      ],
      [
        27.26805,
        88.55265
      ],
      [
        27.27651,
        88.55664
      ],
      [
        27.2756,
        88.56696
      ],
      [
        27.28551,
        88.56997
      ],
      [
        27.28605,
        88.57931
      ],
      [
        27.292,
        88.585
      ],
      [
        27.2996,
        88.58839
      ],
      [
        27.30334,
        88.59705
      ],
      [
        27.31377,
        88.59657
      ],
      [
        27.31648,
        88.60665
      ],
      [
        27.32587,
        88.60759
      ],
      [
        27.3314,
        88.6138
      ]
    ]
  },
  {
    "id": "SEG_06_01",
    "name": "Shillong Plateau -> Jowai Transport Hub (NH-6)",
    "corridor": "CORRIDOR_NH6",
    "source": "Shillong",
    "target": "Jowai",
    "distance_km": 64.0,
    "base_speed_kmh": 50.0,
    "district": "East Khasi Hills / West Jaintia Hills",
    "risk_score": 0.28,
    "risk_level": "LOW",
    "is_blocked": false,
    "geotechnical": {
      "slope_deg": 12.5,
      "elevation_m": 1380.0,
      "gsi_landslide_history": 1,
      "rainfall_intensity_mm": 31.0,
      "rock_formation": "Shillong Group Quartzite"
    },
    "coordinates": [
      [
        25.5788,
        91.8933
      ],
      [
        25.57606,
        91.92103
      ],
      [
        25.56687,
        91.94771
      ],
      [
        25.56885,
        91.97621
      ],
      [
        25.55794,
        92.00261
      ],
      [
        25.55819,
        92.03083
      ],
      [
        25.552,
        92.058
      ],
      [
        25.54151,
        92.07158
      ],
      [
        25.53658,
        92.0886
      ],
      [
        25.52203,
        92.09965
      ],
      [
        25.51858,
        92.1176
      ],
      [
        25.50551,
        92.12958
      ],
      [
        25.498,
        92.145
      ],
      [
        25.49098,
        92.15565
      ],
      [
        25.47905,
        92.162
      ],
      [
        25.47563,
        92.17581
      ],
      [
        25.46239,
        92.181
      ],
      [
        25.45765,
        92.19365
      ],
      [
        25.448,
        92.202
      ]
    ]
  },
  {
    "id": "SEG_06_02",
    "name": "Jowai -> Khliehriat Coal Belt (NH-6)",
    "corridor": "CORRIDOR_NH6",
    "source": "Jowai",
    "target": "Khliehriat",
    "distance_km": 42.0,
    "base_speed_kmh": 45.0,
    "district": "West Jaintia Hills / East Jaintia Hills",
    "risk_score": 0.45,
    "risk_level": "MODERATE",
    "is_blocked": false,
    "geotechnical": {
      "slope_deg": 18.0,
      "elevation_m": 1200.0,
      "gsi_landslide_history": 3,
      "rainfall_intensity_mm": 38.0,
      "rock_formation": "Tertiary Sandstone & Coal Measures"
    },
    "coordinates": [
      [
        25.448,
        92.202
      ],
      [
        25.44117,
        92.21674
      ],
      [
        25.42874,
        92.2281
      ],
      [
        25.426,
        92.24531
      ],
      [
        25.41207,
        92.25577
      ],
      [
        25.40783,
        92.27207
      ],
      [
        25.398,
        92.285
      ],
      [
        25.38882,
        92.29746
      ],
      [
        25.38529,
        92.31318
      ],
      [
        25.37197,
        92.32326
      ],
      [
        25.36996,
        92.33984
      ],
      [
        25.35815,
        92.35079
      ],
      [
        25.352,
        92.365
      ]
    ]
  },
  {
    "id": "SEG_06_03",
    "name": "Khliehriat -> Sonapur Mudflow Tunnel (NH-6)",
    "corridor": "CORRIDOR_NH6",
    "source": "Khliehriat",
    "target": "SonapurTunnel",
    "distance_km": 35.0,
    "base_speed_kmh": 30.0,
    "district": "East Jaintia Hills",
    "risk_score": 0.92,
    "risk_level": "CRITICAL",
    "is_blocked": false,
    "geotechnical": {
      "slope_deg": 46.0,
      "elevation_m": 580.0,
      "gsi_landslide_history": 18,
      "rainfall_intensity_mm": 61.0,
      "rock_formation": "Fractured Shale & Mining Subsidence"
    },
    "coordinates": [
      [
        25.352,
        92.365
      ],
      [
        25.33764,
        92.36791
      ],
      [
        25.32276,
        92.36431
      ],
      [
        25.30878,
        92.37199
      ],
      [
        25.29376,
        92.36665
      ],
      [
        25.27964,
        92.37258
      ],
      [
        25.265,
        92.372
      ],
      [
        25.25173,
        92.36975
      ],
      [
        25.23822,
        92.37403
      ],
      [
        25.22513,
        92.367
      ],
      [
        25.21155,
        92.37303
      ],
      [
        25.1984,
        92.36775
      ],
      [
        25.185,
        92.369
      ],
      [
        25.17497,
        92.37058
      ],
      [
        25.16505,
        92.36564
      ],
      [
        25.15494,
        92.372
      ],
      [
        25.14505,
        92.3653
      ],
      [
        25.13497,
        92.36992
      ],
      [
        25.125,
        92.368
      ]
    ]
  },
  {
    "id": "SEG_06_04",
    "name": "Sonapur Tunnel -> Badarpur Junction (NH-6)",
    "corridor": "CORRIDOR_NH6",
    "source": "SonapurTunnel",
    "target": "Badarpur",
    "distance_km": 58.0,
    "base_speed_kmh": 40.0,
    "district": "East Jaintia Hills / Karimganj",
    "risk_score": 0.52,
    "risk_level": "MODERATE",
    "is_blocked": false,
    "geotechnical": {
      "slope_deg": 22.0,
      "elevation_m": 42.0,
      "gsi_landslide_history": 4,
      "rainfall_intensity_mm": 40.0,
      "rock_formation": "Surma Group Siltstone"
    },
    "coordinates": [
      [
        25.125,
        92.368
      ],
      [
        25.11152,
        92.37255
      ],
      [
        25.09673,
        92.3707
      ],
      [
        25.0842,
        92.37993
      ],
      [
        25.06906,
        92.37636
      ],
      [
        25.05618,
        92.38388
      ],
      [
        25.042,
        92.385
      ],
      [
        25.02782,
        92.39938
      ],
      [
        25.01867,
        92.41793
      ],
      [
        25.0008,
        92.42927
      ],
      [
        24.993,
        92.44893
      ],
      [
        24.97649,
        92.46138
      ],
      [
        24.965,
        92.478
      ],
      [
        24.95584,
        92.49673
      ],
      [
        24.94107,
        92.51211
      ],
      [
        24.936,
        92.5333
      ],
      [
        24.91973,
        92.54778
      ],
      [
        24.91317,
        92.56806
      ],
      [
        24.901,
        92.585
      ]
    ]
  },
  {
    "id": "SEG_06_05",
    "name": "Badarpur -> Silchar Barak Supply Depot (NH-6)",
    "corridor": "CORRIDOR_NH6",
    "source": "Badarpur",
    "target": "Silchar",
    "distance_km": 28.0,
    "base_speed_kmh": 45.0,
    "district": "Karimganj / Cachar",
    "risk_score": 0.2,
    "risk_level": "LOW",
    "is_blocked": false,
    "geotechnical": {
      "slope_deg": 4.5,
      "elevation_m": 35.0,
      "gsi_landslide_history": 0,
      "rainfall_intensity_mm": 35.0,
      "rock_formation": "Barak River Alluvial Basin"
    },
    "coordinates": [
      [
        24.901,
        92.585
      ],
      [
        24.89664,
        92.60178
      ],
      [
        24.88616,
        92.61628
      ],
      [
        24.88628,
        92.63472
      ],
      [
        24.87416,
        92.64861
      ],
      [
        24.87264,
        92.66644
      ],
      [
        24.865,
        92.682
      ],
      [
        24.85805,
        92.69761
      ],
      [
        24.85731,
        92.71524
      ],
      [
        24.84582,
        92.72936
      ],
      [
        24.84675,
        92.74754
      ],
      [
        24.83692,
        92.76221
      ],
      [
        24.8333,
        92.7789
      ]
    ]
  },
  {
    "id": "SEG_06_06",
    "name": "Badarpur -> Dharmanagar Gateway (NH-8)",
    "corridor": "CORRIDOR_NH6",
    "source": "Badarpur",
    "target": "Dharmanagar",
    "distance_km": 72.0,
    "base_speed_kmh": 48.0,
    "district": "Karimganj / North Tripura",
    "risk_score": 0.32,
    "risk_level": "LOW",
    "is_blocked": false,
    "geotechnical": {
      "slope_deg": 14.0,
      "elevation_m": 48.0,
      "gsi_landslide_history": 1,
      "rainfall_intensity_mm": 28.0,
      "rock_formation": "Tripura Ridge Anticline"
    },
    "coordinates": [
      [
        24.901,
        92.585
      ],
      [
        24.87049,
        92.55963
      ],
      [
        24.84437,
        92.52942
      ],
      [
        24.81065,
        92.50759
      ],
      [
        24.78571,
        92.47609
      ],
      [
        24.75316,
        92.45296
      ],
      [
        24.725,
        92.425
      ],
      [
        24.69607,
        92.40029
      ],
      [
        24.66314,
        92.38073
      ],
      [
        24.63715,
        92.35224
      ],
      [
        24.60314,
        92.33406
      ],
      [
        24.57607,
        92.30695
      ],
      [
        24.545,
        92.285
      ],
      [
        24.51566,
        92.26643
      ],
      [
        24.49008,
        92.24252
      ],
      [
        24.45798,
        92.22786
      ],
      [
        24.43341,
        92.20252
      ],
      [
        24.40232,
        92.18643
      ],
      [
        24.375,
        92.165
      ]
    ]
  },
  {
    "id": "SEG_06_07",
    "name": "Dharmanagar -> Agartala GB Pant Hospital & Depot (NH-8)",
    "corridor": "CORRIDOR_NH6",
    "source": "Dharmanagar",
    "target": "Agartala",
    "distance_km": 135.0,
    "base_speed_kmh": 55.0,
    "district": "North Tripura / West Tripura",
    "risk_score": 0.22,
    "risk_level": "LOW",
    "is_blocked": false,
    "geotechnical": {
      "slope_deg": 8.0,
      "elevation_m": 30.0,
      "gsi_landslide_history": 0,
      "rainfall_intensity_mm": 20.5,
      "rock_formation": "Tipam Sandstone & Alluvium"
    },
    "coordinates": [
      [
        24.375,
        92.165
      ],
      [
        24.33652,
        92.14095
      ],
      [
        24.3017,
        92.11149
      ],
      [
        24.26053,
        92.09139
      ],
      [
        24.2267,
        92.06049
      ],
      [
        24.18652,
        92.03895
      ],
      [
        24.15,
        92.012
      ],
      [
        24.1135,
        91.9844
      ],
      [
        24.07327,
        91.96215
      ],
      [
        24.0395,
        91.93063
      ],
      [
        23.99827,
        91.90982
      ],
      [
        23.9635,
        91.87973
      ],
      [
        23.925,
        91.855
      ],
      [
        23.91328,
        91.80031
      ],
      [
        23.90798,
        91.74446
      ],
      [
        23.89156,
        91.69063
      ],
      [
        23.88798,
        91.63446
      ],
      [
        23.87328,
        91.58031
      ],
      [
        23.865,
        91.525
      ],
      [
        23.86115,
        91.48506
      ],
      [
        23.85083,
        91.44602
      ],
      [
        23.85172,
        91.40541
      ],
      [
        23.83967,
        91.36662
      ],
      [
        23.83882,
        91.32626
      ],
      [
        23.8315,
        91.2868
      ]
    ]
  }
];

export const DEFAULT_WEATHER_STATIONS = [
  {
    "station": "Guwahati",
    "corridor": "CORRIDOR_NH13",
    "lat": 26.1445,
    "lon": 91.7362,
    "temp_c": 31.5,
    "rainfall_mm": 18.2,
    "weather_desc": "Scattered Monsoon Showers",
    "humidity_pct": 84,
    "elevation_m": 55,
    "forecast_24h_mm": 22.0,
    "soil_saturation_pct": 42,
    "color": "#22c55e",
    "alert_level": "MODERATE",
    "alert_radius_m": 16000
  },
  {
    "station": "Tezpur",
    "corridor": "CORRIDOR_NH13",
    "lat": 26.6528,
    "lon": 92.7926,
    "temp_c": 29.8,
    "rainfall_mm": 24.5,
    "weather_desc": "Steady Moderate Rain",
    "humidity_pct": 88,
    "elevation_m": 78,
    "forecast_24h_mm": 28.0,
    "soil_saturation_pct": 55,
    "color": "#22c55e",
    "alert_level": "MODERATE",
    "alert_radius_m": 18000
  },
  {
    "station": "Bhalukpong",
    "corridor": "CORRIDOR_NH13",
    "lat": 27.0125,
    "lon": 92.6514,
    "temp_c": 26.0,
    "rainfall_mm": 42.0,
    "weather_desc": "Heavy Downpour (Gorge Slopes Saturated)",
    "humidity_pct": 92,
    "elevation_m": 215,
    "forecast_24h_mm": 55.0,
    "soil_saturation_pct": 82,
    "color": "#f59e0b",
    "alert_level": "HIGH",
    "alert_radius_m": 26000
  },
  {
    "station": "Bomdila",
    "corridor": "CORRIDOR_NH13",
    "lat": 27.2644,
    "lon": 92.4241,
    "temp_c": 17.5,
    "rainfall_mm": 34.0,
    "weather_desc": "Dense Fog & Continuous Rain",
    "humidity_pct": 95,
    "elevation_m": 2415,
    "forecast_24h_mm": 45.0,
    "soil_saturation_pct": 74,
    "color": "#f59e0b",
    "alert_level": "HIGH",
    "alert_radius_m": 24000
  },
  {
    "station": "SelaPass",
    "corridor": "CORRIDOR_NH13",
    "lat": 27.5034,
    "lon": 92.1039,
    "temp_c": 4.2,
    "rainfall_mm": 56.5,
    "weather_desc": "Near-Freezing Cloudburst & Sleet",
    "humidity_pct": 98,
    "elevation_m": 3733,
    "forecast_24h_mm": 75.0,
    "soil_saturation_pct": 91,
    "color": "#ef4444",
    "alert_level": "CRITICAL",
    "alert_radius_m": 35000
  },
  {
    "station": "Tawang",
    "corridor": "CORRIDOR_NH13",
    "lat": 27.5861,
    "lon": 91.8594,
    "temp_c": 14.8,
    "rainfall_mm": 32.0,
    "weather_desc": "Cold Monsoon Showers",
    "humidity_pct": 90,
    "elevation_m": 3048,
    "forecast_24h_mm": 40.0,
    "soil_saturation_pct": 68,
    "color": "#f59e0b",
    "alert_level": "HIGH",
    "alert_radius_m": 22000
  },
  {
    "station": "Dimapur",
    "corridor": "CORRIDOR_NH29",
    "lat": 25.906,
    "lon": 93.727,
    "temp_c": 30.2,
    "rainfall_mm": 22.0,
    "weather_desc": "Humid Monsoon Overcast",
    "humidity_pct": 86,
    "elevation_m": 145,
    "forecast_24h_mm": 25.0,
    "soil_saturation_pct": 48,
    "color": "#22c55e",
    "alert_level": "MODERATE",
    "alert_radius_m": 16000
  },
  {
    "station": "Kohima",
    "corridor": "CORRIDOR_NH29",
    "lat": 25.674,
    "lon": 94.108,
    "temp_c": 21.0,
    "rainfall_mm": 45.0,
    "weather_desc": "Heavy Mountain Showers (Paglapahar Alert)",
    "humidity_pct": 94,
    "elevation_m": 1444,
    "forecast_24h_mm": 58.0,
    "soil_saturation_pct": 84,
    "color": "#f59e0b",
    "alert_level": "HIGH",
    "alert_radius_m": 28000
  },
  {
    "station": "Imphal",
    "corridor": "CORRIDOR_NH29",
    "lat": 24.817,
    "lon": 93.9368,
    "temp_c": 27.5,
    "rainfall_mm": 28.5,
    "weather_desc": "Intermittent Valley Showers",
    "humidity_pct": 88,
    "elevation_m": 786,
    "forecast_24h_mm": 35.0,
    "soil_saturation_pct": 62,
    "color": "#f59e0b",
    "alert_level": "MODERATE",
    "alert_radius_m": 20000
  },
  {
    "station": "Siliguri",
    "corridor": "CORRIDOR_NH10",
    "lat": 26.7271,
    "lon": 88.3953,
    "temp_c": 31.0,
    "rainfall_mm": 19.0,
    "weather_desc": "Passing Thunderclouds",
    "humidity_pct": 82,
    "elevation_m": 122,
    "forecast_24h_mm": 22.0,
    "soil_saturation_pct": 44,
    "color": "#22c55e",
    "alert_level": "MODERATE",
    "alert_radius_m": 16000
  },
  {
    "station": "TeestaBazaar",
    "corridor": "CORRIDOR_NH10",
    "lat": 27.058,
    "lon": 88.435,
    "temp_c": 24.8,
    "rainfall_mm": 52.0,
    "weather_desc": "Torrential Downpour & Teesta River Spate",
    "humidity_pct": 96,
    "elevation_m": 220,
    "forecast_24h_mm": 70.0,
    "soil_saturation_pct": 92,
    "color": "#ef4444",
    "alert_level": "CRITICAL",
    "alert_radius_m": 32000
  },
  {
    "station": "Gangtok",
    "corridor": "CORRIDOR_NH10",
    "lat": 27.3314,
    "lon": 88.6138,
    "temp_c": 18.2,
    "rainfall_mm": 38.0,
    "weather_desc": "Heavy Alpine Fog & Rain",
    "humidity_pct": 94,
    "elevation_m": 1650,
    "forecast_24h_mm": 48.0,
    "soil_saturation_pct": 79,
    "color": "#f59e0b",
    "alert_level": "HIGH",
    "alert_radius_m": 24000
  },
  {
    "station": "Shillong",
    "corridor": "CORRIDOR_NH6",
    "lat": 25.5788,
    "lon": 91.8933,
    "temp_c": 20.5,
    "rainfall_mm": 31.0,
    "weather_desc": "Cloudy with Steady Showers",
    "humidity_pct": 90,
    "elevation_m": 1525,
    "forecast_24h_mm": 40.0,
    "soil_saturation_pct": 71,
    "color": "#f59e0b",
    "alert_level": "HIGH",
    "alert_radius_m": 22000
  },
  {
    "station": "Sonapur",
    "corridor": "CORRIDOR_NH6",
    "lat": 25.125,
    "lon": 92.368,
    "temp_c": 26.2,
    "rainfall_mm": 61.0,
    "weather_desc": "Extreme Jaintia Cloudburst (Mudflow Active)",
    "humidity_pct": 98,
    "elevation_m": 580,
    "forecast_24h_mm": 82.0,
    "soil_saturation_pct": 96,
    "color": "#ef4444",
    "alert_level": "CRITICAL",
    "alert_radius_m": 38000
  },
  {
    "station": "Silchar",
    "corridor": "CORRIDOR_NH6",
    "lat": 24.8333,
    "lon": 92.7789,
    "temp_c": 28.5,
    "rainfall_mm": 35.0,
    "weather_desc": "Barak Valley Monsoon Rain",
    "humidity_pct": 92,
    "elevation_m": 35,
    "forecast_24h_mm": 42.0,
    "soil_saturation_pct": 75,
    "color": "#f59e0b",
    "alert_level": "HIGH",
    "alert_radius_m": 24000
  },
  {
    "station": "Agartala",
    "corridor": "CORRIDOR_NH6",
    "lat": 23.8315,
    "lon": 91.2868,
    "temp_c": 31.2,
    "rainfall_mm": 20.5,
    "weather_desc": "Scattered Rain & High Humidity",
    "humidity_pct": 85,
    "elevation_m": 30,
    "forecast_24h_mm": 24.0,
    "soil_saturation_pct": 46,
    "color": "#22c55e",
    "alert_level": "MODERATE",
    "alert_radius_m": 16000
  }
];

export const BRO_MACHINERY_UNITS = [
  {
    "id": "BRO_VARTAK_01",
    "unit": "Task Force 14 BRTF",
    "type": "Heavy Hydraulic Excavator (CAT 320D)",
    "location": "Sessa Scree Chokepoint (km 114)",
    "corridor": "CORRIDOR_NH13",
    "lat": 27.0984,
    "lon": 92.5342,
    "status": "CLEARING_DEBRIS",
    "operator": "BRO Project Vartak",
    "eta_clearance_hrs": 2.5
  },
  {
    "id": "BRO_VARTAK_02",
    "unit": "Task Force 14 BRTF",
    "type": "Tracked Heavy Wheel Dozer",
    "location": "Kaspi River Cut (km 142)",
    "corridor": "CORRIDOR_NH13",
    "lat": 27.2014,
    "lon": 92.4412,
    "status": "STANDBY",
    "operator": "BRO Project Vartak",
    "eta_clearance_hrs": 0.0
  },
  {
    "id": "BRO_VARTAK_03",
    "unit": "Task Force 44 BRTF",
    "type": "Twin-Auger Snow Cutter & De-Icer",
    "location": "Sela Alpine Pass Summit (3,733m)",
    "corridor": "CORRIDOR_NH13",
    "lat": 27.5034,
    "lon": 92.1039,
    "status": "PATROLLING",
    "operator": "BRO Project Vartak",
    "eta_clearance_hrs": 0.0
  },
  {
    "id": "BRO_SEWAK_01",
    "unit": "Task Force 15 BRTF",
    "type": "Heavy Crawler Rock-Dozer",
    "location": "Paglapahar Gorge (NH-29)",
    "corridor": "CORRIDOR_NH29",
    "lat": 25.765,
    "lon": 93.842,
    "status": "ACTIVE_REMOVAL",
    "operator": "BRO Project Sewak",
    "eta_clearance_hrs": 1.8
  },
  {
    "id": "BRO_SWASTIK_01",
    "unit": "Task Force 758 BRTF",
    "type": "Pneumatic Rockbreaker Excavator",
    "location": "Teesta Bazaar Cliff Defile (NH-10)",
    "corridor": "CORRIDOR_NH10",
    "lat": 27.058,
    "lon": 88.435,
    "status": "STANDBY",
    "operator": "BRO Project Swastik",
    "eta_clearance_hrs": 0.0
  },
  {
    "id": "BRO_PUSHPAK_01",
    "unit": "Task Force 28 BRTF",
    "type": "High-Capacity Mud Siphon & Excavator",
    "location": "Sonapur Tunnel Portal (NH-6)",
    "corridor": "CORRIDOR_NH6",
    "lat": 25.125,
    "lon": 92.368,
    "status": "ACTIVE_MUD_SIPHONING",
    "operator": "BRO Project Pushpak",
    "eta_clearance_hrs": 3.0
  }
];


export const REGISTERED_DRIVERS = [
  {
    "id": "DRV-014",
    "name": "Subedar R. Thapa",
    "badge": "ARMY_SUPPLY_CORPS_VET",
    "phone": "+91 94350-12844",
    "license_no": "HMV-AR-2016-9021 (All-Terrain Hill Endorsed)",
    "experience_years": 14,
    "blood_group": "O+",
    "emergency_contact": "Tawang BRO Transit Camp Base / +91 94350-99001",
    "assigned_vehicle_id": "MED_CONVOY_01",
    "vehicle_reg": "AS-01-EC-9042",
    "vehicle_model": "Tata 1618 SE 4x4 Mountain Cold-Chain Carrier",
    "cargo_summary": "10,000 Doses Anti-Rabies & Snake Venom + Cryogenic Oxygen",
    "cargo_priority": "CRITICAL_MEDICAL",
    "consignment_id": "CN-MED-TAWANG-8891",
    "seal_number": "BRO-VARTAK-SEAL-4491",
    "corridor": "CORRIDOR_NH13",
    "status": "EN_ROUTE",
    "duty_hours_today": 4.5,
    "max_duty_hours": 8.0,
    "avatar_color": "from-rose-500 to-red-600"
  },
  {
    "id": "DRV-022",
    "name": "Havaldar M. Saikia",
    "badge": "FCI_INTERSTATE_FLEET",
    "phone": "+91 98621-44910",
    "license_no": "HMV-AS-2014-3882 (Heavy Articulated)",
    "experience_years": 11,
    "blood_group": "B+",
    "emergency_contact": "Tezpur FCI Staging Base / +91 98621-00122",
    "assigned_vehicle_id": "PDS_GRAIN_04",
    "vehicle_reg": "AR-01-F-4412",
    "vehicle_model": "Ashok Leyland 1616 Heavy Mountain Cargo",
    "cargo_summary": "14.5 Metric Tons PDS Food Grain (Rice, Wheat & Pulses)",
    "cargo_priority": "ESSENTIAL_FOOD",
    "consignment_id": "CN-PDS-BOMDILA-3304",
    "seal_number": "FCI-SEAL-9901",
    "corridor": "CORRIDOR_NH13",
    "status": "EN_ROUTE",
    "duty_hours_today": 3.2,
    "max_duty_hours": 8.0,
    "avatar_color": "from-emerald-500 to-green-600"
  },
  {
    "id": "DRV-008",
    "name": "Naik K. Ao",
    "badge": "IOCL_HAZMAT_CERTIFIED",
    "phone": "+91 94360-12948",
    "license_no": "HMV-NL-2012-1084 (Petroleum POL Hazardous Endorsed)",
    "experience_years": 16,
    "blood_group": "A+",
    "emergency_contact": "Dimapur IOCL Depot / +91 94360-55110",
    "assigned_vehicle_id": "FUEL_TANKER_02",
    "vehicle_reg": "NL-07-A-8841",
    "vehicle_model": "BharatBenz 2823R High-Altitude Winterized Tanker",
    "cargo_summary": "12,000 Liters Winterized High-Altitude Diesel & Kerosene",
    "cargo_priority": "FUEL_POL",
    "consignment_id": "CN-POL-KOHIMA-1192",
    "seal_number": "IOCL-SECURITY-7721",
    "corridor": "CORRIDOR_NH29",
    "status": "CAUTION_PROCEEDING",
    "duty_hours_today": 5.1,
    "max_duty_hours": 8.0,
    "avatar_color": "from-amber-500 to-orange-600"
  },
  {
    "id": "DRV-035",
    "name": "L. Bhutia",
    "badge": "DISASTER_TRAUMA_CORPS",
    "phone": "+91 98320-77312",
    "license_no": "HMV-SK-2018-7719 (Sikkim High Pass Specialist)",
    "experience_years": 9,
    "blood_group": "AB+",
    "emergency_contact": "Gangtok STNM Hospital Control / +91 98320-11990",
    "assigned_vehicle_id": "RELIEF_SUPPLY_03",
    "vehicle_reg": "SK-01-B-3209",
    "vehicle_model": "Eicher Pro 3015 Emergency Medical Trauma Carrier",
    "cargo_summary": "Emergency Flood Sanitation, Trauma Packs & IV Fluids",
    "cargo_priority": "CRITICAL_MEDICAL",
    "consignment_id": "CN-MED-GANGTOK-4418",
    "seal_number": "SDMA-SEAL-1102",
    "corridor": "CORRIDOR_NH10",
    "status": "SLOW_GORGE_TRANSIT",
    "duty_hours_today": 2.8,
    "max_duty_hours": 8.0,
    "avatar_color": "from-cyan-500 to-blue-600"
  }
];


export const ACTIVE_CONVOYS = [
  {
    "id": "MED_CONVOY_01",
    "cargo": "Cold-Chain Vaccines & Oxygen Cylinders",
    "vehicle_id": "MED_CONVOY_01",
    "corridor": "CORRIDOR_NH13",
    "origin": "Guwahati Hub",
    "destination": "Tawang Civil Hospital",
    "lat": 27.3578,
    "lon": 92.2394,
    "speed_kmh": 32.0,
    "progress_pct": 68.0,
    "priority": "CRITICAL_MEDICAL",
    "status": "EN_ROUTE",
    "current_landmark": "Dirang Valley Staging Area",
    "operational_advisory": "CONTINUE",
    "cargo_type": "MEDICAL",
    "driver_id": "DRV-014",
    "driver_name": "Subedar R. Thapa",
    "driver_phone": "+91 94350-12844",
    "driver_license": "HMV-AR-2016-9021",
    "driver_experience": "14 yrs",
    "blood_group": "O+",
    "vehicle_reg": "AS-01-EC-9042",
    "vehicle_model": "Tata 1618 SE 4x4 Mountain Cold-Chain Carrier",
    "consignment_id": "CN-MED-TAWANG-8891",
    "seal_number": "BRO-VARTAK-SEAL-4491",
    "temperature_c": 3.8,
    "cargo_weight_tons": 8.5
  },
  {
    "id": "PDS_GRAIN_04",
    "cargo": "Essential PDS Food Grains (FCI Supply)",
    "vehicle_id": "PDS_GRAIN_04",
    "corridor": "CORRIDOR_NH13",
    "origin": "Guwahati Hub",
    "destination": "Bomdila Ration Depot",
    "lat": 26.6528,
    "lon": 92.7926,
    "speed_kmh": 48.0,
    "progress_pct": 32.0,
    "priority": "ESSENTIAL_FOOD",
    "status": "EN_ROUTE",
    "current_landmark": "Tezpur Base",
    "operational_advisory": "CONTINUE",
    "cargo_type": "FOOD_PDS",
    "driver_id": "DRV-022",
    "driver_name": "Havaldar M. Saikia",
    "driver_phone": "+91 98621-44910",
    "driver_license": "HMV-AS-2014-3882",
    "driver_experience": "11 yrs",
    "blood_group": "B+",
    "vehicle_reg": "AR-01-F-4412",
    "vehicle_model": "Ashok Leyland 1616 Heavy Mountain Cargo",
    "consignment_id": "CN-PDS-BOMDILA-3304",
    "seal_number": "FCI-SEAL-9901",
    "tonnage": 14.5,
    "cargo_weight_tons": 14.5
  },
  {
    "id": "FUEL_TANKER_02",
    "cargo": "High-Altitude Diesel & Aviation POL",
    "vehicle_id": "FUEL_TANKER_02",
    "corridor": "CORRIDOR_NH29",
    "origin": "Dimapur Railhead",
    "destination": "Kohima Reserve Depot",
    "lat": 25.82,
    "lon": 93.774,
    "speed_kmh": 34.0,
    "progress_pct": 28.0,
    "priority": "FUEL_POL",
    "status": "CAUTION_PROCEEDING",
    "current_landmark": "Approaching Chumukedima Foothills",
    "operational_advisory": "CONTINUE",
    "cargo_type": "FUEL_POL",
    "driver_id": "DRV-008",
    "driver_name": "Naik K. Ao",
    "driver_phone": "+91 94360-12948",
    "driver_license": "HMV-NL-2012-1084",
    "driver_experience": "16 yrs",
    "blood_group": "A+",
    "vehicle_reg": "NL-07-A-8841",
    "vehicle_model": "BharatBenz 2823R High-Altitude Winterized Tanker",
    "consignment_id": "CN-POL-KOHIMA-1192",
    "seal_number": "IOCL-SECURITY-7721",
    "fuel_volume_liters": 12000,
    "cargo_weight_tons": 11.2
  },
  {
    "id": "RELIEF_SUPPLY_03",
    "cargo": "Emergency Flood Sanitation & Trauma Kits",
    "vehicle_id": "RELIEF_SUPPLY_03",
    "corridor": "CORRIDOR_NH10",
    "origin": "Siliguri Railhead",
    "destination": "Gangtok STNM Hospital",
    "lat": 26.885,
    "lon": 88.472,
    "speed_kmh": 36.0,
    "progress_pct": 38.0,
    "priority": "CRITICAL_MEDICAL",
    "status": "SLOW_GORGE_TRANSIT",
    "current_landmark": "Sevoke Coronation Bridge",
    "operational_advisory": "CAUTION_WEATHER",
    "cargo_type": "MEDICAL",
    "driver_id": "DRV-035",
    "driver_name": "L. Bhutia",
    "driver_phone": "+91 98320-77312",
    "driver_license": "HMV-SK-2018-7719",
    "driver_experience": "9 yrs",
    "blood_group": "AB+",
    "vehicle_reg": "SK-01-B-3209",
    "vehicle_model": "Eicher Pro 3015 Emergency Medical Trauma Carrier",
    "consignment_id": "CN-MED-GANGTOK-4418",
    "seal_number": "SDMA-SEAL-1102",
    "priority_seal": "SDMA_PRIORITY_1",
    "cargo_weight_tons": 5.8
  }
];

export const DEFAULT_CORRIDOR_HEALTH = {
  "status": "CAUTION",
  "average_risk_score": 0.44,
  "blocked_segments_count": 1,
  "total_segments": 42,
  "high_risk_segments_count": 6,
  "active_advisory": "Heavy monsoon rains triggering active scree slides between Sessa (NH-13) and Paglapahar (NH-29). BRO Project Vartak & Sewak heavy clearance task forces deployed.",
  "timestamp": "2026-09-06T20:30:00Z"
};

export const DEFAULT_DISTRICTS = [
  {
    "name": "Kamrup Metro",
    "state": "Assam",
    "status": "ACCESSIBLE",
    "active_lifelines": 2,
    "blocked_roads": 0,
    "priority_depot": "Guwahati Central",
    "medicine_stock_days": 28,
    "food_stock_days": 45
  },
  {
    "name": "Sonitpur",
    "state": "Assam",
    "status": "ACCESSIBLE",
    "active_lifelines": 2,
    "blocked_roads": 0,
    "priority_depot": "Tezpur Military Base",
    "medicine_stock_days": 21,
    "food_stock_days": 35
  },
  {
    "name": "West Kameng",
    "state": "Arunachal Pradesh",
    "status": "DEGRADED",
    "active_lifelines": 1,
    "blocked_roads": 1,
    "priority_depot": "Bomdila Civil Hospital",
    "medicine_stock_days": 9,
    "food_stock_days": 14
  },
  {
    "name": "Tawang",
    "state": "Arunachal Pradesh",
    "status": "ISOLATED_RISK",
    "active_lifelines": 1,
    "blocked_roads": 1,
    "priority_depot": "Tawang Frontier Depot",
    "medicine_stock_days": 5,
    "food_stock_days": 8
  },
  {
    "name": "Kohima",
    "state": "Nagaland",
    "status": "DEGRADED",
    "active_lifelines": 1,
    "blocked_roads": 1,
    "priority_depot": "Kohima Capital Depot",
    "medicine_stock_days": 8,
    "food_stock_days": 12
  },
  {
    "name": "Imphal West",
    "state": "Manipur",
    "status": "ISOLATED_RISK",
    "active_lifelines": 1,
    "blocked_roads": 1,
    "priority_depot": "Imphal Regional Depot",
    "medicine_stock_days": 4,
    "food_stock_days": 7
  },
  {
    "name": "Gangtok",
    "state": "Sikkim",
    "status": "DEGRADED",
    "active_lifelines": 1,
    "blocked_roads": 1,
    "priority_depot": "STNM Hospital Store",
    "medicine_stock_days": 7,
    "food_stock_days": 10
  },
  {
    "name": "East Jaintia Hills",
    "state": "Meghalaya",
    "status": "DEGRADED",
    "active_lifelines": 1,
    "blocked_roads": 1,
    "priority_depot": "Khliehriat Supply Base",
    "medicine_stock_days": 11,
    "food_stock_days": 16
  }
];


export { CORRIDOR_DRIVING_ROUTES } from './corridorDrivingRoutes.js';

// ==============================================================================
// FEATURE 1: ARMY & EMERGENCY RESPONSE RESOURCES
// ==============================================================================
export const ARMY_EMERGENCY_RESOURCES = {
  algs_and_helipads: [
    {
      id: "ALG_TAWANG",
      name: "Tawang Advanced Landing Ground & Helipad Base",
      location: "Tawang Frontier Sector",
      state: "Arunachal Pradesh",
      elevation_m: 3048.0,
      coordinates: [27.5861, 91.8594],
      aircraft_compatibility: ["ALH_DHRUV", "MI_17_V5", "CH_47_CHINOOK"],
      capacity_helo: 6,
      fuel_atf_available: true,
      status: "OPERATIONAL",
      assigned_squad: "105 Helicopter Unit (Siachen Pioneers Det.)",
      contact_freq: "123.45 MHz (Tawang Air Ops)"
    },
    {
      id: "AFS_TEZPUR",
      name: "Tezpur Air Force Station & Tri-Service Staging Hub",
      location: "Tezpur Plains",
      state: "Assam",
      elevation_m: 78.0,
      coordinates: [26.7095, 92.7844],
      aircraft_compatibility: ["C_130J_SUPER_HERCULES", "AN_32", "MI_17_V5", "CH_47_CHINOOK", "ALH_DHRUV"],
      capacity_helo: 18,
      fuel_atf_available: true,
      status: "STRATEGIC_MASTER_HUB",
      assigned_squad: "Eastern Air Command (4 Corps Liaison)",
      contact_freq: "128.80 MHz (Tezpur Tower)"
    },
    {
      id: "ALG_MECHUKA",
      name: "Mechuka Advanced Landing Ground",
      location: "Shi Yomi District",
      state: "Arunachal Pradesh",
      elevation_m: 1828.0,
      coordinates: [28.6012, 94.1352],
      aircraft_compatibility: ["C_130J", "AN_32", "CH_47_CHINOOK", "ALH_DHRUV"],
      capacity_helo: 4,
      fuel_atf_available: true,
      status: "OPERATIONAL",
      assigned_squad: "48 Squadron IAF / Army Avn Flight",
      contact_freq: "121.50 MHz (Mechuka Ops)"
    },
    {
      id: "ALG_WALONG",
      name: "Walong Helipad & Tactical Staging Post",
      location: "Anjaw Valley (Eastern Frontier)",
      state: "Arunachal Pradesh",
      elevation_m: 1090.0,
      coordinates: [28.1345, 97.0123],
      aircraft_compatibility: ["ALH_DHRUV", "MI_17_V5", "CH_47_CHINOOK"],
      capacity_helo: 4,
      fuel_atf_available: true,
      status: "OPERATIONAL",
      assigned_squad: "Army Aviation R&R Detachment",
      contact_freq: "124.10 MHz"
    },
    {
      id: "ALG_TUTING",
      name: "Tuting Advanced Landing Ground",
      location: "Upper Siang Brahmaputra Entry",
      state: "Arunachal Pradesh",
      elevation_m: 610.0,
      coordinates: [28.9912, 94.8987],
      aircraft_compatibility: ["C_130J", "AN_32", "CH_47_CHINOOK", "ALH_DHRUV"],
      capacity_helo: 5,
      fuel_atf_available: true,
      status: "OPERATIONAL",
      assigned_squad: "Siang HADR Air Wing",
      contact_freq: "122.90 MHz"
    },
    {
      id: "HELI_SUKNA",
      name: "Sukna Helipad (33 Corps Trishakti Command)",
      location: "Siliguri Gateway",
      state: "West Bengal",
      elevation_m: 135.0,
      coordinates: [26.7912, 88.3614],
      aircraft_compatibility: ["ALH_DHRUV", "MI_17_V5", "CH_47_CHINOOK"],
      capacity_helo: 8,
      fuel_atf_available: true,
      status: "OPERATIONAL",
      assigned_squad: "33 Corps Aviation Flight (Sikkim Air-Bridge)",
      contact_freq: "126.70 MHz"
    },
    {
      id: "HELI_DIMAPUR",
      name: "Dimapur Military Helipad Hub (3 Corps)",
      location: "Dimapur Rail Gateway",
      state: "Nagaland",
      elevation_m: 145.0,
      coordinates: [25.8839, 93.7712],
      aircraft_compatibility: ["ALH_DHRUV", "MI_17_V5", "CH_47_CHINOOK"],
      capacity_helo: 10,
      fuel_atf_available: true,
      status: "OPERATIONAL",
      assigned_squad: "Spear Corps Aviation Sqn",
      contact_freq: "119.30 MHz"
    }
  ],
  combat_engineer_units: [
    {
      id: "ENG_14_REGT",
      regiment: "14 Engineer Regiment (The Bombay Sappers)",
      base_location: "Bhalukpong Staging Post (km 48)",
      task_force: "Project Vartak (42 BRTF Integration)",
      equipment: ["Class 70 Extra-Wide Bailey Bridges (120 ft)", "Tracked High-Reach Excavators (3)", "Pneumatic Rock Drillers (4)"],
      bailey_bridge_class: "CLASS_70_HEAVY_ASSAULT",
      tracked_dozers: 4,
      snow_cutters: 2,
      status: "COMBAT_READY",
      readiness: "15 MIN RAPID RESPONSE",
      eta_to_chokepoints: { Sessa_Landslide: "35 mins", NagMandir: "50 mins", Kaspi_Bridge: "65 mins" }
    },
    {
      id: "ENG_411_FLD",
      regiment: "411 Field Company (Engineers)",
      base_location: "Balipara Strategic Junction",
      task_force: "Gajraj Corps River Crossing Detachment",
      equipment: ["Class 40 Bailey Bridges (180 ft)", "Brahmaputra Pontoon Rescue Rafts (6)", "Heavy Winch Recovery Tractors (2)"],
      bailey_bridge_class: "CLASS_40_CIVIL_RELIEF",
      tracked_dozers: 3,
      snow_cutters: 0,
      status: "DEPLOYABLE",
      readiness: "30 MINS",
      eta_to_chokepoints: { Bhalukpong: "25 mins", Tezpur: "20 mins", Orang_Bypass: "40 mins" }
    },
    {
      id: "ENG_58_BRTF",
      regiment: "58 Border Roads Task Force Heavy Plant Platoon",
      base_location: "Dirang Sub-Depot (km 172)",
      task_force: "Project Vartak Alpine Sector",
      equipment: ["Schmidt Rotary Snow Cutters (2)", "Caterpillar D8R Heavy Mountain Dozers (2)", "Salt & Grit Spreader Trucks (4)"],
      bailey_bridge_class: "CLASS_24_EXPEDIENT",
      tracked_dozers: 5,
      snow_cutters: 4,
      status: "ACTIVE_ALPINES",
      readiness: "IMMEDIATE (ON PATROL)",
      eta_to_chokepoints: { Sela_Pass_Summit: "25 mins", Jaswant_Garh: "40 mins", Jang_Bridge: "50 mins" }
    },
    {
      id: "NDRF_12_BN",
      regiment: "12th Battalion National Disaster Response Force (NDRF)",
      base_location: "Doimukh / Itanagar Regional HQ",
      task_force: "NER Inter-Agency Disaster Task Force",
      equipment: ["Inflatable Motorized Boats (18)", "Deep Trench Shoring Kits", "Acoustic Life Locators (K-9 Squads)", "Hydraulic Debris Spreaders"],
      bailey_bridge_class: "COLLAPSE_RESCUE_ONLY",
      tracked_dozers: 2,
      snow_cutters: 1,
      status: "DISASTER_DEPLOYED",
      readiness: "20 MINS",
      eta_to_chokepoints: { Bhalukpong: "45 mins", Tezpur: "55 mins", Kaziranga: "70 mins" }
    }
  ],
  field_medical_units: [
    {
      id: "MH_181_TAWANG",
      name: "181 Military Hospital (High-Altitude Trauma Center)",
      location: "Tawang Cantonment",
      beds: 120,
      icu_ventilators: 14,
      hyperbaric_chambers: 2,
      cryogenic_oxygen_days: 18,
      blood_reserve_units: 85,
      mobile_surgical_units: 2,
      air_evac_helipad: "ON_CAMPUS"
    },
    {
      id: "BH_155_TEZPUR",
      name: "155 Base Hospital (Level-3 Regional Tertiary Command)",
      location: "Tezpur Defence Enclave",
      beds: 450,
      icu_ventilators: 35,
      hyperbaric_chambers: 4,
      cryogenic_oxygen_days: 30,
      blood_reserve_units: 240,
      mobile_surgical_units: 4,
      air_evac_helipad: "CONNECTED_AFS_TEZPUR"
    },
    {
      id: "FMA_404_SELA",
      name: "404 Field Ambulance Post & Oxygen Staging Hub",
      location: "Sela Tunnel South Portal (km 208)",
      beds: 25,
      icu_ventilators: 4,
      hyperbaric_chambers: 1,
      cryogenic_oxygen_days: 12,
      blood_reserve_units: 30,
      mobile_surgical_units: 1,
      air_evac_helipad: "SELA_SOUTH_LZ"
    }
  ],
  active_rescue_missions: [
    {
      id: "OP_HIMRAHAT_24",
      title: "Operation Himrahat: Sela Pass Sudden Blizzard Evacuation",
      sector: "Sela Pass Summit (Elevation 3,733m)",
      incident_type: "HIGH_ALTITUDE_BLIZZARD",
      severity: "CRITICAL_LIFE_THREAT",
      personnel_deployed: 48,
      helo_deployed: "2x ALH Dhruv (105 Helo Unit)",
      civilian_casualties_prevented: 34,
      status: "ACTIVE_SUCCESSFUL",
      start_time: "04:15 IST Today",
      narrative: "BRO Project Vartak dozers and 14 Sappers successfully cleared 4-foot snowdrifts between Jaswant Garh and Sela Summit. 14 civilian SUVs and 2 civil milk tankers safely escorted through Sela Tunnel south portal."
    },
    {
      id: "OP_BRAHMA_SEVA",
      title: "Operation Brahma Seva: Majuli Island Inundation Relief",
      sector: "Majuli River Island / Brahmaputra Reach",
      incident_type: "RIVERINE_FLOOD_BREACH",
      severity: "HIGH_VULNERABILITY",
      personnel_deployed: 62,
      helo_deployed: "1x Mi-17 V5 (Airdrop Ration Drops)",
      civilian_casualties_prevented: 120,
      status: "ONGOING_MONITORING",
      start_time: "Yesterday 18:30 IST",
      narrative: "Brahmaputra overflow breached protective ring bund near Kamalabari Ghat. 411 Field Company deployed 4 pontoon rescue boats, evacuating vulnerable households and delivering 4 tonnes of purified drinking water and baby food."
    },
    {
      id: "OP_TEESTA_SHORE",
      title: "Operation Teesta Shore: NH-10 River Scour Emergency Bailey Bridge",
      sector: "Teesta Bazaar Defile (km 42)",
      incident_type: "RIVER_FOUNDATION_COLLAPSE",
      severity: "LIFELINE_SEVERED",
      personnel_deployed: 55,
      helo_deployed: "Air Recon ALH Dhruv",
      civilian_casualties_prevented: 0,
      status: "ENGINEERING_LAUNCH",
      start_time: "06:00 IST Today",
      narrative: "Flash flood scouring by Teesta River washed out a 28-meter asphalt apron. 33 Corps Engineers and BRO Project Swastik are launching a 100-ft Class 70 Bailey bridge to restore Sikkim's only lifeline to Siliguri."
    }
  ]
};

// ==============================================================================
// FEATURE 2: REGIONAL HAZARDS & HYDROLOGY DATA
// ==============================================================================
export const REGIONAL_HAZARD_INTELLIGENCE = {
  brahmaputra_flood_system: {
    river_name: "Brahmaputra (Yarlung Tsangpo downstream)",
    annual_monsoon_discharge_max_cumecs: 72400.0,
    current_regional_state: "ACTIVE_MONSOON_SURGE",
    river_stations: [
      {
        station: "Guwahati (DC Court Ghat)",
        river: "Brahmaputra",
        state: "Assam",
        danger_level_m: 49.68,
        current_level_m: 49.85,
        status: "ABOVE_DANGER_LEVEL",
        trend: "RISING (+0.08m/6h)",
        discharge_cumecs: 52400.0,
        ferry_transit_status: "INLAND_WATERWAYS_FERRY_SUSPENDED"
      },
      {
        station: "Tezpur (Jahaj Ghat)",
        river: "Brahmaputra",
        state: "Assam",
        danger_level_m: 65.23,
        current_level_m: 65.05,
        status: "WARNING_HIGH_VELOCITY",
        trend: "RISING (+0.12m/6h)",
        discharge_cumecs: 48900.0,
        ferry_transit_status: "RESTRICTED_DAYLIGHT_ONLY"
      },
      {
        station: "Dibrugarh (Overman Ghat)",
        river: "Brahmaputra",
        state: "Assam",
        danger_level_m: 105.70,
        current_level_m: 106.12,
        status: "CRITICAL_INUNDATION",
        trend: "STEADY_AT_PEAK",
        discharge_cumecs: 58200.0,
        ferry_transit_status: "TOTAL_SUSPENSION"
      },
      {
        station: "Majuli (Kamalabari Ghat)",
        river: "Brahmaputra & Subansiri Confluence",
        state: "Assam",
        danger_level_m: 85.50,
        current_level_m: 85.92,
        status: "EMBANKMENT_BREACH_ALERT",
        trend: "RISING (+0.05m/6h)",
        discharge_cumecs: 56100.0,
        ferry_transit_status: "EMERGENCY_ARMY_BOATS_ONLY"
      },
      {
        station: "Goalpara (Steamer Ghat)",
        river: "Brahmaputra",
        state: "Assam",
        danger_level_m: 36.27,
        current_level_m: 35.80,
        status: "NORMAL_WATCH",
        trend: "RISING_SLOWLY",
        discharge_cumecs: 44000.0,
        ferry_transit_status: "OPERATIONAL"
      }
    ],
    flood_impact_summary: "Brahmaputra river volume is surging due to intense cloudbursts in Arunachal foothills and upper Tibet. Kaziranga highway animal corridors (NH-27) have speed restrictions enforced (40 km/h) to protect migrating wildlife. Majuli approach ferry service is suspended."
  },
  transboundary_nepal_catchments: [
    {
      id: "RISK_KOSHI_RUNOFF",
      origin_country: "Nepal (Eastern Catchment)",
      basin: "Saptakoshi Basin (Sun Kosi, Arun, Tamur)",
      vulnerable_districts: ["Darjeeling (WB)", "Jalpaiguri (WB)", "Koch Bihar (WB)", "Dhubri (Assam)"],
      upstream_rain_24h_mm: 184.5,
      risk_level: "HIGH_SURGE_RISK",
      warning_narrative: "Intense Himalayan orographic downpours across Eastern Nepal are creating massive silt runoff into the Koshi and Teesta river basins. Downstream flash inundations threaten North Bengal road-rail lifelines connecting mainland India to Assam."
    },
    {
      id: "RISK_MECHI_KANKAI",
      origin_country: "Nepal (Southern Terai Hills)",
      basin: "Mechi & Mahananda Basins",
      vulnerable_districts: ["Siliguri Corridor / Siliguri 'Chicken's Neck'", "Kishanganj Gateway"],
      upstream_rain_24h_mm: 142.0,
      risk_level: "MODERATE_WATCH",
      warning_narrative: "Mechi river discharge is overflowing local banks near the Indo-Nepal border, with backwater eddies eroding foundation embankments along the NH-27 bypass link."
    }
  ],
  sikkim_snow_and_ice_zones: [
    {
      pass_name: "Sela Pass Alpine Summit & Tunnel Bypass",
      corridor: "CORRIDOR_NH13",
      state: "Arunachal Pradesh",
      elevation_m: 3733.0,
      temperature_c: -2.8,
      snow_depth_cm: 38.0,
      snow_chain_mandate: true,
      tunnel_bypass_name: "Twin-Tube Sela Tunnel (Elevation 3,000m)",
      tunnel_status: "ALL_WEATHER_OPERATIONAL",
      pass_status: "SUMMIT_SURFACE_RESTRICTED"
    },
    {
      pass_name: "Nathu La International Border Pass",
      corridor: "CORRIDOR_NH10_EXT",
      state: "Sikkim",
      elevation_m: 4310.0,
      temperature_c: -6.5,
      snow_depth_cm: 65.0,
      snow_chain_mandate: true,
      tunnel_bypass_name: "None (High Surface Pass)",
      tunnel_status: "NO_TUNNEL",
      pass_status: "BLIZZARD_CLOSED_TO_CIVILIAN"
    },
    {
      pass_name: "Teesta Valley Defile (Sevoke to Teesta Bazaar)",
      corridor: "CORRIDOR_NH10",
      state: "West Bengal / Sikkim Border",
      elevation_m: 220.0,
      temperature_c: 19.5,
      snow_depth_cm: 0.0,
      snow_chain_mandate: false,
      tunnel_bypass_name: "Sevoke-Rangpo Railway Tunnel (Under Construction)",
      tunnel_status: "RAILWAY_TUNNEL_IN_PROGRESS",
      pass_status: "RESTRICTED_RIVER_SCOUR"
    },
    {
      pass_name: "Sonapur Mudflow Tunnel Escarpment",
      corridor: "CORRIDOR_NH6",
      state: "Meghalaya",
      elevation_m: 580.0,
      temperature_c: 21.0,
      snow_depth_cm: 0.0,
      snow_chain_mandate: false,
      tunnel_bypass_name: "Sonapur Concrete Deflection Tunnel (130m)",
      tunnel_status: "OPERATIONAL_SINGLE_LANE",
      pass_status: "MUD_SLURRY_CAUTION"
    }
  ]
};

// ==============================================================================
// FEATURE 3: ROADWORKS, SEASONAL CLOSURES & CONNECTIVITY GAPS
// ==============================================================================
export const ROADWORKS_AND_CONNECTIVITY = {
  ongoing_roadworks: [
    {
      id: "RW_NH13_01",
      corridor: "CORRIDOR_NH13",
      stretch: "Bhalukpong -> Tippi Orchid Gorge (km 34 to 48)",
      agency: "BRO Project Vartak (42 BRTF)",
      work_type: "2-Lane National Highway Widening & Concrete Paving",
      traffic_impact: "Single-lane escorted transit with 15-min alternating pulses",
      lane_status: "SINGLE_LANE_ALTERNATING",
      progress_pct: 74.0,
      target_completion: "December 2026"
    },
    {
      id: "RW_NH13_02",
      corridor: "CORRIDOR_NH13",
      stretch: "Sessa Scree Slide Chokepoint (km 78)",
      agency: "BRO & National Highways Infrastructure Development Corp (NHIDCL)",
      work_type: "High-Tensile Steel Wire Slope Netting & Rockfall Deflection Berm",
      traffic_impact: "Rolling 20-min work closures during drilling hours (10:00 - 15:00)",
      lane_status: "CAUTION_STOP_AND_GO",
      progress_pct: 82.0,
      target_completion: "November 2026"
    },
    {
      id: "RW_NH10_01",
      corridor: "CORRIDOR_NH10",
      stretch: "Sevoke Bridge to Teesta Bazaar (km 18 to 32)",
      agency: "West Bengal PWD & Project Swastik",
      work_type: "Teesta River Gabion Box Shoring & Concrete Scour Skirt Construction",
      traffic_impact: "Heavy vehicles >18 tonnes diverted via Melli / Kalimpong loop",
      lane_status: "RESTRICTED_WEIGHT_LIMIT",
      progress_pct: 58.0,
      target_completion: "March 2027"
    },
    {
      id: "RW_NH6_01",
      corridor: "CORRIDOR_NH6",
      stretch: "Sonapur Mudflow Tunnel Roof Chute (km 112)",
      agency: "Project Pushpak & Meghalaya PWD",
      work_type: "Concrete Over-Tunnel Debris Deflection Flume Extension",
      traffic_impact: "No road stoppage; debris channeled over tunnel roof",
      lane_status: "OPEN_CONTROLLED",
      progress_pct: 91.0,
      target_completion: "October 2026"
    }
  ],
  seasonal_closures: [
    {
      corridor: "NH-13 (Kameng Gorge)",
      stretch: "Bhalukpong to Bomdila (km 48 - 135)",
      closure_type: "MONSOON_NIGHT_TRAVEL_RESTRICTION",
      hours: "19:00 IST to 05:00 IST Daily (During Active Monsoon)",
      reason: "Sudden unlit rockfalls, zero-visibility hill fog, and flash torrents crossing pavement.",
      authorized_exceptions: "Emergency Military & Medical Convoys with BRO Pilot Vehicle"
    },
    {
      corridor: "NH-13 (Sela High Summit Pass)",
      stretch: "Jaswant Garh to Sela Pass Top (3,733m)",
      closure_type: "WINTER_SNOW_CLOSURE",
      hours: "November to April Annually",
      reason: "Sub-zero blizzard accumulation up to 6 feet of snow on old high summit.",
      authorized_exceptions: "All normal and heavy traffic is routed through the all-weather Sela Twin-Tube Tunnel (Elevation 3,000m)"
    },
    {
      corridor: "NH-29 (Paglapahar Gorge)",
      stretch: "Chumukedima to Paglapahar (km 14 - 22)",
      closure_type: "HEAVY_RAINFALL_HOURLY_HALT",
      hours: "Triggered when rainfall exceeds 35mm/hr",
      reason: "Vertical shale-sandstone cliffs shed boulders onto highway during downpours.",
      authorized_exceptions: "None until BRO spotters declare slope stable"
    }
  ],
  connectivity_gaps: [
    {
      district_or_sector: "Tawang Frontier District",
      state: "Arunachal Pradesh",
      isolated_if_chokepoint_fails: "Sessa Scree Slide (km 78) or Jang River Bridge (km 218)",
      population_at_risk: 49977,
      single_lifeline_artery: "NH-13 (Balipara - Bomdila - Tawang)",
      alternative_bypass: "Balipara -> Orang -> Bhairabkunda -> Kalaktang -> Shergaon -> Rupa (NH-13 Bypass)",
      vulnerability_rating: "HIGH_SINGLE_POINT_VULNERABILITY"
    },
    {
      district_or_sector: "Barak Valley (Silchar, Karimganj) & Tripura",
      state: "Assam & Tripura",
      isolated_if_chokepoint_fails: "Sonapur Mudflow Tunnel (NH-6 Meghalaya)",
      population_at_risk: 4120000,
      single_lifeline_artery: "NH-6 (Shillong - Jowai - Sonapur - Silchar)",
      alternative_bypass: "Lumding - Badarpur Broad Gauge Rail Link (Zero all-weather road alternative)",
      vulnerability_rating: "CRITICAL_STRATEGIC_CHOKEPOINT"
    },
    {
      district_or_sector: "Sikkim Himalayan State (Gangtok & North Sikkim)",
      state: "Sikkim",
      isolated_if_chokepoint_fails: "Sevoke Coronation Bridge or Teesta Bazaar Foundation",
      population_at_risk: 690000,
      single_lifeline_artery: "NH-10 (Siliguri - Teesta - Gangtok)",
      alternative_bypass: "Siliguri -> Damdim -> Gorubathan -> Lava -> Damthang (Long mountain winding detour)",
      vulnerability_rating: "HIGH_SINGLE_POINT_VULNERABILITY"
    },
    {
      district_or_sector: "Imphal Valley & Manipur Interior",
      state: "Manipur",
      isolated_if_chokepoint_fails: "Paglapahar Gorge or Zubza Sinking Zone (NH-29)",
      population_at_risk: 2855000,
      single_lifeline_artery: "NH-29 / NH-2 (Dimapur - Kohima - Imphal)",
      alternative_bypass: "NH-37 (Silchar - Jiribam - Noney - Imphal Lifeline)",
      vulnerability_rating: "CRITICAL_DUAL_CORRIDOR_RISK"
    }
  ]
};

// ==============================================================================
// FEATURE 4: MULTI-MODAL LOGISTICS & CORRIDOR THROUGHPUT
// ==============================================================================
export const MULTIMODAL_LOGISTICS = {
  railhead_terminals: [
    {
      id: "RAIL_SILIGURI",
      name: "Siliguri Junction NFR Freight Terminal & ICD",
      gauge: "1,676 mm Broad Gauge (Electrified)",
      daily_freight_rakes: 12,
      terminal_capacity_tonnes: 18000.0,
      connected_highway: "NH-10 to Sikkim & NH-27 East-West Arterial",
      transshipment_modes: ["HEAVY_CIVIL_TRUCKS", "CONVOY_4X4", "MILITARY_SPECIALS"],
      status: "OPERATIONAL_HIGH_CAPACITY"
    },
    {
      id: "RAIL_DIMAPUR",
      name: "Dimapur Railway Goods Shed & Staging Yard",
      gauge: "1,676 mm Broad Gauge",
      daily_freight_rakes: 6,
      terminal_capacity_tonnes: 9000.0,
      connected_highway: "NH-29 to Kohima & Imphal",
      transshipment_modes: ["FOOD_GRAIN_PDS", "POL_FUEL_TANKERS", "ARMY_ESCORTED_TRUCKS"],
      status: "OPERATIONAL"
    },
    {
      id: "RAIL_BHALUKPONG",
      name: "Bhalukpong Railway Terminus (Arunachal Foothill Gate)",
      gauge: "1,676 mm Broad Gauge (Branch line from Dekargaon)",
      daily_freight_rakes: 2,
      terminal_capacity_tonnes: 3500.0,
      connected_highway: "NH-13 to Bomdila & Tawang",
      transshipment_modes: ["MOUNTAIN_COLD_CHAIN", "4X4_MEDIUM_CARRIERS", "ARMY_SUPPLY_CORPS"],
      status: "OPERATIONAL"
    },
    {
      id: "RAIL_GUWAHATI",
      name: "Guwahati Inland Container Depot (ICD Amingaon)",
      gauge: "1,676 mm Broad Gauge (Electrified Double Track)",
      daily_freight_rakes: 20,
      terminal_capacity_tonnes: 35000.0,
      connected_highway: "NH-27, NH-15, NH-6, NH-13",
      transshipment_modes: ["INTER_STATE_CONTAINERS", "CRYOGENIC_OXYGEN", "PETROLEUM_RAKES"],
      status: "REGIONAL_MEGA_TERMINAL"
    }
  ],
  vehicle_accommodation_matrix: [
    {
      vehicle_class: "HEAVY_CIVIL_TRUCK_10_TO_14_WHEEL",
      max_gross_weight_tonnes: 42.0,
      max_height_m: 4.2,
      turning_radius_m: 14.5,
      permitted_on_passes: false,
      permitted_in_sela_tunnel: true,
      restricted_corridors: ["NH-13 Bhalukpong to Tawang (Tight hairpin bends <10m radius)", "NH-10 Sevoke Gorge (Bridge weight Class 24 limit)"],
      recommended_use: "Plains arterial freight (Guwahati - Tezpur - Siliguri - Dimapur)"
    },
    {
      vehicle_class: "MEDIUM_ALL_TERRAIN_TATA_1618_4X4",
      max_gross_weight_tonnes: 16.2,
      max_height_m: 3.4,
      turning_radius_m: 9.8,
      permitted_on_passes: true,
      permitted_in_sela_tunnel: true,
      restricted_corridors: [],
      recommended_use: "Standard mountain lifeline freight, cold-chain pharma, emergency oxygen cylinders"
    },
    {
      vehicle_class: "LIGHT_MOUNTAIN_PICKUP_4X4_BOLERO",
      max_gross_weight_tonnes: 3.4,
      max_height_m: 2.2,
      turning_radius_m: 6.2,
      permitted_on_passes: true,
      permitted_in_sela_tunnel: true,
      restricted_corridors: [],
      recommended_use: "High-speed trauma delivery, remote village feeder roads, single-lane bypass tracks"
    }
  ],
  corridor_hourly_throughput: [
    {
      corridor_segment: "NH-13: Sela Pass Old Summit Track (3,733m)",
      terrain_type: "Extreme High-Altitude Alpine Single Lane",
      max_safe_vehicles_per_hour: 15,
      current_vehicle_load_per_hour: 8,
      congestion_index: "CONTROLLED_CONVOY_INTERVAL",
      convoy_control_mode: "PILOT_VEHICLE_ESCORTED"
    },
    {
      corridor_segment: "NH-13: Sela Twin-Tube Tunnel (Elevation 3,000m)",
      terrain_type: "Engineered Modern 2-Lane All-Weather Tunnel",
      max_safe_vehicles_per_hour: 140,
      current_vehicle_load_per_hour: 42,
      congestion_index: "FREE_FLOW",
      convoy_control_mode: "AUTONOMOUS_RADAR_MONITORED"
    },
    {
      corridor_segment: "NH-13 Bypass: Kalaktang -> Shergaon -> Rupa",
      terrain_type: "BRO Mountain Paved Double Lane",
      max_safe_vehicles_per_hour: 55,
      current_vehicle_load_per_hour: 24,
      congestion_index: "NORMAL_STABLE",
      convoy_control_mode: "STANDARD_TWO_WAY"
    },
    {
      corridor_segment: "NH-29: Chumukedima -> Paglapahar Gorge",
      terrain_type: "Narrow Gorge Escarpment Single Lane Defile",
      max_safe_vehicles_per_hour: 25,
      current_vehicle_load_per_hour: 22,
      congestion_index: "NEAR_CAPACITY_BOTTLENECK",
      convoy_control_mode: "POLICE_ALTERNATING_CONVOY"
    },
    {
      corridor_segment: "NH-27: Guwahati -> Tezpur Plains Arterial",
      terrain_type: "4-Lane National Highway Plains",
      max_safe_vehicles_per_hour: 380,
      current_vehicle_load_per_hour: 165,
      congestion_index: "SMOOTH_RAPID",
      convoy_control_mode: "UNRESTRICTED_MULTILANE"
    }
  ]
};

// ==============================================================================
// FEATURE 5: FUEL & ENERGY AVAILABILITY
// ==============================================================================
export const FUEL_AND_ENERGY_RESERVES = {
  fuel_stations: [
    {
      id: "IOCL_BOMDILA",
      name: "Indian Oil (IOCL) High-Altitude Fuel Station",
      operator: "Indian Oil Corporation Ltd",
      corridor: "CORRIDOR_NH13",
      chainage_km: "NH-13 km 135 (Bomdila)",
      coordinates: [27.2644, 92.4241],
      winter_diesel_available: true,
      regular_diesel_kl: 65.0,
      petrol_kl: 38.0,
      atf_available: false,
      lpg_depot: true,
      emergency_generator_fuel_kl: 12.0,
      status: "OPERATIONAL_FULL_STOCK"
    },
    {
      id: "HPCL_DIRANG",
      name: "Hindustan Petroleum (HPCL) Dirang Outpost Bunk",
      operator: "HPCL",
      corridor: "CORRIDOR_NH13",
      chainage_km: "NH-13 km 172 (Dirang)",
      coordinates: [27.3578, 92.2394],
      winter_diesel_available: true,
      regular_diesel_kl: 42.0,
      petrol_kl: 25.0,
      atf_available: false,
      lpg_depot: true,
      emergency_generator_fuel_kl: 8.0,
      status: "OPERATIONAL"
    },
    {
      id: "IOCL_SELA_SOUTH",
      name: "IOCL Sela Tunnel Strategic Fuel Reserve Point",
      operator: "IOCL / BRO Joint Depot",
      corridor: "CORRIDOR_NH13",
      chainage_km: "NH-13 km 208 (Sela South Portal)",
      coordinates: [27.4868, 92.1126],
      winter_diesel_available: true,
      regular_diesel_kl: 90.0,
      petrol_kl: 15.0,
      atf_available: true,
      lpg_depot: false,
      emergency_generator_fuel_kl: 35.0,
      status: "DEFENCE_AND_EMERGENCY_PRIORITY"
    },
    {
      id: "IOCL_TAWANG",
      name: "Indian Oil (IOCL) Tawang Civil & Military Fuel Base",
      operator: "Indian Oil Corporation Ltd",
      corridor: "CORRIDOR_NH13",
      chainage_km: "NH-13 km 248 (Tawang)",
      coordinates: [27.5861, 91.8594],
      winter_diesel_available: true,
      regular_diesel_kl: 75.0,
      petrol_kl: 44.0,
      atf_available: true,
      lpg_depot: true,
      emergency_generator_fuel_kl: 28.0,
      status: "OPERATIONAL"
    },
    {
      id: "IOCL_BHALUKPONG",
      name: "Bhalukpong Foothill Gateway Fuel Station",
      operator: "Indian Oil Corporation Ltd",
      corridor: "CORRIDOR_NH13",
      chainage_km: "NH-13 km 48 (Bhalukpong)",
      coordinates: [27.0125, 92.6514],
      winter_diesel_available: false,
      regular_diesel_kl: 120.0,
      petrol_kl: 80.0,
      atf_available: false,
      lpg_depot: true,
      emergency_generator_fuel_kl: 15.0,
      status: "OPERATIONAL"
    },
    {
      id: "HPCL_TEESTA",
      name: "HPCL Teesta Valley Outpost",
      operator: "HPCL",
      corridor: "CORRIDOR_NH10",
      chainage_km: "NH-10 km 42 (Teesta Bazaar)",
      coordinates: [27.058, 88.435],
      winter_diesel_available: false,
      regular_diesel_kl: 22.0,
      petrol_kl: 14.0,
      atf_available: false,
      lpg_depot: false,
      emergency_generator_fuel_kl: 6.0,
      status: "LOW_STOCK_FLOOD_RESTRICTED"
    }
  ],
  district_energy_stock_days: [
    { district: "Kamrup Metro (Guwahati)", state: "Assam", diesel_days: 32, petrol_days: 28, lpg_cylinder_days: 45, hospital_gen_fuel_days: 60 },
    { district: "Sonitpur (Tezpur)", state: "Assam", diesel_days: 25, petrol_days: 22, lpg_cylinder_days: 35, hospital_gen_fuel_days: 45 },
    { district: "West Kameng (Bomdila)", state: "Arunachal Pradesh", diesel_days: 14, petrol_days: 12, lpg_cylinder_days: 16, hospital_gen_fuel_days: 24 },
    { district: "Tawang", state: "Arunachal Pradesh", diesel_days: 6, petrol_days: 5, lpg_cylinder_days: 7, hospital_gen_fuel_days: 18 },
    { district: "East Jaintia Hills", state: "Meghalaya", diesel_days: 12, petrol_days: 10, lpg_cylinder_days: 14, hospital_gen_fuel_days: 20 },
    { district: "Gangtok", state: "Sikkim", diesel_days: 9, petrol_days: 8, lpg_cylinder_days: 11, hospital_gen_fuel_days: 21 },
    { district: "Kohima", state: "Nagaland", diesel_days: 11, petrol_days: 9, lpg_cylinder_days: 13, hospital_gen_fuel_days: 22 },
    { district: "Imphal West", state: "Manipur", diesel_days: 5, petrol_days: 4, lpg_cylinder_days: 6, hospital_gen_fuel_days: 12 }
  ],
  local_energy_and_forest_biomass_dependence: [
    {
      district: "Tawang Frontier",
      remote_communities: "Monpa & Sharchop High-Altitude Hamlets (Mukto, Zemithang, Lumla, Kitpi)",
      firewood_biomass_dependence_pct: 74.5,
      community_firewood_depots: 22,
      firewood_stock_days: 45,
      winter_heating_status: "SUFFICIENT_DRY_STOCK_PREPARED",
      lpg_refill_backlog_days: 14
    },
    {
      district: "West Kameng (Upper Reach)",
      remote_communities: "Shergaon, Nafra, Thembang Tribal Settlements",
      firewood_biomass_dependence_pct: 58.0,
      community_firewood_depots: 15,
      firewood_stock_days: 38,
      winter_heating_status: "STABLE",
      lpg_refill_backlog_days: 8
    },
    {
      district: "North Sikkim",
      remote_communities: "Lachen, Lachung, Dzongu Tribal Pockets",
      firewood_biomass_dependence_pct: 68.2,
      community_firewood_depots: 12,
      firewood_stock_days: 35,
      winter_heating_status: "MODERATE_GLOF_DISRUPTION_RISK",
      lpg_refill_backlog_days: 18
    },
    {
      district: "Nagaland & Manipur Hill Pockets",
      remote_communities: "Phek, Kiphire, Senapati Ridge Villages",
      firewood_biomass_dependence_pct: 62.0,
      community_firewood_depots: 18,
      firewood_stock_days: 32,
      winter_heating_status: "STABLE_COMMUNITY_MANAGED",
      lpg_refill_backlog_days: 12
    }
  ]
};

// ==========================================
// FEATURE 6: BUFFER STOCKS & EMERGENCY INVENTORY
// ==========================================
export const DEFAULT_BUFFER_STOCKS = {
  "Tawang": {
    district_id: "DST_AR_01",
    district_name: "Tawang",
    state: "Arunachal Pradesh",
    isolation_risk_index: 0.94,
    total_population: 49977,
    overall_stock_runway_days: 18,
    status: "DEFICIT_RISK",
    pre_disaster_procurement_active: true,
    critical_replenishment_needed: ["Perishable Vegetables", "Infant Nutrition", "LPG Cylinders"],
    commodities: [
      { name: "PDS Rice & Wheat", category: "GRAIN", current_stock_mt: 180.0, safety_buffer_mt: 350.0, daily_burn_rate_mt: 8.5, days_remaining: 21, status: "WARNING" },
      { name: "Lentils & Pulses (Dal)", category: "PULSE", current_stock_mt: 42.0, safety_buffer_mt: 80.0, daily_burn_rate_mt: 1.9, days_remaining: 22, status: "WARNING" },
      { name: "Mustard Cooking Oil", category: "EDIBLE_OIL", current_stock_mt: 28.0, safety_buffer_mt: 45.0, daily_burn_rate_mt: 1.2, days_remaining: 23, status: "WARNING" },
      { name: "Potatoes, Onions & Cabbage", category: "VEGETABLE", current_stock_mt: 12.0, safety_buffer_mt: 65.0, daily_burn_rate_mt: 3.4, days_remaining: 3, status: "CRITICAL" },
      { name: "Emergency Trauma & Antibiotics", category: "MEDICINE", current_stock_mt: 6.5, safety_buffer_mt: 12.0, daily_burn_rate_mt: 0.3, days_remaining: 21, status: "WARNING" },
      { name: "Infant Milk Formula & Baby Food", category: "BABY_FOOD", current_stock_mt: 1.8, safety_buffer_mt: 8.0, daily_burn_rate_mt: 0.4, days_remaining: 4, status: "CRITICAL" },
      { name: "Winter Diesel & Sub-Zero Kerosene", category: "WINTER_FUEL", current_stock_mt: 95.0, safety_buffer_mt: 220.0, daily_burn_rate_mt: 6.8, days_remaining: 14, status: "CRITICAL" }
    ]
  },
  "Anjaw": {
    district_id: "DST_AR_02",
    district_name: "Anjaw",
    state: "Arunachal Pradesh",
    isolation_risk_index: 0.98,
    total_population: 21167,
    overall_stock_runway_days: 9,
    status: "CRITICAL_SHORTAGE",
    pre_disaster_procurement_active: true,
    critical_replenishment_needed: ["PDS Rice & Wheat", "Emergency Medicines", "Winter Diesel"],
    commodities: [
      { name: "PDS Rice & Wheat", category: "GRAIN", current_stock_mt: 32.0, safety_buffer_mt: 120.0, daily_burn_rate_mt: 3.8, days_remaining: 8, status: "CRITICAL" },
      { name: "Lentils & Pulses (Dal)", category: "PULSE", current_stock_mt: 7.5, safety_buffer_mt: 25.0, daily_burn_rate_mt: 0.9, days_remaining: 8, status: "CRITICAL" },
      { name: "Mustard Cooking Oil", category: "EDIBLE_OIL", current_stock_mt: 5.0, safety_buffer_mt: 15.0, daily_burn_rate_mt: 0.5, days_remaining: 10, status: "CRITICAL" },
      { name: "Potatoes & Root Vegetables", category: "VEGETABLE", current_stock_mt: 4.0, safety_buffer_mt: 20.0, daily_burn_rate_mt: 1.4, days_remaining: 2, status: "CRITICAL" },
      { name: "Emergency Trauma & Antibiotics", category: "MEDICINE", current_stock_mt: 1.2, safety_buffer_mt: 5.0, daily_burn_rate_mt: 0.2, days_remaining: 6, status: "CRITICAL" },
      { name: "Infant Milk Formula & Baby Food", category: "BABY_FOOD", current_stock_mt: 0.9, safety_buffer_mt: 3.5, daily_burn_rate_mt: 0.15, days_remaining: 6, status: "CRITICAL" },
      { name: "Winter Diesel & Sub-Zero Kerosene", category: "WINTER_FUEL", current_stock_mt: 22.0, safety_buffer_mt: 85.0, daily_burn_rate_mt: 2.5, days_remaining: 8, status: "CRITICAL" }
    ]
  },
  "West_Kameng": {
    district_id: "DST_AR_03",
    district_name: "West Kameng",
    state: "Arunachal Pradesh",
    isolation_risk_index: 0.68,
    total_population: 83947,
    overall_stock_runway_days: 32,
    status: "NORMAL",
    pre_disaster_procurement_active: false,
    critical_replenishment_needed: [],
    commodities: [
      { name: "PDS Rice & Wheat", category: "GRAIN", current_stock_mt: 480.0, safety_buffer_mt: 500.0, daily_burn_rate_mt: 14.5, days_remaining: 33, status: "ADEQUATE" },
      { name: "Lentils & Pulses (Dal)", category: "PULSE", current_stock_mt: 110.0, safety_buffer_mt: 120.0, daily_burn_rate_mt: 3.4, days_remaining: 32, status: "ADEQUATE" },
      { name: "Mustard Cooking Oil", category: "EDIBLE_OIL", current_stock_mt: 68.0, safety_buffer_mt: 75.0, daily_burn_rate_mt: 2.1, days_remaining: 32, status: "ADEQUATE" },
      { name: "Potatoes, Onions & Cabbage", category: "VEGETABLE", current_stock_mt: 55.0, safety_buffer_mt: 70.0, daily_burn_rate_mt: 4.8, days_remaining: 11, status: "WARNING" },
      { name: "Emergency Trauma & Antibiotics", category: "MEDICINE", current_stock_mt: 18.0, safety_buffer_mt: 20.0, daily_burn_rate_mt: 0.5, days_remaining: 36, status: "ADEQUATE" },
      { name: "Infant Milk Formula & Baby Food", category: "BABY_FOOD", current_stock_mt: 9.0, safety_buffer_mt: 10.0, daily_burn_rate_mt: 0.3, days_remaining: 30, status: "ADEQUATE" },
      { name: "Winter Diesel & Sub-Zero Kerosene", category: "WINTER_FUEL", current_stock_mt: 210.0, safety_buffer_mt: 250.0, daily_burn_rate_mt: 7.2, days_remaining: 29, status: "ADEQUATE" }
    ]
  },
  "North_Sikkim": {
    district_id: "DST_SK_01",
    district_name: "North Sikkim",
    state: "Sikkim",
    isolation_risk_index: 0.96,
    total_population: 43709,
    overall_stock_runway_days: 11,
    status: "CRITICAL_SHORTAGE",
    pre_disaster_procurement_active: true,
    critical_replenishment_needed: ["PDS Rice & Wheat", "LPG Cylinders", "Potatoes & Onions"],
    commodities: [
      { name: "PDS Rice & Wheat", category: "GRAIN", current_stock_mt: 82.0, safety_buffer_mt: 240.0, daily_burn_rate_mt: 7.8, days_remaining: 10, status: "CRITICAL" },
      { name: "Lentils & Pulses (Dal)", category: "PULSE", current_stock_mt: 19.0, safety_buffer_mt: 55.0, daily_burn_rate_mt: 1.7, days_remaining: 11, status: "CRITICAL" },
      { name: "Mustard Cooking Oil", category: "EDIBLE_OIL", current_stock_mt: 13.0, safety_buffer_mt: 35.0, daily_burn_rate_mt: 1.1, days_remaining: 11, status: "CRITICAL" },
      { name: "Potatoes, Onions & Cabbage", category: "VEGETABLE", current_stock_mt: 7.0, safety_buffer_mt: 50.0, daily_burn_rate_mt: 3.1, days_remaining: 2, status: "CRITICAL" },
      { name: "Emergency Trauma & Antibiotics", category: "MEDICINE", current_stock_mt: 4.5, safety_buffer_mt: 11.0, daily_burn_rate_mt: 0.3, days_remaining: 15, status: "WARNING" },
      { name: "Infant Milk Formula & Baby Food", category: "BABY_FOOD", current_stock_mt: 1.5, safety_buffer_mt: 6.0, daily_burn_rate_mt: 0.25, days_remaining: 6, status: "CRITICAL" },
      { name: "Winter Diesel & Sub-Zero Kerosene", category: "WINTER_FUEL", current_stock_mt: 48.0, safety_buffer_mt: 160.0, daily_burn_rate_mt: 5.5, days_remaining: 8, status: "CRITICAL" }
    ]
  },
  "Sonitpur": {
    district_id: "DST_AS_02",
    district_name: "Sonitpur (Tezpur Hub)",
    state: "Assam",
    isolation_risk_index: 0.15,
    total_population: 1924110,
    overall_stock_runway_days: 68,
    status: "SURPLUS",
    pre_disaster_procurement_active: false,
    critical_replenishment_needed: [],
    commodities: [
      { name: "PDS Rice & Wheat", category: "GRAIN", current_stock_mt: 18500.0, safety_buffer_mt: 8000.0, daily_burn_rate_mt: 280.0, days_remaining: 66, status: "SURPLUS" },
      { name: "Lentils & Pulses (Dal)", category: "PULSE", current_stock_mt: 3800.0, safety_buffer_mt: 1800.0, daily_burn_rate_mt: 58.0, days_remaining: 65, status: "SURPLUS" },
      { name: "Mustard Cooking Oil", category: "EDIBLE_OIL", current_stock_mt: 2400.0, safety_buffer_mt: 1200.0, daily_burn_rate_mt: 36.0, days_remaining: 66, status: "SURPLUS" },
      { name: "Central Cold Storage Vegetables", category: "VEGETABLE", current_stock_mt: 1800.0, safety_buffer_mt: 900.0, daily_burn_rate_mt: 85.0, days_remaining: 21, status: "ADEQUATE" },
      { name: "District Base Hospital Medical Stock", category: "MEDICINE", current_stock_mt: 140.0, safety_buffer_mt: 60.0, daily_burn_rate_mt: 2.1, days_remaining: 66, status: "SURPLUS" },
      { name: "Infant Nutrition & Ready-to-Use Food", category: "BABY_FOOD", current_stock_mt: 120.0, safety_buffer_mt: 50.0, daily_burn_rate_mt: 1.8, days_remaining: 66, status: "SURPLUS" },
      { name: "IOCL Regional Fuel Terminal", category: "WINTER_FUEL", current_stock_mt: 9500.0, safety_buffer_mt: 4000.0, daily_burn_rate_mt: 140.0, days_remaining: 67, status: "SURPLUS" }
    ]
  }
};

// ==========================================
// FEATURE 7: WAREHOUSING & LOCAL MARKET NETWORK
// ==========================================
export const DEFAULT_WAREHOUSING_NETWORK = [
  {
    id: "WH_01_CHANGSARI",
    name: "CWC Central Multimodal Logistics Park & Silos",
    operator: "CWC",
    warehouse_type: "CENTRAL_RAILHEAD_SILO",
    location: "Changsari / Amingaon (Guwahati)",
    coordinates: [26.2624, 91.6842],
    total_capacity_mt: 65000.0,
    utilized_mt: 48200.0,
    utilization_pct: 74.2,
    cold_storage_capacity_m3: 12000.0,
    cold_storage_temp_c: 2.0,
    road_connectivity: "NH-27 East-West Arterial & BG Broad-Gauge Railway Siding",
    vulnerable_choke_point: "Saraighat Bridge Traffic Pinch",
    feeder_mandis: ["MKN Agro Mandi Guwahati", "Pamohi Fruit Market", "Darrang Agricultural Hub"]
  },
  {
    id: "WH_02_TEZPUR_FCI",
    name: "FCI Strategic Inland Food Grain Depot",
    operator: "FCI",
    warehouse_type: "DISTRICT_DEPOT",
    location: "Dekargaon (Tezpur Gateway)",
    coordinates: [26.6548, 92.7845],
    total_capacity_mt: 28000.0,
    utilized_mt: 21400.0,
    utilization_pct: 76.4,
    cold_storage_capacity_m3: 4500.0,
    cold_storage_temp_c: 3.5,
    road_connectivity: "NH-15 & NH-13 Foothill Bifurcation",
    vulnerable_choke_point: "Kalia Bhomora River Bridge Approach",
    feeder_mandis: ["Tezpur Vegetable Wholesale Mandi", "Missamari Food Grain Yard"]
  },
  {
    id: "WH_03_BOMDILA_DEPOT",
    name: "BRO & State Civil Supplies Intermediate Godown",
    operator: "STATE_CIVIL_SUPPLIES",
    warehouse_type: "DISTRICT_DEPOT",
    location: "Bomdila Hill Crest",
    coordinates: [27.2645, 92.4215],
    total_capacity_mt: 4800.0,
    utilized_mt: 3650.0,
    utilization_pct: 76.0,
    cold_storage_capacity_m3: 850.0,
    cold_storage_temp_c: 4.0,
    road_connectivity: "NH-13 Mountain Spine (Single-Lifeline)",
    vulnerable_choke_point: "Bhalukpong-Tippi Landslide Chute",
    feeder_mandis: ["Bomdila Main Market", "Rupa Organic Haat"]
  },
  {
    id: "WH_04_TAWANG_FSSP",
    name: "Tawang Forward Strategic Supply Point (FSSP)",
    operator: "BRO_DEPOT",
    warehouse_type: "FORWARD_STRATEGIC_POINT",
    location: "Tawang Valley Logistics Grid",
    coordinates: [27.5862, 91.8654],
    total_capacity_mt: 2200.0,
    utilized_mt: 1420.0,
    utilization_pct: 64.5,
    cold_storage_capacity_m3: 350.0,
    cold_storage_temp_c: -1.5,
    road_connectivity: "Sela Tunnel NH-13 Terminal Loop",
    vulnerable_choke_point: "Jaswantgarh-Sela Pass Avalanche Corridor",
    feeder_mandis: ["Tawang Old Market Haat", "Lumla Rural Collection Centre"]
  },
  {
    id: "WH_05_DIRANG_COLD",
    name: "Dirang Agro-Horticulture Cold Store",
    operator: "STATE_CIVIL_SUPPLIES",
    warehouse_type: "COLD_CHAIN_STORAGE",
    location: "Dirang Valley (West Kameng)",
    coordinates: [27.3582, 92.2384],
    total_capacity_mt: 1800.0,
    utilized_mt: 1250.0,
    utilization_pct: 69.4,
    cold_storage_capacity_m3: 3200.0,
    cold_storage_temp_c: 0.5,
    road_connectivity: "NH-13 Mid-Valley Feeder",
    vulnerable_choke_point: "Munna Camp Flash Flood Gully",
    feeder_mandis: ["Dirang Kiwi & Apple Collective", "Sangti Valley Organic Mandi"]
  },
  {
    id: "WH_06_HAWAI_ANJAW",
    name: "Anjaw Sub-Divisional Emergency Godown",
    operator: "STATE_CIVIL_SUPPLIES",
    warehouse_type: "FORWARD_STRATEGIC_POINT",
    location: "Hawai (Anjaw District HQ)",
    coordinates: [27.8924, 96.5312],
    total_capacity_mt: 950.0,
    utilized_mt: 310.0,
    utilization_pct: 32.6,
    cold_storage_capacity_m3: 120.0,
    cold_storage_temp_c: 4.0,
    road_connectivity: "Walong Highway (NH-113 Lohit River Road)",
    vulnerable_choke_point: "Hayuliang Sinking Zone",
    feeder_mandis: ["Hawai Weekly Haat", "Walong Border Point"]
  }
];

export const DEFAULT_LOCAL_MARKETS = {
  markets: [
    {
      id: "MKT_01_TEZPUR",
      name: "Tezpur Regional APMC Wholesale Mandi",
      market_type: "APMC_MANDI",
      location: "Tezpur Bypass Road, Assam",
      coordinates: [26.6432, 92.7981],
      operating_days: "Daily (04:00 - 14:00 IST)",
      daily_trading_volume_mt: 240.0,
      key_commodities: ["Potatoes", "Onions", "Cabbage", "Mustard Oil", "Rice", "Poultry"],
      local_specialties: ["Assam CTC Tea", "Bhut Jolokia Chili", "Brahmaputra Fish"],
      serving_warehouses: ["WH_02_TEZPUR_FCI", "WH_01_CHANGSARI"]
    },
    {
      id: "MKT_02_BOMDILA",
      name: "Bomdila Main Market & Farmers Haat",
      market_type: "WEEKLY_HAAT",
      location: "Bomdila Central Square",
      coordinates: [27.2651, 92.4228],
      operating_days: "Wednesday & Saturday Full Day",
      daily_trading_volume_mt: 35.0,
      key_commodities: ["Green Vegetables", "Dal", "Cooking Salt", "Flour"],
      local_specialties: ["Organic Apples", "Yak Ghee (Churpi)", "Tibetan Carpets", "Monpa Woodcraft"],
      serving_warehouses: ["WH_03_BOMDILA_DEPOT", "WH_05_DIRANG_COLD"]
    },
    {
      id: "MKT_03_TAWANG",
      name: "Tawang Old Market & Border Trade Point",
      market_type: "BORDER_TRADE_CENTRE",
      location: "Old Market Tawang Town",
      coordinates: [27.5873, 91.8679],
      operating_days: "Tuesday to Sunday",
      daily_trading_volume_mt: 18.5,
      key_commodities: ["PDS Grain", "LPG Refills", "Winter Warmwear", "Packaged Rations"],
      local_specialties: ["Monpa Handmade Daphne Paper", "Traditional Thangka Textiles", "Churpi Cheese"],
      serving_warehouses: ["WH_04_TAWANG_FSSP"]
    },
    {
      id: "MKT_04_PASIGHAT",
      name: "Pasighat APMC Agricultural Exchange",
      market_type: "APMC_MANDI",
      location: "Pasighat East Siang, Arunachal",
      coordinates: [28.0664, 95.3265],
      operating_days: "Daily (06:00 - 16:00 IST)",
      daily_trading_volume_mt: 85.0,
      key_commodities: ["Paddy", "Winter Vegetables", "Cereals", "Sugar"],
      local_specialties: ["Arunachal Organic Oranges", "Ginger", "Bamboo Shoot Pickles"],
      serving_warehouses: ["WH_02_TEZPUR_FCI"]
    }
  ],
  local_products_catalog: [
    {
      id: "PRD_TEA_01",
      name: "Assam Orthodox & Golden CTC Tea",
      category: "TEA",
      origin_district: "Sonitpur / Biswanath",
      harvest_peak_months: "April - November (Second Flush Peak)",
      annual_yield_mt_or_units: "45,000 MT Regional Export",
      backhaul_suitability: "EXCELLENT (Dry containerized cargo, high density)",
      preservation_requirements: "Moisture-sealed Kraft paper sacks, ambient dry ventilated",
      economic_impact: "Direct lifeline livelihood for 185,000 tea smallholder families in Brahmaputra Valley."
    },
    {
      id: "PRD_PAPER_02",
      name: "Monpa Heritage Handmade Daphne Paper (Sukso)",
      category: "HANDICRAFT",
      origin_district: "Tawang / Mukto",
      harvest_peak_months: "Year-round artisanal production",
      annual_yield_mt_or_units: "28,000 High-Value Sheets / Month",
      backhaul_suitability: "HIGH (Lightweight, compact high-margin return freight)",
      preservation_requirements: "Flat-packed waterproof cartons, zero compression",
      economic_impact: "Revived historical 1000-year Buddhist manuscript craft supporting Monpa tribal women artisans."
    },
    {
      id: "PRD_KIWI_03",
      name: "Organic Hayward Kiwi & Wild Walnuts",
      category: "HORTICULTURE",
      origin_district: "West Kameng (Dirang Valley)",
      harvest_peak_months: "October - January",
      annual_yield_mt_or_units: "3,200 MT Cold-Chain Harvest",
      backhaul_suitability: "VERY HIGH (Pairs with refrigerated returning grocery trucks)",
      preservation_requirements: "Refrigerated transit 1°C to 4°C, ventilated plastic crates",
      economic_impact: "Top horticultural cash crop in Arunachal Pradesh fetching ₹180-250/kg in Delhi/Kolkata markets."
    },
    {
      id: "PRD_CARDAMOM_04",
      name: "Himalayan Large Cardamom (Badi Elaichi)",
      category: "SPICES",
      origin_district: "North Sikkim & Anjaw",
      harvest_peak_months: "September - December",
      annual_yield_mt_or_units: "4,100 MT Certified Organic Yield",
      backhaul_suitability: "MAXIMUM (High value-to-weight ratio, shelf-stable)",
      preservation_requirements: "Double-lined jute bags, ambient moisture < 11%",
      economic_impact: "Primary cash crop of high-altitude Sikkim/Arunachal tribal growers with GI certification."
    },
    {
      id: "PRD_TEXTILE_05",
      name: "Mishmi Tribal Loin-Loom Handloom & Eri Silk",
      category: "HANDICRAFT",
      origin_district: "Anjaw / Lohit",
      harvest_peak_months: "Post-Monsoon (August - February)",
      annual_yield_mt_or_units: "14,500 Artisan Garments & Stoles",
      backhaul_suitability: "HIGH (Low volume, high retail margin in national urban emporiums)",
      preservation_requirements: "Pest-resistant moisture-proof poly-bales",
      economic_impact: "Sustains indigenous handloom collectives in border villages along the LAC."
    }
  ],
  backhaul_opportunities: [
    {
      id: "BKH_01_TAWANG_TEZPUR",
      origin_market: "Tawang Old Market / Dirang Cold Store",
      destination_hub: "Tezpur Multimodal Depot & Guwahati ICD",
      cargo_description: "14 MT Organic Hayward Kiwi + 2.5 MT Monpa Handmade Paper",
      cargo_category: "HORTICULTURE_HANDICRAFT",
      available_weight_mt: 16.5,
      vehicle_type_required: "10-Wheeler Reversible Reefer / Tarpaulin Truck",
      distance_km: 348.0,
      potential_savings_inr: 48500,
      status: "READY_FOR_MATCHING"
    },
    {
      id: "BKH_02_ANJAW_TINSUKIA",
      origin_market: "Hawai Market (Anjaw)",
      destination_hub: "Tinsukia Railhead Freight Hub",
      cargo_description: "8 MT Organic Large Cardamom + 4 MT Mishmi Handloom Textiles",
      cargo_category: "SPICES_HANDICRAFT",
      available_weight_mt: 12.0,
      vehicle_type_required: "Medium 6-Wheeler 4x4 Mountain Truck",
      distance_km: 285.0,
      potential_savings_inr: 36000,
      status: "DISPATCH_RECOMMENDED"
    },
    {
      id: "BKH_03_BOMDILA_GUWAHATI",
      origin_market: "Bomdila Farmers Haat",
      destination_hub: "Guwahati Changsari CWC Hub",
      cargo_description: "18 MT Organic Red Ginger & High-Altitude Potatoes",
      cargo_category: "ORGANIC_AGRO",
      available_weight_mt: 18.0,
      vehicle_type_required: "Multi-Axle 12-Wheeler Truck",
      distance_km: 265.0,
      potential_savings_inr: 52000,
      status: "CONFIRMED_CARGO"
    }
  ]
};

// ==========================================
// FEATURE 8: DEMAND CLUSTERING & FORECASTING
// ==========================================
export const DEFAULT_DEMAND_CLUSTERS = [
  {
    cluster_id: 0,
    cluster_name: "High-Altitude Snowbound Strategic Redoubts",
    description: "Sub-zero temperatures, Sela/Mayodia pass dependency, GLOF and blizzard risk. Requires minimum 60-day buffer.",
    strategic_priority: "CRITICAL_DEFENSE_AND_CIVIL_SURVIVAL",
    dominant_hazard: "Snow, Avalanche & Freezing Road Icing",
    buffer_stock_multiplier: 2.2,
    recommended_safety_days: 60,
    districts: ["Tawang", "North_Sikkim", "Anjaw"],
    key_features: {
      avg_elevation_m: 2666.0,
      avg_isolation_risk: 0.96,
      avg_winter_severity: 0.91,
      avg_population_scale: 0.12,
      avg_flood_vulnerability: 0.46,
      avg_inbound_freight_tpd: 32.0
    }
  },
  {
    cluster_id: 1,
    cluster_name: "Riverine & Monsoon Cutoff Floodplains",
    description: "Brahmaputra/Subansiri embankment breach zones, river-island isolation, high waterborne disease risk.",
    strategic_priority: "DISASTER_RELIEF_AND_PUBLIC_HEALTH",
    dominant_hazard: "Catastrophic Riverine Inundation",
    buffer_stock_multiplier: 1.8,
    recommended_safety_days: 45,
    districts: ["Dhemaji", "Majuli", "Lower_Dibang"],
    key_features: {
      avg_elevation_m: 122.7,
      avg_isolation_risk: 0.77,
      avg_winter_severity: 0.10,
      avg_population_scale: 0.48,
      avg_flood_vulnerability: 0.95,
      avg_inbound_freight_tpd: 107.3
    }
  },
  {
    cluster_id: 2,
    cluster_name: "Fragile Escarpment Landslide Corridors",
    description: "Steep Himalayan gorges with recurring scree falls and mudslides. Demands rolling cold-chain replenishment.",
    strategic_priority: "CORRIDOR_MAINTENANCE_AND_PERISHABLES",
    dominant_hazard: "Active Landslides & Mudflow Chutes",
    buffer_stock_multiplier: 1.5,
    recommended_safety_days: 30,
    districts: ["West_Kameng", "Upper_Siang", "Dima_Hasao", "Papum_Pare", "Kurung_Kumey", "Dibang_Valley"],
    key_features: {
      avg_elevation_m: 1231.3,
      avg_isolation_risk: 0.76,
      avg_winter_severity: 0.50,
      avg_population_scale: 0.29,
      avg_flood_vulnerability: 0.68,
      avg_inbound_freight_tpd: 92.0
    }
  },
  {
    cluster_id: 3,
    cluster_name: "Gateway Hubs & Transshipment Consolidators",
    description: "Railhead and multi-modal transfer gateways feeding mountain corridors with massive buffer silos.",
    strategic_priority: "STRATEGIC_BUFFER_STAGING_AND_BACKHAUL",
    dominant_hazard: "Logistics Bottlenecks & Rail Freight Congestion",
    buffer_stock_multiplier: 1.1,
    recommended_safety_days: 20,
    districts: ["Sonitpur", "Kamrup_Metro", "Dimapur", "Siliguri_Junction"],
    key_features: {
      avg_elevation_m: 101.8,
      avg_isolation_risk: 0.12,
      avg_winter_severity: 0.04,
      avg_population_scale: 0.89,
      avg_flood_vulnerability: 0.36,
      avg_inbound_freight_tpd: 1017.5
    }
  }
];

