"use client";

import Card from "@web/presentation/components/Card";
import Section from "@web/presentation/components/Section";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";

const DifferentialsSection = (): JSX.Element => {
  const { translate } = useAppLanguage();

  return (
    <Section id="differentials" title={translate("landing.differentials.title")}>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <p className="text-sm font-semibold">{translate("landing.differentials.item1")}</p>
        </Card>
        <Card>
          <p className="text-sm font-semibold">{translate("landing.differentials.item2")}</p>
        </Card>
        <Card>
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold">{translate("landing.differentials.item3")}</p>
            <span className="rounded-full border border-[color:var(--border)] bg-[color:var(--surface2)] px-2 py-1 text-xs font-semibold text-[color:var(--accent)]">
              {translate("common.labels.soon")}
            </span>
          </div>
        </Card>
        <Card>
          <p className="text-sm font-semibold">{translate("landing.differentials.item4")}</p>
        </Card>
      </div>
    </Section>
  );
};

export default DifferentialsSection;
