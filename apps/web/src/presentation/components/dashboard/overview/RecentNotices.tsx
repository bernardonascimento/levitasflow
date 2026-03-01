"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Bell, Calendar, Music, UserCheck, UserMinus } from "lucide-react";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";
import EmptyStateCard from "./EmptyStateCard";

export type NoticeItem = {
  id: string;
  icon?: "scale" | "music" | "confirm" | "substitute" | "default";
  title: string;
  description: string;
  time: string;
};

const MOCK_NOTICES: NoticeItem[] = [
  {
    id: "1",
    icon: "scale",
    title: "Escala de domingo atualizada",
    description: "Alterações na equipe da noite.",
    time: "há 2h"
  },
  {
    id: "2",
    icon: "music",
    title: "Nova música adicionada ao repertório",
    description: "In Christ Alone disponível para o próximo culto.",
    time: "há 5h"
  },
  {
    id: "3",
    icon: "confirm",
    title: "João confirmou presença",
    description: "Culto da noite · Louvor 1",
    time: "ontem"
  },
  {
    id: "4",
    icon: "substitute",
    title: "Maria pediu substituição",
    description: "Domingo 19h — indisponível.",
    time: "ontem"
  }
];

function NoticeIcon({ type }: { type?: NoticeItem["icon"] }): ReactNode {
  switch (type) {
    case "scale":
      return <Calendar className="h-5 w-5 text-[color:var(--accent)]" />;
    case "music":
      return <Music className="h-5 w-5 text-[color:var(--accent)]" />;
    case "confirm":
      return <UserCheck className="h-5 w-5 text-emerald-500" />;
    case "substitute":
      return <UserMinus className="h-5 w-5 text-amber-500" />;
    default:
      return <Bell className="h-5 w-5 text-[color:var(--muted)]" />;
  }
}

type RecentNoticesProps = {
  items?: NoticeItem[] | null;
};

const RecentNotices = ({ items = null }: RecentNoticesProps): JSX.Element => {
  const { translate } = useAppLanguage();
  const reduceMotion = useReducedMotion();
  const list = items ?? MOCK_NOTICES;
  const isEmpty = list.length === 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.3 }}
      className="rounded-[1.2rem] border border-[color:var(--border)] bg-[color:var(--surface)]/75 p-5 shadow-[var(--shadow)]"
    >
      <h2 className="flex items-center gap-2 text-lg font-bold text-[color:var(--text)]">
        <Bell className="h-5 w-5 text-[color:var(--muted)]" />
        {translate("dashboard.recentNotices")}
      </h2>

      {isEmpty ? (
        <div className="mt-4">
          <EmptyStateCard
            icon={<Bell className="h-6 w-6" />}
            message={translate("dashboard.overview.noRecentNotices")}
          />
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {list.map((item, i) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 + i * 0.04, duration: 0.3, ease: "easeOut" }}
              className="glow-list-item flex gap-4 rounded-[1.2rem] p-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[color:var(--surface)]">
                <NoticeIcon type={item.icon} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-[color:var(--text)]">{item.title}</p>
                <p className="mt-0.5 text-sm text-[color:var(--muted)]">{item.description}</p>
                <p className="mt-1.5 text-xs text-[color:var(--muted)]">{item.time}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </motion.section>
  );
};

export default RecentNotices;
