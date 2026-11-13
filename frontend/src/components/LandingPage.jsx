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
  BarChart3,
  Terminal
} from 'lucide-react';

export default function LandingPage({ onGoToDashboard, onSelectSample }) {
  return (
    <div className="space-y-12 sm:space-y-16 py-4 sm:py-8 animate-fadeIn text-white">
      
      {/* 1. Main Hero Panel (Styled directly after Top Card of reference image) */}
      <section className="mono-card rounded-2xl p-6 sm:p-12 relative overflow-hidden border border-white/[0.08]">
        {/* Subtle wireframe curves in background */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1000 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="500" cy="250" rx="360" ry="180" stroke="white" strokeWidth="0.8" strokeDasharray="4 4" />
            <path d="M100 250 C 300 100, 700 400, 900 250" stroke="white" strokeWidth="0.6" />
            <path d="M150 280 C 350 140, 650 380, 850 220" stroke="white" strokeWidth="0.4" />
          </svg>
        </div>

        {/* Top Header Segmented Links inspired by image */}
        <div className="flex items-center justify-between pb-10 border-b border-white/[0.06] text-xs font-mono uppercase tracking-widest text-slate-400">
          <span className="hover:text-white transition-colors">MEASURE / INGEST</span>
          <span className="hover:text-white transition-colors">ANALYZE / OCR</span>
          <span className="hover:text-white transition-colors">TRANSLATE / EDU</span>
          <span className="text-yellow-400 font-bold">PHYSICIAN_CONSULT</span>
        </div>

        {/* Center Visual & Title Section */}
        <div className="py-12 sm:py-16 text-center space-y-6 relative z-10 max-w-4xl mx-auto">
          {/* Wireframe Glyph Icon & Telemetry */}
          <div className="flex items-center justify-between px-2 text-xs font-mono text-slate-500">
            <span className="tracking-widest">❖❖ [INGESTION]</span>
            <span className="tracking-widest">[DECODE] ❖❖</span>
          </div>

          {/* Big Bold Headline matching image typography */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white font-sans leading-[1.1]">
            Medical Lab Reports <br />
            <span className="text-yellow-400">
              Decoded For Patients
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed">
            Laboratory printouts shouldn't feel like an incomprehensible encrypted code. 
            ReportSaathi translates confusing biomarkers, measured numbers, and reference intervals into simple, compassionate insights to empower your physician consultations.
          </p>

          {/* Button CTAs with Yellow Buttons as requested */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onGoToDashboard}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-xl bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-black font-black text-sm tracking-wider uppercase shadow-xl shadow-yellow-400/20 active:scale-95 transition-all"
            >
              <span>Launch Dashboard</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>

            <button
              onClick={() => onSelectSample('rep-cbc-001')}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-4 rounded-xl bg-[#1C1C22] hover:bg-[#25252D] text-white font-mono text-xs font-bold uppercase tracking-wider border border-white/[0.12] hover:border-yellow-400/50 transition-all"
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>Test Demo CBC Report</span>
            </button>
          </div>
        </div>

        {/* Bottom Hairline & Glyph */}
        <div className="flex items-center justify-between pt-6 border-t border-white/[0.06] text-[11px] font-mono text-slate-500 uppercase">
          <span>:: PDF / JPG / PNG INPUT</span>
          <span>EVIDENCE_BASED_SUMMARY ::</span>
        </div>
      </section>

      {/* 2. Impact Section (Directly patterned after the Middle Card of the reference image) */}
      <section className="grid grid-cols-1 md:grid-cols-12 rounded-2xl overflow-hidden border border-white/[0.08]">
        {/* Left Column: Title & Explanation */}
        <div className="md:col-span-5 bg-[#0D0D11] p-6 sm:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/[0.08] space-y-8">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-slate-500">
            <span>MEASURE</span>
            <span>ANALYZE</span>
            <span>IMPLEMENT</span>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight leading-snug">
              Data That Empowers Patient Healthcare Conversations
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
              Results synthesized from laboratory reference tables into structured biomarkers to prepare informed, high-impact questions for your physician appointments.
            </p>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-4">
            <span>❖❖ [VALIDATED]</span>
          </div>
        </div>

        {/* Middle Column: 100% Metric Panel */}
        <div className="md:col-span-3 bg-[#15151A] p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/[0.08] space-y-8">
          <div className="text-xs font-mono text-slate-500 uppercase tracking-widest">
            METRIC // 01
          </div>

          <div className="space-y-2">
            <div className="text-5xl sm:text-6xl font-black text-white font-mono tracking-tight">
              100%
            </div>
            <p className="text-xs font-mono uppercase text-slate-400 tracking-wider leading-relaxed">
              Zero-jargon plain language translation
            </p>
          </div>

          <div className="text-xs font-mono text-slate-600">
            ❖❖
          </div>
        </div>

        {/* Right Column: 35+ Metric Panel with Wireframe Waves */}
        <div className="md:col-span-4 bg-[#1B1B22] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden space-y-8">
          {/* Subtle topological wave graphic in top right */}
          <div className="absolute right-0 top-0 w-44 h-44 opacity-25 pointer-events-none">
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 20 C 60 80, 140 30, 180 90 C 220 150, 100 180, 50 160" stroke="white" strokeWidth="0.8" />
              <path d="M30 40 C 70 100, 150 50, 190 110" stroke="white" strokeWidth="0.6" />
              <path d="M40 60 C 80 120, 160 70, 200 130" stroke="white" strokeWidth="0.4" />
            </svg>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-slate-400 uppercase tracking-widest relative z-10">
            <span>METRIC // 02</span>
            <span>MORE</span>
          </div>

          <div className="space-y-2 relative z-10">
            <div className="text-5xl sm:text-6xl font-black text-white font-mono tracking-tight">
              35+
            </div>
            <p className="text-xs font-mono uppercase text-slate-300 tracking-wider leading-relaxed">
              Standard clinical biomarkers evaluated against stated reference intervals
            </p>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-slate-500 relative z-10">
            <span>❖❖</span>
            <span className="text-yellow-400 font-bold">VERIFIED_RANGES</span>
          </div>
        </div>
      </section>

      {/* 3. Three-Step Architecture Section (Directly patterned after Bottom Card of reference image) */}
      <section className="mono-card rounded-2xl p-6 sm:p-8 border border-white/[0.08] space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
          <div className="space-y-1">
            <div className="text-xs font-mono text-yellow-400 uppercase tracking-widest">
              SYSTEM_WORKFLOW
            </div>
            <h3 className="text-2xl sm:text-3xl font-black uppercase text-white font-sans">
              3-Step Clinical Education Protocol
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500">
            [INPUT → EXTRACTION → PHYSICIAN CONSULTATION]
          </span>
        </div>

        {/* Segmented Rows matching the bottom table of the reference image */}
        <div className="space-y-2 font-mono">
          <div className="flex items-center justify-between p-4 bg-[#15151A] rounded-xl border border-white/[0.04]">
            <span className="w-12 text-sm font-bold text-yellow-400">01</span>
            <span className="flex-1 text-xs sm:text-sm text-slate-200 uppercase px-4">
              Digital PDF Text Layer & Tesseract Optical Character Extraction
            </span>
            <span className="text-xs text-slate-500">❖❖</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#18181E] rounded-xl border border-white/[0.04]">
            <span className="w-12 text-sm font-bold text-yellow-400">02</span>
            <span className="flex-1 text-xs sm:text-sm text-slate-200 uppercase px-4">
              Biomarker Isolation & Reference Interval Verification (Zero Hallucinations)
            </span>
            <span className="text-xs text-slate-500">❖❖</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#15151A] rounded-xl border border-white/[0.04]">
            <span className="w-12 text-sm font-bold text-yellow-400">03</span>
            <span className="flex-1 text-xs sm:text-sm text-slate-200 uppercase px-4">
              Synthesized Plain-Language Summary & Tailored Doctor Question Checklist
            </span>
            <span className="text-xs text-slate-500">❖❖</span>
          </div>
        </div>
      </section>

      {/* 4. Mandatory Clinical Disclaimer Banner */}
      <section className="rounded-2xl p-6 bg-[#0E0E12] border border-yellow-400/30 text-slate-300">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 flex items-center justify-center shrink-0 mt-0.5">
            <ShieldAlert className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div className="space-y-1.5 font-sans">
            <span className="text-xs font-mono uppercase tracking-wider text-yellow-400 font-bold block">
              :: REGULATORY & CLINICAL BOUNDARIES
            </span>
            <h4 className="text-sm sm:text-base font-bold text-white uppercase">
              Educational Health Literacy Purpose Only • Not A Medical Diagnosis
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              ReportSaathi is developed strictly for patient health literacy and educational dialogue. It does <strong>not</strong> provide medical diagnoses, clinical treatment plans, or prescriptions. Reference ranges differ across testing facilities, machines, and demographic groups. 
              Always review your laboratory reports with your licensed doctor before making any healthcare decisions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
