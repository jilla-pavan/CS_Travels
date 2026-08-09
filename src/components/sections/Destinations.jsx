import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Clock, Route } from "lucide-react";
import { Eyebrow } from "../ui/Badge";
import { Reveal } from "../ui/Reveal";
import { destinations, destinationTypes } from "../../data/destinations";
import { cn, whatsappLink } from "../../lib/utils";
import { transition } from "../../lib/motion";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

/**
 * Destinations and fares.
 *
 * Replaces the Swiper implementation — with that gone, Swiper leaves the bundle
 * entirely (~15KB gz).
 *
 * A filterable grid rather than a carousel: there are nine destinations and the
 * fares are the single most useful thing on the page, so hiding six of them
 * behind a swipe would be the wrong call. Category filtering uses Framer's
 * shared-layout FLIP so cards move to their new positions instead of popping.
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
      className="relative overflow-hidden bg-ink-900 py-20 lg:py-28"
    >
      <div className="relative z-raised mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <Eyebrow>Where we drive</Eyebrow>
          <h2 id="destinations-heading" className="mt-5 text-h2 text-fg">
            Fares, <span className="text-gold-400">quoted upfront</span>
          </h2>
          <p className="mt-5 text-body-lg text-fg-secondary">
            Point-to-point rates for the routes we run most. Both seating
            options, no surge, agreed before the vehicle leaves.
          </p>
        </Reveal>

        {/* ------------------------------------------------------- filter */}
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

        {/* -------------------------------------------------------- grid */}
        {/*
          No AnimatePresence here, deliberately.

          The obvious implementation wraps these in AnimatePresence so filtered-out
          cards fade before unmounting. But AnimatePresence keeps exiting nodes
          mounted until their exit animation finishes, which makes the correctness
          of the filter depend on an animation completing — if that animation ever
          stalls, cards the user just filtered OUT stay on screen showing fares for
          routes they didn't ask about.

          That's a bad dependency for a control whose entire job is to remove
          things. Removed items unmount immediately; `layout` still animates the
          survivors to their new grid positions, which is the FLIP effect the brief
          asks for. The only thing given up is a fade on exit.
        */}
        <motion.ul layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((destination) => (
            <motion.li
              key={destination.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={transition.standard}
              className="min-w-0"
            >
              <DestinationCard destination={destination} />
            </motion.li>
          ))}
        </motion.ul>

        {/*
          TODO(§7): distances and durations are approximate and unverified, and
          the three sightseeing destinations have invented fares. See
          data/destinations.js.
        */}
        <Reveal delay={0.1} className="mt-10">
          <p className="text-caption text-fg-muted">
            Fares are for a one-way private hire. Round trips, waiting time and
            multi-stop routes are quoted on request.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function DestinationCard({ destination }) {
  const ref = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  /**
   * Image parallax.
   *
   * The image is rendered 20% taller than its frame and drifts within it as the
   * card crosses the viewport — so the movement happens inside an overflow mask
   * and never changes the card's own box. Transform-only.
   *
   * `useTransform` writes straight to a motion value, so this does not
   * re-render the card on scroll. It is skipped entirely under reduced motion:
   * MotionConfig does not neutralise a manually-driven motion value.
   */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <article
      ref={ref}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-ink-950 shadow-card transition-[border-color,box-shadow] duration-standard ease-state hover:border-gold-500/30 hover:shadow-lift"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {destination.image ? (
          <motion.img
            src={destination.image}
            alt=""
            loading="lazy"
            decoding="async"
            style={prefersReducedMotion ? undefined : { y }}
            /* h-[120%] + top offset gives the drift room to move without ever
               exposing an edge. */
            className="absolute inset-x-0 top-[-10%] h-[120%] w-full object-cover"
          />
        ) : (
          /* No photography for this destination (@placeholder). Typographic
             plate rather than a stock photo of somewhere else. */
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,rgba(26,66,112,0.5),transparent_70%),linear-gradient(180deg,#0B1F3A,#050D1A)]"
          />
        )}

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(5,13,26,0.9))]"
        />

        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="text-h4 text-fg">{destination.name}</h3>

          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            <span className="flex items-center gap-1.5 text-caption text-fg-muted">
              <Route size={13} aria-hidden="true" className="text-gold-500" />
              {destination.distanceKm} km
            </span>
            <span className="flex items-center gap-1.5 text-caption text-fg-muted">
              <Clock size={13} aria-hidden="true" className="text-gold-500" />
              {destination.duration}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-body-sm text-fg-muted">{destination.blurb}</p>

        {/* mt-auto pins the fare rail and CTA to the card bottom. Without it a
            one-line blurb floats its prices up and the row stops aligning —
            which reads as broken precisely because these are prices. */}
        <div className="mt-auto pt-5">
        {/* Both seating tiers side by side — the comparison is the point. */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "4 + 1", fare: destination.fare4 },
            { label: "6 + 1", fare: destination.fare6 },
          ].map(({ label, fare }) => (
            <div
              key={label}
              className="rounded-md border border-white/[0.08] bg-white/[0.02] p-3"
            >
              <p className="text-overline uppercase text-fg-muted">{label}</p>
              <p className="mt-1 text-h4 text-gold-400">{fare}</p>
            </div>
          ))}
        </div>

        <a
          href={whatsappLink(
            `Hi CS Travels, I'd like to book a trip from Tirupati to ${destination.name}.`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "mt-5 flex min-h-[2.75rem] items-center justify-between gap-3 rounded-full",
            "border border-white/12 px-5 text-caption uppercase tracking-[0.14em] text-fg",
            "transition-colors duration-micro ease-state",
            "hover:border-gold-500/40 hover:text-gold-300",
          )}
        >
          Reserve this route
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        </div>
      </div>
    </article>
  );
}
