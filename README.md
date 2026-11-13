# ReportSaathi (रिपोर्ट साथी) 🩺

> An empathetic, high-contrast healthcare literacy platform that decodes complex medical laboratory reports into clear, educational insights for patients.

---

## 🌟 Architecture & Features

- **Multi-Format Ingestion**: Dual-engine extraction pipeline:
  - **PyMuPDF (`pymupdf`)**: Direct text-layer extraction for digital PDFs.
  - **Tesseract OCR (`pytesseract` + Pillow)**: High-resolution optical character recognition for scanned PDFs, photos, and camera captures (PNG/JPG).
- **Safe Temporary-File Handling**: Streams incoming multipart uploads into secure temporary files with chunked writing, strict size boundaries (10MB limit), and guaranteed disk deletion via `try...finally`.
- **Evidence-Based Clinical Parsing**: Strictly extracts measured patient values, units, and stated laboratory reference intervals from the document. **Never invents or hallucinates missing report values or reference ranges.**
- **Plain-Language Explanations**: Converts laboratory jargon into everyday analogies with color-coded status badges:
  - 🟢 **Optimal (Normal Range)**
  - 🔴 **Elevated (Above Range)**
  - 🔵 **Below Range (Low)**
- **Doctor Consultation Preparation**: Generates specific, tailored questions for the patient to ask their physician during appointments.
- **Transparency Audit**: Includes an expandable raw document text stream viewer for full clinical traceability.
- **Robust Error Handling**:
  - `400 Bad Request`: Unsupported file formats (e.g., `.docx`, `.txt`) or missing filenames.
  - `413 Payload Too Large`: Files exceeding the 10MB limit.
  - `422 Unprocessable Entity`: Unreadable, blank, or low-contrast scans where no readable text is detected.

---

## 🚀 Live Services

- **Frontend Web App:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://127.0.0.1:8000](http://127.0.0.1:8000)
- **API Health Check:** [http://127.0.0.1:8000/api/health](http://127.0.0.1:8000/api/health)
- **Interactive Swagger Docs:** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## 📦 Requirements & Dependencies

### Backend (`backend/requirements.txt`)
- `fastapi>=0.115.0` & `uvicorn[standard]>=0.30.0`
- `python-multipart>=0.0.12`
- `pymupdf>=1.24.0`
- `pytesseract>=0.3.10` & `pillow>=10.4.0`
- `pydantic>=2.8.0` & `pydantic-settings>=2.4.0`
- `google-genai>=1.0.0` (Optional live AI generation)
- `requests>=2.31.0` (Integration test suite)

### Frontend (`frontend/package.json`)
- `react`, `react-dom`, `vite`
- `tailwindcss`, `lucide-react`, `axios`

---

## ⚙️ Setup & Local Run Instructions

### Terminal 1: Start Backend (FastAPI)
```powershell
# Navigate to backend directory
cd backend

# Install dependencies
pip install -r requirements.txt

# Run the FastAPI server with live reload
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

### Terminal 2: Start Frontend (React + Vite)
```powershell
# Navigate to frontend directory
cd frontend

# Install packages
npm install

# Run the Vite development server
npm run dev
```

### Running Backend Integration Tests
```powershell
python backend/test_api_flow.py
```
This tests health checks, digital PDF extraction, image Tesseract OCR, format validation, and unreadable document error handling.
