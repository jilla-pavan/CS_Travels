import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { destinations } from "../../data/destinations";

const RouteCanvas = lazy(() => import("../route/RouteCanvas"));

/**
 * The climb — a pinned, scroll-driven 3D sequence.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * This is the page's one genuinely cinematic moment, and the only place with
 * real 3D geometry: a terrain mesh and a road ribbon extruded along a spline,
 * transformed through a perspective camera. Scrolling flies the camera up the
 * ghat road and lays the road down ahead of it, so the scrollbar IS the journey.
 *
 * The section is 300vh tall and pins its viewport: three screens of scrolling
 * advance the climb without the page appearing to move. That, rather than
 * another grid, is what breaks the page's rhythm.
 *
 * Every number on screen is real — Tirumala's distance, duration and both fares
 * come from data/destinations.js, so the drama is attached to facts a customer
 * can act on rather than invented spectacle.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* Facts revealed as the climb progresses. */
const tirumala = destinations.find((d) => d.slug === "tirumala");

const BEATS = [
  {
    at: 0.06,
    title: "It starts in Tirupati",
    body: "Pickup from your hotel, the station or the airport — most darshan days begin before sunrise.",
  },
  {
    at: 0.38,
    title: "Then the ghat road",
    body: "Seven hairpins up the Seshachalam hills. It is the part of the trip people remember, and the part you want an experienced driver for.",
  },
  {
    at: 0.72,
    title: "Tirumala at the top",
    body: "We wait while you take darshan, however long the queue runs, and bring you back down.",
  },
];

export default function TheClimb() {
  const sectionRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  /* Only build the scene once the section is within a viewport of arriving —
     the geometry, matrices and shaders are a separate chunk. */
  /**
   * Mounted on idle, not on intersection.
   *
   * IntersectionObserver was the obvious gate — build the scene only when the
   * section is near — but its callbacks are suppressed entirely while a
   * document is hidden. A visitor who opens the page in a background tab and
   * comes back finds the centrepiece permanently blank, with no error to
   * explain it. Verified here: an IO on this very element, sitting inside the
   * viewport, never fired once.
   *
   * That is the wrong failure mode for the page's main event. `requestIdleCallback`
   * runs after first paint regardless of visibility, so the scene always
   * arrives and still never competes with LCP. The cost of being certain is
   * ~8KB gzipped fetched during idle time.
   */
  useEffect(() => {
    const schedule = window.requestIdleCallback ?? ((fn) => setTimeout(fn, 300));
    const cancel = window.cancelIdleCallback ?? clearTimeout;
    const handle = schedule(() => setMounted(true), { timeout: 2500 });
    return () => cancel(handle);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={sectionRef}
      id="the-climb"
      aria-labelledby="climb-heading"
      className="relative h-[300vh] bg-ink-950"
    >
      {/* The pinned viewport. `sticky` rather than a GSAP pin: there is no
          horizontal track to translate, so the browser can do this natively
          with no JS on the scroll path at all. */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Static fallback — also what shows if WebGL2 is unavailable. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_75%,rgba(26,66,112,0.45),transparent_70%),linear-gradient(180deg,#050D1A,#08152A_60%,#050D1A)]"
        />

        {mounted && (
          <Suspense fallback={null}>
            <RouteCanvas
              sectionRef={sectionRef}
              className="absolute inset-0 h-full w-full"
            />
          </Suspense>
        )}

        {/* Vignette keeps the copy legible over whatever the camera is showing. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,13,26,0.85)_0%,transparent_32%,transparent_58%,rgba(5,13,26,0.92)_100%)]"
        />

        <div className="relative z-raised flex h-full flex-col justify-between px-5 py-16 sm:px-6 lg:px-10 lg:py-20">
          <div className="mx-auto w-full max-w-7xl">
            <h2
              id="climb-heading"
              className="max-w-xl text-h2 text-fg"
            >
              Tirupati to Tirumala,
              <span className="block text-gold-300">{tirumala.distanceKm} kilometres up</span>
            </h2>
          </div>

          {/* Beats crossfade as the climb advances. Absolutely positioned in a
              fixed-height box so swapping copy never shifts the layout. */}
          <div className="mx-auto w-full max-w-7xl">
            <div className="relative h-[8.5rem] max-w-md sm:h-[7.5rem]">
              {BEATS.map((beat, index) => (
                <Beat
                  key={beat.title}
                  beat={beat}
                  next={BEATS[index + 1]}
                  progress={scrollYProgress}
                />
              ))}
            </div>

            {/* Real numbers, always visible. */}
            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/[0.10] pt-6">
              <div>
                <dt className="text-caption text-fg-muted">Distance</dt>
                <dd className="mt-1 text-h4 text-fg">{tirumala.distanceKm} km</dd>
              </div>
              <div>
                <dt className="text-caption text-fg-muted">Drive time</dt>
                <dd className="mt-1 text-h4 text-fg">{tirumala.duration}</dd>
              </div>
              <div>
                <dt className="text-caption text-fg-muted">Sedan · 4 seater</dt>
                <dd className="mt-1 text-h4 text-gold-300">{tirumala.fare4}</dd>
              </div>
              <div>
                <dt className="text-caption text-fg-muted">SUV · 6 seater</dt>
                <dd className="mt-1 text-h4 text-gold-300">{tirumala.fare6}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * One beat of copy, faded in over its slice of the scroll.
 *
 * Opacity only, driven straight from the scroll motion value — no re-render per
 * frame, and nothing for reduced motion to strip beyond the fade itself.
 */
function Beat({ beat, next, progress }) {
  /*
   * Every offset must sit inside [0,1] AND increase monotonically. Framer hands
   * these to WAAPI verbatim, and it rejects both a negative first offset (the
   * opening beat starts at 0.06, so `at - 0.08` went to -0.02) and anything past
   * 1 (the closing beat had no `next`, so its end ran to 1.02). Either one
   * throws and takes the whole route down.
   */
  const clamp = (v) => Math.min(Math.max(v, 0), 1);
  const end = next ? next.at : 1;

  const stops = [
    clamp(beat.at - 0.08),
    clamp(beat.at),
    clamp(end - (next ? 0.08 : 0.02)),
    clamp(end),
  ];

  /* Guarantee strictly non-decreasing after clamping — two equal stops are
     legal, a decreasing pair is not. */
  for (let i = 1; i < stops.length; i += 1) {
    if (stops[i] < stops[i - 1]) stops[i] = stops[i - 1];
  }

  const opacity = useTransform(progress, stops, [0, 1, 1, next ? 0 : 1]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <h3 className="text-h4 text-fg">{beat.title}</h3>
      <p className="mt-2.5 text-body text-fg-secondary">{beat.body}</p>
    </motion.div>
  );
}
