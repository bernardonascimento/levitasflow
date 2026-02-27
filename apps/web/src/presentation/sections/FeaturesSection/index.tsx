"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Bell,
  Calendar,
  Layers,
  Music,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon
} from "lucide-react";
import Button from "@web/presentation/components/Button";
import Section from "@web/presentation/components/Section";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";

type FeatureVisual = {
  icon: LucideIcon;
  glowClassName: string;
};

const FeaturesSection = (): JSX.Element => {
  const { translate } = useAppLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [showAll, setShowAll] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const imageAlts = [
    "landing.features.images.alt1",
    "landing.features.images.alt2",
    "landing.features.images.alt3",
    "landing.features.images.alt4"
  ] as const;

  const featureList = useMemo<string[]>(
    () => [
      translate("landing.features.scales"),
      translate("landing.features.agenda"),
      translate("landing.features.unavailability"),
      translate("landing.features.repertoire"),
      translate("landing.features.membersRoles"),
      translate("landing.features.aiSuggestions"),
      translate("landing.features.groupControl"),
      translate("landing.features.ministryNotices"),
      translate("landing.features.ministryRoadmap")
    ],
    [translate]
  );

  const featureVisuals = useMemo<FeatureVisual[]>(
    () => [
      { icon: Layers, glowClassName: "from-orange-500/30 to-amber-400/30" },
      { icon: Calendar, glowClassName: "from-orange-500/30 to-sky-500/28" },
      { icon: ShieldCheck, glowClassName: "from-cyan-500/26 to-blue-500/26" },
      { icon: Music, glowClassName: "from-violet-500/26 to-indigo-500/26" },
      { icon: Users, glowClassName: "from-emerald-500/26 to-cyan-500/28" },
      { icon: Sparkles, glowClassName: "from-orange-500/30 to-rose-500/28" },
      { icon: Layers, glowClassName: "from-sky-500/26 to-indigo-500/26" },
      { icon: Bell, glowClassName: "from-amber-500/30 to-orange-500/30" },
      { icon: Calendar, glowClassName: "from-fuchsia-500/20 to-indigo-500/30" }
    ],
    []
  );

  const visibleFeatures = showAll ? featureList : featureList.slice(0, 6);
  const images = [
    "https://images.unsplash.com/photo-1464375117522-1311dd7d0cd8?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80"
  ] as const;

  return (
    <Section
      id="features"
      title={translate("landing.features.title")}
      subtitle={translate("landing.features.subtitle")}
      className="relative"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {images.map((source, index) => (
          <motion.div
            key={source}
            whileHover={prefersReducedMotion ? undefined : { y: -6, scale: 1.02 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="group relative overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] shadow-[var(--shadow)]"
          >
            {!loadedImages[index] ? (
              <div className="absolute inset-0 animate-pulse bg-[color:var(--surface2)]" />
            ) : null}
            <Image
              src={source}
              alt={translate(imageAlts[index])}
              width={900}
              height={600}
              placeholder="blur"
              blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='9'%3E%3Crect width='16' height='9' fill='%23f6c9a5'/%3E%3C/svg%3E"
              onLoad={() =>
                setLoadedImages((currentValue) => ({
                  ...currentValue,
                  [index]: true
                }))
              }
              className="h-44 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent dark:from-black/60" />
          </motion.div>
        ))}
      </motion.div>

      <div className="grid gap-4 md:grid-cols-3">
        {visibleFeatures.map((featureName, index) => (
          <motion.article
            key={featureName}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
            whileHover={prefersReducedMotion ? undefined : { y: -8, rotateX: 3, rotateY: -3 }}
            className="group relative min-h-32 overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 shadow-[var(--shadow)] transition duration-300"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className={`absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-65 blur-2xl transition duration-300 group-hover:opacity-100 bg-gradient-to-br ${featureVisuals[index].glowClassName}`}
            />
            <motion.div
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[color:var(--border)] bg-[color:var(--surface2)] text-[color:var(--accent)]"
              animate={prefersReducedMotion ? undefined : { rotate: [0, 7, -7, 0] }}
              transition={{ duration: 5.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              {(() => {
                const Icon = featureVisuals[index].icon;
                return <Icon size={18} />;
              })()}
            </motion.div>
            <p className="relative mt-4 text-sm font-semibold text-[color:var(--text)]">
              {featureName}
            </p>
          </motion.article>
        ))}
      </div>
      <div className="mt-6">
        <Button
          variant="ghost"
          onClick={() => setShowAll((currentValue) => !currentValue)}
          className="border border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--text)]"
        >
          {showAll ? translate("common.actions.seeLess") : translate("common.actions.seeMore")}
        </Button>
      </div>
    </Section>
  );
};

export default FeaturesSection;
