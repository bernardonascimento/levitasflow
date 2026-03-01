"use server";

import { createSupabaseServerClient } from "@web/lib/supabase/server";
import { getUserMinistries } from "@web/lib/ministry/queries";

export type DashboardSummary = {
  teams: number;
  members: number;
  activeRoles: number;
  pendingInvites: number;
};

export async function getDashboardSummaryAction(
  ministryId: string
): Promise<DashboardSummary> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    return { teams: 0, members: 0, activeRoles: 0, pendingInvites: 0 };
  }

  const [{ count: teamsCount }, { count: membersCount }, { count: rolesCount }, { data: teams }] =
    await Promise.all([
      supabase
        .from("teams")
        .select("id", { count: "exact", head: true })
        .eq("ministry_id", ministryId),
      supabase
        .from("members")
        .select("id", { count: "exact", head: true })
        .eq("ministry_id", ministryId),
      supabase
        .from("roles")
        .select("id", { count: "exact", head: true })
        .eq("ministry_id", ministryId),
      supabase.from("teams").select("id").eq("ministry_id", ministryId)
    ]);

  let pendingInvitesCount = 0;
  const teamIds = (teams ?? []).map((t: { id: string }) => t.id);
  if (teamIds.length > 0) {
    const { count } = await supabase
      .from("team_members")
      .select("team_id", { count: "exact", head: true })
      .in("team_id", teamIds)
      .eq("status", "invited");
    pendingInvitesCount = count ?? 0;
  }

  return {
    teams: teamsCount ?? 0,
    members: membersCount ?? 0,
    activeRoles: rolesCount ?? 0,
    pendingInvites: pendingInvitesCount
  };
}

export type MinistryOption = { id: string; name: string; slug: string };

export async function getMinistriesForCurrentUserAction(): Promise<MinistryOption[]> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return [];
  return getUserMinistries(supabase, user.id);
}
