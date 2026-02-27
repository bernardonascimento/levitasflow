import type { DashboardCard } from "@web/domain/entities/dashboard";

export const listDashboardCards = async (): Promise<DashboardCard[]> => {
  return Promise.resolve([
    { id: "users", title: "Usuários ativos", value: "128" },
    { id: "mrr", title: "MRR estimado", value: "R$ 8.450" },
    { id: "churn", title: "Churn mensal", value: "2.1%" }
  ]);
};
