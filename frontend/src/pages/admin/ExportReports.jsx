import { useState } from 'react';
import { 
  FileSpreadsheet, 
  Download, 
  FileText, 
  TrendingUp, 
  ShoppingBag, 
  Layers, 
  Sparkles, 
  Calendar, 
  Filter,
  Bot
} from 'lucide-react';
import toast from 'react-hot-toast';

const mockCategorySales = [
  { category: 'Electronics', sales: 1845900, share: '45.2%' },
  { category: 'Groceries', sales: 684500, share: '18.4%' },
  { category: 'Fashion', sales: 520000, share: '14.1%' },
  { category: 'Home & Office', sales: 412000, share: '11.3%' },
  { category: 'Personal Care', sales: 384000, share: '11.0%' },
];

const ExportReports = () => {
  const [timeframe, setTimeframe] = useState('monthly');
  const [reportType, setReportType] = useState('sales');

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
    generateCSV(`NexaCart_Sales_Report_${timeframe}`, mockCategorySales);
  };

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-6 rounded-3xl border border-slate-100 shadow-xs gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Executive Sales & Operations Reports</h1>
            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <FileSpreadsheet className="w-3 h-3 text-emerald-600" /> Export Ready
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium mt-1">Detailed store revenue, sales velocity, category share breakdown, and PDF/Excel exporting.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" /> Export Excel / CSV
          </button>
          <button
            onClick={handleExportPDF}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <FileText className="w-4 h-4" /> Export PDF Report
          </button>
        </div>
      </div>

      {/* Embedded AI Executive Summary */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-md space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30 uppercase tracking-wider flex items-center gap-1">
            <Bot className="w-3.5 h-3.5 text-emerald-400" /> AI Executive Business Summary
          </span>
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
        </div>
        <h3 className="text-base font-black">Monthly Store Revenue & Growth Overview</h3>
        <p className="text-xs text-slate-300 leading-relaxed font-medium">
          Total store revenue for July 2026 reached <span className="text-emerald-400 font-bold">₹38,46,400</span> across 1,245 orders (+14.2% MoM growth). Electronics led overall sales with 45.2% revenue share, followed by Groceries (18.4%). Return rate dropped to an all-time low of 1.4%.
        </p>
      </div>

      {/* Category Breakdown Table */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
        <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-600" /> Revenue Share by Category
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-4 py-3">Category Name</th>
                <th className="px-4 py-3">Total Sales Value</th>
                <th className="px-4 py-3">Revenue Share %</th>
                <th className="px-4 py-3 text-right">Growth Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockCategorySales.map((cat) => (
                <tr key={cat.category} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-3.5 font-bold text-slate-900">{cat.category}</td>
                  <td className="px-4 py-3.5 font-extrabold text-emerald-700">₹{cat.sales.toLocaleString()}</td>
                  <td className="px-4 py-3.5 font-bold text-slate-700">{cat.share}</td>
                  <td className="px-4 py-3.5 text-right font-extrabold text-emerald-600">+12.4%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default ExportReports;
