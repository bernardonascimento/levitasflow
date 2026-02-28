import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@web/lib/supabase/server";
import { getUserMinistries } from "@web/lib/ministry/queries";
import MinistryOnboardingCard from "@web/presentation/components/app/MinistryOnboardingCard";

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

  return (
    <main className="flex min-h-[70vh] items-center justify-center p-2">
      <MinistryOnboardingCard />
    </main>
  );
};

export default AppOnboardingPage;
