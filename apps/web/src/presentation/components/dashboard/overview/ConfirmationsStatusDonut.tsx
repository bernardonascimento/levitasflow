"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PieChart as PieChartIcon } from "lucide-react";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";

const MOCK_CONFIRMED = 12;
const MOCK_PENDING = 5;
const MOCK_UNAVAILABLE = 3;
const MOCK_TOTAL = MOCK_CONFIRMED + MOCK_PENDING + MOCK_UNAVAILABLE;

const CX = 50;
const CY = 50;
const STROKE = 20;
const R = 50 - STROKE / 2;
const CIRCUMFERENCE = 2 * Math.PI * R;

function segmentOffset(ratio: number): number {
  return CIRCUMFERENCE * (1 - ratio);
}

const ConfirmationsStatusDonut = (): JSX.Element => {
  const { translate } = useAppLanguage();
  const reduceMotion = useReducedMotion();
  const [highlight, setHighlight] = useState<"confirmed" | "pending" | "unavailable" | null>(null);

  const confirmedRatio = MOCK_CONFIRMED / MOCK_TOTAL;
  const pendingRatio = MOCK_PENDING / MOCK_TOTAL;
  const unavailableRatio = MOCK_UNAVAILABLE / MOCK_TOTAL;

  const confirmedDash = CIRCUMFERENCE * confirmedRatio;
  const pendingDash = CIRCUMFERENCE * pendingRatio;
  const unavailableDash = CIRCUMFERENCE * unavailableRatio;

  const segments = [
    {
      key: "confirmed" as const,
      dash: confirmedDash,
      offset: 0,
      color: "color-mix(in srgb, var(--accent2) 88%, var(--surface2))",
      labelKey: "dashboard.overview.confirmationsStatusConfirmed" as const
    },
    {
      key: "pending" as const,
      dash: pendingDash,
      offset: segmentOffset(confirmedRatio),
      color: "var(--accent)",
      labelKey: "dashboard.overview.confirmationsStatusPending" as const
    },
    {
      key: "unavailable" as const,
      dash: unavailableDash,
      offset: segmentOffset(confirmedRatio + pendingRatio),
      color: "rgba(148, 163, 184, 0.9)",
      labelKey: "dashboard.overview.confirmationsStatusUnavailable" as const
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.3 }}
      className="flex h-full flex-col rounded-[1.2rem] border border-[color:var(--border)] bg-[color:var(--surface)]/75 px-5 pt-4 shadow-[var(--shadow)] backdrop-blur-sm transition hover:shadow-[0_0_0_1px_rgba(255,90,31,0.06)]"
    >
      <h3 className="flex items-center gap-2 text-base font-bold text-[color:var(--text)]">
        <PieChartIcon className="h-4 w-4 text-[color:var(--muted)]" />
        {translate("dashboard.overview.confirmationsStatusTitle")}
      </h3>
      <p className="mt-1 text-xs text-[color:var(--muted)]">
        {translate("dashboard.overview.confirmationsStatusSubtitle")}
      </p>

      <div className="flex flex-1 flex-col items-center justify-center gap-4 sm:flex-row sm:items-center sm:gap-4">
        <div className="relative shrink-0 py-4 px-2" style={{ overflow: "visible" }}>
          <div className="relative h-[180px] w-[180px]">
            <svg
              viewBox="0 0 100 100"
              className="h-full w-full -rotate-90"
              style={{ overflow: "visible" }}
              aria-hidden
            >
              {segments.map((seg) => (
                <circle
                  key={seg.key}
                  cx={CX}
                  cy={CY}
                  r={R}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth={STROKE}
                  strokeDasharray={`${seg.dash} ${CIRCUMFERENCE}`}
                  strokeDashoffset={seg.offset}
                  className={`transition-all duration-200 ${highlight != null && highlight !== seg.key ? "opacity-50" : ""}`}
                />
              ))}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[color:var(--muted)] opacity-70">
                {translate("dashboard.overview.confirmationsStatusPending")}
              </span>
              <span className="text-3xl font-bold text-[color:var(--accent)] -mt-1">
                {MOCK_PENDING}
              </span>
            </div>
          </div>
        </div>

        <ul className="flex max-w-[140px] flex-col justify-center gap-2.5 sm:items-start">
          {segments.map((seg) => (
            <li
              key={seg.key}
              onMouseEnter={() => setHighlight(seg.key)}
              onMouseLeave={() => setHighlight(null)}
              className="flex cursor-default items-center gap-2.5 text-sm transition-[filter,opacity] duration-200 hover:brightness-110"
              style={{ opacity: highlight === null || highlight === seg.key ? 1 : 0.6 }}
            >
              <span
                className="h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: seg.color }}
              />
              <span className="text-[color:var(--text)]">{translate(seg.labelKey)}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default ConfirmationsStatusDonut;
