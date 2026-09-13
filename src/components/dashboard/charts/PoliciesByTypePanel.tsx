import Panel from "../Panel";
import { BRAND } from "../data/dashboardDemoData";

export default function PoliciesByTypePanel() {
  const types = [
    { type: "Health", count: 113 },
    { type: "Travel", count: 106 },
    { type: "Home", count: 95 },
    { type: "Auto", count: 95 },
    { type: "Life", count: 91 },
  ];
  return (
    <Panel title="Policies by Type">
      <div className="h-[160px] flex flex-col justify-center space-y-2.5">
        {types.map((type) => (
          <div key={type.type} className="flex items-center gap-2 text-[10px]">
            <span className="w-10 shrink-0 text-stone-600">{type.type}</span>
            <div className="flex-1 bg-[#F2ECE1] rounded-full h-1.5">
              <div
                className="h-1.5 rounded-full"
                style={{
                  width: `${(type.count / 125) * 100}%`,
                  background: BRAND.amber,
                }}
              />
            </div>
            <span className="w-6 shrink-0 text-right text-stone-500">
              {type.count}
            </span>
          </div>
        ))}
      </div>
    </Panel>
  );
}
