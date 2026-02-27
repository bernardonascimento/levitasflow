"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import Button from "@web/presentation/components/Button";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";
import HeroMediaCard from "./HeroMediaCard";

const HeroSection = (): JSX.Element => {
  const { translate } = useAppLanguage();

  const titleParts = useMemo(
    () =>
      translate("landing.hero.title")
        .split(".")
        .map((item) => item.trim())
        .filter(Boolean),
    [translate]
  );
  const firstTitle = titleParts[0] ?? "";
  const secondTitle = titleParts[1] ?? "";

  return (
    <section className="relative mx-auto w-full max-w-[78rem] overflow-visible px-5 pb-14 pt-8 md:px-8 md:pb-20 md:pt-14">
      <div className="grid items-center gap-10 lg:grid-cols-[1.04fr_0.96fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6"
        >
          <span className="section-kicker">{translate("landing.hero.eyebrow")}</span>
          <h1 className="max-w-3xl text-[clamp(2.6rem,6.3vw,5.9rem)] font-black leading-[0.94] tracking-[-0.03em] text-[color:var(--text)]">
            <span className="block">{firstTitle}.</span>
            <span className="gradient-text block">{secondTitle}.</span>
          </h1>
          <p className="max-w-2xl text-base text-[color:var(--muted)] md:text-lg">
            {translate("landing.hero.subtitle")}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button className="px-7">{translate("common.actions.createFreeAccount")}</Button>
            <a href="#features">
              <Button variant="secondary" className="px-7">
                {translate("common.actions.viewHowItWorks")}
              </Button>
            </a>
          </div>
          <ul className="flex flex-wrap gap-2.5 pt-2">
            <li className="floating-chip">{translate("landing.features.scales")}</li>
            <li className="floating-chip">{translate("landing.features.ministryNotices")}</li>
            <li className="floating-chip">{translate("landing.hero.chips.platform")}</li>
          </ul>
        </motion.div>

        <div className="relative overflow-visible lg:translate-x-7">
          <HeroMediaCard />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
