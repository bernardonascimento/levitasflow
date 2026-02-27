import type { ReactNode } from "react";
import ThemeProvider from "@mobile/presentation/providers/ThemeProvider";
import LanguageProvider from "@mobile/presentation/providers/LanguageProvider";

type AppProvidersProps = {
  children: ReactNode;
};

const AppProviders = ({ children }: AppProvidersProps): JSX.Element => {
  return (
    <ThemeProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  );
};

export default AppProviders;
