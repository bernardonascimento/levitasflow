type SupabasePublicEnv = {
  url: string;
  anonKey: string;
};

const getEnvVar = (name: string): string | undefined => {
  const runtime = globalThis as typeof globalThis & {
    process?: { env?: Record<string, string | undefined> };
  };

  return runtime.process?.env?.[name];
};

export const getSupabasePublicEnv = (): SupabasePublicEnv => {
  const url = getEnvVar("NEXT_PUBLIC_SUPABASE_URL");
  const anonKey = getEnvVar("NEXT_PUBLIC_SUPABASE_ANON_KEY");

  if (!url || !anonKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }

  return { url, anonKey };
};

export const getSiteUrl = (): string => {
  const siteUrl = getEnvVar("NEXT_PUBLIC_SITE_URL");

  if (siteUrl && /^https?:\/\//.test(siteUrl)) {
    return siteUrl;
  }

  return "http://localhost:3000";
};
