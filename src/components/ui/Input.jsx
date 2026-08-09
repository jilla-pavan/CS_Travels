import { forwardRef, useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { cn } from "../../lib/utils";
import { transition } from "../../lib/motion";

/**
 * Text input with a floating label.
 *
 * The label is a real <label> tied by id — it is not placeholder text. Placeholder
 * labels vanish the moment someone starts typing, which is precisely when a user
 * filling a form on a phone most needs to check what the field was.
 *
 * The float is driven by `peer-placeholder-shown` in CSS rather than React state,
 * so it survives autofill (which doesn't fire onChange in several browsers).
 * That requires a placeholder of " " on the input — hence the default below.
 */
export const Input = forwardRef(function Input(
  { className, label, type = "text", error, hint, id: idProp, ...props },
  ref,
) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  const describedBy = [error && errorId, hint && hintId].filter(Boolean).join(" ");

  return (
    <div className="w-full">
      <div className="relative">
        <input
          ref={ref}
          id={id}
          type={type}
          placeholder=" "
          aria-invalid={error ? "true" : undefined}
          aria-describedby={describedBy || undefined}
          className={cn(
            "peer w-full rounded-md bg-white/[0.03] px-4 pb-2 pt-6",
            /* 48px+ per the brief; this lands at 56px which is comfortable on
               a phone without looking oversized on desktop. */
            "h-14 text-body text-fg",
            "border transition-colors duration-micro ease-state",
            error
              ? "border-danger-400/60"
              : "border-white/12 hover:border-white/20 focus:border-gold-500",
            /* The global :focus-visible ring would sit outside the field and
               fight the border; this control draws its own inset gold ring. */
            "focus:outline-none focus:ring-2 focus:ring-gold-500/35",
            "placeholder:text-transparent",
            className,
          )}
          {...props}
        />

        <label
          htmlFor={id}
          className={cn(
            "pointer-events-none absolute left-4 top-4 origin-left",
            "text-body text-fg-muted",
            "transition-[transform,color] duration-micro ease-state",
            /* Resting position when empty, floated when filled or focused. */
            "peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100",
            "-translate-y-2.5 scale-[0.78]",
            "peer-focus:-translate-y-2.5 peer-focus:scale-[0.78] peer-focus:text-gold-400",
            error && "text-danger-300",
          )}
        >
          {label}
        </label>
      </div>

      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-caption text-fg-muted">
          {hint}
        </p>
      )}

      {/* Errors enter with a short rise, not a shake. Shake reads as punishment;
          this is a form, not a failed password prompt. */}
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            id={errorId}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={transition.micro}
            className="mt-1.5 flex items-center gap-1.5 text-caption text-danger-300"
          >
            <AlertCircle size={13} aria-hidden="true" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
});

/** Multi-line variant. Same label mechanics, no fixed height. */
export const Textarea = forwardRef(function Textarea(
  { className, label, error, rows = 4, id: idProp, ...props },
  ref,
) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const errorId = `${id}-error`;

  return (
    <div className="w-full">
      <div className="relative">
        <textarea
          ref={ref}
          id={id}
          rows={rows}
          placeholder=" "
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "peer w-full resize-y rounded-md bg-white/[0.03] px-4 pb-3 pt-7",
            "text-body text-fg",
            "border transition-colors duration-micro ease-state",
            error
              ? "border-danger-400/60"
              : "border-white/12 hover:border-white/20 focus:border-gold-500",
            "focus:outline-none focus:ring-2 focus:ring-gold-500/35",
            "placeholder:text-transparent",
            className,
          )}
          {...props}
        />
        <label
          htmlFor={id}
          className={cn(
            "pointer-events-none absolute left-4 top-4 origin-left",
            "text-body text-fg-muted",
            "transition-[transform,color] duration-micro ease-state",
            "peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100",
            "-translate-y-2.5 scale-[0.78]",
            "peer-focus:-translate-y-2.5 peer-focus:scale-[0.78] peer-focus:text-gold-400",
          )}
        >
          {label}
        </label>
      </div>

      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            id={errorId}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={transition.micro}
            className="mt-1.5 flex items-center gap-1.5 text-caption text-danger-300"
          >
            <AlertCircle size={13} aria-hidden="true" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
});
