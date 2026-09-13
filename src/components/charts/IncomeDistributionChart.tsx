"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BRAND } from "@/components/dashboard/data/dashboardDemoData";

interface IncomeDistributionChartProps {
  data: { name: string; Standard: number; Conditional: number }[];
}

export default function IncomeDistributionChart({
  data,
}: IncomeDistributionChartProps) {
  const histogramData = data.map((bin) => ({
    name: bin.name,
    applicants: bin.Standard + bin.Conditional,
  }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart
        data={histogramData}
        margin={{ top: 8, right: 20, left: -10, bottom: 5 }}
        barCategoryGap={0}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value: number) => [value, "Applicants"]} />
        <Bar dataKey="applicants" name="Applicants" fill={BRAND.amber} />
      </BarChart>
    </ResponsiveContainer>
  );
}
