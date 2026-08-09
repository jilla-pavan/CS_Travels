import { useCallback, useEffect, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { transition } from "../../lib/motion";

/**
 * Image lightbox.
 *
 * Built on Radix Dialog for the focus trap, focus restore, and Escape handling,
 * with arrow-key navigation and swipe layered on top.
 *
 * Keyboard: ← → to move, Esc to close, Tab cycles the controls only (the trap
 * keeps focus inside). Touch: horizontal drag past 80px advances.
 *
 * Images are loaded eagerly for the current slide and prefetched one either
 * side — enough that navigation feels instant, few enough that opening the
 * lightbox doesn't pull the whole gallery over the wire.
 */
export function Lightbox({ images = [], open, onOpenChange, startIndex = 0 }) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {/* Keyed on startIndex and only mounted while open, so the inner
          component initialises its own index from the prop. That removes the
          "reset state when a prop changes" effect entirely — the usual source
          of the lightbox opening on the previously-viewed image for one frame. */}
      {open && (
        <LightboxContent key={startIndex} images={images} startIndex={startIndex} />
      )}
    </DialogPrimitive.Root>
  );
}

function LightboxContent({ images, startIndex }) {
  const [index, setIndex] = useState(startIndex);
  const [direction, setDirection] = useState(0);

  const go = useCallback(
    (delta) => {
      setDirection(delta);
      setIndex((current) => (current + delta + images.length) % images.length);
    },
    [images.length],
  );

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(-1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [go]);

  const current = images[index];
  if (!current) return null;

  /* Slide direction follows navigation direction, so the motion tells you which
     way you moved through the set rather than always coming from one side. */
  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
  };

  return (
    <>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-overlay bg-ink-950/95 backdrop-blur-sm" />

        <DialogPrimitive.Content
          className="fixed inset-0 z-modal flex flex-col focus:outline-none"
          /* The image itself is the content; the trap and Escape come from
             Radix. Autofocus goes to the close button rather than an image. */
        >
          <DialogPrimitive.Title className="sr-only">
            Image {index + 1} of {images.length}
            {current.alt ? `: ${current.alt}` : ""}
          </DialogPrimitive.Title>

          <div className="flex items-center justify-between p-4 sm:p-6">
            <p className="text-caption uppercase tracking-[0.2em] text-fg-muted">
              {index + 1} / {images.length}
            </p>

            <DialogPrimitive.Close
              className={cn(
                "grid h-11 w-11 place-items-center rounded-full",
                "border border-white/12 text-fg",
                "transition-colors duration-micro ease-state hover:bg-white/8",
              )}
            >
              <X size={20} aria-hidden="true" />
              <span className="sr-only">Close gallery</span>
            </DialogPrimitive.Close>
          </div>

          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-6 sm:px-16">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.img
                key={index}
                src={current.src}
                alt={current.alt ?? ""}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={transition.standard}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) go(1);
                  if (info.offset.x > 80) go(-1);
                }}
                className="max-h-full max-w-full cursor-grab rounded-lg object-contain active:cursor-grabbing"
                draggable={false}
              />
            </AnimatePresence>

            {images.length > 1 && (
              <>
                <LightboxArrow side="left" onClick={() => go(-1)} />
                <LightboxArrow side="right" onClick={() => go(1)} />
              </>
            )}
          </div>

          {current.caption && (
            <p className="px-6 pb-6 text-center text-body-sm text-fg-muted">
              {current.caption}
            </p>
          )}

          {/* Prefetch the neighbours so arrow navigation doesn't flash. */}
          <div className="hidden" aria-hidden="true">
            {[index - 1, index + 1].map((i) => {
              const neighbour = images[(i + images.length) % images.length];
              return neighbour ? (
                <img key={i} src={neighbour.src} alt="" loading="lazy" />
              ) : null;
            })}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </>
  );
}

function LightboxArrow({ side, onClick }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "absolute top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full",
        "border border-white/12 bg-ink-950/60 text-fg backdrop-blur-sm",
        "transition-colors duration-micro ease-state hover:border-gold-500/40 hover:text-gold-300",
        side === "left" ? "left-2 sm:left-5" : "right-2 sm:right-5",
      )}
    >
      <Icon size={22} aria-hidden="true" />
      <span className="sr-only">{side === "left" ? "Previous" : "Next"} image</span>
    </button>
  );
}
