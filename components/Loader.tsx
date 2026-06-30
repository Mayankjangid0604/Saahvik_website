"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SaahvikMark } from "./SaahvikLogo";

export default function Loader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setDone(true), 1850);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence onExitComplete={() => (document.body.style.overflow = "")}>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[200] grid place-items-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
        >
          <div className="flex flex-col items-center gap-8">
            <div className="relative grid place-items-center">
              {/* pulsing rings */}
              <span className="absolute h-28 w-28 rounded-3xl border border-gold-400/30 animate-pulse-ring" />
              <span
                className="absolute h-28 w-28 rounded-3xl border border-gold-400/20 animate-pulse-ring"
                style={{ animationDelay: "0.8s" }}
              />
              <motion.div
                initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <SaahvikMark size={84} />
              </motion.div>
            </div>

            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
            >
              <span className="font-display text-lg font-semibold tracking-[0.34em] text-content">
                SAAHVIK
              </span>
              {/* progress bar */}
              <span className="relative h-[3px] w-40 overflow-hidden rounded-full bg-line">
                <motion.span
                  className="absolute inset-y-0 left-0 rounded-full bg-gold-sheen"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
