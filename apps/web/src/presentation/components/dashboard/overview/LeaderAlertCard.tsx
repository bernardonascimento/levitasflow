"use client";

import { useCallback, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useDashboardView } from "@web/presentation/contexts/DashboardViewContext";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";

const MOCK_TITLE = "Faltam 2 músicos para Domingo";
const MOCK_LINE2 = "Louvor 1 • Culto — Noite • em 1 dia";
const MOCK_LINE3 = "Faltam 2 confirmações para Culto — Noite (segunda)";

const LeaderAlertCard = (): JSX.Element => {
  const { translate } = useAppLanguage();
  const reduceMotion = useReducedMotion();
  const { setView } = useDashboardView();
  const [isHovered, setIsHovered] = useState(false);

  const goToAgenda = useCallback(() => {
    setView("calendar");
  }, [setView]);

  const showPulse = !reduceMotion && !isHovered;

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.06, duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative cursor-pointer overflow-hidden rounded-[1.2rem] border border-[color:var(--hero-card-border)] p-5 shadow-[var(--shadow)] backdrop-blur-xl ${showPulse ? "leader-alert-card-pulse" : ""}`}
      style={{
        background:
          "linear-gradient(145deg, color-mix(in srgb, var(--surface) 98%, transparent), color-mix(in srgb, var(--surface2) 92%, transparent))",
        boxShadow:
          "var(--shadow), 0 0 0 1px color-mix(in srgb, var(--hero-card-border) 80%, transparent), 0 0 24px color-mix(in srgb, var(--accent) 14%, transparent)"
      }}
      whileHover={
        reduceMotion
          ? {}
          : {
              y: -2,
              boxShadow:
                "var(--shadow), 0 0 0 1px color-mix(in srgb, var(--accent) 35%, transparent), 0 0 28px color-mix(in srgb, var(--accent) 20%, transparent)"
            }
      }
      onClick={goToAgenda}
    >
      <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-[color:var(--heroAura1)] blur-3xl opacity-70" />
      <div className="pointer-events-none absolute -bottom-16 -right-12 h-40 w-40 rounded-full bg-[color:var(--heroAura2)] blur-3xl opacity-70" />
      <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[color:var(--accent)]/15 text-[color:var(--accent)]">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <p className="text-base font-bold leading-snug text-[color:var(--text)]">
                {MOCK_TITLE}
              </p>
              <p className="mt-1 text-sm text-[color:var(--muted)]">{MOCK_LINE2}</p>
              <p className="mt-1 text-sm text-[color:var(--muted)]">{MOCK_LINE3}</p>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="leader-alert-cta shrink-0 self-start border-0 bg-transparent p-0 mr-4 text-sm font-semibold text-[color:var(--accent)] underline-offset-2 transition hover:shadow-[0_0_10px_color-mix(in_srgb_var(--accent)_24%,transparent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface)] sm:self-center"
        >
          {translate("dashboard.overview.leaderAlertCta")}
        </button>
      </div>
    </motion.div>
  );
};

export default LeaderAlertCard;
