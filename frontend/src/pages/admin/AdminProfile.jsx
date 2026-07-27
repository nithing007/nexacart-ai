import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { User, Shield, KeyRound, Edit3, Camera, Smartphone, Activity } from 'lucide-react';
import toast from 'react-hot-toast';
import { updateUserProfileAsync } from '../../redux/slices/authSlice';

const recentActivities = [
  { id: 'a1', action: 'Created 15% OFF Gaming Laptop Coupon', timestamp: '2026-07-25 14:15', ip: '192.168.1.42', status: 'Success' },
  { id: 'a2', action: 'Resolved missing item request: AeroPress Coffee Maker', timestamp: '2026-07-25 12:00', ip: '192.168.1.42', status: 'Success' },
  { id: 'a3', action: 'Updated product inventory for Samsung Galaxy S24', timestamp: '2026-07-24 18:30', ip: '192.168.1.42', status: 'Success' },
  { id: 'a4', action: 'Generated Monthly Executive BI Report', timestamp: '2026-07-24 10:15', ip: '192.168.1.42', status: 'Success' },
];

const loginDevices = [
  { id: 'd1', device: 'Windows PC • Chrome Browser', location: 'Bengaluru, India', lastActive: 'Currently Active', current: true },
  { id: 'd2', device: 'iPhone 15 Pro • Safari Mobile', location: 'Bengaluru, India', lastActive: '2 hours ago', current: false },
  { id: 'd3', device: 'MacBook Air • Firefox Browser', location: 'Mumbai, India', lastActive: '3 days ago', current: false },
];

const AdminProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Edit Profile Form State
  const [firstName, setFirstName] = useState(user?.firstName || 'Nithin');
  const [lastName, setLastName] = useState(user?.lastName || 'G');
  const [phone, setPhone] = useState(user?.phoneNumber || '+91 98765 43210');

  // Change Password Form State
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    dispatch(updateUserProfileAsync({ firstName, lastName, phoneNumber: phone }))
      .unwrap()
      .then(() => {
        toast.success('Admin Profile updated successfully!');
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

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-6xl mx-auto">
      
      {/* Page Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-600" />
            Administrator Profile & Credentials
          </h2>
          <p className="text-xs text-slate-500 font-medium">Manage store manager account, security keys, and recent access logs</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowEditModal(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Edit3 className="w-4 h-4" /> Edit Profile
          </button>
          <button
            onClick={() => setShowPasswordModal(true)}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <KeyRound className="w-4 h-4" /> Change Password
          </button>
        </div>
      </div>

      {/* Main Profile Info Card */}
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Avatar Column */}
        <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl border border-slate-200/60 justify-center">
          <div className="relative group mb-4">
            <div className="w-24 h-24 rounded-3xl bg-slate-900 text-emerald-400 font-black text-3xl flex items-center justify-center shadow-md">
              {user?.firstName ? user.firstName[0].toUpperCase() : 'N'}
            </div>
            <button
              onClick={() => toast.success('Avatar update feature enabled')}
              className="absolute -bottom-2 -right-2 p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs transition-transform group-hover:scale-110 cursor-pointer"
              title="Update Avatar"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <h3 className="text-lg font-black text-slate-900">
            {user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Nithin G'}
          </h3>
          <p className="text-xs text-slate-500 font-medium mb-3">{user?.email || 'gnithin399@gmail.com'}</p>

          <span className="bg-emerald-100 text-emerald-800 font-extrabold text-[10px] px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-wider flex items-center gap-1">
            <Shield className="w-3.5 h-3.5" /> Store Administrator
          </span>
        </div>

        {/* Right Details Columns */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Full Name</span>
            <p className="font-bold text-slate-900 text-sm">{user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Nithin G'}</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Email Address</span>
            <p className="font-bold text-slate-900 text-sm">{user?.email || 'gnithin399@gmail.com'}</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Role / Permissions</span>
            <p className="font-bold text-emerald-700 text-sm">Super Admin (Full Access)</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Phone Number</span>
            <p className="font-bold text-slate-900 text-sm">{user?.phoneNumber || '+91 98765 43210'}</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Account Created Date</span>
            <p className="font-bold text-slate-900 text-sm">January 15, 2026</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Last Login Time</span>
            <p className="font-bold text-slate-900 text-sm">Today at 14:10 IST</p>
          </div>
        </div>

      </div>

      {/* Tables Section: Activity Log & Devices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Admin Activity Log */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs">
          <h3 className="font-bold text-slate-900 text-sm mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-600" /> Recent Administrative Activity
          </h3>
          <div className="space-y-3">
            {recentActivities.map((act) => (
              <div key={act.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-800">{act.action}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{act.timestamp} • IP: {act.ip}</p>
                </div>
                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                  {act.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Login Devices */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs">
          <h3 className="font-bold text-slate-900 text-sm mb-4 flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-purple-600" /> Active Login Devices
          </h3>
          <div className="space-y-3">
            {loginDevices.map((dev) => (
              <div key={dev.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-800 flex items-center gap-1.5">
                    {dev.device}
                    {dev.current && (
                      <span className="bg-emerald-500 text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-md">
                        THIS DEVICE
                      </span>
                    )}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{dev.location} • {dev.lastActive}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white p-6 rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
            <h3 className="text-base font-bold text-slate-900 mb-4">Edit Admin Profile</h3>
            <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
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
                  className="flex-1 py-2.5 bg-slate-100 font-semibold text-slate-700 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-600 font-bold text-white rounded-xl shadow-xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white p-6 rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
            <h3 className="text-base font-bold text-slate-900 mb-4">Change Admin Password</h3>
            <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Current Password</label>
                <input
                  type="password"
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">New Password</label>
                <input
                  type="password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Confirm New Password</label>
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
                  className="flex-1 py-2.5 bg-slate-100 font-semibold text-slate-700 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-slate-900 font-bold text-white rounded-xl shadow-xs"
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
