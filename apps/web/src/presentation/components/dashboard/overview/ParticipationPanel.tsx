"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";
import EmptyStateCard from "./EmptyStateCard";
import ConfirmationsStatusDonut from "./ConfirmationsStatusDonut";

type MonthData = { label: string; scales: number; absences: number };

const MOCK_LAST_6_MONTHS: MonthData[] = (() => {
  const now = new Date();
  const months: MonthData[] = [];
  const labels = [
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
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      label: labels[d.getMonth()] ?? "",
      scales: Math.floor(Math.random() * 12) + 4,
      absences: Math.floor(Math.random() * 4)
    });
  }
  return months;
})();

export type RankingMember = {
  id: string;
  name: string;
  presencePercent: number;
  avatarUrl?: string | null;
};

const MOCK_RANKING: RankingMember[] = [
  { id: "1", name: "João Silva", presencePercent: 95 },
  { id: "2", name: "Maria Souza", presencePercent: 92 },
  { id: "3", name: "Pedro Alves", presencePercent: 88 },
  { id: "4", name: "Ana Clara", presencePercent: 86 },
  { id: "5", name: "Lucas Rocha", presencePercent: 83 }
];

const getInitials = (name: string): string =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((s) => s[0])
    .join("")
    .toUpperCase() || "?";

type ParticipationPanelProps = {
  last6Months?: MonthData[] | null;
  ranking?: RankingMember[] | null;
};

const ParticipationPanel = ({
  last6Months = MOCK_LAST_6_MONTHS,
  ranking = MOCK_RANKING
}: ParticipationPanelProps): JSX.Element => {
  const { translate } = useAppLanguage();
  const reduceMotion = useReducedMotion();
  const hasChartData = last6Months != null && last6Months.length > 0;
  const hasRanking = ranking != null && ranking.length > 0;
  const hasData = hasChartData || hasRanking;

  const chartData = (last6Months ?? []).map((m) => ({
    month: m.label,
    scales: m.scales,
    absences: m.absences
  }));

  return (
    <motion.section
      initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.3 }}
      className="rounded-[1.2rem] border border-[color:var(--border)] bg-[color:var(--surface)]/75 p-5 shadow-[var(--shadow)]"
    >
      <h2 className="flex items-center gap-2 text-lg font-bold text-[color:var(--text)]">
        <BarChart3 className="h-5 w-5 text-[color:var(--muted)]" />
        {translate("dashboard.overview.participationSectionTitle")}
      </h2>
      <p className="mt-1 text-sm text-[color:var(--muted)]">
        {translate("dashboard.overview.participationSubtitle")}
      </p>

      {!hasData ? (
        <div className="mt-6">
          <EmptyStateCard
            icon={<BarChart3 className="h-6 w-6" />}
            message={translate("dashboard.overview.noParticipationData")}
          />
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:items-stretch">
          {/* Coluna esquerda: LineChart + Donut abaixo */}
          <div className="flex h-full min-h-0 flex-col gap-6">
            <div className="participation-chart-wrapper min-h-[240px] shrink-0">
              {hasChartData ? (
                <ResponsiveContainer width="100%" height={240}>
                  <LineChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.6} />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 11, fill: "var(--muted)" }}
                      axisLine={false}
                      tickLine={false}
                      padding={{ left: 10, right: 10 }}
                    />
                    <YAxis
                      width={30}
                      tick={{ fontSize: 11, fill: "var(--muted)" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--surface2)",
                        border: "1px solid var(--border)",
                        borderRadius: "0.75rem"
                      }}
                      labelStyle={{ color: "var(--text)" }}
                    />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Line
                      type="monotone"
                      dataKey="scales"
                      name={translate("dashboard.overview.participationChartScales")}
                      stroke="var(--accent)"
                      strokeWidth={2}
                      dot={{ fill: "var(--accent)", r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="absences"
                      name={translate("dashboard.overview.absences")}
                      stroke="var(--muted)"
                      strokeWidth={2}
                      strokeDasharray="4 4"
                      dot={{ fill: "var(--muted)", r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <EmptyStateCard
                  icon={<BarChart3 className="h-6 w-6" />}
                  message={translate("dashboard.overview.noParticipationData")}
                />
              )}
            </div>
            <div className="min-h-0 flex-1">
              <ConfirmationsStatusDonut />
            </div>
          </div>

          {/* Coluna direita: Ranking Mais presentes */}
          <div className="h-full">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-[color:var(--muted)]">
              {translate("dashboard.overview.mostPresent")}
            </h3>
            {hasRanking ? (
              <ul className="space-y-3">
                {(ranking ?? []).slice(0, 5).map((member, i) => (
                  <motion.li
                    key={member.id}
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.25 }}
                    className="presence-item"
                  >
                    <div className="presence-header">
                      <div className="avatar">
                        {member.avatarUrl ? (
                          <img src={member.avatarUrl} alt="" />
                        ) : (
                          getInitials(member.name)
                        )}
                      </div>
                      <span className="name">{member.name}</span>
                      <span className="percentage">{member.presencePercent}%</span>
                    </div>
                    <div className="progress-bar">
                      <motion.div
                        className="progress-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${member.presencePercent}%` }}
                        transition={{ delay: 0.2 + i * 0.05, duration: 0.6, ease: "easeOut" }}
                      />
                    </div>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <EmptyStateCard
                icon={<BarChart3 className="h-6 w-6" />}
                message={translate("dashboard.overview.noParticipationData")}
              />
            )}
          </div>
        </div>
      )}
    </motion.section>
  );
};

export default ParticipationPanel;
