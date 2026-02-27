import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { type AppTheme } from "@shared/index";

const storageKey = "levitasflow:theme";

type ThemeContextValue = {
  theme: AppTheme;
  setAppTheme: (theme: AppTheme) => Promise<void>;
  toggleTheme: () => Promise<void>;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

type ThemeProviderProps = {
  children: ReactNode;
};

const ThemeProvider = ({ children }: ThemeProviderProps): JSX.Element => {
  const [theme, setTheme] = useState<AppTheme>("light");

  useEffect(() => {
    const loadTheme = async (): Promise<void> => {
      const storedTheme = await AsyncStorage.getItem(storageKey);
      if (storedTheme === "light" || storedTheme === "dark") {
        setTheme(storedTheme);
      }
    };

    void loadTheme();
  }, []);

  const setAppTheme = async (nextTheme: AppTheme): Promise<void> => {
    setTheme(nextTheme);
    await AsyncStorage.setItem(storageKey, nextTheme);
  };

  const toggleTheme = async (): Promise<void> => {
    const nextTheme: AppTheme = theme === "light" ? "dark" : "light";
    await setAppTheme(nextTheme);
  };

  const contextValue: ThemeContextValue = {
    theme,
    setAppTheme,
    toggleTheme
  };

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

export const useAppTheme = (): ThemeContextValue => {
  const contextValue = useContext(ThemeContext);

  if (!contextValue) {
    throw new Error("useAppTheme must be used inside ThemeProvider");
  }

  return contextValue;
};

export default ThemeProvider;
