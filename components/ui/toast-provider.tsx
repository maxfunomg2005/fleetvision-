"use client"

import { useToast } from "@/hooks/use-toast"
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast"
import { CheckCircle, AlertCircle, Info, X } from "lucide-react"

export function ToastNotification() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, type, ...props }) => {
        const Icon = type === "success" ? CheckCircle : type === "error" ? AlertCircle : Info

        const colorClass = type === "success" ? "text-emerald-500" : type === "error" ? "text-red-500" : "text-blue-500"

        return (
          <Toast key={id} {...props} className="gradient-border-glow">
            <div className="flex items-start gap-2">
              <Icon className={`h-5 w-5 ${colorClass}`} />
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && <ToastDescription>{description}</ToastDescription>}
              </div>
            </div>
            {action}
            <ToastClose>
              <X className="h-4 w-4" />
            </ToastClose>
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
