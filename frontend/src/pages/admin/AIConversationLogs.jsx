import { useState } from 'react';
import { MessageSquareCode, Search, Bot, User, Mic } from 'lucide-react';
import { mockAIConversationLogs } from '../../admin/data/adminAnalyticsEngine';

const AIConversationLogs = () => {
  const [logs] = useState(mockAIConversationLogs);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedLog, setSelectedLog] = useState(mockAIConversationLogs[0]);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = log.question.toLowerCase().includes(search.toLowerCase()) || 
                          log.userName.toLowerCase().includes(search.toLowerCase()) ||
                          log.aiResponse.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || log.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <MessageSquareCode className="w-5 h-5 text-emerald-600" />
            AI Conversation Logs & Chat Inspector
          </h2>
          <p className="text-xs text-slate-500 font-medium">Inspect real-time conversation turns, recommendations, and conversion statuses</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search conversation text..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:bg-white text-slate-800"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Product Purchased">Product Purchased</option>
            <option value="Recommendation Clicked">Recommendation Clicked</option>
            <option value="No Matching Product">No Matching Product</option>
            <option value="Budget Query">Budget Query</option>
            <option value="Informational Query">Informational Query</option>
          </select>
        </div>
      </div>

      {/* Split Pane ChatGPT Style Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left List of Logs */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden h-[600px] flex flex-col">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <span className="font-bold text-slate-800 text-xs">Conversations ({filteredLogs.length})</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase">Latest Telemetry</span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredLogs.map((log) => {
              const isSelected = selectedLog?.id === log.id;
              return (
                <button
                  key={log.id}
                  onClick={() => setSelectedLog(log)}
                  className={`w-full text-left p-4 transition-colors flex flex-col gap-2 ${
                    isSelected ? 'bg-emerald-50/60 border-l-4 border-emerald-600' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-xs truncate max-w-[120px]">{log.userName}</span>
                      {log.isVoice && <Mic className="w-3.5 h-3.5 text-purple-600 shrink-0" title="Voice Input" />}
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium shrink-0">{log.timestamp}</span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 italic font-normal">"{log.question}"</p>

                  <div className="flex items-center justify-between pt-1">
                    <span
                      className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                        log.status === 'Product Purchased'
                          ? 'bg-emerald-100 text-emerald-700'
                          : log.status === 'No Matching Product'
                          ? 'bg-rose-100 text-rose-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {log.status}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{log.latencyMs}ms</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Conversation Detail View */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-xs p-6 h-[600px] flex flex-col justify-between">
          {selectedLog ? (
            <>
              {/* Top Details */}
              <div className="pb-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    {selectedLog.userName[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      {selectedLog.userName}
                      {selectedLog.isVoice && (
                        <span className="bg-purple-100 text-purple-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Mic className="w-3 h-3" /> Voice Interaction
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">{selectedLog.userEmail} • {selectedLog.timestamp}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500">Status:</span>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-200">
                    {selectedLog.status}
                  </span>
                </div>
              </div>

              {/* Chat turns */}
              <div className="flex-1 overflow-y-auto py-6 space-y-4">
                {/* User Prompt */}
                <div className="flex items-start gap-3 flex-row-reverse">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="bg-emerald-600 text-white p-4 rounded-2xl text-xs max-w-lg leading-relaxed shadow-2xs font-medium">
                    {selectedLog.question}
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center font-bold text-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-slate-50 text-slate-800 border border-slate-200/80 p-4 rounded-2xl text-xs max-w-lg leading-relaxed shadow-2xs space-y-3">
                    <p>{selectedLog.aiResponse}</p>

                    {selectedLog.matchedProducts.length > 0 && (
                      <div className="pt-2 border-t border-slate-200">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">Matched Catalog Products</span>
                        <div className="flex flex-wrap gap-2">
                          {selectedLog.matchedProducts.map((p, idx) => (
                            <span key={idx} className="bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-[11px] font-bold text-slate-700">
                              📦 {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer Meta */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
                <span>Latency: <strong className="text-slate-700">{selectedLog.latencyMs}ms</strong></span>
                <span>Intent: <strong className="text-slate-700">{selectedLog.intent}</strong></span>
                <span>Copilot Engine: <strong className="text-emerald-600">Gemini Pro Reasoning</strong></span>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400 text-xs">
              Select a conversation log to inspect
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIConversationLogs;
