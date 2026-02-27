"use client";

import Button from "@web/presentation/components/Button";
import Section from "@web/presentation/components/Section";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";

const FinalCtaSection = (): JSX.Element => {
  const { translate } = useAppLanguage();

  return (
    <Section>
      <div className="rounded-3xl border border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100 p-8 text-center dark:border-orange-900 dark:from-slate-900 dark:to-orange-950/60">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
          {translate("landing.finalCta.title")}
        </h2>
        <div className="mt-5">
          <Button>{translate("common.actions.createFreeAccount")}</Button>
        </div>
      </div>
    </Section>
  );
};

export default FinalCtaSection;
