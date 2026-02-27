"use client";

import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";

const Footer = (): JSX.Element => {
  const { translate } = useAppLanguage();

  return (
    <footer className="border-t border-[color:var(--border)] py-8">
      <div className="mx-auto flex w-full max-w-[78rem] flex-col items-center justify-between gap-3 px-5 text-sm text-[color:var(--muted)] md:flex-row md:px-8">
        <p>{translate("landing.footer.copyright")}</p>
        <div className="flex items-center gap-5">
          <a href="#" className="transition-colors hover:text-[color:var(--accent)]">
            {translate("landing.footer.terms")}
          </a>
          <a href="#" className="transition-colors hover:text-[color:var(--accent)]">
            {translate("landing.footer.privacy")}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
