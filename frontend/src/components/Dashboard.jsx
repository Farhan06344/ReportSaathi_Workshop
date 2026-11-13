import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  Plus, 
  AlertCircle, 
  CheckCircle2, 
  Filter, 
  Inbox,
  Calendar,
  Building2,
  Trash2,
  RefreshCw,
  Terminal,
  Activity
} from 'lucide-react';
import { SAMPLE_REPORTS } from '../data/sampleReports';

export default function Dashboard({ onOpenUpload, onSelectReport }) {
  const [reportsList, setReportsList] = useState(SAMPLE_REPORTS);
  const [filterType, setFilterType] = useState('all'); // 'all' | 'attention' | 'cleared'
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReports = reportsList.filter(rep => {
    const matchesSearch = rep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          rep.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          rep.patientName.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (filterType === 'attention') {
      return rep.metrics.some(m => m.status === 'high' || m.status === 'low');
    }
    if (filterType === 'cleared') {
      return rep.metrics.every(m => m.status === 'normal');
    }
    return true;
  });

  const handleClearToEmptyState = () => {
    setReportsList([]);
  };

  const handleRestoreSamples = () => {
    setReportsList(SAMPLE_REPORTS);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12 max-w-7xl mx-auto text-white">
      {/* 1. Command Header Panel (Styled after the reference card) */}
      <div className="mono-card rounded-2xl p-6 sm:p-10 relative overflow-hidden border border-white/[0.08] shadow-2xl space-y-6">
        {/* Top telemetry line */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] text-xs font-mono uppercase text-slate-500">
          <span className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
            <span className="text-white font-bold">SYSTEM // WORKSPACE_01</span>
          </span>
          <span>❖❖ [READY]</span>
        </div>

        <div className="max-w-3xl space-y-3">
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white font-sans">
            Health Literacy Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
            Upload your laboratory blood work, lipid profile, or metabolic panel to translate confusing numbers and reference ranges into clear, educational patient insights.
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-3">
            {/* Primary Action Button in Yellow as requested */}
            <button
              onClick={onOpenUpload}
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-black font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-yellow-400/20 active:scale-95 transition-all"
            >
              <Upload className="w-4 h-4 stroke-[3]" />
              <span>Upload New Report</span>
            </button>

            {/* Secondary Controls */}
            {reportsList.length > 0 ? (
              <button
                onClick={handleClearToEmptyState}
                className="inline-flex items-center space-x-1.5 px-4 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white text-xs font-mono uppercase tracking-wider transition-colors border border-white/[0.08]"
                title="View empty state UI"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Simulate Empty State</span>
              </button>
            ) : (
              <button
                onClick={handleRestoreSamples}
                className="inline-flex items-center space-x-1.5 px-4 py-3 rounded-xl bg-yellow-400/10 hover:bg-yellow-400/20 text-yellow-300 text-xs font-mono uppercase tracking-wider transition-colors border border-yellow-400/30"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Restore Sample Reports</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Direct Ingestion Drag/Drop Dock */}
      <div 
        onClick={onOpenUpload}
        className="group border border-dashed border-white/[0.12] hover:border-yellow-400/70 bg-[#101014] hover:bg-[#14141A] rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all relative"
      >
        <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white/[0.05] group-hover:bg-yellow-400/20 text-yellow-400 flex items-center justify-center transition-colors border border-white/[0.08]">
          <Upload className="w-5 h-5 stroke-[2.5]" />
        </div>
        <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-yellow-400 transition-colors uppercase font-mono tracking-wide">
          Drop your laboratory report here, or click to browse
        </h3>
        <p className="text-xs text-slate-500 mt-1 font-mono">
          ACCEPTED: PDF, JPG, PNG • MAXIMUM: 10MB • INSTANT VALIDATION
        </p>
      </div>

      {/* 3. Reports Management & List Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
          <div className="space-y-0.5">
            <h2 className="text-base font-bold text-white uppercase tracking-wider font-mono flex items-center space-x-2">
              <span className="text-yellow-400">❖❖</span>
              <span>CLINICAL_REPORTS_REGISTRY ({filteredReports.length})</span>
            </h2>
            <p className="text-xs text-slate-400">
              Select any report to review simulated extracted values and plain-language summaries
            </p>
          </div>

          {/* Filters with Yellow Active Highlight */}
          <div className="flex items-center space-x-1.5 bg-[#121217] p-1 rounded-xl text-xs font-mono uppercase self-start sm:self-auto border border-white/[0.08]">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filterType === 'all'
                  ? 'bg-yellow-400 text-black font-extrabold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('attention')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filterType === 'attention'
                  ? 'bg-yellow-400 text-black font-extrabold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Needs Attention
            </button>
            <button
              onClick={() => setFilterType('cleared')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filterType === 'cleared'
                  ? 'bg-yellow-400 text-black font-extrabold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Optimal
            </button>
          </div>
        </div>

        {/* 4. Empty State Handling */}
        {filteredReports.length === 0 ? (
          <div className="py-16 text-center space-y-4 mono-card rounded-2xl border border-white/[0.08] p-8">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.04] text-slate-500 flex items-center justify-center mx-auto border border-white/[0.08]">
              <Inbox className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white uppercase font-mono">
                No Reports In Registry
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto font-sans leading-relaxed">
                {reportsList.length === 0 
                  ? "You are currently viewing the Empty State. Upload a document or restore the demo samples to continue."
                  : "No reports matched your selected filter. Switch back to 'All' to view all records."}
              </p>
            </div>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={onOpenUpload}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-xs shadow transition-colors uppercase tracking-wider"
              >
                <Upload className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Upload a Report</span>
              </button>
              {reportsList.length === 0 && (
                <button
                  onClick={handleRestoreSamples}
                  className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-slate-300 font-semibold text-xs transition-colors border border-white/[0.08] uppercase font-mono"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Restore Samples</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* 5. Reports Cards Grid (Styled after reference image middle panels) */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredReports.map((report) => {
              const outsideCount = report.metrics.filter(
                m => m.status === 'high' || m.status === 'low'
              ).length;

              return (
                <div
                  key={report.id}
                  onClick={() => onSelectReport(report)}
                  className="group bg-[#131317] hover:bg-[#18181E] rounded-xl p-5 border border-white/[0.08] hover:border-yellow-400/50 transition-all cursor-pointer flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/[0.05] text-slate-400 border border-white/[0.06]">
                        {report.category}
                      </span>
                      {outsideCount > 0 ? (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30">
                          {outsideCount} OUTSIDE_RANGE
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                          ALL_OPTIMAL
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="font-extrabold text-white group-hover:text-yellow-400 transition-colors text-base leading-snug">
                        {report.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed font-sans">
                        {report.summary}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-500">
                    <span className="flex items-center space-x-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>{report.collectionDate}</span>
                    </span>
                    <span className="text-yellow-400 group-hover:translate-x-1 transition-transform inline-flex items-center space-x-1 font-bold">
                      <span>DECODE</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
