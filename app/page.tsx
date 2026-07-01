import Loader from "@/components/Loader";
import { Navbar } from "@/components/Navbar";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { WhyBuilding } from "@/components/sections/WhyBuilding";
import { ProblemsWeSolve } from "@/components/sections/ProblemsWeSolve";
import { FuturePlatform } from "@/components/sections/FuturePlatform";
import { CoreModules } from "@/components/sections/CoreModules";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Roadmap } from "@/components/sections/Roadmap";
import { EarlyAccess } from "@/components/sections/EarlyAccess";
import { HelpBuild } from "@/components/sections/HelpBuild";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Loader />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <WhyBuilding />
        <ProblemsWeSolve />
        <FuturePlatform />
        <CoreModules />
        <WhyChoose />
        <Roadmap />
        <EarlyAccess />
        <HelpBuild />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
