"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@web/presentation/components/Button";
import styles from "./EmptyStateCard.module.css";

type EmptyStateCardProps = {
  icon?: ReactNode;
  message: string;
  secondaryMessage?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  className?: string;
};

const EmptyStateCard = ({
  icon,
  message,
  secondaryMessage,
  ctaLabel,
  onCtaClick,
  className = ""
}: EmptyStateCardProps): JSX.Element => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`${styles.card} relative w-full overflow-hidden rounded-[1.2rem] border border-[color:var(--hero-card-border)] bg-[length:100%_100%] p-6 backdrop-blur-xl md:p-8 ${className}`}
      style={{
        background:
          "linear-gradient(145deg, color-mix(in srgb, var(--surface) 96%, transparent), color-mix(in srgb, var(--surface2) 90%, transparent))"
      }}
    >
      <div className={`${styles.cardInner} relative size-full`}>
        <div className={`${styles.cardAtmosphere} rounded-[1.2rem]`} aria-hidden />
        <div className="pointer-events-none absolute -left-24 -top-24 h-56 w-56 rounded-full bg-[color:var(--heroAura1)] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -right-16 h-56 w-56 rounded-full bg-[color:var(--heroAura2)] blur-3xl" />
        <div className="relative z-10 flex flex-col items-center justify-center py-4 text-center">
          {icon ? (
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--surface2)]/80 text-[color:var(--muted)]">
              {icon}
            </div>
          ) : null}
          <p className="mt-3 text-sm font-medium text-[color:var(--text)]">{message}</p>
          {secondaryMessage ? (
            <p className="mt-1 text-xs text-[color:var(--muted)]">{secondaryMessage}</p>
          ) : null}
          {ctaLabel && onCtaClick ? (
            <Button className="mt-4" onClick={onCtaClick}>
              {ctaLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
};

export default EmptyStateCard;
