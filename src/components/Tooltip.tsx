import { ReactNode, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TooltipProps {
  children: ReactNode
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
}

export default function Tooltip({
  children,
  content,
  position = 'top',
  delay = 0,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  const positionClasses = {
    top: '-top-12 left-1/2 -translate-x-1/2',
    bottom: '-bottom-12 left-1/2 -translate-x-1/2',
    left: 'left-0 top-1/2 -translate-y-1/2 -translate-x-full -ml-2',
    right: 'right-0 top-1/2 -translate-y-1/2 translate-x-full ml-2',
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -5 }}
            transition={{ delay, duration: 0.2 }}
            className={`absolute z-50 px-4 py-2 text-sm font-medium whitespace-nowrap ${positionClasses[position]}`}
          >
            <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl px-4 py-2 shadow-lg">
              {content}
            </div>
            {/* Arrow */}
            <div
              className={`absolute w-2 h-2 bg-primary rotate-45 ${
                position === 'top'
                  ? 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2'
                  : position === 'bottom'
                  ? 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2'
                  : position === 'left'
                  ? 'right-0 top-1/2 -translate-y-1/2 translate-x-1/2'
                  : 'left-0 top-1/2 -translate-y-1/2 -translate-x-1/2'
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
