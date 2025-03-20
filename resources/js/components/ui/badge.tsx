import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-auto",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        red:
          "border-red-600 bg-red-600/15 text-red-600 [a&]:hover:bg-red-600/25",
        orange:
          "border-orange-600 bg-orange-600/15 text-orange-600 [a&]:hover:bg-orange-600/25",
        yellow:
          "border-yellow-600 bg-yellow-600/15 text-yellow-600 [a&]:hover:bg-yellow-600/25",
        green:
          "border-lime-600 bg-lime-600/15 text-lime-600 [a&]:hover:bg-lime-600/25",
        blue:
          "border-cyan-600 bg-cyan-600/15 text-cyan-600 [a&]:hover:bg-cyan-600/25",
        purple:
          "border-purple-600 bg-purple-600/15 text-purple-600 [a&]:hover:bg-purple-600/25",
        pink:
          "border-pink-600 bg-pink-600/15 text-pink-600 [a&]:hover:bg-pink-600/25",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
