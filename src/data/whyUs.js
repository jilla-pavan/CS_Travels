/**
 * Why choose us + circuit highlights.
 *
 * RESCUED CONTENT. Every string below was written in the previous build's
 * `Highlights.jsx`, which — like Itinerary.jsx — was never imported and
 * rendered on no page.
 *
 * I briefly deleted that file before extracting this and had to recover it from
 * git. Noting it here because it's the second piece of real, invisible content
 * found in this repo, and the reason nothing gets removed now without its
 * content being moved into `data/` first.
 *
 * One claim carried over that needs confirming: "MG Hector" appears both here
 * and in tourPackages.js, but is not in the fleet list (CONTENT-BRIEF.md §4).
 * Either the fleet is missing a vehicle or this copy is stale.
 */

export const circuitHighlights = [
  {
    icon: "map-pin",
    title: "Kanchi + Tiruttani + Kalahasti in one run",
    body: "Three temple regions on a single route, rather than three separate trips.",
  },
  {
    icon: "star",
    title: "Rare temples most operators skip",
    body: "Gudimallam Parasurameswara and Ardhagiri Anjaneya are off the main road, so they usually get dropped. They're on this route.",
  },
  {
    icon: "car",
    title: "Exclusive vehicle, temple-route driver",
    /** @placeholder — "MG Hector" is unconfirmed against the fleet list. */
    body: "A vehicle for your group alone, with a driver who has done these roads before.",
  },
  {
    icon: "route",
    title: "Timed to avoid the worst of the queues",
    body: "Nine temples across two days, sequenced so you aren't driving during darshan hours.",
  },
];

export const reasons = [
  "Expert drivers for temple routes",
  "Darshan timing planned into the route",
  "Premium, clean, privately hired vehicles",
  "Transparent pricing agreed upfront",
  "One operator accountable start to finish",
];
