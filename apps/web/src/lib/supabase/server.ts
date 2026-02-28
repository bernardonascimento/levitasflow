import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@repo/supabase";
import { cookies } from "next/headers";
import { getSupabasePublicEnv } from "@web/lib/supabase/env";

export const createSupabaseServerClient = async (): Promise<SupabaseClient<Database>> => {
  const cookieStore = await cookies();
  const { url, anonKey } = getSupabasePublicEnv();

  return createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // setAll can be called from server components where cookies are read-only.
        }
      }
    }
  });
};
