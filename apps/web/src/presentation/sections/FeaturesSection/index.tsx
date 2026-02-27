"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Button from "@web/presentation/components/Button";
import Section from "@web/presentation/components/Section";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";

const FeaturesSection = (): JSX.Element => {
  const { translate } = useAppLanguage();
  const [showAll, setShowAll] = useState(false);
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

  const featureVisuals = useMemo(
    () => [
      { icon: "🎚️", accent: "from-indigo-500/40 to-blue-500/40" },
      { icon: "🗓️", accent: "from-orange-400/40 to-amber-400/40" },
      { icon: "🫶", accent: "from-fuchsia-500/40 to-purple-500/40" },
      { icon: "🎼", accent: "from-cyan-400/40 to-sky-500/40" },
      { icon: "🎤", accent: "from-violet-500/40 to-indigo-500/40" },
      { icon: "✨", accent: "from-orange-500/40 to-rose-500/40" },
      { icon: "👥", accent: "from-emerald-500/35 to-cyan-500/35" },
      { icon: "📣", accent: "from-amber-500/35 to-orange-500/35" },
      { icon: "🧭", accent: "from-sky-500/35 to-indigo-500/35" }
    ],
    []
  );

  const visibleFeatures = showAll ? featureList : featureList.slice(0, 6);

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
        {[
          "https://images.unsplash.com/photo-1464375117522-1311dd7d0cd8?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80"
        ].map((source, index) => (
          <div
            key={source}
            className="group relative overflow-hidden rounded-2xl border border-white/10"
          >
            <Image
              src={source}
              alt={translate(imageAlts[index])}
              width={900}
              height={600}
              className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-transparent" />
          </div>
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
            whileHover={{ y: -8 }}
            className="group relative min-h-32 overflow-hidden rounded-2xl border border-white/15 bg-slate-900/45 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.5)] transition"
          >
            <div
              className={`absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 bg-gradient-to-br ${featureVisuals[index].accent}`}
            />
            <motion.span
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-lg"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 5.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              {featureVisuals[index].icon}
            </motion.span>
            <p className="relative mt-4 text-sm font-semibold text-white">{featureName}</p>
          </motion.article>
        ))}
      </div>
      <div className="mt-6">
        <Button
          variant="ghost"
          onClick={() => setShowAll((currentValue) => !currentValue)}
          className="border border-white/15 bg-white/10 text-white hover:bg-white/20"
        >
          {showAll ? translate("common.actions.seeLess") : translate("common.actions.seeMore")}
        </Button>
      </div>
    </Section>
  );
};

export default FeaturesSection;
