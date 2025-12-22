"use client";

import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

export default function AboutUsSection() {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-us-image');

  return (
    <section className="py-16 bg-card">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          {aboutImage && (
             <Image
             src={aboutImage.imageUrl}
             alt={aboutImage.description}
             width={600}
             height={400}
             className="rounded-lg shadow-lg"
             data-ai-hint={aboutImage.imageHint}
           />
          )}
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">About Tiger Insurance</h2>
          <p className="text-muted-foreground mb-4">
            For over 25 years, Tiger Insurance has been a trusted partner for families and individuals seeking reliable and affordable health coverage. Our mission is to provide peace of mind through comprehensive insurance solutions that protect what matters most.
          </p>
          <p className="text-muted-foreground">
            We believe in transparency, integrity, and putting our clients first. Our dedicated team of experts is here to guide you every step of the way, ensuring you find the perfect plan to fit your needs and budget.
          </p>
        </div>
      </div>
    </section>
  );
}
