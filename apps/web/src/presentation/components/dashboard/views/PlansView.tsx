"use client";

import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";

const PlansView = (): JSX.Element => {
  const { translate } = useAppLanguage();
  return (
    <div className="space-y-6 pb-8">
      <h1 className="text-2xl font-black tracking-tight text-[color:var(--text)] md:text-3xl">
        {translate("dashboard.sidebar.plans")}
      </h1>
    </div>
  );
};

export default PlansView;
