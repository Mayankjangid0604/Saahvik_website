import { cn } from "@/lib/utils";

/** The SAAHVIK "S" monogram mark — champagne gold on deep navy. */
export function SaahvikMark({
  size = 40,
  className,
  shimmer = true,
}: {
  size?: number;
  className?: string;
  shimmer?: boolean;
}) {
  return (
    <span
      style={{ width: size, height: size }}
      className={cn(
        "relative inline-grid shrink-0 place-items-center rounded-[28%]",
        "bg-gradient-to-br from-navy-700 to-navy-950 ring-1 ring-gold-400/40",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_24px_-10px_rgba(10,26,47,0.6)]",
        className
      )}
      aria-hidden="true"
    >
      <span
        className={cn(
          "font-display font-semibold leading-none",
          shimmer ? "text-shimmer animate-shimmer" : "text-gold-300"
        )}
        style={{ fontSize: size * 0.56 }}
      >
        S
      </span>
      <span className="pointer-events-none absolute inset-0 rounded-[28%] ring-1 ring-inset ring-white/5" />
    </span>
  );
}

/** Full lockup: mark + wordmark. */
export function SaahvikLogo({
  size = 36,
  className,
  withTagline = false,
}: {
  size?: number;
  className?: string;
  withTagline?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <SaahvikMark size={size} />
      <span className="flex flex-col leading-none">
        <span
          className="font-display font-semibold tracking-[0.18em] text-content"
          style={{ fontSize: size * 0.5 }}
        >
          SAAHVIK
        </span>
        {withTagline && (
          <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.24em] text-muted">
            Smarter Hostel Management
          </span>
        )}
      </span>
    </span>
  );
}
