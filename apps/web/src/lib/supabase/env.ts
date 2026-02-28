type SupabasePublicEnv = {
  url: string;
  anonKey: string;
};

export const getSupabasePublicEnv = (): SupabasePublicEnv => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }

  return { url, anonKey };
};

export const getSiteUrl = (): string => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (siteUrl && /^https?:\/\//.test(siteUrl)) {
    return siteUrl;
  }

  return "http://localhost:3000";
};
