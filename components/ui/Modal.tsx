'use client'

import { forwardRef, ReactNode, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createPortal } from 'react-dom'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children?: ReactNode
  title?: string
  description?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  showCloseButton?: boolean
  closeOnBackdrop?: boolean
  closeOnEscape?: boolean
  className?: string
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      children,
      title,
      description,
      size = 'md',
      showCloseButton = true,
      closeOnBackdrop = true,
      closeOnEscape = true,
      className,
    },
    ref
  ) => {
    // Handle escape key
    const handleEscape = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === 'Escape' && closeOnEscape) {
          onClose()
        }
      },
      [onClose, closeOnEscape]
    )

    useEffect(() => {
      if (isOpen) {
        document.addEventListener('keydown', handleEscape)
        document.body.style.overflow = 'hidden'
      }
      return () => {
        document.removeEventListener('keydown', handleEscape)
        document.body.style.overflow = ''
      }
    }, [isOpen, handleEscape])

    const sizes = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-2xl',
      full: 'max-w-[90vw] max-h-[90vh]',
    }

    const modalContent = (
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={closeOnBackdrop ? onClose : undefined}
            />

            {/* Modal */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{
                type: 'spring',
                damping: 25,
                stiffness: 300,
              }}
              className={cn(
                'relative w-full',
                sizes[size],
                'bg-[#0f1629] border border-white/10',
                'rounded-2xl shadow-2xl',
                'max-h-[85vh] overflow-hidden',
                className
              )}
            >
              {/* Header */}
              {(title || showCloseButton) && (
                <div className="flex items-start justify-between p-6 border-b border-white/5">
                  <div>
                    {title && (
                      <h2 className="text-xl font-semibold text-white">{title}</h2>
                    )}
                    {description && (
                      <p className="text-sm text-slate-400 mt-1">{description}</p>
                    )}
                  </div>
                  {showCloseButton && (
                    <button
                      onClick={onClose}
                      className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors -mr-2 -mt-1"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(85vh-140px)]">
                {children}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    )

    // Use portal to render at root level
    if (typeof window === 'undefined') return null
    return createPortal(modalContent, document.body)
  }
)

Modal.displayName = 'Modal'

// Modal Footer component for actions
export interface ModalFooterProps {
  children?: ReactNode
  className?: string
}

const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ children, className }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-end gap-3 mt-6 pt-4 border-t border-white/5',
        className
      )}
    >
      {children}
    </div>
  )
)
ModalFooter.displayName = 'ModalFooter'

export { Modal, ModalFooter }
