'use client'

import { forwardRef, HTMLAttributes, ReactNode } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  variant?: 'glass' | 'solid' | 'outline' | 'gradient'
  hover?: 'lift' | 'glow' | 'scale' | 'border' | 'none'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  children?: ReactNode
  as?: 'div' | 'article' | 'section'
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'glass',
      hover = 'lift',
      padding = 'md',
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      relative rounded-2xl
      transition-all duration-300 ease-out
    `

    const variants = {
      glass: `
        bg-[rgba(15,22,41,0.7)] backdrop-blur-xl
        border border-white/[0.08]
      `,
      solid: `
        bg-[#0f1629]
        border border-white/[0.05]
      `,
      outline: `
        bg-transparent
        border border-white/[0.1]
      `,
      gradient: `
        bg-gradient-to-br from-[#00f0ff]/10 via-[#a855f7]/10 to-[#ff00ff]/10
        border border-white/[0.1]
        backdrop-blur-xl
      `,
    }

    const hovers = {
      lift: `
        hover:transform hover:-translate-y-1
        hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]
        hover:border-white/[0.15]
      `,
      glow: `
        hover:border-[#00f0ff]/30
        hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]
      `,
      scale: `
        hover:scale-[1.02]
      `,
      border: `
        hover:border-[#00f0ff]/50
      `,
      none: '',
    }

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-10',
    }

    return (
      <motion.div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          hovers[hover],
          paddings[padding],
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Card.displayName = 'Card'

// Card Header
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mb-4', className)}
      {...props}
    >
      {children}
    </div>
  )
)
CardHeader.displayName = 'CardHeader'

// Card Title
export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, children, as: Component = 'h3', ...props }, ref) => (
    <Component
      ref={ref}
      className={cn('text-xl font-semibold text-white', className)}
      {...props}
    >
      {children}
    </Component>
  )
)
CardTitle.displayName = 'CardTitle'

// Card Description
export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode
}

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-slate-400 mt-1', className)}
      {...props}
    >
      {children}
    </p>
  )
)
CardDescription.displayName = 'CardDescription'

// Card Content
export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props}>
      {children}
    </div>
  )
)
CardContent.displayName = 'CardContent'

// Card Footer
export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mt-4 pt-4 border-t border-white/[0.05]', className)}
      {...props}
    >
      {children}
    </div>
  )
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
