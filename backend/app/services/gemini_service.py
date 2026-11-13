import json
import logging
from typing import Optional
from google import genai
from google.genai import types

from app.core.config import settings
from app.models.schemas import ReportAnalysisResponse, MetricItem
from app.services.report_parser import build_deterministic_analysis

logger = logging.getLogger(__name__)

SYSTEM_PROMPT = """
You are ReportSaathi, an empathetic, highly knowledgeable medical educator and clinical communication assistant.
Your goal is to explain laboratory test reports in simple, patient-friendly, educational language.

CRITICAL CLINICAL & ETHICAL DIRECTIVES:
1. ABSOLUTELY NO HALLUCINATIONS: Rely ONLY on the numbers and findings visible in the provided report text. NEVER invent missing report values or reference ranges. If a reference range is not stated in the report, set reference_range to null.
2. EDUCATIONAL ONLY: You explain findings clearly. You NEVER provide a definitive clinical diagnosis or prescribe treatment or medications.
3. CONTEXTUAL INTERPRETATION:
   - For every biomarker found, state the measured value, units, and the standard reference range from the report (if present). Status must be "normal", "high", "low", or "inconclusive".
   - Explain what each biomarker does in everyday terms (e.g., "Hemoglobin is the protein in your red blood cells that carries oxygen from your lungs to the rest of your body").
4. EMPATHY & CLARITY: Avoid alarming medical jargon. Use reassuring, clear analogies.
5. ACTIONABLE NEXT STEPS: Provide concrete, thoughtful questions the patient can ask their physician during their appointment.
6. RETURN STRICT JSON conforming to the requested schema.
"""

def analyze_report(extracted_text: str, filename: str = "report") -> ReportAnalysisResponse:
    """
    Analyze extracted medical text using Gemini API when configured,
    or our strict deterministic evidence-based parser that never invents missing values.
    """
    # If no Gemini API key configured, use deterministic parsing directly
    if not settings.GEMINI_API_KEY or settings.GEMINI_API_KEY.strip() == "":
        logger.info("GEMINI_API_KEY not configured. Using deterministic clinical parser.")
        return build_deterministic_analysis(extracted_text, filename)

    prompt = f"""
Analyze the following extracted medical laboratory report text and explain it for the patient:

--- REPORT TEXT START ---
{extracted_text}
--- REPORT TEXT END ---

Provide your response in JSON matching the required schema:
- report_title (string)
- patient_summary (string)
- key_findings (array of strings)
- metrics (array of objects: name, value, unit, reference_range, status ['normal'|'low'|'high'|'inconclusive'], interpretation)
- questions_for_doctor (array of strings)
- diet_and_lifestyle_notes (array of strings)
- disclaimer (string)

CRITICAL: NEVER invent missing report values or reference ranges. If not stated, set reference_range to null.
"""

    try:
        client = genai.Client(api_key=settings.GEMINI_API_KEY)
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_PROMPT,
                response_mime_type="application/json",
                response_schema=ReportAnalysisResponse,
                temperature=0.1,
            ),
        )
        
        response_json = json.loads(response.text)
        result = ReportAnalysisResponse(**response_json)
        result.raw_text = extracted_text[:2000]
        result.extracted_text = extracted_text
        result.is_mock = False
        return result
    except Exception as e:
        logger.error(f"Error calling Gemini API: {e}. Falling back to deterministic clinical parser.")
        fallback = build_deterministic_analysis(extracted_text, filename)
        return fallback
