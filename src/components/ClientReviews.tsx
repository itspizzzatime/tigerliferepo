"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// NOTE: still placeholder content — swap in real testimonials and a
// real aggregate rating before shipping.
const reviews = [
  {
    quote: "Fast, friendly, and straightforward. I got covered in minutes.",
    name: "Ana Reyes",
    date: "March 3",
    rating: 5,
  },
  {
    quote:
      "As someone living in a dorm far from home, this gave me peace of mind. When I sprained my ankle during PathFit, everything was taken care of.",
    name: "Phio Santos",
    date: "February 21",
    rating: 5,
  },
  {
    quote:
      "I honestly only got this because it was required, but now I'm glad I did. The consultation was fast and affordable.",
    name: "Miguel Cruz",
    date: "February 12",
    rating: 4,
  },
  {
    quote:
      "Super helpful! I got sick during midterms and the insurance covered my check-up and meds. Didn't expect it to be this easy as a student.",
    name: "Zia Ramos",
    date: "February 10",
    rating: 5,
  },
  {
    quote: "Clear communication and fast payouts when needed.",
    name: "Mon Dela Cruz",
    date: "January 28",
    rating: 4,
  },
];

// Plain inline SVG star — no icon-library dependency for this element.
function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className="w-3.5 h-3.5"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.2}
    >
      <path d="M10 1.5l2.59 5.25 5.79.84-4.19 4.08.99 5.77L10 14.77l-5.18 2.67.99-5.77L1.62 7.59l5.79-.84L10 1.5z" />
    </svg>
  );
}

function StarRow({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <div className={`flex items-center gap-0.5 text-ust-gold ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} filled={i < rating} />
      ))}
    </div>
  );
}

function chunkArray<T>(arr: T[], size: number) {
  const res: T[][] = [];
  for (let i = 0; i < arr.length; i += size) res.push(arr.slice(i, i + size));
  return res;
}

export default function ClientReviews() {
  const [itemsPerSlide, setItemsPerSlide] = useState(1);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      if (w >= 1024) setItemsPerSlide(3);
      else if (w >= 768) setItemsPerSlide(2);
      else setItemsPerSlide(1);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const slides = useMemo(() => chunkArray(reviews, itemsPerSlide), [itemsPerSlide]);

  // Dummy aggregate — replace with a real computed/fetched value
  const averageRating = 4.6;
  const reviewCount = 282;

  useEffect(() => {
    if (slideIndex >= slides.length) setSlideIndex(0);
  }, [slides, slideIndex]);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setSlideIndex((s) => (s + 1) % slides.length);
    }, 4500);
    return () => clearInterval(id);
  }, [isPaused, slides.length]);

  const prev = () => setSlideIndex((s) => (s - 1 + slides.length) % slides.length);
  const next = () => setSlideIndex((s) => (s + 1) % slides.length);

  return (
    <section className="py-14 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl font-semibold text-tiger-brown mb-1">Client Reviews</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-tiger-brown">{averageRating.toFixed(1)} / 5</span>
              <StarRow rating={Math.round(averageRating)} />
              <span className="text-xs text-muted-foreground">
                Based on {reviewCount} reviews
              </span>
            </div>
          </div>
        </div>

        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative"
        >
          <div className="sr-only" aria-live="polite">
            Showing slide {slideIndex + 1} of {slides.length}
          </div>

          {/* Prev / Next at the outer left/right edges */}
          <button
            aria-label="Previous review"
            onClick={prev}
            disabled={slides.length <= 1}
            className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 items-center justify-center rounded-full border border-gray-200 bg-white text-tiger-brown hover:border-ust-gold/50 hover:shadow-sm transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            aria-label="Next review"
            onClick={next}
            disabled={slides.length <= 1}
            className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 items-center justify-center rounded-full border border-gray-200 bg-white text-tiger-brown hover:border-ust-gold/50 hover:shadow-sm transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{
                width: `${slides.length * 100}%`,
                transform: `translateX(-${slideIndex * (100 / slides.length)}%)`,
              }}
            >
              {slides.map((chunk, si) => (
                <div key={si} className="w-full flex gap-4 px-1 md:px-0">
                  {chunk.map((r, i) => (
                    <article key={i} className="flex-1 min-w-0">
                      <div className="bg-card p-4 rounded-md border border-gray-100 h-full flex flex-col gap-2">
                        <StarRow rating={r.rating} />
                        <p className="text-xs text-muted-foreground">
                          {r.name}, {r.date}
                        </p>
                        <p className="text-sm leading-snug text-foreground line-clamp-3">
                          {r.quote}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile-only prev/next, inline since edge placement has no room */}
          <div className="flex md:hidden items-center justify-center gap-3 mt-4">
            <button
              aria-label="Previous review"
              onClick={prev}
              disabled={slides.length <= 1}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 bg-white text-tiger-brown disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              aria-label="Next review"
              onClick={next}
              disabled={slides.length <= 1}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 bg-white text-tiger-brown disabled:opacity-30"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-1.5 mt-4">
            {slides.map((_, si) => (
              <button
                key={si}
                onClick={() => setSlideIndex(si)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  si === slideIndex ? "bg-ust-gold" : "bg-muted-foreground/25"
                }`}
                aria-label={`Go to slide ${si + 1} of ${slides.length}`}
                aria-current={si === slideIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}