import type { HomeItem } from "@mobile/domain/entities/homeItem";

export const listHomeItems = async (): Promise<HomeItem[]> => {
  return Promise.resolve([
    {
      id: "onboarding",
      title: "Onboarding",
      description: "Finalize etapas iniciais do tenant."
    },
    {
      id: "payments",
      title: "Pagamentos",
      description: "Conectar gateway para liberar assinaturas."
    },
    {
      id: "reports",
      title: "Relatórios",
      description: "Validar métricas semanais do MVP."
    }
  ]);
};
