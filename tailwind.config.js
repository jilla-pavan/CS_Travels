import {
  colors,
  fontSize,
  fontFamily,
  borderRadius,
  boxShadow,
  zIndex,
  easingCss,
  duration,
} from "./src/lib/design-tokens.js";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    /* Replacing rather than extending: the default palette is gone, so a stray
       `text-slate-400` fails loudly instead of quietly shipping an off-brand colour. */
    colors: {
      transparent: "transparent",
      current: "currentColor",
      inherit: "inherit",
      white: "#FFFFFF",
      black: "#000000",
      ink: colors.ink,
      gold: colors.gold,
      sand: colors.sand,
      fg: colors.fg,
      "fg-on": colors.fgOn,
      whatsapp: colors.whatsapp,
      danger: colors.danger,
      success: colors.success,
    },
    fontSize,
    borderRadius,
    boxShadow,
    zIndex,
    extend: {
      fontFamily,

      transitionTimingFunction: {
        entrance: easingCss.entrance,
        state: easingCss.state,
      },

      transitionDuration: {
        micro: `${duration.micro}ms`,
        standard: `${duration.standard}ms`,
        entrance: `${duration.entrance}ms`,
        cinematic: `${duration.cinematic}ms`,
      },

      /* Reveal travel distances, so `translate-y-reveal` matches the JS tokens. */
      spacing: {
        "reveal-sm": "24px",
        "reveal-md": "32px",
        "reveal-lg": "40px",
      },

      backgroundImage: {
        /* Layered depth for dark sections — two offset radial washes, no image cost. */
        "ink-mesh":
          "radial-gradient(ellipse 80% 60% at 20% 0%, rgba(26,66,112,0.35) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 85% 20%, rgba(212,175,55,0.08) 0%, transparent 55%)",
        /* Hairline divider that fades at both ends. */
        "gold-hairline":
          "linear-gradient(90deg, transparent, rgba(212,175,55,0.55), transparent)",
        /* Sweep for card borders on hover. */
        "gold-sweep":
          "linear-gradient(120deg, transparent 20%, rgba(212,175,55,0.7) 50%, transparent 80%)",
      },

      /**
       * Only two keyframe animations exist globally, and both are finite or
       * user-initiated. Infinite ambient loops are a deliberate non-goal — see
       * the marquee, which is paused for reduced-motion in index.css.
       */
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": `accordion-down ${duration.standard}ms ${easingCss.state}`,
        "accordion-up": `accordion-up ${duration.standard}ms ${easingCss.state}`,
      },
    },
  },
  plugins: [],
};
