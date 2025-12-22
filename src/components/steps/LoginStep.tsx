"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { ApplicationData } from "../ApplicationModal";

interface LoginStepProps {
    onNext: () => void;
    onClose: () => void;
    onBack: () => void;
    isSubmitting: boolean;
    applicationData: ApplicationData;
}

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export default function LoginStep({ onNext, onBack, isSubmitting, applicationData }: LoginStepProps) {
  const { login, signup, isAuthenticated, user } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: applicationData.email || "",
      password: "",
    },
  });

  function onLogin(values: z.infer<typeof formSchema>) {
    login(values.email);
    onNext();
  }

  function onSignup(values: z.infer<typeof formSchema>) {
    signup(values.email);
    onNext();
  }
  
  if (isAuthenticated && user?.email === applicationData.email) {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold mb-2">You are logged in</h3>
                <p className="text-muted-foreground">
                    You are logged in as {user.email}. You can now submit your application.
                </p>
            </div>
            <div className="flex justify-between pt-4 gap-3">
                <Button type="button" variant="outline" onClick={onBack} disabled={isSubmitting}>
                    Back
                </Button>
                <Button type="button" onClick={onNext} disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
            </div>
        </div>
    );
  }

  return (
    <div className="space-y-6">
        <div>
            <h3 className="text-xl font-semibold mb-2">Create an Account or Sign In</h3>
            <p className="text-muted-foreground">
            To save and submit your application, please sign in or create a new account.
            </p>
        </div>

        <Form {...form}>
            <form className="grid gap-4">
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                <FormItem className="grid gap-2 text-left">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                    <Input placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                <FormItem className="grid gap-2 text-left">
                    <div className="flex items-center">
                    <FormLabel>Password</FormLabel>
                    <Link
                        href="/forgot-password"
                        className="ml-auto inline-block text-sm underline"
                    >
                        Forgot your password?
                    </Link>
                    </div>
                    <FormControl>
                    <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <div className="flex justify-between pt-4 gap-3">
                <Button type="button" variant="outline" onClick={onBack} disabled={isSubmitting}>
                    Back
                </Button>
                <div className="flex gap-2">
                    <Button type="button" variant="secondary" onClick={form.handleSubmit(onSignup)} disabled={isSubmitting}>
                        Create Account & Submit
                    </Button>
                    <Button type="button" onClick={form.handleSubmit(onLogin)} disabled={isSubmitting}>
                        Login & Submit
                    </Button>
                </div>
            </div>
            </form>
        </Form>
    </div>
  );
}
