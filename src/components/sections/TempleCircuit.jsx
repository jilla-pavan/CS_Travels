import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Moon, MessageCircle } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/Tabs";
import { Badge } from "../ui/Badge";
import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";
import { templeCircuit } from "../../data/templeCircuit";
import { whatsappLink } from "../../lib/utils";
import { stagger, easing } from "../../lib/design-tokens";

/**
 * The nine-temple circuit.
 *
 * This section exists to rescue content, not to invent it: the full itinerary
 * was already written in the old build's Itinerary.jsx and rendered nowhere.
 *
 * Day switching uses the Tabs primitive (Radix underneath), so arrow keys,
 * Home/End and the correct tab/tabpanel roles come for free — the old version
 * was a pair of divs with onClick and no keyboard support at all.
 */
export default function TempleCircuit() {
  const [day, setDay] = useState(templeCircuit.days[0].id);

  return (
    <section
      id="temple-circuit"
      aria-labelledby="circuit-heading"
      className="relative overflow-hidden bg-ink-900 py-20 lg:py-28"
    >
      <div className="relative z-raised mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* ------------------------------------------------------ intro */}
          <Reveal className="min-w-0">

            <h2 id="circuit-heading" className="text-h2 text-fg">
              The nine-temple <span className="text-gold-400">circuit</span>
            </h2>

            <p className="mt-5 text-body-lg text-fg-secondary">
              {templeCircuit.summary}
            </p>

            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-5">
              <div>
                <dt className="text-overline uppercase text-fg-muted">Duration</dt>
                <dd className="mt-1.5 text-h4 text-fg">{templeCircuit.subtitle}</dd>
              </div>
              <div>
                <dt className="text-overline uppercase text-fg-muted">Temples</dt>
                <dd className="mt-1.5 text-h4 text-fg">
                  {templeCircuit.days.reduce((n, d) => n + d.temples.length, 0)}
                </dd>
              </div>
              <div>
                <dt className="text-overline uppercase text-fg-muted">From</dt>
                {/* @placeholder — data/templeCircuit.js */}
                <dd className="mt-1.5 text-h4 text-gold-400">
                  {templeCircuit.price}
                </dd>
              </div>
            </dl>

            <p className="mt-6 text-caption text-fg-muted">
              {templeCircuit.pickup}
            </p>

            <Button asChild variant="primary" size="lg" className="mt-8" magnetic>
              <a
                href={whatsappLink(
                  `Hi CS Travels, I'd like to book the nine-temple circuit (${templeCircuit.subtitle}).`,
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={16} aria-hidden="true" />
                Enquire about this route
              </a>
            </Button>
          </Reveal>

          {/* --------------------------------------------------- itinerary */}
          <Reveal delay={0.1} preset="up" className="min-w-0">
            <Tabs value={day} onValueChange={setDay}>
              <TabsList>
                {templeCircuit.days.map((d) => (
                  <TabsTrigger key={d.id} value={d.id}>
                    {d.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {templeCircuit.days.map((d) => (
                <TabsContent key={d.id} value={d.id} className="mt-8">
                  <p className="text-body-lg text-fg">{d.route}</p>

                  {/* Vertical rail. A gradient rather than a drawn SVG path:
                      this list changes height when the day changes, and a
                      DrawSVG path would need re-measuring on every switch for
                      no visual gain at this size. */}
                  <ol className="relative mt-6 space-y-3 pl-8">
                    <span
                      aria-hidden="true"
                      className="absolute bottom-6 left-[9px] top-2 w-px bg-[linear-gradient(180deg,theme(colors.gold.500),rgba(212,175,55,0.12))]"
                    />

                    {d.temples.map((temple, index) => (
                      <motion.li
                        key={temple.name}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: index * stagger.tight,
                          ease: easing.entrance,
                        }}
                        className="relative"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute -left-8 top-2 grid h-[19px] w-[19px] place-items-center rounded-full border border-gold-500/40 bg-ink-900"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                        </span>

                        <div className="rounded-lg border border-white/[0.08] bg-ink-950 p-4 transition-colors duration-micro ease-state hover:border-gold-500/25">
                          <p className="text-body-sm font-medium text-fg">
                            {temple.name}
                          </p>
                          <p className="mt-1 flex items-center gap-1.5 text-caption text-fg-muted">
                            <MapPin
                              size={12}
                              aria-hidden="true"
                              className="text-gold-500"
                            />
                            {temple.place}
                          </p>
                        </div>
                      </motion.li>
                    ))}

                    <motion.li
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: d.temples.length * stagger.tight,
                        ease: easing.entrance,
                      }}
                      className="relative"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute -left-8 top-2 grid h-[19px] w-[19px] place-items-center rounded-full border border-gold-500/40 bg-gold-500/15"
                      >
                        <Moon size={10} className="text-gold-400" />
                      </span>

                      <Badge variant="muted" size="sm">
                        {d.overnight}
                      </Badge>
                    </motion.li>
                  </ol>
                </TabsContent>
              ))}
            </Tabs>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
