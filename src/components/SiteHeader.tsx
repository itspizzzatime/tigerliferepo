"use client";

import Link from "next/link";
import { Logo } from "./icons";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";

interface SiteHeaderProps {
    onStartApplication: () => void;
}

export default function SiteHeader({ onStartApplication }: SiteHeaderProps) {
    const { isAuthenticated, user, logout } = useAuth();
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-bold">Tiger Insurance</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="#calculator" className="hover:text-primary transition-colors">Premium Calculator</Link>
            <Link href="#about" className="hover:text-primary transition-colors">About Us</Link>
            <Link href="#reviews" className="hover:text-primary transition-colors">Reviews</Link>
          </nav>
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
