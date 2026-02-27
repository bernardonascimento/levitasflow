"use client";

import { useMemo, useState } from "react";
import Button from "@web/presentation/components/Button";
import Card from "@web/presentation/components/Card";
import Section from "@web/presentation/components/Section";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";

const FeaturesSection = (): JSX.Element => {
  const { translate } = useAppLanguage();
  const [showAll, setShowAll] = useState(false);

  const featureList = useMemo<string[]>(
    () => [
      translate("landing.features.scales"),
      translate("landing.features.agenda"),
      translate("landing.features.unavailability"),
      translate("landing.features.repertoire"),
      translate("landing.features.membersRoles"),
      translate("landing.features.aiSuggestions"),
      translate("landing.features.groupControl"),
      translate("landing.features.ministryNotices"),
      translate("landing.features.ministryRoadmap")
    ],
    [translate]
  );

  const visibleFeatures = showAll ? featureList : featureList.slice(0, 6);

  return (
    <Section id="features" title={translate("landing.features.title")}>
      <div className="grid gap-4 md:grid-cols-3">
        {visibleFeatures.map((featureName) => (
          <Card key={featureName} className="min-h-28">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {featureName}
            </p>
          </Card>
        ))}
      </div>
      <div className="mt-6">
        <Button variant="ghost" onClick={() => setShowAll((currentValue) => !currentValue)}>
          {showAll ? translate("common.actions.seeLess") : translate("common.actions.seeMore")}
        </Button>
      </div>
    </Section>
  );
};

export default FeaturesSection;
