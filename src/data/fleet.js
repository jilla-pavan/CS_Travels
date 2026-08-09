/**
 * Fleet.
 *
 * @placeholder — EVERY FIGURE BELOW IS INVENTED. See data/PLACEHOLDERS.md.
 *
 * Rates, minimum km/day and driver allowance are what a customer will hold you
 * to after the trip, so these are the highest-consequence placeholders on the
 * site. They are set to plausible 2026 Tirupati market values purely so the
 * layout can be designed and reviewed.
 *
 * `available: false` renders the card in a muted "ask us" state instead of
 * showing a rate — use it for anything you don't actually operate.
 */

export const fleet = [
  {
    id: "dzire",
    name: "Swift Dzire",
    className: "Sedan",
    seats: 4,
    luggage: 2,
    ac: true,
    /** @placeholder */
    perKm: 13,
    /** @placeholder */
    minKmPerDay: 250,
    /** @placeholder */
    driverAllowance: 400,
    blurb: "The everyday choice for airport runs and a family of four.",
    bestFor: ["Airport & railway transfers", "Tirumala darshan", "City sightseeing"],
    available: true,
  },
  {
    id: "ertiga",
    name: "Maruti Ertiga",
    className: "MPV",
    seats: 6,
    luggage: 3,
    ac: true,
    /** @placeholder */
    perKm: 16,
    /** @placeholder */
    minKmPerDay: 250,
    /** @placeholder */
    driverAllowance: 400,
    blurb: "Extra row and boot space without stepping up to a full SUV.",
    bestFor: ["Families of five or six", "Temple circuits", "Day trips"],
    available: true,
  },
  {
    id: "innova-crysta",
    name: "Toyota Innova Crysta",
    className: "Premium SUV",
    seats: 6,
    luggage: 4,
    ac: true,
    /** @placeholder */
    perKm: 19,
    /** @placeholder */
    minKmPerDay: 300,
    /** @placeholder */
    driverAllowance: 500,
    blurb: "The long-distance option. Quietest ride on the ghat road up to Tirumala.",
    bestFor: ["Outstation trips", "Elderly passengers", "Multi-day packages"],
    available: true,
  },
  {
    id: "tempo-traveller",
    name: "Tempo Traveller",
    className: "Minibus",
    seats: 12,
    luggage: 8,
    ac: true,
    /** @placeholder */
    perKm: 24,
    /** @placeholder */
    minKmPerDay: 300,
    /** @placeholder */
    driverAllowance: 600,
    blurb: "Group pilgrimages and extended family trips, in one vehicle.",
    bestFor: ["Groups of 8–12", "Temple tour groups", "Corporate travel"],
    available: true,
  },
];

/**
 * @placeholder — charges policy. This is FAQ-adjacent and customers argue about
 * it, so confirm before launch (CONTENT-BRIEF.md §4).
 */
export const fleetTerms = {
  tollsIncluded: false,
  parkingIncluded: false,
  permitsIncluded: false,
  nightChargeAfter: "11:00 pm",
  /** @placeholder */
  nightCharge: 300,
};
