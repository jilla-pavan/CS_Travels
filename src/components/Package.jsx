import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Car,
  Fuel,
  Ticket,
  UtensilsCrossed,
  Shield,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { tourPackages } from "../data/tourPackages";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import GoldTemple from "../assets/gold-temple.jpg";

import "swiper/css";
import "swiper/css/pagination";

function AnimatedSection({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-80px",
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}

export default function Package() {
  const swiperRef = useRef(null);

  return (
    <section
      id="package"
      className="relative overflow-hidden bg-black py-16 text-white"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute top-0 left-0 right-0 h-px bg-[#D4AF37]" />

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${GoldTemple})`,
        }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/80" />

      {/* GOLD TOP LINE */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[#D4AF37]" />

      {/* CONTENT */}
      <div className="relative z-10"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <AnimatedSection>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#D4AF37]">
              TOUR PACKAGES
            </p>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Tailored Pilgrimage{" "}
              <span className="text-[#D4AF37]">Packages</span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/70">
              Explore premium temple tours crafted for comfort, devotion, and
              seamless travel experiences designed with attention to every
              detail.
            </p>
          </div>
        </AnimatedSection>

        {/* Carousel */}
        <AnimatedSection delay={0.1}>
          <div className="mt-16 relative">
            {/* CENTERED WRAPPER */}
            <div className="relative mx-auto max-w-6xl px-6">
              {/* LEFT OUTSIDE BUTTON */}
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="
          absolute -left-8 top-1/2 z-20 -translate-y-1/2
          flex h-14 w-14 items-center justify-center
          rounded-full border border-white/20
          bg-black/70 text-white backdrop-blur-md
          transition hover:bg-[#D4AF37] hover:text-black
          shadow-[0_10px_30px_rgba(0,0,0,0.6)]
        "
              >
                <ArrowLeft size={20} />
              </button>

              {/* RIGHT OUTSIDE BUTTON */}
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="
          absolute -right-8 top-1/2 z-20 -translate-y-1/2
          flex h-14 w-14 items-center justify-center
          rounded-full border border-white/20
          bg-black/70 text-white backdrop-blur-md
          transition hover:bg-[#D4AF37] hover:text-black
          shadow-[0_10px_30px_rgba(0,0,0,0.6)]
        "
              >
                <ArrowRight size={20} />
              </button>

              {/* SWIPER */}
              <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                spaceBetween={24}
                breakpoints={{
                  0: { slidesPerView: 1.1 },
                  640: { slidesPerView: 1.3 },
                  768: { slidesPerView: 2 },
                  1280: { slidesPerView: 3 },
                }}
                className="packageSwiper"
              >
                {tourPackages.map((pkg, index) => (
                  <SwiperSlide key={index} className="h-auto">
                    <div
                      className="
                group relative flex h-full flex-col overflow-hidden
                rounded-2xl border border-white/10 bg-black
                transition-all duration-500
                hover:-translate-y-1 hover:border-[#D4AF37]/40
                hover:shadow-[0_18px_60px_rgba(212,175,55,0.10)]
              "
                    >
                      {/* Image */}
                      <div className="relative h-[210px] overflow-hidden">
                        <img
                          src={pkg.image}
                          alt={pkg.title}
                          className="
                    h-full w-full object-cover
                    transition-transform duration-700
                    group-hover:scale-110
                  "
                        />
                        <div className="absolute inset-0 bg-black/30" />

                        <div className="absolute left-5 top-5">
                          <span className="rounded-full bg-[#D4AF37] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-black">
                            {pkg.tag}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col p-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">
                          {pkg.subtitle}
                        </p>

                        <h3 className="mt-3 min-h-[60px] text-xl font-bold leading-snug text-white">
                          {pkg.title}
                        </h3>

                        <div className="mt-auto pt-6">
                          <div className="flex items-end justify-between">
                            <div>
                              <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">
                                Starting From
                              </p>
                              <p className="mt-1 text-2xl font-extrabold text-white">
                                {pkg.price}
                              </p>
                            </div>

                            <button
                              onClick={() => {
                                window.location.hash = `#/details/${pkg.slug}`;
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                              className="
                        flex h-10 w-10 items-center justify-center
                        rounded-xl bg-[#D4AF37] text-black
                        transition-all duration-300
                        group-hover:rotate-45 group-hover:scale-110
                      "
                            >
                              <ArrowRight size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </AnimatedSection>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#D4AF37]" />
    </section>
  );
}
