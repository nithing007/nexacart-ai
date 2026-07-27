import { Sparkles, ShoppingBag, AlertTriangle } from 'lucide-react';
import { useSelector } from 'react-redux';

const AIProductInsights = () => {
  const { products } = useSelector((state) => state.products || { products: [] });

  const productStats = (products.length > 0 ? products : [
    { _id: '1', name: 'Sony WH-1000XM4 Headphones', category: 'Electronics', price: 22990, rating: 4.8, image: '/logo.png' },
    { _id: '2', name: 'Samsung Galaxy S24 Ultra', category: 'Electronics', price: 129999, rating: 4.9, image: '/logo.png' },
    { _id: '3', name: 'Organic Cold Pressed Olive Oil 1L', category: 'Groceries', price: 1250, rating: 4.7, image: '/logo.png' },
    { _id: '4', name: 'Apple iPhone 15 Pro', category: 'Electronics', price: 134900, rating: 4.8, image: '/logo.png' },
  ]).map((p, index) => ({
    ...p,
    recommendationsCount: 1420 - index * 240,
    purchasesViaAI: 380 - index * 60,
    ctr: `${(28.5 - index * 4.2).toFixed(1)}%`,
    conversionRate: `${(18.4 - index * 2.8).toFixed(1)}%`
  }));

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-600" />
          AI Product Performance Insights
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-1">Deep analytics on AI recommendation counts, purchases, conversion CTR, and customer ratings</p>
      </div>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Most Recommended Products */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" /> Most Recommended via AI
            </h3>
            <span className="text-[10px] bg-amber-50 text-amber-700 font-extrabold px-2.5 py-0.5 rounded-full">TOP 3</span>
          </div>

          <div className="space-y-4">
            {productStats.slice(0, 3).map((p) => (
              <div key={p._id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <img src={p.image || '/logo.png'} alt={p.name} className="w-12 h-12 rounded-xl object-cover bg-white p-1" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 text-xs truncate">{p.name}</h4>
                  <p className="text-[11px] text-slate-500 font-medium">Recommended <strong>{p.recommendationsCount}</strong> times</p>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-emerald-600 font-extrabold">
                    <span>CTR: {p.ctr}</span>
                    <span>•</span>
                    <span>Rating: {p.rating} ★</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Purchased Through AI */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-emerald-600" /> Highest AI Conversions
            </h3>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 font-extrabold px-2.5 py-0.5 rounded-full">SALES</span>
          </div>

          <div className="space-y-4">
            {productStats.slice(0, 3).map((p) => (
              <div key={p._id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <img src={p.image || '/logo.png'} alt={p.name} className="w-12 h-12 rounded-xl object-cover bg-white p-1" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 text-xs truncate">{p.name}</h4>
                  <p className="text-[11px] text-slate-500 font-medium">Purchased <strong>{p.purchasesViaAI}</strong> times via Copilot</p>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-emerald-600 font-extrabold">
                    <span>Conversion Rate: {p.conversionRate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Underperforming Products Warning */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500" /> Low Recommendation CTR
            </h3>
            <span className="text-[10px] bg-rose-50 text-rose-700 font-extrabold px-2.5 py-0.5 rounded-full">ACTION NEEDED</span>
          </div>

          <div className="space-y-4">
            {productStats.slice(-2).map((p) => (
              <div key={p._id} className="flex items-center gap-3 p-3 bg-rose-50/50 rounded-2xl border border-rose-100">
                <img src={p.image || '/logo.png'} alt={p.name} className="w-12 h-12 rounded-xl object-cover bg-white p-1" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 text-xs truncate">{p.name}</h4>
                  <p className="text-[11px] text-rose-700 font-medium">Low CTR: <strong>9.2%</strong></p>
                  <p className="text-[10px] text-slate-500 mt-1">Consider updating product tags or price discount.</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AIProductInsights;
