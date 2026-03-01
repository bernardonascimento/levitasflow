"use client";

import { useMinistries } from "@web/presentation/providers/MinistryProvider";
import DashboardPageClient from "@web/presentation/components/app/DashboardPageClient";
import WelcomeDashboard from "@web/presentation/components/app/WelcomeDashboard";
import type { DashboardSummary } from "@web/lib/ministry/actions";

const EMPTY_SUMMARY: DashboardSummary = {
  teams: 0,
  members: 0,
  activeRoles: 0,
  pendingInvites: 0
};

type AppDashboardContentProps = {
  showCreateNew: boolean;
  serverSummary: DashboardSummary | null;
};

const AppDashboardContent = ({
  showCreateNew,
  serverSummary
}: AppDashboardContentProps): JSX.Element => {
  const { ministries, selectedMinistryId } = useMinistries();

  if (showCreateNew || ministries.length === 0) {
    return <WelcomeDashboard />;
  }

  const ministryId = selectedMinistryId ?? ministries[0]?.id;
  if (!ministryId) {
    return <WelcomeDashboard />;
  }

  return (
    <DashboardPageClient
      defaultMinistryId={ministryId}
      initialSummary={serverSummary ?? EMPTY_SUMMARY}
    />
  );
};

export default AppDashboardContent;
