"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";
import EmptyStateCard from "./EmptyStateCard";
import EventCard, { type EventCardData } from "./EventCard";

const MOCK_UPCOMING_EVENTS: EventCardData[] = [
  {
    id: "1",
    dateISO: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    title: "Culto – Noite",
    teamName: "Louvor 1",
    confirmed: [
      { name: "Maria Silva" },
      { name: "João Santos", avatarUrl: null },
      { name: "Ana Costa" }
    ],
    missingCount: 2
  },
  {
    id: "2",
    dateISO: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    title: "Culto – Manhã",
    teamName: "Louvor 2",
    confirmed: [{ name: "Pedro Lima" }, { name: "Carla Souza" }],
    missingCount: 0
  },
  {
    id: "3",
    dateISO: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString(),
    title: "Culto – Noite",
    teamName: "Louvor 1",
    confirmed: [
      { name: "Maria Silva" },
      { name: "João Santos" },
      { name: "Ana Costa" },
      { name: "Pedro Lima" }
    ],
    missingCount: 1
  },
  {
    id: "4",
    dateISO: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    title: "Ensaio geral",
    teamName: "Louvor 1",
    confirmed: [],
    missingCount: 5
  }
];

type UpcomingEventsProps = {
  events?: EventCardData[] | null;
};

const UpcomingEvents = ({ events = null }: UpcomingEventsProps): JSX.Element => {
  const { translate } = useAppLanguage();
  const reduceMotion = useReducedMotion();
  const list = events ?? MOCK_UPCOMING_EVENTS;
  const isEmpty = list.length === 0;

  return (
    <motion.section
      id="proximos-eventos"
      initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05, duration: 0.3 }}
      className="rounded-[1.2rem] border border-[color:var(--hero-card-border)] bg-[length:100%_100%] p-5 shadow-[var(--shadow)] backdrop-blur-xl"
      style={{
        background:
          "linear-gradient(145deg, color-mix(in srgb, var(--surface) 98%, transparent), color-mix(in srgb, var(--surface2) 92%, transparent))",
        boxShadow:
          "var(--shadow), 0 0 0 1px color-mix(in srgb, var(--hero-card-border) 80%, transparent)"
      }}
    >
      <div className="relative">
        <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-[color:var(--heroAura1)] blur-3xl opacity-80" />
        <div className="pointer-events-none absolute -bottom-16 -right-12 h-40 w-40 rounded-full bg-[color:var(--heroAura2)] blur-3xl opacity-80" />
        <div className="relative z-10">
          <h2 className="flex items-center gap-2 text-lg font-bold text-[color:var(--text)]">
            <CalendarDays className="h-5 w-5 text-[color:var(--muted)]" />
            {translate("dashboard.overview.upcomingEvents")}
          </h2>
          <p className="mt-1 text-sm text-[color:var(--muted)]">
            {translate("dashboard.overview.upcomingEventsSubtitle")}
          </p>

          {isEmpty ? (
            <div className="mt-6">
              <EmptyStateCard
                icon={<CalendarDays className="h-6 w-6" />}
                message={translate("dashboard.overview.emptyUpcomingEvents")}
                secondaryMessage={translate("dashboard.emptyScalesDesc")}
                ctaLabel={translate("dashboard.overview.createFirstScale")}
                onCtaClick={() => {
                  console.log("[Overview] Criar minha primeira escala");
                }}
              />
            </div>
          ) : (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {list.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.04, duration: 0.25 }}
                >
                  <EventCard event={event} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default UpcomingEvents;
