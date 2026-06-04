import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle, Star, Route, Car, MapPin } from "lucide-react";

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

const highlights = [
  {
    icon: <MapPin size={22} />,
    title: "Kanchi + Tiruttani + Kalahasti Combo",
    desc: "Three sacred regions in one seamless journey — perfectly planned for maximum blessings.",
  },
  {
    icon: <Star size={22} />,
    title: "Rare Temples Covered",
    desc: "Rare gems like Gudimallam Parasurameswara and Ardhagiri Anjaneya included in your route.",
  },
  {
    icon: <Car size={22} />,
    title: "Comfortable Premium SUV",
    desc: "Travel in a fully exclusive MG Hector with an experienced temple route driver.",
  },
  {
    icon: <Route size={22} />,
    title: "Well Planned 2 Day Route",
    desc: "Expertly timed itinerary covering 9 temples with minimal travel fatigue.",
  },
];

const reasons = [
  { icon: <CheckCircle size={18} />, text: "Expert drivers for temple routes" },
  { icon: <CheckCircle size={18} />, text: "Perfect darshan planning" },
  { icon: <CheckCircle size={18} />, text: "Premium & clean vehicles" },
  { icon: <CheckCircle size={18} />, text: "Transparent pricing" },
  { icon: <CheckCircle size={18} />, text: "Trusted & reliable service" },
];

export default function Highlights() {
  return (
    <section id="highlights" className="py-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-14">
            <p className="text-[#D4AF37] text-xs tracking-[0.4em] mb-3 uppercase font-semibold">Why this tour</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Tour <span className="text-[#D4AF37]">Highlights</span>
            </h2>
            <div className="mx-auto h-px w-32 bg-white/10" />
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-24">
          {highlights.map(({ icon, title, desc }, i) => (
            <AnimatedSection key={title} delay={i * 0.1}>
              <div className="rounded-3xl border border-white/10 bg-[#0A0A12] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl mb-5 flex items-center justify-center bg-[#D4AF37]/10 text-[#D4AF37]">
                  {icon}
                </div>
                <h3 className="text-white font-semibold text-sm mb-2 leading-snug">{title}</h3>
                <p className="text-white/70 text-xs leading-relaxed">{desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection delay={0.1}>
            <div>
              <p className="text-[#D4AF37] text-xs tracking-[0.4em] mb-3 uppercase font-semibold">Our promise</p>
              <h2 className="text-4xl font-bold text-white mb-4">
                Why Choose <br /> <span className="text-[#D4AF37]">CS Travels?</span>
              </h2>
              <div className="h-px w-32 bg-white/10 mb-8" />
              <p className="text-white/70 leading-relaxed mb-8">
                With years of experience navigating South India's most sacred temple routes, CS Travels Tirupati offers more than just transportation — we offer a truly premium pilgrimage experience.
              </p>

              <div className="space-y-4">
                {reasons.map(({ icon, text }, i) => (
                  <motion.div
                    key={text}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                      {icon}
                    </div>
                    <span className="text-white/70">{text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="rounded-3xl border border-white/10 bg-[#0A0A12] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
              <p className="text-[#D4AF37] text-sm uppercase tracking-[0.28em] mb-6">Safe Journey · Happy Journey</p>
              <div className="grid grid-cols-3 gap-3 mb-8">
                {["🕉️", "🌸", "✨", "🐒", "🌟", "🔱", "💫", "🪷", "🌿"].map((emoji, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, type: "spring" }}
                    className="aspect-square rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center text-2xl"
                  >
                    {emoji}
                  </motion.div>
                ))}
              </div>
              <div className="text-center">
                <p className="text-white/50 text-xs mb-2 tracking-[0.2em] uppercase">Total temples covered</p>
                <p className="text-5xl font-bold text-white">9</p>
              </div>
              <div className="h-px bg-white/10 my-6" />
              <p className="text-center text-white/50 text-xs">Pickup & drop from Tirupati</p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
