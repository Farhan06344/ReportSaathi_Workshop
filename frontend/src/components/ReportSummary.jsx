import React, { useState } from 'react';
import { 
  FileText, 
  HelpCircle, 
  Heart, 
  Sparkles, 
  Printer, 
  ChevronDown, 
  ChevronUp, 
  Lightbulb, 
  Stethoscope, 
  Apple,
  Filter
} from 'lucide-react';
import MetricCard from './MetricCard';
import MedicalDisclaimer from './MedicalDisclaimer';

export default function ReportSummary({ report, onReset }) {
  const [filter, setFilter] = useState('all'); // 'all', 'attention', 'normal'
  const [showRawText, setShowRawText] = useState(false);

  if (!report) return null;

  const {
    report_title,
    patient_summary,
    key_findings = [],
    metrics = [],
    questions_for_doctor = [],
    diet_and_lifestyle_notes = [],
    raw_text,
    is_mock,
  } = report;

  const attentionMetrics = metrics.filter(m => {
    const s = (m.status || '').toLowerCase();
    return s === 'low' || s === 'high' || s === 'inconclusive';
  });

  const normalMetrics = metrics.filter(m => (m.status || '').toLowerCase() === 'normal');

  const displayedMetrics = filter === 'attention' 
    ? attentionMetrics 
    : filter === 'normal' 
    ? normalMetrics 
    : metrics;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2.5">
              <span className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {report_title || 'Laboratory Report Analysis'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Parsed {metrics.length} biomarker metrics • Generated in plain patient-friendly English
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onReset}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
            >
              Analyze Another Report
            </button>
          </div>
        </div>

        {/* Demo Mode Notice Banner */}
        {is_mock && (
          <div className="mt-4 p-3 bg-indigo-50/90 border border-indigo-200 rounded-xl flex items-start space-x-2 text-xs text-indigo-900">
            <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Offline / Demo Mode Active:</span> This report explanation was synthesized using our offline parsing rules. To unlock live, dynamic Gemini 2.0 multi-modal analysis, add your free API key in <code className="bg-indigo-100 px-1 py-0.5 rounded font-mono font-semibold">backend/.env</code> and restart the server.
            </div>
          </div>
        )}

        {/* Executive Patient Summary */}
        <div className="mt-5 space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>Plain-English Summary</span>
          </h3>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed bg-brand-50/40 p-4 rounded-xl border border-brand-100/80 font-normal">
            {patient_summary}
          </p>
        </div>

        {/* Key Findings */}
        {key_findings.length > 0 && (
          <div className="mt-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              Key Highlights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {key_findings.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 shrink-0"></span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Biomarker Metrics Breakdown */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">
              Detailed Biomarker Breakdown ({metrics.length})
            </h3>
            <p className="text-xs text-slate-500">
              Each test explained without medical jargon
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl self-start sm:self-auto text-xs font-semibold">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                filter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({metrics.length})
            </button>
            <button
              onClick={() => setFilter('attention')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                filter === 'attention' ? 'bg-white text-rose-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Outside Range ({attentionMetrics.length})
            </button>
            <button
              onClick={() => setFilter('normal')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                filter === 'normal' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Normal ({normalMetrics.length})
            </button>
          </div>
        </div>

        {displayedMetrics.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-xl border border-slate-200 text-slate-500 text-sm">
            No biomarkers found matching the selected filter.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedMetrics.map((m, idx) => (
              <MetricCard key={idx} metric={m} />
            ))}
          </div>
        )}
      </div>

      {/* Actionable Next Steps: Doctor Questions & Lifestyle */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Questions for Doctor */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-brand-700 font-bold text-base">
            <Stethoscope className="w-5 h-5 text-brand-600" />
            <h3>Questions for Your Doctor</h3>
          </div>
          <p className="text-xs text-slate-500">
            Write these down or take them to your next doctor visit:
          </p>
          <ul className="space-y-2.5">
            {questions_for_doctor.map((q, idx) => (
              <li key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-700 bg-teal-50/50 p-2.5 rounded-lg border border-teal-100/70">
                <span className="font-bold text-teal-700 text-xs mt-0.5">{idx + 1}.</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Diet & Lifestyle Tips */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-emerald-800 font-bold text-base">
            <Apple className="w-5 h-5 text-emerald-600" />
            <h3>General Lifestyle & Wellness Notes</h3>
          </div>
          <p className="text-xs text-slate-500">
            Everyday healthy habits related to these findings:
          </p>
          <ul className="space-y-2.5">
            {diet_and_lifestyle_notes.map((tip, idx) => (
              <li key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-700 bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100/70">
                <Heart className="w-3.5 h-3.5 text-emerald-600 mt-1 shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Raw Extracted Text Accordion */}
      {raw_text && (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <button
            onClick={() => setShowRawText(!showRawText)}
            className="w-full flex items-center justify-between text-left text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            <span className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-slate-400" />
              <span>View Raw Extracted Document Text (OCR Audit)</span>
            </span>
            {showRawText ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showRawText && (
            <div className="mt-3 p-3 bg-slate-900 text-slate-200 font-mono text-xs rounded-xl overflow-x-auto max-h-60 overflow-y-auto whitespace-pre-wrap">
              {raw_text}
            </div>
          )}
        </div>
      )}

      {/* Mandatory Safety Disclaimer Banner */}
      <MedicalDisclaimer />
    </div>
  );
}
