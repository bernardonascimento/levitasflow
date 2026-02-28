"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { LoaderCircle } from "lucide-react";
import Button from "@web/presentation/components/Button";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";
import { createSupabaseBrowserClient } from "@web/lib/supabase/browser";
import { getSiteUrl } from "@web/lib/supabase/env";

type AuthMode = "login" | "signup";

type AuthCardProps = {
  mode: AuthMode;
};

const AuthCard = ({ mode }: AuthCardProps): JSX.Element => {
  const { translate } = useAppLanguage();
  const reduceMotion = useReducedMotion();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const isLogin = mode === "login";

  const handleEmailAuth = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setMessage(null);

    try {
      const supabase = createSupabaseBrowserClient();
      if (isLogin) {
        const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
        if (loginError) {
          throw loginError;
        }

        window.location.assign("/app");
        return;
      }

      const { error: signUpError } = await supabase.auth.signUp({ email, password });
      if (signUpError) {
        throw signUpError;
      }

      window.location.assign("/app");
      setMessage(translate("auth.signupSuccess"));
    } catch {
      setError(translate("auth.genericError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleAuth = async (): Promise<void> => {
    setIsGoogleSubmitting(true);
    setError(null);
    setMessage(null);

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
  };

  const handleResetPassword = async (): Promise<void> => {
    if (!email) {
      setError(translate("auth.genericError"));
      return;
    }

    setIsResetting(true);
    setError(null);
    setMessage(null);
    const supabase = createSupabaseBrowserClient();
    const redirectTo = `${window.location.origin}/login`;
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });

    if (resetError) {
      setError(translate("auth.genericError"));
    } else {
      setMessage(translate("auth.resetPasswordSent"));
    }
    setIsResetting(false);
  };

  return (
    <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-[1.6rem] border border-[color:var(--border)] bg-[color:var(--surface)]/80 p-6 shadow-[var(--shadow)] backdrop-blur-xl md:p-8">
      <div className="pointer-events-none absolute -left-24 -top-24 h-44 w-44 rounded-full bg-[color:var(--accent)]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-44 w-44 rounded-full bg-[color:var(--accent2)]/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative z-10 space-y-6"
      >
        <header className="space-y-2">
          <h1 className="text-3xl font-black tracking-tight text-[color:var(--text)]">
            {isLogin ? translate("auth.loginTitle") : translate("auth.signupTitle")}
          </h1>
          <p className="text-sm text-[color:var(--muted)]">
            {isLogin ? translate("auth.loginSubtitle") : translate("auth.signupSubtitle")}
          </p>
        </header>

        <form className="space-y-4" onSubmit={handleEmailAuth}>
          <label className="block space-y-1.5">
            <span className="text-sm font-semibold text-[color:var(--text)]">
              {translate("auth.emailLabel")}
            </span>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              required
              placeholder={translate("auth.emailPlaceholder")}
              className="h-11 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface2)]/80 px-3 text-sm text-[color:var(--text)] outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--ring)]"
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-sm font-semibold text-[color:var(--text)]">
              {translate("auth.passwordLabel")}
            </span>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              required
              minLength={6}
              placeholder={translate("auth.passwordPlaceholder")}
              className="h-11 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface2)]/80 px-3 text-sm text-[color:var(--text)] outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--ring)]"
            />
          </label>

          <Button type="submit" disabled={isSubmitting} className="h-11 w-full">
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <LoaderCircle className="h-4 w-4 animate-spin" />
                {isLogin ? translate("auth.loginCta") : translate("auth.signupCta")}
              </span>
            ) : isLogin ? (
              translate("auth.loginCta")
            ) : (
              translate("auth.signupCta")
            )}
          </Button>
        </form>

        <Button
          variant="secondary"
          disabled={isGoogleSubmitting}
          onClick={handleGoogleAuth}
          className="h-11 w-full font-semibold"
        >
          {isGoogleSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <LoaderCircle className="h-4 w-4 animate-spin" />
              {isLogin ? translate("auth.googleLoginCta") : translate("auth.googleSignupCta")}
            </span>
          ) : isLogin ? (
            translate("auth.googleLoginCta")
          ) : (
            translate("auth.googleSignupCta")
          )}
        </Button>

        {isLogin ? (
          <button
            type="button"
            disabled={isResetting}
            onClick={handleResetPassword}
            className="text-sm font-semibold text-[color:var(--muted)] transition-colors hover:text-[color:var(--accent)]"
          >
            {translate("auth.forgotPassword")}
          </button>
        ) : null}

        {error ? (
          <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
            {error}
          </p>
        ) : null}
        {message ? (
          <p className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-300">
            {message}
          </p>
        ) : null}

        {isLogin ? (
          <p className="text-sm text-[color:var(--muted)]">
            {translate("auth.noAccount")}{" "}
            <Link href="/signup" className="font-semibold text-[color:var(--accent)]">
              {translate("auth.createAccount")}
            </Link>
          </p>
        ) : (
          <p className="text-sm text-[color:var(--muted)]">
            {translate("auth.hasAccount")}{" "}
            <Link href="/login" className="font-semibold text-[color:var(--accent)]">
              {translate("auth.doLogin")}
            </Link>
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default AuthCard;
