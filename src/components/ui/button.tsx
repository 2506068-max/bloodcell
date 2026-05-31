import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        default:
          'bg-[linear-gradient(135deg,#FF4D6D_0%,#FF8FA3_28%,#BDB2FF_60%,#4ECDC4_100%)] bg-[length:200%_200%] text-white shadow-playful hover:-translate-y-1 hover:shadow-glow animate-gradient',
        secondary:
          'bg-[linear-gradient(135deg,#4ECDC4_0%,#A0E7E5_45%,#BDB2FF_100%)] bg-[length:200%_200%] text-text-dark shadow-mint hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(78,205,196,0.24)] animate-gradient',
        outline:
          'border border-white/70 bg-white/70 text-text-dark backdrop-blur-xl hover:-translate-y-0.5 hover:bg-white/90',
        ghost: 'bg-transparent text-text-dark hover:bg-white/60',
        accent:
          'bg-[linear-gradient(135deg,#FFE66D_0%,#FFD94D_40%,#FF8FA3_100%)] bg-[length:200%_200%] text-text-dark shadow-soft hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(255,230,109,0.34)] animate-gradient',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 px-4',
        lg: 'h-12 px-8 text-base',
        icon: 'h-10 w-10 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
