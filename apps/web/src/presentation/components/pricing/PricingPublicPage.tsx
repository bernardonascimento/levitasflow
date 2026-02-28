"use client";

import Link from "next/link";
import Pricing from "@web/presentation/components/landing/Pricing";
import Button from "@web/presentation/components/Button";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";

const PricingPublicPage = (): JSX.Element => {
  const { translate } = useAppLanguage();

  return (
    <main className="mx-auto w-full max-w-[78rem] px-5 pb-16 pt-10 md:px-8">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="text-[clamp(2rem,4.2vw,3.4rem)] font-black leading-[0.95] tracking-tight text-[color:var(--text)]">
          {translate("pricingPage.title")}
        </h1>
        <p className="mt-3 text-[color:var(--muted)]">{translate("pricingPage.subtitle")}</p>
      </header>
      <Pricing />
      <div className="mx-auto mt-6 flex justify-center">
        <Link href="/signup">
          <Button>{translate("pricingPage.cta")}</Button>
        </Link>
      </div>
    </main>
  );
};

export default PricingPublicPage;
