export const BRAND = {
  amber: "#E8892A",
  brown: "#8B5E34",
  terracotta: "#C97B63",
  sage: "#7C9070",
  rust: "#B5533F",
  tan: "#D8C6A6",
};

export const STATUS_COLOR: Record<string, string> = {
  "Not Claimed": BRAND.tan,
  Rejected: BRAND.rust,
  Approved: BRAND.sage,
  Pending: BRAND.amber,
};

export const monthlyPremiumData = [
  { month: "Jan", amount: 12500, growth: 8 },
  { month: "Feb", amount: 14200, growth: 13 },
  { month: "Mar", amount: 13800, growth: -3 },
  { month: "Apr", amount: 15600, growth: 13 },
  { month: "May", amount: 16900, growth: 8 },
  { month: "Jun", amount: 18700, growth: 11 },
  { month: "Jul", amount: 17500, growth: -6 },
  { month: "Aug", amount: 17900, growth: 2 },
  { month: "Sep", amount: 19500, growth: 9 },
  { month: "Oct", amount: 21100, growth: 8 },
  { month: "Nov", amount: 22800, growth: 8 },
  { month: "Dec", amount: 23500, growth: 3 },
];

export const claimsData = [
  { month: "Jan", claims: 45, approved: 38, denied: 7 },
  { month: "Feb", claims: 52, approved: 44, denied: 8 },
  { month: "Mar", claims: 48, approved: 41, denied: 7 },
  { month: "Apr", claims: 61, approved: 53, denied: 8 },
  { month: "May", claims: 55, approved: 48, denied: 7 },
  { month: "Jun", claims: 67, approved: 59, denied: 8 },
  { month: "Jul", claims: 63, approved: 54, denied: 9 },
  { month: "Aug", claims: 71, approved: 62, denied: 9 },
  { month: "Sep", claims: 75, approved: 65, denied: 10 },
  { month: "Oct", claims: 82, approved: 72, denied: 10 },
  { month: "Nov", claims: 78, approved: 68, denied: 10 },
  { month: "Dec", claims: 88, approved: 77, denied: 11 },
];

export const claimsByCategory = [
  { category: "Hospital", amount: 45000, percentage: 35 },
  { category: "Outpatient", amount: 28000, percentage: 22 },
  { category: "Prescription", amount: 22000, percentage: 17 },
  { category: "Dental", amount: 18000, percentage: 14 },
  { category: "Vision", amount: 15000, percentage: 12 },
];

export function formatPHP(amount: number, compact = true): string {
  if (compact) {
    if (Math.abs(amount) >= 1_000_000)
      return `₱${(amount / 1_000_000).toFixed(1)}M`;
    if (Math.abs(amount) >= 1_000) return `₱${(amount / 1_000).toFixed(1)}k`;
    return `₱${amount.toFixed(0)}`;
  }
  return `₱${amount.toLocaleString("en-PH")}`;
}
