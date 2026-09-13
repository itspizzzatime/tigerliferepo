"use client";

import dynamic from "next/dynamic";
import { CheckCircle2, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Panel from "../Panel";
import { BRAND } from "../data/dashboardDemoData";

const DistributionPlot = dynamic(
  () => import("@/components/DistributionPlot"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[170px] w-full animate-pulse bg-stone-100 rounded-md" />
    ),
  },
);
type RecentProfile = { id: string; name: string; date: string; status: string };

export function RecentApplicationsPanel({
  recentProfiles,
}: {
  recentProfiles: RecentProfile[];
}) {
  return (
    <Panel icon={User} title="Recent Applications" iconColor="text-amber-600">
      <div className="space-y-1.5">
        {recentProfiles.map((profile) => (
          <div
            key={profile.id}
            className="flex items-center justify-between px-2 py-1.5 bg-stone-50 rounded-md"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 shrink-0 bg-amber-100 rounded-full flex items-center justify-center">
                <User className="w-3 h-3 text-amber-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-stone-900 truncate">
                  {profile.name}
                </p>
                <p className="text-[10px] text-stone-500">{profile.date}</p>
              </div>
            </div>
            <Badge
              className="text-[10px] px-1.5 py-0 border-none"
              style={{
                background:
                  profile.status === "approved" ? "#EDF1E9" : "#F2ECE1",
                color: profile.status === "approved" ? "#4F5F47" : BRAND.brown,
              }}
            >
              {profile.status === "approved" ? (
                <>
                  <CheckCircle2 className="w-2.5 h-2.5 mr-1" /> Approved
                </>
              ) : (
                <>
                  <Clock className="w-2.5 h-2.5 mr-1" /> Pending
                </>
              )}
            </Badge>
          </div>
        ))}
      </div>
    </Panel>
  );
}

export function ModelFitPanel() {
  return (
    <Panel
      title="Frequency vs Fitted Claims Distribution"
      subtitle="Observed vs Weibull fit"
    >
      <div className="h-[170px]">
        <DistributionPlot />
      </div>
    </Panel>
  );
}

export default function RecentActivitySection({
  recentProfiles,
}: {
  recentProfiles: RecentProfile[];
}) {
  return (
    <section className="pt-1 pb-2">
      <h2 className="font-serif text-base text-tiger-brown mb-1.5">
        Recent Applications &amp; Model Fit
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <RecentApplicationsPanel recentProfiles={recentProfiles} />
        <ModelFitPanel />
      </div>
    </section>
  );
}
