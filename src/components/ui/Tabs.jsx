import { createContext, forwardRef, useContext, useId, useState } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { transition } from "../../lib/motion";

/**
 * Tabs, on Radix.
 *
 * The active pill slides between triggers via Framer's shared layout rather than
 * cross-fading. That requires exactly one element carrying the `layoutId` to be
 * mounted at a time, which Radix's `data-state` attribute can't express — CSS
 * can hide the inactive ones, but they'd all still be mounted and Framer would
 * have no single element to move.
 *
 * Hence the local context: it tracks the active value in React so only the
 * active trigger renders the indicator. `layoutId` is scoped with useId so two
 * Tabs on the same page don't animate into each other.
 */

const TabsContext = createContext({ value: null, layoutId: "tabs" });

export function Tabs({ value, defaultValue, onValueChange, children, ...props }) {
  const layoutId = useId();
  const [internal, setInternal] = useState(defaultValue);

  /* Controlled when `value` is supplied, uncontrolled otherwise — matching
     Radix's own contract so callers don't have to think about which this is. */
  const current = value ?? internal;

  const handleChange = (next) => {
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
  };

  return (
    <TabsContext.Provider value={{ value: current, layoutId }}>
      <TabsPrimitive.Root
        value={current}
        onValueChange={handleChange}
        {...props}
      >
        {children}
      </TabsPrimitive.Root>
    </TabsContext.Provider>
  );
}

export const TabsList = forwardRef(function TabsList({ className, ...props }, ref) {
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1 rounded-full p-1",
        "border border-white/10 bg-ink-900",
        className,
      )}
      {...props}
    />
  );
});

export const TabsTrigger = forwardRef(function TabsTrigger(
  { className, children, value, ...props },
  ref,
) {
  const { value: active, layoutId } = useContext(TabsContext);
  const isActive = active === value;

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      value={value}
      className={cn(
        "relative min-h-[2.75rem] rounded-full px-6",
        "text-caption uppercase tracking-[0.16em]",
        "transition-colors duration-micro ease-state",
        isActive ? "text-ink-950" : "text-fg-muted hover:text-fg-secondary",
        className,
      )}
      {...props}
    >
      {isActive && (
        <motion.span
          aria-hidden="true"
          layoutId={layoutId}
          className="absolute inset-0 rounded-full bg-gold-500"
          transition={transition.standard}
        />
      )}
      <span className="relative z-raised">{children}</span>
    </TabsPrimitive.Trigger>
  );
});

export const TabsContent = forwardRef(function TabsContent(
  { className, ...props },
  ref,
) {
  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cn("focus-visible:outline-none", className)}
      {...props}
    />
  );
});
