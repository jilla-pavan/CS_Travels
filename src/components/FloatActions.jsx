import { useEffect, useState } from "react";
import { Phone, ChevronUp } from "lucide-react";

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 300); // show after scrolling 300px
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Call Button - Left */}
      <a
        href="tel:+919347472307"
        className="
          fixed
          bottom-6
          left-5
          z-[9999]
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          bg-[#D4AF37]
          text-black
          shadow-[0_0_25px_rgba(212,175,55,0.45)]
          animate-pulse
          transition-all
          duration-300
          hover:scale-110
        "
      >
        <Phone size={24} />
      </a>

      {/* WhatsApp Button - Right */}
      <a
        href="https://wa.me/919347472307"
        target="_blank"
        rel="noopener noreferrer"
        className="
          fixed
          bottom-6
          right-5
          z-[9999]
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          bg-[#25D366]
          shadow-[0_0_25px_rgba(37,211,102,0.45)]
          animate-pulse
          transition-all
          duration-300
          hover:scale-110
        "
      >
        <img
          src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg"
          alt="WhatsApp"
          className="h-7 w-7 invert"
        />
      </a>

      {/* Scroll To Top */}
      {showTop && (
        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="
      fixed
      bottom-24
      right-6
      z-[99999]
      flex
      h-14
      w-14
      items-center
      justify-center
      rounded-full
      bg-[#D4AF37]
      text-black
      shadow-[0_10px_30px_rgba(212,175,55,0.45)]
      animate-bounce
      transition-all
    "
        >
          <ChevronUp size={26} />
        </button>
      )}
    </>
  );
}
