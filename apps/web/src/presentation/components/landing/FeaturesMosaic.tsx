"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CalendarDays, Layers3, Mic2, Sparkles, UsersRound } from "lucide-react";
import Button from "@web/presentation/components/Button";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";

const FeaturesMosaic = (): JSX.Element => {
  const { translate } = useAppLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <section id="features" className="mx-auto w-full max-w-[78rem] px-5 py-14 md:px-8 md:py-20">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-3xl">
          <p className="section-kicker">{translate("landing.features.kicker")}</p>
          <h2 className="mt-3 text-[clamp(1.9rem,4.2vw,3.4rem)] font-black leading-[0.95] tracking-[-0.02em] text-[color:var(--text)]">
            {translate("landing.features.title")}
          </h2>
          <p className="mt-3 text-[color:var(--muted)]">{translate("landing.features.subtitle")}</p>
        </div>
        <a href="#differentials">
          <Button variant="ghost">{translate("common.actions.seeMore")}</Button>
        </a>
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          whileHover={reduceMotion ? undefined : { y: -5 }}
          className="editorial-card group relative col-span-1 overflow-hidden rounded-[1.6rem] border border-[color:var(--border)] p-0 lg:col-span-7"
        >
          <Image
            src="/landing/landing-keys.jpg"
            alt={translate("landing.features.images.alt1")}
            width={1400}
            height={900}
            className="h-[23rem] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 z-10 p-6 text-white">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/35 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]">
              <Layers3 size={14} />
              <span>{translate("landing.features.scales")}</span>
            </div>
            <h3 className="text-2xl font-black tracking-tight md:text-3xl">
              {translate("landing.features.mosaicMainTitle")}
            </h3>
            <p className="mt-2 max-w-xl text-sm text-white/85 md:text-base">
              {translate("landing.features.mosaicMainBody")}
            </p>
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.06, ease: "easeOut" }}
          whileHover={reduceMotion ? undefined : { y: -5 }}
          className="editorial-card group relative col-span-1 overflow-hidden rounded-[1.6rem] border border-[color:var(--border)] p-0 lg:col-span-5"
        >
          <Image
            src="/landing/landing-vocal.jpg"
            alt={translate("landing.features.images.alt2")}
            width={1200}
            height={900}
            className="h-[23rem] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 z-10 p-6 text-white">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/35 px-3 py-1 text-xs font-semibold">
              <Mic2 size={14} />
              {translate("landing.features.repertoire")}
            </div>
            <p className="text-xl font-bold">{translate("landing.features.repertoireBody")}</p>
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.09, ease: "easeOut" }}
          whileHover={reduceMotion ? undefined : { y: -5 }}
          className="clarity-feature-card editorial-card group relative col-span-1 overflow-hidden rounded-[1.5rem] border border-[color:var(--border)] p-6 lg:col-span-4"
        >
          <div className="clarity-feature-pattern pointer-events-none absolute inset-0 opacity-60" />
          <div className="clarity-feature-spotlight pointer-events-none absolute inset-0" />
          <div className="clarity-feature-shine pointer-events-none absolute inset-0" />
          <p className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface2)] px-3 py-1 text-xs font-semibold text-[color:var(--accent)]">
            <UsersRound size={14} />
            {translate("landing.features.membersRoles")}
          </p>
          <p className="mt-4 text-sm text-[color:var(--muted)]">
            {translate("landing.features.membersRolesBody")}
          </p>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.12, ease: "easeOut" }}
          whileHover={reduceMotion ? undefined : { y: -5 }}
          className="clarity-feature-card editorial-card group relative col-span-1 overflow-hidden rounded-[1.5rem] border border-[color:var(--border)] p-6 lg:col-span-4"
        >
          <div className="clarity-feature-pattern pointer-events-none absolute inset-0 opacity-60" />
          <div className="clarity-feature-spotlight pointer-events-none absolute inset-0" />
          <div className="clarity-feature-shine pointer-events-none absolute inset-0" />
          <p className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface2)] px-3 py-1 text-xs font-semibold text-[color:var(--accent)]">
            <Sparkles size={14} />
            {translate("landing.features.aiSuggestions")}
          </p>
          <p className="mt-4 text-sm text-[color:var(--muted)]">
            {translate("landing.features.aiSuggestionsBody")}
          </p>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          whileHover={reduceMotion ? undefined : { y: -5 }}
          className="editorial-card group relative col-span-1 overflow-hidden rounded-[1.6rem] border border-[color:var(--border)] p-0 lg:col-span-4"
        >
          <Image
            src="/landing/landing-mic.jpg"
            alt={translate("landing.features.images.alt3")}
            width={1200}
            height={900}
            className="h-full min-h-[11.8rem] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-4 left-4 z-10 text-white">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/40 px-3 py-1 text-xs font-semibold">
              <CalendarDays size={14} />
              {translate("landing.features.unavailability")}
            </p>
          </div>
        </motion.article>
      </div>
    </section>
  );
};

export default FeaturesMosaic;
