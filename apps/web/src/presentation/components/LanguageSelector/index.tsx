"use client";

import { useEffect, useRef, useState } from "react";
import type { AppLanguage } from "@shared/index";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";

const LanguageSelector = (): JSX.Element => {
  const { language, setAppLanguage, translate } = useAppLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const selectorLabel = language === "pt-BR" ? "Selecionar idioma" : "Select language";

  const currentLanguageLabel =
    language === "pt-BR" ? translate("common.language.pt") : translate("common.language.en");

  const onLanguageSelect = (nextLanguage: AppLanguage): void => {
    setAppLanguage(nextLanguage);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const onPointerDown = (event: MouseEvent): void => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const onEscape = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setIsMenuOpen((currentState) => !currentState)}
        aria-label={selectorLabel}
        aria-haspopup="menu"
        aria-expanded={isMenuOpen}
        className="inline-flex h-10 min-w-[72px] items-center justify-center gap-1.5 rounded-full border border-[color:var(--border)] bg-white/90 px-3 text-xs font-semibold text-[color:var(--text)] shadow-sm backdrop-blur-md transition-all duration-200 hover:border-[color:var(--accent)]/45 hover:text-[color:var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)] dark:bg-[color:var(--surface)]"
      >
        <span>{currentLanguageLabel}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className={`h-3.5 w-3.5 text-[color:var(--muted)] transition-transform duration-200 ${isMenuOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isMenuOpen ? (
        <ul
          role="menu"
          aria-label="Opções de idioma"
          className="absolute right-0 z-50 mt-2 w-28 rounded-2xl border border-[color:var(--border)] bg-white/95 p-1 shadow-[var(--shadow)] backdrop-blur-md dark:bg-[color:var(--surface2)]"
        >
          <li>
            <button
              type="button"
              role="menuitemradio"
              aria-checked={language === "pt-BR"}
              onClick={() => onLanguageSelect("pt-BR")}
              className="w-full rounded-xl px-3 py-2 text-left text-xs font-semibold text-[color:var(--text)] transition-colors hover:bg-[color:var(--surface2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]"
            >
              {translate("common.language.pt")}
            </button>
          </li>
          <li>
            <button
              type="button"
              role="menuitemradio"
              aria-checked={language === "en"}
              onClick={() => onLanguageSelect("en")}
              className="w-full rounded-xl px-3 py-2 text-left text-xs font-semibold text-[color:var(--text)] transition-colors hover:bg-[color:var(--surface2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]"
            >
              {translate("common.language.en")}
            </button>
          </li>
        </ul>
      ) : null}
    </div>
  );
};

export default LanguageSelector;
