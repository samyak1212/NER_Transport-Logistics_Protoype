import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Camera, 
  AlertTriangle, 
  CheckCircle2, 
  Send, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  Clock, 
  ShieldAlert,
  Layers
} from 'lucide-react';
import { api } from '../../services/api';

export default function FieldOps({
  reports = [],
  onReportSubmitted = () => {},
  onReportResolved = () => {},
  selectedCoordinates = null
}) {
  const [reporterName, setReporterName] = useState('BRO Junior Engineer (42 BRTF)');
  const [agency, setAgency] = useState('BRO_42_BRTF');
  const [incidentType, setIncidentType] = useState('LANDSLIDE');
  const [severity, setSeverity] = useState('BLOCKING');
  const [lat, setLat] = useState(selectedCoordinates ? selectedCoordinates[0] : 27.0984);
  const [lon, setLon] = useState(selectedCoordinates ? selectedCoordinates[1] : 92.5342);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [offlineQueue, setOfflineQueue] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);

  // Sync with map-clicked coordinates if provided
  useEffect(() => {
    if (selectedCoordinates) {
      setLat(selectedCoordinates[0]);
      setLon(selectedCoordinates[1]);
    }
  }, [selectedCoordinates]);

  // Load offline queue from localStorage
  const loadOfflineQueue = () => {
    const q = JSON.parse(localStorage.getItem('offline_field_reports') || '[]');
    setOfflineQueue(q);
  };

  useEffect(() => {
    loadOfflineQueue();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        reporter_name: reporterName,
        agency: agency,
        incident_type: incidentType,
        severity: severity,
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
        description: description || `Severe ${incidentType.toLowerCase()} causing road restriction.`
      };

      const res = await api.submitFieldReport(payload);
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 4000);
      setDescription('');
      loadOfflineQueue();
      onReportSubmitted(res);
    } catch (err) {
      console.error('Error submitting report:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Sync offline queued reports to backend
  const handleSyncOffline = async () => {
    if (offlineQueue.length === 0) return;
    setIsSyncing(true);
    const remaining = [];

    for (const item of offlineQueue) {
      try {
        const payload = {
          reporter_name: item.reporter_name,
          agency: item.agency,
          incident_type: item.incident_type,
          severity: item.severity,
          latitude: item.latitude,
          longitude: item.longitude,
          description: item.description
        };
        await api.submitFieldReport(payload);
      } catch (err) {
        remaining.push(item);
      }
    }

    localStorage.setItem('offline_field_reports', JSON.stringify(remaining));
    setOfflineQueue(remaining);
    setIsSyncing(false);
    onReportSubmitted();
  };

  const incidentTypes = [
    { id: 'LANDSLIDE', label: 'Landslide', icon: '⛰️' },
    { id: 'FLASH_FLOOD', label: 'Flash Flood', icon: '🌊' },
    { id: 'ROAD_BLOCKAGE', label: 'Debris Fall', icon: '🚧' },
    { id: 'BRIDGE_DAMAGED', label: 'Bridge Damage', icon: '🌉' },
    { id: 'TREE_FALL', label: 'Tree Fall', icon: '🌲' },
  ];

  return (
    <div className="space-y-4 text-slate-200">
      {/* 1. Offline Synchronization Status Banner */}
      <div className="p-3 rounded-xl glass-panel border border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
          <span className="font-semibold text-slate-100">Store-and-Forward Offline Cache:</span>
          <span className="text-slate-400">
            {offlineQueue.length > 0
              ? `${offlineQueue.length} incidents safely queued locally in zero-network buffer`
              : 'All ground field reports synchronized with regional command cloud.'}
          </span>
        </div>

        {offlineQueue.length > 0 && (
          <button
            onClick={handleSyncOffline}
            disabled={isSyncing}
            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>SYNC QUEUE ({offlineQueue.length})</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* 2. Left: 30-Second Mobile Incident Logger */}
        <div className="glass-panel p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              Field Incident Logger (Clause f)
            </h3>
            <span className="text-[10px] text-cyan-400 font-mono">BRO / Police</span>
          </div>

          <form onSubmit={handleSubmit} className="mt-3 space-y-3 text-xs">
            {/* Incident Type Grid */}
            <div>
              <label className="text-slate-400 font-medium">Incident Category</label>
              <div className="mt-1.5 grid grid-cols-2 gap-1.5">
                {incidentTypes.map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setIncidentType(t.id)}
                    className={`py-2 px-2.5 rounded-lg border text-left flex items-center gap-2 transition-all ${
                      incidentType === t.id
                        ? 'bg-amber-500/20 border-amber-500/60 text-amber-200 font-bold'
                        : 'bg-defense-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span>{t.icon}</span>
                    <span className="truncate">{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Severity Chips */}
            <div>
              <label className="text-slate-400 font-medium">Hazard Severity & Road Impact</label>
              <div className="mt-1.5 grid grid-cols-3 gap-1.5">
                {['MINOR', 'MAJOR', 'BLOCKING'].map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSeverity(s)}
                    className={`py-1.5 rounded-lg border font-mono font-bold text-center text-[11px] transition-all ${
                      severity === s
                        ? s === 'BLOCKING'
                          ? 'bg-rose-500 text-white border-rose-600 shadow-md shadow-rose-900/50'
                          : s === 'MAJOR'
                          ? 'bg-amber-500 text-slate-950 border-amber-600'
                          : 'bg-blue-500 text-white border-blue-600'
                        : 'bg-defense-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* GPS Coordinates */}
            <div className="grid grid-cols-2 gap-2 font-mono">
              <div>
                <label className="text-slate-400 text-[11px]">Latitude (°N)</label>
                <input
                  type="number"
                  step="0.0001"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                  className="mt-1 w-full bg-defense-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-100 text-xs outline-none focus:border-cyan-500"
                  required
                />
              </div>
              <div>
                <label className="text-slate-400 text-[11px]">Longitude (°E)</label>
                <input
                  type="number"
                  step="0.0001"
                  value={lon}
                  onChange={(e) => setLon(e.target.value)}
                  className="mt-1 w-full bg-defense-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-100 text-xs outline-none focus:border-cyan-500"
                  required
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="text-slate-400 font-medium">Field Observations / Clearance Notes</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Mudflow 40m wide across both lanes. Excavator required."
                className="mt-1 w-full bg-defense-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 text-xs outline-none focus:border-cyan-500"
              />
            </div>

            {/* Photo upload mock button */}
            <div className="flex items-center justify-between p-2 rounded-lg bg-defense-900 border border-slate-800 text-slate-400">
              <span className="flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-cyan-400" />
                <span>Geotagged Photo:</span>
              </span>
              <span className="text-[10px] text-cyan-400 font-mono">GPS Embedded</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white font-bold rounded-lg shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Transmitting Incident...' : 'TRANSMIT GEO-TAGGED REPORT'}</span>
            </button>

            {submitSuccess && (
              <div className="p-2 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-center font-bold text-xs flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Incident Logged & Snapped to Road Segment!</span>
              </div>
            )}
          </form>
        </div>

        {/* 3. Right: Active Incident Feed & One-Click Road Reopening */}
        <div className="lg:col-span-2 glass-panel p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              Active Corridor Disruption Feed & Clearance Lifecycle
            </h3>
            <span className="text-[11px] font-mono text-slate-400">
              {reports.filter(r => !r.is_resolved).length} Active Incidents
            </span>
          </div>

          <div className="mt-3 space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
            {reports.map((report) => (
              <div
                key={report.id}
                className={`p-3 rounded-lg border text-xs transition-all ${
                  report.is_resolved
                    ? 'bg-defense-900/40 border-slate-800/60 opacity-60'
                    : 'bg-defense-900 border-slate-800 shadow-md'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                      report.severity === 'BLOCKING'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}>
                      {report.incident_type} • {report.severity}
                    </span>
                    <span className="font-mono text-[10px] text-slate-500">
                      ID: {report.id}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {report.timestamp}
                  </span>
                </div>

                <div className="mt-2 text-slate-200 font-medium">
                  {report.description}
                </div>

                <div className="mt-1.5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 font-mono">
                  <div>
                    Snapped: <b className="text-cyan-400">{report.snapped_segment_name || 'Highway Corridor'}</b>
                    <span className="ml-2 text-slate-500">({report.latitude.toFixed(4)}°N, {report.longitude.toFixed(4)}°E)</span>
                  </div>
                  <div>Reported by: <b className="text-slate-300">{report.agency}</b></div>
                </div>

                {/* 1-Click Road Clearance Action */}
                {!report.is_resolved ? (
                  <div className="mt-3 pt-2 border-t border-slate-800 flex justify-end">
                    <button
                      onClick={() => onReportResolved(report.id)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded text-[11px] flex items-center gap-1.5 shadow-md shadow-emerald-900/30 transition-all"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>MARK CLEARED / REOPEN ROAD</span>
                    </button>
                  </div>
                ) : (
                  <div className="mt-2 text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Debris cleared and road reopened into routing graph.</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
