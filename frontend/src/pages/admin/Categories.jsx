import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Tags, Layers, Package, RefreshCw, Plus, Search, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

const CategoriesManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchCatalog = async () => {
    try {
      setLoading(true);
      const res = await api.get('/products');
      setProducts(res.data.products || res.data || []);
    } catch (err) {
      toast.error('Failed to load categories catalog');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalog();
  }, []);

  // Compute live category statistics directly from database products!
  const categoryStats = products.reduce((acc, p) => {
    const cat = p.category || 'Uncategorized';
    if (!acc[cat]) {
      acc[cat] = { name: cat, count: 0, totalStock: 0, revenueValue: 0 };
    }
    acc[cat].count += 1;
    acc[cat].totalStock += (p.countInStock || 0);
    acc[cat].revenueValue += (p.price || 0) * (p.countInStock || 0);
    return acc;
  }, {});

  const categoriesList = Object.values(categoryStats);

  const filteredCategories = categoriesList.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-6 rounded-3xl border border-slate-100 shadow-xs gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Browse & Manage Categories</h1>
            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <Layers className="w-3 h-3" /> {categoriesList.length} Active Categories
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium mt-1">Categories dynamically generated and synchronized with your MongoDB products database.</p>
        </div>

        <button
          onClick={fetchCatalog}
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer border border-slate-200/80"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Sync Database
        </button>
      </div>

      {/* Control Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-xs">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search category name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          />
        </div>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCategories.map((cat) => (
          <div key={cat.name} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform">
                <Tags className="w-6 h-6" />
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 rounded-full">
                {cat.count} Products
              </span>
            </div>

            <h3 className="text-lg font-black text-slate-900 mb-1">{cat.name}</h3>
            <p className="text-xs text-slate-400 font-semibold mb-4">Total Inventory: {cat.totalStock.toLocaleString()} units</p>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Est. Valuation:</span>
              <span className="font-extrabold text-emerald-700">₹{cat.revenueValue.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default CategoriesManagement;
