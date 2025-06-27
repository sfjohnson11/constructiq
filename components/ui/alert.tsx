import * as React from "react"
import { AlertCircle } from "lucide-react"

export function Alert({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex items-start gap-3 p-4 border-l-4 bg-red-50 ${className}`}>{children}</div>
}

export function AlertDescription({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`text-sm text-red-700 ${className}`}>{children}</div>
}
