import { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUserAsync, googleLoginAsync, clearError } from '../redux/slices/authSlice';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Eye, EyeOff, User, Mail, Phone, Lock, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

import { initGoogleIdService, renderGoogleButton } from '../utils/googleAuth';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const googleButtonRef = useRef(null);

  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Dynamic Password Validation Rules
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user/dashboard');
      }
    }
  }, [isAuthenticated, user, navigate]);

  // Clean error on unmount
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  // Handle Google Identity Services (GIS) Response
  const handleGoogleSuccess = useCallback((response) => {
    if (response && response.credential) {
      dispatch(googleLoginAsync({ credential: response.credential, idToken: response.credential }))
        .unwrap()
        .then((data) => {
          const firstName = data.user?.firstName || 'User';
          toast.success(`Welcome back, ${firstName}!`);
          if (data?.user?.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/user/dashboard');
          }
        })
        .catch((err) => {
          toast.error(err || 'Google registration failed');
        });
    }
  }, [dispatch, navigate]);

  // Initialize Google Identity Services SDK safely once per mount & render GIS button
  useEffect(() => {
    initGoogleIdService(handleGoogleSuccess);
    if (googleButtonRef.current) {
      renderGoogleButton(googleButtonRef.current, { text: 'signup_with' });
    }
  }, [handleGoogleSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!hasMinLength || !hasUppercase || !hasNumber || !hasSpecialChar) {
      toast.error('Password does not meet requirements');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    dispatch(registerUserAsync({ 
      firstName, 
      lastName, 
      email, 
      password, 
      dob: dob || new Date(), 
      phoneNumber, 
      address: address || 'NexaCart Address' 
    }))
      .unwrap()
      .then((data) => {
        toast.success('Account created successfully!');
        if (data?.user?.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/user/dashboard');
        }
      })
      .catch((err) => {
        toast.error(err || 'Failed to create account');
      });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-[540px]">
        
        {/* Card */}
        <div className="bg-white p-8 sm:p-10 rounded-[24px] shadow-sm border border-slate-100/80">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-[28px] font-bold text-slate-900 leading-tight">
              Create your account
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Fill in your details to get started
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* First Name & Last Name (Grid Layout) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="firstName" className="text-sm font-semibold text-slate-800">
                  First Name
                </Label>
                <div className="relative flex items-center">
                  <User className="absolute left-4 w-5 h-5 text-slate-400" />
                  <Input 
                    id="firstName" 
                    placeholder="Enter first name" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-white border-slate-200 py-6 pl-12 pr-4 focus:bg-white rounded-xl focus:ring-green-500 focus:border-green-500 transition-all text-sm w-full placeholder:text-slate-400" 
                    required 
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="lastName" className="text-sm font-semibold text-slate-800">
                  Last Name
                </Label>
                <div className="relative flex items-center">
                  <User className="absolute left-4 w-5 h-5 text-slate-400" />
                  <Input 
                    id="lastName" 
                    placeholder="Enter last name" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-white border-slate-200 py-6 pl-12 pr-4 focus:bg-white rounded-xl focus:ring-green-500 focus:border-green-500 transition-all text-sm w-full placeholder:text-slate-400" 
                    required 
                  />
                </div>
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-semibold text-slate-800">
                Email Address
              </Label>
              <div className="relative flex items-center">
                <Mail className="absolute left-4 w-5 h-5 text-slate-400" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white border-slate-200 py-6 pl-12 pr-4 focus:bg-white rounded-xl focus:ring-green-500 focus:border-green-500 transition-all text-sm w-full placeholder:text-slate-400" 
                  required 
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-sm font-semibold text-slate-800">
                Phone Number
              </Label>
              <div className="relative flex items-center">
                <Phone className="absolute left-4 w-5 h-5 text-slate-400" />
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="Enter your phone number" 
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="bg-white border-slate-200 py-6 pl-12 pr-4 focus:bg-white rounded-xl focus:ring-green-500 focus:border-green-500 transition-all text-sm w-full placeholder:text-slate-400" 
                  required 
                />
              </div>
            </div>

            {/* Password & Confirm Password (Grid Layout) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-sm font-semibold text-slate-800">
                  Password
                </Label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-4 w-5 h-5 text-slate-400" />
                  <Input 
                    id="password" 
                    type={showPassword ? 'text' : 'password'} 
                    placeholder="Create a password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white border-slate-200 py-6 pl-12 pr-12 focus:bg-white rounded-xl focus:ring-green-500 focus:border-green-500 transition-all text-sm w-full placeholder:text-slate-400" 
                    required 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword" className="text-sm font-semibold text-slate-800">
                  Confirm Password
                </Label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-4 w-5 h-5 text-slate-400" />
                  <Input 
                    id="confirmPassword" 
                    type={showConfirmPassword ? 'text' : 'password'} 
                    placeholder="Confirm your password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-white border-slate-200 py-6 pl-12 pr-12 focus:bg-white rounded-xl focus:ring-green-500 focus:border-green-500 transition-all text-sm w-full placeholder:text-slate-400" 
                    required 
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Dynamic Password Validation Requirements */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1">
              <div className={`flex items-center gap-1.5 text-xs font-semibold ${hasMinLength ? 'text-emerald-600' : 'text-slate-400'}`}>
                <CheckCircle2 className={`w-4 h-4 ${hasMinLength ? 'text-emerald-500 fill-emerald-50' : 'text-slate-300'}`} />
                <span>8+ characters</span>
              </div>
              <div className={`flex items-center gap-1.5 text-xs font-semibold ${hasUppercase ? 'text-emerald-600' : 'text-slate-400'}`}>
                <CheckCircle2 className={`w-4 h-4 ${hasUppercase ? 'text-emerald-500 fill-emerald-50' : 'text-slate-300'}`} />
                <span>1 uppercase letter</span>
              </div>
              <div className={`flex items-center gap-1.5 text-xs font-semibold ${hasNumber ? 'text-emerald-600' : 'text-slate-400'}`}>
                <CheckCircle2 className={`w-4 h-4 ${hasNumber ? 'text-emerald-500 fill-emerald-50' : 'text-slate-300'}`} />
                <span>1 number</span>
              </div>
              <div className={`flex items-center gap-1.5 text-xs font-semibold ${hasSpecialChar ? 'text-emerald-600' : 'text-slate-400'}`}>
                <CheckCircle2 className={`w-4 h-4 ${hasSpecialChar ? 'text-emerald-500 fill-emerald-50' : 'text-slate-300'}`} />
                <span>1 special character</span>
              </div>
            </div>

            {error && (
              <div className="text-xs font-medium text-red-600 bg-red-50 p-3 rounded-xl border border-red-100">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-6 font-semibold shadow-sm transition-all text-sm mt-3"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-4 text-slate-400 font-medium">or continue with</span>
            </div>
          </div>

          {/* Google Personalized Button Container */}
          <div className="flex justify-center my-2 min-h-[44px]">
            <div ref={googleButtonRef}></div>
          </div>

          <p className="text-center text-sm text-slate-500 mt-8 font-medium">
            Already have an account? <Link to="/login" className="text-green-600 font-bold hover:underline">Login</Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;
