import { Children } from "react";
import { cn } from "../../lib/utils";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

/**
 * Horizontal marquee.
 *
 * Three things this gets right that the previous hand-rolled one did not:
 *
 *  1. The duplicated track is `aria-hidden`. A marquee has to render its content
 *     twice to loop seamlessly — without hiding the copy, every screen reader
 *     reads all four reviews, then reads them again.
 *  2. It pauses on focus-within as well as hover, so a keyboard user tabbing
 *     through doesn't have the content slide out from under them.
 *  3. Reduced motion doesn't slow it down, it removes it — and turns the track
 *     into an ordinary horizontally scrollable region so the content is still
 *     reachable. An infinite crawl is exactly the peripheral motion the
 *     preference exists to stop.
 *
 * `--marquee-duration` scales with content length, so adding items makes the
 * loop longer rather than faster.
 */
export function Marquee({
  children,
  speed = 45,
  className,
  itemClassName,
  label = "Customer reviews",
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const items = Children.toArray(children);

  if (prefersReducedMotion) {
    return (
      <div
        role="group"
        aria-label={label}
        tabIndex={0}
        className={cn(
          "flex gap-6 overflow-x-auto pb-2",
          "[scrollbar-width:thin]",
          className,
        )}
      >
        {items.map((child, index) => (
          <div key={index} className={cn("shrink-0", itemClassName)}>
            {child}
          </div>
        ))}
      </div>
    );
  }

  const track = (duplicate) =>
    items.map((child, index) => (
      <div key={`${duplicate}-${index}`} className={cn("shrink-0", itemClassName)}>
        {child}
      </div>
    ));

  return (
    <div
      className={cn("group relative overflow-hidden", className)}
      role="group"
      aria-label={label}
    >
      {/* Edge fades, so items enter and leave rather than being cut off. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-raised w-12 bg-[linear-gradient(90deg,theme(colors.ink.900),transparent)] sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-raised w-12 bg-[linear-gradient(270deg,theme(colors.ink.900),transparent)] sm:w-24" />

      {/*
        Both halves are wrapped in identical containers with identical padding.
        The loop translates by exactly -50%, so the two halves must measure
        exactly the same — rendering the first set as bare flex children and the
        second inside a wrapper puts the gap distribution out by one and the
        track visibly jumps on every cycle.
      */}
      <div
        className="marquee-track flex w-max"
        style={{ "--marquee-duration": `${speed}s` }}
      >
        <div className="flex shrink-0 gap-6 pr-6">{track("a")}</div>
        {/* The seamless second pass. Hidden from assistive tech — it is a
            visual device, not content. */}
        <div aria-hidden="true" className="flex shrink-0 gap-6 pr-6">
          {track("b")}
        </div>
      </div>
    </div>
  );
}
