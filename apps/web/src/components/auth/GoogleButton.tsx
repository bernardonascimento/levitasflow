"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { LoaderCircle } from "lucide-react";

type GoogleButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  children: ReactNode;
};

const GoogleLogo = (): JSX.Element => {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0">
      <path
        d="M21.805 12.23c0-.71-.064-1.393-.182-2.046H12v3.873h5.498a4.7 4.7 0 0 1-2.038 3.083v2.557h3.293c1.928-1.775 3.052-4.392 3.052-7.467Z"
        fill="#4285F4"
      />
      <path
        d="M12 22c2.76 0 5.075-.915 6.766-2.48l-3.293-2.558c-.915.614-2.084.977-3.473.977-2.67 0-4.93-1.803-5.737-4.227H2.859v2.64A10 10 0 0 0 12 22Z"
        fill="#34A853"
      />
      <path
        d="M6.263 13.712a5.986 5.986 0 0 1 0-3.423V7.649H2.859a10 10 0 0 0 0 8.703l3.404-2.64Z"
        fill="#FBBC05"
      />
      <path
        d="M12 6.061c1.5 0 2.847.516 3.906 1.53l2.93-2.93C17.07 3.016 14.756 2 12 2A10 10 0 0 0 2.859 7.649l3.404 2.64C7.07 7.864 9.33 6.061 12 6.061Z"
        fill="#EA4335"
      />
    </svg>
  );
};

const GoogleButton = ({
  loading = false,
  disabled,
  className = "",
  type = "button",
  children,
  ...props
}: GoogleButtonProps): JSX.Element => {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled || loading}
      className={`inline-flex h-11 w-full items-center justify-center gap-2.5 rounded-xl border border-black/10 bg-white px-4 text-sm font-semibold text-black shadow-[0_2px_6px_rgba(0,0,0,0.12)] transition-all duration-[120ms] ease-out hover:bg-[#f3f3f3] hover:shadow-[0_2px_6px_rgba(0,0,0,0.12)] active:scale-[0.97] active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.1),0_2px_6px_rgba(0,0,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)] disabled:cursor-not-allowed disabled:opacity-60 dark:border-black/10 dark:bg-white dark:text-black dark:hover:bg-[#f3f3f3] ${className}`}
    >
      {loading ? (
        <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : (
        <GoogleLogo />
      )}
      <span>{children}</span>
    </button>
  );
};

export default GoogleButton;
