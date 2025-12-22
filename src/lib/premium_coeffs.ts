// This is a simplified model. In a real world scenario, this would be a more complex calculation
// involving a variety of factors and potentially a machine learning model.

interface PremiumFactors {
    dateOfBirth?: string;
    height?: number;
    weight?: number;
    annualGrossIncome?: string;
    fatherOccupation?: string;
    motherOccupation?: string;
    preExistingConditions?: string[];
    smokingHabits?: string;
    alcoholConsumption?: 'none' | 'occasional' | 'heavy';
    lifestyle?: string;
    substanceUse?: 'none' | 'occasional' | 'heavy';
}

const BASE_PREMIUM = 5000;

const COEFFS = {
    AGE: 150, // per year
    BMI: 100, // per BMI point over 25
    INCOME: {
        'under_100k': 1.0,
        '100k_300k': 1.1,
        '300k_600k': 1.2,
        '600k_1m': 1.4,
        'over_1m': 1.6,
    },
    OCCUPATION_RISK: {
        'default': 1.0,
        'high_risk': 1.5,
        'medium_risk': 1.2,
    },
    CONDITIONS: 1000, // per condition
    SMOKING: {
        'none': 1.0,
        'light': 1.5,
        'moderate': 2.0,
        'heavy': 3.0,
        'vape': 1.2,
    },
    ALCOHOL: {
        'none': 1.0,
        'occasional': 1.1,
        'heavy': 1.8,
    },
    LIFESTYLE_RISK: 1.3,
    SUBSTANCE_USE: {
        'none': 1.0,
        'occasional': 1.5,
        'heavy': 2.5,
    },
};

const HIGH_RISK_OCCUPATIONS = ["police", "firefighter", "construction", "military", "pilot"];
const MEDIUM_RISK_OCCUPATIONS = ["doctor", "nurse", "driver", "factory worker"];
const HIGH_RISK_LIFESTYLES = ["skateboarding", "mountain hiking", "surfing", "bungee jumping", "parkour", "rock climbing"];


function getOccupationRisk(occupation?: string): number {
    if (!occupation) return COEFFS.OCCUPATION_RISK.default;
    const occ = occupation.toLowerCase();
    if (HIGH_RISK_OCCUPATIONS.some(r => occ.includes(r))) return COEFFS.OCCUPATION_RISK.high_risk;
    if (MEDIUM_RISK_OCCUPATIONS.some(r => occ.includes(r))) return COEFFS.OCCUPATION_RISK.medium_risk;
    return COEFFS.OCCUPATION_RISK.default;
}


export function computePremiumFromCoeffs(factors: PremiumFactors): number {
    let premium = BASE_PREMIUM;

    // Age
    if (factors.dateOfBirth) {
        const age = new Date().getFullYear() - new Date(factors.dateOfBirth).getFullYear();
        premium += (age - 18) * COEFFS.AGE;
    }

    // BMI
    if (factors.height && factors.weight) {
        const heightInMeters = factors.height / 100;
        const bmi = factors.weight / (heightInMeters * heightInMeters);
        if (bmi > 25) {
            premium += (bmi - 25) * COEFFS.BMI;
        }
    }

    // Income
    const incomeFactor = COEFFS.INCOME[factors.annualGrossIncome as keyof typeof COEFFS.INCOME] || 1.0;
    premium *= incomeFactor;

    // Occupation
    const fatherRisk = getOccupationRisk(factors.fatherOccupation);
    const motherRisk = getOccupationRisk(factors.motherOccupation);
    premium *= Math.max(fatherRisk, motherRisk);

    // Conditions
    if (factors.preExistingConditions) {
        premium += factors.preExistingConditions.length * COEFFS.CONDITIONS;
    }

    // Smoking
    const smokingFactor = COEFFS.SMOKING[factors.smokingHabits as keyof typeof COEFFS.SMOKING] || 1.0;
    premium *= smokingFactor;

    // Alcohol
    const alcoholFactor = COEFFS.ALCOHOL[factors.alcoholConsumption as keyof typeof COEFFS.ALCOHOL] || 1.0;
    premium *= alcoholFactor;

    // Lifestyle
    if (factors.lifestyle && HIGH_RISK_LIFESTYLES.includes(factors.lifestyle.toLowerCase())) {
        premium *= COEFFS.LIFESTYLE_RISK;
    }
    
    // Substance Use
    const substanceFactor = COEFFS.SUBSTANCE_USE[factors.substanceUse as keyof typeof COEFFS.SUBSTANCE_USE] || 1.0;
    premium *= substanceFactor;

    return Math.round(premium);
}