import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";
import { destinations } from "../../data/destinations";
import { cn, whatsappLink } from "../../lib/utils";
import { transition } from "../../lib/motion";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

/**
 * Vehicle classes. "4+1" and "6+1" are the categories the real fare table is
 * built around (destinations carry `fare4` / `fare6`), so this is real data.
 * Actual fleet models live in data/fleet.js.
 */
const VEHICLES = [
  { value: "4+1", label: "Sedan · 4 seater", fareKey: "fare4" },
  { value: "6+1", label: "SUV · 6 seater", fareKey: "fare6" },
];

const bookingSchema = z.object({
  pickup: z.string().trim().min(2, "Tell us where to pick you up"),
  destination: z.string().min(1, "Choose where you're heading"),
  date: z.string().min(1, "Pick a travel date"),
  vehicle: z.string().min(1, "Choose a vehicle"),
});

function todayISO() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now - offset).toISOString().slice(0, 10);
}

/** Checkmark that draws itself. pathLength animates strokeDasharray, which
    Framer's reducedMotion does NOT strip — so it's guarded by hand. */
function SuccessCheck() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const draw = prefersReducedMotion
    ? { initial: { pathLength: 1 }, animate: { pathLength: 1 } }
    : { initial: { pathLength: 0 }, animate: { pathLength: 1 } };

  return (
    <svg viewBox="0 0 52 52" className="h-11 w-11" aria-hidden="true">
      <motion.circle
        cx="26" cy="26" r="24" fill="none" stroke="currentColor" strokeWidth="2"
        className="text-success-400/40" {...draw}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.path
        d="M15 27 L23 34 L38 18" fill="none" stroke="currentColor" strokeWidth="3"
        strokeLinecap="round" strokeLinejoin="round"
        className="text-success-300" {...draw}
        transition={{ duration: 0.4, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}

/**
 * Booking bar.
 *
 * Replaces the tall glass card that used to float over the hero photograph.
 *
 * Two things changed and both were failures, not preferences:
 *
 * 1. GLASS IS GONE. `backdrop-filter` blurs whatever is behind it — over a
 *    bright golden temple image that produced a solid gold slab with unreadable
 *    labels. Glass only works over dark or low-contrast backdrops. This is an
 *    opaque ink surface, so its contrast is a property of the component rather
 *    than a gamble on the photo behind it.
 *
 * 2. IT IS HORIZONTAL AND ANCHORED. A tall card sat directly on the image's
 *    focal point. A base-anchored bar is what every serious travel brand uses:
 *    it reads as a tool, obscures nothing, and leaves the photograph whole.
 */
/**
 * True at lg and up. Read during initialisation so the first render is already
 * correct — otherwise the bar renders collapsed then snaps open on desktop.
 */
function useIsDesktop() {
  const QUERY = "(min-width: 1024px)";
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window === "undefined" ? true : window.matchMedia(QUERY).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    const onChange = (event) => setIsDesktop(event.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isDesktop;
}

export function BookingBar({ className }) {
  const [sent, setSent] = useState(false);
  const isDesktop = useIsDesktop();

  /**
   * Collapsed on mobile by default.
   *
   * Expanded, this form is ~360px tall — on a 844px phone that pushed the hero
   * past the viewport, cut the fields mid-way, and stacked against the
   * persistent Call/WhatsApp bar. Four form fields are also the wrong ask on a
   * phone when tapping "call" is already one thumb away.
   *
   * So mobile gets one target that opens the form, and desktop keeps the inline
   * bar where the horizontal layout costs nothing.
   */
  const [open, setOpen] = useState(false);
  const expanded = isDesktop || open;

  const {
    register, handleSubmit, control, watch, reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    mode: "onTouched",
    defaultValues: { pickup: "Tirupati", destination: "", date: "", vehicle: "4+1" },
  });

  const destination = watch("destination");
  const vehicle = watch("vehicle");

  const selected = destinations.find((d) => d.name === destination);
  const fareKey = VEHICLES.find((v) => v.value === vehicle)?.fareKey;
  const quotedFare = selected && fareKey ? selected[fareKey] : null;

  const onSubmit = (values) => {
    const lines = [
      "Hi CS Travels, I'd like to book a trip.",
      "",
      `Pickup: ${values.pickup}`,
      `Destination: ${values.destination}`,
      `Date: ${values.date}`,
      `Vehicle: ${values.vehicle} seater`,
    ];
    if (quotedFare) lines.push(`Listed fare: ${quotedFare}`);
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <div
      className={cn(
        "rounded-xl border border-white/[0.10] bg-ink-900/95 shadow-lift",
        /* A single hairline of gold along the top edge — the accent doing
           structural work, marking this as the page's primary instrument. */
        "relative overflow-hidden",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gold-hairline"
      />

      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition.standard}
            className="flex flex-col items-center gap-4 px-6 py-8 text-center sm:flex-row sm:justify-between sm:text-left"
          >
            <div className="flex items-center gap-4">
              <SuccessCheck />
              <div>
                <p className="text-h4 text-fg">WhatsApp opened</p>
                <p className="mt-1 text-body-sm text-fg-muted">
                  Send the message and we&apos;ll confirm, usually within minutes.
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="md"
              onClick={() => { setSent(false); reset(); }}
            >
              New enquiry
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            initial={false}
            exit={{ opacity: 0 }}
            noValidate
            aria-label="Quick booking enquiry"
            className="p-4 sm:p-5"
          >
            {/* Mobile trigger. Hidden entirely at lg, where the bar is inline. */}
            {!isDesktop && !open && (
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-expanded={false}
                className="flex min-h-[3.25rem] w-full items-center justify-between gap-3 rounded-lg border border-white/12 px-5 text-left"
              >
                <span>
                  <span className="block text-body-sm font-medium text-fg">
                    Check fares &amp; availability
                  </span>
                  <span className="mt-0.5 block text-caption text-fg-muted">
                    Fixed price before you travel
                  </span>
                </span>
                <ArrowRight size={17} aria-hidden="true" className="shrink-0 text-gold-400" />
              </button>
            )}

            {/*
              Four fields plus the action on one row at lg. Below that they
              stack two-up, then one-up — the fields stay full height and
              tappable at every step rather than shrinking to fit.
            */}
            <div
              className={cn(
                "grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.1fr_1.3fr_1fr_1.1fr_auto] lg:items-end",
                !expanded && "hidden",
              )}
            >
              <Input
                label="Pickup point"
                error={errors.pickup?.message}
                {...register("pickup")}
              />

              <Controller
                name="destination"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Destination"
                    placeholder="Where to?"
                    value={field.value}
                    onValueChange={field.onChange}
                    error={errors.destination?.message}
                    options={destinations.map((d) => ({ value: d.name, label: d.name }))}
                  />
                )}
              />

              <Input
                type="date"
                label="Travel date"
                min={todayISO()}
                error={errors.date?.message}
                {...register("date")}
              />

              <Controller
                name="vehicle"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Vehicle"
                    value={field.value}
                    onValueChange={field.onChange}
                    error={errors.vehicle?.message}
                    options={VEHICLES}
                  />
                )}
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={isSubmitting}
                className="h-14 w-full lg:w-auto lg:px-8"
              >
                <MessageCircle size={16} aria-hidden="true" />
                Check
              </Button>
            </div>

            {/*
              Live fare from the real fare table. "Fixed fares" is the business's
              actual differentiator, so quoting the number before the user
              commits is the most useful thing this control can do.

              It expands at the END of the bar's flow, so nothing above it moves.
            */}
            <AnimatePresence initial={false}>
              {quotedFare && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={transition.standard}
                  className="overflow-hidden"
                >
                  <p className="mt-4 flex flex-wrap items-baseline gap-x-2.5 border-t border-white/[0.08] pt-4 text-body-sm text-fg-muted">
                    <ArrowRight size={14} aria-hidden="true" className="text-gold-500" />
                    Tirupati to {destination}, {vehicle} seater —
                    <span className="text-h4 text-gold-300">{quotedFare}</span>
                    <span className="text-caption">fixed, no surge</span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
