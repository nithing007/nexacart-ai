import { useState, useEffect } from 'react';
import { Users as UsersIcon, Search, ShieldCheck, Mail, ShoppingBag, Calendar, Eye, Ban, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

const mockUsersData = [
  { id: 'usr_001', name: 'Nithin G', email: 'gnithin399@gmail.com', role: 'admin', ordersCount: 18, totalSpent: 184990, lastOrder: '2026-07-26', joinedDate: '2025-11-10', status: 'Active' },
  { id: 'usr_002', name: 'Kavita Sharma', email: 'kavita.s@gmail.com', role: 'user', ordersCount: 6, totalSpent: 28450, lastOrder: '2026-07-24', joinedDate: '2026-01-15', status: 'Active' },
  { id: 'usr_003', name: 'Rahul Verma', email: 'rahul.verma@yahoo.com', role: 'user', ordersCount: 12, totalSpent: 145900, lastOrder: '2026-07-20', joinedDate: '2026-02-04', status: 'Active' },
  { id: 'usr_004', name: 'Ananya Roy', email: 'ananya.roy@outlook.com', role: 'user', ordersCount: 3, totalSpent: 4200, lastOrder: '2026-06-18', joinedDate: '2026-03-22', status: 'Active' },
  { id: 'usr_005', name: 'Vikramjit Singh', email: 'vikram.singh@gmail.com', role: 'user', ordersCount: 8, totalSpent: 62000, lastOrder: '2026-07-15', joinedDate: '2026-04-12', status: 'Active' },
  { id: 'usr_006', name: 'Siddharth Mehta', email: 'sid.mehta@gmail.com', role: 'user', ordersCount: 2, totalSpent: 1899, lastOrder: '2026-05-30', joinedDate: '2026-05-01', status: 'Suspended' },
];

const UsersManagement = () => {
  const [usersList, setUsersList] = useState(mockUsersData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = usersList.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const toggleUserStatus = (id) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === 'Active' ? 'Suspended' : 'Active';
        toast.success(`User ${u.name} status updated to ${nextStatus}`);
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-6 rounded-3xl border border-slate-100 shadow-xs gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Registered Customers & Users</h1>
            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <UsersIcon className="w-3 h-3" /> {usersList.length} Accounts
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium mt-1">Customer relationship management, order history, lifetime value, and account permissions.</p>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-xs">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by customer name, email address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
              <tr>
                <th className="px-5 py-3.5">Customer Avatar & Name</th>
                <th className="px-5 py-3.5">Email Address</th>
                <th className="px-5 py-3.5">Total Orders</th>
                <th className="px-5 py-3.5">Lifetime Spent</th>
                <th className="px-5 py-3.5">Last Order</th>
                <th className="px-5 py-3.5">Joined Date</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-4 flex items-center gap-3 font-bold text-slate-900">
                    <div className="w-9 h-9 rounded-xl bg-slate-900 text-emerald-400 font-extrabold flex items-center justify-center text-sm shadow-xs">
                      {u.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-xs">{u.name}</p>
                      <span className="text-[10px] text-emerald-600 font-extrabold uppercase">{u.role}</span>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-slate-700 font-medium">
                    {u.email}
                  </td>

                  <td className="px-5 py-4 font-black text-slate-900">
                    {u.ordersCount} orders
                  </td>

                  <td className="px-5 py-4 font-black text-emerald-700">
                    ₹{u.totalSpent.toLocaleString()}
                  </td>

                  <td className="px-5 py-4 text-slate-500">
                    {u.lastOrder}
                  </td>

                  <td className="px-5 py-4 text-slate-500">
                    {u.joinedDate}
                  </td>

                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                      u.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {u.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedUser(u)}
                        className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer transition-colors"
                        title="View Customer Profile"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => toggleUserStatus(u.id)}
                        className={`p-1.5 rounded-lg cursor-pointer transition-colors ${
                          u.status === 'Active' ? 'bg-rose-50 hover:bg-rose-100 text-rose-600' : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600'
                        }`}
                        title={u.status === 'Active' ? 'Suspend Account' : 'Activate Account'}
                      >
                        <Ban className="w-3.5 h-3.5" />
                      </button>
                    </div>
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

export default UsersManagement;
