import AgeDistributionChart from "@/components/charts/AgeDistributionChart";
import IncomeDistributionChart from "@/components/charts/IncomeDistributionChart";
import Panel from "../Panel";
import type { DashboardChartData } from "../hooks/useDashboardData";

export default function ApplicantDemographicsSection({
  chartData,
}: {
  chartData: DashboardChartData | null;
}) {
  return (
    <section className="pt-1">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <Panel title="Age Distribution by Policy">
          <div className="h-[220px]">
            {chartData ? (
              <AgeDistributionChart data={chartData.ageData} />
            ) : (
              <div className="h-full w-full animate-pulse bg-stone-100 rounded-md" />
            )}
          </div>
        </Panel>
        <Panel title="Income Distribution by Policy">
          <div className="h-[220px]">
            {chartData ? (
              <IncomeDistributionChart data={chartData.incomeData} />
            ) : (
              <div className="h-full w-full animate-pulse bg-stone-100 rounded-md" />
            )}
          </div>
        </Panel>
      </div>
    </section>
  );
}
