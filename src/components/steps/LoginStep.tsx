"use client";

import { useState } from "react";
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
  const { user, login, signup } = useAuth();
  const [loginUsername, setLoginUsername] = useState(applicationData?.email || "");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState(applicationData?.email || "");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(loginUsername);
    onNext();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerPassword !== confirmPassword) return;
    signup(registerUsername);
    onNext();
  };

  if (user) {
    return (
      <div className="space-y-6">
 
        <Card className="bg-muted/50 border-dashed">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground text-center">
                You are logged in as {user.email}. You can now submit your application.
            </p>
          </CardContent>
        </Card>

        <div className="flex justify-between pt-4 gap-3">
          <Button type="button" variant="outline" onClick={onBack} disabled={isSubmitting}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button onClick={onNext} disabled={isSubmitting} className="min-w-[140px]">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Application"
            )}
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
              <h4 className="text-lg font-semibold">Create Your Account or Sign In</h4>
              <p className="text-sm text-muted-foreground mt-1">Set up your insurance account to save your application.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <form onSubmit={handleRegister} className="space-y-4">
                <h4 className="text-md font-semibold text-center">New User</h4>
                <div className="space-y-2">
                    <Label htmlFor="register-username" className="text-sm font-medium">Email</Label>
                    <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        id="register-username"
                        type="email"
                        placeholder="your@email.com"
                        value={registerUsername}
                        onChange={(e) => setRegisterUsername(e.target.value)}
                        className="pl-10"
                        required
                    />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-sm font-medium">Password</Label>
                    <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        id="register-password"
                        type="password"
                        placeholder="Create a password"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        className="pl-10"
                        required
                    />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-sm font-medium">Confirm Password</Label>
                    <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-10"
                        required
                    />
                    </div>
                    {confirmPassword && registerPassword !== confirmPassword && (
                    <p className="text-xs text-red-500">Passwords do not match</p>
                    )}
                </div>
                <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting || (confirmPassword !== "" && registerPassword !== confirmPassword)}
                >
                    {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                    </>
                    ) : (
                    "Create Account & Submit"
                    )}
                </Button>
                </form>

                <form onSubmit={handleLogin} className="space-y-4">
                <h4 className="text-md font-semibold text-center">Existing User</h4>
                <div className="space-y-2">
                    <Label htmlFor="login-username" className="text-sm font-medium">Email</Label>
                    <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        id="login-username"
                        type="email"
                        placeholder="your@email.com"
                        value={loginUsername}
                        onChange={(e) => setLoginUsername(e.target.value)}
                        className="pl-10"
                        required
                    />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-sm font-medium">Password</Label>
                    <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        id="login-password"
                        type="password"
                        placeholder="Enter your password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="pl-10"
                        required
                    />
                    </div>
                </div>
                <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Logging in...
                    </>
                    ) : (
                    "Login & Submit"
                    )}
                </Button>
                </form>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-start pt-2">
        <Button type="button" variant="outline" onClick={onClose ?? onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>
    </div>
  );
}
