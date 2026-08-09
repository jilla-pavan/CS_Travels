
export const tourPackages = [
  {
    slug: "tirupati-temple-journey",
    title: "Tirupati Temple Journey",
    subtitle: "2 Days / 1 Night",
    image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b",
    tag: "Best Seller",
    price: "₹14,100",
    description:
      "A signature pilgrimage route combining sacred darshan, private SUV travel, and premium comfort.",
    features: [
      "Private MG Hector SUV",
      "Priority route planning",
      "Comfort-first itinerary",
    ],
    itinerary: [
      "Day 1 — Tirupati darshan, Kanipakam Ganapathi Temple, overnight in Kanchipuram.",
      "Day 2 — Kanchipuram temple tour with Ekambareswarar, Kamakshi Amman, and return to Tirupati.",
    ],
  },
  {
    slug: "kanchipuram-temple-escape",
    title: "Kanchipuram Temple Escape",
    subtitle: "1 Day",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    tag: "Popular",
    price: "₹11,800",
    description:
      "A focused temple pilgrimage through Kanchipuram's historic spiritual landmarks with luxury travel.",
    features: [
      "Historic temple visits",
      "Dedicated driver",
      "Flexible pickup/drop-off",
    ],
    itinerary: [
      "Morning — pickup from Tirupati or local hotel.",
      "Daytime — visit Kanchipuram's Kamakshi Amman, Ekambareswarar and Varadaraja Perumal temples.",
      "Evening — drop back at Tirupati or arranged hotel.",
    ],
  },
  {
    slug: "family-pilgrimage-package",
    title: "Family Pilgrimage Package",
    subtitle: "3 Days / 2 Nights",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963",
    tag: "Family",
    price: "₹19,900",
    description:
      "A relaxed family-friendly pilgrimage package with premium stays and seamless temple travel.",
    features: [
      "Comfortable family itinerary",
      "Private SUV & driver",
      "Smooth daily planning",
    ],
    itinerary: [
      "Day 1 — Tirupati pickup, temple darshan, transfer to Kanchipuram.",
      "Day 2 — Kanchipuram full temple day with luxury leisure breaks.",
      "Day 3 — return travel to Tirupati with optional temple stop.",
    ],
  },
];

/**
 * Look a package up by slug.
 *
 * Prices, inclusions and the "MG Hector" reference are all pending confirmation —
 * see CONTENT-BRIEF.md §5. Nothing here has been invented, but nothing here has
 * been verified either.
 */
export const getPackageBySlug = (slug) =>
  tourPackages.find((pkg) => pkg.slug === slug);

