import React, { useState, useEffect } from 'react';
import {
  Boxes,
  Package,
  Warehouse,
  ShoppingCart,
  TrendingUp,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  Truck,
  Sparkles,
  RefreshCw,
  Send,
  Calendar,
  Clock,
  DollarSign,
  Leaf,
  Snowflake,
  Droplets,
  MapPin,
  Layers,
  Thermometer,
  ArrowRight,
  ArrowDownUp,
  AlertOctagon
} from 'lucide-react';
import {
  DEFAULT_BUFFER_STOCKS,
  DEFAULT_WAREHOUSING_NETWORK,
  DEFAULT_LOCAL_MARKETS,
  DEFAULT_DEMAND_CLUSTERS
} from '../../data/defaultData';
import { api } from '../../services/api';

export default function InventoryWarehousePanel() {
  const [activeTab, setActiveTab] = useState('buffer'); // 'buffer' | 'warehousing' | 'markets' | 'clustering'
  const [selectedDistrict, setSelectedDistrict] = useState('Tawang');
  const [bufferStocks, setBufferStocks] = useState(DEFAULT_BUFFER_STOCKS);
  const [warehouses, setWarehouses] = useState(DEFAULT_WAREHOUSING_NETWORK);
  const [marketData, setMarketData] = useState(DEFAULT_LOCAL_MARKETS);
  const [clusters, setClusters] = useState(DEFAULT_DEMAND_CLUSTERS);
  const [forecastData, setForecastData] = useState(null);
  const [isLoadingForecast, setIsLoadingForecast] = useState(false);

  // Advance procurement form state
  const [procCommodity, setProcCommodity] = useState('Potatoes, Onions & Cabbage');
  const [procQuantity, setProcQuantity] = useState(25.0);
  const [procMandi, setProcMandi] = useState('Tezpur Regional APMC Wholesale Mandi');
  const [confirmedOrders, setConfirmedOrders] = useState([
    {
      order_id: 'PROC-INIT-821A',
      district: 'Tawang',
      commodity: 'Emergency Infant Formula',
      category: 'BABY_FOOD',
      quantity_mt: 5.0,
      target_mandi_or_hub: 'Tezpur APMC Food Yard',
      urgency: 'HIGH_PRIORITY',
      trigger_reason: 'Pre-snowfall buffer reinforcement',
      estimated_arrival_hours: 14,
      status: 'IN_TRANSIT_CONVOY'
    }
  ]);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

  // Backhaul booking state
  const [bookedBackhauls, setBookedBackhauls] = useState({});

  useEffect(() => {
    // Load dynamic data from API with fallback
    api.getBufferStocks().then(data => { if (data) setBufferStocks(data); }).catch(() => {});
    api.getWarehousingNetwork().then(data => { if (data) setWarehouses(data); }).catch(() => {});
    api.getLocalMarkets().then(data => { if (data) setMarketData(data); }).catch(() => {});
    api.getDemandClusters().then(data => { if (data) setClusters(data); }).catch(() => {});
  }, []);

  useEffect(() => {
    // Fetch 30-day forecast when district changes or clustering tab is active
    if (activeTab === 'clustering' || activeTab === 'buffer') {
      setIsLoadingForecast(true);
      api.getDemandForecast(selectedDistrict)
        .then(fc => {
          if (fc) setForecastData(fc);
          setIsLoadingForecast(false);
        })
        .catch(() => {
          setIsLoadingForecast(false);
        });
    }
  }, [selectedDistrict, activeTab]);

  const handleIssueProcurement = async (e) => {
    e.preventDefault();
    setIsSubmittingOrder(true);
    const orderPayload = {
      district: selectedDistrict,
      commodity: procCommodity,
      quantity_mt: parseFloat(procQuantity),
      target_mandi_or_hub: procMandi,
      trigger_reason: `Pre-disaster buffer stocking for ${selectedDistrict} prior to predicted weather disruption`
    };

    const res = await api.triggerAdvanceProcurement(orderPayload);
    setConfirmedOrders(prev => [res, ...prev]);
    setIsSubmittingOrder(false);
  };

  const handleBookBackhaul = (bkhId) => {
    setBookedBackhauls(prev => ({
      ...prev,
      [bkhId]: 'DISPATCH_COMMITTED'
    }));
  };

  const currentDistrictStock = bufferStocks[selectedDistrict] || bufferStocks['Tawang'];

  return (
    <div className="space-y-4">
      {/* Top Banner: Operations Context & Persona Sub-Tabs */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Boxes className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white tracking-wide">
                Civil Supplies, Warehousing & Demand Intelligence
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                FEATURES 6, 7 & 8
              </span>
            </div>
            <p className="text-xs text-slate-400 font-sans">
              Strategic buffer stock runways, cold-chain distribution, APMC mandis, local product backhauling & ML KMeans demand forecasting.
            </p>
          </div>
        </div>

        {/* Sub-Tab Navigation */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('buffer')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'buffer'
                ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            Buffer Stock & Emergency Inventory
          </button>

          <button
            onClick={() => setActiveTab('warehousing')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'warehousing'
                ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Warehouse className="w-3.5 h-3.5" />
            Warehousing & Cold Chain
          </button>

          <button
            onClick={() => setActiveTab('markets')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'markets'
                ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Local Markets & Backhaul Trade
          </button>

          <button
            onClick={() => setActiveTab('clustering')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'clustering'
                ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            ML Clustering & Demand Forecast
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUB-TAB 1: BUFFER STOCK & EMERGENCY INVENTORY */}
      {/* ========================================================================= */}
      {activeTab === 'buffer' && (
        <div className="space-y-4">
          {/* District Switcher & Quick Metric Strip */}
          <div className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Focus District:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {Object.keys(bufferStocks).map(dName => (
                  <button
                    key={dName}
                    onClick={() => setSelectedDistrict(dName)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                      selectedDistrict === dName
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {dName.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Runway Days Gauge */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-[10px] uppercase font-mono text-slate-400">Total Supply Runway</div>
                <div className={`text-xl font-mono font-extrabold ${
                  currentDistrictStock.overall_stock_runway_days < 14
                    ? 'text-red-400'
                    : currentDistrictStock.overall_stock_runway_days < 30
                    ? 'text-amber-400'
                    : 'text-emerald-400'
                }`}>
                  {currentDistrictStock.overall_stock_runway_days} DAYS
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-mono border ${
                currentDistrictStock.status === 'CRITICAL_SHORTAGE'
                  ? 'bg-red-500/20 text-red-300 border-red-500/40'
                  : currentDistrictStock.status === 'DEFICIT_RISK'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              }`}>
                {currentDistrictStock.status}
              </span>
            </div>
          </div>

          {/* Pre-Disaster Warning Banner if Deficit Risk */}
          {currentDistrictStock.pre_disaster_procurement_active && (
            <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 flex items-center justify-between gap-3 text-red-200">
              <div className="flex items-center gap-2.5 text-xs font-sans">
                <AlertOctagon className="w-5 h-5 text-red-400 shrink-0" />
                <span>
                  <b>Pre-Disaster Buffer Stocking Trigger Active:</b> Elevation and weather risk models forecast road isolation for {selectedDistrict}. Immediate advance procurement recommended for:{' '}
                  <span className="font-mono text-white font-bold underline">
                    {currentDistrictStock.critical_replenishment_needed.join(', ')}
                  </span>.
                </span>
              </div>
              <span className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded bg-red-500/30 text-red-200 border border-red-500/50">
                Action Required
              </span>
            </div>
          )}

          {/* Commodities Breakdown Table */}
          <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <Package className="w-4 h-4 text-amber-400" />
                Essential Commodities Buffer Stock — {selectedDistrict.replace('_', ' ')}
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">
                Pop. Base: {currentDistrictStock.total_population?.toLocaleString()} citizens
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase font-mono bg-slate-900/50">
                    <th className="p-2.5">Commodity</th>
                    <th className="p-2.5">Category</th>
                    <th className="p-2.5 text-right">Current Stock</th>
                    <th className="p-2.5 text-right">Safety Threshold</th>
                    <th className="p-2.5 text-right">Burn Rate</th>
                    <th className="p-2.5 text-right">Days Left</th>
                    <th className="p-2.5 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {currentDistrictStock.commodities.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30 transition">
                      <td className="p-2.5 font-bold text-white flex items-center gap-2">
                        {item.category === 'VEGETABLE' && <Leaf className="w-3.5 h-3.5 text-emerald-400" />}
                        {item.category === 'GRAIN' && <Package className="w-3.5 h-3.5 text-amber-400" />}
                        {item.category === 'WINTER_FUEL' && <Snowflake className="w-3.5 h-3.5 text-cyan-400" />}
                        {item.category === 'MEDICINE' && <ShieldCheck className="w-3.5 h-3.5 text-red-400" />}
                        {item.name}
                      </td>
                      <td className="p-2.5 font-mono text-[11px] text-slate-400">
                        {item.category}
                      </td>
                      <td className="p-2.5 text-right font-mono font-bold text-white">
                        {item.current_stock_mt} MT
                      </td>
                      <td className="p-2.5 text-right font-mono text-slate-400">
                        {item.safety_buffer_mt} MT
                      </td>
                      <td className="p-2.5 text-right font-mono text-slate-400">
                        {item.daily_burn_rate_mt} MT/day
                      </td>
                      <td className="p-2.5 text-right font-mono font-extrabold">
                        <span className={`px-2 py-0.5 rounded text-[11px] ${
                          item.days_remaining <= 5
                            ? 'bg-red-500/20 text-red-300 font-extrabold'
                            : item.days_remaining <= 15
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-emerald-500/20 text-emerald-300'
                        }`}>
                          {item.days_remaining} d
                        </span>
                      </td>
                      <td className="p-2.5 text-center font-mono">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          item.status === 'CRITICAL'
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : item.status === 'WARNING'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : item.status === 'SURPLUS'
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Two-Column: Advance Procurement Requisition Form & Active Procurement Orders */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Advance Procurement Form */}
            <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="pb-2 border-b border-slate-800">
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-400" />
                  Pre-Disaster Advance Procurement Requisition
                </h3>
                <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                  Pre-order perishables and goods from Assam mandis prior to snowfall or landslide severances.
                </p>
              </div>

              <form onSubmit={handleIssueProcurement} className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-mono text-[10px] uppercase">Destination District</label>
                    <input
                      type="text"
                      disabled
                      value={selectedDistrict.replace('_', ' ')}
                      className="w-full p-2 rounded bg-slate-900 border border-slate-800 text-white font-bold cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-mono text-[10px] uppercase">Commodity Category</label>
                    <select
                      value={procCommodity}
                      onChange={(e) => setProcCommodity(e.target.value)}
                      className="w-full p-2 rounded bg-slate-900 border border-slate-700 text-white"
                    >
                      <option value="Potatoes, Onions & Cabbage">Perishable Vegetables (Potato/Onion/Cabbage)</option>
                      <option value="PDS Rice & Fortified Wheat">PDS Rice & Fortified Wheat</option>
                      <option value="Emergency Infant Milk Formula">Infant Formula & Ready Baby Food</option>
                      <option value="IOCL Winter-Grade Diesel (IOCL 527)">Winter-Grade Diesel (IOCL 527)</option>
                      <option value="Water Purification Tablets & ORS">Water Purification Kits & Medicines</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-mono text-[10px] uppercase">Quantity (Metric Tonnes)</label>
                    <input
                      type="number"
                      min="1"
                      max="500"
                      step="0.5"
                      value={procQuantity}
                      onChange={(e) => setProcQuantity(e.target.value)}
                      className="w-full p-2 rounded bg-slate-900 border border-slate-700 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-mono text-[10px] uppercase">Target Supplier Mandi</label>
                    <select
                      value={procMandi}
                      onChange={(e) => setProcMandi(e.target.value)}
                      className="w-full p-2 rounded bg-slate-900 border border-slate-700 text-white"
                    >
                      <option value="Tezpur Regional APMC Wholesale Mandi">Tezpur Regional APMC Wholesale Mandi</option>
                      <option value="CWC Changsari Multimodal Silos">CWC Changsari Multimodal Silos</option>
                      <option value="Pasighat APMC Agricultural Exchange">Pasighat APMC Agricultural Exchange</option>
                      <option value="Dirang Cold Storage Collective">Dirang Cold Storage Collective</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingOrder}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition"
                >
                  <Send className="w-4 h-4" />
                  {isSubmittingOrder ? 'Transmitting Requisition...' : 'Issue Advance Procurement Order'}
                </button>
              </form>
            </div>

            {/* Active Procurement Orders Tracker */}
            <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="pb-2 border-b border-slate-800 flex justify-between items-center">
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  Active Advance Requisitions ({confirmedOrders.length})
                </h3>
                <span className="text-[10px] font-mono text-emerald-400">
                  DISPATCH CONFIRMED
                </span>
              </div>

              <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                {confirmedOrders.map((ord, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1.5">
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-xs font-bold text-amber-300">{ord.order_id}</span>
                      <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        ETA {ord.estimated_arrival_hours || 18}h
                      </span>
                    </div>
                    <div className="text-xs text-white font-semibold">
                      {ord.commodity} — <span className="font-mono text-emerald-400">{ord.quantity_mt} MT</span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-sans flex justify-between">
                      <span>Source: {ord.target_mandi_or_hub}</span>
                      <span className="text-slate-300">Dest: {ord.district}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: WAREHOUSING & COLD CHAIN NETWORK */}
      {/* ========================================================================= */}
      {activeTab === 'warehousing' && (
        <div className="space-y-4">
          <div className="glass-panel p-4 rounded-xl border border-slate-800">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2 mb-1">
              <Warehouse className="w-4 h-4 text-amber-400" />
              Regional Warehousing Network & Strategic Cold-Storage Grid
            </h3>
            <p className="text-xs text-slate-400 font-sans">
              Integrated network connecting CWC railhead silos, FCI buffer depots, hill-crest godowns, and temperature-controlled cold stores.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {warehouses.map((wh) => (
              <div key={wh.id} className="glass-panel p-4 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
                      {wh.operator}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {wh.warehouse_type.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-white">{wh.name}</h4>
                    <p className="text-xs text-amber-400 flex items-center gap-1 font-mono mt-0.5">
                      <MapPin className="w-3 h-3" /> {wh.location}
                    </p>
                  </div>

                  {/* Utilization Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-slate-400">Storage Utilization</span>
                      <span className="text-white font-bold">{wh.utilized_mt?.toLocaleString()} / {wh.total_capacity_mt?.toLocaleString()} MT ({wh.utilization_pct}%)</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          wh.utilization_pct > 85 ? 'bg-red-400' : wh.utilization_pct > 65 ? 'bg-amber-400' : 'bg-emerald-400'
                        }`}
                        style={{ width: `${wh.utilization_pct}%` }}
                      />
                    </div>
                  </div>

                  {/* Cold Storage Details */}
                  {wh.cold_storage_capacity_m3 > 0 && (
                    <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2 text-cyan-300">
                        <Thermometer className="w-4 h-4" />
                        <span>Cold Chain: {wh.cold_storage_capacity_m3} m³</span>
                      </div>
                      <span className="font-mono font-bold text-white bg-slate-800 px-2 py-0.5 rounded text-[11px]">
                        {wh.cold_storage_temp_c}°C
                      </span>
                    </div>
                  )}

                  {/* Vulnerability Choke Point */}
                  <div className="p-2.5 rounded-lg bg-red-950/20 border border-red-500/30 text-[11px] text-red-300 font-sans">
                    <b>Supply Choke Point:</b> {wh.vulnerable_choke_point}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 font-sans">
                  <b>Road Lifeline:</b> {wh.road_connectivity}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 3: LOCAL MARKETS & BACKHAUL TRADE */}
      {/* ========================================================================= */}
      {activeTab === 'markets' && (
        <div className="space-y-4">
          {/* APMC Mandis & Local Haats Grid */}
          <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="pb-2 border-b border-slate-800">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-emerald-400" />
                Local APMC Mandis, Farmers Haats & Border Trading Centers
              </h3>
              <p className="text-[11px] text-slate-400 font-sans">
                Real-time commercial exchanges for wholesale food procurement and distribution into mountain corridors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {marketData.markets.map((mkt) => (
                <div key={mkt.id} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-xs text-white">{mkt.name}</span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {mkt.market_type.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <div className="text-[11px] text-amber-300 font-mono flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {mkt.location}
                  </div>
                  <div className="text-[11px] text-slate-300 font-sans">
                    <b>Volume:</b> <span className="font-mono font-bold text-white">{mkt.daily_trading_volume_mt} MT/day</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-sans">
                    <b>Staples:</b> {mkt.key_commodities.join(', ')}
                  </div>
                  <div className="pt-2 border-t border-slate-800 text-[10px] text-cyan-300 font-sans">
                    <b>Local Specialties:</b> {mkt.local_specialties.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regional High-Value Produce & Craft Catalog */}
          <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="pb-2 border-b border-slate-800 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-emerald-400" />
                  Northeast Local Products & Bidirectional Economic Integration
                </h3>
                <p className="text-[11px] text-slate-400 font-sans">
                  Assam tea, Monpa paper, organic kiwi, cardamom & handlooms ready for outbound commercial aggregation.
                </p>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded">
                BIDIRECTIONAL TRADE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {marketData.local_products_catalog.map((prd) => (
                <div key={prd.id} className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-xs text-white">{prd.name}</span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {prd.category}
                    </span>
                  </div>
                  <div className="text-[11px] text-cyan-300 font-mono">
                    Origin: {prd.origin_district}
                  </div>
                  <div className="text-[11px] text-slate-300 font-sans">
                    <b>Harvest / Yield:</b> {prd.annual_yield_mt_or_units} ({prd.harvest_peak_months})
                  </div>
                  <div className="p-2 rounded bg-slate-950 text-[11px] font-sans text-emerald-300 border border-slate-800">
                    <b>Backhaul Suitability:</b> {prd.backhaul_suitability}
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans pt-1">
                    {prd.economic_impact}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Backhaul Freight Logistics Optimizer (Eliminating Empty Return Trips) */}
          <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="pb-2 border-b border-slate-800 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2">
                  <ArrowDownUp className="w-4 h-4 text-cyan-400" />
                  Backhaul Freight Logistics Optimizer (Zero Deadhead Mileage)
                </h3>
                <p className="text-[11px] text-slate-400 font-sans">
                  Matches returning supply trucks with high-value agricultural and handicraft freight to enhance transporter income and reduce freight costs.
                </p>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">
                CIRCULAR LOGISTICS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {marketData.backhaul_opportunities.map((bkh) => {
                const isBooked = bookedBackhauls[bkh.id];
                return (
                  <div key={bkh.id} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-start">
                        <span className="font-mono text-xs font-bold text-cyan-400">{bkh.id}</span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold border ${
                          isBooked ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        }`}>
                          {isBooked ? 'LOAD BOOKED' : bkh.status}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-white">{bkh.cargo_description}</div>
                      <div className="text-[11px] text-slate-300 font-sans">
                        <b>Route:</b> {bkh.origin_market} <ArrowRight className="w-3 h-3 inline text-slate-500" /> {bkh.destination_hub}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400">
                        Available Weight: <span className="text-white font-bold">{bkh.available_weight_mt} MT</span> ({bkh.distance_km} km)
                      </div>
                      <div className="text-[11px] font-sans text-emerald-400 font-semibold">
                        Est. Cost Savings / Income: ₹{bkh.potential_savings_inr?.toLocaleString()}
                      </div>
                    </div>

                    <button
                      onClick={() => handleBookBackhaul(bkh.id)}
                      disabled={isBooked}
                      className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition ${
                        isBooked
                          ? 'bg-emerald-600/30 text-emerald-300 cursor-not-allowed border border-emerald-500/30'
                          : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-md'
                      }`}
                    >
                      {isBooked ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Backhaul Matched to Convoy
                        </>
                      ) : (
                        <>
                          <Truck className="w-3.5 h-3.5" />
                          Book Return Backhaul Load
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 4: DEMAND FORECASTING & ML CLUSTERING */}
      {/* ========================================================================= */}
      {activeTab === 'clustering' && (
        <div className="space-y-4">
          {/* ML Clustering Architecture Summary */}
          <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="pb-2 border-b border-slate-800 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  Scikit-Learn KMeans Clustering — 4 Strategic Demand Archetypes
                </h3>
                <p className="text-[11px] text-slate-400 font-sans">
                  Clustering 16 strategic NER districts based on elevation, isolation risk, winter severity, population scale, flood vulnerability, and inbound freight.
                </p>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded">
                ML ENGINE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {clusters.map((cl) => (
                <div key={cl.cluster_id} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        Cluster #{cl.cluster_id}
                      </span>
                      <span className="text-[10px] font-mono text-amber-400 font-bold">
                        {cl.buffer_stock_multiplier}x Buffer
                      </span>
                    </div>
                    <h4 className="font-bold text-xs text-white leading-tight">{cl.cluster_name}</h4>
                    <p className="text-[11px] text-slate-400 font-sans leading-relaxed">{cl.description}</p>

                    <div className="space-y-1 text-[10px] font-mono text-slate-300 bg-slate-950 p-2 rounded border border-slate-800">
                      <div><b>Dominant Hazard:</b> <span className="text-red-300">{cl.dominant_hazard}</span></div>
                      <div><b>Safety Runway:</b> <span className="text-emerald-300">{cl.recommended_safety_days} Days</span></div>
                      <div><b>Avg Elevation:</b> {cl.key_features.avg_elevation_m}m</div>
                      <div><b>Isolation Index:</b> {cl.key_features.avg_isolation_risk}</div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800">
                    <div className="text-[10px] text-slate-400 font-mono uppercase mb-1">Assigned Districts:</div>
                    <div className="flex flex-wrap gap-1">
                      {cl.districts.map((d, idx) => (
                        <span key={idx} className="px-1.5 py-0.2 text-[9px] font-sans font-semibold rounded bg-slate-800 text-slate-200">
                          {d.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 30-Day Forward Demand Projection Panel */}
          <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="pb-2 border-b border-slate-800 flex flex-wrap justify-between items-center gap-2">
              <div>
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  30-Day Forward Demand Trajectory & Disruption Multipliers
                </h3>
                <p className="text-[11px] text-slate-400 font-sans">
                  Forecast combines baseline consumption, impending weather emergency spikes, and seasonal tourism surges.
                </p>
              </div>

              {/* District Switcher for Forecasting */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-mono">Target:</span>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="p-1.5 rounded bg-slate-900 border border-slate-700 text-xs font-bold text-white"
                >
                  <option value="Tawang">Tawang (High-Altitude Redoubt)</option>
                  <option value="Anjaw">Anjaw (Remote Valley Isolate)</option>
                  <option value="North_Sikkim">North Sikkim (GLOF & Avalanche Zone)</option>
                  <option value="Dhemaji">Dhemaji (Brahmaputra Floodplain)</option>
                  <option value="West_Kameng">West Kameng (Transit Corridor)</option>
                  <option value="Sonitpur">Sonitpur (Tezpur Central Staging)</option>
                </select>
              </div>
            </div>

            {/* Advance Procurement Recommendations Box */}
            {forecastData && forecastData.advance_procurement_triggered && (
              <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs text-amber-200 space-y-1.5 font-sans">
                <div className="font-bold flex items-center gap-2 text-amber-300">
                  <AlertTriangle className="w-4 h-4" />
                  Automated Advance Procurement Recommendations for {selectedDistrict.replace('_', ' ')}:
                </div>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-300">
                  {forecastData.recommended_procurement_actions.map((act, i) => (
                    <li key={i}>{act}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Forecast Data Table Preview */}
            {isLoadingForecast ? (
              <div className="p-8 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                Computing 30-Day Predictive Trajectories...
              </div>
            ) : forecastData ? (
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {Object.entries(forecastData.commodity_forecasts).slice(0, 3).map(([cName, points]) => {
                    const total30Days = points.reduce((acc, p) => acc + p.total_projected_mt, 0);
                    const avgDaily = (total30Days / points.length).toFixed(1);
                    const maxDaily = Math.max(...points.map(p => p.total_projected_mt)).toFixed(1);
                    return (
                      <div key={cName} className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                        <div className="flex justify-between items-start">
                          <span className="font-bold text-xs text-white">{cName}</span>
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-slate-800 text-slate-300">
                            30-Day Window
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-center pt-1 font-mono">
                          <div className="p-2 rounded bg-slate-950 border border-slate-800">
                            <div className="text-[10px] text-slate-400 uppercase">30-Day Total</div>
                            <div className="text-sm font-extrabold text-amber-300">{total30Days.toFixed(1)} MT</div>
                          </div>
                          <div className="p-2 rounded bg-slate-950 border border-slate-800">
                            <div className="text-[10px] text-slate-400 uppercase">Peak Day</div>
                            <div className="text-sm font-extrabold text-red-400">{maxDaily} MT</div>
                          </div>
                        </div>
                        <div className="text-[10px] text-slate-400 font-sans flex justify-between pt-1">
                          <span>Average Daily: {avgDaily} MT/day</span>
                          <span className="text-cyan-300">Disruption Multiplier Applied</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 10-Day Trajectory Table */}
                <div className="overflow-x-auto pt-2">
                  <table className="w-full text-left text-xs font-sans">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase font-mono bg-slate-900/50">
                        <th className="p-2">Day</th>
                        <th className="p-2">Date</th>
                        <th className="p-2 text-right">PDS Grain (MT)</th>
                        <th className="p-2 text-right">Perishables (MT)</th>
                        <th className="p-2 text-right">Winter Fuel (MT)</th>
                        <th className="p-2 text-right">Medical Kits (MT)</th>
                        <th className="p-2 text-right">Trade Produce (MT)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                      {[1, 3, 5, 7, 10, 14, 21, 28].map(dayNum => {
                        const grains = forecastData.commodity_forecasts['PDS Rice & Food Grains']?.[dayNum - 1];
                        const veg = forecastData.commodity_forecasts['Perishable Vegetables & Fruits']?.[dayNum - 1];
                        const fuel = forecastData.commodity_forecasts['Winter Diesel & Sub-Zero Kerosene']?.[dayNum - 1];
                        const med = forecastData.commodity_forecasts['Emergency Medical & Infant Kits']?.[dayNum - 1];
                        const trade = forecastData.commodity_forecasts['Tea & Regional Craft Backhaul']?.[dayNum - 1];
                        if (!grains) return null;
                        return (
                          <tr key={dayNum} className="hover:bg-slate-800/30 transition">
                            <td className="p-2 font-bold text-cyan-400">Day +{dayNum}</td>
                            <td className="p-2 text-slate-400">{grains.date}</td>
                            <td className="p-2 text-right font-bold text-white">{grains.total_projected_mt}</td>
                            <td className="p-2 text-right font-bold text-emerald-400">{veg?.total_projected_mt}</td>
                            <td className="p-2 text-right font-bold text-cyan-300">{fuel?.total_projected_mt}</td>
                            <td className="p-2 text-right text-red-300">{med?.total_projected_mt}</td>
                            <td className="p-2 text-right text-amber-300">{trade?.total_projected_mt}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
