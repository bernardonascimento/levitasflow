"use client";

import { getLanguage, setLanguage, t, type AppLanguage, type TranslationKey } from "@shared/index";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

const storageKey = "levitasflow:language";

type LanguageContextValue = {
  language: AppLanguage;
  setAppLanguage: (language: AppLanguage) => void;
  translate: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

type LanguageProviderProps = {
  children: ReactNode;
};

const LanguageProvider = ({ children }: LanguageProviderProps): JSX.Element => {
  const [language, setLanguageState] = useState<AppLanguage>(getLanguage());

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem(storageKey);
    if (storedLanguage === "pt-BR" || storedLanguage === "en") {
      setLanguage(storedLanguage);
      setLanguageState(storedLanguage);
    }
  }, []);

  const setAppLanguage = (nextLanguage: AppLanguage): void => {
    setLanguage(nextLanguage);
    setLanguageState(nextLanguage);
    window.localStorage.setItem(storageKey, nextLanguage);
  };

  const contextValue = useMemo<LanguageContextValue>(
    () => ({
      language,
      setAppLanguage,
      translate: (key: TranslationKey) => t(key, language)
    }),
    [language]
  );

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>;
};

export const useAppLanguage = (): LanguageContextValue => {
  const contextValue = useContext(LanguageContext);

  if (!contextValue) {
    throw new Error("useAppLanguage must be used inside LanguageProvider");
  }

  return contextValue;
};

export default LanguageProvider;
