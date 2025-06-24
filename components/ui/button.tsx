// components/ui/button.tsx
import { cn } from "@/lib/utils"
import { forwardRef } from "react"
import type { ButtonHTMLAttributes } from "react"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline"
  size?: "sm" | "md" | "lg"
}

const baseStyles =
  "inline-flex items-center justify-center font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

const variantStyles = {
  default: "bg-yellow-400 text-black hover:bg-yellow-300",
  destructive: "bg-red-600 text-white hover:bg-red-500",
  outline: "border border-white text-white hover:bg-white hover:text-black"
}

const sizeStyles = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg"
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"
