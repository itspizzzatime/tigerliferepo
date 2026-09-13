import Panel from "../Panel";
import { formatPHP, STATUS_COLOR } from "../data/dashboardDemoData";

export default function ClaimsByStatusPanel() {
  const rows = [
    { label: "Not Claimed", value: 977900, pct: 90 },
    { label: "Rejected", value: 882600, pct: 82 },
    { label: "Approved", value: 1100000, pct: 100 },
    { label: "Pending", value: 1000000, pct: 92 },
  ];
  return (
    <Panel title="Claims by Status">
      <div className="h-[160px] flex flex-col justify-center space-y-2.5">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center gap-2 text-[10px]">
            <span className="w-16 shrink-0 text-stone-600">{row.label}</span>
            <div className="flex-1 bg-[#F2ECE1] rounded-full h-2">
              <div
                className="h-2 rounded-full"
                style={{
                  width: `${row.pct}%`,
                  background: STATUS_COLOR[row.label],
                }}
              />
            </div>
            <span className="w-10 shrink-0 text-right text-stone-500">
              {formatPHP(row.value)}
            </span>
          </div>
        ))}
      </div>
    </Panel>
  );
}
