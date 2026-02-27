"use client";

import { motion } from "framer-motion";
import HeroImage from "./HeroImage";

const HeroMediaCard = (): JSX.Element => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.72, ease: "easeOut", delay: 0.1 }}
      style={{ perspective: 1400, transformStyle: "preserve-3d" }}
    >
      <HeroImage />
    </motion.div>
  );
};

export default HeroMediaCard;
