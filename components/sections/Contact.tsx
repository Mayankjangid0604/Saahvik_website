"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle, Mail, Globe, MapPin } from "lucide-react";
import { CONTACT } from "@/lib/data";
import { SectionHeading } from "../ui/SectionHeading";
import { staggerParent, staggerChild } from "../ui/Reveal";

const CARDS = [
  {
    icon: Phone,
    label: "Phone",
    value: CONTACT.phone,
    href: `tel:${CONTACT.phone}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: CONTACT.whatsapp,
    href: CONTACT.whatsappLink,
    accent: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
  },
  {
    icon: Globe,
    label: "Website",
    value: CONTACT.website,
    href: `https://${CONTACT.website}`,
  },
  { icon: MapPin, label: "Location", value: CONTACT.location },
];

export function Contact() {
  return (
    <section id="contact" className="section">
      <SectionHeading
        eyebrow="Get in Touch"
        title={
          <>
            Let&apos;s <span className="text-gold-gradient">talk.</span>
          </>
        }
        subtitle="Have a question, or want to bring SAAHVIK to your hostel? Reach out — we'd love to hear from you."
      />

      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: "-60px" }}
        className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {CARDS.map((c) => {
          const inner = (
            <>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold-400/10 text-gold-600 ring-1 ring-gold-400/20 transition-transform duration-300 group-hover:scale-110 dark:text-gold-300">
                <c.icon size={22} />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  {c.label}
                </p>
                <p className="mt-1 truncate text-[15px] font-semibold text-content">
                  {c.value}
                </p>
              </div>
            </>
          );

          const className =
            "group flex items-center gap-4 rounded-3xl border border-line bg-surface/60 p-5 shadow-soft backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/40";

          return (
            <motion.div key={c.label} variants={staggerChild}>
              {c.href ? (
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={className}
                >
                  {inner}
                </a>
              ) : (
                <div className={className}>{inner}</div>
              )}
            </motion.div>
          );
        })}

        {/* CTA tile */}
        <motion.a
          href={CONTACT.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          variants={staggerChild}
          className="group flex items-center justify-between gap-4 overflow-hidden rounded-3xl bg-gold-sheen p-5 text-navy-950 shadow-gold"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy-900/70">
              Fastest reply
            </p>
            <p className="mt-1 text-[15px] font-bold">Message us on WhatsApp</p>
          </div>
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-navy-950/10 transition-transform group-hover:scale-110">
            <MessageCircle size={22} />
          </span>
        </motion.a>
      </motion.div>
    </section>
  );
}
