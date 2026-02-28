"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import ThemeToggle from "@web/presentation/components/ThemeToggle";
import LanguageSelector from "@web/presentation/components/LanguageSelector";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";
import UserAvatar, { type UserAvatarUser } from "@web/presentation/components/app/UserAvatar";
import { Bell } from "lucide-react";

type AppHeaderProps = {
  user: UserAvatarUser;
};

const Logo = (): JSX.Element => {
  const { translate } = useAppLanguage();
  return (
    <Link
      href="/app"
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
  );
};

const AppHeader = ({ user }: AppHeaderProps): JSX.Element => {
  const { translate } = useAppLanguage();

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-[color:var(--border)] bg-[color:var(--headerBg)]/90 backdrop-blur-xl">
        <div className="mx-auto grid w-full max-w-[78rem] grid-cols-[auto_1fr_auto] items-center gap-3 px-5 py-4 md:px-8">
          <Logo />

          <div className="hidden items-center justify-center md:flex">
            <div className="flex w-full max-w-md items-center gap-2 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface2)]/60 px-3 py-2">
              <Search className="h-4 w-4 shrink-0 text-[color:var(--muted)]" />
              <input
                type="search"
                placeholder={translate("dashboard.search.placeholder")}
                className="w-full bg-transparent text-sm text-[color:var(--text)] outline-none placeholder:text-[color:var(--muted)]"
                aria-label={translate("dashboard.search.placeholder")}
              />
            </div>
          </div>

          <div className="flex items-center justify-self-end gap-2">
            <ThemeToggle />
            <LanguageSelector />
            <button
              type="button"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[color:var(--border)] bg-white/90 text-[color:var(--muted)] shadow-sm backdrop-blur-md transition-[color,box-shadow,border-color] duration-200 hover:border-[color:var(--accent)]/45 hover:text-[color:var(--text)] hover:shadow-[0_8px_24px_color-mix(in_srgb,var(--accent)_16%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)] dark:bg-[color:var(--surface)] dark:hover:shadow-[0_0_24px_rgba(255,90,31,0.25)]"
              aria-label="Notificações"
            >
              <Bell className="h-5 w-5" strokeWidth={1.8} stroke="currentColor" />
            </button>
            <UserAvatar user={user} />
          </div>
        </div>
      </header>
      <div aria-hidden className="h-[73px] md:h-[76px]" />
    </>
  );
};

export default AppHeader;
