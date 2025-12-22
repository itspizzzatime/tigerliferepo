"use client";

import Image from "next/image";
// 1. Import your actual image file from your folder (e.g., src/assets)
import aboutUsImg from "@/lib/tigercare.jpg"; 

export default function AboutUsSection() {
  return (
    <section className="py-16 bg-card">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          {/* 2. Use the imported variable name as the src */}
          <Image
            src={aboutUsImg}
            alt="The TigerCare team working together"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
            priority // Optional: adds loading priority
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">About Tiger Insurance</h2>
          <p className="text-muted-foreground mb-4">
            TigerCare is dedicated to protecting families with approachable, affordable
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