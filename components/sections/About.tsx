"use client";

import { motion } from "framer-motion";
import {
  BedDouble,
  IndianRupee,
  CalendarCheck,
  ShieldCheck,
  MessagesSquare,
  QrCode,
  BarChart3,
  Bell,
} from "lucide-react";
import { Reveal } from "../ui/Reveal";

const ORBIT = [
  BedDouble,
  IndianRupee,
  CalendarCheck,
  ShieldCheck,
  MessagesSquare,
  QrCode,
  BarChart3,
  Bell,
];

const PILLARS = ["Research-led", "Owner-built", "Operations-first"];

function OrbitIllustration() {
  return (
    <div className="relative mx-auto grid h-[360px] w-full max-w-md place-items-center sm:h-[440px]">
      {/* halo */}
      <div className="absolute h-72 w-72 rounded-full bg-gold-400/10 blur-3xl" />
      {/* static rings */}
      <div className="absolute h-56 w-56 rounded-full border border-line sm:h-64 sm:w-64" />
      <div className="absolute h-[19rem] w-[19rem] rounded-full border border-dashed border-line/70 sm:h-[22rem] sm:w-[22rem]" />

      {/* center wordmark emblem */}
      <div className="relative z-10 grid h-28 w-28 place-items-center rounded-full glass-strong">
        <span className="absolute h-28 w-28 rounded-full bg-gold-400/15 blur-xl" />
        <span className="relative font-display text-sm font-semibold tracking-[0.16em] text-gold-600 dark:text-gold-300">
          SAAHVIK
        </span>
      </div>

      {/* orbiting chips */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
      >
        {ORBIT.map((Icon, i) => {
          const angle = (i / ORBIT.length) * Math.PI * 2;
          const r = 140;
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;
          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2"
              style={{ transform: `translate(${x}px, ${y}px)` }}
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
                className="-ml-6 -mt-6 grid h-12 w-12 place-items-center rounded-2xl border border-line bg-surface/80 text-gold-500 shadow-soft backdrop-blur-md dark:text-gold-300"
              >
                <Icon size={20} />
              </motion.div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="section">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <span className="eyebrow">
            <span className="h-px w-6 bg-gold-400/70" />
            About SAAHVIK
          </span>
          <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.12] tracking-tight text-content sm:text-4xl md:text-5xl">
            Built with hostel owners — not just{" "}
            <span className="text-gold-gradient">for them.</span>
          </h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            <p>
              SAAHVIK is being shaped after extensive research with hostel
              owners, wardens, and administrators across the country. Every
              module begins with a real conversation and a real problem on the
              ground — never a feature added for its own sake.
            </p>
            <p>
              Our vision is a single, intelligent platform that replaces the
              tangle of registers, spreadsheets, and disconnected apps with one
              calm, dependable system. We are obsessed with solving genuine
              operational challenges — and with removing complexity rather than
              adding it.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {PILLARS.map((p) => (
              <span
                key={p}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 px-4 py-2 text-sm font-medium text-content"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                {p}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <OrbitIllustration />
        </Reveal>
      </div>
    </section>
  );
}
