/**
 * Legacy hash-route redirect.
 *
 * The previous build routed package pages entirely in the hash:
 *
 *     /#/details/tirupati-temple-journey
 *
 * The revamp uses real paths (`/packages/tirupati-temple-journey`) because hash
 * routes can't be prerendered, can't carry per-page meta, and are invisible to
 * crawlers and to WhatsApp's link preview — which matters a great deal for a
 * business whose customers share package links in chat.
 *
 * Anyone holding an old link still lands in the right place. This runs before
 * React mounts (see main.jsx) so there's no flash of the wrong page, and it uses
 * `replaceState` so the dead URL doesn't end up in the back-button history.
 *
 * Safe to delete once the old URLs have provably stopped appearing in analytics.
 */

const LEGACY_PREFIX = "#/details/";

export function redirectLegacyHashRoutes() {
  const { hash } = window.location;
  if (!hash.toLowerCase().startsWith(LEGACY_PREFIX)) return;

  const slug = hash.slice(LEGACY_PREFIX.length).replace(/\/+$/, "");
  if (!slug) return;

  window.history.replaceState(null, "", `/packages/${slug.toLowerCase()}`);
}
