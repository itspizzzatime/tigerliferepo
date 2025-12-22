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
            TigerCa is dedicated to protecting families with approachable, affordable
            insurance plans that prioritize fast decisions and caring support. We combine
            industry expertise with simple online tools so you can get coverage with
            confidence. Our mission is to make quality insurance accessible to everyone,
            ensuring peace of mind for you and your loved ones.
          </p>
        </div>
      </div>
    </section>
  );
}
