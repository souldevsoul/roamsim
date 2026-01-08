'use client'

import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isLoading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  children?: ReactNode
  fullWidth?: boolean
  glow?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      fullWidth = false,
      glow = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      relative inline-flex items-center justify-center gap-2
      font-semibold tracking-wide rounded-xl
      transition-all duration-300 ease-out
      disabled:opacity-50 disabled:cursor-not-allowed
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#030712]
      overflow-hidden
    `

    const variants = {
      primary: `
        bg-[#00f0ff] text-[#030712]
        hover:shadow-[0_0_30px_rgba(0,240,255,0.5),0_0_60px_rgba(0,240,255,0.3)]
        hover:scale-[1.02]
        active:scale-[0.98]
        focus:ring-[#00f0ff]
      `,
      secondary: `
        bg-transparent text-white
        border border-white/10 hover:border-[#00f0ff]/50
        hover:bg-[#00f0ff]/10
        hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]
        active:scale-[0.98]
        focus:ring-[#00f0ff]/50
      `,
      ghost: `
        bg-transparent text-slate-300
        hover:text-white hover:bg-white/5
        active:scale-[0.98]
        focus:ring-white/20
      `,
      danger: `
        bg-red-500/10 text-red-400 border border-red-500/20
        hover:bg-red-500/20 hover:border-red-500/40
        hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]
        active:scale-[0.98]
        focus:ring-red-500/50
      `,
      success: `
        bg-emerald-500/10 text-emerald-400 border border-emerald-500/20
        hover:bg-emerald-500/20 hover:border-emerald-500/40
        hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]
        active:scale-[0.98]
        focus:ring-emerald-500/50
      `,
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
      xl: 'px-10 py-5 text-lg',
    }

    return (
      <motion.button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          glow && variant === 'primary' && 'shadow-[0_0_20px_rgba(0,240,255,0.3)]',
          className
        )}
        disabled={disabled || isLoading}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
        {...props}
      >
        {/* Shine effect for primary */}
        {variant === 'primary' && (
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
        )}

        {/* Content */}
        <span className="relative flex items-center gap-2">
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            leftIcon
          )}
          {children}
          {!isLoading && rightIcon}
        </span>
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
