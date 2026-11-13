import React from 'react';
import { X, Sparkles, FileText, ArrowRight } from 'lucide-react';

export const SAMPLE_REPORTS = {
  cbc: {
    title: "Complete Blood Count (CBC) Panel",
    category: "Hematology",
    description: "Evaluates cellular components of blood including red blood cells, white blood cells, and platelets.",
    text: `METROPOLITAN CLINICAL LABORATORY
PATIENT: John Doe (Age: 38, Gender: Male)
DATE OF COLLECTION: 12-Nov-2026

TEST DESCRIPTION               RESULT     UNITS       REFERENCE INTERVAL
-----------------------------------------------------------------------
Hemoglobin (Hb)                11.2       g/dL        13.5 - 17.5       (LOW)
RBC Count                      4.10       mil/uL      4.50 - 5.90       (LOW)
Packed Cell Volume (PCV/HCT)   34.8       %           41.0 - 53.0       (LOW)
Total Leukocyte Count (WBC)    7,400      /cu.mm      4,000 - 11,000    (NORMAL)
Neutrophils                    62         %           40 - 75           (NORMAL)
Lymphocytes                    28         %           20 - 45           (NORMAL)
Monocytes                      6          %           2 - 10            (NORMAL)
Eosinophils                    4          %           1 - 6             (NORMAL)
Basophils                      0.5        %           0 - 2             (NORMAL)
Platelet Count                 225,000    /cu.mm      150,000 - 450,000 (NORMAL)
MCV                            76.2       fL          80.0 - 100.0      (LOW)
MCH                            24.5       pg          27.0 - 33.0       (LOW)
MCHC                           31.2       g/dL        32.0 - 36.0       (LOW)
RDW                            15.8       %           11.5 - 14.5       (HIGH)
`
  },
  lipid: {
    title: "Comprehensive Lipid Profile",
    category: "Cardiovascular Health",
    description: "Assesses cholesterol levels, triglycerides, and cardiovascular risk factors.",
    text: `APEX PATHOLOGY & HEART INSTITUTE
PATIENT: Jane Smith (Age: 45, Gender: Female)
FASTING STATUS: 12 Hours Fasting

TEST DESCRIPTION               RESULT     UNITS       REFERENCE INTERVAL
-----------------------------------------------------------------------
Total Cholesterol              232        mg/dL       < 200             (HIGH)
HDL Cholesterol ("Good")       48         mg/dL       > 50              (LOW)
LDL Cholesterol ("Bad")        152        mg/dL       < 100             (HIGH)
VLDL Cholesterol               32         mg/dL       5 - 30            (HIGH)
Triglycerides                  160        mg/dL       < 150             (HIGH)
Total Chol / HDL Ratio         4.83       Ratio       < 4.5             (HIGH)
`
  },
  diabetes: {
    title: "Glycemic & Metabolic Health Panel",
    category: "Endocrinology",
    description: "Evaluates blood glucose levels and 3-month average HbA1c control.",
    text: `DIAGNOSTIC EXCELLENCE LABS
PATIENT: Robert Miller (Age: 52, Gender: Male)
REPORT DATE: 10-Nov-2026

TEST DESCRIPTION               RESULT     UNITS       REFERENCE INTERVAL
-----------------------------------------------------------------------
Fasting Blood Glucose (FBS)    118        mg/dL       70 - 99           (HIGH)
Post-Prandial Glucose (PPBS)   165        mg/dL       < 140             (HIGH)
Glycated Hemoglobin (HbA1c)    6.2        %           4.0 - 5.6         (HIGH - Pre-diabetes)
Average Blood Glucose (eAG)    131        mg/dL       < 114
Serum Creatinine               0.95       mg/dL       0.70 - 1.20       (NORMAL)
eGFR                           92         mL/min      > 60              (NORMAL)
`
  }
};

export default function SampleReportsModal({ isOpen, onClose, onSelectSample }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <span className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">Try a Sample Medical Report</h3>
              <p className="text-xs text-slate-500">Pick any sample below to preview how ReportSaathi explains lab work</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {Object.entries(SAMPLE_REPORTS).map(([key, sample]) => (
            <div
              key={key}
              onClick={() => {
                onSelectSample(key);
                onClose();
              }}
              className="group p-4 rounded-2xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50/30 cursor-pointer transition-all flex items-center justify-between gap-4"
            >
              <div className="flex items-start space-x-3.5">
                <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-brand-100 text-slate-600 group-hover:text-brand-700 flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-bold text-sm text-slate-900 group-hover:text-brand-900">{sample.title}</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-slate-100 text-slate-600">
                      {sample.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{sample.description}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600 shrink-0 group-hover:translate-x-1 transition-all" />
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-slate-600 font-medium"
          >
            Cancel and upload my own file
          </button>
        </div>
      </div>
    </div>
  );
}
