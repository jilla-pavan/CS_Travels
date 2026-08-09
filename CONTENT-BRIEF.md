# CS Travels Tirupati — Content Brief

Fill this in and I build with real content only. Nothing gets fabricated.

**How to use:** Answer inline, under each prompt. Anything marked **[BLOCKING]** stops that
section from being built at all. Anything marked **[VERIFY]** is already in the code but has no
source — I need you to confirm or correct it, because some of it will end up in Google-facing
schema markup where invented numbers are a real penalty risk.

Leave anything you don't have as `SKIP` and I'll cut that element from the design rather than
fake it.

---

## 1. Business identity

| Field | Current value in code | Your answer |
|---|---|---|
| Legal / trading name | CS Travels Tirupati | |
| Tagline | "Travel With Devotion & Comfort" | |
| Year founded | *not in code* **[BLOCKING for "X years in service"]** | |
| Owner / proprietor name | *not in code* | |
| GST / registration no. (optional, adds trust) | *not in code* | |

**Positioning — pick one, or write your own.** This drives every headline on the site:

- [ ] The *safest* choice for families and elderly pilgrims
- [ ] The *premium* choice — best vehicles, best drivers
- [ ] The *local expert* — we know Tirumala darshan timings better than anyone
- [ ] Other: ______

---

## 2. Contact **[BLOCKING — the Contact section and LocalBusiness schema cannot be built without §2]**

| Field | Current value in code | Your answer |
|---|---|---|
| Primary phone | +91 93474 72307 | |
| Second phone (optional) | — | |
| WhatsApp number | 919347472307 (same as above) | |
| Email | *none anywhere in the codebase* | |
| Full street address | only "Tirupati, Andhra Pradesh" | |
| Pincode | *not in code* | |
| Google Maps link or lat/long | *none — no map on the site today* | |
| Working hours | *not in code* (site claims 24/7 — literal?) | |

**Social profiles** — paste URLs or write SKIP:

- Google Business Profile: ______  ← **most important, see §12**
- Instagram: ______
- Facebook: ______
- YouTube: ______

---

## 3. Services

Your brief lists ten services. Only temple tours and point-to-point transfers have any data in
the repo. For **each** service below: keep it or cut it, and give me a "from ₹" price if one
exists.

| Service | Keep? | From price | One-line description in your words |
|---|---|---|---|
| Tirupati local sightseeing | | | |
| Tirumala darshan packages | | | |
| Taxi booking | | | |
| Airport pickup & drop | | | |
| Outstation trips | | | |
| Temple tour packages | | | |
| Family tours | | | |
| Corporate travel | | | |
| Luxury car rentals | | | |
| Custom tour packages | | | |

**Darshan tickets — important.** Do you actually *arrange* darshan tickets, or only transport
people who have their own? This is the single most-asked question by pilgrims and it needs a
precise, honest answer in the FAQ. Overclaiming here damages trust badly.

> Your answer:

---

## 4. Fleet **[BLOCKING — the pinned horizontal Fleet section cannot be built without this]**

One row per vehicle you actually operate.

| Vehicle | Seats (excl. driver) | Luggage | AC? | Per-km rate | Min km/day | Driver bata/day | Photo? |
|---|---|---|---|---|---|---|---|
| e.g. Innova Crysta | 6 | 4 bags | Yes | ₹__ | __ | ₹__ | |
| | | | | | | | |
| | | | | | | | |

The code mentions an **MG Hector** in the package features — is that part of the fleet?

Also needed:
- Are toll, parking and permit charges **included** in the per-km rate, or extra? (Goes in FAQ.)
- Night-driving charge, if any: ______

---

## 5. Packages

Currently three, and each is accidentally duplicated in the data file — I'm fixing that.

**Confirm or correct these prices:**

| Package | Duration | Price in code | Correct? |
|---|---|---|---|
| Tirupati Temple Journey | 2D/1N | ₹14,100 | |
| Kanchipuram Temple Escape | 1 Day | ₹11,800 | |
| Family Pilgrimage Package | 3D/2N | ₹19,900 | |

For each: **what's included and what isn't?** Right now the cards say "Private MG Hector SUV",
"Priority route planning", "Comfort-first itinerary" — that's marketing language, not
inclusions. Pilgrims book on specifics. I need, per package:

- Included: vehicle / fuel / driver / tolls / hotel / meals / darshan tickets — which?
- **Not** included:
- Is the price per vehicle or per person?

> Your answers:

---

## 6. The 9-temple circuit — a decision I need from you

`src/components/Itinerary.jsx` is a fully-built 2-day, 9-temple route that **is not rendered
anywhere on the site.** It's the strongest content in the repo and it's invisible.

Day 1 — Kanipakam Vinayaka · Ardhagiri Anjaneya · Sripuram Golden Temple · Kamakshi Amman ·
Ekambareswarar · Varadaraja Perumal → overnight Kanchipuram
Day 2 — Tiruttani Subramanya · Gudimallam Parasurameswara · Sri Kalahasteeswara → drop Tirupati

It also has hardcoded dates `03/05/2026` and `04/05/2026`.

**Decide:**
- [ ] Make it a real, bookable 4th package (I'd recommend this — it's your most distinctive offer)
- [ ] Keep it as a showcase section, not bookable
- [ ] Cut it

If bookable: **price?** ______ And are those dates a fixed departure, or should I make it
date-agnostic? ______

---

## 7. Destinations & fares

Confirmed from code — **correct anything that's out of date:**

| Route from Tirupati | 4+1 | 6+1 | Still accurate? |
|---|---|---|---|
| Railway Station | ₹800 | ₹1,000 | |
| Airport | ₹1,300 | ₹1,500 | |
| Tirumala | ₹3,000 | ₹3,500 | |
| Srikalahasti | ₹3,500 | ₹4,000 | |
| Kanipakam | ₹4,000 | ₹4,500 | |
| Arunachalam | ₹10,500 | ₹12,500 | |

Your brief also names **Kalyani Dam, Chandragiri Fort and Talakona** — these have no fares and
no photos in the repo. Add them?

| Destination | 4+1 | 6+1 | Distance | Travel time | Photo? |
|---|---|---|---|---|---|
| Kalyani Dam | | | | | |
| Chandragiri Fort | | | | | |
| Talakona | | | | | |

Any high-value outstation routes worth adding? (Tirupati→Bangalore and Tirupati→Chennai are
strong local-search terms.)

> Your answer:

---

## 8. Photography **[BLOCKING for the visual ambition — read this one]**

This is the biggest single risk to the brief. You've asked for an Awwwards-level cinematic site.
The repo currently has four 2.3MB flat PNG backgrounds, six small temple JPEGs (8–16KB — far too
low-res to use large), and three package images hotlinked from Unsplash. **No amount of code
craft produces a premium result on top of low-resolution stock.**

What I need — tick what you can supply:

- [ ] Hero image: one landscape shot, **2400px wide minimum**, of Tirumala hills / temple /
      the ghat road. This is the first thing every visitor sees.
- [ ] Vehicle photos: each fleet vehicle, clean, ideally 3/4 angle, daylight, uncluttered background
- [ ] Real customer/trip photos for the Gallery — **[BLOCKING for the Gallery section]**
      How many do you have? ______
- [ ] Owner / driver team photos (enormous trust signal for family bookings)
- [ ] Office or vehicle-fleet photo
- [ ] Logo as **SVG or high-res PNG** — the current 1.6MB PNG is unusable at these quality gates

**If you have none of the above**, tell me and I'll recommend a licensed stock route with
specific picks, or a shot-list you can hand to a local photographer. Say the word — but be aware
that "cinematic" and "stock temple photos" are in tension, and I'd rather tell you now than
after ten sections are built.

---

## 9. Testimonials & trust **[VERIFY — these end up in Google-facing schema]**

Four reviews are in the code: Ramesh Kumar (Hyderabad, 5★), Anitha Reddy (Chennai, 5★),
Suresh Babu (Bangalore, 4★), Lakshmi Devi (Vijayawada, 5★).

- Are these **real customers**? If invented, I must not put them in Review schema — Google
  penalizes fabricated review markup, and it's the kind of thing that gets a local business
  delisted.

> Your answer:

- Your **actual** Google rating and review count: ______ / ______ reviews
  *(The site currently displays "4★" with no source. I will not emit an `aggregateRating` in
  schema without a real, verifiable number.)*
- Can you export 6–10 more real Google reviews? Name + city + text is enough.
- Any video testimonials? ______

---

## 10. Stats **[VERIFY — all four are currently unsourced]**

| Claim on site | Real number |
|---|---|
| 500+ Happy Travelers | |
| 10+ Tour Packages | |
| 10+ Routes | |
| 24/7 Customer Support — literally 24/7, or "till late"? | |

Better stats if you have them: total trips completed, years operating, number of drivers,
repeat-customer rate.

---

## 11. FAQ **[BLOCKING for the FAQ section and FAQPage schema]**

Your brief specified these. I need **your** answers — I will not write plausible-sounding
answers to operational questions and pass them off as policy:

1. Do you arrange Tirumala darshan tickets, or must customers book their own?
2. How much luggage fits per vehicle class?
3. Do you operate night travel? Any surcharge?
4. Cancellation policy — how far ahead, what refund?
5. Payment methods? Do you take UPI / cards / bank transfer? Advance required?
6. **NRI / international payment** — how do overseas customers pay?
7. Are tolls, parking and permits included or extra?
8. Do you provide child seats?
9. Can the driver wait during darshan? Waiting charges?
10. What if a trip runs longer than planned?

> Your answers:

Plus: the 3 questions customers actually ask you most on WhatsApp that aren't on this list.

---

## 12. SEO

Target terms from your brief: *Tirupati taxi service · Tirumala darshan package · Tirupati
airport cab · Tirupati to Bangalore taxi · Tirupati sightseeing package*.

- Do you have a **Google Business Profile**? Link it — it's the highest-leverage thing for a
  local travel business and it feeds the LocalBusiness schema directly.
- Service areas to list (e.g. Tirupati, Tirumala, Chittoor, Renigunta, Srikalahasti): ______
- Languages your drivers speak: ______  *(genuine differentiator for NRI and North Indian visitors)*
- Preferred domain, if you have one: ______

---

## 13. Two loose ends

1. **Footer credit.** `Designed by Pavan Jilla` linking to a LinkedIn profile is in the current
   footer, and the repo lives at `github.com/jilla-pavan/CS_Travels`. Keep it, change it, or
   remove it? Not my call to make silently.

2. **Dark mode.** Your brief says implement if it doesn't compromise the timeline. This design
   is dark-first, so a light mode is real extra work for arguably little gain here. My
   recommendation: skip it. Override me if you disagree.

---

## What I'll do while you fill this in

Section 0 of the build — the foundation — needs none of the above:

- Tailwind token config: full brand palette, 9-step grey scale, fluid `clamp()` type scale,
  radii, shadows, easing curves
- Aeonik `@font-face` setup with Satoshi fallback and a documented drop-in path
- The single motion-tokens file (durations, easings, stagger, distance) every section reuses
- Lenis + GSAP/ScrollTrigger + `prefers-reduced-motion` provider
- Component library: Button, Card, Input, Select, Modal, Accordion, Tooltip, Badge, Tabs,
  Carousel, Lightbox — each with hover, focus-visible, active, disabled, loading states
- Image pipeline (`vite-imagetools`), routing + legacy `#/details/` redirect shim

Say go and I'll start there while you gather content.
