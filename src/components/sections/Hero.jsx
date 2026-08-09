import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "../ui/Button";
import { MaskedHeading } from "../ui/Reveal";
import { Picture } from "../ui/Image";
import { BookingBar } from "../booking/BookingCard";
import { PHONE_DISPLAY, PHONE_HREF } from "../../lib/utils";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import heroImage from "../../assets/Homepage_Background.png?preset=scene";

const HeroCanvas = lazy(() => import("../hero/HeroCanvas"));

/**
 * Hero.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * REBUILT. The previous version put a tall glass booking card, a masked
 * headline, an eyebrow, a trust row and a three-column stats block on top of a
 * bright, busy photograph, then lit the whole thing with a screen-blended
 * shader. Everything competed and the photograph lost — the card blurred the
 * golden mist behind it and rendered as a solid gold slab with unreadable
 * labels, and every muted-grey element disappeared.
 *
 * The composition now separates rather than stacks:
 *
 *   · the photograph runs full-bleed and is never covered at its focal point
 *   · the copy sits on a DESIGNED ink panel with a feathered edge — a real
 *     surface with real contrast, not a wishy-washy gradient hoping for the best
 *   · booking moves to a solid bar anchored at the base, the pattern every
 *     serious travel brand uses, so it reads as a tool and obscures nothing
 *   · the shader is masked to the sky and no longer blends over any content
 * ─────────────────────────────────────────────────────────────────────────────
 */
export default function Hero() {
  const [showCanvas, setShowCanvas] = useState(false);
  const sectionRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  useEffect(() => {
    const schedule = window.requestIdleCallback ?? ((fn) => setTimeout(fn, 200));
    const cancel = window.cancelIdleCallback ?? clearTimeout;
    const handle = schedule(() => setShowCanvas(true), { timeout: 1500 });
    return () => cancel(handle);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink-950"
    >
      {/* ───────────────────────────────────────────────── photograph ── */}
      <motion.div
        aria-hidden="true"
        style={prefersReducedMotion ? undefined : { y: imageY, scale: imageScale }}
        className="absolute inset-x-0 -top-[5%] -z-30 h-[110%]"
      >
        <Picture
          source={heroImage}
          alt=""
          priority
          sizes="100vw"
          className="h-full w-full"
          imgClassName="object-cover object-[68%_center] lg:object-[60%_center]"
        />
      </motion.div>

      {/*
        Cinematic grade. The source is a bright, high-key image; left as-is it
        has no shadows for white text to sit in. This is a deliberate two-step
        grade — a cool deep-blue multiply to sink the midtones into the palette,
        and a warm bottom lift so the stonework keeps its gold rather than going
        muddy. Together they put the photo in the same world as the tokens.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-ink-950/45 mix-blend-multiply"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(5,13,26,0.72)_0%,rgba(5,13,26,0.12)_38%,rgba(5,13,26,0.55)_78%,rgba(5,13,26,0.96)_100%)]"
      />

      {/*
        Atmosphere, masked to the sky.

        It used to blend over the entire hero including the copy, which is what
        blew out the text. It is now clipped to the top 55% and faded out before
        it reaches anything readable, so it lights the clouds and nothing else.
      */}
      {showCanvas && (
        <Suspense fallback={null}>
          <HeroCanvas
            className="absolute inset-x-0 top-0 -z-10 h-[55%] w-full opacity-30 mix-blend-screen [mask-image:linear-gradient(180deg,#000_0%,#000_55%,transparent_100%)]"
          />
        </Suspense>
      )}

      {/*
        The copy panel.

        A designed surface, not a hopeful gradient: solid ink at the left edge,
        feathered out across ~55% so the photograph is never hard-cut. This is
        what guarantees the text contrast instead of leaving it to whatever the
        photo happens to be doing behind it.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 -z-[5] w-full bg-[linear-gradient(90deg,#050D1A_0%,rgba(5,13,26,0.97)_26%,rgba(5,13,26,0.80)_44%,rgba(5,13,26,0.35)_62%,transparent_82%)] lg:w-[72%]"
      />

      {/* ───────────────────────────────────────────────────── copy ── */}
      <div className="relative z-raised flex flex-1 items-center">
        <div className="mx-auto w-full max-w-7xl px-5 pb-10 pt-28 sm:px-6 lg:px-10 lg:pb-16 lg:pt-32">
          <div className="max-w-2xl">
            {/*
              No eyebrow. The craft floor bans a kicker above a heading outright
              — the heading carries its own weight.

              This is also the page's ONE authored motion moment: a line-by-line
              mask reveal. Everything else on the hero simply appears.
            */}
            <MaskedHeading
              lines={["Travel with", "devotion & comfort"]}
              className="text-[clamp(2.5rem,1.4rem+4.4vw,4.75rem)] font-medium leading-[1.02] tracking-[-0.035em] text-white"
              lineClassName="[&:nth-child(2)]:text-gold-300"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              /* Warm-tinted, not grey. On a gold-lit image a cool grey reads as
                 dirt; sand-200 is drawn from the photograph's own hue. */
              className="mt-7 max-w-[46ch] text-body-lg text-sand-200"
            >
              Private cabs and darshan packages across Tirupati and Tirumala —
              airport pickups, temple circuits and outstation trips, at fares
              agreed before you travel.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button asChild variant="primary" size="lg" magnetic>
                <a href="#packages">
                  Explore packages
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              </Button>

              {/* Solid border and white text rather than the ghost variant's
                  12% white, which vanished against the lit stonework. */}
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="border-white/35 bg-ink-950/40 text-white backdrop-blur-sm hover:border-gold-400/60"
              >
                <a href={PHONE_HREF}>
                  <Phone size={16} aria-hidden="true" />
                  {PHONE_DISPLAY}
                </a>
              </Button>
            </motion.div>

            {/*
              One quiet line instead of the three-column big-number block.

              The craft floor calls the hero-metric template a lazy default, and
              those figures are unverified placeholders (CONTENT-BRIEF.md §10)
              that were rendering illegibly anyway. The trust claims that ARE
              supportable now read as a sentence.
            */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.74, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 text-body-sm text-sand-300"
            >
              Fixed fares, quoted upfront
              <span aria-hidden="true" className="mx-2.5 text-gold-500">
                ·
              </span>
              Private vehicle, never shared
              <span aria-hidden="true" className="mx-2.5 text-gold-500">
                ·
              </span>
              Booking answered 24×7
            </motion.p>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────── booking bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
        /* The mobile bottom padding clears the fixed Call/WhatsApp bar, which
           is 73px tall plus the safe-area inset and was covering the booking
           trigger by 40px. Dropped at lg, where that bar doesn't render. */
        className="relative z-raised mx-auto w-full max-w-7xl px-5 pb-[calc(5.5rem+env(safe-area-inset-bottom))] sm:px-6 lg:px-10 lg:pb-12"
      >
        <BookingBar />
      </motion.div>
    </section>
  );
}
