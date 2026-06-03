import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import logo from "../assets/CS_Travels_Gold_Logo.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", href: "#home" },
    { name: "Packages", href: "#package" },
    { name: "Destinations", href: "#destinations" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/70 backdrop-blur-2xl border-b border-[#D4AF37]/10"
            : "bg-black/50 backdrop-blur-2xl"
        }`}
      >
        {/* Premium Gold Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.08),_transparent_60%)]" />

        {/* Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

        <div className="relative mx-auto flex h-[64px] max-w-7xl items-center justify-between px-6 lg:px-10">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="flex cursor-pointer items-center gap-2.5"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-white/95 shadow-[0_0_14px_rgba(212,175,55,0.22)] overflow-hidden">
              <img src={logo} alt="CS Travels" className="h-9 w-9 object-cover" />
            </div>

            <div>
              <h2 className="text-[18px] font-bold tracking-[0.22em] text-white">
                CS TRAVELS
              </h2>

              <p className="mt-0.5 text-[8px] uppercase tracking-[0.38em] text-[#D4AF37]/80">
                TIRUPATI
              </p>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-7 lg:gap-8 md:flex">
            {links.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                whileHover={{ y: -2 }}
                className="group relative text-[12px] font-medium tracking-[0.16em] text-white/75 transition-colors duration-300 hover:text-white"
              >
                {link.name}

                <span className="absolute -bottom-2 left-1/2 h-[2px] w-0 bg-[#D4AF37] transition-all duration-300 group-hover:left-0 group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          {/* CTA */}
          <motion.a
            href="tel:9347472307"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="
              hidden md:flex
              items-center
              gap-2
              rounded-full
              border
              border-[#D4AF37]/30
              bg-[#D4AF37]
              px-5
              py-2.5
              text-[11px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-black
              transition-all
              duration-300
              hover:shadow-[0_0_30px_rgba(212,175,55,0.35)]
            "
          >
            <Phone size={14} />
            Book Now
          </motion.a>

          {/* Mobile Toggle */}
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
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md md:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 250,
              }}
              className="fixed top-0 right-0 z-50 h-screen w-[82%] border-l border-[#D4AF37]/10 bg-black/95 backdrop-blur-2xl md:hidden"
            >
              <div className="flex flex-col px-8 pt-24">
                <div className="mb-10">
                  <h2 className="text-lg font-bold tracking-[0.2em] text-white">
                    CS TRAVELS
                  </h2>

                  <p className="mt-1 text-[10px] uppercase tracking-[0.35em] text-[#D4AF37]/80">
                    Tirupati
                  </p>
                </div>

                {links.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.08,
                    }}
                    className="border-b border-white/10 py-5 text-sm tracking-[0.22em] text-white/75 transition-colors hover:text-[#D4AF37]"
                  >
                    {link.name}
                  </motion.a>
                ))}

                <motion.a
                  href="tel:9347472307"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="
                    mt-8
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-full
                    bg-[#D4AF37]
                    py-4
                    text-sm
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-black
                  "
                >
                  <Phone size={15} />
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
