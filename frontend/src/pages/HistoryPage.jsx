import React, { useEffect, useState } from 'react';
import { History, FileText, Calendar, ArrowRight, Loader2, Sparkles, Inbox } from 'lucide-react';
import { fetchHistory } from '../services/api';

export default function HistoryPage({ onSelectReport, onBackToUpload }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const data = await fetchHistory();
      setHistory(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Recent';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Your Report History</h2>
            <p className="text-xs text-slate-500">Previously explained laboratory results from this session</p>
          </div>
        </div>
        <button
          onClick={onBackToUpload}
          className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
        >
          Back to Upload
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center space-y-3">
          <Loader2 className="w-8 h-8 text-brand-600 animate-spin mx-auto" />
          <p className="text-sm text-slate-500">Loading history records...</p>
        </div>
      ) : history.length === 0 ? (
        <div className="py-20 text-center space-y-4 bg-white rounded-3xl border border-slate-200 p-8">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Inbox className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-800">No Reports in History Yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Once you upload or test a lab report, it will be saved here for easy reference.
            </p>
          </div>
          <button
            onClick={onBackToUpload}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-brand-600 text-white font-semibold text-xs shadow hover:bg-brand-700 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            <span>Explain Your First Report</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item, idx) => (
            <div
              key={item.id || idx}
              onClick={() => onSelectReport(item.data)}
              className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-brand-500 hover:shadow-md cursor-pointer transition-all flex items-center justify-between gap-4 group"
            >
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center shrink-0 group-hover:bg-brand-100 transition-colors">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 group-hover:text-brand-900 transition-colors">
                    {item.title || item.data?.report_title || 'Medical Lab Report'}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                    {item.summary || item.data?.patient_summary || 'Summary unavailable.'}
                  </p>
                  <div className="flex items-center space-x-3 mt-2 text-[11px] text-slate-400">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(item.created_at)}</span>
                    </span>
                    <span>•</span>
                    <span>{item.metrics_count || item.data?.metrics?.length || 0} biomarkers</span>
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600 group-hover:translate-x-1 transition-all shrink-0" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
