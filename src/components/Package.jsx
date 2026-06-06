import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { tourPackages } from "../data/tourPackages";

import "swiper/css";

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
      transition={{ duration: 0.7, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function Package() {
  const swiperRef = useRef(null);

  return (
    <section
      id="packages"
      className="relative overflow-hidden bg-black py-12 sm:py-16 lg:py-20 text-white"
    >
      {/* background glow */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute left-1/2 top-0 h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] -translate-x-1/2 rounded-full bg-[#D4AF37]/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <AnimatedSection>
          <div className="text-center">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] sm:tracking-[0.45em] text-[#D4AF37]">
              CURATED JOURNEYS
            </p>

            <h2 className="mt-4 sm:mt-6 text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
              Pilgrimage <span className="text-[#D4AF37] italic">Packages</span>
            </h2>

            <p className="mx-auto mt-4 sm:mt-6 max-w-xl sm:max-w-2xl text-sm sm:text-base leading-relaxed text-white/60 px-2 sm:px-0">
              Carefully designed spiritual journeys combining comfort, devotion
              and seamless travel experiences.
            </p>
          </div>
        </AnimatedSection>

        {/* SLIDER */}
        <AnimatedSection delay={0.2}>
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
              {tourPackages.map((pkg, index) => (
                <SwiperSlide key={`${pkg.slug}-${index}`}>
                  <div className="group overflow-hidden rounded-2xl sm:rounded-[28px] border border-white/10 bg-[#080808] transition-all duration-500 hover:border-[#D4AF37]/30">
                    {/* IMAGE */}
                    <div className="relative overflow-hidden">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="
                          h-[240px] sm:h-[320px] lg:h-[400px]
                          w-full object-cover
                          transition-transform duration-700
                          group-hover:scale-110
                        "
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                      {/* TAG */}
                      <div className="absolute left-4 sm:left-6 top-4 sm:top-6">
                        <span className="rounded-full border border-[#D4AF37]/30 bg-black/40 px-3 sm:px-4 py-1 sm:py-2 text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] backdrop-blur-md">
                          {pkg.tag}
                        </span>
                      </div>

                      {/* TEXT */}
                      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                        <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#D4AF37]">
                          {pkg.subtitle}
                        </p>

                        <h3 className="mt-2 sm:mt-3 text-lg sm:text-2xl font-semibold">
                          {pkg.title}
                        </h3>

                        <div className="mt-3 sm:mt-4 max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-40 group-hover:opacity-100">
                          <p className="text-xs sm:text-sm text-white/75">
                            {pkg.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* FOOTER */}
                    <div className="flex items-center justify-between p-4 sm:p-6">
                      <div>
                        <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-white/35">
                          Starting From
                        </p>
                        <h4 className="mt-1 sm:mt-2 text-xl sm:text-3xl font-light text-[#D4AF37]">
                          {pkg.price}
                        </h4>
                      </div>

                      <button
                        onClick={() => {
                          window.location.hash = `#/details/${pkg.slug}`;
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="
                          flex items-center gap-2
                          rounded-full border border-white/10
                          px-4 sm:px-5 py-2 sm:py-3
                          text-xs sm:text-sm
                          transition-all duration-300
                          hover:border-[#D4AF37]/40 hover:text-[#D4AF37]
                        "
                      >
                        Explore
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* CONTROLS */}
            <AnimatedSection delay={0.1}>
              <div className="mt-10 sm:mt-14 flex flex-wrap justify-center gap-3">
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
            </AnimatedSection>
          </div>
        </AnimatedSection>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#D4AF37]/20" />
    </section>
  );
}
