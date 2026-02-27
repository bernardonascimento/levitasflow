import SiteHeader from "@web/components/SiteHeader";
import HeroSection from "@web/components/landing/HeroSection";
import Benefits from "@web/presentation/components/landing/Benefits";
import FeaturesMosaic from "@web/presentation/components/landing/FeaturesMosaic";
import Differentials from "@web/presentation/components/landing/Differentials";
import Pricing from "@web/presentation/components/landing/Pricing";
import FinalCTA from "@web/presentation/components/landing/FinalCTA";
import Footer from "@web/presentation/components/landing/Footer";

const LandingPage = (): JSX.Element => {
  return (
    <main className="landing-root relative min-h-screen overflow-hidden text-[color:var(--text)]">
      <SiteHeader />
      <HeroSection />
      <Benefits />
      <FeaturesMosaic />
      <Differentials />
      <Pricing />
      <FinalCTA />
      <Footer />
    </main>
  );
};

export default LandingPage;
