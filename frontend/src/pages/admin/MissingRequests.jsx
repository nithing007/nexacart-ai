import { useState } from 'react';
import { PackageX, Plus, CheckCircle, EyeOff, Search } from 'lucide-react';
import { mockMissingRequests as initialRequests } from '../../admin/data/adminAnalyticsEngine';
import toast from 'react-hot-toast';

const MissingRequests = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);

  const filteredRequests = requests.filter((r) => {
    const matchesSearch = r.productName.toLowerCase().includes(search.toLowerCase()) || r.originalQuery.toLowerCase().includes(search.toLowerCase());
    const matchesCat = filterCategory === 'All' || r.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  const handleResolve = (id) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'Resolved' } : r)));
    toast.success('Request marked as Resolved');
  };

  const handleIgnore = (id) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
    toast.success('Request removed from tracking');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <PackageX className="w-5 h-5 text-rose-500" />
            Products Requested But Unavailable in Catalog
          </h2>
          <p className="text-xs text-slate-500 font-medium">Automatic logging of zero-match customer queries to guide catalog expansion</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search missing queries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:bg-white text-slate-800"
            />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Groceries">Groceries</option>
            <option value="Home & Office">Home & Office</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-bold text-slate-800 text-sm">Tracked Missing Products ({filteredRequests.length})</h3>
          <span className="text-xs font-semibold text-slate-500">Sorted by Request Count</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Product Requested</th>
                <th className="px-6 py-4">Original User Query</th>
                <th className="px-6 py-4">Request Count</th>
                <th className="px-6 py-4">Unique Users</th>
                <th className="px-6 py-4">Est. Loss</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRequests.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-bold text-slate-900 block text-xs">{item.productName}</span>
                    <span className="text-[10px] text-slate-400 font-semibold">{item.category}</span>
                  </td>
                  <td className="px-6 py-4 italic text-slate-500 max-w-xs truncate">"{item.originalQuery}"</td>
                  <td className="px-6 py-4 font-black text-slate-800">{item.requestCount} times</td>
                  <td className="px-6 py-4 font-semibold text-slate-600">{item.uniqueUsers} users</td>
                  <td className="px-6 py-4 font-extrabold text-rose-600">
                    {item.estimatedRevenueLoss > 0 ? `₹${item.estimatedRevenueLoss.toLocaleString()}` : '₹0'}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        item.status === 'Resolved'
                          ? 'bg-emerald-100 text-emerald-700'
                          : item.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-1">
                    <button
                      onClick={() => setSelectedProductForModal(item)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] px-2.5 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1 shadow-2xs cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add
                    </button>
                    <button
                      onClick={() => handleResolve(item.id)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] px-2.5 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Resolve
                    </button>
                    <button
                      onClick={() => handleIgnore(item.id)}
                      className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                      title="Ignore"
                    >
                      <EyeOff className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Confirmation Modal */}
      {selectedProductForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white p-6 rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
            <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Plus className="w-5 h-5 text-emerald-600" />
              Add Missing Item to Catalog
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Item Name: <strong className="text-slate-800">{selectedProductForModal.productName}</strong>
            </p>
            <div className="space-y-3 mb-6 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <p>Category: <strong>{selectedProductForModal.category}</strong></p>
              <p>Demand Count: <strong>{selectedProductForModal.requestCount} users</strong></p>
              <p>Est. Revenue Loss: <strong>₹{selectedProductForModal.estimatedRevenueLoss.toLocaleString()}</strong></p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedProductForModal(null)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 font-semibold text-slate-700 text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleResolve(selectedProductForModal.id);
                  setSelectedProductForModal(null);
                  toast.success(`Catalog procurement order created for ${selectedProductForModal.productName}`);
                }}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 font-bold text-white text-xs rounded-xl shadow-xs"
              >
                Confirm Add Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MissingRequests;
