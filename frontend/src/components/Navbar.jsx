import React from 'react';
import { HeartPulse, Upload, LayoutDashboard, Home, Sparkles, Terminal } from 'lucide-react';

export default function Navbar({ currentView, setCurrentView, onOpenUpload }) {
  return (
    <header className="sticky top-0 z-40 bg-[#070709]/95 backdrop-blur-md border-b border-white/[0.08]">
      {/* Top Hairline Telemetry Strip inspired by reference */}
      <div className="border-b border-white/[0.06] py-1.5 px-4 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-slate-400 text-[11px]">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse"></span>
            <span className="text-white font-bold tracking-wider">REPORTSAATHI // HEALTH INTELLIGENCE</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-4 text-slate-500 text-[10px]">
            <span className="text-slate-400">MEASURE</span>
            <span>•</span>
            <span className="text-slate-400">ANALYZE</span>
            <span>•</span>
            <span className="text-slate-400">IMPLEMENT</span>
            <span>•</span>
            <span className="text-slate-400">VERIFY</span>
          </div>

          <div className="flex items-center space-x-2 text-[10px]">
            <span className="text-slate-500">MODE:</span>
            <span className="text-yellow-400 font-bold">CLIENT_DEMO</span>
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
            <div className="w-9 h-9 rounded-lg bg-yellow-400 flex items-center justify-center text-black font-black shadow-md shadow-yellow-400/20 group-hover:bg-yellow-300 transition-colors">
              <HeartPulse className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-tight text-white uppercase font-sans">
                  Report<span className="text-yellow-400">Saathi</span>
                </span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-white/[0.08] text-slate-300 border border-white/[0.1]">
                  v1.0
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">
                Clinical Health Literacy
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => setCurrentView('landing')}
              className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold font-mono uppercase tracking-wider transition-all ${
                currentView === 'landing'
                  ? 'bg-white/[0.1] text-white border border-white/[0.2]'
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
                  ? 'bg-white/[0.1] text-white border border-white/[0.2]'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>

            {/* Yellow Action Button */}
            <button
              onClick={onOpenUpload}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-black font-sans text-black bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 shadow-lg shadow-yellow-400/20 active:scale-95 transition-all uppercase tracking-wide"
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
