import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../types/database";

const getEnvVar = (name: string): string | undefined => {
  const runtime = globalThis as typeof globalThis & {
    process?: { env?: Record<string, string | undefined> };
  };

  return runtime.process?.env?.[name];
};

const getPublicEnv = (): { url: string; anonKey: string } => {
  const url = getEnvVar("NEXT_PUBLIC_SUPABASE_URL");
  const anonKey = getEnvVar("NEXT_PUBLIC_SUPABASE_ANON_KEY");

  if (!url || !anonKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }

  return { url, anonKey };
};

export const createSupabaseBrowserClient = (): SupabaseClient<Database> => {
  const { url, anonKey } = getPublicEnv();

  return createClient<Database>(url, anonKey);
};
