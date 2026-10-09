"use client";

/**
 * Executes during HTML parsing on full page loads. On client renders (e.g. switching the
 * locale swaps the root layout) the script is inert, so React doesn't warn about it.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
