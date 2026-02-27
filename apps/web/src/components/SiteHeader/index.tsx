"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";
import LanguageSelector from "@web/presentation/components/LanguageSelector";
import ThemeToggle from "@web/presentation/components/ThemeToggle";

const SiteHeader = (): JSX.Element => {
  const { translate } = useAppLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-[color:var(--border)] bg-[color:var(--headerBg)]/90 backdrop-blur-xl">
        <div className="mx-auto grid w-full max-w-[78rem] grid-cols-[auto_1fr_auto] items-center gap-3 px-5 py-4 md:px-8">
          <a
            href="#"
            className="inline-flex items-center gap-3 rounded-md text-lg font-black tracking-tight text-[color:var(--text)] transition-colors hover:text-[color:var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)] md:text-xl"
            aria-label={translate("common.appName")}
          >
            <span
              aria-hidden="true"
              className="relative inline-flex h-13 w-13 shrink-0 items-center justify-center rounded-lg bg-[linear-gradient(135deg,#ff5a1f_0%,#ff7a1f_52%,#ff9a2f_100%)] shadow-[0_12px_30px_rgba(255,90,31,0.5)] before:absolute before:inset-0 before:rounded-lg before:bg-[radial-gradient(circle_at_50%_115%,rgba(255,172,120,0.65),transparent_58%)]"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-7 w-7 text-white"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.75 8.5H10M3.75 11H10M3.75 13.5H10"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeOpacity="0.72"
                />
                <path
                  d="M13.8 6.2v9.28a2.35 2.35 0 1 1-1.2-2.05V8.4l6.75-1.58v7.86a2.35 2.35 0 1 1-1.2-2.05V5.3L13.8 6.2Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            {translate("common.appName")}
          </a>

          <nav
            aria-label="Navegação principal"
            className="hidden items-center justify-self-center gap-8 text-sm font-semibold text-[color:var(--muted)] lg:flex"
          >
            <a
              href="#features"
              className="rounded-md transition-colors hover:text-[color:var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)]"
            >
              {translate("landing.header.features")}
            </a>
            <a
              href="#differentials"
              className="rounded-md transition-colors hover:text-[color:var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)]"
            >
              {translate("landing.header.differentials")}
            </a>
            <a
              href="#plans"
              className="rounded-md transition-colors hover:text-[color:var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)]"
            >
              {translate("landing.header.plans")}
            </a>
          </nav>

          <div className="flex items-center justify-self-end gap-2">
            <ThemeToggle />
            <LanguageSelector />
            <motion.button
              type="button"
              whileHover={reduceMotion ? undefined : { y: -1 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="group relative hidden h-10 items-center justify-center overflow-hidden rounded-full bg-[color:var(--accent)] px-5 text-sm font-semibold text-white shadow-[0_10px_24px_color-mix(in_srgb,var(--accent)_34%,transparent)] transition-[box-shadow,transform] duration-300 hover:shadow-[0_14px_30px_color-mix(in_srgb,var(--accent)_40%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)] dark:shadow-[0_12px_28px_rgba(255,90,31,0.35)] dark:hover:shadow-[0_14px_34px_rgba(255,90,31,0.48)] md:inline-flex"
              aria-label={translate("common.actions.enter")}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-px rounded-full border border-white/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-1 rounded-full bg-[color:var(--accent)]/35 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-80 dark:group-hover:opacity-100"
              />
              <span className="relative z-10">{translate("common.actions.enter")}</span>
            </motion.button>
          </div>
        </div>
      </header>
      <div aria-hidden className="h-[73px] md:h-[76px]" />
    </>
  );
};

export default SiteHeader;
