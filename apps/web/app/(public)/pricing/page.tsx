import type { Metadata } from "next";
import PricingPublicPage from "@web/presentation/components/pricing/PricingPublicPage";

export const metadata: Metadata = {
  title: "Planos | LevitasFlow",
  description: "Compare os planos do LevitasFlow."
};

const PricingPage = (): JSX.Element => {
  return <PricingPublicPage />;
};

export default PricingPage;
