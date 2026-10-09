import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "flex items-center gap-2.5 text-sm font-semibold tracking-[0.12em] text-muted-foreground uppercase",
        className,
      )}
    >
      <span aria-hidden className="h-0.5 w-6 rounded-full bg-accent-green" />
      {children}
    </p>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  className,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex max-w-2xl flex-col gap-4", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2
        id={id}
        tabIndex={-1}
        className="text-3xl leading-tight font-bold tracking-tight outline-none sm:text-4xl"
      >
        {title}
      </h2>
      {intro && <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">{intro}</p>}
    </div>
  );
}
