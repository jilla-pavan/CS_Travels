import { clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import { fontSize, duration, borderRadius, zIndex } from "./design-tokens";

/**
 * tailwind-merge, taught this project's scales.
 *
 * This configuration is load-bearing, not housekeeping. Out of the box
 * tailwind-merge only knows Tailwind's DEFAULT scales, so it read `text-body-sm`
 * — a custom font size — as a text COLOUR, decided it conflicted with
 * `text-ink-950`, and dropped the colour.
 *
 * The visible result was the primary button rendering inherited light-grey text
 * on gold at about 1.6:1 contrast: unreadable, and a WCAG failure on the single
 * most important control on the site. Silent, too — no error, correct-looking
 * source, wrong output.
 *
 * Every custom scale in design-tokens.js has to be declared here or the same
 * class of bug reappears wherever that scale meets a same-prefix utility.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: Object.keys(fontSize) }],
      "transition-duration": [{ duration: Object.keys(duration) }],
      rounded: [{ rounded: Object.keys(borderRadius) }],
      z: [{ z: Object.keys(zIndex) }],
      ease: [{ ease: ["entrance", "state"] }],
    },
  },
});

/**
 * Class name composer. clsx handles conditionals, tailwind-merge resolves
 * conflicts so a caller's `px-8` reliably beats a component's default `px-6`
 * instead of losing to source order.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/** Indian number formatting — 1,00,000 rather than 100,000. */
export const formatINR = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

/**
 * The booking funnel runs entirely through WhatsApp and the phone, so the number
 * lives here once. The old build had it inline in six places, two of which were
 * missing the +91 country code.
 */
export const WHATSAPP_NUMBER = "919347472307";
export const PHONE_DISPLAY = "+91 93474 72307";
export const PHONE_HREF = "tel:+919347472307";

export function whatsappLink(message) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
