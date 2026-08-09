import { useEffect, useRef } from "react";
import { MessageCircle, ClipboardCheck, UserCheck, Car } from "lucide-react";
import { Eyebrow } from "../ui/Badge";
import { Reveal } from "../ui/Reveal";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { loadGsap } from "../../lib/gsap-loader";

const STEPS = [
  {
    icon: MessageCircle,
    title: "Tell us the trip",
    body: "Call or send the details on WhatsApp — dates, pickup, how many of you.",
  },
  {
    icon: ClipboardCheck,
    title: "Get a fixed quote",
    body: "We come back with the vehicle and the total. Agreed before anything is booked.",
  },
  {
    icon: UserCheck,
    title: "Driver assigned",
    body: "You get the driver's name, number and vehicle details the day before.",
  },
  {
    icon: Car,
    title: "Travel",
    body: "Pickup at the agreed time. Pay at the end, at the price you were quoted.",
  },
];

/**
 * How booking works.
 *
 * A four-step timeline whose connecting line draws itself as you scroll.
 *
 * The line is a plain <path> with `strokeDasharray`/`strokeDashoffset` scrubbed
 * by ScrollTrigger — not the DrawSVG plugin. DrawSVG is available in GSAP 3.15
 * and would be marginally tidier, but the dash-offset technique is three lines,
 * has no plugin cost, and does exactly the same thing for a single open path.
 *
 * Stroke properties are neither transform nor opacity, so this is a deliberate
 * exception to that rule: nothing reflows, the paint is confined to a
 * hairline, and it is skipped entirely under reduced motion (the line simply
 * renders complete).
 */
export default function HowItWorks() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return undefined;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;

    if (prefersReducedMotion) {
      /* Drawn, not animated. The line is structure — it connects the steps — so
         it has to be present even when nothing may move. */
      path.style.strokeDashoffset = "0";
      return undefined;
    }

    path.style.strokeDashoffset = `${length}`;

    let cancelled = false;
    let ctx = null;

    const setup = () => loadGsap().then(({ gsap }) => {
      if (cancelled) return;

      ctx = gsap.context(() => {
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "bottom 75%",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
      }, sectionRef);
    });

    /* Same deferral as Fleet: fetch GSAP only once this section is within a
       viewport of being reached, not on page load. */
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
      ctx?.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      aria-labelledby="how-heading"
      className="relative overflow-hidden bg-ink-900 py-20 lg:py-28"
    >
      <div className="relative z-raised mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <Eyebrow>How it works</Eyebrow>
          <h2 id="how-heading" className="mt-5 text-h2 text-fg">
            Four steps, <span className="text-gold-400">no surprises</span>
          </h2>
          <p className="mt-5 text-body-lg text-fg-secondary">
            No app, no account, no prepayment. The whole thing happens on
            WhatsApp or the phone.
          </p>
        </Reveal>

        <div className="relative mt-16">
          {/*
            The drawn line. Horizontal on desktop, hidden on mobile where the
            steps stack vertically and a connector would have to be re-drawn at
            a different angle for no real gain.
          */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-7 hidden h-2 w-full lg:block"
            viewBox="0 0 1000 8"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M 40 4 L 960 4"
              stroke="rgba(255,255,255,0.10)"
              strokeWidth="1"
            />
            <path
              ref={pathRef}
              d="M 40 4 L 960 4"
              className="stroke-gold-500"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>

          <Reveal.Group
            speed="loose"
            className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
          >
            {STEPS.map(({ icon: Icon, title, body }, index) => (
              <Reveal.Item key={title} className="relative min-w-0">
                <div className="relative z-raised grid h-14 w-14 place-items-center rounded-full border border-gold-500/30 bg-ink-900">
                  <Icon
                    size={20}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="text-gold-400"
                  />
                </div>

                <p className="mt-6 text-overline uppercase text-fg-muted">
                  Step {index + 1}
                </p>
                <h3 className="mt-2 text-h4 text-fg">{title}</h3>
                <p className="mt-2.5 text-body-sm text-fg-muted">{body}</p>
              </Reveal.Item>
            ))}
          </Reveal.Group>
        </div>
      </div>
    </section>
  );
}
