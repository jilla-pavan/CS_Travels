import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { motion, useScroll, useSpring } from "framer-motion";
import { ChevronDown, Menu, Phone } from "lucide-react";
import { Button } from "../ui/Button";
import { Picture, RemoteImage } from "../ui/Image";
import { MobileMenu } from "./MobileMenu";
import { cn, PHONE_DISPLAY, PHONE_HREF } from "../../lib/utils";
import { tourPackages } from "../../data/tourPackages";
import logo from "../../assets/CS_Travel_Logo.png?preset=logo";

/**
 * Primary navigation.
 *
 * Sections are anchors on the home page; the logo and package links are real
 * routes. Every href here must correspond to an id that actually exists —
 * "About" was dropped once that section's content was absorbed into Fleet,
 * TrustBand and WhyUs, and a nav link pointing at a removed id is worse than
 * no link at all.
 */
const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Fleet", href: "/#fleet" },
  { label: "Destinations", href: "/#destinations" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const sentinelRef = useRef(null);

  /**
   * Scrolled state via IntersectionObserver on a zero-height sentinel, not a
   * scroll listener.
   *
   * A `scroll` handler runs on every scroll event on the main thread — the exact
   * work that costs frames on a mid-range Android. The observer fires twice in
   * the page's life: crossing the threshold down, and back up. It also gets
   * hysteresis for free, so the bar can't flicker at the boundary.
   */
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { rootMargin: "0px", threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  /* Scroll progress hairline. Spring-smoothed so it glides rather than
     stepping, and scaleX so it's a compositor-only transform. */
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Sentinel: sits at the very top of the document, 64px tall. When it
          leaves the viewport, the bar has been scrolled past. */}
      <div ref={sentinelRef} aria-hidden="true" className="absolute top-0 h-16 w-full" />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-nav",
          /* Transition on the properties that change, so the shift from
             transparent to solid eases instead of snapping. */
          "transition-[background-color,backdrop-filter,border-color,box-shadow]",
          "duration-standard ease-state",
          scrolled
            ? "border-b border-white/[0.07] bg-ink-950/80 shadow-card backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-6 px-5 sm:px-6 lg:h-20 lg:px-10">
          {/* ------------------------------------------------------ logo */}
          <Link
            to="/"
            className="group flex shrink-0 items-center gap-3"
            aria-label="CS Travels Tirupati — home"
          >
            <span className="relative block">
              {/* Gold halo, warms on hover. Opacity only. */}
              <span
                aria-hidden="true"
                className="absolute -inset-2 rounded-full bg-gold-500/20 opacity-0 blur-lg transition-opacity duration-standard ease-state group-hover:opacity-100"
              />
              <Picture
                source={logo}
                alt=""
                sizes="48px"
                priority
                className="relative h-11 w-11 lg:h-12 lg:w-12"
                imgClassName="object-contain"
              />
            </span>

            <span className="min-w-0">
              <span className="block text-body-sm font-medium tracking-[0.2em] text-fg">
                CS TRAVELS
              </span>
              {/* The gold rule under the wordmark draws out on hover — the
                  "animated logo mark", done with scaleX rather than width. */}
              <span className="mt-0.5 block overflow-hidden">
                <span className="block text-[0.5625rem] uppercase tracking-[0.42em] text-gold-400">
                  Tirupati
                </span>
                <span
                  aria-hidden="true"
                  className="mt-1 block h-px origin-left scale-x-0 bg-gold-500 transition-transform duration-standard ease-entrance group-hover:scale-x-100"
                />
              </span>
            </span>
          </Link>

          {/* -------------------------------------------------- desktop nav */}
          <NavigationMenu.Root
            className="relative hidden lg:block"
            delayDuration={120}
          >
            <NavigationMenu.List className="flex items-center gap-1">
              <NavigationMenu.Item>
                <NavigationMenu.Trigger className="group flex items-center gap-1.5 rounded-full px-4 py-2.5 text-caption uppercase tracking-[0.16em] text-fg-secondary transition-colors duration-micro ease-state hover:text-gold-300 data-[state=open]:text-gold-300">
                  Packages
                  <ChevronDown
                    size={13}
                    aria-hidden="true"
                    className="transition-transform duration-micro ease-state group-data-[state=open]:rotate-180"
                  />
                </NavigationMenu.Trigger>

                <NavigationMenu.Content className="absolute left-0 top-full w-max">
                  <PackagesMegaMenu />
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              {NAV_LINKS.map((link) => (
                <NavigationMenu.Item key={link.href}>
                  <NavigationMenu.Link asChild>
                    <a
                      href={link.href}
                      className="group relative block rounded-full px-4 py-2.5 text-caption uppercase tracking-[0.16em] text-fg-secondary transition-colors duration-micro ease-state hover:text-gold-300"
                    >
                      {link.label}
                      {/* Gold underline, scaleX from centre. */}
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-4 bottom-1 h-px origin-center scale-x-0 bg-gold-500 transition-transform duration-standard ease-entrance group-hover:scale-x-100"
                      />
                    </a>
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              ))}
            </NavigationMenu.List>

            <div className="absolute left-0 top-full flex justify-start">
              <NavigationMenu.Viewport
                className={cn(
                  "relative mt-3 overflow-hidden rounded-xl",
                  "border border-white/10 bg-ink-900/95 shadow-glass backdrop-blur-xl",
                  "h-[var(--radix-navigation-menu-viewport-height)]",
                  "w-[var(--radix-navigation-menu-viewport-width)]",
                  "origin-top transition-[width,height] duration-standard ease-state",
                )}
              />
            </div>
          </NavigationMenu.Root>

          {/* ---------------------------------------------------- actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Phone number visible on desktop — the brief asks for it, and for
                this business a visible number converts better than any button. */}
            <a
              href={PHONE_HREF}
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-caption text-fg-secondary transition-colors duration-micro ease-state hover:text-gold-300 xl:flex"
            >
              <Phone size={14} aria-hidden="true" />
              {PHONE_DISPLAY}
            </a>

            <Button asChild variant="primary" size="sm" className="hidden sm:inline-flex">
              <a href="/#home">Book now</a>
            </Button>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-full text-fg transition-colors duration-micro ease-state hover:bg-white/5 lg:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu size={22} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Scroll progress hairline, flush to the bar's bottom edge. */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-gold-500"
        />
      </header>

      <MobileMenu
        open={mobileOpen}
        onOpenChange={setMobileOpen}
        links={NAV_LINKS}
      />
    </>
  );
}

/**
 * Packages mega menu.
 *
 * Real package data with imagery. The images are the existing Unsplash
 * placeholders (CONTENT-BRIEF.md §8) and go through RemoteImage rather than the
 * build pipeline, since they aren't local assets.
 */
function PackagesMegaMenu() {
  return (
    <div className="w-[min(90vw,640px)] p-3">
      <ul className="grid gap-2 sm:grid-cols-2">
        {tourPackages.map((pkg, index) => (
          <li key={pkg.slug}>
            <NavigationMenu.Link asChild>
              <Link
                to={`/packages/${pkg.slug}`}
                className="group flex gap-4 rounded-lg p-3 transition-colors duration-micro ease-state hover:bg-white/[0.06]"
                /* Staggered reveal, driven by CSS custom property so it costs
                   no JS per item. */
                style={{ "--i": index }}
              >
                <RemoteImage
                  src={`${pkg.image}?w=160&q=70&auto=format`}
                  alt=""
                  aspectRatio="1 / 1"
                  className="h-16 w-16 shrink-0 overflow-hidden rounded-md"
                  imgClassName="transition-transform duration-entrance ease-entrance group-hover:scale-105"
                />

                <span className="min-w-0">
                  <span className="block text-body-sm font-medium text-fg">
                    {pkg.title}
                  </span>
                  <span className="mt-1 block text-caption text-fg-muted">
                    {pkg.subtitle}
                  </span>
                  <span className="mt-1.5 block text-caption text-gold-400">
                    from {pkg.price}
                  </span>
                </span>
              </Link>
            </NavigationMenu.Link>
          </li>
        ))}
      </ul>

      <div className="mt-2 border-t border-white/[0.07] px-3 pt-3">
        <a
          href="/#packages"
          className="flex items-center justify-between text-caption uppercase tracking-[0.16em] text-fg-muted transition-colors duration-micro ease-state hover:text-gold-300"
        >
          All packages &amp; fares
          <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </div>
  );
}
