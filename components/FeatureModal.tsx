"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  Reorder,
  useDragControls,
} from "framer-motion";
import {
  X,
  ArrowLeft,
  ArrowRight,
  Check,
  GripVertical,
  Sparkles,
  Loader2,
  PartyPopper,
} from "lucide-react";
import { useModal } from "./ModalProvider";
import { SaahvikMark } from "./SaahvikLogo";
import { cn } from "@/lib/utils";
import {
  ROLES,
  HOSTEL_TYPES,
  MGMT_METHODS,
  CHALLENGES,
  PRIORITY_MODULES,
  DEMO_OPTIONS,
} from "@/lib/data";
import { submitFeatureSuggestion, type FeatureSuggestionPayload } from "@/lib/api";

const STEPS = [
  { id: 1, title: "Basic Details", hint: "Tell us about you" },
  { id: 2, title: "Hostel Details", hint: "Your hostel at a glance" },
  { id: 3, title: "Challenges", hint: "Where it hurts most" },
  { id: 4, title: "Dream Features", hint: "Your perfect software" },
  { id: 5, title: "Missing Features", hint: "What's never existed" },
  { id: 6, title: "Priority", hint: "Rank what matters" },
  { id: 7, title: "Demo Interest", hint: "Join the pilot" },
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
  priority: PRIORITY_MODULES,
  demoInterest: "",
};

/* ── small field primitives ───────────────────────────────── */
/** For a single native control — uses a real <label> for proper association. */
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

/**
 * For groups of controls (pills / checkboxes / options). A <label> must not
 * wrap multiple labelable elements, so we use role="group" + aria-label and a
 * plain text label instead — this keeps each button's own accessible name.
 */
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
            "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
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
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
              active
                ? "border-gold-400 bg-gold-400/15 text-gold-700 dark:text-gold-200"
                : "border-line bg-bg/40 text-muted hover:border-gold-400/50 hover:text-content"
            )}
          >
            <span
              className={cn(
                "grid h-4 w-4 place-items-center rounded-[5px] border transition-colors",
                active
                  ? "border-gold-500 bg-gold-sheen text-navy-950"
                  : "border-muted/40"
              )}
            >
              {active && <Check size={11} strokeWidth={3.5} />}
            </span>
            {o}
          </button>
        );
      })}
    </div>
  );
}

function PriorityItem({ item, index }: { item: string; index: number }) {
  const controls = useDragControls();
  return (
    <Reorder.Item
      value={item}
      dragListener={false}
      dragControls={controls}
      className="flex items-center gap-3 rounded-2xl border border-line bg-surface/80 p-3.5 shadow-soft backdrop-blur-sm"
      whileDrag={{ scale: 1.02, boxShadow: "0 12px 40px -12px rgba(10,26,47,0.35)" }}
    >
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold-400/15 text-sm font-bold text-gold-700 dark:text-gold-200">
        {index + 1}
      </span>
      <span className="flex-1 text-[15px] font-medium text-content">{item}</span>
      <button
        type="button"
        onPointerDown={(e) => controls.start(e)}
        className="cursor-grab touch-none text-muted transition-colors hover:text-gold-500 active:cursor-grabbing"
        aria-label={`Reorder ${item}`}
      >
        <GripVertical size={18} />
      </button>
    </Reorder.Item>
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

  // reset everything when fully closed
  function handleClose() {
    close();
    // delay reset until exit animation finishes
    setTimeout(() => {
      setStep(1);
      setDir(1);
      setData(EMPTY);
      setSuccess(false);
      setSubmitting(false);
    }, 350);
  }

  // body scroll lock + escape to close
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
    switch (step) {
      case 1:
        return (
          data.name.trim() &&
          data.hostelName.trim() &&
          data.role &&
          data.city.trim() &&
          data.phone.trim()
        );
      case 2:
        return data.hostelType && data.currentMethod;
      case 7:
        return data.demoInterest;
      default:
        return true;
    }
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
          {/* backdrop */}
          <motion.div
            className="absolute inset-0 bg-navy-950/70 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* panel */}
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
            className="relative z-10 flex h-[100svh] w-full max-w-3xl flex-col overflow-hidden bg-surface shadow-lift sm:h-auto sm:max-h-[90vh] sm:rounded-[2rem] md:flex-row"
          >
            {/* ── left rail (desktop) ── */}
            <aside className="relative hidden w-64 shrink-0 flex-col gap-1 overflow-hidden bg-gradient-to-b from-navy-900 to-navy-950 p-6 md:flex">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold-400/20 blur-3xl" />
              <div className="relative mb-6 flex items-center gap-3">
                <SaahvikMark size={36} />
                <span className="font-display text-sm font-semibold tracking-[0.18em] text-ivory">
                  SAAHVIK
                </span>
              </div>
              <p className="relative mb-6 text-xs leading-relaxed text-ivory/60">
                {title} — a quick guided flow. Your input shapes the roadmap.
              </p>
              <ol className="relative space-y-1">
                {STEPS.map((s) => {
                  const state =
                    success || s.id < step
                      ? "done"
                      : s.id === step
                      ? "active"
                      : "todo";
                  return (
                    <li
                      key={s.id}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-2 transition-colors",
                        state === "active" && "bg-ivory/10"
                      )}
                    >
                      <span
                        className={cn(
                          "grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-bold transition-colors",
                          state === "done" &&
                            "bg-gold-sheen text-navy-950",
                          state === "active" &&
                            "bg-ivory text-navy-950",
                          state === "todo" && "bg-ivory/10 text-ivory/50"
                        )}
                      >
                        {state === "done" ? <Check size={12} strokeWidth={3} /> : s.id}
                      </span>
                      <span
                        className={cn(
                          "text-sm font-medium transition-colors",
                          state === "todo" ? "text-ivory/40" : "text-ivory"
                        )}
                      >
                        {s.title}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </aside>

            {/* ── right content ── */}
            <div className="flex min-h-0 flex-1 flex-col">
              {/* header */}
              <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-4">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-600 dark:text-gold-300">
                    {success
                      ? "All done"
                      : `Step ${step} of ${STEPS.length}`}
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

              {/* mobile progress bar */}
              {!success && (
                <div className="h-1 w-full bg-line md:hidden">
                  <motion.div
                    className="h-full bg-gold-sheen"
                    initial={false}
                    animate={{ width: `${(step / STEPS.length) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              )}

              {/* body */}
              <div className="relative flex-1 overflow-y-auto px-6 py-7">
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

                      {/* STEP 1 */}
                      {step === 1 && (
                        <div className="grid gap-4 sm:grid-cols-2">
                          <Field label="Name">
                            <input
                              className="input"
                              value={data.name}
                              onChange={(e) => set("name", e.target.value)}
                              placeholder="Your full name"
                            />
                          </Field>
                          <Field label="Hostel Name">
                            <input
                              className="input"
                              value={data.hostelName}
                              onChange={(e) => set("hostelName", e.target.value)}
                              placeholder="Hostel / organization"
                            />
                          </Field>
                          <div className="sm:col-span-2">
                            <Group label="Role">
                              <PillSelect
                                options={ROLES}
                                value={data.role}
                                onChange={(v) => set("role", v)}
                              />
                            </Group>
                          </div>
                          <Field label="City">
                            <input
                              className="input"
                              value={data.city}
                              onChange={(e) => set("city", e.target.value)}
                              placeholder="City"
                            />
                          </Field>
                          <Field label="Phone">
                            <input
                              className="input"
                              value={data.phone}
                              onChange={(e) => set("phone", e.target.value)}
                              placeholder="Phone number"
                              inputMode="tel"
                            />
                          </Field>
                          <div className="sm:col-span-2">
                            <Field label="Email" optional>
                              <input
                                className="input"
                                value={data.email}
                                onChange={(e) => set("email", e.target.value)}
                                placeholder="you@hostel.com"
                                inputMode="email"
                              />
                            </Field>
                          </div>
                        </div>
                      )}

                      {/* STEP 2 */}
                      {step === 2 && (
                        <div className="space-y-5">
                          <Group label="Hostel Type">
                            <PillSelect
                              options={HOSTEL_TYPES}
                              value={data.hostelType}
                              onChange={(v) => set("hostelType", v)}
                            />
                          </Group>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="Number of Students" optional>
                              <input
                                className="input"
                                value={data.students}
                                onChange={(e) => set("students", e.target.value)}
                                placeholder="e.g. 480"
                                inputMode="numeric"
                              />
                            </Field>
                            <Field label="Number of Rooms" optional>
                              <input
                                className="input"
                                value={data.rooms}
                                onChange={(e) => set("rooms", e.target.value)}
                                placeholder="e.g. 120"
                                inputMode="numeric"
                              />
                            </Field>
                          </div>
                          <Group label="Current Management Method">
                            <PillSelect
                              options={MGMT_METHODS}
                              value={data.currentMethod}
                              onChange={(v) => set("currentMethod", v)}
                            />
                          </Group>
                        </div>
                      )}

                      {/* STEP 3 */}
                      {step === 3 && (
                        <Group label="Which areas are most challenging? Select all that apply.">
                          <CheckPills
                            options={CHALLENGES}
                            values={data.challenges}
                            onToggle={toggleChallenge}
                          />
                        </Group>
                      )}

                      {/* STEP 4 */}
                      {step === 4 && (
                        <Field label="If you could design the perfect hostel management software, what would it include?">
                          <textarea
                            className="input min-h-[180px] resize-y leading-relaxed"
                            value={data.dreamFeatures}
                            onChange={(e) => set("dreamFeatures", e.target.value)}
                            placeholder="Describe your dream platform — workflows, automations, anything…"
                          />
                        </Field>
                      )}

                      {/* STEP 5 */}
                      {step === 5 && (
                        <Field label="What feature have you always wished existed in hostel software?">
                          <textarea
                            className="input min-h-[180px] resize-y leading-relaxed"
                            value={data.missingFeatures}
                            onChange={(e) =>
                              set("missingFeatures", e.target.value)
                            }
                            placeholder="The thing no software has ever done for you…"
                          />
                        </Field>
                      )}

                      {/* STEP 6 — drag & drop ranking */}
                      {step === 6 && (
                        <div>
                          <p className="label">
                            Drag to rank modules by importance
                          </p>
                          <p className="mb-4 text-sm text-muted">
                            Most important at the top.
                          </p>
                          <Reorder.Group
                            axis="y"
                            values={data.priority}
                            onReorder={(v) => set("priority", v)}
                            className="space-y-2.5"
                          >
                            {data.priority.map((item, i) => (
                              <PriorityItem key={item} item={item} index={i} />
                            ))}
                          </Reorder.Group>
                        </div>
                      )}

                      {/* STEP 7 */}
                      {step === 7 && (
                        <Group label="Would you like to join the pilot program?">
                          <div className="mt-1 grid gap-3 sm:grid-cols-3">
                            {DEMO_OPTIONS.map((o) => (
                              <button
                                key={o}
                                type="button"
                                onClick={() => set("demoInterest", o)}
                                className={cn(
                                  "rounded-2xl border px-4 py-5 text-center text-sm font-semibold transition-all duration-200",
                                  data.demoInterest === o
                                    ? "border-gold-400 bg-gold-400/15 text-gold-700 shadow-soft dark:text-gold-200"
                                    : "border-line bg-bg/40 text-muted hover:border-gold-400/50 hover:text-content"
                                )}
                              >
                                {o}
                              </button>
                            ))}
                          </div>
                        </Group>
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

                  {step < STEPS.length ? (
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
                      disabled={!canContinue || submitting}
                      className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Submitting…
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
            </div>
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
      className="grid min-h-[320px] place-items-center py-6 text-center"
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
