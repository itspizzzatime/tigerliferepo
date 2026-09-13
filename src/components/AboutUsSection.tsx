"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ShieldCheck, Zap, HeartHandshake } from "lucide-react";
import aboutUsImg from "@/lib/tigercare.png";

const values = [
  {
    icon: ShieldCheck,
    title: "Built for students",
    description: "Plans designed around campus life, not generic adult coverage repackaged.",
  },
  {
    icon: Zap,
    title: "Fast decisions",
    description: "Most applications are reviewed and approved within 24–48 hours.",
  },
  {
    icon: HeartHandshake,
    title: "Real support",
    description: "A team that answers questions in plain language, not insurance jargon.",
  },
];

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

function CountUpStat({
  target,
  suffix = "",
  label,
  duration = 1200,
}: {
  target: number;
  suffix?: string;
  label: string;
  duration?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start: number | null = null;
    let frame: number;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        frame = requestAnimationFrame(step);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, duration]);

  return (
    <div ref={ref}>
      <p className="text-2xl font-bold text-tiger-brown tabular-nums">
        {count}
        {suffix}
      </p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

const staticStats = [
  { value: "24–48h", label: "Average decision time" },
  { value: "100%", label: "Online application" },
];

export default function AboutUsSection() {
  return (
    <section className="pt-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="order-last md:order-first">
          <h2 className="text-3xl font-bold mb-4 text-tiger-brown">
            About TigerCare Insurance
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg">
            TigerCare is dedicated to protecting the Thomasian community with approachable, affordable
            insurance plans that prioritize fast decisions and caring support. Our mission is to make quality insurance accessible to every student,
            ensuring peace of mind for you and your loved ones throughout your university life.
          </p>

          <ul className="space-y-5 mb-10">
            {values.map(({ icon: Icon, title, description }) => (
              <li key={title} className="flex gap-4">
                <div className="w-10 h-10 shrink-0 rounded-lg bg-ust-gold/15 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-tiger-brown" />
                </div>
                <div>
                  <p className="font-semibold text-tiger-brown">{title}</p>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-x-8 gap-y-3 mb-8 pt-6 border-t border-gray-100">
            <CountUpStat target={568} label="Students covered" />
            {staticStats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-tiger-brown tabular-nums">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-ust-gold/10 rounded-2xl -z-10" />
          <div className="bg-white rounded-xl shadow-lg p-10 flex items-center justify-center">
            <Image
              src={aboutUsImg}
              alt="TigerCare mascot logo — a cartoon tiger cub wearing a graduation cap"
              width={420}
              height={280}
              className="w-full max-w-xs h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}