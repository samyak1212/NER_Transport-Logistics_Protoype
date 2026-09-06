import React, { useState } from 'react';
import { 
  CloudRain, 
  AlertOctagon, 
  Mountain, 
  TrendingUp, 
  Droplets, 
  History, 
  ShieldAlert, 
  CheckCircle2, 
  Navigation,
  ArrowRight,
  Layers
} from 'lucide-react';
import { LANDSLIDE_PREDICTION_ZONES, DEFAULT_WEATHER_STATIONS } from '../data/defaultData';

export default function LandslideRainfallPanel({ onSelectZone, onSelectRoute, weatherData = [] }) {
  const [activeTab, setActiveTab] = useState('landslides');
  const displayWeather = (weatherData && weatherData.length > 0) ? weatherData : DEFAULT_WEATHER_STATIONS;

  return (
    <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-4 text-xs text-slate-200">
      {/* Panel Tab Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-100">
            Disruption Prediction & Lifeline Corridors (Clause b & c)
          </h3>
        </div>

        <div className="flex items-center gap-1 bg-defense-900 p-1 rounded-lg border border-slate-800 font-mono text-[11px]">
          <button
            onClick={() => setActiveTab('landslides')}
            className={`px-3 py-1 rounded transition-all flex items-center gap-1.5 ${
              activeTab === 'landslides' ? 'bg-rose-500 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>Landslide Prediction (5)</span>
          </button>
          <button
            onClick={() => setActiveTab('rainfall')}
            className={`px-3 py-1 rounded transition-all flex items-center gap-1.5 ${
              activeTab === 'rainfall' ? 'bg-blue-500 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5" />
            <span>Rainfall Forecast</span>
          </button>
          <button
            onClick={() => setActiveTab('routes')}
            className={`px-3 py-1 rounded transition-all flex items-center gap-1.5 ${
              activeTab === 'routes' ? 'bg-cyan-500 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Primary vs Alternate Bypass</span>
          </button>
        </div>
      </div>

      {/* 1. Tab: Landslide Susceptibility & Disruption Probability Radar */}
      {activeTab === 'landslides' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Machine Learning Disruption Probability Model: P(Slide) = f(SRTM Slope, 48h Rain, GSI Cluster, Soil Saturation)</span>
            <span className="text-rose-400 font-bold">Monsoon Alert Active</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {LANDSLIDE_PREDICTION_ZONES.map((zone) => {
              const isSevere = zone.probability_pct >= 75;
              const isHigh = zone.probability_pct >= 60;
              return (
                <div
                  key={zone.id}
                  onClick={() => onSelectZone && onSelectZone(zone)}
                  className={`p-3 rounded-lg border text-xs cursor-pointer transition-all hover:scale-[1.01] ${
                    isSevere
                      ? 'bg-rose-950/40 border-rose-500/60 shadow-lg shadow-rose-950/40'
                      : isHigh
                      ? 'bg-amber-950/30 border-amber-500/50'
                      : 'bg-defense-900 border-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400">{zone.id}</span>
                      <h4 className="font-bold text-slate-100 text-xs mt-0.5">{zone.name}</h4>
                    </div>
                    <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] border ${
                      isSevere
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    }`}>
                      {zone.hazard_level}
                    </span>
                  </div>

                  {/* Disruption Probability Gauge */}
                  <div className="mt-2.5">
                    <div className="flex justify-between font-mono text-[11px] mb-1">
                      <span className="text-slate-400">Slide Probability:</span>
                      <span className={`font-bold ${isSevere ? 'text-rose-400' : 'text-amber-400'}`}>
                        {zone.probability_pct}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-defense-900 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className={`h-full ${isSevere ? 'bg-rose-500' : 'bg-amber-500'}`}
                        style={{ width: `${zone.probability_pct}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Geotechnical Parameters */}
                  <div className="mt-2.5 grid grid-cols-2 gap-1.5 font-mono text-[10px] text-slate-400">
                    <div className="flex items-center gap-1">
                      <Mountain className="w-3 h-3 text-cyan-400" />
                      Slope: <b className="text-slate-200">{zone.srtm_slope_deg}°</b>
                    </div>
                    <div className="flex items-center gap-1">
                      <History className="w-3 h-3 text-amber-400" />
                      GSI Records: <b className="text-slate-200">{zone.gsi_historical_slides}</b>
                    </div>
                  </div>

                  <div className="mt-2 text-[10px] text-slate-300 bg-defense-950/70 p-1.5 rounded border border-slate-800/80">
                    <span className="font-bold text-slate-400">Trigger: </span>
                    {zone.trigger_cause}
                  </div>

                  <div className="mt-2 text-[10px] font-mono text-cyan-300 flex items-center justify-between">
                    <span>Advisory:</span>
                    <span className="font-bold">{zone.recommendation}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Tab: Rainfall & IMD Precipitation Forecast */}
      {activeTab === 'rainfall' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Live Open-Meteo & IMD Telemetry across Guwahati-Tawang Strategic Corridor</span>
            <span className="text-blue-400 font-bold">Threshold &gt;40mm triggers alert</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {displayWeather.map((w, idx) => {
              const isAlert = (w.rainfall_mm || w.current_rainfall_mm || 0) >= 40.0;
              return (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border text-xs flex flex-col justify-between ${
                    isAlert
                      ? 'bg-blue-950/40 border-blue-500/60 shadow-md'
                      : 'bg-defense-900 border-slate-800'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-100">{w.station}</span>
                      <span className="font-mono text-[10px] text-slate-500">{w.elevation_m}m</span>
                    </div>
                    <div className="mt-2 text-xl font-bold font-mono text-blue-400">
                      {w.rainfall_mm} <span className="text-xs font-normal text-slate-400">mm</span>
                    </div>
                    <div className="text-[10px] text-slate-300 mt-1 line-clamp-1">
                      {w.weather_desc}
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-800/80 font-mono text-[10px] flex justify-between">
                    <span className="text-slate-500">24h Forecast:</span>
                    <span className="font-bold text-cyan-300">+{w.forecast_24h_mm}mm</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Soil Saturation Trigger Bar */}
          <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-800/40 text-[11px] flex items-start gap-2.5">
            <Droplets className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div className="text-slate-300 leading-relaxed">
              <b>Monsoon Soil Saturation Index:</b> West Kameng gorge sections (Bhalukpong to Sessa) are at <b>82% soil water capacity</b> after 48h of steady rains. Soil shear strength is reduced by 64%, creating high vulnerability to debris flows upon additional 20mm rainfall bursts.
            </div>
          </div>
        </div>
      )}

      {/* 3. Tab: Primary Lifeline vs Alternate Kalaktang Bypass */}
      {activeTab === 'routes' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Route A: Primary NH-13 */}
            <div className="p-4 rounded-xl bg-defense-900 border-2 border-cyan-500/50 shadow-lg text-xs space-y-2.5">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    LIFELINE 1 (PRIMARY)
                  </span>
                  <h4 className="font-bold text-sm text-slate-100 mt-1">Trans-Arunachal Highway (NH-13)</h4>
                </div>
                <span className="font-mono text-xs font-bold text-rose-400">HIGH RISK (0.58)</span>
              </div>

              <div className="font-mono text-[11px] space-y-1.5 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Route Alignment:</span>
                  <span>Guwahati ➔ Tezpur ➔ Bhalukpong ➔ Sessa ➔ Bomdila ➔ Tawang</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Distance:</span>
                  <span className="font-bold text-slate-100">380 km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Transit Time:</span>
                  <span className="font-bold text-slate-100">12.8 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Vulnerable Chokepoints:</span>
                  <span className="text-rose-400 font-bold">Sessa Scree Slide (km 114) • Kaspi Gorge</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Current Passability:</span>
                  <span className="text-amber-400 font-bold">RESTRICTED (Single-Lane Under BRO)</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                Primary civilian and defense supply corridor. Susceptible to mudslides during May–September monsoons.
              </div>
            </div>

            {/* Route B: Southern BRO Kalaktang Strategic Bypass */}
            <div className="p-4 rounded-xl bg-defense-900 border-2 border-amber-500/60 shadow-lg text-xs space-y-2.5">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    LIFELINE 2 (STRATEGIC BYPASS)
                  </span>
                  <h4 className="font-bold text-sm text-slate-100 mt-1">BRO Kalaktang-Shergaon-Rupa Highway</h4>
                </div>
                <span className="font-mono text-xs font-bold text-emerald-400">LOW RISK (0.21)</span>
              </div>

              <div className="font-mono text-[11px] space-y-1.5 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Route Alignment:</span>
                  <span>Balipara ➔ Orang ➔ Bhairabkunda ➔ Kalaktang ➔ Rupa ➔ Bomdila</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Distance:</span>
                  <span className="font-bold text-slate-100">415 km (+35 km)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Transit Time:</span>
                  <span className="font-bold text-slate-100">14.2 hours (+1.4 hrs)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Vulnerable Chokepoints:</span>
                  <span className="text-emerald-400 font-bold">Zero active blockages (Stable Granite/Gneiss)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Current Passability:</span>
                  <span className="text-emerald-400 font-bold">100% CLEAR (Recommended for Critical Meds)</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                Constructed by Border Roads Organisation specifically to bypass the unstable Bhalukpong–Sessa landslide belt.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
