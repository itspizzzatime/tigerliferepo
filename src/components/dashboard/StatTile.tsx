import { Card, CardContent } from "@/components/ui/card";
import type { ElementType } from "react";

type StatTileProps = {
  icon: ElementType;
  label: string;
  value: string | number;
  tone?: "brand" | "positive" | "negative" | "neutral";
  loading?: boolean;
};

export default function StatTile({
  icon: Icon,
  label,
  value,
  tone = "brand",
  loading = false,
}: StatTileProps) {
  const toneStyles = {
    brand: {
      chip: "bg-amber-100",
      icon: "text-amber-600",
      value: "text-tiger-brown",
    },
    positive: {
      chip: "bg-[#EDF1E9]",
      icon: "text-[#5F7356]",
      value: "text-[#4F5F47]",
    },
    negative: {
      chip: "bg-[#F7E8E4]",
      icon: "text-[#B5533F]",
      value: "text-[#96432F]",
    },
    neutral: {
      chip: "bg-[#F2ECE1]",
      icon: "text-[#8B7355]",
      value: "text-tiger-brown",
    },
  }[tone];
  return (
    <Card className="border border-stone-200 shadow-sm">
      <CardContent className="p-2.5 flex items-center gap-2">
        <div
          className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center ${toneStyles.chip}`}
        >
          <Icon className={`w-3.5 h-3.5 ${toneStyles.icon}`} />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] leading-tight text-stone-500 truncate">
            {label}
          </p>
          {loading ? (
            <div className="h-5 w-14 mt-0.5 rounded bg-stone-100 animate-pulse" />
          ) : (
            <p
              className={`text-base font-bold leading-tight ${toneStyles.value}`}
            >
              {value}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
