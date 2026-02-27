"use client";

import { motion, useReducedMotion } from "framer-motion";

type AuroraBackgroundProps = {
  className?: string;
};

const AuroraBackground = ({ className = "" }: AuroraBackgroundProps): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <motion.span
        className="absolute -left-12 -top-20 h-[28rem] w-[28rem] rounded-full bg-[color:var(--accent)] opacity-20 blur-[95px] dark:opacity-24"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: [0, 28, -14, 0],
                y: [0, 16, -12, 0],
                scale: [1, 1.08, 0.96, 1]
              }
        }
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute right-[-4.5rem] top-[-2.5rem] h-[24rem] w-[24rem] rounded-full bg-[color:var(--accent2)] opacity-20 blur-[90px] dark:opacity-24"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: [0, -22, 12, 0],
                y: [0, 22, -10, 0],
                scale: [0.95, 1.05, 1, 0.95]
              }
        }
        transition={{ duration: 24, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute left-1/3 top-1/3 h-[26rem] w-[26rem] rounded-full bg-[color:var(--glow-secondary)] opacity-45 blur-[120px]"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: [0, 16, -18, 0],
                y: [0, -18, 14, 0],
                scale: [1, 1.1, 0.92, 1]
              }
        }
        transition={{ duration: 27, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[color:var(--bg)]/70" />
    </div>
  );
};

export default AuroraBackground;
