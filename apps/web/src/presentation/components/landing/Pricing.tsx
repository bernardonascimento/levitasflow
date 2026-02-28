"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import type { TranslationKey } from "@shared/index";
import Button from "@web/presentation/components/Button";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";

type PlanId = "free" | "bronze" | "silver" | "gold";
type PlanMainField = "name" | "emotional" | "price";
type PlanItemField = 1 | 2 | 3;

const plans: ReadonlyArray<{ id: PlanId; popular?: boolean }> = [
  { id: "free" },
  { id: "bronze" },
  { id: "silver", popular: true },
  { id: "gold" }
];

const getPlanMainKey = <Field extends PlanMainField>(
  planId: PlanId,
  field: Field
): Extract<TranslationKey, `landing.pricing.${PlanId}.${Field}`> => {
  return `landing.pricing.${planId}.${field}` as Extract<
    TranslationKey,
    `landing.pricing.${PlanId}.${Field}`
  >;
};

const getPlanItemKey = (
  planId: PlanId,
  field: PlanItemField
): Extract<TranslationKey, `landing.pricing.${PlanId}.item${PlanItemField}`> => {
  return `landing.pricing.${planId}.item${field}` as Extract<
    TranslationKey,
    `landing.pricing.${PlanId}.item${PlanItemField}`
  >;
};

const Pricing = (): JSX.Element => {
  const { translate } = useAppLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <section id="plans" className="mx-auto w-full max-w-[78rem] px-5 py-14 md:px-8 md:py-20">
      <header className="mb-8 max-w-3xl">
        <p className="section-kicker">{translate("landing.pricing.kicker")}</p>
        <h2 className="mt-3 text-[clamp(1.9rem,4vw,3.2rem)] font-black leading-[0.96] tracking-tight text-[color:var(--text)]">
          {translate("landing.pricing.title")}
        </h2>
        <p className="mt-3 text-[color:var(--muted)]">{translate("landing.pricing.subtitle")}</p>
      </header>

      <div className="grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan, index) => (
          <motion.article
            key={plan.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.48, delay: index * 0.06, ease: "easeOut" }}
            whileHover={reduceMotion ? undefined : { y: -5 }}
            className={`clarity-feature-card editorial-card h-full min-h-[28rem] rounded-[1.5rem] border border-[color:var(--border)] p-6 ${
              plan.popular
                ? "pricing-popular border-[color:var(--accent)]/70"
                : "no-accent-hover border border-[color:var(--border)]"
            }`}
          >
            <div className="flex h-full flex-col">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-2xl font-black tracking-tight text-[color:var(--text)]">
                  {translate(getPlanMainKey(plan.id, "name"))}
                </h3>
                {plan.popular ? (
                  <span className="whitespace-nowrap rounded-full border border-[color:var(--accent)]/60 bg-gradient-to-r from-[color:var(--accent)]/18 to-[color:var(--accent2)]/18 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.08em] text-[color:var(--accent)] shadow-[0_0_16px_rgba(255,90,31,0.24)]">
                    {translate("common.labels.mostPopular")}
                  </span>
                ) : null}
              </div>

              <p className="mt-1 text-sm text-[color:var(--muted)]">
                {translate(getPlanMainKey(plan.id, "emotional"))}
              </p>

              <div className="mt-8 text-center">
                <p className="text-[2rem] font-black leading-none tracking-tight text-[color:var(--text)] md:text-[2.2rem]">
                  {translate(getPlanMainKey(plan.id, "price"))}
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-[color:var(--muted)]">
                  {translate("landing.pricing.monthly")}
                </p>
              </div>

              <ul className="mt-8 space-y-3 text-sm text-[color:var(--text)]">
                {[1, 2, 3].map((itemIndex) => {
                  const key = getPlanItemKey(plan.id, itemIndex as PlanItemField);

                  return (
                    <li key={`${plan.id}-${itemIndex}`} className="flex items-center gap-3">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full text-[color:var(--accent)]">
                        <Check size={14} />
                      </span>
                      <span className="text-[1.03rem] font-medium text-[color:var(--text)]">
                        {translate(key)}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-auto pt-6">
                <motion.div
                  whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button variant={plan.popular ? "primary" : "secondary"} className="w-full">
                    {translate("common.actions.choosePlan")}
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
