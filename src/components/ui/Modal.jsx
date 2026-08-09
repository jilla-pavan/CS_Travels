import { forwardRef } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

/**
 * Modal, on Radix Dialog.
 *
 * Radix supplies the focus trap, focus restore on close, Escape handling,
 * `aria-modal`, and inert-ing the rest of the page. Hand-rolling those is where
 * most custom modals quietly break for keyboard and screen reader users — the
 * old mobile menu in this codebase had none of them.
 */

export const Modal = DialogPrimitive.Root;
export const ModalTrigger = DialogPrimitive.Trigger;
export const ModalClose = DialogPrimitive.Close;

export const ModalOverlay = forwardRef(function ModalOverlay(
  { className, ...props },
  ref,
) {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
        "fixed inset-0 z-overlay bg-ink-950/80 backdrop-blur-sm",
        /* Opacity-only, so it needs no exception under reduced motion. */
        "transition-opacity duration-standard ease-state",
        "data-[state=open]:opacity-100 data-[state=closed]:opacity-0",
        className,
      )}
      {...props}
    />
  );
});

export const ModalContent = forwardRef(function ModalContent(
  { className, children, title, description, hideClose = false, ...props },
  ref,
) {
  return (
    <DialogPrimitive.Portal>
      <ModalOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed left-1/2 top-1/2 z-modal w-[calc(100vw-2rem)] max-w-lg",
          "-translate-x-1/2 -translate-y-1/2",
          "glass rounded-xl p-7 shadow-glass",
          "focus:outline-none",
          className,
        )}
        {...props}
      >
        {/* Radix requires an accessible title. When the design doesn't call for
            a visible one, it still ships to assistive tech via sr-only rather
            than being omitted — an untitled dialog is announced as nothing. */}
        {title ? (
          <DialogPrimitive.Title className="text-h3 text-fg">
            {title}
          </DialogPrimitive.Title>
        ) : (
          <DialogPrimitive.Title className="sr-only">Dialog</DialogPrimitive.Title>
        )}

        {description && (
          <DialogPrimitive.Description className="mt-2 text-body-sm text-fg-muted">
            {description}
          </DialogPrimitive.Description>
        )}

        {children}

        {!hideClose && (
          <DialogPrimitive.Close
            className={cn(
              "absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full",
              "text-fg-muted transition-colors duration-micro ease-state",
              "hover:bg-white/5 hover:text-fg",
            )}
          >
            <X size={20} aria-hidden="true" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
});
