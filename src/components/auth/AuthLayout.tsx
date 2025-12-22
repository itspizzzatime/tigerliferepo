import type { ReactNode } from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";


export default function AuthLayout({ children }: { children: ReactNode }) {
    const authImage = PlaceHolderImages.find((p) => p.id === "auth-image");

    return (
        <div
          className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
        >
          {authImage && (
            <Image
                src={authImage.imageUrl}
                alt={authImage.description}
                fill
                className="object-cover"
                data-ai-hint={authImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-black/50" />
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