"use client";

import Button from "@web/presentation/components/Button";
import LanguageSelector from "@web/presentation/components/LanguageSelector";
import ThemeToggle from "@web/presentation/components/ThemeToggle";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";

const HeaderSection = (): JSX.Element => {
  const { translate } = useAppLanguage();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-6 py-4 md:px-8">
        <a
          href="#"
          className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-slate-100"
        >
          {translate("common.appName")}
        </a>
        <nav className="hidden items-center gap-6 text-sm text-slate-600 dark:text-slate-300 md:flex">
          <a href="#features" className="hover:text-orange-500">
            {translate("landing.header.features")}
          </a>
          <a href="#differentials" className="hover:text-orange-500">
            {translate("landing.header.differentials")}
          </a>
          <a href="#plans" className="hover:text-orange-500">
            {translate("landing.header.plans")}
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSelector />
          <Button variant="ghost" className="hidden md:inline-flex">
            {translate("common.actions.enter")}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default HeaderSection;
