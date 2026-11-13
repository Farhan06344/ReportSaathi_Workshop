import React from 'react';
import { ShieldAlert, AlertTriangle } from 'lucide-react';

export default function MedicalDisclaimer({ compact = false }) {
  if (compact) {
    return (
      <div className="flex items-start space-x-2 p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl text-xs text-amber-800">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">Educational Purpose Only:</span> ReportSaathi is designed to help you understand lab terminology and prepare questions for your doctor. It never replaces clinical diagnosis, consultation, or treatment.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 shadow-sm">
      <div className="flex items-start space-x-3.5">
        <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0 mt-0.5">
          <AlertTriangle className="w-5 h-5 stroke-[2.2]" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-amber-950 flex items-center space-x-2">
            <span>Important Medical & Educational Disclaimer</span>
          </h4>
          <p className="text-xs text-amber-900 leading-relaxed">
            ReportSaathi extracts and explains the biomarkers in your laboratory report for <strong>informational and educational purposes only</strong>. Lab ranges vary across different reference laboratories, instruments, ages, and genders. 
            <strong> Always discuss these findings with your primary physician or specialist before making any dietary, lifestyle, or medical decisions.</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
