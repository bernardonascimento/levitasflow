"use client";

import DashboardPageClient from "@web/presentation/components/app/DashboardPageClient";
import type { DashboardSummary } from "@web/lib/ministry/actions";

type OverviewViewProps = {
  defaultMinistryId: string;
  initialSummary: DashboardSummary;
};

const OverviewView = ({ defaultMinistryId, initialSummary }: OverviewViewProps): JSX.Element => {
  return (
    <DashboardPageClient
      defaultMinistryId={defaultMinistryId}
      initialSummary={initialSummary}
    />
  );
};

export default OverviewView;
