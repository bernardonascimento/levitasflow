"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown, LogOut, User } from "lucide-react";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";
import { createSupabaseBrowserClient } from "@web/lib/supabase/browser";
import { motion, useReducedMotion } from "framer-motion";

export type UserAvatarUser = {
  id: string;
  email: string | null;
  user_metadata?: {
    full_name?: string | null;
    name?: string | null;
    avatar_url?: string | null;
    picture?: string | null;
    photo_url?: string | null;
    [key: string]: unknown;
  } | null;
};

function getAvatarUrl(user: UserAvatarUser): string | null {
  const meta = user.user_metadata;
  if (!meta) return null;
  return meta.avatar_url ?? meta.picture ?? meta.photo_url ?? null;
}

function getInitials(user: UserAvatarUser): string {
  const fromMeta = user.user_metadata?.full_name ?? user.user_metadata?.name;
  const fromEmail = user.email ? user.email.split("@")[0] : null;
  const name = fromMeta ?? fromEmail ?? "?";
  const parts = String(name).trim().split(/\s+/);
  if (parts.length >= 2) {
    const first = parts[0]?.[0] ?? "";
    const last = parts[parts.length - 1]?.[0] ?? "";
    return (first + last).toUpperCase().slice(0, 2);
  }
  const first = parts[0];
  if (!first) return "?";
  return first.length >= 2 ? first.slice(0, 2).toUpperCase() : first.toUpperCase();
}

type UserAvatarProps = {
  user: UserAvatarUser;
};

const UserAvatar = ({ user }: UserAvatarProps): JSX.Element => {
  const { translate } = useAppLanguage();
  const reduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const avatarUrl = getAvatarUrl(user);
  const initials = getInitials(user);
  const displayLabel =
    user.user_metadata?.full_name ?? user.user_metadata?.name ?? user.email ?? "";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleLogout = async (): Promise<void> => {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    window.location.assign("/login");
  };

  return (
    <div ref={menuRef} className="relative">
      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={reduceMotion ? undefined : { y: -1 }}
        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        className="flex items-center gap-1.5 rounded-xl text-[color:var(--text)] transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)]"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span
          className="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full bg-[color:var(--accent)]/25 text-sm font-bold text-[color:var(--accent)]"
          aria-hidden
        >
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt=""
              width={36}
              height={36}
              className="object-cover"
              unoptimized
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center">{initials}</span>
          )}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-[color:var(--muted)] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </motion.button>

      {isOpen ? (
        <div
          className="absolute right-0 z-50 mt-2 w-48 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-2 shadow-[var(--shadow)] backdrop-blur-xl"
          role="menu"
        >
          <div className="border-b border-[color:var(--border)] px-2 py-2">
            <p className="truncate text-sm font-semibold text-[color:var(--text)]">
              {displayLabel || user.email}
            </p>
            {user.email ? (
              <p className="truncate text-xs text-[color:var(--muted)]">{user.email}</p>
            ) : null}
          </div>
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-[color:var(--text)] transition hover:bg-[color:var(--surface2)]"
            role="menuitem"
          >
            <User className="h-4 w-4 shrink-0 opacity-80" strokeWidth={2} />
            {translate("dashboard.profile.profile")}
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
            role="menuitem"
          >
            <LogOut className="h-4 w-4 shrink-0" strokeWidth={2} />
            {translate("dashboard.profile.logout")}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default UserAvatar;
