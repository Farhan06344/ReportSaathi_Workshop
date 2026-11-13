/**
 * Realistic clinical demo datasets for ReportSaathi.
 * Pure front-end mock data with detailed biomarker breakdowns,
 * reference ranges, plain-language explanations, and doctor questions.
 */

export const SAMPLE_REPORTS = [
  {
    id: "rep-cbc-001",
    title: "Complete Blood Count (CBC) with Differential",
    category: "Hematology",
    patientName: "Alex Morgan",
    age: 34,
    gender: "Female",
    collectionDate: "Nov 12, 2026",
    laboratory: "Apex Regional Diagnostic Center",
    statusBadge: "Attention Needed",
    summary: "Your Complete Blood Count shows mild anemia indicated by low hemoglobin and red blood cell count, along with smaller-than-usual red blood cells (low MCV). This pattern is very frequently associated with low iron levels or dietary factors. Your white blood cells (infection-fighting cells) and platelets (blood clotting cells) are in optimal, healthy ranges.",
    keyHighlights: [
      "Hemoglobin is 10.8 g/dL (standard range 12.0 - 15.5), indicating mild anemia.",
      "Red Blood Cell count (RBC) and MCV are slightly reduced.",
      "Platelet count (245,000 /cu.mm) is in the normal, healthy range.",
      "Immune system white blood cells (WBC) are balanced with no signs of active acute infection."
    ],
    metrics: [
      {
        name: "Hemoglobin (Hb)",
        value: "10.8",
        unit: "g/dL",
        referenceRange: "12.0 - 15.5",
        status: "low",
        category: "Red Blood Cells",
        interpretation: "Hemoglobin is the iron-rich protein in red blood cells that carries life-giving oxygen from your lungs to every organ and tissue. A level of 10.8 is mildly reduced, which can explain symptoms like afternoon sluggishness, cold hands, or mild fatigue."
      },
      {
        name: "RBC (Red Blood Cell Count)",
        value: "3.85",
        unit: "mil/uL",
        referenceRange: "4.00 - 5.20",
        status: "low",
        category: "Red Blood Cells",
        interpretation: "Red blood cells are microscopic delivery trucks transporting oxygen. Your count is slightly below standard, reflecting fewer circulating red cells."
      },
      {
        name: "Hematocrit (PCV)",
        value: "33.2",
        unit: "%",
        referenceRange: "36.0 - 46.0",
        status: "low",
        category: "Red Blood Cells",
        interpretation: "Hematocrit measures the percentage of your total blood volume that consists of red blood cells. Slightly low, tracking consistently with your hemoglobin level."
      },
      {
        name: "MCV (Mean Corpuscular Volume)",
        value: "76.4",
        unit: "fL",
        referenceRange: "80.0 - 100.0",
        status: "low",
        category: "Red Blood Cells",
        interpretation: "MCV measures the physical size of individual red blood cells. When red cells are smaller than standard ('microcytic'), it is most commonly a sign that the body has low stored iron (ferritin) to build normal-sized cells."
      },
      {
        name: "Total White Blood Cells (WBC)",
        value: "6,400",
        unit: "/cu.mm",
        referenceRange: "4,000 - 11,000",
        status: "normal",
        category: "Immune Health",
        interpretation: "White blood cells form your immune system's defensive shield. Your level is well within the healthy range, indicating no obvious active bacterial infection or inflammation."
      },
      {
        name: "Platelet Count",
        value: "245,000",
        unit: "/cu.mm",
        referenceRange: "150,000 - 450,000",
        status: "normal",
        category: "Blood Clotting",
        interpretation: "Platelets are specialized cell fragments that stick together to stop bleeding when you get a cut or bruise. Your count is robust and completely normal."
      },
      {
        name: "Neutrophils",
        value: "58",
        unit: "%",
        referenceRange: "40 - 75",
        status: "normal",
        category: "Immune Health",
        interpretation: "Neutrophils are the first-responder white blood cells that fight bacterial pathogens. Normal proportion."
      },
      {
        name: "Lymphocytes",
        value: "32",
        unit: "%",
        referenceRange: "20 - 45",
        status: "normal",
        category: "Immune Health",
        interpretation: "Lymphocytes include B and T cells that remember previous illnesses and create antibodies. Healthy normal level."
      }
    ],
    doctorQuestions: [
      "Could my mild anemia and low MCV be caused by iron deficiency, and should we order a Serum Ferritin & Iron Panel to confirm?",
      "Would you recommend starting an oral iron supplement, and if so, what dosage and form causes the least stomach discomfort?",
      "Could my menstrual cycle or current diet contribute to this, and how soon should we re-check my complete blood count?"
    ],
    lifestyleNotes: [
      "Include dietary iron sources such as lentils, spinach, beans, fortified cereals, and lean meats.",
      "Pair iron-rich foods with Vitamin C (oranges, bell peppers, lemon water) which significantly enhances iron absorption.",
      "Avoid drinking coffee or tea within 1 hour of meals, as tannins can inhibit plant-based iron absorption by up to 50%."
    ]
  },
  {
    id: "rep-lipid-002",
    title: "Comprehensive Lipid & Cardiovascular Profile",
    category: "Cardiovascular Health",
    patientName: "David Chen",
    age: 48,
    gender: "Male",
    collectionDate: "Nov 08, 2026",
    laboratory: "Metro Health Clinical Pathology",
    statusBadge: "Review Recommended",
    summary: "Your lipid panel shows mildly elevated Total Cholesterol and LDL ('bad') cholesterol, with slightly borderline triglycerides. Your HDL ('good') cholesterol is slightly below optimal. In simple terms, there are more lipid particles circulating in your bloodstream than ideal, which is often very responsive to heart-healthy dietary habits, aerobic movement, and stress management.",
    keyHighlights: [
      "Total Cholesterol is 228 mg/dL (desirable is below 200 mg/dL).",
      "LDL ('Bad') Cholesterol is 148 mg/dL (optimal is under 100 mg/dL).",
      "HDL ('Good') Cholesterol is 42 mg/dL (protective target is 50 mg/dL or higher).",
      "Triglycerides are 175 mg/dL (ideal is below 150 mg/dL)."
    ],
    metrics: [
      {
        name: "Total Cholesterol",
        value: "228",
        unit: "mg/dL",
        referenceRange: "< 200",
        status: "high",
        category: "Lipids",
        interpretation: "Cholesterol is a waxy lipid essential for cell membranes and hormone production. While necessary for life, an excess circulating amount can gradually accumulate along arterial walls."
      },
      {
        name: "LDL Cholesterol ('Bad')",
        value: "148",
        unit: "mg/dL",
        referenceRange: "< 100",
        status: "high",
        category: "Lipids",
        interpretation: "LDL is nicknamed 'bad' cholesterol because it delivers cholesterol to tissues; when elevated, it can contribute to plaque build-up in blood vessels."
      },
      {
        name: "HDL Cholesterol ('Good')",
        value: "42",
        unit: "mg/dL",
        referenceRange: "> 50",
        status: "low",
        category: "Lipids",
        interpretation: "HDL acts like a vacuum cleaner, scavenging excess cholesterol from your bloodstream and returning it to your liver for processing. A higher number provides cardiovascular protection."
      },
      {
        name: "Serum Triglycerides",
        value: "175",
        unit: "mg/dL",
        referenceRange: "< 150",
        status: "high",
        category: "Lipids",
        interpretation: "Triglycerides are the main form of stored body fat derived from calories your body doesn't need to use immediately (especially refined carbs, sweets, and alcohol)."
      },
      {
        name: "Total Chol / HDL Ratio",
        value: "5.4",
        unit: "Ratio",
        referenceRange: "< 4.5",
        status: "high",
        category: "Cardiovascular Risk",
        interpretation: "A mathematical ratio comparing total cholesterol to protective HDL. Above 5.0 indicates an opportunity to improve lipid balance."
      }
    ],
    doctorQuestions: [
      "Given my LDL of 148 and family history, what is my overall 10-year cardiovascular risk score?",
      "Would you recommend a trial period of 3 to 6 months of focused lifestyle and dietary changes before considering medication?",
      "Should we check secondary cardiovascular markers like Apolipoprotein B (ApoB) or High-Sensitivity CRP (hs-CRP)?"
    ],
    lifestyleNotes: [
      "Increase soluble fiber: Oatmeal, chia seeds, apples, and beans bind cholesterol in the digestive tract.",
      "Engage in at least 150 minutes of moderate aerobic cardio weekly (like brisk walking or cycling), which directly boosts HDL.",
      "Substitute saturated cooking fats with extra virgin olive oil, nuts, and avocados."
    ]
  },
  {
    id: "rep-cmp-003",
    title: "Comprehensive Metabolic & Kidney Panel",
    category: "Metabolic Health",
    patientName: "Sarah Jenkins",
    age: 52,
    gender: "Female",
    collectionDate: "Nov 05, 2026",
    laboratory: "St. Jude Diagnostic Laboratories",
    statusBadge: "All Clear",
    summary: "Great news! Your Comprehensive Metabolic Panel demonstrates excellent organ function. Your blood glucose, kidney filtration (eGFR & Creatinine), liver enzymes (ALT & AST), and blood electrolytes (Sodium, Potassium, Chloride) are all in healthy, balanced reference intervals.",
    keyHighlights: [
      "Fasting Blood Glucose is 92 mg/dL, showing optimal blood sugar regulation.",
      "Kidney filtration rate (eGFR > 90) and Creatinine (0.82 mg/dL) indicate healthy kidneys.",
      "Liver enzymes ALT (22 U/L) and AST (19 U/L) are well within normal limits.",
      "Electrolytes (Sodium, Potassium, Calcium) are completely balanced."
    ],
    metrics: [
      {
        name: "Fasting Glucose",
        value: "92",
        unit: "mg/dL",
        referenceRange: "70 - 99",
        status: "normal",
        category: "Metabolic",
        interpretation: "Measures blood sugar after an overnight fast. 92 mg/dL shows your pancreas and insulin sensitivity are functioning effectively."
      },
      {
        name: "Serum Creatinine",
        value: "0.82",
        unit: "mg/dL",
        referenceRange: "0.60 - 1.10",
        status: "normal",
        category: "Kidney Function",
        interpretation: "Creatinine is a natural waste product from muscle breakdown filtered exclusively by healthy kidneys. Your level is optimal."
      },
      {
        name: "eGFR (Estimated Glomerular Filtration)",
        value: "> 90",
        unit: "mL/min/1.73m²",
        referenceRange: "> 60",
        status: "normal",
        category: "Kidney Function",
        interpretation: "Estimates how many milliliters of blood your kidneys clean per minute. Anything above 60 is healthy; > 90 indicates prime kidney function."
      },
      {
        name: "Blood Urea Nitrogen (BUN)",
        value: "14",
        unit: "mg/dL",
        referenceRange: "7 - 20",
        status: "normal",
        category: "Kidney Function",
        interpretation: "Measures urea nitrogen in the blood, an indicator of protein metabolism and hydration status. Well within standard range."
      },
      {
        name: "Serum Sodium (Na)",
        value: "140",
        unit: "mEq/L",
        referenceRange: "135 - 145",
        status: "normal",
        category: "Electrolytes",
        interpretation: "An essential electrolyte controlling fluid balance, nerve signals, and blood pressure. Perfectly balanced."
      },
      {
        name: "Serum Potassium (K)",
        value: "4.3",
        unit: "mEq/L",
        referenceRange: "3.5 - 5.1",
        status: "normal",
        category: "Electrolytes",
        interpretation: "Crucial electrolyte governing heart rhythm, muscle contraction, and fluid equilibrium. Optimal."
      },
      {
        name: "ALT (Alanine Aminotransferase)",
        value: "22",
        unit: "U/L",
        referenceRange: "7 - 35",
        status: "normal",
        category: "Liver Function",
        interpretation: "An enzyme found predominantly in liver cells. Normal blood level confirms healthy liver cellular integrity."
      }
    ],
    doctorQuestions: [
      "Since all markers are currently normal, is an annual routine follow-up appropriate for my age group?",
      "Are there any baseline preventive screenings (e.g. bone density, mammogram) due alongside this routine lab panel?"
    ],
    lifestyleNotes: [
      "Maintain your current balanced diet and hydration routine.",
      "Consistent 7 to 8 hours of quality sleep helps preserve insulin sensitivity and cellular recovery."
    ]
  }
];
