'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

// Toast types
export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
  title: string
  description?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface ToastContextType {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
  success: (title: string, description?: string) => void
  error: (title: string, description?: string) => void
  warning: (title: string, description?: string) => void
  info: (title: string, description?: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = { ...toast, id }

    setToasts((prev) => [...prev, newToast])

    // Auto-remove after duration
    const duration = toast.duration ?? 5000
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, duration)
    }
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  // Convenience methods
  const success = useCallback(
    (title: string, description?: string) => {
      addToast({ type: 'success', title, description })
    },
    [addToast]
  )

  const error = useCallback(
    (title: string, description?: string) => {
      addToast({ type: 'error', title, description })
    },
    [addToast]
  )

  const warning = useCallback(
    (title: string, description?: string) => {
      addToast({ type: 'warning', title, description })
    },
    [addToast]
  )

  const info = useCallback(
    (title: string, description?: string) => {
      addToast({ type: 'info', title, description })
    },
    [addToast]
  )

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, removeToast, success, error, warning, info }}
    >
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  )
}

// Toast Container
function ToastContainer({
  toasts,
  removeToast,
}: {
  toasts: Toast[]
  removeToast: (id: string) => void
}) {
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-md w-full pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  )
}

// Individual Toast
function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  }

  const styles = {
    success: {
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      icon: 'text-emerald-400',
      progress: 'bg-emerald-500',
    },
    error: {
      bg: 'bg-red-500/10 border-red-500/20',
      icon: 'text-red-400',
      progress: 'bg-red-500',
    },
    warning: {
      bg: 'bg-amber-500/10 border-amber-500/20',
      icon: 'text-amber-400',
      progress: 'bg-amber-500',
    },
    info: {
      bg: 'bg-[#00f0ff]/10 border-[#00f0ff]/20',
      icon: 'text-[#00f0ff]',
      progress: 'bg-[#00f0ff]',
    },
  }

  const Icon = icons[toast.type]
  const style = styles[toast.type]

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className={cn(
        'relative pointer-events-auto',
        'bg-[#0f1629]/95 backdrop-blur-xl',
        'border rounded-xl overflow-hidden',
        'shadow-lg shadow-black/20',
        style.bg
      )}
    >
      <div className="flex items-start gap-3 p-4">
        {/* Icon */}
        <div className={cn('flex-shrink-0 mt-0.5', style.icon)}>
          <Icon className="w-5 h-5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white">{toast.title}</p>
          {toast.description && (
            <p className="text-sm text-slate-400 mt-1">{toast.description}</p>
          )}
          {toast.action && (
            <button
              onClick={toast.action.onClick}
              className="text-sm font-medium text-[#00f0ff] hover:text-[#00f0ff]/80 mt-2 transition-colors"
            >
              {toast.action.label}
            </button>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="flex-shrink-0 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Bar */}
      {toast.duration !== 0 && (
        <motion.div
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: (toast.duration ?? 5000) / 1000, ease: 'linear' }}
          className={cn('h-0.5', style.progress)}
        />
      )}
    </motion.div>
  )
}

export { ToastContainer, ToastItem }
