import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Truck, 
  MapPin, 
  Gauge, 
  HeartPulse, 
  FlaskConical, 
  Wifi, 
  WifiOff, 
  Bell, 
  AlertTriangle 
} from 'lucide-react';

export default function Header({ activeWorkspace, setActiveWorkspace, activeAlertsCount = 0 }) {
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-IN'));
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineQueueCount, setOfflineQueueCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }));
    }, 1000);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check offline queue count
    const checkQueue = () => {
      const q = JSON.parse(localStorage.getItem('offline_field_reports') || '[]');
      setOfflineQueueCount(q.length);
    };
    checkQueue();
    const qTimer = setInterval(checkQueue, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(qTimer);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const workspaces = [
    { id: 'command', label: 'Command HQ', icon: ShieldAlert, color: 'hover:text-cyan-400' },
    { id: 'dispatch', label: 'Logistics Dispatch', icon: Truck, color: 'hover:text-emerald-400' },
    { id: 'field', label: 'Field Ops', icon: MapPin, color: 'hover:text-amber-400', badge: offlineQueueCount > 0 ? `${offlineQueueCount} queued` : null },
    { id: 'driver', label: 'Driver HUD', icon: Gauge, color: 'hover:text-blue-400' },
    { id: 'public', label: 'Public Portal', icon: HeartPulse, color: 'hover:text-rose-400' },
    { id: 'lab', label: 'Simulation Lab', icon: FlaskConical, color: 'hover:text-purple-400' },
  ];

  return (
    <header className="bg-defense-950 border-b border-slate-800 sticky top-0 z-50">
      {/* Top Bar: Authority Info & Operational Status */}
      <div className="px-4 py-2 flex flex-wrap items-center justify-between gap-2 border-b border-slate-900 bg-defense-900/60 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-cyan-500/20 text-cyan-400 font-bold text-[10px]">
            IND
          </span>
          <span className="font-semibold text-slate-200">
            Ministry of Development of North Eastern Region (MDoNER)
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-cyan-400 font-mono">SIH PS-26002</span>
          <span className="hidden md:inline text-slate-500">
            • Western Strategic Lifeline (NH-13 Guwahati-Tawang)
          </span>
        </div>

        <div className="flex items-center gap-4 font-mono">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">IST:</span>
            <span className="text-slate-200 font-semibold">{time}</span>
          </div>

          <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium ${
            isOnline ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
          }`}>
            {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
            <span>{isOnline ? 'SAT-LINK ONLINE' : 'OFFLINE CACHE'}</span>
          </div>

          {activeAlertsCount > 0 && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 animate-pulse font-semibold">
              <AlertTriangle className="w-3 h-3" />
              <span>{activeAlertsCount} ACTIVE DISRUPTIONS</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Workspace Navigation */}
      <div className="px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <ShieldAlert className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-slate-100 text-sm md:text-base tracking-wide flex items-center gap-2">
              NER ACCESSIBILITY INTELLIGENCE
              <span className="px-1.5 py-0.2 text-[10px] uppercase font-mono rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                v1.0
              </span>
            </h1>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Geologically Grounded Smart Logistics & Predictive Hazard System
            </p>
          </div>
        </div>

        {/* Workspace Switcher Tabs */}
        <nav className="flex items-center gap-1 bg-defense-900 p-1 rounded-xl border border-slate-800/80 overflow-x-auto">
          {workspaces.map((ws) => {
            const Icon = ws.icon;
            const isActive = activeWorkspace === ws.id;
            return (
              <button
                key={ws.id}
                onClick={() => setActiveWorkspace(ws.id)}
                className={`relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/30'
                    : `text-slate-400 ${ws.color} hover:bg-defense-800`
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{ws.label}</span>
                {ws.badge && (
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-amber-500 text-slate-950 font-bold animate-bounce">
                    {ws.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
