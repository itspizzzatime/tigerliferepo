"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BRAND } from "@/components/dashboard/data/dashboardDemoData";

interface ConditionsPieChartProps {
  data: { name: string; value: number }[];
}

const COLORS = [
  BRAND.amber,
  BRAND.brown,
  BRAND.terracotta,
  BRAND.sage,
  BRAND.rust,
  BRAND.tan,
];

const renderLegend = (props: any) => {
  const { payload } = props;
  return (
    <ul
      style={{
        listStyleType: "none",
        paddingLeft: 0,
        margin: 0,
        fontSize: "14px",
        lineHeight: 1.25,
      }}
    >
      {payload.map((entry: any, index: number) => (
        <li
          key={`item-${index}`}
          style={{
            color: "#57534E",
            marginBottom: "6px",
            display: "flex",
            alignItems: "center",
            whiteSpace: "nowrap",
          }}
        >
          <svg width="11" height="11" style={{ marginRight: "8px", flexShrink: 0 }}>
            <rect width="11" height="11" fill={entry.color} />
          </svg>
          {entry.payload.name} - {entry.payload.value}
        </li>
      ))}
    </ul>
  );
};

export default function ConditionsPieChart({ data }: ConditionsPieChartProps) {
  const topConditionNames = new Set([
    "None",
    "Mental Health",
    "Respiratory",
    "Hypertension",
    "High Cholesterol",
  ]);
  const topConditions = data.filter((entry) => topConditionNames.has(entry.name));
  const otherConditions = data.filter((entry) => !topConditionNames.has(entry.name));
  const groupedData = [
    ...topConditions,
    {
      name: `Other (${otherConditions.length} conditions)`,
      value: otherConditions.reduce((total, entry) => total + entry.value, 0),
    },
  ].sort((a, b) => b.value - a.value);

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={groupedData}
          cx="38%"
          cy="50%"
          labelLine={false}
          outerRadius={74}
          fill={BRAND.tan}
          dataKey="value"
          nameKey="name"
          label={({ percent }) =>
            percent > 0.08 ? `${(percent * 100).toFixed(0)}%` : ""
          }
        >
          {groupedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => [value, "Applicants"]} />
        <Legend
          iconSize={10}
          layout="vertical"
          verticalAlign="middle"
          align="right"
          wrapperStyle={{ right: 4, width: "49%" }}
          content={renderLegend}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
