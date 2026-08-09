import { forwardRef, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { useHasFinePointer } from "../../hooks/usePrefersReducedMotion";
import { transition } from "../../lib/motion";

const buttonVariants = cva(
  /* Base. `group` so children can react to hover; `isolate` so the gold bloom
     never escapes the button's stacking context. */
  [
    "group relative isolate inline-flex items-center justify-center gap-2",
    "font-medium tracking-[0.12em] uppercase whitespace-nowrap",
    "transition-[background-color,border-color,color,box-shadow,transform]",
    "duration-micro ease-state",
    "disabled:pointer-events-none disabled:opacity-40",
    /* Focus ring comes from the global :focus-visible rule — not overridden here. */
  ],
  {
    variants: {
      variant: {
        /* The one gold fill on the site. Gold on ink reads 8.9:1; the dark text
           on gold is 8.9:1 the other way. Both pass AA comfortably. */
        primary: [
          "bg-gold-500 text-ink-950",
          "hover:bg-gold-400 hover:shadow-gold",
          "active:bg-gold-600",
        ],
        /* Outline. The default for anything secondary. */
        ghost: [
          "border border-white/12 text-fg bg-white/[0.02]",
          "hover:border-gold-500/40 hover:text-gold-300 hover:bg-white/[0.04]",
        ],
        /* Text-only, for tertiary actions and inline links. */
        link: [
          "text-gold-400 hover:text-gold-300 px-0 tracking-normal normal-case",
          "underline-offset-4 hover:underline",
        ],
        /* WhatsApp keeps its brand colour — recognition beats palette purity on
           the single highest-converting control on the site. */
        whatsapp: [
          "bg-whatsapp text-ink-950 hover:brightness-110",
          "hover:shadow-[0_8px_32px_-8px_rgba(37,211,102,0.5)]",
        ],
      },
      size: {
        /* 44px — the minimum touch target, and the floor for every size below. */
        sm: "h-11 px-5 text-[0.6875rem] rounded-full",
        /* 48px — the brief's input height, so buttons align with form fields. */
        md: "h-12 px-7 text-caption rounded-full",
        lg: "h-14 px-9 text-body-sm rounded-full",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

/**
 * Magnetic cursor attraction.
 *
 * Pointer devices only, and capped at 8px of travel — far enough to feel alive,
 * short enough that the button never escapes the cursor chasing it. Spring rather
 * than tween so releasing feels like it settles rather than snaps.
 *
 * Never applied on touch (there is no cursor to attract to) and never in reduced
 * motion — Framer's MotionConfig neutralises the transform there automatically.
 */
function useMagnetic(enabled, strength = 8) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 260, damping: 22, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 260, damping: 22, mass: 0.6 });

  const onMouseMove = (event) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);
    /* Normalise by half-size so the pull is proportional, then clamp. */
    x.set((offsetX / (rect.width / 2)) * strength);
    y.set((offsetY / (rect.height / 2)) * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, springX, springY, onMouseMove, onMouseLeave };
}

/** Three-dot loading indicator. Opacity-only, so it survives reduced motion. */
function LoadingDots() {
  return (
    <span className="inline-flex items-center gap-1" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1 w-1 rounded-full bg-current"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1.1,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </span>
  );
}

export const Button = forwardRef(function Button(
  {
    className,
    variant,
    size,
    magnetic = false,
    loading = false,
    disabled,
    asChild = false,
    children,
    ...props
  },
  forwardedRef,
) {
  const finePointer = useHasFinePointer();
  const magneticEnabled = magnetic && finePointer;
  const { ref, springX, springY, onMouseMove, onMouseLeave } =
    useMagnetic(magneticEnabled);

  const Comp = asChild ? Slot : "button";

  const content = (
    <>
      {/* Gradient border sweep. A masked conic pass that runs once per hover
          rather than looping — motion with a reason, not decoration. */}
      {variant === "ghost" && (
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 -z-10 rounded-full opacity-0",
            "bg-gold-sweep bg-[length:200%_100%] bg-[position:100%_0]",
            "transition-[opacity,background-position] duration-entrance ease-entrance",
            "group-hover:opacity-30 group-hover:bg-[position:0_0]",
          )}
        />
      )}

      {loading ? (
        <>
          <LoadingDots />
          {/* The label stays mounted but hidden, so the button doesn't resize
              mid-submit and shift everything below it. */}
          <span className="sr-only">Loading</span>
          <span className="invisible absolute">{children}</span>
        </>
      ) : (
        children
      )}
    </>
  );

  const classes = cn(buttonVariants({ variant, size }), className);

  /* asChild renders a link — no motion wrapper, since Slot forwards one child. */
  if (asChild) {
    return (
      <Comp ref={forwardedRef} className={classes} {...props}>
        {children}
      </Comp>
    );
  }

  return (
    <motion.button
      ref={(node) => {
        ref.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      }}
      className={classes}
      style={magneticEnabled ? { x: springX, y: springY } : undefined}
      onMouseMove={magneticEnabled ? onMouseMove : undefined}
      onMouseLeave={magneticEnabled ? onMouseLeave : undefined}
      whileHover={{ y: magneticEnabled ? undefined : -2 }}
      whileTap={{ scale: 0.97 }}
      transition={transition.micro}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {content}
    </motion.button>
  );
});

export { buttonVariants };
