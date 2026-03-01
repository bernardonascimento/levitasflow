"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
import WorkspaceSwitcher, {
  type MinistryOption
} from "@web/presentation/components/app/WorkspaceSwitcher";
import UpgradeCard from "@web/presentation/components/app/UpgradeCard";

type NavItem = {
  key: "overview" | "agenda" | "notices" | "repertoire" | "unavailable" | "groups" | "plans";
  href: string;
  icon: ComponentType<{ className?: string }>;
};

const navItems: NavItem[] = [
  { key: "overview", href: "/app", icon: LayoutDashboard },
  { key: "agenda", href: "#", icon: CalendarDays },
  { key: "notices", href: "#", icon: Bell },
  { key: "repertoire", href: "#", icon: Music4 },
  { key: "unavailable", href: "#", icon: UserX },
  { key: "groups", href: "#", icon: Users },
  { key: "plans", href: "/pricing", icon: ClipboardList }
];

type AppSidebarProps = {
  user: UserAvatarUser;
  ministries: MinistryOption[];
};

const AppSidebar = ({ user, ministries }: AppSidebarProps): JSX.Element => {
  const pathname = usePathname();
  const { translate } = useAppLanguage();

  return (
    <aside className="flex hidden w-72 shrink-0 flex-col rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--surface)]/70 p-5 shadow-[var(--shadow)] backdrop-blur-xl lg:flex">
      <div className="mb-6">
        <WorkspaceSwitcher user={user} ministries={ministries} />
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.href !== "#" && pathname === item.href;

          return (
            <Link
              key={item.key}
              href={item.href}
              className={`flex items-center gap-2.5 rounded-xl border-l-[3px] px-3 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface)] ${
                isActive
                  ? "border-l-[color:var(--accent)] bg-[color:var(--accent)]/[0.08] text-[color:var(--text)] shadow-[2px_0_12px_-2px_rgba(255,90,31,0.25),inset_0_0_0_1px_rgba(255,90,31,0.06)]"
                  : "border-l-transparent text-[color:var(--muted)] hover:bg-[color:var(--surface2)]/80 hover:text-[color:var(--text)] hover:shadow-[2px_0_8px_-2px_rgba(255,90,31,0.12)]"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {translate(`dashboard.sidebar.${item.key}`)}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 pt-5">
        <UpgradeCard />
      </div>
    </aside>
  );
};

export default AppSidebar;
