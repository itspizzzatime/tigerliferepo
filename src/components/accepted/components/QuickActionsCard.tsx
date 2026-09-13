import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  User,
  Calendar,
  Shield,
  type LucideIcon,
} from "lucide-react";

interface QuickAction {
  icon: LucideIcon;
  iconColorClass: string;
  hoverClass: string;
  label: string;
  description: string;
  onClick: () => void;
}

interface QuickActionsCardProps {
  onViewDocuments: () => void;
  onProfileSettings: () => void;
  onAppointments: () => void;
  onFileClaim: () => void;
}

export default function QuickActionsCard({
  onViewDocuments,
  onProfileSettings,
  onAppointments,
  onFileClaim,
}: QuickActionsCardProps) {
  const actions: QuickAction[] = [
    {
      icon: FileText,
      iconColorClass: "text-primary",
      hoverClass: "hover:bg-primary/5",
      label: "View Documents",
      description: "Policy & statements",
      onClick: onViewDocuments,
    },
    {
      icon: User,
      iconColorClass: "text-green-600",
      hoverClass: "hover:bg-green-500/5",
      label: "Profile Settings",
      description: "Update your info",
      onClick: onProfileSettings,
    },
    {
      icon: Calendar,
      iconColorClass: "text-purple-600",
      hoverClass: "hover:bg-purple-500/5",
      label: "Appointments",
      description: "Schedule & history",
      onClick: onAppointments,
    },
    {
      icon: Shield,
      iconColorClass: "text-red-600",
      hoverClass: "hover:bg-red-500/5",
      label: "File a Claim",
      description: "Submit new claim",
      onClick: onFileClaim,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Manage your account and coverage</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-4 gap-4">
          {actions.map(
            ({
              icon: Icon,
              iconColorClass,
              hoverClass,
              label,
              description,
              onClick,
            }) => (
              <Button
                key={label}
                onClick={onClick}
                variant="outline"
                className={`justify-start h-auto py-4 flex-col items-start ${hoverClass}`}
              >
                <Icon className={`w-5 h-5 mb-2 ${iconColorClass}`} />
                <span className="font-semibold">{label}</span>
                <span className="text-xs text-gray-500">{description}</span>
              </Button>
            ),
          )}
        </div>
      </CardContent>
    </Card>
  );
}
