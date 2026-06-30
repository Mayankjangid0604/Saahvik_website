import { cn } from "@/lib/utils";

/**
 * Ambient luxury backdrop — animated gold/navy gradient blooms,
 * floating orbs and a faint grid. Pure CSS, no JS cost.
 */
export function Aurora({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "soft";
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      {/* animated gradient bloom */}
      <div
        className="absolute -left-1/4 top-[-20%] h-[60vmax] w-[60vmax] rounded-full opacity-[0.5] blur-3xl animate-gradient-pan"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(203,163,94,0.30), transparent 60%)",
        }}
      />
      <div
        className="absolute -right-1/4 top-[10%] h-[55vmax] w-[55vmax] rounded-full opacity-40 blur-3xl animate-float-slow"
        style={{
          background:
            "radial-gradient(circle at 60% 40%, rgba(33,60,102,0.45), transparent 62%)",
        }}
      />
      {variant === "default" && (
        <div
          className="absolute bottom-[-25%] left-1/3 h-[50vmax] w-[50vmax] rounded-full opacity-30 blur-3xl animate-float"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(226,196,133,0.22), transparent 60%)",
          }}
        />
      )}

      {/* faint dotted grid */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(rgb(var(--content) / 0.5) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black, transparent 75%)",
        }}
      />
    </div>
  );
}

/** A few slow-floating decorative gold dots/rings. */
export function FloatingDecor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <span className="absolute left-[8%] top-[22%] h-2.5 w-2.5 rounded-full bg-gold-400/70 animate-float" />
      <span className="absolute right-[12%] top-[30%] h-1.5 w-1.5 rounded-full bg-gold-300/80 animate-float-slow" />
      <span className="absolute left-[18%] bottom-[18%] h-2 w-2 rounded-full bg-gold-500/60 animate-float-slow" />
      <span className="absolute right-[22%] bottom-[26%] h-24 w-24 rounded-full border border-gold-400/20 animate-float" />
      <span className="absolute left-[6%] top-[58%] h-16 w-16 rounded-full border border-gold-400/15 animate-float-slow" />
    </div>
  );
}
