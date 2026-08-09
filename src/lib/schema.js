import { company } from "../data/company";
import { tourPackages } from "../data/tourPackages";
import { faqs } from "../data/faqs";
import { reviews } from "../data/reviews";

/**
 * Structured data.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * READ THIS BEFORE FLIPPING THE FLAG BELOW.
 *
 * Structured data is not like on-page copy. On-page placeholder text is visible,
 * obviously provisional, and costs nothing to correct. Structured data is
 * submitted to Google as machine-readable factual claims about a real business,
 * and getting it wrong has consequences that outlast the fix:
 *
 *   · a wrong `address` / `geo` sends customers to the wrong place and can
 *     corrupt the Google Business Profile listing
 *   · invented `aggregateRating` or `Review` markup is a documented cause of
 *     Google penalising and delisting local businesses
 *   · `FAQPage` markup publishes invented cancellation and payment policy as
 *     the company's stated terms
 *
 * So while CONTENT_IS_PLACEHOLDER is true, only the schema that rests on
 * verified data is emitted: Organization and WebSite, built from the real
 * business name, phone and city.
 *
 * Everything else is written, tested and ready — it simply doesn't emit. Set
 * the flag to false once CONTENT-BRIEF.md §2, §9 and §11 come back and the
 * `@placeholder` markers are gone from data/company.js, data/faqs.js and
 * data/reviews.js.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const CONTENT_IS_PLACEHOLDER = true;

/** Set once a domain is confirmed (CONTENT-BRIEF.md §12). */
export const SITE_URL = "";

const absolute = (path) => (SITE_URL ? new URL(path, SITE_URL).href : undefined);

/* ------------------------------------------------------- always safe ----- */

/**
 * Organization. Rests entirely on confirmed data: the trading name, the phone
 * number, and the city. Deliberately NOT LocalBusiness — that type expects a
 * postal address, and this one isn't verified yet.
 */
function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: SITE_URL || undefined,
    telephone: company.phone,
    areaServed: company.serviceAreas.map((name) => ({
      "@type": "City",
      name,
    })),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: company.phone,
      contactType: "reservations",
      areaServed: "IN",
      availableLanguage: company.languages,
    },
  };
}

function webSiteSchema() {
  if (!SITE_URL) return null;
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: company.name,
    url: SITE_URL,
  };
}

/* ------------------------------------------- gated on verified content --- */

/** Needs a verified street address and coordinates — §2. */
function travelAgencySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: company.name,
    telephone: company.phone,
    email: company.email,
    url: SITE_URL || undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.street,
      addressLocality: company.city,
      addressRegion: company.state,
      postalCode: company.postalCode,
      addressCountry: company.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: company.geo.lat,
      longitude: company.geo.lng,
    },
    openingHours: "Mo-Su 00:00-23:59",
    priceRange: "₹₹",
  };
}

/** Needs confirmation that the reviews are from real customers — §9. */
function reviewSchema() {
  return reviews.map((review) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: { "@type": "TravelAgency", name: company.name },
    author: { "@type": "Person", name: review.name },
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
      bestRating: 5,
    },
    reviewBody: review.quote,
  }));
}

/** Needs confirmed answers — these are company policy, not copy. §11. */
function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

/** Needs confirmed prices and inclusions — §5. */
function packageSchema(pkg) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: pkg.title,
    description: pkg.description,
    url: absolute(`/packages/${pkg.slug}`),
    provider: { "@type": "TravelAgency", name: company.name },
    itinerary: pkg.itinerary?.map((step, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: step,
    })),
  };
}

/* ------------------------------------------------------------ assembly --- */

/**
 * Every JSON-LD block for a given route.
 *
 * Returns only the safe subset while CONTENT_IS_PLACEHOLDER is true.
 */
export function schemaFor(route = "home") {
  const blocks = [organizationSchema(), webSiteSchema()].filter(Boolean);

  if (CONTENT_IS_PLACEHOLDER) return blocks;

  blocks.push(travelAgencySchema());

  if (route === "home") {
    blocks.push(faqSchema(), ...reviewSchema());
    blocks.push(...tourPackages.map(packageSchema));
  }

  return blocks;
}

/** Convenience for a single package route. */
export function schemaForPackage(pkg) {
  const blocks = [organizationSchema(), webSiteSchema()].filter(Boolean);
  if (CONTENT_IS_PLACEHOLDER || !pkg) return blocks;
  blocks.push(travelAgencySchema(), packageSchema(pkg));
  return blocks;
}
