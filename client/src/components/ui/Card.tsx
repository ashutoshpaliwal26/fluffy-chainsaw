import React from 'react'
import { cn } from '@/utils/cn'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  hover?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, hover = false, ...props }, ref) => {
    // Removed: const Component = hover ? motion.div : 'div'
    // const motionProps = hover ? {
    //   whileHover: { y: -4, scale: 1.02 },
    //   transition: { duration: 0.2 }
    // } : {}

    return hover ? (
      <div
        ref={ref}
        className={cn(
          'bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700 overflow-hidden',
          'cursor-pointer',
          className
        )}
        // whileHover={{ y: -4, scale: 1.02 }}
        // transition={{ duration: 0.2 }}
        {...props}
      >
        {children}
      </div>
    ) : (
      <div
        ref={ref}
        className={cn(
          'bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700 overflow-hidden',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export default Card
