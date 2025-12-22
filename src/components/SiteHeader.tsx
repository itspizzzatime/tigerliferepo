"use client";

import Link from "next/link";
import { Logo } from "./icons";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";

interface SiteHeaderProps {
    onStartApplication: () => void;
}

export default function SiteHeader({ onStartApplication }: SiteHeaderProps) {
    const { isAuthenticated } = useAuth();
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-bold">Tiger Insurance</span>
          </Link>
          
          <div className="flex items-center gap-4">
          {isAuthenticated ? (
             <Button asChild variant="ghost">
                <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <Button asChild variant="ghost">
                <Link href="/login">Sign In</Link>
            </Button>
          )}

            <Button onClick={onStartApplication}>Get a Quote</Button>
          </div>
        </div>
      </header>
    )
}
