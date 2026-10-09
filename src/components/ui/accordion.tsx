"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Accordion as AccordionPrimitive } from "radix-ui"
import { ChevronDownIcon } from "lucide-react"

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  )
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-border", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger flex min-h-14 flex-1 items-center justify-between gap-4 rounded-lg py-4 text-left font-semibold transition-colors hover:text-heading disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
        <span
          aria-hidden
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border-strong transition-transform duration-200 group-aria-expanded/accordion-trigger:rotate-180"
        >
          <ChevronDownIcon className="size-5" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

/**
 * Always mounted so answers are part of the server-rendered HTML; collapsed panels are
 * removed from the accessibility tree and tab order via `visibility: hidden`.
 */
function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      forceMount
      className="grid grid-rows-[0fr] transition-[grid-template-rows,visibility] duration-200 ease-out data-[state=closed]:invisible data-[state=open]:grid-rows-[1fr]"
      {...props}
    >
      <div className="overflow-hidden">
        <div className={cn("pb-5", className)}>{children}</div>
      </div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
