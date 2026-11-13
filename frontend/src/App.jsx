import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import ResultsPage from './components/ResultsPage';
import UploadModal from './components/UploadModal';
import { SAMPLE_REPORTS } from './data/sampleReports';
import { CheckCircle2, X } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'dashboard' | 'results'
  const [selectedReport, setSelectedReport] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleSelectReport = (report) => {
    setSelectedReport(report);
    setCurrentView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSampleById = (sampleId) => {
    const report = SAMPLE_REPORTS.find(r => r.id === sampleId) || SAMPLE_REPORTS[0];
    handleSelectReport(report);
  };

  const handleUploadSuccess = (analyzedReport) => {
    setSelectedReport(analyzedReport);
    setCurrentView('results');
    showToast(`SUCCESS: Document "${analyzedReport.uploadedFileName || analyzedReport.title}" processed.`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080C14] text-slate-100 antialiased selection:bg-teal-500/30 selection:text-teal-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3 px-4 py-3 bg-[#0D1525] text-white text-xs sm:text-sm font-mono rounded-2xl shadow-2xl animate-fadeIn border border-teal-500/30">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white p-1 ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenUpload={() => setIsUploadModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentView === 'landing' ? (
          <LandingPage
            onGoToDashboard={() => {
              setCurrentView('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectSample={handleSelectSampleById}
          />
        ) : currentView === 'dashboard' ? (
          <Dashboard
            onOpenUpload={() => setIsUploadModalOpen(true)}
            onSelectReport={handleSelectReport}
          />
        ) : (
          <ResultsPage
            report={selectedReport || SAMPLE_REPORTS[0]}
            onBackToDashboard={() => {
              setCurrentView('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onUploadNew={() => setIsUploadModalOpen(true)}
          />
        )}
      </main>

      {/* Upload & Validation Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />

      {/* Footer */}
      <footer className="border-t border-white/[0.08] bg-[#060910] py-8 mt-16 text-slate-500 text-xs font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-white">REPORTSAATHI</span>
            <span>•</span>
            <span className="text-teal-400">PATIENT HEALTH LITERACY DEMO</span>
          </div>

          <div className="text-center sm:text-right text-[11px] text-slate-500 max-w-md leading-relaxed font-sans">
            Educational companion tool. Not a substitute for professional medical diagnosis or clinical judgment.
          </div>
        </div>
      </footer>
    </div>
  );
}
