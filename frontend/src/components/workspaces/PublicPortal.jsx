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
  Lock
} from 'lucide-react';
import { ACTIVE_CONVOYS, REGISTERED_DRIVERS } from '../../data/defaultData';

const TRANSLATIONS = {
  en: {
    portalTitle: 'Public & District Health Accessibility Portal',
    portalSub: 'Real-time highway passability status and transparent delivery tracking of lifesaving medicines, oxygen & food rations',
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
  const [lang, setLang] = useState('en');
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const corridorSectors = [
    {
      name: 'Guwahati ➔ Tezpur (NH-15 Plains Sector)',
      status: t.statusOpen,
      level: 'NORMAL',
      detail: 'Clear dual-lane traffic. All bridges operational. No waterlogging.',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
    },
    {
      name: 'Tezpur ➔ Bhalukpong Border (Foothill Gate)',
      status: t.statusOpen,
      level: 'NORMAL',
      detail: 'Assam-Arunachal border gate clear. Normal commercial vehicle clearance.',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
    },
    {
      name: 'Bhalukpong ➔ Sessa ➔ Bomdila (Gorge Sector NH-13)',
      status: t.statusCaution,
      level: 'CAUTION',
      detail: 'Active scree rockfall near km 114 Sessa. Single-lane alternating traffic regulated by BRO.',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30'
    },
    {
      name: 'Bomdila ➔ Sela Pass ➔ Tawang (Alpine Mountain Sector)',
      status: t.statusOpen,
      level: 'NORMAL',
      detail: 'Sela Tunnel is fully operational for all traffic. Snow chains advised for summit pass.',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
    },
    {
      name: 'Dimapur ➔ Paglapahar ➔ Kohima (NH-29 Lifeline)',
      status: t.statusCaution,
      level: 'CAUTION',
      detail: 'Paglapahar defile restricted to single-lane convoy traffic due to rockfall clearance.',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30'
    },
    {
      name: 'Siliguri ➔ Teesta ➔ Gangtok (NH-10 Himalayan)',
      status: t.statusCaution,
      level: 'CAUTION',
      detail: 'Teesta River in spate. Heavy vehicles diverted via Lava-Algarah detour.',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30'
    }
  ];

  const displayConvoys = (allConvoys && allConvoys.length > 0) ? allConvoys : ACTIVE_CONVOYS;

  const emergencyHelplines = [
    { name: 'Arunachal Pradesh State Disaster Control (SEOC)', number: '1070 / 1077', desc: '24x7 State Emergency Management Room, Itanagar' },
    { name: 'BRO Project Vartak Control HQ', number: '03782-222144', desc: 'Border Roads Engineering & Landslide Clearance Hotline' },
    { name: 'Tawang Civil Hospital Emergency Desk', number: '03794-222214', desc: 'Trauma & Emergency Blood Bank Direct Line' },
    { name: 'Bhalukpong Border Police Checkpost', number: '03782-234202', desc: 'Inter-State Border Passability & Escort Desk' },
    { name: 'Assam State Disaster Management (ASDMA)', number: '1079', desc: 'Dispur Flood & Transit Logistics Control' }
  ];

  return (
    <div className="space-y-4 text-slate-200 font-sans">
      {/* 1. Header Banner & Multilingual Switcher */}
      <div className="glass-panel p-4 rounded-xl border border-rose-900/50 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-gradient-to-r from-slate-900 to-defense-900">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
            <HeartPulse className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-sm text-slate-100">
                {t.portalTitle}
              </h2>
              <span className="hidden sm:inline px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500/10 text-rose-300 border border-rose-500/20">
                {t.transparencyBadge}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {t.portalSub}
            </p>
          </div>
        </div>

        {/* Multilingual Selector (Clause h) */}
        <div className="flex items-center gap-1.5 self-stretch md:self-auto justify-end">
          <Languages className="w-4 h-4 text-slate-400 mr-1" />
          {[
            { id: 'en', label: 'English' },
            { id: 'hi', label: 'हिन्दी' },
            { id: 'as', label: 'অসমীয়া' },
            { id: 'bn', label: 'বাংলা' }
          ].map((l) => (
            <button
              key={l.id}
              onClick={() => setLang(l.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                lang === l.id 
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-900/50' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Plain-Language Highway Corridor Passability */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 shadow-xl space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-slate-800">
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              {t.corridorsHeader}
            </h3>
            <p className="text-[11px] text-slate-400">
              {t.corridorsSub}
            </p>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            Updated 5 mins ago
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
          {corridorSectors.map((sector, idx) => (
            <div 
              key={idx} 
              className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-2 hover:border-slate-700 transition-all"
            >
              <div>
                <div className="flex justify-between items-start gap-2">
                  <span className="font-bold text-xs text-white leading-snug">{sector.name}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border whitespace-nowrap ${sector.badgeColor}`}>
                    {sector.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-2 font-sans leading-relaxed">
                  {sector.detail}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-500 flex justify-between">
                <span>Verified by BRO Checkpost</span>
                <span className="text-emerald-400">Passable</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Hospital & Essential Supplies Inflow Radar (Connected Entities: Drivers & Vehicles) */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 shadow-xl space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-slate-800">
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <Truck className="w-4 h-4 text-cyan-400" />
              {t.inflowHeader}
            </h3>
            <p className="text-[11px] text-slate-400">
              {t.inflowSub}
            </p>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
            GPS Live Inflow &bull; Verified Seals
          </span>
        </div>

        <div className="space-y-3 pt-1">
          {displayConvoys.map((convoy, idx) => {
            const convoyId = convoy.id || convoy.vehicle_id;
            const linkedDriver = REGISTERED_DRIVERS.find(d => d.assigned_vehicle_id === convoyId || d.id === convoy.driver_id);
            const priority = convoy.priority || convoy.cargo_priority || linkedDriver?.cargo_priority || 'GENERAL';
            const isMed = priority === 'CRITICAL_MEDICAL' || convoy.cargo_type === 'MEDICAL';
            const isFood = priority === 'ESSENTIAL_FOOD' || convoy.cargo_type === 'FOOD_PDS';
            const isFuel = priority === 'FUEL_POL' || convoy.cargo_type === 'FUEL_POL';
            const badgeBg = isMed ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : isFood ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : isFuel ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';

            const vehicleReg = convoy.vehicle_reg || linkedDriver?.vehicle_reg || 'AS-01-EC-9042';
            const driverName = convoy.driver_name || linkedDriver?.name || 'Driver En Route';
            const driverLicense = convoy.driver_license || linkedDriver?.license_no || 'HMV Certified';
            const cargo = convoy.cargo || linkedDriver?.cargo_summary || 'Essential Regional Supplies';
            const destination = convoy.destination || 'Forward Lifeline Depot';

            return (
              <div 
                key={convoyId || idx} 
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 hover:border-slate-700 transition-all"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold shrink-0 mt-0.5 text-base">
                    {isMed ? '🚑' : isFood ? '🌾' : isFuel ? '⛽' : '🚚'}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-xs text-white">{cargo}</span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold border ${badgeBg}`}>
                        {priority}
                      </span>
                      <span className="font-mono text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800 font-bold">
                        {vehicleReg}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-300 mt-1">
                      Target Destination: <b className="text-white">{destination}</b>
                    </div>

                    {/* Assigned Driver & Security Seal Line */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-[10px] font-mono text-slate-400">
                      <span className="flex items-center gap-1 text-slate-300">
                        <User className="w-3 h-3 text-cyan-400" />
                        Driver: <b className="text-cyan-300">{driverName}</b> ({driverLicense})
                      </span>
                      <span className="flex items-center gap-1 text-emerald-400">
                        <Lock className="w-3 h-3 text-emerald-400" />
                        Seal: {convoy.seal_number || 'BRO-SEAL-VERIFIED'}
                      </span>
                      {convoy.temperature_c && (
                        <span className="flex items-center gap-1 text-cyan-300">
                          <Thermometer className="w-3 h-3 text-cyan-400" />
                          Temp: <b className="text-emerald-400">{convoy.temperature_c}°C (Cold-Chain Safe)</b>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-5 self-stretch md:self-auto justify-between border-t md:border-t-0 pt-2.5 md:pt-0 border-slate-800 font-mono text-xs shrink-0">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block">Est. Delivery</span>
                    <span className="font-bold text-emerald-400">{convoy.eta_hours || (isMed ? 7.5 : 14.0)} hrs</span>
                  </div>

                  <div className="text-right min-w-[70px]">
                    <span className="text-[10px] text-slate-500 block">Progress</span>
                    <span className="font-bold text-cyan-400">{(convoy.progress_pct || 45).toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Public Monsoon & Night Travel Advisory Banner */}
      <div className="glass-panel p-4 rounded-xl border border-amber-500/40 bg-amber-950/20 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <div className="font-bold text-amber-200">
            {t.advisoryHeader}
          </div>
          <p className="text-amber-300/80 leading-relaxed">
            {t.advisoryText}
          </p>
        </div>
      </div>

      {/* 5. Emergency Helplines & Checkpost Directory (Clause h) */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 shadow-xl space-y-3">
        <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2 pb-2 border-b border-slate-800">
          <PhoneCall className="w-4 h-4 text-cyan-400" />
          {t.helplinesHeader}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
          {emergencyHelplines.map((item, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-defense-900 border border-slate-800 text-xs flex flex-col justify-between space-y-2">
              <div>
                <div className="font-bold text-slate-100">{item.name}</div>
                <div className="text-[11px] text-slate-400 mt-1 font-sans">{item.desc}</div>
              </div>
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between font-mono">
                <span className="text-[10px] text-slate-500">24x7 Direct:</span>
                <span className="text-sm font-bold text-cyan-400">{item.number}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
