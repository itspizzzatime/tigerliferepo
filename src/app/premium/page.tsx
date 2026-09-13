"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import TermsModal from "@/components/TermsModal";
import ClaimModal from "@/components/ClaimModal";
import PayModal from "@/components/PayModal";
import CancelSubscriptionDialog from "@/components/CancelSubscriptionDialog";
import { deleteUserData } from "@/app/actions";
import { useUserProfile } from "@/components/accepted/hooks/useUserProfile";
import { usePremiumCalculation } from "@/components/accepted/hooks/usePremiumCalculation";
import WelcomeHeader from "@/components/accepted/components/WelcomeHeader";
import PremiumOverviewCard from "@/components/accepted/components/PremiumOverviewCard";
import QuickActionsCard from "@/components/accepted/components/QuickActionsCard";
import CancelSubscriptionCard from "@/components/accepted/components/CancelSubscriptionCard";

export default function PremiumPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [showTerms, setShowTerms] = useState(false);
  const [showClaim, setShowClaim] = useState(false);
  const [showPay, setShowPay] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const { userProfile, displayName } = useUserProfile(user?.email);
  const { monthlyPremium, monthlyLoading } = usePremiumCalculation(userProfile);

  const handleProfileSettings = () => {
    alert("Profile settings page coming soon!");
  };

  const handleAppointments = () => {
    alert("Appointments page coming soon!");
  };

  const handleConfirmCancel = async () => {
    if (!user?.email) {
      alert("Could not identify user. Please log in again.");
      return;
    }

    const result = await deleteUserData(user.email);
    if (result.success) {
      logout();
    } else {
      alert(result.error || "Something went wrong.");
    }
    setShowCancelDialog(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <NavBar />
      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        <WelcomeHeader displayName={displayName} />
        <PremiumOverviewCard
          monthlyPremium={monthlyPremium}
          monthlyLoading={monthlyLoading}
          onPay={() => setShowPay(true)}
        />
        <QuickActionsCard
          onViewDocuments={() => setShowTerms(true)}
          onProfileSettings={handleProfileSettings}
          onAppointments={handleAppointments}
          onFileClaim={() => setShowClaim(true)}
        />
        <CancelSubscriptionCard
          onCancelClick={() => setShowCancelDialog(true)}
        />
      </div>

      <TermsModal open={showTerms} onOpenChange={setShowTerms} />
      <ClaimModal open={showClaim} onOpenChange={setShowClaim} />
      <PayModal
        open={showPay}
        onOpenChange={setShowPay}
        amount={monthlyPremium}
      />
      <CancelSubscriptionDialog
        open={showCancelDialog}
        onOpenChange={setShowCancelDialog}
        onConfirm={handleConfirmCancel}
      />
    </div>
  );
}
