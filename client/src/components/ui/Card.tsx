import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  hover?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, hover = false, ...props }, ref) => {
    const Component = hover ? motion.div : 'div'
    const motionProps = hover ? {
      whileHover: { y: -4, scale: 1.02 },
      transition: { duration: 0.2 }
    } : {}

    return (
      <Component
        ref={ref}
        className={cn(
          'bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700 overflow-hidden',
          hover && 'cursor-pointer',
          className
        )}
        {...motionProps}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Card.displayName = 'Card'

export default Card
