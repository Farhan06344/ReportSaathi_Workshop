import io
import requests
from PIL import Image, ImageDraw
import pymupdf

API_URL = "http://127.0.0.1:8000/api"

def test_health():
    print("\n--- TEST 1: Health Check ---")
    res = requests.get(f"{API_URL}/health")
    assert res.status_code == 200, f"Expected 200, got {res.status_code}"
    data = res.json()
    print("Health response:", data)
    assert data["status"] == "healthy"
    assert data["tesseract_ocr"]["available"] is True
    print("✓ Health Check Passed!")

def test_valid_pdf_upload():
    print("\n--- TEST 2: Valid PDF Upload ---")
    # Create an in-memory PDF with real clinical text
    doc = pymupdf.open()
    page = doc.new_page(width=595, height=842)
    pdf_text = (
        "METROPOLITAN DIAGNOSTIC LABORATORY\n"
        "PATIENT: Jane Doe (Age: 42, Gender: Female)\n"
        "DATE: 12-Nov-2026\n\n"
        "TEST DESCRIPTION               RESULT     UNITS    REFERENCE INTERVAL\n"
        "---------------------------------------------------------------------\n"
        "Hemoglobin (Hb)                11.4       g/dL     12.0 - 15.5  (LOW)\n"
        "Total Leukocyte Count (WBC)    6,800      /cu.mm   4,000 - 11,000\n"
        "Platelet Count                 220,000    /cu.mm   150,000 - 450,000\n"
        "Total Cholesterol              215        mg/dL    < 200        (HIGH)\n"
        "Fasting Blood Glucose          92         mg/dL    70 - 99\n"
    )
    page.insert_text((50, 72), pdf_text, fontsize=11)
    pdf_bytes = doc.tobytes()
    doc.close()

    files = {"file": ("clinical_report.pdf", pdf_bytes, "application/pdf")}
    res = requests.post(f"{API_URL}/reports/analyze", files=files)
    assert res.status_code == 200, f"Expected 200, got {res.status_code}: {res.text}"
    data = res.json()
    print("Extraction Method:", data["extraction_method"])
    print("Characters Extracted:", data["character_count"])
    print("Biomarkers Detected:", len(data["metrics"]))
    for m in data["metrics"]:
        print(f" - {m['name']}: {m['value']} {m['unit']} (Range: {m['reference_range']}) -> Status: {m['status'].upper()}")

    assert data["status"] == "success"
    assert data["extraction_method"] == "pymupdf_digital"
    assert len(data["metrics"]) >= 4
    print("✓ Valid PDF Upload Passed!")

def test_valid_image_ocr_upload():
    print("\n--- TEST 3: Scanned Image Upload (Tesseract OCR) ---")
    img = Image.new("RGB", (700, 320), color=(255, 255, 255))
    draw = ImageDraw.Draw(img)
    text = (
        "APEX HEALTHCARE LABS\n"
        "HEMOGLOBIN: 10.8 g/dL (Reference: 12.0 - 15.5)\n"
        "TOTAL CHOLESTEROL: 228 mg/dL (Reference: < 200)\n"
        "FASTING BLOOD SUGAR: 95 mg/dL (Reference: 70 - 99)\n"
    )
    draw.text((25, 30), text, fill=(0, 0, 0))
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    png_bytes = buf.getvalue()

    files = {"file": ("scanned_lab.png", png_bytes, "image/png")}
    res = requests.post(f"{API_URL}/reports/analyze", files=files)
    assert res.status_code == 200, f"Expected 200, got {res.status_code}: {res.text}"
    data = res.json()
    print("Extraction Method:", data["extraction_method"])
    print("Biomarkers Detected:", len(data["metrics"]))
    for m in data["metrics"]:
        print(f" - {m['name']}: {m['value']} {m['unit']} (Range: {m['reference_range']}) -> Status: {m['status'].upper()}")

    assert data["status"] == "success"
    assert data["extraction_method"] == "tesseract_image"
    print("✓ Scanned Image OCR Upload Passed!")

def test_unsupported_file_format():
    print("\n--- TEST 4: Unsupported Format Rejection ---")
    files = {"file": ("document.docx", b"dummy word content", "application/vnd.openxmlformats-officedocument.wordprocessingml.document")}
    res = requests.post(f"{API_URL}/reports/analyze", files=files)
    print("Status code:", res.status_code)
    print("Response detail:", res.json().get("detail"))
    assert res.status_code == 400
    assert "Unsupported file format '.docx'" in res.json().get("detail")
    print("✓ Unsupported File Format Correctly Blocked with 400!")

def test_unreadable_blank_image():
    print("\n--- TEST 5: Unreadable / Blank Document Handling ---")
    # Pure white 100x100 blank image
    img = Image.new("RGB", (100, 100), color=(255, 255, 255))
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    blank_bytes = buf.getvalue()

    files = {"file": ("blank_scan.png", blank_bytes, "image/png")}
    res = requests.post(f"{API_URL}/reports/analyze", files=files)
    print("Status code:", res.status_code)
    print("Response detail:", res.json().get("detail"))
    assert res.status_code == 422
    assert "Unable to detect readable text" in res.json().get("detail")
    print("✓ Blank / Unreadable Image Correctly Handled with 422!")

if __name__ == "__main__":
    test_health()
    test_valid_pdf_upload()
    test_valid_image_ocr_upload()
    test_unsupported_file_format()
    test_unreadable_blank_image()
    print("\n==========================================")
    print("🎉 ALL 5 BACKEND INTEGRATION TESTS PASSED!")
    print("==========================================")
