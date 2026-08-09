import { MessageCircle } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/Accordion";
import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";
import { faqs } from "../../data/faqs";
import { whatsappLink } from "../../lib/utils";

/**
 * FAQ.
 *
 * `type="single" collapsible` — one open at a time. A multi-open accordion on
 * ten long answers turns into a wall of text and defeats the point of the
 * pattern.
 *
 * ⚠️ Every answer is a placeholder (data/faqs.js). These read as company policy
 * — cancellation terms, darshan-ticket handling, payment rules — and a customer
 * will point at this page later. FAQPage schema is deliberately not emitted
 * until the answers are confirmed.
 */
export default function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative overflow-hidden bg-ink-900 py-20 lg:py-28"
    >
      <div className="relative z-raised mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal className="min-w-0">
            <h2 id="faq-heading" className="text-h2 text-fg">
              Before you <span className="text-gold-400">book</span>
            </h2>
            <p className="mt-5 text-body-lg text-fg-secondary">
              The things people ask us most. If yours isn&apos;t here, message
              us — you&apos;ll get a straight answer, not a callback form.
            </p>

            <Button asChild variant="ghost" size="md" className="mt-8">
              <a
                href={whatsappLink("Hi CS Travels, I have a question:")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={15} aria-hidden="true" />
                Ask on WhatsApp
              </a>
            </Button>
          </Reveal>

          <Reveal delay={0.1} className="min-w-0">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger>{faq.q}</AccordionTrigger>
                  <AccordionContent>{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
