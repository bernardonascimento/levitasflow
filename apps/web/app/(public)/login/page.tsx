import type { Metadata } from "next";
import AuthCard from "@web/presentation/components/auth/AuthCard";

export const metadata: Metadata = {
  title: "Entrar | LevitasFlow",
  description: "Acesse sua conta LevitasFlow."
};

const LoginPage = (): JSX.Element => {
  return (
    <main className="relative mx-auto flex min-h-[calc(100vh-73px)] w-full max-w-[78rem] items-center justify-center px-5 py-10 md:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(820px_420px_at_50%_8%,rgba(255,90,31,0.2),transparent_72%)]" />
      <AuthCard mode="login" />
    </main>
  );
};

export default LoginPage;
