import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { User, Shield, KeyRound, Edit3, Camera, Smartphone, Activity, Store, Lock, LogOut, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { updateUserProfileAsync, logout } from '../../redux/slices/authSlice';

const recentActivities = [
  { id: 'a1', action: 'Dispatched Order #ORD9843 via Delhivery', timestamp: '2026-07-27 16:15', ip: '192.168.1.42', status: 'Success' },
  { id: 'a2', action: 'Updated stock count for Samsung Galaxy S24 Ultra', timestamp: '2026-07-27 14:00', ip: '192.168.1.42', status: 'Success' },
  { id: 'a3', action: 'Created 20% OFF SUMMER20 coupon code', timestamp: '2026-07-26 18:30', ip: '192.168.1.42', status: 'Success' },
  { id: 'a4', action: 'Generated Monthly Sales & Inventory PDF Report', timestamp: '2026-07-25 10:15', ip: '192.168.1.42', status: 'Success' },
];

const loginDevices = [
  { id: 'd1', device: 'Windows PC • Chrome Browser', location: 'Bengaluru, India', lastActive: 'Currently Active', current: true },
  { id: 'd2', device: 'iPhone 15 Pro • Safari Mobile', location: 'Bengaluru, India', lastActive: '2 hours ago', current: false },
];

const AdminProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  // Profile Form State
  const [firstName, setFirstName] = useState(user?.firstName || 'Nithin');
  const [lastName, setLastName] = useState(user?.lastName || 'G');
  const [phone, setPhone] = useState(user?.phoneNumber || '+91 98765 43210');
  const [storeName, setStoreName] = useState('NexaCart AI Official Store');

  // Password Form State
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    dispatch(updateUserProfileAsync({ firstName, lastName, phoneNumber: phone }))
      .unwrap()
      .then(() => {
        toast.success('Seller Profile updated successfully!');
        setShowEditModal(false);
      })
      .catch((err) => toast.error(err || 'Failed to update profile'));
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      toast.error('New passwords do not match');
      return;
    }
    toast.success('Admin password updated successfully!');
    setShowPasswordModal(false);
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans">
      
      {/* Page Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Seller Account & Admin Profile</h1>
            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <Shield className="w-3 h-3 text-emerald-600" /> Super Administrator
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium mt-1">Manage store owner credentials, 2FA security, store details, and session access.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowEditModal(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <Edit3 className="w-4 h-4" /> Edit Profile
          </button>
          <button
            onClick={() => setShowPasswordModal(true)}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <KeyRound className="w-4 h-4" /> Change Password
          </button>
        </div>
      </div>

      {/* Main Profile Details Card */}
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Avatar Column */}
        <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl border border-slate-100 justify-center">
          <div className="relative group mb-4">
            <div className="w-24 h-24 rounded-3xl bg-slate-900 text-emerald-400 font-black text-3xl flex items-center justify-center shadow-lg">
              {user?.firstName ? user.firstName[0].toUpperCase() : 'N'}
            </div>
            <button
              onClick={() => toast.success('Profile picture updated!')}
              className="absolute -bottom-1 -right-1 p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md transition-transform group-hover:scale-110 cursor-pointer"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <h3 className="text-lg font-black text-slate-900">
            {user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Nithin G'}
          </h3>
          <p className="text-xs text-slate-500 font-medium mb-3">{user?.email || 'gnithin399@gmail.com'}</p>

          <span className="bg-emerald-100 text-emerald-800 font-extrabold text-[10px] px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-wider flex items-center gap-1">
            <Store className="w-3.5 h-3.5" /> {storeName}
          </span>
        </div>

        {/* Details Grid */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Full Name</span>
            <p className="font-bold text-slate-900 text-sm">{user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Nithin G'}</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Email Address</span>
            <p className="font-bold text-slate-900 text-sm">{user?.email || 'gnithin399@gmail.com'}</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Store Name</span>
            <p className="font-bold text-emerald-700 text-sm">{storeName}</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Phone Number</span>
            <p className="font-bold text-slate-900 text-sm">{phone}</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Role / Authority</span>
            <p className="font-bold text-slate-900 text-sm">Super Admin (Full Operational Access)</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Last Login</span>
            <p className="font-bold text-slate-900 text-sm">Today at 17:45 IST</p>
          </div>
        </div>

      </div>

      {/* Security & 2FA Control */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Two-Factor Authentication (2FA)</h4>
            <p className="text-xs text-slate-400 font-medium">Protect your admin portal with secondary TOTP authenticator verification.</p>
          </div>
        </div>

        <button
          onClick={() => {
            setTwoFactorEnabled(!twoFactorEnabled);
            toast.success(twoFactorEnabled ? '2FA disabled' : '2FA security enabled!');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            twoFactorEnabled ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-100 text-slate-600'
          }`}
        >
          {twoFactorEnabled ? '2FA Enabled' : 'Enable 2FA'}
        </button>
      </div>

      {/* Logout Action Bar */}
      <div className="p-6 bg-rose-50 border border-rose-100 rounded-3xl flex items-center justify-between">
        <div>
          <h4 className="font-bold text-rose-900 text-sm">Sign out of Seller Account</h4>
          <p className="text-xs text-rose-700">End your active administrative session on this device.</p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
            <h3 className="text-base font-bold text-slate-900 mb-4">Edit Seller Profile</h3>
            <form onSubmit={handleUpdateProfile} className="space-y-3 text-xs font-semibold">
              <div>
                <label className="text-slate-700 block mb-1">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="text-slate-700 block mb-1">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="text-slate-700 block mb-1">Store Name</label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="text-slate-700 block mb-1">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-md"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
            <h3 className="text-base font-bold text-slate-900 mb-4">Change Password</h3>
            <form onSubmit={handleChangePassword} className="space-y-3 text-xs font-semibold">
              <div>
                <label className="text-slate-700 block mb-1">Current Password</label>
                <input
                  type="password"
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="text-slate-700 block mb-1">New Password</label>
                <input
                  type="password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="text-slate-700 block mb-1">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-slate-900 text-white font-bold rounded-xl shadow-md"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminProfile;
