"use client";

import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldCheck, 
  CheckCircle, 
  Calendar, 
  FileText, 
  User,
  CreditCard,
  Activity,
  Heart,
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  LogOut
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const monthlyPremiumData = [
  { month: "Jan", amount: 12500, growth: 8 },
  { month: "Feb", amount: 14200, growth: 13 },
  { month: "Mar", amount: 13800, growth: -3 },
  { month: "Apr", amount: 15600, growth: 13 },
  { month: "May", amount: 16900, growth: 8 },
  { month: "Jun", amount: 18700, growth: 11 },
];

const claimsData = [
  { month: "Jan", claims: 45, approved: 38, denied: 7 },
  { month: "Feb", claims: 52, approved: 44, denied: 8 },
  { month: "Mar", claims: 48, approved: 41, denied: 7 },
  { month: "Apr", claims: 61, approved: 53, denied: 8 },
  { month: "May", claims: 55, approved: 48, denied: 7 },
  { month: "Jun", claims: 67, approved: 59, denied: 8 },
];

const policyDistribution = [
  { type: "Basic", count: 420, color: "bg-blue-500", percentage: 34 },
  { type: "Standard", count: 512, color: "bg-green-500", percentage: 41 },
  { type: "Premium", count: 315, color: "bg-purple-500", percentage: 25 },
];

const claimsByCategory = [
  { category: "Hospital", amount: 45000, percentage: 35 },
  { category: "Outpatient", amount: 28000, percentage: 22 },
  { category: "Prescription", amount: 22000, percentage: 17 },
  { category: "Dental", amount: 18000, percentage: 14 },
  { category: "Vision", amount: 15000, percentage: 12 },
];

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isLoading, isAuthenticated, router]);


  if (isLoading || !isAuthenticated) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
            <p>Loading...</p>
        </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-primary" />
            <span className="font-bold text-xl text-gray-900">Admin Dashboard</span>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={logout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8 pt-24">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center">
              <User className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold text-gray-900">Admin Access</h1>
                <Badge className="bg-green-100 text-green-700">Verified</Badge>
              </div>
              <p className="text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-primary to-blue-600 text-white border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Total Policies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">1,247</p>
              <p className="text-xs opacity-80 mt-1">+12% this month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">$186K</p>
              <p className="text-xs opacity-80 mt-1">+8% this month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Active Claims
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">89</p>
              <p className="text-xs opacity-80 mt-1">Processing</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Satisfaction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">94%</p>
              <p className="text-xs opacity-80 mt-1">Customer rating</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                Monthly Premium Revenue
              </CardTitle>
              <CardDescription>Premium collections over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2 h-48">
                {monthlyPremiumData.map((data, index) => {
                  const maxAmount = Math.max(...monthlyPremiumData.map(d => d.amount));
                  const height = (data.amount / maxAmount) * 100;
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex flex-col items-center">
                        <span className="text-xs text-gray-500 mb-1">${(data.amount / 1000).toFixed(1)}k</span>
                        <div 
                          className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-md transition-all hover:from-green-500 hover:to-green-300"
                          style={{ height: `${height * 1.5}px` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-600">{data.month}</span>
                      <span className={`text-xs flex items-center ${data.growth >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {data.growth >= 0 ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                        {Math.abs(data.growth)}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-600" />
                Claims Overview
              </CardTitle>
              <CardDescription>Monthly claims processing status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2 h-48">
                {claimsData.map((data, index) => {
                  const maxClaims = Math.max(...claimsData.map(d => d.claims));
                  const approvedHeight = (data.approved / maxClaims) * 100;
                  const deniedHeight = (data.denied / maxClaims) * 100;
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex flex-col items-center">
                        <span className="text-xs text-gray-500 mb-1">{data.claims}</span>
                        <div className="w-full flex flex-col-reverse">
                          <div 
                            className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-b-md"
                            style={{ height: `${approvedHeight * 1.5}px` }}
                          />
                          <div 
                            className="w-full bg-gradient-to-t from-red-500 to-red-400 rounded-t-md"
                            style={{ height: `${deniedHeight * 1.5}px` }}
                          />
                        </div>
                      </div>
                      <span className="text-xs font-medium text-gray-600">{data.month}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                  <span className="text-xs text-gray-600">Approved</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                  <span className="text-xs text-gray-600">Denied</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <PieChart className="w-5 h-5 text-primary" />
                Policy Distribution
              </CardTitle>
              <CardDescription>Breakdown by policy type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-8">
                <div className="relative w-40 h-40">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    {policyDistribution.reduce((acc, policy, index) => {
                      const offset = acc.offset;
                      const dashArray = `${policy.percentage} ${100 - policy.percentage}`;
                      acc.elements.push(
                        <circle
                          key={index}
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          strokeWidth="20"
                          className={policy.color.replace('bg-', 'stroke-')}
                          strokeDasharray={dashArray}
                          strokeDashoffset={-offset}
                        />
                      );
                      acc.offset += policy.percentage;
                      return acc;
                    }, { offset: 0, elements: [] as JSX.Element[] }).elements}
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">1,247</p>
                      <p className="text-xs text-gray-500">Total</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 space-y-3">
                  {policyDistribution.map((policy, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${policy.color}`}></div>
                        <span className="text-sm font-medium text-gray-700">{policy.type}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-gray-900">{policy.count}</span>
                        <span className="text-xs text-gray-500 ml-1">({policy.percentage}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-yellow-600" />
                Claims by Category
              </CardTitle>
              <CardDescription>Distribution of claim amounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {claimsByCategory.map((claim, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-700">{claim.category}</span>
                      <span className="text-gray-900 font-semibold">${(claim.amount / 1000).toFixed(0)}k</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div 
                        className="h-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all"
                        style={{ width: `${claim.percentage}%` }}
                      />
                    </div>
                    <div className="text-right text-xs text-gray-500">{claim.percentage}% of total</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Applications</CardTitle>
              <CardDescription>Latest policy applications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "John Smith", status: "approved", date: "Today" },
                { name: "Sarah Johnson", status: "pending", date: "Yesterday" },
                { name: "Mike Wilson", status: "approved", date: "2 days ago" },
                { name: "Emily Davis", status: "pending", date: "3 days ago" },
              ].map((app, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{app.name}</p>
                      <p className="text-xs text-gray-500">{app.date}</p>
                    </div>
                  </div>
                  <Badge className={app.status === "approved" 
                    ? "bg-green-100 text-green-700" 
                    : "bg-yellow-100 text-yellow-700"
                  }>
                    {app.status === "approved" ? (
                      <><CheckCircle className="w-3 h-3 mr-1" /> Approved</>
                    ) : (
                      <>Pending</>
                    )}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-blue-50 text-blue-700 hover:bg-blue-100">
                <FileText className="w-4 h-4 mr-3" />
                View All Applications
              </Button>
              <Button className="w-full justify-start bg-green-50 text-green-700 hover:bg-green-100">
                <CreditCard className="w-4 h-4 mr-3" />
                Process Payments
              </Button>
              <Button className="w-full justify-start bg-purple-50 text-purple-700 hover:bg-purple-100">
                <Activity className="w-4 h-4 mr-3" />
                Review Claims
              </Button>
              <Button className="w-full justify-start bg-yellow-50 text-yellow-700 hover:bg-yellow-100">
                <Calendar className="w-4 h-4 mr-3" />
                Schedule Reports
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="font-medium text-gray-900">API Services</p>
                  <p className="text-xs text-gray-500">Operational</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="font-medium text-gray-900">Payment Gateway</p>
                  <p className="text-xs text-gray-500">Operational</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="font-medium text-gray-900">Database</p>
                  <p className="text-xs text-gray-500">Operational</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
