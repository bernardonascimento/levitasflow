"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import Button from "@web/presentation/components/Button";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";

const Hero = (): JSX.Element => {
  const { translate } = useAppLanguage();
  const reduceMotion = useReducedMotion();
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
    <section className="relative mx-auto w-full max-w-[78rem] px-5 pb-14 pt-8 md:px-8 md:pb-20 md:pt-14">
      <div className="hero-shell relative overflow-hidden rounded-[2.3rem] p-6 md:p-10">
        <div className="absolute left-3 top-3 z-10 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)]/95 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)] md:text-xs">
          {translate("landing.hero.eyebrow")}
        </div>

        <div className="grid items-center gap-10 pt-12 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            <h1 className="max-w-3xl text-[clamp(2.6rem,6.3vw,5.9rem)] font-black leading-[0.94] tracking-[-0.03em] text-[color:var(--text)]">
              <span className="block">{firstTitle}.</span>
              <span className="gradient-text block">{secondTitle}.</span>
            </h1>
            <p className="max-w-2xl text-base text-[color:var(--muted)] md:text-lg">
              {translate("landing.hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-3">
              <motion.div
                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="px-7">{translate("common.actions.createFreeAccount")}</Button>
              </motion.div>
              <a href="#features">
                <motion.div
                  whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button variant="secondary" className="px-7">
                    {translate("common.actions.viewHowItWorks")}
                  </Button>
                </motion.div>
              </a>
            </div>

            <ul className="flex flex-wrap gap-2.5 pt-2">
              <li className="floating-chip">{translate("landing.features.scales")}</li>
              <li className="floating-chip">{translate("landing.features.ministryNotices")}</li>
              <li className="floating-chip">{translate("landing.hero.chips.platform")}</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
            className="relative"
          >
            <div className="editorial-card relative overflow-hidden rounded-[1.8rem] p-3 md:p-4">
              <div className="relative overflow-hidden rounded-[1.25rem]">
                <Image
                  src="/landing/landing-hero.jpg"
                  alt={translate("landing.hero.images.mainAlt")}
                  width={1200}
                  height={900}
                  priority
                  className="h-[22rem] w-full object-cover md:h-[30rem]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
              </div>

              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
                transition={{ duration: 4.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute right-5 top-6 rounded-xl border border-white/25 bg-slate-900/70 px-3 py-2 text-xs text-white shadow-lg backdrop-blur"
              >
                <p className="font-semibold">{translate("landing.hero.preview.schedule")}</p>
                <p className="opacity-90">{translate("landing.hero.preview.scheduleValue")}</p>
              </motion.div>

              <motion.div
                animate={reduceMotion ? undefined : { y: [0, 4, 0] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute left-6 top-[58%] rounded-xl border border-white/30 bg-white/90 px-3 py-2 text-xs text-slate-900 shadow-lg backdrop-blur dark:bg-slate-900/72 dark:text-white"
              >
                <p className="font-semibold">{translate("landing.hero.preview.repertoire")}</p>
                <p className="opacity-90">{translate("landing.hero.preview.repertoireValue")}</p>
              </motion.div>

              <motion.div
                animate={reduceMotion ? undefined : { x: [0, 4, 0] }}
                transition={{ duration: 6.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute bottom-6 right-6 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)]/90 px-4 py-2 text-xs font-semibold text-[color:var(--text)] backdrop-blur"
              >
                {translate("landing.hero.preview.sunday")} •{" "}
                {translate("landing.hero.preview.tasks")}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
