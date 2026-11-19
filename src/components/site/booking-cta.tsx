import { CalendarCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BookingCtaProps = Omit<React.ComponentProps<typeof Button>, "asChild" | "children"> & {
  /** Visible label override. */
  label?: string;
  iconOnly?: boolean;
};

/**
 * Primary CTA for booking a consultation. Leads to the on-site booking page (/termin),
 * where the Cal.com booker is embedded so conversions can be measured on our own domain.
 */
export function BookingCta({ label, iconOnly = false, size, className, ...props }: BookingCtaProps) {
  const t = useTranslations("Common");
  const text = label ?? t("bookingCta");

  return (
    <Button asChild size={iconOnly ? "icon" : size} className={cn(className)} {...props}>
      <Link href="/termin" aria-label={iconOnly ? text : undefined}>
        <CalendarCheck aria-hidden className={cn(iconOnly && "size-6")} />
        {iconOnly ? null : text}
      </Link>
    </Button>
  );
}
