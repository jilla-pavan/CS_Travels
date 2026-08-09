import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Eyebrow } from "../components/ui/Badge";
import { Reveal } from "../components/ui/Reveal";
import { PHONE_DISPLAY, PHONE_HREF } from "../lib/utils";

/**
 * 404.
 *
 * Built on the new component library — the first page in the revamped system.
 * A dead end is still a conversion opportunity for a business that runs on phone
 * calls, so the page offers a route back and a way to talk to someone.
 */
export default function NotFound() {
  return (
    /* <section>, not <main> — this renders inside the layout's <main>, and two
       main landmarks in one document is invalid and confuses screen readers. */
    <section className="grain relative flex min-h-screen items-center justify-center overflow-hidden bg-ink-950 px-6">
      <div className="pointer-events-none absolute inset-0 bg-ink-mesh" />

      <Reveal className="relative z-raised mx-auto max-w-xl text-center">
        <Eyebrow>Page not found</Eyebrow>

        <h1 className="mt-6 text-h1 text-fg">
          This route doesn&apos;t exist
        </h1>

        <p className="mx-auto mt-5 max-w-md text-body-lg text-fg-secondary">
          The page you were looking for has moved or never existed. Our packages
          and fares are all still here.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="primary" size="lg">
            <Link to="/">Back to home</Link>
          </Button>

          <Button asChild variant="ghost" size="lg">
            <a href={PHONE_HREF}>
              <Phone size={16} aria-hidden="true" />
              {PHONE_DISPLAY}
            </a>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
