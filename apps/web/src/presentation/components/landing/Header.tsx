"use client";

import { motion, useReducedMotion } from "framer-motion";
import Button from "@web/presentation/components/Button";
import LanguageSelector from "@web/presentation/components/LanguageSelector";
import ThemeToggle from "@web/presentation/components/ThemeToggle";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";

const Header = (): JSX.Element => {
  const { translate } = useAppLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--border)] bg-[color:var(--headerBg)]/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[78rem] items-center justify-between gap-3 px-5 py-4 md:px-8">
        <a
          href="#"
          className="text-lg font-black tracking-tight text-[color:var(--text)] md:text-xl"
        >
          {translate("common.appName")}
        </a>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-[color:var(--muted)] lg:flex">
          <a href="#features" className="transition-colors hover:text-[color:var(--accent)]">
            {translate("landing.header.features")}
          </a>
          <a href="#differentials" className="transition-colors hover:text-[color:var(--accent)]">
            {translate("landing.header.differentials")}
          </a>
          <a href="#plans" className="transition-colors hover:text-[color:var(--accent)]">
            {translate("landing.header.plans")}
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSelector />
          <motion.div
            whileHover={reduceMotion ? undefined : { y: -1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="hidden md:block"
          >
            <Button variant="ghost">{translate("common.actions.enter")}</Button>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header;
