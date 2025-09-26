import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 容器的最大宽度
   * @default "xl"
   */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  /**
   * 是否启用内边距
   * @default true
   */
  padding?: boolean
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, maxWidth = 'xl', padding = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mx-auto w-full',
          {
            'max-w-sm': maxWidth === 'sm',
            'max-w-md': maxWidth === 'md',
            'max-w-lg': maxWidth === 'lg',
            'max-w-xl': maxWidth === 'xl',
            'max-w-2xl': maxWidth === '2xl',
            'max-w-full': maxWidth === 'full',
          },
          padding && 'px-4 sm:px-6 lg:px-8',
          className
        )}
        {...props}
      />
    )
  }
)
Container.displayName = 'Container'

export { Container }
