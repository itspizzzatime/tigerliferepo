import { useEffect, useState } from "react";
import { computePremiumFromCoeffs } from "@/lib/premium_coeffs";

export function usePremiumStats(applications: any[] | undefined) {
  const [avgPremium, setAvgPremium] = useState<number | null>(null);
  const [totalPremium, setTotalPremium] = useState<number | null>(null);
  const [premiumLoading, setPremiumLoading] = useState(false);
  useEffect(() => {
    if (!applications) return;
    let mounted = true;
    setPremiumLoading(true);
    const values = applications.flatMap((profile) => {
      try {
        const input = {
          height: profile.height ?? "",
          weight: profile.weight ?? "",
          annualGrossIncome:
            profile.annualGrossIncome ?? profile.annual_gross_income ?? "",
          smokingHabits:
            profile.smokingHabits ??
            (profile.smoker === true
              ? "yes"
              : profile.smoker === false
                ? "no"
                : "none"),
          alcoholConsumption: profile.alcoholConsumption ?? "none",
          substanceUse: profile.substanceUse ?? "none",
        };
        const value = computePremiumFromCoeffs(input as any);
        return typeof value === "number" && Number.isFinite(value)
          ? [value]
          : [];
      } catch {
        return [];
      }
    });
    if (mounted) {
      const total = values.reduce((sum, value) => sum + value, 0);
      setTotalPremium(values.length ? total : null);
      setAvgPremium(values.length ? total / values.length : null);
      setPremiumLoading(false);
    }
    return () => {
      mounted = false;
    };
  }, [applications]);
  return { avgPremium, totalPremium, premiumLoading };
}
