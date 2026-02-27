import { useEffect, useMemo, useRef, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { MotiView } from "moti";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated";
import Button from "@mobile/presentation/components/Button";
import Card from "@mobile/presentation/components/Card";
import ThemeToggle from "@mobile/presentation/components/ThemeToggle";
import LanguageSelector from "@mobile/presentation/components/LanguageSelector";
import { useAppLanguage } from "@mobile/presentation/providers/LanguageProvider";
import { useAppTheme } from "@mobile/presentation/providers/ThemeProvider";
import { themeTokens } from "@shared/index";

const OnboardingScreen = (): JSX.Element => {
  const [step, setStep] = useState(1);
  const [leavingStep, setLeavingStep] = useState<number | null>(null);
  const { translate } = useAppLanguage();
  const { theme } = useAppTheme();
  const continueScale = useSharedValue(1);
  const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeDurationMs = 360;

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
  const continueAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: continueScale.value }]
  }));

  const clearFadeTimeout = (): void => {
    if (fadeTimeoutRef.current) {
      clearTimeout(fadeTimeoutRef.current);
      fadeTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      clearFadeTimeout();
    };
  }, []);

  const handleContinue = (): void => {
    setStep((currentStep) => {
      const nextStep = Math.min(currentStep + 1, 3);
      if (nextStep !== currentStep) {
        setLeavingStep(currentStep);
        clearFadeTimeout();
        fadeTimeoutRef.current = setTimeout(() => {
          setLeavingStep(null);
        }, fadeDurationMs);
      }

      return nextStep;
    });
  };

  const handlePressIn = (): void => {
    continueScale.value = withSpring(0.97, { damping: 14, stiffness: 230 });
  };

  const handlePressOut = (): void => {
    continueScale.value = withSpring(1, { damping: 12, stiffness: 220 });
  };

  const renderStepContent = (currentStep: number): JSX.Element | null => {
    if (currentStep === 1) {
      return (
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
      );
    }

    if (currentStep === 2) {
      return (
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
          <MotiView
            className="rounded-2xl p-4"
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "timing", duration: 280 }}
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
          </MotiView>
        </>
      );
    }

    if (currentStep === 3) {
      return (
        <>
          <Text className={`text-[40px] font-black leading-[46px] ${titleClassName}`}>
            {translate("onboarding.step3.title")}
          </Text>
          <View className="gap-3">
            {featureCards.map((item, index) => (
              <MotiView
                key={item}
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: "timing", duration: 300, delay: 70 + index * 80 }}
              >
                <Card>
                  <Text className={`text-base font-semibold leading-6 ${titleClassName}`}>
                    {item}
                  </Text>
                </Card>
              </MotiView>
            ))}
          </View>
        </>
      );
    }

    return null;
  };

  return (
    <SafeAreaView className={`flex-1 overflow-hidden ${screenClassName}`}>
      <MotiView
        className="absolute -left-12 top-8 h-40 w-40 rounded-full bg-orange-400/20"
        from={{ opacity: 0.3, scale: 0.9 }}
        animate={{ opacity: theme === "dark" ? 0.72 : 0.55, scale: 1.1 }}
        transition={{ loop: true, type: "timing", duration: 2800 }}
      />
      <MotiView
        className="absolute -right-14 top-40 h-52 w-52 rounded-full bg-indigo-400/20"
        from={{ opacity: 0.2, scale: 0.9 }}
        animate={{ opacity: theme === "dark" ? 0.6 : 0.4, scale: 1.15 }}
        transition={{ loop: true, type: "timing", duration: 3400 }}
      />
      <MotiView
        className={`absolute -left-14 top-1/2 h-52 w-52 -translate-y-1/2 rounded-full ${
          theme === "dark" ? "bg-fuchsia-400/10" : "bg-sky-400/20"
        }`}
        from={{ opacity: 0.2, scale: 0.9 }}
        animate={{ opacity: theme === "dark" ? 0.72 : 0.33, scale: 1.08 }}
        transition={{ loop: true, type: "timing", duration: 3600 }}
      />

      <View className="flex-1 px-6 pb-6 pt-4">
        <MotiView
          className="mb-8 flex-row items-center justify-between"
          from={{ opacity: 0, translateY: -8 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 420 }}
        >
          <Text className={`text-3xl font-extrabold ${titleClassName}`}>
            {translate("common.appName")}
          </Text>
          <View className="flex-row items-center gap-2">
            <ThemeToggle />
            <LanguageSelector />
          </View>
        </MotiView>

        <MotiView
          className="mb-6"
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 450, delay: 60 }}
        >
          <View className="mb-2 flex-row items-center justify-between">
            <Text className={`text-xs font-semibold uppercase tracking-widest ${textClassName}`}>
              Onboarding
            </Text>
            <Text className={`text-xs font-semibold ${textClassName}`}>{step}/3</Text>
          </View>
          <View className="h-2 rounded-full bg-slate-200 dark:bg-slate-800">
            <MotiView
              className="h-2 rounded-full bg-orange-500"
              from={{ width: "33%" }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ type: "timing", duration: 420, easing: Easing.out(Easing.cubic) }}
            />
          </View>
        </MotiView>

        <View className="flex-1 justify-between">
          <View className="relative overflow-hidden" style={{ height: 420 }}>
            {leavingStep !== null ? (
              <MotiView
                key={`step-out-${leavingStep}-${step}`}
                className="absolute inset-0 gap-4"
                from={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{
                  type: "timing",
                  duration: fadeDurationMs,
                  easing: Easing.out(Easing.cubic)
                }}
              >
                {renderStepContent(leavingStep)}
              </MotiView>
            ) : null}

            <MotiView
              key={`step-in-${step}`}
              className="absolute inset-0 gap-4"
              from={{ opacity: leavingStep === null ? 1 : 0 }}
              animate={{ opacity: 1 }}
              transition={{
                type: "timing",
                duration: fadeDurationMs,
                easing: Easing.out(Easing.cubic)
              }}
            >
              {renderStepContent(step)}
            </MotiView>
          </View>

          <Animated.View className="mt-6" style={continueAnimatedStyle}>
            {step < 3 ? (
              <Button
                label={translate("common.actions.continue")}
                onPress={handleContinue}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                className="w-full"
              />
            ) : (
              <Button
                label={translate("common.actions.getStarted")}
                onPress={() => undefined}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                className="w-full"
              />
            )}
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
