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
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

const features = [
  {
    icon: <Car size={20} />,
    title: "Premium Fleet",
  },
  {
    icon: <MapPinned size={20} />,
    title: "Local Expertise",
  },
  {
    icon: <ShieldCheck size={20} />,
    title: "Trusted Service",
  },
  {
    icon: <Headphones size={20} />,
    title: "24/7 Support",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-black py-16 text-white"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-black" />

      {/* Gold Glow */}
      <div
        className="
          absolute
          left-1/2
          top-0
          h-[600px]
          w-[600px]
          -translate-x-1/2
          rounded-full
          bg-[#D4AF37]/10
          blur-[180px]
        "
      />

      {/* Top Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[#D4AF37]/20" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left Content */}
          <AnimatedSection>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.45em] text-[#D4AF37]">
                ABOUT CS TRAVELS
              </p>

              <h2
                className="
                  mt-6
                  text-4xl
                  font-semibold
                  leading-tight
                  tracking-tight
                  md:text-5xl
                  lg:text-6xl
                "
              >
                Travel With Trust.
                <br />
                <span className="text-[#D4AF37] italic">
                  Journey With Comfort.
                </span>
              </h2>

              <p
                className="
                  mt-8
                  max-w-xl
                  text-base
                  leading-relaxed
                  text-white/60
                  
                "
              >
                From Tirumala Darshan to local sightseeing and family pilgrimage
                tours, CS Travels delivers trusted travel experiences focused on
                comfort, convenience, and devotion.
              </p>

              {/* Features */}
              <div className="mt-12 grid gap-5 sm:grid-cols-2">
                {features.map((item, index) => (
                  <div
                    key={index}
                    className="
                      flex
                      items-center
                      gap-4
                      border-b
                      border-white/10
                      pb-4
                    "
                  >
                    <div
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#D4AF37]/30
                        text-[#D4AF37]
                      "
                    >
                      {item.icon}
                    </div>

                    <span className="text-sm font-medium text-white">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Right Image */}
          <AnimatedSection delay={0.1}>
            <div
              className="
                group
                relative
                overflow-hidden
                rounded-[30px]
                border
                border-white/10
              "
            >
              <img
                src={AboutBg}
                alt="CS Travels Tirupati"
                className="
                  h-[500px]
                  w-full
                  object-cover
                  transition-transform
                  duration-1000
                  group-hover:scale-105
                "
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              {/* Stats */}
              <div
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  p-8
                  lg:p-10
                "
              >
                <div
                  className="
                    grid
                    grid-cols-3
                    gap-4
                    rounded-3xl
                    border
                    border-white/10
                    bg-black/40
                    p-6
                    backdrop-blur-md
                  "
                >
                  <div className="text-center">
                    <h3 className="text-3xl font-semibold text-[#D4AF37] lg:text-4xl">
                      500+
                    </h3>

                    <p
                      className="
                        mt-2
                        text-[10px]
                        uppercase
                        tracking-[0.3em]
                        text-white/50
                      "
                    >
                      Travelers
                    </p>
                  </div>

                  <div className="text-center">
                    <h3 className="text-3xl font-semibold text-[#D4AF37] lg:text-4xl">
                      10+
                    </h3>

                    <p
                      className="
                        mt-2
                        text-[10px]
                        uppercase
                        tracking-[0.3em]
                        text-white/50
                      "
                    >
                      Routes
                    </p>
                  </div>

                  <div className="text-center">
                    <h3 className="text-3xl font-semibold text-[#D4AF37] lg:text-4xl">
                      4★
                    </h3>

                    <p
                      className="
                        mt-2
                        text-[10px]
                        uppercase
                        tracking-[0.3em]
                        text-white/50
                      "
                    >
                      Rating
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#D4AF37]/20" />
    </section>
  );
}
