import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import PackageDetail from "./pages/PackageDetail";
import NotFound from "./pages/NotFound";
import { tourPackages } from "./data/tourPackages";

/**
 * Route definitions, kept as a plain data array.
 *
 * The shape matters: it's what a prerenderer (vite-react-ssg) consumes to emit
 * static HTML per route at build time, which is how this SPA gets crawlable
 * markup, per-package meta, and working WhatsApp/Facebook link previews.
 * Wiring that up is step 10 of the build; the structure is in place now so it's
 * a config change rather than a refactor.
 */
export const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "packages/:slug", element: <PackageDetail /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

/** Every path the prerenderer should emit. */
export const staticPaths = [
  "/",
  ...tourPackages.map((pkg) => `/packages/${pkg.slug}`),
];

/**
 * Created lazily, on purpose.
 *
 * `createBrowserRouter` snapshots `window.location` the moment it runs. As a
 * top-level constant it executed during module evaluation — which, because ES
 * imports are hoisted above statements, happened BEFORE the legacy-hash shim in
 * main.jsx had a chance to rewrite the URL. The address bar showed the new path
 * while the router had already resolved the old one, so every legacy link
 * silently landed on the home page.
 *
 * Calling this after the rewrite is what makes the redirect actually work.
 */
export const createRouter = () => createBrowserRouter(routes);
