"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface ConditionsPieChartProps {
  data: { name: string; value: number }[];
}

const COLORS = [
    '#8884d8', // None
    '#82ca9d', // Mental Health
    '#ffc658', // Congenital
    '#ff8042', // Diabetes
    '#0088FE', // Respiratory
    '#FF8042', // Kidney Disease
    '#00C49F', // High Cholesterol
    '#FFBB28', // Hypertension
    '#F44336', // Cardiovascular
    '#E91E63'  // Cancer
];

export default function ConditionsPieChart({ data }: ConditionsPieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

    