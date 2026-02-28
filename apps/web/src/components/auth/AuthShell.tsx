import type { ReactNode } from "react";
import Link from "next/link";
import ThemeToggle from "@web/presentation/components/ThemeToggle";
import LanguageSelector from "@web/presentation/components/LanguageSelector";

type AuthShellProps = {
  children: ReactNode;
};

const AuthShell = ({ children }: AuthShellProps): JSX.Element => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(760px_420px_at_15%_-10%,var(--heroAura1),transparent_72%),radial-gradient(680px_380px_at_88%_108%,var(--heroAura2),transparent_74%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(165deg,color-mix(in_srgb,var(--surface)_94%,transparent),color-mix(in_srgb,var(--surface2)_82%,transparent))] opacity-70" />

      <header className="relative z-20 mx-auto flex w-full max-w-[78rem] items-center justify-between px-5 py-5 md:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-3 rounded-md text-base font-black tracking-tight text-[color:var(--text)] transition-colors hover:text-[color:var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)] md:text-lg"
          aria-label="LevitasFlow"
        >
          <span
            aria-hidden="true"
            className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[linear-gradient(135deg,#ff5a1f_0%,#ff7a1f_52%,#ff9a2f_100%)] shadow-[0_10px_26px_rgba(255,90,31,0.45)]"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 text-white"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.75 8.5H10M3.75 11H10M3.75 13.5H10"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M13.8 6.2v9.28a2.35 2.35 0 1 1-1.2-2.05V8.4l6.75-1.58v7.86a2.35 2.35 0 1 1-1.2-2.05V5.3L13.8 6.2Z"
                fill="currentColor"
              />
            </svg>
          </span>
          LevitasFlow
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSelector />
        </div>
      </header>

      <main className="relative z-10 flex min-h-[calc(100vh-84px)] items-center justify-center px-5 pb-10 pt-4 md:px-8 md:pb-14">
        <div className="w-full max-w-[27.5rem]">{children}</div>
      </main>
    </div>
  );
};

export default AuthShell;
