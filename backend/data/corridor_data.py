"""
High-fidelity geospatial and topological data for the North Eastern Region (NER) logistics network.
Includes the primary Western Strategic Lifeline (Guwahati -> Tawang, NH-13),
the BRO Kalaktang alternate bypass corridor, and the 8-state District Isolation Matrix.
"""
from typing import Dict, List, Any

# Nodes / Stations along the strategic corridor
NODES: Dict[str, Dict[str, Any]] = {
    "Guwahati": {"name": "Guwahati Central Depot", "district": "Kamrup Metro", "state": "Assam", "elevation_m": 55.0, "lat": 26.1445, "lon": 91.7362, "type": "SUPPLY_HUB"},
    "Mangaldai": {"name": "Mangaldai Staging Point", "district": "Darrang", "state": "Assam", "elevation_m": 65.0, "lat": 26.4385, "lon": 92.0354, "type": "TRANSIT_HUB"},
    "Tezpur": {"name": "Tezpur Military & Civil Supply Base", "district": "Sonitpur", "state": "Assam", "elevation_m": 78.0, "lat": 26.6528, "lon": 92.7926, "type": "SUPPLY_BASE"},
    "Balipara": {"name": "Balipara Highway Junction", "district": "Sonitpur", "state": "Assam", "elevation_m": 88.0, "lat": 26.8211, "lon": 92.8124, "type": "JUNCTION"},
    
    # Primary Arterial (via Bhalukpong & Sessa - prone to landslides)
    "Bhalukpong": {"name": "Bhalukpong Border Checkpost", "district": "West Kameng", "state": "Arunachal Pradesh", "elevation_m": 215.0, "lat": 27.0125, "lon": 92.6514, "type": "BORDER_CHECKPOST"},
    "Tippi": {"name": "Tippi Orchid Center Gorge", "district": "West Kameng", "state": "Arunachal Pradesh", "elevation_m": 360.0, "lat": 27.0421, "lon": 92.6105, "type": "TRANSIT_POINT"},
    "Sessa": {"name": "Sessa Scree Slide Belt", "district": "West Kameng", "state": "Arunachal Pradesh", "elevation_m": 1100.0, "lat": 27.0984, "lon": 92.5342, "type": "HIGH_RISK_CHOKEPOINT"},
    "NagMandir": {"name": "Nag Mandir Mountain Cut", "district": "West Kameng", "state": "Arunachal Pradesh", "elevation_m": 1820.0, "lat": 27.1623, "lon": 92.4789, "type": "MOUNTAIN_CUT"},
    "Kaspi": {"name": "Kaspi River Defile", "district": "West Kameng", "state": "Arunachal Pradesh", "elevation_m": 1350.0, "lat": 27.2014, "lon": 92.4412, "type": "CHOKEPOINT"},
    "Tengapani": {"name": "Tengapani Valley Base", "district": "West Kameng", "state": "Arunachal Pradesh", "elevation_m": 1450.0, "lat": 27.2289, "lon": 92.4215, "type": "VALLEY_HUB"},
    
    # Southern BRO Alternate Bypass (via Kalaktang - bypasses Sessa landslides)
    "Orang": {"name": "Orang Junction", "district": "Darrang", "state": "Assam", "elevation_m": 72.0, "lat": 26.6845, "lon": 92.3421, "type": "JUNCTION"},
    "Bhairabkunda": {"name": "Bhairabkunda Tri-Junction", "district": "Udalguri", "state": "Assam", "elevation_m": 190.0, "lat": 26.9023, "lon": 92.1154, "type": "BORDER_POINT"},
    "Kalaktang": {"name": "Kalaktang BRO Staging Post", "district": "West Kameng", "state": "Arunachal Pradesh", "elevation_m": 1150.0, "lat": 27.1234, "lon": 92.1021, "type": "STAGING_POST"},
    "Shergaon": {"name": "Shergaon Agricultural Basin", "district": "West Kameng", "state": "Arunachal Pradesh", "elevation_m": 1950.0, "lat": 27.1425, "lon": 92.2614, "type": "TRANSIT_POINT"},
    "Rupa": {"name": "Rupa Sub-Divisional Base", "district": "West Kameng", "state": "Arunachal Pradesh", "elevation_m": 1520.0, "lat": 27.2012, "lon": 92.3854, "type": "TRANSIT_HUB"},
    
    # Upper Mountain Lifeline to Tawang
    "Bomdila": {"name": "Bomdila District Headquarters", "district": "West Kameng", "state": "Arunachal Pradesh", "elevation_m": 2415.0, "lat": 27.2644, "lon": 92.4241, "type": "DISTRICT_HQ"},
    "MunnaCamp": {"name": "Munna Camp Staging Area", "district": "West Kameng", "state": "Arunachal Pradesh", "elevation_m": 2210.0, "lat": 27.3112, "lon": 92.3562, "type": "TRANSIT_POINT"},
    "Dirang": {"name": "Dirang Sub-Divisional Depot", "district": "West Kameng", "state": "Arunachal Pradesh", "elevation_m": 1560.0, "lat": 27.3578, "lon": 92.2394, "type": "SUB_DEPOT"},
    "Sange": {"name": "Sange Mountain Outpost", "district": "West Kameng", "state": "Arunachal Pradesh", "elevation_m": 2100.0, "lat": 27.4215, "lon": 92.1852, "type": "TRANSIT_POINT"},
    "Baisakhi": {"name": "Baisakhi Military Camp", "district": "West Kameng", "state": "Arunachal Pradesh", "elevation_m": 2750.0, "lat": 27.4721, "lon": 92.1245, "type": "MILITARY_BASE"},
    "SelaPass": {"name": "Sela High Mountain Pass & Tunnel", "district": "Tawang", "state": "Arunachal Pradesh", "elevation_m": 3733.0, "lat": 27.5034, "lon": 92.1039, "type": "ALPINE_PASS"},
    "JaswantGarh": {"name": "Jaswant Garh Staging Post", "district": "Tawang", "state": "Arunachal Pradesh", "elevation_m": 3050.0, "lat": 27.5312, "lon": 92.0514, "type": "MEMORIAL_STAGING"},
    "Jang": {"name": "Jang Bridge & Hydro Base", "district": "Tawang", "state": "Arunachal Pradesh", "elevation_m": 2160.0, "lat": 27.5745, "lon": 91.9854, "type": "BRIDGE_CROSSING"},
    "Lhou": {"name": "Lhou Valley Checkpost", "district": "Tawang", "state": "Arunachal Pradesh", "elevation_m": 2320.0, "lat": 27.5612, "lon": 91.9021, "type": "TRANSIT_POINT"},
    "Tawang": {"name": "Tawang Civil Hospital & Frontier Depot", "district": "Tawang", "state": "Arunachal Pradesh", "elevation_m": 3048.0, "lat": 27.5861, "lon": 91.8594, "type": "FRONTIER_DESTINATION"}
}

# Road Segments connecting nodes
# Each segment contains real-world distance, speed, geotechnical slope (SRTM DEM), elevation profile, and GSI landslide history
SEGMENTS_DATA: List[Dict[str, Any]] = [
    # --- Plains Sector (Assam) ---
    {
        "id": "SEG_01",
        "name": "Guwahati -> Mangaldai (NH-15)",
        "source": "Guwahati",
        "target": "Mangaldai",
        "distance_km": 68.0,
        "base_speed_kmh": 65.0,
        "district": "Kamrup Metro / Darrang",
        "geotechnical": {
            "slope_deg": 3.2,
            "elevation_m": 60.0,
            "gsi_landslide_history": 0,
            "rainfall_intensity_mm": 18.0,
            "soil_saturation_index": 0.3,
            "rock_formation": "Alluvial Floodplain"
        },
        "bridge_limit_tons": 45.0,
        "coordinates": [[26.1445, 91.7362], [26.2801, 91.8905], [26.4385, 92.0354]]
    },
    {
        "id": "SEG_02",
        "name": "Mangaldai -> Tezpur (NH-15)",
        "source": "Mangaldai",
        "target": "Tezpur",
        "distance_km": 84.0,
        "base_speed_kmh": 60.0,
        "district": "Darrang / Sonitpur",
        "geotechnical": {
            "slope_deg": 4.1,
            "elevation_m": 72.0,
            "gsi_landslide_history": 0,
            "rainfall_intensity_mm": 22.0,
            "soil_saturation_index": 0.35,
            "rock_formation": "Alluvial Floodplain"
        },
        "bridge_limit_tons": 40.0,
        "coordinates": [[26.4385, 92.0354], [26.5412, 92.4125], [26.6528, 92.7926]]
    },
    {
        "id": "SEG_03",
        "name": "Tezpur -> Balipara Junction (NH-15/NH-13)",
        "source": "Tezpur",
        "target": "Balipara",
        "distance_km": 22.0,
        "base_speed_kmh": 55.0,
        "district": "Sonitpur",
        "geotechnical": {
            "slope_deg": 5.0,
            "elevation_m": 85.0,
            "gsi_landslide_history": 0,
            "rainfall_intensity_mm": 24.0,
            "soil_saturation_index": 0.38,
            "rock_formation": "Tertiary Piedmont"
        },
        "bridge_limit_tons": 40.0,
        "coordinates": [[26.6528, 92.7926], [26.7410, 92.8050], [26.8211, 92.8124]]
    },
    
    # --- Primary Lifeline: Bhalukpong Gorge & Sessa Sector (Treacherous Landslide Belt) ---
    {
        "id": "SEG_04",
        "name": "Balipara -> Bhalukpong Border (NH-13)",
        "source": "Balipara",
        "target": "Bhalukpong",
        "distance_km": 34.0,
        "base_speed_kmh": 45.0,
        "district": "Sonitpur / West Kameng",
        "geotechnical": {
            "slope_deg": 14.5,
            "elevation_m": 215.0,
            "gsi_landslide_history": 2,
            "rainfall_intensity_mm": 35.0,
            "soil_saturation_index": 0.52,
            "rock_formation": "Siwalik Sandstone"
        },
        "bridge_limit_tons": 35.0,
        "coordinates": [[26.8211, 92.8124], [26.9145, 92.7312], [27.0125, 92.6514]]
    },
    {
        "id": "SEG_05",
        "name": "Bhalukpong -> Tippi Gorge (NH-13)",
        "source": "Bhalukpong",
        "target": "Tippi",
        "distance_km": 14.0,
        "base_speed_kmh": 35.0,
        "district": "West Kameng",
        "geotechnical": {
            "slope_deg": 26.8,
            "elevation_m": 360.0,
            "gsi_landslide_history": 4,
            "rainfall_intensity_mm": 42.0,
            "soil_saturation_index": 0.65,
            "rock_formation": "Sheared Phyllite"
        },
        "bridge_limit_tons": 25.0,
        "coordinates": [[27.0125, 92.6514], [27.0289, 92.6310], [27.0421, 92.6105]]
    },
    {
        "id": "SEG_06",
        "name": "Tippi -> Sessa Scree Belt (NH-13)",
        "source": "Tippi",
        "target": "Sessa",
        "distance_km": 18.0,
        "base_speed_kmh": 28.0,
        "district": "West Kameng",
        "geotechnical": {
            "slope_deg": 38.5,
            "elevation_m": 1100.0,
            "gsi_landslide_history": 11,
            "rainfall_intensity_mm": 55.0,
            "soil_saturation_index": 0.82,
            "rock_formation": "Unconsolidated Scree & Weathered Schist"
        },
        "bridge_limit_tons": 20.0,
        "coordinates": [[27.0421, 92.6105], [27.0684, 92.5714], [27.0984, 92.5342]]
    },
    {
        "id": "SEG_07",
        "name": "Sessa -> Nag Mandir Cut (NH-13)",
        "source": "Sessa",
        "target": "NagMandir",
        "distance_km": 21.0,
        "base_speed_kmh": 30.0,
        "district": "West Kameng",
        "geotechnical": {
            "slope_deg": 34.2,
            "elevation_m": 1820.0,
            "gsi_landslide_history": 8,
            "rainfall_intensity_mm": 48.0,
            "soil_saturation_index": 0.74,
            "rock_formation": "Gondwana Carbonaceous Shale"
        },
        "bridge_limit_tons": 22.0,
        "coordinates": [[27.0984, 92.5342], [27.1321, 92.5012], [27.1623, 92.4789]]
    },
    {
        "id": "SEG_08",
        "name": "Nag Mandir -> Kaspi Defile (NH-13)",
        "source": "NagMandir",
        "target": "Kaspi",
        "distance_km": 16.0,
        "base_speed_kmh": 32.0,
        "district": "West Kameng",
        "geotechnical": {
            "slope_deg": 29.4,
            "elevation_m": 1350.0,
            "gsi_landslide_history": 5,
            "rainfall_intensity_mm": 40.0,
            "soil_saturation_index": 0.62,
            "rock_formation": "Weathered Biotite Gneiss"
        },
        "bridge_limit_tons": 25.0,
        "coordinates": [[27.1623, 92.4789], [27.1812, 92.4587], [27.2014, 92.4412]]
    },
    {
        "id": "SEG_09",
        "name": "Kaspi -> Tengapani -> Bomdila (NH-13)",
        "source": "Kaspi",
        "target": "Bomdila",
        "distance_km": 25.0,
        "base_speed_kmh": 32.0,
        "district": "West Kameng",
        "geotechnical": {
            "slope_deg": 24.1,
            "elevation_m": 2415.0,
            "gsi_landslide_history": 3,
            "rainfall_intensity_mm": 32.0,
            "soil_saturation_index": 0.55,
            "rock_formation": "Bomdila Gneissic Complex"
        },
        "bridge_limit_tons": 30.0,
        "coordinates": [[27.2014, 92.4412], [27.2289, 92.4215], [27.2644, 92.4241]]
    },

    # --- Southern Alternate Lifeline (BRO Kalaktang Detour Corridor) ---
    {
        "id": "SEG_ALT_01",
        "name": "Balipara -> Orang Junction",
        "source": "Balipara",
        "target": "Orang",
        "distance_km": 42.0,
        "base_speed_kmh": 60.0,
        "district": "Sonitpur / Darrang",
        "geotechnical": {
            "slope_deg": 3.8,
            "elevation_m": 72.0,
            "gsi_landslide_history": 0,
            "rainfall_intensity_mm": 20.0,
            "soil_saturation_index": 0.32,
            "rock_formation": "Alluvium"
        },
        "bridge_limit_tons": 45.0,
        "coordinates": [[26.8211, 92.8124], [26.7541, 92.5812], [26.6845, 92.3421]]
    },
    {
        "id": "SEG_ALT_02",
        "name": "Orang -> Bhairabkunda Tri-Junction",
        "source": "Orang",
        "target": "Bhairabkunda",
        "distance_km": 36.0,
        "base_speed_kmh": 50.0,
        "district": "Udalguri",
        "geotechnical": {
            "slope_deg": 7.2,
            "elevation_m": 190.0,
            "gsi_landslide_history": 0,
            "rainfall_intensity_mm": 25.0,
            "soil_saturation_index": 0.38,
            "rock_formation": "Bouldery Piedmont"
        },
        "bridge_limit_tons": 40.0,
        "coordinates": [[26.6845, 92.3421], [26.7912, 92.2214], [26.9023, 92.1154]]
    },
    {
        "id": "SEG_ALT_03",
        "name": "Bhairabkunda -> Kalaktang (BRO Road)",
        "source": "Bhairabkunda",
        "target": "Kalaktang",
        "distance_km": 48.0,
        "base_speed_kmh": 40.0,
        "district": "West Kameng",
        "geotechnical": {
            "slope_deg": 16.8,
            "elevation_m": 1150.0,
            "gsi_landslide_history": 1,
            "rainfall_intensity_mm": 28.0,
            "soil_saturation_index": 0.45,
            "rock_formation": "Stable Quartzite & Gneiss"
        },
        "bridge_limit_tons": 35.0,
        "coordinates": [[26.9023, 92.1154], [27.0124, 92.1087], [27.1234, 92.1021]]
    },
    {
        "id": "SEG_ALT_04",
        "name": "Kalaktang -> Shergaon -> Rupa",
        "source": "Kalaktang",
        "target": "Rupa",
        "distance_km": 45.0,
        "base_speed_kmh": 38.0,
        "district": "West Kameng",
        "geotechnical": {
            "slope_deg": 18.2,
            "elevation_m": 1520.0,
            "gsi_landslide_history": 1,
            "rainfall_intensity_mm": 30.0,
            "soil_saturation_index": 0.48,
            "rock_formation": "Granitic Intrusives"
        },
        "bridge_limit_tons": 35.0,
        "coordinates": [[27.1234, 92.1021], [27.1425, 92.2614], [27.2012, 92.3854]]
    },
    {
        "id": "SEG_ALT_05",
        "name": "Rupa -> Bomdila Junction",
        "source": "Rupa",
        "target": "Bomdila",
        "distance_km": 16.0,
        "base_speed_kmh": 35.0,
        "district": "West Kameng",
        "geotechnical": {
            "slope_deg": 15.4,
            "elevation_m": 2415.0,
            "gsi_landslide_history": 1,
            "rainfall_intensity_mm": 30.0,
            "soil_saturation_index": 0.46,
            "rock_formation": "Gneiss"
        },
        "bridge_limit_tons": 35.0,
        "coordinates": [[27.2012, 92.3854], [27.2345, 92.4089], [27.2644, 92.4241]]
    },

    # --- High Himalayan Mountain Sector (Bomdila to Tawang) ---
    {
        "id": "SEG_10",
        "name": "Bomdila -> Munna Camp -> Dirang Valley (NH-13)",
        "source": "Bomdila",
        "target": "Dirang",
        "distance_km": 42.0,
        "base_speed_kmh": 35.0,
        "district": "West Kameng",
        "geotechnical": {
            "slope_deg": 22.5,
            "elevation_m": 1560.0,
            "gsi_landslide_history": 3,
            "rainfall_intensity_mm": 34.0,
            "soil_saturation_index": 0.54,
            "rock_formation": "Dirang Schist & Gneiss"
        },
        "bridge_limit_tons": 35.0,
        "coordinates": [[27.2644, 92.4241], [27.3112, 92.3562], [27.3578, 92.2394]]
    },
    {
        "id": "SEG_11",
        "name": "Dirang -> Sange -> Baisakhi (Ascent to Alpine Zone)",
        "source": "Dirang",
        "target": "Baisakhi",
        "distance_km": 36.0,
        "base_speed_kmh": 28.0,
        "district": "West Kameng",
        "geotechnical": {
            "slope_deg": 31.2,
            "elevation_m": 2750.0,
            "gsi_landslide_history": 6,
            "rainfall_intensity_mm": 45.0,
            "soil_saturation_index": 0.68,
            "rock_formation": "Granite & Calcareous Metamorphic"
        },
        "bridge_limit_tons": 30.0,
        "coordinates": [[27.3578, 92.2394], [27.4215, 92.1852], [27.4721, 92.1245]]
    },
    {
        "id": "SEG_12",
        "name": "Baisakhi -> Sela Pass & Sela Tunnel (13,700 ft Summit)",
        "source": "Baisakhi",
        "target": "SelaPass",
        "distance_km": 18.0,
        "base_speed_kmh": 24.0,
        "district": "Tawang",
        "geotechnical": {
            "slope_deg": 36.5,
            "elevation_m": 3733.0,
            "gsi_landslide_history": 8,
            "rainfall_intensity_mm": 52.0,
            "soil_saturation_index": 0.76,
            "rock_formation": "High-Alpine Glacial Moraine & Freeze-Thaw Rockfall"
        },
        "bridge_limit_tons": 25.0,
        "coordinates": [[27.4721, 92.1245], [27.4889, 92.1123], [27.5034, 92.1039]]
    },
    {
        "id": "SEG_13",
        "name": "Sela Pass -> Jaswant Garh Staging Post",
        "source": "SelaPass",
        "target": "JaswantGarh",
        "distance_km": 16.0,
        "base_speed_kmh": 26.0,
        "district": "Tawang",
        "geotechnical": {
            "slope_deg": 28.4,
            "elevation_m": 3050.0,
            "gsi_landslide_history": 4,
            "rainfall_intensity_mm": 38.0,
            "soil_saturation_index": 0.60,
            "rock_formation": "Gneissic Bedrock"
        },
        "bridge_limit_tons": 30.0,
        "coordinates": [[27.5034, 92.1039], [27.5187, 92.0784], [27.5312, 92.0514]]
    },
    {
        "id": "SEG_14",
        "name": "Jaswant Garh -> Jang Waterfall & Bridge (NH-13)",
        "source": "JaswantGarh",
        "target": "Jang",
        "distance_km": 24.0,
        "base_speed_kmh": 30.0,
        "district": "Tawang",
        "geotechnical": {
            "slope_deg": 25.0,
            "elevation_m": 2160.0,
            "gsi_landslide_history": 5,
            "rainfall_intensity_mm": 44.0,
            "soil_saturation_index": 0.64,
            "rock_formation": "Torrential River Gorge Escarpment"
        },
        "bridge_limit_tons": 24.0,
        "coordinates": [[27.5312, 92.0514], [27.5521, 92.0189], [27.5745, 91.9854]]
    },
    {
        "id": "SEG_15",
        "name": "Jang -> Lhou Checkpost -> Tawang Civil Hospital",
        "source": "Jang",
        "target": "Tawang",
        "distance_km": 34.0,
        "base_speed_kmh": 32.0,
        "district": "Tawang",
        "geotechnical": {
            "slope_deg": 21.8,
            "elevation_m": 3048.0,
            "gsi_landslide_history": 2,
            "rainfall_intensity_mm": 30.0,
            "soil_saturation_index": 0.50,
            "rock_formation": "Tawang Metamorphic Formation"
        },
        "bridge_limit_tons": 30.0,
        "coordinates": [[27.5745, 91.9854], [27.5612, 91.9021], [27.5861, 91.8594]]
    }
]

# Regional District Isolation Health Matrix (covering all 8 NER States)
DISTRICTS_HEALTH: List[Dict[str, Any]] = [
    # Arunachal Pradesh
    {"district_name": "Tawang", "state": "Arunachal Pradesh", "status": "DEGRADED", "primary_artery": "NH-13 (Trans-Arunachal)", "lifeline_status": "Restricted (Sela Pass Monsoon Risk)", "active_chokepoints": 2, "population_affected": 49977, "last_status_check": "10 mins ago"},
    {"district_name": "West Kameng", "state": "Arunachal Pradesh", "status": "DEGRADED", "primary_artery": "NH-13", "lifeline_status": "Caution (Sessa Scree Slide Zone Active)", "active_chokepoints": 3, "population_affected": 83947, "last_status_check": "12 mins ago"},
    {"district_name": "Anjaw", "state": "Arunachal Pradesh", "status": "CUT_OFF", "primary_artery": "Hawai-Walong Highway", "lifeline_status": "Severed (Debris Flow at Hayuliang)", "active_chokepoints": 4, "population_affected": 21167, "last_status_check": "5 mins ago"},
    {"district_name": "East Kameng", "state": "Arunachal Pradesh", "status": "ACCESSIBLE", "primary_artery": "Seppa-Bhalukpong Road", "lifeline_status": "Normal Transit", "active_chokepoints": 0, "population_affected": 78690, "last_status_check": "15 mins ago"},
    
    # Assam
    {"district_name": "Kamrup Metro (Guwahati)", "state": "Assam", "status": "ACCESSIBLE", "primary_artery": "NH-27 / NH-15", "lifeline_status": "Full Capacity Supply Base", "active_chokepoints": 0, "population_affected": 1253938, "last_status_check": "Just now"},
    {"district_name": "Sonitpur (Tezpur)", "state": "Assam", "status": "ACCESSIBLE", "primary_artery": "NH-15", "lifeline_status": "Open", "active_chokepoints": 0, "population_affected": 1924110, "last_status_check": "8 mins ago"},
    {"district_name": "Dima Hasao (Haflong)", "state": "Assam", "status": "DEGRADED", "primary_artery": "NH-27 (Lumding-Silchar)", "lifeline_status": "Single-Lane Bypass (Jatinga Subsidence)", "active_chokepoints": 2, "population_affected": 214102, "last_status_check": "20 mins ago"},
    
    # Sikkim
    {"district_name": "North Sikkim (Mangan)", "state": "Sikkim", "status": "CUT_OFF", "primary_artery": "Dikchu-Sankalang Highway", "lifeline_status": "Severed (Bridge Washout over Teesta)", "active_chokepoints": 5, "population_affected": 43709, "last_status_check": "4 mins ago"},
    {"district_name": "East Sikkim (Gangtok)", "state": "Sikkim", "status": "DEGRADED", "primary_artery": "NH-10 (Sevoke-Teesta)", "lifeline_status": "Intermittent (Mudflows at 29th Mile)", "active_chokepoints": 2, "population_affected": 283583, "last_status_check": "18 mins ago"},

    # Manipur
    {"district_name": "Imphal West", "state": "Manipur", "status": "DEGRADED", "primary_artery": "NH-37 / NH-2", "lifeline_status": "Slow Movement (Mudslides on Jiribam Highway)", "active_chokepoints": 3, "population_affected": 517992, "last_status_check": "14 mins ago"},
    {"district_name": "Senapati", "state": "Manipur", "status": "DEGRADED", "primary_artery": "NH-2 (Dimapur-Imphal)", "lifeline_status": "Restricted Heavy Convoys", "active_chokepoints": 1, "population_affected": 479148, "last_status_check": "25 mins ago"},

    # Nagaland
    {"district_name": "Kohima", "state": "Nagaland", "status": "DEGRADED", "primary_artery": "NH-29", "lifeline_status": "Caution (Dzüdza River Mudslide Bypass)", "active_chokepoints": 2, "population_affected": 267988, "last_status_check": "9 mins ago"},
    {"district_name": "Kiphire", "state": "Nagaland", "status": "CUT_OFF", "primary_artery": "Meluri-Kiphire Road", "lifeline_status": "Severed (Culvert Collapse)", "active_chokepoints": 3, "population_affected": 74004, "last_status_check": "6 mins ago"},

    # Meghalaya
    {"district_name": "East Khasi Hills (Shillong)", "state": "Meghalaya", "status": "ACCESSIBLE", "primary_artery": "NH-6", "lifeline_status": "Normal Traffic", "active_chokepoints": 0, "population_affected": 825922, "last_status_check": "30 mins ago"},
    {"district_name": "East Jaintia Hills (Khliehriat)", "state": "Meghalaya", "status": "DEGRADED", "primary_artery": "NH-6 (Sonapur Tunnel)", "lifeline_status": "Mudslide Clearance in Progress", "active_chokepoints": 1, "population_affected": 122939, "last_status_check": "11 mins ago"},

    # Mizoram
    {"district_name": "Aizawl", "state": "Mizoram", "status": "ACCESSIBLE", "primary_artery": "NH-54 / NH-306", "lifeline_status": "Open", "active_chokepoints": 0, "population_affected": 400309, "last_status_check": "22 mins ago"},

    # Tripura
    {"district_name": "West Tripura (Agartala)", "state": "Tripura", "status": "ACCESSIBLE", "primary_artery": "NH-8", "lifeline_status": "Normal Transit", "active_chokepoints": 0, "population_affected": 918200, "last_status_check": "35 mins ago"}
]

# BRO Heavy Machinery Deployment & Task Force Readiness
BRO_MACHINERY_STATUS: List[Dict[str, Any]] = [
    {"unit": "BRO 42 BRTF / 14 Border Roads Task Force", "base": "Bhalukpong", "equipment": "CAT D6 Dozer & Excavator Team", "readiness": "ON_PATROL", "assigned_sector": "Bhalukpong -> Sessa Scree Cut", "fuel_hours": 36},
    {"unit": "Project Vartak Rapid Action Detachment", "base": "Bomdila", "equipment": "Wheel Loader & Rockbreaker Unit", "readiness": "STANDBY", "assigned_sector": "Nag Mandir -> Kaspi Gorge", "fuel_hours": 48},
    {"unit": "115 RCC (Road Construction Company)", "base": "Baisakhi", "equipment": "Snow Cutter & High-Altitude Dozers", "readiness": "DEPLOYED", "assigned_sector": "Sela Pass Alpine Corridor", "fuel_hours": 40},
    {"unit": "85 RCC Detachment", "base": "Jang", "equipment": "Bailey Bridge Rapid Assembly Unit", "readiness": "STANDBY", "assigned_sector": "Jang River Crossing", "fuel_hours": 60}
]
