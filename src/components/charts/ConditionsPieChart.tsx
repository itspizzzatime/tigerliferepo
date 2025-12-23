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

const renderLegend = (props: any) => {
    const { payload } = props;
    return (
        <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
            {payload.map((entry: any, index: number) => (
                <li key={`item-${index}`} style={{ color: entry.color, marginBottom: '4px', display: 'flex', alignItems: 'center' }}>
                    <svg width="10" height="10" style={{ marginRight: '10px' }}>
                        <rect width="10" height="10" fill={entry.color} />
                    </svg>
                    {entry.payload.name} - {entry.payload.value}
                </li>
            ))}
        </ul>
    );
};

export default function ConditionsPieChart({ data }: ConditionsPieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          cx="40%" 
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => [value, "Applicants"]} />
        <Legend 
            iconSize={10}
            layout="vertical"
            verticalAlign="middle"
            align="right"
            content={renderLegend}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
