'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Step {
  id: string
  title: string
  description?: string
}

interface StepperProps {
  steps: Step[]
  currentStep: number
  className?: string
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep
          const isCurrent = index === currentStep
          const isLast = index === steps.length - 1

          return (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all',
                    isCompleted &&
                      'bg-gradient-to-r from-[#00f0ff] to-[#a855f7] text-[#030712]',
                    isCurrent &&
                      'border-2 border-[#00f0ff] text-[#00f0ff] bg-[#00f0ff]/10',
                    !isCompleted &&
                      !isCurrent &&
                      'border-2 border-white/20 text-slate-500'
                  )}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : index + 1}
                </div>
                <div className="mt-2 text-center">
                  <p
                    className={cn(
                      'text-sm font-medium',
                      isCurrent ? 'text-white' : 'text-slate-400'
                    )}
                  >
                    {step.title}
                  </p>
                  {step.description && (
                    <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Connector Line */}
              {!isLast && (
                <div className="flex-1 h-[2px] mx-4 mb-8">
                  <div
                    className={cn(
                      'h-full transition-all duration-500',
                      isCompleted
                        ? 'bg-gradient-to-r from-[#00f0ff] to-[#a855f7]'
                        : 'bg-white/10'
                    )}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
