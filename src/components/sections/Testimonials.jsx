import { Quote, Star } from "lucide-react";
import {
  Carousel,
  CarouselViewport,
  CarouselSlide,
  CarouselControls,
  CarouselDots,
} from "../ui/Carousel";
import { Card, CardBody } from "../ui/Card";
import { Reveal } from "../ui/Reveal";
import { reviews } from "../../data/reviews";

/**
 * Testimonials.
 *
 * Embla carousel with autoplay. The Carousel primitive already handles the parts
 * that usually go wrong: autoplay stops on interaction, pauses on hover AND on
 * focus-within, and never starts at all under reduced motion.
 *
 * NOTE — no aggregate rating is displayed and no Review schema is emitted.
 * Whether these four are real customers is unconfirmed (CONTENT-BRIEF.md §9),
 * and fabricated review markup is a documented cause of Google penalising local
 * businesses. The cards render; the structured data does not.
 */
export default function Testimonials() {
  return (
    <section
      id="reviews"
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden bg-ink-950 py-20 lg:py-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ink-mesh" />

      <div className="relative z-raised mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <h2 id="testimonials-heading" className="text-h2 text-fg">
            What people say <span className="text-gold-400">afterwards</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <Carousel
            label="Customer testimonials"
            autoplay
            autoplayDelay={6000}
            options={{ align: "start", loop: true }}
          >
            <CarouselViewport>
              {reviews.map((review) => (
                <CarouselSlide
                  key={review.name}
                  className="w-full sm:w-1/2 lg:w-1/3"
                >
                  <Card variant="glass" radius="lg" className="h-full">
                    <CardBody className="flex h-full flex-col">
                      <Quote
                        size={24}
                        aria-hidden="true"
                        className="text-gold-500/70"
                        strokeWidth={1.5}
                      />

                      <blockquote className="mt-5 flex-1 text-body-lg text-fg-secondary">
                        {review.quote}
                      </blockquote>

                      <footer className="mt-7 flex items-center justify-between gap-4 border-t border-white/[0.08] pt-5">
                        <div className="min-w-0">
                          <p className="text-body-sm font-medium text-fg">
                            {review.name}
                          </p>
                          <p className="mt-0.5 text-caption text-fg-muted">
                            {review.place}
                          </p>
                        </div>

                        {/* The visual stars are decorative; the rating is stated
                            in text for assistive tech rather than being inferred
                            from five identical icons. */}
                        <p className="flex shrink-0 gap-0.5" aria-hidden="true">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={13}
                              className={
                                i < review.rating
                                  ? "fill-gold-500 text-gold-500"
                                  : "text-white/15"
                              }
                            />
                          ))}
                        </p>
                        <span className="sr-only">
                          Rated {review.rating} out of 5
                        </span>
                      </footer>
                    </CardBody>
                  </Card>
                </CarouselSlide>
              ))}
            </CarouselViewport>

            <div className="mt-8 flex items-center justify-between gap-4">
              <CarouselDots />
              <CarouselControls />
            </div>
          </Carousel>
        </Reveal>
      </div>
    </section>
  );
}
