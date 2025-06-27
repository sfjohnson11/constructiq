import * as React from "react"

import { Label as ShadLabel } from "@radix-ui/react-label"

export const Label = React.forwardRef<
  React.ElementRef<typeof ShadLabel>,
  React.ComponentPropsWithoutRef<typeof ShadLabel>
>(({ className, ...props }, ref) => (
  <ShadLabel
    ref={ref}
    className={className ?? "text-sm font-medium leading-none"}
    {...props}
  />
))

Label.displayName = "Label"
