"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PieChart as PieChartIcon } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";

export type ConfirmationByTypeItem = { name: string; value: number };

const MOCK_DATA: ConfirmationByTypeItem[] = [
  { name: "Culto — Noite", value: 78 },
  { name: "Culto — Manhã", value: 85 },
  { name: "Ensaio", value: 62 },
  { name: "Reunião", value: 91 }
];

const CHART_COLORS = [
  "var(--accent)",
  "var(--accent2)",
  "color-mix(in srgb, var(--accent) 75%, var(--muted))",
  "color-mix(in srgb, var(--accent2) 80%, var(--muted))"
];

type ConfirmationsByEventTypeChartProps = {
  data?: ConfirmationByTypeItem[] | null;
};

const ConfirmationsByEventTypeChart = ({
  data = MOCK_DATA
}: ConfirmationsByEventTypeChartProps): JSX.Element => {
  const { translate } = useAppLanguage();
  const reduceMotion = useReducedMotion();
  const list = data ?? MOCK_DATA;

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.3 }}
      className="rounded-[1.2rem] border border-[color:var(--border)] bg-[color:var(--surface)]/75 p-5 shadow-[var(--shadow)] transition hover:shadow-[0_0_0_1px_rgba(255,90,31,0.06)]"
    >
      <h3 className="flex items-center gap-2 text-base font-bold text-[color:var(--text)]">
        <PieChartIcon className="h-4 w-4 text-[color:var(--muted)]" />
        {translate("dashboard.overview.confirmationsByTypeTitle")}
      </h3>
      <p className="mt-1 text-sm text-[color:var(--muted)]">
        {translate("dashboard.overview.confirmationsByTypeSubtitle")}
      </p>
      <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:items-stretch">
        <div className="h-[200px] w-full min-w-[200px] max-w-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={list}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={56}
                outerRadius={80}
                paddingAngle={2}
                stroke="transparent"
                animationBegin={200}
                animationDuration={600}
              >
                {list.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--surface2)",
                  border: "1px solid var(--border)",
                  borderRadius: "0.75rem"
                }}
                labelStyle={{ color: "var(--text)" }}
                formatter={(value: number) =>
                  [`${value}%`, translate("dashboard.overview.confirmationRate")] as [
                    string,
                    string
                  ]
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="flex flex-1 flex-wrap content-center justify-center gap-x-6 gap-y-2 sm:justify-start sm:pl-4">
          {list.map((item, i) => (
            <li key={item.name} className="flex items-center gap-2 text-sm">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }}
              />
              <span className="text-[color:var(--text)]">{item.name}</span>
              <span className="text-[color:var(--muted)]">{item.value}%</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default ConfirmationsByEventTypeChart;
