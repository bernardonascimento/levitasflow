"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CalendarDays, Plus } from "lucide-react";
import Button from "@web/presentation/components/Button";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";
import type { AgendaEvent } from "@web/presentation/components/agenda/mockEvents";
import Skeleton from "@web/presentation/components/ui/Skeleton";

type DayEventsPanelProps = {
  selectedDay: Date | null;
  events: AgendaEvent[];
  onNewEvent?: () => void;
  isLoading?: boolean;
};

function EventMiniCard({ event }: { event: AgendaEvent }): JSX.Element {
  const { translate } = useAppLanguage();
  return (
    <article
      className="flex gap-3 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)]/75 p-3 shadow-[var(--shadow)] transition hover:shadow-[0_0_0_1px_rgba(255,90,31,0.08)]"
      data-event-id={event.id}
    >
      <div className="flex shrink-0 flex-col items-center justify-center rounded-lg border border-[color:var(--border)] bg-[color:var(--surface2)]/80 px-2 py-1.5 text-center">
        <span className="block text-sm font-bold leading-none text-[color:var(--text)]">
          {event.time}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-semibold text-[color:var(--text)]">{event.title}</h3>
        <p className="mt-0.5 text-xs text-[color:var(--muted)]">{event.team}</p>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[color:var(--muted)]">{event.confirmationsCount} confirmados</span>
          {event.missingCount > 0 ? (
            <span className="font-medium text-[color:var(--accent)]">
              {event.missingCount} {translate("dashboard.agenda.missingConfirm")}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function DayEventsPanel({
  selectedDay,
  events,
  onNewEvent,
  isLoading = false
}: DayEventsPanelProps): JSX.Element {
  const { translate } = useAppLanguage();
  const reduceMotion = useReducedMotion();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-10 w-28" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-20 w-full rounded-xl" />
          <Skeleton className="h-20 w-full rounded-xl" />
          <Skeleton className="h-20 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  const isEmpty = !selectedDay || events.length === 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="flex items-center gap-2 text-lg font-bold text-[color:var(--text)]">
          <CalendarDays className="h-5 w-5 text-[color:var(--muted)]" />
          {translate("dashboard.agenda.eventsOfDay")}
        </h3>
        <Button
          variant="primary"
          size="sm"
          className="inline-flex items-center gap-1.5"
          onClick={onNewEvent ?? (() => {})}
        >
          <Plus className="h-4 w-4 shrink-0" />
          {translate("dashboard.agenda.newEvent")}
        </Button>
      </div>

      {isEmpty ? (
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[color:var(--border)] bg-[color:var(--surface2)]/50 py-10"
        >
          <CalendarDays className="h-10 w-10 text-[color:var(--muted)]" />
          <p className="mt-2 text-sm font-medium text-[color:var(--text)]">
            {translate("dashboard.agenda.noEventsForDay")}
          </p>
        </motion.div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.2 }}
            >
              <EventMiniCard event={event} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
