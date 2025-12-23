import type { ReactNode } from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";
import ustBG from "@/lib/ust-bg.png";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    /* 1. Ensure the container is relative and has a defined height/width */
    <div className="relative min-h-screen w-full flex items-center justify-center p-4">
      
      {/* 2. The Background Image Layer */}
      <div className="fixed inset-0 -z-10">
        <Image
          src={ustBG}
          alt="Background"
          fill
          priority
          quality={100}
          className="object-cover"
        />
        {/* 3. The Overlay (moved inside the fixed container for consistency) */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* 4. The Auth Card */}
      <Card className="relative w-full max-w-md bg-card/80 backdrop-blur-sm border-border/50">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">Secure Access</CardTitle>
          <CardDescription>
            Enter your credentials to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </div>
  );
}