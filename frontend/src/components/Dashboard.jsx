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
    <div className="space-y-8 animate-fadeIn pb-12 max-w-7xl mx-auto">
      {/* 1. Header Command Deck with Clear Primary "Upload Report" Action */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden border border-white/[0.08] shadow-2xl">
        {/* Subtle background glow */}
        <div className="absolute right-0 top-0 translate-x-1/3 -translate-y-1/3 w-[500px] h-[500px] bg-teal-500/10 blur-[130px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase bg-teal-500/10 text-teal-300 border border-teal-500/30">
            <Activity className="w-3.5 h-3.5 text-teal-400" />
            <span>REPORT_INGESTION_WORKSPACE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase font-sans">
            Health Literacy Dashboard
          </h1>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
            Upload your laboratory blood test, lipid panel, or metabolic report to translate clinical jargon into simple, patient-friendly insights.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            {/* Clear Primary "Upload Report" Action */}
            <button
              onClick={onOpenUpload}
              className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-teal-400 via-cyan-300 to-emerald-400 hover:scale-[1.02] active:scale-[0.99] text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-teal-500/25 transition-all"
            >
              <Upload className="w-4 h-4 stroke-[2.5]" />
              <span>Upload New Report</span>
            </button>

            {/* Empty State Toggle button for testing */}
            {reportsList.length > 0 ? (
              <button
                onClick={handleClearToEmptyState}
                className="inline-flex items-center space-x-1.5 px-4 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] text-slate-400 hover:text-white text-xs font-mono uppercase tracking-wider transition-colors border border-white/[0.08]"
                title="View empty state UI"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Simulate Empty State</span>
              </button>
            ) : (
              <button
                onClick={handleRestoreSamples}
                className="inline-flex items-center space-x-1.5 px-4 py-3.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 text-xs font-mono uppercase tracking-wider transition-colors border border-teal-500/30"
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
        className="group border border-dashed border-white/[0.12] hover:border-teal-500/60 bg-[#0A0F1D]/80 hover:bg-[#0D1527] rounded-3xl p-6 sm:p-8 text-center cursor-pointer transition-all shadow-md relative"
      >
        <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-teal-500/10 group-hover:bg-teal-500/20 text-teal-400 flex items-center justify-center transition-colors border border-teal-500/30">
          <Upload className="w-6 h-6 stroke-[2.2]" />
        </div>
        <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors uppercase font-mono tracking-wide">
          Drop your laboratory report here, or click to browse
        </h3>
        <p className="text-xs text-slate-400 mt-1 font-mono">
          SUPPORTS: PDF, JPG, PNG • MAXIMUM FILE SIZE: 10MB • INSTANT VALIDATION
        </p>
      </div>

      {/* 3. Reports Management & List Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-teal-400 font-mono font-bold">::</span>
              <h2 className="text-lg font-bold text-white uppercase tracking-wider font-mono">
                CLINICAL_REPORTS_REGISTRY ({filteredReports.length})
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              Select any report to review simulated extracted values and plain-language summaries
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-1.5 bg-[#0D1322] p-1 rounded-xl text-xs font-mono uppercase self-start sm:self-auto border border-white/[0.08]">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filterType === 'all'
                  ? 'bg-white/[0.1] text-teal-300 border border-teal-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('attention')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filterType === 'attention'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Needs Attention
            </button>
            <button
              onClick={() => setFilterType('cleared')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filterType === 'cleared'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Normal
            </button>
          </div>
        </div>

        {/* 4. Empty State Handling */}
        {filteredReports.length === 0 ? (
          <div className="py-16 text-center space-y-4 glass-panel rounded-3xl border border-white/[0.08] p-8">
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
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-teal-400 text-slate-950 font-bold text-xs shadow hover:bg-teal-300 transition-colors"
              >
                <Upload className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Upload a Report</span>
              </button>
              {reportsList.length === 0 && (
                <button
                  onClick={handleRestoreSamples}
                  className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-slate-300 font-semibold text-xs transition-colors border border-white/[0.08]"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Restore Samples</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* 5. Reports Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredReports.map((report) => {
              const outsideCount = report.metrics.filter(
                m => m.status === 'high' || m.status === 'low'
              ).length;

              return (
                <div
                  key={report.id}
                  onClick={() => onSelectReport(report)}
                  className="group glass-panel rounded-2xl p-5 border border-white/[0.08] hover:border-teal-500/50 hover:bg-[#111A2E] transition-all cursor-pointer flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/[0.05] text-slate-300 border border-white/[0.08]">
                        {report.category}
                      </span>
                      {outsideCount > 0 ? (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/30">
                          {outsideCount} OUTSIDE_RANGE
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                          ALL_NORMAL
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="font-extrabold text-white group-hover:text-teal-300 transition-colors text-base leading-snug">
                        {report.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                        {report.summary}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="flex items-center space-x-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>{report.collectionDate}</span>
                    </span>
                    <span className="text-teal-400 group-hover:translate-x-1 transition-transform inline-flex items-center space-x-1 font-bold">
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
