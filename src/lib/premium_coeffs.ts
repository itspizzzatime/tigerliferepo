// Coefficients-based premium calculator (fallback / explicit model)
// This file encodes the coefficients you provided and exposes a helper
// `computePremiumFromCoeffs(input)` which accepts a plain user-data object
// and returns a numeric premium (annual).
//
// Notes / assumptions:
// - Some features are one-hot encoded (e.g. Father Occupation_Construction).
//   We map common input fields (fatherOccupation, motherOccupation, lifestyle,
//   smokingHabits, alcoholConsumption, annualGrossIncome token) to those one-hot
//   columns where possible.
// - For disease flags we look for matching tokens inside `preExistingConditions`.
// - For BMI we compute from height (cm) and weight (kg) when both available.
// - Family Annual Income is expected as either a numeric value or a token like
//   `100k_300k`; we convert tokens to mean numeric values.

type Input = Record<string, any>;

const intercept = 1219.9195944332582;

const coefMap: Record<string, number> = {
  "Unnamed: 0": -0.018497,
  "Age": 23.620423,
  "Weight": -13.280556,
  "Height": 10.052769,
  "BMI": 36.094835,
  "Family Annual Income": 0.000006,
  "Cardiovascular Diseases": 1179.404491,
  "Hypertension": 451.672323,
  "High Cholesterol": -42.219751,
  "Chronic Kidney Disease": -52.497134,
  "Diabetes": 461.619756,
  "Mental Health Disorder": 24.240823,
  "Frequency Claim": 580.998331,
  "Father Occupation_Construction": -66.069796,
  "Father Occupation_Education": 23.085631,
  "Father Occupation_Healthcare": 19.702253,
  "Father Occupation_Manufacturing": 3.003336,
  "Father Occupation_Military": -230.604968,
  "Father Occupation_Other": 81.677102,
  "Father Occupation_Retail": -13.125868,
  "Father Occupation_Software and IT": -20.458802,
  "Father Occupation_Transportation": 33.097347,
  "Father Occupation_Unemployed": 175.747715,
  "Mother Occupation_Construction": 25.304706,
  "Mother Occupation_Education": -8.989493,
  "Mother Occupation_Healthcare": 0.399458,
  "Mother Occupation_Manufacturing": 22.739463,
  "Mother Occupation_Military": 64.081255,
  "Mother Occupation_Other": -10.139388,
  "Mother Occupation_Retail": -19.263461,
  "Mother Occupation_Software and IT": -57.145298,
  "Mother Occupation_Transportation": -78.426238,
  "Mother Occupation_Unemployed": 92.809289,
  "Family Income Class_Low middle income": 56.43668,
  "Family Income Class_Middle Middle class": 15.808936,
  "Family Income Class_Rich": 228.195975,
  "Family Income Class_Upper income": 65.840056,
  "Family Income Class_Upper middle income": 50.471762,
  "Cancer_Thyroid Cancer": 1182.241799,
  "Chronic Respiratory Disease_Mild Asthma": 464.657329,
  "Chronic Respiratory Disease_Tuberculosis": 751.139374,
  "Congenital Disorder_Down Syndrome": 82.793883,
  "Congenital Disorder_Heart Defect": -160.597599,
  "Congenital Disorder_Other": 159.604518,
  "Congenital Disorder_Sickle Cell Disease": 215.011948,
  "Alcohol Consumption_Nondrinker": -347.214859,
  "Alcohol Consumption_Occasional": -275.209208,
  "Tobacco Use_Light": -628.338798,
  "Tobacco Use_Nonsmoker": -566.097144,
  "Lifestyle Habits_Bungee Jumping": 202.919396,
  "Lifestyle Habits_Mountain Hiking": 15.113239,
  "Lifestyle Habits_Other": 118.717954,
  "Lifestyle Habits_Paragliding": 146.474905,
  "Lifestyle Habits_Parkour": 84.224955,
  "Lifestyle Habits_Rapelling": 297.549939,
  "Lifestyle Habits_Rock Climbing": -154.526928,
  "Lifestyle Habits_Skateboarding": 27.640902,
  "Lifestyle Habits_Surfing": 158.280916,
  "Lifestyle Habits_Waterskiing": 35.379678,
  "Eligibility_Standard": -11.672492,
};

function parseIncomeOption(token: any): number {
  if (!token) return 0;
  if (typeof token === 'number') return token;
  if (typeof token === 'string') {
    if (token === 'under_100k' || token === '0') return 50000;
    if (token === '>1000000' || token === 'over_1m') return 1500000;
    // tokens like 100k_300k or 600k_1000000
    const parts = token.split('_');
    if (parts.length === 2) {
      const a = Number(parts[0].replace(/[^0-9]/g, ''));
      const b = Number(parts[1].replace(/[^0-9]/g, ''));
      if (Number.isFinite(a) && Number.isFinite(b)) return (a + b) / 2;
    }
    // try numeric extraction
    const n = Number(token.replace(/[^0-9]/g, ''));
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}

function computeAgeFromDOB(dob: string | undefined): number {
  if (!dob) return 0;
  try {
    const d = new Date(dob);
    if (Number.isNaN(d.getTime())) return 0;
    const diff = Date.now() - d.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  } catch (e) {
    return 0;
  }
}

function boolFeatureFromList(list: any[], keywords: string[]): number {
  if (!Array.isArray(list)) return 0;
  const lowered = list.map((x: any) => String(x).toLowerCase());
  for (const kw of keywords) {
    if (lowered.some((s: string) => s.includes(kw.toLowerCase()))) return 1;
  }
  return 0;
}

export function computePremiumFromCoeffs(input: Input): number {
  // Build feature values and accumulate
  let sum = intercept;

  const age = input.age ?? computeAgeFromDOB(input.dateOfBirth) ?? 0;
  const weight = Number(input.weight) || 0;
  const height = Number(input.height) || 0;
  const bmi = (weight && height) ? (weight / Math.pow(height / 100, 2)) : (Number(input.BMI) || 0);
  const famIncome = parseIncomeOption(input.annualGrossIncome ?? input.familyAnnualIncome);

  // Numeric features
  if (coefMap['Age']) sum += coefMap['Age'] * age;
  if (coefMap['Weight']) sum += coefMap['Weight'] * weight;
  if (coefMap['Height']) sum += coefMap['Height'] * height;
  if (coefMap['BMI']) sum += coefMap['BMI'] * bmi;
  if (coefMap['Family Annual Income']) sum += coefMap['Family Annual Income'] * famIncome;

  // Pre-existing conditions mapping — best-effort by keyword
  const pre = Array.isArray(input.preExistingConditions) ? input.preExistingConditions : (input.preExistingConditions ? [input.preExistingConditions] : []);
  if (coefMap['Cardiovascular Diseases']) sum += coefMap['Cardiovascular Diseases'] * boolFeatureFromList(pre, ['cardio', 'cardiovascular', 'heart']);
  if (coefMap['Hypertension']) sum += coefMap['Hypertension'] * boolFeatureFromList(pre, ['hypertens', 'hypertension']);
  if (coefMap['High Cholesterol']) sum += coefMap['High Cholesterol'] * boolFeatureFromList(pre, ['cholesterol', 'cholest']);
  if (coefMap['Chronic Kidney Disease']) sum += coefMap['Chronic Kidney Disease'] * boolFeatureFromList(pre, ['kidney']);
  if (coefMap['Diabetes']) sum += coefMap['Diabetes'] * boolFeatureFromList(pre, ['diabet']);
  if (coefMap['Mental Health Disorder']) sum += coefMap['Mental Health Disorder'] * boolFeatureFromList(pre, ['mental', 'depress', 'anxiety']);

  // Frequency Claim: if user has claimFrequency or recentClaims numeric
  const freq = Number(input.frequencyClaim ?? input.claimFrequency ?? input.recentClaims) || 0;
  if (coefMap['Frequency Claim']) sum += coefMap['Frequency Claim'] * freq;

  // Parent occupations
  const father = (input.fatherOccupation || '').toString();
  const mother = (input.motherOccupation || '').toString();
  for (const key of Object.keys(coefMap)) {
    if (key.startsWith('Father Occupation_')) {
      const suffix = key.replace('Father Occupation_', '');
      if (father.toLowerCase().includes(suffix.toLowerCase())) sum += coefMap[key] * 1;
    }
    if (key.startsWith('Mother Occupation_')) {
      const suffix = key.replace('Mother Occupation_', '');
      if (mother.toLowerCase().includes(suffix.toLowerCase())) sum += coefMap[key] * 1;
    }
  }

  // Family income class: infer from numeric family income
  // Simple bucketing: (these thresholds are heuristic)
  const inc = famIncome;
  if (inc > 1000000 && coefMap['Family Income Class_Rich']) sum += coefMap['Family Income Class_Rich'] * 1;
  else if (inc > 600000 && coefMap['Family Income Class_Upper income']) sum += coefMap['Family Income Class_Upper income'] * 1;
  else if (inc > 300000 && coefMap['Family Income Class_Upper middle income']) sum += coefMap['Family Income Class_Upper middle income'] * 1;
  else if (inc > 100000 && coefMap['Family Income Class_Middle Middle class']) sum += coefMap['Family Income Class_Middle Middle class'] * 1;
  else if (coefMap['Family Income Class_Low middle income']) sum += coefMap['Family Income Class_Low middle income'] * 1;

  // Cancer and other specific chronic conditions checks
  if (coefMap['Cancer_Thyroid Cancer']) sum += coefMap['Cancer_Thyroid Cancer'] * boolFeatureFromList(pre, ['thyroid']);
  if (coefMap['Chronic Respiratory Disease_Mild Asthma']) sum += coefMap['Chronic Respiratory Disease_Mild Asthma'] * boolFeatureFromList(pre, ['asthma']);
  if (coefMap['Chronic Respiratory Disease_Tuberculosis']) sum += coefMap['Chronic Respiratory Disease_Tuberculosis'] * boolFeatureFromList(pre, ['tuberculosis', 'tb']);

  // Congenital disorders
  if (coefMap['Congenital Disorder_Down Syndrome']) sum += coefMap['Congenital Disorder_Down Syndrome'] * boolFeatureFromList(pre, ['down']);
  if (coefMap['Congenital Disorder_Heart Defect']) sum += coefMap['Congenital Disorder_Heart Defect'] * boolFeatureFromList(pre, ['congenital', 'heart defect']);
  if (coefMap['Congenital Disorder_Other']) sum += coefMap['Congenital Disorder_Other'] * 0; // can't infer
  if (coefMap['Congenital Disorder_Sickle Cell Disease']) sum += coefMap['Congenital Disorder_Sickle Cell Disease'] * boolFeatureFromList(pre, ['sickle']);

  // Alcohol consumption mapping
  const alc = (input.alcoholConsumption || '').toString().toLowerCase();
  if (alc.includes('none') || alc.includes('nondrink')) {
    if (coefMap['Alcohol Consumption_Nondrinker']) sum += coefMap['Alcohol Consumption_Nondrinker'] * 1;
  } else if (alc.includes('occasion')) {
    if (coefMap['Alcohol Consumption_Occasional']) sum += coefMap['Alcohol Consumption_Occasional'] * 1;
  }

  // Tobacco / smoking mapping
  const smoke = (input.smokingHabits || input.tobaccoUse || '').toString().toLowerCase();
  if (smoke.includes('none') || smoke.includes('non')) {
    if (coefMap['Tobacco Use_Nonsmoker']) sum += coefMap['Tobacco Use_Nonsmoker'] * 1;
  } else if (smoke.includes('light') || smoke.includes('occas') || smoke.includes('regular') || smoke.includes('heavy')) {
    if (coefMap['Tobacco Use_Light']) sum += coefMap['Tobacco Use_Light'] * 1;
  }

  // Lifestyle habits
  const life = (input.lifestyle || '').toString();
  for (const key of Object.keys(coefMap)) {
    if (key.startsWith('Lifestyle Habits_')) {
      const suffix = key.replace('Lifestyle Habits_', '');
      if (life.toLowerCase().includes(suffix.toLowerCase())) sum += coefMap[key] * 1;
    }
  }

  // Eligibility_Standard: if input.eligibility === 'Standard' or checkEligibility returns Standard
  if (input.eligibility === 'Standard' || String(input.eligibility).toLowerCase() === 'standard') {
    if (coefMap['Eligibility_Standard']) sum += coefMap['Eligibility_Standard'] * 1;
  }

  return Math.max(0, sum);
}
