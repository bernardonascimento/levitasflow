"use client";

import Section from "@web/presentation/components/Section";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";

const BenefitsSection = (): JSX.Element => {
  const { translate } = useAppLanguage();

  return (
    <Section>
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-[color:var(--text)] md:text-3xl">
        {translate("landing.benefits.title")}
      </h2>
      <ul className="grid gap-3 md:grid-cols-2">
        <li className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 text-sm text-[color:var(--text)] shadow-[var(--shadow)]">
          {translate("landing.benefits.item1")}
        </li>
        <li className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 text-sm text-[color:var(--text)] shadow-[var(--shadow)]">
          {translate("landing.benefits.item2")}
        </li>
        <li className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 text-sm text-[color:var(--text)] shadow-[var(--shadow)]">
          {translate("landing.benefits.item3")}
        </li>
        <li className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4 text-sm text-[color:var(--text)] shadow-[var(--shadow)]">
          {translate("landing.benefits.item4")}
        </li>
      </ul>
    </Section>
  );
};

export default BenefitsSection;
