import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, MessageCircle, MapPin, ArrowRight } from "lucide-react";
import BGImage from "../assets/Contact_Background.png";

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
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export default function Contact() {
  return (
    <>
      {/* CONTACT */}
      <section
        id="contact"
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
                          opacity-[0.2]
                          select-none
                        "
          />
        </div>

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

        <div className="absolute top-0 left-0 right-0 h-px bg-[#D4AF37]/20" />

        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <AnimatedSection>
            <div className="text-center">
              <p className="text-[11px] uppercase tracking-[0.45em] text-[#D4AF37]">
                START YOUR JOURNEY
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
                Begin Your
                <span className="text-[#D4AF37] px-2 italic">
                  Spiritual Journey
                </span>
              </h2>

              <p
                className="
                  mx-auto
                  mt-8
                  max-w-2xl
                  text-base
                  leading-relaxed
                  text-white/60
                "
              >
                Premium Tirupati tours, Tirumala darshan trips, airport
                transfers and customized travel experiences designed around
                comfort, devotion and trust.
              </p>
            </div>
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection delay={0.1}>
            <div className="mt-14 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="tel:9347472307"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  bg-[#D4AF37]
                  px-8
                  py-4
                  text-sm
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-black
                  transition-all
                  duration-300
                  hover:-translate-y-1
                "
              >
                <Phone size={18} />
                Call Now
              </a>

              <a
                href="https://wa.me/919347472307"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  border
                  border-white/10
                  bg-white/[0.02]
                  px-8
                  py-4
                  text-sm
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-white
                  transition-all
                  duration-300
                  hover:border-[#D4AF37]/30
                  hover:text-[#D4AF37]
                "
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
            </div>
          </AnimatedSection>

          {/* Contact Strip */}
          <AnimatedSection delay={0.2}>
            <div
              className="
                mt-16
                border-t
                border-b
                border-white/10
                py-8
              "
            >
              <div className="grid gap-8 text-center md:grid-cols-3">
                <div>
                  <p className="text-[10px] tracking-[0.35em] text-white/40 uppercase">
                    Phone
                  </p>

                  <a
                    href="tel:+919347472307"
                    className="
      mt-2
      inline-block
      text-lg
      font-medium
      transition-colors
      duration-300
      hover:text-[#D4AF37]
    "
                  >
                    +91 93474 72307
                  </a>
                </div>

                <div>
                  <p className="text-[10px] tracking-[0.35em] text-white/40 uppercase">
                    Location
                  </p>

                  <p className="mt-2 text-lg font-medium">
                    Tirupati, Andhra Pradesh
                  </p>
                </div>

                <div>
                  <p className="text-[10px] tracking-[0.35em] text-white/40 uppercase">
                    Service
                  </p>

                  <p className="mt-2 text-lg font-medium">
                    Temple Tours & Transfers
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
