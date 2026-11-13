import React from 'react';
import { 
  FileText, 
  HelpCircle, 
  ShieldAlert, 
  Sparkles, 
  ArrowRight, 
  Activity, 
  Stethoscope, 
  HeartHandshake, 
  CheckCircle2,
  FileCheck2,
  Lock,
  BookOpen,
  Cpu,
  Fingerprint,
  BarChart3,
  Terminal
} from 'lucide-react';

export default function LandingPage({ onGoToDashboard, onSelectSample }) {
  return (
    <div className="space-y-16 sm:space-y-24 py-6 sm:py-10 animate-fadeIn">
      {/* 1. Hero Section with Dark Futuristic Telemetry Aesthetic */}
      <section className="relative text-center max-w-5xl mx-auto space-y-6 pt-4">
        {/* Subtle grid background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-teal-500/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

        {/* Section Pill */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase bg-teal-500/10 text-teal-300 border border-teal-500/30">
          <Terminal className="w-3.5 h-3.5 text-teal-400" />
          <span>Patient Health Literacy & Diagnostic Translation</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1] uppercase font-sans">
          Medical Lab Reports{' '}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-emerald-400">
            Decoded Into Plain English
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
          Laboratory printouts shouldn’t feel like an incomprehensible encrypted code. 
          ReportSaathi translates complex biomarkers, reference intervals, and clinical ratios into clear, compassionate insights to empower your physician consultations.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onGoToDashboard}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-xl bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 text-slate-950 font-black text-sm tracking-wide shadow-xl shadow-teal-500/25 hover:shadow-teal-400/40 hover:scale-[1.02] active:scale-[0.99] transition-all"
          >
            <span>Launch Dashboard</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          <button
            onClick={() => onSelectSample('rep-cbc-001')}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-4 rounded-xl bg-[#0D1525] hover:bg-[#131E35] text-white font-bold text-sm border border-slate-700/80 hover:border-teal-500/50 transition-all shadow-md"
          >
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>Test CBC Demo Report</span>
          </button>
        </div>

        {/* Telemetry Status Line */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs font-mono text-slate-500 uppercase tracking-wider">
          <div className="flex items-center space-x-2">
            <span className="text-teal-400 font-bold">::</span>
            <span>PDF / JPG / PNG Input</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-teal-400 font-bold">::</span>
            <span>Zero-Jargon Explanations</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-teal-400 font-bold">::</span>
            <span>Doctor Visit Preparation</span>
          </div>
        </div>
      </section>

      {/* 2. Key Metrics Telemetry Grid (Inspired by the attached design) */}
      <section className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4 relative overflow-hidden border border-white/[0.08]">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500">
              <span>METRIC_01</span>
              <span className="text-teal-400 font-bold">::</span>
            </div>
            <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight">
              100%
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wide">
                Patient-First Plain Language
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Removes terrifying medical terminology and explains what each biomarker does using everyday analogies.
              </p>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4 relative overflow-hidden border border-white/[0.08]">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500">
              <span>METRIC_02</span>
              <span className="text-teal-400 font-bold">::</span>
            </div>
            <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight">
              35+
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wide">
                Standard Biomarkers Analyzed
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Evaluates reference intervals across Hematology (CBC), Lipid Cardiovascular Profiles, and Metabolic Panels.
              </p>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4 relative overflow-hidden border border-white/[0.08]">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500">
              <span>METRIC_03</span>
              <span className="text-teal-400 font-bold">::</span>
            </div>
            <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight">
              3-STEP
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wide">
                Doctor Consultation Action Plan
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automatically formulates high-priority questions tailored to your specific lab numbers for your next appointment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mandatory Clinical & Educational Disclaimer Banner */}
      <section className="max-w-6xl mx-auto">
        <div className="rounded-2xl p-5 sm:p-6 bg-[#161208] border border-amber-500/30 text-amber-200 shadow-lg relative">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/30">
              <ShieldAlert className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                  :: REGULATORY & ETHICAL NOTICE
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-amber-100">
                Educational Purpose Only • Not Clinical Diagnosis
              </h2>
              <p className="text-xs sm:text-sm text-amber-200/80 leading-relaxed">
                ReportSaathi is developed exclusively for health literacy and educational empowerment. It does <strong>not</strong> provide diagnostic verdicts, prescribe medications, or replace consultations with a certified medical doctor. Reference intervals vary by laboratory facility, equipment, and demographics. 
                Always review your complete clinical report directly with your physician.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Telemetry Pipeline Process Steps */}
      <section className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/[0.08]">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold block mb-1">
              WORKFLOW_PIPELINE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase">
              How The Extraction & Translation Engine Operates
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-500">
            [INPUT → INGESTION → EXTRACTION → EXPLANATION]
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="glass-panel p-6 rounded-2xl border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 font-mono font-bold text-xs flex items-center justify-center border border-teal-500/30">
                01
              </span>
              <span className="text-[10px] font-mono text-slate-500 uppercase">STAGE_INGEST</span>
            </div>
            <h3 className="font-bold text-white text-lg">Document Ingestion</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Upload your digital PDF report or a photo scan (JPG, PNG). The system validates document headers and prepares optical text boundaries.
            </p>
          </div>

          {/* Step 2 */}
          <div className="glass-panel p-6 rounded-2xl border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center border border-cyan-500/30">
                02
              </span>
              <span className="text-[10px] font-mono text-slate-500 uppercase">STAGE_PARSE</span>
            </div>
            <h3 className="font-bold text-white text-lg">Biomarker Extraction</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Extracts patient numbers, testing units (e.g. g/dL, mg/dL), and laboratory reference intervals into structured tabular telemetry.
            </p>
          </div>

          {/* Step 3 */}
          <div className="glass-panel p-6 rounded-2xl border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 font-mono font-bold text-xs flex items-center justify-center border border-emerald-500/30">
                03
              </span>
              <span className="text-[10px] font-mono text-slate-500 uppercase">STAGE_DECODE</span>
            </div>
            <h3 className="font-bold text-white text-lg">Human Translation</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Produces reassuring, plain-language summaries, highlights values needing discussion, and outputs concrete questions for your doctor.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Preloaded Demo Reports */}
      <section className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <h3 className="text-lg font-bold text-white uppercase font-sans">
            Pre-Loaded Clinical Datasets (Test Instantly)
          </h3>
          <span className="text-xs font-mono text-teal-400">1-CLICK_EVALUATION</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            onClick={() => onSelectSample('rep-cbc-001')}
            className="glass-panel p-5 rounded-2xl border border-white/[0.08] hover:border-teal-500/50 hover:bg-white/[0.04] transition-all cursor-pointer group space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                HEMATOLOGY
              </span>
              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-teal-400 group-hover:translate-x-1 transition-all" />
            </div>
            <h4 className="font-bold text-white text-base group-hover:text-teal-300 transition-colors">
              Complete Blood Count (CBC)
            </h4>
            <p className="text-xs text-slate-400 line-clamp-2">
              Analyzes hemoglobin, red blood cells, MCV, platelets, and fatigue indicators.
            </p>
          </div>

          <div 
            onClick={() => onSelectSample('rep-lipid-002')}
            className="glass-panel p-5 rounded-2xl border border-white/[0.08] hover:border-teal-500/50 hover:bg-white/[0.04] transition-all cursor-pointer group space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                CARDIOVASCULAR
              </span>
              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-teal-400 group-hover:translate-x-1 transition-all" />
            </div>
            <h4 className="font-bold text-white text-base group-hover:text-teal-300 transition-colors">
              Lipid & Cholesterol Profile
            </h4>
            <p className="text-xs text-slate-400 line-clamp-2">
              Reviews Total Cholesterol, LDL ('bad'), HDL ('good'), and Triglycerides.
            </p>
          </div>

          <div 
            onClick={() => onSelectSample('rep-cmp-003')}
            className="glass-panel p-5 rounded-2xl border border-white/[0.08] hover:border-teal-500/50 hover:bg-white/[0.04] transition-all cursor-pointer group space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                METABOLIC
              </span>
              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-teal-400 group-hover:translate-x-1 transition-all" />
            </div>
            <h4 className="font-bold text-white text-base group-hover:text-teal-300 transition-colors">
              Metabolic & Kidney Panel
            </h4>
            <p className="text-xs text-slate-400 line-clamp-2">
              Evaluates Fasting Blood Glucose, eGFR, Creatinine, and electrolytes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
