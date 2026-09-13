import Panel from "../Panel";
import { BRAND } from "../data/dashboardDemoData";

export default function GenderDonutPanel() {
  return (
    <Panel title="Policies by Gender">
      <div className="h-[200px] flex flex-col items-center justify-center gap-1">
        <div className="relative w-32 h-32">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full -rotate-90 transform"
          >
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke={BRAND.terracotta}
              strokeWidth="13"
            />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke={BRAND.amber}
              strokeWidth="13"
              strokeDasharray={`${(412 / 835) * 263.9} 263.9`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-base font-semibold text-stone-900">835</span>
            <span className="text-[9px] text-stone-400">total</span>
          </div>
        </div>
        <div className="flex justify-center gap-7 mt-1">
          <span className="flex items-center gap-1.5 text-xs font-medium text-stone-700">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: BRAND.amber }}
            />
            Male <span className="text-stone-900 text-sm font-semibold">412</span>
          </span>
          <span className="flex items-center gap-1.5 text-xs font-medium text-stone-700">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: BRAND.terracotta }}
            />
            Female <span className="text-stone-900 text-sm font-semibold">423</span>
          </span>
        </div>
      </div>
    </Panel>
  );
}
