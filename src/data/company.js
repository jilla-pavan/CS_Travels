/**
 * Company details.
 *
 * REAL: phone, WhatsApp number, city.
 * @placeholder: everything else — email, street address, hours, socials,
 * founding year, and the stats. See data/PLACEHOLDERS.md and CONTENT-BRIEF.md §2.
 *
 * `geo` and `address` feed the LocalBusiness JSON-LD at step 10. That schema is
 * NOT emitted while these are placeholders: a wrong address in structured data
 * sends customers to the wrong place and poisons the Google Business listing.
 */

export const company = {
  name: "CS Travels Tirupati",
  legalName: "CS Travels",
  tagline: "Travel with devotion & comfort",

  /* real */
  phone: "+91 93474 72307",
  phoneHref: "tel:+919347472307",
  whatsapp: "919347472307",
  city: "Tirupati",
  state: "Andhra Pradesh",
  country: "IN",

  /** @placeholder */ email: "bookings@cstravelstirupati.com",
  /** @placeholder */ street: "Near Railway Station Road, Tirupati",
  /** @placeholder */ postalCode: "517501",
  /** @placeholder */ geo: { lat: 13.6288, lng: 79.4192 },
  /** @placeholder */ foundedYear: 2015,

  /** @placeholder — the site claims 24×7; confirm whether that's literal. */
  hours: [
    { days: "Monday – Sunday", time: "Open 24 hours" },
    { days: "Darshan mornings", time: "Pickups from 3:00 am" },
  ],

  /** @placeholder — empty string hides the link rather than rendering a dead one. */
  socials: {
    instagram: "",
    facebook: "",
    youtube: "",
    googleBusiness: "",
  },

  /** @placeholder — displayed, but deliberately NOT emitted as schema. */
  stats: {
    travellers: 500,
    routes: 10,
    yearsActive: new Date().getFullYear() - 2015,
  },

  serviceAreas: [
    "Tirupati",
    "Tirumala",
    "Renigunta",
    "Chittoor",
    "Srikalahasti",
    "Chandragiri",
  ],

  /** @placeholder — a real differentiator for NRI visitors if accurate. */
  languages: ["Telugu", "Tamil", "Hindi", "English", "Kannada"],
};
