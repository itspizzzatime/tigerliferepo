import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle,
  Shield,
  Heart,
  Phone,
  type LucideIcon,
} from "lucide-react";

interface BenefitCardProps {
  icon: LucideIcon;
  iconColorClass: string;
  title: string;
  items: string[];
}

function BenefitCard({
  icon: Icon,
  iconColorClass,
  title,
  items,
}: BenefitCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${iconColorClass}`} />
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3">
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
            <span className="text-sm text-gray-600">{item}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

const BENEFIT_SECTIONS: BenefitCardProps[] = [
  {
    icon: Shield,
    iconColorClass: "text-primary",
    title: "Coverage Details",
    items: [
      "Comprehensive health coverage",
      "Network of 10,000+ providers",
      "Prescription drug coverage",
    ],
  },
  {
    icon: Heart,
    iconColorClass: "text-red-600",
    title: "Health Services",
    items: [
      "Mental health services",
      "Preventive care at no extra cost",
      "Dental coverage included",
    ],
  },
  {
    icon: Phone,
    iconColorClass: "text-purple-600",
    title: "Support & Resources",
    items: [
      "24/7 customer support",
      "Online claims submission",
      "Mobile app access",
    ],
  },
];

export default function CoverageBenefits() {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      {BENEFIT_SECTIONS.map((section) => (
        <BenefitCard key={section.title} {...section} />
      ))}
    </div>
  );
}
