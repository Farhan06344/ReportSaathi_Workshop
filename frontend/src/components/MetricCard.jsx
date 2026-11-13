import React from 'react';
import { CheckCircle2, ArrowUpRight, ArrowDownRight, HelpCircle, Activity } from 'lucide-react';

export default function MetricCard({ metric }) {
  const { name, value, unit, reference_range, status, interpretation } = metric;

  const normalizedStatus = (status || 'normal').toLowerCase();

  const getStatusBadge = () => {
    switch (normalizedStatus) {
      case 'low':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
            <ArrowDownRight className="w-3.5 h-3.5" />
            <span>Low</span>
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Elevated</span>
          </span>
        );
      case 'normal':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Normal Range</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Review</span>
          </span>
        );
    }
  };

  const getCardBorder = () => {
    switch (normalizedStatus) {
      case 'low':
        return 'border-l-4 border-l-blue-500 bg-white hover:border-blue-400';
      case 'high':
        return 'border-l-4 border-l-rose-500 bg-white hover:border-rose-400';
      case 'normal':
        return 'border-l-4 border-l-emerald-500 bg-white hover:border-emerald-400';
      default:
        return 'border-l-4 border-l-slate-400 bg-white hover:border-slate-400';
    }
  };

  return (
    <div className={`p-4 rounded-xl border border-slate-200/90 shadow-sm transition-all hover:shadow-md ${getCardBorder()}`}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1">
          <h4 className="font-bold text-slate-900 text-base leading-snug">{name}</h4>
          <div className="flex flex-wrap items-baseline gap-2 mt-1">
            <span className="text-xl font-extrabold text-slate-800 tracking-tight">
              {value}
            </span>
            {unit && <span className="text-xs font-medium text-slate-500">{unit}</span>}
            {reference_range && (
              <span className="text-xs text-slate-400 font-normal">
                (Standard: <span className="font-medium text-slate-600">{reference_range}</span>)
              </span>
            )}
          </div>
        </div>
        <div className="shrink-0">{getStatusBadge()}</div>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/60 p-2.5 rounded-lg">
        <div className="flex items-start space-x-2">
          <Activity className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
          <p>{interpretation}</p>
        </div>
      </div>
    </div>
  );
}
