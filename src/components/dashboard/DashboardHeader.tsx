import { Badge } from "@/components/ui/badge";
import { PawPrint } from "lucide-react";
import { BRAND } from "./data/dashboardDemoData";

export default function DashboardHeader() {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
        style={{ background: BRAND.amber }}
      >
        <PawPrint className="w-4.5 h-4.5 text-white" />
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h1 className="font-serif text-xl text-tiger-brown truncate">
            Admin Dashboard
          </h1>
          <Badge className="bg-ust-gold/15 text-tiger-brown hover:bg-ust-gold/15 text-[10px] px-1.5 py-0 border-none">
            Verified
          </Badge>
        </div>
        <p className="text-xs text-stone-500">Full system access granted</p>
      </div>
    </div>
  );
}
