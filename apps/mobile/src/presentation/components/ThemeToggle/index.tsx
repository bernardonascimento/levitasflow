import { Pressable, Text } from "react-native";
import { useAppTheme } from "@mobile/presentation/providers/ThemeProvider";
import { useAppLanguage } from "@mobile/presentation/providers/LanguageProvider";

const ThemeToggle = (): JSX.Element => {
  const { theme, toggleTheme } = useAppTheme();
  const { translate } = useAppLanguage();
  const isDarkMode = theme === "dark";

  return (
    <Pressable
      onPress={() => {
        void toggleTheme();
      }}
      className={`h-11 w-11 items-center justify-center rounded-full border ${isDarkMode ? "border-slate-700 bg-slate-900" : "border-slate-300 bg-white"}`}
      accessibilityLabel={
        isDarkMode ? translate("common.theme.light") : translate("common.theme.dark")
      }
    >
      <Text className={`text-lg ${isDarkMode ? "text-slate-100" : "text-slate-700"}`}>
        {isDarkMode ? "☀" : "☾"}
      </Text>
    </Pressable>
  );
};

export default ThemeToggle;
