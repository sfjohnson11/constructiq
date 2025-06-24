// File: components/ui/button.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg"
}

const buttonVariants = {
  default: "bg-yellow-400 text-black hover:bg-yellow-300",
  outline: "border border-yellow-400 text-yellow-400 bg-transparent hover:bg-yellow-400 hover:text-black",
  ghost: "bg-transparent hover:bg-slate-800 text-white",
  link: "underline text-yellow-300 hover:text-yellow-200",
}

const buttonSizes = {
  default: "px-6 py-3 text-base rounded-xl",
  sm: "px-4 py-2 text-sm rounded-lg",
  lg: "px-8 py-4 text-lg rounded-2xl",
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-yellow-300",
          buttonVariants[variant],
          buttonSizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"
