import { MapPin, ArrowRight, ArrowLeft } from "lucide-react";
import { destinations } from "../data/tourPackages";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import BGImage from "../assets/Packages_Background.png";

import "swiper/css";

export default function Destinations() {
  const swiperRef = useRef(null);

  return (
    <section
      id="destinations"
      className="relative overflow-hidden bg-black py-12 sm:py-16 lg:py-20 text-white"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-black" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src={BGImage}
          alt=""
          className="
            h-full w-full sm:w-[900px] md:w-[1100px] lg:w-[1300px]
            object-cover opacity-[0.1] select-none
          "
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="text-center">
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] sm:tracking-[0.45em] text-[#D4AF37]">
            POPULAR DESTINATIONS
          </p>

          <h2 className="mt-4 sm:mt-5 text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
            Travel Beyond{" "}
            <span className="text-[#D4AF37] italic">Tirupati</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl sm:max-w-2xl text-sm sm:text-base leading-relaxed text-white/60 px-2 sm:px-0">
            Comfortable private travel to sacred temples, airports, railway
            stations and spiritual destinations across South India.
          </p>
        </div>

        {/* NAVIGATION */}
        <div className="mt-8 flex justify-center gap-3">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center border border-white/10 bg-white/[0.02] hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
          >
            <ArrowLeft size={18} />
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center border border-white/10 bg-white/[0.02] hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
          >
            <ArrowRight size={18} />
          </button>
        </div>

        {/* SLIDER */}
        <div className="mt-8 sm:mt-10">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            spaceBetween={16}
            breakpoints={{
              0: { slidesPerView: 1.05 },
              480: { slidesPerView: 1.2 },
              640: { slidesPerView: 1.5 },
              1024: { slidesPerView: 2 },
              1280: { slidesPerView: 3 },
            }}
          >
            {destinations.map((destination) => (
              <SwiperSlide key={destination.name}>
                <div className="group overflow-hidden rounded-2xl sm:rounded-[28px] border border-white/10 bg-[#080808] transition-all duration-500 hover:border-[#D4AF37]/30">
                  {/* IMAGE */}
                  <div className="relative overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="
                        h-[240px] sm:h-[320px] lg:h-[400px]
                        w-full object-cover
                        transition-transform duration-700
                        group-hover:scale-110
                      "
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                    {/* TEXT */}
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
                        {destination.name}
                      </h3>

                      <div className="mt-4 sm:mt-5 flex gap-2 sm:gap-3">
                        {/* 4+1 */}
                        <div className="flex-1 rounded-xl sm:rounded-2xl border border-white/10 bg-black/40 p-3 sm:p-4 backdrop-blur-md">
                          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-white/40">
                            4 + 1
                          </p>
                          <h4 className="mt-1 sm:mt-2 text-lg sm:text-2xl font-semibold text-[#D4AF37]">
                            {destination.fare4}
                          </h4>
                        </div>

                        {/* 6+1 */}
                        <div className="flex-1 rounded-xl sm:rounded-2xl border border-white/10 bg-black/40 p-3 sm:p-4 backdrop-blur-md">
                          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-white/40">
                            6 + 1
                          </p>
                          <h4 className="mt-1 sm:mt-2 text-lg sm:text-2xl font-semibold text-[#D4AF37]">
                            {destination.fare6}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="p-4 sm:p-6">
                    <a
                      href={`https://wa.me/919347472307?text=${encodeURIComponent(
                        `Hi, I'm interested in booking a trip from Tirupati to ${destination.name}.`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        flex items-center justify-between
                        border border-white/10
                        px-4 sm:px-5 py-3 sm:py-4
                        text-sm sm:text-base
                        transition-all duration-300
                        hover:border-[#D4AF37]/30 hover:text-[#D4AF37]
                      "
                    >
                      <span className="uppercase tracking-[0.2em] text-xs sm:text-sm">
                        Reserve Route
                      </span>
                      <ArrowRight size={18} />
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#D4AF37]/20" />
    </section>
  );
}
