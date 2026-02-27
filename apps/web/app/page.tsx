import { getDashboardSummary } from "@web/application/useCases/getDashboardSummary";
import DashboardOverview from "@web/presentation/components/DashboardOverview";

const HomePage = async (): Promise<JSX.Element> => {
  const summary = await getDashboardSummary();

  return <DashboardOverview summary={summary} />;
};

export default HomePage;
