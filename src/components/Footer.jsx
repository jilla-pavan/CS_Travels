import { MapPin, ArrowUpRight } from "lucide-react";
import logo from "../assets/CS_Travel_Logo.png";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black text-white">
      {/* TOP DIVIDER */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* BRAND */}
        <div className="text-center">
          <img
            src={logo}
            alt="CS Travels"
            className="mx-auto h-20 sm:h-24 lg:h-28 w-auto object-contain"
          />

          <p className="mt-6 sm:mt-8 text-[10px] sm:text-[11px] uppercase tracking-[0.4em] sm:tracking-[0.6em] text-[#D4AF37]">
            Tirupati Luxury Travel
          </p>

          <h2 className="mt-4 sm:mt-5 text-3xl sm:text-5xl font-light tracking-tight leading-tight">
            Travel With{" "}
            <span className="block font-semibold italic text-[#D4AF37]">
              Comfort & Devotion
            </span>
          </h2>

          <p className="mx-auto mt-6 sm:mt-8 max-w-xl sm:max-w-2xl text-sm sm:text-base leading-relaxed text-white/50 px-2 sm:px-0">
            Premium pilgrimage tours, Tirumala Darshan assistance, airport
            transfers, and curated South India travel experiences designed to
            deliver comfort, devotion, and peace of mind.
          </p>
        </div>

        {/* CONTACT GRID */}
        <div className="mt-12 sm:mt-16 grid gap-6 sm:gap-10 border-y border-white/10 py-10 sm:py-14 lg:grid-cols-3">
          {/* PHONE */}
          <a
            href="tel:+919347472307"
            className="group flex items-center justify-between gap-4 border-b border-white/10 pb-6 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6"
          >
            <div>
              <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] sm:tracking-[0.4em] text-white/40">
                Concierge
              </p>
              <p className="mt-2 sm:mt-3 text-lg sm:text-xl font-medium">
                +91 93474 72307
              </p>
            </div>

            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </a>

          {/* WHATSAPP */}
          <a
            href="https://wa.me/919347472307"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-4 border-b border-white/10 pb-6 lg:border-b-0 lg:border-r lg:px-6 lg:pb-0"
          >
            <div>
              <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] sm:tracking-[0.4em] text-white/40">
                WhatsApp
              </p>
              <p className="mt-2 sm:mt-3 text-lg sm:text-xl font-medium">
                Start Conversation
              </p>
            </div>

            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </a>

          {/* LOCATION */}
          <div className="flex items-center justify-between lg:pl-6">
            <div>
              <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] sm:tracking-[0.4em] text-white/40">
                Based In
              </p>
              <p className="mt-2 sm:mt-3 text-lg sm:text-xl font-medium">
                Tirupati, Andhra Pradesh
              </p>
            </div>

            <MapPin size={18} className="text-[#D4AF37]" />
          </div>
        </div>

        {/* LINKS */}
        <div className="mt-10 flex flex-wrap justify-center gap-4 sm:gap-6 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white/40">
          <a href="#home" className="hover:text-[#D4AF37] transition">
            Home
          </a>

          <a href="#packages" className="hover:text-[#D4AF37] transition">
            Packages
          </a>

          <a href="#destinations" className="hover:text-[#D4AF37] transition">
            Destinations
          </a>

          <a href="#contact" className="hover:text-[#D4AF37] transition">
            Contact
          </a>
        </div>

        {/* COPYRIGHT */}
        <p className="mt-8 text-center text-[11px] sm:text-xs text-white/35">
          © {new Date().getFullYear()} CS Travels Tirupati | Designed by{" "}
          <a
            href="https://www.linkedin.com/in/jilla-pavan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#D4AF37] hover:underline"
          >
            Pavan Jilla
          </a>
        </p>
      </div>
    </footer>
  );
}
