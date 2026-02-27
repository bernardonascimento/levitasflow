import { useMemo, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import Button from "@mobile/presentation/components/Button";
import Card from "@mobile/presentation/components/Card";
import ThemeToggle from "@mobile/presentation/components/ThemeToggle";
import LanguageSelector from "@mobile/presentation/components/LanguageSelector";
import { useAppLanguage } from "@mobile/presentation/providers/LanguageProvider";
import { useAppTheme } from "@mobile/presentation/providers/ThemeProvider";
import { themeTokens } from "@shared/index";

const OnboardingScreen = (): JSX.Element => {
  const [step, setStep] = useState(1);
  const { translate } = useAppLanguage();
  const { theme } = useAppTheme();

  const screenClassName = theme === "light" ? "bg-slate-50" : "bg-slate-950";
  const titleClassName = theme === "light" ? "text-slate-900" : "text-slate-100";
  const textClassName = theme === "light" ? "text-slate-600" : "text-slate-300";

  const featureCards = useMemo<string[]>(
    () => [
      translate("onboarding.step3.card1"),
      translate("onboarding.step3.card2"),
      translate("onboarding.step3.card3")
    ],
    [translate]
  );

  const progress = useMemo<number>(() => step / 3, [step]);

  return (
    <SafeAreaView className={`flex-1 ${screenClassName}`}>
      <View className="flex-1 px-6 pb-6 pt-4">
        <View className="mb-8 flex-row items-center justify-between">
          <Text className={`text-3xl font-extrabold ${titleClassName}`}>
            {translate("common.appName")}
          </Text>
          <View className="flex-row items-center gap-2">
            <ThemeToggle />
            <LanguageSelector />
          </View>
        </View>

        <View className="mb-6">
          <View className="mb-2 flex-row items-center justify-between">
            <Text className={`text-xs font-semibold uppercase tracking-widest ${textClassName}`}>
              Onboarding
            </Text>
            <Text className={`text-xs font-semibold ${textClassName}`}>{step}/3</Text>
          </View>
          <View className="h-2 rounded-full bg-slate-200 dark:bg-slate-800">
            <View
              className="h-2 rounded-full bg-orange-500"
              style={{ width: `${progress * 100}%` }}
            />
          </View>
        </View>

        <View className="flex-1 justify-between">
          <View className="gap-4">
            {step === 1 ? (
              <>
                <Text className={`text-[44px] font-black leading-[48px] ${titleClassName}`}>
                  {translate("onboarding.step1.title")}
                </Text>
                <Card className="gap-3">
                  <Text className={`text-lg leading-7 ${textClassName}`}>
                    • {translate("onboarding.step1.bullet1")}
                  </Text>
                  <Text className={`text-lg leading-7 ${textClassName}`}>
                    • {translate("onboarding.step1.bullet2")}
                  </Text>
                </Card>
              </>
            ) : null}

            {step === 2 ? (
              <>
                <Text className={`text-[40px] font-black leading-[46px] ${titleClassName}`}>
                  {translate("onboarding.step2.title")}
                </Text>
                <Card className="gap-3">
                  <Text className={`text-lg leading-7 ${textClassName}`}>
                    • {translate("onboarding.step2.bullet1")}
                  </Text>
                  <Text className={`text-lg leading-7 ${textClassName}`}>
                    • {translate("onboarding.step2.bullet2")}
                  </Text>
                </Card>
                <View
                  className="rounded-2xl p-4"
                  style={{
                    backgroundColor: themeTokens.colors.accent[50],
                    borderColor: themeTokens.colors.accent[200],
                    borderWidth: 1
                  }}
                >
                  <Text
                    style={{ color: themeTokens.colors.accent[700] }}
                    className="text-base font-semibold leading-6"
                  >
                    {translate("onboarding.step2.highlight")}
                  </Text>
                </View>
              </>
            ) : null}

            {step === 3 ? (
              <>
                <Text className={`text-[40px] font-black leading-[46px] ${titleClassName}`}>
                  {translate("onboarding.step3.title")}
                </Text>
                <View className="gap-3">
                  {featureCards.map((item) => (
                    <Card key={item}>
                      <Text className={`text-base font-semibold leading-6 ${titleClassName}`}>
                        {item}
                      </Text>
                    </Card>
                  ))}
                </View>
              </>
            ) : null}
          </View>

          <View className="mt-6 rounded-3xl dark:border-slate-800 dark:bg-slate-900">
            {step < 3 ? (
              <Button
                label={translate("common.actions.continue")}
                onPress={() => setStep((currentStep) => currentStep + 1)}
                className="w-full"
              />
            ) : (
              <Button
                label={translate("common.actions.getStarted")}
                onPress={() => undefined}
                className="w-full"
              />
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
