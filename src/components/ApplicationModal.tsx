"use client";

import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import ProgressIndicator from "./ProgressIndicator";
import InsuranceInfoStep from "./steps/InsuranceInfoStep";
import BasicInfoStep from "./steps/BasicInfoStep";
import HealthInfoStep from "./steps/HealthInfoStep";
import HospitalizationStep from "./steps/HospitalizationStep";
import ReviewStep from "./steps/ReviewStep";
import AcceptedPage from "./steps/AcceptedPage";
import DeclinePage from "./steps/DeclinePage";
import LoginStep from "./steps/LoginStep";
import { checkEligibility, EligibilityResult } from "./steps/utils/eligibility";
import { saveApplication } from "@/app/actions";

interface ApplicationModalProps {
  open: boolean;
  onClose: () => void;
  onResultReady?: (status: "approved" | "declined", data: ApplicationData) => void;
}

export interface ApplicationData {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  college: string;
  program: string;
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  annualGrossIncome: string;
  address: string;
  emergencyContact: string;
  emergencyName: string;
  preExistingConditions: string[];

  height?: string;
  weight?: string;
  smokingHabits?: string;
  lifestyle?: string;
  substanceUse?: "none" | "occasional" | "heavy";

  currentMedications: string;
  familyHistory: string;
  alcoholConsumption: "none" | "occasional" | "heavy";
  hospitalizations: string;
}

const initialData: ApplicationData = {
  fullName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  college: "",
  address: "",
  emergencyContact: "",
  emergencyName: "",
  program: "",
  fatherName: "",
  fatherOccupation: "",
  motherName: "",
  motherOccupation: "",
  annualGrossIncome: "",
  preExistingConditions: [],
  height: "",
  weight: "",
  smokingHabits: "",
  lifestyle: "",
  substanceUse: "none",
  currentMedications: "",
  familyHistory: "",
  alcoholConsumption: "none",
  hospitalizations: "",
};

export default function ApplicationModal({ open, onClose, onResultReady }: ApplicationModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [applicationData, setApplicationData] = useState<ApplicationData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const contentRef = useRef<HTMLDivElement | null>(null);

  const stepLabels = ["Info", "Basic", "Health", "History", "Review", "Result", "Login"];

  const goToStep = (step: number) => {
    setCurrentStep(step);
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNext = async () => {
    if (currentStep === 7) {
        setIsSubmitting(true);
      
      const eligibilityResult = checkEligibility(applicationData);
      const isApproved = eligibilityResult === 'Standard' || eligibilityResult === 'Conditional';

      try {
        await saveApplication(applicationData);
        toast({
          title: "Application Submitted",
          description: "Your application has been saved successfully!",
        });

        if (onResultReady) {
          onResultReady(isApproved ? "approved" : "declined", applicationData);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to submit application. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
        handleClose();
      }

    } else {
      goToStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
        goToStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    setApplicationData(initialData);
    onClose();
  };

  const updateData = (newData: Partial<ApplicationData>) => {
    setApplicationData((prev) => ({ ...prev, ...newData }));
  };
  
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <InsuranceInfoStep onNext={handleNext} />;
      case 2:
        return <BasicInfoStep data={applicationData} updateData={updateData} onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <HealthInfoStep data={applicationData} updateData={updateData} onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <HospitalizationStep data={applicationData} updateData={updateData} onNext={handleNext} onBack={handleBack} />;
      case 5:
        return (
          <ReviewStep
            data={applicationData}
            onNext={handleNext}
            onBack={handleBack}
            isSubmitting={isSubmitting}
          />
        );
      case 6: {
        const eligibility = checkEligibility(applicationData);

        if (eligibility === 'Standard' || eligibility === 'Conditional') {
          return (
            <AcceptedPage
              onContinue={() => goToStep(7)}
              applicationData={applicationData}
            />
          );
        }

        return <DeclinePage onClose={handleClose} />;
      }
      case 7:
        return <LoginStep onNext={handleNext} onClose={handleClose} onBack={handleBack} isSubmitting={isSubmitting} applicationData={applicationData} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent ref={contentRef} className="max-w-3xl max-h-[90vh] overflow-y-auto p-0" data-testid="dialog-application">
        <div className="sticky top-0 bg-background z-10 p-6 border-b">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Insurance Application</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              data-testid="button-close-modal"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          {currentStep <= 7 && (
            <ProgressIndicator
              currentStep={currentStep}
              totalSteps={7}
              stepLabels={stepLabels}
            />
          )}
        </div>
        <div className="p-6">
          {renderStep()}
        </div>
      </DialogContent>
    </Dialog>
  );
}

    