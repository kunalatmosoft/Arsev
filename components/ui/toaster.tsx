// components/ui/toaster.tsx
"use client"

import * as React from "react"
import { Toast } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-4">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          title={toast.title}
          description={toast.description}
          variant={toast.variant}
          open={toast.open}
          onOpenChange={toast.onOpenChange}
        />
      ))}
    </div>
  )
}