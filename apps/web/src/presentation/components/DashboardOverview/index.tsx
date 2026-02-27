import DashboardCard from "@web/presentation/components/DashboardCard";
import type { DashboardOverviewProps } from "@web/presentation/components/DashboardOverview/types";

const DashboardOverview = ({ summary }: DashboardOverviewProps): JSX.Element => {
  return (
    <main className="mx-auto min-h-screen max-w-5xl p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="mt-2 text-slate-600">
          Próxima revisão semanal sugerida: <strong>{summary.nextWeeklyReviewDate}</strong>
        </p>
      </header>
      <section className="grid gap-4 md:grid-cols-3">
        {summary.cards.map((card) => (
          <DashboardCard key={card.id} title={card.title} value={card.value} />
        ))}
      </section>
    </main>
  );
};

export default DashboardOverview;
