"use client";

import { motion, useReducedMotion } from "framer-motion";
import FeatureCard from "@web/presentation/components/landing/FeatureCard";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";

const cards = [
  { key: "card1", variant: "scales" },
  { key: "card2", variant: "confirmations" },
  { key: "card3", variant: "repertoire" },
  { key: "card4", variant: "communication" }
] as const;

const Benefits = (): JSX.Element => {
  const { translate } = useAppLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <section className="clarity-section relative mx-auto w-full max-w-[78rem] overflow-hidden px-5 py-16 md:px-8 md:py-24">
      <div
        className={`clarity-ambient-spotlight absolute inset-0 -z-10 ${reduceMotion ? "" : "clarity-ambient-animate"}`}
      />

      <motion.header
        initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: reduceMotion ? 0.25 : 0.55, ease: "easeOut" }}
        className="mb-7 max-w-3xl md:mb-7"
      >
        <p className="section-kicker">{translate("landing.benefits.kicker")}</p>
        <h2 className="mt-2 text-[clamp(1.9rem,4.2vw,3.4rem)] font-black leading-[0.96] tracking-tight text-[color:var(--text)]">
          {translate("landing.benefits.title")}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[color:var(--muted)] md:text-base">
          {translate("landing.benefits.subtitle")}
        </p>
      </motion.header>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: reduceMotion ? 0 : 0.08
            }
          }
        }}
        className="grid items-stretch gap-4 md:grid-cols-2 md:gap-5"
      >
        {cards.map((card, index) => (
          <motion.div
            key={card.key}
            variants={{
              hidden: { opacity: 0, y: reduceMotion ? 0 : 12, scale: reduceMotion ? 1 : 0.985 },
              show: { opacity: 1, y: 0, scale: 1 }
            }}
            transition={{
              duration: reduceMotion ? 0.24 : 0.58,
              delay: index * 0.03,
              ease: "easeOut"
            }}
            className="h-full"
          >
            <FeatureCard
              variant={card.variant}
              title={translate(`landing.benefits.${card.key}.title`)}
              description={translate(`landing.benefits.${card.key}.description`)}
              micro={translate(`landing.benefits.${card.key}.micro`)}
              delay={index * 0.05}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Benefits;
