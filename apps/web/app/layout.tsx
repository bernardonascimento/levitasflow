import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "LevitasFlow Web",
  description: "Admin dashboard placeholder"
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps): JSX.Element => {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
