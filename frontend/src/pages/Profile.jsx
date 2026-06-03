import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUserProfileAsync, clearError } from '../redux/slices/authSlice';
import { User, Mail, Calendar, Phone, MapPin, Save, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import toast from 'react-hot-toast';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [dob, setDob] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [address, setAddress] = useState(user?.address || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Prefill dob if it exists and format correctly for HTML input type="date" (YYYY-MM-DD)
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setPhoneNumber(user.phoneNumber || '');
      setAddress(user.address || '');
      
      if (user.dob) {
        const formattedDate = new Date(user.dob).toISOString().split('T')[0];
        setDob(formattedDate);
      }
    }
  }, [user]);

  // Clean error on unmount
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password && password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const profileData = {
      firstName,
      lastName,
      dob,
      phoneNumber,
      address,
    };

    if (password) {
      profileData.password = password;
    }

    dispatch(updateUserProfileAsync(profileData))
      .unwrap()
      .then(() => {
        toast.success('Profile updated successfully');
        setPassword('');
        setConfirmPassword('');
        navigate('/user/dashboard');
      })
      .catch((err) => {
        toast.error(err || 'Failed to update profile');
      });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-4">
      {/* Back button */}
      <button 
        onClick={() => navigate(-1)} 
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green-600 font-semibold transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-8">
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-black text-gray-900">Edit Profile</h1>
          <p className="text-sm text-gray-500 mt-1">Keep your contact and shipping information up-to-date.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email (Disabled, cannot edit) */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-400">Email Address (Registered)</Label>
            <div className="relative">
              <Input 
                id="email" 
                type="email" 
                value={user?.email || ''} 
                className="bg-gray-100 border-gray-200 py-6 text-gray-500 pl-10 cursor-not-allowed" 
                disabled 
              />
              <Mail className="w-5 h-5 absolute left-3.5 top-3.5 text-gray-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* First Name */}
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <div className="relative">
                <Input 
                  id="firstName" 
                  value={firstName} 
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-gray-50 border-gray-200 py-6 pl-10 focus:bg-white" 
                  required 
                />
                <User className="w-5 h-5 absolute left-3.5 top-3.5 text-gray-400" />
              </div>
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <div className="relative">
                <Input 
                  id="lastName" 
                  value={lastName} 
                  onChange={(e) => setLastName(e.target.value)}
                  className="bg-gray-50 border-gray-200 py-6 pl-10 focus:bg-white" 
                  required 
                />
                <User className="w-5 h-5 absolute left-3.5 top-3.5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Date of Birth */}
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <div className="relative">
                <Input 
                  id="dob" 
                  type="date" 
                  value={dob} 
                  onChange={(e) => setDob(e.target.value)}
                  className="bg-gray-50 border-gray-200 py-6 pl-10 focus:bg-white" 
                />
                <Calendar className="w-5 h-5 absolute left-3.5 top-3.5 text-gray-400" />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Input 
                  id="phone" 
                  type="tel" 
                  value={phoneNumber} 
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+91 9876543210" 
                  className="bg-gray-50 border-gray-200 py-6 pl-10 focus:bg-white" 
                />
                <Phone className="w-5 h-5 absolute left-3.5 top-3.5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address">Default Address</Label>
            <div className="relative">
              <Input 
                id="address" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Main St, Apartment 4B, City, Country" 
                className="bg-gray-50 border-gray-200 py-6 pl-10 focus:bg-white" 
              />
              <MapPin className="w-5 h-5 absolute left-3.5 top-3.5 text-gray-400" />
            </div>
          </div>

          <hr className="border-gray-100 my-4" />
          
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4">
            <h3 className="font-bold text-gray-700 text-sm">Change Password (Optional)</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pass">New Password</Label>
                <Input 
                  id="pass" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="bg-white border-gray-200" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPass">Confirm Password</Label>
                <Input 
                  id="confirmPass" 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="bg-white border-gray-200" 
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded border border-red-100">
              {error}
            </div>
          )}

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-6 font-bold shadow-md shadow-green-100 flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" /> {loading ? 'Saving Changes...' : 'Save Profile'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
