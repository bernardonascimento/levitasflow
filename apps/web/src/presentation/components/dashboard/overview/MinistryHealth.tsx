"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Heart, Users, UserX, Music } from "lucide-react";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";
import EmptyStateCard from "./EmptyStateCard";

const MOCK_HEALTH = {
  activeMembers: 12,
  inactiveMembers: 2,
  missedLastMonth: 1,
  teamsWithGaps: 0
};

type MinistryHealthProps = {
  activeMembers?: number;
  inactiveMembers?: number;
  missedLastMonth?: number;
  teamsWithGaps?: number;
  hasData?: boolean;
};

const MinistryHealth = ({
  activeMembers = MOCK_HEALTH.activeMembers,
  inactiveMembers = MOCK_HEALTH.inactiveMembers,
  missedLastMonth = MOCK_HEALTH.missedLastMonth,
  teamsWithGaps = MOCK_HEALTH.teamsWithGaps,
  hasData = true
}: MinistryHealthProps): JSX.Element => {
  const { translate } = useAppLanguage();
  const reduceMotion = useReducedMotion();

  const cards = [
    {
      key: "active",
      value: activeMembers,
      labelKey: "dashboard.overview.activeMembers" as const,
      icon: Users,
      isAlert: false
    },
    {
      key: "inactive",
      value: inactiveMembers,
      labelKey: "dashboard.overview.inactiveMembers" as const,
      icon: UserX,
      isAlert: true
    },
    {
      key: "missed",
      value: missedLastMonth,
      labelKey: "dashboard.overview.missedLastMonth" as const,
      icon: UserX,
      isAlert: true
    },
    {
      key: "gaps",
      value: teamsWithGaps,
      labelKey: "dashboard.overview.teamsWithGaps" as const,
      icon: Music,
      isAlert: true
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.3 }}
      className="rounded-[1.2rem] border border-[color:var(--border)] bg-[color:var(--surface)]/75 p-5 shadow-[var(--shadow)]"
    >
      <h2 className="flex items-center gap-2 text-lg font-bold text-[color:var(--text)]">
        <Heart className="h-5 w-5 text-[color:var(--muted)]" />
        {translate("dashboard.overview.ministryHealth")}
      </h2>

      {!hasData ? (
        <div className="mt-6">
          <EmptyStateCard
            icon={<Heart className="h-6 w-6" />}
            message={translate("dashboard.overview.noHealthData")}
          />
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4">
          {cards.map((item, i) => {
            const Icon = item.icon;
            const hasAlert = item.isAlert && item.value > 0;
            const strongAlert = item.key === "gaps" && item.value > 0;

            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 + i * 0.04, duration: 0.25 }}
                className={`relative overflow-hidden rounded-[1.2rem] border p-5 transition-shadow ${
                  hasAlert
                    ? strongAlert
                      ? "border-orange-500/40 bg-[color:var(--surface2)]/80 shadow-[0_0_24px_rgba(249,115,22,0.25)]"
                      : "border-orange-400/30 bg-[color:var(--surface2)]/80 shadow-[0_0_16px_rgba(249,115,22,0.15)]"
                    : "border-[color:var(--border)] bg-[color:var(--surface2)]/80"
                }`}
              >
                {hasAlert ? (
                  <div
                    className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-40 blur-2xl"
                    style={{
                      background: strongAlert ? "rgba(249,115,22,0.5)" : "rgba(249,115,22,0.3)"
                    }}
                    aria-hidden
                  />
                ) : null}
                <div className="relative z-10 flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[color:var(--surface)] text-[color:var(--muted)] shadow-sm">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-2xl font-bold text-[color:var(--text)]">{item.value}</p>
                    <p className="mt-0.5 text-sm font-medium text-[color:var(--muted)]">
                      {translate(item.labelKey)}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.section>
  );
};

export default MinistryHealth;
