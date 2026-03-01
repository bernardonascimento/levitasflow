"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import Button from "@web/presentation/components/Button";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";
import type { MinistryOption } from "@web/presentation/providers/MinistryProvider";
import type { DashboardSummary } from "@web/lib/ministry/actions";
import styles from "./DashboardHeroCard.module.css";

type DashboardHeroCardProps = {
  ministry: MinistryOption;
  summary: DashboardSummary;
  scalesThisMonth?: number;
  pendingConfirmations?: number;
  nextEventDays?: number | null;
  onCreateScale?: () => void;
};

const DashboardHeroCard = ({
  ministry,
  summary,
  scalesThisMonth = 0,
  pendingConfirmations,
  nextEventDays = null,
  onCreateScale
}: DashboardHeroCardProps): JSX.Element => {
  const { translate } = useAppLanguage();
  const reduceMotion = useReducedMotion();
  const pending = pendingConfirmations ?? summary.pendingInvites;

  const badges = [
    { label: translate("dashboard.overview.badgeActiveMembers"), value: summary.members },
    { label: translate("dashboard.overview.badgeTeams"), value: summary.teams },
    { label: translate("dashboard.overview.badgeScalesThisMonth"), value: scalesThisMonth },
    { label: translate("dashboard.overview.badgePendingConfirmations"), value: pending }
  ];

  const nextEventText =
    nextEventDays != null
      ? translate("dashboard.overview.nextEventInDays").replace("{n}", String(nextEventDays))
      : null;

  return (
    <motion.header
      initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={styles.hero}
    >
      <div className={styles.glowLeft} aria-hidden />
      <div className={styles.glowRight} aria-hidden />
      <div
        className={`${styles.heroInner} flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:gap-8 md:p-8`}
      >
        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-black tracking-tight text-[color:var(--text)] md:text-4xl">
            {ministry.name}
          </h1>
          <p className="mt-2 text-sm text-[color:var(--muted)] md:text-base">
            {translate("dashboard.subtitle")}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {badges.map((b) => (
              <span
                key={b.label}
                className="rounded-full border border-[color:var(--border)] bg-[color:var(--surface2)]/90 px-3 py-1.5 text-xs font-semibold text-[color:var(--text)]"
              >
                {b.value} {b.label}
              </span>
            ))}
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-start gap-3 md:items-end">
          <Button
            variant="primary"
            size="sm"
            className="inline-flex items-center justify-center"
            onClick={onCreateScale ?? (() => {})}
          >
            <Plus className="h-4 w-4 shrink-0" />
            {translate("dashboard.overview.createScale")}
          </Button>
          {nextEventText ? (
            <p className="text-xs font-medium text-[color:var(--muted)]">{nextEventText}</p>
          ) : null}
        </div>
      </div>
    </motion.header>
  );
};

export default DashboardHeroCard;
