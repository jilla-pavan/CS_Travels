import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Car, MapPinned, Headphones } from "lucide-react";

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
    desc: "Reliable drivers and transparent pricing without hidden charges.",
  },
  {
    icon: <Headphones size={22} />,
    title: "Dedicated Support",
    desc: "Quick assistance before, during and after your trip.",
  },
];

const stats = [
  {
    value: "500+",
    label: "Happy Travelers",
  },
  {
    value: "50+",
    label: "Tour Routes",
  },
  {
    value: "24/7",
    label: "Support",
  },
  {
    value: "100%",
    label: "Private Travel",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-black py-24 text-white"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-black to-[#050505]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.08),_transparent_45%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#D4AF37]">
              ABOUT CS TRAVELS
            </p>

            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              Travel With Comfort,
              <span className="block text-[#D4AF37]">Journey With Trust</span>
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/60">
              CS Travels Tirupati provides premium travel solutions for
              pilgrims, families and tourists. From Tirumala darshan trips and
              temple tours to airport transfers and customized travel packages,
              we focus on comfort, reliability and exceptional service.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div
            className="
      mt-16
      rounded-[32px]
      border
      border-[#D4AF37]/20
      bg-[#0A0A12]
      p-8
      lg:p-10
    "
          >
            <div className="grid gap-8 md:grid-cols-4">
              <div>
                <p className="text-3xl font-bold text-[#D4AF37]">24/7</p>
                <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/50">
                  Support
                </p>
              </div>

              <div>
                <p className="text-3xl font-bold text-[#D4AF37]">Private</p>
                <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/50">
                  Vehicle Tours
                </p>
              </div>

              <div>
                <p className="text-3xl font-bold text-[#D4AF37]">Premium</p>
                <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/50">
                  Travel Experience
                </p>
              </div>

              <div>
                <p className="text-3xl font-bold text-[#D4AF37]">Trusted</p>
                <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/50">
                  Tirupati Partner
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
