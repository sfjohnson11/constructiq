import { ButtonHTMLAttributes } from "react"
import clsx from "clsx"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

export const Button = ({ className = "", ...props }: ButtonProps) => (
  <button
    {...props}
    className={clsx(
      "px-4 py-2 rounded-xl font-semibold transition",
      className
    )}
  />
)
