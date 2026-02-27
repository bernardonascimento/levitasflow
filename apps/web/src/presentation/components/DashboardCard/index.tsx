import type { DashboardCardProps } from "@web/presentation/components/DashboardCard/types";

const DashboardCard = ({ title, value }: DashboardCardProps): JSX.Element => {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-sm text-slate-500">{title}</h2>
      <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
    </article>
  );
};

export default DashboardCard;
