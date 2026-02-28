"use client";

import Link from "next/link";
import { Rocket } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";

const UpgradeCard = (): JSX.Element => {
  const { translate } = useAppLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[linear-gradient(145deg,color-mix(in_srgb,var(--surface)_92%,transparent),color-mix(in_srgb,var(--surface2)_88%,transparent))] p-4 shadow-[var(--shadow)] transition-shadow duration-300 [background-image:linear-gradient(145deg,color-mix(in_srgb,var(--surface)_92%,transparent),color-mix(in_srgb,var(--surface2)_88%,transparent)),radial-gradient(ellipse_80%_50%_at_0%_0%,rgba(255,90,31,0.08),transparent_70%)] hover:shadow-[0_12px_32px_color-mix(in_srgb,var(--accent)_18%,transparent)] dark:hover:shadow-[0_12px_36px_rgba(255,90,31,0.2)]"
      whileHover={reduceMotion ? undefined : { y: -2 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className="flex items-start gap-3">
        <span
          className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[color:var(--accent)] transition-transform duration-300 [box-shadow:0_0_20px_rgba(255,90,31,0.2)] before:absolute before:inset-0 before:rounded-xl before:bg-[color:var(--accent)]/15 before:content-[''] group-hover:rotate-6"
          aria-hidden
        >
          <Rocket className="relative z-10 h-5 w-5" strokeWidth={2} />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold text-[color:var(--text)]">
            {translate("dashboard.upgradeCard.titleElevate")}
          </h3>
          <p className="mt-1 text-xs leading-snug text-[color:var(--muted)]">
            {translate("dashboard.upgradeCard.descriptionUnlock")}
          </p>
        </div>
      </div>
      <Link href="/pricing" className="mt-4 block">
        <motion.span
          className="app-upgrade-btn app-upgrade-btn-shine relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-[color:var(--accent)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_color-mix(in_srgb,var(--accent)_34%,transparent)] transition-shadow duration-300 dark:shadow-[0_12px_28px_rgba(255,90,31,0.35)] hover:shadow-[0_14px_30px_color-mix(in_srgb,var(--accent)_40%,transparent)] dark:hover:shadow-[0_14px_34px_rgba(255,90,31,0.48)]"
          whileHover={reduceMotion ? undefined : { y: -2 }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {translate("dashboard.upgradeCard.cta")}
        </motion.span>
      </Link>
    </motion.div>
  );
};

export default UpgradeCard;
