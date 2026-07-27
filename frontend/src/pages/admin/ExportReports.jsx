import { useState } from 'react';
import { FileSpreadsheet, Download, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import { mockMissingRequests, mockAIConversationLogs, mockInventoryPredictions } from '../../admin/data/adminAnalyticsEngine';

const ExportReports = () => {
  const [timeframe, setTimeframe] = useState('monthly');
  const [reportType, setReportType] = useState('all');

  const generateCSV = (filename, rows) => {
    if (!rows || !rows.length) return;
    const separator = ',';
    const keys = Object.keys(rows[0]);
    const csvContent =
      keys.join(separator) +
      '\n' +
      rows
        .map((row) =>
          keys
            .map((k) => {
              let cell = row[k] === null || row[k] === undefined ? '' : row[k];
              cell = cell.toString().replace(/"/g, '""');
              if (cell.search(/("|,|\n)/g) >= 0) {
                cell = `"${cell}"`;
              }
              return cell;
            })
            .join(separator)
        )
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Downloaded ${filename}.csv report successfully!`);
  };

  const handleExportCSV = () => {
    if (reportType === 'missing_requests' || reportType === 'all') {
      generateCSV(`NexaCart_Missing_Requests_${timeframe}`, mockMissingRequests);
    }
    if (reportType === 'ai_logs' || reportType === 'all') {
      generateCSV(`NexaCart_AI_Logs_${timeframe}`, mockAIConversationLogs);
    }
    if (reportType === 'inventory' || reportType === 'all') {
      generateCSV(`NexaCart_Inventory_Predictions_${timeframe}`, mockInventoryPredictions);
    }
  };

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
          <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
          Export Business Intelligence Reports
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-1">Generate and download executive reports in CSV, Excel-compatible format, and PDF/Print formats</p>
      </div>

      {/* Export Options Form */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs max-w-2xl space-y-6">
        <div>
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">Select Report Timeframe</label>
          <div className="grid grid-cols-4 gap-3">
            {['daily', 'weekly', 'monthly', 'yearly'].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`py-2.5 rounded-xl text-xs font-extrabold capitalize transition-all border ${
                  timeframe === tf
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-2xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">Select Report Dataset</label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none"
          >
            <option value="all">Full Executive Store Summary (All Datasets)</option>
            <option value="missing_requests">Products Requested But Missing Catalog Report</option>
            <option value="ai_logs">AI Conversation & Conversion Logs Report</option>
            <option value="inventory">Predictive Inventory & Restock Report</option>
          </select>
        </div>

        <div className="pt-4 border-t border-slate-100 flex gap-4">
          <button
            onClick={handleExportCSV}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" /> Export CSV / Excel Report
          </button>
          <button
            onClick={handleExportPDF}
            className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <FileText className="w-4 h-4" /> Generate PDF / Print Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportReports;
