// File: components/ui/use-toast.ts

type ToastProps = {
  title: string
  description?: string
}

export function useToast() {
  const toast = ({ title, description }: ToastProps) => {
    // Placeholder: Replace with real toast component logic later
    console.log("TOAST:", title)
    if (description) console.log("→", description)
  }

  return {
    toast,
  }
}

