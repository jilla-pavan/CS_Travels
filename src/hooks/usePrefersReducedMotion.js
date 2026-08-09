import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";
const POINTER_QUERY = "(hover: hover) and (pointer: fine)";

/**
 * Development-only override: append `?motion=off` to any URL to force the
 * reduced-motion path.
 *
 * The brief requires that reduced motion "must actually be tested", and
 * toggling an OS-level accessibility setting to check a hover state is slow
 * enough that in practice it never gets done. This makes the reduced-motion
 * rendering a single click away.
 *
 * Gated on import.meta.env.DEV so it cannot be triggered in production.
 */
function devMotionOverride() {
  if (!import.meta.env.DEV || typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("motion") === "off";
}

/**
 * Reactive reduced-motion preference.
 *
 * Reads true on the very first render when the user has the OS setting on, so
 * nothing animates once and then stops. Also listens for changes, because the
 * preference can be toggled mid-session (and because Lighthouse and the
 * accessibility audit both flip it while the page is open).
 *
 * Use this to gate anything CSS can't reach: GSAP timelines, Lenis, R3F frame
 * loops, autoplay carousels, the custom cursor, count-up numbers.
 */
export function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window === "undefined") return true; // SSG/prerender: assume reduced
    return devMotionOverride() || window.matchMedia(QUERY).matches;
  });

  useEffect(() => {
    if (devMotionOverride()) return undefined;

    const mql = window.matchMedia(QUERY);
    const onChange = (event) => setPrefersReduced(event.matches);

    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return prefersReduced;
}

/**
 * Pointer capability, for interactions that must not exist on touch: the custom
 * cursor, magnetic buttons, hover-only reveals.
 *
 * `hover: hover` and `pointer: fine` together exclude both touch screens and
 * stylus/TV remotes — a device that can hover but only coarsely still gets the
 * simple path.
 */
export function useHasFinePointer() {
  /* Read during initialisation rather than in an effect, so the first render is
     already correct. Setting it in an effect meant every magnetic button
     rendered once as non-magnetic and then re-rendered — a wasted pass on every
     button on the page. */
  const [fine, setFine] = useState(() => {
    if (typeof window === "undefined") return false; // SSG/prerender: assume touch
    return window.matchMedia(POINTER_QUERY).matches;
  });

  useEffect(() => {
    const mql = window.matchMedia(POINTER_QUERY);
    const onChange = (event) => setFine(event.matches);

    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return fine;
}
