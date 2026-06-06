import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import BGImage from "../assets/Homepage_Background.png";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100vh] overflow-hidden bg-black text-white"
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
            w-[600px]
            md:w-[800px]
            xl:w-[1000px]
            object-cover
            opacity-[0.1]
            select-none
          "
        />
      </div>

      {/* Gold Glow */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[400px]
          w-[400px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#D4AF37]/10
          blur-[140px]
        "
      />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="flex min-h-screen items-center justify-center pt-[90px]">
          <div className="w-full text-center">
            {" "}
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="
              inline-flex
              items-center
              border
              border-[#D4AF37]/20
              px-4
              py-2
              text-[11px]
              uppercase
              tracking-[0.35em]
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
              mx-auto
              mt-10
              max-w-5xl
              text-5xl
              font-semibold
              leading-[0.95]
              tracking-[-0.05em]
              sm:text-6xl
              lg:text-7xl
              xl:text-[92px]
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
              mx-auto
              mt-8
              max-w-2xl
              text-base
              leading-relaxed
              text-white/65
             
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
              className="mt-12 flex flex-wrap justify-center gap-4"
            >
              <a
                href="#packages"
                className="
                inline-flex
                items-center
                gap-2
                bg-[#D4AF37]
                px-8
                py-4
                text-xs
                font-semibold
                uppercase
                tracking-[0.18em]
                text-black
                transition-all
                duration-300
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
                inline-flex
                items-center
                border
                border-white/10
                px-8
                py-4
                text-xs
                font-medium
                uppercase
                tracking-[0.18em]
                text-white
                transition-all
                duration-300
                hover:border-[#D4AF37]/30
              "
              >
                WhatsApp Support
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-20"
            >
              <div className="mx-auto flex max-w-4xl items-center justify-between mb-6">
                <div className="px-8 text-center">
                  <h3 className="text-4xl font-light text-[#D4AF37]">500+</h3>
                  <p className="mt-3 text-[11px] uppercase tracking-[0.4em] text-white/45">
                    Happy Travelers
                  </p>
                </div>

                <div className="h-12 w-px bg-[#D4AF37]/20" />

                <div className="px-8 text-center">
                  <h3 className="text-4xl font-light text-[#D4AF37]">10+</h3>
                  <p className="mt-3 text-[11px] uppercase tracking-[0.4em] text-white/45">
                    Tour Packages
                  </p>
                </div>

                <div className="h-12 w-px bg-[#D4AF37]/20" />

                <div className="px-8 text-center">
                  <h3 className="text-4xl font-light text-[#D4AF37]">24/7</h3>
                  <p className="mt-3 text-[11px] uppercase tracking-[0.4em] text-white/45">
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
