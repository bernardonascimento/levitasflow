"use client";

import type { ChangeEvent } from "react";
import type { AppLanguage } from "@shared/index";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";

const LanguageSelector = (): JSX.Element => {
  const { language, setAppLanguage, translate } = useAppLanguage();

  const onLanguageChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const nextLanguage = event.target.value as AppLanguage;
    setAppLanguage(nextLanguage);
  };

  return (
    <label className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-100">
      <span>
        {language === "pt-BR" ? translate("common.language.pt") : translate("common.language.en")}
      </span>
      <select
        value={language}
        onChange={onLanguageChange}
        className="bg-transparent text-xs font-semibold outline-none"
      >
        <option value="pt-BR">{translate("common.language.pt")}</option>
        <option value="en">{translate("common.language.en")}</option>
      </select>
    </label>
  );
};

export default LanguageSelector;
