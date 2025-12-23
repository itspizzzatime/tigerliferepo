"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { checkEligibility } from "./utils/eligibility";
import type { ApplicationData } from "../ApplicationModal";

interface AcceptedPageProps {
  onContinue: () => void;
  applicationData: ApplicationData;
  onFail?: () => void;
}

export default function AcceptedPage({ onContinue, applicationData, onFail }: AcceptedPageProps) {
  useEffect(() => {
    try {
      const result = checkEligibility(applicationData);
      if (result === 'Decline') {
        onFail?.();
      }
    } catch (e) {
      // ignore errors from re-check
    }
  }, [applicationData, onFail]);

  const referenceNumber = `SL-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

  return (
    <div className="text-center py-8 space-y-6">
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-primary" />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-2xl font-bold">Application Approved!</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Congratulations! Your insurance application has been approved. 
          Your coverage will be activated within 24-48 hours.
        </p>
      </div>

      <div className="bg-primary/5 border border-primary/20 p-6 rounded-md max-w-lg mx-auto">
        <p className="text-sm text-muted-foreground mb-2">Application Reference Number</p>
        <p className="text-2xl font-bold text-primary" data-testid="text-reference">
          {referenceNumber}
        </p>
      </div>

      <div className="bg-muted p-6 rounded-md max-w-lg mx-auto text-left space-y-4">
        <h4 className="font-semibold">Next Steps:</h4>
        <ul className="space-y-3 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-primary font-bold">1.</span>
            <span>Check your email for confirmation and policy documents</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">2.</span>
            <span>Review your coverage details and payment schedule</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">3.</span>
            <span>Complete your first premium payment to activate coverage</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">4.</span>
            <span>Download your insurance card from your member portal</span>
          </li>
        </ul>
      </div>

      <div className="flex justify-center gap-3 pt-4 flex-wrap">
        <Button onClick={onContinue} data-testid="button-done">
          Create an Account
        </Button>
      </div>
    </div>
  );
}
