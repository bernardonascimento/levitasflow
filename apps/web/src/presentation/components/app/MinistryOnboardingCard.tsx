"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import Button from "@web/presentation/components/Button";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";
import { createSupabaseBrowserClient } from "@web/lib/supabase/browser";

const slugify = (value: string): string => {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

const MinistryOnboardingCard = (): JSX.Element => {
  const router = useRouter();
  const { translate } = useAppLanguage();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateMinistry = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      return;
    }

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

    router.push("/app");
    router.refresh();
  };

  return (
    <div className="mx-auto w-full max-w-xl rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--surface)]/80 p-6 shadow-[var(--shadow)] md:p-8">
      <h1 className="text-3xl font-black tracking-tight text-[color:var(--text)]">
        {translate("dashboard.onboarding.title")}
      </h1>
      <p className="mt-2 text-sm text-[color:var(--muted)]">
        {translate("dashboard.onboarding.subtitle")}
      </p>
      <form className="mt-6 space-y-4" onSubmit={handleCreateMinistry}>
        <label className="block space-y-1.5">
          <span className="text-sm font-semibold text-[color:var(--text)]">
            {translate("dashboard.onboarding.nameLabel")}
          </span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            minLength={3}
            placeholder={translate("dashboard.onboarding.namePlaceholder")}
            className="h-11 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface2)]/80 px-3 text-sm text-[color:var(--text)] outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--ring)]"
          />
        </label>
        <Button type="submit" disabled={isLoading} className="h-11 w-full">
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
    </div>
  );
};

export default MinistryOnboardingCard;
