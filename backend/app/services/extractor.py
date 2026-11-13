import os
import io
import shutil
import tempfile
import pymupdf
from PIL import Image
import pytesseract
from typing import Tuple, Dict, Any
from fastapi import HTTPException

# Allowed extensions and MIME types
ALLOWED_EXTENSIONS = {".pdf", ".png", ".jpg", ".jpeg"}
ALLOWED_MIME_TYPES = {"application/pdf", "image/png", "image/jpeg", "image/pjpeg"}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB

def validate_file_metadata(filename: str, content_type: str = ""):
    """Validate file extension and content type."""
    if not filename:
        raise HTTPException(status_code=400, detail="Missing filename.")

    ext = os.path.splitext(filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file format '{ext}'. Only PDF, JPG, and PNG files are accepted."
        )

    if content_type and content_type.lower() not in ALLOWED_MIME_TYPES:
        # Some browsers send generic octet-stream, so allow if extension is valid
        if content_type.lower() != "application/octet-stream":
            raise HTTPException(
                status_code=400,
                detail=f"Unsupported content type '{content_type}'. Please upload a valid PDF, JPG, or PNG."
            )

def extract_text_from_temp_image(tmp_path: str) -> Tuple[str, str, int]:
    """Extract text from an image file using Tesseract OCR."""
    try:
        image = Image.open(tmp_path)
        if image.mode not in ("RGB", "L"):
            image = image.convert("RGB")
        text = pytesseract.image_to_string(image)
        return text.strip(), "tesseract_image", 1
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Failed to read image file. The file may be corrupt or not a valid image. Details: {str(e)}"
        )

def extract_text_from_temp_pdf(tmp_path: str) -> Tuple[str, str, int]:
    """
    Extract text from a PDF file.
    Attempts digital text stream extraction first with PyMuPDF.
    If digital text is sparse or absent (scanned PDF), renders pages to images and runs Tesseract OCR.
    """
    try:
        doc = pymupdf.open(tmp_path)
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Failed to parse PDF file. The document may be corrupted or encrypted. Details: {str(e)}"
        )

    page_count = len(doc)
    if page_count == 0:
        doc.close()
        raise HTTPException(
            status_code=422,
            detail="The uploaded PDF document contains no pages."
        )

    text_chunks = []
    for page in doc:
        text_chunks.append(page.get_text())

    full_digital_text = "\n".join(text_chunks).strip()

    # If digital text is rich enough (averaging >= 30 chars per page), use it
    if len(full_digital_text) >= max(30, page_count * 25):
        doc.close()
        return full_digital_text, "pymupdf_digital", page_count

    # Fallback to Tesseract OCR for scanned PDF
    ocr_chunks = []
    for page_idx in range(page_count):
        page = doc[page_idx]
        pix = page.get_pixmap(dpi=150)
        img = Image.open(io.BytesIO(pix.tobytes("png")))
        page_text = pytesseract.image_to_string(img)
        if page_text.strip():
            ocr_chunks.append(f"--- Page {page_idx + 1} ---\n{page_text.strip()}")

    doc.close()
    ocr_result = "\n".join(ocr_chunks).strip()
    return ocr_result, "tesseract_scanned_pdf", page_count

def process_file_safely(filename: str, file_obj) -> Tuple[str, str, int, int]:
    """
    Saves uploaded file to a secure temporary file, enforces size limit,
    extracts text using PyMuPDF / Tesseract, and guarantees temporary file cleanup.
    Returns: (extracted_text, extraction_method, page_count, file_size_bytes)
    """
    validate_file_metadata(filename)
    
    ext = os.path.splitext(filename)[1].lower()
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=ext)
    temp_path = temp_file.name
    total_size = 0

    try:
        # Stream file to disk while enforcing size limit
        while True:
            chunk = file_obj.read(1024 * 1024)  # 1MB chunks
            if not chunk:
                break
            total_size += len(chunk)
            if total_size > MAX_FILE_SIZE:
                raise HTTPException(
                    status_code=413,
                    detail=f"File size exceeds the 10MB limit (uploaded: {(total_size / (1024 * 1024)):.2f}MB). Please upload a smaller file."
                )
            temp_file.write(chunk)
            
        temp_file.flush()
        temp_file.close()

        if total_size == 0:
            raise HTTPException(status_code=400, detail="Uploaded file is empty (0 bytes).")

        # Extract text based on file format
        if ext == ".pdf":
            text, method, page_count = extract_text_from_temp_pdf(temp_path)
        else:
            text, method, page_count = extract_text_from_temp_image(temp_path)

        # Validate that text was actually detected
        if not text or len(text.strip()) < 10:
            raise HTTPException(
                status_code=422,
                detail="Unable to detect readable text in the uploaded document. The file may be blank, blurry, unreadable, or lack recognizable text."
            )

        return text, method, page_count, total_size

    finally:
        # Guarantee temporary file is deleted from disk
        if os.path.exists(temp_path):
            try:
                os.unlink(temp_path)
            except Exception:
                pass
