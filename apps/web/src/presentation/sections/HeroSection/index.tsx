"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "@web/presentation/components/Button";
import Section from "@web/presentation/components/Section";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";

const particles = Array.from({ length: 18 }, (_, index) => ({
  id: `particle-${index}`,
  left: `${6 + index * 5}%`,
  size: 4 + (index % 4) * 3,
  duration: 7 + (index % 5)
}));

const HeroSection = (): JSX.Element => {
  const { translate } = useAppLanguage();
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <Section ref={sectionRef} className="relative overflow-hidden pb-20 pt-10 md:pt-14">
      <motion.div
        className="absolute inset-0 -z-20 rounded-[2.3rem] bg-[linear-gradient(120deg,#020617_0%,#312e81_35%,#2563eb_62%,#f97316_100%)] opacity-95"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        style={{ backgroundSize: "180% 180%" }}
      />
      <div className="absolute inset-0 -z-10 rounded-[2.3rem] bg-slate-950/35" />
      <div className="absolute right-[10%] top-[14%] -z-10 h-64 w-64 rounded-full bg-orange-400/25 blur-3xl" />
      <div className="absolute left-[6%] top-[36%] -z-10 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />

      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute -z-10 rounded-full bg-white/35"
          style={{
            left: particle.left,
            width: particle.size,
            height: particle.size
          }}
          animate={{
            y: [0, -35, 0],
            opacity: [0.2, 0.65, 0.2]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.size * 0.14,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut"
          }}
        />
      ))}

      <div className="grid items-center gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="space-y-6"
        >
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-orange-200">
            {translate("landing.hero.eyebrow")}
          </span>
          <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">
            {translate("landing.hero.title")}
          </h1>
          <p className="max-w-xl text-base text-slate-200/95 md:text-lg">
            {translate("landing.hero.subtitle")}
          </p>
          <p className="max-w-lg text-sm text-orange-100/90 md:text-base">
            {translate("landing.hero.supporting")}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button className="shadow-[0_0_24px_rgba(249,115,22,0.55)] hover:shadow-[0_0_34px_rgba(249,115,22,0.7)]">
              {translate("common.actions.createFreeAccount")}
            </Button>
            <a href="#features">
              <Button
                variant="secondary"
                className="border border-white/20 bg-white/10 text-white shadow-[0_0_16px_rgba(255,255,255,0.2)] hover:bg-white/20 dark:bg-white/10 dark:text-white"
              >
                {translate("common.actions.viewHowItWorks")}
              </Button>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="relative"
          style={{ y: parallaxY }}
        >
          <div className="pointer-events-none absolute inset-0 -z-10 translate-y-5 rounded-[2rem] bg-orange-400/30 blur-3xl" />
          <motion.div
            className="rounded-[2rem] border border-white/20 bg-slate-950/55 p-4 shadow-2xl backdrop-blur-xl"
            animate={{ y: [0, -10, 0], rotate: [0.15, -0.2, 0.15] }}
            transition={{
              duration: 6.5,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY
            }}
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_30%,rgba(249,115,22,0.32),transparent_62%)]" />
              <Image
                src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80"
                alt={translate("landing.hero.images.mainAlt")}
                width={900}
                height={560}
                className="h-72 w-full object-cover md:h-80"
                priority
              />
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/15 bg-white/10 p-3">
                <p className="text-xs text-slate-300">
                  {translate("landing.hero.preview.schedule")}
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {translate("landing.hero.preview.scheduleValue")}
                </p>
              </div>
              <div className="rounded-xl border border-white/15 bg-white/10 p-3">
                <p className="text-xs text-slate-300">
                  {translate("landing.hero.preview.repertoire")}
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {translate("landing.hero.preview.repertoireValue")}
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between rounded-xl border border-orange-300/35 bg-orange-400/12 px-3 py-2 text-xs">
              <span className="font-semibold text-orange-100">
                {translate("landing.hero.preview.sunday")}
              </span>
              <span className="rounded-full bg-orange-400/30 px-2 py-1 font-semibold text-orange-100">
                {translate("landing.hero.preview.tasks")}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
};

export default HeroSection;
