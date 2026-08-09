import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1.5 whitespace-nowrap",
    "text-overline uppercase font-medium",
    "transition-colors duration-micro ease-state",
  ],
  {
    variants: {
      variant: {
        /* Gold on ink: 8.9:1. The default. */
        gold: "border border-gold-500/30 bg-gold-500/[0.07] text-gold-300",
        /* Neutral, for non-promotional metadata. */
        muted: "border border-white/10 bg-white/[0.03] text-fg-muted",
        /* Solid, for the one "Best Seller" style flag per card. */
        solid: "bg-gold-500 text-ink-950",
        /* On top of photography — needs its own backdrop to stay legible. */
        glass: "glass text-fg",
      },
      size: {
        sm: "px-2.5 py-1 text-[0.625rem] tracking-[0.2em] rounded-full",
        md: "px-3.5 py-1.5 tracking-[0.24em] rounded-full",
      },
    },
    defaultVariants: { variant: "gold", size: "md" },
  },
);

export function Badge({ className, variant, size, ...props }) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

/**
 * The section eyebrow — gold, letterspaced, sits above every section heading.
 * Rendered as <p> not a heading, so it never pollutes the document outline.
 * (The old build used <h2> and <h3> for styling, which broke heading order.)
 */
export function Eyebrow({ className, children, ...props }) {
  return (
    <p
      className={cn(
        "text-overline uppercase text-gold-400",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
