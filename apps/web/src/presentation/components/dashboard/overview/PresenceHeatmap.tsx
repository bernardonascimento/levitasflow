"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Grid3X3 } from "lucide-react";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";

const DAY_LABELS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const LEGEND_LEVELS = [0, 1, 2, 3, 4]; // 0-100 mapped to 5 levels

type DayCell = {
  date: Date;
  score: number;
  confirmed: number;
  absences: number;
};

function buildHeatmapData(): DayCell[][] {
  const rows = 7; // Seg–Dom
  const numWeeks = 13; // ~90 dias
  const grid: DayCell[][] = Array.from({ length: rows }, () =>
    Array.from({ length: numWeeks }, () => ({
      date: new Date(0),
      score: 0,
      confirmed: 0,
      absences: 0
    }))
  );
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let dayOffset = 89; dayOffset >= 0; dayOffset--) {
    const date = new Date(today);
    date.setDate(date.getDate() - dayOffset);
    const dayOfWeek = date.getDay();
    const monBased = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const weekIndex = Math.floor(dayOffset / 7);
    if (weekIndex >= numWeeks) continue;
    let score = 40 + Math.floor(Math.random() * 45);
    if (dayOfWeek === 0) score = 72 + Math.floor(Math.random() * 24);
    if (dayOfWeek === 4) score = 68 + Math.floor(Math.random() * 28);
    const confirmed = Math.min(20, Math.floor((score / 100) * 18) + 2);
    const absences = Math.max(0, Math.floor(Math.random() * 5));
    grid[monBased][weekIndex] = { date, score, confirmed, absences };
  }
  return grid;
}

function getCellStyle(score: number): React.CSSProperties {
  if (score <= 0) {
    return { background: "var(--surface2)", boxShadow: "none" };
  }
  const p = score / 100;
  const opacity = 0.15 + p * 0.55;
  const glow =
    p > 0.6
      ? `0 0 6px color-mix(in srgb, var(--accent) ${Math.round(p * 40)}%, transparent)`
      : "none";
  return {
    background: `color-mix(in srgb, var(--accent) ${Math.round(opacity * 100)}%, var(--surface2))`,
    boxShadow: glow
  };
}

const PresenceHeatmap = (): JSX.Element => {
  const { translate } = useAppLanguage();
  const reduceMotion = useReducedMotion();
  const [tooltipText, setTooltipText] = useState<string | null>(null);

  const grid = useMemo(() => buildHeatmapData(), []);
  const maxCols = grid[0]?.length ?? 0;

  const formatDate = (d: Date) => {
    if (!d || !d.getTime()) return "";
    return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.3 }}
      className="rounded-[1.2rem] border border-[color:var(--border)] bg-[color:var(--surface)]/75 p-5 shadow-[var(--shadow)] backdrop-blur-sm transition hover:shadow-[0_0_0_1px_rgba(255,90,31,0.06)]"
    >
      <h3 className="flex items-center gap-2 text-base font-bold text-[color:var(--text)]">
        <Grid3X3 className="h-4 w-4 text-[color:var(--muted)]" />
        {translate("dashboard.overview.heatmapTitle")}
      </h3>
      <p className="mt-1 text-sm text-[color:var(--muted)]">
        {translate("dashboard.overview.heatmapSubtitle")}
      </p>

      <div className="relative mt-4">
        <div className="flex gap-0.5 overflow-x-auto pb-2">
          {/* Row labels + grid */}
          <div className="flex shrink-0 flex-col gap-0.5">
            {DAY_LABELS.map((label) => (
              <div
                key={label}
                className="flex h-3.5 w-6 items-center justify-end pr-1 text-[10px] text-[color:var(--muted)]"
              >
                {label}
              </div>
            ))}
          </div>
          <div
            className="heatmap-grid inline-grid gap-0.5"
            style={{
              gridTemplateRows: `repeat(7, 12px)`,
              gridTemplateColumns: `repeat(${maxCols}, 12px)`
            }}
          >
            {grid.map((row, ri) =>
              row.map((cell, ci) => {
                const isEmpty = !cell.date.getTime?.();
                return (
                  <div
                    key={`${ri}-${ci}`}
                    className="h-3 w-3 rounded-[3px] transition hover:ring-2 hover:ring-[color:var(--accent)]/50"
                    style={getCellStyle(cell.score)}
                    onMouseEnter={() => {
                      if (isEmpty) return;
                      setTooltipText(
                        `${formatDate(cell.date)} — Presença: ${cell.score}% • ${cell.confirmed} confirmados • ${cell.absences} faltas`
                      );
                    }}
                    onMouseLeave={() => setTooltipText(null)}
                  />
                );
              })
            )}
          </div>
        </div>

        {tooltipText && (
          <div className="mt-2 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface2)] px-2.5 py-1.5 text-xs text-[color:var(--text)]">
            {tooltipText}
          </div>
        )}

        <div className="mt-3 flex items-center justify-end gap-1.5">
          <span className="text-[10px] text-[color:var(--muted)]">
            {translate("dashboard.overview.heatmapLegendLow")}
          </span>
          {LEGEND_LEVELS.map((level) => (
            <div key={level} className="h-3 w-3 rounded-[3px]" style={getCellStyle(level * 25)} />
          ))}
          <span className="text-[10px] text-[color:var(--muted)]">
            {translate("dashboard.overview.heatmapLegendHigh")}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default PresenceHeatmap;
