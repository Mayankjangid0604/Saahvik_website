"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { DEVICES, type DeviceMock } from "@/lib/data";
import { SectionHeading } from "../ui/SectionHeading";
import { staggerParent, staggerChild } from "../ui/Reveal";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<DeviceMock["status"], string> = {
  Preview:
    "bg-gold-400/15 text-gold-700 dark:text-gold-200 ring-gold-400/30",
  "In Development":
    "bg-navy-500/15 text-navy-600 dark:text-navy-200 ring-navy-400/30",
  "Coming Soon": "bg-content/5 text-muted ring-line",
};

/** Blurred skeleton "screenshot" behind the lock overlay. */
function Skeleton({ big }: { big?: boolean }) {
  return (
    <div className="absolute inset-0 select-none overflow-hidden p-4 opacity-70 blur-[3px]">
      <div className="flex gap-2">
        <div className="h-2.5 w-2.5 rounded-full bg-gold-400/50" />
        <div className="h-2.5 w-2.5 rounded-full bg-muted/30" />
        <div className="h-2.5 w-2.5 rounded-full bg-muted/30" />
      </div>
      <div className="mt-4 flex gap-3">
        {big && (
          <div className="hidden w-1/4 flex-col gap-2 sm:flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-3 rounded bg-content/10" />
            ))}
          </div>
        )}
        <div className="flex-1 space-y-3">
          <div className="grid grid-cols-3 gap-2">
            <div className="h-10 rounded-lg bg-gold-400/20" />
            <div className="h-10 rounded-lg bg-content/10" />
            <div className="h-10 rounded-lg bg-content/10" />
          </div>
          <div className="h-16 rounded-lg bg-gradient-to-tr from-gold-400/20 to-content/5" />
          <div className="h-2.5 w-2/3 rounded bg-content/10" />
          <div className="h-2.5 w-1/2 rounded bg-content/10" />
        </div>
      </div>
    </div>
  );
}

export function FuturePlatform() {
  return (
    <section id="platform" className="relative section">
      <SectionHeading
        eyebrow="The Future Platform"
        title={
          <>
            One platform,{" "}
            <span className="text-gold-gradient">every screen.</span>
          </>
        }
        subtitle="Desktop, tablet, and a suite of dedicated mobile apps — purpose-built for every role in your hostel. A glimpse of what's taking shape."
      />

      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[208px] lg:grid-cols-4"
      >
        {DEVICES.map((d) => {
          const big = d.span?.includes("col-span-2");
          return (
            <motion.div
              key={d.title}
              variants={staggerChild}
              whileHover={{ y: -5 }}
              className={cn(
                "group relative min-h-[208px] overflow-hidden rounded-3xl border border-line bg-surface/50 shadow-soft backdrop-blur-sm transition-colors hover:border-gold-400/40",
                d.span
              )}
            >
              <Skeleton big={big} />
              {/* glass overlay */}
              <div className="absolute inset-0 grid place-items-center bg-bg/30 backdrop-blur-[1px]">
                <div className="flex flex-col items-center gap-3 text-center">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl glass-strong text-gold-500 dark:text-gold-300">
                    <d.icon size={big ? 26 : 22} />
                  </span>
                  <div>
                    <p
                      className={cn(
                        "font-display font-semibold text-content",
                        big ? "text-lg" : "text-sm"
                      )}
                    >
                      {d.title}
                    </p>
                  </div>
                </div>
              </div>
              {/* status pill */}
              <span
                className={cn(
                  "absolute right-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ring-1",
                  STATUS_STYLES[d.status]
                )}
              >
                <Lock size={9} />
                {d.status}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
