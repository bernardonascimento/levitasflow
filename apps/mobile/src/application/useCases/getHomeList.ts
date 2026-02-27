import { getNextSunday } from "@shared/utils/getNextSunday";
import type { HomeItem } from "@mobile/domain/entities/homeItem";
import { listHomeItems } from "@mobile/infra/services/homeListService";

export type HomeListResult = {
  items: HomeItem[];
  nextReviewDate: string;
};

export const getHomeList = async (): Promise<HomeListResult> => {
  const items = await listHomeItems();
  const nextReviewDate = getNextSunday().toLocaleDateString("pt-BR");

  return { items, nextReviewDate };
};
