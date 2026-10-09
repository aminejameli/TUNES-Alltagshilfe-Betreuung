import { cn } from "@/lib/utils";
import { LOCKUP, MARK } from "./logo-paths";

type LogoProps = {
  className?: string;
  /** Accessible name. Omit when the logo sits inside an already-labelled link. */
  title?: string;
  /** `brand`: themed ink + green heart. `mono`: single colour from `currentColor` (e.g. white on blue). */
  variant?: "brand" | "mono";
};

function a11yProps(title?: string) {
  return title ? { role: "img" as const, "aria-label": title } : { "aria-hidden": true as const };
}

/** Primary lockup: house-and-heart mark with the TUNES wordmark and descriptor. */
export function Logo({ className, title, variant = "brand" }: LogoProps) {
  return (
    <svg
      viewBox={LOCKUP.viewBox}
      width={LOCKUP.width}
      height={LOCKUP.height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-auto", variant === "brand" && "text-logo-ink", className)}
      focusable="false"
      {...a11yProps(title)}
    >
      <path
        d={LOCKUP.house}
        stroke="currentColor"
        strokeWidth={LOCKUP.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={LOCKUP.heart}
        className={variant === "brand" ? "fill-logo-heart" : undefined}
        fill={variant === "mono" ? "currentColor" : undefined}
      />
      <path d={LOCKUP.wordmark} fill="currentColor" />
      <path d={LOCKUP.descriptor} fill="currentColor" />
    </svg>
  );
}

/** House-and-heart mark on its own, for illustrations and small spaces. */
export function LogoMark({ className, title, variant = "brand" }: LogoProps) {
  return (
    <svg
      viewBox={MARK.viewBox}
      width={MARK.width}
      height={MARK.height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-auto", variant === "brand" && "text-logo-ink", className)}
      focusable="false"
      {...a11yProps(title)}
    >
      <path
        d={MARK.house}
        stroke="currentColor"
        strokeWidth={MARK.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={MARK.heart}
        className={variant === "brand" ? "fill-logo-heart" : undefined}
        fill={variant === "mono" ? "currentColor" : undefined}
      />
    </svg>
  );
}
