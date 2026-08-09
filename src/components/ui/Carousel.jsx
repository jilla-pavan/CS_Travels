import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

const CarouselContext = createContext(null);

const useCarousel = () => {
  const context = useContext(CarouselContext);
  if (!context) throw new Error("Carousel parts must be used within <Carousel>");
  return context;
};

/**
 * Carousel, on Embla.
 *
 * Replaces Swiper, which the old build used in two sections. Embla is ~7KB
 * against Swiper's ~45KB, ships native drag/touch, and doesn't inject its own
 * stylesheet — the reason the brief specifies it.
 *
 * Accessibility notes, since carousels are usually where it goes wrong:
 *  - the viewport is a labelled group, so screen readers announce what it is
 *  - autoplay pauses on hover AND on focus-within, and stops entirely once the
 *    user interacts, so it can never steal a slide mid-read
 *  - autoplay never starts under reduced motion
 *  - slides off-screen keep their focusable children reachable via keyboard,
 *    and Embla scrolls them into view when they receive focus
 */
export function Carousel({
  children,
  className,
  options = {},
  autoplay = false,
  autoplayDelay = 5000,
  label = "Carousel",
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const autoplayEnabled = autoplay && !prefersReducedMotion;

  const plugins = autoplayEnabled
    ? [
        Autoplay({
          delay: autoplayDelay,
          stopOnInteraction: true,
          stopOnMouseEnter: true,
          stopOnFocusIn: true,
        }),
      ]
    : [];

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      containScroll: "trimSnaps",
      /* Reduced motion still allows paging — it just jumps rather than glides. */
      duration: prefersReducedMotion ? 0 : 28,
      ...options,
    },
    plugins,
  );

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState([]);

  const onSelect = useCallback((api) => {
    setCanPrev(api.canScrollPrev());
    setCanNext(api.canScrollNext());
    setSelected(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return undefined;

    /* Embla's API object doesn't exist until its ref attaches, so the snap list
       and selected index cannot be read during render. This is the "subscribe to
       an external system, seed with its current value" pattern that effects exist
       for — everything after these two lines is event-driven. */
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setSnaps(emblaApi.scrollSnapList());
    onSelect(emblaApi);

    emblaApi.on("select", onSelect).on("reInit", (api) => {
      setSnaps(api.scrollSnapList());
      onSelect(api);
    });

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const value = {
    emblaRef,
    emblaApi,
    canPrev,
    canNext,
    selected,
    snaps,
    scrollPrev: () => emblaApi?.scrollPrev(),
    scrollNext: () => emblaApi?.scrollNext(),
    scrollTo: (index) => emblaApi?.scrollTo(index),
  };

  return (
    <CarouselContext.Provider value={value}>
      <div
        className={cn("relative", className)}
        role="group"
        aria-roledescription="carousel"
        aria-label={label}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

export function CarouselViewport({ className, children }) {
  const { emblaRef } = useCarousel();
  return (
    /* overflow-hidden is required by Embla; the negative margin pairs with the
       slide padding to produce gutters without a gap on the outer edges. */
    <div ref={emblaRef} className={cn("overflow-hidden", className)}>
      <div className="-ml-4 flex touch-pan-y sm:-ml-6">{children}</div>
    </div>
  );
}

export function CarouselSlide({ className, children, ...props }) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={cn("min-w-0 shrink-0 grow-0 pl-4 sm:pl-6", className)}
      {...props}
    >
      {children}
    </div>
  );
}

/** Prev/next pair. Disabled rather than hidden at the ends, so the control
    row doesn't reflow and the user isn't left wondering where a button went. */
export function CarouselControls({ className }) {
  const { canPrev, canNext, scrollPrev, scrollNext } = useCarousel();

  const base = cn(
    "grid h-12 w-12 place-items-center rounded-full",
    "border border-white/12 bg-white/[0.02] text-fg",
    "transition-[color,border-color,background-color] duration-micro ease-state",
    "hover:border-gold-500/40 hover:text-gold-300",
    "disabled:pointer-events-none disabled:opacity-30",
  );

  return (
    <div className={cn("flex gap-3", className)}>
      <button type="button" onClick={scrollPrev} disabled={!canPrev} className={base}>
        <ArrowLeft size={18} aria-hidden="true" />
        <span className="sr-only">Previous slide</span>
      </button>
      <button type="button" onClick={scrollNext} disabled={!canNext} className={base}>
        <ArrowRight size={18} aria-hidden="true" />
        <span className="sr-only">Next slide</span>
      </button>
    </div>
  );
}

/** Dot pagination. Each dot is a real button with a 44px hit area, padded out
    from a small visual dot so touch targets pass without looking clumsy. */
export function CarouselDots({ className }) {
  const { snaps, selected, scrollTo } = useCarousel();

  if (snaps.length <= 1) return null;

  return (
    <div className={cn("flex items-center justify-center", className)}>
      {snaps.map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => scrollTo(index)}
          aria-current={index === selected ? "true" : undefined}
          className="group grid h-11 w-6 place-items-center"
        >
          <span
            className={cn(
              "block h-1.5 rounded-full transition-all duration-standard ease-state",
              index === selected
                ? "w-6 bg-gold-500"
                : "w-1.5 bg-white/25 group-hover:bg-white/45",
            )}
          />
          <span className="sr-only">Go to slide {index + 1}</span>
        </button>
      ))}
    </div>
  );
}
