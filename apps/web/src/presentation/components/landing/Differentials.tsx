"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BrainCircuit, CheckCheck, RadioTower, RefreshCcwDot } from "lucide-react";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";

const Differentials = (): JSX.Element => {
  const { translate } = useAppLanguage();
  const reduceMotion = useReducedMotion();
  const items = [
    { key: "item1", icon: BrainCircuit, soon: false },
    { key: "item2", icon: CheckCheck, soon: false },
    { key: "item3", icon: RadioTower, soon: true },
    { key: "item4", icon: RefreshCcwDot, soon: false }
  ] as const;

  return (
    <section
      id="differentials"
      className="mx-auto w-full max-w-[78rem] px-5 py-14 md:px-8 md:py-20"
    >
      <header className="mb-8 max-w-3xl">
        <p className="section-kicker">{translate("landing.differentials.kicker")}</p>
        <h2 className="mt-3 text-[clamp(1.9rem,4vw,3.2rem)] font-black leading-[0.96] tracking-tight text-[color:var(--text)]">
          {translate("landing.differentials.title")}
        </h2>
      </header>

      <div className="grid gap-3">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.article
              key={item.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
              whileHover={reduceMotion ? undefined : { y: -4 }}
              className="clarity-feature-card editorial-card no-accent-hover flex items-center justify-between gap-4 rounded-[1.5rem] border border-[color:var(--border)] p-5"
            >
              <div className="flex items-center gap-4">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[color:var(--border)] bg-[color:var(--surface2)] text-[color:var(--accent)]">
                  <Icon size={18} />
                </span>
                <p className="text-sm font-semibold text-[color:var(--text)] md:text-base">
                  {translate(`landing.differentials.${item.key}`)}
                </p>
              </div>
              {item.soon ? (
                <span className="rounded-full border border-[color:var(--accent)]/40 bg-[color:var(--accent)]/12 px-3 py-1 text-xs font-semibold text-[color:var(--accent)]">
                  {translate("common.labels.soon")}
                </span>
              ) : null}
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};

export default Differentials;
