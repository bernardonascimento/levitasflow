"use client";

import DashboardHeroCard from "@web/presentation/components/dashboard/overview/DashboardHeroCard";
import LeaderAlertCard from "@web/presentation/components/dashboard/overview/LeaderAlertCard";
import UpcomingEvents from "@web/presentation/components/dashboard/overview/UpcomingEvents";
import ParticipationPanel from "@web/presentation/components/dashboard/overview/ParticipationPanel";
import MinistryHealth from "@web/presentation/components/dashboard/overview/MinistryHealth";
import RecentNotices from "@web/presentation/components/dashboard/overview/RecentNotices";
import type { MinistryOption } from "@web/presentation/providers/MinistryProvider";
import type { DashboardSummary } from "@web/lib/ministry/actions";

type OverviewDashboardProps = {
  ministry: MinistryOption;
  summary: DashboardSummary;
};

/** Mock: escalas este mês (quando tiver dados reais, vir do summary ou API). */
const MOCK_SCALES_THIS_MONTH = 8;

/** Próximo evento em N dias (mock; quando tiver eventos reais, calcular do primeiro evento). */
const MOCK_NEXT_EVENT_DAYS = 3;

const OverviewDashboard = ({ ministry, summary }: OverviewDashboardProps): JSX.Element => {
  return (
    <div className="space-y-6 pb-8">
      <DashboardHeroCard
        ministry={ministry}
        summary={summary}
        scalesThisMonth={MOCK_SCALES_THIS_MONTH}
        pendingConfirmations={summary.pendingInvites}
        nextEventDays={MOCK_NEXT_EVENT_DAYS}
        onCreateScale={() => {
          console.log("[Overview] Criar escala");
        }}
      />

      <LeaderAlertCard />

      <UpcomingEvents />

      <ParticipationPanel />

      <MinistryHealth />

      <RecentNotices />
    </div>
  );
};

export default OverviewDashboard;
