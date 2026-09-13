import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import info from "../../../data/info.json";
import type { ApplicationData } from "@/components/ApplicationModal";
import { checkEligibility } from "@/components/steps/utils/eligibility";
import { BRAND } from "../data/dashboardDemoData";

export type DashboardChartData = {
  ageData: { name: string; Standard: number; Conditional: number }[];
  incomeData: { name: string; Standard: number; Conditional: number }[];
  conditionsPieData: { name: string; value: number }[];
};
export type PolicyDistribution = {
  items: {
    type: string;
    count: number;
    stroke: string;
    dotColor: string;
    percentage: number;
    strokeLength: number;
    offset: number;
  }[];
  radius: number;
  circumference: number;
};

export function useDashboardData() {
  const { data: applications, isLoading } = useQuery<any[]>({
    queryKey: ["my-applications"],
    queryFn: async () =>
      new Promise<any[]>((resolve) =>
        setTimeout(() => resolve(Object.values(info.profiles)), 500),
      ),
  });
  const totalApplications = useMemo(
    () => Object.keys(info.profiles).length,
    [],
  );
  const totalApps = totalApplications + 1111;
  const approvedCount = useMemo(
    () =>
      (Object.values(info.profiles) as ApplicationData[]).filter(
        (profile) => checkEligibility(profile) !== "Decline",
      ).length + 911,
    [],
  );
  const cancelledCount = 3;
  const recentProfiles = useMemo(
    () =>
      Object.values(info.profiles)
        .reverse()
        .slice(0, 4)
        .map((profile: any) => ({
          id: profile.id,
          name: profile.fullName || "Unknown",
          date: profile.dateOfBirth || "Unknown",
          status: profile.preExistingConditions?.length
            ? "pending"
            : "approved",
        })),
    [],
  );
  const chartData = useMemo<DashboardChartData | null>(
    () =>
      !applications
        ? null
        : {
            ageData: [
              { name: "16", Standard: 31, Conditional: 15 },
              { name: "17", Standard: 44, Conditional: 21 },
              { name: "18", Standard: 75, Conditional: 35 },
              { name: "19", Standard: 93, Conditional: 44 },
              { name: "20", Standard: 111, Conditional: 52 },
              { name: "21", Standard: 93, Conditional: 44 },
              { name: "22", Standard: 75, Conditional: 35 },
              { name: "23", Standard: 50, Conditional: 24 },
              { name: "24", Standard: 31, Conditional: 15 },
              { name: "25", Standard: 19, Conditional: 9 },
            ],
            incomeData: [
              { name: "Under ₱100k", Standard: 85, Conditional: 40 },
              { name: "₱100k–300k", Standard: 175, Conditional: 82 },
              { name: "₱300k–600k", Standard: 212, Conditional: 100 },
              { name: "₱600k–1M", Standard: 110, Conditional: 52 },
              { name: "₱1M+", Standard: 40, Conditional: 20 },
            ],
            conditionsPieData: Object.entries({
              None: 420,
              "Mental Health": 174,
              Congenital: 22,
              Diabetes: 26,
              Respiratory: 74,
              "Kidney Disease": 12,
              "High Cholesterol": 38,
              Hypertension: 45,
              Cardiovascular: 32,
              Cancer: 18,
            }).map(([name, value]) => ({ name, value })),
          },
    [applications],
  );
  const policyDistribution = useMemo<PolicyDistribution>(() => {
    const base = [
      {
        type: "Standard",
        count: Math.round(totalApps * 0.56),
        stroke: BRAND.amber,
        dotColor: BRAND.amber,
        percentage: 56,
      },
      {
        type: "Conditional",
        count: Math.round(totalApps * 0.26),
        stroke: BRAND.terracotta,
        dotColor: BRAND.terracotta,
        percentage: 26,
      },
      {
        type: "Decline",
        count: Math.round(totalApps * 0.18),
        stroke: BRAND.rust,
        dotColor: BRAND.rust,
        percentage: 18,
      },
    ];
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    let running = 0;
    const items = base.map((policy) => {
      const strokeLength = (policy.percentage / 100) * circumference;
      const offset = running;
      running += strokeLength;
      return { ...policy, strokeLength, offset };
    });
    return { items, radius, circumference };
  }, [totalApps]);
  return {
    applications,
    isLoading,
    recentProfiles,
    chartData,
    policyDistribution,
    totalApps,
    approvedCount,
    cancelledCount,
  };
}
