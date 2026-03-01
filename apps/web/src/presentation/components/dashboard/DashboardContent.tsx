"use client";

import { useDashboardView } from "@web/presentation/contexts/DashboardViewContext";
import type { DashboardSummary } from "@web/lib/ministry/actions";
import OverviewView from "@web/presentation/components/dashboard/views/OverviewView";
import CalendarView from "@web/presentation/components/dashboard/views/CalendarView";
import NoticesView from "@web/presentation/components/dashboard/views/NoticesView";
import RepertoireView from "@web/presentation/components/dashboard/views/RepertoireView";
import UnavailabilityView from "@web/presentation/components/dashboard/views/UnavailabilityView";
import TeamsView from "@web/presentation/components/dashboard/views/TeamsView";
import PlansView from "@web/presentation/components/dashboard/views/PlansView";

type DashboardContentProps = {
  defaultMinistryId: string;
  initialSummary: DashboardSummary;
};

const EMPTY_SUMMARY: DashboardSummary = {
  teams: 0,
  members: 0,
  activeRoles: 0,
  pendingInvites: 0
};

const DashboardContent = ({
  defaultMinistryId,
  initialSummary
}: DashboardContentProps): JSX.Element => {
  const { view } = useDashboardView();
  const summary = initialSummary ?? EMPTY_SUMMARY;

  switch (view) {
    case "overview":
      return (
        <OverviewView
          defaultMinistryId={defaultMinistryId}
          initialSummary={summary}
        />
      );
    case "calendar":
      return <CalendarView />;
    case "notices":
      return <NoticesView />;
    case "repertoire":
      return <RepertoireView />;
    case "unavailability":
      return <UnavailabilityView />;
    case "teams":
      return <TeamsView />;
    case "plans":
      return <PlansView />;
    default:
      return (
        <OverviewView
          defaultMinistryId={defaultMinistryId}
          initialSummary={summary}
        />
      );
  }
};

export default DashboardContent;
