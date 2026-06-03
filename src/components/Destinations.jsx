import { MapPin, ArrowRight } from "lucide-react";
import { destinations } from "../data/tourPackages";

export default function Destinations() {
  return (
    <section
      id="destinations"
      className="relative overflow-hidden bg-black py-24 text-white"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#D4AF37]">
            POPULAR ROUTES
          </p>

          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
            Destinations From Tirupati
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-white/60">
            Comfortable private travel to temples, airports, railway stations,
            and sacred destinations across South India.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {destinations.map((destination) => (
            <div
              key={destination.name}
              className="
                group
                overflow-hidden
                rounded-[32px]
                border
                border-white/10
                bg-[#08080F]
                transition-all
                duration-500
                hover:-translate-y-2
                hover:border-[#D4AF37]/30
              "
            >
              {/* Image */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-110
                  "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-7">
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-[#D4AF37]" />

                  <h3 className="text-2xl font-bold">{destination.name}</h3>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                      4 + 1
                    </p>

                    <p className="mt-2 text-2xl font-bold text-[#D4AF37]">
                      {destination.fare4}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                      6 + 1
                    </p>

                    <p className="mt-2 text-2xl font-bold text-[#D4AF37]">
                      {destination.fare6}
                    </p>
                  </div>
                </div>

                <a
                  href={`https://wa.me/919347472307?text=${encodeURIComponent(
                    `Hi, I'm interested in booking a trip from Tirupati to ${destination.name}. Please share the details.`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
    mt-6
    inline-flex
    w-full
    items-center
    justify-center
    gap-2
    rounded-full
    bg-[#D4AF37]
    px-5
    py-3
    text-sm
    font-bold
    uppercase
    tracking-[0.15em]
    text-black
    transition-all
    duration-300
    hover:-translate-y-1
    hover:shadow-[0_0_25px_rgba(212,175,55,0.3)]
  "
                >
                  Book This Route
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
