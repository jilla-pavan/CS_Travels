import { Quote, Star } from "lucide-react";

const reviews = [
  {
    name: "Ramesh Kumar",
    place: "Hyderabad",
    review:
      "Excellent service! Very comfortable journey to Tirupati. Everything was well organized and hassle free.",
    rating: 5,
  },
  {
    name: "Anitha Reddy",
    place: "Chennai",
    review:
      "Peaceful darshan experience. Professional team and smooth travel throughout the journey.",
    rating: 5,
  },
  {
    name: "Suresh Babu",
    place: "Bangalore",
    review:
      "On-time pickup, clean vehicle and excellent driver. Highly satisfied with the service.",
    rating: 4,
  },
  {
    name: "Lakshmi Devi",
    place: "Vijayawada",
    review:
      "Best Tirupati travel service we have used. Comfortable and reliable from start to finish.",
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
          fill={i < rating ? "#D4AF37" : "none"}
          className={i < rating ? "text-[#D4AF37]" : "text-white/20"}
        />
      ))}
    </div>
  );
}

export default function Reviews() {
  const marqueeReviews = [...reviews, ...reviews, ...reviews, ...reviews];

  return (
    <section
      id="reviews"
      className="relative overflow-hidden bg-black py-16 text-white"
    >
      {/* Background Glow */}
      <div
        className="
          absolute
          left-1/2
          top-0
          h-[500px]
          w-[500px]
          -translate-x-1/2
          rounded-full
          bg-[#D4AF37]/10
          blur-[160px]
        "
      />

      {/* Header */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.45em] text-[#D4AF37]">
          TESTIMONIALS
        </p>

        <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
          What Our <span className="text-[#D4AF37] italic">Travelers</span> Say
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-white/50">
          Trusted by pilgrims and families across South India for comfortable
          journeys, seamless darshan experiences and exceptional service.
        </p>
      </div>

      {/* Marquee */}
      <div className="relative mt-16 overflow-hidden">
        {/* Left Fade */}
        <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-32 bg-gradient-to-r from-black via-black to-transparent" />

        {/* Right Fade */}
        <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-32 bg-gradient-to-l from-black via-black to-transparent" />

        <div className="marquee-track flex gap-6">
          {marqueeReviews.map((r, i) => (
            <div
              key={i}
              className="
                group
                relative
                w-[350px]
                flex-shrink-0
                overflow-hidden
                rounded-[10px]
                border
                border-white/10
                bg-[#0A0A0A]
                p-7
                transition-all
                duration-500
                hover:border-[#D4AF37]/40
              "
            >
              <Quote
                size={28}
                strokeWidth={1.5}
                className="text-[#D4AF37]/80"
              />

              <p
                className="
                  mt-5
                  text-[15px]
                  leading-relaxed
                  text-white/75
                "
              >
                "{r.review}"
              </p>

              <div
                className="
                  mt-7
                  flex
                  items-center
                  justify-between
                  border-t
                  border-white/10
                  pt-5
                "
              >
                <div>
                  <p className="font-medium text-white">{r.name}</p>

                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/40">
                    {r.place}
                  </p>
                </div>

                <Stars rating={r.rating} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#D4AF37]/20" />

      {/* Component Styles */}
      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        .marquee-track {
          width: max-content;
          animation: marquee 40s linear infinite;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
