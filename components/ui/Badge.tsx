'use client'

import { forwardRef, HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'premium'
  size?: 'sm' | 'md' | 'lg'
  dot?: boolean
  pulse?: boolean
  children?: ReactNode
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      dot = false,
      pulse = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center gap-1.5
      font-medium rounded-full
      transition-all duration-200
    `

    const variants = {
      default: 'bg-white/10 text-slate-300 border border-white/10',
      success: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20',
      warning: 'bg-amber-500/15 text-amber-400 border border-amber-500/20',
      error: 'bg-red-500/15 text-red-400 border border-red-500/20',
      info: 'bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/20',
      premium: 'bg-gradient-to-r from-[#00f0ff]/20 to-[#a855f7]/20 text-white border border-[#00f0ff]/30',
    }

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-xs',
      lg: 'px-3 py-1.5 text-sm',
    }

    const dotColors = {
      default: 'bg-slate-400',
      success: 'bg-emerald-400',
      warning: 'bg-amber-400',
      error: 'bg-red-400',
      info: 'bg-[#00f0ff]',
      premium: 'bg-gradient-to-r from-[#00f0ff] to-[#a855f7]',
    }

    return (
      <span
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {dot && (
          <span className="relative flex h-2 w-2">
            {pulse && (
              <span
                className={cn(
                  'absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping',
                  dotColors[variant]
                )}
              />
            )}
            <span
              className={cn(
                'relative inline-flex h-2 w-2 rounded-full',
                dotColors[variant]
              )}
            />
          </span>
        )}
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export { Badge }
