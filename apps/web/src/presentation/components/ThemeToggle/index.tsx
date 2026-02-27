"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
    <motion.button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => setTheme(isDarkMode ? "light" : "dark")}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border)] bg-white/90 text-[color:var(--text)] shadow-sm backdrop-blur-md transition-[transform,box-shadow,border-color] duration-200 hover:border-[color:var(--accent)]/45 hover:shadow-[0_8px_24px_color-mix(in_srgb,var(--accent)_16%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)] dark:bg-[color:var(--surface)] dark:hover:shadow-[0_0_24px_rgba(255,90,31,0.25)]"
    >
      <span
        className={`absolute inset-[5px] rounded-full transition-colors duration-200 ${
          isDarkMode
            ? "bg-[color:var(--surface2)] group-hover:bg-[color:var(--surface)]"
            : "bg-white group-hover:bg-white"
        }`}
      />
      <AnimatePresence mode="wait">
        <motion.span
          key={isMounted ? (isDarkMode ? "sun" : "moon") : "initial"}
          initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="relative z-10"
        >
          {!isMounted ? (
            <span className="text-sm">◐</span>
          ) : isDarkMode ? (
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M12 3.2v2.1M12 18.7v2.1M3.2 12h2.1M18.7 12h2.1M5.4 5.4l1.5 1.5M17.1 17.1l1.5 1.5M5.4 18.6l1.5-1.5M17.1 6.9l1.5-1.5M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M20.8 13.2A8.8 8.8 0 1 1 10.8 3.2a7 7 0 1 0 10 10Z" />
            </svg>
          )}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeToggle;
