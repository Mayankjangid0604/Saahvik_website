"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  Loader2,
  PartyPopper,
} from "lucide-react";
import { useModal } from "./ModalProvider";
import { cn } from "@/lib/utils";
import {
  ROLES,
  HOSTEL_TYPES,
  MGMT_METHODS,
  CHALLENGES,
  DEMO_OPTIONS,
} from "@/lib/data";
import { submitFeatureSuggestion, type FeatureSuggestionPayload } from "@/lib/api";

const STEPS = [
  { id: 1, title: "About You", hint: "Just the essentials" },
  { id: 2, title: "Your Hostel", hint: "A quick snapshot" },
  { id: 3, title: "Your Ideas", hint: "The part that matters most" },
];

type FormState = Omit<FeatureSuggestionPayload, "submittedAt">;

const EMPTY: FormState = {
  name: "",
  hostelName: "",
  role: "",
  city: "",
  phone: "",
  email: "",
  hostelType: "",
  students: "",
  rooms: "",
  currentMethod: "",
  challenges: [],
  dreamFeatures: "",
  missingFeatures: "",
  priority: [],
  demoInterest: "",
};

/* ── field primitives ─────────────────────────────────────── */
function Field({
  label,
  optional,
  children,
}: {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="label flex items-center gap-2">
        {label}
        {optional && (
          <span className="text-xs font-normal text-muted">(optional)</span>
        )}
      </span>
      {children}
    </label>
  );
}

function Group({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div role="group" aria-label={label}>
      <span className="label">{label}</span>
      {children}
    </div>
  );
}

function PillSelect({
  options,
  value,
  onChange,
}: {
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={cn(
            "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-200",
            value === o
              ? "border-gold-400 bg-gold-400/15 text-gold-700 dark:text-gold-200"
              : "border-line bg-bg/40 text-muted hover:border-gold-400/50 hover:text-content"
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function CheckPills({
  options,
  values,
  onToggle,
}: {
  options: readonly string[];
  values: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = values.includes(o);
        return (
          <button
            key={o}
            type="button"
            onClick={() => onToggle(o)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-all duration-200",
              active
                ? "border-gold-400 bg-gold-400/15 text-gold-700 dark:text-gold-200"
                : "border-line bg-bg/40 text-muted hover:border-gold-400/50 hover:text-content"
            )}
          >
            {active && <Check size={13} strokeWidth={3.5} />}
            {o}
          </button>
        );
      })}
    </div>
  );
}

/* ── modal ─────────────────────────────────────────────────── */
export default function FeatureModal() {
  const { isOpen, mode, close } = useModal();
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState<FormState>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const toggleChallenge = (c: string) =>
    setData((d) => ({
      ...d,
      challenges: d.challenges.includes(c)
        ? d.challenges.filter((x) => x !== c)
        : [...d.challenges, c],
    }));

  function handleClose() {
    close();
    setTimeout(() => {
      setStep(1);
      setDir(1);
      setData(EMPTY);
      setSuccess(false);
      setSubmitting(false);
    }, 350);
  }

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const canContinue = useMemo(() => {
    if (step === 1) return data.name.trim() && data.phone.trim();
    return true;
  }, [step, data]);

  const go = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
  };

  async function handleSubmit() {
    setSubmitting(true);
    await submitFeatureSuggestion(data);
    setSubmitting(false);
    setSuccess(true);
  }

  const title =
    mode === "requirements" ? "Share Your Requirements" : "Suggest a Feature";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-stretch justify-center sm:items-center sm:p-4 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <motion.div
            className="absolute inset-0 bg-navy-950/70 backdrop-blur-md"
            onClick={handleClose}
          />

          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
            className="relative z-10 flex h-[100svh] w-full max-w-2xl flex-col overflow-hidden bg-surface shadow-lift sm:h-auto sm:max-h-[88vh] sm:rounded-[1.75rem]"
          >
            {/* header */}
            <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-4">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-600 dark:text-gold-300">
                  {success ? "All done" : `${title} · Step ${step} of 3`}
                </p>
                <h3 className="truncate font-display text-lg font-semibold text-content">
                  {success ? "Thank You" : STEPS[step - 1].title}
                </h3>
              </div>
              <button
                onClick={handleClose}
                aria-label="Close"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors hover:text-content"
              >
                <X size={18} />
              </button>
            </div>

            {/* progress */}
            {!success && (
              <div className="h-1 w-full bg-line">
                <motion.div
                  className="h-full bg-gold-sheen"
                  initial={false}
                  animate={{ width: `${(step / 3) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            )}

            {/* body */}
            <div className="relative flex-1 overflow-y-auto px-6 py-6">
              {success ? (
                <SuccessView onClose={handleClose} />
              ) : (
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div
                    key={step}
                    custom={dir}
                    initial={{ opacity: 0, x: dir * 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: dir * -40 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-5"
                  >
                    <p className="text-sm text-muted">{STEPS[step - 1].hint}</p>

                    {/* STEP 1 — About you */}
                    {step === 1 && (
                      <div className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <Field label="Name">
                            <input
                              className="input"
                              value={data.name}
                              onChange={(e) => set("name", e.target.value)}
                              placeholder=""
                            />
                          </Field>
                          <Field label="Phone / WhatsApp">
                            <input
                              className="input"
                              value={data.phone}
                              onChange={(e) => set("phone", e.target.value)}
                              placeholder=""
                              inputMode="tel"
                            />
                          </Field>
                        </div>
                        <Field label="Hostel Name" optional>
                          <input
                            className="input"
                            value={data.hostelName}
                            onChange={(e) => set("hostelName", e.target.value)}
                            placeholder=""
                          />
                        </Field>
                        <Group label="Your role">
                          <PillSelect
                            options={ROLES}
                            value={data.role}
                            onChange={(v) => set("role", v)}
                          />
                        </Group>
                      </div>
                    )}

                    {/* STEP 2 — Your hostel */}
                    {step === 2 && (
                      <div className="space-y-5">
                        <Group label="Type of hostel">
                          <PillSelect
                            options={HOSTEL_TYPES}
                            value={data.hostelType}
                            onChange={(v) => set("hostelType", v)}
                          />
                        </Group>
                        <Group label="How do you manage it today?">
                          <PillSelect
                            options={MGMT_METHODS}
                            value={data.currentMethod}
                            onChange={(v) => set("currentMethod", v)}
                          />
                        </Group>
                        <Group label="Biggest time-drains (optional, pick any)">
                          <CheckPills
                            options={CHALLENGES}
                            values={data.challenges}
                            onToggle={toggleChallenge}
                          />
                        </Group>
                      </div>
                    )}

                    {/* STEP 3 — Ideas */}
                    {step === 3 && (
                      <div className="space-y-5">
                        <Field label="What would make the perfect hostel software for you? What's missing today?">
                          <textarea
                            className="input min-h-[150px] resize-y leading-relaxed"
                            value={data.dreamFeatures}
                            onChange={(e) =>
                              set("dreamFeatures", e.target.value)
                            }
                            placeholder=""
                          />
                        </Field>
                        <Group label="Would you like to join the pilot program?">
                          <PillSelect
                            options={DEMO_OPTIONS}
                            value={data.demoInterest}
                            onChange={(v) =>
                              set("demoInterest", v as FormState["demoInterest"])
                            }
                          />
                        </Group>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            {/* footer nav */}
            {!success && (
              <div className="flex items-center justify-between gap-3 border-t border-line px-6 py-4">
                <button
                  onClick={() => (step === 1 ? handleClose() : go(step - 1))}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-muted transition-colors hover:text-content"
                >
                  <ArrowLeft size={16} />
                  {step === 1 ? "Cancel" : "Back"}
                </button>

                {step < 3 ? (
                  <button
                    onClick={() => canContinue && go(step + 1)}
                    disabled={!canContinue}
                    className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Continue
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Submit
                        <Sparkles size={16} />
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── success view ──────────────────────────────────────────── */
function SuccessView({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid min-h-[280px] place-items-center py-6 text-center"
    >
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 12, stiffness: 200 }}
          className="relative grid h-24 w-24 place-items-center rounded-full bg-gold-sheen text-navy-950 shadow-gold"
        >
          <Check size={44} strokeWidth={3} />
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-gold-400"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <h3 className="mt-7 flex items-center justify-center gap-2 font-display text-2xl font-semibold text-content">
            Thank You
            <PartyPopper size={22} className="text-gold-500" />
          </h3>
          <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-muted">
            Your suggestions will directly influence SAAHVIK. We&apos;re grateful
            you&apos;re helping us build something better.
          </p>
          <button onClick={onClose} className="btn-primary mx-auto mt-8">
            Done
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
