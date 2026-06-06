import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, ChevronRight } from "lucide-react";
import logo from "../assets/CS_Travel_Logo.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", href: "#home" },
    { name: "Packages", href: "#packages" },
    { name: "Destinations", href: "#destinations" },
    { name: "Reviews", href: "#reviews" },
    { name: "About Us", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [menuOpen]);

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/75 backdrop-blur-[24px] shadow-[0_10px_50px_rgba(0,0,0,0.45)]"
            : "bg-black/45 backdrop-blur-[20px]"
        }`}
      >
        <div className="relative mx-auto flex h-[70px] sm:h-[78px] max-w-7xl items-center justify-between px-4 sm:px-5 lg:px-10">
          {/* LOGO */}
          <motion.a
            href="#home"
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 sm:gap-3 min-w-0"
          >
            <div className="relative flex items-center justify-center shrink-0">
              <div className="absolute inset-0 rounded-full bg-[#D4AF37]/20 blur-xl" />

              <img
                src={logo}
                alt="CS Travels Tirupati"
                className="relative h-10 sm:h-12 md:h-16 w-auto object-contain"
              />
            </div>

            <div className="min-w-0">
              <h2 className="text-[13px] sm:text-[16px] md:text-[18px] font-bold tracking-[0.18em] text-white truncate">
                CS TRAVELS
              </h2>
              <p className="text-[8px] sm:text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">
                TIRUPATI
              </p>
            </div>
          </motion.a>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-6 lg:gap-10 flex-wrap justify-center">
            {links.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover={{ y: -2 }}
                className="group relative text-[12px] font-semibold uppercase tracking-[0.18em] text-white/75 hover:text-[#D4AF37]"
              >
                {link.name}
                <span className="absolute -bottom-2 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-gradient-to-r from-[#D4AF37] to-[#F7E7A1] transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          {/* CTA */}
          <motion.a
            href="tel:9347472307"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="hidden md:flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-gradient-to-r from-[#D4AF37] via-[#F5D97A] to-[#D4AF37] px-4 lg:px-6 py-2 lg:py-3 text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.15em] text-black"
          >
            <Phone size={14} />
            Book Now
          </motion.a>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-[60] text-white md:hidden"
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X size={28} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu size={28} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md md:hidden"
            />

            {/* drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 250, damping: 25 }}
              className="fixed top-0 right-0 z-50 h-screen w-full max-w-[380px] overflow-y-auto bg-gradient-to-b from-black via-[#0a0a0a] to-black backdrop-blur-2xl md:hidden"
            >
              {/* gold line */}
              <div className="absolute left-0 top-0 h-full w-[1px] bg-[#D4AF37]" />

              {/* ✅ CLOSE BUTTON */}
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute right-5 top-5 z-[60] rounded-full border border-white/10 bg-black/40 p-2 text-white backdrop-blur-md"
              >
                <X size={22} />
              </button>

              <div className="flex flex-col px-6 sm:px-8 pt-16 pb-10">
                {/* logo */}
                <div className="mb-8">
                  <img
                    src={logo}
                    alt="CS Travels"
                    className="h-14 sm:h-16 w-auto"
                  />
                  <h2 className="mt-3 text-lg sm:text-xl font-bold tracking-[0.2em] text-white">
                    CS TRAVELS
                  </h2>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.45em] text-[#D4AF37]">
                    Tirupati
                  </p>
                </div>

                {/* links */}
                <div className="space-y-1">
                  {links.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.07 }}
                      className="flex items-center justify-between border-b border-white/10 py-4 text-[13px] font-medium uppercase tracking-[0.16em] text-white/80 hover:text-[#D4AF37]"
                    >
                      {link.name}
                      <ChevronRight size={16} />
                    </motion.a>
                  ))}
                </div>

                {/* CTA */}
                <motion.a
                  href="tel:9347472307"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F5D97A] to-[#D4AF37] py-3 text-sm font-bold uppercase tracking-[0.16em] text-black"
                >
                  <Phone size={16} />
                  Book Now
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
