"use client";

import { useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { TranslationKey } from "@shared/index";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";

export type LeaderAlertEvent = {
  title: string;
  dateISO: string;
  team: string;
  total: number;
  confirmed: number;
  pending: number;
  missingRoles: string[];
};

const MOCK_EVENTS: LeaderAlertEvent[] = [
  {
    title: "Culto — Noite",
    dateISO: "2026-03-03",
    team: "Louvor 1",
    total: 10,
    confirmed: 8,
    pending: 2,
    missingRoles: ["Bateria"]
  },
  {
    title: "Culto — Manhã",
    dateISO: "2026-03-06",
    team: "Louvor 2",
    total: 6,
    confirmed: 6,
    pending: 0,
    missingRoles: []
  }
];

function formatDayOfWeek(dateISO: string): string {
  const d = new Date(dateISO);
  const days = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
  return days[d.getDay()] ?? "";
}

function daysUntil(dateISO: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateISO);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - today.getTime()) / (24 * 60 * 60 * 1000));
}

type AlertItem = {
  event: LeaderAlertEvent;
  primaryText: string;
  secondaryText: string;
  hasMissing: boolean;
  hasPending: boolean;
  pendingText?: string;
};

function buildAlerts(
  events: LeaderAlertEvent[],
  translate: (key: TranslationKey) => string
): AlertItem[] {
  const result: AlertItem[] = [];
  for (const event of events) {
    const hasMissing = event.missingRoles.length > 0;
    const hasPending = event.pending > 0;
    if (!hasMissing && !hasPending) continue;

    const dayOfWeek = formatDayOfWeek(event.dateISO);
    const days = daysUntil(event.dateISO);
    const daysLabel =
      days === 1 ? translate("dashboard.overview.day") : translate("dashboard.overview.days");
    const secondaryText = `${event.team} • ${event.title} • ${days} ${daysLabel}`;

    if (hasMissing) {
      const roles = event.missingRoles.join(", ");
      const primaryText =
        event.missingRoles.length === 1
          ? translate("dashboard.overview.leaderAlertMissingOne")
              .replace("{title}", event.title)
              .replace("{roles}", roles)
          : translate("dashboard.overview.leaderAlertMissingMany")
              .replace("{n}", String(event.missingRoles.length))
              .replace("{title}", event.title)
              .replace("{roles}", roles);
      result.push({
        event,
        primaryText,
        secondaryText,
        hasMissing: true,
        hasPending,
        pendingText: hasPending
          ? translate("dashboard.overview.leaderAlertPending")
              .replace("{pending}", String(event.pending))
              .replace("{title}", event.title)
              .replace("{day}", dayOfWeek)
          : undefined
      });
    } else if (hasPending) {
      const primaryText = translate("dashboard.overview.leaderAlertPending")
        .replace("{pending}", String(event.pending))
        .replace("{title}", event.title)
        .replace("{day}", dayOfWeek);
      result.push({
        event,
        primaryText,
        secondaryText,
        hasMissing: false,
        hasPending: true
      });
    }
  }
  return result;
}

type LeaderAlertProps = {
  events?: LeaderAlertEvent[] | null;
};

const LeaderAlert = ({ events = null }: LeaderAlertProps): JSX.Element | null => {
  const { translate } = useAppLanguage();
  const reduceMotion = useReducedMotion();
  const scrollToUpcoming = useCallback(() => {
    document.getElementById("proximos-eventos")?.scrollIntoView({ behavior: "smooth" });
  }, []);
  const list = events ?? MOCK_EVENTS;
  const alerts = buildAlerts(list, translate);
  if (alerts.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.06, duration: 0.3 }}
      className="leader-alert-card rounded-[1.2rem] border border-[color:var(--accent)]/40 bg-[color:var(--surface)]/90 p-5 shadow-[var(--shadow)] transition hover:border-[color:var(--accent)]/60 hover:shadow-[0_0_24px_rgba(255,90,31,0.18)]"
      style={{
        boxShadow: "var(--shadow), 0 0 0 1px color-mix(in srgb, var(--accent) 22%, transparent)"
      }}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[color:var(--accent)]/15 text-[color:var(--accent)]">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              {alerts.map((a, i) => (
                <div
                  key={i}
                  className={i > 0 ? "mt-3 pt-3 border-t border-[color:var(--border)]" : ""}
                >
                  <p className="text-base font-bold leading-snug text-[color:var(--text)]">
                    {a.primaryText}
                  </p>
                  <p className="mt-1 text-sm text-[color:var(--muted)]">{a.secondaryText}</p>
                  {a.pendingText && (
                    <p className="mt-1 text-sm text-[color:var(--muted)]">{a.pendingText}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={scrollToUpcoming}
          className="shrink-0 self-start rounded-lg border border-[color:var(--accent)]/50 bg-[color:var(--accent)]/10 px-4 py-2 text-sm font-semibold text-[color:var(--accent)] transition hover:bg-[color:var(--accent)]/20 sm:self-center"
        >
          {translate("dashboard.overview.leaderAlertCta")}
        </button>
      </div>
    </motion.div>
  );
};

export default LeaderAlert;
