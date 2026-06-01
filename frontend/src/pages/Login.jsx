import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

const Login = () => {
  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
        <p className="text-sm text-gray-500 mt-2">Log in to your NexaCart account</p>
      </div>

      <form className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" className="bg-gray-50 border-gray-200" required />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-xs text-green-600 font-semibold">Forgot Password?</Link>
          </div>
          <Input id="password" type="password" placeholder="••••••••" className="bg-gray-50 border-gray-200" required />
        </div>

        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-6 font-semibold">
          Log In
        </Button>
      </form>

      <div className="mt-6 flex items-center justify-center space-x-4">
        <span className="h-px w-full bg-gray-200"></span>
        <span className="text-xs text-gray-400 font-medium">OR</span>
        <span className="h-px w-full bg-gray-200"></span>
      </div>

      <Button variant="outline" className="w-full mt-6 rounded-xl py-6 font-semibold border-gray-200 text-gray-700 hover:bg-gray-50">
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Continue with Google
      </Button>

      <p className="text-center text-sm text-gray-500 mt-8">
        Don't have an account? <Link to="/register" className="text-green-600 font-semibold">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
