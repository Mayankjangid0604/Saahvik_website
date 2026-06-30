"use client";

import { Linkedin, Twitter, Instagram, Facebook } from "lucide-react";
import { SaahvikLogo } from "../SaahvikLogo";
import { NAV_LINKS } from "@/lib/data";

const QUICK_LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [Linkedin, Twitter, Instagram, Facebook];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-surface/40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px gold-rule" />
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* brand */}
          <div>
            <SaahvikLogo size={36} withTagline />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              A next-generation hostel management platform — built with hostel
              owners to simplify operations, automate the everyday, and bring
              every workflow into one intelligent system.
            </p>
          </div>

          {/* quick links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-content">
              Explore
            </h4>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-muted transition-colors hover:text-gold-500 dark:hover:text-gold-300"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* legal + social */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-content">
              Company
            </h4>
            <ul className="mt-5 space-y-3">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-muted transition-colors hover:text-gold-500 dark:hover:text-gold-300"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-7">
              <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                Social
                <span className="rounded-full bg-content/5 px-2 py-0.5 text-[9px] font-bold tracking-wider">
                  Soon
                </span>
              </p>
              <div className="flex gap-2.5">
                {SOCIALS.map((Icon, i) => (
                  <span
                    key={i}
                    className="grid h-9 w-9 cursor-not-allowed place-items-center rounded-full border border-line bg-surface/50 text-muted/60"
                    aria-disabled="true"
                  >
                    <Icon size={16} />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-7 sm:flex-row">
          <p className="text-sm text-muted">
            © 2026 SAAHVIK. All Rights Reserved.
          </p>
          <p className="flex items-center gap-2 text-sm text-muted">
            Crafted with care in
            <span className="font-medium text-content">Jaipur, India</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
