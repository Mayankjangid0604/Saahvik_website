"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, Check } from "lucide-react";
import { LEGACY_STACK } from "@/lib/data";
import { SaahvikMark } from "../SaahvikLogo";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal, staggerParent, staggerChild } from "../ui/Reveal";

const UNIFIED = [
  "One source of truth",
  "Connected workflows",
  "Real-time, everywhere",
];

export function WhyBuilding() {
  return (
    <section className="relative section">
      <SectionHeading
        eyebrow="Why We're Building This"
        title={
          <>
            Hostels run on a{" "}
            <span className="text-gold-gradient">fragmented stack</span>
          </>
        }
        subtitle="Today, managing a hostel means juggling a dozen disconnected tools. SAAHVIK brings every one of them into a single intelligent platform."
      />

      <div className="mt-16 grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
        {/* Legacy fragmented stack */}
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: "-60px" }}
          className="relative"
        >
          <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted lg:text-left">
            The way it works today
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
            {LEGACY_STACK.map((item, i) => (
              <motion.div
                key={item.label}
                variants={staggerChild}
                style={{ rotate: `${(i % 2 === 0 ? -1 : 1) * 1.5}deg` }}
                className="flex items-center gap-2.5 rounded-2xl border border-line bg-surface/40 px-3.5 py-3 text-sm text-muted"
              >
                <item.icon size={17} className="shrink-0 opacity-70" />
                <span className="truncate">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Connector */}
        <Reveal delay={0.2} className="flex items-center justify-center">
          <div className="relative grid h-16 w-16 place-items-center rounded-full glass">
            <span className="absolute h-full w-full rounded-full border border-gold-400/30 animate-pulse-ring" />
            <ArrowRight className="hidden text-gold-500 dark:text-gold-300 lg:block" />
            <ArrowDown className="text-gold-500 dark:text-gold-300 lg:hidden" />
          </div>
        </Reveal>

        {/* Unified platform */}
        <Reveal delay={0.1}>
          <div className="relative overflow-hidden rounded-4xl border border-gold-400/30 bg-surface/70 p-8 shadow-glow backdrop-blur-xl">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold-400/15 blur-2xl" />
            <div className="flex items-center gap-4">
              <SaahvikMark size={52} />
              <div>
                <p className="font-display text-xl font-semibold text-content">
                  SAAHVIK
                </p>
                <p className="text-sm text-muted">One intelligent platform</p>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {UNIFIED.map((u) => (
                <div key={u} className="flex items-center gap-3">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-gold-400/15 text-gold-600 dark:text-gold-300">
                    <Check size={14} />
                  </span>
                  <span className="text-sm font-medium text-content">{u}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
