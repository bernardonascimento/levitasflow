import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@web/lib/supabase/server";

type AuthCallbackPageProps = {
  searchParams: {
    code?: string;
    next?: string;
  };
};

const AuthCallbackPage = async ({ searchParams }: AuthCallbackPageProps): Promise<never> => {
  const next = searchParams.next ?? "/app";
  const supabase = await createSupabaseServerClient();

  if (searchParams.code) {
    await supabase.auth.exchangeCodeForSession(searchParams.code);
  }

  await supabase.auth.getSession();
  redirect(next);
};

export default AuthCallbackPage;
