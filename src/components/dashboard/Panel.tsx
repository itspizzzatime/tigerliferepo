import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ElementType, ReactNode } from "react";

type PanelProps = {
  icon?: ElementType;
  title: string;
  subtitle?: string;
  iconColor?: string;
  children: ReactNode;
  className?: string;
};

export default function Panel({
  icon: Icon,
  title,
  subtitle,
  iconColor = "text-amber-600",
  children,
  className = "",
}: PanelProps) {
  return (
    <Card className={`border border-stone-200 shadow-sm ${className}`}>
      <CardHeader className="p-2.5 pb-1">
        <CardTitle className="text-xs font-semibold flex items-center gap-1.5 text-stone-700">
          {Icon && <Icon className={`w-3.5 h-3.5 ${iconColor}`} />}
          {title}
        </CardTitle>
        {subtitle && (
          <CardDescription className="text-[10px]">{subtitle}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="p-2.5 pt-1.5">{children}</CardContent>
    </Card>
  );
}
