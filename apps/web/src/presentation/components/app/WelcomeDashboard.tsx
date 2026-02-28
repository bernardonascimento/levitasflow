"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, LoaderCircle, UserPlus, Users } from "lucide-react";
import Button from "@web/presentation/components/Button";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";
import { createSupabaseBrowserClient } from "@web/lib/supabase/browser";
import { motion } from "framer-motion";

const slugify = (value: string): string =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const WelcomeDashboard = (): JSX.Element => {
  const router = useRouter();
  const { translate } = useAppLanguage();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateMinistry = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return;

    setIsLoading(true);
    setError(null);
    const supabase = createSupabaseBrowserClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.assign("/login");
      return;
    }

    const baseSlug = slugify(trimmedName);
    let createdMinistryId: string | null = null;

    for (let attempt = 0; attempt < 5; attempt += 1) {
      const candidateSlug =
        attempt === 0 ? baseSlug : `${baseSlug}-${Math.floor(Math.random() * 9999)}`;
      const { data: ministryData, error: ministryError } = await supabase
        .from("ministries")
        .insert({ name: trimmedName, slug: candidateSlug, owner_user_id: user.id })
        .select("id")
        .single();

      if (!ministryError && ministryData?.id) {
        createdMinistryId = ministryData.id;
        break;
      }
    }

    if (!createdMinistryId) {
      setError(translate("auth.genericError"));
      setIsLoading(false);
      return;
    }

    const { error: ministryUserError } = await supabase
      .from("ministry_users")
      .insert({ ministry_id: createdMinistryId, user_id: user.id, role: "owner" });

    if (ministryUserError) {
      setError(translate("auth.genericError"));
      setIsLoading(false);
      return;
    }

    router.push(`/app?ministry=${encodeURIComponent(createdMinistryId)}`);
    router.refresh();
  };

  const nextSteps = [
    {
      key: "team" as const,
      icon: Users,
      titleKey: "dashboard.welcome.nextSteps.team" as const,
      descKey: "dashboard.welcome.nextSteps.teamDesc" as const
    },
    {
      key: "members" as const,
      icon: UserPlus,
      titleKey: "dashboard.welcome.nextSteps.members" as const,
      descKey: "dashboard.welcome.nextSteps.membersDesc" as const
    },
    {
      key: "firstSchedule" as const,
      icon: CalendarDays,
      titleKey: "dashboard.welcome.nextSteps.firstSchedule" as const,
      descKey: "dashboard.welcome.nextSteps.firstScheduleDesc" as const
    }
  ];

  return (
    <motion.div
      className="space-y-8 pb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.28 }}
    >
      <section className="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--surface)]/80 p-6 shadow-[var(--shadow)] md:p-8">
        <h1 className="text-3xl font-black tracking-tight text-[color:var(--text)] md:text-4xl">
          {translate("dashboard.welcome.heroTitle")}
        </h1>
        <p className="mt-2 text-[color:var(--muted)]">
          {translate("dashboard.welcome.heroSubtitle")}
        </p>

        <form className="mt-6 max-w-md space-y-4" onSubmit={handleCreateMinistry}>
          <label className="block space-y-1.5">
            <span className="text-sm font-semibold text-[color:var(--text)]">
              {translate("dashboard.onboarding.nameLabel")}
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={3}
              placeholder={translate("dashboard.onboarding.namePlaceholder")}
              className="h-11 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface2)]/80 px-3 text-sm text-[color:var(--text)] outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--ring)]"
            />
          </label>
          <Button type="submit" disabled={isLoading} className="h-11 min-w-[10rem]">
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <LoaderCircle className="h-4 w-4 animate-spin" />
                {translate("dashboard.onboarding.submit")}
              </span>
            ) : (
              translate("dashboard.onboarding.submit")
            )}
          </Button>
        </form>

        <p className="mt-4 text-xs text-[color:var(--muted)]">
          {translate("dashboard.onboarding.helper")}
        </p>

        {error ? (
          <p className="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
            {error}
          </p>
        ) : null}
      </section>

      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.1em] text-[color:var(--muted)]">
          Próximos passos
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {nextSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.key}
                className="rounded-[1.2rem] border border-[color:var(--border)] bg-[color:var(--surface)]/75 p-4 opacity-75 shadow-[var(--shadow)] transition hover:translate-y-[-2px] hover:opacity-100 hover:shadow-[0_0_0_1px_rgba(255,90,31,0.08)]"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[color:var(--surface2)] text-[color:var(--muted)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-[color:var(--text)]">
                      {translate(step.titleKey)}
                    </p>
                    <p className="text-xs text-[color:var(--muted)]">{translate(step.descKey)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </motion.div>
  );
};

export default WelcomeDashboard;
