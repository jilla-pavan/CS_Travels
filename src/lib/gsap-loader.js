import { easing } from "./design-tokens";

/**
 * Lazy GSAP loader.
 *
 * GSAP + ScrollTrigger is 47.5KB gzipped — the single largest avoidable item in
 * the bundle. It is needed by exactly two sections (Fleet's pinned scroll and
 * How It Works' drawn line), both far below the fold, and by the Lenis↔
 * ScrollTrigger sync which is only meaningful once a ScrollTrigger exists.
 *
 * So nothing imports gsap at module scope any more. Everything calls `loadGsap()`
 * from inside an effect, and Rollup emits one shared chunk fetched on demand.
 *
 * The promise is memoised: three call sites racing on first paint produce one
 * network request and one plugin registration, not three.
 */
let gsapPromise = null;

/**
 * True once something has actually asked for GSAP.
 *
 * Callers that only want to poke an existing setup — the window-load
 * ScrollTrigger.refresh(), for instance — must check this first. Calling
 * loadGsap() from a global listener would pull the chunk on every page load and
 * undo the entire point of making it lazy.
 */
export const isGsapLoaded = () => gsapPromise !== null;

export function loadGsap() {
  if (gsapPromise) return gsapPromise;

  gsapPromise = Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
    import("gsap/CustomEase"),
  ]).then(([{ gsap }, { ScrollTrigger }, { CustomEase }]) => {
    gsap.registerPlugin(ScrollTrigger, CustomEase);

    /* The two token curves, registered once as named eases so timelines can say
       `ease: "csEntrance"` instead of restating the bezier. Registration is
       idempotent, but the memoised promise means it only happens once anyway. */
    CustomEase.create("csEntrance", `M0,0 C${easing.entrance.join(",")} 1,1`);
    CustomEase.create("csState", `M0,0 C${easing.state.join(",")} 1,1`);

    return { gsap, ScrollTrigger, CustomEase };
  });

  return gsapPromise;
}
