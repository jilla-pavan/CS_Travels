import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, MessageCircle } from "lucide-react";
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
        duration: 0.7,
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
    <section
      id="contact"
      className="relative overflow-hidden bg-black py-12 sm:py-16 lg:py-20 text-white"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-black" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src={BGImage}
          alt=""
          className="h-full w-full object-cover opacity-[0.15] select-none"
        />
      </div>

      {/* GLOW */}
      <div className="absolute left-1/2 top-0 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] -translate-x-1/2 rounded-full bg-[#D4AF37]/10 blur-[160px]" />

      <div className="absolute top-0 left-0 right-0 h-px bg-[#D4AF37]/20" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        {/* HEADER */}
        <AnimatedSection>
          <div className="text-center">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#D4AF37]">
              START YOUR JOURNEY
            </p>

            <h2 className="mt-4 sm:mt-6 text-3xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
              Begin Your{" "}
              <span className="text-[#D4AF37] italic">Spiritual Journey</span>
            </h2>

            <p className="mx-auto mt-5 sm:mt-8 max-w-xl sm:max-w-2xl text-sm sm:text-base leading-relaxed text-white/60 px-2 sm:px-0">
              Premium Tirupati tours, Tirumala darshan trips, airport transfers
              and customized travel experiences designed around comfort,
              devotion and trust.
            </p>
          </div>
        </AnimatedSection>

        {/* CTA BUTTONS */}
        <AnimatedSection delay={0.1}>
          <div className="mt-10 sm:mt-14 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <a
              href="tel:9347472307"
              className="
                inline-flex items-center justify-center gap-3
                bg-[#D4AF37]
                px-6 sm:px-8 py-3 sm:py-4
                text-xs sm:text-sm
                font-semibold uppercase tracking-[0.15em] sm:tracking-[0.18em]
                text-black
                transition-all duration-300 hover:-translate-y-1
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
                inline-flex items-center justify-center gap-3
                border border-white/10 bg-white/[0.02]
                px-6 sm:px-8 py-3 sm:py-4
                text-xs sm:text-sm
                font-semibold uppercase tracking-[0.15em] sm:tracking-[0.18em]
                text-white
                transition-all duration-300
                hover:border-[#D4AF37]/30 hover:text-[#D4AF37]
              "
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>
          </div>
        </AnimatedSection>

        {/* INFO STRIP */}
        <AnimatedSection delay={0.2}>
          <div className="mt-12 sm:mt-16 border-t border-b border-white/10 py-6 sm:py-8">
            <div className="grid gap-6 sm:gap-8 text-center sm:grid-cols-3">
              <div>
                <p className="text-[9px] sm:text-[10px] tracking-[0.35em] text-white/40 uppercase">
                  Phone
                </p>
                <a
                  href="tel:+919347472307"
                  className="mt-2 inline-block text-base sm:text-lg font-medium hover:text-[#D4AF37]"
                >
                  +91 93474 72307
                </a>
              </div>

              <div>
                <p className="text-[9px] sm:text-[10px] tracking-[0.35em] text-white/40 uppercase">
                  Location
                </p>
                <p className="mt-2 text-base sm:text-lg font-medium">
                  Tirupati, Andhra Pradesh
                </p>
              </div>

              <div>
                <p className="text-[9px] sm:text-[10px] tracking-[0.35em] text-white/40 uppercase">
                  Service
                </p>
                <p className="mt-2 text-base sm:text-lg font-medium">
                  Temple Tours & Transfers
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#D4AF37]/20" />
    </section>
  );
}
