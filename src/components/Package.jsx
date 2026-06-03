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
} from "lucide-react";
import { tourPackages } from "../data/tourPackages";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
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

const highlights = [
  {
    value: "9",
    label: "Sacred Temples",
  },
  {
    value: "2",
    label: "Days Journey",
  },
  {
    value: "1",
    label: "Private SUV",
  },
  {
    value: "100%",
    label: "Exclusive Tour",
  },
];

const inclusions = [
  {
    icon: <Fuel size={18} />,
    title: "Fuel & Toll Charges",
    desc: "All fuel, toll and parking expenses covered",
    included: true,
  },
  {
    icon: <Car size={18} />,
    title: "Driver Charges",
    desc: "Experienced driver included throughout the trip",
    included: true,
  },
  {
    icon: <Shield size={18} />,
    title: "Private MG Hector",
    desc: "Exclusive premium SUV for your family/group",
    included: true,
  },
  {
    icon: <Ticket size={18} />,
    title: "Darshan Tickets",
    desc: "TTD tickets to be arranged separately",
    included: false,
  },
  {
    icon: <UtensilsCrossed size={18} />,
    title: "Driver Food",
    desc: "₹300 per day extra (₹600 total)",
    included: false,
  },
];

export default function Package() {
  return (
    <section
      id="package"
      className="relative overflow-hidden bg-black py-16 text-white"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-black to-[#050505]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.08),_transparent_45%)]" />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <AnimatedSection>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#D4AF37]">
              TOUR PACKAGES
            </p>

            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              Tailored Pilgrimage Packages
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-white/60">
              Explore a range of premium temple tours and pilgrimage packages,
              each crafted for comfort, convenience, and unforgettable spiritual
              journeys.
            </p>
          </div>
        </AnimatedSection>

        {/* Package Cards */}
        {/* Package Cards */}
        <AnimatedSection delay={0.1}>
          <div className="mt-16 relative">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={24}
              navigation
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1.1,
                },
                640: {
                  slidesPerView: 1.3,
                },
                768: {
                  slidesPerView: 2,
                },
                1280: {
                  slidesPerView: 3,
                },
              }}
              className="packageSwiper !pb-16"
            >
              {tourPackages.map((pkg) => (
                <SwiperSlide key={pkg.title} className="h-auto">
                  <div
                    className="
              group
              relative
              flex
              h-full
              flex-col
              overflow-hidden
              rounded-[36px]
              border
              border-white/10
              bg-[#08080F]
              transition-all
              duration-500
              hover:-translate-y-2
              hover:border-[#D4AF37]/30
              hover:shadow-[0_25px_80px_rgba(212,175,55,0.08)]
            "
                  >
                    {/* Image */}
                    <div className="relative h-[260px] overflow-hidden">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-110
                "
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                      <div className="absolute left-5 top-5">
                        <span
                          className="
                    rounded-full
                    bg-[#D4AF37]
                    px-4
                    py-2
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-black
                  "
                        >
                          {pkg.tag}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-7">
                      <p
                        className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.35em]
                  text-[#D4AF37]
                "
                      >
                        {pkg.subtitle}
                      </p>

                      <h3
                        className="
                  mt-3
                  min-h-[72px]
                  text-2xl
                  font-bold
                  leading-tight
                  text-white
                "
                      >
                        {pkg.title}
                      </h3>

                      <div className="mt-auto pt-8">
                        <div className="flex items-end justify-between">
                          <div>
                            <p
                              className="
                        text-[10px]
                        uppercase
                        tracking-[0.25em]
                        text-white/40
                      "
                            >
                              Starting From
                            </p>

                            <p className="mt-2 text-3xl font-bold text-white">
                              {pkg.price}
                            </p>
                          </div>

                          <button
                            onClick={() => {
                              window.location.hash = `#/details/${pkg.slug}`;

                              window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                              });
                            }}
                            className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      bg-[#D4AF37]
                      text-black
                      transition-all
                      duration-300
                      group-hover:rotate-45
                      group-hover:scale-110
                    "
                          >
                            <ArrowRight size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </AnimatedSection>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
    </section>
  );
}
