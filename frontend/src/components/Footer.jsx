import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 mt-20">
      <div className="container mx-auto px-4">
        {/* Three Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-gray-100">
          
          {/* Left Column */}
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="NexaCart AI" className="h-9 w-auto object-contain" />
              <span className="font-black text-lg tracking-tight text-gray-900">
                NexaCart<span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent ml-0.5">AI</span>
              </span>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed max-w-sm">
              AI-Powered Conversational E-Commerce Platform that helps users discover products through natural conversations, personalized recommendations, and intelligent shopping assistance.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-full bg-gray-50 text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors"
                title="GitHub"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-full bg-gray-50 text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors"
                title="LinkedIn"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-full bg-gray-50 text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors"
                title="Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Middle Column */}
          <div className="space-y-4 text-left">
            <h4 className="font-bold text-gray-800 text-xs tracking-wider uppercase">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link to="/" className="text-gray-500 hover:text-green-600 transition-colors">Home</Link>
              <Link to="/products" className="text-gray-500 hover:text-green-600 transition-colors">Shop Products</Link>
              <a href="/#hub" className="text-gray-500 hover:text-green-600 transition-colors">AI Assistant</a>
              <Link to="/budget-assistant" className="text-gray-500 hover:text-green-600 transition-colors">Budget Assistant</Link>
              <Link to="/wishlist" className="text-gray-500 hover:text-green-600 transition-colors">Wishlist</Link>
              <Link to="/cart" className="text-gray-500 hover:text-green-600 transition-colors">Cart</Link>
              <Link to="/login" className="text-gray-500 hover:text-green-600 transition-colors">Login</Link>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4 text-left">
            <h4 className="font-bold text-gray-800 text-xs tracking-wider uppercase">Contact</h4>
            <div className="space-y-3 text-xs text-gray-500">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                <span>Coimbatore,<br />Tamil Nadu,<br />India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-green-600 shrink-0" />
                <a href="mailto:support@nexacart.ai" className="hover:text-green-600 transition-colors">support@nexacart.ai</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-green-600 shrink-0" />
                <a href="tel:+91XXXXX XXXXX" className="hover:text-green-600 transition-colors">+91 XXXXX XXXXX</a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-[11px] text-gray-400 font-medium">
          <p>© 2026 NexaCart AI. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-green-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-green-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-green-600 transition-colors">Contact</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
