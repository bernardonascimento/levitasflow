"use client";

import { useRef } from "react";
import type { CSSProperties, PointerEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Bell, CheckCheck, Music2, Users2 } from "lucide-react";

type FeatureCardProps = {
  title: string;
  description: string;
  micro: string;
  variant: "scales" | "confirmations" | "repertoire" | "communication";
  delay?: number;
};

const FeatureCard = ({
  title,
  description,
  micro,
  variant,
  delay = 0
}: FeatureCardProps): JSX.Element => {
  const reduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLElement | null>(null);

  const handlePointerMove = (event: PointerEvent<HTMLElement>): void => {
    if (reduceMotion || !cardRef.current) {
      return;
    }
    const rect = cardRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    cardRef.current.style.setProperty("--spot-x", `${x}px`);
    cardRef.current.style.setProperty("--spot-y", `${y}px`);
  };

  const handlePointerLeave = (): void => {
    if (!cardRef.current) {
      return;
    }
    cardRef.current.style.setProperty("--spot-x", "70%");
    cardRef.current.style.setProperty("--spot-y", "16%");
  };

  const preview =
    variant === "scales" ? (
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: reduceMotion ? 0 : 0.08,
              delayChildren: reduceMotion ? 0 : 0.1
            }
          }
        }}
        className="clarity-preview-shell mt-2"
      >
        {[
          { name: "Teclado", s1: "ok", s2: "pending", s3: "ok" },
          { name: "Voz", s1: "ok", s2: "ok", s3: "pending" },
          { name: "Guitarra", s1: "pending", s2: "ok", s3: "ok" }
        ].map((row) => (
          <motion.div
            key={row.name}
            variants={{
              hidden: { opacity: 0, y: reduceMotion ? 0 : 8 },
              show: { opacity: 1, y: 0 }
            }}
            className="grid grid-cols-[4.8rem_1fr] items-center gap-2"
          >
            <span className="text-[0.66rem] font-semibold uppercase tracking-[0.08em] text-[color:var(--muted)]">
              {row.name}
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              <div className={`clarity-status-block clarity-status-${row.s1}`} />
              <div className={`clarity-status-block clarity-status-${row.s2}`} />
              <div className={`clarity-status-block clarity-status-${row.s3}`} />
            </div>
          </motion.div>
        ))}
      </motion.div>
    ) : null;

  const confirmationPreview =
    variant === "confirmations" ? (
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: reduceMotion ? 0 : 0.08,
              delayChildren: reduceMotion ? 0 : 0.1
            }
          }
        }}
        className="clarity-preview-shell mt-2 space-y-2"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: reduceMotion ? 0 : 8 },
            show: { opacity: 1, y: 0 }
          }}
          className="grid grid-cols-2 gap-2"
        >
          <span className="rounded-lg border border-emerald-500/30 bg-emerald-500/14 px-2.5 py-2 text-center text-[0.72rem] font-semibold text-emerald-500">
            Confirmo
          </span>
          <span className="rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] px-2.5 py-2 text-center text-[0.72rem] font-semibold text-[color:var(--muted)]">
            Não posso
          </span>
        </motion.div>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: reduceMotion ? 0 : 8 },
            show: { opacity: 1, y: 0 }
          }}
          className="flex items-center justify-between rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] px-2.5 py-2"
        >
          <span className="text-[0.72rem] font-medium text-[color:var(--muted)]">
            Aviso enviado
          </span>
          <motion.span
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.34, delay: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
            className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500"
          >
            <CheckCheck size={12} />
          </motion.span>
        </motion.div>
      </motion.div>
    ) : null;

  const repertoirePreview =
    variant === "repertoire" ? (
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: reduceMotion ? 0 : 0.08,
              delayChildren: reduceMotion ? 0 : 0.1
            }
          }
        }}
        className="clarity-preview-shell mt-2 space-y-1.5"
      >
        {[
          { title: "Eu Navegarei", key: "G" },
          { title: "Santo Espirito", key: "D" },
          { title: "A Ele a Gloria", key: "A" }
        ].map((song) => (
          <motion.div
            key={song.title}
            variants={{
              hidden: { opacity: 0, y: reduceMotion ? 0 : 8 },
              show: { opacity: 1, y: 0 }
            }}
            className="clarity-song-row group/song"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]/70" />
            <div className="flex flex-1 items-center justify-between gap-2">
              <p className="truncate text-[0.76rem] font-semibold text-[color:var(--text)]">
                {song.title}
              </p>
              <span className="text-[0.68rem] font-medium text-[color:var(--muted)]">
                Tom: {song.key}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    ) : null;

  const communicationPreview =
    variant === "communication" ? (
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: reduceMotion ? 0 : 0.09,
              delayChildren: reduceMotion ? 0 : 0.1
            }
          }
        }}
        className="clarity-preview-shell mt-2 space-y-2"
      >
        {["Escala de domingo enviada para o time.", "Lembrete: ensaio hoje as 19h."].map((text) => (
          <motion.div
            key={text}
            variants={{
              hidden: { opacity: 0, x: reduceMotion ? 0 : -8, y: reduceMotion ? 0 : 6 },
              show: { opacity: 1, x: 0, y: 0 }
            }}
            className="flex items-start gap-2 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] px-2.5 py-2"
          >
            <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-md bg-[color:var(--accent)]/15 text-[color:var(--accent)]">
              <Bell size={12} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="line-clamp-1 text-[0.72rem] font-medium text-[color:var(--text)]">
                {text}
              </p>
              <p className="mt-0.5 text-[0.66rem] text-[color:var(--muted)]">ha 2h</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    ) : null;

  return (
    <motion.article
      ref={cardRef}
      initial={{
        opacity: 0,
        y: reduceMotion ? 0 : 12,
        filter: reduceMotion ? "none" : "blur(6px)"
      }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.32 }}
      transition={{ duration: reduceMotion ? 0.28 : 0.62, delay, ease: "easeOut" }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="clarity-feature-card group relative flex h-full flex-col gap-1.5 overflow-hidden rounded-[1.5rem] border p-4 shadow-[var(--shadow)] transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]"
      tabIndex={0}
      style={
        {
          "--spot-x": "70%",
          "--spot-y": "16%"
        } as CSSProperties
      }
    >
      <div className="clarity-feature-pattern pointer-events-none absolute inset-0 opacity-60" />
      <div className="clarity-feature-spotlight pointer-events-none absolute inset-0" />
      <div className="clarity-feature-shine pointer-events-none absolute inset-0" />

      <div className="relative flex items-center justify-between gap-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)] opacity-70">
          Fluxo real do produto
        </p>
        <motion.span
          className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[color:var(--border)] bg-[color:var(--surface2)] text-[color:var(--accent)] transition duration-300 group-hover:scale-[1.03] group-hover:rotate-3"
          animate={reduceMotion ? undefined : { y: [0, -1.5, 0] }}
          transition={{ duration: 3.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          {variant === "scales" ? <Users2 size={14} /> : null}
          {variant === "confirmations" ? <CheckCheck size={14} /> : null}
          {variant === "repertoire" ? <Music2 size={14} /> : null}
          {variant === "communication" ? <Bell size={14} /> : null}
        </motion.span>
      </div>

      <div className="relative flex flex-1 flex-col">
        <h3 className="text-lg font-bold leading-tight text-[color:var(--text)] md:text-xl">
          {title}
        </h3>
        <span className="mt-1.5 h-[2px] w-14 rounded-full bg-gradient-to-r from-[color:var(--accent)]/85 to-[color:var(--accent2)]/72" />
        <p className="mt-1.5 max-w-md text-sm leading-relaxed text-[color:var(--muted)]">
          {description}
        </p>
        {preview}
        {confirmationPreview}
        {repertoirePreview}
        {communicationPreview}
      </div>

      <p className="relative mt-1.5 text-sm font-semibold text-[color:var(--text)]/90">{micro}</p>
    </motion.article>
  );
};

export default FeatureCard;
