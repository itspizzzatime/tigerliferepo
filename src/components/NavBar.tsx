"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, LogIn, Shield, FileText, ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function NavBar() {
  const { user, logout, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isOnDashboard = pathname === "/dashboard";

  const handleLogout = () => {
    logout();
  };

  const handleSignIn = () => {
    router.push("/login");
  };

  const handleExitDashboard = () => {
    router.push("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-20 backdrop-blur-lg bg-white/80  border-gray-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 no-underline cursor-pointer group">
           <span className="text-2xl sm:text-3xl font-extrabold text-gray-800 tracking-tight transition-colors group-hover:text-primary">
            Tiger
            <span className="text-primary group-hover:text-gray-800 transition-colors">Care</span>
          </span>
        </Link>
        
        {!isLoading && (
          <div className="flex items-center gap-4">
              <>
                {isOnDashboard ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleExitDashboard}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Exit Dashboard
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push("/dashboard")}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Dashboard Admin
                  </Button>
                )}

                {user ? (
                  <>
                    <span className="text-sm text-gray-600">
                      Welcome, <span className="font-medium text-gray-900">{user.email}</span>
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      type="button"
                      onClick={handleLogout}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-primary hover:text-white hover:bg-primary"
                    onClick={handleSignIn}
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                )}
              </>
          </div>
        )}
      </div>
    </header>
  );
}
