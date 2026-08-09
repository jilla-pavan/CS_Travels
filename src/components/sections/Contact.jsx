import { useState } from "react";
import { Phone, MessageCircle, Mail, MapPin, Clock, Play } from "lucide-react";
import { Card, CardBody } from "../ui/Card";
import { Eyebrow } from "../ui/Badge";
import { Reveal } from "../ui/Reveal";
import { cn, whatsappLink } from "../../lib/utils";
import { company } from "../../data/company";

/**
 * Contact.
 *
 * The map is a FACADE, not an embedded iframe.
 *
 * A Google Maps embed pulls roughly 1.5MB of script and sets third-party
 * cookies on page load, which would single-handedly sink both the performance
 * budget and the Best Practices score — for a widget most visitors never touch.
 * This renders a static placeholder and only mounts the iframe when the user
 * asks for it. Until then: zero requests, zero cookies, zero cost.
 *
 * @placeholder — the coordinates are invented (data/company.js §2). The
 * "Open in Google Maps" link uses a name query rather than lat/lng so it still
 * lands somewhere sensible while that's true.
 */
export default function Contact() {
  const [mapLoaded, setMapLoaded] = useState(false);

  const channels = [
    {
      icon: Phone,
      label: "Call",
      value: company.phone,
      href: company.phoneHref,
      note: "Fastest for same-day trips",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Message us",
      href: whatsappLink("Hi CS Travels, I'd like to enquire about a trip."),
      note: "Send your dates and group size",
      external: true,
    },
    {
      icon: Mail,
      label: "Email",
      /** @placeholder */
      value: company.email,
      href: `mailto:${company.email}`,
      note: "For corporate and group bookings",
    },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden bg-ink-950 py-20 lg:py-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ink-mesh" />

      <div className="relative z-raised mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <Eyebrow>Get in touch</Eyebrow>
          <h2 id="contact-heading" className="mt-5 text-h2 text-fg">
            Tell us when <span className="text-gold-400">you&apos;re coming</span>
          </h2>
          <p className="mt-5 text-body-lg text-fg-secondary">
            One number, answered by the people who run the vehicles. No call
            centre, no ticket number.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          {/* ---------------------------------------------------- channels */}
          <Reveal.Group speed="loose" className="space-y-4">
            {channels.map(({ icon: Icon, label, value, href, note, external }) => (
              <Reveal.Item key={label}>
                <a
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={cn(
                    "group flex items-center gap-5 rounded-xl border border-white/[0.08] bg-ink-900 p-5",
                    "transition-[border-color,box-shadow] duration-standard ease-state",
                    "hover:border-gold-500/30 hover:shadow-lift",
                  )}
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold-500/25 text-gold-400">
                    <Icon size={19} strokeWidth={1.5} aria-hidden="true" />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-overline uppercase text-fg-muted">
                      {label}
                    </span>
                    <span className="mt-1 block truncate text-body-lg text-fg">
                      {value}
                    </span>
                    <span className="mt-0.5 block text-caption text-fg-muted">
                      {note}
                    </span>
                  </span>
                </a>
              </Reveal.Item>
            ))}

            <Reveal.Item>
              <Card variant="solid" radius="xl">
                <CardBody className="p-5">
                  <div className="flex items-start gap-5">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold-500/25 text-gold-400">
                      <Clock size={19} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-overline uppercase text-fg-muted">Hours</p>
                      {/* @placeholder — data/company.js */}
                      <dl className="mt-2 space-y-1">
                        {company.hours.map((h) => (
                          <div key={h.days} className="flex flex-wrap gap-x-2">
                            <dt className="text-body-sm text-fg-secondary">
                              {h.days}
                            </dt>
                            <dd className="text-body-sm text-fg-muted">{h.time}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Reveal.Item>
          </Reveal.Group>

          {/* --------------------------------------------------------- map */}
          <Reveal delay={0.1} preset="right" className="min-w-0">
            <div className="overflow-hidden rounded-xl border border-white/[0.08]">
              <div className="relative aspect-[4/3] w-full lg:aspect-auto lg:h-full lg:min-h-[420px]">
                {mapLoaded ? (
                  <iframe
                    title={`Map showing ${company.name} in ${company.city}`}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(
                      `${company.name}, ${company.city}, ${company.state}`,
                    )}&output=embed`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 h-full w-full border-0"
                  />
                ) : (
                  <>
                    {/* Static stand-in. No network request until asked. */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(26,66,112,0.6),transparent_70%),linear-gradient(180deg,#0B1F3A,#050D1A)]"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
                      <MapPin
                        size={26}
                        strokeWidth={1.5}
                        aria-hidden="true"
                        className="text-gold-400"
                      />
                      <p className="text-h4 text-fg">
                        {company.city}, {company.state}
                      </p>
                      <p className="max-w-xs text-caption text-fg-muted">
                        The map loads from Google only when you ask it to, so it
                        costs you nothing until then.
                      </p>

                      <button
                        type="button"
                        onClick={() => setMapLoaded(true)}
                        className={cn(
                          "mt-1 inline-flex min-h-[2.75rem] items-center gap-2 rounded-full px-5",
                          "border border-white/12 text-caption uppercase tracking-[0.14em] text-fg",
                          "transition-colors duration-micro ease-state",
                          "hover:border-gold-500/40 hover:text-gold-300",
                        )}
                      >
                        <Play size={13} aria-hidden="true" />
                        Load map
                      </button>

                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          `${company.name}, ${company.city}`,
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-caption text-gold-400 underline-offset-4 hover:underline"
                      >
                        Open in Google Maps instead
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Reveal>
        </div>

        {/* service areas */}
        <Reveal delay={0.15} className="mt-10">
          <p className="text-caption text-fg-muted">
            <span className="text-fg-secondary">We cover:</span>{" "}
            {company.serviceAreas.join(" · ")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
