import { getNextSunday } from "@shared/utils/getNextSunday";
import type { DashboardCard } from "@web/domain/entities/dashboard";
import { listDashboardCards } from "@web/infra/services/dashboardService";

export type DashboardSummary = {
  cards: DashboardCard[];
  nextWeeklyReviewDate: string;
};

export const getDashboardSummary = async (): Promise<DashboardSummary> => {
  const cards = await listDashboardCards();
  const nextWeeklyReviewDate = getNextSunday().toLocaleDateString("pt-BR");

  return {
    cards,
    nextWeeklyReviewDate
  };
};
