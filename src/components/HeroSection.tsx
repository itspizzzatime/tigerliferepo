"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

interface HeroSectionProps {
  onStartApplication: () => void;
}

export default function HeroSection({ onStartApplication }: HeroSectionProps) {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image');
  return (
    <section className="relative h-[600px] w-full">
      {heroImage && (
        <Image
        src={heroImage.imageUrl}
        alt={heroImage.description}
        fill
        className="object-cover"
        priority
        data-ai-hint={heroImage.imageHint}
      />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Secure Your Future Today
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8">
          Comprehensive and affordable insurance plans designed for modern life. Get a quote in minutes and find the perfect coverage for you and your loved ones.
        </p>
        <Button size="lg" onClick={onStartApplication}>
          Start Your Application
        </Button>
      </div>
    </section>
  );
}
