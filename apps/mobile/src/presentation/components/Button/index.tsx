import { Pressable, Text } from "react-native";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  className?: string;
};

const variantClassMap: Record<ButtonVariant, string> = {
  primary: "bg-orange-500",
  secondary: "bg-slate-800 dark:bg-slate-200"
};

const textClassMap: Record<ButtonVariant, string> = {
  primary: "text-white",
  secondary: "text-white dark:text-slate-900"
};

const Button = ({
  label,
  onPress,
  variant = "primary",
  className = ""
}: ButtonProps): JSX.Element => {
  return (
    <Pressable
      onPress={onPress}
      className={`items-center rounded-2xl px-5 py-4 active:opacity-80 ${variantClassMap[variant]} ${className}`}
    >
      <Text className={`text-base font-semibold ${textClassMap[variant]}`}>{label}</Text>
    </Pressable>
  );
};

export default Button;
