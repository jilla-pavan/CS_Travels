import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Reveal } from "../ui/Reveal";
import { RemoteImage } from "../ui/Image";
import { Button } from "../ui/Button";
import { tourPackages } from "../../data/tourPackages";
import { cn, whatsappLink } from "../../lib/utils";
import { inView } from "../../lib/motion";

/**
 * Packages — an editorial spread, not a grid.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * REBUILT. Three same-size cards in a row gave three genuinely different
 * journeys identical visual weight and cropped their photography to a thumbnail.
 *
 * Alternating full-width rows do the opposite: the image gets real size, the
 * itinerary gets room to be read, and the rhythm changes as you scroll rather
 * than repeating. Three items is exactly the count at which a grid stops being
 * a layout decision and becomes a default.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * Image mask wipe — a translating panel, not `clip-path`.
 *
 * `clip-path` repaints; sliding a solid panel off the image is a single
 * compositor transform, so the "transform and opacity only" rule holds.
 */
function WipeImage({ src, alt, priority = false }) {
  return (
    <div className="relative overflow-hidden rounded-xl">
      <RemoteImage
        src={src}
        alt={alt}
        aspectRatio="3 / 2"
        priority={priority}
        className="h-full w-full"
        imgClassName="transition-transform duration-entrance ease-entrance group-hover:scale-[1.04]"
      />

      <motion.span
        aria-hidden="true"
        className="absolute inset-0 z-raised bg-ink-950"
        initial={{ x: "0%" }}
        whileInView={{ x: "101%" }}
        viewport={inView}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(5,13,26,0.55))]"
      />
    </div>
  );
}

export default function Packages() {
  return (
    <section
      id="packages"
      aria-labelledby="packages-heading"
      className="relative overflow-hidden bg-ink-900 py-24 lg:py-32"
    >
      <div className="relative z-raised mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <h2 id="packages-heading" className="text-h2 text-fg">
            Journeys we&apos;ve{" "}
            <span className="text-gold-300">already planned</span>
          </h2>
          <p className="mt-5 text-body-lg text-fg-secondary">
            Multi-day temple routes with the driving, timing and overnight stops
            worked out — so the only thing left to plan is the darshan.
          </p>
        </Reveal>

        <div className="mt-20 space-y-24 lg:space-y-32">
          {tourPackages.map((pkg, index) => {
            /* Alternate which side the image sits on. The eye tracks the switch
               and the page stops reading as a list. */
            const flipped = index % 2 === 1;

            return (
              <article
                key={pkg.slug}
                className="group grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <Reveal
                  preset={flipped ? "right" : "left"}
                  className={cn("min-w-0", flipped && "lg:order-2")}
                >
                  <WipeImage
                    /* Sizing params keep Unsplash from serving the full-res
                       original. Placeholders pending real photography — §8. */
                    src={`${pkg.image}?w=1100&q=72&auto=format&fit=crop`}
                    alt={`${pkg.title} — ${pkg.subtitle}`}
                    priority={index === 0}
                  />
                </Reveal>

                <Reveal
                  preset={flipped ? "left" : "right"}
                  delay={0.08}
                  className={cn("min-w-0", flipped && "lg:order-1")}
                >
                  <div className="flex flex-wrap items-center gap-4">
                    <Badge variant="gold" size="sm">
                      {pkg.tag}
                    </Badge>
                    <span className="text-caption uppercase tracking-[0.18em] text-fg-muted">
                      {pkg.subtitle}
                    </span>
                  </div>

                  <h3 className="mt-5 font-serif text-[clamp(1.75rem,1.3rem+1.9vw,2.75rem)] font-normal leading-[1.1] text-fg">
                    {pkg.title}
                  </h3>

                  <p className="mt-5 max-w-prose text-body-lg text-fg-secondary">
                    {pkg.description}
                  </p>

                  {/* Real inclusions from the data — not marketing filler. */}
                  <ul className="mt-7 space-y-2.5">
                    {pkg.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-body-sm text-fg-secondary"
                      >
                        <Check
                          size={15}
                          aria-hidden="true"
                          className="mt-1 shrink-0 text-gold-500"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-white/[0.10] pt-7">
                    <p className="flex items-baseline gap-2.5">
                      <span className="text-caption uppercase tracking-[0.16em] text-fg-muted">
                        From
                      </span>
                      <span className="font-serif text-h2 text-gold-300">
                        {pkg.price}
                      </span>
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <Button asChild variant="primary" size="md">
                        <a
                          href={whatsappLink(
                            `Hi CS Travels, I'd like to book the "${pkg.title}" package (${pkg.subtitle}, from ${pkg.price}).`,
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle size={15} aria-hidden="true" />
                          Book on WhatsApp
                        </a>
                      </Button>

                      <Button asChild variant="ghost" size="md">
                        <Link to={`/packages/${pkg.slug}`}>
                          Full itinerary
                          <ArrowRight size={15} aria-hidden="true" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Reveal>
              </article>
            );
          })}
        </div>

        {/*
          TODO(CONTENT-BRIEF.md §5, §6): the 9-temple circuit still needs a
          keep/price decision before it can join this list.
        */}
        <Reveal delay={0.1} className="mt-20">
          <p className="text-body-sm text-fg-muted">
            Need a route that isn&apos;t here?{" "}
            <a
              href={whatsappLink(
                "Hi CS Travels, I'd like a custom tour package. Here's what I have in mind:",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-300 underline-offset-4 transition-colors duration-micro ease-state hover:text-gold-200 hover:underline"
            >
              Tell us where you want to go
            </a>{" "}
            and we&apos;ll price it.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
