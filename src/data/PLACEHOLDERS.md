# Placeholder data — where to edit

Everything invented lives in this folder, marked `@placeholder` in the source.
Update these files and the whole site updates. No content is hardcoded in components.

Find every remaining one at any time:

```bash
grep -rn "@placeholder" src/
```

| File | What's invented | What's real |
|---|---|---|
| `fleet.js` | every vehicle, rate, capacity, luggage figure | nothing |
| `services.js` | descriptions, "from" prices | the ten service names came from your brief |
| `faqs.js` | **all answers** | the questions came from your brief |
| `company.js` | email, address, hours, socials, founding year, stats | phone + WhatsApp number, city |
| `reviews.js` | possibly the four reviews — unconfirmed | — |
| `tourPackages.js` | package images (Unsplash) | titles, prices, itineraries, fares |

## Two that need care before launch

**FAQ answers (`faqs.js`)** — these read as company policy. Cancellation terms,
darshan-ticket handling and payment rules are the ones customers act on and
argue about later. Every answer is currently a plausible guess.

**Fleet rates (`fleet.js`)** — per-km rates and minimum-km-per-day are what a
customer will hold you to. All invented.

## Deliberately still empty

`aggregateRating` and `Review` schema are **not emitted anywhere**, and the
`@placeholder` stats are not marked up either. Fabricated review structured data
is a documented cause of Google penalising and delisting local businesses — it's
the one place where a placeholder does real damage, so those stay out until the
numbers are confirmed. On-page text is safe and reversible; structured data
submitted to Google is not.

See `../../CONTENT-BRIEF.md` for the full questionnaire.
