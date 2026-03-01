"use client";

type ConfirmedPerson = { name: string; avatarUrl?: string | null };

export type EventCardData = {
  id: string;
  dateISO: string;
  title: string;
  teamName: string;
  confirmed: ConfirmedPerson[];
  missingCount: number;
};

type EventCardProps = {
  event: EventCardData;
};

const formatDateBadge = (dateISO: string): { day: string; month: string } => {
  const d = new Date(dateISO);
  const day = d.getDate().toString().padStart(2, "0");
  const months = [
    "jan",
    "fev",
    "mar",
    "abr",
    "mai",
    "jun",
    "jul",
    "ago",
    "set",
    "out",
    "nov",
    "dez"
  ];
  const month = months[d.getMonth()] ?? "";
  return { day, month };
};

const getInitials = (name: string): string => {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((s) => s[0])
      .join("")
      .toUpperCase() || "?"
  );
};

const EventCard = ({ event }: EventCardProps): JSX.Element => {
  const { day, month } = formatDateBadge(event.dateISO);

  return (
    <article
      className="flex gap-4 rounded-[1.2rem] border border-[color:var(--border)] bg-[color:var(--surface)]/75 p-4 shadow-[var(--shadow)] transition hover:shadow-[0_0_0_1px_rgba(255,90,31,0.06)]"
      data-event-id={event.id}
    >
      <div className="flex shrink-0 flex-col items-center justify-center rounded-xl border border-[color:var(--border)] bg-[color:var(--surface2)]/80 px-3 py-2 text-center">
        <span className="block text-lg font-bold leading-none text-[color:var(--text)]">{day}</span>
        <span className="mt-0.5 block text-xs font-medium uppercase tracking-wider text-[color:var(--muted)]">
          {month}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-semibold text-[color:var(--text)]">{event.title}</h3>
        <p className="mt-0.5 text-xs text-[color:var(--muted)]">Equipe: {event.teamName}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {event.confirmed.slice(0, 4).map((person, i) => (
            <div
              key={`${event.id}-${person.name}-${i}`}
              className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[color:var(--border)] bg-[color:var(--surface2)] text-[10px] font-semibold text-[color:var(--muted)]"
              title={person.name}
            >
              {person.avatarUrl ? (
                <img src={person.avatarUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                getInitials(person.name)
              )}
            </div>
          ))}
          {event.confirmed.length > 4 ? (
            <span className="text-xs text-[color:var(--muted)]">+{event.confirmed.length - 4}</span>
          ) : null}
          {event.missingCount > 0 ? (
            <span className="text-xs font-medium text-[color:var(--accent)]">
              {event.missingCount} faltando confirmar
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
};

export default EventCard;
