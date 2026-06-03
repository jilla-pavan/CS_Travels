import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Moon, Car } from "lucide-react";

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

const days = [
  {
    day: "DAY 1",
    date: "03/05/2026",
    label: "Tirupati → Kanchipuram",
    temples: [
      { name: "Kanipakam Vinayaka Temple", location: "Kanipakam", icon: "\u{1F549}" },
      { name: "Ardhagiri Anjaneya Swamy Temple", location: "Ardhagiri", icon: "\u{1F412}" },
      { name: "Sripuram Golden Temple", location: "Vellore", icon: "\u{2728}" },
      { name: "Kamakshi Amman Temple", location: "Kanchipuram", icon: "\u{1F338}" },
      { name: "Ekambareswarar Temple", location: "Kanchipuram", icon: "\u{1F33F}" },
      { name: "Varadaraja Perumal Temple", location: "Kanchipuram", icon: "\u{1FAB7}" },
    ],
    overnight: "Night Stay – Kanchipuram",
  },
  {
    day: "DAY 2",
    date: "04/05/2026",
    label: "Kanchipuram → Tirupati",
    temples: [
      { name: "Tiruttani Subramanya Swamy Temple", location: "Tiruttani", icon: "\u{1F31F}" },
      { name: "Gudimallam Parasurameswara Temple", location: "Gudimallam", icon: "\u{1F531}" },
      { name: "Sri Kalahasteeswara Temple", location: "Srikalahasti", icon: "\u{1F4AB}" },
    ],
    dropOff: "Drop at Tirupati",
  },
];

export default function Itinerary() {
  const [activeDay, setActiveDay] = useState(0);

  return (
    <section id="itinerary" className="py-24 bg-[#06070F] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px ornament-line" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08)_0%,transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-14">
            <p className="font-accent text-white/50 text-xs tracking-[0.4em] mb-3">DIVINE PATH</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
              Tour <span className="text-[#C8102E]">Itinerary</span>
            </h2>
            <div className="ornament-line w-32 mx-auto" />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="flex justify-center mb-12">
            <div className="flex bg-[#0A0A12] border border-white/10 rounded-full p-1 gap-1">
              {days.map((d, i) => (
                <button
                  key={d.day}
                  onClick={() => setActiveDay(i)}
                  className={`px-8 py-3 rounded-full font-accent text-sm tracking-widest transition-all duration-300 ${
                    activeDay === i
                      ? "bg-[#C8102E] text-white shadow-[0_0_20px_rgba(200,16,46,0.4)]"
                      : "text-white/50 hover:text-white/80"
                  }`}
                >
                  {d.day}
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <motion.div
          key={activeDay}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-[#0A0A12] border border-white/10 rounded-3xl p-8 sticky top-28">
                <div className="inline-block bg-[#C8102E]/20 border border-[#C8102E]/40 px-4 py-2 rounded-full mb-4">
                  <span className="font-accent text-[#C8102E] text-sm tracking-widest">{days[activeDay].day}</span>
                </div>
                <p className="font-body text-white/50 text-xs tracking-widest mb-2">📅 {days[activeDay].date}</p>
                <h3 className="font-display text-2xl text-white font-semibold mb-4">{days[activeDay].label}</h3>
                <div className="ornament-line mb-4" />
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-body text-white/60">
                    <Car size={14} className="text-[#C8102E]" />
                    {activeDay === 0 ? "Pickup from Tirupati" : "Start from Kanchipuram"}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-body text-white/60">
                    <MapPin size={14} className="text-[#C8102E]" />
                    {days[activeDay].temples.length} Temples
                  </div>
                  {days[activeDay].overnight && (
                    <div className="flex items-center gap-2 text-sm font-body text-white/50">
                      <Moon size={14} />
                      {days[activeDay].overnight}
                    </div>
                  )}
                  {days[activeDay].dropOff && (
                    <div className="flex items-center gap-2 text-sm font-body text-white/50">
                      <Car size={14} />
                      {days[activeDay].dropOff}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-6">
                  {days.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveDay(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${activeDay === i ? "w-8 bg-white" : "w-3 bg-white/20"}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#C8102E]/60 via-white/30 to-transparent" />

                <div className="space-y-4">
                  {days[activeDay].temples.map((temple, i) => (
                    <motion.div
                      key={temple.name}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      className="relative flex items-start gap-6 group"
                    >
                      <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-2xl bg-[#0A0A12] border border-white/10 group-hover:border-[#C8102E]/40 flex items-center justify-center text-2xl transition-all duration-300">
                        {temple.icon}
                        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#C8102E] border-2 border-[#06070F]" />
                      </div>

                      <div className="flex-1 bg-[#0A0A12] border border-white/10 group-hover:border-[#C8102E]/30 rounded-2xl p-5 transition-all duration-300">
                        <p className="font-body font-semibold text-white">{temple.name}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin size={11} className="text-[#C8102E]" />
                          <span className="text-white/40 text-xs font-body">{temple.location}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: days[activeDay].temples.length * 0.08 }}
                    className="relative flex items-start gap-6"
                  >
                    <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-2xl bg-[#C8102E]/20 border border-[#C8102E]/40 flex items-center justify-center text-2xl">
                      {activeDay === 0 ? "\u{1F319}" : "\u{1F3E0}"}
                      <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 border-[#06070F]" />
                    </div>
                    <div className="flex-1 bg-[#0A0A12] border border-[#C8102E]/25 rounded-2xl p-5">
                      <p className="font-body font-semibold text-white">
                        {activeDay === 0 ? days[0].overnight : days[1].dropOff}
                      </p>
                      <p className="text-white/40 text-xs font-body mt-1">
                        {activeDay === 0 ? "Rest & prepare for Day 2" : "Journey complete"}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px ornament-line" />
    </section>
  );
}
