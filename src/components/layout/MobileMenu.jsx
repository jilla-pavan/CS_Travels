import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { X, Phone, MessageCircle, ArrowUpRight } from "lucide-react";
import { cn, PHONE_DISPLAY, PHONE_HREF, whatsappLink } from "../../lib/utils";
import { tourPackages } from "../../data/tourPackages";
import { stagger } from "../../lib/design-tokens";
import { easing } from "../../lib/design-tokens";

/**
 * Full-screen mobile menu.
 *
 * Radix Dialog underneath, which is the point: the previous implementation was a
 * hand-rolled drawer with no focus trap, no focus restore, no `aria-expanded`,
 * and `document.body.style.overflow = "auto"` on cleanup (clobbering whatever
 * the page had before rather than restoring it). All of that is handled here.
 *
 * Items stagger in at 60ms — the tight step from the motion tokens, since this
 * is a dense list rather than a set of cards.
 */
export function MobileMenu({ open, onOpenChange, links }) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-overlay bg-ink-950/60 backdrop-blur-sm lg:hidden" />

        <DialogPrimitive.Content
          className={cn(
            "fixed inset-0 z-modal flex flex-col lg:hidden",
            "bg-ink-950 focus:outline-none",
          )}
        >
          <DialogPrimitive.Title className="sr-only">Menu</DialogPrimitive.Title>

          {/* Ambient wash so the panel isn't a flat black rectangle. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ink-mesh" />

          <div className="relative flex items-center justify-between px-5 py-5">
            <span className="text-body-sm font-medium tracking-[0.2em] text-fg">
              CS TRAVELS
            </span>

            <DialogPrimitive.Close
              className="grid h-11 w-11 place-items-center rounded-full text-fg transition-colors duration-micro ease-state hover:bg-white/5"
              aria-label="Close menu"
            >
              <X size={22} aria-hidden="true" />
            </DialogPrimitive.Close>
          </div>

          <nav className="relative flex-1 overflow-y-auto px-5 pb-6">
            <ul>
              {links.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * stagger.tight,
                    ease: easing.entrance,
                  }}
                >
                  <DialogPrimitive.Close asChild>
                    <a
                      href={link.href}
                      className="flex min-h-[3.5rem] items-center justify-between border-b border-white/[0.07] py-4 text-h4 text-fg-secondary transition-colors duration-micro ease-state active:text-gold-300"
                    >
                      {link.label}
                      <ArrowUpRight size={18} className="text-gold-500" aria-hidden="true" />
                    </a>
                  </DialogPrimitive.Close>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: links.length * stagger.tight,
                ease: easing.entrance,
              }}
              className="mt-8"
            >
              <p className="text-overline uppercase text-fg-muted">Packages</p>

              <ul className="mt-4 space-y-3">
                {tourPackages.map((pkg) => (
                  <li key={pkg.slug}>
                    <DialogPrimitive.Close asChild>
                      <a
                        href={`/packages/${pkg.slug}`}
                        className="flex items-baseline justify-between gap-4 py-1"
                      >
                        <span className="text-body text-fg-secondary">{pkg.title}</span>
                        <span className="shrink-0 text-body-sm text-gold-400">
                          {pkg.price}
                        </span>
                      </a>
                    </DialogPrimitive.Close>
                  </li>
                ))}
              </ul>
            </motion.div>
          </nav>

          {/* Actions pinned to the bottom of the sheet, inside the safe area on
              notched devices. */}
          <div className="relative border-t border-white/[0.07] bg-ink-950/90 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4">
            <div className="grid grid-cols-2 gap-3">
              <a
                href={PHONE_HREF}
                className="flex min-h-[3rem] items-center justify-center gap-2 rounded-full bg-gold-500 text-caption font-medium uppercase tracking-[0.14em] text-ink-950"
              >
                <Phone size={16} aria-hidden="true" />
                Call
              </a>
              <a
                href={whatsappLink("Hi CS Travels, I'd like to enquire about a trip.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[3rem] items-center justify-center gap-2 rounded-full bg-whatsapp text-caption font-medium uppercase tracking-[0.14em] text-ink-950"
              >
                <MessageCircle size={16} aria-hidden="true" />
                WhatsApp
              </a>
            </div>
            <p className="mt-3 text-center text-caption text-fg-muted">{PHONE_DISPLAY}</p>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
