import { useState } from 'react';
import { Boxes, AlertTriangle, CheckCircle2, RefreshCw, Plus } from 'lucide-react';
import { mockInventoryPredictions } from '../../admin/data/adminAnalyticsEngine';
import toast from 'react-hot-toast';

const InventoryPrediction = () => {
  const [inventory, setInventory] = useState(mockInventoryPredictions);

  const handleRestock = (id, amount) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, currentStock: item.currentStock + amount, status: 'Healthy', outOfStockDays: 45 }
          : item
      )
    );
    toast.success(`Restock order of ${amount} units submitted successfully!`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Boxes className="w-5 h-5 text-emerald-600" />
            AI Predictive Inventory & Stock Replenishment Engine
          </h2>
          <p className="text-xs text-slate-500 font-medium">Predicting stockout dates based on multi-signal telemetry (Orders, Wishlist, Cart & AI Conversations)</p>
        </div>

        <button
          onClick={() => toast.success('Re-running 30-day demand prediction algorithms...')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Re-calculate Predictions
        </button>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 text-sm">Inventory Demand Predictions ({inventory.length} SKUs)</h3>
          <span className="text-xs font-semibold text-slate-500">Sorted by Out-of-Stock Urgency</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Product Name / SKU</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Current Stock</th>
                <th className="px-6 py-4">Est. Out-of-Stock</th>
                <th className="px-6 py-4">30-Day Demand</th>
                <th className="px-6 py-4">Recommended Restock</th>
                <th className="px-6 py-4">AI Confidence</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inventory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-bold text-slate-900 block text-xs">{item.productName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{item.sku}</span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-600">{item.category}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`font-black text-xs ${
                        item.currentStock < 20 ? 'text-rose-600' : 'text-slate-900'
                      }`}
                    >
                      {item.currentStock} units
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-800">
                    {item.outOfStockDays <= 5 ? (
                      <span className="bg-rose-100 text-rose-700 px-2.5 py-1 rounded-full font-extrabold text-[10px] inline-flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> {item.outOfStockDays} Days
                      </span>
                    ) : (
                      <span className="text-slate-600 font-semibold">{item.outOfStockDays} Days</span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-extrabold text-slate-900">{item.predicted30DayDemand} units</td>
                  <td className="px-6 py-4">
                    {item.recommendedRestock > 0 ? (
                      <span className="font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 text-xs">
                        +{item.recommendedRestock} Units
                      </span>
                    ) : (
                      <span className="text-slate-400 font-medium">Sufficient Stock</span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-extrabold text-slate-700">{item.confidence}</td>
                  <td className="px-6 py-4 text-right">
                    {item.recommendedRestock > 0 ? (
                      <button
                        onClick={() => handleRestock(item.id, item.recommendedRestock)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] px-3 py-1.5 rounded-xl transition-colors inline-flex items-center gap-1 shadow-2xs cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Order Restock
                      </button>
                    ) : (
                      <span className="text-emerald-600 font-extrabold text-xs inline-flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Healthy
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryPrediction;
