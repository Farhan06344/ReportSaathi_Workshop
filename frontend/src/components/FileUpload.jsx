import React, { useState, useRef } from 'react';
import { Upload, FileText, Image as ImageIcon, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import { analyzeReportFile, analyzeReportText } from '../services/api';

export default function FileUpload({ onAnalysisComplete, onSelectSample }) {
  const [activeInputType, setActiveInputType] = useState('file'); // 'file' | 'text'
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [pastedText, setPastedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (file) => {
    setError(null);
    const validExtensions = ['.pdf', '.png', '.jpg', '.jpeg', '.webp'];
    const isExtensionValid = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));

    if (!isExtensionValid) {
      setError('Please upload a PDF document or an image file (PNG, JPG, WEBP).');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setError('File size exceeds 15MB limit.');
      return;
    }

    setSelectedFile(file);
  };

  const handleProcessFile = async () => {
    if (!selectedFile) return;
    setError(null);
    setLoading(true);
    setLoadingStep('Extracting text with PyMuPDF & Tesseract OCR...');

    try {
      setTimeout(() => {
        setLoadingStep('Simplifying clinical metrics with AI...');
      }, 1500);

      const result = await analyzeReportFile(selectedFile);
      onAnalysisComplete(result);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.detail || 
        'Could not parse report. Please verify the backend is running and the file is legible.'
      );
    } finally {
      setLoading(false);
      setLoadingStep('');
    }
  };

  const handleProcessText = async () => {
    if (!pastedText.trim() || pastedText.trim().length < 15) {
      setError('Please enter at least 15 characters of lab report text.');
      return;
    }

    setError(null);
    setLoading(true);
    setLoadingStep('Analyzing laboratory text with AI...');

    try {
      const result = await analyzeReportText(pastedText);
      onAnalysisComplete(result);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || 'Could not analyze text.');
    } finally {
      setLoading(false);
      setLoadingStep('');
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
      {/* Tab Selector */}
      <div className="flex items-center space-x-2 p-1 bg-slate-100 rounded-2xl w-fit mx-auto mb-6">
        <button
          onClick={() => { setActiveInputType('file'); setError(null); }}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeInputType === 'file'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Upload className="w-4 h-4" />
          <span>Upload PDF or Image</span>
        </button>

        <button
          onClick={() => { setActiveInputType('text'); setError(null); }}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeInputType === 'text'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Paste Lab Text</span>
        </button>
      </div>

      {error && (
        <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-start space-x-2.5 text-xs sm:text-sm text-rose-800 animate-shake">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="py-16 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-600 animate-pulse">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Analyzing Your Report</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">{loadingStep}</p>
          </div>
          <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
            Translating complex medical values into easy-to-read educational takeaways...
          </p>
        </div>
      ) : activeInputType === 'file' ? (
        <div>
          {/* Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-brand-500 bg-brand-50/50 scale-[0.99]'
                : selectedFile
                ? 'border-brand-400 bg-brand-50/20'
                : 'border-slate-200 hover:border-brand-400 hover:bg-slate-50/70'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.png,.jpg,.jpeg,.webp"
              className="hidden"
            />

            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center border border-brand-100 shadow-sm">
              {selectedFile ? (
                <FileText className="w-7 h-7" />
              ) : (
                <Upload className="w-7 h-7" />
              )}
            </div>

            {selectedFile ? (
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-900">{selectedFile.name}</p>
                <p className="text-xs text-slate-500">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to analyze
                </p>
                <p className="text-xs text-brand-600 font-semibold pt-2">
                  Click or drag another file to replace
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-base font-bold text-slate-800">
                  Drag and drop your medical report here
                </p>
                <p className="text-xs text-slate-500">
                  Supports PDF documents, or scanned photos (PNG, JPG, WEBP) up to 15MB
                </p>
                <span className="inline-block mt-2 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg">
                  Browse Files
                </span>
              </div>
            )}
          </div>

          {/* Action Button */}
          {selectedFile && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleProcessFile}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-teal-600 text-white font-bold text-sm shadow-md hover:from-brand-700 hover:to-teal-700 transition-all hover:scale-[1.01]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Explain This Report</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Text Paste Option */
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Paste Blood Test / Lab Results Text
            </label>
            <textarea
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              rows={8}
              placeholder="e.g.&#10;HEMOGLOBIN: 11.2 g/dL (Reference Range: 12.0 - 15.5)&#10;TOTAL CHOLESTEROL: 218 mg/dL (Reference Range: < 200)&#10;FASTING BLOOD GLUCOSE: 95 mg/dL (Reference Range: 70 - 99)..."
              className="w-full p-4 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleProcessText}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-sm shadow-md hover:bg-slate-800 transition-all"
            >
              <Sparkles className="w-4 h-4 text-brand-400" />
              <span>Analyze Text</span>
            </button>
          </div>
        </div>
      )}

      {/* Quick Demo Previews */}
      <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <span>No report on hand? Test with an instant sample:</span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onSelectSample('cbc')}
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-brand-50 hover:text-brand-700 font-medium transition-colors"
          >
            🩸 Complete Blood Count (CBC)
          </button>
          <button
            onClick={() => onSelectSample('lipid')}
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-brand-50 hover:text-brand-700 font-medium transition-colors"
          >
            🫀 Lipid & Cholesterol
          </button>
          <button
            onClick={() => onSelectSample('diabetes')}
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-brand-50 hover:text-brand-700 font-medium transition-colors"
          >
            🧪 Diabetes / Glucose
          </button>
        </div>
      </div>
    </div>
  );
}
