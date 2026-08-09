import { forwardRef } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "../../lib/utils";

/**
 * Tooltip, on Radix.
 *
 * Radix opens it on focus as well as hover, which is the whole reason to use a
 * primitive here — a hover-only tooltip is invisible to keyboard users and to
 * anyone on a touch screen.
 *
 * Rule for this site: tooltips carry supplementary detail only. Anything a user
 * needs in order to complete a booking goes in visible text.
 */

export const TooltipProvider = TooltipPrimitive.Provider;
export const TooltipRoot = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export const TooltipContent = forwardRef(function TooltipContent(
  { className, sideOffset = 8, ...props },
  ref,
) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          "z-overlay max-w-xs rounded-md px-3 py-2",
          "bg-ink-800 border border-white/10 shadow-card",
          "text-caption text-fg-secondary",
          "transition-opacity duration-micro ease-state",
          "data-[state=delayed-open]:opacity-100 data-[state=closed]:opacity-0",
          className,
        )}
        {...props}
      />
    </TooltipPrimitive.Portal>
  );
});

/** Convenience wrapper for the common single-trigger case. */
export function Tooltip({ children, content, side = "top", ...props }) {
  return (
    <TooltipRoot delayDuration={200} {...props}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side}>{content}</TooltipContent>
    </TooltipRoot>
  );
}
