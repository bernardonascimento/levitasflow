"use client";

import Link from "next/link";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";
import LanguageSelector from "@web/presentation/components/LanguageSelector";
import ThemeToggle from "@web/presentation/components/ThemeToggle";

const PublicTopbar = (): JSX.Element => {
  const { translate } = useAppLanguage();

  return (
    <header className="sticky top-0 z-30 border-b border-[color:var(--border)] bg-[color:var(--headerBg)]/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[78rem] items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-md text-base font-black tracking-tight text-[color:var(--text)] transition-colors hover:text-[color:var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)]"
        >
          {translate("common.appName")}
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/pricing"
            className="rounded-md px-2 py-1 text-sm font-semibold text-[color:var(--muted)] transition-colors hover:text-[color:var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)]"
          >
            {translate("landing.header.plans")}
          </Link>
          <ThemeToggle />
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
};

export default PublicTopbar;
