import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { destinations, destinationTypes } from "../../data/destinations";
import { cn, whatsappLink } from "../../lib/utils";
import { transition } from "../../lib/motion";

/**
 * Destinations — a rate card, not a grid.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * REBUILT. Nine same-size cards, each with a photo and two price boxes, buried
 * the one thing this section exists for: comparing fares.
 *
 * This content is genuinely tabular — route, distance, time, two prices — and a
 * table is the honest shape for it. Prices in a column can be read straight
 * down; prices in nine separate boxes cannot be compared at all. It also reads
 * more expensive, because a published rate card is what a firm with fixed
 * prices produces, and a grid of cards is what a marketplace produces.
 *
 * Semantics matter as much as looks here: a real <table> with scope'd headers
 * means a screen reader announces "Tirumala, 4 + 1, ₹3,000" rather than reading
 * nine disconnected card fragments.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export default function Destinations() {
  const [filter, setFilter] = useState("all");

  const visible =
    filter === "all"
      ? destinations
      : destinations.filter((d) => d.type === filter);

  return (
    <section
      id="destinations"
      aria-labelledby="destinations-heading"
      className="relative overflow-hidden bg-ink-950 py-24 lg:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ink-mesh" />

      <div className="relative z-raised mx-auto max-w-6xl px-5 sm:px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <h2 id="destinations-heading" className="text-h2 text-fg">
            Fares, <span className="text-gold-300">quoted upfront</span>
          </h2>
          <p className="mt-5 text-body-lg text-fg-secondary">
            Point-to-point rates for the routes we run most. Both seating
            options, no surge, agreed before the vehicle leaves.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div
            role="group"
            aria-label="Filter destinations by type"
            className="flex flex-wrap gap-2"
          >
            {destinationTypes.map((type) => {
              const active = filter === type.value;
              return (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setFilter(type.value)}
                  aria-pressed={active}
                  className={cn(
                    "min-h-[2.75rem] rounded-full px-5 text-caption uppercase tracking-[0.14em]",
                    "border transition-colors duration-micro ease-state",
                    active
                      ? "border-gold-500 bg-gold-500 text-ink-950"
                      : "border-white/12 text-fg-muted hover:border-gold-500/40 hover:text-gold-300",
                  )}
                >
                  {type.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Scrolls horizontally at narrow widths rather than crushing the
            columns — the table keeps its shape and the page never overflows. */}
        <Reveal delay={0.15} className="-mx-5 mt-12 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <table className="w-full min-w-[44rem] border-collapse text-left">
            <caption className="sr-only">
              Point-to-point fares from Tirupati, by destination and vehicle size
            </caption>

            <thead>
              <tr className="border-b border-white/[0.14]">
                <th scope="col" className="py-4 pr-4 text-caption uppercase tracking-[0.16em] text-fg-muted">
                  Destination
                </th>
                <th scope="col" className="px-4 py-4 text-caption uppercase tracking-[0.16em] text-fg-muted">
                  Distance
                </th>
                <th scope="col" className="px-4 py-4 text-caption uppercase tracking-[0.16em] text-fg-muted">
                  Time
                </th>
                <th scope="col" className="px-4 py-4 text-right text-caption uppercase tracking-[0.16em] text-fg-muted">
                  4 + 1
                </th>
                <th scope="col" className="px-4 py-4 text-right text-caption uppercase tracking-[0.16em] text-fg-muted">
                  6 + 1
                </th>
                <th scope="col" className="py-4 pl-4">
                  <span className="sr-only">Book</span>
                </th>
              </tr>
            </thead>

            <tbody>
              {visible.map((destination) => (
                <motion.tr
                  key={destination.slug}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={transition.standard}
                  className="group border-b border-white/[0.08] transition-colors duration-micro ease-state hover:bg-white/[0.025]"
                >
                  <th scope="row" className="py-5 pr-4 font-normal">
                    <span className="flex items-center gap-4">
                      {/* Thumbnail as supporting detail rather than headline —
                          it identifies the place without costing a whole card. */}
                      {destination.image ? (
                        <img
                          src={destination.image}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="hidden h-11 w-11 shrink-0 rounded-md object-cover sm:block"
                        />
                      ) : (
                        <span
                          aria-hidden="true"
                          className="hidden h-11 w-11 shrink-0 rounded-md bg-[linear-gradient(140deg,#123054,#050D1A)] sm:block"
                        />
                      )}
                      <span className="min-w-0">
                        <span className="block font-serif text-h4 text-fg transition-colors duration-micro ease-state group-hover:text-gold-300">
                          {destination.name}
                        </span>
                        <span className="mt-0.5 block max-w-[26ch] text-caption text-fg-muted">
                          {destination.blurb}
                        </span>
                      </span>
                    </span>
                  </th>

                  {/* @placeholder — distances and durations unverified, §7 */}
                  <td className="whitespace-nowrap px-4 py-5 text-body-sm tabular-nums text-fg-secondary">
                    {destination.distanceKm} km
                  </td>
                  <td className="whitespace-nowrap px-4 py-5 text-body-sm text-fg-secondary">
                    {destination.duration}
                  </td>
                  <td className="whitespace-nowrap px-4 py-5 text-right font-serif text-h4 tabular-nums text-gold-300">
                    {destination.fare4}
                  </td>
                  <td className="whitespace-nowrap px-4 py-5 text-right font-serif text-h4 tabular-nums text-gold-300">
                    {destination.fare6}
                  </td>

                  <td className="py-5 pl-4 text-right">
                    <a
                      href={whatsappLink(
                        `Hi CS Travels, I'd like to book a trip from Tirupati to ${destination.name}.`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "inline-grid h-11 w-11 place-items-center rounded-full border",
                        "border-white/12 text-fg-muted transition-colors duration-micro ease-state",
                        "hover:border-gold-500/50 hover:text-gold-300",
                      )}
                    >
                      <ArrowUpRight size={17} aria-hidden="true" />
                      <span className="sr-only">
                        Book Tirupati to {destination.name} on WhatsApp
                      </span>
                    </a>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <Reveal delay={0.1} className="mt-8">
          <p className="text-caption text-fg-muted">
            Fares are for a one-way private hire. Round trips, waiting time and
            multi-stop routes are quoted on request.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
