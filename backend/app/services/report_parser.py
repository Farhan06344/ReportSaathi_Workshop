import re
import logging
from typing import List, Optional, Tuple
from app.models.schemas import MetricItem, ReportAnalysisResponse

logger = logging.getLogger(__name__)

# Biomarker definitions for deterministic matching from actual extracted text
KNOWN_BIOMARKERS = [
    {
        "patterns": [r"\bhemoglobin\b", r"\bhb\b", r"\bhgb\b"],
        "name": "Hemoglobin (Hb)",
        "default_unit": "g/dL",
        "category": "Hematology",
        "desc": "Hemoglobin is the iron-rich protein in red blood cells that transports oxygen from your lungs to the rest of your body."
    },
    {
        "patterns": [r"\brbc\b", r"\bred\s+blood\s+cell"],
        "name": "Red Blood Cell Count (RBC)",
        "default_unit": "mil/uL",
        "category": "Hematology",
        "desc": "Red blood cells carry oxygen throughout the body. Low counts can contribute to feelings of fatigue or low energy."
    },
    {
        "patterns": [r"\bwbc\b", r"\bwhite\s+blood\s+cell", r"\btotal\s+leukocyte"],
        "name": "Total White Blood Cells (WBC)",
        "default_unit": "/cu.mm",
        "category": "Immune Health",
        "desc": "White blood cells defend your body against infections and inflammation."
    },
    {
        "patterns": [r"\bplatelet\b", r"\bplt\b"],
        "name": "Platelet Count",
        "default_unit": "/cu.mm",
        "category": "Blood Clotting",
        "desc": "Platelets are microscopic cell fragments that cluster to form blood clots when you have an injury."
    },
    {
        "patterns": [r"\bmcv\b", r"\bmean\s+corpuscular\s+volume"],
        "name": "MCV (Mean Corpuscular Volume)",
        "default_unit": "fL",
        "category": "Hematology",
        "desc": "MCV measures the average physical size of your red blood cells."
    },
    {
        "patterns": [r"\bmch\b", r"\bmean\s+corpuscular\s+hemoglobin\b"],
        "name": "MCH",
        "default_unit": "pg",
        "category": "Hematology",
        "desc": "MCH measures the average amount of hemoglobin inside a single red blood cell."
    },
    {
        "patterns": [r"\bmchc\b"],
        "name": "MCHC",
        "default_unit": "g/dL",
        "category": "Hematology",
        "desc": "MCHC measures the concentration of hemoglobin relative to the size of red blood cells."
    },
    {
        "patterns": [r"\brdw\b", r"\bred\s+cell\s+distribution"],
        "name": "RDW (Red Cell Distribution Width)",
        "default_unit": "%",
        "category": "Hematology",
        "desc": "RDW measures the variation in red blood cell volume and size."
    },
    {
        "patterns": [r"\bhematocrit\b", r"\bpcv\b", r"\bhct\b"],
        "name": "Hematocrit (PCV)",
        "default_unit": "%",
        "category": "Hematology",
        "desc": "Hematocrit represents the percentage of whole blood made up of red blood cells."
    },
    {
        "patterns": [r"\bneutrophil"],
        "name": "Neutrophils",
        "default_unit": "%",
        "category": "Immune Health",
        "desc": "Neutrophils are the first-responder immune cells that fight bacterial pathogens."
    },
    {
        "patterns": [r"\blymphocyte"],
        "name": "Lymphocytes",
        "default_unit": "%",
        "category": "Immune Health",
        "desc": "Lymphocytes produce antibodies and recognize past infections."
    },
    {
        "patterns": [r"\beosinophil"],
        "name": "Eosinophils",
        "default_unit": "%",
        "category": "Immune Health",
        "desc": "Eosinophils respond to allergies and defend against parasitic infections."
    },
    {
        "patterns": [r"\bmonocyte"],
        "name": "Monocytes",
        "default_unit": "%",
        "category": "Immune Health",
        "desc": "Monocytes clear cellular debris and present antigens to other immune cells."
    },
    {
        "patterns": [r"\bbasophil"],
        "name": "Basophils",
        "default_unit": "%",
        "category": "Immune Health",
        "desc": "Basophils release histamine during allergic inflammatory responses."
    },
    {
        "patterns": [r"\btotal\s+cholesterol", r"\bcholesterol,\s+total"],
        "name": "Total Cholesterol",
        "default_unit": "mg/dL",
        "category": "Lipids",
        "desc": "Total cholesterol measures all the cholesterol particles circulating in your bloodstream."
    },
    {
        "patterns": [r"\bhdl\b", r"\bhigh\s+density\s+lipoprotein"],
        "name": "HDL Cholesterol ('Good')",
        "default_unit": "mg/dL",
        "category": "Lipids",
        "desc": "HDL scavenges excess cholesterol from blood vessels and carries it back to the liver."
    },
    {
        "patterns": [r"\bldl\b", r"\blow\s+density\s+lipoprotein"],
        "name": "LDL Cholesterol ('Bad')",
        "default_unit": "mg/dL",
        "category": "Lipids",
        "desc": "Elevated LDL can deposit along arterial walls over time if not monitored."
    },
    {
        "patterns": [r"\btriglyceride"],
        "name": "Triglycerides",
        "default_unit": "mg/dL",
        "category": "Lipids",
        "desc": "Triglycerides are the main type of stored fat from calories your body doesn't need to burn right away."
    },
    {
        "patterns": [r"\bfasting\s+blood\s+(glucose|sugar)", r"\bfbs\b", r"\bglucose,\s+fasting"],
        "name": "Fasting Blood Glucose",
        "default_unit": "mg/dL",
        "category": "Metabolic",
        "desc": "Fasting blood sugar measures your baseline glucose level after an overnight fast."
    },
    {
        "patterns": [r"\bhba1c\b", r"\bglycated\s+hemoglobin"],
        "name": "Glycated Hemoglobin (HbA1c)",
        "default_unit": "%",
        "category": "Metabolic",
        "desc": "HbA1c provides an estimate of your average blood sugar control over the past 2 to 3 months."
    },
    {
        "patterns": [r"\bcreatinine\b", r"\bserum\s+creatinine"],
        "name": "Serum Creatinine",
        "default_unit": "mg/dL",
        "category": "Kidney Function",
        "desc": "Creatinine is a muscle breakdown byproduct filtered out exclusively by healthy kidneys."
    },
    {
        "patterns": [r"\begfr\b", r"\bglom.*filtration"],
        "name": "eGFR (Kidney Filtration)",
        "default_unit": "mL/min",
        "category": "Kidney Function",
        "desc": "eGFR calculates how efficiently your kidneys are filtering waste products from your blood."
    },
    {
        "patterns": [r"\bbun\b", r"\bblood\s+urea\s+nitrogen"],
        "name": "Blood Urea Nitrogen (BUN)",
        "default_unit": "mg/dL",
        "category": "Kidney Function",
        "desc": "BUN evaluates kidney and liver function and is sensitive to hydration."
    },
    {
        "patterns": [r"\bsodium\b"],
        "name": "Serum Sodium",
        "default_unit": "mEq/L",
        "category": "Electrolytes",
        "desc": "Sodium maintains proper fluid balance, nerve impulses, and blood pressure regulation."
    },
    {
        "patterns": [r"\bpotassium\b"],
        "name": "Serum Potassium",
        "default_unit": "mEq/L",
        "category": "Electrolytes",
        "desc": "Potassium is essential for cardiovascular rhythm, nerve conduction, and muscle function."
    },
    {
        "patterns": [r"\balt\b", r"\bsgpt\b", r"\balanine\s+amino"],
        "name": "ALT (Liver Enzyme)",
        "default_unit": "U/L",
        "category": "Liver Function",
        "desc": "ALT is an enzyme found mostly in liver cells; healthy levels indicate normal liver cell integrity."
    },
    {
        "patterns": [r"\bast\b", r"\bsgot\b", r"\baspartate\s+amino"],
        "name": "AST (Liver Enzyme)",
        "default_unit": "U/L",
        "category": "Liver Function",
        "desc": "AST is an enzyme found in liver and muscle tissue."
    }
]

def parse_range_and_evaluate(val_str: str, range_str: Optional[str]) -> str:
    """
    Safely compare numeric value against extracted reference range.
    Returns 'normal', 'low', 'high', or 'inconclusive'.
    NEVER invents or guesses a range if not present.
    """
    if not range_str or not range_str.strip():
        return "inconclusive"

    try:
        # Extract numerical value (handling commas e.g., 6,800 or 150,000)
        clean_val = re.sub(r"[^\d.]", "", val_str)
        if not clean_val:
            return "inconclusive"
        val = float(clean_val)

        # Pattern: Low - High (e.g., 12.0 - 15.5 or 4,000 - 11,000)
        range_match = re.search(r"([\d,.]+)\s*[-–—to]+\s*([\d,.]+)", range_str, re.IGNORECASE)
        if range_match:
            low_bound = float(range_match.group(1).replace(",", ""))
            high_bound = float(range_match.group(2).replace(",", ""))
            if val < low_bound:
                return "low"
            elif val > high_bound:
                return "high"
            else:
                return "normal"

        # Pattern: < Max (e.g., < 200)
        less_match = re.search(r"[<≤]\s*([\d,.]+)", range_str)
        if less_match:
            max_bound = float(less_match.group(1).replace(",", ""))
            return "high" if val > max_bound else "normal"

        # Pattern: > Min (e.g., > 50)
        greater_match = re.search(r"[>≥]\s*([\d,.]+)", range_str)
        if greater_match:
            min_bound = float(greater_match.group(1).replace(",", ""))
            return "low" if val < min_bound else "normal"

    except Exception:
        pass

    return "inconclusive"

def extract_biomarkers_from_text(raw_text: str) -> List[MetricItem]:
    """
    Strict parser: extracts ONLY biomarkers and reference ranges that actually exist in the text.
    Never invents missing values or reference ranges.
    """
    lines = raw_text.splitlines()
    detected_metrics = []
    seen_names = set()

    for line in lines:
        clean_line = line.strip()
        if not clean_line or len(clean_line) < 4:
            continue

        for biomarker in KNOWN_BIOMARKERS:
            b_name = biomarker["name"]
            if b_name in seen_names:
                continue

            matched = False
            for pattern in biomarker["patterns"]:
                if re.search(pattern, clean_line, re.IGNORECASE):
                    matched = True
                    break

            if not matched:
                continue

            # Found a match on this line, let's extract:
            # 1. Measured value
            # 2. Reference range (if present on the same line)
            
            # Find numbers on the line
            numbers = re.findall(r"(\d+(?:,\d+)*(?:\.\d+)?)", clean_line)
            if not numbers:
                continue

            # First number after the biomarker name is typically the measured value
            measured_value = numbers[0]

            # Try to find a reference range on this line (e.g., 12.0 - 15.5 or < 200 or 70 - 99)
            ref_range = None
            range_match = re.search(r"(\d+(?:,\d+)*(?:\.\d+)?\s*[-–—to]\s*\d+(?:,\d+)*(?:\.\d+)?)", clean_line, re.IGNORECASE)
            if range_match:
                ref_range = range_match.group(1).strip()
            else:
                bound_match = re.search(r"([<>≤≥]\s*\d+(?:,\d+)*(?:\.\d+)?)", clean_line)
                if bound_match:
                    ref_range = bound_match.group(1).strip()

            # Detect explicit flags if marked in text: (LOW), (HIGH), (NORMAL)
            explicit_status = None
            if re.search(r"\b(low|decreased|below)\b", clean_line, re.IGNORECASE):
                explicit_status = "low"
            elif re.search(r"\b(high|elevated|above)\b", clean_line, re.IGNORECASE):
                explicit_status = "high"
            elif re.search(r"\b(normal|optimal)\b", clean_line, re.IGNORECASE):
                explicit_status = "normal"

            # Compute or assign status
            status = explicit_status or parse_range_and_evaluate(measured_value, ref_range)

            # Determine unit if visible in text
            unit = None
            for u in ["g/dL", "mg/dL", "mil/uL", "/cu.mm", "fL", "pg", "mL/min", "mEq/L", "U/L", "%"]:
                if u.lower() in clean_line.lower():
                    unit = u
                    break
            if not unit:
                unit = biomarker.get("default_unit")

            interpretation = biomarker["desc"]
            if status == "low":
                interpretation += f" Your result ({measured_value} {unit or ''}) is lower than the reference interval."
            elif status == "high":
                interpretation += f" Your result ({measured_value} {unit or ''}) is higher than the reference interval."
            elif status == "normal":
                interpretation += f" Your result ({measured_value} {unit or ''}) is within the standard reference range."

            detected_metrics.append(
                MetricItem(
                    name=b_name,
                    value=measured_value,
                    unit=unit,
                    reference_range=ref_range,  # None if not present in text!
                    status=status,
                    interpretation=interpretation
                )
            )
            seen_names.add(b_name)

    return detected_metrics

def build_deterministic_analysis(raw_text: str, filename: str) -> ReportAnalysisResponse:
    """
    Builds a faithful, evidence-based educational report from the actual extracted text.
    Never invents missing values or reference ranges.
    """
    metrics = extract_biomarkers_from_text(raw_text)

    # Determine report title from keywords
    lower_text = raw_text.lower()
    if "complete blood count" in lower_text or "cbc" in lower_text or "hemoglobin" in lower_text:
        title = "Complete Blood Count (CBC) Panel"
    elif "lipid" in lower_text or "cholesterol" in lower_text:
        title = "Lipid & Cardiovascular Health Profile"
    elif "metabolic" in lower_text or "glucose" in lower_text or "creatinine" in lower_text:
        title = "Metabolic & Organ Function Panel"
    elif "thyroid" in lower_text or "tsh" in lower_text:
        title = "Thyroid Function Panel"
    else:
        title = "Laboratory Medical Report Analysis"

    attention_metrics = [m for m in metrics if m.status in ("low", "high")]
    normal_metrics = [m for m in metrics if m.status == "normal"]

    if metrics:
        if attention_metrics:
            summary = (
                f"We extracted {len(metrics)} biomarker test values directly from your document. "
                f"Most values are in healthy ranges, but {len(attention_metrics)} marker(s) ({', '.join(m.name for m in attention_metrics)}) "
                "were outside the stated reference intervals. Slight variations are common and should be reviewed with your doctor in the context of your overall health."
            )
        else:
            summary = (
                f"We extracted {len(metrics)} biomarker test values from your report. All detected tests "
                "appear within standard reference intervals. Remember that labs and reference standards can vary, so always confirm with your physician."
            )
    else:
        summary = (
            "The document was successfully converted into readable text. Specific routine test line items "
            "were reviewed. Please see the raw extracted text below for complete details and discuss the full report with your doctor."
        )

    # Key findings
    key_findings = []
    if attention_metrics:
        for m in attention_metrics:
            key_findings.append(f"{m.name} is measured at {m.value} {m.unit or ''} ({m.status.upper()} relative to report range).")
    elif normal_metrics:
        key_findings.append(f"{len(normal_metrics)} standard biomarkers were detected within normal intervals.")
    else:
        key_findings.append("Document text was extracted successfully via OCR/PDF pipeline.")

    # Questions for doctor based ONLY on what was found
    questions = []
    if attention_metrics:
        for m in attention_metrics[:3]:
            questions.append(f"My {m.name} showed {m.value} {m.unit or ''} ({m.status.upper()}). Do you recommend follow-up testing or any lifestyle adjustments?")
        questions.append("Could recent meals, hydration, or medications have influenced these specific numbers?")
    else:
        questions.append("Based on these results, is an annual routine checkup sufficient for my age and health profile?")
        questions.append("Are there any additional preventive screenings recommended alongside this panel?")

    # Lifestyle notes
    lifestyle_notes = [
        "Maintain consistent daily hydration (approx. 2 liters of water daily).",
        "Eat a variety of whole vegetables, dietary fiber, and adequate protein.",
        "Aim for 20-30 minutes of moderate physical movement most days of the week."
    ]

    return ReportAnalysisResponse(
        report_title=title,
        patient_summary=summary,
        key_findings=key_findings,
        metrics=metrics,
        questions_for_doctor=questions,
        diet_and_lifestyle_notes=lifestyle_notes,
        raw_text=raw_text[:2000],
        is_mock=False
    )
