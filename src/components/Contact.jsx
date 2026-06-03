import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, MessageCircle, MapPin, AlertTriangle, Car } from "lucide-react";
import logo from "../assets/CS_Travels_Gold_Logo.png";

function AnimatedSection({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

const notes = [
  "Driver food ₹300/- per day is extra",
  "Early start required for temple timings",
  "Darshan depends on temple opening timings",
  "Vehicle allowed till parking areas only",
];

export default function Contact() {
  return (
    <>
      <section
        id="contact"
        className="relative overflow-hidden bg-black py-24 text-white"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-black to-[#050505]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.08),_transparent_45%)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#D4AF37]">
                START YOUR JOURNEY
              </p>

              <h2 className="mt-4 text-4xl font-bold sm:text-5xl lg:text-6xl">
                Travel Beyond
                <span className="block text-[#D4AF37]">The Destination</span>
              </h2>

              <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/60">
                Premium pilgrimage tours, airport transfers, private
                transportation and customized travel experiences designed around
                comfort, reliability and peace of mind.
              </p>
            </div>
          </AnimatedSection>

          <div className="mt-20">
            {/* Contact Cards */}

            <AnimatedSection delay={0.1}>
              <div className="grid gap-6 md:grid-cols-3 w-full">
                {/* Call */}
                <a
                  href="tel:9347472307"
                  className="
        group
        flex
        items-center
        gap-5
        rounded-[28px]
        border
        border-white/10
        bg-[#0A0A12]
        p-6
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-[#D4AF37]/30
        hover:bg-white/[0.02]
      "
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
                    <Phone size={22} />
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">
                      Call Us
                    </p>

                    <p className="mt-1 text-xl font-bold text-white">
                      9347472307
                    </p>

                    <p className="text-sm text-white/50">Available Daily</p>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/919347472307"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
        group
        flex
        items-center
        gap-5
        rounded-[28px]
        border
        border-white/10
        bg-[#0A0A12]
        p-6
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-[#D4AF37]/30
        hover:bg-white/[0.02]
      "
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
                    <MessageCircle size={22} />
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">
                      WhatsApp
                    </p>

                    <p className="mt-1 text-xl font-bold text-white">
                      Quick Booking
                    </p>

                    <p className="text-sm text-white/50">Instant Support</p>
                  </div>
                </a>

                {/* Location */}
                <div
                  className="
        flex
        items-center
        gap-5
        rounded-[28px]
        border
        border-white/10
        bg-[#0A0A12]
        p-6
      "
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
                    <MapPin size={22} />
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-[0.35em] text-white/40">
                      Location
                    </p>

                    <p className="mt-1 text-xl font-bold text-white">
                      Tirupati
                    </p>

                    <p className="text-sm text-white/50">Andhra Pradesh</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <footer className="relative overflow-hidden border-t border-white/10 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.06),_transparent_60%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/10">
                  <img src={logo} className="h-full w-full object-cover" alt="CS Travels Logo" />{" "}
                </div>

                <div>
                  <h3 className="text-lg font-bold tracking-[0.2em] text-white">
                    CS TRAVELS
                  </h3>

                  <p className="mt-1 text-sm text-white/50">
                    Premium Temple Tours & Travel Services
                  </p>
                </div>
              </div>

              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/50">
                Trusted travel partner for Tirupati temple tours, airport
                transfers, railway station pickups, sightseeing trips and
                customized pilgrimage journeys.
              </p>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-4 text-right">
              <a
                href="tel:9347472307"
                className="text-white/70 transition hover:text-[#D4AF37]"
              >
                📞 +91 93474 72307
              </a>

              <a
                href="tel:9502042307"
                className="text-white/70 transition hover:text-[#D4AF37]"
              >
                📞 +91 95020 42307
              </a>

              <a
                href="https://wa.me/919347472307"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 transition hover:text-[#D4AF37]"
              >
                💬 WhatsApp Booking
              </a>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/40">
            <p>
              © {new Date().getFullYear()} CS Travels Tirupati. All Rights
              Reserved.
            </p>
            <span className="text-xs text-white/20">
              Designed by{" "}
              <a
                href="https://www.linkedin.com/in/jilla-pavan"
                target="_blank"
                className="hover:text-[#D4AF37] text-white"
                rel="noopener noreferrer"
              >
                Jilla Pavan
              </a>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
