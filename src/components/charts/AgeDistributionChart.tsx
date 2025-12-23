"use client";

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface AgeDistributionChartProps {
    data: { name: string; Standard: number; Conditional: number }[];
}

export default function AgeDistributionChart({ data }: AgeDistributionChartProps) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Standard" fill="#22c55e" />
        <Bar dataKey="Conditional" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  );
}
