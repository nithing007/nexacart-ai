import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Navbar = () => {
  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-green-100 p-2 rounded-lg text-green-600 font-bold flex items-center justify-center">
            <span className="text-xl">AI</span>
          </div>
          <span className="text-2xl font-bold text-gray-800">NexaCart</span>
        </Link>
        
        <div className="flex-1 max-w-2xl hidden md:flex items-center relative">
          <Input 
            type="text" 
            placeholder="Search for products, brands and more..." 
            className="w-full pl-4 pr-10 py-2 rounded-full border-gray-200 focus:border-green-500 focus:ring-green-500 bg-gray-50"
          />
          <Search className="absolute right-3 text-gray-400 w-5 h-5" />
        </div>

        <div className="hidden md:flex flex-col items-start ml-4 text-sm text-gray-600">
          <span className="text-xs font-medium text-gray-400">Deliver to</span>
          <div className="flex items-center gap-1 font-semibold text-gray-800 cursor-pointer">
            <MapPin className="w-4 h-4 text-green-500" />
            <span>New Delhi, 110001</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Link to="/user/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-green-600 font-medium">
            <User className="w-6 h-6" />
            <span className="hidden lg:block">Profile</span>
          </Link>
          <Link to="/cart" className="flex items-center gap-2 text-gray-600 hover:text-green-600 font-medium relative">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-1 -right-2 bg-green-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">0</span>
            <span className="hidden lg:block">Cart</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
