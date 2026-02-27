"use client";

import Button from "@web/presentation/components/Button";
import Card from "@web/presentation/components/Card";
import Section from "@web/presentation/components/Section";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";

type PricingPlan = {
  id: "free" | "bronze" | "silver" | "gold";
  highlight?: boolean;
};

const plans: PricingPlan[] = [
  { id: "free" },
  { id: "bronze" },
  { id: "silver", highlight: true },
  { id: "gold" }
];

const PricingSection = (): JSX.Element => {
  const { translate } = useAppLanguage();

  return (
    <Section id="plans" title={translate("landing.pricing.title")}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={
              plan.highlight
                ? "border-orange-300 ring-2 ring-orange-200 dark:border-orange-700 dark:ring-orange-900"
                : ""
            }
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-bold">
                  {translate(`landing.pricing.${plan.id}.name`)}
                </h3>
                {plan.highlight ? (
                  <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-950 dark:text-orange-200">
                    {translate("common.labels.mostPopular")}
                  </span>
                ) : null}
              </div>
              <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
                <li>{translate(`landing.pricing.${plan.id}.item1`)}</li>
                <li>{translate(`landing.pricing.${plan.id}.item2`)}</li>
                <li>{translate(`landing.pricing.${plan.id}.item3`)}</li>
              </ul>
              <Button className="w-full">{translate("common.actions.choosePlan")}</Button>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default PricingSection;
