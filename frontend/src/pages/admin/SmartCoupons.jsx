import { useState } from 'react';
import { TicketPercent, Plus, CheckCircle2 } from 'lucide-react';
import { mockSmartCoupons as initialCoupons } from '../../admin/data/adminAnalyticsEngine';
import toast from 'react-hot-toast';

const SmartCoupons = () => {
  const [coupons, setCoupons] = useState(initialCoupons);

  const handleActivate = (id) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'Active' } : c))
    );
    toast.success('Promotional Campaign Created and Activated Successfully!');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
          <TicketPercent className="w-5 h-5 text-emerald-600" />
          AI Smart Coupon & Campaign Generator
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-1">Automated promotional campaign suggestions based on cart abandonment, search trends & inventory velocity</p>
      </div>

      {/* Coupons Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-all"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-purple-100 text-purple-700">
                  {coupon.category}
                </span>
                <span
                  className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                    coupon.status === 'Active'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {coupon.status}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-base mb-1">{coupon.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">{coupon.reason}</p>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 font-medium">Suggested Code:</span>
                  <span className="font-mono font-bold text-emerald-700">{coupon.suggestedCode}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 font-medium">Discount Offer:</span>
                  <span className="font-bold text-slate-900">{coupon.discount}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 font-medium">Exp. Sales Growth:</span>
                  <span className="font-extrabold text-emerald-600">{coupon.expectedSalesGrowth}</span>
                </div>
                <div className="flex justify-between text-xs pt-1 border-t border-slate-200">
                  <span className="text-slate-400 font-medium">Projected Revenue:</span>
                  <span className="font-black text-slate-900">{coupon.projectedRevenueIncrease}</span>
                </div>
              </div>
            </div>

            {coupon.status === 'Suggested' ? (
              <button
                onClick={() => handleActivate(coupon.id)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Create & Launch Campaign
              </button>
            ) : (
              <div className="w-full bg-emerald-50 text-emerald-700 font-extrabold text-xs py-3 rounded-xl text-center border border-emerald-200 flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Campaign Live in Store
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartCoupons;
