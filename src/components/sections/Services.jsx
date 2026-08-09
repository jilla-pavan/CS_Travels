import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { services } from "../../data/services";
import { cn, whatsappLink } from "../../lib/utils";
import { transition } from "../../lib/motion";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

/**
 * Services — an index, not a grid.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * REBUILT. This was eight same-size cards of icon + heading + text: the single
 * most template-looking structure on the web, and a large part of why the page
 * read as generic.
 *
 * Cards are the lazy container. They impose equal visual weight on eight things
 * that are not equally important, and they force every tile to the height of the
 * longest description.
 *
 * A ruled index does the opposite. The service name gets the display face at
 * size, the price sits at the far right where it can be scanned straight down
 * the column, and the detail stays folded away until asked for. It reads like a
 * menu in a good hotel rather than a pricing page.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export default function Services() {
  const [open, setOpen] = useState(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative overflow-hidden bg-ink-950 py-24 lg:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ink-mesh" />

      <div className="relative z-raised mx-auto max-w-6xl px-5 sm:px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <h2 id="services-heading" className="text-h2 text-fg">
            Every kind of <span className="text-gold-300">Tirupati trip</span>
          </h2>
          <p className="mt-5 text-body-lg text-fg-secondary">
            One operator for the airport run, the darshan day and the week-long
            temple circuit — so there&apos;s one number to call when plans change.
          </p>
        </Reveal>

        {/* A top rule opens the list so it reads as a ruled table. */}
        <div className="mt-16 border-t border-white/[0.10]">
          {services.map((service, index) => {
            const isOpen = open === service.id;

            return (
              <Reveal
                key={service.id}
                preset="up-sm"
                delay={Math.min(index * 0.04, 0.24)}
                className="border-b border-white/[0.10]"
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : service.id)}
                    aria-expanded={isOpen}
                    aria-controls={`service-${service.id}`}
                    className="group flex w-full items-baseline gap-4 py-7 text-left sm:gap-8"
                  >
                    {/*
                      The number is information — how far down a list of eight
                      you are — not the decorative 01/02/03 the craft floor
                      refuses as a default.
                    */}
                    <span className="w-7 shrink-0 text-caption tabular-nums text-fg-subtle">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      className={cn(
                        "min-w-0 flex-1 font-serif text-[clamp(1.375rem,1.05rem+1.5vw,2.125rem)] leading-[1.15]",
                        "transition-colors duration-standard ease-state",
                        isOpen ? "text-gold-300" : "text-fg group-hover:text-gold-300",
                      )}
                    >
                      {service.title}
                    </span>

                    {/* @placeholder — prices from data/services.js */}
                    <span className="shrink-0 text-body-sm tabular-nums text-fg-muted sm:text-body-lg">
                      {service.from}
                    </span>

                    <span
                      aria-hidden="true"
                      className={cn(
                        "grid h-9 w-9 shrink-0 place-items-center rounded-full border",
                        "transition-[transform,border-color,color] duration-standard ease-entrance",
                        isOpen
                          ? "rotate-45 border-gold-500/50 text-gold-300"
                          : "border-white/12 text-fg-muted group-hover:border-gold-500/40 group-hover:text-gold-300",
                      )}
                    >
                      <ArrowUpRight size={16} />
                    </span>
                  </button>
                </h3>

                {/*
                  Height animation is the exception this component earns: a
                  disclosure that doesn't change height isn't a disclosure. It
                  sits at the end of its own row, so nothing above it moves.
                */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`service-${service.id}`}
                      initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
                      transition={transition.standard}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-6 pb-8 pl-11 sm:grid-cols-[1.4fr_1fr] sm:gap-10 sm:pl-16">
                        <p className="max-w-prose text-body-lg text-fg-secondary">
                          {service.blurb}
                        </p>

                        <div>
                          <ul className="space-y-2">
                            {service.includes.map((item) => (
                              <li
                                key={item}
                                className="flex gap-3 text-body-sm text-fg-muted"
                              >
                                <span aria-hidden="true" className="text-gold-500">
                                  —
                                </span>
                                {item}
                              </li>
                            ))}
                          </ul>

                          <a
                            href={whatsappLink(
                              `Hi CS Travels, I'd like to enquire about ${service.title.toLowerCase()}.`,
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-flex min-h-[2.75rem] items-center gap-2 text-caption uppercase tracking-[0.14em] text-gold-300 underline-offset-4 hover:underline"
                          >
                            Enquire about this
                            <ArrowUpRight size={15} aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
