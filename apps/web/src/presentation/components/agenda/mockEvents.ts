/**
 * Mock events for the Agenda tab. Replace with API data when backend is ready.
 */

export type AgendaEventStatus = "confirmed" | "pending";

export type AgendaEventType = "culto" | "ensaio" | "reuniao";

export type AgendaEvent = {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  team: string;
  time: string; // e.g. "19:00"
  status: AgendaEventStatus;
  confirmationsCount: number;
  missingCount: number;
  type?: AgendaEventType;
};

const thisYear = new Date().getFullYear();
const thisMonth = new Date().getMonth();

function date(y: number, m: number, d: number): string {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export const MOCK_AGENDA_EVENTS: AgendaEvent[] = [
  {
    id: "e1",
    date: date(thisYear, thisMonth, 5),
    title: "Culto — Noite",
    team: "Louvor 1",
    time: "19:00",
    status: "confirmed",
    confirmationsCount: 4,
    missingCount: 1,
    type: "culto"
  },
  {
    id: "e2",
    date: date(thisYear, thisMonth, 5),
    title: "Ensaio geral",
    team: "Louvor 1",
    time: "17:00",
    status: "pending",
    confirmationsCount: 2,
    missingCount: 3,
    type: "ensaio"
  },
  {
    id: "e3",
    date: date(thisYear, thisMonth, 12),
    title: "Culto — Manhã",
    team: "Louvor 2",
    time: "10:30",
    status: "confirmed",
    confirmationsCount: 5,
    missingCount: 0,
    type: "culto"
  },
  {
    id: "e4",
    date: date(thisYear, thisMonth, 12),
    title: "Reunião de louvor",
    team: "Coordenação",
    time: "14:00",
    status: "pending",
    confirmationsCount: 3,
    missingCount: 2,
    type: "reuniao"
  },
  {
    id: "e5",
    date: date(thisYear, thisMonth, 19),
    title: "Culto — Noite",
    team: "Louvor 1",
    time: "19:00",
    status: "confirmed",
    confirmationsCount: 4,
    missingCount: 0,
    type: "culto"
  },
  {
    id: "e6",
    date: date(thisYear, thisMonth, 19),
    title: "Ensaio geral",
    team: "Louvor 1",
    time: "17:00",
    status: "confirmed",
    confirmationsCount: 6,
    missingCount: 0,
    type: "ensaio"
  },
  {
    id: "e7",
    date: date(thisYear, thisMonth, 26),
    title: "Culto — Noite",
    team: "Louvor 2",
    time: "19:00",
    status: "pending",
    confirmationsCount: 2,
    missingCount: 4,
    type: "culto"
  },
  {
    id: "e8",
    date: date(thisYear, thisMonth, 1),
    title: "Culto — Noite",
    team: "Louvor 1",
    time: "19:00",
    status: "confirmed",
    confirmationsCount: 5,
    missingCount: 0,
    type: "culto"
  },
  {
    id: "e9",
    date: date(thisYear, thisMonth, 8),
    title: "Reunião de louvor",
    team: "Coordenação",
    time: "20:00",
    status: "pending",
    confirmationsCount: 1,
    missingCount: 4,
    type: "reuniao"
  }
];

export function getEventsForDate(events: AgendaEvent[], dateStr: string): AgendaEvent[] {
  return events.filter((e) => e.date === dateStr).sort((a, b) => a.time.localeCompare(b.time));
}

export function getEventsByDateMap(events: AgendaEvent[]): Map<string, AgendaEvent[]> {
  const map = new Map<string, AgendaEvent[]>();
  for (const e of events) {
    const list = map.get(e.date) ?? [];
    list.push(e);
    map.set(e.date, list);
  }
  for (const list of map.values()) {
    list.sort((a, b) => a.time.localeCompare(b.time));
  }
  return map;
}
