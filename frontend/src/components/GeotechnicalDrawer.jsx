import React from 'react';
import { X, Mountain, Droplets, History, ShieldCheck, AlertTriangle, Layers, Sparkles, Activity } from 'lucide-react';

export default function GeotechnicalDrawer({ segment, onClose }) {
  if (!segment) return null;

  const geo = segment.geotechnical || {};
  const riskBreakdown = segment.risk_breakdown || {};
  const riskPct = Math.round((segment.risk_score || 0) * 100);
  const aiProb = segment.ai_disruption_prob !== undefined ? segment.ai_disruption_prob : (riskBreakdown.ai_disruption_prob ?? segment.risk_score ?? 0.2);
  const contribs = riskBreakdown.ai_feature_contributions || {
    rainfall_factor: Math.round(geo.rainfall_intensity_mm ? Math.min(65, geo.rainfall_intensity_mm * 1.1) : 38),
    slope_factor: Math.round(geo.slope_deg ? Math.min(50, geo.slope_deg * 1.0) : 32),
    lithology_factor: 20,
    elevation_factor: 10
  };
  const safetyFactor = riskBreakdown.ai_safety_factor || roundVal(Math.max(0.6, 1.85 - (aiProb * 1.35)));

  function roundVal(val) {
    return Math.round(val * 100) / 100;
  }

  return (
    <div className="glass-panel border-l border-slate-800 p-4 w-80 md:w-96 flex flex-col justify-between text-xs text-slate-300 shadow-2xl h-full overflow-y-auto">
      <div className="space-y-3">
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
            className="p-1 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Risk Score Banner */}
        <div className={`p-2.5 rounded-lg border flex items-center justify-between ${
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
          <div className="p-2 rounded bg-red-950/60 border border-red-800/80 text-red-200 text-[11px]">
            <span className="font-bold">⛔ Active Closure: </span>
            {segment.blockage_reason || 'Unsafe debris or wash-away detected.'}
          </div>
        )}

        {/* AI Machine Learning Disruption Assessment Card */}
        <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/60 text-[11px] space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-purple-300 flex items-center gap-1.5 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              AI Disruption Classifier
            </span>
            <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-purple-900 text-purple-200 border border-purple-700">
              RandomForest-NER v2.0
            </span>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-purple-900/50">
            <span className="text-slate-400">P(Failure / Disruption):</span>
            <span className="font-bold font-mono text-white text-xs">
              {(aiProb * 100).toFixed(1)}%
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Slope Safety Factor (SF):</span>
            <span className={`font-bold font-mono text-xs ${safetyFactor < 1.0 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {safetyFactor} {safetyFactor < 1.0 ? '(Instability Zone)' : '(Stable Margin)'}
            </span>
          </div>

          {/* Feature Importances / Failure Contribution Bars */}
          <div className="pt-2 border-t border-purple-900/50 space-y-1.5">
            <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between">
              <span>Explainable Failure Drivers:</span>
              <span className="text-purple-300 text-[9px]">Relative Impact</span>
            </div>

            <div className="space-y-1.5 text-[10px] font-mono">
              <div>
                <div className="flex justify-between text-[9px] text-slate-300">
                  <span>Precipitation & Saturation</span>
                  <span className="text-blue-300">{contribs.rainfall_factor || 38}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400 rounded-full transition-all" style={{ width: `${contribs.rainfall_factor || 38}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[9px] text-slate-300">
                  <span>Slope Cut Steepness</span>
                  <span className="text-amber-300">{contribs.slope_factor || 32}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${contribs.slope_factor || 32}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[9px] text-slate-300">
                  <span>Rock Lithology & GSI History</span>
                  <span className="text-purple-300">{contribs.lithology_factor || 20}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-400 rounded-full transition-all" style={{ width: `${contribs.lithology_factor || 20}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[9px] text-slate-300">
                  <span>Alpine Elevation Gradient</span>
                  <span className="text-cyan-300">{contribs.elevation_factor || 10}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full transition-all" style={{ width: `${contribs.elevation_factor || 10}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Geotechnical Parameters Grid */}
        <div className="space-y-2">
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
                {geo.slope_deg > 30 ? 'Steep mountain defile' : 'Gentle slope'}
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
              <div className="text-[9px] text-slate-500">Historical slide clusters</div>
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
              <div className="text-[9px] text-slate-500">Soil sat: {((geo.soil_saturation_index || 0.5) * 100).toFixed(0)}%</div>
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
        Data sources: NASA SRTM DEM • GSI Landslide Database • Scikit-Learn RandomForest AI
      </div>
    </div>
  );
}
