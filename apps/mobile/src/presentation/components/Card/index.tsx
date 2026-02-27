import type { ReactNode } from "react";
import { View } from "react-native";
import { useAppTheme } from "@mobile/presentation/providers/ThemeProvider";

type CardProps = {
  children: ReactNode;
  className?: string;
};

const Card = ({ children, className = "" }: CardProps): JSX.Element => {
  const { theme } = useAppTheme();
  const themeClassName =
    theme === "light" ? "border-slate-200 bg-white" : "border-slate-800 bg-slate-900";

  return (
    <View className={`rounded-2xl border p-4 ${themeClassName} ${className}`}>{children}</View>
  );
};

export default Card;
