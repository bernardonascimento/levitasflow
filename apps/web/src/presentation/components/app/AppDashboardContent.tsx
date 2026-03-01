"use client";

import { useMinistries } from "@web/presentation/providers/MinistryProvider";
import WelcomeDashboard from "@web/presentation/components/app/WelcomeDashboard";
import DashboardContent from "@web/presentation/components/dashboard/DashboardContent";
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
    <DashboardContent
      defaultMinistryId={ministryId}
      initialSummary={serverSummary ?? EMPTY_SUMMARY}
    />
  );
};

export default AppDashboardContent;
