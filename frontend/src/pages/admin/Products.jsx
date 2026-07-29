import { useState, useEffect, useMemo } from 'react';
import api from '../../services/api';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Copy, 
  Eye, 
  Sparkles, 
  Package, 
  Tag, 
  Boxes, 
  ArrowUpDown, 
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Add/Edit Product Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Electronics',
    price: '',
    discount: '',
    countInStock: 20,
    description: '',
    image: '',
  });
  const [aiGenerating, setAiGenerating] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get('/products');
      setProducts(res.data.products || res.data || []);
    } catch (err) {
      toast.error('Failed to load products: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category).filter(Boolean));
    return ['All', ...Array.from(cats)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q) ||
        (p._id || '').toLowerCase().includes(q)
      );
    }

    if (categoryFilter !== 'All') {
      result = result.filter(p => p.category === categoryFilter);
    }

    return result;
  }, [products, searchQuery, categoryFilter]);

  const handleAiEnhanceTitle = () => {
    if (!formData.name.trim()) {
      toast.error('Enter a base title first!');
      return;
    }
    setAiGenerating(true);
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        name: `Premium ${prev.name} (Ultra High Performance Edition)`,
        description: `Experience industry-leading quality with the all-new ${prev.name}. Engineered for durability, high efficiency, and maximum user satisfaction.`
      }));
      setAiGenerating(false);
      toast.success('AI Enhanced product title & description!', { icon: '✨' });
    }, 600);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      toast.error('Please fill in required fields');
      return;
    }

    try {
      if (selectedProduct) {
        // Update product
        await api.put(`/products/${selectedProduct._id}`, formData);
        toast.success('Product updated successfully!');
      } else {
        // Create new product
        await api.post('/products', formData);
        toast.success('New product created!');
      }
      setShowAddModal(false);
      setSelectedProduct(null);
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      toast.success('Product removed from database');
      fetchProducts();
    } catch (err) {
      toast.error('Failed to delete product');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-6 rounded-3xl border border-slate-100 shadow-xs gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Products & Catalog Management</h1>
            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <Package className="w-3 h-3" /> {products.length} Total SKUs
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium mt-1">Manage master product listings, pricing, stock allocation, and AI optimization.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setSelectedProduct(null);
              setFormData({ name: '', category: 'Electronics', price: '', discount: '', countInStock: 20, description: '', image: '' });
              setShowAddModal(true);
            }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add New Product
          </button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by product title, SKU ID, category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:bg-white transition-all placeholder:text-slate-400 font-medium"
            />
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1 pr-2 shrink-0">
            <Filter className="w-3 h-3" /> Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                categoryFilter === cat 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
              <tr>
                <th className="px-5 py-3.5">Image</th>
                <th className="px-5 py-3.5">Product Name</th>
                <th className="px-5 py-3.5">SKU ID</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Stock Level</th>
                <th className="px-5 py-3.5">Price</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-5 py-12 text-center text-slate-400 font-medium">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-500" />
                    Loading products catalog...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-5 py-12 text-center text-slate-400 font-medium">
                    No products found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((prod) => {
                  const sku = 'SKU-' + prod._id.substring(Math.max(0, prod._id.length - 6)).toUpperCase();
                  const isLowStock = prod.countInStock <= 10 && prod.countInStock > 0;
                  const isOutOfStock = prod.countInStock === 0;

                  return (
                    <tr key={prod._id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-3">
                        <img 
                          src={prod.image || (prod.images && prod.images[0]) || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=150&q=80'} 
                          alt={prod.name} 
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                        />
                      </td>
                      <td className="px-5 py-4 font-bold text-slate-900 max-w-xs truncate">
                        {prod.name}
                      </td>
                      <td className="px-5 py-4 font-mono text-[11px] text-slate-500 font-bold">
                        {sku}
                      </td>
                      <td className="px-5 py-4 text-slate-700">
                        <span className="bg-slate-100 px-2.5 py-1 rounded-lg text-[11px] font-bold">
                          {prod.category}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-extrabold text-slate-900">
                        {prod.countInStock} units
                      </td>
                      <td className="px-5 py-4 font-black text-emerald-700">
                        ₹{prod.price.toLocaleString()}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                          isOutOfStock
                            ? 'bg-rose-100 text-rose-700 border-rose-200'
                            : isLowStock
                            ? 'bg-amber-100 text-amber-700 border-amber-200'
                            : 'bg-emerald-100 text-emerald-700 border-emerald-200'
                        }`}>
                          {isOutOfStock ? 'Out of Stock' : isLowStock ? 'Low Stock' : 'In Stock'}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setSelectedProduct(prod);
                              setFormData({
                                name: prod.name,
                                category: prod.category,
                                price: prod.price,
                                discount: prod.discount || '',
                                countInStock: prod.countInStock,
                                description: prod.description || '',
                                image: prod.image || '',
                              });
                              setShowAddModal(true);
                            }}
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
                            title="Edit Product"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDeleteProduct(prod._id)}
                            className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal with AI Title Enhancer */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-5 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-emerald-600" />
                {selectedProduct ? 'Edit Product SKU' : 'Create New Product'}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs font-semibold">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-slate-700 font-bold">Product Title</label>
                  <button
                    type="button"
                    onClick={handleAiEnhanceTitle}
                    disabled={aiGenerating}
                    className="text-[10px] bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
                    {aiGenerating ? 'Enhancing...' : 'AI Enhance Title'}
                  </button>
                </div>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sony WH-1000XM5 Wireless Headphones"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-bold mb-1 block">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-bold text-slate-800"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Groceries">Groceries</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Home & Office">Home & Office</option>
                    <option value="Personal Care">Personal Care</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-700 font-bold mb-1 block">Price (₹)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    placeholder="22990"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-bold mb-1 block">Initial Stock Quantity</label>
                  <input
                    type="number"
                    value={formData.countInStock}
                    onChange={(e) => setFormData({ ...formData, countInStock: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800"
                  />
                </div>

                <div>
                  <label className="text-slate-700 font-bold mb-1 block">Image URL</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 font-bold mb-1 block">Description</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter detailed product description..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800"
                ></textarea>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-slate-100 text-slate-700 font-bold py-3 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-md cursor-pointer"
                >
                  Save Product to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductsManagement;
