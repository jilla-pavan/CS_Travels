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

  if (!selectedPackage) {
    return null;
  }

  return (
    <section className="bg-black text-white">
      {/* HERO */}
      <div className="relative h-screen min-h-[700px] overflow-hidden">
        <img
          src={selectedPackage.image}
          alt={selectedPackage.title}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-6 pb-24 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
              {selectedPackage.tag}
            </span>

            <p className="mt-8 text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
              {selectedPackage.subtitle}
            </p>

            <h1 className="mt-4 max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
              {selectedPackage.title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-white/75">
              {selectedPackage.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://wa.me/919347472307"
                className="rounded-full bg-[#D4AF37] px-8 py-4 font-semibold text-black"
              >
                Book Now
              </a>

              <div className="rounded-full border border-white/20 px-8 py-4">
                {selectedPackage.price}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* WHY CHOOSE */}
      <div className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
            Premium Experience
          </p>

          <h2 className="mt-4 text-5xl font-bold">Why Choose This Tour</h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {selectedPackage.features.map((item) => (
            <div
              key={item}
              className="rounded-[32px] border border-white/10 bg-[#0A0A12] p-8"
            >
              <CheckCircle className="mb-6 text-[#D4AF37]" size={36} />

              <h3 className="text-xl font-semibold">{item}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* TIMELINE */}
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
            Journey Plan
          </p>

          <h2 className="mt-4 text-5xl font-bold">Your Spiritual Journey</h2>
        </div>

        <div className="mt-20">
          {selectedPackage.itinerary.map((step, index) => (
            <div key={index} className="relative pl-16 pb-16">
              {index !== selectedPackage.itinerary.length - 1 && (
                <div className="absolute left-[19px] top-10 h-full w-px bg-[#D4AF37]/30" />
              )}

              <div className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full bg-[#D4AF37] text-black font-bold">
                {index + 1}
              </div>

              <div className="rounded-[24px] border border-white/10 bg-[#0A0A12] p-6">
                <p className="text-white/80 leading-relaxed">{step}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PRICE SECTION */}
      <div className="mx-auto max-w-5xl px-6 py-24">
        <div className="rounded-[40px] border border-[#D4AF37]/20 bg-gradient-to-br from-[#111] to-[#080808] p-12 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[#D4AF37]">
            Starting From
          </p>

          <h2 className="mt-6 text-7xl font-bold">{selectedPackage.price}</h2>

          <p className="mt-6 text-white/70">
            Premium transportation, experienced driver, flexible scheduling and
            seamless pilgrimage experience.
          </p>

          <a
            href="https://wa.me/919347472307"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#D4AF37] px-8 py-4 font-semibold text-black"
          >
            Reserve Your Tour
            <ArrowRight size={18} />
          </a>
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h2 className="text-5xl font-bold">Ready For Your Pilgrimage?</h2>

          <p className="mt-6 text-white/70">
            Speak with our team and plan your journey today.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/919347472307"
              className="inline-flex items-center gap-3 rounded-full bg-[#D4AF37] px-8 py-4 font-semibold text-black"
            >
              <MessageCircle size={18} />
              WhatsApp Us
            </a>

            <a
              href="tel:+919347472307"
              className="inline-flex items-center gap-3 rounded-full border border-white/15 px-8 py-4"
            >
              <Phone size={18} />
              Call Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
