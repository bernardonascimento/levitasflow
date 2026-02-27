import { translations, type AppLanguage } from "@shared/i18n/translations";

type Join<K, P> = K extends string ? (P extends string ? `${K}.${P}` : never) : never;

type NestedTranslationKeys<T> = T extends string
  ? never
  : {
      [K in keyof T & string]: T[K] extends string ? K : Join<K, NestedTranslationKeys<T[K]>>;
    }[keyof T & string];

export type TranslationKey = NestedTranslationKeys<(typeof translations)["pt-BR"]>;

const defaultLanguage: AppLanguage = "pt-BR";
let currentLanguage: AppLanguage = defaultLanguage;

const getNestedValue = (value: unknown, path: string): string | undefined => {
  const pathParts = path.split(".");
  let currentValue: unknown = value;

  for (const pathPart of pathParts) {
    if (typeof currentValue !== "object" || currentValue === null || !(pathPart in currentValue)) {
      return undefined;
    }

    currentValue = (currentValue as Record<string, unknown>)[pathPart];
  }

  return typeof currentValue === "string" ? currentValue : undefined;
};

export const setLanguage = (language: AppLanguage): void => {
  currentLanguage = language;
};

export const getLanguage = (): AppLanguage => {
  return currentLanguage;
};

export const t = (key: TranslationKey, language?: AppLanguage): string => {
  const selectedLanguage = language ?? currentLanguage;
  const selectedTranslation = getNestedValue(translations[selectedLanguage], key);

  if (selectedTranslation) {
    return selectedTranslation;
  }

  const fallbackTranslation = getNestedValue(translations[defaultLanguage], key);
  return fallbackTranslation ?? key;
};
