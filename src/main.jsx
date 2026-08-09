import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { createRouter } from "./router";
import { MotionProvider } from "./providers/MotionProvider";
import { redirectLegacyHashRoutes } from "./lib/legacy-redirect";
import "./index.css";

/* Rewrite any legacy `#/details/<slug>` URL first, so an old link resolves
   straight to the real route with no intermediate render. Order is load-bearing:
   the router snapshots window.location when it's created, which is why that
   happens on the next line and not at import time. */
redirectLegacyHashRoutes();

const router = createRouter();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MotionProvider>
      <RouterProvider router={router} />
    </MotionProvider>
  </StrictMode>,
);
