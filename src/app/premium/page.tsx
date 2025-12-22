"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, LogOut, User, FileText, Calendar, Heart, Phone } from "lucide-react";
import NavBar from "@/components/NavBar";
import TermsModal from "@/components/TermsModal";
import ClaimModal from "@/components/ClaimModal";
import PayModal from "@/components/PayModal";
import { computePremiumFromCoeffs } from "@/lib/premium_coeffs";
import info from "../../data/info.json";

export default function PremiumPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [monthlyPremium, setMonthlyPremium] = useState<number | null>(null);
  const [monthlyLoading, setMonthlyLoading] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showClaim, setShowClaim] = useState(false);
  const [showPay, setShowPay] = useState(false);
  
  const profiles = Object.values(info.profiles);
  const lastProfile = profiles.length > 0 ? profiles[profiles.length - 1] : null;
  const userProfile = user?.email && lastProfile?.email === user.email ? lastProfile : lastProfile;
  
  const displayName = userProfile?.fullName || "Guest";

  useEffect(() => {
    if (!userProfile) {
        setMonthlyPremium(null);
        return;
    }

    let mounted = true;

    const calculatePremium = () => {
      setMonthlyLoading(true);
      try {
        const profile = userProfile as any;
        
        // Ensure all required fields are present before calculating
        if (
          !profile?.height ||
          !profile?.weight ||
          !profile?.annualGrossIncome ||
          !profile?.smokingHabits ||
          !profile?.alcoholConsumption ||
          !profile?.substanceUse
        ) {
          if (mounted) {
            setMonthlyPremium(null);
            setMonthlyLoading(false);
          }
          return;
        }
        
        const premium = computePremiumFromCoeffs({
          height: Number(profile.height),
          weight: Number(profile.weight),
          annualGrossIncome: profile.annualGrossIncome,
          smokingHabits: profile.smokingHabits,
          alcoholConsumption: profile.alcoholConsumption,
          substanceUse: profile.substanceUse,
          preExistingConditions: profile.preExistingConditions || [],
        });

        if (!mounted) return;
        setMonthlyPremium(Number.isFinite(premium) ? premium : null);
      } catch {
        if (mounted) setMonthlyPremium(null);
      } finally {
        if (mounted) setMonthlyLoading(false);
      }
    };

    calculatePremium();

    return () => { mounted = false; };
  }, [userProfile]);



  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleViewDocuments = () => {
    setShowTerms(true);
  };

  const handleProfileSettings = () => {
    // This would typically open a profile edit modal or page
    alert("Profile settings page coming soon!");
  };

  const handleAppointments = () => {
    // This would typically navigate to an appointments page
    alert("Appointments page coming soon!");
  };

  const handleFileClaim = () => {
    setShowClaim(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <NavBar />
      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        {/* Welcome Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Welcome{displayName ? `, ${displayName}` : ""}!</h1>
              <p className="text-gray-500 mt-1">Your insurance portal dashboard</p>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={handleProfileSettings} variant="outline">Profile</Button>
              <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Premium Overview Card */}
        <Card className="mb-8 border-2 border-primary/20 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">₱</span>
                </div>
                <div>
                  <CardTitle>Your Monthly Premium</CardTitle>
                  <CardDescription>Based on your profile and coverage selection</CardDescription>
                </div>
              </div>
              <Badge className="bg-primary/10 text-primary">Active</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-primary to-blue-600 rounded-xl p-8 text-center text-white">
              <p className="text-sm opacity-90 mb-2">Monthly Payment</p>
              <p className="text-6xl font-bold">
                {monthlyLoading ? (
                  <span className="inline-flex items-center gap-2 text-2xl">
                    <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                  </span>
                ) : monthlyPremium === null ? (
                  <span className="text-white/80">N/A</span>
                ) : (
                  new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(monthlyPremium)
                )}
              </p>
              <p className="text-sm opacity-90 mt-3">per month</p>
            </div>

            <div className="mt-4 flex justify-center">
              <Button onClick={() => setShowPay(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground">Pay Premium</Button>
            </div>
          </CardContent>
        </Card>

        {/* Coverage Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg">Coverage Details</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                <span className="text-sm text-gray-600">Comprehensive health coverage</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                <span className="text-sm text-gray-600">Network of 10,000+ providers</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                <span className="text-sm text-gray-600">Prescription drug coverage</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-600" />
                <CardTitle className="text-lg">Health Services</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                <span className="text-sm text-gray-600">Mental health services</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                <span className="text-sm text-gray-600">Preventive care at no extra cost</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                <span className="text-sm text-gray-600">Dental coverage included</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-purple-600" />
                <CardTitle className="text-lg">Support & Resources</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                <span className="text-sm text-gray-600">24/7 customer support</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                <span className="text-sm text-gray-600">Online claims submission</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                <span className="text-sm text-gray-600">Mobile app access</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your account and coverage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <Button 
                onClick={handleViewDocuments}
                variant="outline" 
                className="justify-start h-auto py-4 flex-col items-start hover:bg-primary/5"
              >
                <FileText className="w-5 h-5 mb-2 text-primary" />
                <span className="font-semibold">View Documents</span>
                <span className="text-xs text-gray-500">Policy & statements</span>
              </Button>
              <Button 
                onClick={handleProfileSettings}
                variant="outline" 
                className="justify-start h-auto py-4 flex-col items-start hover:bg-green-500/5"
              >
                <User className="w-5 h-5 mb-2 text-green-600" />
                <span className="font-semibold">Profile Settings</span>
                <span className="text-xs text-gray-500">Update your info</span>
              </Button>
              <Button 
                onClick={handleAppointments}
                variant="outline" 
                className="justify-start h-auto py-4 flex-col items-start hover:bg-purple-500/5"
              >
                <Calendar className="w-5 h-5 mb-2 text-purple-600" />
                <span className="font-semibold">Appointments</span>
                <span className="text-xs text-gray-500">Schedule & history</span>
              </Button>
              <Button 
                onClick={handleFileClaim}
                variant="outline" 
                className="justify-start h-auto py-4 flex-col items-start hover:bg-red-500/5"
              >
                <Shield className="w-5 h-5 mb-2 text-red-600" />
                <span className="font-semibold">File a Claim</span>
                <span className="text-xs text-gray-500">Submit new claim</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <TermsModal open={showTerms} onOpenChange={setShowTerms} />
      <ClaimModal open={showClaim} onOpenChange={setShowClaim} />
      <PayModal open={showPay} onOpenChange={setShowPay} amount={monthlyPremium} />
    </div>
  );
}

    