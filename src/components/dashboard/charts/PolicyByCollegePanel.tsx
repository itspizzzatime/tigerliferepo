import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Panel from "../Panel";
import { BRAND } from "../data/dashboardDemoData";

const policyByCollege = [
  { short: "Medicine", name: "Faculty of Medicine and Surgery", policies: 100 },
  { short: "Nursing", name: "College of Nursing", policies: 95 },
  { short: "Pharmacy", name: "Faculty of Pharmacy", policies: 85 },
  { short: "Engineering", name: "Faculty of Engineering", policies: 80 },
  {
    short: "ICS",
    name: "Institute of Information and Computing Sciences",
    policies: 75,
  },
  { short: "Rehab", name: "College of Rehabilitation Sciences", policies: 70 },
  { short: "Science", name: "College of Science", policies: 65 },
  {
    short: "Commerce",
    name: "College of Commerce and Business Administration",
    policies: 60,
  },
  {
    short: "Accountancy",
    name: "Alfredo M. Velayo College of Accountancy",
    policies: 55,
  },
  {
    short: "Tourism",
    name: "College of Tourism and Hospitality Management",
    policies: 50,
  },
  { short: "Education", name: "College of Education", policies: 48 },
  { short: "Arts", name: "Faculty of Arts and Letters", policies: 45 },
  {
    short: "PE&A",
    name: "Institute of Physical Education and Athletics",
    policies: 42,
  },
  { short: "Architecture", name: "College of Architecture", policies: 40 },
  { short: "Fine Arts", name: "College of Fine Arts and Design", policies: 38 },
  { short: "Philosophy", name: "Faculty of Philosophy", policies: 35 },
  { short: "Music", name: "Conservatory of Music", policies: 32 },
  { short: "Civil Law", name: "Faculty of Civil Law", policies: 30 },
  { short: "Graduate", name: "UST Graduate School", policies: 28 },
  { short: "Canon Law", name: "Faculty of Canon Law", policies: 25 },
  { short: "Graduate Law", name: "UST Graduate School of Law", policies: 23 },
];

export default function PolicyByCollegePanel() {
  return (
    <Panel
      title="Policies by College"
      iconColor="text-amber-600"
    >
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={policyByCollege}
            margin={{ top: 8, right: 12, left: -10, bottom: 70 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="short"
              interval={0}
              angle={-45}
              textAnchor="end"
              height={70}
              tick={{ fontSize: 12, fontWeight: 500 }}
            />
            <YAxis tick={{ fontSize: 12, fontWeight: 500 }} />
            <Tooltip
              contentStyle={{ fontSize: 12 }}
              labelStyle={{ fontSize: 12, fontWeight: 600 }}
              formatter={(value: number) => [`${value} policies`, "Policies"]}
              labelFormatter={(label) =>
                policyByCollege.find((college) => college.short === label)
                  ?.name ?? label
              }
            />
            <Bar
              dataKey="policies"
              name="Policies"
              fill={BRAND.amber}
              radius={[3, 3, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
}
