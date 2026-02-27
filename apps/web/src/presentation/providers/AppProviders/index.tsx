"use client";

import type { ReactNode } from "react";
import ThemeProvider from "@web/presentation/providers/ThemeProvider";
import LanguageProvider from "@web/presentation/providers/LanguageProvider";

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
