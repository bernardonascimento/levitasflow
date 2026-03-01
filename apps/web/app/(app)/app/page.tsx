import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@web/lib/supabase/server";
import { getUserMinistries, linkMemberIfNeeded } from "@web/lib/ministry/queries";
import AppDashboardContent from "@web/presentation/components/app/AppDashboardContent";

type PageProps = { searchParams: Promise<{ new?: string }> };

const AppDashboardPage = async ({ searchParams }: PageProps): Promise<JSX.Element> => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const ministries = await getUserMinistries(supabase, user.id);
  const params = await searchParams;
  const showCreateNew = params?.new === "1";

  let serverSummary: { teams: number; members: number; activeRoles: number; pendingInvites: number } | null = null;

  if (ministries.length > 0 && !showCreateNew) {
    await linkMemberIfNeeded(
      supabase,
      user.id,
      user.email?.toLowerCase() ?? "",
      ministries.map((m) => m.id)
    );

    const selectedMinistry = ministries[0];

    const [{ count: teamsCount }, { count: membersCount }, { count: rolesCount }, { data: teams }] =
      await Promise.all([
        supabase
          .from("teams")
          .select("id", { count: "exact", head: true })
          .eq("ministry_id", selectedMinistry.id),
        supabase
          .from("members")
          .select("id", { count: "exact", head: true })
          .eq("ministry_id", selectedMinistry.id),
        supabase
          .from("roles")
          .select("id", { count: "exact", head: true })
          .eq("ministry_id", selectedMinistry.id),
        supabase.from("teams").select("id").eq("ministry_id", selectedMinistry.id)
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

    serverSummary = {
      teams: teamsCount ?? 0,
      members: membersCount ?? 0,
      activeRoles: rolesCount ?? 0,
      pendingInvites: pendingInvitesCount
    };
  }

  return (
    <AppDashboardContent
      showCreateNew={showCreateNew}
      serverSummary={serverSummary}
    />
  );
};

export default AppDashboardPage;
