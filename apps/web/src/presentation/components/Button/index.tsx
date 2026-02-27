"use client";

import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantClassMap: Record<ButtonVariant, string> = {
  primary:
    "bg-orange-500 text-white hover:bg-orange-600 focus-visible:ring-orange-400 dark:bg-orange-500 dark:hover:bg-orange-400",
  secondary:
    "bg-slate-900 text-white hover:bg-slate-800 focus-visible:ring-slate-500 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200",
  ghost:
    "bg-transparent text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-400 dark:text-slate-200 dark:hover:bg-slate-800"
};

const Button = ({
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      {...props}
      type={type}
      className={`inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 ${variantClassMap[variant]} ${className}`}
    />
  );
};

export default Button;
