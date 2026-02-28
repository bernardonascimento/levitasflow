import type { Metadata } from "next";
import AuthForm from "@web/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Criar conta | LevitasFlow",
  description: "Crie sua conta LevitasFlow."
};

const SignupPage = (): JSX.Element => {
  return <AuthForm mode="signup" />;
};

export default SignupPage;
