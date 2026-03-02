"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";
import {
  MOCK_AGENDA_EVENTS,
  getEventsForDate,
  getEventsByDateMap,
  type AgendaEvent
} from "@web/presentation/components/agenda/mockEvents";
import MonthCalendar from "@web/presentation/components/agenda/MonthCalendar";
import DayEventsPanel from "@web/presentation/components/agenda/DayEventsPanel";
import { formatMonthCapitalized } from "@web/utils/formatMonth";

const LOADING_DURATION_MS = 320;

function addMonths(d: Date, delta: number): Date {
  const out = new Date(d);
  out.setMonth(out.getMonth() + delta);
  return out;
}

function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

export default function AgendaView(): JSX.Element {
  const { translate } = useAppLanguage();
  const reduceMotion = useReducedMotion();

  const [currentMonth, setCurrentMonth] = useState(() => startOfMonth(new Date()));
  const [selectedDay, setSelectedDay] = useState<Date | null>(() => new Date());
  const [isLoadingMonth, setIsLoadingMonth] = useState(false);
  const [slideDirection, setSlideDirection] = useState<-1 | 0 | 1>(0);
  const [events] = useState<AgendaEvent[]>(MOCK_AGENDA_EVENTS);

  const eventsByDate = useMemo(() => getEventsByDateMap(events), [events]);

  const selectedDayStr = selectedDay
    ? `${selectedDay.getFullYear()}-${String(selectedDay.getMonth() + 1).padStart(2, "0")}-${String(selectedDay.getDate()).padStart(2, "0")}`
    : null;
  const eventsForSelectedDay = useMemo(
    () => (selectedDayStr ? getEventsForDate(events, selectedDayStr) : []),
    [events, selectedDayStr]
  );

  const goPrevMonth = useCallback(() => {
    setSlideDirection(-1);
    setCurrentMonth((prev) => addMonths(prev, -1));
  }, []);

  const goNextMonth = useCallback(() => {
    setSlideDirection(1);
    setCurrentMonth((prev) => addMonths(prev, 1));
  }, []);

  const goToday = useCallback(() => {
    const today = new Date();
    setSlideDirection(0);
    setCurrentMonth(startOfMonth(today));
    setSelectedDay(today);
    setIsLoadingMonth(true);
    setTimeout(() => setIsLoadingMonth(false), LOADING_DURATION_MS);
  }, []);

  const monthYearLabel = formatMonthCapitalized(currentMonth);

  const controlClass =
    "inline-flex h-9 min-h-9 items-center justify-center rounded-lg text-sm font-semibold transition disabled:opacity-50";
  const controlWrapperClass =
    "flex rounded-xl border border-[color:var(--border)] bg-[color:var(--surface2)]/80 p-1";

  return (
    <div className="space-y-6 pb-8">
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[1.2rem] border border-[color:var(--hero-card-border)] bg-[length:100%_100%] p-6 shadow-[var(--shadow)] backdrop-blur-xl md:p-8"
        style={{
          background:
            "linear-gradient(145deg, color-mix(in srgb, var(--surface) 94%, transparent), color-mix(in srgb, var(--surface2) 90%, transparent))",
          boxShadow:
            "var(--shadow), 0 0 0 1px color-mix(in srgb, var(--hero-card-border) 80%, transparent)"
        }}
      >
        <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-[color:var(--heroAura1)] blur-3xl opacity-80" />
        <div className="pointer-events-none absolute -bottom-16 -right-12 h-40 w-40 rounded-full bg-[color:var(--heroAura2)] blur-3xl opacity-80" />
        <div className="relative z-10">
          <header className="flex min-h-[4.5rem] flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h1
                className="flex items-center gap-2 text-2xl font-black tracking-tight text-[color:var(--text)] md:text-3xl"
                aria-live="polite"
              >
                <CalendarDays className="h-7 w-7 shrink-0 text-[color:var(--muted)]" />
                {monthYearLabel}
              </h1>
              <p className="mt-1 text-sm text-[color:var(--muted)]">
                {translate("dashboard.agenda.subtitle")}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className={controlWrapperClass}>
                <button
                  type="button"
                  onClick={goPrevMonth}
                  disabled={isLoadingMonth}
                  className={`${controlClass} w-9 shrink-0 text-[color:var(--muted)] hover:bg-[color:var(--surface)]/80 hover:text-[color:var(--text)]`}
                  aria-label="Mês anterior"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={goNextMonth}
                  disabled={isLoadingMonth}
                  className={`${controlClass} w-9 shrink-0 text-[color:var(--muted)] hover:bg-[color:var(--surface)]/80 hover:text-[color:var(--text)]`}
                  aria-label="Próximo mês"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              <div className={controlWrapperClass}>
                <button
                  type="button"
                  onClick={goToday}
                  disabled={isLoadingMonth}
                  className={`${controlClass} min-w-[4.5rem] px-3 text-[color:var(--text)] hover:bg-[color:var(--surface)]/80`}
                >
                  {translate("dashboard.agenda.today")}
                </button>
              </div>
              <div className={controlWrapperClass}>
                <span
                  className={`${controlClass} min-w-[3rem] px-3 bg-[color:var(--surface)]/90 text-[color:var(--text)]`}
                >
                  {translate("dashboard.agenda.viewMonth")}
                </span>
                <span
                  className={`${controlClass} min-w-[3rem] cursor-not-allowed px-3 text-[color:var(--muted)] opacity-60`}
                  title={translate("dashboard.agenda.comingSoon")}
                >
                  {translate("dashboard.agenda.viewWeek")}
                </span>
                <span
                  className={`${controlClass} min-w-[3rem] cursor-not-allowed px-3 text-[color:var(--muted)] opacity-60`}
                  title={translate("dashboard.agenda.comingSoon")}
                >
                  {translate("dashboard.agenda.viewDay")}
                </span>
              </div>
            </div>
          </header>

          <div className="relative mt-6 min-h-[20rem] rounded-2xl p-0 md:p-0">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={currentMonth.getTime()}
                initial={
                  reduceMotion
                    ? false
                    : slideDirection === 0
                      ? { opacity: 0 }
                      : { x: `${slideDirection * 100}%` }
                }
                animate={slideDirection === 0 ? { opacity: 1 } : { x: 0 }}
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : slideDirection === 0
                      ? { opacity: 0 }
                      : { x: `${-slideDirection * 100}%` }
                }
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="w-full"
              >
                <MonthCalendar
                  currentMonth={currentMonth}
                  selectedDay={selectedDay}
                  eventsByDate={eventsByDate}
                  onSelectDay={setSelectedDay}
                  isLoading={isLoadingMonth}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div
            className="mt-6 border-t border-[color:var(--border)] pt-6"
            style={{ borderTopColor: "var(--border)" }}
          />
          <div className="mt-6">
            <DayEventsPanel
              selectedDay={selectedDay}
              events={eventsForSelectedDay}
              onNewEvent={() => {}}
              isLoading={isLoadingMonth}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
