import { Link } from "react-router-dom";
import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";
import { Picture } from "../ui/Image";
import { company } from "../../data/company";
import { tourPackages } from "../../data/tourPackages";
import { cn, whatsappLink } from "../../lib/utils";
import logo from "../../assets/CS_Travel_Logo.png?preset=logo";

const SECTION_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Packages", href: "/#packages" },
  { label: "Fleet", href: "/#fleet" },
  { label: "Destinations", href: "/#destinations" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "FAQ", href: "/#faq" },
];

/**
 * Brand marks as inline SVG.
 *
 * lucide-react v1 removed Instagram/Facebook/Youtube — brand logos were dropped
 * from the icon set over trademark concerns, and importing them now fails the
 * build outright rather than falling back.
 *
 * These are minimal outline versions drawn to match the stroke weight of the
 * lucide icons beside them, so the footer row stays visually consistent.
 */
function SocialIcon({ name, ...props }) {
  const common = {
    width: 17,
    height: 17,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    ...props,
  };

  if (name === "instagram") {
    return (
      <svg {...common}>
        <rect x="2" y="2" width="20" height="20" rx="5.5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.6" cy="6.4" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (name === "facebook") {
    return (
      <svg {...common}>
        <path d="M14.5 8.5h2.2V5.4h-2.6c-2.4 0-3.9 1.5-3.9 4v2.1H8v3.1h2.2V21h3.2v-6.4h2.4l.4-3.1h-2.8V9.7c0-.8.3-1.2 1.1-1.2Z" />
      </svg>
    );
  }

  if (name === "youtube") {
    return (
      <svg {...common}>
        <rect x="2" y="5.5" width="20" height="13" rx="4" />
        <path d="M10.4 9.6l4.6 2.4-4.6 2.4V9.6Z" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  return null;
}

const SOCIAL_KEYS = ["instagram", "facebook", "youtube"];

export default function Footer() {
  /* Empty strings in company.socials mean "not supplied" — filtered out rather
     than rendered as links to nowhere. @placeholder, see data/company.js. */
  const socials = Object.entries(company.socials).filter(
    ([key, url]) => url && SOCIAL_KEYS.includes(key),
  );

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-ink-950">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ink-mesh opacity-60" />

      <div className="relative z-raised mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          {/* ----------------------------------------------------- brand */}
          <div className="min-w-0">
            <Link to="/" className="flex items-center gap-3" aria-label={`${company.name} — home`}>
              <Picture
                source={logo}
                alt=""
                sizes="48px"
                className="h-12 w-12 shrink-0"
                imgClassName="object-contain"
              />
              <span>
                <span className="block text-body-sm font-medium tracking-[0.2em] text-fg">
                  CS TRAVELS
                </span>
                <span className="mt-0.5 block text-[0.5625rem] uppercase tracking-[0.42em] text-gold-400">
                  Tirupati
                </span>
              </span>
            </Link>

            <p className="mt-6 max-w-xs text-body-sm text-fg-muted">
              Private cabs, darshan packages and temple circuits across Tirupati
              and South India. Fixed fares, agreed before you travel.
            </p>

            {socials.length > 0 && (
              <ul className="mt-6 flex gap-2">
                {socials.map(([key, url]) => (
                  <li key={key}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-fg-muted transition-colors duration-micro ease-state hover:border-gold-500/40 hover:text-gold-300"
                    >
                      <SocialIcon name={key} />
                      <span className="sr-only">
                        {company.name} on {key}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* --------------------------------------------------- explore */}
          <nav aria-labelledby="footer-explore" className="min-w-0">
            <h2 id="footer-explore" className="text-overline uppercase text-fg-muted">
              Explore
            </h2>
            <ul className="mt-5 space-y-3">
              {SECTION_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-body-sm text-fg-secondary transition-colors duration-micro ease-state hover:text-gold-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* -------------------------------------------------- packages */}
          <nav aria-labelledby="footer-packages" className="min-w-0">
            <h2 id="footer-packages" className="text-overline uppercase text-fg-muted">
              Packages
            </h2>
            <ul className="mt-5 space-y-3">
              {tourPackages.map((pkg) => (
                <li key={pkg.slug}>
                  <Link
                    to={`/packages/${pkg.slug}`}
                    className="text-body-sm text-fg-secondary transition-colors duration-micro ease-state hover:text-gold-300"
                  >
                    {pkg.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* --------------------------------------------------- contact */}
          <div className="min-w-0">
            <h2 className="text-overline uppercase text-fg-muted">Contact</h2>

            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href={company.phoneHref}
                  className="group flex items-start gap-3 text-body-sm text-fg-secondary transition-colors duration-micro ease-state hover:text-gold-300"
                >
                  <Phone size={15} aria-hidden="true" className="mt-1 shrink-0 text-gold-500" />
                  {company.phone}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink("Hi CS Travels, I'd like to enquire about a trip.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-body-sm text-fg-secondary transition-colors duration-micro ease-state hover:text-gold-300"
                >
                  <MessageCircle size={15} aria-hidden="true" className="mt-1 shrink-0 text-gold-500" />
                  WhatsApp
                </a>
              </li>
              <li>
                {/* @placeholder — data/company.js */}
                <a
                  href={`mailto:${company.email}`}
                  className="flex items-start gap-3 break-all text-body-sm text-fg-secondary transition-colors duration-micro ease-state hover:text-gold-300"
                >
                  <Mail size={15} aria-hidden="true" className="mt-1 shrink-0 text-gold-500" />
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-body-sm text-fg-muted">
                <MapPin size={15} aria-hidden="true" className="mt-1 shrink-0 text-gold-500" />
                {/* @placeholder — street address */}
                <span>
                  {company.street}
                  <br />
                  {company.city}, {company.state} {company.postalCode}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 hairline" />

        <div className={cn("mt-8 flex flex-col gap-4", "sm:flex-row sm:items-center sm:justify-between")}>
          <p className="text-caption text-fg-muted">
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>

          {/*
            Attribution carried over from the previous build. CONTENT-BRIEF.md
            §13 asks whether to keep it — left in place until you decide, since
            removing someone's credit without being asked isn't mine to do.
          */}
          <p className="text-caption text-fg-muted">
            Designed by{" "}
            <a
              href="https://www.linkedin.com/in/jilla-pavan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-400 underline-offset-4 hover:underline"
            >
              Pavan Jilla
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
