"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import heroImage from "@/lib/ust-bg.png";

interface HeroSectionProps {
  onStartApplication: () => void;
}

export default function HeroSection({ onStartApplication }: HeroSectionProps) {
  return (
    <section className="relative min-h-[600px] h-[85vh] w-full text-white overflow-hidden">
      <Image
        src={heroImage}
        alt="The facade of the University of Santo Tomas Main Building"
        fill
        className="object-cover"
        priority
      />


      <div className="absolute inset-0 bg-gradient-to-t from-[#2A1608]/85 via-[#2A1608]/45 to-[#2A1608]/10" />

    
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 55%, rgba(20,10,5,0.55) 0%, rgba(20,10,5,0) 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 pt-16">
        <h1 className="font-serif text-5xl md:text-6xl font-semibold mb-4 leading-tight [text-shadow:0_2px_16px_rgba(0,0,0,0.55)]">
          Secure Your Future Today
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8 text-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
          Affordable health coverage designed for the modern Thomasian.
        </p>
        <Button
          size="lg"
          onClick={onStartApplication}
          className="mt-8 bg-ust-gold hover:bg-ust-gold/90 text-tiger-brown font-bold shadow-lg"
        >
          Start Your Application
        </Button>
      </div>
    </section>
  );
}