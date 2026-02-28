"use client";

import { motion, useReducedMotion } from "framer-motion";
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
  const selectedMinistry = ministries.find((ministry) => ministry.id === selectedMinistryId);
  const cardKey = (key: DashboardCardKey): `dashboard.cards.${DashboardCardKey}` => {
    return `dashboard.cards.${key}`;
  };
  const summaryCards: Array<{ key: DashboardCardKey; value: number }> = [
    { key: "teams", value: summary.teams },
    { key: "members", value: summary.members },
    { key: "activeRoles", value: summary.activeRoles },
    { key: "pendingInvites", value: summary.pendingInvites }
  ];

  return (
    <main className="space-y-5">
      <header className="rounded-[1.2rem] border border-[color:var(--border)] bg-[color:var(--surface)]/75 p-5 shadow-[var(--shadow)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-[color:var(--text)]">
              {translate("dashboard.title")}
            </h1>
            <p className="mt-1 text-sm text-[color:var(--muted)]">
              {translate("dashboard.subtitle")}
            </p>
          </div>
          <form>
            <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--muted)]">
              {translate("dashboard.chooseMinistry")}
            </label>
            <select
              name="ministry"
              defaultValue={selectedMinistryId}
              onChange={(event) => {
                event.currentTarget.form?.requestSubmit();
              }}
              className="mt-1 h-10 min-w-[17rem] rounded-xl border border-[color:var(--border)] bg-[color:var(--surface2)] px-3 text-sm text-[color:var(--text)] outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--ring)]"
            >
              {ministries.map((ministry) => (
                <option key={ministry.id} value={ministry.id}>
                  {ministry.name}
                </option>
              ))}
            </select>
          </form>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((item, index) => (
          <motion.article
            key={item.key}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.34, delay: index * 0.05, ease: "easeOut" }}
            className="rounded-[1.1rem] border border-[color:var(--border)] bg-[color:var(--surface)]/75 p-4 shadow-[var(--shadow)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[color:var(--muted)]">
              {translate(cardKey(item.key))}
            </p>
            <p className="mt-2 text-3xl font-black tracking-tight text-[color:var(--text)]">
              {item.value}
            </p>
          </motion.article>
        ))}
      </section>

      <section className="rounded-[1.2rem] border border-[color:var(--border)] bg-[linear-gradient(150deg,color-mix(in_srgb,var(--surface)_94%,transparent),color-mix(in_srgb,var(--surface2)_86%,transparent))] p-5 shadow-[var(--shadow)]">
        <h2 className="text-lg font-bold text-[color:var(--text)]">
          {translate("dashboard.nextSchedule")}
        </h2>
        <p className="mt-2 text-sm text-[color:var(--muted)]">
          {translate("dashboard.nextSchedulePlaceholder")}
        </p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.1em] text-[color:var(--accent)]">
          {selectedMinistry?.name ?? ""}
        </p>
      </section>

      <MemberCreateCard ministryId={selectedMinistryId} />
    </main>
  );
};

export default DashboardPageClient;
