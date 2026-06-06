import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import govindBGImage from "../assets/govinda-bg-img.png";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-black text-white"
    >
      {/* Premium Black Background */}
      <div className="absolute inset-0 bg-black" />{" "}
      {/* Govinda Namam Watermark */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <img
          src={govindBGImage}
          alt=""
          className="
    w-[500px]
    sm:w-[650px]
    lg:w-[850px]
    xl:w-[1000px]
    opacity-[0.1]
    object-contain
    select-none
  "
        />
      </div>
      {/* Extra Golden Glow Behind Namam */}
      {/* Decorative Top Glow */}
      {/* Content */}
      <div className="relative z-10 flex min-h-screen w-full items-center px-4 py-16 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="w-full max-w-none text-center"
        >
          {/* Badge */}

          <div className="flex justify-center mt-6">
            <div className="inline-flex items-center rounded-full border border-[#D4AF37] bg-white/10 px-5 py-2.5">
              <span className="text-[12px] font-semibold uppercase tracking-[0.35em] text-white">
                Trusted Pilgrimage Travel Partner
              </span>
            </div>
          </div>
          {/* Sub Heading */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-[12px] font-medium uppercase tracking-[0.45em] text-white/55"
          >
            Tirupati • Tirumala • South India Tours
          </motion.p>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="
    mt-5
    text-4xl
    font-bold
    leading-[1]
    tracking-[-0.04em]
    sm:text-5xl
    lg:text-6xl
    xl:text-7xl
  "
          >
            Travel With{" "}
            <span
              className="text-[#D4AF37]"
            >
              Devotion & Comfort
            </span>
          </motion.h1>
          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="
    mx-auto
    mt-6
    max-w-2xl
    text-base
    leading-relaxed
    text-white/80
    lg:text-lg
  "
          >
            Premium Tirupati tours, Tirumala darshan assistance, local
            sightseeing, airport transfers, and curated South India travel
            experiences.
          </motion.p>
          {/* Devotional Line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="
    mt-7
    text-[11px]
    font-medium
    uppercase
    tracking-[0.55em]
    text-[#D4AF37]
  "
          >
            Govinda • Govinda • Govinda
          </motion.div>
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <a
              href="#package"
              className="
inline-flex
items-center
gap-2
rounded-full
bg-[#D4AF37]
px-8
py-4
text-xs
font-bold
uppercase
tracking-[0.18em]
text-black
transition-all
duration-300
hover:-translate-y-1
hover:shadow-[0_0_40px_rgba(212,175,55,0.3)]
"
            >
              Explore Packages
              <ArrowRight size={16} />
            </a>

            <a
              href="https://wa.me/919347472307"
              target="_blank"
              rel="noopener noreferrer"
              className="
inline-flex
items-center
rounded-full
border
border-white/10
bg-white/[0.02]
px-8
py-4
text-xs
font-semibold
uppercase
tracking-[0.18em]
text-white
backdrop-blur-md
transition-all
duration-300
hover:border-[#D4AF37]/20
hover:bg-white/[0.04]
"
            >
              WhatsApp Support
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-16 w-full border-t border-white/10 pt-8"
          >
            <div className="grid grid-cols-3">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-[#D4AF37] lg:text-4xl">
                  1000+
                </h3>
                <p className="mt-2 text-[10px] uppercase tracking-[0.35em] text-white/50">
                  Happy Travelers
                </p>
              </div>

              <div className="border-x border-white/10 text-center">
                <h3 className="text-3xl font-bold text-[#D4AF37] lg:text-4xl">
                  10+
                </h3>
                <p className="mt-2 text-[10px] uppercase tracking-[0.35em] text-white/50">
                  Tour Packages
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-3xl font-bold text-[#D4AF37] lg:text-4xl">
                  24/7
                </h3>
                <p className="mt-2 text-[10px] uppercase tracking-[0.35em] text-white/50">
                  Customer Support
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      {/* Bottom Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#D4AF37]" />
    </section>
  );
}
