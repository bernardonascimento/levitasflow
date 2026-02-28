"use client";

import type { ReactNode } from "react";
import SiteHeader from "@web/components/SiteHeader";
import AuthBrandingPanel from "@web/presentation/components/auth/AuthBrandingPanel";

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps): JSX.Element => {
  return (
    <div className="auth-root relative min-h-screen text-[color:var(--text)]">
      <SiteHeader />
      <main className="relative min-h-[calc(100vh-73px)] md:min-h-[calc(100vh-76px)]">
        <div className="mx-auto flex w-full max-w-[78rem] flex-col items-center justify-between gap-10 px-5 pb-14 pt-8 md:px-8 md:pb-20 md:pt-14 lg:flex-row lg:items-start">
          <AuthBrandingPanel className="hidden w-full lg:block lg:max-w-[52%] lg:shrink-0" />
          <div className="flex w-full justify-center lg:min-w-0 lg:flex-1 lg:justify-end">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
