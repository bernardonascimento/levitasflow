import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import AppShell from "@web/presentation/components/app/AppShell";
import { createSupabaseServerClient } from "@web/lib/supabase/server";

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

  return <AppShell userEmail={user.email ?? "user@levitasflow.app"}>{children}</AppShell>;
};

export default AppLayout;
