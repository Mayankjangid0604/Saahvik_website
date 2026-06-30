"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, ChevronDown } from "lucide-react";
import { SaahvikMark } from "../SaahvikLogo";
import { Aurora, FloatingDecor } from "../ui/Aurora";
import { useModal } from "../ModalProvider";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { open } = useModal();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-32 text-center"
    >
      <Aurora />
      <FloatingDecor />

      {/* eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.15 }}
        className="glass mb-9 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-content"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-500" />
        </span>
        Now onboarding founding hostels · Early Access 2026
      </motion.div>

      {/* logo mark */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7, rotate: -6 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.05 }}
        className="mb-8"
      >
        <SaahvikMark size={88} />
      </motion.div>

      {/* wordmark */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.25 }}
        className="font-display text-6xl font-semibold tracking-[0.12em] text-content sm:text-7xl md:text-8xl"
      >
        SAAHVIK
      </motion.h1>

      {/* tagline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.38 }}
        className="mt-4 font-display text-2xl font-medium italic sm:text-3xl md:text-4xl"
      >
        <span className="text-shimmer animate-shimmer">
          Smarter Hostel Management.
        </span>
      </motion.p>

      {/* description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.5 }}
        className="mt-7 max-w-2xl text-balance text-base leading-relaxed text-muted sm:text-lg"
      >
        A next-generation hostel management platform designed to simplify
        operations, automate daily tasks, and deliver a seamless experience for
        administrators, wardens, staff, students, and parents.
      </motion.p>

      {/* buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.62 }}
        className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
      >
        <a href="#early-access" className="btn-primary group w-full sm:w-auto">
          Join Early Access
          <ArrowRight
            size={17}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>
        <button
          onClick={() => open("suggest")}
          className="btn-ghost group w-full sm:w-auto"
        >
          <Sparkles size={16} className="text-gold-500 dark:text-gold-300" />
          Suggest a Feature
        </button>
        <button
          disabled
          className="group relative inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full border border-dashed border-line px-7 py-3.5 text-sm font-semibold text-muted sm:w-auto"
        >
          <Play size={15} />
          Watch Vision
          <span className="ml-1 rounded-full bg-gold-400/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-600 dark:text-gold-300">
            Soon
          </span>
        </button>
      </motion.div>

      {/* scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to learn more"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block"
        >
          <ChevronDown size={26} />
        </motion.span>
      </motion.a>
    </section>
  );
}
