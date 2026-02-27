import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import AppProviders from "@web/presentation/providers/AppProviders";

export const metadata: Metadata = {
  title: "LevitasFlow",
  description: "Organize seu ministério com mais paz."
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps): JSX.Element => {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="bg-slate-50 text-slate-900 antialiased transition-colors dark:bg-slate-950 dark:text-slate-100">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
};

export default RootLayout;
