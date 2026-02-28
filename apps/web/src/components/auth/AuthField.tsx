"use client";

import type { InputHTMLAttributes } from "react";

type AuthFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  error?: string;
};

const AuthField = ({
  id,
  label,
  error,
  className = "",
  disabled,
  ...props
}: AuthFieldProps): JSX.Element => {
  const hasError = Boolean(error);

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-semibold tracking-tight text-[color:var(--text)]">
        {label}
      </label>
      <input
        {...props}
        id={id}
        disabled={disabled}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${id}-error` : undefined}
        className={`h-11 w-full rounded-xl border px-3 text-sm text-[color:var(--text)] outline-none transition-all duration-200 placeholder:text-[color:var(--muted)]/75 hover:border-[color:var(--accent)]/35 focus-visible:border-[color:var(--accent)] focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:shadow-[0_0_0_2px_var(--ring),0_0_20px_color-mix(in_srgb,var(--accent)_22%,transparent),0_0_32px_rgba(139,92,246,0.07)] disabled:cursor-not-allowed disabled:opacity-60 ${
          hasError
            ? "border-red-500/60 bg-red-500/5 focus-visible:ring-red-400/40 focus-visible:shadow-[0_0_0_2px_rgba(248,113,113,0.4),0_0_16px_rgba(248,113,113,0.15)]"
            : "border-[color:var(--border)] bg-[color:var(--surface2)]/72"
        } ${className}`}
      />
      {hasError ? (
        <p id={`${id}-error`} className="text-xs font-medium text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default AuthField;
