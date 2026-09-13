"use client";

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
import { BRAND } from "@/components/dashboard/data/dashboardDemoData";

interface AgeDistributionChartProps {
  data: { name: string; Standard: number; Conditional: number }[];
}

export default function AgeDistributionChart({
  data,
}: AgeDistributionChartProps) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart
        data={data}
        margin={{ top: 28, right: 20, left: -10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend
          verticalAlign="top"
          align="right"
          iconType="circle"
          wrapperStyle={{
            top: 2,
            right: 4,
            width: "auto",
            padding: "2px 4px",
            backgroundColor: "rgba(255,255,255,0.92)",
            border: "1px solid #E7E5E4",
            borderRadius: 3,
            fontSize: 10,
          }}
        />
        <Bar dataKey="Standard" fill={BRAND.amber} />
        <Bar dataKey="Conditional" fill={BRAND.brown} />
      </BarChart>
    </ResponsiveContainer>
  );
}
