import type { Metadata } from "next";
import AuthForm from "@web/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Entrar | LevitasFlow",
  description: "Acesse sua conta LevitasFlow."
};

const LoginPage = (): JSX.Element => {
  return <AuthForm mode="login" />;
};

export default LoginPage;
