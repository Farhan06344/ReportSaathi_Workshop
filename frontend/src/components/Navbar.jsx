import React from 'react';
import { HeartPulse, Upload, LayoutDashboard, Home, Sparkles, Terminal, Activity } from 'lucide-react';

export default function Navbar({ currentView, setCurrentView, onOpenUpload }) {
  return (
    <header className="sticky top-0 z-40 bg-[#080C14]/90 backdrop-blur-xl border-b border-white/[0.08]">
      {/* Top Telemetry Demo Strip */}
      <div className="bg-[#0D1525] border-b border-teal-500/20 py-1.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse shadow-sm shadow-teal-400"></span>
            <span className="text-teal-400 font-bold tracking-wider uppercase">REPORTSAATHI v1.0 [DEMO_MODE]</span>
          </div>
          <span className="hidden sm:inline text-slate-500">
            :: STANDALONE CLIENT DEMO • SAMPLE CLINICAL DATASETS • NOT LIVE AI ::
          </span>
          <div className="flex items-center space-x-2">
            <span className="text-slate-400">STATUS:</span>
            <span className="text-emerald-400 font-semibold">ALL_SYSTEMS_OPTIMAL</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <div 
            onClick={() => setCurrentView('landing')} 
            className="flex items-center space-x-3 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 via-cyan-400 to-emerald-400 p-[1px] shadow-lg shadow-teal-500/20">
              <div className="w-full h-full bg-[#090D16] rounded-xl flex items-center justify-center text-teal-400 group-hover:text-white transition-colors">
                <HeartPulse className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-white font-sans">
                  Report<span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">Saathi</span>
                </span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-teal-950 text-teal-300 border border-teal-700/50">
                  EDU
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">
                Clinical Health Literacy
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={() => setCurrentView('landing')}
              className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold font-mono uppercase tracking-wider transition-all ${
                currentView === 'landing'
                  ? 'bg-white/[0.08] text-teal-400 border border-teal-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Overview</span>
            </button>

            <button
              onClick={() => setCurrentView('dashboard')}
              className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold font-mono uppercase tracking-wider transition-all ${
                currentView === 'dashboard'
                  ? 'bg-white/[0.08] text-teal-400 border border-teal-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>

            {/* Glowing High-Impact Upload Action Button */}
            <button
              onClick={onOpenUpload}
              className="relative group inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold font-sans text-slate-950 bg-gradient-to-r from-teal-400 via-cyan-300 to-emerald-400 shadow-md shadow-teal-500/20 hover:shadow-lg hover:shadow-teal-400/40 active:scale-98 transition-all"
            >
              <Upload className="w-4 h-4 stroke-[2.5]" />
              <span>Upload Report</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
