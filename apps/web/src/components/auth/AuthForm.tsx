"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";
import { createSupabaseBrowserClient } from "@web/lib/supabase/browser";
import { getSiteUrl } from "@web/lib/supabase/env";
import AuthCard from "@web/components/auth/AuthCard";
import AuthField from "@web/components/auth/AuthField";
import GoogleButton from "@web/components/auth/GoogleButton";
import PrimaryButton from "@web/components/auth/PrimaryButton";

type AuthMode = "login" | "signup";

type AuthFormProps = {
  mode: AuthMode;
};

type FieldErrors = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AuthForm = ({ mode }: AuthFormProps): JSX.Element => {
  const { translate } = useAppLanguage();
  const isLogin = mode === "login";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const validateForm = (): boolean => {
    const nextErrors: FieldErrors = {};

    if (!email.trim() || !emailRegex.test(email)) {
      nextErrors.email = translate("auth.genericError");
    }

    if (!password || password.length < 6) {
      nextErrors.password = translate("auth.genericError");
    }

    if (!isLogin) {
      if (!confirmPassword || confirmPassword !== password) {
        nextErrors.confirmPassword = translate("auth.passwordMismatch");
      }
    }

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleEmailAuth = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const supabase = createSupabaseBrowserClient();
      if (isLogin) {
        const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
        if (loginError) throw loginError;
        window.location.assign("/app");
        return;
      }

      const { error: signUpError } = await supabase.auth.signUp({ email, password });
      if (signUpError) throw signUpError;

      window.location.assign("/app");
      setMessage(translate("auth.signupSuccess"));
    } catch {
      setError(translate("auth.genericError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleAuth = async (): Promise<void> => {
    setFieldErrors({});
    setError(null);
    setMessage(null);
    setIsGoogleSubmitting(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const redirectTo = `${getSiteUrl()}/auth/callback?next=/app`;
      const { error: googleError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo }
      });

      if (googleError) {
        setError(translate("auth.genericError"));
        setIsGoogleSubmitting(false);
      }
    } catch {
      setError(translate("auth.genericError"));
      setIsGoogleSubmitting(false);
    }
  };

  const handleResetPassword = async (): Promise<void> => {
    setError(null);
    setMessage(null);

    if (!email.trim() || !emailRegex.test(email)) {
      setFieldErrors({ email: translate("auth.genericError") });
      return;
    }

    setFieldErrors({});
    setIsResetting(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const redirectTo = `${window.location.origin}/login`;
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo
      });

      if (resetError) {
        setError(translate("auth.genericError"));
      } else {
        setMessage(translate("auth.resetPasswordSent"));
      }
    } catch {
      setError(translate("auth.genericError"));
    } finally {
      setIsResetting(false);
    }
  };

  const disabled = isSubmitting || isGoogleSubmitting || isResetting;

  return (
    <AuthCard>
      <div className="space-y-5">
        <header className="space-y-1.5">
          <h1 className="text-3xl font-black tracking-tight text-[color:var(--text)]">
            {isLogin ? translate("auth.loginTitle") : translate("auth.signupTitle")}
          </h1>
          <p className="text-sm text-[color:var(--muted)]">
            {isLogin ? translate("auth.loginSubtitle") : translate("auth.signupSubtitle")}
          </p>
        </header>

        <form className="space-y-3.5" onSubmit={handleEmailAuth} noValidate>
          <AuthField
            id={`${mode}-email`}
            type="email"
            autoComplete="email"
            required
            disabled={disabled}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setFieldErrors((current) => ({ ...current, email: undefined }));
            }}
            label={translate("auth.emailLabel")}
            placeholder={translate("auth.emailPlaceholder")}
            error={fieldErrors.email}
          />

          <AuthField
            id={`${mode}-password`}
            type="password"
            autoComplete={isLogin ? "current-password" : "new-password"}
            required
            minLength={6}
            disabled={disabled}
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setFieldErrors((current) => ({
                ...current,
                password: undefined,
                confirmPassword: undefined
              }));
            }}
            label={translate("auth.passwordLabel")}
            placeholder={translate("auth.passwordPlaceholder")}
            error={fieldErrors.password}
          />

          {!isLogin ? (
            <AuthField
              id={`${mode}-confirmPassword`}
              type="password"
              autoComplete="new-password"
              required
              disabled={disabled}
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
                setFieldErrors((current) => ({ ...current, confirmPassword: undefined }));
              }}
              label={translate("auth.confirmPasswordLabel")}
              placeholder={translate("auth.confirmPasswordPlaceholder")}
              error={fieldErrors.confirmPassword}
            />
          ) : null}

          <PrimaryButton
            type="submit"
            loading={isSubmitting}
            className="auth-primary-btn"
            disabled={
              disabled || (!isLogin && (password !== confirmPassword || confirmPassword.length < 6))
            }
          >
            {isLogin ? translate("auth.loginCta") : translate("auth.signupCta")}
          </PrimaryButton>
        </form>

        <GoogleButton loading={isGoogleSubmitting} onClick={handleGoogleAuth}>
          {translate("auth.googleContinue")}
        </GoogleButton>

        {isLogin ? (
          <button
            type="button"
            disabled={isResetting}
            onClick={handleResetPassword}
            className="text-sm font-semibold text-[color:var(--muted)] transition-colors hover:text-[color:var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]"
          >
            {translate("auth.forgotPassword")}
          </button>
        ) : null}

        {error ? (
          <p className="rounded-xl border border-red-500/35 bg-red-500/10 p-3 text-sm text-red-300">
            {error}
          </p>
        ) : null}
        {message ? (
          <p className="rounded-xl border border-emerald-500/35 bg-emerald-500/10 p-3 text-sm text-emerald-300">
            {message}
          </p>
        ) : null}

        {isLogin ? (
          <p className="text-sm text-[color:var(--muted)]">
            {translate("auth.noAccount")}{" "}
            <Link
              href="/signup"
              className="font-semibold text-[color:var(--accent)] transition hover:brightness-110"
            >
              {translate("auth.createAccount")}
            </Link>
          </p>
        ) : (
          <p className="text-sm text-[color:var(--muted)]">
            {translate("auth.hasAccount")}{" "}
            <Link
              href="/login"
              className="font-semibold text-[color:var(--accent)] transition hover:brightness-110"
            >
              {translate("auth.doLogin")}
            </Link>
          </p>
        )}
      </div>
    </AuthCard>
  );
};

export default AuthForm;
