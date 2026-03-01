"use client";

import type { ReactNode } from "react";
import AppHeader from "@web/presentation/components/app/AppHeader";
import AppSidebar from "@web/presentation/components/app/AppSidebar";
import type { UserAvatarUser } from "@web/presentation/components/app/UserAvatar";
import { DashboardViewProvider } from "@web/presentation/contexts/DashboardViewContext";
import { MinistryProvider, type MinistryOption } from "@web/presentation/providers/MinistryProvider";

type AppShellProps = {
  user: UserAvatarUser;
  ministries: MinistryOption[];
  children: ReactNode;
};

const AppShell = ({ user, ministries, children }: AppShellProps): JSX.Element => {
  return (
    <MinistryProvider ministries={ministries}>
      <DashboardViewProvider>
        <div className="min-h-screen bg-[color:var(--bg)]">
          <AppHeader user={user} />

          <div className="mx-auto flex w-full max-w-[78rem] gap-4 px-4 py-4 md:gap-5 md:px-6 md:py-5">
            <AppSidebar user={user} />

            <main className="min-h-0 min-w-0 flex-1">{children}</main>
          </div>
        </div>
      </DashboardViewProvider>
    </MinistryProvider>
  );
};

export default AppShell;
