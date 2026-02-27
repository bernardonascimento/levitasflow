import HeaderSection from "@web/presentation/sections/HeaderSection";
import HeroSection from "@web/presentation/sections/HeroSection";
import BenefitsSection from "@web/presentation/sections/BenefitsSection";
import FeaturesSection from "@web/presentation/sections/FeaturesSection";
import DifferentialsSection from "@web/presentation/sections/DifferentialsSection";
import PricingSection from "@web/presentation/sections/PricingSection";
import FinalCtaSection from "@web/presentation/sections/FinalCtaSection";
import FooterSection from "@web/presentation/sections/FooterSection";

const HomePage = (): JSX.Element => {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_15%_15%,#312e81_0%,#020617_42%,#020617_100%)] text-slate-100">
      <HeaderSection />
      <HeroSection />
      <BenefitsSection />
      <FeaturesSection />
      <DifferentialsSection />
      <PricingSection />
      <FinalCtaSection />
      <FooterSection />
    </main>
  );
};

export default HomePage;
