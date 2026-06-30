import { cn } from "@/lib/utils";

/**
 * The official SAAHVIK "S" monogram mark (champagne gold on deep navy),
 * rendered from the brand artwork. Transparent rounded corners let it sit on
 * any background / theme.
 */
export function SaahvikMark({
  size = 40,
  className,
  alt = "",
  priority = false,
}: {
  size?: number;
  className?: string;
  alt?: string;
  priority?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/mark.webp"
      alt={alt}
      aria-hidden={alt === "" ? true : undefined}
      width={size}
      height={size}
      style={{ width: size, height: size }}
      draggable={false}
      loading={priority ? "eager" : "lazy"}
      className={cn("inline-block shrink-0 select-none", className)}
    />
  );
}

/** Compact lockup: official mark + wordmark (live type for crisp UI chrome). */
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
      <SaahvikMark size={size} priority />
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

/**
 * Full brand lockup artwork (mark + wordmark + tagline), theme-swapped between
 * the cream and navy editions. Used as the hero centerpiece.
 */
export function SaahvikLockup({ className }: { className?: string }) {
  return (
    <span className={cn("relative block", className)}>
      {/* eslint-disable @next/next/no-img-element */}
      <img
        src="/brand/lockup-light.webp"
        alt="SAAHVIK — Smarter Hostel Management"
        draggable={false}
        className="block w-full dark:hidden"
      />
      <img
        src="/brand/lockup-dark.webp"
        alt=""
        aria-hidden
        draggable={false}
        className="hidden w-full dark:block"
      />
      {/* eslint-enable @next/next/no-img-element */}
    </span>
  );
}
