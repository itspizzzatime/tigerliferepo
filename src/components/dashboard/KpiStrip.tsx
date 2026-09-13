import {
  Activity,
  CheckCircle2,
  FileText,
  Heart,
  Shield,
  Wallet,
  XCircle,
} from "lucide-react";
import StatTile from "./StatTile";

type KpiStripProps = {
  isLoading: boolean;
  totalApps: number;
  approvedCount: number;
  cancelledCount: number;
};

export default function KpiStrip({
  isLoading,
  totalApps,
  approvedCount,
  cancelledCount,
}: KpiStripProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-1.5">
      <StatTile
        icon={FileText}
        label="Applications"
        value={totalApps.toLocaleString("en-PH")}
        loading={isLoading}
        tone="brand"
      />
      <StatTile
        icon={CheckCircle2}
        label="Approved"
        value={approvedCount.toLocaleString("en-PH")}
        loading={isLoading}
        tone="positive"
      />
      <StatTile
        icon={XCircle}
        label="Cancelled"
        value={cancelledCount}
        tone="negative"
      />
      <StatTile icon={Shield} label="Policies" value="835" tone="neutral" />
      <StatTile icon={Wallet} label="Revenue" value="₱186.0k" tone="brand" />
      <StatTile
        icon={Activity}
        label="Active Claims"
        value="240"
        tone="neutral"
      />
      <StatTile icon={Heart} label="Satisfaction" value="94%" tone="brand" />
    </div>
  );
}
