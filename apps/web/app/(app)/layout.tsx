import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import AppShell from "@web/presentation/components/app/AppShell";
import { createSupabaseServerClient } from "@web/lib/supabase/server";
import { getUserMinistries } from "@web/lib/ministry/queries";

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout = async ({ children }: AppLayoutProps): Promise<JSX.Element> => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const ministries = await getUserMinistries(supabase, user.id);

  const appUser = {
    id: user.id,
    email: user.email ?? null,
    user_metadata: user.user_metadata ?? null
  };

  return (
    <AppShell user={appUser} ministries={ministries}>
      {children}
    </AppShell>
  );
};

export default AppLayout;
