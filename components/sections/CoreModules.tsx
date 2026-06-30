"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { MODULES } from "@/lib/data";
import { SectionHeading } from "../ui/SectionHeading";
import { staggerParent, staggerChild } from "../ui/Reveal";

export function CoreModules() {
  return (
    <section id="modules" className="relative section">
      {/* faint backdrop accent */}
      <div className="pointer-events-none absolute inset-x-0 top-1/4 -z-10 mx-auto h-96 max-w-4xl rounded-full bg-gold-400/5 blur-3xl" />

      <SectionHeading
        eyebrow="Core Modules"
        title={
          <>
            A complete toolkit,{" "}
            <span className="text-gold-gradient">module by module.</span>
          </>
        }
        subtitle="Each capability is a first-class module — adopt what you need today and switch on the rest as you grow."
      />

      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-16 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        {MODULES.map(({ label, icon: Icon }) => (
          <motion.div
            key={label}
            variants={staggerChild}
            className="group flex items-center gap-4 rounded-2xl border border-line bg-surface/50 p-4 transition-all duration-300 hover:border-gold-400/50 hover:bg-surface hover:shadow-soft"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold-400/10 text-gold-600 ring-1 ring-gold-400/15 transition-all duration-300 group-hover:bg-gold-400/20 group-hover:scale-105 dark:text-gold-300">
              <Icon size={20} />
            </span>
            <span className="flex-1 text-[15px] font-medium text-content">
              {label}
            </span>
            <ArrowUpRight
              size={17}
              className="shrink-0 text-muted opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 group-hover:text-gold-500 dark:group-hover:text-gold-300"
            />
          </motion.div>
        ))}

        {/* And many more */}
        <motion.div
          variants={staggerChild}
          className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-gold-400/30 p-4"
          style={{
            backgroundImage:
              "linear-gradient(110deg, rgba(203,163,94,0.14), rgba(203,163,94,0.04))",
          }}
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold-sheen text-navy-950 shadow-gold">
            <Plus size={20} />
          </span>
          <span className="flex-1 text-[15px] font-semibold text-gold-700 dark:text-gold-200">
            And many more…
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
