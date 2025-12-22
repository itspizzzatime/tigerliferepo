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
  FormLabel as Label,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AuthLayout from "@/components/auth/AuthLayout";
import { useToast } from "@/hooks/use-toast";
import { User, Lock, Mail } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export default function SignupPage() {
  const { signup } = useAuth();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    signup(values.email);
    toast({
        title: "Account Created",
        description: "An email has been sent to verify your account.",
    })
  }

  return (
    <AuthLayout>
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2 text-left">
                <Label>Password</Label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <FormControl>
                    <Input type="password" {...field} className="pl-10" />
                    </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Create account
          </Button>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
            Sign in
            </Link>
          </div>
        </form>
      </Form>
    </AuthLayout>
  );
}
