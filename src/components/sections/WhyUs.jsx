import { MapPin, Star, Car, Route, Check } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { circuitHighlights, reasons } from "../../data/whyUs";

const ICONS = { "map-pin": MapPin, star: Star, car: Car, route: Route };

/**
 * Why choose us.
 *
 * Alternating layout: highlights on one side, reasons on the other, entering
 * from opposite directions so the section reads as a pair rather than a stack.
 *
 * The copy is deliberately specific — "Gudimallam and Ardhagiri are off the main
 * road so they usually get dropped" is a real differentiator a pilgrim can
 * check. Generic trust filler ("we care about our customers") is what this
 * section is usually made of, and it persuades nobody.
 */
export default function WhyUs() {
  return (
    <section
      id="why-us"
      aria-labelledby="why-us-heading"
      className="relative overflow-hidden bg-ink-950 py-20 lg:py-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ink-mesh" />

      <div className="relative z-raised mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          {/* ------------------------------------------------- highlights */}
          <div className="min-w-0">
            <Reveal preset="left">
              <h2 id="why-us-heading" className="text-h2 text-fg">
                Planned by people who{" "}
                <span className="text-gold-400">drive it</span>
              </h2>
            </Reveal>

            <Reveal.Group speed="loose" delayChildren={0.1} className="mt-10 space-y-8">
              {circuitHighlights.map(({ icon, title, body }) => {
                const Icon = ICONS[icon] ?? Star;
                return (
                  <Reveal.Item key={title} preset="left" className="flex gap-5">
                    <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold-500/25 text-gold-400">
                      <Icon size={17} strokeWidth={1.5} aria-hidden="true" />
                    </span>

                    <div className="min-w-0">
                      <h3 className="text-h4 text-fg">{title}</h3>
                      <p className="mt-2 text-body-sm text-fg-muted">{body}</p>
                    </div>
                  </Reveal.Item>
                );
              })}
            </Reveal.Group>
          </div>

          {/* ---------------------------------------------------- reasons */}
          <Reveal preset="right" delay={0.1} className="min-w-0">
            <div className="rounded-xl border border-white/[0.08] bg-ink-900 p-8 shadow-card lg:sticky lg:top-28">

              <p className="mt-5 text-body-lg text-fg-secondary">
                We&apos;re a Tirupati operator, not a booking platform. The
                person who quotes your trip is the person accountable for it.
              </p>

              <ul className="mt-8 space-y-4">
                {reasons.map((reason) => (
                  <li key={reason} className="flex items-start gap-3.5">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-500/15">
                      <Check
                        size={12}
                        strokeWidth={2.5}
                        aria-hidden="true"
                        className="text-gold-400"
                      />
                    </span>
                    <span className="text-body-sm text-fg-secondary">{reason}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 hairline" />

              <p className="mt-6 text-caption text-fg-muted">
                Based in Tirupati · Available 24×7 on call and WhatsApp
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
