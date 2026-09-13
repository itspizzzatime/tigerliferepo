"use client";

import { useState } from "react";
import NavBar from "@/components/NavBar";
import DashboardHeader from "./DashboardHeader";
import KpiStrip from "./KpiStrip";
import GenderDonutPanel from "./charts/GenderDonutPanel";
import ClaimsByStatusPanel from "./charts/ClaimsByStatusPanel";
import PolicyByCollegePanel from "./charts/PolicyByCollegePanel";
import PolicyDistributionPanel from "./charts/PolicyDistributionPanel";
import PremiumByRegionPanel from "./charts/PremiumByRegionPanel";
import PoliciesByTypePanel from "./charts/PoliciesByTypePanel";
import PremiumTrendPanel from "./charts/PremiumTrendPanel";
import PremiumVsClaimsPanel from "./charts/PremiumVsClaimsPanel";
import ApplicantDemographicsSection from "./sections/ApplicantDemographicsSection";
import { PreExistingConditionsPanel } from "./sections/RiskAndPolicyMixSection";
import {
  ModelFitPanel,
  RecentApplicationsPanel,
} from "./sections/RecentActivitySection";
import { useDashboardData } from "./hooks/useDashboardData";
import { usePremiumStats } from "./hooks/usePremiumStats";

const TABS = [
  { id: "demographics", label: "Demographics" },
  { id: "premium", label: "Premium Overview" },
] as const;

function DemographicsContent({
  chartData,
}: {
  chartData: ReturnType<typeof useDashboardData>["chartData"];
}) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        <GenderDonutPanel />
        <div className="lg:col-span-2">
          <PreExistingConditionsPanel chartData={chartData} />
        </div>
      </div>
      <ApplicantDemographicsSection chartData={chartData} />
      <PolicyByCollegePanel />
    </div>
  );
}

function PremiumOverviewContent({
  policyDistribution,
  totalApps,
}: {
  policyDistribution: ReturnType<typeof useDashboardData>["policyDistribution"];
  totalApps: number;
}) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        <PolicyDistributionPanel
          policyDistribution={policyDistribution}
          totalApps={totalApps}
        />
        <ClaimsByStatusPanel />
        <PoliciesByTypePanel />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <PremiumVsClaimsPanel />
        <PremiumTrendPanel />
      </div>
      <PremiumByRegionPanel />
      <section className="pt-1">
        <h2 className="font-serif text-base text-tiger-brown mb-1.5">
          Model Fit
        </h2>
        <ModelFitPanel />
      </section>
    </div>
  );
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] =
    useState<(typeof TABS)[number]["id"]>("demographics");
  const {
    applications,
    isLoading,
    recentProfiles,
    chartData,
    policyDistribution,
    totalApps,
    approvedCount,
    cancelledCount,
  } = useDashboardData();
  const { avgPremium, totalPremium, premiumLoading } =
    usePremiumStats(applications);

  void avgPremium;
  void totalPremium;
  void premiumLoading;

  return (
    <div className="min-h-screen bg-stone-50">
      <NavBar />
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 space-y-2.5">
        <DashboardHeader />
        <KpiStrip
          isLoading={isLoading}
          totalApps={totalApps}
          approvedCount={approvedCount}
          cancelledCount={cancelledCount}
        />
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_300px] gap-4 items-start">
          <div className="min-w-0 space-y-3">
            <div
              role="tablist"
              aria-label="Dashboard sections"
              className="flex items-center gap-1 border-b border-stone-200"
            >
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-3 py-2 text-xs font-medium transition-colors ${activeTab === tab.id ? "text-tiger-brown" : "text-stone-500 hover:text-stone-700"}`}
                >
                  {tab.label}
                  <span
                    className={`absolute -bottom-px left-0 right-0 h-[2px] rounded-full bg-ust-gold transition-transform origin-left ${activeTab === tab.id ? "scale-x-100" : "scale-x-0"}`}
                  />
                </button>
              ))}
            </div>
            {activeTab === "demographics" && (
              <div role="tabpanel">
                <DemographicsContent chartData={chartData} />
              </div>
            )}
            {activeTab === "premium" && (
              <div role="tabpanel">
                <PremiumOverviewContent
                  policyDistribution={policyDistribution}
                  totalApps={totalApps}
                />
              </div>
            )}
          </div>
          <div className="xl:sticky xl:top-4">
            <RecentApplicationsPanel recentProfiles={recentProfiles} />
          </div>
        </div>
      </div>
    </div>
  );
}
