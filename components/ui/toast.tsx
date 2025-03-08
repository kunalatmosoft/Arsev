"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ToastProps {
  id?: string
  title?: React.ReactNode
  description?: React.ReactNode
  variant?: "default" | "destructive"
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export type ToastActionElement = React.ReactElement<{
  onClick?: (event: React.MouseEvent) => void
}>

export function Toast({ 
  title, 
  description, 
  variant = "default", 
  open = true, 
  onOpenChange,
  ...props 
}: ToastProps) {
  React.useEffect(() => {
    if (!open && onOpenChange) {
      onOpenChange(false)
    }
  }, [open, onOpenChange])

  if (!open) return null

  return (
    <div
      className={cn(
        "rounded-md border p-4 shadow-lg",
        variant === "destructive" 
          ? "bg-red-500 text-white" 
          : "bg-white text-gray-900",
        "min-w-[300px] max-w-[400px]"
      )}
      {...props}
    >
      {title && (
        <div className="font-bold mb-1">{title}</div>
      )}
      {description && (
        <div>{description}</div>
      )}
    </div>
  )
}