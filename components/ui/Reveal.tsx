"use client";

import { motion, useReducedMotion, type Variant } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};

/** Scroll-into-view reveal. Respects prefers-reduced-motion. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();
  const hidden: Variant = reduce ? { opacity: 0 } : { opacity: 0, y };
  const shown: Variant = { opacity: 1, y: 0 };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once, margin: "-80px" }}
      variants={{ hidden, shown }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Stagger container + item helpers for grids/lists. */
export const staggerParent = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

export const staggerChild = {
  hidden: { opacity: 0, y: 22 },
  shown: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};
