import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Phone, MessageCircle } from "lucide-react";
import { tourPackages } from "../data/tourPackages";

function getPackageSlug() {
  const hash = window.location.hash.toLowerCase();
  return hash.startsWith("#/details/") ? hash.replace("#/details/", "") : "";
}

export default function PackageDetails() {
  const slug = getPackageSlug();
  const selectedPackage = tourPackages.find((pkg) => pkg.slug === slug);

  if (!selectedPackage) return null;

  return (
    <section className="bg-black text-white">
      {/* HERO (more compact) */}
      <div className="relative h-[75vh] min-h-[600px] overflow-hidden">
        <img
          src={selectedPackage.image}
          className="absolute inset-0 h-full w-full object-cover scale-105"
          alt={selectedPackage.title}
        />

        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-6xl items-end px-6 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex rounded-full border border-[#D4AF37] bg-[#D4AF37] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-black">
              {selectedPackage.tag}
            </span>

            <p className="mt-4 text-xs uppercase tracking-[0.35em] text-[#D4AF37]">
              {selectedPackage.subtitle}
            </p>

            <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">
              {selectedPackage.title}
            </h1>

            <p className="mt-4 max-w-xl text-sm text-white/70">
              {selectedPackage.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="https://wa.me/919347472307"
                className="rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-black transition hover:scale-105"
              >
                Book Now
              </a>

              <div className="rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm text-white/70 backdrop-blur-md">
                {selectedPackage.price}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#D4AF37]" />

      {/* WHY CHOOSE (compact grid) */}
      <div className="relative mx-auto px-6 py-10">
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37]">
            Premium Experience
          </p>

          <h2 className="mt-3 text-3xl font-bold">Why Choose This Tour</h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {selectedPackage.features.map((item) => (
            <div
              key={item}
              className="
                rounded-xl border border-white/10
                bg-white/5 p-5
                backdrop-blur-md
              "
            >
              <CheckCircle className="text-[#D4AF37]" size={22} />

              <h3 className="mt-3 text-base font-semibold">{item}</h3>

              <p className="mt-1 text-xs text-white/60">
                Included for premium experience
              </p>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#D4AF37]" />
      </div>

      {/* TIMELINE (tight layout) */}
      <div className="relative mx-auto px-12 py-12">
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37]">
            Journey Plan
          </p>

          <h2 className="mt-3 text-3xl font-bold">Your Spiritual Journey</h2>
        </div>

        <div className="mt-10 space-y-6">
          {selectedPackage.itinerary.map((step, index) => (
            <div key={index} className="relative pl-10">
              {index !== selectedPackage.itinerary.length - 1 && (
                <div className="absolute left-3 top-8 h-full w-px bg-[#D4AF37]/30" />
              )}

              <div className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#D4AF37] text-[10px] font-bold text-black">
                {index + 1}
              </div>

              <div className="rounded-xl border border-white/10 bg-black/40 p-4 text-sm text-white/70 backdrop-blur-md">
                {step}
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#D4AF37]" />
      </div>

      {/* PRICE (compact conversion card) */}
      <div className=" relative mx-auto px-6 py-16">
        <div className="w-1/2 mx-auto rounded-2xl border border-[#D4AF37]/40 bg-white/5 p-8 text-center backdrop-blur-md">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37]">
            Starting From
          </p>

          <h2 className="mt-4 text-5xl font-bold">{selectedPackage.price}</h2>

          <p className="mt-4 text-sm text-white/60">
            Premium SUV + experienced driver + seamless pilgrimage experience
          </p>

          <a
            href="https://wa.me/919347472307"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-black"
          >
            Reserve Tour
            <ArrowRight size={16} />
          </a>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#D4AF37]" />
      </div>

      {/* CTA (tight + aligned) */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center">
          <h2 className="text-3xl font-bold">Ready For Your Pilgrimage?</h2>

          <p className="mt-3 text-sm text-white/60">
            Speak with our travel team and book instantly
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/919347472307"
              className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-black"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>

            <a
              href="tel:+919347472307"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm"
            >
              <Phone size={16} />
              Call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
