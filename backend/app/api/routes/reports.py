import os
from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from pydantic import BaseModel
from typing import Optional

from app.services.extractor import process_file_safely, validate_file_metadata
from app.services.gemini_service import analyze_report
from app.services.supabase_client import save_report_history
from app.models.schemas import ReportAnalysisResponse, ExtractionResponse

router = APIRouter(prefix="/reports", tags=["reports"])

class AnalyzeTextRequest(BaseModel):
    text: str
    user_id: Optional[str] = None

@router.post("/analyze", response_model=ReportAnalysisResponse)
async def analyze_uploaded_report(
    file: UploadFile = File(...),
    user_id: Optional[str] = Form(None)
):
    """
    Accepts a PDF, JPG, or PNG upload.
    Validates file format and size, uses safe temporary-file handling,
    extracts text with PyMuPDF or Tesseract OCR, and returns structured JSON
    with extracted text and processing status.
    """
    if not file.filename:
        raise HTTPException(status_code=400, detail="Missing uploaded filename.")

    # Validate file extension and MIME type before processing
    validate_file_metadata(file.filename, file.content_type or "")

    try:
        # Process file safely using streaming temporary file
        text, method, page_count, size_bytes = process_file_safely(file.filename, file.file)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected extraction error: {str(e)}")

    # Analyze extracted text without hallucinating missing values
    ext = os.path.splitext(file.filename)[1].lower()
    file_type = "pdf" if ext == ".pdf" else "image"
    
    analysis = analyze_report(text, filename=file.filename)

    # Populate metadata & processing status
    analysis.status = "success"
    analysis.filename = file.filename
    analysis.file_type = file_type
    analysis.file_size_bytes = size_bytes
    analysis.extraction_method = method
    analysis.page_count = page_count
    analysis.character_count = len(text)
    analysis.extracted_text = text
    analysis.raw_text = text[:2000]

    # Save to session/Supabase history
    try:
        save_report_history(analysis.model_dump(), user_id=user_id)
    except Exception:
        pass

    return analysis

@router.post("/extract", response_model=ExtractionResponse)
async def extract_text_only(file: UploadFile = File(...)):
    """Extract raw text from PDF or image using PyMuPDF / Tesseract."""
    if not file.filename:
        raise HTTPException(status_code=400, detail="Missing filename.")

    validate_file_metadata(file.filename, file.content_type or "")
    text, method, page_count, _ = process_file_safely(file.filename, file.file)

    return ExtractionResponse(
        success=True,
        text=text,
        page_count=page_count,
        char_count=len(text),
        method=method
    )

@router.post("/analyze-text", response_model=ReportAnalysisResponse)
async def analyze_raw_text(req: AnalyzeTextRequest):
    """Analyze manually entered or pasted medical report text directly."""
    if not req.text or len(req.text.strip()) < 10:
        raise HTTPException(status_code=400, detail="Please provide at least 10 characters of report text.")

    analysis = analyze_report(req.text, filename="direct_text")
    analysis.status = "success"
    analysis.filename = "Pasted Report Text"
    analysis.file_type = "text"
    analysis.file_size_bytes = len(req.text.encode('utf-8'))
    analysis.extraction_method = "direct_text_input"
    analysis.page_count = 1
    analysis.character_count = len(req.text)
    analysis.extracted_text = req.text
    analysis.raw_text = req.text[:2000]

    try:
        save_report_history(analysis.model_dump(), user_id=req.user_id)
    except Exception:
        pass

    return analysis
