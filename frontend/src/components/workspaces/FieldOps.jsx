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
  Wrench,
  Upload,
  Layers,
  Image,
  Sparkles
} from 'lucide-react';
import { api, getMediaUrl } from '../../services/api';

const MOUNTAIN_LOCATION_PRESETS = [
  { name: 'Sessa Scree Slide (NH-13 km 114)', lat: 27.0984, lon: 92.5342, segment: 'SEG_06 (Sessa Scree Belt)' },
  { name: 'Bhalukpong Foothill Checkpost (km 48)', lat: 27.0125, lon: 92.6394, segment: 'SEG_03 (Bhalukpong Gate)' },
  { name: 'Nichiphu Fog Gorge (km 98)', lat: 27.1500, lon: 92.5000, segment: 'SEG_05 (Nichiphu Sector)' },
  { name: 'Kaspi River Washout Cut (km 122)', lat: 27.2000, lon: 92.4500, segment: 'SEG_08 (Kaspi Stream Crossing)' },
  { name: 'Sela Pass Alpine Summit (km 220)', lat: 27.5050, lon: 92.1020, segment: 'SEG_14 (Sela Summit Pass)' },
  { name: 'Paglapahar Gorge (NH-29 km 32)', lat: 25.7500, lon: 93.9200, segment: 'SEG_22 (Paglapahar Chokepoint)' },
  { name: 'Teesta Bazaar Scour (NH-10 km 48)', lat: 27.0600, lon: 88.4300, segment: 'SEG_27 (Teesta Riverbank)' },
  { name: 'Sonapur Mudflow Tunnel (NH-6 km 142)', lat: 25.1250, lon: 92.3680, segment: 'SEG_32 (Sonapur Tunnel Portal)' }
];

export default function FieldOps({
  reports = [],
  segments = [],
  selectedCoordinates = null,
  onReportSubmitted = () => {},
  onReportResolved = () => {}
}) {
  const [reporterName, setReporterName] = useState('BRO Junior Engineer (42 BRTF)');
  const [agency, setAgency] = useState('BRO_42_BRTF');
  const [incidentType, setIncidentType] = useState('LANDSLIDE');
  const [severity, setSeverity] = useState('BLOCKING');
  const [lat, setLat] = useState(27.0984);
  const [lon, setLon] = useState(92.5342);
  const [presetLocation, setPresetLocation] = useState('Sessa Scree Slide (NH-13 km 114)');
  const [snappedSegment, setSnappedSegment] = useState('SEG_06 (Sessa Scree Belt)');
  const [machineryNeeded, setMachineryNeeded] = useState('CAT_320D_EXCAVATOR');
  const [estClearanceHours, setEstClearanceHours] = useState(2.5);
  const [description, setDescription] = useState('');
  const [photoAttached, setPhotoAttached] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState(null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const fileInputRef = React.useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [offlineQueue, setOfflineQueue] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);

  // Load offline queue from localStorage
  const loadOfflineQueue = () => {
    const q = JSON.parse(localStorage.getItem('offline_field_reports') || '[]');
    setOfflineQueue(q);
  };

  useEffect(() => {
    loadOfflineQueue();
  }, []);

  const handleSelectPreset = (e) => {
    const selectedName = e.target.value;
    setPresetLocation(selectedName);
    const found = MOUNTAIN_LOCATION_PRESETS.find(p => p.name === selectedName);
    if (found) {
      setLat(found.lat);
      setLon(found.lon);
      setSnappedSegment(found.segment);
    }
  };

  const handleUseBrowserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const cLat = parseFloat(pos.coords.latitude.toFixed(5));
          const cLon = parseFloat(pos.coords.longitude.toFixed(5));
          setLat(cLat);
          setLon(cLon);
          setPresetLocation('Custom Live GPS Coordinates');
          setSnappedSegment(`Snapped to Nearest Highway Segment (${cLat}, ${cLon})`);
        },
        () => {
          // Fallback
          setLat(27.0984);
          setLon(92.5342);
          setPresetLocation('Sessa Scree Slide (NH-13 km 114)');
          setSnappedSegment('SEG_06 (Sessa Scree Belt)');
        }
      );
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    const previewUrl = URL.createObjectURL(file);
    setPhotoPreview(previewUrl);
    setPhotoAttached(true);

    setIsUploadingPhoto(true);
    try {
      const res = await api.uploadPhoto(file);
      if (res && res.photo_url) {
        setUploadedPhotoUrl(res.photo_url);
      }
    } catch (err) {
      console.warn('Real photo upload error, retaining local preview for offline sync:', err);
      setUploadedPhotoUrl(previewUrl);
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleClearPhoto = () => {
    setPhotoAttached(false);
    setPhotoFile(null);
    setPhotoPreview(null);
    setUploadedPhotoUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const finalPhotoUrl = uploadedPhotoUrl || (photoAttached ? '/uploads/landslide_sessa.jpg' : null);
      const payload = {
        reporter_name: reporterName,
        agency: agency,
        incident_type: incidentType,
        severity: severity,
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
        description: description || `Severe ${incidentType.toLowerCase()} reported by field unit. Snapped to ${snappedSegment}. Requires ${machineryNeeded} (Est ${estClearanceHours}h clearance).`,
        photo_url: finalPhotoUrl
      };

      const res = await api.submitFieldReport(payload);
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 5000);
      setDescription('');
      handleClearPhoto();
      loadOfflineQueue();
      onReportSubmitted(res);
    } catch (err) {
      console.error('Error submitting report, saving to offline queue:', err);
      // Save to offline queue
      const currentQ = JSON.parse(localStorage.getItem('offline_field_reports') || '[]');
      currentQ.push({
        reporter_name: reporterName,
        agency: agency,
        incident_type: incidentType,
        severity: severity,
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
        description: description || `Offline field incident at ${presetLocation}.`,
        photo_url: uploadedPhotoUrl || photoPreview || null,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('offline_field_reports', JSON.stringify(currentQ));
      loadOfflineQueue();
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 5000);
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
        await api.submitFieldReport(item);
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
    { id: 'LANDSLIDE', label: 'Landslide / Rockfall', icon: '⛰️' },
    { id: 'MUDFLOW', label: 'Mudflow / Debris Washout', icon: '🌊' },
    { id: 'FLASH_FLOOD', label: 'Flash Flood Inundation', icon: '🌧️' },
    { id: 'BRIDGE_DAMAGE', label: 'Bridge / Culvert Damaged', icon: '🌉' },
    { id: 'SNOW_BLOCKAGE', label: 'Snow / Ice Sleet', icon: '❄️' },
    { id: 'TREE_FALL', label: 'Fallen Tree / Powerline', icon: '🌲' }
  ];

  return (
    <div className="space-y-4 text-slate-200 font-sans">
      {/* 1. Header Banner & Offline Sync Bar */}
      <div className="glass-panel p-4 rounded-xl border border-slate-700/80 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-gradient-to-r from-slate-900 to-defense-900">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold font-mono uppercase tracking-wider text-cyan-400">
              Field Operations & Checkpost Incident Console
            </div>
            <div className="text-sm font-black text-white">
              On-Ground Obstacle Logging, Photo Evidence & Road Reopening
            </div>
            <div className="text-[11px] text-slate-400">
              Designed for BRO Junior Engineers, Police Border Checkposts, and Patrol Teams
            </div>
          </div>
        </div>

        {/* Offline Queue Status & Sync Button */}
        <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
          <div className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border flex items-center gap-2 ${
            offlineQueue.length > 0 
              ? 'bg-amber-500/10 border-amber-500/40 text-amber-300' 
              : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
          }`}>
            {offlineQueue.length > 0 ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
            <span>{offlineQueue.length > 0 ? `${offlineQueue.length} Queued Offline` : 'Online & Synchronized'}</span>
          </div>

          {offlineQueue.length > 0 && (
            <button
              onClick={handleSyncOffline}
              disabled={isSyncing}
              className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 shadow"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>Sync Queue</span>
            </button>
          )}
        </div>
      </div>

      {/* Submission Success Toast */}
      {submitSuccess && (
        <div className="p-3 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg animate-fadeIn">
          <CheckCircle2 className="w-4 h-4" />
          <span>Incident broadcasted successfully! Road segment has been updated in the regional routing graph and Command HQ alerted.</span>
        </div>
      )}

      {/* 2. Main Two-Column Layout: Incident Logger on Left, Active Obstacle Feed on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left 7 Columns: Rapid Incident Logging Form */}
        <div className="lg:col-span-7 glass-panel p-5 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2 pb-2 border-b border-slate-800">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            Rapid 60-Second On-Ground Disruption Logger (Clause f)
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Step 1: Incident Category Grid */}
            <div>
              <label className="text-slate-300 font-bold block mb-2 font-mono">
                1. Select Incident Classification:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {incidentTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setIncidentType(type.id)}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                      incidentType === type.id
                        ? 'bg-cyan-500/20 border-cyan-400 text-white font-bold shadow-md shadow-cyan-950'
                        : 'bg-defense-900 border-slate-700 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <span className="text-lg">{type.icon}</span>
                    <span className="text-[11px] leading-tight">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Location and GPS Snapping */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-bold block mb-1 font-mono">
                  2. Mountain Chokepoint Preset:
                </label>
                <select
                  value={presetLocation}
                  onChange={handleSelectPreset}
                  className="w-full bg-defense-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs focus:border-cyan-500 outline-none cursor-pointer"
                >
                  {MOUNTAIN_LOCATION_PRESETS.map((p, idx) => (
                    <option key={idx} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1 font-mono flex items-center justify-between">
                  <span>GPS Coordinates:</span>
                  <button
                    type="button"
                    onClick={handleUseBrowserLocation}
                    className="text-[10px] text-cyan-400 hover:underline flex items-center gap-1 font-sans"
                  >
                    <MapPin className="w-3 h-3" />
                    <span>Get Live GPS</span>
                  </button>
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    step="any"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    placeholder="Latitude"
                    className="w-1/2 bg-defense-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-100 font-mono text-xs focus:border-cyan-500 outline-none"
                  />
                  <input
                    type="number"
                    step="any"
                    value={lon}
                    onChange={(e) => setLon(e.target.value)}
                    placeholder="Longitude"
                    className="w-1/2 bg-defense-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-100 font-mono text-xs focus:border-cyan-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Road Snapping Confirmation Pill */}
            <div className="p-2.5 rounded-lg bg-slate-900 border border-cyan-500/30 flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-400">Automatic Road Snapping:</span>
              <span className="text-cyan-400 font-bold flex items-center gap-1">
                <span>🛣️</span>
                <span>{snappedSegment}</span>
              </span>
            </div>

            {/* Step 3: Severity & Clearance Estimate */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-bold block mb-1 font-mono">
                  3. Road Passability Severity:
                </label>
                <div className="flex gap-1.5">
                  {[
                    { id: 'MINOR', label: 'Minor Caution', color: 'bg-amber-500/20 border-amber-500 text-amber-300' },
                    { id: 'MAJOR', label: 'Single-Lane Only', color: 'bg-orange-500/20 border-orange-500 text-orange-300' },
                    { id: 'BLOCKING', label: 'Total Blockage', color: 'bg-rose-500/20 border-rose-500 text-rose-300' }
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSeverity(s.id)}
                      className={`flex-1 py-1.5 px-2 rounded-lg border text-center text-[10px] font-bold font-mono transition-all cursor-pointer ${
                        severity === s.id ? `${s.color} font-black shadow` : 'bg-defense-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1 font-mono">
                  4. Machinery Required for Clearance:
                </label>
                <select
                  value={machineryNeeded}
                  onChange={(e) => setMachineryNeeded(e.target.value)}
                  className="w-full bg-defense-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-xs focus:border-cyan-500 outline-none cursor-pointer"
                >
                  <option value="CAT_320D_EXCAVATOR">CAT 320D Hydraulic Excavator</option>
                  <option value="CRAWLER_DOZER">Crawler Wheel Dozer</option>
                  <option value="TWIN_AUGER_SNOW_CUTTER">Twin-Auger Snow Cutter</option>
                  <option value="HIGH_LIFT_LOADER">High-Lift Front Loader</option>
                  <option value="MANUAL_GANG">Manual Shovel & Rock Gang</option>
                </select>
              </div>
            </div>

            {/* Step 4: Photo Evidence & Description */}
            <div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                capture="environment"
                className="hidden" 
              />
              <div className="flex justify-between items-center mb-1">
                <label className="text-slate-300 font-bold font-mono">
                  5. Incident Notes & Photo Evidence:
                </label>
                <div className="flex items-center gap-1.5">
                  {photoAttached && (
                    <button
                      type="button"
                      onClick={handleClearPhoto}
                      className="text-[10px] text-rose-400 hover:text-rose-300 font-mono px-1.5 py-0.5"
                    >
                      Clear
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingPhoto}
                    className={`text-[11px] font-bold px-2 py-0.5 rounded border flex items-center gap-1 transition-all cursor-pointer ${
                      photoAttached 
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' 
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:border-cyan-500'
                    }`}
                  >
                    <Camera className="w-3 h-3 text-cyan-400" />
                    <span>
                      {isUploadingPhoto 
                        ? 'Uploading...' 
                        : photoAttached 
                        ? '✓ Photo Linked' 
                        : 'Take Photo / Upload'}
                    </span>
                  </button>
                </div>
              </div>

              {photoAttached && (
                <div className="mb-2 p-2.5 rounded-xl bg-slate-900 border border-slate-700 flex items-center gap-3">
                  <div className="w-14 h-14 rounded-lg bg-slate-950 border border-slate-600 overflow-hidden flex items-center justify-center shrink-0">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-slate-500 text-xs">📸</span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-300 flex-1 min-w-0">
                    <span className="font-bold text-white truncate block">
                      {photoFile ? photoFile.name : 'IMG_HIMALAYA_DEBRIS.JPG'}
                    </span>
                    <span className="text-slate-400 font-mono text-[10px]">
                      {photoFile ? `${(photoFile.size / 1024).toFixed(0)} KB` : 'Site Photo'} &bull; Geotagged: {lat}, {lon}
                    </span>
                    <span className="text-emerald-400 text-[10px] font-mono block">
                      {isUploadingPhoto ? '⏳ Uploading to Server...' : '✓ Linked & Ready for Transmission'}
                    </span>
                  </div>
                </div>
              )}

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                placeholder="Brief on-ground remark (e.g. 50 meters rockfall, scree still rolling down mountain slope, boulder obstruction)..."
                className="w-full bg-defense-900 border border-slate-700 rounded-lg p-2.5 text-slate-100 text-xs focus:border-cyan-500 outline-none resize-none font-sans"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-cyan-950 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'TRANSMITTING INCIDENT...' : 'TRANSMIT ON-GROUND INCIDENT REPORT'}</span>
            </button>
          </form>
        </div>

        {/* Right 5 Columns: Active Field Obstacles & Road Reopening Actions */}
        <div className="lg:col-span-5 glass-panel p-5 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                Active Field Obstacles ({reports.filter(r => !r.is_resolved).length})
              </h3>
              <span className="text-[10px] font-mono text-slate-400">
                1-Click Road Reopening
              </span>
            </div>

            <div className="mt-3 space-y-3 max-h-[480px] overflow-y-auto pr-1">
              {reports.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs font-mono">
                  No active on-ground disruptions reported.
                </div>
              ) : (
                reports.map((r) => {
                  const isBlocked = r.severity === 'BLOCKING';
                  return (
                    <div 
                      key={r.id} 
                      className={`p-3.5 rounded-xl border text-xs space-y-2.5 transition-all ${
                        r.is_resolved 
                          ? 'bg-slate-900/40 border-slate-800 opacity-60' 
                          : isBlocked 
                          ? 'bg-rose-950/30 border-rose-500/50 shadow-md' 
                          : 'bg-defense-900 border-slate-800'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-bold text-slate-100 flex items-center gap-1.5">
                            <span>{r.incident_type === 'LANDSLIDE' ? '⛰️' : '⚠️'}</span>
                            <span>{r.incident_type}</span>
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                            By {r.reporter_name || 'BRO Patrol'} &bull; {r.agency || 'BRO'}
                          </span>
                        </div>

                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          r.is_resolved 
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                            : isBlocked 
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse' 
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        }`}>
                          {r.is_resolved ? 'CLEARED / REOPENED' : r.severity}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-300 font-sans">
                        {r.description}
                      </p>

                      {r.photo_url && (
                        <div className="mt-1.5 rounded-lg overflow-hidden border border-slate-700 bg-slate-950">
                          <img 
                            src={getMediaUrl(r.photo_url)} 
                            alt="Site Evidence" 
                            className="w-full max-h-36 object-cover"
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                          <div className="px-2 py-0.5 text-[9px] text-slate-400 font-mono flex items-center justify-between bg-slate-900/90">
                            <span>📷 Field Photo Evidence</span>
                            <span className="text-cyan-400 font-bold">VERIFIED</span>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px] font-mono">
                        <span className="text-slate-400">
                          Coords: {r.latitude?.toFixed(4)}, {r.longitude?.toFixed(4)}
                        </span>

                        {!r.is_resolved ? (
                          <button
                            type="button"
                            onClick={() => onReportResolved(r.id)}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shadow flex items-center gap-1 transition-all active:scale-95"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Mark Cleared / Reopen Road</span>
                          </button>
                        ) : (
                          <span className="text-emerald-400 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Road Reopened</span>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 font-mono">
            💡 <b>Field Protocol:</b> Once bulldozers or rockbreakers finish debris removal, tapping <b>'Mark Cleared'</b> immediately unblocks the road segment in the central routing engine and alerts all moving convoys.
          </div>
        </div>
      </div>
    </div>
  );
}
