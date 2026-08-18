import { Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const latencyData = [
  { time: '10:00', latency: 280 },
  { time: '11:00', latency: 310 },
  { time: '12:00', latency: 340 },
  { time: '13:00', latency: 290 },
  { time: '14:00', latency: 312 },
  { time: '15:00', latency: 305 },
];

const AIPerformance = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-600" />
          AI System Health & Latency Performance Dashboard
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-1">Monitoring Gemini API model latency, token throughput, intent accuracy, and satisfaction scores</p>
      </div>

      {/* Health Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Avg Response Time</span>
          <h3 className="text-2xl font-black text-slate-900 mt-1">312 ms</h3>
          <p className="text-xs text-emerald-600 font-bold mt-1">⚡ Sub-500ms streaming target</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Intent Accuracy</span>
          <h3 className="text-2xl font-black text-slate-900 mt-1">98.4%</h3>
          <p className="text-xs text-emerald-600 font-bold mt-1">12-intent classification</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Matched vs Unmatched</span>
          <h3 className="text-2xl font-black text-slate-900 mt-1">94.2% / 5.8%</h3>
          <p className="text-xs text-emerald-600 font-bold mt-1">Zero hallucination enforcement</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">AI Satisfaction Score</span>
          <h3 className="text-2xl font-black text-emerald-600 mt-1">4.8 / 5.0</h3>
          <p className="text-xs text-slate-500 font-medium mt-1">From user feedback</p>
        </div>
      </div>

      {/* Latency Graph */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs">
        <h3 className="font-bold text-slate-900 text-sm mb-4">Response Latency Trend (ms)</h3>
        <div className="h-64 min-h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
            <LineChart data={latencyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
              <Line type="monotone" dataKey="latency" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AIPerformance;
