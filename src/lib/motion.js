/**
 * The motion system.
 *
 * Every animation on the site composes from what's in this file. If a section
 * needs a curve or duration that isn't here, that's a design decision to make
 * deliberately — not a one-off number to inline.
 *
 * Reduced motion: the app is wrapped in <MotionConfig reducedMotion="user">, so
 * Framer strips transform/layout animations from these variants automatically
 * while leaving opacity intact. GSAP and Lenis don't get that for free and are
 * guarded explicitly at their call sites.
 */

import { duration, easing, stagger, distance } from "./design-tokens.js";

/* Framer wants seconds; the tokens are in milliseconds. */
const s = (ms) => ms / 1000;

export const ease = easing;

export const transition = {
  micro: { duration: s(duration.micro), ease: easing.state },
  standard: { duration: s(duration.standard), ease: easing.state },
  entrance: { duration: s(duration.entrance), ease: easing.entrance },
  cinematic: { duration: s(duration.cinematic), ease: easing.entrance },
};

/* ---------------------------------------------------------------- variants */

/** The workhorse. Rise and fade — used for nearly every scroll reveal. */
export const fadeUp = {
  hidden: { opacity: 0, y: distance.md },
  visible: { opacity: 1, y: 0, transition: transition.entrance },
};

export const fadeUpSm = {
  hidden: { opacity: 0, y: distance.sm },
  visible: { opacity: 1, y: 0, transition: transition.entrance },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transition.entrance },
};

/** Horizontal entrance, for alternating-layout sections only. */
export const fadeSide = (from = "left") => ({
  hidden: { opacity: 0, x: from === "left" ? -distance.md : distance.md },
  visible: { opacity: 1, x: 0, transition: transition.entrance },
});

/**
 * Line-by-line mask reveal. The child rises out from behind a clipped parent,
 * so the text appears to be uncovered rather than to fly in.
 *
 * Usage: a parent with `overflow-hidden` per line, this on the inner span.
 */
export const maskLine = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: s(duration.cinematic), ease: easing.entrance },
  },
};

/** Scale-in for badges and small ornaments. Subtle — 0.92, not 0.5. */
export const popIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: transition.standard },
};

/* -------------------------------------------------------------- staggering */

/**
 * Parent orchestrator. `tight` (60ms) for dense lists, `loose` (90ms) for cards.
 * delayChildren gives the container's own entrance room to land first.
 */
export const staggerContainer = (speed = "loose", delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: speed === "tight" ? stagger.tight : stagger.loose,
      delayChildren,
    },
  },
});

/* ------------------------------------------------------------ view options */

/**
 * Standard whileInView config. `once: true` is the important part — re-triggering
 * reveals every time a section scrolls back into view is the single most common
 * way a site starts feeling cheap.
 *
 * The -12% bottom margin fires the reveal slightly before the element is fully
 * on screen, so it's already settling as the user arrives at it.
 */
export const inView = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -12% 0px",
};

/* --------------------------------------------------------------- interaction */

/** Card lift. Paired with `shadow-card` → `shadow-lift` in the component. */
export const lift = {
  rest: { y: 0 },
  hover: { y: -6, transition: transition.standard },
};

/** Button press. Never below 0.97 — deeper reads as a toy. */
export const press = {
  hover: { y: -2, transition: transition.micro },
  tap: { scale: 0.97, transition: { duration: s(120) } },
};

/**
 * Slow image scale on hover. 1.0 → 1.05 over 700ms, inside an overflow mask.
 * Slower than instinct says it should be; that's what makes it read as premium.
 */
export const imageZoom = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: s(700), ease: easing.entrance } },
};

/* ------------------------------------------------------------------ GSAP */

/**
 * GSAP consumes the same tokens, in seconds, with string-form curves.
 * Registered as named eases in providers/SmoothScroll.jsx.
 */
export const gsapTokens = {
  duration: {
    micro: s(duration.micro),
    standard: s(duration.standard),
    entrance: s(duration.entrance),
    cinematic: s(duration.cinematic),
  },
  ease: {
    entrance: "csEntrance",
    state: "csState",
  },
  stagger,
  distance,
};
