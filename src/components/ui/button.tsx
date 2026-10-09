import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-[0.625rem] border border-transparent bg-clip-padding font-semibold whitespace-nowrap transition-colors select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover",
        outline:
          "border-border-strong bg-surface text-heading hover:border-heading/40 hover:bg-surface-tint",
        secondary: "bg-surface-tint text-heading hover:bg-surface-tint/70",
        ghost: "text-heading hover:bg-surface-tint",
        band: "bg-white text-[#174b70] hover:bg-[#e6eef4] focus-visible:outline-band-ring",
        link: "text-heading underline underline-offset-4 hover:decoration-2",
      },
      size: {
        default: "min-h-11 gap-2 px-5 py-2 text-base",
        sm: "min-h-10 gap-1.5 px-3.5 text-sm",
        lg: "min-h-13 gap-2.5 px-7 py-3 text-lg",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
