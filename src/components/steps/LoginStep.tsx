"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, User, Lock, ArrowLeft } from "lucide-react";
import type { ApplicationData } from "../ApplicationModal";
import { useRouter } from "next/navigation";

interface LoginStepProps {
  onNext: () => void;
  onBack: () => void;
  onClose?: () => void;
  isSubmitting: boolean;
  applicationData?: ApplicationData;
}

export default function LoginStep({ onNext, onBack, onClose, isSubmitting, applicationData }: LoginStepProps) {
  const { user, login } = useAuth();

  useEffect(() => {
    // If user is already logged in, or becomes logged in, we can proceed.
    if (user && applicationData?.email) {
      onNext();
    } else if (applicationData?.email) {
      // If not logged in, but we have an email from the form,
      // automatically log them in to complete the flow.
      login(applicationData.email);
    }
  }, [user, login, onNext, applicationData]);


  if (user) {
    return (
      <div className="space-y-6">
        <Card className="bg-muted/50 border-dashed">
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-3 text-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">
                  Finalizing your application as {user.email}...
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between pt-4 gap-3">
          <Button type="button" variant="outline" onClick={onBack} disabled={true}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button disabled={true} className="min-w-[140px]">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h4 className="text-lg font-semibold">Create Your Account</h4>
              <p className="text-sm text-muted-foreground mt-1">One final step to save and submit your application.</p>
            </div>
             <div className="flex flex-col items-center gap-3 text-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">
                    Creating your account...
                </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-start pt-2">
        <Button type="button" variant="outline" onClick={onClose ?? onBack} disabled>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>
    </div>
  );
}
