import "./global.css";
import { StatusBar } from "expo-status-bar";
import AppProviders from "@mobile/presentation/providers/AppProviders";
import OnboardingScreen from "@mobile/presentation/screens/OnboardingScreen";
import { useAppTheme } from "@mobile/presentation/providers/ThemeProvider";

const AppContent = (): JSX.Element => {
  const { theme } = useAppTheme();

  return (
    <>
      <OnboardingScreen />
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
    </>
  );
};

const App = (): JSX.Element => {
  return (
    <AppProviders>
      <AppContent />
    </AppProviders>
  );
};

export default App;
