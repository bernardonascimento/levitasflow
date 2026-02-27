"use client";

import Button from "@web/presentation/components/Button";
import Card from "@web/presentation/components/Card";
import Section from "@web/presentation/components/Section";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";

const HeroSection = (): JSX.Element => {
  const { translate } = useAppLanguage();

  return (
    <Section className="pt-16">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 md:text-5xl">
            {translate("landing.hero.title")}
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 md:text-lg">
            {translate("landing.hero.subtitle")}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button>{translate("common.actions.createFreeAccount")}</Button>
            <a href="#features">
              <Button variant="secondary">{translate("common.actions.viewHowItWorks")}</Button>
            </a>
          </div>
        </div>

        <Card className="border-orange-100 bg-gradient-to-br from-orange-50 to-white dark:border-orange-950 dark:from-slate-900 dark:to-slate-900">
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-xl bg-white p-3 dark:bg-slate-800">
              <span className="text-sm font-semibold">
                {translate("landing.hero.preview.sunday")}
              </span>
              <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-900 dark:text-orange-200">
                {translate("landing.hero.preview.tasks")}
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800">
                <p className="text-xs text-slate-500 dark:text-slate-300">
                  {translate("landing.hero.preview.schedule")}
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {translate("landing.hero.preview.scheduleValue")}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800">
                <p className="text-xs text-slate-500 dark:text-slate-300">
                  {translate("landing.hero.preview.repertoire")}
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {translate("landing.hero.preview.repertoireValue")}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800">
                <p className="text-xs text-slate-500 dark:text-slate-300">
                  {translate("landing.hero.preview.notices")}
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {translate("landing.hero.preview.noticesValue")}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800">
                <p className="text-xs text-slate-500 dark:text-slate-300">
                  {translate("landing.hero.preview.confirmations")}
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {translate("landing.hero.preview.confirmationsValue")}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
};

export default HeroSection;
