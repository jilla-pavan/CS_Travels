import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Package from "./components/Package";
import PackageDetails from "./components/PackageDetails";
import Itinerary from "./components/Itinerary";
import Highlights from "./components/Highlights";
import Contact from "./components/Contact";
import { Dessert } from "lucide-react";
import Destinations from "./components/Destinations";
import About from "./components/About";

function parseHashRoute() {
  const hash = window.location.hash.toLowerCase();
  if (hash.startsWith("#/details/")) {
    return { page: "details", slug: hash.replace("#/details/", "") };
  }
  return { page: "home" };
}

export default function App() {
  const [route, setRoute] = useState({ page: "home" });

  useEffect(() => {
    setRoute(parseHashRoute());

    const handleHashChange = () => {
      setRoute(parseHashRoute());
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-[#08080F] text-white">
      <Navbar />
      {route.page === "details" ? (
        <PackageDetails />
      ) : (
        <>
          <Hero />
          <Package />
          <Destinations />
          <About />
          <Contact />
        </>
      )}
    </div>
  );
}
