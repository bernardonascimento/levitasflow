"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";

type AuthBrandingPanelProps = {
  className?: string;
};

const AuthBrandingPanel = ({ className = "" }: AuthBrandingPanelProps): JSX.Element => {
  const { translate } = useAppLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}
      className={className}
    >
      <Link
        href="/"
        className="group mb-5 inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-[color:var(--muted)] transition-all duration-150 ease-out hover:bg-[rgba(255,255,255,0.06)] hover:text-[color:var(--accent)] hover:backdrop-blur-sm active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)] focus-visible:shadow-[0_0_0_4px_rgba(255,90,31,0.12)] md:mb-6"
        aria-label={translate("common.actions.backToHome")}
      >
        <ArrowLeft
          className="h-4 w-4 shrink-0 transition-transform duration-150 ease-out group-hover:-translate-x-[2px]"
          aria-hidden
        />
      </Link>
      <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-black leading-[1.08] tracking-[-0.03em] text-[color:var(--text)]">
        {translate("auth.branding.title")}
      </h2>
      <p className="mt-4 max-w-md text-base text-[color:var(--muted)] md:mt-5 md:text-lg">
        {translate("auth.branding.description")}
      </p>
      <ul className="mt-6 flex flex-col gap-3 md:mt-8 md:gap-4" role="list">
        <li className="flex items-center gap-3 text-[color:var(--text)]">
          <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-[color:var(--accent)]" />
          <span className="text-sm font-semibold md:text-base">
            {translate("auth.branding.bullet1")}
          </span>
        </li>
        <li className="flex items-center gap-3 text-[color:var(--text)]">
          <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-[color:var(--accent)]" />
          <span className="text-sm font-semibold md:text-base">
            {translate("auth.branding.bullet2")}
          </span>
        </li>
        <li className="flex items-center gap-3 text-[color:var(--text)]">
          <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-[color:var(--accent)]" />
          <span className="text-sm font-semibold md:text-base">
            {translate("auth.branding.bullet3")}
          </span>
        </li>
      </ul>
    </motion.div>
  );
};

export default AuthBrandingPanel;
