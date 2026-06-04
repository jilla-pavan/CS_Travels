import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Car, MapPinned, Headphones } from "lucide-react";
import AboutBg from "../assets/paadalu-bg.png";

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

const features = [
  {
    icon: <Car size={22} />,
    title: "Premium Vehicles",
    desc: "Clean, comfortable and well-maintained vehicles for every journey.",
  },
  {
    icon: <MapPinned size={22} />,
    title: "Local Expertise",
    desc: "Deep knowledge of Tirupati temples, routes and travel planning.",
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "Trusted Service",
    desc: "Transparent pricing with reliable drivers you can depend on.",
  },
  {
    icon: <Headphones size={22} />,
    title: "Dedicated Support",
    desc: "Instant assistance before, during and after your journey.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-black py-16 text-white"
    >
      <div className="absolute inset-0 bg-black" />
      {/* Background */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute top-0 left-0 right-0 h-px bg-[#D4AF37]" />

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${AboutBg})`,
        }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/90" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* HEADING */}
        <AnimatedSection>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#D4AF37]">
              ABOUT CS TRAVELS
            </p>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Travel With Comfort,
              <span className="block text-[#D4AF37]">Journey With Trust</span>
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-white/60">
              CS Travels Tirupati delivers premium pilgrimage and travel
              experiences designed for comfort, reliability, and seamless
              journeys across South India.
            </p>
          </div>
        </AnimatedSection>

        {/* FEATURE GRID */}
        <AnimatedSection delay={0.1}>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((item, i) => (
              <div
                key={i}
                className="
                  group relative overflow-hidden
                  rounded-2xl border border-white/10
                  bg-white/5 p-6
                  backdrop-blur-md
                  transition-all duration-500
                  hover:-translate-y-2
                  hover:border-[#D4AF37]/30
                  hover:shadow-[0_20px_60px_rgba(212,175,55,0.08)]
                "
              >
                <div className="text-[#D4AF37]">{item.icon}</div>

                <h3 className="mt-4 text-lg font-bold">{item.title}</h3>

                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* TRUST STRIP */}
        <AnimatedSection delay={0.2}>
          <div className="mt-16 rounded-2xl border border-[#D4AF37]/30 bg-black/60 p-8 backdrop-blur-md">
            <div className="grid gap-8 text-center md:grid-cols-4">
              <div>
                <p className="text-3xl font-extrabold text-[#D4AF37]">24/7</p>
                <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/50">
                  Support
                </p>
              </div>

              <div>
                <p className="text-3xl font-extrabold text-[#D4AF37]">
                  Private
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/50">
                  Vehicle Tours
                </p>
              </div>

              <div>
                <p className="text-3xl font-extrabold text-[#D4AF37]">
                  Premium
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/50">
                  Experience
                </p>
              </div>

              <div>
                <p className="text-3xl font-extrabold text-[#D4AF37]">
                  Trusted
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/50">
                  Tirupati Partner
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#D4AF37]" />
    </section>
  );
}
