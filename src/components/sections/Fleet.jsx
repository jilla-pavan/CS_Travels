import { useEffect, useRef } from "react";
import { Users, Briefcase, Snowflake, MessageCircle } from "lucide-react";
import { Eyebrow, Badge } from "../ui/Badge";
import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";
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
     * Only fetch GSAP once this section is within a viewport of being reached.
     *
     * Calling loadGsap() straight from the effect pulled the chunk on page load
     * for every visitor, which is most of what making it lazy was for. This
     * section sits well down the page; a visitor who never scrolls that far
     * never downloads it.
     */
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setup();
      },
      { rootMargin: "100% 0px" },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      cancelled = true;
      observer.disconnect();
      mm?.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="fleet"
      aria-labelledby="fleet-heading"
      className="relative overflow-hidden bg-ink-950 py-20 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ink-mesh" />

      <div className="relative z-raised mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <Eyebrow>The fleet</Eyebrow>
          <h2 id="fleet-heading" className="mt-5 text-h2 text-fg">
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
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-ink-900 shadow-card transition-[border-color,box-shadow] duration-standard ease-state hover:border-gold-500/30 hover:shadow-lift">
      {/*
        Studio plate.

        There is no vehicle photography (CONTENT-BRIEF.md §4/§8), so rather than
        fake it with stock cars that aren't the actual fleet, this is a lit stage
        with the class set typographically — the spec-panel treatment a
        configurator uses. It reads as deliberate, and it becomes a real photo
        slot the moment images exist.

        The "studio lighting" is a static radial gradient plus one gold floor
        line. No animation: this is repeated four times across a pinned section
        and an animated gradient per card is exactly the kind of thing that
        costs frames on a mid-range Android.
      */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[radial-gradient(ellipse_60%_50%_at_50%_35%,rgba(26,66,112,0.55),transparent_70%),linear-gradient(180deg,#081426,#050D1A)]">
        <div
          aria-hidden="true"
          className="absolute inset-x-8 bottom-10 h-px bg-[linear-gradient(90deg,transparent,rgba(212,175,55,0.5),transparent)]"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <Badge variant="muted" size="sm">
            {vehicle.className}
          </Badge>
          <p className="mt-4 text-h3 text-fg">{vehicle.name}</p>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(180deg,transparent,#0B1F3A)]"
        />
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

        <div className="mt-auto pt-6">
          <div className="flex items-baseline justify-between border-t border-white/[0.08] pt-5">
            <span className="text-overline uppercase text-fg-muted">Per km</span>
            {/* @placeholder — rate from data/fleet.js */}
            <span className="text-h3 text-gold-400">₹{vehicle.perKm}</span>
          </div>

          <Button asChild variant="primary" size="md" className="mt-5 w-full">
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
