import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import {
  fadeUp,
  fadeUpSm,
  fadeIn,
  fadeSide,
  staggerContainer,
  inView,
} from "../../lib/motion";

const presets = {
  up: fadeUp,
  "up-sm": fadeUpSm,
  fade: fadeIn,
  left: fadeSide("left"),
  right: fadeSide("right"),
};

/**
 * Scroll reveal.
 *
 * This replaces the four separate copies of `AnimatedSection` that were pasted
 * into About, Contact, Package and Highlights — each with slightly different
 * margins and easing, which is why section entrances didn't feel like one system.
 *
 * Fires once. Never on re-entry: reveals that replay every time you scroll back
 * up are the fastest way to make a site feel like a template.
 */
export function Reveal({
  children,
  as: Comp = "div",
  preset = "up",
  delay = 0,
  className,
  ...props
}) {
  const MotionComp = motion[Comp] ?? motion.div;
  const variants = presets[preset] ?? fadeUp;

  return (
    <MotionComp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      variants={variants}
      transition={delay ? { delay } : undefined}
      {...props}
    >
      {children}
    </MotionComp>
  );
}

/**
 * Staggered group. Children must be <Reveal.Item> (or carry the same variants)
 * for the orchestration to reach them.
 *
 *   <Reveal.Group speed="loose">
 *     {items.map(i => <Reveal.Item key={i.id}>…</Reveal.Item>)}
 *   </Reveal.Group>
 */
function Group({ children, speed = "loose", delayChildren = 0, className, ...props }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      variants={staggerContainer(speed, delayChildren)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

function Item({ children, preset = "up", className, as: Comp = "div", ...props }) {
  const MotionComp = motion[Comp] ?? motion.div;
  return (
    <MotionComp
      className={className}
      variants={presets[preset] ?? fadeUp}
      {...props}
    >
      {children}
    </MotionComp>
  );
}

Reveal.Group = Group;
Reveal.Item = Item;

/**
 * Line-by-line mask reveal for display headings.
 *
 * Each line gets a clipping parent and a rising child, so the text is uncovered
 * rather than flown in. Pass an array of strings — one per visual line — because
 * where the lines break is a typographic decision, not something to leave to
 * whatever width the viewport happens to be.
 */
export function MaskedHeading({
  lines,
  as: Comp = "h1",
  className,
  lineClassName,
  delay = 0,
  ...props
}) {
  const prefersReducedMotion = usePrefersReducedMotion();

  /**
   * Reduced motion renders plain text with no clip and no transform.
   *
   * This is not just a preference nicety — it is the safety net. A mask reveal
   * hides its text until an animation finishes, so anything that stops the
   * animation running leaves the headline permanently invisible. That risk is
   * unacceptable on an <h1> which is also the LCP element, so the non-animated
   * path renders the real, readable text rather than a stalled transform.
   */
  if (prefersReducedMotion) {
    return (
      <Comp className={className} {...props}>
        {lines.map((line, index) => (
          <span key={index} className={cn("block", lineClassName)}>
            {line}
          </span>
        ))}
      </Comp>
    );
  }

  return (
    <Comp className={className} {...props}>
      {lines.map((line, index) => (
        <span key={index} className="block overflow-hidden">
          <motion.span
            className={cn("block", lineClassName)}
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            /* Kept short and near-immediate: this is the LCP text, so the
               reveal has to be finished well inside the 2.0s budget rather
               than consuming most of it. */
            transition={{
              duration: 0.85,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + index * 0.08,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Comp>
  );
}
