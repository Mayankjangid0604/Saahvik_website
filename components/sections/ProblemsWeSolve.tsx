"use client";

import { motion } from "framer-motion";
import { PROBLEMS } from "@/lib/data";
import { SectionHeading } from "../ui/SectionHeading";
import { TiltCard } from "../ui/TiltCard";
import { staggerParent, staggerChild } from "../ui/Reveal";

export function ProblemsWeSolve() {
  return (
    <section id="problems" className="relative section">
      <SectionHeading
        eyebrow="Problems We Solve"
        title={
          <>
            Every operational headache,{" "}
            <span className="text-gold-gradient">handled.</span>
          </>
        }
        subtitle="From the front desk to the finance register, SAAHVIK is engineered to take the friction out of daily hostel operations."
      />

      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
      >
        {PROBLEMS.map(({ label, icon: Icon }) => (
          <motion.div key={label} variants={staggerChild}>
            <TiltCard
              max={10}
              scale={1.05}
              className="group relative h-full overflow-hidden rounded-3xl border border-line bg-surface/60 p-5 shadow-soft backdrop-blur-sm transition-colors duration-300 hover:border-gold-400/50 hover:shadow-lift sm:p-6"
            >
              {/* hover sheen */}
              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold-400/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              <div className="relative mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-gold-400/20 to-gold-400/5 text-gold-600 ring-1 ring-gold-400/20 transition-all duration-300 group-hover:scale-110 group-hover:from-gold-400/30 dark:text-gold-300">
                <Icon size={22} />
              </div>
              <h3 className="relative text-sm font-semibold text-content sm:text-[15px]">
                {label}
              </h3>
              <span className="relative mt-1 block h-px w-8 bg-gold-400/0 transition-all duration-300 group-hover:w-12 group-hover:bg-gold-400/60" />
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
