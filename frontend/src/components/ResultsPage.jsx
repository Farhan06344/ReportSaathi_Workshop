import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Printer, 
  Upload, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowDownRight, 
  HelpCircle, 
  Stethoscope, 
  Heart, 
  Apple, 
  Activity, 
  Calendar, 
  Building2, 
  User, 
  FileText, 
  Lightbulb, 
  Sparkles, 
  Terminal, 
  Copy, 
  Check,
  ChevronDown,
  ChevronUp,
  Cpu
} from 'lucide-react';

export default function ResultsPage({ report, onBackToDashboard, onUploadNew }) {
  const [metricFilter, setMetricFilter] = useState('all'); // 'all' | 'attention' | 'normal'
  const [copiedQuestionIdx, setCopiedQuestionIdx] = useState(null);
  const [showRawText, setShowRawText] = useState(false);

  if (!report) return null;

  // Normalized properties handling both API snake_case and sample camelCase
  const title = report.report_title || report.title || "Laboratory Analysis";
  const category = report.category || "Clinical Telemetry";
  const patientName = report.patientName || "Verified Patient";
  const age = report.age || 38;
  const gender = report.gender || "Adult";
  const collectionDate = report.collectionDate || new Date().toLocaleDateString();
  const laboratory = report.laboratory || "Diagnostic Clinical Testing Facility";
  
  const summary = report.patient_summary || report.summary || "Summary of medical findings.";
  const keyHighlights = report.key_findings || report.keyHighlights || [];
  const metrics = report.metrics || [];
  const doctorQuestions = report.questions_for_doctor || report.doctorQuestions || [];
  const lifestyleNotes = report.diet_and_lifestyle_notes || report.lifestyleNotes || [];
  const uploadedFileName = report.filename || report.uploadedFileName;
  const extractionMethod = report.extraction_method || "pymupdf_digital";
  const extractedText = report.extracted_text || report.raw_text;

  const attentionMetrics = metrics.filter(m => {
    const s = (m.status || '').toLowerCase();
    return s === 'low' || s === 'high';
  });

  const normalMetrics = metrics.filter(m => (m.status || '').toLowerCase() === 'normal');

  const displayedMetrics = metricFilter === 'attention' 
    ? attentionMetrics 
    : metricFilter === 'normal' 
    ? normalMetrics 
    : metrics;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyQuestion = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedQuestionIdx(idx);
    setTimeout(() => setCopiedQuestionIdx(null), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16 max-w-6xl mx-auto text-white">
      {/* Top Nav Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <button
          onClick={onBackToDashboard}
          className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-slate-400 hover:text-white transition-colors w-fit uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>&lt; Back to Dashboard</span>
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-mono font-semibold text-slate-300 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] rounded-xl transition-colors shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>Print Summary</span>
          </button>

          <button
            onClick={onUploadNew}
            className="inline-flex items-center space-x-1.5 px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-teal-400 to-cyan-400 hover:scale-[1.02] rounded-xl shadow-md shadow-teal-500/20 transition-all font-mono uppercase"
          >
            <Upload className="w-4 h-4 stroke-[2.5]" />
            <span>Upload Another</span>
          </button>
        </div>
      </div>

      {/* Mandatory Clinical Disclaimer Banner */}
      <div className="rounded-2xl p-5 bg-[#161208] border border-amber-500/30 text-amber-200 shadow-md">
        <div className="flex items-start space-x-3.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/30">
            <ShieldAlert className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-amber-100 uppercase font-mono tracking-wide">
              :: Mandatory Educational & Health Literacy Disclaimer
            </h4>
            <p className="text-xs text-amber-200/80 leading-relaxed font-sans">
              This report explanation is generated for informational and educational purposes only. 
              <strong> It does not constitute medical advice, clinical diagnosis, or a treatment plan.</strong> Always consult your licensed physician or healthcare specialist to interpret laboratory findings in the context of your medical history.
            </p>
          </div>
        </div>
      </div>

      {/* Report Telemetry Header Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/[0.08] space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-teal-500/10 text-teal-300 border border-teal-500/30">
                {category}
              </span>
              {extractionMethod && (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-blue-500/10 text-blue-300 border border-blue-500/30 flex items-center space-x-1">
                  <Cpu className="w-3 h-3" />
                  <span>{extractionMethod.toUpperCase()}</span>
                </span>
              )}
              {uploadedFileName && (
                <span className="text-xs text-slate-400 font-mono">
                  FILE: {uploadedFileName}
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase font-sans">
              {title}
            </h1>
          </div>

          {/* Quick status counter */}
          <div className="flex items-center gap-2 self-start font-mono">
            <div className="px-3.5 py-2 rounded-xl bg-[#080C14] border border-white/[0.08] text-center">
              <span className="block text-[10px] text-slate-500 uppercase">Total Tests</span>
              <span className="text-base font-bold text-white">{metrics.length}</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-center">
              <span className="block text-[10px] text-rose-400 uppercase">Attention</span>
              <span className="text-base font-bold text-rose-300">{attentionMetrics.length}</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center">
              <span className="block text-[10px] text-emerald-400 uppercase">Optimal</span>
              <span className="text-base font-bold text-emerald-300">{normalMetrics.length}</span>
            </div>
          </div>
        </div>

        {/* Patient & Report Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-[#080C14]/70 rounded-2xl border border-white/[0.06] text-xs font-mono">
          <div className="space-y-0.5">
            <span className="text-slate-500 flex items-center space-x-1 uppercase text-[10px]">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>PATIENT</span>
            </span>
            <p className="font-bold text-slate-200">{patientName} ({age}y, {gender})</p>
          </div>

          <div className="space-y-0.5">
            <span className="text-slate-500 flex items-center space-x-1 uppercase text-[10px]">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>COLLECTED</span>
            </span>
            <p className="font-bold text-slate-200">{collectionDate}</p>
          </div>

          <div className="space-y-0.5 col-span-2">
            <span className="text-slate-500 flex items-center space-x-1 uppercase text-[10px]">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <span>LABORATORY</span>
            </span>
            <p className="font-bold text-slate-200 truncate">{laboratory}</p>
          </div>
        </div>

        {/* Plain-Language Executive Summary */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center space-x-2 text-teal-300 font-bold text-xs uppercase font-mono tracking-wider">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Plain-Language Patient Summary</span>
          </div>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed bg-[#0B1224] p-5 rounded-2xl border border-teal-500/20 font-sans">
            {summary}
          </p>
        </div>

        {/* Key Highlights */}
        {keyHighlights.length > 0 && (
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Key Highlights At A Glance
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {keyHighlights.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-300 bg-white/[0.02] p-3.5 rounded-xl border border-white/[0.08]">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 shrink-0"></span>
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Extracted Lab Values Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/[0.08]">
          <div>
            <h3 className="text-xl font-black text-white tracking-tight uppercase font-sans">
              Extracted Biomarkers & Reference Ranges
            </h3>
            <p className="text-xs text-slate-400">
              Values extracted from the document and compared against standard lab reference intervals (never invented)
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-1.5 bg-[#0D1322] p-1 rounded-xl text-xs font-mono uppercase self-start sm:self-auto border border-white/[0.08]">
            <button
              onClick={() => setMetricFilter('all')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                metricFilter === 'all'
                  ? 'bg-white/[0.1] text-teal-300 border border-teal-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({metrics.length})
            </button>
            <button
              onClick={() => setMetricFilter('attention')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                metricFilter === 'attention'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Outside Range ({attentionMetrics.length})
            </button>
            <button
              onClick={() => setMetricFilter('normal')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                metricFilter === 'normal'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Optimal ({normalMetrics.length})
            </button>
          </div>
        </div>

        {/* Biomarkers Cards Grid */}
        {displayedMetrics.length === 0 ? (
          <div className="text-center p-8 glass-panel rounded-2xl text-slate-400 text-xs font-mono">
            NO_BIOMARKERS_MATCHING_SELECTED_FILTER
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedMetrics.map((metric, idx) => {
              const statusLower = (metric.status || '').toLowerCase();
              const isLow = statusLower === 'low';
              const isHigh = statusLower === 'high';
              const refRange = metric.reference_range || metric.referenceRange;

              return (
                <div 
                  key={idx}
                  className={`p-5 rounded-2xl glass-panel space-y-3 transition-all hover:border-teal-500/40 ${
                    isLow 
                      ? 'border-blue-500/30' 
                      : isHigh 
                      ? 'border-rose-500/30' 
                      : 'border-white/[0.08]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-0.5">
                        {metric.category || 'Biomarker'}
                      </span>
                      <h4 className="font-extrabold text-white text-base leading-snug">
                        {metric.name}
                      </h4>
                    </div>

                    {/* Status Badge */}
                    <div className="shrink-0 font-mono">
                      {isLow ? (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-300 border border-blue-500/30">
                          <ArrowDownRight className="w-3.5 h-3.5" />
                          <span>Below Range</span>
                        </span>
                      ) : isHigh ? (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-300 border border-rose-500/30">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                          <span>Elevated</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Optimal</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Values Comparison Row */}
                  <div className="flex items-baseline gap-2 bg-[#080C14] p-3 rounded-xl border border-white/[0.06] font-mono">
                    <span className="text-2xl font-black text-white tracking-tight">
                      {metric.value}
                    </span>
                    {metric.unit && (
                      <span className="text-xs font-semibold text-teal-400">
                        {metric.unit}
                      </span>
                    )}
                    {refRange ? (
                      <span className="text-xs text-slate-500 ml-auto font-medium">
                        Standard: <strong className="text-slate-300">{refRange}</strong>
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500 ml-auto italic">
                        Reference Range: Not Specified in Document
                      </span>
                    )}
                  </div>

                  {/* Plain-Language Interpretation */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {metric.interpretation}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Raw Extracted Document Text Accordion */}
      {extractedText && (
        <div className="glass-panel rounded-2xl p-4 border border-white/[0.08] space-y-3">
          <button
            onClick={() => setShowRawText(!showRawText)}
            className="w-full flex items-center justify-between text-left text-xs font-mono font-bold text-slate-300 hover:text-teal-400 transition-colors uppercase tracking-wider"
          >
            <span className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-teal-400" />
              <span>RAW_EXTRACTED_TEXT_STREAM [TRANSPARENCY_AUDIT]</span>
            </span>
            {showRawText ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showRawText && (
            <div className="p-4 bg-[#050811] text-teal-200 font-mono text-xs rounded-xl overflow-x-auto max-h-72 overflow-y-auto whitespace-pre-wrap border border-white/[0.06] leading-relaxed">
              {extractedText}
            </div>
          )}
        </div>
      )}

      {/* Actionable Next Steps: Doctor Questions & Lifestyle Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Questions for Doctor */}
        <div className="glass-panel rounded-3xl p-6 border border-white/[0.08] space-y-4">
          <div className="flex items-center space-x-2 text-teal-300 font-bold text-base font-mono uppercase">
            <Stethoscope className="w-5 h-5 text-teal-400" />
            <h3>Questions for Your Doctor</h3>
          </div>
          <p className="text-xs text-slate-400 font-sans">
            Click copy or note these questions down for your next consultation:
          </p>
          <ul className="space-y-3 font-sans">
            {doctorQuestions.map((q, idx) => (
              <li 
                key={idx} 
                onClick={() => handleCopyQuestion(q, idx)}
                className="group flex items-start justify-between gap-3 text-xs sm:text-sm text-slate-200 bg-[#080C14] p-3.5 rounded-xl border border-white/[0.06] hover:border-teal-500/30 transition-all cursor-pointer"
              >
                <div className="flex items-start space-x-3">
                  <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-300 font-mono font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5 border border-teal-500/30">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{q}</span>
                </div>
                <span className="shrink-0 text-slate-500 group-hover:text-teal-400 pt-0.5">
                  {copiedQuestionIdx === idx ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Lifestyle & Dietary Notes */}
        <div className="glass-panel rounded-3xl p-6 border border-white/[0.08] space-y-4">
          <div className="flex items-center space-x-2 text-emerald-300 font-bold text-base font-mono uppercase">
            <Apple className="w-5 h-5 text-emerald-400" />
            <h3>Wellness & Dietary Pointers</h3>
          </div>
          <p className="text-xs text-slate-400 font-sans">
            Everyday nutritional & lifestyle context:
          </p>
          <ul className="space-y-3 font-sans">
            {lifestyleNotes.map((tip, idx) => (
              <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-200 bg-[#080C14] p-3.5 rounded-xl border border-white/[0.06]">
                <Heart className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                <span className="leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
