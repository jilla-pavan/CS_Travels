import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, MessageCircle, MapPin, ShieldCheck } from "lucide-react";
import logo from "../assets/CS_Travels_Gold_Logo.png";
import GoldTempleBG from "../assets/gold-temple-1.jpg";

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

export default function Contact() {
  return (
    <>
      {/* CONTACT SECTION */}
      <section
        id="contact"
        className="relative overflow-hidden bg-black py-16 text-white"
      >
        <div className="absolute inset-0 bg-black" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          {/* HEADING */}
          <AnimatedSection>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#D4AF37]">
                START YOUR JOURNEY
              </p>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Travel Beyond
                <span className="block text-[#D4AF37]">The Destination</span>
              </h2>

              <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-white/60">
                Premium pilgrimage tours, private transport, and customized
                travel experiences designed for comfort, trust, and seamless
                journeys.
              </p>
            </div>
          </AnimatedSection>

          {/* CONTACT CARDS */}
          <AnimatedSection delay={0.1}>
            <div className="mt-20 grid gap-6 md:grid-cols-3">
              {/* CALL */}
              <a
                href="tel:9347472307"
                className="
    group flex items-center justify-between
    rounded-2xl border border-white/10
    bg-white/5 p-6 backdrop-blur-md
    transition-all duration-500
    hover:-translate-y-2 hover:border-[#D4AF37]/40
    hover:shadow-[0_20px_60px_rgba(212,175,55,0.08)]
  "
              >
                {/* LEFT SIDE */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#D4AF37] text-black">
                    <Phone size={18} />
                  </div>

                  <span className="text-sm font-semibold text-white/70 uppercase tracking-[0.15em]">
                    Call
                  </span>
                </div>

                {/* RIGHT SIDE (NUMBER) */}
                <span className="text-lg font-bold text-white">9347472307</span>
              </a>
              {/* WHATSAPP */}
              <a
                href="https://wa.me/919347472307"
                target="_blank"
                rel="noopener noreferrer"
                className="
    group flex items-center justify-between
    rounded-2xl border border-white/10
    bg-white/5 p-6 backdrop-blur-md
    transition-all duration-500
    hover:-translate-y-2 hover:border-[#D4AF37]/40
    hover:shadow-[0_20px_60px_rgba(212,175,55,0.08)]
  "
              >
                {/* LEFT SIDE */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#D4AF37] text-black">
                    <MessageCircle size={18} />
                  </div>

                  <span className="text-sm font-semibold text-white/70 uppercase tracking-[0.15em]">
                    WhatsApp
                  </span>
                </div>

                {/* RIGHT SIDE */}
                <span className="text-sm font-bold text-white">Chat Now</span>
              </a>

              <div
                className="
    flex items-center justify-between
    rounded-2xl border border-white/10
    bg-white/5 p-6 backdrop-blur-md
  "
              >
                {/* LEFT SIDE */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#D4AF37] text-black">
                    <MapPin size={18} />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                      Location
                    </p>

                    <p className="text-sm font-semibold text-white/70">
                      Tirupati
                    </p>
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <span className="text-xs uppercase tracking-[0.25em] text-white/40">
                  Andhra Pradesh
                </span>
              </div>
            </div>
          </AnimatedSection>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#D4AF37]" />
      </section>

      {/* FOOTER */}
      <footer className="relative overflow-hidden bg-black">
        {/* BACKGROUND IMAGE */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${GoldTempleBG})`,
          }}
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/90" />

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-12">
          {/* BRAND CENTER */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-4">
              <div className="h-16 w-16 overflow-hidden rounded-xl border border-[#D4AF37]">
                <img
                  src={logo}
                  alt="CS Travels"
                  className="h-full w-full object-cover"
                />
              </div>

              <h3 className="text-xl font-bold tracking-[0.3em]">CS TRAVELS</h3>
            </div>

            <p className="mx-auto mt-5 max-w-2xl text-sm text-white/50 leading-relaxed">
              Premium Temple Tours & Travel Services for Tirupati pilgrimages,
              airport transfers, and customized journeys with comfort and trust.
            </p>
          </div>
          {/* BOTTOM BAR */}
          <div className="flex mt-10 justify-center gap-4 text-xs text-white/40">
            <p>
              © {new Date().getFullYear()} CS Travels Tirupati. All Rights
              Reserved.
            </p>

            <p>
              Designed by{" "}
              <a
                href="https://www.linkedin.com/in/jilla-pavan"
                target="_blank"
                className="text-white hover:text-[#D4AF37]"
              >
                Jilla Pavan
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
