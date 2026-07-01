import { cn } from "@/lib/utils";

/** Wordmark logo as live type — for compact UI chrome (nav, footer, rails). */
export function SaahvikLogo({
  size = 20,
  className,
  withTagline = false,
}: {
  size?: number;
  className?: string;
  withTagline?: boolean;
}) {
  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span
        className="font-display font-semibold tracking-[0.2em] text-content"
        style={{ fontSize: size }}
      >
        SAAHVIK
      </span>
      {withTagline && (
        <span className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.24em] text-muted">
          Smarter Hostel Management
        </span>
      )}
    </span>
  );
}

/**
 * Full brand wordmark artwork (name + flourishes + tagline), theme-swapped
 * between the cream and navy editions. Used as the hero centerpiece.
 *
 * A soft radial mask fades the plaque edges so the textured background of the
 * image melts into the matching page background — no visible rectangle.
 */
export function SaahvikWordmark({ className }: { className?: string }) {
  const fadeMask =
    "radial-gradient(ellipse 78% 72% at 50% 50%, #000 55%, transparent 100%)";
  const style: React.CSSProperties = {
    WebkitMaskImage: fadeMask,
    maskImage: fadeMask,
  };
  return (
    <span className={cn("relative block", className)}>
      {/* eslint-disable @next/next/no-img-element */}
      <img
        src="/brand/wordmark-light.webp"
        alt="SAAHVIK — Smarter Hostel Management"
        draggable={false}
        style={style}
        className="block w-full dark:hidden"
      />
      <img
        src="/brand/wordmark-dark.webp"
        alt=""
        aria-hidden
        draggable={false}
        style={style}
        className="hidden w-full dark:block"
      />
      {/* eslint-enable @next/next/no-img-element */}
    </span>
  );
}
