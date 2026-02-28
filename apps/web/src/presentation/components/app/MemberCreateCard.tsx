"use client";

import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import Button from "@web/presentation/components/Button";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";
import { createSupabaseBrowserClient } from "@web/lib/supabase/browser";

type MemberCreateCardProps = {
  ministryId: string;
};

const MemberCreateCard = ({ ministryId }: MemberCreateCardProps): JSX.Element => {
  const { translate } = useAppLanguage();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [rolesInput, setRolesInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleCreateMember = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setIsSaving(true);
    setStatusMessage(null);

    const normalizedEmail = email.trim().toLowerCase();
    const supabase = createSupabaseBrowserClient();
    const normalizedName = name.trim();
    const normalizedAvatar = avatarUrl.trim();
    const roles = Array.from(
      new Set(
        rolesInput
          .split(",")
          .map((value) => value.trim())
          .filter(Boolean)
      )
    );

    const { data: member, error: memberError } = await supabase
      .from("members")
      .upsert(
        {
          ministry_id: ministryId,
          email: normalizedEmail,
          name: normalizedName || null,
          avatar_url: normalizedAvatar || null
        },
        { onConflict: "ministry_id,email" }
      )
      .select("id")
      .single();

    if (memberError || !member?.id) {
      setStatusMessage(translate("auth.genericError"));
      setIsSaving(false);
      return;
    }

    if (roles.length > 0) {
      const { data: roleRows } = await supabase
        .from("roles")
        .upsert(
          roles.map((role) => ({ ministry_id: ministryId, name: role })),
          { onConflict: "ministry_id,name" }
        )
        .select("id,name");

      const roleIds = (roleRows ?? []).map((roleRow) => roleRow.id);
      if (roleIds.length > 0) {
        await supabase.from("member_roles").upsert(
          roleIds.map((roleId) => ({ member_id: member.id, role_id: roleId })),
          {
            onConflict: "member_id,role_id"
          }
        );
      }
    }

    setEmail("");
    setName("");
    setAvatarUrl("");
    setRolesInput("");
    setStatusMessage("Membro salvo com sucesso.");
    setIsSaving(false);
  };

  return (
    <section className="rounded-[1.2rem] border border-[color:var(--border)] bg-[color:var(--surface)]/75 p-5 shadow-[var(--shadow)]">
      <h2 className="text-lg font-bold text-[color:var(--text)]">Cadastrar membro</h2>
      <p className="mt-1 text-sm text-[color:var(--muted)]">
        Cadastre por e-mail, com foto (URL) e funções separadas por vírgula.
      </p>
      <form className="mt-4 grid gap-3 md:grid-cols-2" onSubmit={handleCreateMember}>
        <input
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={translate("auth.emailPlaceholder")}
          className="h-10 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface2)]/80 px-3 text-sm text-[color:var(--text)] outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--ring)]"
        />
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Nome"
          className="h-10 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface2)]/80 px-3 text-sm text-[color:var(--text)] outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--ring)]"
        />
        <input
          type="url"
          value={avatarUrl}
          onChange={(event) => setAvatarUrl(event.target.value)}
          placeholder="https://..."
          className="h-10 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface2)]/80 px-3 text-sm text-[color:var(--text)] outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--ring)]"
        />
        <input
          type="text"
          value={rolesInput}
          onChange={(event) => setRolesInput(event.target.value)}
          placeholder="Vocal, Guitarra, Teclado"
          className="h-10 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface2)]/80 px-3 text-sm text-[color:var(--text)] outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--ring)]"
        />
        <div className="md:col-span-2">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? (
              <span className="inline-flex items-center gap-2">
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Salvando...
              </span>
            ) : (
              "Salvar membro"
            )}
          </Button>
        </div>
      </form>
      {statusMessage ? (
        <p className="mt-3 text-sm text-[color:var(--muted)]">{statusMessage}</p>
      ) : null}
    </section>
  );
};

export default MemberCreateCard;
