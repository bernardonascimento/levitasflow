"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";
import type { AgendaEvent } from "@web/presentation/components/agenda/mockEvents";
import Skeleton from "@web/presentation/components/ui/Skeleton";

const WEEKDAYS = [
  "dashboard.agenda.weekdayDom",
  "dashboard.agenda.weekdaySeg",
  "dashboard.agenda.weekdayTer",
  "dashboard.agenda.weekdayQua",
  "dashboard.agenda.weekdayQui",
  "dashboard.agenda.weekdaySex",
  "dashboard.agenda.weekdaySab"
] as const;

function toDateStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isToday(d: Date): boolean {
  return isSameDay(d, new Date());
}

type MonthCalendarProps = {
  currentMonth: Date;
  selectedDay: Date | null;
  eventsByDate: Map<string, AgendaEvent[]>;
  onSelectDay: (date: Date) => void;
  isLoading?: boolean;
};

export default function MonthCalendar({
  currentMonth,
  selectedDay,
  eventsByDate,
  onSelectDay,
  isLoading = false
}: MonthCalendarProps): JSX.Element {
  const { translate } = useAppLanguage();
  const reduceMotion = useReducedMotion();

  const weeks = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);
    const startDow = first.getDay();
    const totalDays = last.getDate();
    const cells: Array<{ date: Date | null; dateStr: string }> = [];

    for (let i = 0; i < startDow; i++) {
      cells.push({ date: null, dateStr: "" });
    }
    for (let d = 1; d <= totalDays; d++) {
      const date = new Date(year, month, d);
      cells.push({ date, dateStr: toDateStr(date) });
    }
    const remainder = cells.length % 7;
    if (remainder !== 0) {
      for (let i = 0; i < 7 - remainder; i++) {
        cells.push({ date: null, dateStr: "" });
      }
    }

    const result: Array<Array<{ date: Date | null; dateStr: string }>> = [];
    for (let i = 0; i < cells.length; i += 7) {
      result.push(cells.slice(i, i + 7));
    }
    return result;
  }, [currentMonth]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-7 gap-2 px-2 pb-2 pt-1">
        {WEEKDAYS.map((key) => (
          <div
            key={key}
            className="flex min-h-10 items-center justify-center rounded-lg p-2 text-center text-xs font-semibold text-[color:var(--muted)]"
          >
            {translate(key)}
          </div>
        ))}
        {Array.from({ length: 35 }).map((_, i) => (
          <Skeleton key={i} className="h-20 min-h-[110px] rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-7 gap-2 px-2 pb-2 pt-1">
      {WEEKDAYS.map((key) => (
        <div
          key={key}
          className="flex min-h-10 items-center justify-center rounded-lg p-2 text-center text-xs font-semibold uppercase tracking-wider text-[color:var(--muted)]"
        >
          {translate(key)}
        </div>
      ))}
      {weeks.flat().map((cell, index) => {
        if (!cell.date) {
          return <div key={`empty-${index}`} className="min-h-[90px] rounded-xl" />;
        }
        const d = cell.date;
        const events = eventsByDate.get(cell.dateStr) ?? [];
        const selected = selectedDay ? isSameDay(d, selectedDay) : false;
        const today = isToday(d);
        const displayEvents = events.slice(0, 2);
        const moreCount = events.length > 2 ? events.length - 2 : 0;

        return (
          <motion.button
            key={cell.dateStr}
            type="button"
            data-selected={selected}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            onClick={() => onSelectDay(d)}
            className={`
              relative flex min-h-[90px] flex-col items-stretch rounded-xl border border-white/10
              bg-gradient-to-b from-white/[0.02] to-transparent p-2 text-left
              transition-all duration-200
              hover:border-white/30 hover:shadow-[0_0_18px_rgba(255,255,255,0.08)]
              focus-visible:outline-none
              data-[selected=true]:border-[color:var(--accent)]
              data-[selected=true]:shadow-[0_0_0_1px_rgba(255,120,60,0.9),0_0_24px_rgba(255,120,60,0.45)]
              ${today && !selected ? "border-[color:var(--accent)]/50" : ""}
            `}
          >
            <span
              className={`
                  text-sm font-semibold
                  ${today ? "text-[color:var(--accent)]" : "text-[color:var(--text)]"}
                `}
            >
              {d.getDate()}
            </span>
            <div className="mt-1 flex flex-col gap-0.5 overflow-hidden">
              {displayEvents.map((ev) => (
                <span
                  key={ev.id}
                  className={`
                      truncate rounded px-1.5 py-0.5 text-[10px] font-medium
                      border border-[color:var(--border)]
                      bg-[color:var(--surface)]/90 text-[color:var(--text)]
                    `}
                  style={{
                    borderLeftColor: "var(--accent)",
                    borderLeftWidth: "3px"
                  }}
                  title={ev.title}
                >
                  {ev.title}
                </span>
              ))}
              {moreCount > 0 ? (
                <span className="text-[10px] font-medium text-[color:var(--muted)]">
                  +{moreCount}
                </span>
              ) : null}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

export { type MonthCalendarProps };
