"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
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
import AuthLayout from "@/components/auth/AuthLayout";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Password Reset Email Sent",
      description: `If an account with ${values.email} exists, you will receive a password reset link.`,
    });
    form.reset();
  }

  return (
    <AuthLayout>
        <div className="text-center mb-4">
            <h2 className="text-2xl font-bold">Forgot Password</h2>
            <p className="text-balance text-muted-foreground">
            Enter your email and we'll send you a link to reset your password.
            </p>
        </div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                <FormItem className="space-y-2 text-left">
                    <Label>Email</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <FormControl>
                        <Input placeholder="name@example.com" {...field} className="pl-10" />
                        </FormControl>
                    </div>
                    <FormMessage />
                </FormItem>
                )}
            />
            <Button type="submit" className="w-full">
                Send Reset Link
            </Button>
            <div className="mt-4 text-center text-sm">
                Remembered your password?{" "}
                <Link href="/login" className="underline">
                Sign in
                </Link>
            </div>
            </form>
        </Form>
    </AuthLayout>
  );
}
