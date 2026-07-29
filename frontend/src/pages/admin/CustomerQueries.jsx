import { useState } from 'react';
import { MessageSquare, Search, CheckCircle2, Clock, Mail, Phone, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const mockQueries = [
  { id: 'TKT-101', customerName: 'Kavita Sharma', email: 'kavita.s@gmail.com', subject: 'Inquiry regarding replacement warranty', message: 'Hi, I received my Sony WH-1000XM4. How do I register for official 1-year brand warranty?', date: '2026-07-26', status: 'Pending', priority: 'High' },
  { id: 'TKT-102', customerName: 'Rahul Verma', email: 'rahul.verma@yahoo.com', subject: 'Invoice download assistance', message: 'Could you please email me the GST invoice for Order #ORD9843?', date: '2026-07-25', status: 'Resolved', priority: 'Medium' },
  { id: 'TKT-103', customerName: 'Amit Shah', email: 'amit.shah@gmail.com', subject: 'Delivery partner contact info', message: 'When will the Delhivery executive arrive at my house in Indiranagar Bangalore?', date: '2026-07-24', status: 'In Progress', priority: 'High' },
];

const CustomerQueries = () => {
  const [queries, setQueries] = useState(mockQueries);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyText, setReplyText] = useState('');

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    toast.success(`Reply sent to ${selectedTicket.email}!`);
    setQueries(prev => prev.map(q => q.id === selectedTicket.id ? { ...q, status: 'Resolved' } : q));
    setSelectedTicket(null);
    setReplyText('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-6 rounded-3xl border border-slate-100 shadow-xs gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Customer Support & Queries</h1>
            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <MessageSquare className="w-3 h-3" /> Live Ticket Desk
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium mt-1">Manage buyer inquiries, support tickets, and direct communications.</p>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
              <tr>
                <th className="px-5 py-3.5">Ticket ID</th>
                <th className="px-5 py-3.5">Customer Name</th>
                <th className="px-5 py-3.5">Subject</th>
                <th className="px-5 py-3.5">Date Submitted</th>
                <th className="px-5 py-3.5">Priority</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {queries.map((q) => (
                <tr key={q.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-4 font-black text-slate-900">{q.id}</td>
                  <td className="px-5 py-4 font-bold text-slate-800">{q.customerName} ({q.email})</td>
                  <td className="px-5 py-4 text-slate-700 font-semibold">{q.subject}</td>
                  <td className="px-5 py-4 text-slate-500">{q.date}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      q.priority === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {q.priority}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                      q.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {q.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => setSelectedTicket(q)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      View & Reply
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reply Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-base font-black text-slate-900">Reply to {selectedTicket.customerName} ({selectedTicket.id})</h3>
            <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed font-medium">
              "{selectedTicket.message}"
            </p>

            <form onSubmit={handleSendReply} className="space-y-3">
              <textarea
                rows="4"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your official support response..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                required
              ></textarea>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setSelectedTicket(null)}
                  className="flex-1 bg-slate-100 text-slate-700 font-bold py-2.5 rounded-xl text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1 shadow-md cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" /> Send Reply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default CustomerQueries;
