import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BRAND } from "@/components/dashboard/data/dashboardDemoData";

interface PremiumOverviewCardProps {
  monthlyPremium: number | null;
  monthlyLoading: boolean;
  onPay: () => void;
}

function formatPHP(amount: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount);
}

export default function PremiumOverviewCard({
  monthlyPremium,
  monthlyLoading,
  onPay,
}: PremiumOverviewCardProps) {
  return (
    <Card className="mb-8 border-2 border-primary/20 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">₱</span>
            </div>
            <div>
              <CardTitle>Your Monthly Premium</CardTitle>
              <CardDescription>
                Based on your profile and coverage selection
              </CardDescription>
            </div>
          </div>
          <Badge className="bg-primary/10 text-primary">Active</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div
          className="rounded-xl p-8 text-center text-white"
          style={{
            background: `linear-gradient(135deg, ${BRAND.amber}, ${BRAND.brown})`,
          }}
        >
          <p className="text-sm opacity-90 mb-2">Monthly Payment</p>
          <p className="text-6xl font-bold">
            {monthlyLoading ? (
              <span className="inline-flex items-center gap-2 text-2xl">
                <svg
                  className="animate-spin h-6 w-6 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              </span>
            ) : monthlyPremium === null ? (
              <span className="text-white/80">N/A</span>
            ) : (
              formatPHP(monthlyPremium)
            )}
          </p>
          <p className="text-sm opacity-90 mt-3">per month</p>
        </div>
        <div className="mt-4 flex justify-center">
          <Button
            onClick={onPay}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Pay Premium
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
