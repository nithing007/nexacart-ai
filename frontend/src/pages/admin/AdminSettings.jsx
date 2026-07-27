import { useState } from 'react';
import { Settings, Store, Moon, Sun, Bot, Save } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminSettings = () => {
  const [storeName, setStoreName] = useState('NexaCart AI');
  const [supportEmail, setSupportEmail] = useState('support@nexacart.ai');
  const [businessPhone, setBusinessPhone] = useState('+91 1800-419-8888');
  const [darkMode, setDarkMode] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [strictZeroHallucination, setStrictZeroHallucination] = useState(true);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    toast.success('Store Settings updated successfully!');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Settings className="w-5 h-5 text-emerald-600" />
            NexaCart AI Store Settings & System Configuration
          </h2>
          <p className="text-xs text-slate-500 font-medium">Manage store metadata, notifications, dark mode, and AI copilot settings</p>
        </div>

        <button
          onClick={handleSaveSettings}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
        >
          <Save className="w-4 h-4" /> Save All Settings
        </button>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        
        {/* Section 1: Store Information */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 pb-3 border-b border-slate-100">
            <Store className="w-4 h-4 text-emerald-600" /> Store Branding & Support Contacts
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Store Name</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
                required
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Support Email</label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
                required
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Business Phone</label>
              <input
                type="text"
                value={businessPhone}
                onChange={(e) => setBusinessPhone(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
                required
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Default Currency</label>
              <input
                type="text"
                value="INR (₹)"
                disabled
                className="w-full p-3 bg-slate-100 border border-slate-200 rounded-xl font-bold text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Appearance & Dark Mode */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 pb-3 border-b border-slate-100">
            <Sun className="w-4 h-4 text-amber-500" /> Admin Theme & Appearance
          </h3>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
            <div>
              <p className="font-bold text-slate-900 flex items-center gap-2">
                Dark Mode Architecture Ready
                {darkMode ? <Moon className="w-3.5 h-3.5 text-purple-600" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
              </p>
              <p className="text-slate-500 mt-0.5">Toggle high-contrast dark theme for low-light management</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setDarkMode(!darkMode);
                toast.success(`Theme switched to ${!darkMode ? 'Dark' : 'Light'} Mode`);
              }}
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-1 cursor-pointer ${
                darkMode ? 'bg-purple-600' : 'bg-slate-300'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : ''}`} />
            </button>
          </div>
        </div>

        {/* Section 3: AI Assistant & Copilot Controls */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 pb-3 border-b border-slate-100">
            <Bot className="w-4 h-4 text-emerald-600" /> AI Copilot & Voice Shopping Configuration
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
              <div>
                <p className="font-bold text-slate-900">Strict Zero-Hallucination Catalog Matching</p>
                <p className="text-slate-500 mt-0.5">Force Gemini AI engine to match strictly against MongoDB items</p>
              </div>
              <input
                type="checkbox"
                checked={strictZeroHallucination}
                onChange={(e) => setStrictZeroHallucination(e.target.checked)}
                className="w-4 h-4 accent-emerald-600 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
              <div>
                <p className="font-bold text-slate-900">Web Speech API Voice Shopping Controls</p>
                <p className="text-slate-500 mt-0.5">Enable hands-free mic input & speech synthesis for copilot</p>
              </div>
              <input
                type="checkbox"
                checked={voiceEnabled}
                onChange={(e) => setVoiceEnabled(e.target.checked)}
                className="w-4 h-4 accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

      </form>
    </div>
  );
};

export default AdminSettings;
