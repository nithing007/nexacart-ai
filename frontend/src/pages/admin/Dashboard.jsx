import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Wallet, ShoppingBag, Users, Package, TrendingUp, Sparkles, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search for products, orders, users..." 
              className="w-80 pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <SearchIcon className="w-4 h-4 text-gray-400 absolute left-4 top-2.5" />
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-full border-2 border-white shadow-sm overflow-hidden flex items-center justify-center font-bold text-gray-500">
            A
          </div>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: "₹12,45,678", icon: <Wallet className="text-green-600 w-5 h-5"/>, color: "bg-green-100", trend: "+12.5%", isUp: true },
          { label: "Total Orders", value: "1,245", icon: <ShoppingBag className="text-green-600 w-5 h-5"/>, color: "bg-green-100", trend: "+8.4%", isUp: true },
          { label: "Active Users", value: "3,542", icon: <Users className="text-green-600 w-5 h-5"/>, color: "bg-green-100", trend: "+15.3%", isUp: true },
          { label: "Products Sold", value: "4,832", icon: <Package className="text-green-600 w-5 h-5"/>, color: "bg-green-100", trend: "+10.2%", isUp: true },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm rounded-2xl">
            <CardContent className="p-5 flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                <div className="flex items-center gap-1 mt-2 text-xs font-semibold">
                  {stat.isUp ? <ArrowUpRight className="w-3 h-3 text-green-500"/> : <ArrowDownRight className="w-3 h-3 text-red-500"/>}
                  <span className={stat.isUp ? "text-green-500" : "text-red-500"}>{stat.trend}</span>
                  <span className="text-gray-400 font-normal">this month</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Insights Section */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
           <Sparkles className="w-5 h-5 text-green-500" /> AI Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-none shadow-sm rounded-2xl col-span-2">
            <CardContent className="p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-sm">Most Recommended Products</h3>
                <button className="text-xs text-green-600 font-semibold">View All</button>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-3 border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg"></div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800">Organic Bananas</h4>
                      <p className="text-xs text-gray-500">Recommended 1,246 times</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 relative overflow-hidden">
             <CardContent className="p-6 relative z-10 flex flex-col justify-center h-full">
                <h3 className="font-bold text-sm text-gray-700 mb-1">User Savings This Month</h3>
                <div className="flex items-end gap-2 mt-2">
                  <h2 className="text-3xl font-extrabold text-green-700">₹45,320</h2>
                </div>
                <div className="mt-4 bg-white/60 backdrop-blur-sm rounded-lg p-3 text-xs text-green-800 font-medium">
                  ↑ 18.6% vs last month. AI suggestions helped users save more!
                </div>
             </CardContent>
             <div className="absolute -right-4 -bottom-4 opacity-10">
               <TrendingUp className="w-32 h-32 text-green-600" />
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Dummy Search Icon
const SearchIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);

export default AdminDashboard;
