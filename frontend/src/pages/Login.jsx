import { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUserAsync, googleLoginAsync, clearError } from '../redux/slices/authSlice';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

import { initGoogleIdService, renderGoogleButton } from '../utils/googleAuth';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const googleButtonRef = useRef(null);

  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Redirect if already authenticated based on database user role
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/user/dashboard', { replace: true });
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
            navigate('/admin', { replace: true });
          } else {
            navigate('/user/dashboard', { replace: true });
          }
        })
        .catch((err) => {
          toast.error(err || 'Google Login failed');
        });
    }
  }, [dispatch, navigate]);

  // Initialize Google Identity Services SDK safely once per mount & render GIS button
  useEffect(() => {
    initGoogleIdService(handleGoogleSuccess);
    if (googleButtonRef.current) {
      renderGoogleButton(googleButtonRef.current);
    }
  }, [handleGoogleSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    dispatch(loginUserAsync({ email, password }))
      .unwrap()
      .then((data) => {
        toast.success('Logged in successfully!');
        if (data?.user?.role === 'admin') {
          navigate('/admin', { replace: true });
        } else {
          navigate('/user/dashboard', { replace: true });
        }
      })
      .catch((err) => {
        toast.error(err || 'Invalid credentials');
      });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-[480px]">
        
        {/* Card */}
        <div className="bg-white p-8 sm:p-10 rounded-[24px] shadow-sm border border-slate-100/80">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-[28px] font-bold text-slate-900 leading-tight">
              Login to your account
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Enter your details to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Address */}
            <div className="space-y-2">
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

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-semibold text-slate-800">
                  Password
                </Label>
                <Link to="#" className="text-xs font-semibold text-green-600 hover:underline cursor-not-allowed">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative flex items-center">
                <Lock className="absolute left-4 w-5 h-5 text-slate-400" />
                <Input 
                  id="password" 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="Enter your password" 
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

            {/* Remember Me */}
            <div className="flex items-center gap-2.5 pt-1">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4.5 h-4.5 rounded border-slate-300 text-green-600 focus:ring-green-500 cursor-pointer accent-green-600"
              />
              <label htmlFor="rememberMe" className="text-sm text-slate-600 cursor-pointer font-medium select-none">
                Remember me
              </label>
            </div>

            {error && (
              <div className="text-xs font-medium text-red-600 bg-red-50 p-3 rounded-xl border border-red-100">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-6 font-semibold shadow-sm transition-all text-sm"
            >
              {loading ? 'Signing In...' : 'Sign In'}
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
            Don't have an account? <Link to="/register" className="text-green-600 font-bold hover:underline">Sign Up</Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
