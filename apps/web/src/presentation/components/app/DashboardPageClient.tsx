"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CalendarDays, Bell, Users, Plus } from "lucide-react";
import Button from "@web/presentation/components/Button";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";
import MemberCreateCard from "@web/presentation/components/app/MemberCreateCard";

type MinistryOption = {
  id: string;
  name: string;
  slug: string;
};

type DashboardSummary = {
  teams: number;
  members: number;
  activeRoles: number;
  pendingInvites: number;
};

type DashboardCardKey = keyof DashboardSummary;

type DashboardPageClientProps = {
  ministries: MinistryOption[];
  selectedMinistryId: string;
  summary: DashboardSummary;
};

const DashboardPageClient = ({
  ministries,
  selectedMinistryId,
  summary
}: DashboardPageClientProps): JSX.Element => {
  const { translate } = useAppLanguage();
  const reduceMotion = useReducedMotion();
  const selectedMinistry = ministries.find((m) => m.id === selectedMinistryId);

  const cardKey = (key: DashboardCardKey): `dashboard.cards.${DashboardCardKey}` =>
    `dashboard.cards.${key}`;

  const summaryChips: Array<{ key: DashboardCardKey; value: number }> = [
    { key: "teams", value: summary.teams },
    { key: "members", value: summary.members },
    { key: "activeRoles", value: summary.activeRoles },
    { key: "pendingInvites", value: summary.pendingInvites }
  ];

  return (
    <main className="space-y-6 pb-8">
      <motion.header
        initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 rounded-[1.2rem] border border-[color:var(--border)] bg-[color:var(--surface)]/75 p-5 shadow-[var(--shadow)] md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-2xl font-black tracking-tight text-[color:var(--text)] md:text-3xl">
            {selectedMinistry?.name ?? translate("dashboard.title")}
          </h1>
          <p className="mt-1 text-sm text-[color:var(--muted)]">
            {translate("dashboard.subtitle")}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {summaryChips.map((item) => (
            <span
              key={item.key}
              className="rounded-full border border-[color:var(--border)] bg-[color:var(--surface2)]/80 px-3 py-1.5 text-xs font-semibold text-[color:var(--text)]"
            >
              {translate(cardKey(item.key))}: {item.value}
            </span>
          ))}
          <Button
            variant="secondary"
            className="inline-flex items-center gap-1.5"
            onClick={() => {}}
          >
            <Plus className="h-4 w-4" />
            {translate("dashboard.createTeam")}
          </Button>
        </div>
      </motion.header>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.section
          initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-[1.2rem] border border-[color:var(--border)] bg-[color:var(--surface)]/75 p-5 shadow-[var(--shadow)] transition hover:shadow-[0_0_0_1px_rgba(255,90,31,0.06)]"
        >
          <h2 className="flex items-center gap-2 text-lg font-bold text-[color:var(--text)]">
            <CalendarDays className="h-5 w-5 text-[color:var(--muted)]" />
            {translate("dashboard.nextSchedule")}
          </h2>
          <div className="mt-4 flex flex-col items-center justify-center rounded-xl border border-dashed border-[color:var(--border)] bg-[color:var(--surface2)]/50 py-10">
            <CalendarDays className="h-10 w-10 text-[color:var(--muted)]" />
            <p className="mt-2 text-sm font-medium text-[color:var(--text)]">
              {translate("dashboard.emptyScales")}
            </p>
            <p className="mt-1 text-xs text-[color:var(--muted)]">
              {translate("dashboard.emptyScalesDesc")}
            </p>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="rounded-[1.2rem] border border-[color:var(--border)] bg-[color:var(--surface)]/75 p-5 shadow-[var(--shadow)] transition hover:shadow-[0_0_0_1px_rgba(255,90,31,0.06)]"
        >
          <h2 className="flex items-center gap-2 text-lg font-bold text-[color:var(--text)]">
            <Bell className="h-5 w-5 text-[color:var(--muted)]" />
            {translate("dashboard.recentNotices")}
          </h2>
          <div className="mt-4 flex flex-col items-center justify-center rounded-xl border border-dashed border-[color:var(--border)] bg-[color:var(--surface2)]/50 py-10">
            <Bell className="h-10 w-10 text-[color:var(--muted)]" />
            <p className="mt-2 text-sm font-medium text-[color:var(--text)]">
              {translate("dashboard.emptyNotices")}
            </p>
            <p className="mt-1 text-xs text-[color:var(--muted)]">
              {translate("dashboard.emptyNoticesDesc")}
            </p>
          </div>
        </motion.section>
      </div>

      <motion.section
        initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-[1.2rem] border border-[color:var(--border)] bg-[color:var(--surface)]/75 p-5 shadow-[var(--shadow)]"
      >
        <h2 className="flex items-center gap-2 text-lg font-bold text-[color:var(--text)]">
          <Users className="h-5 w-5 text-[color:var(--muted)]" />
          {translate("dashboard.teamMembers")}
        </h2>
        <MemberCreateCard ministryId={selectedMinistryId} />
      </motion.section>
    </main>
  );
};

export default DashboardPageClient;
