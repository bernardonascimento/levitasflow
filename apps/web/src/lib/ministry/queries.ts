import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@repo/supabase";

export type MinistrySummary = {
  id: string;
  name: string;
  slug: string;
};

export const getUserMinistries = async (
  supabase: SupabaseClient<Database>,
  userId: string
): Promise<MinistrySummary[]> => {
  const { data: ministryLinks } = await supabase
    .from("ministry_users")
    .select("ministry_id")
    .eq("user_id", userId);

  const ministryIds = (ministryLinks ?? []).map((row) => row.ministry_id);
  if (ministryIds.length === 0) {
    return [];
  }

  const { data: ministries } = await supabase
    .from("ministries")
    .select("id,name,slug")
    .in("id", ministryIds)
    .order("created_at", { ascending: true });

  return (ministries ?? []) as MinistrySummary[];
};

export const linkMemberIfNeeded = async (
  supabase: SupabaseClient<Database>,
  userId: string,
  userEmail: string,
  ministryIds: string[]
): Promise<void> => {
  if (ministryIds.length === 0) {
    return;
  }

  await supabase
    .from("members")
    .update({ linked_user_id: userId })
    .eq("email", userEmail)
    .is("linked_user_id", null)
    .in("ministry_id", ministryIds);
};
