const UserDashboard = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 text-2xl font-bold">
              JD
            </div>
            <h2 className="text-center font-bold text-lg text-gray-800">John Doe</h2>
            <p className="text-center text-gray-500 text-sm mb-6">john.doe@example.com</p>
            <nav className="space-y-2">
              <button className="w-full text-left px-4 py-2 bg-green-50 text-green-600 font-medium rounded-lg">Profile Overview</button>
              <button className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 font-medium rounded-lg">My Orders</button>
              <button className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 font-medium rounded-lg">Wishlist</button>
              <button className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 font-medium rounded-lg">AI Budget Assistant</button>
            </nav>
          </div>
        </div>
        <div className="md:col-span-2 space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl shadow-sm border border-green-100 relative overflow-hidden">
             <div className="relative z-10">
               <h3 className="font-bold text-gray-800 text-lg mb-2">AI Budget Assistant</h3>
               <p className="text-sm text-gray-600 mb-4">You have saved ₹1,200 this month with our smart recommendations.</p>
               <button className="bg-white text-green-600 border border-green-200 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-50 transition-colors">
                 View Insights
               </button>
             </div>
             <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-4 translate-y-4">
               <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="green" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/></svg>
             </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 text-lg mb-4">Recent Orders</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl"></div>
                  <div>
                    <h4 className="font-semibold text-sm">Order #ORD-9876</h4>
                    <p className="text-xs text-gray-500">Delivered on 12 May 2025</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">₹1,249</p>
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-semibold">Delivered</span>
                </div>
              </div>
            </div>
            <button className="w-full mt-4 text-center text-sm font-semibold text-green-600 hover:text-green-700">View All Orders</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
