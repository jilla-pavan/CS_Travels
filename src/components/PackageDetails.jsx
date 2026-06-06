import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Phone, MessageCircle } from "lucide-react";
import { tourPackages } from "../data/tourPackages";
import Footer from "./Footer";
import BGImage from "../assets/Journey_Background.png";

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
      {/* HERO */}
      <div className="relative h-[100vh] overflow-hidden">
        <img
          src={selectedPackage.image}
          alt={selectedPackage.title}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <p className="text-[11px] uppercase tracking-[0.4em] text-[#D4AF37]">
              {selectedPackage.subtitle}
            </p>

            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
              {selectedPackage.title}
            </h1>

            <p className="mt-6 text-white/60 leading-relaxed max-w-xl">
              {selectedPackage.description}
            </p>

            <div className="mt-8 flex items-center gap-4">
              <a
                href="https://wa.me/919347472307"
                className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-medium text-black"
              >
                Book Now <ArrowRight size={16} />
              </a>

              <span className="text-2xl text-[#D4AF37]">
                {selectedPackage.price}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* OVERVIEW */}
      <section className="border-t border-white/10 py-8">
        <div className="mx-auto max-w-5xl px-6 grid gap-10 md:grid-cols-2">
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-[#D4AF37]">
              Overview
            </p>

            <h2 className="mt-3 text-3xl font-medium">
              Crafted for Peaceful Travel
            </h2>
          </div>

          <p className="text-white/60 leading-relaxed">
            {selectedPackage.description}
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-t border-white/10 py-8">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#D4AF37]">
            What’s Included
          </p>

          <h2 className="mt-3 text-3xl font-medium">Premium Inclusions</h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {selectedPackage.features.map((item) => (
              <div
                key={item}
                className="border border-white/10 bg-white/[0.02] p-6 hover:border-[#D4AF37]/30 transition"
              >
                <CheckCircle2 className="text-[#D4AF37]" size={20} />

                <p className="mt-4 font-medium">{item}</p>
                <p className="mt-2 text-sm text-white/50">
                  Smooth and well-planned experience
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="relative border-t border-white/10 py-12 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={BGImage}
            alt=""
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-black/85" />
        </div>

        {/* Content */}
        <div className="relative mx-auto max-w-4xl px-6">
          <p className="text-center text-[11px] uppercase tracking-[0.4em] text-[#D4AF37]">
            Itinerary
          </p>

          <h2 className="mt-3 text-center text-3xl font-medium">
            Your Journey Plan
          </h2>

          <div className="mt-12 space-y-8">
            {selectedPackage.itinerary.map((step, i) => (
              <div key={i} className="flex gap-6">
                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-[#D4AF37] text-black text-sm font-bold">
                  {i + 1}
                </div>

                <p className="text-white/60 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* PRICE */}
      <section className="border-t border-white/10 py-12">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#D4AF37]">
            Starting From
          </p>

          <h2 className="mt-4 text-5xl font-light">{selectedPackage.price}</h2>

          <a
            href="https://wa.me/919347472307"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3 text-black"
          >
            Reserve Now <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 py-8">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-medium">Ready to begin your journey?</h2>

          <p className="mt-3 text-white/60">
            Contact us instantly for booking assistance
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <a
              href="https://wa.me/919347472307"
              className="flex items-center gap-2 rounded-full bg-[#D4AF37] px-5 py-3 text-black"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>

            <a
              href="tel:+919347472307"
              className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3"
            >
              <Phone size={16} />
              Call
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </section>
  );
}
