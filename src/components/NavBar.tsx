"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, LogIn, LayoutDashboard, User, Home } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function NavBar() {
  const { user, logout, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
  };

  const handleSignIn = () => {
    router.push("/login");
  };
  
  const handlePremium = () => {
    router.push("/premium");
  };

  const handleDashboard = () => {
    router.push("/dashboard");
  };
  
  const handleHome = () => {
    router.push("/");
  };


  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-background/80 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 no-underline cursor-pointer group">
          <img src="/favicon.ico" className="h-10 w-auto" alt="TigerCare Logo" />
           <span className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            <span className="text-ust-gold">Tiger</span>
            <span className="text-tiger-brown">Care</span>
          </span>
        </Link>
        
        {!isLoading && (
          <div className="flex items-center gap-2">
            {pathname === '/dashboard' ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleHome}
              >
                <Home className="h-4 w-4 mr-0 sm:mr-2" />
                <span className="hidden sm:inline">Home</span>
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDashboard}
              >
                <LayoutDashboard className="h-4 w-4 mr-0 sm:mr-2" />
                <span className="hidden sm:inline">Dashboard</span>
              </Button>
            )}
            {user ? (
              <>
                <span className="text-sm text-gray-700 hidden sm:inline">
                  Welcome, <span className="font-medium text-tiger-brown">{user.email}</span>
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePremium}
                >
                  <User className="h-4 w-4 mr-0 sm:mr-2" />
                  <span className="hidden sm:inline">My Policy</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-0 sm:mr-2" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </>
            ) : (
              <Button 
                size="sm" 
                onClick={handleSignIn}
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
