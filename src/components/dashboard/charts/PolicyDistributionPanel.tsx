import Panel from "../Panel";
import type { PolicyDistribution } from "../hooks/useDashboardData";

export default function PolicyDistributionPanel({
  policyDistribution,
  totalApps,
}: {
  policyDistribution: PolicyDistribution;
  totalApps: number;
}) {
  return (
    <Panel title="Policy Distribution">
      <div className="flex items-center gap-3 h-[180px]">
        <div className="relative w-28 h-28 shrink-0">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full -rotate-90 transform"
          >
            {policyDistribution.items.map((policy) => (
              <circle
                key={policy.type}
                cx="50"
                cy="50"
                r={policyDistribution.radius}
                fill="none"
                strokeWidth="15"
                stroke={policy.stroke}
                strokeDasharray={`${policy.strokeLength} ${policyDistribution.circumference}`}
                strokeDashoffset={-policy.offset}
                strokeLinecap="round"
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-base font-bold text-stone-900">
                {totalApps.toLocaleString("en-PH")}
              </p>
              <p className="text-[9px] text-stone-500">Total</p>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-1.5">
          {policyDistribution.items.map((policy) => (
            <div
              key={policy.type}
              className="flex items-center justify-between text-[11px]"
            >
              <span className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: policy.dotColor }}
                />
                <span className="text-stone-700">{policy.type}</span>
              </span>
              <span className="text-stone-900 font-semibold">
                {policy.count.toLocaleString("en-PH")}{" "}
                <span className="text-stone-400 font-normal">
                  ({policy.percentage}%)
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}
