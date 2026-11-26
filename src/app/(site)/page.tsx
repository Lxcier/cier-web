import { Contact } from "@/components/home/Contact";
import { Hero } from "@/components/home/Hero";
import { PortfolioTeaser } from "@/components/home/PortfolioTeaser";
import { Pricing } from "@/components/home/Pricing";
import { Process } from "@/components/home/Process";
import { Services } from "@/components/home/Services";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Services />
      <PortfolioTeaser />
      <Pricing />
      <Process />
      <Contact />
    </main>
  );
}
