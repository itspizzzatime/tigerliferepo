import type { ReactNode } from "react";
import Image from "next/image";
import { Logo } from "@/components/icons";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const authImage = PlaceHolderImages.find((p) => p.id === "auth-image");

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:grid-cols-5">
      <div className="flex items-center justify-center py-12 xl:col-span-2">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <Logo className="mx-auto h-10 w-auto text-primary" />
            <h1 className="text-3xl font-bold font-headline">Tiger Insurance</h1>
            <p className="text-balance text-muted-foreground">
              Your Trusted Insurance Partner
            </p>
          </div>
          {children}
        </div>
      </div>
      <div className="hidden bg-muted lg:block xl:col-span-3 relative">
        {authImage && (
          <Image
            src={authImage.imageUrl}
            alt={authImage.description}
            fill
            className="object-cover"
            data-ai-hint={authImage.imageHint}
          />
        )}
      </div>
    </div>
  );
}
