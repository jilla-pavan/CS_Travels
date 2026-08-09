/**
 * The 9-temple, 2-day circuit.
 *
 * REAL CONTENT, RESCUED. Every temple, location and day split below came from
 * `src/components/Itinerary.jsx` in the previous build — a fully written
 * itinerary that was never imported anywhere, so it rendered on no page. It is
 * the most distinctive product in this repo and it was invisible.
 *
 * Two things were dropped in the move:
 *   · the hardcoded dates 03/05/2026 and 04/05/2026 — a fixed departure that
 *     silently expires. Ask whether it's a scheduled tour or date-agnostic
 *     (CONTENT-BRIEF.md §6); until then it reads as a route, not a departure.
 *   · the crimson #C8102E palette, left over from an abandoned design direction.
 *
 * @placeholder: `price` and `pickup` — the circuit had no price attached.
 */

export const templeCircuit = {
  title: "The nine-temple circuit",
  subtitle: "2 days · 1 night",
  /** @placeholder */ price: "₹16,500",
  /** @placeholder */ pickup: "Pickup and drop at Tirupati",
  summary:
    "Kanchipuram, Tiruttani and Srikalahasti in one run — including Gudimallam and Ardhagiri, which most operators skip because they're off the main road.",
  days: [
    {
      id: "day-1",
      label: "Day 1",
      route: "Tirupati → Kanchipuram",
      overnight: "Night stay in Kanchipuram",
      temples: [
        { name: "Kanipakam Vinayaka Temple", place: "Kanipakam" },
        { name: "Ardhagiri Anjaneya Swamy Temple", place: "Ardhagiri" },
        { name: "Sripuram Golden Temple", place: "Vellore" },
        { name: "Kamakshi Amman Temple", place: "Kanchipuram" },
        { name: "Ekambareswarar Temple", place: "Kanchipuram" },
        { name: "Varadaraja Perumal Temple", place: "Kanchipuram" },
      ],
    },
    {
      id: "day-2",
      label: "Day 2",
      route: "Kanchipuram → Tirupati",
      overnight: "Drop at Tirupati",
      temples: [
        { name: "Tiruttani Subramanya Swamy Temple", place: "Tiruttani" },
        { name: "Gudimallam Parasurameswara Temple", place: "Gudimallam" },
        { name: "Sri Kalahasteeswara Temple", place: "Srikalahasti" },
      ],
    },
  ],
};
