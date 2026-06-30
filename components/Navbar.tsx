"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { SaahvikLogo } from "./SaahvikLogo";
import { ThemeToggle } from "./ThemeToggle";
import { useModal } from "./ModalProvider";
import { NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { open: openModal } = useModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-[100] flex justify-center px-4 pt-3 sm:pt-4"
      >
        <nav
          className={cn(
            "flex w-full max-w-7xl items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5",
            scrolled
              ? "glass-strong shadow-soft"
              : "border border-transparent bg-transparent"
          )}
        >
          <a href="#top" className="flex items-center" aria-label="SAAHVIK home">
            <SaahvikLogo size={20} />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-content"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle className="hidden sm:grid" />
            <button
              onClick={() => openModal("suggest")}
              className="hidden items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-content transition-colors hover:text-gold-500 dark:hover:text-gold-300 md:inline-flex"
            >
              <Sparkles size={15} className="text-gold-500 dark:text-gold-300" />
              Suggest a Feature
            </button>
            <a href="#early-access" className="btn-primary hidden px-5 py-2.5 sm:inline-flex">
              Join Early Access
            </a>

            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface/50 text-content backdrop-blur-md lg:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[110] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col gap-6 bg-surface p-6 shadow-lift"
            >
              <div className="flex items-center justify-between">
                <SaahvikLogo size={20} />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-10 w-10 place-items-center rounded-full border border-line text-content"
                >
                  <X size={20} />
                </button>
              </div>

              <ul className="mt-2 flex flex-col gap-1">
                {NAV_LINKS.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05 }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-2xl px-4 py-3 text-lg font-medium text-content transition-colors hover:bg-elevated"
                    >
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto flex flex-col gap-3">
                <button
                  onClick={() => {
                    setOpen(false);
                    openModal("suggest");
                  }}
                  className="btn-ghost w-full"
                >
                  <Sparkles size={16} /> Suggest a Feature
                </button>
                <a
                  href="#early-access"
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full"
                >
                  Join Early Access
                </a>
                <div className="flex items-center justify-between rounded-2xl border border-line px-4 py-3">
                  <span className="text-sm text-muted">Appearance</span>
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
