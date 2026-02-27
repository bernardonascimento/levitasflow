"use client";

import { motion, useReducedMotion } from "framer-motion";
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
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section
      id="plans"
      title={translate("landing.pricing.title")}
      subtitle={translate("landing.pricing.subtitle")}
      className="relative"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute left-1/2 top-14 h-80 w-80 -translate-x-1/2 rounded-full bg-[color:var(--accent)]/22 blur-3xl"
          animate={
            prefersReducedMotion
              ? undefined
              : { opacity: [0.3, 0.65, 0.3], scale: [0.94, 1.08, 0.94] }
          }
          transition={{ duration: 7.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>
      <div className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan, index) => (
          <motion.article
            key={plan.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
            whileHover={
              prefersReducedMotion ? undefined : { y: -10, scale: plan.highlight ? 1.04 : 1.015 }
            }
            className={`relative flex h-full min-h-[24rem] flex-col overflow-hidden rounded-3xl border p-7 backdrop-blur-sm transition ${
              plan.highlight
                ? "border-[color:var(--accent)]/70 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--accent)_16%,var(--surface))_0%,var(--surface)_100%)] shadow-[0_0_45px_color-mix(in_srgb,var(--accent)_40%,transparent)]"
                : "border-[color:var(--border)] bg-[color:var(--surface)] shadow-[var(--shadow)]"
            }`}
          >
            {plan.highlight ? (
              <motion.div
                className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[color:var(--accent)]/20 blur-3xl"
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { scale: [0.9, 1.15, 0.9], opacity: [0.45, 0.75, 0.45] }
                }
                transition={{ duration: 6.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
            ) : null}

            <div className="relative flex h-full flex-col">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-xl font-black text-[color:var(--text)]">
                  {translate(`landing.pricing.${plan.id}.name`)}
                </h3>
                {plan.highlight ? (
                  <span className="rounded-full border border-[color:var(--accent)]/50 bg-[color:var(--accent)]/16 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[color:var(--accent)]">
                    {translate("common.labels.mostPopular")}
                  </span>
                ) : null}
              </div>
              <p className="text-sm text-[color:var(--muted)]">
                {translate(`landing.pricing.${plan.id}.emotional`)}
              </p>
              <div className="mt-4 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface2)] px-4 py-3">
                <p className="text-sm font-bold text-[color:var(--text)]">
                  {translate(`landing.pricing.${plan.id}.anchor`)}
                </p>
                <p className="text-xs text-[color:var(--muted)]">
                  {translate("landing.pricing.noCard")}
                </p>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-[color:var(--text)]">
                <li>• {translate(`landing.pricing.${plan.id}.item1`)}</li>
                <li>• {translate(`landing.pricing.${plan.id}.item2`)}</li>
                <li>• {translate(`landing.pricing.${plan.id}.item3`)}</li>
              </ul>
              <div className="mt-auto pt-6">
                <Button
                  variant={plan.highlight ? "primary" : "secondary"}
                  className={`${plan.highlight ? "shadow-[0_0_28px_color-mix(in_srgb,var(--accent)_60%,transparent)]" : ""} w-full`}
                >
                  {translate("common.actions.choosePlan")}
                </Button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
};

export default PricingSection;
