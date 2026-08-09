import { forwardRef, useId } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

/**
 * Select, on Radix.
 *
 * A native <select> can't be styled to match this design, and the usual
 * div-based replacement drops keyboard support entirely. Radix keeps typeahead,
 * arrow navigation, Home/End, Escape, and the correct listbox roles — all of
 * which the booking form needs, since vehicle and destination are required
 * fields and must be reachable without a mouse.
 */

export const SelectRoot = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;

export const SelectTrigger = forwardRef(function SelectTrigger(
  { className, children, error, ...props },
  ref,
) {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex h-14 w-full items-center justify-between gap-2 rounded-md px-4",
        "bg-white/[0.03] text-body text-fg",
        "border transition-colors duration-micro ease-state",
        error
          ? "border-danger-400/60"
          : "border-white/12 hover:border-white/20 data-[state=open]:border-gold-500",
        "focus:outline-none focus:ring-2 focus:ring-gold-500/35",
        "data-[placeholder]:text-fg-muted",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown
          size={18}
          aria-hidden="true"
          className="shrink-0 text-fg-muted transition-transform duration-micro ease-state data-[state=open]:rotate-180"
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
});

export const SelectContent = forwardRef(function SelectContent(
  { className, children, position = "popper", ...props },
  ref,
) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        position={position}
        sideOffset={6}
        className={cn(
          "z-modal max-h-72 min-w-[var(--radix-select-trigger-width)] overflow-hidden",
          "rounded-md border border-white/10 bg-ink-800 shadow-card",
          "transition-opacity duration-micro ease-state",
          className,
        )}
        {...props}
      >
        <SelectPrimitive.Viewport className="p-1.5">
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
});

export const SelectItem = forwardRef(function SelectItem(
  { className, children, ...props },
  ref,
) {
  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex min-h-[2.75rem] cursor-pointer select-none items-center",
        "rounded-sm py-2 pl-3 pr-9 text-body-sm text-fg-secondary",
        "outline-none transition-colors duration-micro ease-state",
        "data-[highlighted]:bg-white/[0.06] data-[highlighted]:text-fg",
        "data-[state=checked]:text-gold-300",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute right-3">
        <Check size={16} aria-hidden="true" className="text-gold-500" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
});

/**
 * Labelled wrapper matching the Input field's visual rhythm.
 *
 * The label sits above rather than floating: a select always has a value or a
 * placeholder, so there is no empty state for a label to float out of.
 */
export function Select({
  label,
  error,
  placeholder = "Select…",
  options = [],
  value,
  onValueChange,
  id: idProp,
  className,
  ...props
}) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const errorId = `${id}-error`;

  return (
    <div className={cn("w-full", className)}>
      {/*
        The label sits INSIDE the control, at the same offset and scale as
        Input's floated state.

        It was previously stacked above the field, which meant a form mixing
        Inputs and Selects — exactly what the booking card is — had two
        different label positions in adjacent columns and read as broken. A
        select has no empty state for a label to float out of, so this is
        pinned to the floated position permanently rather than animated.
      */}
      <div className="relative">
        <SelectRoot value={value} onValueChange={onValueChange} {...props}>
          <SelectTrigger
            id={id}
            error={error}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={error ? errorId : undefined}
            aria-label={label}
            className="pb-2 pt-6"
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>

          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>

        {label && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-4 origin-left -translate-y-2.5 scale-[0.78] text-body text-fg-muted"
          >
            {label}
          </span>
        )}
      </div>

      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-caption text-danger-300">
          {error}
        </p>
      )}
    </div>
  );
}
