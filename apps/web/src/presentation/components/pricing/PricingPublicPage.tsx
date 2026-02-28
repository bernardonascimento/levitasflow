"use client";

import Pricing from "@web/presentation/components/landing/Pricing";

const PricingPublicPage = (): JSX.Element => {
  return (
    <main className="mx-auto w-full max-w-[78rem] px-5 pb-16 md:px-8">
      <Pricing mode="pricingPage" />
    </main>
  );
};

export default PricingPublicPage;
