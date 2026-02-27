import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import AppProviders from "@web/presentation/providers/AppProviders";

export const metadata: Metadata = {
  title: "LevitasFlow",
  description: "Organize seu ministério com excelência.",
  icons: {
    icon: "/icon.svg"
  }
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps): JSX.Element => {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="antialiased transition-colors">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
};

export default RootLayout;
