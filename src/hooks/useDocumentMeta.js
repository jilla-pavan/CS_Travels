import { useEffect } from "react";

/**
 * Per-route document title, description and JSON-LD.
 *
 * A deliberately tiny replacement for react-helmet — the site has two route
 * shapes (home, package detail) and adding a head-management library for that
 * is more dependency than the problem deserves.
 *
 * ⚠️ LIMITATION, stated plainly: this runs on the client. Googlebot renders JS
 * and will see it, but social crawlers (WhatsApp, Facebook, Twitter, Slack) do
 * NOT execute JavaScript — they read the raw HTML response and stop. So a
 * package link shared on WhatsApp still shows the generic site-level card from
 * index.html, not the package's own.
 *
 * That is only fixed by prerendering each route to static HTML. The routes are
 * already shaped as a data array in router.jsx for exactly that, and
 * `staticPaths` enumerates what to emit — but the build wiring is still to do.
 * For a business whose customers share links in chat, that remains the single
 * highest-value SEO item outstanding.
 */
function setMeta(selector, attr, content) {
  if (!content) return;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    const [name, value] = selector
      .replace(/^meta\[|\]$/g, "")
      .split("=")
      .map((s) => s.replace(/["']/g, ""));
    el.setAttribute(name, value);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, content);
}

export function useDocumentMeta({ title, description, schema } = {}) {
  useEffect(() => {
    const previousTitle = document.title;

    if (title) {
      document.title = title;
      setMeta('meta[property="og:title"]', "content", title);
    }

    if (description) {
      setMeta('meta[name="description"]', "content", description);
      setMeta('meta[property="og:description"]', "content", description);
    }

    /* Route-scoped JSON-LD. Tagged so it can be removed on unmount without
       touching any block rendered by index.html. */
    const nodes = (schema ?? []).map((block) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.routeSchema = "true";
      script.textContent = JSON.stringify(block);
      document.head.appendChild(script);
      return script;
    });

    return () => {
      document.title = previousTitle;
      nodes.forEach((node) => node.remove());
    };
  }, [title, description, schema]);
}
