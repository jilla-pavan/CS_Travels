import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { Card, CardBody } from "../ui/Card";
import { Badge, Eyebrow } from "../ui/Badge";
import { Reveal } from "../ui/Reveal";
import { RemoteImage } from "../ui/Image";
import { Button } from "../ui/Button";
import { tourPackages } from "../../data/tourPackages";
import { whatsappLink } from "../../lib/utils";
import { inView } from "../../lib/motion";

/**
 * Popular packages.
 *
 * A grid rather than a carousel, deliberately. There are three packages: a
 * carousel would render with its controls permanently disabled, hide nothing,
 * and keep content out of the initial DOM for crawlers. If the count grows past
 * four — likely, once the temple circuit in §6 is confirmed — swap the grid for
 * the <Carousel> primitive, which is already built and handles any count.
 *
 * This replaces the Swiper implementation; Swiper is dropped from the bundle
 * once Destinations is rebuilt too.
 */

/**
 * Image mask wipe.
 *
 * The brief asks for a wipe, and the obvious way is animating `clip-path` —
 * which repaints rather than compositing. This instead slides a solid panel off
 * the image, so the whole reveal is a single `transform` on the compositor and
 * the constraint "animate transform and opacity only" holds.
 */
function WipeImage({ src, alt, priority = false }) {
  return (
    <div className="relative overflow-hidden">
      <RemoteImage
        src={src}
        alt={alt}
        aspectRatio="4 / 3"
        priority={priority}
        className="h-full w-full"
        imgClassName="transition-transform duration-entrance ease-entrance group-hover:scale-105"
      />

      <motion.span
        aria-hidden="true"
        className="absolute inset-0 z-raised bg-ink-950"
        initial={{ x: "0%" }}
        whileInView={{ x: "101%" }}
        viewport={inView}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Bottom scrim so the badge and any overlaid text stay legible on
          whatever photography eventually lands here. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(180deg,transparent,rgba(5,13,26,0.75))]"
      />
    </div>
  );
}

export default function Packages() {
  return (
    <section
      id="packages"
      aria-labelledby="packages-heading"
      className="relative overflow-hidden bg-ink-950 py-20 lg:py-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ink-mesh" />

      <div className="relative z-raised mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <Eyebrow>Curated journeys</Eyebrow>
          <h2 id="packages-heading" className="mt-5 text-h2 text-fg">
            Pilgrimage <span className="text-gold-400">packages</span>
          </h2>
          <p className="mt-5 text-body-lg text-fg-secondary">
            Multi-day temple routes with the driving, timing and overnight stops
            already worked out — so the only thing left to plan is the darshan.
          </p>
        </Reveal>

        <Reveal.Group
          speed="loose"
          delayChildren={0.1}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {tourPackages.map((pkg, index) => (
            <Reveal.Item key={pkg.slug} className="min-w-0">
              <Card
                variant="solid"
                radius="xl"
                sweep
                className="flex h-full flex-col"
              >
                <div className="relative">
                  <WipeImage
                    /* Sizing params on the Unsplash URL: without them the raw
                       full-resolution original comes over the wire. These are
                       placeholders pending real photography — §8. */
                    src={`${pkg.image}?w=800&q=70&auto=format&fit=crop`}
                    alt={`${pkg.title} — ${pkg.subtitle}`}
                    priority={index === 0}
                  />

                  <Badge
                    variant="glass"
                    size="sm"
                    className="absolute left-4 top-4 z-raised"
                  >
                    {pkg.tag}
                  </Badge>
                </div>

                <CardBody className="flex flex-1 flex-col">
                  <p className="text-overline uppercase text-gold-400">
                    {pkg.subtitle}
                  </p>

                  <h3 className="mt-3 text-h4 text-fg">{pkg.title}</h3>

                  <p className="mt-3 text-body-sm text-fg-muted">
                    {pkg.description}
                  </p>

                  {/* Inclusions. Real list from the data — not marketing filler. */}
                  <ul className="mt-5 space-y-2">
                    {pkg.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-body-sm text-fg-secondary"
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

                  {/* mt-auto pins the price rail to the card bottom so all three
                      cards align regardless of description length. */}
                  <div className="mt-auto pt-7">
                    <div className="flex items-baseline justify-between gap-3 border-t border-white/[0.08] pt-5">
                      <span className="text-overline uppercase text-fg-muted">
                        From
                      </span>
                      <span className="text-h3 text-gold-400">{pkg.price}</span>
                    </div>

                    <div className="mt-5 flex flex-col gap-2.5">
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
                </CardBody>
              </Card>
            </Reveal.Item>
          ))}
        </Reveal.Group>

        {/*
          TODO(CONTENT-BRIEF.md §5, §6): the brief lists Tirumala darshan, local
          sightseeing and outstation as headline packages. Only these three exist
          in the data, and the 9-temple circuit in §6 is still awaiting a
          keep/price decision before it can be added here.
        */}
        <Reveal delay={0.15} className="mt-12">
          <p className="text-body-sm text-fg-muted">
            Need a route that isn&apos;t listed?{" "}
            <a
              href={whatsappLink(
                "Hi CS Travels, I'd like a custom tour package. Here's what I have in mind:",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-400 underline-offset-4 transition-colors duration-micro ease-state hover:text-gold-300 hover:underline"
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
