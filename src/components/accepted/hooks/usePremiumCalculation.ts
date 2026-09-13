import { useEffect, useState } from "react";
import { computePremiumFromCoeffs } from "@/lib/premium_coeffs";

export function usePremiumCalculation(userProfile: any | null | undefined) {
  const [monthlyPremium, setMonthlyPremium] = useState<number | null>(null);
  const [monthlyLoading, setMonthlyLoading] = useState(false);

  useEffect(() => {
    if (!userProfile) {
      setMonthlyPremium(null);
      return;
    }

    let mounted = true;

    const calculatePremium = () => {
      setMonthlyLoading(true);
      try {
        const profile = userProfile as any;

        if (
          !profile?.height ||
          !profile?.weight ||
          !profile?.annualGrossIncome ||
          !profile?.smokingHabits ||
          !profile?.alcoholConsumption ||
          !profile?.substanceUse
        ) {
          if (mounted) {
            setMonthlyPremium(null);
            setMonthlyLoading(false);
          }
          return;
        }

        const premium = computePremiumFromCoeffs({
          height: Number(profile.height),
          weight: Number(profile.weight),
          annualGrossIncome: profile.annualGrossIncome,
          smokingHabits: profile.smokingHabits,
          alcoholConsumption: profile.alcoholConsumption,
          substanceUse: profile.substanceUse,
          preExistingConditions: profile.preExistingConditions || [],
        });

        if (mounted) {
          setMonthlyPremium(Number.isFinite(premium) ? premium : null);
        }
      } catch {
        if (mounted) setMonthlyPremium(null);
      } finally {
        if (mounted) setMonthlyLoading(false);
      }
    };

    calculatePremium();

    return () => {
      mounted = false;
    };
  }, [userProfile]);

  return { monthlyPremium, monthlyLoading };
}
