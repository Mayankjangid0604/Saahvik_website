"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ROADMAP, type RoadmapPhase } from "@/lib/data";
import { SectionHeading } from "../ui/SectionHeading";
import { cn } from "@/lib/utils";

const BADGE: Record<RoadmapPhase["state"], string> = {
  done: "bg-gold-400/15 text-gold-700 dark:text-gold-200 ring-gold-400/30",
  current:
    "bg-gold-sheen text-navy-950 ring-transparent shadow-gold",
  next: "bg-navy-500/10 text-navy-600 dark:text-navy-200 ring-navy-400/20",
  future: "bg-content/5 text-muted ring-line",
};

function Node({ state }: { state: RoadmapPhase["state"] }) {
  if (state === "done") {
    return (
      <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full bg-gold-sheen text-navy-950 shadow-gold ring-4 ring-bg">
        <Check size={20} strokeWidth={3} />
      </span>
    );
  }
  if (state === "current") {
    return (
      <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border-2 border-gold-400 bg-surface ring-4 ring-bg">
        <span className="absolute h-full w-full rounded-full border border-gold-400/50 animate-pulse-ring" />
        <span className="h-3 w-3 rounded-full bg-gold-500" />
      </span>
    );
  }
  return (
    <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border border-line bg-surface ring-4 ring-bg">
      <span className="h-2.5 w-2.5 rounded-full bg-muted/50" />
    </span>
  );
}

export function Roadmap() {
  const progressIndex = ROADMAP.reduce(
    (acc, p, i) => (p.state === "done" || p.state === "current" ? i : acc),
    0
  );
  const fill = ((progressIndex + 0.5) / ROADMAP.length) * 100;

  return (
    <section id="roadmap" className="relative section">
      <SectionHeading
        eyebrow="Development Roadmap"
        title={
          <>
            The journey to <span className="text-gold-gradient">launch.</span>
          </>
        }
        subtitle="A transparent look at where SAAHVIK is today, and what comes next."
      />

      <div className="relative mt-20">
        {/* desktop connecting line */}
        <div className="absolute left-0 right-0 top-6 hidden h-[2px] bg-line lg:block" />
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${fill}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute left-0 top-6 hidden h-[2px] bg-gold-sheen lg:block"
        />

        <div className="grid gap-10 lg:grid-cols-4 lg:gap-6">
          {ROADMAP.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="relative flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
            >
              {/* mobile vertical line */}
              {i < ROADMAP.length - 1 && (
                <span className="absolute left-6 top-12 h-[calc(100%+1.5rem)] w-px bg-line lg:hidden" />
              )}

              <Node state={p.state} />

              <div className="flex-1 lg:mt-6 lg:w-full">
                {p.badge && (
                  <span
                    className={cn(
                      "mb-3 inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ring-1",
                      BADGE[p.state]
                    )}
                  >
                    {p.badge}
                  </span>
                )}
                <h3 className="font-display text-lg font-semibold text-content">
                  {p.title}
                </h3>
                <ul className="mt-3 space-y-2 lg:mx-auto lg:inline-block lg:text-left">
                  {p.items.map((it) => (
                    <li
                      key={it}
                      className="flex items-center gap-2 text-sm text-muted"
                    >
                      <span
                        className={cn(
                          "h-1.5 w-1.5 shrink-0 rounded-full",
                          p.state === "done" || p.state === "current"
                            ? "bg-gold-500"
                            : "bg-muted/40"
                        )}
                      />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
