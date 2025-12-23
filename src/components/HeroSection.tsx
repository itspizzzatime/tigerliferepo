"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import heroImage from "@/lib/ust-bg.png";

interface HeroSectionProps {
  onStartApplication: () => void;
}

export default function HeroSection({ onStartApplication }: HeroSectionProps) {
  return (
    <section className="relative h-[600px] w-full text-white">
      <Image
        src={heroImage}
        alt="The facade of the University of Santo Tomas Main Building"
        fill
        className="object-cover"
        priority
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Secure Your Future Today
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8 drop-shadow-md">
          Affordable health coverage designed for the modern Thomasian.
        </p>
        <Button size="lg" onClick={onStartApplication} className="bg-ust-gold hover:bg-ust-gold/90 text-tiger-brown font-bold shadow-lg">
          Start Your Application
        </Button>
      </div>
    </section>
  );
}
