"""
Inventory, Buffer Stock, Warehousing, Local Market, and Trade Data for North Eastern Region (NER).
Provides authentic baseline data for SIH PS 26002 logistics intelligence and economic integration.
"""

# --- 1. District Buffer Stocks & Emergency Reserves ---
BUFFER_STOCKS_DATA = {
    "Tawang": {
        "district_id": "DST_AR_01",
        "district_name": "Tawang",
        "state": "Arunachal Pradesh",
        "isolation_risk_index": 0.94,
        "total_population": 49977,
        "overall_stock_runway_days": 18,
        "status": "DEFICIT_RISK",
        "pre_disaster_procurement_active": True,
        "critical_replenishment_needed": ["Perishable Vegetables", "Infant Nutrition", "LPG Cylinders"],
        "commodities": [
            {"name": "PDS Rice & Wheat", "category": "GRAIN", "current_stock_mt": 180.0, "safety_buffer_mt": 350.0, "daily_burn_rate_mt": 8.5, "days_remaining": 21, "status": "WARNING"},
            {"name": "Lentils & Pulses (Dal)", "category": "PULSE", "current_stock_mt": 42.0, "safety_buffer_mt": 80.0, "daily_burn_rate_mt": 1.9, "days_remaining": 22, "status": "WARNING"},
            {"name": "Mustard Cooking Oil", "category": "EDIBLE_OIL", "current_stock_mt": 28.0, "safety_buffer_mt": 45.0, "daily_burn_rate_mt": 1.2, "days_remaining": 23, "status": "WARNING"},
            {"name": "Potatoes, Onions & Cabbage", "category": "VEGETABLE", "current_stock_mt": 12.0, "safety_buffer_mt": 65.0, "daily_burn_rate_mt": 3.4, "days_remaining": 3, "status": "CRITICAL"},
            {"name": "Emergency Trauma & Antibiotics", "category": "MEDICINE", "current_stock_mt": 6.5, "safety_buffer_mt": 12.0, "daily_burn_rate_mt": 0.3, "days_remaining": 21, "status": "WARNING"},
            {"name": "Infant Milk Formula & Baby Food", "category": "BABY_FOOD", "current_stock_mt": 1.8, "safety_buffer_mt": 8.0, "daily_burn_rate_mt": 0.4, "days_remaining": 4, "status": "CRITICAL"},
            {"name": "Winter Diesel & Sub-Zero Kerosene", "category": "WINTER_FUEL", "current_stock_mt": 95.0, "safety_buffer_mt": 220.0, "daily_burn_rate_mt": 6.8, "days_remaining": 14, "status": "CRITICAL"}
        ]
    },
    "Anjaw": {
        "district_id": "DST_AR_02",
        "district_name": "Anjaw",
        "state": "Arunachal Pradesh",
        "isolation_risk_index": 0.98,
        "total_population": 21167,
        "overall_stock_runway_days": 9,
        "status": "CRITICAL_SHORTAGE",
        "pre_disaster_procurement_active": True,
        "critical_replenishment_needed": ["PDS Rice & Wheat", "Emergency Medicines", "Winter Diesel"],
        "commodities": [
            {"name": "PDS Rice & Wheat", "category": "GRAIN", "current_stock_mt": 32.0, "safety_buffer_mt": 120.0, "daily_burn_rate_mt": 3.8, "days_remaining": 8, "status": "CRITICAL"},
            {"name": "Lentils & Pulses (Dal)", "category": "PULSE", "current_stock_mt": 7.5, "safety_buffer_mt": 25.0, "daily_burn_rate_mt": 0.9, "days_remaining": 8, "status": "CRITICAL"},
            {"name": "Mustard Cooking Oil", "category": "EDIBLE_OIL", "current_stock_mt": 5.0, "safety_buffer_mt": 15.0, "daily_burn_rate_mt": 0.5, "days_remaining": 10, "status": "CRITICAL"},
            {"name": "Potatoes & Root Vegetables", "category": "VEGETABLE", "current_stock_mt": 4.0, "safety_buffer_mt": 20.0, "daily_burn_rate_mt": 1.4, "days_remaining": 2, "status": "CRITICAL"},
            {"name": "Emergency Trauma & Antibiotics", "category": "MEDICINE", "current_stock_mt": 1.2, "safety_buffer_mt": 5.0, "daily_burn_rate_mt": 0.2, "days_remaining": 6, "status": "CRITICAL"},
            {"name": "Infant Milk Formula & Baby Food", "category": "BABY_FOOD", "current_stock_mt": 0.9, "safety_buffer_mt": 3.5, "daily_burn_rate_mt": 0.15, "days_remaining": 6, "status": "CRITICAL"},
            {"name": "Winter Diesel & Sub-Zero Kerosene", "category": "WINTER_FUEL", "current_stock_mt": 22.0, "safety_buffer_mt": 85.0, "daily_burn_rate_mt": 2.5, "days_remaining": 8, "status": "CRITICAL"}
        ]
    },
    "West_Kameng": {
        "district_id": "DST_AR_03",
        "district_name": "West Kameng",
        "state": "Arunachal Pradesh",
        "isolation_risk_index": 0.68,
        "total_population": 83947,
        "overall_stock_runway_days": 32,
        "status": "NORMAL",
        "pre_disaster_procurement_active": False,
        "critical_replenishment_needed": [],
        "commodities": [
            {"name": "PDS Rice & Wheat", "category": "GRAIN", "current_stock_mt": 480.0, "safety_buffer_mt": 500.0, "daily_burn_rate_mt": 14.5, "days_remaining": 33, "status": "ADEQUATE"},
            {"name": "Lentils & Pulses (Dal)", "category": "PULSE", "current_stock_mt": 110.0, "safety_buffer_mt": 120.0, "daily_burn_rate_mt": 3.4, "days_remaining": 32, "status": "ADEQUATE"},
            {"name": "Mustard Cooking Oil", "category": "EDIBLE_OIL", "current_stock_mt": 68.0, "safety_buffer_mt": 75.0, "daily_burn_rate_mt": 2.1, "days_remaining": 32, "status": "ADEQUATE"},
            {"name": "Potatoes, Onions & Cabbage", "category": "VEGETABLE", "current_stock_mt": 55.0, "safety_buffer_mt": 70.0, "daily_burn_rate_mt": 4.8, "days_remaining": 11, "status": "WARNING"},
            {"name": "Emergency Trauma & Antibiotics", "category": "MEDICINE", "current_stock_mt": 18.0, "safety_buffer_mt": 20.0, "daily_burn_rate_mt": 0.5, "days_remaining": 36, "status": "ADEQUATE"},
            {"name": "Infant Milk Formula & Baby Food", "category": "BABY_FOOD", "current_stock_mt": 9.0, "safety_buffer_mt": 10.0, "daily_burn_rate_mt": 0.3, "days_remaining": 30, "status": "ADEQUATE"},
            {"name": "Winter Diesel & Sub-Zero Kerosene", "category": "WINTER_FUEL", "current_stock_mt": 210.0, "safety_buffer_mt": 250.0, "daily_burn_rate_mt": 7.2, "days_remaining": 29, "status": "ADEQUATE"}
        ]
    },
    "North_Sikkim": {
        "district_id": "DST_SK_01",
        "district_name": "North Sikkim",
        "state": "Sikkim",
        "isolation_risk_index": 0.96,
        "total_population": 43709,
        "overall_stock_runway_days": 11,
        "status": "CRITICAL_SHORTAGE",
        "pre_disaster_procurement_active": True,
        "critical_replenishment_needed": ["PDS Rice & Wheat", "LPG Cylinders", "Potatoes & Onions"],
        "commodities": [
            {"name": "PDS Rice & Wheat", "category": "GRAIN", "current_stock_mt": 82.0, "safety_buffer_mt": 240.0, "daily_burn_rate_mt": 7.8, "days_remaining": 10, "status": "CRITICAL"},
            {"name": "Lentils & Pulses (Dal)", "category": "PULSE", "current_stock_mt": 19.0, "safety_buffer_mt": 55.0, "daily_burn_rate_mt": 1.7, "days_remaining": 11, "status": "CRITICAL"},
            {"name": "Mustard Cooking Oil", "category": "EDIBLE_OIL", "current_stock_mt": 13.0, "safety_buffer_mt": 35.0, "daily_burn_rate_mt": 1.1, "days_remaining": 11, "status": "CRITICAL"},
            {"name": "Potatoes, Onions & Cabbage", "category": "VEGETABLE", "current_stock_mt": 7.0, "safety_buffer_mt": 50.0, "daily_burn_rate_mt": 3.1, "days_remaining": 2, "status": "CRITICAL"},
            {"name": "Emergency Trauma & Antibiotics", "category": "MEDICINE", "current_stock_mt": 4.5, "safety_buffer_mt": 11.0, "daily_burn_rate_mt": 0.3, "days_remaining": 15, "status": "WARNING"},
            {"name": "Infant Milk Formula & Baby Food", "category": "BABY_FOOD", "current_stock_mt": 1.5, "safety_buffer_mt": 6.0, "daily_burn_rate_mt": 0.25, "days_remaining": 6, "status": "CRITICAL"},
            {"name": "Winter Diesel & Sub-Zero Kerosene", "category": "WINTER_FUEL", "current_stock_mt": 48.0, "safety_buffer_mt": 160.0, "daily_burn_rate_mt": 5.5, "days_remaining": 8, "status": "CRITICAL"}
        ]
    },
    "Dhemaji": {
        "district_id": "DST_AS_01",
        "district_name": "Dhemaji",
        "state": "Assam",
        "isolation_risk_index": 0.82,
        "total_population": 686133,
        "overall_stock_runway_days": 16,
        "status": "DEFICIT_RISK",
        "pre_disaster_procurement_active": True,
        "critical_replenishment_needed": ["Water Purification Tablets", "PDS Rice", "Baby Nutrition"],
        "commodities": [
            {"name": "PDS Rice & Wheat", "category": "GRAIN", "current_stock_mt": 1200.0, "safety_buffer_mt": 3200.0, "daily_burn_rate_mt": 110.0, "days_remaining": 10, "status": "CRITICAL"},
            {"name": "Lentils & Pulses (Dal)", "category": "PULSE", "current_stock_mt": 280.0, "safety_buffer_mt": 650.0, "daily_burn_rate_mt": 24.0, "days_remaining": 11, "status": "CRITICAL"},
            {"name": "Mustard Cooking Oil", "category": "EDIBLE_OIL", "current_stock_mt": 190.0, "safety_buffer_mt": 400.0, "daily_burn_rate_mt": 14.0, "days_remaining": 13, "status": "WARNING"},
            {"name": "Local Vegetables (Pumpkin/Potato)", "category": "VEGETABLE", "current_stock_mt": 140.0, "safety_buffer_mt": 500.0, "daily_burn_rate_mt": 35.0, "days_remaining": 4, "status": "CRITICAL"},
            {"name": "Water Purification & ORS", "category": "MEDICINE", "current_stock_mt": 12.0, "safety_buffer_mt": 50.0, "daily_burn_rate_mt": 3.0, "days_remaining": 4, "status": "CRITICAL"},
            {"name": "Infant Formula & Ready-to-Eat Kits", "category": "BABY_FOOD", "current_stock_mt": 15.0, "safety_buffer_mt": 45.0, "daily_burn_rate_mt": 2.5, "days_remaining": 6, "status": "CRITICAL"},
            {"name": "Boat Engine Petrol & Diesel", "category": "WINTER_FUEL", "current_stock_mt": 180.0, "safety_buffer_mt": 350.0, "daily_burn_rate_mt": 15.0, "days_remaining": 12, "status": "WARNING"}
        ]
    },
    "Sonitpur": {
        "district_id": "DST_AS_02",
        "district_name": "Sonitpur (Tezpur Hub)",
        "state": "Assam",
        "isolation_risk_index": 0.15,
        "total_population": 1924110,
        "overall_stock_runway_days": 68,
        "status": "SURPLUS",
        "pre_disaster_procurement_active": False,
        "critical_replenishment_needed": [],
        "commodities": [
            {"name": "PDS Rice & Wheat", "category": "GRAIN", "current_stock_mt": 18500.0, "safety_buffer_mt": 8000.0, "daily_burn_rate_mt": 280.0, "days_remaining": 66, "status": "SURPLUS"},
            {"name": "Lentils & Pulses (Dal)", "category": "PULSE", "current_stock_mt": 3800.0, "safety_buffer_mt": 1800.0, "daily_burn_rate_mt": 58.0, "days_remaining": 65, "status": "SURPLUS"},
            {"name": "Mustard Cooking Oil", "category": "EDIBLE_OIL", "current_stock_mt": 2400.0, "safety_buffer_mt": 1200.0, "daily_burn_rate_mt": 36.0, "days_remaining": 66, "status": "SURPLUS"},
            {"name": "Central Cold Storage Vegetables", "category": "VEGETABLE", "current_stock_mt": 1800.0, "safety_buffer_mt": 900.0, "daily_burn_rate_mt": 85.0, "days_remaining": 21, "status": "ADEQUATE"},
            {"name": "District Base Hospital Medical Stock", "category": "MEDICINE", "current_stock_mt": 140.0, "safety_buffer_mt": 60.0, "daily_burn_rate_mt": 2.1, "days_remaining": 66, "status": "SURPLUS"},
            {"name": "Infant Nutrition & Ready-to-Use Food", "category": "BABY_FOOD", "current_stock_mt": 120.0, "safety_buffer_mt": 50.0, "daily_burn_rate_mt": 1.8, "days_remaining": 66, "status": "SURPLUS"},
            {"name": "IOCL Regional Fuel Terminal", "category": "WINTER_FUEL", "current_stock_mt": 9500.0, "safety_buffer_mt": 4000.0, "daily_burn_rate_mt": 140.0, "days_remaining": 67, "status": "SURPLUS"}
        ]
    }
}


# --- 2. Warehousing Network, Cold Storages & Strategic Distribution Points ---
WAREHOUSING_NETWORK_DATA = [
    {
        "id": "WH_01_CHANGSARI",
        "name": "CWC Central Multimodal Logistics Park & Silos",
        "operator": "CWC",
        "warehouse_type": "CENTRAL_RAILHEAD_SILO",
        "location": "Changsari / Amingaon (Guwahati)",
        "coordinates": [26.2624, 91.6842],
        "total_capacity_mt": 65000.0,
        "utilized_mt": 48200.0,
        "utilization_pct": 74.2,
        "cold_storage_capacity_m3": 12000.0,
        "cold_storage_temp_c": 2.0,
        "road_connectivity": "NH-27 East-West Arterial & BG Broad-Gauge Railway Siding",
        "vulnerable_choke_point": "Saraighat Bridge Traffic Pinch",
        "feeder_mandis": ["MKN Agro Mandi Guwahati", "Pamohi Fruit Market", "Darrang Agricultural Hub"]
    },
    {
        "id": "WH_02_TEZPUR_FCI",
        "name": "FCI Strategic Inland Food Grain Depot",
        "operator": "FCI",
        "warehouse_type": "DISTRICT_DEPOT",
        "location": "Dekargaon (Tezpur Gateway)",
        "coordinates": [26.6548, 92.7845],
        "total_capacity_mt": 28000.0,
        "utilized_mt": 21400.0,
        "utilization_pct": 76.4,
        "cold_storage_capacity_m3": 4500.0,
        "cold_storage_temp_c": 3.5,
        "road_connectivity": "NH-15 & NH-13 Foothill Bifurcation",
        "vulnerable_choke_point": "Kalia Bhomora River Bridge Approach",
        "feeder_mandis": ["Tezpur Vegetable Wholesale Mandi", "Missamari Food Grain Yard"]
    },
    {
        "id": "WH_03_BOMDILA_DEPOT",
        "name": "BRO & State Civil Supplies Intermediate Godown",
        "operator": "STATE_CIVIL_SUPPLIES",
        "warehouse_type": "DISTRICT_DEPOT",
        "location": "Bomdila Hill Crest",
        "coordinates": [27.2645, 92.4215],
        "total_capacity_mt": 4800.0,
        "utilized_mt": 3650.0,
        "utilization_pct": 76.0,
        "cold_storage_capacity_m3": 850.0,
        "cold_storage_temp_c": 4.0,
        "road_connectivity": "NH-13 Mountain Spine (Single-Lifeline)",
        "vulnerable_choke_point": "Bhalukpong-Tippi Landslide Chute",
        "feeder_mandis": ["Bomdila Main Market", "Rupa Organic Haat"]
    },
    {
        "id": "WH_04_TAWANG_FSSP",
        "name": "Tawang Forward Strategic Supply Point (FSSP)",
        "operator": "BRO_DEPOT",
        "warehouse_type": "FORWARD_STRATEGIC_POINT",
        "location": "Tawang Valley Logistics Grid",
        "coordinates": [27.5862, 91.8654],
        "total_capacity_mt": 2200.0,
        "utilized_mt": 1420.0,
        "utilization_pct": 64.5,
        "cold_storage_capacity_m3": 350.0,
        "cold_storage_temp_c": -1.5,
        "road_connectivity": "Sela Tunnel NH-13 Terminal Loop",
        "vulnerable_choke_point": "Jaswantgarh-Sela Pass Avalanche Corridor",
        "feeder_mandis": ["Tawang Old Market Haat", "Lumla Rural Collection Centre"]
    },
    {
        "id": "WH_05_DIRANG_COLD",
        "name": "Dirang Agro-Horticulture Controlled Atmosphere Cold Store",
        "operator": "STATE_CIVIL_SUPPLIES",
        "warehouse_type": "COLD_CHAIN_STORAGE",
        "location": "Dirang Valley (West Kameng)",
        "coordinates": [27.3582, 92.2384],
        "total_capacity_mt": 1800.0,
        "utilized_mt": 1250.0,
        "utilization_pct": 69.4,
        "cold_storage_capacity_m3": 3200.0,
        "cold_storage_temp_c": 0.5,
        "road_connectivity": "NH-13 Mid-Valley Feeder",
        "vulnerable_choke_point": "Munna Camp Flash Flood Gully",
        "feeder_mandis": ["Dirang Kiwi & Apple Producer Collective", "Sangti Valley Organic Mandi"]
    },
    {
        "id": "WH_06_HAWAI_ANJAW",
        "name": "Anjaw Sub-Divisional Emergency Buffer Godown",
        "operator": "STATE_CIVIL_SUPPLIES",
        "warehouse_type": "FORWARD_STRATEGIC_POINT",
        "location": "Hawai (Anjaw District HQ)",
        "coordinates": [27.8924, 96.5312],
        "total_capacity_mt": 950.0,
        "utilized_mt": 310.0,
        "utilization_pct": 32.6,
        "cold_storage_capacity_m3": 120.0,
        "cold_storage_temp_c": 4.0,
        "road_connectivity": "Walong Highway (NH-113 Lohit River Road)",
        "vulnerable_choke_point": "Hayuliang Sinking Zone (Active Landslip)",
        "feeder_mandis": ["Hawai Weekly Haat", "Walong Border Point"]
    }
]


# --- 3. Local Markets, APMC Mandis, Local Products & Backhaul Logistics ---
LOCAL_MARKETS_AND_TRADE_DATA = {
    "markets": [
        {
            "id": "MKT_01_TEZPUR",
            "name": "Tezpur Regional APMC Wholesale Mandi",
            "market_type": "APMC_MANDI",
            "location": "Tezpur Bypass Road, Assam",
            "coordinates": [26.6432, 92.7981],
            "operating_days": "Daily (04:00 - 14:00 IST)",
            "daily_trading_volume_mt": 240.0,
            "key_commodities": ["Potatoes", "Onions", "Cabbage", "Mustard Oil", "Rice", "Broiler Poultry"],
            "local_specialties": ["Assam CTC Tea", "Bhut Jolokia Chili", "Brahmaputra Fish"],
            "serving_warehouses": ["WH_02_TEZPUR_FCI", "WH_01_CHANGSARI"]
        },
        {
            "id": "MKT_02_BOMDILA",
            "name": "Bomdila Main Market & Farmers Haat",
            "market_type": "WEEKLY_HAAT",
            "location": "Bomdila Central Square",
            "coordinates": [27.2651, 92.4228],
            "operating_days": "Wednesday & Saturday Full Day",
            "daily_trading_volume_mt": 35.0,
            "key_commodities": ["Green Vegetables", "Dal", "Cooking Salt", "Flour"],
            "local_specialties": ["Organic Apples", "Yak Ghee (Churpi)", "Tibetan Wool Carpets", "Monpa Woodcraft"],
            "serving_warehouses": ["WH_03_BOMDILA_DEPOT", "WH_05_DIRANG_COLD"]
        },
        {
            "id": "MKT_03_TAWANG",
            "name": "Tawang Old Market & Border Trade Point",
            "market_type": "BORDER_TRADE_CENTRE",
            "location": "Old Market Tawang Town",
            "coordinates": [27.5873, 91.8679],
            "operating_days": "Tuesday to Sunday",
            "daily_trading_volume_mt": 18.5,
            "key_commodities": ["PDS Grain", "LPG Refills", "Winter Warmwear", "Packaged Rations"],
            "local_specialties": ["Monpa Handmade Daphne Paper", "Traditional Thangka Textiles", "Churpi Cheese"],
            "serving_warehouses": ["WH_04_TAWANG_FSSP"]
        },
        {
            "id": "MKT_04_PASIGHAT",
            "name": "Pasighat APMC Agricultural Exchange",
            "market_type": "APMC_MANDI",
            "location": "Pasighat East Siang, Arunachal",
            "coordinates": [28.0664, 95.3265],
            "operating_days": "Daily (06:00 - 16:00 IST)",
            "daily_trading_volume_mt": 85.0,
            "key_commodities": ["Paddy", "Winter Vegetables", "Cereals", "Sugar"],
            "local_specialties": ["Arunachal Organic Oranges", "Ginger", "Bamboo Shoot Pickles"],
            "serving_warehouses": ["WH_02_TEZPUR_FCI"]
        }
    ],

    "local_products_catalog": [
        {
            "id": "PRD_TEA_01",
            "name": "Assam Orthodox & Golden CTC Tea",
            "category": "TEA",
            "origin_district": "Sonitpur / Biswanath",
            "harvest_peak_months": "April - November (Second Flush Peak)",
            "annual_yield_mt_or_units": "45,000 MT Regional Export",
            "backhaul_suitability": "EXCELLENT (Dry containerized cargo, high density)",
            "preservation_requirements": "Moisture-sealed Kraft paper sacks, ambient dry ventilated",
            "economic_impact": "Direct lifeline livelihood for 185,000 tea smallholder families in Brahmaputra Valley."
        },
        {
            "id": "PRD_PAPER_02",
            "name": "Monpa Heritage Handmade Daphne Paper (Sukso)",
            "category": "HANDICRAFT",
            "origin_district": "Tawang / Mukto",
            "harvest_peak_months": "Year-round artisanal production",
            "annual_yield_mt_or_units": "28,000 High-Value Sheets / Month",
            "backhaul_suitability": "HIGH (Lightweight, compact high-margin return freight)",
            "preservation_requirements": "Flat-packed waterproof cartons, zero compression",
            "economic_impact": "Revived historical 1000-year Buddhist manuscript craft supporting Monpa tribal women artisans."
        },
        {
            "id": "PRD_KIWI_03",
            "name": "Organic Hayward Kiwi & Wild Walnuts",
            "category": "HORTICULTURE",
            "origin_district": "West Kameng (Dirang Valley)",
            "harvest_peak_months": "October - January",
            "annual_yield_mt_or_units": "3,200 MT Cold-Chain Harvest",
            "backhaul_suitability": "VERY HIGH (Pairs with refrigerated returning grocery trucks)",
            "preservation_requirements": "Refrigerated transit 1°C to 4°C, ventilated plastic crates",
            "economic_impact": "Top horticultural cash crop in Arunachal Pradesh fetching ₹180-250/kg in Delhi/Kolkata markets."
        },
        {
            "id": "PRD_CARDAMOM_04",
            "name": "Himalayan Large Cardamom (Badi Elaichi)",
            "category": "SPICES",
            "origin_district": "North Sikkim & Anjaw",
            "harvest_peak_months": "September - December",
            "annual_yield_mt_or_units": "4,100 MT Certified Organic Yield",
            "backhaul_suitability": "MAXIMUM (High value-to-weight ratio, shelf-stable)",
            "preservation_requirements": "Double-lined jute bags, ambient moisture < 11%",
            "economic_impact": "Primary cash crop of high-altitude Sikkim/Arunachal tribal growers with GI certification."
        },
        {
            "id": "PRD_TEXTILE_05",
            "name": "Mishmi Tribal Loin-Loom Handloom & Eri Silk",
            "category": "HANDICRAFT",
            "origin_district": "Anjaw / Lohit",
            "harvest_peak_months": "Post-Monsoon (August - February)",
            "annual_yield_mt_or_units": "14,500 Artisan Garments & Stoles",
            "backhaul_suitability": "HIGH (Low volume, high retail margin in national urban emporiums)",
            "preservation_requirements": "Pest-resistant moisture-proof poly-bales",
            "economic_impact": "Sustains indigenous handloom collectives in border villages along the LAC."
        }
    ],

    "backhaul_opportunities": [
        {
            "id": "BKH_01_TAWANG_TEZPUR",
            "origin_market": "Tawang Old Market / Dirang Cold Store",
            "destination_hub": "Tezpur Multimodal Depot & Guwahati ICD",
            "cargo_description": "14 MT Organic Hayward Kiwi + 2.5 MT Monpa Handmade Paper",
            "cargo_category": "HORTICULTURE_HANDICRAFT",
            "available_weight_mt": 16.5,
            "vehicle_type_required": "10-Wheeler Reversible Reefer / Tarpaulin Truck",
            "distance_km": 348.0,
            "potential_savings_inr": 48500,
            "status": "READY_FOR_MATCHING"
        },
        {
            "id": "BKH_02_ANJAW_TINSUKIA",
            "origin_market": "Hawai Market (Anjaw)",
            "destination_hub": "Tinsukia Railhead Freight Hub",
            "cargo_description": "8 MT Organic Large Cardamom + 4 MT Mishmi Handloom Textiles",
            "cargo_category": "SPICES_HANDICRAFT",
            "available_weight_mt": 12.0,
            "vehicle_type_required": "Medium 6-Wheeler 4x4 Mountain Truck",
            "distance_km": 285.0,
            "potential_savings_inr": 36000,
            "status": "DISPATCH_RECOMMENDED"
        },
        {
            "id": "BKH_03_BOMDILA_GUWAHATI",
            "origin_market": "Bomdila Farmers Haat",
            "destination_hub": "Guwahati Changsari CWC Hub",
            "cargo_description": "18 MT Organic Red Ginger & High-Altitude Potatoes",
            "cargo_category": "ORGANIC_AGRO",
            "available_weight_mt": 18.0,
            "vehicle_type_required": "Multi-Axle 12-Wheeler Truck",
            "distance_km": 265.0,
            "potential_savings_inr": 52000,
            "status": "CONFIRMED_CARGO"
        }
    ]
}


# --- 4. District Feature Matrix for Scikit-Learn KMeans Clustering ---
# Features: [elevation_m, isolation_risk_index, winter_severity_index, population_demand_scale, monsoon_flood_vulnerability, historical_inbound_freight_tpd]
DISTRICT_FEATURE_MATRIX = {
    "Tawang": {
        "features": [3048.0, 0.94, 0.92, 0.15, 0.18, 42.0],
        "state": "Arunachal Pradesh",
        "description": "High-altitude strategic border redoubt. Severe winter snow, Sela Pass dependency."
    },
    "Anjaw": {
        "features": [2100.0, 0.98, 0.85, 0.08, 0.65, 18.0],
        "state": "Arunachal Pradesh",
        "description": "Easternmost remote district. Extremely fragile river gorge lifeline, landslide cutoff."
    },
    "North_Sikkim": {
        "features": [2850.0, 0.96, 0.95, 0.12, 0.55, 36.0],
        "state": "Sikkim",
        "description": "Glacial lake outburst (GLOF) and avalanche vulnerability, sub-zero snowbound passes."
    },
    "Kurung_Kumey": {
        "features": [1650.0, 0.91, 0.72, 0.14, 0.68, 22.0],
        "state": "Arunachal Pradesh",
        "description": "Monsoon bridge-washout isolate. Difficult foot suspension and single lane access."
    },
    "Dibang_Valley": {
        "features": [1968.0, 0.93, 0.78, 0.06, 0.72, 14.0],
        "state": "Arunachal Pradesh",
        "description": "Lowest population density in India. High geological instability on Mayodia pass."
    },
    "West_Kameng": {
        "features": [1450.0, 0.68, 0.58, 0.32, 0.45, 88.0],
        "state": "Arunachal Pradesh",
        "description": "Intermediate mountain transit corridor. Active scree slips and vegetable agro-hub."
    },
    "Upper_Siang": {
        "features": [1320.0, 0.85, 0.52, 0.16, 0.76, 28.0],
        "state": "Arunachal Pradesh",
        "description": "Siang gorge fluvial instability. Periodic flash flooding and landslip blocks."
    },
    "Dima_Hasao": {
        "features": [680.0, 0.76, 0.25, 0.45, 0.82, 120.0],
        "state": "Assam",
        "description": "Barail range sinking zones. Frequent railway and hill road severance during monsoon."
    },
    "Papum_Pare": {
        "features": [320.0, 0.42, 0.15, 0.65, 0.58, 210.0],
        "state": "Arunachal Pradesh",
        "description": "State capital territory. Robust double-lane foothill highway with high urban demand."
    },
    "Dhemaji": {
        "features": [104.0, 0.82, 0.10, 0.78, 0.98, 185.0],
        "state": "Assam",
        "description": "Recurring catastrophic Brahmaputra/Subansiri river overflow and embankment breaches."
    },
    "Majuli": {
        "features": [84.0, 0.88, 0.08, 0.38, 0.99, 45.0],
        "state": "Assam",
        "description": "World's largest river island. Highly vulnerable ferry dependence and monsoon inundation."
    },
    "Lower_Dibang": {
        "features": [180.0, 0.62, 0.12, 0.28, 0.88, 92.0],
        "state": "Arunachal Pradesh",
        "description": "Floodplain debouchment. Braided river channels cutting off Roing-Pasighat road."
    },
    "Sonitpur": {
        "features": [85.0, 0.15, 0.05, 0.88, 0.42, 540.0],
        "state": "Assam",
        "description": "Northern gateway staging command (Tezpur). Railhead transfer and military staging hub."
    },
    "Kamrup_Metro": {
        "features": [55.0, 0.05, 0.02, 1.00, 0.35, 1250.0],
        "state": "Assam",
        "description": "Guwahati central Northeast multimodal gateway, CWC/FCI megastorage, and ICD terminal."
    },
    "Dimapur": {
        "features": [145.0, 0.22, 0.04, 0.72, 0.38, 480.0],
        "state": "Nagaland",
        "description": "Southern gateway railhead and logistics transshipment point for Kohima/Manipur axis."
    },
    "Siliguri_Junction": {
        "features": [122.0, 0.08, 0.06, 0.95, 0.28, 1800.0],
        "state": "West Bengal / Gateway",
        "description": "Siliguri Chicken's Neck corridor mega-hub feeding all Northeast state capitals."
    }
}
