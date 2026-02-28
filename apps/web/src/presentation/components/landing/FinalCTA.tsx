"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import Button from "@web/presentation/components/Button";
import { useAppLanguage } from "@web/presentation/providers/LanguageProvider";

const FinalCTA = (): JSX.Element => {
  const { translate } = useAppLanguage();
  const reduceMotion = useReducedMotion();
  const router = useRouter();

  return (
    <section className="mx-auto w-full max-w-[78rem] px-5 py-14 md:px-8 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="final-cta-shell rounded-[2rem] p-8 text-center md:p-12"
      >
        <h2 className="mx-auto max-w-3xl text-[clamp(1.8rem,4vw,3.2rem)] font-black leading-[0.95] tracking-tight text-[color:var(--text)]">
          {translate("landing.finalCta.title")}
        </h2>
        <motion.div
          whileHover={reduceMotion ? undefined : { scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-7 inline-flex"
        >
          <Button className="px-7" onClick={() => router.push("/signup")}>
            {translate("common.actions.createFreeAccount")}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FinalCTA;
