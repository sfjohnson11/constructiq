// File: components/ui/use-toast.ts
import { useToast as useRadixToast } from "@radix-ui/react-toast"

export function useToast() {
  const { open, onOpenChange } = useRadixToast()

  const toast = ({ title, description }: { title: string; description?: string }) => {
    open && onOpenChange(true)
    // This is a stub — you'll want to connect this to a real toast component
    console.log("TOAST:", title, description)
  }

  return {
    toast,
  }
}
