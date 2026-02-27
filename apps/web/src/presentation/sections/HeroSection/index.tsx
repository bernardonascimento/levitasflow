"use client";

import Image from "next/image";
import { useMemo, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Button from "@web/presentation/components/Button";
import Section from "@web/presentation/components/Section";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";

const particles = Array.from({ length: 14 }, (_, index) => ({
  id: `particle-${index}`,
  left: `${4 + index * 7}%`,
  size: 3 + (index % 3) * 3,
  duration: 6 + (index % 4)
}));

const HeroSection = (): JSX.Element => {
  const { translate } = useAppLanguage();
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [18, -18]);
  const chipLabels = useMemo(
    () => [
      translate("landing.features.scales"),
      translate("landing.features.ministryNotices"),
      translate("landing.hero.chips.platform")
    ],
    [translate]
  );
  const titleParts = translate("landing.hero.title")
    .split(".")
    .map((titlePart) => titlePart.trim())
    .filter(Boolean);

  return (
    <Section ref={sectionRef} className="relative overflow-hidden pb-20 pt-8 md:pt-12">
      <motion.div
        className="absolute inset-0 -z-20 rounded-[2.3rem] border border-[color:var(--border)] bg-[linear-gradient(145deg,color-mix(in_srgb,var(--surface)_80%,transparent),color-mix(in_srgb,var(--surface2)_72%,transparent))]"
        animate={
          prefersReducedMotion
            ? undefined
            : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
        }
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        style={{ backgroundSize: "180% 180%" }}
      />
      <div className="absolute inset-0 -z-10 rounded-[2.3rem] bg-[radial-gradient(circle_at_top_right,color-mix(in_srgb,var(--accent)_18%,transparent),transparent_42%)]" />
      <div className="absolute right-[9%] top-[12%] -z-10 h-64 w-64 rounded-full bg-[color:var(--accent)]/15 blur-3xl" />
      <div className="absolute left-[6%] top-[36%] -z-10 h-72 w-72 rounded-full bg-[color:var(--glow-secondary)]/70 blur-3xl" />

      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute -z-10 rounded-full bg-[color:var(--accent2)]/50"
          style={{
            left: particle.left,
            width: particle.size,
            height: particle.size
          }}
          animate={prefersReducedMotion ? undefined : { y: [0, -30, 0], opacity: [0.2, 0.58, 0.2] }}
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
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="space-y-6"
        >
          <span className="inline-flex rounded-full border border-[color:var(--border)] bg-[color:var(--surface2)] px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
            {translate("landing.hero.eyebrow")}
          </span>
          <motion.h1
            className="max-w-xl text-4xl font-black leading-tight tracking-tight text-[color:var(--text)] md:text-6xl"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.45 }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: prefersReducedMotion ? 0 : 0.08
                }
              }
            }}
          >
            {titleParts.map((titlePart, index) => (
              <motion.span
                key={`${titlePart}-${index}`}
                className="block"
                variants={{
                  hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 18 },
                  show: { opacity: 1, y: 0 }
                }}
              >
                {index === 0 ? (
                  <span>{titlePart}.</span>
                ) : (
                  <span className="bg-gradient-to-r from-[color:var(--accent)] to-[color:var(--accent2)] bg-clip-text text-transparent">
                    {titlePart}
                  </span>
                )}
              </motion.span>
            ))}
          </motion.h1>
          <p className="max-w-xl text-base text-[color:var(--muted)] md:text-lg">
            {translate("landing.hero.subtitle")}
          </p>
          <p className="max-w-lg text-sm text-[color:var(--muted)] md:text-base">
            {translate("landing.hero.supporting")}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button className="group gap-2 px-6 shadow-[0_0_24px_color-mix(in_srgb,var(--accent)_58%,transparent)]">
              <span>{translate("common.actions.createFreeAccount")}</span>
              <motion.span
                className="inline-block h-5 w-5 rounded-full bg-white/30"
                animate={prefersReducedMotion ? undefined : { x: [-8, 12] }}
                transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
            </Button>
            <a href="#features">
              <Button variant="secondary" className="px-6">
                {translate("common.actions.viewHowItWorks")}
              </Button>
            </a>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {chipLabels.map((label) => (
              <span
                key={label}
                className="rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-1 text-xs font-semibold text-[color:var(--muted)]"
              >
                {label}
              </span>
            ))}
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
          <div className="pointer-events-none absolute inset-0 -z-10 translate-y-5 rounded-[2rem] bg-[color:var(--accent)]/20 blur-3xl" />
          <motion.div
            className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)]/90 p-4 shadow-[var(--shadow)] backdrop-blur-xl"
            animate={prefersReducedMotion ? undefined : { y: [0, -8, 0], rotate: [0.2, -0.2, 0.2] }}
            transition={{
              duration: 6.5,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY
            }}
          >
            <div className="relative overflow-hidden rounded-2xl border border-[color:var(--border)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_30%,color-mix(in_srgb,var(--accent)_24%,transparent),transparent_62%)]" />
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
              <motion.div
                className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface2)] p-3"
                animate={prefersReducedMotion ? undefined : { y: [0, -5, 0] }}
                transition={{ duration: 4.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <p className="text-xs text-[color:var(--muted)]">
                  {translate("landing.hero.preview.schedule")}
                </p>
                <p className="mt-1 text-sm font-semibold text-[color:var(--text)]">
                  {translate("landing.hero.preview.scheduleValue")}
                </p>
              </motion.div>
              <motion.div
                className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface2)] p-3"
                animate={prefersReducedMotion ? undefined : { y: [0, 4, 0] }}
                transition={{ duration: 5.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <p className="text-xs text-[color:var(--muted)]">
                  {translate("landing.hero.preview.repertoire")}
                </p>
                <p className="mt-1 text-sm font-semibold text-[color:var(--text)]">
                  {translate("landing.hero.preview.repertoireValue")}
                </p>
              </motion.div>
            </div>
            <div className="mt-3 flex items-center justify-between rounded-xl border border-[color:var(--border)] bg-[color:var(--surface2)] px-3 py-2 text-xs">
              <span className="font-semibold text-[color:var(--text)]">
                {translate("landing.hero.preview.sunday")}
              </span>
              <span className="rounded-full bg-[color:var(--accent)]/15 px-2 py-1 font-semibold text-[color:var(--accent)]">
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
