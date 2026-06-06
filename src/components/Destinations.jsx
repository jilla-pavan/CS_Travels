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
      className="relative overflow-hidden bg-black py-16 text-white"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-black" />

      {/*image */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src={BGImage}
          alt=""
          className="
                h-full
                 object-cover
                  opacity-[0.1]
                  select-none
                "
        />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-[0.45em] text-[#D4AF37]">
            POPULAR DESTINATIONS
          </p>

          <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
            Travel Beyond{" "}
            <span className="text-[#D4AF37] italic">Tirupati</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/60">
            Comfortable private travel to sacred temples, airports, railway
            stations and spiritual destinations across South India.
          </p>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-center gap-3">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              border
              border-white/10
              bg-white/[0.02]
              transition-all
              duration-300
              hover:border-[#D4AF37]/40
              hover:text-[#D4AF37]
            "
          >
            <ArrowLeft size={18} />
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              border
              border-white/10
              bg-white/[0.02]
              transition-all
              duration-300
              hover:border-[#D4AF37]/40
              hover:text-[#D4AF37]
            "
          >
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Slider */}
        <div className="mt-10">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            spaceBetween={28}
            breakpoints={{
              0: {
                slidesPerView: 1.1,
              },
              640: {
                slidesPerView: 1.3,
              },
              1024: {
                slidesPerView: 2,
              },
              1280: {
                slidesPerView: 3,
              },
            }}
          >
            {destinations.map((destination) => (
              <SwiperSlide key={destination.name}>
                <div
                  className="
                    group
                    overflow-hidden
                    rounded-[px]
                    border
                    border-white/10
                    bg-[#080808]
                    transition-all
                    duration-500
                    hover:border-[#D4AF37]/30
                  "
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="
                        h-[400px]
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-110
                      "
                    />

                    {/* Overlay */}
                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black
                        via-black/40
                        to-transparent
                      "
                    />

                    {/* Bottom Content */}
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <h3 className="text-3xl font-semibold">
                        {destination.name}
                      </h3>

                      <div
                        className="
                          mt-5
                          flex
                          gap-3
                        "
                      >
                        <div
                          className="
                            flex-1
                            rounded-2xl
                            border
                            border-white/10
                            bg-black/40
                            p-4
                            backdrop-blur-md
                          "
                        >
                          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                            4 + 1
                          </p>

                          <h4 className="mt-2 text-2xl font-semibold text-[#D4AF37]">
                            {destination.fare4}
                          </h4>
                        </div>

                        <div
                          className="
                            flex-1
                            rounded-2xl
                            border
                            border-white/10
                            bg-black/40
                            p-4
                            backdrop-blur-md
                          "
                        >
                          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                            6 + 1
                          </p>

                          <h4 className="mt-2 text-2xl font-semibold text-[#D4AF37]">
                            {destination.fare6}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer CTA */}
                  <div className="p-6">
                    <a
                      href={`https://wa.me/919347472307?text=${encodeURIComponent(
                        `Hi, I'm interested in booking a trip from Tirupati to ${destination.name}.`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        flex
                        items-center
                        justify-between
                        border
                        border-white/10
                        px-5
                        py-4
                        transition-all
                        duration-300
                        hover:border-[#D4AF37]/30
                        hover:text-[#D4AF37]
                      "
                    >
                      <span className="text-sm uppercase tracking-[0.2em]">
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

      {/* Bottom Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#D4AF37]/20" />
    </section>
  );
}
