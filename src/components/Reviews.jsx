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
      className="relative overflow-hidden bg-black py-12 sm:py-16 lg:py-20 text-white"
    >
      {/* Glow */}
      <div className="absolute left-1/2 top-0 h-[300px] w-[300px] sm:h-[450px] sm:w-[450px] -translate-x-1/2 rounded-full bg-[#D4AF37]/10 blur-[140px]" />

      {/* HEADER */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 text-center">
        <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#D4AF37]">
          TESTIMONIALS
        </p>

        <h2 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
          What Our <span className="text-[#D4AF37] italic">Travelers</span> Say
        </h2>

        <p className="mx-auto mt-4 sm:mt-5 max-w-xl sm:max-w-2xl text-sm sm:text-base text-white/50 px-2 sm:px-0">
          Trusted by pilgrims and families across South India for comfortable
          journeys and seamless darshan experiences.
        </p>
      </div>

      {/* MARQUEE */}
      <div className="relative mt-10 sm:mt-16 overflow-hidden">
        {/* fades */}
        <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-16 sm:w-32 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-16 sm:w-32 bg-gradient-to-l from-black to-transparent" />

        <div className="marquee-track flex gap-4 sm:gap-6">
          {marqueeReviews.map((r, i) => (
            <div
              key={i}
              className="
                group relative
                w-[260px] sm:w-[320px] lg:w-[350px]
                flex-shrink-0
                overflow-hidden
                rounded-xl sm:rounded-2xl
                border border-white/10
                bg-[#0A0A0A]
                p-4 sm:p-6 lg:p-7
                transition-all duration-500
                hover:border-[#D4AF37]/40
              "
            >
              <Quote size={22} className="text-[#D4AF37]/80" />

              <p className="mt-4 sm:mt-5 text-xs sm:text-sm lg:text-[15px] leading-relaxed text-white/75">
                "{r.review}"
              </p>

              <div className="mt-5 sm:mt-7 flex items-center justify-between border-t border-white/10 pt-4 sm:pt-5">
                <div>
                  <p className="font-medium text-sm sm:text-base text-white">
                    {r.name}
                  </p>
                  <p className="mt-1 text-[10px] sm:text-xs uppercase tracking-[0.18em] text-white/40">
                    {r.place}
                  </p>
                </div>

                <Stars rating={r.rating} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#D4AF37]/20" />

      {/* animation */}
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
          animation: marquee 35s linear infinite;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
