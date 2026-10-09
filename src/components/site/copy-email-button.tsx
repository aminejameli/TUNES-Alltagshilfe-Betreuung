"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type Status = "idle" | "copied" | "failed";

export function CopyEmailButton({ email, className }: { email: string; className?: string }) {
  const t = useTranslations("Common");
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 4000);
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className={cn(
          "inline-flex min-h-11 items-center gap-2 rounded-[0.625rem] border border-white/40 px-4 text-base font-semibold text-band-foreground transition-colors hover:border-white hover:bg-white/10 focus-visible:outline-band-ring",
          className,
        )}
      >
        {status === "copied" ? <Check aria-hidden className="size-5" /> : <Copy aria-hidden className="size-5" />}
        {status === "copied" ? t("copied") : t("copyEmail")}
      </button>
      <p role="status" aria-live="polite" className="sr-only">
        {status === "copied" ? t("copiedAnnouncement") : status === "failed" ? t("copyFailed") : ""}
      </p>
      {status === "failed" && (
        <p className="w-full text-sm text-band-muted">{t("copyFailed")}</p>
      )}
    </>
  );
}
