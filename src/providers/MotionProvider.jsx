import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { MotionConfig } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { loadGsap, isGsapLoaded } from "../lib/gsap-loader";

const MotionContext = createContext({ getLenis: () => null, reducedMotion: false });

/**
 * Returns a getter rather than the instance itself.
 *
 * Lenis is only ever used imperatively (`scrollTo`), so holding it in state
 * bought nothing and cost a re-render of the entire tree the moment it
 * initialised. A ref behind a stable getter gives callers the same access with
 * no render churn.
 */
export const useLenis = () => useContext(MotionContext).getLenis;
export const useMotionContext = () => useContext(MotionContext);

/**
 * Owns every global motion concern: smooth scroll, the shared rAF ticker,
 * ScrollTrigger synchronisation, and the reduced-motion kill switch.
 *
 * Two things worth knowing:
 *
 * 1. Lenis and GSAP share ONE rAF loop. Two independent loops is the usual
 *    cause of "smooth scroll feels laggy" — scroll position and pinned-section
 *    transforms end up a frame apart, and pinned content visibly slides.
 *
 * 2. Both GSAP and Lenis are now dynamically imported, so neither is in the
 *    initial bundle. The trade is that the page scrolls natively for the first
 *    few hundred milliseconds until they arrive. That's a deliberate choice:
 *    native scroll during load is invisible to a user who hasn't scrolled yet,
 *    whereas 55KB on the critical path is not.
 */
export function MotionProvider({ children }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const lenisRef = useRef(null);

  useEffect(() => {
    /* Reduced motion: no Lenis, no GSAP ticker. Native scrolling is instant and
       predictable, which is the entire point of the preference. Sections that
       need ScrollTrigger load it themselves and render their static state. */
    if (prefersReducedMotion) return undefined;

    let cancelled = false;
    let cleanup = () => {};

    const boot = async () => {
      const [{ gsap, ScrollTrigger }, { default: Lenis }] = await Promise.all([
        loadGsap(),
        import("lenis"),
      ]);

      /* Unmounted (or preference flipped) while the chunks were in flight. */
      if (cancelled) return;

      const instance = new Lenis({
        /* 0.1 is the brief's target: present enough to feel considered, quick
           enough that it never floats behind the user's input. */
        lerp: 0.1,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
        /* Native scrolling on touch. Momentum-hijacking a phone is the fastest
           way to make a site feel broken, and iOS Safari fights it regardless. */
        smoothWheel: true,
        syncTouch: false,
        autoRaf: false,
      });

      lenisRef.current = instance;

      /* Lenis drives ScrollTrigger rather than the other way round. */
      instance.on("scroll", ScrollTrigger.update);

      const tick = (time) => instance.raf(time * 1000);
      gsap.ticker.add(tick);

      /* GSAP's lag smoothing skips frames to "catch up" after a stall, which
         makes scroll-linked animation jump. Off, so scroll stays authoritative. */
      gsap.ticker.lagSmoothing(0);

      /* Positions cached before Lenis existed are now wrong. */
      ScrollTrigger.refresh();

      cleanup = () => {
        instance.off("scroll", ScrollTrigger.update);
        gsap.ticker.remove(tick);
        gsap.ticker.lagSmoothing(500, 33);
        instance.destroy();
        lenisRef.current = null;
      };
    };

    /**
     * Deferred until the user shows scroll intent.
     *
     * Booting on mount meant GSAP + Lenis (53KB gz) were fetched on every page
     * load even for a visitor who never scrolled. Neither does anything until
     * the page moves, so nothing is lost by waiting — and a bounce visitor now
     * downloads neither.
     *
     * The first wheel notch or touch is handled natively; Lenis initialises
     * from the current scroll position, so there's no jump when it takes over.
     * `once: true` + passive keeps this off the scroll hot path.
     */
    const EVENTS = ["wheel", "touchstart", "pointerdown", "keydown", "scroll"];
    const onIntent = () => {
      EVENTS.forEach((type) => window.removeEventListener(type, onIntent));
      boot();
    };
    EVENTS.forEach((type) =>
      window.addEventListener(type, onIntent, { passive: true, once: true }),
    );

    return () => {
      cancelled = true;
      EVENTS.forEach((type) => window.removeEventListener(type, onIntent));
      cleanup();
    };
  }, [prefersReducedMotion]);

  /**
   * Anchor links. Every `href="#section"` on the site routes through Lenis so
   * in-page navigation matches the scroll feel of the rest of the page, and so
   * the fixed nav doesn't cover the target.
   *
   * Delegated at the document so it covers nav, footer, and anything added
   * later without each component wiring it up. Falls back to native scrolling
   * when Lenis hasn't loaded yet — the link always works.
   */
  useEffect(() => {
    const onClick = (event) => {
      const anchor = event.target.closest?.('a[href*="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      /* Only same-page anchors. "/#services" from a package route is a real
         navigation and must be left to the router. */
      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return;
      const path = href.slice(0, hashIndex);
      if (path && path !== "/" && path !== window.location.pathname) return;
      if (path === "/" && window.location.pathname !== "/") return;

      const id = href.slice(hashIndex + 1);
      /* Bare "#" and the legacy hash routes are not scroll targets. */
      if (!id || id.startsWith("/")) return;

      const target = document.getElementById(id);
      if (!target) return;

      event.preventDefault();

      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(target, { offset: -96, duration: 1.1 });
      } else {
        target.scrollIntoView({ behavior: "auto", block: "start" });
      }

      /* Scrolling alone doesn't move focus, which strands keyboard and screen
         reader users at the top of the page. Move focus to the target and give
         it a temporary tabindex if it isn't natively focusable. */
      if (!target.hasAttribute("tabindex")) {
        target.setAttribute("tabindex", "-1");
      }
      target.focus({ preventScroll: true });

      window.history.pushState(null, "", `#${id}`);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  /* Late-loading images change page height and leave ScrollTrigger's cached
     positions stale, which desynchronises every pinned section below them. */
  /**
   * Keep ScrollTrigger's cached positions honest.
   *
   * ─────────────────────────────────────────────────────────────────────────
   * This is not housekeeping — a stale cache here is a visible, page-breaking
   * bug. ScrollTrigger measures a pin's start position once, at creation. If
   * anything above that pin changes height afterwards, the pin still fires at
   * the OLD scroll position: the pinned section goes `position: fixed` while
   * the section above it is still on screen, and the two render on top of each
   * other.
   *
   * That is exactly what happened to Fleet. The editorial Packages spread above
   * it is over 2,000px tall, and between first paint and settle the page grows
   * — the display serif swaps in, remote images resolve, fonts re-flow headings.
   * Every one of those moves Fleet's real start position downward while
   * ScrollTrigger still believes the original number.
   *
   * `window.load` alone was not enough, because GSAP is loaded lazily on scroll
   * intent, which usually happens AFTER load has already fired — so the one
   * refresh that existed was routinely a no-op.
   *
   * A ResizeObserver on <body> catches every cause at once, whatever it is.
   * Debounced with rAF so a burst of image loads triggers one refresh, not
   * twenty.
   * ─────────────────────────────────────────────────────────────────────────
   */
  useEffect(() => {
    let frame = null;
    let lastHeight = 0;

    const refresh = () => {
      /* Never pull GSAP just to refresh it — that would undo the lazy split. */
      if (!isGsapLoaded()) return;
      loadGsap().then(({ ScrollTrigger }) => ScrollTrigger.refresh());
    };

    const scheduleRefresh = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        frame = null;
        const height = document.body.scrollHeight;
        /* Only when the page actually changed length. A pinned section itself
           mutates layout while pinning, and refreshing on that would loop. */
        if (Math.abs(height - lastHeight) < 2) return;
        lastHeight = height;
        refresh();
      });
    };

    const observer = new ResizeObserver(scheduleRefresh);
    observer.observe(document.body);

    window.addEventListener("load", refresh);
    /* Fonts swapping is a height change the ResizeObserver may miss if it
       lands between frames. */
    document.fonts?.ready?.then(refresh);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("load", refresh);
    };
  }, []);

  const value = useMemo(
    () => ({
      getLenis: () => lenisRef.current,
      reducedMotion: prefersReducedMotion,
    }),
    [prefersReducedMotion],
  );

  return (
    <MotionContext.Provider value={value}>
      {/*
        "user" makes Framer drop transform and layout animation from every
        variant in lib/motion.js while preserving opacity.

        "always" when the hook has already resolved to reduced — which covers
        both the OS preference and the dev `?motion=off` override, since Framer
        reads the media query itself and would otherwise ignore the override.
      */}
      <MotionConfig reducedMotion={prefersReducedMotion ? "always" : "user"}>
        {children}
      </MotionConfig>
    </MotionContext.Provider>
  );
}
