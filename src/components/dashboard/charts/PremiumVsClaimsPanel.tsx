import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Panel from "../Panel";
import { BRAND, claimsByCategory } from "../data/dashboardDemoData";

export default function PremiumVsClaimsPanel() {
  const data = claimsByCategory.map((claim) => ({
    ...claim,
    claims: claim.amount * 0.85,
  }));
  return (
    <Panel title="Premium vs Claims by Category">
      <div className="h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 12, left: -10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" tick={{ fontSize: 8 }} />
            <YAxis
              tick={{ fontSize: 9 }}
              tickFormatter={(value) => `₱${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              formatter={(value: number) => [
                `₱${value.toLocaleString("en-PH")}`,
              ]}
            />
            <Legend wrapperStyle={{ fontSize: 10 }} />
            <Bar dataKey="amount" name="Premium" fill={BRAND.brown} />
            <Bar dataKey="claims" name="Claims" fill={BRAND.amber} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
}
