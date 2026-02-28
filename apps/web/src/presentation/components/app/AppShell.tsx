"use client";

import { useState, type ComponentType, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import {
  Bell,
  CalendarDays,
  ChevronDown,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Music4,
  Search,
  Settings,
  User,
  Users,
  UserX
} from "lucide-react";
import Button from "@web/presentation/components/Button";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";
import { createSupabaseBrowserClient } from "@web/lib/supabase/browser";

type AppShellProps = {
  userEmail: string;
  children: ReactNode;
};

type NavItem = {
  key: "overview" | "agenda" | "notices" | "repertoire" | "unavailable" | "groups" | "plans";
  href: string;
  icon: ComponentType<{ className?: string }>;
};

const navItems: ReadonlyArray<NavItem> = [
  { key: "overview", href: "/app", icon: LayoutDashboard },
  { key: "agenda", href: "#", icon: CalendarDays },
  { key: "notices", href: "#", icon: Bell },
  { key: "repertoire", href: "#", icon: Music4 },
  { key: "unavailable", href: "#", icon: UserX },
  { key: "groups", href: "#", icon: Users },
  { key: "plans", href: "/pricing", icon: ClipboardList }
];

const AppShell = ({ userEmail, children }: AppShellProps): JSX.Element => {
  const sidebarKey = (key: NavItem["key"]): `dashboard.sidebar.${NavItem["key"]}` => {
    return `dashboard.sidebar.${key}`;
  };

  const pathname = usePathname();
  const { translate } = useAppLanguage();
  const reduceMotion = useReducedMotion();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async (): Promise<void> => {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    window.location.assign("/login");
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[90rem] gap-4 p-4 md:gap-5 md:p-6">
      <aside className="hidden w-72 shrink-0 rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--surface)]/70 p-4 shadow-[var(--shadow)] backdrop-blur-xl lg:flex lg:flex-col">
        <div className="mb-5 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface2)]/70 p-3">
          <p className="text-sm font-semibold text-[color:var(--text)]">{userEmail}</p>
          <p className="text-xs text-[color:var(--muted)]">{translate("common.appName")}</p>
        </div>

        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.href !== "#" && pathname === item.href;

            return (
              <Link
                key={item.key}
                href={item.href}
                className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                  isActive
                    ? "border border-[color:var(--accent)]/40 bg-[color:var(--accent)]/15 text-[color:var(--text)]"
                    : "text-[color:var(--muted)] hover:bg-[color:var(--surface2)] hover:text-[color:var(--text)]"
                }`}
              >
                <Icon className="h-4 w-4" />
                {translate(sidebarKey(item.key))}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto rounded-2xl border border-[color:var(--border)] bg-[linear-gradient(145deg,color-mix(in_srgb,var(--surface)_92%,transparent),color-mix(in_srgb,var(--surface2)_88%,transparent))] p-4">
          <p className="text-sm font-semibold text-[color:var(--text)]">
            {translate("dashboard.sidebar.plans")}
          </p>
          <p className="mt-1 text-xs text-[color:var(--muted)]">
            {translate("pricingPage.subtitle")}
          </p>
          <Link href="/pricing" className="mt-3 block">
            <Button className="w-full">{translate("common.actions.choosePlan")}</Button>
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <header className="sticky top-0 z-20 flex items-center gap-3 rounded-[1.2rem] border border-[color:var(--border)] bg-[color:var(--surface)]/80 p-3 shadow-[var(--shadow)] backdrop-blur-xl">
          <div className="hidden items-center gap-2 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface2)]/60 px-3 py-2 md:flex md:min-w-[16rem]">
            <Search className="h-4 w-4 text-[color:var(--muted)]" />
            <input
              type="search"
              placeholder="Buscar..."
              className="w-full bg-transparent text-sm text-[color:var(--text)] outline-none placeholder:text-[color:var(--muted)]"
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              className="rounded-lg border border-[color:var(--border)] p-2 text-[color:var(--muted)] transition hover:text-[color:var(--text)]"
            >
              <Bell className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="rounded-lg border border-[color:var(--border)] p-2 text-[color:var(--muted)] transition hover:text-[color:var(--text)]"
            >
              <MessageSquare className="h-4 w-4" />
            </button>
            <div className="relative">
              <motion.button
                type="button"
                whileHover={reduceMotion ? undefined : { y: -1 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                onClick={() => setIsMenuOpen((previous) => !previous)}
                className="flex items-center gap-2 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface2)]/70 px-3 py-2 text-sm font-semibold text-[color:var(--text)]"
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[color:var(--accent)]/25 text-xs">
                  <User className="h-4 w-4" />
                </span>
                <span className="hidden sm:inline">{userEmail}</span>
                <ChevronDown className="h-4 w-4 text-[color:var(--muted)]" />
              </motion.button>
              {isMenuOpen ? (
                <div className="absolute right-0 z-20 mt-2 w-48 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-2 shadow-[var(--shadow)]">
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-[color:var(--text)] transition hover:bg-[color:var(--surface2)]"
                  >
                    <User className="h-4 w-4" />
                    {translate("dashboard.profile.profile")}
                  </button>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-[color:var(--text)] transition hover:bg-[color:var(--surface2)]"
                  >
                    <Settings className="h-4 w-4" />
                    {translate("dashboard.profile.settings")}
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
                  >
                    <LogOut className="h-4 w-4" />
                    {translate("dashboard.profile.logout")}
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </header>

        <section className="min-h-0 flex-1">{children}</section>
      </div>
    </div>
  );
};

export default AppShell;
