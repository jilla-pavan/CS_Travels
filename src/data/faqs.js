/**
 * FAQ.
 *
 * ⚠️ EVERY ANSWER BELOW IS INVENTED. The questions came from your brief; the
 * answers are plausible guesses written so the section can be designed.
 *
 * This is the highest-consequence placeholder file in the project. These answers
 * read as company policy — a customer who cancels a booking, or turns up
 * expecting you to have arranged darshan tickets, will point at this page. Get
 * them confirmed before launch (CONTENT-BRIEF.md §11).
 *
 * Consequence for step 10: FAQPage schema is NOT emitted while these are
 * placeholders. Marking up invented policy as structured data publishes it to
 * Google as fact.
 */

export const faqs = [
  {
    id: "darshan-tickets",
    q: "Do you arrange Tirumala darshan tickets?",
    /** @placeholder — the single most-asked question. Overclaiming here damages
        trust badly, so confirm the exact position before launch. */
    a: "We arrange the travel, not the darshan tickets. Tickets are issued by TTD and are booked in your own name through the official TTD channels. We plan your pickup around whatever slot you're allotted, and our drivers know the timings well enough to advise on when to leave.",
  },
  {
    id: "luggage",
    q: "How much luggage can I bring?",
    /** @placeholder */
    a: "A sedan comfortably takes two large bags, an MPV three, and an SUV four. A Tempo Traveller handles eight or more. If you're arriving on a flight with heavy luggage, tell us when booking and we'll send the right vehicle.",
  },
  {
    id: "night-travel",
    q: "Do you operate at night?",
    /** @placeholder */
    a: "Yes — night pickups and darshan-morning starts from 3:00 am are routine for us. A night charge applies for journeys running after 11:00 pm, and it's included in the fare we quote you upfront.",
  },
  {
    id: "cancellation",
    q: "What is your cancellation policy?",
    /** @placeholder — customers will hold you to this exact wording. */
    a: "Cancel more than 24 hours before pickup and there's no charge. Inside 24 hours, a partial charge may apply to cover the driver's allocated day. Plans change on pilgrimages more than most trips, so talk to us — we'd rather move your booking than cancel it.",
  },
  {
    id: "payment",
    q: "How do I pay, and is an advance required?",
    /** @placeholder */
    a: "UPI, bank transfer or cash. For local trips you can pay at the end of the journey. Multi-day packages take a small advance to hold the vehicle and the balance on completion.",
  },
  {
    id: "nri-payment",
    q: "I'm booking from overseas — how do I pay?",
    /** @placeholder */
    a: "Confirm your booking on WhatsApp and pay on arrival, or have someone in India settle it by UPI. We don't ask overseas customers to transfer money before the trip.",
  },
  {
    id: "tolls",
    q: "Are tolls and parking included in the fare?",
    /** @placeholder */
    a: "Tolls, parking and any state permits are billed at actual on top of the quoted fare. We show you the receipts. The ghat road up to Tirumala has its own charges, which we'll tell you about when quoting.",
  },
  {
    id: "waiting",
    q: "Will the driver wait while we're at the temple?",
    /** @placeholder */
    a: "Yes. Waiting during darshan is part of a darshan package. For hourly or point-to-point hires, extended waiting is charged separately — we'll tell you the rate before you book.",
  },
  {
    id: "child-seats",
    q: "Do you provide child seats?",
    /** @placeholder */
    a: "Tell us the child's age when booking and we'll arrange one where we can. Please ask in advance rather than on the day.",
  },
  {
    id: "overrun",
    q: "What if the trip runs longer than planned?",
    /** @placeholder */
    a: "Darshan queues are unpredictable and we plan for that. Short overruns aren't charged. If a trip runs substantially past the booked time or distance, the extra is charged at the same per-km and hourly rates you were quoted — never a renegotiated price on the day.",
  },
];
