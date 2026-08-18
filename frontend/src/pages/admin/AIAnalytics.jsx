import { useState } from 'react';
import { MessageSquareCode, Clock, CheckCircle2, Sparkles, Mic } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const conversationTimeData = [
  { day: 'Mon', daily: 310, weekly: 2100, monthly: 8900 },
  { day: 'Tue', daily: 380, weekly: 2450, monthly: 9200 },
  { day: 'Wed', daily: 340, weekly: 2300, monthly: 9100 },
  { day: 'Thu', daily: 420, weekly: 2800, monthly: 9800 },
  { day: 'Fri', daily: 490, weekly: 3200, monthly: 10400 },
  { day: 'Sat', daily: 560, weekly: 3800, monthly: 11200 },
  { day: 'Sun', daily: 384, weekly: 2950, monthly: 9600 },
];

const peakHoursData = [
  { hour: '9 AM', queries: 45 },
  { hour: '12 PM', queries: 85 },
  { hour: '3 PM', queries: 110 },
  { hour: '6 PM', queries: 165 },
  { hour: '8 PM', queries: 210 },
  { hour: '10 PM', queries: 140 },
];

const AIAnalytics = () => {
  const [timeframe, setTimeframe] = useState('daily');

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            AI Analytics & Conversational Intelligence
          </h2>
          <p className="text-xs text-slate-500 font-medium">Telemetry for NexaCart AI Shopping Copilot & Voice Assistant</p>
        </div>

        <div className="flex gap-2">
          {['daily', 'weekly', 'monthly'].map((type) => (
            <button
              key={type}
              onClick={() => setTimeframe(type)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold capitalize transition-all ${
                timeframe === type
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">AI Conversations</span>
            <MessageSquareCode className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">
            {timeframe === 'daily' ? '384 Today' : timeframe === 'weekly' ? '2,950 This Week' : '11,200 This Month'}
          </h3>
          <p className="text-xs text-emerald-600 font-bold mt-1">↑ 24.5% vs previous period</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Avg Response Time</span>
            <Clock className="w-5 h-5 text-teal-600" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">312 ms</h3>
          <p className="text-xs text-emerald-600 font-bold mt-1">⚡ Instant latency streaming</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Recommendation Success</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">92.4%</h3>
          <p className="text-xs text-emerald-600 font-bold mt-1">Direct product match CTR</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Voice Shopping Usage</span>
            <Mic className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">31.5%</h3>
          <p className="text-xs text-purple-600 font-bold mt-1">Hands-free Web Speech API</p>
        </div>
      </div>

      {/* Visual Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* AI Conversations Over Time */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs">
          <h3 className="font-bold text-slate-900 text-sm mb-4">Conversations Volume Over Time</h3>
          <div className="h-64 min-h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <AreaChart data={conversationTimeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                <Area type="monotone" dataKey={timeframe} stroke="#10b981" strokeWidth={3} fill="#10b981" fillOpacity={0.15} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Peak Usage Hours */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs">
          <h3 className="font-bold text-slate-900 text-sm mb-4">Peak AI Chat Activity Hours</h3>
          <div className="h-64 min-h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              <BarChart data={peakHoursData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                <Bar dataKey="queries" fill="#0d9488" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalytics;
