"use client";

import dynamic from 'next/dynamic';

import { useState, useMemo, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, CheckCircle, XCircle, Clock, User, Shield, CreditCard, Activity, Heart, ArrowLeft, TrendingUp, TrendingDown, DollarSign, PieChart, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import ApplicationModal from "@/components/ApplicationModal";
import ApplicationResultDialog from "@/components/ApplicationResultDialog";
import NavBar from "@/components/NavBar";
import type { ApplicationData } from "@/components/ApplicationModal";
import { parseIncomeOption, checkEligibility, EligibilityResult } from "@/components/steps/utils/eligibility";
import { computePremiumFromCoeffs } from "@/lib/premium_coeffs";
import info from "../../data/info.json";  
import AgeDistributionChart from "@/components/charts/AgeDistributionChart";
import IncomeDistributionChart from "@/components/charts/IncomeDistributionChart";
import ConditionsPieChart from "@/components/charts/ConditionsPieChart";
import ScrollAnimate from '@/components/ScrollAnimate';


const DistributionPlot = dynamic(() => import('@/components/DistributionPlot'), { 
  ssr: false,
  loading: () => <div className="h-[360px] w-full animate-pulse bg-gray-100" />
});

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

function calculateAge(dateOfBirth: string): number {
  if (!dateOfBirth) return 0;
  const dob = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
  }
  return age;
}

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [resultDialogOpen, setResultDialogOpen] = useState(false);
  const [resultData, setResultData] = useState<{
    status: "approved" | "declined";
    data: ApplicationData;
  } | null>(null);

  const fetchApplications = async () => {
    // Simulate API call to fetch all profiles from info.json
    return new Promise<any[]>(resolve => {
      setTimeout(() => {
        resolve(Object.values(info.profiles));
      }, 500);
    });
  };

  const { data: applications, isLoading } = useQuery<any[]>({
    queryKey: ["my-applications"],
    queryFn: fetchApplications,
  });

  const recentProfiles = useMemo(() => {
    const allProfiles = Object.values(info.profiles);
    return allProfiles.reverse().slice(0, 5).map((profile: any) => ({
        id: profile.id,
        name: profile.fullName || "Unknown",
        date: profile.dateOfBirth || "Unknown",
        status: profile.preExistingConditions?.length ? "pending" : "approved"
    }));
  }, []);

  const totalApplications = useMemo(() => Object.keys(info.profiles).length, []);
  const totalApps = totalApplications + 1111; // Adding an arbitrary number to make it look larger
  const approve = useMemo(() => {
    return (Object.values(info.profiles) as ApplicationData[]).filter(p => checkEligibility(p) !== 'Decline').length + 911;
  }, []);
  const approvedCount = approve;

  const chartData = useMemo(() => {
    if (!applications) return null;

    const allProfiles = applications as ApplicationData[];

    // Age Distribution
    const ageData: { name: string; Standard: number; Conditional: number }[] = [
      { name: '16', Standard: 31, Conditional: 15 },
      { name: '17', Standard: 44, Conditional: 21 },
      { name: '18', Standard: 75, Conditional: 35 },
      { name: '19', Standard: 93, Conditional: 44 },
      { name: '20', Standard: 111, Conditional: 52 },
      { name: '21', Standard: 93, Conditional: 44 },
      { name: '22', Standard: 75, Conditional: 35 },
      { name: '23', Standard: 50, Conditional: 24 },
      { name: '24', Standard: 31, Conditional: 15 },
      { name: '25', Standard: 19, Conditional: 9 },
    ];
    
    // Income Distribution
    const incomeData: { name: string; Standard: number; Conditional: number }[] = [
      { name: 'Under ₱100k', Standard: 85,  Conditional: 40 },
      { name: '₱100k–300k',  Standard: 175, Conditional: 82 },
      { name: '₱300k–600k',  Standard: 212, Conditional: 100 },
      { name: '₱600k–1M',    Standard: 110, Conditional: 52 },
      { name: '₱1M+',        Standard: 40,  Conditional: 20 },
    ];

    // Conditions Distribution
    const conditionsCount: Record<string, number> = {
        'None': 420,
        'Mental Health': 174,
        'Congenital': 22,
        'Diabetes': 26,
        'Respiratory': 74,
        'Kidney Disease': 12,
        'High Cholesterol': 38,
        'Hypertension': 45,
        'Cardiovascular': 32,
        'Cancer': 18,
    };
    
    const conditionsPieData = Object.entries(conditionsCount)
      .filter(([, count]) => count > 0)
      .map(([name, value]) => ({ name, value }));

    return { ageData, incomeData, conditionsPieData };
  }, [applications]);
  
  const policyDistribution = useMemo(() => {
    return [
      { type: "Standard", count: Math.round(totalApps * 0.56), color: "text-green-500", stroke: "#22c55e", percentage: 56 },
      { type: "Conditional", count: Math.round(totalApps * 0.26), color: "text-yellow-500", stroke: "#facc15", percentage: 26 },
      { type: "Decline", count: Math.round(totalApps * 0.18), color: "text-red-500", stroke: "#ef4444", percentage: 18 },
    ];
  }, [totalApps]);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  let currentOffset = 0;

  const handleBackToHome = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <NavBar />
        <div className="bg-white/80 backdrop-blur-md border-b z-40 pt-10">
        </div>
      <div className="max-w-7xl mx-auto px-6 py-8">
        
            <div className="mb-8">
              <ScrollAnimate>
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
              </ScrollAnimate>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <ScrollAnimate>
                <Card className="bg-gradient-to-br from-primary to-blue-600 text-white border-0">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Total Applications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold">
                      {isLoading ? '...' : totalApps}
                    </p>
                  </CardContent>
                </Card>
              </ScrollAnimate>

              <ScrollAnimate>
                <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Approved
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold">
                      {isLoading ? '...' : approvedCount}
                    </p>
                  </CardContent>
                </Card>
              </ScrollAnimate>

              <ScrollAnimate>
               <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <XCircle className="w-5 h-5" />
                    Cancelled
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">
                    3
                  </p>
                </CardContent>
              </Card>
              </ScrollAnimate>
            </div>

            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <ScrollAnimate>
              <Card className="bg-gradient-to-br from-primary to-blue-600 text-white border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Total Policies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">835</p>
                  <p className="text-xs opacity-80 mt-1">+12% this month</p>
                </CardContent>
              </Card>
              </ScrollAnimate>

              <ScrollAnimate>
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
              </ScrollAnimate>

              <ScrollAnimate>
              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Active Claims
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">240</p>
                  <p className="text-xs opacity-80 mt-1">Processing</p>
                </CardContent>
              </Card>
              </ScrollAnimate>

              <ScrollAnimate>
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
              </ScrollAnimate>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <ScrollAnimate>
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
              </ScrollAnimate>

              <ScrollAnimate>
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
              </ScrollAnimate>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
                <ScrollAnimate>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-primary" />
                            Age Distribution by Policy
                        </CardTitle>
                        <CardDescription>Applicant ages for Standard vs. Conditional policies</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {chartData?.ageData ? <AgeDistributionChart data={chartData.ageData} /> : <div className="h-[250px] w-full animate-pulse bg-gray-100 rounded-md" />}
                    </CardContent>
                </Card>
                </ScrollAnimate>
                <ScrollAnimate>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <span className="w-5 h-5 text-green-600 flex items-center justify-center font-bold">
                              ₱
                          </span>
                          Income Distribution by Policy
                        </CardTitle>
                        <CardDescription>Family income levels for Standard vs. Conditional policies</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {chartData?.incomeData ? <IncomeDistributionChart data={chartData.incomeData} /> : <div className="h-[250px] w-full animate-pulse bg-gray-100 rounded-md" />}
                    </CardContent>
                </Card>
                </ScrollAnimate>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
                <ScrollAnimate>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <PieChart className="w-5 h-5 text-purple-600" />
                            Pre-existing Conditions
                        </CardTitle>
                        <CardDescription>Distribution of applicant health conditions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {chartData?.conditionsPieData ? <ConditionsPieChart data={chartData.conditionsPieData} /> : <div className="h-[250px] w-full animate-pulse bg-gray-100 rounded-md" />}
                    </CardContent>
                </Card>
                </ScrollAnimate>

                <ScrollAnimate>
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
                </ScrollAnimate>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <ScrollAnimate>
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
              </ScrollAnimate>

              <ScrollAnimate>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Applications</CardTitle>
                  <CardDescription>Latest policy applications</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {recentProfiles.map((app) => (
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
              </ScrollAnimate>
            </div>
            
            <ScrollAnimate>
            <Card>
                <CardHeader>
                  <CardTitle>Frequency vs Fitted Claims Distribution</CardTitle>
                  <CardDescription>Histogram of observed values overlaid with the Weibull fit</CardDescription>
                </CardHeader>
                <CardContent className="h-full flex items-center">
                  <DistributionPlot />
                </CardContent>
              </Card>
            </ScrollAnimate>
      </div>
    </div>
  );
}
