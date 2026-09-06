import React from 'react';
import { 
  HeartPulse, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Truck, 
  ShieldCheck, 
  CloudRain, 
  Info 
} from 'lucide-react';

export default function PublicPortal({ activeVehicle }) {
  const corridorSectors = [
    {
      name: 'Guwahati ➔ Tezpur (Plains Highway NH-15)',
      status: 'OPEN',
      level: 'NORMAL',
      detail: 'Clear dual-lane traffic. No flood inundation or waterlogging on asphalt.',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
    },
    {
      name: 'Tezpur ➔ Bhalukpong Border (Foothill Sector)',
      status: 'OPEN',
      level: 'NORMAL',
      detail: 'Border checkposts operational. Moderate vehicle queuing at Assam-Arunachal gate.',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
    },
    {
      name: 'Bhalukpong ➔ Sessa ➔ Bomdila (Gorge Sector NH-13)',
      status: 'RESTRICTED',
      level: 'CAUTION',
      detail: 'Active scree rockfall near Sessa hairpin 4. Single-lane movement under BRO control.',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30'
    },
    {
      name: 'Bomdila ➔ Sela Pass ➔ Tawang (Alpine Mountain Sector)',
      status: 'CAUTION',
      level: 'WEATHER_ALERT',
      detail: 'Dense fog and mist near Sela Summit (3,733m). Sela Tunnel bypass is open for convoys.',
      badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
    }
  ];

  const incomingSupplies = [
    {
      consignment: 'Emergency Oxygen & Cold-Chain Vaccines (Anti-Rabies / Venom)',
      recipient: 'Tawang Civil Hospital & Frontier PHCs',
      vehicle: activeVehicle?.vehicle_id || 'MED_CONVOY_01',
      eta: `${activeVehicle?.eta_hours || 7.8} hours`,
      progress: `${activeVehicle?.progress_pct || 22}%`,
      status: 'EN_ROUTE',
      urgency: 'HIGH_PRIORITY'
    },
    {
      consignment: '100 Metric Tons Food Grain (PDS Rice & Pulses)',
      recipient: 'Tawang District Food & Civil Supplies Depot',
      vehicle: 'FCI_CONVOY_08',
      eta: '14.5 hours',
      progress: '15%',
      status: 'EN_ROUTE',
      urgency: 'NORMAL'
    },
    {
      consignment: 'Indian Oil (IOCL) Winter Diesel & Kerosene Bowser',
      recipient: 'Tawang District POL Fuel Staging Pump',
      vehicle: 'IOCL_TANKER_03',
      eta: '18.0 hours',
      progress: '8%',
      status: 'STAGED_AT_BALIPARA',
      urgency: 'MONITORED'
    }
  ];

  return (
    <div className="space-y-4 text-slate-200">
      {/* Public Banner */}
      <div className="glass-panel p-4 rounded-xl border border-rose-900/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <HeartPulse className="w-6 h-6 text-rose-400" />
          <div>
            <h2 className="font-bold text-sm text-slate-100">
              Citizens & District Health Accessibility Portal
            </h2>
            <p className="text-xs text-slate-400">
              Public lifeline connectivity and transparent hospital essential consignment delivery status
            </p>
          </div>
        </div>
        <span className="hidden sm:inline px-3 py-1 rounded-full text-xs font-mono bg-rose-500/10 text-rose-300 border border-rose-500/20">
          Public Transparency Hub
        </span>
      </div>

      {/* 1. Plain-Language Lifeline Sector Passability */}
      <div className="glass-panel p-4 rounded-xl border border-slate-800">
        <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2 mb-3">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Highway Corridor Passability Status (Guwahati to Tawang Lifeline)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {corridorSectors.map((sector, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-defense-900 border border-slate-800 flex flex-col justify-between text-xs">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200">{sector.name}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${sector.badgeColor}`}>
                    {sector.status}
                  </span>
                </div>
                <p className="text-slate-400 mt-2 leading-relaxed text-[11px]">
                  {sector.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Essential Supply Inflow Countdown Radar */}
      <div className="glass-panel p-4 rounded-xl border border-slate-800">
        <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2 mb-3">
          <Truck className="w-4 h-4 text-cyan-400" />
          Incoming Essential Supplies & Medicine Inflow Radar (Tawang Destination)
        </h3>

        <div className="space-y-2.5">
          {incomingSupplies.map((item, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-defense-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-100">{item.consignment}</span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono">
                    {item.vehicle}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Recipient: <b className="text-slate-300">{item.recipient}</b>
                </div>
              </div>

              <div className="flex items-center gap-4 font-mono">
                <div>
                  <span className="text-[10px] text-slate-500">Progress:</span>
                  <div className="text-xs font-bold text-emerald-400">{item.progress}</div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500">Expected Inflow:</span>
                  <div className="text-sm font-bold text-cyan-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {item.eta}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Monsoon Travel & Health Advisory */}
      <div className="p-3 rounded-lg bg-blue-950/30 border border-blue-800/40 text-blue-200 text-xs flex items-start gap-2.5">
        <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed text-[11px]">
          <b>Public Monsoon Advisory:</b> Night transit across Bhalukpong-Tengapani gorge is strictly restricted for private non-commercial vehicles between 19:00 and 05:00 due to active scree slope hazards. Priority passage is reserved for oxygen tankers and emergency medical convoys escorted by BRO 42 BRTF.
        </div>
      </div>
    </div>
  );
}
