"use client";

import Section from "@web/presentation/components/Section";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";

const BenefitsSection = (): JSX.Element => {
  const { translate } = useAppLanguage();

  return (
    <Section>
      <h2 className="mb-6 text-2xl font-bold tracking-tight md:text-3xl">
        {translate("landing.benefits.title")}
      </h2>
      <ul className="grid gap-3 md:grid-cols-2">
        <li className="rounded-xl border border-slate-200 bg-white p-4 text-sm dark:border-slate-800 dark:bg-slate-900">
          {translate("landing.benefits.item1")}
        </li>
        <li className="rounded-xl border border-slate-200 bg-white p-4 text-sm dark:border-slate-800 dark:bg-slate-900">
          {translate("landing.benefits.item2")}
        </li>
        <li className="rounded-xl border border-slate-200 bg-white p-4 text-sm dark:border-slate-800 dark:bg-slate-900">
          {translate("landing.benefits.item3")}
        </li>
        <li className="rounded-xl border border-slate-200 bg-white p-4 text-sm dark:border-slate-800 dark:bg-slate-900">
          {translate("landing.benefits.item4")}
        </li>
      </ul>
    </Section>
  );
};

export default BenefitsSection;
