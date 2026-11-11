import { CalendarCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { buildMailto } from "@/lib/mailto";
import { cn } from "@/lib/utils";

type BookingCtaProps = Omit<React.ComponentProps<typeof Button>, "asChild" | "children"> & {
  /** Visible label override. */
  label?: string;
  iconOnly?: boolean;
};

/**
 * Primary CTA for booking a consultation.
 * When `siteConfig.calcomUrl` is set, opens the Cal.com booking page.
 * Otherwise falls back to a mailto: link.
 */
export function BookingCta({ label, iconOnly = false, size, className, ...props }: BookingCtaProps) {
  const t = useTranslations("Common");
  const text = label ?? t("bookingCta");
  const href = siteConfig.calcomUrl ?? buildMailto(t("emailSubject"));
  const hint = siteConfig.calcomUrl ? t("bookingOpensHint") : t("emailOpensHint");

  const isExternal = Boolean(siteConfig.calcomUrl);

  return (
    <Button asChild size={iconOnly ? "icon" : size} className={cn(className)} {...props}>
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        aria-label={`${text} (${hint})`}
      >
        <CalendarCheck aria-hidden className={cn(iconOnly && "size-6")} />
        {iconOnly ? null : text}
      </a>
    </Button>
  );
}
