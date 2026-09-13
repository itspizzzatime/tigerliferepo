import ConditionsPieChart from "@/components/charts/ConditionsPieChart";
import Panel from "../Panel";
import type { DashboardChartData } from "../hooks/useDashboardData";

export function PreExistingConditionsPanel({
  chartData,
}: {
  chartData: DashboardChartData | null;
}) {
  return (
    <Panel title="Pre-existing Conditions">
      <div className="h-[220px]">
        {chartData ? (
          <ConditionsPieChart data={chartData.conditionsPieData} />
        ) : (
          <div className="h-full w-full animate-pulse bg-stone-100 rounded-md" />
        )}
      </div>
    </Panel>
  );
}

export default function RiskAndPolicyMixSection({
  chartData,
}: {
  chartData: DashboardChartData | null;
}) {
  return (
    <section className="pt-1">
      <PreExistingConditionsPanel chartData={chartData} />
    </section>
  );
}
