import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Car, ShieldCheck, Headphones, MapPinned } from "lucide-react";
import AboutBg from "../assets/paadalu-bg.png";

function AnimatedSection({ children, delay = 0 }) {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

const features = [
  { icon: <Car size={18} />, title: "Premium Fleet" },
  { icon: <MapPinned size={18} />, title: "Local Expertise" },
  { icon: <ShieldCheck size={18} />, title: "Trusted Service" },
  { icon: <Headphones size={18} />, title: "24/7 Support" },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-black py-12 sm:py-16 lg:py-20 text-white"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute left-1/2 top-0 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] -translate-x-1/2 rounded-full bg-[#D4AF37]/10 blur-[160px]" />

      {/* Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[#D4AF37]/20" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          {/* LEFT CONTENT */}
          <AnimatedSection>
            <div className="text-center lg:text-left">
              <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#D4AF37]">
                ABOUT CS TRAVELS
              </p>

              <h2 className="mt-4 sm:mt-6 text-3xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
                Travel With Trust.
                <br />
                <span className="text-[#D4AF37] italic">
                  Journey With Comfort.
                </span>
              </h2>

              <p className="mt-5 sm:mt-8 max-w-xl mx-auto lg:mx-0 text-sm sm:text-base leading-relaxed text-white/60 px-2 sm:px-0">
                From Tirumala Darshan to local sightseeing and family pilgrimage
                tours, CS Travels delivers trusted travel experiences focused on
                comfort, convenience, and devotion.
              </p>

              {/* FEATURES */}
              <div className="mt-8 sm:mt-12 grid gap-4 sm:grid-cols-2">
                {features.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 sm:gap-4 border-b border-white/10 pb-3 sm:pb-4"
                  >
                    <div className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-[#D4AF37]/30 text-[#D4AF37]">
                      {item.icon}
                    </div>

                    <span className="text-sm sm:text-base font-medium text-white">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* RIGHT IMAGE */}
          <AnimatedSection delay={0.1}>
            <div className="group relative overflow-hidden rounded-2xl sm:rounded-[30px] border border-white/10">
              <img
                src={AboutBg}
                alt="CS Travels Tirupati"
                className="
                  h-[260px] sm:h-[380px] lg:h-[500px]
                  w-full object-cover
                  transition-transform duration-1000
                  group-hover:scale-105
                "
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              {/* STATS */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 lg:p-8">
                <div className="grid grid-cols-3 gap-2 sm:gap-4 rounded-2xl sm:rounded-3xl border border-white/10 bg-black/40 p-3 sm:p-5 lg:p-6 backdrop-blur-md">
                  <div className="text-center">
                    <h3 className="text-xl sm:text-3xl lg:text-4xl font-semibold text-[#D4AF37]">
                      500+
                    </h3>
                    <p className="mt-1 sm:mt-2 text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-white/50">
                      Travelers
                    </p>
                  </div>

                  <div className="text-center">
                    <h3 className="text-xl sm:text-3xl lg:text-4xl font-semibold text-[#D4AF37]">
                      10+
                    </h3>
                    <p className="mt-1 sm:mt-2 text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-white/50">
                      Routes
                    </p>
                  </div>

                  <div className="text-center">
                    <h3 className="text-xl sm:text-3xl lg:text-4xl font-semibold text-[#D4AF37]">
                      4★
                    </h3>
                    <p className="mt-1 sm:mt-2 text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-white/50">
                      Rating
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#D4AF37]/20" />
    </section>
  );
}
