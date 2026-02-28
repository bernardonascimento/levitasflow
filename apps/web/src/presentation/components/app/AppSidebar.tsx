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
  ministries: MinistryOption[];
};

const AppSidebar = ({ ministries }: AppSidebarProps): JSX.Element => {
  const pathname = usePathname();
  const { translate } = useAppLanguage();

  return (
    <aside className="flex hidden w-72 shrink-0 flex-col rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--surface)]/70 p-5 shadow-[var(--shadow)] backdrop-blur-xl lg:flex">
      <div className="mb-6">
        <WorkspaceSwitcher ministries={ministries} />
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.href !== "#" && pathname === item.href;

          return (
            <Link
              key={item.key}
              href={item.href}
              className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                isActive
                  ? "border border-[color:var(--accent)]/40 bg-[color:var(--accent)]/15 text-[color:var(--text)]"
                  : "text-[color:var(--muted)] hover:bg-[color:var(--surface2)] hover:text-[color:var(--text)]"
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
