import type { ReactNode } from "react";
import AuthLayout from "@web/presentation/layouts/AuthLayout";

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthRouteLayout = ({ children }: AuthLayoutProps): JSX.Element => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default AuthRouteLayout;
