import React, { useState } from 'react';
import { 
  HeartPulse, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Truck, 
  ShieldCheck, 
  CloudRain, 
  Info, 
  PhoneCall, 
  Globe, 
  AlertOctagon, 
  Languages, 
  Shield, 
  User, 
  BadgeCheck, 
  Thermometer, 
  Lock,
  Fuel,
  Waves,
  Snowflake,
  Flame,
  LifeBuoy
} from 'lucide-react';
import { 
  ACTIVE_CONVOYS, 
  REGISTERED_DRIVERS,
  FUEL_AND_ENERGY_RESERVES,
  REGIONAL_HAZARD_INTELLIGENCE
} from '../../data/defaultData';

const TRANSLATIONS = {
  en: {
    portalTitle: 'Public & District Health Accessibility Portal',
    portalSub: 'Real-time highway passability status, hospital supply inflows, and district fuel/firewood reserves',
    transparencyBadge: 'Citizen & Hospital Transparency Hub',
    corridorsHeader: 'Highway Corridor Passability Status',
    corridorsSub: 'Plain-language road status updated directly by on-ground police checkposts and BRO engineers',
    inflowHeader: 'Essential Supplies & Hospital Consignments Inflow Radar',
    inflowSub: 'Live transit tracking of medical oxygen, cold-chain vaccines, PDS food grains, and winter fuel with certified drivers & vehicles',
    advisoryHeader: 'Public Monsoon & Night Travel Advisory',
    advisorySub: 'Important safety directives issued by District Disaster Authorities for mountain transit',
    advisoryText: 'Night travel (19:00 - 05:00) along Kameng gorge (NH-13) is strictly restricted during active monsoon downpours. Rockfalls are frequent between km 108 and km 118 near Sessa. Ensure high-altitude snow chains are carried for transit beyond Jaswant Garh towards Sela Pass.',
    helplinesHeader: 'Emergency Helplines & Checkpost Directory',
    statusOpen: 'OPEN',
    statusCaution: 'CAUTION',
    statusRestricted: 'RESTRICTED'
  },
  hi: {
    portalTitle: 'नागरिक एवं जिला स्वास्थ्य सुगमता पोर्टल',
    portalSub: 'राजमार्गों की वास्तविक स्थिति और जीवनरक्षक दवाओं, ऑक्सीजन एवं खाद्यान्न की पारदर्शी ट्रैकिंग',
    transparencyBadge: 'नागरिक व अस्पताल पारदर्शिता केंद्र',
    corridorsHeader: 'राजमार्ग गलियारा आवागमन स्थिति',
    corridorsSub: 'मैदानी पुलिस चौकियों और बीआरओ इंजीनियरों द्वारा अद्यतन की गई सीधी जानकारी',
    inflowHeader: 'आवश्यक आपूर्ति एवं अस्पताल खेप इनफ्लो रडार',
    inflowSub: 'प्रमाणित चालकों एवं वाहनों के साथ मेडिकल ऑक्सीजन, टीकों, पीडीएस राशन और ईंधन की लाइव ट्रैकिंग',
    advisoryHeader: 'सार्वजनिक मानसून एवं रात्रि यात्रा परामर्श',
    advisorySub: 'पहाड़ी यात्रा के लिए जिला आपदा प्राधिकरण द्वारा जारी सुरक्षा निर्देश',
    advisoryText: 'सक्रिय मानसून में कामेंग गॉर्ज (एनएच-13) पर रात (19:00 - 05:00) का सफर पूरी तरह वर्जित है। सेस्सा के पास किमी 108 से 118 के बीच भूस्खलन का खतरा रहता है। सेला पास की ओर जाने वाले वाहनों में स्नो चेन अवश्य रखें।',
    helplinesHeader: 'आपातकालीन हेल्पलाइन एवं चेकपोस्ट डायरेक्टरी',
    statusOpen: 'खुला है',
    statusCaution: 'सावधानी',
    statusRestricted: 'सीमित / बाधित'
  },
  as: {
    portalTitle: 'ৰাজহুৱা আৰু জিলা স্বাস্থ্য সুগমতা প’ৰ্টেল',
    portalSub: 'ৰাষ্ট্ৰীয় ঘাইপথৰ বাস্তৱিক অৱস্থা আৰু জীৱনৰক্ষাকাৰী ঔষধ, অক্সিজেন আৰু খাদ্য সামগ্ৰীৰ স্বচ্ছ ট্ৰেকিং',
    transparencyBadge: 'ৰাইজ আৰু চিকিৎসালয় স্বচ্ছতা কেন্দ্ৰ',
    corridorsHeader: 'ঘাইপথ যাতায়াতৰ ব্যৱস্থা আৰু অৱস্থা',
    corridorsSub: 'ক্ষেত্ৰৰ আৰক্ষী চকী আৰু বিআৰঅ’ বিষয়াৰ দ্বাৰা প্ৰত্যক্ষভাৱে নৱীকৰণ কৰা তথ্য',
    inflowHeader: 'জৰুৰী সামগ্ৰী আৰু চিকিৎসালয়ৰ যোগান ৰাডাৰ',
    inflowSub: 'প্ৰমাণিত চালক আৰু বাহনৰ সৈতে মেডিকেল অক্সিজেন, শীতল-শৃংখলা টিকাকৰণ আৰু ৰেচন সামগ্ৰীৰ লাইভ ট্ৰেকিং',
    advisoryHeader: 'বাৰিষা কালীন আৰু নিশা ভ্ৰমণৰ সতৰ্কবাৰ্তা',
    advisorySub: 'পাহাৰীয়া পথত যাতায়াতৰ বাবে জিলা দুৰ্যোগ প্ৰশমন কৰ্তৃপক্ষৰ নিৰ্দেশনা',
    advisoryText: 'প্ৰবল বৰষুণৰ সময়ত কামেং উপত্যকা (NH-13) হৈ নিশা (19:00 - 05:00) যাত্ৰা কৰা নিষেধ। চেচ্ছাৰ সমীপত ভূমিস্খলনৰ সম্ভাৱনা আছে। চেলা পাছৰ ফালে যোৱা বাহনসমূহত স্ন’ চেইন মজুত ৰাখক।',
    helplinesHeader: 'জৰুৰীকালীন হেল্পলাইন নম্বৰ আৰু নিৰীক্ষণ চকী',
    statusOpen: 'খোলা আছে',
    statusCaution: 'সাৱধানতা',
    statusRestricted: 'সীমিত / বন্ধ'
  },
  bn: {
    portalTitle: 'জনসাধারণ ও জেলা স্বাস্থ্য সুগমতা পোর্টাল',
    portalSub: 'জাতীয় মহাসড়কের বর্তমান অবস্থা এবং জীবনদায়ী ওষুধ, অক্সিজেন ও খাদ্যশস্যের স্বচ্ছ পর্যবেক্ষণ',
    transparencyBadge: 'নাগরিক ও হাসপাতাল স্বচ্ছতা কেন্দ্র',
    corridorsHeader: 'মহাসড়ক চলাচলের বর্তমান অবস্থা',
    corridorsSub: 'অন-গ্রাউন্ড পুলিশ চেকপোস্ট এবং বিআরও ইঞ্জিনিয়ারদের প্রত্যক্ষ পর্যবেক্ষণ',
    inflowHeader: 'জরুরি সরবরাহ ও হাসপাতাল সামগ্রী ইনভেন্টরি ট্র্যাকার',
    inflowSub: 'সার্টিফায়েড চালক এবং যানবাহনের সাথে মেডিকেল অক্সিজেন, ভ্যাকসিন ও খাদ্য রেশনের রিয়েল-টাইম চলাচল পর্যবেক্ষণ',
    advisoryHeader: 'বর্ষাকালীন ও নৈশকালীন ভ্রমণ সতর্কতা',
    advisorySub: 'পার্বত্য অঞ্চলে চলাচলের জন্য জেলা দুর্যোগ ব্যবস্থাপনা কর্তৃপক্ষের নির্দেশিকা',
    advisoryText: 'ভারী বৃষ্টির সময় কামেং ঘাট (NH-13) দিয়ে রাতে (19:00 - 05:00) চলাচল করা নিষেধ। সেসা অঞ্চলের কাছে পাথর পড়ার আশঙ্কা রয়েছে। সেলা পাসের দিকে যাওয়ার সময় গাড়িতে স্নো চেইন রাখুন।',
    helplinesHeader: 'জরুরি হেল্পলাইন ও চেকপোস্ট ডিরেক্টরি',
    statusOpen: 'খোলা আছে',
    statusCaution: 'সতর্কতা',
    statusRestricted: 'সীমিত'
  }
};

export default function PublicPortal({ 
  activeVehicle,
  currentDriver,
  allConvoys = [],
  weatherData = []
}) {
  const [activeTab, setActiveTab] = useState('roads'); // 'roads', 'inflow', 'energy', 'hazards'
  const [lang, setLang] = useState('en');
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const corridorSectors = [
    {
      name: 'NH-13: Guwahati -> Tezpur -> Balipara',
      status: 'OPEN',
      statusText: t.statusOpen,
      statusClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
      advisory: 'Plains sector. Smooth multi-lane transit. Clear visibility.',
      checkpoint: 'Tezpur Traffic Police Checkpost'
    },
    {
      name: 'NH-13: Balipara -> Bhalukpong -> Tippi',
      status: 'CAUTION',
      statusText: t.statusCaution,
      statusClass: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
      advisory: 'Foothill gorge entry. 2-lane road widening ongoing. 15-min alternating pulses.',
      checkpoint: 'Bhalukpong Border Checkpost (ILP Verification)'
    },
    {
      name: 'NH-13: Tippi -> Sessa -> Nag Mandir',
      status: 'RESTRICTED',
      statusText: t.statusRestricted,
      statusClass: 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse',
      advisory: 'Active scree debris slide at km 78. Heavy civilian trucks diverted via BRO Kalaktang Bypass.',
      checkpoint: 'Sessa BRO Field Detachment Post'
    },
    {
      name: 'NH-13: Dirang -> Sela Tunnel -> Tawang',
      status: 'CAUTION',
      statusText: t.statusCaution,
      statusClass: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
      advisory: 'Sela Tunnel is all-weather clear. Old high summit has sub-zero sleet. Snow chains advised.',
      checkpoint: 'Jaswant Garh High-Altitude Army Checkpoint'
    },
    {
      name: 'NH-10: Siliguri -> Sevoke -> Teesta -> Gangtok',
      status: 'CAUTION',
      statusText: t.statusCaution,
      statusClass: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
      advisory: 'Teesta river scour repair active. Heavy goods trucks restricted to nighttime hours.',
      checkpoint: 'Rangpo Sikkim Gate Checkpost'
    },
    {
      name: 'NH-29: Dimapur -> Paglapahar -> Kohima',
      status: 'CAUTION',
      statusText: t.statusCaution,
      statusClass: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
      advisory: 'Rockfall netting ongoing at Paglapahar. Alternating police convoy control.',
      checkpoint: 'Chumukedima Foothill Barrier'
    }
  ];

  const convoys = (allConvoys && allConvoys.length > 0) ? allConvoys : ACTIVE_CONVOYS;
  const driversList = REGISTERED_DRIVERS;

  return (
    <div className="space-y-4 text-slate-100 font-sans">
      {/* 1. Header Banner with Language Switcher */}
      <div className="glass-panel p-4 rounded-xl border border-rose-500/30 bg-gradient-to-r from-rose-950/40 via-slate-900 to-defense-950 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
            <HeartPulse className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-400">
                {t.transparencyBadge}
              </span>
              <span className="px-2 py-0.2 rounded text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono">
                PUBLIC DOMAIN
              </span>
            </div>
            <h2 className="text-base md:text-lg font-black text-white tracking-wide mt-0.5">
              {t.portalTitle}
            </h2>
            <p className="text-xs text-slate-300">
              {t.portalSub}
            </p>
          </div>
        </div>

        {/* Multi-Language Selector */}
        <div className="flex items-center gap-1.5 self-stretch md:self-auto justify-end bg-slate-900 p-1 rounded-xl border border-slate-800">
          <Languages className="w-4 h-4 text-slate-400 ml-1.5" />
          {[
            { key: 'en', label: 'English' },
            { key: 'hi', label: 'हिंदी' },
            { key: 'as', label: 'অসমীয়া' },
            { key: 'bn', label: 'বাংলা' }
          ].map((l) => (
            <button
              key={l.key}
              onClick={() => setLang(l.key)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                lang === l.key 
                  ? 'bg-rose-600 text-white shadow' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Sub-Tabs Bar */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-xl overflow-x-auto shadow-inner">
        <button
          onClick={() => setActiveTab('roads')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'roads'
              ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-rose-400" />
          <span>Highway Passability ({corridorSectors.length} Sectors)</span>
        </button>

        <button
          onClick={() => setActiveTab('inflow')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'inflow'
              ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Truck className="w-4 h-4 text-cyan-400" />
          <span>Hospital Supplies & Oxygen Inflow</span>
        </button>

        <button
          onClick={() => setActiveTab('energy')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'energy'
              ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Flame className="w-4 h-4 text-amber-400" />
          <span>Fuel, Gas & Tribal Firewood Reserves</span>
        </button>

        <button
          onClick={() => setActiveTab('hazards')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'hazards'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Waves className="w-4 h-4 text-cyan-400" />
          <span>Flood & Snow Alerts & Helplines</span>
        </button>
      </div>

      {/* 3. Sub-Tab 1: Highway Passability */}
      {activeTab === 'roads' && (
        <div className="space-y-4">
          <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="pb-2 border-b border-slate-800">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{t.corridorsHeader}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">{t.corridorsSub}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {corridorSectors.map((sector, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-2">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-xs text-white">{sector.name}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono border ${sector.statusClass}`}>
                        {sector.statusText}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-2 font-sans">{sector.advisory}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-500 font-mono flex items-center gap-1">
                    <span>Checkpost:</span>
                    <b className="text-slate-400 truncate">{sector.checkpoint}</b>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. Sub-Tab 2: Hospital Supplies & Oxygen Inflow */}
      {activeTab === 'inflow' && (
        <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="pb-2 border-b border-slate-800">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <Truck className="w-4 h-4 text-cyan-400" />
              <span>{t.inflowHeader}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">{t.inflowSub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {convoys.map((convoy) => {
              const cId = convoy.id || convoy.vehicle_id;
              const linkedDriver = driversList.find(d => d.id === convoy.driver_id || d.assigned_vehicle_id === cId);
              const driverName = convoy.driver_name || linkedDriver?.name || 'Subedar R. Thapa';
              const vehicleReg = convoy.vehicle_reg || linkedDriver?.vehicle_reg || 'AS-01-EC-9042';

              return (
                <div key={cId} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-xs text-white">{cId}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {convoy.priority || 'CRITICAL_MEDICAL'}
                    </span>
                  </div>

                  <div className="p-2 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-200">
                    <span className="text-slate-500 font-mono text-[10px]">CARGO:</span>
                    <div className="font-bold mt-0.5">{convoy.cargo || 'Emergency Medical Supplies & Oxygen'}</div>
                  </div>

                  <div className="space-y-1 text-xs text-slate-300 font-mono">
                    <div>Route: <b className="text-slate-100">{convoy.origin} &rarr; {convoy.destination}</b></div>
                    <div>Driver: <b className="text-cyan-300">{driverName}</b> (<span className="text-amber-400">{vehicleReg}</span>)</div>
                    <div>Speed: <b className="text-white">{convoy.speed_kmh || 38} km/h</b> &bull; Progress: <b className="text-emerald-400">{convoy.progress_pct || 65}%</b></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. Sub-Tab 3: Fuel, Gas & Firewood Reserves */}
      {activeTab === 'energy' && (
        <div className="space-y-4">
          {/* Firewood and Biomass Dependence Card */}
          <div className="glass-panel p-4 rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-950/20 via-slate-900 to-defense-950 space-y-3">
            <div className="pb-2 border-b border-slate-800">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Remote High-Altitude Firewood & Biomass Energy Security</span>
              </h3>
              <p className="text-xs text-slate-400">
                In sub-zero Himalayan winters, remote tribal communities rely on regulated community firewood reserves for heating and survival when fuel highways are blocked.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {FUEL_AND_ENERGY_RESERVES.local_energy_and_forest_biomass_dependence.map((dep, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-xs text-white">{dep.district}</span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-amber-500/20 text-amber-300">
                      {dep.firewood_biomass_dependence_pct}% BIOMASS
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-300 font-sans">{dep.remote_communities}</div>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800 font-mono text-[11px] space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Firewood Stock:</span>
                      <b className="text-emerald-400">{dep.firewood_stock_days} Days</b>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Community Depots:</span>
                      <b className="text-white">{dep.community_firewood_depots} Depots</b>
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    LPG Backlog: <b className="text-amber-400">{dep.lpg_refill_backlog_days} days</b>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* District Fuel & Gas Stocks */}
          <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="pb-2 border-b border-slate-800">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <Fuel className="w-4 h-4 text-cyan-400" />
                <span>District Fuel, Petrol & Domestic LPG Cylinder Buffer Days</span>
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {FUEL_AND_ENERGY_RESERVES.district_energy_stock_days.map((d, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs space-y-1">
                  <div className="font-bold text-white truncate">{d.district}</div>
                  <div className="text-[10px] text-slate-400">{d.state}</div>
                  <div className="pt-1 border-t border-slate-800 text-[11px] flex justify-between">
                    <span className="text-slate-500">Diesel:</span>
                    <b className={d.diesel_days <= 7 ? 'text-rose-400' : 'text-emerald-400'}>{d.diesel_days} days</b>
                  </div>
                  <div className="text-[11px] flex justify-between">
                    <span className="text-slate-500">LPG Gas:</span>
                    <b className={d.lpg_cylinder_days <= 10 ? 'text-amber-400' : 'text-emerald-400'}>{d.lpg_cylinder_days} days</b>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. Sub-Tab 4: Flood & Snow Alerts + Helplines */}
      {activeTab === 'hazards' && (
        <div className="space-y-4">
          <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-cyan-400" />
              <span>{t.helplinesHeader}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-slate-400 font-bold">STATE EMERGENCY OPS (SEOC)</div>
                <div className="text-base font-bold text-white mt-1">1070 / 112</div>
                <p className="text-[10px] text-slate-500 mt-1 font-sans">Toll-free 24/7 disaster distress line</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-slate-400 font-bold">BRO VARTAK ROAD HELPLINE</div>
                <div className="text-base font-bold text-cyan-300 mt-1">+91 94350-12844</div>
                <p className="text-[10px] text-slate-500 mt-1 font-sans">Direct road clearance & dozer dispatch</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-slate-400 font-bold">TAWANG CIVIL HOSPITAL OXYGEN</div>
                <div className="text-base font-bold text-emerald-400 mt-1">+91 94350-99001</div>
                <p className="text-[10px] text-slate-500 mt-1 font-sans">Medical emergency & blood transfusion</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs font-sans text-amber-200 space-y-1">
            <b className="font-bold text-white flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>{t.advisoryHeader}</span>
            </b>
            <p className="mt-1">{t.advisoryText}</p>
          </div>
        </div>
      )}
    </div>
  );
}
