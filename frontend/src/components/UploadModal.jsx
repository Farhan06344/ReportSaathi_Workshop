import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Upload, 
  FileText, 
  Image as ImageIcon, 
  AlertCircle, 
  CheckCircle2, 
  Loader2, 
  Sparkles, 
  RefreshCw,
  FileCheck,
  Terminal,
  Activity
} from 'lucide-react';
import { analyzeReportFile } from '../services/api';

export default function UploadModal({ isOpen, onClose, onUploadSuccess }) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [validationError, setValidationError] = useState(null);
  
  // Processing States: 'idle' | 'loading' | 'error' | 'success'
  const [status, setStatus] = useState('idle');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState('');

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setSelectedFile(null);
      setValidationError(null);
      setStatus('idle');
      setLoadingProgress(0);
      setLoadingStage('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validateFile = (file) => {
    setValidationError(null);

    // 1. Check file size (Max 10MB)
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size === 0) {
      setValidationError('EMPTY_FILE: The selected file is empty (0 bytes).');
      return false;
    }
    if (file.size > MAX_SIZE) {
      setValidationError(
        `FILE_SIZE_EXCEEDED: (${(file.size / (1024 * 1024)).toFixed(1)}MB) exceeds 10.0MB maximum limit. Please upload a smaller scan or PDF.`
      );
      return false;
    }

    // 2. Check file extension & type (PDF, PNG, JPG/JPEG)
    const validExtensions = ['.pdf', '.png', '.jpg', '.jpeg'];
    const fileName = file.name.toLowerCase();
    const hasValidExt = validExtensions.some(ext => fileName.endsWith(ext));

    if (!hasValidExt) {
      setValidationError(
        'INVALID_FORMAT: Unsupported file format. Only PDF, JPG, and PNG files are accepted.'
      );
      return false;
    }

    return true;
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
      }
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
      }
    }
  };

  const handleStartAnalysis = async () => {
    if (!selectedFile) return;

    setStatus('loading');
    setLoadingProgress(25);
    setLoadingStage('[01/03] STREAMING_FILE_TO_FASTAPI_BACKEND...');

    const timer1 = setTimeout(() => {
      setLoadingProgress(60);
      setLoadingStage('[02/03] RUNNING_PYMUPDF_EXTRACTION_AND_OCR...');
    }, 1000);

    const timer2 = setTimeout(() => {
      setLoadingProgress(85);
      setLoadingStage('[03/03] STRUCTURING_BIOMARKERS_AND_PHYSICIAN_QUESTIONS...');
    }, 2200);

    try {
      // Real API Call to FastAPI POST /api/reports/analyze
      const result = await analyzeReportFile(selectedFile);
      clearTimeout(timer1);
      clearTimeout(timer2);

      setLoadingProgress(100);
      setLoadingStage('[COMPLETE] Extraction successful. Formatting telemetry...');

      setStatus('success');
      setTimeout(() => {
        onUploadSuccess(result);
        onClose();
      }, 700);
    } catch (err) {
      clearTimeout(timer1);
      clearTimeout(timer2);
      setStatus('error');
      
      const detailMsg = 
        err.response?.data?.detail || 
        err.message || 
        'Failed to connect to FastAPI backend on http://localhost:8000.';
      setValidationError(`API_ERROR: ${detailMsg}`);
    }
  };

  const handleRetry = () => {
    setValidationError(null);
    setStatus('idle');
    setLoadingProgress(0);
    setLoadingStage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0B101D] rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-white/[0.12] shadow-2xl relative space-y-6 text-white">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center border border-teal-500/30">
              <Upload className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-white font-sans uppercase">
                Upload Medical Report
              </h3>
              <p className="text-xs font-mono text-slate-400">
                PDF, JPG, PNG • FASTAPI BACKEND EXTRACTION
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={status === 'loading'}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. Validation or API Error Alert */}
        {validationError && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-start space-x-3 text-xs sm:text-sm text-rose-200 animate-fadeIn">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="flex-1 space-y-2 font-mono">
              <p className="leading-relaxed">{validationError}</p>
              {status === 'error' && (
                <button
                  onClick={handleRetry}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-rose-600 text-white font-semibold text-xs hover:bg-rose-500 transition-colors uppercase tracking-wider"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retry Upload</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* 2. Loading State */}
        {status === 'loading' ? (
          <div className="py-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mx-auto">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>

            <div className="space-y-2 max-w-sm mx-auto font-mono">
              <h4 className="font-extrabold text-base text-white">
                PROCESSING_ON_BACKEND ({loadingProgress}%)
              </h4>
              <p className="text-xs text-teal-300 min-h-[2rem]">
                {loadingStage}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-[#121A2D] rounded-full h-2 overflow-hidden max-w-md mx-auto border border-white/[0.08]">
              <div 
                className="bg-gradient-to-r from-teal-400 via-cyan-300 to-emerald-400 h-2 rounded-full transition-all duration-300 ease-out shadow-sm shadow-teal-400"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>

            <p className="text-[11px] font-mono text-slate-500 uppercase">
              [FASTAPI: POST /api/reports/analyze]
            </p>
          </div>
        ) : status === 'success' ? (
          /* 3. Success State */
          <div className="py-12 text-center space-y-3 font-mono">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-extrabold text-lg text-white">EXTRACTION_SUCCESSFUL</h4>
            <p className="text-xs text-slate-400">Loading structured report insights...</p>
          </div>
        ) : (
          /* 4. Idle / File Drop State */
          <div className="space-y-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInput}
              accept=".pdf,.png,.jpg,.jpeg"
              className="hidden"
            />

            {/* Dropzone */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 sm:p-10 text-center cursor-pointer transition-all ${
                dragActive
                  ? 'border-teal-400 bg-teal-500/10 scale-[0.99]'
                  : selectedFile
                  ? 'border-teal-500/60 bg-teal-500/5'
                  : 'border-white/[0.12] hover:border-teal-500/50 hover:bg-white/[0.02]'
              }`}
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center border border-teal-500/30">
                {selectedFile ? (
                  <FileCheck className="w-6 h-6" />
                ) : (
                  <Upload className="w-6 h-6" />
                )}
              </div>

              {selectedFile ? (
                <div className="space-y-1">
                  <p className="text-sm font-bold text-white">{selectedFile.name}</p>
                  <p className="text-xs font-mono text-slate-400">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • VALIDATED
                  </p>
                  <p className="text-xs text-teal-400 font-semibold pt-1">
                    Click to select a different file
                  </p>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <p className="text-sm font-bold text-slate-200">
                    Drag and drop your report here, or <span className="text-teal-400 underline">browse</span>
                  </p>
                  <p className="text-xs font-mono text-slate-500">
                    PDF, JPG, PNG (MAX 10MB)
                  </p>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end space-x-3 pt-2 font-mono">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/[0.05] text-xs font-semibold"
              >
                CANCEL
              </button>

              <button
                type="button"
                disabled={!selectedFile}
                onClick={handleStartAnalysis}
                className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 text-xs font-bold tracking-wider uppercase shadow-md shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>UPLOAD_TO_BACKEND</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
