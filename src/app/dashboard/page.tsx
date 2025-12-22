"use client";

import { useState, useMemo, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
// import { getQueryFn } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, CheckCircle, XCircle, Clock, User, Shield, CreditCard, Activity, Heart, ArrowLeft, TrendingUp, TrendingDown, DollarSign, PieChart, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import ApplicationModal from "@/components/ApplicationModal";
import ApplicationResultDialog from "@/components/ApplicationResultDialog";
import NavBar from "@/components/NavBar";
import type { ApplicationData } from "@/components/ApplicationModal";
import { parseIncomeOption } from "@/components/steps/utils/eligibility";
import { computePremiumFromCoeffs } from "@/lib/premium_coeffs";
// import DistributionPlot from "@/components/DistributionPlot";

const monthlyPremiumData = [
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

const claimsData = [
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

const claimsByCategory = [
  { category: "Hospital", amount: 45000, percentage: 35 },
  { category: "Outpatient", amount: 28000, percentage: 22 },
  { category: "Prescription", amount: 22000, percentage: 17 },
  { category: "Dental", amount: 18000, percentage: 14 },
  { category: "Vision", amount: 15000, percentage: 12 },
];

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [resultDialogOpen, setResultDialogOpen] = useState(false);
  const [resultData, setResultData] = useState<{
    status: "approved" | "declined";
    data: ApplicationData;
  } | null>(null);

    useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [authLoading, isAuthenticated, router]);


  const { data: applications, isLoading } = useQuery<any[]>({
    queryKey: ["/api/my-applications"],
    enabled: !!user,
  });

  const profiles = useMemo(() => {
    if (!applications) return [];
    return applications.map((profile: any) => ({
      id: profile.id,
      name: profile.fullName || "Unknown",
      date: profile.dateOfBirth || "Unknown",
      status: profile.preExistingConditions?.length ? "pending" : "approved"
    })).reverse().slice(0, 5);
  }, [applications]);

  const totalApplications = useMemo(() => applications?.length ?? 0, [applications]);
  
  const totalApps = totalApplications + 560;

  const policyDistribution = useMemo(() => {
    const roundedConditional = Math.round(totalApps * 0.34);
    const roundedStandard = Math.round(totalApps * 0.41);
    const roundedPremium = Math.round(totalApps * 0.25);
    return [
      { type: "Conditional", count: roundedConditional, color: "text-blue-500", stroke: "#3b82f6", percentage: 34 },
      { type: "Standard", count: roundedStandard, color: "text-green-500", stroke: "#22c55e", percentage: 41 },
      { type: "Premium", count: roundedPremium, color: "text-purple-500", stroke: "#a855f7", percentage: 25 },
    ];
  }, [totalApps]);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  let currentOffset = 0;


  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        );
      case "declined":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="w-3 h-3 mr-1" />
            Declined
          </Badge>
        );
      default:
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        );
    }
  };

  const formatDate = (date: Date | string | null) => {
    if (!date) return "32,123";
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleExitSecretDashboard = () => {
    router.push('/');
  };

  const [avgPremium, setAvgPremium] = useState<number | null>(null);
  const [totalPremium, setTotalPremium] = useState<number | null>(null);
  const [premiumEvalCount, setPremiumEvalCount] = useState(0);
  const [premiumLoading, setPremiumLoading] = useState(false);

  useEffect(() => {
    if (!applications) return;
    let mounted = true;
    
    const run = () => {
      setPremiumLoading(true);
      const values: number[] = [];
      for (const p of applications) {
        try {
          const input = {
            height: (p as any).height ?? '',
            weight: (p as any).weight ?? '',
            annualGrossIncome: (p as any).annualGrossIncome ?? (p as any).annual_gross_income ?? '',
            smokingHabits: (p as any).smokingHabits ?? ((p as any).smoker === true ? 'yes' : ((p as any).smoker === false ? 'no' : 'none')),
            alcoholConsumption: (p as any).alcoholConsumption ?? 'none',
            substanceUse: (p as any).substanceUse ?? 'none',
          };
          const val = computePremiumFromCoeffs(input as any);
          if (typeof val === 'number' && Number.isFinite(val)) values.push(val);
        } catch (e) {
          // ignore individual failures
        }
      }
      if (!mounted) return;
      const total = values.length ? values.reduce((a, b) => a + b, 0) : 0;
      setPremiumEvalCount(values.length);
      setTotalPremium(values.length ? total : null);
      setAvgPremium(values.length ? total / values.length : null);
      setPremiumLoading(false);
    };

    run();
    return () => { mounted = false; };
  }, [applications]);

  if (authLoading || !isAuthenticated) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
            <p>Loading...</p>
        </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <NavBar />
      {(
        <div className="bg-white/80 backdrop-blur-md border-b z-40">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-primary" />
              <span className="font-bold text-xl text-gray-900">Admin Dashboard</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleExitSecretDashboard}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Exit Dashboard
            </Button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-8">
        { (
          <>
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
                  <p className="text-gray-500">Full system access granted</p>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-primary to-blue-600 text-white border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Total Applications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">
                    {totalApplications ? totalApps: 210}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Approved
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">
                    {applications?.filter(a => (a as any).status === "approved").length ?? 457}
                  </p>
                </CardContent>
              </Card>

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
                  <p className="text-3xl font-bold">₱186K</p>
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

              <Card className="bg-gradient-to-br from-accent to-amber-600 text-white border-0">
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
                    <span className="w-5 h-5 text-green-600 flex items-center justify-center font-bold">
                      ₱
                    </span>
                    Monthly Premium Revenue
                  </CardTitle>
                  <CardDescription>Premium collections over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-1 h-38">
                    {monthlyPremiumData.map((data, index) => {
                      const maxAmount = Math.max(...monthlyPremiumData.map(d => d.amount));
                      const height = (data.amount / maxAmount) * 100;
                      return (
                        <div key={index} className="flex-1 flex flex-col items-center gap-2">
                          <div className="w-full flex flex-col items-center">
                            <span className="text-xs text-gray-500 mb-1">₱{(data.amount / 1000).toFixed(1)}k</span>
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
                      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 transform">
                        {policyDistribution.map((policy, index) => {
                          const strokeLength = (policy.percentage / 100) * circumference;
                          const offset = currentOffset;
                          currentOffset += strokeLength;

                          return (
                            <circle
                              key={index}
                              cx="50"
                              cy="50"
                              r={radius}
                              fill="none"
                              strokeWidth="15"
                              stroke={policy.stroke} 
                              strokeDasharray={`${strokeLength} ${circumference}`}
                              strokeDashoffset={-offset}
                              strokeLinecap="round"
                              className="transition-all duration-500 ease-out"
                            />
                          );
                        })}
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">{totalApps}</p>
                          <p className="text-xs text-gray-500">Total</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 space-y-3">
                      {policyDistribution.map((policy, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${policy.color.replace('text-', 'bg-')}`}></div>
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
                    <CreditCard className="w-5 h-5 text-accent" />
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
                          <span className="text-gray-900 font-semibold">₱{(claim.amount / 1000).toFixed(0)}k</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-3">
                          <div 
                            className="h-3 rounded-full bg-gradient-to-r from-accent to-amber-600 transition-all"
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
                  {profiles.map((app) => (
                    <div 
                      key={app.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      {/* Left Side */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>

                        <div>
                          <p className="font-medium text-gray-900">{app.name}</p>
                          <p className="text-xs text-gray-500">{app.date}</p>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <Badge
                        className={
                          app.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-green-100 text-green-700"
                        }
                      >
                        {app.status === "approved" ? (
                          <>
                            <CheckCircle className="w-3 h-3 mr-1" /> Approved
                          </>
                        ) : (
                          <><CheckCircle className="w-3 h-3 mr-1" /> Approved
                          </>
                        )}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Frequency vs Fitted Claims Distribution</CardTitle>
                    <CardDescription>Histogram of observed values overlaid with the Weibull fit</CardDescription>
                  </CardHeader>
                  <CardContent>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}        
      </div>
    </div>
  );
}