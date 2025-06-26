// components/ui/button.tsx
import React from "react"
import clsx from "clsx"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary"
  size?: "sm" | "md" | "lg"
}

const variantStyles = {
  primary: "bg-yellow-400 text-black hover:bg-yellow-300",
  secondary: "bg-slate-700 text-white hover:bg-slate-600",
}

const sizeStyles = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2",
  lg: "px-6 py-3 text-lg",
}

export const Button = ({
  variant = "primary",
  size = "md",
  className = "", // <- 👈 Default to empty string
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        "rounded-xl font-semibold transition-all",
        variantStyles[variant],
        sizeStyles[size],
        className // <- 👈 Now always a string
      )}
      {...props}
    />
  )
}
