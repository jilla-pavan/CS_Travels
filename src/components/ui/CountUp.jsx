import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { easing } from "../../lib/design-tokens";

/* The entrance curve, evaluated manually — this animates a number, not a
   transform, so it can't go through Framer or the CSS transition system. */
function cubicBezier(p1x, p1y, p2x, p2y) {
  return (t) => {
    const cx = 3 * p1x;
    const bx = 3 * (p2x - p1x) - cx;
    const ax = 1 - cx - bx;
    const cy = 3 * p1y;
    const by = 3 * (p2y - p1y) - cy;
    const ay = 1 - cy - by;

    /* Newton-Raphson to invert x(t), then evaluate y. */
    let x = t;
    for (let i = 0; i < 5; i += 1) {
      const dx = (3 * ax * x + 2 * bx) * x + cx;
      if (Math.abs(dx) < 1e-6) break;
      const fx = ((ax * x + bx) * x + cx) * x - t;
      x -= fx / dx;
    }
    return ((ay * x + by) * x + cy) * x;
  };
}

const ease = cubicBezier(...easing.entrance);

/**
 * Counts to a number when it scrolls into view.
 *
 * Reduced motion renders the final value immediately — a number ticking upward
 * is exactly the kind of peripheral movement the preference exists to stop, and
 * an unreadable mid-count figure is worse than useless to someone who needs it.
 *
 * The rendered element carries the final value in aria-label so assistive tech
 * announces "500 happy travellers", not whatever frame it caught.
 */
export function CountUp({
  to,
  from = 0,
  duration = 1800,
  suffix = "",
  prefix = "",
  decimals = 0,
  className,
  ...props
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = usePrefersReducedMotion();
  const [value, setValue] = useState(from);

  useEffect(() => {
    /* Reduced motion doesn't run the loop at all — the final value is derived
       below rather than pushed through state, so there's no frame where the
       number is mid-count. */
    if (!inView || prefersReducedMotion) return undefined;

    let frame;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(from + (to - from) * ease(progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, from, duration, prefersReducedMotion]);

  const display = (prefersReducedMotion ? to : value).toFixed(decimals);
  const final = `${prefix}${to.toFixed(decimals)}${suffix}`;

  return (
    <span
      ref={ref}
      className={className}
      role="text"
      aria-label={final}
      {...props}
    >
      {/* tabular-nums (set globally on body) keeps the digits from jittering
          the layout as they change width mid-count. */}
      <span aria-hidden="true">
        {prefix}
        {display}
        {suffix}
      </span>
    </span>
  );
}
