"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { X, CheckCircle, AlertCircle } from "lucide-react"

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
  const handleCancel = () => {
    if (onOpenChange) {
      onOpenChange(false)
    }
  }

  React.useEffect(() => {
    if (!open && onOpenChange) {
      onOpenChange(false)
    }
  }, [open, onOpenChange])

  if (!open) return null

  return (
    <div
      className={cn(
        "rounded-md border p-4 shadow-lg flex items-start gap-3",
        variant === "destructive" 
          ? "bg-red-500 text-white" 
          : "bg-white text-gray-900",
        "min-w-[300px] max-w-[400px]"
      )}
      {...props}
    >
      {/* Icon based on variant */}
      {variant === "destructive" ? (
        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
      ) : (
        <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
      )}

      {/* Content */}
      <div className="flex-1">
        {title && (
          <div className="font-bold mb-1">{title}</div>
        )}
        {description && (
          <div>{description}</div>
        )}
      </div>

      {/* Cancel button */}
      <button
        onClick={handleCancel}
        className={cn(
          "ml-2 p-1 rounded-full hover:bg-opacity-20",
          variant === "destructive" 
            ? "hover:bg-white hover:text-white" 
            : "hover:bg-gray-500 hover:text-gray-900"
        )}
        aria-label="Close toast"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}