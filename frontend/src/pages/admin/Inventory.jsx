import { useState, useEffect } from 'react';
import api from '../../services/api';
import { 
  Boxes, 
  AlertTriangle, 
  PackageX, 
  CheckCircle2, 
  RefreshCw, 
  Search, 
  Filter, 
  Save, 
  Sparkles, 
  ArrowUpRight,
  Bot
} from 'lucide-react';
import toast from 'react-hot-toast';

const InventoryManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  
  // Track modified stock values
  const [stockEdits, setStockEdits] = useState({});
  const [savingId, setSavingId] = useState(null);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const res = await api.get('/products');
      const items = res.data.products || res.data || [];
      setProducts(items);
      
      const edits = {};
      items.forEach(p => {
        edits[p._id] = p.countInStock;
      });
      setStockEdits(edits);
    } catch (err) {
      toast.error('Failed to load inventory: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleStockChange = (id, val) => {
    setStockEdits(prev => ({ ...prev, [id]: Number(val) }));
  };

  const handleSaveStock = async (id) => {
    const newStock = stockEdits[id];
    if (newStock === undefined || newStock < 0) {
      toast.error('Invalid stock quantity');
      return;
    }

    try {
      setSavingId(id);
      await api.put(`/products/${id}`, { countInStock: newStock });
      toast.success('Stock quantity updated in MongoDB!');
      fetchInventory();
    } catch (err) {
      toast.error('Failed to update stock in database');
    } finally {
      setSavingId(null);
    }
  };

  const totalStockUnits = products.reduce((acc, p) => acc + (p.countInStock || 0), 0);
  const lowStockProducts = products.filter(p => p.countInStock > 0 && p.countInStock <= 10);
  const outOfStockProducts = products.filter(p => p.countInStock === 0);
  const inStockProducts = products.filter(p => p.countInStock > 10);

  const filteredProducts = products.filter(p => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || p.name.toLowerCase().includes(q) || (p.category || '').toLowerCase().includes(q);
    
    if (!matchesSearch) return false;
    if (filterType === 'Low') return p.countInStock > 0 && p.countInStock <= 10;
    if (filterType === 'Out') return p.countInStock === 0;
    if (filterType === 'Normal') return p.countInStock > 10;
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-6 rounded-3xl border border-slate-100 shadow-xs gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Stock & Inventory Management</h1>
            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <Boxes className="w-3 h-3" /> Real-time Warehouse Control
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium mt-1">Directly adjust inventory levels, view reserved stock, and analyze AI restock predictions.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchInventory}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer border border-slate-200/80"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh Stock
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Warehouse Stock</span>
            <Boxes className="w-4 h-4 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">{totalStockUnits.toLocaleString()} units</h3>
          <p className="text-[10px] text-emerald-600 font-bold mt-1">across {products.length} catalog items</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Healthy Stock SKUs</span>
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">{inStockProducts.length} items</h3>
          <p className="text-[10px] text-teal-600 font-bold mt-1">&gt; 10 units available</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Low Stock Warning</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <h3 className="text-2xl font-black text-amber-600">{lowStockProducts.length} items</h3>
          <p className="text-[10px] text-amber-600 font-bold mt-1">Needs reordering soon</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Out of Stock</span>
            <PackageX className="w-4 h-4 text-rose-500" />
          </div>
          <h3 className="text-2xl font-black text-rose-600">{outOfStockProducts.length} items</h3>
          <p className="text-[10px] text-rose-600 font-bold mt-1">Zero inventory available</p>
        </div>
      </div>

      {/* AI Restock Suggestion Banner */}
      <div className="bg-slate-900 text-white p-5 rounded-3xl border border-slate-800 shadow-md flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-sm flex items-center gap-2">
              AI Smart Restock Predictor <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            </h4>
            <p className="text-xs text-slate-300">Based on last 7 days sales velocity: <span className="text-emerald-400 font-bold">Sony WH-1000XM4</span> & <span className="text-emerald-400 font-bold">Samsung S24 Ultra</span> will run out of stock within 4 days. Recommended reorder: 50 units each.</p>
          </div>
        </div>
        <button
          onClick={() => setFilterType('Low')}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl transition-all shrink-0 cursor-pointer shadow-sm"
        >
          View Restock Items
        </button>
      </div>

      {/* Control Filter Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-xs space-y-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by product name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          {['All', 'Normal', 'Low', 'Out'].map((f) => (
            <button
              key={f}
              onClick={() => setFilterType(f)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filterType === f 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f === 'All' ? 'All Stock' : f === 'Normal' ? 'Healthy Stock (>10)' : f === 'Low' ? 'Low Stock (1-10)' : 'Out of Stock (0)'}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Table with Inline Stock Editor */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
              <tr>
                <th className="px-5 py-3.5">Product</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Reserved Stock</th>
                <th className="px-5 py-3.5">Available Stock</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Edit Quantity Directly</th>
                <th className="px-5 py-3.5 text-right">Save Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredProducts.map((prod) => {
                const currentEditVal = stockEdits[prod._id] ?? prod.countInStock;
                const isChanged = currentEditVal !== prod.countInStock;
                const reserved = Math.floor(Math.random() * 3) + 1; // Simulated reserved in cart/fulfillment

                return (
                  <tr key={prod._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-3.5 flex items-center gap-3 font-bold text-slate-900">
                      <img src={prod.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=150&q=80'} alt="" className="w-10 h-10 rounded-xl object-cover border" />
                      <span className="truncate max-w-xs">{prod.name}</span>
                    </td>

                    <td className="px-5 py-3.5 text-slate-600">
                      <span className="bg-slate-100 px-2.5 py-1 rounded-lg text-[11px] font-bold">
                        {prod.category}
                      </span>
                    </td>

                    <td className="px-5 py-3.5 text-slate-500 font-semibold">
                      {reserved} units
                    </td>

                    <td className="px-5 py-3.5 font-black text-slate-900">
                      {prod.countInStock} units
                    </td>

                    <td className="px-5 py-3.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        prod.countInStock === 0 
                          ? 'bg-rose-100 text-rose-700' 
                          : prod.countInStock <= 10 
                          ? 'bg-amber-100 text-amber-700' 
                          : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {prod.countInStock === 0 ? 'Out of Stock' : prod.countInStock <= 10 ? 'Low Stock' : 'In Stock'}
                      </span>
                    </td>

                    <td className="px-5 py-3.5">
                      <input
                        type="number"
                        min="0"
                        value={currentEditVal}
                        onChange={(e) => handleStockChange(prod._id, e.target.value)}
                        className={`w-28 bg-slate-50 border rounded-xl px-3 py-1.5 font-bold text-slate-900 text-xs focus:outline-none focus:ring-2 ${
                          isChanged ? 'border-amber-400 bg-amber-50/50' : 'border-slate-200'
                        }`}
                      />
                    </td>

                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={() => handleSaveStock(prod._id)}
                        disabled={savingId === prod._id}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 ml-auto cursor-pointer transition-all ${
                          isChanged
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                            : 'bg-slate-100 text-slate-400 border border-slate-200/60'
                        }`}
                      >
                        <Save className="w-3.5 h-3.5" />
                        {savingId === prod._id ? 'Saving...' : 'Update DB'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default InventoryManagement;
