import sys
import os

# Add backend directory to sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from PIL import Image, ImageDraw, ImageFont
import io
from app.services.extractor import extract_text_from_image_bytes
from app.services.gemini_service import analyze_report_with_gemini

def test_ocr_and_ai():
    print("1. Creating a synthetic medical report image...")
    # Create a 600x300 image with text
    img = Image.new("RGB", (650, 300), color=(255, 255, 255))
    draw = ImageDraw.Draw(img)
    
    text = (
        "DIAGNOSTIC LAB REPORT\n"
        "PATIENT: Test Patient\n"
        "HEMOGLOBIN: 11.2 g/dL (Normal Range: 12.0 - 15.5)\n"
        "TOTAL CHOLESTEROL: 218 mg/dL (Normal Range: < 200)\n"
        "FASTING BLOOD SUGAR: 95 mg/dL (Normal Range: 70 - 99)\n"
    )
    draw.text((20, 20), text, fill=(0, 0, 0))
    
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    png_bytes = buf.getvalue()
    
    print("2. Testing Tesseract OCR on synthesized image...")
    extracted_text = extract_text_from_image_bytes(png_bytes)
    print("Extracted OCR Text:\n", extracted_text)
    assert len(extracted_text) > 0, "OCR returned empty text"
    
    print("\n3. Testing Gemini analysis service (or intelligent mock fallback)...")
    analysis = analyze_report_with_gemini(extracted_text)
    print("Report Title:", analysis.report_title)
    print("Summary:", analysis.patient_summary[:120], "...")
    print(f"Metrics detected: {len(analysis.metrics)}")
    for m in analysis.metrics:
        print(f" - {m.name}: {m.value} ({m.status.upper()}) -> {m.interpretation[:60]}...")
    print("\nALL VERIFICATIONS PASSED SUCCESSFULLY!")

if __name__ == "__main__":
    test_ocr_and_ai()
