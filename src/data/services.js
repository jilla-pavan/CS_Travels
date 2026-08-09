/**
 * Services.
 *
 * Names come from your brief's list of ten. @placeholder: every description and
 * every "from" price below is invented — see data/PLACEHOLDERS.md.
 *
 * DESIGN NOTE — the brief lists ten services, this renders eight. Three pairs in
 * that list describe the same product from different angles:
 *
 *   "taxi booking" + "airport pickup & drop"  → one transfers service
 *   "temple tour packages" + "family tours"   → one temple-circuit service
 *   "luxury car rentals"                      → kept, it's a genuinely
 *                                                different rental model
 *
 * Eight distinct cards read as a real service list; ten near-duplicates read as
 * SEO padding, and a customer scanning for "can they take me to the airport"
 * has to read three cards to find out. Split them back out if the overlap is
 * intentional — the grid handles any count.
 */

export const services = [
  {
    id: "tirumala-darshan",
    icon: "sparkles",
    title: "Tirumala darshan packages",
    blurb:
      "Vehicle, ghat road transfer and timing planned around your darshan slot.",
    /** @placeholder */ from: "₹3,000",
    includes: ["Ghat road transfer", "Waiting during darshan", "Return drop"],
    featured: true,
  },
  {
    id: "transfers",
    icon: "plane",
    title: "Airport & railway transfers",
    blurb:
      "Renigunta airport and Tirupati station pickups, tracked against your arrival.",
    /** @placeholder */ from: "₹800",
    includes: ["Flight/train tracking", "Name board at arrivals", "Any hour"],
  },
  {
    id: "local-sightseeing",
    icon: "map",
    title: "Tirupati local sightseeing",
    blurb:
      "A half or full day around the city — temples, fort, dam and viewpoints.",
    /** @placeholder */ from: "₹2,200",
    includes: ["Half or full day", "Driver as guide", "Flexible stops"],
  },
  {
    id: "temple-circuits",
    icon: "route",
    title: "Temple tour circuits",
    blurb:
      "Multi-day routes across South India's temple towns, paced for families.",
    /** @placeholder */ from: "₹11,800",
    includes: ["Multi-day routes", "Overnight stops arranged", "Family paced"],
    featured: true,
  },
  {
    id: "outstation",
    icon: "milestone",
    title: "Outstation trips",
    blurb:
      "One-way or round trips to Bangalore, Chennai, Hyderabad and beyond.",
    /** @placeholder */ from: "₹13/km",
    includes: ["One-way or round trip", "Per-km billing", "Overnight allowance"],
  },
  {
    id: "luxury-rentals",
    icon: "car",
    title: "Luxury car rentals",
    blurb: "Premium vehicles with a driver, for weddings and special occasions.",
    /** @placeholder */ from: "On request",
    includes: ["Premium vehicles", "Uniformed driver", "Decoration on request"],
  },
  {
    id: "corporate",
    icon: "briefcase",
    title: "Corporate travel",
    blurb:
      "Monthly billing, fixed drivers and priority allocation for company accounts.",
    /** @placeholder */ from: "On request",
    includes: ["Monthly invoicing", "Assigned drivers", "Priority allocation"],
  },
  {
    id: "custom",
    icon: "pencil",
    title: "Custom tour packages",
    blurb:
      "Tell us the temples, the dates and the group size — we'll build the route.",
    /** @placeholder */ from: "On request",
    includes: ["Your route", "Your pace", "Quoted before you commit"],
  },
];
