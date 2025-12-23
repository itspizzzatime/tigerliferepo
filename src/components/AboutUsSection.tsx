"use client";

import Image from "next/image";
import aboutUsImg from "@/lib/tigercare.png"; 

export default function AboutUsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="order-last md:order-first">
          <h2 className="text-3xl font-bold mb-4 text-tiger-brown">About TigerCare Insurance</h2>
          <p className="text-muted-foreground mb-4">
            TigerCare is dedicated to protecting the Thomasian community with approachable, affordable
            insurance plans that prioritize fast decisions and caring support. We combine
            industry expertise with simple online tools so you can get coverage with
            confidence. Our mission is to make quality insurance accessible to every student,
            ensuring peace of mind for you and your loved ones throughout your university life.
          </p>
        </div>
        <div>
          <Image
            src={aboutUsImg}
            alt="The TigerCare team working together"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
