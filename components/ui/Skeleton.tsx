'use client'

import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'rectangle' | 'circle' | 'text'
  width?: string | number
  height?: string | number
  lines?: number
  animate?: boolean
}

function Skeleton({
  className,
  variant = 'rectangle',
  width,
  height,
  lines = 1,
  animate = true,
  ...props
}: SkeletonProps) {
  const baseStyles = `
    bg-gradient-to-r from-white/5 via-white/10 to-white/5
    bg-[length:200%_100%]
    ${animate ? 'animate-shimmer' : ''}
  `

  const variants = {
    rectangle: 'rounded-lg',
    circle: 'rounded-full',
    text: 'rounded h-4',
  }

  if (variant === 'text' && lines > 1) {
    return (
      <div className={cn('space-y-2', className)} {...props}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              baseStyles,
              variants.text,
              i === lines - 1 ? 'w-3/4' : 'w-full' // Last line shorter
            )}
            style={{ height: height || '1rem' }}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className={cn(baseStyles, variants[variant], className)}
      style={{
        width: width,
        height: height || (variant === 'text' ? '1rem' : undefined),
      }}
      {...props}
    />
  )
}

// Preset skeleton components
function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('p-6 rounded-2xl bg-white/5 border border-white/5', className)}>
      <div className="flex items-center gap-4 mb-4">
        <Skeleton variant="circle" width={48} height={48} />
        <div className="flex-1 space-y-2">
          <Skeleton width="60%" height={16} />
          <Skeleton width="40%" height={12} />
        </div>
      </div>
      <Skeleton variant="text" lines={3} />
    </div>
  )
}

function SkeletonDestination({ className }: { className?: string }) {
  return (
    <div className={cn('p-6 rounded-2xl bg-white/5 border border-white/5', className)}>
      <div className="flex items-center gap-4 mb-4">
        <Skeleton width={48} height={48} className="rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton width="70%" height={18} />
          <Skeleton width="40%" height={14} />
        </div>
      </div>
      <Skeleton width="50%" height={12} />
    </div>
  )
}

function SkeletonPlan({ className }: { className?: string }) {
  return (
    <div className={cn('p-6 rounded-2xl bg-white/5 border border-white/5', className)}>
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-2">
          <Skeleton width={80} height={24} />
          <Skeleton width={60} height={14} />
        </div>
        <Skeleton width={70} height={32} />
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton variant="circle" width={20} height={20} />
          <Skeleton width="60%" height={14} />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton variant="circle" width={20} height={20} />
          <Skeleton width="50%" height={14} />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton variant="circle" width={20} height={20} />
          <Skeleton width="70%" height={14} />
        </div>
      </div>
      <Skeleton width="100%" height={44} className="mt-6 rounded-xl" />
    </div>
  )
}

function SkeletonTable({ rows = 5, className }: { rows?: number; className?: string }) {
  return (
    <div className={cn('space-y-3', className)}>
      {/* Header */}
      <div className="flex gap-4 p-4 bg-white/5 rounded-lg">
        <Skeleton width="25%" height={14} />
        <Skeleton width="20%" height={14} />
        <Skeleton width="20%" height={14} />
        <Skeleton width="15%" height={14} />
        <Skeleton width="20%" height={14} />
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 p-4 border border-white/5 rounded-lg">
          <Skeleton width="25%" height={14} />
          <Skeleton width="20%" height={14} />
          <Skeleton width="20%" height={14} />
          <Skeleton width="15%" height={14} />
          <Skeleton width="20%" height={14} />
        </div>
      ))}
    </div>
  )
}

function SkeletonAvatar({ size = 40 }: { size?: number }) {
  return <Skeleton variant="circle" width={size} height={size} />
}

function SkeletonButton({ width = 120, height = 44 }: { width?: number; height?: number }) {
  return <Skeleton width={width} height={height} className="rounded-xl" />
}

export {
  Skeleton,
  SkeletonCard,
  SkeletonDestination,
  SkeletonPlan,
  SkeletonTable,
  SkeletonAvatar,
  SkeletonButton,
}
