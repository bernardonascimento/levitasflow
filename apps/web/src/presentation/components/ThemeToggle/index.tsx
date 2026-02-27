"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";

const ThemeToggle = (): JSX.Element => {
  const { resolvedTheme, setTheme } = useTheme();
  const { translate } = useAppLanguage();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isDarkMode = resolvedTheme === "dark";
  const label = isDarkMode ? translate("common.theme.light") : translate("common.theme.dark");

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => setTheme(isDarkMode ? "light" : "dark")}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
    >
      {!isMounted ? (
        <span className="text-sm">◐</span>
      ) : isDarkMode ? (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        >
          <path d="M12 4.5v2.25M12 17.25v2.25M4.5 12h2.25M17.25 12h2.25M6.7 6.7l1.6 1.6M15.7 15.7l1.6 1.6M6.7 17.3l1.6-1.6M15.7 8.3l1.6-1.6M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        >
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7.2 7.2 0 1 0 9.8 9.8Z" />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
