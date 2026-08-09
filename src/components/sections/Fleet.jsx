import { useEffect, useRef } from "react";
import { Users, Briefcase, Snowflake, MessageCircle } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";
import { Picture } from "../ui/Image";
import fleetImage from "../../assets/Packages_Background.png?preset=scene";
import { fleet, fleetTerms } from "../../data/fleet";
import { cn, whatsappLink } from "../../lib/utils";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { loadGsap } from "../../lib/gsap-loader";

/**
 * Fleet — pinned horizontal scroll.
 *
 * The section pins and the card track advances sideways as you scroll down.
 * Three conditions have to hold before that behaviour is allowed:
 *
 *   · viewport ≥ 1024px — pinning a phone hijacks the one gesture the user
 *     actually owns, and momentum scrolling fights the pin on iOS
 *   · motion is not reduced
 *   · the track is genuinely wider than the viewport
 *
 * When any fails, the exact same markup degrades to a native scroll-snap row:
 * no JS, no pin, full keyboard and swipe support. That's why the fallback isn't
 * a separate component — one DOM tree, two behaviours.
 */
export default function Fleet() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    /* Below the pin breakpoint the section is a native scroll-snap row and
       needs no JS at all — so don't even fetch GSAP on a phone. */
    if (!window.matchMedia("(min-width: 1024px)").matches) return undefined;

    let cancelled = false;
    let mm = null;

    const setup = () => loadGsap().then(({ gsap }) => {
      if (cancelled) return;

      /* gsap.matchMedia handles the breakpoint AND tears the timeline down when
         it stops matching — the usual source of a section staying pinned after
         a resize is doing this by hand. */
      mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const track = trackRef.current;
        const section = sectionRef.current;
        if (!track || !section) return undefined;

        /* Recomputed on every refresh rather than captured once, so a resize or
           a late-loading font can't leave the end position stale. */
        const distance = () =>
          Math.max(0, track.scrollWidth - window.innerWidth + 80);

        if (distance() === 0) return undefined;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            /* scrub: 1 gives the track a one-second catch-up on the scroll
               position — it trails the wheel slightly instead of being welded
               to it, which is what makes a pinned section feel weighted. */
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        return () => tween.kill();
      });
    });

    /**
     * Set up on idle, not on intersection.
     *
     * The IntersectionObserver gate was the efficient choice, but IO callbacks
     * are suppressed entirely while a document is hidden — so in a background
     * tab the pin silently never initialises, and the section is left in a
     * half-configured state. It also made the bug that broke this section
     * impossible to reproduce locally.
     *
     * Idle runs regardless of visibility and still keeps GSAP off the critical
     * path.
     */
    const schedule = window.requestIdleCallback ?? ((fn) => setTimeout(fn, 300));
    const cancel = window.cancelIdleCallback ?? clearTimeout;
    const handle = schedule(setup, { timeout: 2500 });

    return () => {
      cancelled = true;
      cancel(handle);
      mm?.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="fleet"
      aria-labelledby="fleet-heading"
      className="relative isolate overflow-hidden bg-ink-950 py-20 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0"
    >
      {/*
        Real photography instead of a mesh gradient.

        This section used to be four empty gradient plates on a flat background —
        the least finished thing on the page. The vehicle-at-a-temple photograph
        does the work the plates were standing in for, and putting it BEHIND the
        cards rather than inside them means one image serves all four rather than
        the same picture repeating in every card.
      */}
      <Picture
        source={fleetImage}
        alt=""
        sizes="100vw"
        className="absolute inset-0 -z-20 h-full w-full"
        imgClassName="object-cover object-[70%_center]"
      />

      {/* Graded hard so the spec cards stay the subject and the photograph
          stays atmosphere. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,13,26,0.92)_0%,rgba(5,13,26,0.58)_45%,rgba(5,13,26,0.90)_100%)]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-ink-mesh opacity-60" />

      <div className="relative z-raised mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <h2 id="fleet-heading" className="text-h2 text-fg">
            Pick the <span className="text-gold-400">right vehicle</span>
          </h2>
          <p className="mt-5 text-body-lg text-fg-secondary">
            Every vehicle is air-conditioned, privately hired, and driven by
            someone who knows the Tirumala ghat road.
          </p>
        </Reveal>
      </div>

      {/*
        Fallback container. `overflow-x-auto` + scroll-snap below lg gives a
        native swipeable row; at lg the overflow goes visible so GSAP can
        translate the track without fighting a scroll container.
      */}
      <div
        className={cn(
          "relative z-raised mt-12 lg:mt-16",
          "overflow-x-auto pb-4 lg:overflow-x-visible lg:pb-0",
          "snap-x snap-mandatory lg:snap-none",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        <ul
          ref={trackRef}
          className="flex w-max gap-5 px-5 will-change-transform sm:px-6 lg:px-10"
        >
          {fleet.map((vehicle) => (
            <li
              key={vehicle.id}
              className="w-[78vw] max-w-[380px] shrink-0 snap-start sm:w-[52vw] lg:w-[380px]"
            >
              <VehicleCard vehicle={vehicle} />
            </li>
          ))}
        </ul>
      </div>

      <div className="relative z-raised mx-auto mt-10 w-full max-w-7xl px-5 sm:px-6 lg:px-10">
        {/* @placeholder — charges policy, see data/fleet.js */}
        <p className="text-caption text-fg-muted">
          Rates are per kilometre with a {fleet[0].minKmPerDay} km daily minimum.
          Tolls, parking and permits are billed at actual. Night charge applies
          after {fleetTerms.nightChargeAfter}.
        </p>
      </div>
    </section>
  );
}

function VehicleCard({ vehicle }) {
  const specs = [
    { icon: Users, label: `${vehicle.seats} + driver` },
    { icon: Briefcase, label: `${vehicle.luggage} bags` },
    { icon: Snowflake, label: vehicle.ac ? "AC" : "Non-AC" },
  ];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/[0.10] bg-ink-950/85 shadow-card backdrop-blur-md transition-[border-color,box-shadow] duration-standard ease-state hover:border-gold-500/35 hover:shadow-lift">
      {/*
        The 4:3 "studio plate" is gone.

        It was a 300px empty gradient box repeated four times, standing in for
        vehicle photography — and four empty boxes in a row read as unfinished,
        not as restraint. The section's own photograph now carries the imagery,
        so each card leads with the thing a customer actually chooses on: the
        name, the class, and the rate.

        Glass is earned here rather than decorative: these cards sit over a
        graded photograph, which is exactly the backdrop blur was designed for.
      */}
      {/* min-h keeps the header a fixed height across all four cards — without
          it, "Toyota Innova Crysta" wraps to two lines and that card's divider
          sits lower than its neighbours in a row that is meant to be scanned. */}
      <div className="flex min-h-[7.5rem] items-start justify-between gap-4 border-b border-white/[0.08] p-6 pb-5">
        <div className="min-w-0">
          <Badge variant="muted" size="sm">
            {vehicle.className}
          </Badge>
          <p className="mt-3 text-h4 text-fg">{vehicle.name}</p>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-overline uppercase text-fg-muted">Per km</p>
          {/* @placeholder — rate from data/fleet.js */}
          <p className="mt-1 text-h3 text-gold-300">₹{vehicle.perKm}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-body-sm text-fg-muted">{vehicle.blurb}</p>

        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
          {specs.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-1.5 text-caption text-fg-secondary"
            >
              <Icon size={14} aria-hidden="true" className="text-gold-500" />
              {label}
            </li>
          ))}
        </ul>

        <ul className="mt-5 space-y-1.5">
          {vehicle.bestFor.map((item) => (
            <li key={item} className="text-caption text-fg-muted">
              · {item}
            </li>
          ))}
        </ul>

        {/* The rate lives in the card header now, next to the name — one price
            per card, at the point of comparison. */}
        <div className="mt-auto pt-6">
          <Button asChild variant="primary" size="md" className="w-full">
            <a
              href={whatsappLink(
                `Hi CS Travels, I'd like to book the ${vehicle.name} (${vehicle.seats}+1). Trip details:`,
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={15} aria-hidden="true" />
              Book this vehicle
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}
