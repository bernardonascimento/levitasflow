"use client";

import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClassMap: Record<ButtonVariant, string> = {
  primary:
    "relative overflow-hidden border border-[color:var(--accent)] bg-[color:var(--accent)] text-white shadow-[0_10px_30px_color-mix(in_srgb,var(--accent)_38%,transparent)] hover:brightness-110 focus-visible:ring-[color:var(--ring)] dark:shadow-[0_10px_34px_color-mix(in_srgb,var(--accent)_42%,transparent)]",
  secondary:
    "border border-[color:var(--border)] bg-[color:var(--surface2)] text-[color:var(--text)] hover:brightness-105 focus-visible:ring-[color:var(--ring)]",
  ghost:
    "border border-transparent bg-transparent text-[color:var(--muted)] hover:border-[color:var(--border)] hover:bg-[color:var(--surface2)] hover:text-[color:var(--text)] focus-visible:ring-[color:var(--ring)]"
};

const primarySmClass =
  "relative overflow-hidden border border-[color:var(--accent)] bg-[color:var(--accent)] text-white shadow-[0_4px_14px_color-mix(in_srgb,var(--accent)_28%,transparent)] hover:brightness-110 focus-visible:ring-[color:var(--ring)] dark:shadow-[0_4px_16px_color-mix(in_srgb,var(--accent)_32%,transparent)]";

const sizeClassMap: Record<ButtonSize, string> = {
  sm: "h-10 min-h-10 gap-1.5 rounded-xl px-3.5 py-2 text-sm font-semibold",
  md: "rounded-xl px-5 py-2.5 text-sm font-semibold"
};

const Button = ({
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...props
}: ButtonProps): JSX.Element => {
  const variantClass =
    variant === "primary" && size === "sm" ? primarySmClass : variantClassMap[variant];
  return (
    <button
      {...props}
      type={type}
      className={`inline-flex items-center justify-center transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)] ${sizeClassMap[size]} ${variantClass} ${className}`}
    />
  );
};

export default Button;
