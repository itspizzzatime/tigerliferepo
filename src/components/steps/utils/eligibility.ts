// src/utils/eligibility.ts

export type EligibilityResult = "Decline" | "Conditional" | "Standard";

// Define the source data structure
export interface ApplicationData {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string; // Used for Age calculation
  college: string; // Used for Thomasian check
  address: string;
  emergencyContact: string;
  emergencyName: string;
  program: string;
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  annualGrossIncome: string; // Used for Family Income Class
  preExistingConditions: string[]; // Used for Cancer/Disease checks
  currentMedications: string;
  familyHistory: string;
    smokingHabits?: string; // e.g. 'None' | 'Light' | 'Heavy'
    lifestyle?: string;
  alcoholConsumption: "none" | "occasional" | "heavy";
    substanceUse?: "none" | "occasional" | "heavy";
  hospitalizations: string;
}

const HIGH_RISKS = [
    "Breast Cancer",
    "Lung Cancer",
    "Liver Cancer",
    "Cervical Cancer",
    "Colorectal Cancer",
    "Leukemia",
    "Ovarian Cancer",
    "Cirrhosis",
    "Chronic Viral Hepatitis",
    "Uncontrolled COPD",
    "Severe Asthma",
];

const MEDIUM_DISEASES = [
    "Thyroid Cancer",
    "Prostate Cancer",
    "Moderate Asthma",
    "Tuberculosis (Treated <= 2 years)",
    "Depression",
    "Bipolar",
    "Anxiety",
];

// --- New Income Classification Function ---
function classifyIncome(income: number): string {
    // Categorize income into social classes based on annual Gross Income (in PHP, based on your brackets)
    const brackets: [number, string][] = [
        [144360, "Poor"],
        [288720, "Low income"],
        [577440, "Low middle income"],
        [1012520, "Middle Middle class"],
        [1732320, "Upper middle income"],
        [2487200, "Upper income"]
    ];
    
    for (const [limit, label] of brackets) {
        if (income < limit) {
            return label;
        }
    }
    return "Rich";
}
// -----------------------------------------

// Parse income option strings (e.g. '100k_300k', 'under_100k', '600k_1m', '500000')
export function parseIncomeOption(option: string | undefined): number {
    if (!option) return 0;
    const raw = String(option).trim();

    // If it's already a numeric string, parse directly
    const numeric = parseInt(raw.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(numeric) && /^\d+$/.test(raw)) {
        return numeric;
    }

    // Known token formats
    if (raw === 'under_100k') return 50000;
    if (raw === '100k_300k') return Math.round((100000 + 300000) / 2);
    if (raw === '300k_600k') return Math.round((300000 + 600000) / 2);
    if (raw === '600k_1m') return Math.round((600000 + 1000000) / 2);
    if (raw === 'over_1m') return 1500000;

    // Fallback: try to extract two numbers separated by non-digits and take mean
    const parts = raw.split(/[^0-9]+/).filter(Boolean).map(n => parseInt(n, 10)).filter(n => !isNaN(n));
    if (parts.length === 1) return parts[0];
    if (parts.length >= 2) return Math.round((parts[0] + parts[1]) / 2);

    return 0;
}

// Helper to determine Age from Date of Birth (basic implementation)
function calculateAge(dateOfBirth: string): number {
    if (!dateOfBirth) return 0;
    const dob = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    return age;
}

// Helper to check for a condition in the preExistingConditions list
function hasCondition(data: ApplicationData, conditionList: string[]): boolean {
    if (!data.preExistingConditions) return false;
    const lowerCaseConditions = (data.preExistingConditions || []).map(c => String(c).toLowerCase());
    return conditionList.some(risk => 
        lowerCaseConditions.includes(risk.toLowerCase())
    );
}

export function checkEligibility(data: ApplicationData): EligibilityResult {
    const age = calculateAge(data.dateOfBirth);
    const incomeValue = parseIncomeOption(data.annualGrossIncome) || 0;
    const familyIncomeClass = classifyIncome(incomeValue);
    
    // Check conditions
    const hasHighRisk = hasCondition(data, HIGH_RISKS);
    const hasMediumRisk = hasCondition(data, MEDIUM_DISEASES);
    
    // Check if they selected "Other" or a cancer not in our lists
    const selectedConditions = (data.preExistingConditions || []).map(c => c.toLowerCase());
    const hasAnyUnlistedCancer = selectedConditions.some(c => 
        c.includes('cancer') && 
        !HIGH_RISKS.map(r => r.toLowerCase()).includes(c) && 
        !MEDIUM_DISEASES.map(r => r.toLowerCase()).includes(c)
    );

    // BMI Calculation
    let bmi = NaN;
    const heightCm = parseFloat((data as any).height || "");
    const weightKg = parseFloat((data as any).weight || "");
    if (!isNaN(heightCm) && heightCm > 0 && !isNaN(weightKg) && weightKg > 0) {
        bmi = weightKg / ((heightCm / 100) ** 2);
    }

    const isTobaccoHeavy = (data.smokingHabits || '').toLowerCase().includes('heavy');
    const hasSubstanceUse = (data.substanceUse || '').toLowerCase().includes('heavy');

    // --- 1. DECLINE (High Risk) ---
    if (
        age < 16 || age > 25 ||
        familyIncomeClass === "Poor" || 
        hasHighRisk || 
        hasSubstanceUse ||
        (!isNaN(bmi) && (bmi >= 30 || bmi <= 15)) ||
        // Heavy smoker + Heart issues = Immediate Decline
        (isTobaccoHeavy && selectedConditions.some(c => c.includes('heart')))
    ) {
        return "Decline";
    }

    // --- 2. CONDITIONAL (Moderate Risk) ---
    if (
        familyIncomeClass === "Low income" || 
        ["Unemployed", "Construction", "Military"].includes(data.fatherOccupation) ||
        ["Unemployed", "Construction", "Military"].includes(data.motherOccupation) ||
        hasMediumRisk || 
        hasAnyUnlistedCancer || // Any cancer not "High Risk" defaults to Conditional
        data.alcoholConsumption === "heavy" ||
        isTobaccoHeavy
    ) {
        return "Conditional";
    }

    // --- 3. STANDARD (Low Risk) ---
    return "Standard";
}
