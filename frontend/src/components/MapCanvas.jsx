import React, { useState, useEffect, useMemo, memo } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, Circle, CircleMarker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { 
  AlertOctagon, 
  Mountain, 
  Shield, 
  Truck, 
  Navigation, 
  Layers, 
  MapPin, 
  AlertTriangle,
  CloudRain,
  Wrench,
  Compass,
  Route,
  Clock,
  Eye,
  EyeOff,
  CornerUpRight
} from 'lucide-react';
import { 
  DEFAULT_NODES, 
  DEFAULT_SEGMENTS, 
  LANDSLIDE_PREDICTION_ZONES, 
  DEFAULT_WEATHER_STATIONS, 
  BRO_MACHINERY_UNITS, 
  ACTIVE_CONVOYS, 
  REGIONAL_CORRIDORS,
  DISTRICT_CONNECTIVITY_ROUTES,
  DISTRICT_CENTROIDS,
  getRoutesForState,
  getDistrictsForState,
  getCorridorsForState,
  findConnectingRoute
} from '../data/defaultData';
import { CORRIDOR_DRIVING_ROUTES } from '../data/corridorDrivingRoutes';
import { getMediaUrl } from '../services/api';

// Fix standard Leaflet default icon issues in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// 1. Google Maps Directions Waypoint Pins ('A' Start Pin, 'B' Destination Pin)
const createGoogleWaypointIcon = (letter, label, color) => {
  return new L.DivIcon({
    className: 'google-maps-waypoint-marker',
    html: `
      <div style="display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%); pointer-events: auto; cursor: pointer; z-index: 9999;">
        <!-- Floating Label Tag -->
        <div style="
          background: rgba(15, 23, 42, 0.96);
          color: #ffffff;
          padding: 3px 8px;
          border-radius: 6px;
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 11px;
          font-weight: 700;
          white-space: nowrap;
          border: 1.5px solid ${color};
          box-shadow: 0 4px 14px rgba(0,0,0,0.85);
          margin-bottom: 3px;
          display: flex;
          align-items: center;
          gap: 5px;
        ">
          <span style="display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: ${color}; box-shadow: 0 0 6px ${color};"></span>
          <span>${label}</span>
        </div>
        <!-- Google Circular Pinhead -->
        <div style="
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: ${color};
          border: 2.5px solid #ffffff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 14px;
          font-weight: 900;
          line-height: 1;
        ">
          ${letter}
        </div>
        <!-- Downward Arrow Pointer -->
        <div style="
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 6px solid ${color};
          margin-top: -1px;
        "></div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0]
  });
};

// 2. Helper for Town Station Markers with bold visible text labels
const createStationIcon = (name, type, elevation) => {
  const isHub = type === 'SUPPLY_HUB' || type === 'FRONTIER_DESTINATION' || type === 'DISTRICT_HQ';
  const bgColor = isHub ? '#06b6d4' : '#1e293b';
  const borderColor = isHub ? '#38bdf8' : '#64748b';
  
  return new L.DivIcon({
    className: 'custom-station-marker',
    html: `
      <div style="display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -50%); pointer-events: auto;">
        <div style="
          background: ${bgColor};
          color: #ffffff;
          padding: 2.5px 6.5px;
          border-radius: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          font-weight: 700;
          white-space: nowrap;
          border: 1.5px solid ${borderColor};
          box-shadow: 0 4px 12px rgba(0,0,0,0.85);
          text-shadow: 0 1px 2px rgba(0,0,0,0.95), 0 0 3px rgba(0,0,0,0.9);
          display: flex;
          align-items: center;
          gap: 4px;
        ">
          <span>${isHub ? '📍' : '▫️'}</span>
          <span>${name}</span>
          <span style="color: #94a3b8; font-size: 9px;">(${elevation}m)</span>
        </div>
        <div style="width: 2px; height: 5px; background: ${borderColor};"></div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
};

// 3. Color-Graded Rainfall Station Pill Marker
const createRainfallIcon = (station, rainfall_mm, color, alert_level) => {
  return new L.DivIcon({
    className: 'custom-rainfall-marker',
    html: `
      <div style="display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -50%); cursor: pointer;">
        <div style="
          background: rgba(15, 23, 42, 0.94);
          color: ${color};
          padding: 3px 8px;
          border-radius: 8px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          font-weight: 800;
          white-space: nowrap;
          border: 2px solid ${color};
          box-shadow: 0 0 16px ${color}90;
          display: flex;
          align-items: center;
          gap: 4px;
        ">
          <span>🌧️</span>
          <span style="color: #ffffff;">${station}</span>
          <span style="background: ${color}30; padding: 1px 4px; border-radius: 4px; color: ${color}; font-weight: 900;">${rainfall_mm}mm</span>
        </div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0]
  });
};

// 4. Custom Landslide Prediction Hazard Zone Marker
const createLandslideIcon = (prob, name) => {
  const isSevere = prob >= 75;
  const color = isSevere ? '#ef4444' : '#f59e0b';

  return new L.DivIcon({
    className: 'custom-landslide-marker',
    html: `
      <div style="display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -50%);">
        <div style="
          background: ${color};
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #ffffff;
          box-shadow: 0 0 16px ${color};
          animation: pulse 1.5s infinite;
        ">
          <span style="font-size: 13px;">⚠️</span>
        </div>
        <div style="
          background: rgba(15, 23, 42, 0.95);
          color: ${color};
          padding: 1px 5px;
          border-radius: 4px;
          font-size: 9px;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 800;
          margin-top: 2px;
          border: 1px solid ${color};
          white-space: nowrap;
        ">
          ${prob}% RISK
        </div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
};

// 4b. Field Incident Report Marker with Severity Status
const createIncidentReportIcon = (type, severity) => {
  const isBlocking = severity === 'BLOCKING';
  const color = isBlocking ? '#ef4444' : '#f59e0b';
  return new L.DivIcon({
    className: 'custom-incident-marker',
    html: `
      <div style="display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%); pointer-events: auto; cursor: pointer;">
        <div style="
          background: #0f172a;
          border: 2px solid ${color};
          color: #ffffff;
          padding: 2.5px 6px;
          border-radius: 6px;
          font-family: system-ui, sans-serif;
          font-size: 10px;
          font-weight: 800;
          box-shadow: 0 4px 12px rgba(0,0,0,0.85);
          display: flex;
          align-items: center;
          gap: 4px;
          white-space: nowrap;
        ">
          <span>${type === 'LANDSLIDE' ? '⛰️' : '⚠️'}</span>
          <span style="color: ${color};">${isBlocking ? 'BLOCKED' : 'OBSTACLE'}</span>
        </div>
        <div style="
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: ${color};
          border: 2px solid #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: 11px;
          font-weight: 900;
          box-shadow: 0 0 12px ${color};
          margin-top: 2px;
        ">
          !
        </div>
        <div style="
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 5px solid ${color};
        "></div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0]
  });
};

// 5. BRO Heavy Machinery Deployment Marker
const createMachineryIcon = (unit, type, status) => {
  const isClearing = status.includes('CLEARING') || status.includes('ACTIVE');
  const color = isClearing ? '#f59e0b' : '#38bdf8';
  return new L.DivIcon({
    className: 'custom-bro-marker',
    html: `
      <div style="display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -50%);">
        <div style="
          background: #0f172a;
          color: #ffffff;
          padding: 2.5px 6px;
          border-radius: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          font-weight: 700;
          white-space: nowrap;
          border: 1.5px solid ${color};
          box-shadow: 0 2px 10px rgba(0,0,0,0.85);
          display: flex;
          align-items: center;
          gap: 3px;
        ">
          <span>🚜</span>
          <span>${type.split(' ')[0]}</span>
          <span style="color: ${color}; font-size: 8px;">(${isClearing ? 'CLEARING' : 'STANDBY'})</span>
        </div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0]
  });
};

// 6. Active Convoy Fleet Marker
const createConvoyIcon = (convoy) => {
  const isMed = convoy.priority === 'CRITICAL_MEDICAL' || convoy.cargo_type === 'MEDICAL';
  const isPDS = convoy.priority === 'ESSENTIAL_FOOD' || convoy.cargo_type === 'FOOD_PDS';
  const isFuel = convoy.priority === 'FUEL_POL' || convoy.cargo_type === 'FUEL_POL';
  const icon = isMed ? '🚑' : isPDS ? '🌾' : isFuel ? '⛽' : '🚚';
  const badgeColor = isMed ? '#ef4444' : isPDS ? '#10b981' : isFuel ? '#f59e0b' : '#06b6d4';
  
  return new L.DivIcon({
    className: 'custom-fleet-convoy-marker',
    html: `
      <div style="display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -50%); cursor: pointer;">
        <div style="
          background: #0f172a;
          color: #ffffff;
          padding: 3px 6px;
          border-radius: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          font-weight: 700;
          white-space: nowrap;
          border: 1.5px solid ${badgeColor};
          box-shadow: 0 0 12px ${badgeColor}80;
          display: flex;
          align-items: center;
          gap: 4px;
        ">
          <span>${icon}</span>
          <span>${convoy.id}</span>
          <span style="color: #94a3b8; font-size: 8px;">${convoy.speed_kmh}km/h</span>
        </div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0]
  });
};

// 7. Active Convoy Live GPS Pulse Marker
const createActiveVehicleIcon = (progressPct) => {
  const roundedPct = Math.round(progressPct || 0);
  return new L.DivIcon({
    className: 'live-active-convoy-pulse',
    html: `
      <div style="display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -50%); cursor: pointer;">
        <div style="
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #3b82f6;
          border: 3px solid #ffffff;
          box-shadow: 0 0 12px #3b82f6;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: pulse 1.2s infinite;
        ">
          <span style="font-size: 12px;">🚚</span>
        </div>
        <div style="
          background: #1e3a8a;
          color: #93c5fd;
          padding: 1px 5px;
          border-radius: 4px;
          font-size: 8px;
          font-family: monospace;
          font-weight: bold;
          margin-top: 2px;
          white-space: nowrap;
        ">
          GPS LIVE (${roundedPct}%)
        </div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0]
  });
};

// Global DivIcon memoization cache to eliminate React-Leaflet DOM reconstruction thrash
const iconCache = new Map();
const getOrCreateIcon = (key, factory) => {
  let icon = iconCache.get(key);
  if (!icon) {
    icon = factory();
    iconCache.set(key, icon);
  }
  return icon;
};

const getGoogleWaypointIcon = (letter, label, color) => 
  getOrCreateIcon(`gwp_${letter}_${label}_${color}`, () => createGoogleWaypointIcon(letter, label, color));

const getStationIcon = (name, type, elevation) => 
  getOrCreateIcon(`stn_${name}_${type}_${elevation}`, () => createStationIcon(name, type, elevation));

const getRainfallIcon = (station, rainfall_mm, color, alert_level) => 
  getOrCreateIcon(`rnf_${station}_${rainfall_mm}_${color}_${alert_level}`, () => createRainfallIcon(station, rainfall_mm, color, alert_level));

const getLandslideIcon = (prob, name) => 
  getOrCreateIcon(`ls_${prob}_${name}`, () => createLandslideIcon(prob, name));

const getMachineryIcon = (unit, type, status) => 
  getOrCreateIcon(`mch_${unit}_${type}_${status}`, () => createMachineryIcon(unit, type, status));

const getConvoyIcon = (convoy) => 
  getOrCreateIcon(`cvy_${convoy.id}_${convoy.speed_kmh}_${convoy.status}_${convoy.priority}_${convoy.vehicle_reg}`, () => createConvoyIcon(convoy));

const getActiveVehicleIcon = (pct) => 
  getOrCreateIcon(`vlive_${Math.round(pct || 0)}`, () => createActiveVehicleIcon(pct));

const getIncidentReportIcon = (type, severity) => 
  getOrCreateIcon(`inc_${type}_${severity}`, () => createIncidentReportIcon(type, severity));

// District Headquarters Waypoint Pin
const createDistrictMarkerIcon = (districtName, state, isSelected, trafficStatus) => {
  const statusColor = trafficStatus === 'BLOCKED' ? '#ef4444' : trafficStatus === 'CONGESTED' ? '#f97316' : trafficStatus === 'MODERATE' ? '#eab308' : '#06b6d4';
  return new L.DivIcon({
    className: 'custom-district-marker',
    html: `
      <div style="display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%); pointer-events: auto; cursor: pointer; z-index: 500;">
        <div style="
          background: #090d16;
          color: #ffffff;
          padding: 2.5px 7px;
          border-radius: 6px;
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 10.5px;
          font-weight: 700;
          white-space: nowrap;
          border: 1.5px solid ${isSelected ? '#38bdf8' : statusColor};
          box-shadow: 0 4px 12px rgba(0,0,0,0.85);
          display: flex;
          align-items: center;
          gap: 4px;
        ">
          <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: ${statusColor}; box-shadow: 0 0 6px ${statusColor};"></span>
          <span>${districtName}</span>
          <span style="font-size: 8.5px; color: #94a3b8; font-family: monospace;">(${state})</span>
        </div>
        <div style="
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 5px solid ${isSelected ? '#38bdf8' : statusColor};
          margin-top: -1px;
        "></div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0]
  });
};

const getDistrictMarkerIcon = (districtName, state, isSelected, trafficStatus) => 
  getOrCreateIcon(`dist_${districtName}_${state}_${isSelected}_${trafficStatus}`, () => createDistrictMarkerIcon(districtName, state, isSelected, trafficStatus));

// Corridor Route Metadata for Google Directions View
const CORRIDOR_ROUTE_META = {
  CORRIDOR_NH13: {
    originName: "Guwahati Hub",
    destName: "Tawang Frontier Sector",
    highwayName: "NH-13 Trans-Himalayan Highway",
    startCoord: [26.14428, 91.73615],
    destCoord: [27.5861, 91.8594],
    primaryKey: "CORRIDOR_NH13",
    primaryLabel: "via NH-13 (Bhalukpong - Sela)",
    alternateKey: "CORRIDOR_NH13_BYPASS",
    alternateLabel: "via BRO Kalaktang Military Bypass",
    hasAlternate: true,
    avgSpeed: "40 km/h"
  },
  CORRIDOR_NH29: {
    originName: "Dimapur Railhead Hub",
    destName: "Imphal Frontier Depot",
    highwayName: "NH-29 / NH-2 Asian Highway 1",
    startCoord: [25.9068, 93.7275],
    destCoord: [24.8170, 93.9368],
    primaryKey: "CORRIDOR_NH29",
    primaryLabel: "via NH-29 (Kohima & Senapati)",
    hasAlternate: false,
    avgSpeed: "45 km/h"
  },
  CORRIDOR_NH10: {
    originName: "Siliguri Railhead",
    destName: "Gangtok Capital Hub",
    highwayName: "NH-10 Himalayan Corridor",
    startCoord: [26.7271, 88.3953],
    destCoord: [27.3389, 88.6065],
    primaryKey: "CORRIDOR_NH10",
    primaryLabel: "via NH-10 (Sevoke, Teesta & Rangpo)",
    hasAlternate: false,
    avgSpeed: "35 km/h"
  },
  CORRIDOR_NH6: {
    originName: "Guwahati Hub",
    destName: "Agartala Border Depot",
    highwayName: "NH-6 / NH-8 Arterial Lifeline",
    startCoord: [26.1445, 91.7362],
    destCoord: [23.8315, 91.2868],
    primaryKey: "CORRIDOR_NH6",
    primaryLabel: "via NH-6 (Shillong, Jowai & Silchar)",
    hasAlternate: false,
    avgSpeed: "48 km/h"
  }
};

// Centroids and default zooms for state authority jurisdictions
const STATE_VIEW_CENTERS = {
  'Assam': { center: [26.2, 92.8], zoom: 7.5 },
  'Arunachal Pradesh': { center: [27.5, 93.8], zoom: 7.5 },
  'Nagaland': { center: [25.8, 94.1], zoom: 8.5 },
  'Manipur': { center: [24.8, 93.9], zoom: 8.5 },
  'Sikkim': { center: [27.4, 88.5], zoom: 9.2 },
  'Meghalaya': { center: [25.5, 91.6], zoom: 8.5 },
  'Mizoram': { center: [23.5, 92.8], zoom: 8.5 },
  'Tripura': { center: [23.8, 91.5], zoom: 9.0 },
};

// Geodesic distance formula for accurate distance estimation
function getApproxDistanceKm(lat1, lon1, lat2, lon2) {
  if (lat1 === undefined || lon1 === undefined || lat2 === undefined || lon2 === undefined) return 0;
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return Math.round(R * c);
}

// Helper to center/fly map when corridor, district selection or authority state changes
function MapController({ center, zoom, bounds }) {
  const map = useMap();
  useEffect(() => {
    if (bounds && bounds.isValid && bounds.isValid()) {
      map.flyToBounds(bounds, { padding: [55, 55], maxZoom: 11, duration: 1.1 });
    } else if (center && zoom) {
      map.flyTo(center, zoom, { duration: 1.1 });
    }
  }, [center, zoom, bounds, map]);
  return null;
}

function MapCanvas({
  nodes = [],
  segments = [],
  activeRoute = null,
  activeVehicle = null,
  reports = [],
  selectedSegment = null,
  onSelectSegment = () => {},
  onSelectConvoy = null,
  activeWorkspace = 'command',
  selectedAuthorityState = 'ALL',
  selectedDistrictRoute = null,
  onSelectDistrictRoute = () => {},
  sideDrawer = null
}) {
  // Main viewing mode: 'connectivity' (District Connectivity Explorer) vs 'transport' (Strategic Transport & Convoys)
  const [viewMode, setViewMode] = useState('connectivity');
  // In transport mode: filter between all routes, active routes with convoys, and inactive routes without convoys
  const [convoyRouteFilter, setConvoyRouteFilter] = useState('ALL_ROUTES'); // 'ALL_ROUTES' | 'ACTIVE_WITH_CONVOYS' | 'INACTIVE_NO_CONVOYS'

  const [selectedCorridor, setSelectedCorridor] = useState('ALL');
  const [basemap, setBasemap] = useState('dark');
  
  // Google Directions Highway Mode
  const [showGoogleDirections, setShowGoogleDirections] = useState(true);
  const [useAlternateBypass, setUseAlternateBypass] = useState(false);
  const [focusRoadOnly, setFocusRoadOnly] = useState(false);

  // District Connectivity & Live Traffic State
  const [selectedOriginDistrict, setSelectedOriginDistrict] = useState('ALL');
  const [selectedDestDistrict, setSelectedDestDistrict] = useState('ALL');
  const [selectedRouteDetail, setSelectedRouteDetail] = useState(null);
  const [showTrafficLayer, setShowTrafficLayer] = useState(true);

  // Corridors dynamically filtered by the selected State Authority
  const availableCorridors = useMemo(() => {
    return getCorridorsForState(selectedAuthorityState);
  }, [selectedAuthorityState]);

  // Reset corridor and district dropdowns when authority state changes
  useEffect(() => {
    setSelectedCorridor('ALL');
    setUseAlternateBypass(false);
    setSelectedOriginDistrict('ALL');
    setSelectedDestDistrict('ALL');
    setSelectedRouteDetail(null);
  }, [selectedAuthorityState]);

  useEffect(() => {
    if (selectedDistrictRoute) {
      setSelectedRouteDetail(selectedDistrictRoute);
      setViewMode('connectivity');
    }
  }, [selectedDistrictRoute]);

  // Strategic Transport Layer Toggles
  const [showLifelines, setShowLifelines] = useState(true);
  const [showRainfall, setShowRainfall] = useState(true);
  const [showLandslides, setShowLandslides] = useState(true);
  const [showMachinery, setShowMachinery] = useState(true);
  const [showConvoys, setShowConvoys] = useState(true);
  const [showStations, setShowStations] = useState(true);

  // Basemap definitions
  const basemapLayers = {
    dark: {
      base: import.meta.env.VITE_MAP_TILE_URL || 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      ref: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
      attr: '&copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
      maxZoom: 16
    },
    satellite: {
      base: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      ref: null,
      attr: '&copy; Esri &mdash; Source: USGS, NASA, Esri',
      maxZoom: 18
    },
    osm: {
      base: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      ref: null,
      attr: '&copy; OpenStreetMap contributors',
      maxZoom: 19
    }
  };

  const currentLayer = basemapLayers[basemap];

  // Current corridor config
  const currentCorridorConfig = useMemo(() => {
    return availableCorridors.find(c => c.id === selectedCorridor) || availableCorridors[0] || REGIONAL_CORRIDORS[0];
  }, [availableCorridors, selectedCorridor]);

  // Target camera bounds, center & zoom are computed dynamically below after district route calculations

  // Filter Convoys by Selected Corridor
  const allConvoys = ACTIVE_CONVOYS;
  const filteredConvoys = useMemo(() => {
    return selectedCorridor === 'ALL'
      ? allConvoys
      : allConvoys.filter(c => c.corridor === selectedCorridor);
  }, [allConvoys, selectedCorridor]);

  // Filter Convoys by Authority State (Intra-state & Inter-state involving the state)
  const stateFilteredConvoys = useMemo(() => {
    let base = filteredConvoys;
    if (selectedAuthorityState && selectedAuthorityState !== 'ALL' && selectedAuthorityState !== 'MDoNER' && selectedAuthorityState !== 'Central') {
      base = base.filter(c => {
        if (c.states && Array.isArray(c.states)) {
          return c.states.includes(selectedAuthorityState);
        }
        if (c.origin_state === selectedAuthorityState || c.dest_state === selectedAuthorityState) return true;
        if (c.origin?.toLowerCase().includes(selectedAuthorityState.toLowerCase()) || 
            c.destination?.toLowerCase().includes(selectedAuthorityState.toLowerCase())) return true;
        return false;
      });
    }
    return base;
  }, [filteredConvoys, selectedAuthorityState]);

  // Set of corridor IDs that currently carry active convoys in jurisdiction
  const activeConvoyCorridorIds = useMemo(() => {
    const ids = new Set();
    stateFilteredConvoys.forEach(c => {
      if (c.corridor) {
        ids.add(c.corridor);
        if (c.corridor === 'CORRIDOR_NH13') ids.add('CORRIDOR_NH13_BYPASS');
      }
    });
    return ids;
  }, [stateFilteredConvoys]);

  // Visible convoys based on active vs inactive route filter
  const visibleConvoys = useMemo(() => {
    if (convoyRouteFilter === 'INACTIVE_NO_CONVOYS') return [];
    return stateFilteredConvoys;
  }, [stateFilteredConvoys, convoyRouteFilter]);

  // Filter segments according to selected corridor, authority state, and active convoy filter
  const allSegments = (segments && segments.length > 0) ? segments : DEFAULT_SEGMENTS;
  const filteredSegments = useMemo(() => {
    let segs = allSegments;
    if (selectedCorridor !== 'ALL') {
      segs = segs.filter(s => s.corridor === selectedCorridor || (selectedCorridor === 'CORRIDOR_NH13' && s.corridor === 'CORRIDOR_NH13_BYPASS'));
    } else if (selectedAuthorityState && selectedAuthorityState !== 'ALL' && selectedAuthorityState !== 'MDoNER' && selectedAuthorityState !== 'Central') {
      const stateCorridorIds = new Set(availableCorridors.filter(c => c.id !== 'ALL').map(c => c.id));
      if (stateCorridorIds.has('CORRIDOR_NH13')) stateCorridorIds.add('CORRIDOR_NH13_BYPASS');
      segs = segs.filter(s => stateCorridorIds.has(s.corridor));
    }

    if (convoyRouteFilter === 'ACTIVE_WITH_CONVOYS') {
      segs = segs.filter(s => activeConvoyCorridorIds.has(s.corridor));
    } else if (convoyRouteFilter === 'INACTIVE_NO_CONVOYS') {
      segs = segs.filter(s => !activeConvoyCorridorIds.has(s.corridor));
    }

    return segs;
  }, [allSegments, selectedCorridor, selectedAuthorityState, availableCorridors, convoyRouteFilter, activeConvoyCorridorIds]);

  // Filter nodes (key town stations)
  const allNodes = (nodes && nodes.length > 0) ? nodes : DEFAULT_NODES;
  const filteredNodes = useMemo(() => {
    return selectedCorridor === 'ALL'
      ? allNodes
      : allNodes.filter(n => n.corridor === selectedCorridor || (selectedCorridor === 'CORRIDOR_NH13' && n.corridor === 'CORRIDOR_NH13_BYPASS'));
  }, [allNodes, selectedCorridor]);

  // Filter weather stations
  const filteredWeather = useMemo(() => {
    return selectedCorridor === 'ALL'
      ? DEFAULT_WEATHER_STATIONS
      : DEFAULT_WEATHER_STATIONS.filter(w => w.corridor === selectedCorridor);
  }, [selectedCorridor]);

  // Filter Landslide zones
  const filteredLandslides = useMemo(() => {
    return selectedCorridor === 'ALL'
      ? LANDSLIDE_PREDICTION_ZONES
      : LANDSLIDE_PREDICTION_ZONES.filter(z => z.corridor === selectedCorridor);
  }, [selectedCorridor]);

  // Filter BRO Machinery
  const filteredMachinery = useMemo(() => {
    return selectedCorridor === 'ALL'
      ? BRO_MACHINERY_UNITS
      : BRO_MACHINERY_UNITS.filter(m => m.corridor === selectedCorridor);
  }, [selectedCorridor]);

  // District Connectivity Routes for selected state
  const stateRoutes = useMemo(() => {
    return getRoutesForState(selectedAuthorityState);
  }, [selectedAuthorityState]);

  // District Centroids for selected state and its connecting corridors
  const stateDistricts = useMemo(() => {
    return getDistrictsForState(selectedAuthorityState);
  }, [selectedAuthorityState]);

  // All 30 strategic district centroids across the North Eastern Region
  const allNerDistricts = useMemo(() => {
    return Object.values(DISTRICT_CENTROIDS);
  }, []);

  // Other NER districts outside primary state authority jurisdiction
  const otherNerDistricts = useMemo(() => {
    const stateNames = new Set(stateDistricts.map(d => d.name));
    return allNerDistricts.filter(d => !stateNames.has(d.name));
  }, [allNerDistricts, stateDistricts]);

  // Active District Routes to render on map based on Origin/Destination filter
  const activeDistrictRoutes = useMemo(() => {
    // If specific origin AND destination are selected, find direct or multi-hop real highway route!
    if (selectedOriginDistrict !== 'ALL' && selectedDestDistrict !== 'ALL') {
      if (selectedOriginDistrict === selectedDestDistrict) return [];
      const connected = findConnectingRoute(selectedOriginDistrict, selectedDestDistrict);
      if (connected) return [connected];
      return [];
    }

    // If only origin is selected, return all direct routes touching this origin
    if (selectedOriginDistrict !== 'ALL') {
      return DISTRICT_CONNECTIVITY_ROUTES.filter(r => 
        r.fromDistrict === selectedOriginDistrict || r.toDistrict === selectedOriginDistrict
      );
    }

    // If only destination is selected, return all direct routes touching this destination
    if (selectedDestDistrict !== 'ALL') {
      return DISTRICT_CONNECTIVITY_ROUTES.filter(r => 
        r.fromDistrict === selectedDestDistrict || r.toDistrict === selectedDestDistrict
      );
    }

    // Both ALL: scoped to stateRoutes
    return stateRoutes;
  }, [stateRoutes, selectedOriginDistrict, selectedDestDistrict]);

  // Check if user selected two districts for which no telemetry data is added yet in this prototype
  const isRouteDataMissing = useMemo(() => {
    if (viewMode !== 'connectivity') return false;
    if (selectedOriginDistrict === 'ALL' || selectedDestDistrict === 'ALL') return false;
    if (selectedOriginDistrict === selectedDestDistrict) return false;
    return activeDistrictRoutes.length === 0;
  }, [viewMode, selectedOriginDistrict, selectedDestDistrict, activeDistrictRoutes]);

  const originCentroid = DISTRICT_CENTROIDS[selectedOriginDistrict];
  const destCentroid = DISTRICT_CENTROIDS[selectedDestDistrict];

  const approxGeodesicDistanceKm = useMemo(() => {
    if (isRouteDataMissing && originCentroid?.coords && destCentroid?.coords) {
      return getApproxDistanceKm(
        originCentroid.coords[0], originCentroid.coords[1],
        destCentroid.coords[0], destCentroid.coords[1]
      );
    }
    return 0;
  }, [isRouteDataMissing, originCentroid, destCentroid]);

  // Dynamic Camera Center, Zoom & Bounds computation: updates automatically on ANY district change
  const { mapTargetCenter, mapTargetZoom, mapTargetBounds } = useMemo(() => {
    if (viewMode === 'connectivity') {
      // Case 1: Both Origin and Destination are selected
      if (selectedOriginDistrict !== 'ALL' && selectedDestDistrict !== 'ALL') {
        // If a matching route with coordinates exists
        if (activeDistrictRoutes.length > 0 && activeDistrictRoutes[0].coordinates?.length > 1) {
          const latLngs = activeDistrictRoutes[0].coordinates.map(pt => L.latLng(pt[0], pt[1]));
          return {
            mapTargetCenter: null,
            mapTargetZoom: null,
            mapTargetBounds: L.latLngBounds(latLngs)
          };
        }

        // If no matching route in dataset, fit bounds between both district centroids
        if (originCentroid?.coords && destCentroid?.coords) {
          return {
            mapTargetCenter: null,
            mapTargetZoom: null,
            mapTargetBounds: L.latLngBounds([
              L.latLng(originCentroid.coords[0], originCentroid.coords[1]),
              L.latLng(destCentroid.coords[0], destCentroid.coords[1])
            ])
          };
        }
      }

      // Case 2: Only Origin is selected
      if (selectedOriginDistrict !== 'ALL' && originCentroid?.coords) {
        return {
          mapTargetCenter: originCentroid.coords,
          mapTargetZoom: 9.5,
          mapTargetBounds: null
        };
      }

      // Case 3: Only Destination is selected
      if (selectedDestDistrict !== 'ALL' && destCentroid?.coords) {
        return {
          mapTargetCenter: destCentroid.coords,
          mapTargetZoom: 9.5,
          mapTargetBounds: null
        };
      }

      // Case 4: Default State Centroid
      if (selectedAuthorityState && STATE_VIEW_CENTERS[selectedAuthorityState]) {
        return {
          mapTargetCenter: STATE_VIEW_CENTERS[selectedAuthorityState].center,
          mapTargetZoom: STATE_VIEW_CENTERS[selectedAuthorityState].zoom,
          mapTargetBounds: null
        };
      }
    }

    // Transport Mode: Focus on corridor
    return {
      mapTargetCenter: currentCorridorConfig.center,
      mapTargetZoom: currentCorridorConfig.zoom,
      mapTargetBounds: null
    };
  }, [
    viewMode,
    selectedOriginDistrict,
    selectedDestDistrict,
    activeDistrictRoutes,
    originCentroid,
    destCentroid,
    selectedAuthorityState,
    currentCorridorConfig
  ]);

  // Auto-select route detail when a single specific route matches From & To
  useEffect(() => {
    if (viewMode === 'connectivity') {
      if (selectedOriginDistrict !== 'ALL' && selectedDestDistrict !== 'ALL') {
        if (activeDistrictRoutes.length === 1) {
          setSelectedRouteDetail(activeDistrictRoutes[0]);
          if (onSelectDistrictRoute) {
            onSelectDistrictRoute(activeDistrictRoutes[0]);
          }
        } else if (activeDistrictRoutes.length === 0) {
          setSelectedRouteDetail(null);
        }
      }
    }
  }, [viewMode, selectedOriginDistrict, selectedDestDistrict, activeDistrictRoutes, onSelectDistrictRoute]);

  // Ensure selected origin and destination districts are always present in the rendered marker list
  const visibleDistrictsInModeA = useMemo(() => {
    const list = [...stateDistricts];
    const existingNames = new Set(stateDistricts.map(d => d.name));
    if (originCentroid && !existingNames.has(originCentroid.name)) {
      list.push(originCentroid);
    }
    if (destCentroid && !existingNames.has(destCentroid.name)) {
      list.push(destCentroid);
    }
    return list;
  }, [stateDistricts, originCentroid, destCentroid]);

  // Determine active Google Maps Highway Route to render
  const isSpecificCorridor = selectedCorridor !== 'ALL' && Boolean(CORRIDOR_ROUTE_META[selectedCorridor]);
  const activeCorridorMeta = isSpecificCorridor ? CORRIDOR_ROUTE_META[selectedCorridor] : null;

  // Primary vs Alternate driving route coordinates
  const primaryRouteData = useMemo(() => {
    return (isSpecificCorridor && CORRIDOR_DRIVING_ROUTES) ? CORRIDOR_DRIVING_ROUTES[activeCorridorMeta.primaryKey] : null;
  }, [isSpecificCorridor, activeCorridorMeta]);

  const alternateRouteData = useMemo(() => {
    return (isSpecificCorridor && activeCorridorMeta?.hasAlternate && CORRIDOR_DRIVING_ROUTES) 
      ? CORRIDOR_DRIVING_ROUTES[activeCorridorMeta.alternateKey] 
      : null;
  }, [isSpecificCorridor, activeCorridorMeta]);

  // Active driving route coordinates to emphasize
  const activeDrivingRouteData = useAlternateBypass && alternateRouteData ? alternateRouteData : primaryRouteData;

  // Active Route from Dispatch / Driver workspace
  const hasCustomActiveRoute = activeRoute && activeRoute.geometry_coordinates && activeRoute.geometry_coordinates.length > 0;

  return (
    <div className="w-full flex flex-col gap-2.5">
      {/* ========================================================================= */}
      {/* 1. TOP CONTROLS DECK: POSITIONED ABOVE THE MAP (Zero Map Obstruction)     */}
      {/* ========================================================================= */}
      <div className="glass-panel p-2.5 rounded-xl border border-slate-800 bg-slate-900/95 shadow-xl space-y-2">
        {/* Row 1: Primary View Mode Switcher Header + Basemap Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
          {/* Mode Switcher Buttons */}
          <div className="flex items-center gap-1.5 p-0.5 rounded-lg bg-slate-950 border border-slate-800">
            <button
              type="button"
              onClick={() => setViewMode('connectivity')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold font-sans flex items-center gap-2 transition-all cursor-pointer ${
                viewMode === 'connectivity'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-900/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Route className="w-3.5 h-3.5 text-cyan-300" />
              <span>District Connectivity Explorer</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('transport')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold font-sans flex items-center gap-2 transition-all cursor-pointer ${
                viewMode === 'transport'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Truck className="w-3.5 h-3.5 text-emerald-300" />
              <span>Strategic Fleet & Convoys</span>
            </button>
          </div>

          {/* Basemap Selector */}
          <div className="flex items-center gap-2">
            <div className="p-0.5 rounded-lg flex items-center gap-0.5 bg-slate-950 border border-slate-800 text-[11px] font-mono">
              <button
                type="button"
                onClick={() => setBasemap('dark')}
                className={`px-2.5 py-1 rounded transition-all font-semibold cursor-pointer ${
                  basemap === 'dark' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
                }`}
              >
                Tactical Dark
              </button>
              <button
                type="button"
                onClick={() => setBasemap('satellite')}
                className={`px-2.5 py-1 rounded transition-all font-semibold cursor-pointer ${
                  basemap === 'satellite' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
                }`}
              >
                Satellite
              </button>
              <button
                type="button"
                onClick={() => setBasemap('osm')}
                className={`px-2.5 py-1 rounded transition-all font-semibold cursor-pointer ${
                  basemap === 'osm' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
                }`}
              >
                Street OSM
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MODE A CONTROLS: DISTRICT CONNECTIVITY EXPLORER                          */}
        {/* ========================================================================= */}
        {viewMode === 'connectivity' && (
          <div className="flex flex-wrap items-center gap-2.5 px-2.5 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-sans animate-fadeIn">
            <div className="flex items-center gap-1.5 text-cyan-400 font-bold font-mono text-[11px] pr-2 border-r border-slate-700">
              <Route className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>DISTRICT CONNECTIVITY</span>
            </div>

            {/* Origin District Dropdown */}
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-mono text-slate-400">From:</span>
              <select
                value={selectedOriginDistrict}
                onChange={(e) => setSelectedOriginDistrict(e.target.value)}
                className="bg-defense-900 border border-slate-700 text-slate-100 font-mono text-[11px] rounded px-2 py-1 focus:outline-none focus:border-cyan-500 cursor-pointer max-w-[185px]"
              >
                <option value="ALL">All Districts ({selectedAuthorityState} & Gateways)</option>
                <optgroup label={`${selectedAuthorityState} & Connected Corridors`}>
                  {stateDistricts.map(d => (
                    <option key={`orig-${d.name}`} value={d.name}>
                      {d.name} ({d.state})
                    </option>
                  ))}
                </optgroup>
                {otherNerDistricts.length > 0 && (
                  <optgroup label="Other North East Districts (Provisional)">
                    {otherNerDistricts.map(d => (
                      <option key={`orig-oth-${d.name}`} value={d.name}>
                        {d.name} ({d.state})
                      </option>
                    ))}
                  </optgroup>
                )}
              </select>
            </div>

            {/* Destination District Dropdown */}
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-mono text-slate-400">To:</span>
              <select
                value={selectedDestDistrict}
                onChange={(e) => setSelectedDestDistrict(e.target.value)}
                className="bg-defense-900 border border-slate-700 text-slate-100 font-mono text-[11px] rounded px-2 py-1 focus:outline-none focus:border-cyan-500 cursor-pointer max-w-[185px]"
              >
                <option value="ALL">All Connections</option>
                <optgroup label={`${selectedAuthorityState} & Connected Corridors`}>
                  {stateDistricts.map(d => (
                    <option key={`dest-${d.name}`} value={d.name}>
                      {d.name} ({d.state})
                    </option>
                  ))}
                </optgroup>
                {otherNerDistricts.length > 0 && (
                  <optgroup label="Other North East Districts (Provisional)">
                    {otherNerDistricts.map(d => (
                      <option key={`dest-oth-${d.name}`} value={d.name}>
                        {d.name} ({d.state})
                      </option>
                    ))}
                  </optgroup>
                )}
              </select>
            </div>

            {/* Select All Routes Button */}
            <button
              type="button"
              onClick={() => {
                setSelectedOriginDistrict('ALL');
                setSelectedDestDistrict('ALL');
              }}
              className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                selectedOriginDistrict === 'ALL' && selectedDestDistrict === 'ALL'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Select All ({stateRoutes.length} Routes)
            </button>

            {/* Live Traffic Color Legend / Toggle */}
            <button
              type="button"
              onClick={() => setShowTrafficLayer(!showTrafficLayer)}
              className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                showTrafficLayer
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                  : 'bg-slate-800/80 text-slate-400 border-slate-700'
              }`}
              title="Toggle Google Maps-style live traffic speed colors (Green = Smooth, Yellow = Moderate, Orange = Congested, Red = Blocked)"
            >
              <div className="flex items-center gap-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" title="Smooth (>45 km/h)"></span>
                <span className="w-2 h-2 rounded-full bg-amber-400" title="Moderate (30-45 km/h)"></span>
                <span className="w-2 h-2 rounded-full bg-orange-500" title="Congested (15-30 km/h)"></span>
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" title="Blocked (<15 km/h)"></span>
              </div>
              <span>Traffic Colors: {showTrafficLayer ? 'ON' : 'OFF'}</span>
            </button>

            {/* Routes count badge */}
            <div className={`ml-auto px-2.5 py-1 rounded text-[10px] font-mono font-bold border transition-colors ${
              isRouteDataMissing 
                ? 'bg-amber-950/70 border-amber-500/60 text-amber-300 animate-pulse' 
                : 'bg-cyan-950/60 border-cyan-800/50 text-cyan-300'
            }`}>
              {isRouteDataMissing ? (
                <span>⚠️ Data Pending for Prototype</span>
              ) : (
                <span>{activeDistrictRoutes.length} / {stateRoutes.length} Routes Visible</span>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODE B CONTROLS: STRATEGIC TRANSPORT & ACTIVE CONVOYS                    */}
        {/* ========================================================================= */}
        {viewMode === 'transport' && (
          <div className="space-y-2 animate-fadeIn">
            {/* Row 1: Authority Corridor Switcher + Active vs Inactive Route Activity + Google Route */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                {/* Corridor Switcher Dropdown (Dynamically Filtered by State Authority) */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800">
                  <Compass className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider hidden sm:inline">Corridor:</span>
                  <select
                    value={selectedCorridor}
                    onChange={(e) => {
                      setSelectedCorridor(e.target.value);
                      setUseAlternateBypass(false);
                    }}
                    className="bg-defense-900 border border-slate-700 text-slate-100 font-mono text-xs rounded px-2 py-0.5 focus:outline-none focus:border-cyan-500 cursor-pointer max-w-[260px]"
                  >
                    {availableCorridors.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Active vs Inactive Convoy Route Filter Dropdown */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800">
                  <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider hidden sm:inline">Routes:</span>
                  <select
                    value={convoyRouteFilter}
                    onChange={(e) => setConvoyRouteFilter(e.target.value)}
                    className="bg-defense-900 border border-slate-700 text-slate-100 font-mono text-xs rounded px-2 py-0.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="ALL_ROUTES">All Corridors & Arterials</option>
                    <option value="ACTIVE_WITH_CONVOYS">🟢 Active Routes (With Moving Convoys)</option>
                    <option value="INACTIVE_NO_CONVOYS">⚪ Inactive Routes (No Current Convoys)</option>
                  </select>
                </div>
              </div>

              {/* Google Highway Directions Toggle */}
              <button
                type="button"
                onClick={() => setShowGoogleDirections(!showGoogleDirections)}
                className={`px-3 py-1 rounded-lg border shadow-sm text-xs font-bold font-sans flex items-center gap-1.5 transition-all cursor-pointer ${
                  showGoogleDirections 
                    ? 'bg-blue-600 border-blue-400 text-white shadow-blue-900/50' 
                    : 'bg-slate-950 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
                title="Toggle Google Maps Directions Highway Geometry"
              >
                <Navigation className={`w-3.5 h-3.5 ${showGoogleDirections ? 'text-white' : 'text-blue-400'}`} />
                <span>Google Highway Route</span>
                <span className={`px-1.5 py-0.2 text-[9px] rounded font-mono ${showGoogleDirections ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'}`}>
                  {showGoogleDirections ? 'ON' : 'OFF'}
                </span>
              </button>
            </div>

            {/* Row 2: Fleet, Weather & Hazard Layers */}
            <div className="flex flex-wrap items-center gap-3 px-2.5 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-slate-300">
              <label className="flex items-center gap-1.5 cursor-pointer hover:text-emerald-300">
                <input
                  type="checkbox"
                  checked={showConvoys}
                  onChange={(e) => setShowConvoys(e.target.checked)}
                  className="accent-emerald-500 rounded"
                />
                <span className="font-bold text-emerald-400">🚚 Active Convoys ({visibleConvoys.length})</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer hover:text-cyan-300">
                <input
                  type="checkbox"
                  checked={showLifelines}
                  onChange={(e) => setShowLifelines(e.target.checked)}
                  className="accent-cyan-500 rounded"
                />
                <span className="font-bold text-cyan-400">Road Grid</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer hover:text-blue-300">
                <input
                  type="checkbox"
                  checked={showRainfall}
                  onChange={(e) => setShowRainfall(e.target.checked)}
                  className="accent-blue-500 rounded"
                />
                <span className="font-bold text-blue-400 flex items-center gap-1">
                  <span>🌧️</span> Rainfall Overlay
                </span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer hover:text-rose-300">
                <input
                  type="checkbox"
                  checked={showLandslides}
                  onChange={(e) => setShowLandslides(e.target.checked)}
                  className="accent-rose-500 rounded"
                />
                <span className="font-bold text-rose-400">⚠️ Landslides</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer hover:text-amber-300">
                <input
                  type="checkbox"
                  checked={showMachinery}
                  onChange={(e) => setShowMachinery(e.target.checked)}
                  className="accent-amber-500 rounded"
                />
                <span className="font-bold text-amber-400">🚜 BRO Machinery</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer hover:text-slate-100">
                <input
                  type="checkbox"
                  checked={showStations}
                  onChange={(e) => setShowStations(e.target.checked)}
                  className="accent-slate-400 rounded"
                />
                <span>📍 Stations</span>
              </label>

              {isSpecificCorridor && (
                <label className="flex items-center gap-1.5 cursor-pointer text-amber-400 border-l border-slate-700 pl-2">
                  <input
                    type="checkbox"
                    checked={focusRoadOnly}
                    onChange={(e) => setFocusRoadOnly(e.target.checked)}
                    className="accent-amber-500 rounded"
                  />
                  <span className="font-bold flex items-center gap-1">
                    {focusRoadOnly ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    Highway Focus Only
                  </span>
                </label>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 2. LEAFLET MAP CANVAS CONTAINER (Completely Unobstructed & Visible)        */}
      {/* ========================================================================= */}
      <div className="relative w-full h-[520px] md:h-[580px] flex rounded-xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
        <div className="relative flex-1 h-full min-w-0">
          <MapContainer
        center={currentCorridorConfig.center}
        zoom={currentCorridorConfig.zoom}
        preferCanvas={true}
        style={{ width: '100%', height: '100%' }}
        scrollWheelZoom={true}
      >
        <MapController center={mapTargetCenter} zoom={mapTargetZoom} bounds={mapTargetBounds} />

        {/* 100% Free Base Tile Layer */}
        <TileLayer
          key={`base-${basemap}`}
          attribution={currentLayer.attr}
          url={currentLayer.base}
          maxZoom={currentLayer.maxZoom}
        />

        {/* Reference Labels Overlay (for Dark Canvas) */}
        {currentLayer.ref && (
          <TileLayer
            key={`ref-${basemap}`}
            url={currentLayer.ref}
            maxZoom={currentLayer.maxZoom}
            opacity={0.85}
          />
        )}

        {/* ========================================================================= */}
        {/* MODE A: DISTRICT CONNECTIVITY EXPLORER LAYERS                            */}
        {/* ========================================================================= */}
        {viewMode === 'connectivity' && (
          <>
            {/* 1. Inter-District Connectivity Routes (Google Traffic Color Coded) */}
            {activeDistrictRoutes.map((route) => {
              const isSelected = selectedRouteDetail && selectedRouteDetail.id === route.id;
              const baseColor = showTrafficLayer ? route.traffic_color : '#06b6d4';

              return (
                <React.Fragment key={`dist-route-${route.id}`}>
                  {/* Outer Contrast Casing */}
                  <Polyline
                    positions={route.coordinates}
                    pathOptions={{
                      color: isSelected ? '#ffffff' : '#090d16',
                      weight: isSelected ? 10 : 7.5,
                      opacity: isSelected ? 0.95 : 0.8,
                      lineCap: 'round',
                      lineJoin: 'round'
                    }}
                    eventHandlers={{
                      click: () => {
                        setSelectedRouteDetail(route);
                        if (onSelectDistrictRoute) onSelectDistrictRoute(route);
                      }
                    }}
                  />
                  {/* Inner Live Traffic Flow Polyline */}
                  <Polyline
                    positions={route.coordinates}
                    pathOptions={{
                      color: isSelected ? '#38bdf8' : baseColor,
                      weight: isSelected ? 6.5 : 4.5,
                      opacity: 1.0,
                      lineCap: 'round',
                      lineJoin: 'round',
                      dashArray: route.traffic_status === 'BLOCKED' ? '6, 6' : null
                    }}
                    eventHandlers={{
                      click: () => {
                        setSelectedRouteDetail(route);
                        if (onSelectDistrictRoute) onSelectDistrictRoute(route);
                      }
                    }}
                  >
                    <Popup>
                      <div className="p-1.5 text-slate-900 font-sans text-xs min-w-[240px]">
                        <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                          <span className="font-bold text-slate-900">{route.highway}</span>
                          <span 
                            className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold text-white uppercase"
                            style={{ background: route.traffic_color }}
                          >
                            {route.traffic_status}
                          </span>
                        </div>
                        <div className="mt-1 font-bold text-slate-800 text-xs">
                          {route.name}
                        </div>
                        <div className="text-[11px] text-slate-600 mt-1 font-mono space-y-0.5">
                          <div>Connects: <b>{route.fromDistrict} ({route.fromState}) ↔ {route.toDistrict} ({route.toState})</b></div>
                          <div>Distance: <b>{route.distance_km} km</b> • Est: <b>{route.travel_time_hrs} hrs</b></div>
                          <div>Traffic Speed: <b style={{ color: route.traffic_color }}>{route.traffic_speed_kmh} km/h</b> (Normal: {route.normal_speed_kmh} km/h)</div>
                          {route.delay_mins > 0 && (
                            <div className="text-amber-700 font-bold">Delay: +{route.delay_mins} mins</div>
                          )}
                        </div>
                        <div className="mt-1.5 p-1 rounded bg-slate-100 border border-slate-300 text-[10px] text-slate-700">
                          <b>Condition:</b> {route.condition}
                        </div>
                        {route.active_chokepoints && (
                          <div className="mt-1 text-[10px] text-rose-700">
                            <b>Chokepoint:</b> {route.active_chokepoints}
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedRouteDetail(route);
                            if (onSelectDistrictRoute) onSelectDistrictRoute(route);
                          }}
                          className="mt-2 w-full py-1 text-[10px] font-bold text-white rounded bg-cyan-700 hover:bg-cyan-800 cursor-pointer"
                        >
                          View Full Route Diagnostics ➔
                        </button>
                      </div>
                    </Popup>
                  </Polyline>
                </React.Fragment>
              );
            })}

            {/* 1b. Prominent Start 'A' and Dest 'B' pins when a single specific route is selected */}
            {activeDistrictRoutes.length === 1 && activeDistrictRoutes[0].coordinates?.length > 1 && (
              <>
                <Marker
                  position={activeDistrictRoutes[0].coordinates[0]}
                  icon={getGoogleWaypointIcon(
                    'A', 
                    `A: ${activeDistrictRoutes[0].fromDistrict}`, 
                    '#16a34a'
                  )}
                />
                <Marker
                  position={activeDistrictRoutes[0].coordinates[activeDistrictRoutes[0].coordinates.length - 1]}
                  icon={getGoogleWaypointIcon(
                    'B', 
                    `B: ${activeDistrictRoutes[0].toDistrict}`, 
                    '#dc2626'
                  )}
                />
              </>
            )}

            {/* 1c. Waypoint Markers when Route Data is Pending in Prototype */}
            {isRouteDataMissing && originCentroid?.coords && destCentroid?.coords && (
              <>
                {/* Waypoint Pin A */}
                <Marker
                  position={originCentroid.coords}
                  icon={getGoogleWaypointIcon('A', `A: ${selectedOriginDistrict}`, '#16a34a')}
                >
                  <Popup>
                    <div className="p-1.5 text-slate-900 font-sans text-xs">
                      <div className="font-bold text-emerald-800">Waypoint A (Origin)</div>
                      <div className="font-semibold">{selectedOriginDistrict} ({originCentroid.state})</div>
                      <div className="text-[10px] text-slate-500 mt-1">Detailed road telemetry pending in prototype</div>
                    </div>
                  </Popup>
                </Marker>
                {/* Waypoint Pin B */}
                <Marker
                  position={destCentroid.coords}
                  icon={getGoogleWaypointIcon('B', `B: ${selectedDestDistrict}`, '#dc2626')}
                >
                  <Popup>
                    <div className="p-1.5 text-slate-900 font-sans text-xs">
                      <div className="font-bold text-red-800">Waypoint B (Destination)</div>
                      <div className="font-semibold">{selectedDestDistrict} ({destCentroid.state})</div>
                      <div className="text-[10px] text-slate-500 mt-1">Detailed road telemetry pending in prototype</div>
                    </div>
                  </Popup>
                </Marker>
              </>
            )}

            {/* 2. District Headquarters Centroid Waypoints */}
            {visibleDistrictsInModeA.map((d) => (
              <Marker
                key={`dist-marker-${d.name}`}
                position={d.coords}
                icon={getDistrictMarkerIcon(
                  d.name,
                  d.state,
                  selectedOriginDistrict === d.name || selectedDestDistrict === d.name,
                  d.isHub ? 'SMOOTH' : 'MODERATE'
                )}
                eventHandlers={{
                  click: () => {
                    if (selectedOriginDistrict === 'ALL' || selectedOriginDistrict === d.name) {
                      setSelectedOriginDistrict(d.name);
                    } else {
                      setSelectedDestDistrict(d.name);
                    }
                  }
                }}
              >
                <Popup>
                  <div className="p-1.5 text-slate-900 font-sans text-xs min-w-[190px]">
                    <div className="font-bold text-cyan-800 flex items-center justify-between pb-1 border-b border-slate-200">
                      <span>📍 {d.name} HQ</span>
                      <span className="font-mono text-[9px] bg-slate-100 px-1 py-0.2 rounded text-slate-600">
                        {d.state}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-700 mt-1 font-mono">
                      Depot: <b>{d.hq}</b>
                    </div>
                    <div className="mt-2 flex gap-1.5 pt-1 border-t border-slate-200">
                      <button
                        type="button"
                        onClick={() => setSelectedOriginDistrict(d.name)}
                        className="flex-1 py-1 px-1.5 rounded bg-cyan-700 hover:bg-cyan-800 text-white text-[10px] font-bold cursor-pointer"
                      >
                        Set Origin
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedDestDistrict(d.name)}
                        className="flex-1 py-1 px-1.5 rounded bg-blue-700 hover:bg-blue-800 text-white text-[10px] font-bold cursor-pointer"
                      >
                        Set Dest
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </>
        )}

        {/* ========================================================================= */}
        {/* MODE B: STRATEGIC TRANSPORT & ACTIVE CONVOY LAYERS                       */}
        {/* ========================================================================= */}
        {viewMode === 'transport' && (
          <>
            {/* 3. Color-Graded Rainfall Catchment Bubbles & Stations */}
        {showRainfall && !focusRoadOnly && filteredWeather.map((w, idx) => (
          <React.Fragment key={`weather-${idx}`}>
            {/* Catchment Area Precipitation Circle */}
            <Circle
              center={[w.lat, w.lon]}
              radius={w.alert_radius_m || 20000}
              pathOptions={{
                color: w.color,
                fillColor: w.color,
                fillOpacity: w.alert_level === 'CRITICAL' ? 0.32 : w.alert_level === 'HIGH' ? 0.22 : 0.12,
                weight: 1.5,
                dashArray: w.alert_level === 'CRITICAL' ? '4, 4' : null
              }}
            />
            {/* Interactive Weather Station Marker */}
            <Marker
              position={[w.lat, w.lon]}
              icon={getRainfallIcon(w.station, w.rainfall_mm, w.color, w.alert_level)}
            >
              <Popup>
                <div className="p-1 text-slate-900 font-sans text-xs max-w-xs">
                  <div className="flex justify-between items-center pb-1 border-b border-slate-200">
                    <span className="font-bold text-sm text-slate-900 flex items-center gap-1">
                      🌧️ {w.station} Weather Station
                    </span>
                    <span 
                      className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold text-white"
                      style={{ background: w.color }}
                    >
                      {w.alert_level}
                    </span>
                  </div>
                  <div className="mt-2 space-y-1 text-[11px] text-slate-700 font-mono">
                    <div className="flex justify-between">
                      <span>24h Precipitation:</span>
                      <b className="text-blue-700 text-xs">{w.rainfall_mm} mm</b>
                    </div>
                    <div className="flex justify-between">
                      <span>Next 24h Forecast:</span>
                      <b className="text-amber-700">+{w.forecast_24h_mm} mm</b>
                    </div>
                    <div className="flex justify-between">
                      <span>Soil Saturation Index:</span>
                      <b className={w.soil_saturation_pct >= 80 ? 'text-rose-600' : 'text-slate-800'}>
                        {w.soil_saturation_pct}% (Water Capacity)
                      </b>
                    </div>
                    <div className="flex justify-between">
                      <span>Elevation:</span>
                      <b>{w.elevation_m} meters</b>
                    </div>
                    <div className="flex justify-between">
                      <span>Temperature:</span>
                      <b>{w.temp_c}°C ({w.humidity_pct}% RH)</b>
                    </div>
                    <div className="mt-1 p-1.5 rounded bg-slate-100 border border-slate-300 text-[10px] font-sans text-slate-800">
                      <b>Condition:</b> {w.weather_desc}
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          </React.Fragment>
        ))}

        {/* 4. Regional Road Segments Grid (When not in pure road focus mode) */}
        {showLifelines && !focusRoadOnly && filteredSegments.map((seg) => {
          const isSelected = selectedSegment && selectedSegment.id === seg.id;
          const isBypass = seg.corridor === 'CORRIDOR_NH13_BYPASS' || seg.id.includes('ALT');
          
          let color = '#06b6d4';
          let weight = 4.0;
          let dashArray = null;

          if (seg.is_blocked) {
            color = '#ef4444';
            weight = 5.5;
            dashArray = '8, 8';
          } else if (isBypass) {
            color = '#f59e0b';
            weight = 3.5;
            dashArray = '6, 6';
          } else if (seg.risk_score >= 0.7) {
            color = '#f97316';
            weight = 4.5;
          } else if (seg.risk_score >= 0.4) {
            color = '#eab308';
            weight = 4.0;
          }

          if (isSelected) {
            color = '#ffffff';
            weight = 6.5;
          }

          return (
            <Polyline
              key={seg.id}
              positions={seg.coordinates}
              pathOptions={{
                color: color,
                weight: weight,
                opacity: isSelected ? 1.0 : 0.75,
                dashArray: dashArray,
                lineCap: 'round',
                lineJoin: 'round'
              }}
              eventHandlers={{
                click: () => onSelectSegment(seg)
              }}
            >
              <Popup>
                <div className="p-1 text-slate-900 font-sans text-xs">
                  <div className="font-bold text-sm text-cyan-800 flex items-center justify-between gap-2">
                    <span>{seg.name}</span>
                    {seg.is_blocked ? (
                      <span className="px-1.5 py-0.5 bg-red-600 text-white rounded text-[10px] font-mono uppercase">BLOCKED</span>
                    ) : (
                      <span className="px-1.5 py-0.5 bg-emerald-600 text-white rounded text-[10px] font-mono uppercase">OPEN</span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-700 mt-1 space-y-1 font-mono">
                    <div>Corridor: <b>{seg.corridor}</b></div>
                    <div>Distance: <b>{seg.distance_km} km</b> • Speed: <b>{seg.base_speed_kmh} km/h</b></div>
                    <div>Slope: <b>{seg.geotechnical?.slope_deg}°</b> • Elevation: <b>{seg.geotechnical?.elevation_m}m</b></div>
                    <div>Rock Formation: <b>{seg.geotechnical?.rock_formation}</b></div>
                    <div>Risk Score: <b className={seg.risk_score >= 0.6 ? 'text-red-600 font-bold' : 'text-emerald-700'}>
                      {(seg.risk_score * 100).toFixed(0)}% ({seg.risk_level})
                    </b></div>
                  </div>
                  <button
                    onClick={() => onSelectSegment(seg)}
                    className="mt-2 w-full py-1 text-[10px] uppercase font-bold tracking-wider bg-cyan-700 hover:bg-cyan-800 text-white rounded"
                  >
                    Inspect Geotechnical Profile
                  </button>
                </div>
              </Popup>
            </Polyline>
          );
        })}

        {/* ========================================================================= */}
        {/* 5. GOOGLE MAPS DIRECTIONS HIGHWAY PATH RENDERING (Turn-by-Turn Asphalt)    */}
        {/* ========================================================================= */}

        {/* Case A: Specific Corridor Selected with Pre-Cached OSRM Road Geometry */}
        {showGoogleDirections && isSpecificCorridor && activeDrivingRouteData && (
          <>
            {/* If Alternate Route exists, render it first in Google Muted Grey */}
            {activeCorridorMeta.hasAlternate && alternateRouteData && (
              <React.Fragment key="google-alt-route">
                {/* Grey Alternate Base Casing */}
                <Polyline
                  positions={useAlternateBypass ? primaryRouteData.coordinates : alternateRouteData.coordinates}
                  pathOptions={{
                    color: '#334155',
                    weight: 7,
                    opacity: 0.7,
                    lineCap: 'round',
                    lineJoin: 'round'
                  }}
                  eventHandlers={{
                    click: () => setUseAlternateBypass(!useAlternateBypass)
                  }}
                />
                {/* Grey Alternate Core Line */}
                <Polyline
                  positions={useAlternateBypass ? primaryRouteData.coordinates : alternateRouteData.coordinates}
                  pathOptions={{
                    color: '#94a3b8',
                    weight: 4.5,
                    opacity: 0.85,
                    lineCap: 'round',
                    lineJoin: 'round'
                  }}
                  eventHandlers={{
                    click: () => setUseAlternateBypass(!useAlternateBypass)
                  }}
                >
                  <Popup>
                    <div className="p-1 text-slate-900 font-sans text-xs">
                      <b className="text-slate-800">Alternate Highway Route</b>
                      <div className="text-slate-600 text-[11px] mt-0.5">
                        Click to switch active navigation to this detour.
                      </div>
                    </div>
                  </Popup>
                </Polyline>
              </React.Fragment>
            )}

            {/* Google Maps Active Driving Polyline: Dual-Stroke Electric Blue */}
            {/* Outer Dark Blue Casing */}
            <Polyline
              positions={activeDrivingRouteData.coordinates}
              pathOptions={{
                color: '#1d4ed8',
                weight: 9,
                opacity: 0.95,
                lineCap: 'round',
                lineJoin: 'round'
              }}
            />
            {/* Inner Electric Blue Core */}
            <Polyline
              positions={activeDrivingRouteData.coordinates}
              pathOptions={{
                color: '#38bdf8',
                weight: 5.5,
                opacity: 1.0,
                lineCap: 'round',
                lineJoin: 'round'
              }}
            />

            {/* Google Start Pin 'A' */}
            <Marker
              position={activeCorridorMeta.startCoord}
              icon={getGoogleWaypointIcon('A', `A: ${activeCorridorMeta.originName}`, '#16a34a')}
            />

            {/* Google Destination Pin 'B' */}
            <Marker
              position={activeCorridorMeta.destCoord}
              icon={getGoogleWaypointIcon('B', `B: ${activeCorridorMeta.destName}`, '#dc2626')}
            />
          </>
        )}

        {/* Case B: Dynamic Mission Route Calculated in Logistics Dispatch / Driver View */}
        {showGoogleDirections && hasCustomActiveRoute && (
          <>
            {/* Outer Blue Casing */}
            <Polyline
              positions={activeRoute.geometry_coordinates}
              pathOptions={{
                color: '#1e40af',
                weight: 9,
                opacity: 0.95,
                lineCap: 'round',
                lineJoin: 'round'
              }}
            />
            {/* Inner Google Electric Blue Line */}
            <Polyline
              positions={activeRoute.geometry_coordinates}
              pathOptions={{
                color: '#3b82f6',
                weight: 5.5,
                opacity: 1.0,
                lineCap: 'round',
                lineJoin: 'round'
              }}
            />

            {/* Start Pin 'A' */}
            <Marker
              position={activeRoute.geometry_coordinates[0]}
              icon={getGoogleWaypointIcon('A', `A: ${activeRoute.path_nodes ? activeRoute.path_nodes[0] : 'Origin'}`, '#16a34a')}
            />

            {/* Destination Pin 'B' */}
            <Marker
              position={activeRoute.geometry_coordinates[activeRoute.geometry_coordinates.length - 1]}
              icon={getGoogleWaypointIcon('B', `B: ${activeRoute.path_nodes ? activeRoute.path_nodes[activeRoute.path_nodes.length - 1] : 'Destination'}`, '#dc2626')}
            />
          </>
        )}

        {/* 6. Predictive Landslide Hazard Hotspots */}
        {showLandslides && !focusRoadOnly && filteredLandslides.map((zone) => (
          <Marker
            key={zone.id}
            position={[zone.lat, zone.lon]}
            icon={getLandslideIcon(zone.probability_pct, zone.name)}
          >
            <Popup>
              <div className="p-1 text-slate-900 font-sans max-w-xs">
                <div className="font-bold text-xs text-rose-700 flex items-center gap-1">
                  ⚠️ {zone.name}
                </div>
                <div className="text-[11px] text-slate-700 mt-1 space-y-1">
                  <div>Hazard Level: <b className="text-rose-600">{zone.hazard_level}</b></div>
                  <div>Slide Probability: <b className="text-rose-600 text-sm font-mono">{zone.probability_pct}%</b></div>
                  <div>NASA SRTM Slope: <b>{zone.srtm_slope_deg}°</b> | Elevation: <b>{zone.elevation_m}m</b></div>
                  <div>GSI Slide Records: <b>{zone.gsi_historical_slides} recorded in catalog</b></div>
                  <div>Trigger Cause: {zone.trigger_cause}</div>
                  <div className="p-1 rounded bg-rose-50 border border-rose-300 text-rose-800 font-bold text-[10px]">
                    Advisory: {zone.recommendation}
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* 7. BRO Heavy Machinery Deployment Units */}
        {showMachinery && !focusRoadOnly && filteredMachinery.map((m) => (
          <Marker
            key={m.id}
            position={[m.lat, m.lon]}
            icon={getMachineryIcon(m.unit, m.type, m.status)}
          >
            <Popup>
              <div className="p-1 text-slate-900 font-sans text-xs">
                <div className="font-bold text-amber-800 flex items-center gap-1">
                  🚜 {m.type}
                </div>
                <div className="text-[11px] text-slate-700 mt-1 space-y-0.5 font-mono">
                  <div>Unit: <b>{m.unit}</b> ({m.operator})</div>
                  <div>Staging: <b>{m.location}</b></div>
                  <div>Status: <b className={m.status.includes('CLEARING') ? 'text-amber-700' : 'text-emerald-700'}>
                    {m.status}
                  </b></div>
                  {m.eta_clearance_hrs > 0 && (
                    <div>Clearance ETA: <b>{m.eta_clearance_hrs} hrs</b></div>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* 8. Regional Monitored Fleet Convoys */}
        {showConvoys && !focusRoadOnly && visibleConvoys
          .filter(c => !(activeVehicle && (c.id === activeVehicle.id || c.id === activeVehicle.vehicle_id)))
          .map((convoy) => (
          <Marker
            key={convoy.id}
            position={[convoy.lat, convoy.lon]}
            icon={getConvoyIcon(convoy)}
            eventHandlers={{
              click: () => {
                if (onSelectConvoy) onSelectConvoy(convoy);
              }
            }}
          >
            <Popup>
              <div className="p-1.5 text-slate-900 font-sans text-xs min-w-[220px]">
                <div className="font-bold text-cyan-800 flex items-center justify-between gap-1 pb-1 border-b border-slate-200">
                  <span className="flex items-center gap-1">🚚 {convoy.id}</span>
                  <span className="font-mono text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded font-bold border border-amber-300">
                    {convoy.vehicle_reg || 'REG-PENDING'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-700 mt-1 space-y-0.5 font-mono">
                  <div>Cargo: <b className="text-slate-900">{convoy.cargo}</b></div>
                  <div>Driver: <b className="text-blue-900">{convoy.driver_name}</b> ({convoy.driver_id})</div>
                  <div>Phone: <b className="text-slate-800">{convoy.driver_phone}</b></div>
                  <div>Priority: <b className="text-rose-700">{convoy.priority}</b></div>
                  <div>Speed: <b>{convoy.speed_kmh} km/h</b> &bull; Status: <b>{convoy.status}</b></div>
                  <div>Destination: <b>{convoy.destination}</b></div>
                </div>
                {onSelectConvoy && (
                  <button 
                    type="button"
                    onClick={() => onSelectConvoy(convoy)}
                    className="mt-2 w-full py-1.5 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-white rounded font-bold text-[10px] uppercase tracking-wider shadow cursor-pointer transition-all active:scale-95"
                  >
                    Inspect Driver & Vehicle Manifest ➔
                  </button>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* 9. Active Monitored Vehicle Moving Along Highway */}
        {activeVehicle && activeVehicle.current_lat && activeVehicle.current_lon && (
          <Marker
            position={[activeVehicle.current_lat, activeVehicle.current_lon]}
            icon={getActiveVehicleIcon(activeVehicle.progress_pct)}
            eventHandlers={{
              click: () => {
                if (onSelectConvoy) onSelectConvoy(activeVehicle);
              }
            }}
          >
            <Popup>
              <div className="p-1.5 text-slate-900 font-sans text-xs min-w-[220px]">
                <div className="font-bold text-cyan-800 flex items-center justify-between gap-1 pb-1 border-b border-slate-200">
                  <span><b>{activeVehicle.vehicle_id}</b></span>
                  <span className="font-mono text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded font-bold border border-amber-300">
                    {activeVehicle.vehicle_reg || 'AS-01-EC-9042'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-700 mt-1 space-y-0.5 font-mono">
                  <div>Driver: <b className="text-blue-900">{activeVehicle.driver_name || 'Subedar R. Thapa'}</b></div>
                  <div>Priority: <b className="text-rose-700">{activeVehicle.cargo_priority}</b></div>
                  <div>Speed: <b>{activeVehicle.speed_kmh} km/h</b> &bull; Status: <b>{activeVehicle.status}</b></div>
                  <div>Progress: <b>{activeVehicle.progress_pct.toFixed(1)}%</b> ({activeVehicle.distance_covered_km.toFixed(1)} km)</div>
                </div>
                {onSelectConvoy && (
                  <button 
                    type="button"
                    onClick={() => onSelectConvoy(activeVehicle)}
                    className="mt-2 w-full py-1.5 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-white rounded font-bold text-[10px] uppercase tracking-wider shadow cursor-pointer transition-all active:scale-95"
                  >
                    Inspect Driver & Vehicle Manifest ➔
                  </button>
                )}
              </div>
            </Popup>
          </Marker>
        )}

        {/* 9b. Live Field Incident Reports Markers */}
        {reports.filter(r => !r.is_resolved && r.latitude && r.longitude).map((r) => (
          <Marker
            key={`field-rpt-${r.id}`}
            position={[r.latitude, r.longitude]}
            icon={getIncidentReportIcon(r.incident_type, r.severity)}
          >
            <Popup>
              <div className="text-slate-900 font-sans text-xs min-w-[210px] max-w-[270px]">
                <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                  <span className="font-bold text-rose-800 flex items-center gap-1">
                    <span>{r.incident_type === 'LANDSLIDE' ? '⛰️' : '⚠️'}</span>
                    <span>{r.incident_type}</span>
                  </span>
                  <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold ${
                    r.severity === 'BLOCKING' 
                      ? 'bg-rose-100 text-rose-800 border border-rose-300' 
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}>
                    {r.severity}
                  </span>
                </div>
                <div className="text-[11px] text-slate-700 mt-1.5 space-y-1">
                  <div><b>Reporter:</b> {r.reporter_name || 'BRO Patrol'} ({r.agency || 'BRO'})</div>
                  <div><b>Snapped Road:</b> {r.snapped_segment_name || 'Mountain Sector'}</div>
                  <div className="text-slate-600 italic bg-slate-50 p-1.5 rounded border border-slate-200">
                    "{r.description}"
                  </div>
                  {r.photo_url && (
                    <div className="mt-1.5 rounded-lg border border-slate-300 overflow-hidden shadow-sm">
                      <img 
                        src={getMediaUrl(r.photo_url)} 
                        alt="Hazard Evidence" 
                        className="w-full h-28 object-cover" 
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                      <div className="p-1 bg-slate-100 text-[9px] font-mono text-slate-600 flex justify-between">
                        <span>📷 Verified Photo</span>
                        <span className="text-cyan-700 font-bold">ON-GROUND</span>
                      </div>
                    </div>
                  )}
                  <div className="text-[10px] text-slate-400 font-mono pt-1">
                    GPS: {r.latitude?.toFixed(4)}, {r.longitude?.toFixed(4)}
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* 10. Strategic Town Stations & Landmarks */}
        {showStations && !focusRoadOnly && filteredNodes.filter(n => n.isKeyStation || n.isHazardZone).map((node) => (
          <Marker
            key={node.id}
            position={[node.lat, node.lon]}
            icon={getStationIcon(node.name || node.id, node.type, node.elevation_m)}
          >
            <Popup>
              <div className="text-slate-900 font-sans text-xs">
                <div className="font-bold text-cyan-800">{node.name}</div>
                <div className="text-[11px] text-slate-600 mt-0.5">
                  District: <b>{node.district}</b> ({node.state})<br />
                  Elevation: <b>{node.elevation_m} meters</b><br />
                  Role: <b>{node.type}</b>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
          </>
        )}
      </MapContainer>

      {/* ========================================================================= */}
      {/* 11. FLOATING GOOGLE MAPS DIRECTIONS NAVIGATION HUD CARD                    */}
      {/* ========================================================================= */}
      {viewMode === 'transport' && showGoogleDirections && isSpecificCorridor && activeDrivingRouteData && (
        <div className="absolute bottom-4 left-4 z-[1000] max-w-sm w-[330px] bg-slate-900/95 border border-slate-700/80 backdrop-blur-md rounded-2xl p-4 shadow-2xl text-slate-100 font-sans pointer-events-auto transition-all animate-fadeIn">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-white shadow-md">
                <Navigation className="w-3.5 h-3.5 rotate-45" />
              </div>
              <span className="font-bold text-xs text-white">Google Highway Directions</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              OSRM Real Road
            </span>
          </div>

          {/* Time & Distance Highlight */}
          <div className="mt-3 flex items-baseline justify-between">
            <div>
              <div className="text-2xl font-black text-emerald-400 tracking-tight flex items-baseline gap-1">
                <span>{Math.floor(activeDrivingRouteData.duration_hr)} hr {Math.round((activeDrivingRouteData.duration_hr % 1) * 60)} min</span>
              </div>
              <div className="text-xs text-slate-300 font-mono mt-0.5">
                {activeDrivingRouteData.distance_km} km &bull; {activeCorridorMeta.avgSpeed}
              </div>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-bold text-blue-400 block">
                {useAlternateBypass ? 'Recommended Detour' : 'Fastest Highway Route'}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {activeDrivingRouteData.total_points.toLocaleString()} asphalt pts
              </span>
            </div>
          </div>

          {/* Highway Summary Badge */}
          <div className="mt-2.5 text-xs text-slate-200 bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700/60 flex items-center gap-2">
            <CornerUpRight className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate font-medium">
              {useAlternateBypass ? activeCorridorMeta.alternateLabel : activeCorridorMeta.primaryLabel}
            </span>
          </div>

          {/* Alternate Route Selector (For corridors with military bypass like NH-13) */}
          {activeCorridorMeta.hasAlternate && (
            <div className="mt-3 pt-2.5 border-t border-slate-800 flex gap-2">
              <button
                type="button"
                onClick={() => setUseAlternateBypass(false)}
                className={`flex-1 py-1.5 px-2 rounded-lg text-[10px] font-bold transition-all text-center ${
                  !useAlternateBypass 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-900/50' 
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                Primary NH-13
              </button>
              <button
                type="button"
                onClick={() => setUseAlternateBypass(true)}
                className={`flex-1 py-1.5 px-2 rounded-lg text-[10px] font-bold transition-all text-center ${
                  useAlternateBypass 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-900/50' 
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                Kalaktang Detour
              </button>
            </div>
          )}
        </div>
      )}

      {/* Floating Directions Card for Custom Calculated Mission Route (Dispatch View) */}
      {viewMode === 'transport' && showGoogleDirections && hasCustomActiveRoute && (
        <div className="absolute bottom-4 left-4 z-[1000] max-w-sm w-[330px] bg-slate-900/95 border border-slate-700/80 backdrop-blur-md rounded-2xl p-4 shadow-2xl text-slate-100 font-sans pointer-events-auto transition-all animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-white shadow-md">
                <Navigation className="w-3.5 h-3.5 rotate-45" />
              </div>
              <span className="font-bold text-xs text-white">Active Mission Navigation</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
              {activeRoute.mode}
            </span>
          </div>

          <div className="mt-3 flex items-baseline justify-between">
            <div>
              <div className="text-2xl font-black text-emerald-400 tracking-tight">
                {Math.floor(activeRoute.total_time_hours)} hr {Math.round((activeRoute.total_time_hours % 1) * 60)} min
              </div>
              <div className="text-xs text-slate-300 font-mono mt-0.5">
                {activeRoute.total_distance_km} km &bull; {activeRoute.cargo_priority}
              </div>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-bold text-cyan-400 block">
                {activeRoute.hazard_zones_count === 0 ? 'Zero Disruptions' : `${activeRoute.hazard_zones_count} Hazards Cleared`}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                Risk: {(activeRoute.average_risk_score * 100).toFixed(0)}%
              </span>
            </div>
          </div>

          <div className="mt-2 text-xs text-slate-300 bg-slate-800/80 p-2 rounded-lg border border-slate-700/60 truncate font-mono">
            {activeRoute.path_nodes ? activeRoute.path_nodes.join(' → ') : activeRoute.summary}
          </div>
        </div>
      )}

      {/* Floating District Route Inspection Card */}
      {viewMode === 'connectivity' && selectedRouteDetail && (
        <div className="absolute bottom-4 right-4 z-[1000] max-w-sm w-[350px] bg-slate-900/95 border border-slate-700/90 backdrop-blur-md rounded-2xl p-4 shadow-2xl text-slate-100 font-sans pointer-events-auto transition-all animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span 
                className="w-3 h-3 rounded-full" 
                style={{ background: selectedRouteDetail.traffic_color }}
              />
              <span className="font-bold text-xs text-white">{selectedRouteDetail.highway}</span>
            </div>
            <div className="flex items-center gap-2">
              <span 
                className="px-2 py-0.5 rounded text-[10px] font-mono font-bold text-white uppercase"
                style={{ background: selectedRouteDetail.traffic_color }}
              >
                {selectedRouteDetail.traffic_status}
              </span>
              <button
                type="button"
                onClick={() => setSelectedRouteDetail(null)}
                className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 text-xs transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="mt-2.5 text-sm font-bold text-slate-100">
            {selectedRouteDetail.name}
          </div>
          <div className="text-xs text-cyan-400 font-mono mt-0.5">
            {selectedRouteDetail.fromDistrict} ({selectedRouteDetail.fromState}) ➔ {selectedRouteDetail.toDistrict} ({selectedRouteDetail.toState})
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400">Length & Travel Time:</span>
              <div className="font-bold text-emerald-400 mt-0.5">{selectedRouteDetail.distance_km} km • {selectedRouteDetail.travel_time_hrs} hrs</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400">Live Traffic Speed:</span>
              <div className="font-bold mt-0.5" style={{ color: selectedRouteDetail.traffic_color }}>
                {selectedRouteDetail.traffic_speed_kmh} km/h {selectedRouteDetail.delay_mins > 0 ? `(+${selectedRouteDetail.delay_mins}m)` : ''}
              </div>
            </div>
          </div>

          <div className="mt-2 p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] space-y-1.5 font-sans">
            <div>
              <span className="text-slate-400 font-semibold">Road Condition:</span>{' '}
              <span className="text-slate-200">{selectedRouteDetail.condition}</span>
            </div>
            {selectedRouteDetail.active_chokepoints && (
              <div className="text-amber-300">
                <span className="text-slate-400 font-semibold">Chokepoint:</span> {selectedRouteDetail.active_chokepoints}
              </div>
            )}
            {selectedRouteDetail.alternative_bypass && (
              <div className="text-emerald-400">
                <span className="text-slate-400 font-semibold">Alternative Bypass:</span> {selectedRouteDetail.alternative_bypass}
              </div>
            )}
            {selectedRouteDetail.bridge_or_tunnel && (
              <div className="text-cyan-300">
                <span className="text-slate-400 font-semibold">Key Infrastructure:</span> {selectedRouteDetail.bridge_or_tunnel}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Notice Card when Route Data is Pending in Prototype */}
      {viewMode === 'connectivity' && isRouteDataMissing && (
        <div className="absolute bottom-4 left-4 z-[1000] max-w-sm w-[360px] bg-slate-900/95 border border-amber-500/60 backdrop-blur-md rounded-2xl p-4 shadow-2xl text-slate-100 font-sans pointer-events-auto transition-all animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center text-xs font-bold">
                ⚠️
              </div>
              <span className="font-bold text-xs text-amber-300">Route Data Notice</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              PROTOTYPE NOTICE
            </span>
          </div>

          <div className="mt-2.5 text-xs text-slate-200 leading-relaxed">
            For this prototype, detailed telemetry data for <b className="text-white">{selectedOriginDistrict}</b> ({originCentroid?.state || 'NER'}) ↔ <b className="text-white">{selectedDestDistrict}</b> ({destCentroid?.state || 'NER'}) is not added yet. It will be added in a later phase.
          </div>

          <div className="mt-2.5 p-2 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Estimated Direct Distance:</span>
            <span className="text-amber-400 font-bold">~{approxGeodesicDistanceKm} km</span>
          </div>

          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => setSelectedDestDistrict('ALL')}
              className="flex-1 py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono transition-colors cursor-pointer"
            >
              Clear Destination
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedOriginDistrict('ALL');
                setSelectedDestDistrict('ALL');
              }}
              className="flex-1 py-1.5 px-2 rounded-lg bg-cyan-700 hover:bg-cyan-800 text-white text-[11px] font-mono font-bold transition-colors cursor-pointer"
            >
              Show All Routes
            </button>
          </div>
        </div>
      )}
        </div>

        {/* Side Drawer (e.g., Geotechnical Profile Drawer) */}
        {sideDrawer}
      </div>
    </div>
  );
}

export default memo(MapCanvas);
