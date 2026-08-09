/**
 * Customer reviews.
 *
 * ⚠️ UNVERIFIED — CONTENT-BRIEF.md §9.
 *
 * These four were inlined in the previous build's Reviews component with no
 * source. They are displayed because they were already live on the site, NOT
 * because they have been confirmed as real customers.
 *
 * Consequence, and the reason this warning is here rather than in a doc: none
 * of this may be emitted as `Review` or `aggregateRating` schema until the user
 * confirms the reviews are genuine. Fabricated review markup is a documented
 * cause of Google penalising — and delisting — local businesses.
 */
export const reviews = [
  {
    name: "Ramesh Kumar",
    place: "Hyderabad",
    rating: 5,
    quote:
      "Excellent service! Very comfortable journey to Tirupati. Everything was well organized and hassle free.",
    short: "Everything was well organised and hassle free.",
  },
  {
    name: "Anitha Reddy",
    place: "Chennai",
    rating: 5,
    quote:
      "Peaceful darshan experience. Professional team and smooth travel throughout the journey.",
    short: "Professional team and smooth travel throughout.",
  },
  {
    name: "Suresh Babu",
    place: "Bangalore",
    rating: 4,
    quote:
      "On-time pickup, clean vehicle and excellent driver. Highly satisfied with the service.",
    short: "On-time pickup, clean vehicle, excellent driver.",
  },
  {
    name: "Lakshmi Devi",
    place: "Vijayawada",
    rating: 5,
    quote:
      "Best Tirupati travel service we have used. Comfortable and reliable from start to finish.",
    short: "Comfortable and reliable from start to finish.",
  },
];
