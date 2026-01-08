'use client'

import { forwardRef, InputHTMLAttributes, ReactNode, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, AlertCircle, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  helperText?: string
  error?: string
  success?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'filled' | 'ghost'
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      helperText,
      error,
      success,
      leftIcon,
      rightIcon,
      size = 'md',
      variant = 'default',
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
    const isPassword = type === 'password'
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

    const baseStyles = `
      w-full rounded-xl
      transition-all duration-200 ease-out
      outline-none
      placeholder:text-slate-500
      disabled:opacity-50 disabled:cursor-not-allowed
    `

    const variants = {
      default: `
        bg-[#0f1629] border
        ${error
          ? 'border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
          : success
            ? 'border-emerald-500/50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
            : 'border-white/[0.08] hover:border-white/[0.15] focus:border-[#00f0ff] focus:ring-2 focus:ring-[#00f0ff]/20'
        }
      `,
      filled: `
        bg-white/5 border-transparent
        hover:bg-white/[0.07]
        focus:bg-white/[0.07] focus:ring-2 focus:ring-[#00f0ff]/20
      `,
      ghost: `
        bg-transparent border-b border-white/[0.1] rounded-none
        hover:border-white/[0.2]
        focus:border-[#00f0ff]
      `,
    }

    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-5 py-4 text-lg',
    }

    const iconSizes = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    }

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'block text-sm font-medium mb-2 transition-colors',
              error ? 'text-red-400' : isFocused ? 'text-[#00f0ff]' : 'text-slate-300'
            )}
          >
            {label}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className={cn(
              'absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none transition-colors',
              isFocused && 'text-[#00f0ff]'
            )}>
              {leftIcon}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            disabled={disabled}
            className={cn(
              baseStyles,
              variants[variant],
              sizes[size],
              leftIcon && 'pl-12',
              (rightIcon || isPassword || error || success) && 'pr-12',
              'text-white',
              className
            )}
            onFocus={(e) => {
              setIsFocused(true)
              props.onFocus?.(e)
            }}
            onBlur={(e) => {
              setIsFocused(false)
              props.onBlur?.(e)
            }}
            {...props}
          />

          {/* Right Section */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {/* Status Icons */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <AlertCircle className={cn(iconSizes[size], 'text-red-400')} />
                </motion.div>
              )}
              {success && !error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Check className={cn(iconSizes[size], 'text-emerald-400')} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Password Toggle */}
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-white transition-colors focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className={iconSizes[size]} />
                ) : (
                  <Eye className={iconSizes[size]} />
                )}
              </button>
            )}

            {/* Custom Right Icon */}
            {!isPassword && !error && !success && rightIcon && (
              <div className="text-slate-400">{rightIcon}</div>
            )}
          </div>
        </div>

        {/* Helper Text / Error */}
        <AnimatePresence mode="wait">
          {(error || helperText) && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className={cn(
                'text-sm mt-2',
                error ? 'text-red-400' : 'text-slate-400'
              )}
            >
              {error || helperText}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
