import { Quote, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const reviews = [
  {
    name: "Ramesh Kumar",
    place: "Hyderabad",
    review: "Excellent service! Very comfortable journey to Tirupati.",
    rating: 5,
  },
  {
    name: "Anitha Reddy",
    place: "Chennai",
    review: "Peaceful darshan experience. Well organized trip.",
    rating: 5,
  },
  {
    name: "Suresh Babu",
    place: "Bangalore",
    review: "On-time pickup and smooth travel experience.",
    rating: 4,
  },
  {
    name: "Lakshmi Devi",
    place: "Vijayawada",
    review: "Best Tirupati travel service. Highly recommended.",
    rating: 5,
  },
];

function Stars({ rating }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? "text-[#D4AF37]" : "text-white/20"}
          fill={i < rating ? "#D4AF37" : "none"}
        />
      ))}
    </div>
  );
}

export default function Reviews() {
  const [paused, setPaused] = useState(false);
  return (
    <section id="reviews" className="relative overflow-hidden bg-black py-16 text-white">
      {/* HEADER */}
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37]">
          Testimonials
        </p>

        <h2 className="mt-3 text-3xl font-bold">What Our Customers Say</h2>
      </div>

      {/* MARQUEE */}
      <div className="mt-10 relative overflow-hidden">
        {/* LEFT FADE */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-black to-transparent" />

        {/* RIGHT FADE */}
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-black to-transparent" />

        {/* TRACK */}
        <motion.div
          className="flex w-max gap-6"
          animate={{
            x: paused ? "0%" : ["0%", "-50%"],
          }}
          transition={{
            duration: 10,
            ease: "linear",
            repeat: Infinity,
          }}
          onHoverStart={() => setPaused(true)}
          onHoverEnd={() => setPaused(false)}
        >
          {[...reviews, ...reviews].map((r, i) => (
            <div
              key={i}
              className="
                w-[300px] flex-shrink-0
                rounded-2xl border border-white/10
                bg-white/5 p-5 backdrop-blur-md
              "
            >
              <Quote className="text-[#D4AF37]" size={18} />

              <p className="mt-3 text-sm text-white/70 leading-relaxed">
                {r.review}
              </p>

              <div className="mt-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">{r.name}</p>
                  <p className="text-xs text-white/50">{r.place}</p>
                </div>

                <Stars rating={r.rating} />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#D4AF37]" />
    </section>
  );
}
