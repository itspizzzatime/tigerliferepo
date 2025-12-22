import type { ApplicationData } from "../../ApplicationModal";

export type EligibilityResult = 'Standard' | 'Conditional' | 'Decline';

export function checkEligibility(data: ApplicationData): EligibilityResult {
  const age = new Date().getFullYear() - new Date(data.dateOfBirth).getFullYear();
  const conditions = data.preExistingConditions || [];
  const income = data.annualGrossIncome;

  if (age > 65 || age < 18) {
    return 'Decline';
  }

  if (conditions.includes('cancer') || conditions.includes('organ_transplant')) {
    return 'Decline';
  }
  
  const heavySmoker = data.smokingHabits === 'heavy';
  const heavyDrinker = data.alcoholConsumption === 'heavy';

  if (heavySmoker && conditions.some(c => c.includes('heart') || c.includes('respiratory'))) {
    return 'Decline';
  }

  if (conditions.length > 3) {
    return 'Conditional';
  }

  if (income === 'under_100k' && conditions.length > 1) {
    return 'Conditional';
  }

  if (heavyDrinker && conditions.includes('liver')) {
    return 'Conditional';
  }

  return 'Standard';
}
