import TirupatiStation from "../assets/Temples/Tirupathi_Station.jpg";
import Airport from "../assets/Temples/Tirupathi_Airport.jpg";
import Kanipakam from "../assets/Temples/Kanipakam.jpg";
import Srikalahasti from "../assets/Temples/Srikalahasthi.jpg";
import Tirumala from "../assets/Temples/Thirumala.jpg";
import Arunachalam from "../assets/Temples/Arunachalam.jpg";

/**
 * Destinations and point-to-point fares.
 *
 * REAL: every `fare4` / `fare6` on the first six entries, and their images.
 *       These came from the previous site and are the strongest content here.
 *
 * @placeholder: all `distanceKm`, `duration` and `blurb` values — none existed
 *       in the repo. Distances are approximate road distances from Tirupati and
 *       should be checked against what you actually quote.
 *
 * @placeholder: the last three (Kalyani Dam, Chandragiri Fort, Talakona) are
 *       from the brief's destination list. They have NO fares and NO images —
 *       both invented and absent respectively. `image: null` renders a
 *       typographic plate rather than faking a photo.
 *
 * `type` drives the category filter.
 */
export const destinations = [
  {
    slug: "tirumala",
    name: "Tirumala",
    type: "temple",
    /** @placeholder */ distanceKm: 22,
    /** @placeholder */ duration: "45 min",
    /** @placeholder */
    blurb: "The ghat road up to the temple. Early-morning starts are standard.",
    fare4: "₹3,000",
    fare6: "₹3,500",
    image: Tirumala,
  },
  {
    slug: "tirupati-airport",
    name: "Tirupati Airport",
    type: "transfer",
    /** @placeholder */ distanceKm: 15,
    /** @placeholder */ duration: "30 min",
    /** @placeholder */
    blurb: "Renigunta airport pickup and drop, tracked against your flight.",
    fare4: "₹1,300",
    fare6: "₹1,500",
    image: Airport,
  },
  {
    slug: "tirupati-railway-station",
    name: "Railway Station",
    type: "transfer",
    /** @placeholder */ distanceKm: 4,
    /** @placeholder */ duration: "15 min",
    /** @placeholder */
    blurb: "Station pickup with a name board, any train, any hour.",
    fare4: "₹800",
    fare6: "₹1,000",
    image: TirupatiStation,
  },
  {
    slug: "srikalahasti",
    name: "Srikalahasti",
    type: "temple",
    /** @placeholder */ distanceKm: 37,
    /** @placeholder */ duration: "1 hr",
    /** @placeholder */
    blurb: "The Vayu lingam temple, usually paired with a Tirumala darshan day.",
    fare4: "₹3,500",
    fare6: "₹4,000",
    image: Srikalahasti,
  },
  {
    slug: "kanipakam",
    name: "Kanipakam",
    type: "temple",
    /** @placeholder */ distanceKm: 75,
    /** @placeholder */ duration: "1 hr 45 min",
    /** @placeholder */
    blurb: "Varasiddhi Vinayaka Swamy temple, an easy half-day from Tirupati.",
    fare4: "₹4,000",
    fare6: "₹4,500",
    image: Kanipakam,
  },
  {
    slug: "arunachalam",
    name: "Arunachalam",
    type: "temple",
    /** @placeholder */ distanceKm: 230,
    /** @placeholder */ duration: "4 hr 30 min",
    /** @placeholder */
    blurb: "Tiruvannamalai. A full-day round trip, or an overnight if you prefer.",
    fare4: "₹10,500",
    fare6: "₹12,500",
    image: Arunachalam,
  },

  /* ---- from the brief's list; no fares and no photography exist ---- */
  {
    slug: "chandragiri-fort",
    name: "Chandragiri Fort",
    type: "sightseeing",
    /** @placeholder */ distanceKm: 12,
    /** @placeholder */ duration: "25 min",
    /** @placeholder */
    blurb: "Vijayanagara-era fort and palace museum, a short run from the city.",
    /** @placeholder */ fare4: "₹1,200",
    /** @placeholder */ fare6: "₹1,500",
    image: null,
  },
  {
    slug: "kalyani-dam",
    name: "Kalyani Dam",
    type: "sightseeing",
    /** @placeholder */ distanceKm: 20,
    /** @placeholder */ duration: "40 min",
    /** @placeholder */
    blurb: "Reservoir at the foot of the hills — a quiet evening stop.",
    /** @placeholder */ fare4: "₹1,400",
    /** @placeholder */ fare6: "₹1,700",
    image: null,
  },
  {
    slug: "talakona",
    name: "Talakona Falls",
    type: "sightseeing",
    /** @placeholder */ distanceKm: 55,
    /** @placeholder */ duration: "1 hr 30 min",
    /** @placeholder */
    blurb: "The tallest waterfall in Andhra Pradesh, inside Sri Venkateswara park.",
    /** @placeholder */ fare4: "₹3,200",
    /** @placeholder */ fare6: "₹3,800",
    image: null,
  },
];

export const destinationTypes = [
  { value: "all", label: "All" },
  { value: "temple", label: "Temples" },
  { value: "transfer", label: "Transfers" },
  { value: "sightseeing", label: "Sightseeing" },
];
