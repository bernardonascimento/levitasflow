"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { LoaderCircle } from "lucide-react";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  children: ReactNode;
};

const PrimaryButton = ({
  loading = false,
  disabled,
  className = "",
  type = "button",
  children,
  ...props
}: PrimaryButtonProps): JSX.Element => {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled || loading}
      className={`inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[color:var(--accent)] bg-[linear-gradient(180deg,color-mix(in_srgb,white_12%,var(--accent))_0%,var(--accent)_100%)] px-4 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_10px_28px_color-mix(in_srgb,var(--accent)_40%,transparent)] transition-all duration-200 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.26),0_10px_28px_color-mix(in_srgb,var(--accent)_40%,transparent),0_0_28px_color-mix(in_srgb,var(--accent)_32%,transparent)] hover:brightness-105 active:scale-[0.97] active:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_6px_18px_color-mix(in_srgb,var(--accent)_38%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)] disabled:cursor-not-allowed disabled:opacity-65 disabled:hover:translate-y-0 disabled:hover:brightness-100 ${className}`}
    >
      {loading ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
      <span>{children}</span>
    </button>
  );
};

export default PrimaryButton;
