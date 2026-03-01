"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, Plus } from "lucide-react";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";
import type { UserAvatarUser } from "@web/presentation/components/app/UserAvatar";

export type MinistryOption = {
  id: string;
  name: string;
  slug: string;
};

function getFirstName(user: UserAvatarUser | null): string {
  if (!user) return "";
  const full = user.user_metadata?.full_name ?? user.user_metadata?.name;
  if (typeof full === "string" && full.trim()) {
    const first = full.trim().split(/\s+/)[0];
    return first ?? "";
  }
  if (user.email) {
    return user.email.split("@")[0] ?? "";
  }
  return "";
}

type WorkspaceSwitcherProps = {
  user: UserAvatarUser | null;
  ministries: MinistryOption[];
};

const WorkspaceSwitcher = ({ user, ministries }: WorkspaceSwitcherProps): JSX.Element => {
  const { translate } = useAppLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedId = searchParams?.get("ministry") ?? ministries[0]?.id ?? null;
  const selected = ministries.find((m) => m.id === selectedId) ?? ministries[0] ?? null;
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const firstName = getFirstName(user);
  const welcomeText =
    firstName.length > 0
      ? translate("dashboard.workspace.welcomeWithName").replace("{name}", firstName)
      : translate("dashboard.workspace.welcome");

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const setMinistry = (id: string): void => {
    setIsOpen(false);
    router.push(`/app?ministry=${encodeURIComponent(id)}`);
  };

  if (ministries.length === 0) {
    return (
      <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--surface2)]/70 p-3">
        <p className="text-sm font-semibold text-[color:var(--text)]">{welcomeText}</p>
        <Link
          href="/app"
          className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-[color:var(--accent)] transition hover:underline"
        >
          <Plus className="h-3.5 w-3.5" />
          {translate("dashboard.workspace.createNow")}
        </Link>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <p className="mb-2 text-xs font-semibold text-[color:var(--muted)]">{welcomeText}</p>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-2 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface2)]/70 px-3 py-2.5 text-left text-sm font-semibold text-[color:var(--text)] transition hover:bg-[color:var(--surface2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="min-w-0 truncate">
          {selected?.name ?? translate("dashboard.workspace.noMinistry")}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-[color:var(--muted)] transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen ? (
        <ul
          role="listbox"
          className="absolute left-0 right-0 z-20 mt-1 max-h-56 overflow-auto rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] py-1 shadow-[var(--shadow)]"
        >
          {ministries.map((m) => (
            <li key={m.id}>
              <button
                type="button"
                role="option"
                aria-selected={m.id === selectedId}
                onClick={() => setMinistry(m.id)}
                className={`w-full px-3 py-2 text-left text-sm font-medium transition ${
                  m.id === selectedId
                    ? "bg-[color:var(--accent)]/15 text-[color:var(--accent)]"
                    : "text-[color:var(--text)] hover:bg-[color:var(--surface2)]"
                }`}
              >
                {m.name}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default WorkspaceSwitcher;
