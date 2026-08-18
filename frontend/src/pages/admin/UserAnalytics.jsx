import { Users, Eye, Heart, ShoppingCart, ShoppingBag, Search } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const topKeywords = [
  { keyword: 'noise cancelling headphones', searches: 340 },
  { keyword: 'organic olive oil', searches: 280 },
  { keyword: 'samsung s24 ultra', searches: 245 },
  { keyword: '4k gaming monitor', searches: 190 },
  { keyword: 'almond milk unsweetened', searches: 165 },
];

const UserAnalytics = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-emerald-600" />
          User Behavior & Engagement Telemetry
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-1">Analyzing customer journeys, cart abandonment, top search terms & user spending tiers</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Avg Session Duration</span>
          <h3 className="text-2xl font-black text-slate-900 mt-1">4m 32s</h3>
          <p className="text-xs text-emerald-600 font-bold mt-1">↑ 12.4% vs last month</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Returning User Rate</span>
          <h3 className="text-2xl font-black text-slate-900 mt-1">68.4%</h3>
          <p className="text-xs text-emerald-600 font-bold mt-1">High customer loyalty</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Cart Abandonment Rate</span>
          <h3 className="text-2xl font-black text-slate-900 mt-1">24.2%</h3>
          <p className="text-xs text-rose-600 font-bold mt-1">↓ Reduced via AI suggestions</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Highest Customer Tier</span>
          <h3 className="text-2xl font-black text-slate-900 mt-1">₹1,84,500</h3>
          <p className="text-xs text-emerald-600 font-bold mt-1">Top spending account</p>
        </div>
      </div>

      {/* Grid of User Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Top Search Keywords Chart */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs">
          <h3 className="font-bold text-slate-900 text-sm mb-4 flex items-center gap-2">
            <Search className="w-4 h-4 text-emerald-600" /> Top Search Keywords Queries
          </h3>
          <div className="h-64 min-h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <BarChart data={topKeywords} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis dataKey="keyword" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#475569' }} width={140} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                <Bar dataKey="searches" fill="#10b981" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Most Interacted Products */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm mb-2">User Action Distribution</h3>
          
          {[
            { label: 'Most Viewed', value: 'Samsung Galaxy S24 Ultra (3,840 views)', icon: <Eye className="w-4 h-4 text-blue-500" /> },
            { label: 'Most Wishlisted', value: 'Sony WH-1000XM4 Headphones (890 saves)', icon: <Heart className="w-4 h-4 text-rose-500" /> },
            { label: 'Most Added to Cart', value: 'Organic Cold Pressed Olive Oil (1,240 adds)', icon: <ShoppingCart className="w-4 h-4 text-emerald-500" /> },
            { label: 'Most Purchased', value: 'Organic Whole Milk 1L Pack (1,680 sales)', icon: <ShoppingBag className="w-4 h-4 text-amber-500" /> },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-xl shadow-2xs border border-slate-200">{item.icon}</div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">{item.label}</span>
                  <h4 className="font-bold text-slate-900 text-xs">{item.value}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default UserAnalytics;
