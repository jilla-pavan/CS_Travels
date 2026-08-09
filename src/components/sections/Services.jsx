import {
  Sparkles,
  Plane,
  Map,
  Route,
  Milestone,
  Car,
  Briefcase,
  Pencil,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardBody } from "../ui/Card";
import { Eyebrow } from "../ui/Badge";
import { Reveal } from "../ui/Reveal";
import { services } from "../../data/services";
import { cn, whatsappLink } from "../../lib/utils";

/**
 * Services.
 *
 * Glass cards with the gradient border sweep on hover, per the brief. The sweep
 * is the Card primitive's `sweep` prop — a masked gold gradient that travels the
 * border once per hover rather than looping.
 *
 * Glass is used here because this is one of the brief's sanctioned glass
 * moments, and because the section sits on the cream-adjacent ink-900 surface
 * where a flat card would disappear. Below 768px the .glass rule drops the
 * backdrop-filter automatically — eight blurred surfaces scrolling on a
 * mid-range Android is exactly where the frame budget goes.
 */

const ICONS = {
  sparkles: Sparkles,
  plane: Plane,
  map: Map,
  route: Route,
  milestone: Milestone,
  car: Car,
  briefcase: Briefcase,
  pencil: Pencil,
};

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative overflow-hidden bg-ink-950 py-20 lg:py-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ink-mesh" />

      <div className="relative z-raised mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <Eyebrow>What we do</Eyebrow>
          <h2 id="services-heading" className="mt-5 text-h2 text-fg">
            Every kind of <span className="text-gold-400">Tirupati trip</span>
          </h2>
          <p className="mt-5 text-body-lg text-fg-secondary">
            One operator for the airport run, the darshan day and the week-long
            temple circuit — so there&apos;s one number to call when plans change.
          </p>
        </Reveal>

        <Reveal.Group
          speed="tight"
          delayChildren={0.08}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((service) => {
            const Icon = ICONS[service.icon] ?? Sparkles;

            return (
              <Reveal.Item key={service.id} className="min-w-0">
                <Card
                  variant="glass"
                  radius="lg"
                  sweep
                  className={cn(
                    "h-full",
                    /* Featured cards get a permanent warm edge so the grid has a
                       focal point instead of eight identical tiles. */
                    service.featured && "border-gold-500/25",
                  )}
                >
                  <CardBody className="flex h-full flex-col p-6">
                    {/*
                      "Animated line icons" from the brief, done with a stroke
                      and a transform rather than an icon-animation library:
                      the stroke lightens and the glyph lifts on hover. Two
                      properties, no extra payload.
                    */}
                    <Icon
                      size={22}
                      strokeWidth={1.5}
                      aria-hidden="true"
                      className="text-gold-400 transition-[transform,color] duration-standard ease-entrance group-hover:-translate-y-0.5 group-hover:text-gold-300"
                    />

                    <h3 className="mt-5 text-h4 text-fg">{service.title}</h3>

                    <p className="mt-2.5 text-body-sm text-fg-muted">
                      {service.blurb}
                    </p>

                    <ul className="mt-4 space-y-1">
                      {service.includes.map((item) => (
                        <li key={item} className="text-caption text-fg-muted">
                          · {item}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-6">
                      <div className="flex items-baseline justify-between border-t border-white/[0.08] pt-4">
                        <span className="text-overline uppercase text-fg-muted">
                          From
                        </span>
                        {/* @placeholder — data/services.js */}
                        <span className="text-h4 text-gold-400">
                          {service.from}
                        </span>
                      </div>

                      <a
                        href={whatsappLink(
                          `Hi CS Travels, I'd like to enquire about ${service.title.toLowerCase()}.`,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "mt-4 flex min-h-[2.75rem] items-center justify-between gap-2",
                          "text-caption uppercase tracking-[0.14em] text-fg-secondary",
                          "transition-colors duration-micro ease-state hover:text-gold-300",
                        )}
                      >
                        Enquire
                        <ArrowUpRight
                          size={15}
                          aria-hidden="true"
                          className="transition-transform duration-standard ease-entrance group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </a>
                    </div>
                  </CardBody>
                </Card>
              </Reveal.Item>
            );
          })}
        </Reveal.Group>
      </div>
    </section>
  );
}
