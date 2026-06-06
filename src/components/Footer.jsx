import { Phone, MessageCircle, MapPin, ArrowUpRight } from "lucide-react";
import logo from "../assets/CS_Travel_Logo.png";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black text-white">
      {/* Top Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Brand Block */}
        <div className="text-center">
          <img
            src={logo}
            alt="CS Travels"
            className="mx-auto h-28 w-auto object-cover"
          />

          <p
            className="
              mt-8
              text-[11px]
              uppercase
              tracking-[0.6em]
              text-[#D4AF37]
            "
          >
            Tirupati Luxury Travel
          </p>

          <h2
            className="
              mt-5
              text-4xl
              font-light
              tracking-tight
              md:text-5xl
            "
          >
            Travel With
            <span className="block font-semibold italic text-[#D4AF37]">
              Comfort & Devotion
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-8
              max-w-2xl
              text-sm
              leading-relaxed
              text-white/50
            "
          >
            Premium pilgrimage tours, Tirumala Darshan assistance, airport
            transfers, and curated South India travel experiences designed to
            deliver comfort, devotion, and peace of mind.
          </p>
        </div>

        {/* Concierge Section */}
        <div className="mt-16 grid gap-12 border-y border-white/10 py-14 lg:grid-cols-3">
          <a
            href="tel:+919347472307"
            className="
              group
              flex
              items-center
              justify-between
              border-b
              border-white/10
              pb-6
              lg:border-b-0
              lg:border-r
              lg:pb-0
              lg:pr-10
            "
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">
                Concierge
              </p>

              <p className="mt-3 text-xl font-medium">+91 93474 72307</p>
            </div>

            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </a>

          <a
            href="https://wa.me/919347472307"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              flex
              items-center
              justify-between
              border-b
              border-white/10
              pb-6
              lg:border-b-0
              lg:border-r
              lg:px-10
              lg:pb-0
            "
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">
                WhatsApp
              </p>

              <p className="mt-3 text-xl font-medium">Start Conversation</p>
            </div>

            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </a>

          <div className="flex items-center justify-between lg:pl-10">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">
                Based In
              </p>

              <p className="mt-3 text-xl font-medium">
                Tirupati, Andhra Pradesh
              </p>
            </div>

            <MapPin size={18} className="text-[#D4AF37]" />
          </div>
        </div>

        {/* Bottom Area */}
        <div className="mt-4 mb-8 flex flex-col items-center justify-center gap-6">
          <div className="flex gap-8 text-[11px] uppercase tracking-[0.25em] text-white/40">
            <a href="#home" className="transition hover:text-[#D4AF37]">
              Home
            </a>

            <a href="#packages" className="transition hover:text-[#D4AF37]">
              Packages
            </a>

            <a href="#destinations" className="transition hover:text-[#D4AF37]">
              Destinations
            </a>

            <a href="#contact" className="transition hover:text-[#D4AF37]">
              Contact
            </a>
          </div>

          <p className="text-xs text-white/35">
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
      </div>
    </footer>
  );
}
