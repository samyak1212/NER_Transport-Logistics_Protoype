import React, { useState } from 'react';
import { 
  Gauge, 
  AlertTriangle, 
  Radio, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Compass, 
  Volume2, 
  PhoneCall,
  CornerUpRight,
  Mountain,
  Fuel,
  Coffee,
  CheckCircle2,
  Wifi,
  Navigation,
  User,
  Users,
  CreditCard,
  Thermometer,
  Package,
  KeyRound,
  ShieldAlert,
  Snowflake,
  LifeBuoy
} from 'lucide-react';
import { FUEL_AND_ENERGY_RESERVES, REGIONAL_HAZARD_INTELLIGENCE } from '../../data/defaultData';

export default function DriverHUD({ 
  activeVehicle,
  currentDriver,
  drivers = [],
  selectedDriverId,
  onSelectDriver = () => {},
  onRerouteVehicle = () => {}
}) {
  const [activeDriverTab, setActiveDriverTab] = useState('fuel'); // 'fuel', 'pass', 'shelters', 'license'
  const [sosSent, setSosSent] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [gpsMode, setGpsMode] = useState('SIMULATED'); // 'SIMULATED' or 'LIVE_DEVICE'
  const [liveGpsData, setLiveGpsData] = useState(null);
  const [gpsError, setGpsError] = useState(null);

  React.useEffect(() => {
    let watchId = null;
    if (gpsMode === 'LIVE_DEVICE' && typeof navigator !== 'undefined' && navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const speedKmh = pos.coords.speed !== null && pos.coords.speed >= 0 ? Math.round(pos.coords.speed * 3.6) : 38;
          setLiveGpsData({
            lat: parseFloat(pos.coords.latitude.toFixed(5)),
            lon: parseFloat(pos.coords.longitude.toFixed(5)),
            speed: speedKmh,
            accuracy_m: Math.round(pos.coords.accuracy)
          });
          setGpsError(null);
        },
        (err) => {
          console.warn('Geolocation watch error:', err);
          setGpsError('GPS signal degraded');
        },
        { enableHighAccuracy: true, maximumAge: 3000, timeout: 10000 }
      );
    }
    return () => {
      if (watchId !== null && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [gpsMode]);

  const handleSOS = () => {
    setSosSent(true);
    setTimeout(() => setSosSent(false), 6000);
  };

  const isHazardAhead = activeVehicle?.ahead_hazard_detected;

  const restStops = [
    {
      name: 'BRO 42 BRTF Transit Shelter',
      location: 'Bhalukpong km 48',
      distance: '18 km ahead',
      services: ['Water', 'Medical Aid', 'Satellite Phone'],
      status: 'OPEN'
    },
    {
      name: 'Dirang Highway Rest & Food Canteen',
      location: 'Dirang km 172',
      distance: '52 km ahead',
      services: ['Hot Meals', 'Driver Dormitory', 'Tire Repair'],
      status: 'OPEN'
    },
    {
      name: 'Jaswant Garh High-Altitude Shelter',
      location: 'Jaswant Garh km 215',
      distance: '86 km ahead',
      services: ['Heated Barracks', 'Oxygen Cylinders', 'Snow Chain Fitting'],
      status: 'OPEN'
    }
  ];

  const driver = currentDriver || {
    id: 'DRV-014',
    name: 'Subedar R. Thapa',
    phone: '+91 94350-12844',
    license_no: 'HMV-AR-2016-9021 (All-Terrain Hill Endorsed)',
    experience_years: 14,
    blood_group: 'O+',
    vehicle_reg: 'AS-01-EC-9042',
    vehicle_model: 'Tata 1618 SE 4x4 Mountain Cold-Chain Carrier',
    cargo_summary: '10,000 Doses Anti-Rabies & Snake Venom + Cryogenic Oxygen',
    cargo_priority: 'CRITICAL_MEDICAL'
  };

  const vehicle = activeVehicle || {
    vehicle_id: 'MED_CONVOY_01',
    speed_kmh: 42,
    progress_pct: 68,
    total_distance_km: 380,
    distance_covered_km: 258,
    eta_hours: 7.5,
    operational_advisory: 'CONTINUE',
    temperature_c: 3.8
  };

  const fuelStations = FUEL_AND_ENERGY_RESERVES?.fuel_stations || [];

  return (
    <div className="space-y-4 text-slate-100 font-mono select-none">
      {/* 1. Driver Identity & Vehicle Login Bar */}
      <div className="glass-panel p-3.5 rounded-2xl border border-slate-700/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-gradient-to-r from-slate-900 via-slate-900/95 to-defense-900 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-700 flex items-center justify-center text-white font-black text-xl shadow-lg border border-blue-400 shrink-0">
            {driver.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white uppercase tracking-wide flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-cyan-400" />
                <span>{driver.name}</span>
              </span>
              <span className="px-2 py-0.2 rounded text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
                {driver.id}
              </span>
              <span className="px-2 py-0.2 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Blood: {driver.blood_group}
              </span>
            </div>
            <div className="text-[11px] text-slate-300 font-sans mt-0.5">
              Assigned Vehicle: <b className="text-white">{driver.vehicle_model}</b> (<span className="text-amber-400 font-mono">{driver.vehicle_reg}</span>)
            </div>
            <div className="text-[10px] text-slate-400 font-sans">
              License: <span className="font-mono text-slate-300">{driver.license_no}</span> &bull; Exp: <span className="text-slate-200">{driver.experience_years} yrs mountain</span>
            </div>
          </div>
        </div>

        {/* Switch Driver Profile / Login Button & GPS Mode */}
        <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto justify-end">
          {/* GPS Mode Toggle */}
          <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-700">
            <button
              type="button"
              onClick={() => setGpsMode('SIMULATED')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-sans font-bold flex items-center gap-1 transition-all cursor-pointer ${
                gpsMode === 'SIMULATED' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>🕹️ Sim</span>
            </button>
            <button
              type="button"
              onClick={() => setGpsMode('LIVE_DEVICE')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-sans font-bold flex items-center gap-1 transition-all cursor-pointer ${
                gpsMode === 'LIVE_DEVICE' ? 'bg-emerald-600 text-white shadow animate-pulse' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>📡 Live GPS</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowDriverModal(true)}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-cyan-300 text-xs font-bold font-sans flex items-center gap-1.5 transition-all shadow-md cursor-pointer active:scale-95"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Driver Login</span>
          </button>

          {/* Voice Mute Toggle */}
          <button
            onClick={() => setAudioMuted(!audioMuted)}
            className={`p-2 rounded-xl border text-xs transition-all cursor-pointer ${
              audioMuted ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-blue-600/20 border-blue-500/40 text-blue-300'
            }`}
            title="Toggle Audio Advisories"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Driver Login Modal */}
      {showDriverModal && (
        <div className="fixed inset-0 z-[2000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-lg rounded-2xl border border-slate-700 p-5 shadow-2xl bg-slate-900 space-y-4 animate-fadeIn">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-sm text-white font-sans">Driver Identity Login & Vehicle Assignment</h3>
              </div>
              <button
                onClick={() => setShowDriverModal(false)}
                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-400 font-sans">
              Select your registered driver profile to sync vehicle telemetry, cargo manifest, emergency SOS, and transit credentials:
            </p>

            <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
              {drivers.map((d) => {
                const isCurrent = d.id === driver.id;
                return (
                  <div
                    key={d.id}
                    onClick={() => {
                      onSelectDriver(d.id);
                      setShowDriverModal(false);
                    }}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isCurrent
                        ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-lg'
                        : 'bg-defense-900 border-slate-800 hover:border-slate-600 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-cyan-400 text-sm shrink-0">
                        {d.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-white">{d.name}</span>
                          <span className="text-[10px] font-mono text-cyan-400">{d.id}</span>
                          {isCurrent && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-500/20 text-emerald-300 font-bold">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-300 font-sans mt-0.5">
                          {d.vehicle_model} (<b className="text-amber-400 font-mono">{d.vehicle_reg}</b>)
                        </div>
                        <div className="text-[10px] text-slate-400 font-sans">
                          {d.cargo_summary}
                        </div>
                      </div>
                    </div>

                    <button className={`px-2.5 py-1 rounded-lg text-[10px] font-bold font-sans ${
                      isCurrent ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {isCurrent ? 'Selected' : 'Log In'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 2. SOS Distress Flash Feedback */}
      {sosSent && (
        <div className="p-4 rounded-xl bg-rose-600 text-white font-bold text-center animate-bounce shadow-2xl border-2 border-white">
          🚨 EMERGENCY SOS DISTRESS BEACON TRANSMITTED! SATELLITE BROADCAST LOGGED AT BRO 42 BRTF & DISASTER COMMAND.
        </div>
      )}

      {/* 3. Ahead Hazard Radar Banner with 1-Touch Detour Prompt (PRIMARY FOCUS) */}
      <div className={`p-4 rounded-xl border-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
        isHazardAhead
          ? 'bg-rose-950/90 border-rose-500 text-rose-100 animate-pulse shadow-xl shadow-rose-950/80'
          : 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shrink-0 shadow-lg ${
            isHazardAhead ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
          }`}>
            {isHazardAhead ? '⚠️' : '🛡️'}
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-slate-400 font-mono">
              Ahead Route Radar (Next 25 km Scan)
            </div>
            <div className="text-base md:text-lg font-black tracking-tight">
              {isHazardAhead
                ? 'ALERT: ROAD DEBRIS / HAZARD REPORTED AHEAD'
                : 'FORWARD HIGHWAY CLEAR — MAINTAIN MOUNTAIN SPEED'}
            </div>
            <div className="text-xs text-slate-300 mt-0.5 font-sans">
              {isHazardAhead
                ? vehicle.ahead_hazard_detail || 'Sudden scree slide blocking forward lane. Advisory detour suggested.'
                : 'Pavement clear. No active rockfalls or landslides reported in immediate sector.'}
            </div>
          </div>
        </div>

        {isHazardAhead && (
          <button
            onClick={onRerouteVehicle}
            className="w-full md:w-auto px-4 py-3 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white font-black text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 whitespace-nowrap active:scale-95 transition-all border border-amber-300 cursor-pointer"
          >
            <CornerUpRight className="w-4 h-4" />
            <span>AUTHORIZE SAFE DETOUR (KALAKTANG BYPASS)</span>
          </button>
        )}
      </div>

      {/* 4. Large Cockpit Instruments Row (PRIMARY COCKPIT VIEW) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Speedometer & Live Altitude Readout */}
        <div className="glass-panel p-6 rounded-2xl border-2 border-slate-700 flex flex-col items-center justify-center text-center bg-slate-900/80">
          <span className="text-xs text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <Gauge className="w-4 h-4 text-cyan-400" />
            Convoy Speedometer {gpsMode === 'LIVE_DEVICE' && <span className="text-[10px] text-emerald-400 font-mono">(DEVICE GPS)</span>}
          </span>
          <div className="mt-3 text-7xl font-black text-cyan-400 tracking-tighter">
            {gpsMode === 'LIVE_DEVICE' && liveGpsData?.speed !== undefined
              ? liveGpsData.speed
              : (vehicle.speed_kmh || 42)}
          </div>
          <span className="text-sm font-bold text-slate-400 mt-1">KM / HOUR</span>
          <div className="mt-3 px-3 py-1 rounded-full bg-slate-800 text-[11px] text-slate-300 font-mono">
            {gpsMode === 'LIVE_DEVICE' && liveGpsData
              ? `GPS: ${liveGpsData.lat.toFixed(4)}°N, ${liveGpsData.lon.toFixed(4)}°E (±${liveGpsData.accuracy_m || 5}m)`
              : `Speed Limit: 45 km/h • Altitude: 2,850m`}
          </div>
        </div>

        {/* Turn-by-Turn Maneuver Indicator & Specific Cargo Telemetry */}
        <div className="glass-panel p-6 rounded-2xl border-2 border-slate-700 flex flex-col justify-between bg-slate-900/80">
          <div>
            <span className="text-xs text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <CornerUpRight className="w-4 h-4 text-emerald-400" />
              Next Driving Maneuver
            </span>
            <div className="mt-3 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-xl shrink-0">
                ↱
              </div>
              <div>
                <div className="text-lg font-black text-white">
                  In 8.4 km: Keep Right
                </div>
                <div className="text-xs text-slate-300 font-sans mt-0.5">
                  Follow NH-13 Corridor towards Dirang & Sela Summit
                </div>
              </div>
            </div>
          </div>

          {/* Specific Cargo Readout */}
          <div className="mt-3 p-2.5 rounded-xl bg-defense-900 border border-slate-800 font-sans text-xs">
            <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono pb-1 border-b border-slate-800">
              <span>ACTIVE CARGO TELEMETRY</span>
              <span className="text-cyan-400 font-bold">{driver.cargo_priority}</span>
            </div>
            <div className="mt-1.5 flex items-center justify-between">
              <span className="text-slate-300 text-[11px] truncate max-w-[180px]">{driver.cargo_summary}</span>
              {vehicle.temperature_c !== undefined ? (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/20 text-cyan-300 border border-blue-500/30">
                  ❄️ {vehicle.temperature_c}°C
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  ✓ SECURED
                </span>
              )}
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
            <div>
              <span className="text-slate-400">Remaining Dist:</span>
              <div className="text-sm font-bold text-slate-100 font-mono">
                {Math.max(0, (vehicle.total_distance_km || 380) - (vehicle.distance_covered_km || 0)).toFixed(0)} km
              </div>
            </div>
            <div className="text-right">
              <span className="text-slate-400">ETA to Destination:</span>
              <div className="text-sm font-bold text-emerald-400 font-mono">
                {vehicle.eta_hours || 7.5} hrs
              </div>
            </div>
          </div>
        </div>

        {/* Emergency SOS Distress Button */}
        <div className="glass-panel p-6 rounded-2xl border-2 border-rose-900/80 bg-rose-950/30 flex flex-col items-center justify-between text-center">
          <div>
            <span className="text-xs text-rose-400 uppercase tracking-widest flex items-center justify-center gap-1.5 font-bold">
              <Radio className="w-4 h-4 text-rose-500 animate-pulse" />
              Emergency SOS Beacon
            </span>
            <p className="text-[11px] text-slate-300 mt-2 font-sans">
              One-touch satellite distress transmission. Immediately broadcasts emergency signal to BRO detachment, police checkpost, and medical trauma base.
            </p>
          </div>

          <button
            onClick={handleSOS}
            className="w-full mt-4 py-4 rounded-xl bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 text-white font-black text-lg shadow-2xl shadow-rose-950 border-2 border-rose-400 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>🚨 TRANSMIT DISTRESS SOS</span>
          </button>
        </div>
      </div>

      {/* 5. Clustered Sub-Tabs for Auxiliary Driver Needs (Zero Clutter on Main Driving HUD) */}
      <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-3">
        {/* Sub-Tabs Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto">
          <button
            onClick={() => setActiveDriverTab('fuel')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeDriverTab === 'fuel'
                ? 'bg-cyan-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Fuel className="w-3.5 h-3.5 text-cyan-400" />
            <span>Next Fuel & Winter Diesel Bunks</span>
          </button>

          <button
            onClick={() => setActiveDriverTab('pass')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeDriverTab === 'pass'
                ? 'bg-amber-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Snowflake className="w-3.5 h-3.5 text-amber-400" />
            <span>Sela Pass Weather & Tunnel Bypass</span>
          </button>

          <button
            onClick={() => setActiveDriverTab('shelters')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeDriverTab === 'shelters'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Coffee className="w-3.5 h-3.5 text-emerald-400" />
            <span>BRO Transit Shelters & Dorms</span>
          </button>

          <button
            onClick={() => setActiveDriverTab('license')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeDriverTab === 'license'
                ? 'bg-purple-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5 text-purple-400" />
            <span>Digital Mountain Transit Pass</span>
          </button>
        </div>

        {/* Tab 1: Fuel & Winter Diesel Points */}
        {activeDriverTab === 'fuel' && (
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-sans pb-1 border-b border-slate-800">
              <span className="text-slate-300 font-bold">High-Altitude Alpine Diesel (IOCL 527 Pour Point -33°C) Along Route</span>
              <span className="text-cyan-400 font-mono text-[10px]">Next Bunk: 52 km ahead</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-sans text-xs">
              {fuelStations.slice(0, 3).map((stn) => (
                <div key={stn.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-white">{stn.name}</span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-400">
                      {stn.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <div className="text-[11px] text-cyan-400 font-mono">{stn.chainage_km}</div>
                  <div className="text-[11px] text-slate-300">
                    Winter Diesel: <b className={stn.winter_diesel_available ? 'text-emerald-400' : 'text-slate-500'}>{stn.winter_diesel_available ? 'AVAILABLE' : 'REGULAR ONLY'}</b>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    Stock: {stn.regular_diesel_kl} KL Diesel &bull; {stn.petrol_kl} KL Petrol
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Sela Pass Weather & Tunnel Bypass */}
        {activeDriverTab === 'pass' && (
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                <Mountain className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-amber-300 flex items-center gap-2">
                  <span>ALPINE PASS WEATHER: SELA PASS SUMMIT (3,733 METERS)</span>
                  <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-[9px] text-amber-300 font-mono">
                    LIVE SENSOR
                  </span>
                </div>
                <div className="text-xs text-slate-300 font-sans mt-0.5">
                  Current Temp: <b>-2.8°C</b> &bull; Dense fog & sleet reported. <b>Snow chains required</b> above Jaswant Garh. 
                  <span className="text-emerald-400 font-bold ml-1">Twin-tube Sela Tunnel (Elevation 3,000m) is fully clear and open.</span>
                </div>
              </div>
            </div>

            <div className="text-right hidden md:block font-mono">
              <span className="text-[10px] text-slate-400">Sela Tunnel Distance</span>
              <div className="text-sm font-bold text-emerald-400">28 km ahead</div>
            </div>
          </div>
        )}

        {/* Tab 3: Shelters & Dormitories */}
        {activeDriverTab === 'shelters' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-sans text-xs">
            {restStops.map((stop, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-white">{stop.name}</span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-300">
                    {stop.status}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">{stop.location} &bull; <span className="text-cyan-400">{stop.distance}</span></div>
                <div className="flex flex-wrap gap-1 pt-1">
                  {stop.services.map((s, i) => (
                    <span key={i} className="px-1.5 py-0.2 rounded text-[9px] bg-slate-950 text-slate-300 border border-slate-800">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Digital Transit Pass */}
        {activeDriverTab === 'license' && (
          <div className="p-4 rounded-xl bg-defense-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs font-mono">
            <div className="space-y-1">
              <div className="text-white font-bold">DIGITAL ARUNACHAL INNER-LINE TRANSIT CREDENTIAL</div>
              <div className="text-slate-400">Driver: <b className="text-slate-200">{driver.name}</b> &bull; License: <b className="text-cyan-300">{driver.license_no}</b></div>
              <div className="text-slate-400">Duty Hours Today: <b className="text-emerald-400">4.5 / 8.0 hrs</b> &bull; Blood: <b className="text-red-400">{driver.blood_group}</b></div>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
              VERIFIED VALID (CHECKPOST CLEARED)
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
