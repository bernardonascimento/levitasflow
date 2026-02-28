import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@repo/supabase";
import { getSupabasePublicEnv } from "@web/lib/supabase/env";

let browserClient: SupabaseClient<Database> | null = null;

export const createSupabaseBrowserClient = (): SupabaseClient<Database> => {
  if (browserClient) {
    return browserClient;
  }

  const { url, anonKey } = getSupabasePublicEnv();
  browserClient = createBrowserClient<Database>(url, anonKey);
  return browserClient;
};
