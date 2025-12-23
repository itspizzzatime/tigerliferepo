"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, User, Lock, Mail, ArrowLeft } from "lucide-react";
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
  const { signup } = useAuth();
  const [password, setPassword] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicationData?.email || !password) {
      // Basic validation, you might want to add more robust validation
      return;
    }
    setIsProcessing(true);
    // In a real app, you'd handle password hashing, etc.
    // Here we just use the email for the mock signup.
    signup(applicationData.email);
    // onNext will be called by the parent component to save the data.
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
            <CardTitle>Create Your Account</CardTitle>
            <CardDescription>One final step to save and submit your application.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="fullName" value={applicationData?.fullName || ''} readOnly className="pl-10 bg-muted/50" />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="email" type="email" value={applicationData?.email || ''} readOnly className="pl-10 bg-muted/50" />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Create Password</Label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                        id="password" 
                        type="password" 
                        placeholder="Enter a secure password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pl-10"
                    />
                </div>
            </div>
        </CardContent>
      </Card>

      <div className="flex justify-between pt-4 gap-3">
        <Button type="button" variant="outline" onClick={onBack} disabled={isSubmitting || isProcessing}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button type="submit" disabled={isSubmitting || isProcessing || !password} className="min-w-[140px]">
          {(isSubmitting || isProcessing) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit & Create Account
        </Button>
      </div>
    </form>
  );
}
