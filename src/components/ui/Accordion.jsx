import { forwardRef } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { cn } from "../../lib/utils";

/**
 * Accordion, on Radix.
 *
 * Radix is doing the work that's tedious to get right by hand: roving focus,
 * arrow-key navigation, correct aria-expanded/aria-controls wiring, and the
 * CSS variable that makes height animation possible without measuring in JS.
 *
 * Height IS animated here, which contradicts the transform-only rule elsewhere.
 * It's a deliberate exception: an accordion that doesn't change height isn't an
 * accordion. The cost is contained because panels sit at the end of the document
 * flow in the FAQ, so the reflow is cheap and touches nothing above it.
 */

export const Accordion = AccordionPrimitive.Root;

export const AccordionItem = forwardRef(function AccordionItem(
  { className, ...props },
  ref,
) {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn(
        "border-b border-white/[0.09] transition-colors duration-micro ease-state",
        "data-[state=open]:border-gold-500/25",
        className,
      )}
      {...props}
    />
  );
});

export const AccordionTrigger = forwardRef(function AccordionTrigger(
  { className, children, ...props },
  ref,
) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "group flex flex-1 items-center justify-between gap-6",
          /* 44px minimum target even at the smallest text size. */
          "min-h-[3.5rem] py-5 text-left",
          "text-body-lg text-fg",
          "transition-colors duration-micro ease-state hover:text-gold-300",
          "data-[state=open]:text-gold-300",
          className,
        )}
        {...props}
      >
        {children}
        {/* Plus rotates to a cross. One icon, one transform — cheaper and
            calmer than swapping two icons with a crossfade. */}
        <Plus
          size={20}
          aria-hidden="true"
          className={cn(
            "shrink-0 text-gold-500",
            "transition-transform duration-standard ease-state",
            "group-data-[state=open]:rotate-45",
          )}
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});

export const AccordionContent = forwardRef(function AccordionContent(
  { className, children, ...props },
  ref,
) {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn(
        "overflow-hidden",
        "data-[state=open]:animate-accordion-down",
        "data-[state=closed]:animate-accordion-up",
      )}
      {...props}
    >
      <div className={cn("pb-6 pr-10 text-body text-fg-secondary", className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
});
