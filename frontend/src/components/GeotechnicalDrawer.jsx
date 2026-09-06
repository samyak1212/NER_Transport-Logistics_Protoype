import React from 'react';
import { X, Mountain, Droplets, History, ShieldCheck, AlertTriangle, Layers } from 'lucide-react';

export default function GeotechnicalDrawer({ segment, onClose }) {
  if (!segment) return null;

  const geo = segment.geotechnical || {};
  const riskPct = Math.round((segment.risk_score || 0) * 100);

  return (
    <div className="glass-panel border-l border-slate-800 p-4 w-80 md:w-96 flex flex-col justify-between text-xs text-slate-300 shadow-2xl h-full overflow-y-auto">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
              Geotechnical Profile • {segment.id}
            </span>
            <h3 className="font-bold text-sm text-slate-100 mt-0.5">{segment.name}</h3>
            <p className="text-slate-400 text-[11px]">District: {segment.district}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Risk Score Banner */}
        <div className={`mt-3 p-2.5 rounded-lg border flex items-center justify-between ${
          segment.is_blocked || riskPct >= 70
            ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
            : riskPct >= 40
            ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
            : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
        }`}>
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider">Disruption Risk Index</div>
            <div className="text-lg font-mono font-black">
              {riskPct}% <span className="text-xs font-normal">({segment.risk_level})</span>
            </div>
          </div>
          {segment.is_blocked ? (
            <AlertTriangle className="w-6 h-6 text-rose-400 animate-pulse" />
          ) : (
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          )}
        </div>

        {segment.is_blocked && (
          <div className="mt-2 p-2 rounded bg-red-950/60 border border-red-800/80 text-red-200 text-[11px]">
            <span className="font-bold">⛔ Active Closure: </span>
            {segment.blockage_reason || 'Unsafe debris or wash-away detected.'}
          </div>
        )}

        {/* Geotechnical Parameters Grid */}
        <div className="mt-4 space-y-3">
          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            Subsurface & Terrain Telemetry
          </h4>

          <div className="grid grid-cols-2 gap-2">
            {/* NASA SRTM Slope */}
            <div className="p-2.5 rounded-lg bg-defense-900 border border-slate-800">
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <Mountain className="w-3 h-3 text-cyan-400" />
                SRTM Slope
              </div>
              <div className="text-sm font-mono font-bold text-slate-100 mt-1">
                {geo.slope_deg}°
              </div>
              <div className="text-[9px] text-slate-500">
                {geo.slope_deg > 30 ? 'High landslide cut' : 'Moderate gradient'}
              </div>
            </div>

            {/* True Elevation */}
            <div className="p-2.5 rounded-lg bg-defense-900 border border-slate-800">
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <Mountain className="w-3 h-3 text-cyan-400" />
                Elevation
              </div>
              <div className="text-sm font-mono font-bold text-slate-100 mt-1">
                {geo.elevation_m} m
              </div>
              <div className="text-[9px] text-slate-500">
                {geo.elevation_m > 2500 ? 'Alpine freeze zone' : 'Sub-tropical valley'}
              </div>
            </div>

            {/* GSI Landslides */}
            <div className="p-2.5 rounded-lg bg-defense-900 border border-slate-800">
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <History className="w-3 h-3 text-amber-400" />
                GSI Past Slides
              </div>
              <div className="text-sm font-mono font-bold text-amber-300 mt-1">
                {geo.gsi_landslide_history} recorded
              </div>
              <div className="text-[9px] text-slate-500">Historical cluster inventory</div>
            </div>

            {/* Precipitation */}
            <div className="p-2.5 rounded-lg bg-defense-900 border border-slate-800">
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <Droplets className="w-3 h-3 text-blue-400" />
                Rain Intensity
              </div>
              <div className="text-sm font-mono font-bold text-blue-300 mt-1">
                {geo.rainfall_intensity_mm} mm/24h
              </div>
              <div className="text-[9px] text-slate-500">Soil sat: {(geo.soil_saturation_index * 100).toFixed(0)}%</div>
            </div>
          </div>

          {/* Geological Formation & Bridge limit */}
          <div className="p-2.5 rounded-lg bg-defense-900 border border-slate-800 space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-400">Rock Formation:</span>
              <span className="font-semibold text-slate-200 text-right">{geo.rock_formation}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Bridge Axle Capacity:</span>
              <span className="font-semibold text-cyan-300">{segment.bridge_limit_tons || 40} Tons</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Normal Transit Speed:</span>
              <span className="font-semibold text-slate-200">{segment.base_speed_kmh} km/h</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-500 font-mono">
        Data sources: NASA SRTM 1-arc-sec DEM • GSI Geological Hazard Catalog • Open-Meteo
      </div>
    </div>
  );
}
