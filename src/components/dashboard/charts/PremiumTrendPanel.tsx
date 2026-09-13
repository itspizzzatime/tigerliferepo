import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Panel from "../Panel";
import { BRAND, monthlyPremiumData } from "../data/dashboardDemoData";

export default function PremiumTrendPanel() {
  return (
    <Panel
      title="Policies vs Premium by Month"
      subtitle="Last 12 months"
    >
      <div className="h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={monthlyPremiumData}
            margin={{ top: 5, right: 12, left: -10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: 9 }} />
            <YAxis
              tick={{ fontSize: 9 }}
              tickFormatter={(value) => `₱${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              formatter={(value: number) => [
                `₱${value.toLocaleString("en-PH")}`,
                "Premium",
              ]}
            />
            <Line
              type="monotone"
              dataKey="amount"
              name="Premium"
              stroke={BRAND.amber}
              strokeWidth={2}
              dot={{ r: 2 }}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
}
