import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUserAsync, googleLoginAsync, clearError } from '../redux/slices/authSlice';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Google Modal State
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [showCustomGoogleForm, setShowCustomGoogleForm] = useState(false);
  const [customGoogleName, setCustomGoogleName] = useState('');
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');

  const googleAccounts = [
    { name: 'Jane Cooper', email: 'jane.cooper@gmail.com', googleId: 'google_jane_123' },
    { name: 'Alex Morgan', email: 'alex.morgan@gmail.com', googleId: 'google_alex_456' },
  ];

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/user/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Clean error on unmount
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    dispatch(loginUserAsync({ email, password }))
      .unwrap()
      .then(() => {
        toast.success('Logged in successfully!');
        navigate('/user/dashboard');
      })
      .catch((err) => {
        toast.error(err || 'Invalid credentials');
      });
  };

  const handleGoogleAccountSelect = (account) => {
    setShowGoogleModal(false);
    const names = account.name.split(' ');
    const firstName = names[0];
    const lastName = names.slice(1).join(' ') || 'User';

    dispatch(googleLoginAsync({
      email: account.email,
      firstName,
      lastName,
      googleId: account.googleId
    }))
      .unwrap()
      .then(() => {
        toast.success(`Welcome back, ${firstName}!`);
        navigate('/user/dashboard');
      })
      .catch((err) => {
        toast.error(err || 'Google Login failed');
      });
  };

  const handleCustomGoogleSubmit = (e) => {
    e.preventDefault();
    if (!customGoogleName.trim() || !customGoogleEmail.trim()) {
      toast.error('Please enter name and email');
      return;
    }

    const fakeGoogleId = 'google_custom_' + Math.random().toString(36).slice(2, 9);
    handleGoogleAccountSelect({
      name: customGoogleName,
      email: customGoogleEmail,
      googleId: fakeGoogleId,
    });
  };

  return (
    <div className="min-h-[85vh] bg-[#f8fafc] flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        
        {/* Card */}
        <div className="bg-white px-8 py-10 rounded-3xl shadow-xl border border-slate-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black bg-gradient-to-r from-gray-900 via-green-700 to-green-600 bg-clip-text text-transparent">
              NexaCart AI
            </h2>
            <p className="text-sm font-semibold text-gray-500 mt-2">Welcome Back! Log in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-gray-700 font-semibold text-xs">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-50 border-slate-200 py-6 px-4 focus:bg-white rounded-xl focus:ring-green-500 focus:border-green-500 transition-all text-sm" 
                required 
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-gray-700 font-semibold text-xs">Password</Label>
                <Link to="#" className="text-xs text-green-600 font-semibold hover:underline cursor-not-allowed">Forgot Password?</Link>
              </div>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-50 border-slate-200 py-6 pl-4 pr-12 focus:bg-white rounded-xl focus:ring-green-500 focus:border-green-500 transition-all text-sm" 
                  required 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
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
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-6 font-semibold shadow-md shadow-green-100 hover:shadow-none transition-all text-sm"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-slate-400 font-semibold">Or continue with</span>
            </div>
          </div>

          {/* Google Login Button */}
          <Button
            type="button"
            onClick={() => {
              setShowCustomGoogleForm(false);
              setShowGoogleModal(true);
            }}
            className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl py-6 font-semibold flex items-center justify-center gap-2.5 transition-all text-sm shadow-sm"
          >
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
            <span>Google</span>
          </Button>

          <p className="text-center text-xs text-gray-500 mt-8 font-medium">
            Don't have an account? <Link to="/register" className="text-green-600 font-bold hover:underline">Sign Up</Link>
          </p>
        </div>

      </div>

      {/* Simulated Google Authentication Modal */}
      {showGoogleModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-6 text-center border-b border-slate-50 pb-5">
              <div className="flex justify-center mb-3">
                <svg className="w-8 h-8" viewBox="0 0 24 24">
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
              <h3 className="text-lg font-bold text-gray-900">Sign in with Google</h3>
              <p className="text-xs text-gray-500 mt-1">to continue to <span className="font-semibold text-green-600">NexaCart AI</span></p>
            </div>

            {/* List */}
            <div className="p-5 space-y-2.5">
              {!showCustomGoogleForm ? (
                <>
                  {googleAccounts.map((acc, index) => (
                    <button
                      key={index}
                      onClick={() => handleGoogleAccountSelect(acc)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-green-300 hover:bg-green-50/20 transition-all text-left group"
                    >
                      <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold group-hover:bg-green-100 group-hover:text-green-700 transition-colors text-sm">
                        {acc.name[0].toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800 text-xs group-hover:text-green-700 transition-colors">{acc.name}</p>
                        <p className="text-[10px] text-gray-500 truncate">{acc.email}</p>
                      </div>
                      <span className="text-[9px] text-gray-400 group-hover:text-green-600 font-medium">Google Account</span>
                    </button>
                  ))}

                  <button
                    onClick={() => setShowCustomGoogleForm(true)}
                    className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-slate-200 hover:border-green-500 hover:bg-green-50/10 transition-all text-xs font-semibold text-gray-600 hover:text-green-600"
                  >
                    <span>+ Use another account</span>
                  </button>
                </>
              ) : (
                <form onSubmit={handleCustomGoogleSubmit} className="space-y-3 pt-1">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Full Name</label>
                    <Input
                      type="text"
                      placeholder="Jane Cooper"
                      value={customGoogleName}
                      onChange={(e) => setCustomGoogleName(e.target.value)}
                      className="bg-slate-50 border-slate-200 text-xs py-4 px-3"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Email Address</label>
                    <Input
                      type="email"
                      placeholder="jane.cooper@gmail.com"
                      value={customGoogleEmail}
                      onChange={(e) => setCustomGoogleEmail(e.target.value)}
                      className="bg-slate-50 border-slate-200 text-xs py-4 px-3"
                      required
                    />
                  </div>
                  <div className="flex gap-2 pt-1">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setShowCustomGoogleForm(false)}
                      className="flex-1 py-4 text-xs font-semibold"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 text-xs font-semibold rounded-xl"
                    >
                      Continue
                    </Button>
                  </div>
                </form>
              )}
            </div>

            {/* Footer */}
            <div className="bg-slate-50 px-5 py-3.5 flex justify-between items-center text-[10px] text-gray-400 border-t border-slate-100">
              <span>Google Protected</span>
              <button
                type="button"
                onClick={() => setShowGoogleModal(false)}
                className="text-red-500 hover:underline font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
