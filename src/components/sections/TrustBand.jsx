import { BadgeIndianRupee, Users, Headset, MapPin, Star } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { Marquee } from "../ui/Marquee";
import { reviews } from "../../data/reviews";

/**
 * Trust band.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * SCOPE NOTE — this section is deliberately narrower than the brief specified.
 *
 * The brief's "Trusted by thousands" calls for a Google rating, verified-driver
 * badges, and years in service. All three need content that does not exist:
 * §9 (real rating and review count), §4 (driver vetting), §1 (founding year).
 *
 * Rather than ship four confident-looking badges backed by invented numbers —
 * on the one section of the page whose entire job is to be believed — this
 * carries only claims the business's own data supports. The remaining slots go
 * in as soon as CONTENT-BRIEF.md comes back.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * Every pillar below is defensible from what's already in the repo:
 * fixed fares from the fare table, private vehicles and 24×7 from the previous
 * site's own copy, and Tirupati-based from the business address.
 *
 * Deliberately absent: any count of drivers, trips, years, or stars.
 */
const PILLARS = [
  {
    icon: BadgeIndianRupee,
    title: "Fixed fares",
    body: "Quoted before you travel. No meter, no surge, no haggling at the end.",
  },
  {
    icon: Users,
    title: "Private vehicle",
    body: "Your group travels alone. Nothing is shared with other passengers.",
  },
  {
    icon: Headset,
    title: "24×7 booking",
    body: "Reach us on call or WhatsApp at any hour, including darshan mornings.",
  },
  {
    icon: MapPin,
    title: "Direct with the operator",
    body: "Based in Tirupati. You book with us, not through an aggregator.",
  },
];

export default function TrustBand() {
  return (
    <section
      aria-labelledby="trust-heading"
      className="relative border-y border-white/[0.07] bg-ink-900"
    >
      <h2 id="trust-heading" className="sr-only">
        Why travellers book with CS Travels
      </h2>

      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-10 lg:py-20">
        <Reveal.Group
          speed="loose"
          className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {PILLARS.map(({ icon: Icon, title, body }) => (
            <Reveal.Item key={title} className="min-w-0">
              {/* Gold hairline above each pillar — the accent doing structural
                  work rather than decorating. */}
              <div className="h-px w-10 bg-gold-500" />

              <Icon
                size={20}
                aria-hidden="true"
                className="mt-5 text-gold-400"
                strokeWidth={1.5}
              />

              <h3 className="mt-4 text-h4 text-fg">{title}</h3>
              <p className="mt-2 text-body-sm text-fg-muted">{body}</p>
            </Reveal.Item>
          ))}
        </Reveal.Group>
      </div>

      {/* ------------------------------------------------------ review strip */}
      <div className="border-t border-white/[0.07] py-5">
        <Marquee speed={50} label="What travellers say">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="flex items-center gap-3 whitespace-nowrap"
            >
              <span className="flex gap-0.5" aria-hidden="true">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={12} className="fill-gold-500 text-gold-500" />
                ))}
              </span>

              <span className="text-body-sm text-fg-secondary">
                &ldquo;{review.short}&rdquo;
              </span>

              <span className="text-caption text-fg-muted">
                {review.name} · {review.place}
              </span>

              {/* Separator between items in the running strip. */}
              <span aria-hidden="true" className="ml-3 h-3 w-px bg-white/15" />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
