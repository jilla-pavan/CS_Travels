import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Phone, MessageCircle } from "lucide-react";
import { tourPackages } from "../data/tourPackages";
import BGImage from "../assets/Journey_Background.png";

/**
 * The slug now arrives as a prop from the route (see pages/PackageDetail.jsx)
 * rather than being parsed out of window.location.hash in here. The `pkg`
 * fallback keeps this renderable in isolation.
 */
export default function PackageDetails({ pkg }) {
  const selectedPackage = pkg ?? tourPackages[0];

  if (!selectedPackage) return null;

  return (
    <section className="bg-black text-white">
      {/* HERO */}
      <div className="relative h-[80vh] sm:h-[90vh] lg:h-screen overflow-hidden">
        <img
          src={selectedPackage.image}
          alt={selectedPackage.title}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl sm:max-w-3xl"
          >
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[#D4AF37]">
              {selectedPackage.subtitle}
            </p>

            <h1 className="mt-3 sm:mt-4 text-3xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
              {selectedPackage.title}
            </h1>

            <p className="mt-4 sm:mt-6 text-sm sm:text-base text-white/60 leading-relaxed max-w-xl">
              {selectedPackage.description}
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <a
                href="https://wa.me/919347472307"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-5 sm:px-6 py-3 text-xs sm:text-sm font-medium text-black"
              >
                Book Now <ArrowRight size={16} />
              </a>

              <span className="text-xl sm:text-2xl text-[#D4AF37]">
                {selectedPackage.price}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* OVERVIEW */}
      <section className="border-t border-white/10 py-10 sm:py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 grid gap-6 sm:gap-10 md:grid-cols-2">
          <div>
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#D4AF37]">
              Overview
            </p>
            <h2 className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-medium">
              Crafted for Peaceful Travel
            </h2>
          </div>

          <p className="text-sm sm:text-base text-white/60 leading-relaxed">
            {selectedPackage.description}
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-t border-white/10 py-10 sm:py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#D4AF37]">
            What’s Included
          </p>

          <h2 className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-medium">
            Premium Inclusions
          </h2>

          <div className="mt-6 sm:mt-10 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {selectedPackage.features.map((item) => (
              <div
                key={item}
                className="border border-white/10 bg-white/[0.02] p-4 sm:p-6 hover:border-[#D4AF37]/30 transition"
              >
                <CheckCircle2 className="text-[#D4AF37]" size={20} />

                <p className="mt-3 sm:mt-4 font-medium text-sm sm:text-base">
                  {item}
                </p>

                <p className="mt-2 text-xs sm:text-sm text-white/50">
                  Smooth and well-planned experience
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="relative border-t border-white/10 py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={BGImage}
            alt=""
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-black/85" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <p className="text-center text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#D4AF37]">
            Itinerary
          </p>

          <h2 className="mt-2 sm:mt-3 text-center text-2xl sm:text-3xl font-medium">
            Your Journey Plan
          </h2>

          <div className="mt-8 sm:mt-12 space-y-6 sm:space-y-8">
            {selectedPackage.itinerary.map((step, i) => (
              <div key={i} className="flex gap-4 sm:gap-6">
                <div className="h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center rounded-full bg-[#D4AF37] text-black text-xs sm:text-sm font-bold">
                  {i + 1}
                </div>

                <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICE */}
      <section className="border-t border-white/10 py-10 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#D4AF37]">
            Starting From
          </p>

          <h2 className="mt-3 sm:mt-4 text-3xl sm:text-5xl font-light">
            {selectedPackage.price}
          </h2>

          <a
            href="https://wa.me/919347472307"
            className="mt-6 sm:mt-8 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-5 sm:px-6 py-3 text-xs sm:text-sm text-black"
          >
            Reserve Now <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-medium">
            Ready to begin your journey?
          </h2>

          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-white/60">
            Contact us instantly for booking assistance
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <a
              href="https://wa.me/919347472307"
              className="flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-5 py-3 text-black text-sm"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>

            <a
              href="tel:+919347472307"
              className="flex items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm"
            >
              <Phone size={16} />
              Call
            </a>
          </div>
        </div>
      </section>
    </section>
  );
}
