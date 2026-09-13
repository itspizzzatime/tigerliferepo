"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, LogIn, LayoutDashboard, User, Home } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import paw from "@/app/pawww.png";
import fav from "@/app/favicon.ico";

export default function NavBar() {
  const { user, logout, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isPremiumPage = pathname === "/premium";
  const isDashboardPage = pathname === "/dashboard";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-background/80 border-b">
      <nav
        aria-label="Main navigation"
        className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between"
      >
        <Link
          href="/"
          className="flex items-center gap-2 no-underline group rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ust-gold"
        >
          <Image
            src={fav}
            alt="TigerCare"
            className="h-8 w-auto sm:h-10 object-contain transition-transform group-hover:scale-105"
            priority
          />
          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            <span className="text-ust-gold">Tiger</span>
            <span className="text-tiger-brown">Care</span>
          </span>
          <Image
            src={paw}
            alt=""
            aria-hidden="true"
            className="h-8 w-auto sm:h-10 object-contain opacity-80 transition-transform group-hover:rotate-12"
          />
        </Link>

        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="h-9 w-24 rounded-md bg-muted animate-pulse" />
            <div className="h-9 w-20 rounded-md bg-muted animate-pulse" />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {isPremiumPage && (
              <Button variant="ghost" size="sm" onClick={() => router.push("/")}>
                <Home className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Home</span>
              </Button>
            )}

            {!isPremiumPage && (
              <Button
                variant="ghost"
                size="sm"
                aria-current={isDashboardPage ? "page" : undefined}
                className={cn(isDashboardPage && "bg-muted font-medium")}
                onClick={() =>
                  router.push(isDashboardPage ? "/" : "/dashboard")
                }
              >
                {isDashboardPage ? (
                  <Home className="h-4 w-4 sm:mr-2" />
                ) : (
                  <LayoutDashboard className="h-4 w-4 sm:mr-2" />
                )}
                <span className="hidden sm:inline">
                  {isDashboardPage ? "Home" : "Dashboard"}
                </span>
              </Button>
            )}

            {user ? (
              <>
                {!isPremiumPage && (
                  <span className="text-sm text-gray-700 hidden md:inline max-w-[160px] truncate">
                    Welcome,{" "}
                    <span className="font-medium text-tiger-brown">
                      {user.email}
                    </span>
                  </span>
                )}

                {!isPremiumPage && (
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-current={isPremiumPage ? "page" : undefined}
                    onClick={() => router.push("/premium")}
                  >
                    <User className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">My Policy</span>
                  </Button>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  aria-label="Log out"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </>
            ) : (
              !isPremiumPage && (
                <Button size="sm" onClick={() => router.push("/login")}>
                  <LogIn className="h-4 w-4 sm:mr-2" />
                  Login
                </Button>
              )
            )}
          </div>
        )}
      </nav>
    </header>
  );
}