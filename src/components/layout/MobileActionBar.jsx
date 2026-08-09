import { Phone, MessageCircle } from "lucide-react";
import { PHONE_HREF, whatsappLink } from "../../lib/utils";

/**
 * Persistent call / WhatsApp bar, mobile only.
 *
 * Replaces the previous FloatActions, which ran `animate-pulse` on two fixed
 * buttons and `animate-bounce` on a third — three infinite loops in the user's
 * peripheral vision for the entire session. That violates the brief's own
 * non-negotiable ("nothing loops infinitely in the user's peripheral vision")
 * and is a genuine problem for anyone with vestibular sensitivity.
 *
 * A static, always-present bar converts at least as well and costs nothing to
 * look at. It is also a larger, more reliable touch target than a 56px circle
 * floating over content.
 *
 * The spacer is not optional: without it the bar covers the last ~68px of every
 * page, which on this site is the footer's contact row.
 */
export function MobileActionBar() {
  return (
    <>
      <div aria-hidden="true" className="h-[4.5rem] lg:hidden" />

      <div className="fixed inset-x-0 bottom-0 z-sticky border-t border-white/[0.07] bg-ink-950/95 backdrop-blur-lg lg:hidden">
        <div className="grid grid-cols-2 gap-3 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
          <a
            href={PHONE_HREF}
            className="flex min-h-[3rem] items-center justify-center gap-2 rounded-full bg-gold-500 text-caption font-medium uppercase tracking-[0.14em] text-ink-950 transition-colors duration-micro ease-state active:bg-gold-600"
          >
            <Phone size={17} aria-hidden="true" />
            Call now
          </a>

          <a
            href={whatsappLink("Hi CS Travels, I'd like to enquire about a trip.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[3rem] items-center justify-center gap-2 rounded-full bg-whatsapp text-caption font-medium uppercase tracking-[0.14em] text-ink-950 transition-[filter] duration-micro ease-state active:brightness-95"
          >
            <MessageCircle size={17} aria-hidden="true" />
            WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
