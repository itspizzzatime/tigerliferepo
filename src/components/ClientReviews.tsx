import React, { useEffect, useMemo, useRef, useState } from "react";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";

const reviews = [
  {
    quote: "Fast, friendly, and straightforward. I got covered in minutes, meow.",
    name: "Meow meow",
    avatarColor: "bg-rose-300",
  },
  {
    quote: `As someone living in a dorm far from home, this gave me peace of mind. 
    When I sprained my ankle during PathFit, everything was taken care of. Solid!`,
    name: "Phio",
    avatarColor: "bg-amber-300",
  },
  {
    quote: `I honestly only got 
    this because it was required, but now I\'m glad I did. 
    The consultation was fast and affordable. 
    Perfect for broke college kids like me `,
    name: "Bong Bong Go.",
    avatarColor: "bg-sky-300",
  },
  {
    quote: `Super helpful! I got sick during midterms and the insurance covered 
    my check-up and meds. Hassle-free talaga. 
    Didn\'t expect it to be this easy as a student.`,
    name: "Zaldee Romualdez",
    avatarColor: "bg-lime-300",
  },
  {
    quote: "Clear communication and fast payouts when needed.",
    name: "Mon",
    avatarColor: "bg-violet-300",
  },
];

function chunkArray<T>(arr: T[], size: number) {
  const res: T[][] = [];
  for (let i = 0; i < arr.length; i += size) res.push(arr.slice(i, i + size));
  return res;
}

export default function ClientReviews() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [itemsPerSlide, setItemsPerSlide] = useState(1);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Responsive items per slide
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

  // Clamp slideIndex when slides change
  useEffect(() => {
    if (slideIndex >= slides.length) setSlideIndex(0);
  }, [slides, slideIndex]);

  // Autoplay
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setSlideIndex((s) => (s + 1) % slides.length);
    }, 4000);
    return () => clearInterval(id);
  }, [isPaused, slides.length]);

  const prev = () => setSlideIndex((s) => (s - 1 + slides.length) % slides.length);
  const next = () => setSlideIndex((s) => (s + 1) % slides.length);

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Star className="w-5 h-5 text-yellow-400" />
            <h2 className="text-3xl sm:text-4xl font-bold">Client Reviews</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              aria-label="Previous"
              onClick={prev}
              className="p-2 rounded-md bg-card border hover:shadow"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              aria-label="Next"
              onClick={next}
              className="p-2 rounded-md bg-card border hover:shadow"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          ref={containerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative overflow-hidden"
        >
          <div
            className="flex transition-transform duration-500"
            style={{ width: `${slides.length * 100}%`, transform: `translateX(-${slideIndex * (100 / slides.length)}%)` }}
          >
            {slides.map((chunk, si) => (
              <div key={si} className="w-full flex gap-6 px-1 md:px-0">
                {chunk.map((r, i) => (
                  <article key={i} className="flex-1 min-w-0">
                    <div className="bg-card p-6 rounded-lg shadow-sm h-full flex flex-col gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold text-white ${r.avatarColor}`}>
                          {r.name.split(" ")[0][0]}
                        </div>
                        <div>
                          <p className="font-semibold">{r.name}</p>
                          <div className="flex items-center text-yellow-400">
                            {Array.from({ length: 5 }).map((_, idx) => (
                              <svg key={idx} className="w-4 h-4 fill-current text-yellow-400" viewBox="0 0 24 24" aria-hidden>
                                <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.402 8.168L12 18.896l-7.336 3.86 1.402-8.168L.132 9.21l8.2-1.192z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-lg leading-relaxed">“{r.quote}”</p>
                      <div className="mt-auto text-sm text-muted-foreground">Verified client</div>
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </div>

          {/* Indicators */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {slides.map((_, si) => (
              <button
                key={si}
                onClick={() => setSlideIndex(si)}
                className={`w-3 h-3 rounded-full ${si === slideIndex ? "bg-primary" : "bg-muted-foreground/40"}`}
                aria-label={`Go to slide ${si + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
