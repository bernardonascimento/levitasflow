"use client";

import { motion } from "framer-motion";
import Button from "@web/presentation/components/Button";
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
    <Section
      id="plans"
      title={translate("landing.pricing.title")}
      subtitle={translate("landing.pricing.subtitle")}
      className="relative"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute left-1/2 top-14 h-80 w-80 -translate-x-1/2 rounded-full bg-orange-500/25 blur-3xl"
          animate={{ opacity: [0.3, 0.65, 0.3], scale: [0.94, 1.08, 0.94] }}
          transition={{ duration: 7.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan, index) => (
          <motion.article
            key={plan.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
            whileHover={{ y: -9 }}
            className={`relative overflow-hidden rounded-3xl border p-6 backdrop-blur-sm transition ${
              plan.highlight
                ? "scale-[1.03] border-orange-300/80 bg-gradient-to-b from-orange-500/20 to-slate-900/70 shadow-[0_0_45px_rgba(249,115,22,0.35)]"
                : "border-white/10 bg-slate-900/50"
            }`}
          >
            {plan.highlight ? (
              <motion.div
                className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-orange-300/25 blur-3xl"
                animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.45, 0.75, 0.45] }}
                transition={{ duration: 6.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
            ) : null}

            <div className="relative space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-xl font-black text-white">
                  {translate(`landing.pricing.${plan.id}.name`)}
                </h3>
                {plan.highlight ? (
                  <span className="rounded-full border border-orange-200/60 bg-orange-400/30 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-50">
                    {translate("common.labels.mostPopular")}
                  </span>
                ) : null}
              </div>
              <p className="text-sm text-slate-200">
                {translate(`landing.pricing.${plan.id}.emotional`)}
              </p>
              <ul className="space-y-2 text-sm text-slate-100">
                <li>• {translate(`landing.pricing.${plan.id}.item1`)}</li>
                <li>• {translate(`landing.pricing.${plan.id}.item2`)}</li>
                <li>• {translate(`landing.pricing.${plan.id}.item3`)}</li>
              </ul>
              <Button
                className={`w-full ${
                  plan.highlight
                    ? "shadow-[0_0_26px_rgba(249,115,22,0.6)]"
                    : "bg-white/15 text-white"
                }`}
              >
                {translate("common.actions.choosePlan")}
              </Button>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
};

export default PricingSection;
