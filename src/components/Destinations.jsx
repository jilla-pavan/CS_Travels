import { MapPin, ArrowRight, ArrowLeft } from "lucide-react";
import { destinations } from "../data/tourPackages";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useRef } from "react";

export default function Destinations() {
  const swiperRef = useRef(null);

  return (
    <section
      id="destinations"
      className="relative overflow-hidden bg-black py-16 text-white"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading (same style, slight variation) */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#D4AF37]">
            POPULAR ROUTES
          </p>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Destinations From <span className="text-[#D4AF37]">Tirupati</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/60">
            Comfortable private travel to temples, airports, railway stations,
            and sacred destinations across South India.
          </p>
        </div>

        {/* CAROUSEL */}
        <div className="mt-16 relative">
          {/* LEFT NAV */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="
              absolute -left-8 top-1/2 z-20 -translate-y-1/2
              flex h-12 w-12 items-center justify-center
              rounded-full border border-white/10
              bg-black/70 backdrop-blur-md text-white
              transition hover:bg-white/10
            "
          >
            <ArrowLeft size={18} />
          </button>

          {/* RIGHT NAV */}
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="
              absolute -right-8 top-1/2 z-20 -translate-y-1/2
              flex h-12 w-12 items-center justify-center
              rounded-full border border-white/10
              bg-black/70 backdrop-blur-md text-white
              transition hover:bg-white/10
            "
          >
            <ArrowRight size={18} />
          </button>

          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            spaceBetween={24}
            breakpoints={{
              0: { slidesPerView: 1.1 },
              640: { slidesPerView: 1.3 },
              768: { slidesPerView: 2 },
              1280: { slidesPerView: 3 },
            }}
          >
            {destinations.map((destination) => (
              <SwiperSlide key={destination.name} className="h-auto">
                <div
                  className="
                    group relative overflow-hidden
                    rounded-2xl border border-white/10 bg-black
                    transition-all duration-500
                    hover:-translate-y-1 hover:border-[#D4AF37]/30
                    hover:shadow-[0_18px_60px_rgba(255,255,255,0.06)]
                  "
                >
                  {/* IMAGE (slightly different feel than Package) */}
                  <div className="relative h-[230px] overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="
                        h-full w-full object-cover
                        transition-transform duration-700
                        group-hover:scale-110
                      "
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
                  </div>

                  {/* CONTENT */}
                  <div className="p-5">
                    <div className="flex items-center gap-3">
                      <MapPin size={18} className="text-[#D4AF37]" />
                      <h3 className="text-xl font-bold">{destination.name}</h3>
                    </div>

                    {/* FARES */}
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                          4 + 1
                        </p>
                        <p className="mt-2 text-xl font-bold text-[#D4AF37]">
                          {destination.fare4}
                        </p>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                          6 + 1
                        </p>
                        <p className="mt-2 text-xl font-bold text-[#D4AF37]">
                          {destination.fare6}
                        </p>
                      </div>
                    </div>

                    {/* CTA (slightly different from Package section) */}
                    <a
                      href={`https://wa.me/919347472307?text=${encodeURIComponent(
                        `Hi, I'm interested in booking a trip from Tirupati to ${destination.name}.`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        mt-6 inline-flex w-full items-center justify-center gap-2
                        rounded-xl border border-white/10
                        bg-white/5 px-5 py-3
                        text-sm font-semibold uppercase tracking-[0.15em]
                        text-white
                        transition-all duration-300
                        hover:bg-[#D4AF37] hover:text-black
                      "
                    >
                      Book Route
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#D4AF37]" />
    </section>
  );
}
