from typing import List, Optional
from pydantic import BaseModel, Field

class MetricItem(BaseModel):
    name: str = Field(..., description="Name of the test or biomarker, e.g., Hemoglobin")
    value: str = Field(..., description="Measured patient value as reported in the document, e.g., 10.8")
    unit: Optional[str] = Field(None, description="Unit of measurement, e.g., g/dL, mg/dL")
    reference_range: Optional[str] = Field(None, description="Reported standard reference range from the report, or null if missing.")
    status: str = Field(..., description="'normal', 'low', 'high', or 'inconclusive'")
    interpretation: str = Field(..., description="Simple, non-jargon explanation of what this test does and what this value means.")

class ReportAnalysisResponse(BaseModel):
    status: str = Field(default="success", description="Processing status: 'success' or 'error'")
    filename: Optional[str] = Field(None, description="Original uploaded filename")
    file_type: Optional[str] = Field(None, description="'pdf' or 'image'")
    file_size_bytes: Optional[int] = Field(None, description="Size of the uploaded document in bytes")
    extraction_method: Optional[str] = Field(None, description="'pymupdf_digital', 'tesseract_scanned_pdf', or 'tesseract_image'")
    page_count: Optional[int] = Field(default=1, description="Number of document pages parsed")
    character_count: Optional[int] = Field(default=0, description="Number of characters extracted from document")
    extracted_text: Optional[str] = Field(None, description="Full extracted text from the document for transparency and audit")
    
    report_title: str = Field(..., description="Categorized title of the report, e.g., Complete Blood Count (CBC)")
    patient_summary: str = Field(..., description="Clear, compassionate plain-language summary of what the lab report shows.")
    key_findings: List[str] = Field(default_factory=list, description="Bullet points of the most notable findings.")
    metrics: List[MetricItem] = Field(default_factory=list, description="Extracted individual lab metrics (only those present in text).")
    questions_for_doctor: List[str] = Field(default_factory=list, description="Specific, smart questions the patient should ask their physician.")
    diet_and_lifestyle_notes: List[str] = Field(default_factory=list, description="Educational lifestyle, hydration, or dietary considerations.")
    disclaimer: str = Field(
        default="Notice: ReportSaathi is an educational tool and does NOT provide medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional regarding any medical condition or lab results.",
        description="Mandatory medical and educational disclaimer."
    )
    raw_text: Optional[str] = Field(None, description="Snippet of extracted text for backward compatibility.")
    is_mock: bool = Field(default=False, description="Flag indicating if sample/mock explanation was returned.")

class ExtractionResponse(BaseModel):
    success: bool
    text: str
    page_count: int
    char_count: int
    method: str
