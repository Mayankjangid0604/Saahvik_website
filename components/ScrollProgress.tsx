"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin champagne-gold progress bar pinned to the very top of the page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[130] h-[3px] origin-left bg-gold-sheen shadow-[0_0_12px_rgba(201,169,110,0.6)]"
      aria-hidden
    />
  );
}
