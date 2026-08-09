import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { transition } from "../../lib/motion";

const cardVariants = cva(
  [
    "group relative isolate overflow-hidden",
    "transition-[border-color,box-shadow] duration-standard ease-state",
  ],
  {
    variants: {
      variant: {
        /* Default surface. Sits a step above the page floor so cards read as
           objects on a ground rather than holes cut into it. */
        solid: "bg-ink-900 border border-white/[0.08] shadow-card",
        /* Glass. Rationed — booking card, floating badges, nav. Degrades to a
           flat tint under 768px, see the .glass rule in index.css. */
        glass: "glass shadow-glass",
        /* Frameless, for image-led cards that supply their own surface. */
        bare: "bg-transparent",
      },
      radius: {
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
      },
      interactive: {
        true: "hover:border-gold-500/30 hover:shadow-lift cursor-pointer",
        false: "",
      },
    },
    defaultVariants: { variant: "solid", radius: "xl", interactive: false },
  },
);

/**
 * The card primitive.
 *
 * `interactive` adds the lift + shadow bloom + border warm. The gradient border
 * sweep is a separate opt-in because it's expensive-looking and loses its effect
 * if every card on the page does it.
 */
export const Card = forwardRef(function Card(
  {
    className,
    variant,
    radius,
    interactive = false,
    sweep = false,
    lift = false,
    children,
    ...props
  },
  ref,
) {
  const Comp = lift ? motion.div : "div";

  const motionProps = lift
    ? {
        initial: "rest",
        whileHover: "hover",
        variants: { rest: { y: 0 }, hover: { y: -6 } },
        transition: transition.standard,
      }
    : {};

  return (
    <Comp
      ref={ref}
      className={cn(cardVariants({ variant, radius, interactive }), className)}
      {...motionProps}
      {...props}
    >
      {/* Border sweep: a gold gradient that travels across the card's edge once
          on hover, masked to a 1px ring so it lights the border only.
          Implemented as `.border-sweep` in index.css — see the comment there
          for why this cannot be expressed with Tailwind arbitrary values. */}
      {sweep && <span aria-hidden="true" className="border-sweep" />}
      {children}
    </Comp>
  );
});

/**
 * Image slot with the overflow mask and slow zoom.
 * 1.0 → 1.05 over 700ms. Deliberately slower than feels natural.
 */
export function CardImage({ className, children, ...props }) {
  return (
    <div className={cn("relative overflow-hidden", className)} {...props}>
      <div className="h-full w-full transition-transform duration-entrance ease-entrance motion-safe:group-hover:scale-105">
        {children}
      </div>
    </div>
  );
}

export function CardBody({ className, ...props }) {
  return <div className={cn("p-6 sm:p-7", className)} {...props} />;
}

export function CardTitle({ className, as: Comp = "h3", ...props }) {
  return <Comp className={cn("text-h4 text-fg", className)} {...props} />;
}

export function CardMeta({ className, ...props }) {
  return (
    <p
      className={cn("text-overline uppercase text-fg-muted", className)}
      {...props}
    />
  );
}
