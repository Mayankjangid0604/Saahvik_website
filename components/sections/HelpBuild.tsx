"use client";

import { motion } from "framer-motion";
import { Sparkles, ClipboardList, MessageSquarePlus } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { useModal } from "../ModalProvider";

export function HelpBuild() {
  const { open } = useModal();

  return (
    <section className="section pt-0">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] border border-line bg-gradient-to-br from-navy-900 to-navy-950 px-6 py-14 sm:px-12 md:py-16">
          {/* decorative blooms */}
          <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-gold-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-navy-500/30 blur-3xl" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(226,196,133,0.6) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
              maskImage:
                "radial-gradient(ellipse 70% 80% at 80% 20%, black, transparent 70%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 80% at 80% 20%, black, transparent 70%)",
            }}
          />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-200">
                <Sparkles size={14} /> Co-create with us
              </span>
              <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.1] tracking-tight text-ivory sm:text-4xl md:text-[2.75rem]">
                Help Build SAAHVIK
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-ivory/70 sm:text-lg">
                We&apos;re building SAAHVIK together with hostel owners,
                administrators, and wardens. Your feedback directly shapes the
                future of the platform — tell us what you need and what you wish
                existed.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <motion.button
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => open("suggest")}
                className="group flex items-center gap-4 rounded-2xl bg-gold-sheen p-5 text-left text-navy-950 shadow-gold"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-950/10">
                  <MessageSquarePlus size={22} />
                </span>
                <span className="flex-1">
                  <span className="block font-semibold">Suggest a Feature</span>
                  <span className="block text-sm text-navy-900/70">
                    Share an idea in a quick guided flow
                  </span>
                </span>
                <Sparkles
                  size={18}
                  className="transition-transform group-hover:rotate-12"
                />
              </motion.button>

              <motion.button
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => open("requirements")}
                className="group flex items-center gap-4 rounded-2xl border border-ivory/15 bg-ivory/5 p-5 text-left text-ivory backdrop-blur-sm transition-colors hover:border-gold-400/40"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-ivory/10 text-gold-200">
                  <ClipboardList size={22} />
                </span>
                <span className="flex-1">
                  <span className="block font-semibold">
                    Share Your Requirements
                  </span>
                  <span className="block text-sm text-ivory/60">
                    Tell us about your hostel and challenges
                  </span>
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
