"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Mail, MessageCircle, Phone } from "lucide-react";
import { Aurora } from "../ui/Aurora";
import { Reveal } from "../ui/Reveal";
import { CONTACT } from "@/lib/data";
import { submitEarlyAccess } from "@/lib/api";

export function EarlyAccess() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    await submitEarlyAccess({ email, source: "early-access-cta" });
    setStatus("done");
  }

  return (
    <section id="early-access" className="section">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] border border-gold-400/30 bg-surface/60 px-6 py-16 text-center shadow-glow backdrop-blur-xl sm:px-12 md:py-20">
          <Aurora variant="soft" />

          <span className="eyebrow justify-center">
            <span className="h-px w-6 bg-gold-400/70" />
            Join Early Access
          </span>

          <h2 className="mx-auto mt-5 max-w-2xl text-balance font-display text-3xl font-semibold leading-[1.12] tracking-tight text-content sm:text-4xl md:text-5xl">
            Become one of the first hostels to{" "}
            <span className="text-gold-gradient">experience SAAHVIK.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Founding partners help shape the roadmap, receive priority
            onboarding, and lock in lifetime early-adopter benefits.
          </p>

          {/* waitlist form */}
          <div className="mx-auto mt-9 max-w-md">
            <AnimatePresence mode="wait">
              {status === "done" ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-center gap-3 rounded-full border border-gold-400/40 bg-gold-400/10 px-6 py-4"
                >
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-gold-sheen text-navy-950">
                    <Check size={16} strokeWidth={3} />
                  </span>
                  <span className="text-sm font-semibold text-content">
                    You're on the list — we'll be in touch soon.
                  </span>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex flex-col gap-3 sm:flex-row"
                >
                  <div className="relative flex-1">
                    <Mail
                      size={17}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@hostel.com"
                      className="input pl-11"
                      aria-label="Email address"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-primary shrink-0 disabled:opacity-70"
                  >
                    {status === "loading" ? "Joining…" : "Join Waiting List"}
                    {status !== "loading" && <ArrowRight size={16} />}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* secondary actions */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href="#contact" className="btn-ghost">
              <Phone size={15} /> Contact Us
            </a>
            <a
              href={CONTACT.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-7 py-3.5 text-sm font-semibold text-emerald-700 transition-all duration-300 hover:bg-emerald-500/20 dark:text-emerald-300"
            >
              <MessageCircle size={15} /> WhatsApp
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
