"use client";

import Link from "next/link";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";
import LanguageSelector from "@web/presentation/components/LanguageSelector";
import ThemeToggle from "@web/presentation/components/ThemeToggle";

const PublicTopbar = (): JSX.Element => {
  const { translate } = useAppLanguage();

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-[color:var(--border)] bg-[color:var(--headerBg)]/90 backdrop-blur-xl">
        <div className="mx-auto grid w-full max-w-[78rem] grid-cols-[auto_1fr_auto] items-center gap-3 px-5 py-4 md:px-8">
          <Link
            href="/"
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
          </Link>

          <nav
            aria-label="Navegação principal"
            className="hidden items-center justify-self-center gap-8 text-sm font-semibold text-[color:var(--muted)] lg:flex"
          >
            <Link
              href="/pricing"
              className="rounded-md transition-colors hover:text-[color:var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)]"
            >
              {translate("landing.header.plans")}
            </Link>
          </nav>

          <div className="flex items-center justify-self-end gap-2">
            <ThemeToggle />
            <LanguageSelector />
          </div>
        </div>
      </header>
      <div aria-hidden className="h-[73px] md:h-[76px]" />
    </>
  );
};

export default PublicTopbar;
