import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@web/lib/supabase/server";
import { getUserMinistries } from "@web/lib/ministry/queries";
import WelcomeDashboard from "@web/presentation/components/app/WelcomeDashboard";

const AppOnboardingPage = async (): Promise<JSX.Element> => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const ministries = await getUserMinistries(supabase, user.id);

  if (ministries.length > 0) {
    redirect("/app");
  }

  return <WelcomeDashboard />;
};

export default AppOnboardingPage;
