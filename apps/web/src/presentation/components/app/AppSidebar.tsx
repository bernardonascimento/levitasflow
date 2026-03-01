"use client";

import { useCallback } from "react";
import type { ComponentType } from "react";
import {
  Bell,
  CalendarDays,
  ClipboardList,
  LayoutDashboard,
  Music4,
  Users,
  UserX
} from "lucide-react";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";
import type { UserAvatarUser } from "@web/presentation/components/app/UserAvatar";
import WorkspaceSwitcher from "@web/presentation/components/app/WorkspaceSwitcher";
import UpgradeCard from "@web/presentation/components/app/UpgradeCard";
import { useDashboardView, type DashboardView } from "@web/presentation/contexts/DashboardViewContext";

type NavItem = {
  key: "overview" | "agenda" | "notices" | "repertoire" | "unavailable" | "groups" | "plans";
  view: DashboardView;
  icon: ComponentType<{ className?: string }>;
};

const navItems: NavItem[] = [
  { key: "overview", view: "overview", icon: LayoutDashboard },
  { key: "agenda", view: "calendar", icon: CalendarDays },
  { key: "notices", view: "notices", icon: Bell },
  { key: "repertoire", view: "repertoire", icon: Music4 },
  { key: "unavailable", view: "unavailability", icon: UserX },
  { key: "groups", view: "teams", icon: Users },
  { key: "plans", view: "plans", icon: ClipboardList }
];

type AppSidebarProps = {
  user: UserAvatarUser;
};

const AppSidebar = ({ user }: AppSidebarProps): JSX.Element => {
  const { translate } = useAppLanguage();
  const { view, setView } = useDashboardView();

  const handleItemClick = useCallback(
    (itemView: DashboardView) => () => {
      setView(itemView);
    },
    [setView]
  );

  return (
    <aside className="relative flex hidden h-fit w-72 shrink-0 flex-col rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--surface)]/70 p-5 shadow-[var(--shadow)] backdrop-blur-xl lg:flex">
      <div className="relative z-[100] mb-6 min-h-[5.5rem] shrink-0">
        <WorkspaceSwitcher user={user} />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = view === item.view;

            return (
              <button
                key={item.key}
                type="button"
                onClick={handleItemClick(item.view)}
                className={`flex w-full items-center gap-2.5 rounded-xl border-l-[3px] px-3 py-2.5 text-left text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface)] ${
                  isActive
                    ? "border-l-[color:var(--accent)] bg-[color:var(--accent)]/[0.08] text-[color:var(--text)] shadow-[2px_0_12px_-2px_rgba(255,90,31,0.25),inset_0_0_0_1px_rgba(255,90,31,0.06)]"
                    : "border-l-transparent text-[color:var(--muted)] hover:bg-[color:var(--surface2)]/80 hover:text-[color:var(--text)] hover:shadow-[2px_0_8px_-2px_rgba(255,90,31,0.12)]"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {translate(`dashboard.sidebar.${item.key}`)}
              </button>
            );
          })}
        </nav>

        <div className="mt-6 pt-5 pb-2">
          <UpgradeCard />
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
