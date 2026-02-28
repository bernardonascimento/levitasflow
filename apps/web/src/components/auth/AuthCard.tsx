"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./AuthCard.module.css";

type AuthCardProps = {
  children: ReactNode;
};

const AuthCard = ({ children }: AuthCardProps): JSX.Element => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`auth-card ${styles.card} relative mx-auto w-full max-w-[27.5rem] overflow-hidden rounded-[1.7rem] border border-[color:var(--hero-card-border)] bg-[length:100%_100%] p-6 backdrop-blur-xl sm:p-7 sm:py-8 lg:ml-auto lg:mr-0`}
      style={{
        background:
          "linear-gradient(145deg, color-mix(in srgb, var(--surface) 96%, transparent), color-mix(in srgb, var(--surface2) 90%, transparent))"
      }}
    >
      <div className={`${styles.cardInner} relative size-full`}>
        <div className={`${styles.cardAtmosphere} rounded-[1.7rem]`} aria-hidden />
        <div className="pointer-events-none absolute -left-24 -top-24 h-56 w-56 rounded-full bg-[color:var(--heroAura1)] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -right-16 h-56 w-56 rounded-full bg-[color:var(--heroAura2)] blur-3xl" />
        <div className="relative z-10">{children}</div>
      </div>
    </motion.section>
  );
};

export default AuthCard;
