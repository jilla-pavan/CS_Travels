import { Outlet, ScrollRestoration } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { MobileActionBar } from "./components/layout/MobileActionBar";
import Footer from "./components/layout/Footer";
import { TooltipProvider } from "./components/ui/Tooltip";

/**
 * Root layout.
 *
 * Nav, footer and floating actions are shared across every route, so they live
 * here rather than being repeated per page (the old build rendered them twice,
 * once in each branch of a ternary).
 */
export default function App() {
  return (
    <TooltipProvider delayDuration={200} skipDelayDuration={400}>
      {/* Skip link. First thing in the tab order, visible only on focus —
          without it, keyboard users traverse the entire nav on every page. */}
      <a
        href="#main"
        className="sr-only rounded-full bg-gold-500 px-5 py-3 text-caption font-medium uppercase tracking-[0.14em] text-ink-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-loader"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Outlet />
      </main>

      <Footer />
      <MobileActionBar />

      {/* Restores scroll position on back/forward and resets it to the top on
          forward navigation. The old hash router did neither. */}
      <ScrollRestoration />
    </TooltipProvider>
  );
}
