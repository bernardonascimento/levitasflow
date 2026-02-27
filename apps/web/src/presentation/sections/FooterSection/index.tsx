"use client";

import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";

const FooterSection = (): JSX.Element => {
  const { translate } = useAppLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 py-8 dark:border-slate-800">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-6 text-sm text-slate-500 md:flex-row md:px-8">
        <p>
          &copy; {currentYear} {translate("common.appName")}
        </p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-orange-500">
            {translate("landing.footer.terms")}
          </a>
          <a href="#" className="hover:text-orange-500">
            {translate("landing.footer.privacy")}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
