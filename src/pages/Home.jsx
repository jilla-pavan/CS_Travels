import { useMemo } from "react";
import Hero from "../components/sections/Hero";
import TrustBand from "../components/sections/TrustBand";
import Services from "../components/sections/Services";
import Packages from "../components/sections/Packages";
import Fleet from "../components/sections/Fleet";
import TempleCircuit from "../components/sections/TempleCircuit";
import WhyUs from "../components/sections/WhyUs";
import Destinations from "../components/sections/Destinations";
import HowItWorks from "../components/sections/HowItWorks";
import Testimonials from "../components/sections/Testimonials";
import Faq from "../components/sections/Faq";
import Contact from "../components/sections/Contact";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { schemaFor } from "../lib/schema";

/**
 * Home.
 *
 * Every section is now rebuilt. Order is deliberate: establish trust and price
 * transparency early (TrustBand, Services, Packages), show the product
 * (Fleet, TempleCircuit, Destinations), then handle objections (WhyUs,
 * HowItWorks, Testimonials, Faq) before asking for the booking (Contact).
 */
export default function Home() {
  /* Organization + WebSite only while content is placeholder — see lib/schema.js
     for why LocalBusiness, Review and FAQPage are deliberately withheld. */
  const schema = useMemo(() => schemaFor("home"), []);
  useDocumentMeta({ schema });

  return (
    <>
      <Hero />
      <TrustBand />
      <Services />
      <Packages />
      <Fleet />
      <TempleCircuit />
      <Destinations />
      <WhyUs />
      <HowItWorks />
      <Testimonials />
      <Faq />
      <Contact />
    </>
  );
}
