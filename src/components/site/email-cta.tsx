import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { buildMailto } from "@/lib/mailto";
import { cn } from "@/lib/utils";

type EmailCtaProps = Omit<React.ComponentProps<typeof Button>, "asChild" | "children"> & {
  /** Visible label; defaults to "E-Mail schreiben" / "Send an email". */
  label?: string;
  iconOnly?: boolean;
};

/** The single primary contact action used everywhere on the site: opens a pre-addressed email. */
export function EmailCta({ label, iconOnly = false, size, ...props }: EmailCtaProps) {
  const t = useTranslations("Common");
  const text = label ?? t("emailCta");
  return (
    <Button asChild size={iconOnly ? "icon" : size} {...props}>
      <a href={buildMailto(t("emailSubject"))} aria-label={`${text} (${t("emailOpensHint")})`}>
        <Mail aria-hidden className={cn(iconOnly && "size-6")} />
        {iconOnly ? null : text}
      </a>
    </Button>
  );
}
