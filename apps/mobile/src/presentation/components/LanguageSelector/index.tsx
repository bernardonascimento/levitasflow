import { Pressable, Text, View } from "react-native";
import type { AppLanguage } from "@shared/index";
import { useAppLanguage } from "@mobile/presentation/providers/LanguageProvider";
import { useAppTheme } from "@mobile/presentation/providers/ThemeProvider";

const LanguageSelector = (): JSX.Element => {
  const { language, setAppLanguage, translate } = useAppLanguage();
  const { theme } = useAppTheme();
  const baseClassName =
    theme === "light"
      ? "border-slate-300 bg-white text-slate-700"
      : "border-slate-700 bg-slate-900 text-slate-100";

  const onChangeLanguage = (nextLanguage: AppLanguage): void => {
    void setAppLanguage(nextLanguage);
  };

  const getLabelClassName = (isSelected: boolean): string => {
    if (isSelected) {
      return "font-bold text-orange-600";
    }

    return theme === "dark" ? "text-white" : "text-slate-700";
  };

  return (
    <View className={`flex-row items-center rounded-full border p-1 ${baseClassName}`}>
      <Pressable
        onPress={() => onChangeLanguage("pt-BR")}
        className={`rounded-full px-3 py-1 ${language === "pt-BR" ? "bg-orange-100" : ""}`}
      >
        <Text className={getLabelClassName(language === "pt-BR")}>
          {translate("common.language.pt")}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => onChangeLanguage("en")}
        className={`rounded-full px-3 py-1 ${language === "en" ? "bg-orange-100" : ""}`}
      >
        <Text className={getLabelClassName(language === "en")}>
          {translate("common.language.en")}
        </Text>
      </Pressable>
    </View>
  );
};

export default LanguageSelector;
