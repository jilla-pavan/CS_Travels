/**
 * Design tokens — the single source of truth.
 *
 * tailwind.config.js imports this, and so does lib/motion.js. Change a value here
 * and it propagates to utility classes, Framer Motion variants, and GSAP timelines
 * at once. Nothing in the app should hardcode a colour, duration, or easing curve.
 */

/* ------------------------------------------------------------------ colour */

export const colors = {
  /* Deep blue. The site's ground. 800 is the brand primary; 950 is the page floor. */
  ink: {
    950: "#050D1A",
    900: "#08152A",
    800: "#0B1F3A",
    700: "#123054",
    600: "#1A4270",
    500: "#24568F",
    DEFAULT: "#0B1F3A",
  },

  /**
   * Royal gold. Precious metal, so it is rationed: CTAs, hairlines, active states,
   * small icons. Never a large fill, never body text.
   *
   * Contrast warning: gold-500 on white is 2.4:1 and FAILS WCAG AA. On ink-950 it is
   * 8.9:1 and passes comfortably. On the cream surface use gold-700 or darker.
   */
  gold: {
    100: "#F7EFD0",
    200: "#EFDFA3",
    300: "#E5CD73",
    400: "#DCBE52",
    500: "#D4AF37",
    600: "#B8952C",
    700: "#937522",
    800: "#6E5719",
    900: "#4A3A11",
    DEFAULT: "#D4AF37",
  },

  /* Warm neutral ramp. 50 is the off-white surface for light sections. */
  sand: {
    50: "#FAF8F5",
    100: "#F1EDE7",
    200: "#E2DCD2",
    300: "#C9C1B4",
    400: "#A79E8E",
    500: "#867D6D",
    600: "#6A6255",
    700: "#4F4940",
    800: "#35312B",
    900: "#1C1A17",
  },

  /**
   * Semantic foreground values, pre-checked against ink-950 (#050D1A).
   * These are hex rather than white-with-opacity so the contrast is testable.
   *
   *   fg          #FFFFFF  21.0:1  — headings
   *   fg-secondary #C8CED8 11.9:1  — body copy
   *   fg-muted     #8A93A3  5.8:1  — labels, meta, captions (AA floor for normal text)
   *   fg-subtle    #6B7382  3.9:1  — FAILS AA for normal text. Large text (>=24px) or
   *                                  decorative use only. Never a full sentence.
   */
  fg: {
    DEFAULT: "#FFFFFF",
    secondary: "#C8CED8",
    muted: "#8A93A3",
    subtle: "#6B7382",
  },

  /* Foregrounds for the cream sections, checked against sand-50 (#FAF8F5). */
  fgOn: {
    light: "#12151A",
    lightSecondary: "#3A4149",
    lightMuted: "#5C6570",
  },

  whatsapp: "#25D366",

  /**
   * Status colours. Deliberately minimal — two steps each, used only for form
   * validation and submit feedback. Both checked against ink-950:
   *   danger-300  #FCA5A5  9.6:1
   *   success-300 #86EFAC 12.8:1
   */
  danger: {
    300: "#FCA5A5",
    400: "#F87171",
    500: "#EF4444",
  },
  success: {
    300: "#86EFAC",
    400: "#4ADE80",
    500: "#22C55E",
  },
};

/* -------------------------------------------------------------- typography */

/**
 * Fluid type scale. Every step is a clamp() so there are no typographic
 * breakpoints to maintain — the scale is continuous from 360px to 1920px.
 */
export const fontSize = {
  overline: ["0.6875rem", { lineHeight: "1.2", letterSpacing: "0.28em" }],
  caption: ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.01em" }],
  "body-sm": ["0.875rem", { lineHeight: "1.6", letterSpacing: "0" }],
  body: ["1rem", { lineHeight: "1.6", letterSpacing: "0" }],
  "body-lg": [
    "clamp(1.0625rem, 1rem + 0.3vw, 1.1875rem)",
    { lineHeight: "1.65", letterSpacing: "-0.005em" },
  ],
  "body-xl": [
    "clamp(1.125rem, 1rem + 0.6vw, 1.375rem)",
    { lineHeight: "1.6", letterSpacing: "-0.01em" },
  ],

  h4: [
    "clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem)",
    { lineHeight: "1.35", letterSpacing: "-0.015em" },
  ],
  h3: [
    "clamp(1.375rem, 1.2rem + 0.85vw, 1.875rem)",
    { lineHeight: "1.25", letterSpacing: "-0.02em" },
  ],
  h2: [
    "clamp(1.75rem, 1.4rem + 1.75vw, 3rem)",
    { lineHeight: "1.15", letterSpacing: "-0.025em" },
  ],
  h1: [
    "clamp(2.25rem, 1.6rem + 3.2vw, 4rem)",
    { lineHeight: "1.08", letterSpacing: "-0.03em" },
  ],
  display: [
    "clamp(2.75rem, 1.6rem + 5.6vw, 5.5rem)",
    { lineHeight: "1.02", letterSpacing: "-0.035em" },
  ],
  "display-xl": [
    "clamp(3.25rem, 1.4rem + 8.2vw, 7.5rem)",
    { lineHeight: "0.98", letterSpacing: "-0.04em" },
  ],
};

/**
 * Aeonik is commercially licensed (CoType Foundry) and is NOT in this repo.
 * Drop Aeonik-Regular.woff2 / Aeonik-Medium.woff2 into public/fonts/ and it takes
 * over automatically — the @font-face rules in styles/fonts.css already reference it.
 * Until then Satoshi carries the design; see fonts.css for the fallback chain.
 */
export const fontFamily = {
  sans: [
    "Aeonik",
    "Satoshi",
    /* Metric-adjusted system face — holds the layout at CLS 0 during the swap. */
    "Aeonik Fallback",
    "system-ui",
    "-apple-system",
    "Segoe UI",
    "sans-serif",
  ],

  /**
   * The display voice. Used for section headings and the hero — never for UI,
   * labels, or anything under ~24px, where its high contrast turns to mush.
   *
   * Two faces doing clearly different jobs is what separates designed
   * typography from configured typography.
   */
  /* Keyed `serif`, not `display`: Tailwind would emit a `.font-display`
     utility, which collides with the `font-display` @font-face descriptor and
     makes PostCSS reject the @apply. */
  serif: ["Instrument Serif", "Georgia", "Times New Roman", "serif"],
};

/* ------------------------------------------------------------------ motion */

/**
 * Four durations, two curves, one stagger range, one travel range.
 * Anything that doesn't fit these is a design bug, not a missing token.
 */
export const duration = {
  micro: 200, // hover, focus, colour shifts
  standard: 400, // state changes, layout, accordion panels
  entrance: 700, // scroll reveals
  cinematic: 1200, // hero, curtain, once-per-page moments
};

export const easing = {
  /** Entrances. Fast out of the gate, long settle — reads as weight. */
  entrance: [0.16, 1, 0.3, 1],
  /** State changes. Symmetrical and quiet. */
  state: [0.4, 0, 0.2, 1],
};

/** CSS-string forms of the above, for Tailwind and raw CSS. */
export const easingCss = {
  entrance: `cubic-bezier(${easing.entrance.join(", ")})`,
  state: `cubic-bezier(${easing.state.join(", ")})`,
};

export const stagger = {
  tight: 0.06, // 60ms — dense lists, nav items
  loose: 0.09, // 90ms — cards, large siblings
};

/** Reveal travel. Never more than 40px, or it reads as a slide rather than a rise. */
export const distance = {
  sm: 24,
  md: 32,
  lg: 40,
};

/* ------------------------------------------------------- shape and surface */

export const borderRadius = {
  none: "0",
  sm: "0.375rem",
  DEFAULT: "0.625rem",
  md: "0.875rem",
  lg: "1.25rem",
  xl: "1.75rem",
  "2xl": "2.25rem",
  full: "9999px",
};

export const boxShadow = {
  /* Ambient depth for cards on dark surfaces. */
  card: "0 1px 2px rgba(0,0,0,0.28), 0 12px 32px -8px rgba(0,0,0,0.45)",
  /* The lift state. Deeper, not just bigger. */
  lift: "0 2px 4px rgba(0,0,0,0.3), 0 28px 60px -12px rgba(0,0,0,0.6)",
  /* Gold bloom, for the primary CTA only. */
  gold: "0 8px 32px -8px rgba(212,175,55,0.45)",
  /* Glass panels. */
  glass: "0 8px 40px -12px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
};

/** Z-index ladder. Named so nothing ever needs a z-[9999] again. */
export const zIndex = {
  base: "0",
  raised: "10",
  sticky: "100",
  nav: "200",
  overlay: "300",
  modal: "400",
  cursor: "500",
  loader: "600",
};
