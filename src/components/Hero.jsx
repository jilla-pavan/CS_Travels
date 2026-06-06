import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import BGImage from "../assets/Homepage_Background.png";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-black text-white"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-black" />

      {/* Image */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src={BGImage}
          alt=""
          className="
            h-full
            w-[320px]
            sm:w-[500px]
            md:w-[700px]
            lg:w-[850px]
            xl:w-[1000px]
            object-cover
            opacity-[0.1]
            select-none
          "
        />
      </div>

      {/* Gold Glow */}
      <div className="absolute left-1/2 top-1/2 h-[250px] w-[250px] sm:h-[350px] sm:w-[350px] md:h-[400px] md:w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/10 blur-[120px] sm:blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex min-h-screen items-center justify-center pt-[80px] sm:pt-[90px]">
          <div className="w-full text-center">
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="
                inline-flex
                items-center
                border border-[#D4AF37]/20
                px-3 sm:px-4
                py-2
                text-[9px] sm:text-[11px]
                uppercase
                tracking-[0.25em] sm:tracking-[0.35em]
                text-[#D4AF37]
              "
            >
              Tirupati • Tirumala • South India Tours
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="
                mx-auto mt-8 sm:mt-10
                max-w-5xl
                text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[92px]
                font-semibold
                leading-[1.05] sm:leading-[0.95]
                tracking-[-0.04em]
              "
            >
              Travel With
              <span className="block text-[#D4AF37]">Devotion & Comfort</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="
                mx-auto mt-6 sm:mt-8
                max-w-xl sm:max-w-2xl
                text-sm sm:text-base
                leading-relaxed
                text-white/65
                px-2 sm:px-0
              "
            >
              Explore Tirupati with hassle-free Tirumala Darshan, local
              sightseeing tours, comfortable cab services, pilgrimage packages,
              and trips to nearby attractions.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 sm:mt-12 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4"
            >
              <a
                href="#packages"
                className="
                  inline-flex items-center justify-center gap-2
                  bg-[#D4AF37]
                  px-6 sm:px-8
                  py-3 sm:py-4
                  text-[10px] sm:text-xs
                  font-semibold uppercase tracking-[0.16em]
                  text-black
                  transition-all duration-300
                  hover:-translate-y-1
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
                  inline-flex items-center justify-center
                  border border-white/10
                  px-6 sm:px-8
                  py-3 sm:py-4
                  text-[10px] sm:text-xs
                  font-medium uppercase tracking-[0.16em]
                  text-white
                  transition-all duration-300
                  hover:border-[#D4AF37]/30
                "
              >
                WhatsApp Support
              </a>
            </motion.div>

            {/* STATS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 sm:mt-20"
            >
              <div className="mx-auto flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-0 sm:justify-between max-w-4xl">
                <div className="text-center px-4">
                  <h3 className="text-3xl sm:text-4xl font-light text-[#D4AF37]">
                    500+
                  </h3>
                  <p className="mt-2 sm:mt-3 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-white/45">
                    Happy Travelers
                  </p>
                </div>

                <div className="hidden sm:block h-12 w-px bg-[#D4AF37]/20" />

                <div className="text-center px-4">
                  <h3 className="text-3xl sm:text-4xl font-light text-[#D4AF37]">
                    10+
                  </h3>
                  <p className="mt-2 sm:mt-3 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-white/45">
                    Tour Packages
                  </p>
                </div>

                <div className="hidden sm:block h-12 w-px bg-[#D4AF37]/20" />

                <div className="text-center px-4">
                  <h3 className="text-3xl sm:text-4xl font-light text-[#D4AF37]">
                    24/7
                  </h3>
                  <p className="mt-2 sm:mt-3 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-white/45">
                    Customer Support
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#D4AF37]/30" />
    </section>
  );
}
