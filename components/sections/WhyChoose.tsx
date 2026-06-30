"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import { TRADITIONAL, SAAHVIK_WAY } from "@/lib/data";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";

export function WhyChoose() {
  return (
    <section className="relative section">
      <SectionHeading
        eyebrow="Why Choose SAAHVIK"
        title={
          <>
            From paperwork to{" "}
            <span className="text-gold-gradient">a platform.</span>
          </>
        }
        subtitle="See how the SAAHVIK way compares with the manual, fragmented status quo."
      />

      <div className="mx-auto mt-16 grid max-w-4xl items-stretch gap-5 md:grid-cols-2 md:gap-6">
        {/* Traditional */}
        <Reveal>
          <div className="h-full rounded-4xl border border-line bg-surface/40 p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Traditional Management
            </p>
            <ul className="mt-6 space-y-4">
              {TRADITIONAL.map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-red-500/10 text-red-500/90">
                    <X size={15} />
                  </span>
                  <span className="text-[15px] text-muted line-through decoration-red-500/30">
                    {t}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* SAAHVIK */}
        <Reveal delay={0.12}>
          <div className="relative h-full overflow-hidden rounded-4xl border border-gold-400/40 bg-surface/70 p-8 shadow-glow backdrop-blur-xl">
            <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-gold-400/15 blur-3xl" />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-700 dark:text-gold-200">
                The SAAHVIK Way
              </p>
            </div>
            <ul className="relative mt-6 space-y-4">
              {SAAHVIK_WAY.map((t, i) => (
                <motion.li
                  key={t}
                  initial={{ opacity: 0, x: 14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                  className="flex items-center gap-3"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold-sheen text-navy-950">
                    <Check size={15} strokeWidth={3} />
                  </span>
                  <span className="text-[15px] font-semibold text-content">
                    {t}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
