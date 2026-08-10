import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUserAsync, googleLoginAsync, clearError } from '../redux/slices/authSlice';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Eye, EyeOff, User, Mail, Phone, Lock, CheckCircle2, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
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
      dispatch(googleLoginAsync({ idToken: response.credential }))
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

  // Initialize Google Identity Services SDK
  useEffect(() => {
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '345697345656-b68bmovejdumqoqob0mbfeo5sh6i6ug8.apps.googleusercontent.com';
    
    if (window.google?.accounts?.id) {
      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: handleGoogleSuccess,
      });
    } else {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.google?.accounts?.id) {
          window.google.accounts.id.initialize({
            client_id: googleClientId,
            callback: handleGoogleSuccess,
          });
        }
      };
      document.body.appendChild(script);
    }
  }, [handleGoogleSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!hasMinLength || !hasUppercase || !hasNumber || !hasSpecialChar) {
      toast.error('Please satisfy all password security requirements');
      return;
    }

    const userData = {
      firstName,
      lastName,
      email,
      password,
      dob: dob || new Date(), // DB requirement fallback
      phoneNumber,
      address: address || 'NexaCart Address', // DB requirement fallback
    };

    dispatch(registerUserAsync(userData))
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

  const handleGoogleButtonClick = () => {
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '345697345656-b68bmovejdumqoqob0mbfeo5sh6i6ug8.apps.googleusercontent.com';
    
    if (window.google?.accounts?.id) {
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          const redirectUri = window.location.origin;
          const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token%20id_token&scope=openid%20profile%20email&prompt=select_account&nonce=${Math.random().toString(36)}`;
          window.open(googleAuthUrl, 'GoogleAuth', 'width=500,height=600,top=100,left=100');
        }
      });
    } else {
      const redirectUri = window.location.origin;
      const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token%20id_token&scope=openid%20profile%20email&prompt=select_account&nonce=${Math.random().toString(36)}`;
      window.open(googleAuthUrl, 'GoogleAuth', 'width=500,height=600,top=100,left=100');
    }
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

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleButtonClick}
            className="w-full max-w-[280px] mx-auto bg-white hover:bg-slate-50 border border-slate-300 rounded-full py-2.5 px-4 flex items-center justify-center gap-3 transition-all shadow-sm focus:outline-none"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-slate-700">Sign in with Google</span>
          </button>

          <p className="text-center text-sm text-slate-500 mt-8 font-medium">
            Already have an account? <Link to="/login" className="text-green-600 font-bold hover:underline">Login</Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;
