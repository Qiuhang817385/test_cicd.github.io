import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 栅格列跨度
   * @default 1
   */
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  /**
   * 响应式栅格列跨度配置
   */
  responsive?: {
    sm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
    md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
    lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
    xl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
    '2xl'?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  }
  /**
   * 栅格列起始位置
   */
  start?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  /**
   * 响应式栅格列起始位置配置
   */
  startResponsive?: {
    sm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
    md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
    lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
    xl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
    '2xl'?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  }
  /**
   * 栅格列结束位置
   */
  end?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  /**
   * 响应式栅格列结束位置配置
   */
  endResponsive?: {
    sm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
    md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
    lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
    xl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
    '2xl'?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  }
  /**
   * 是否自动填充剩余空间
   * @default false
   */
  auto?: boolean
}

const Col = React.forwardRef<HTMLDivElement, ColProps>(
  (
    {
      className,
      span = 1,
      responsive,
      start,
      startResponsive,
      end,
      endResponsive,
      auto = false,
      ...props
    },
    ref
  ) => {
    const colClasses = React.useMemo(() => {
      if (auto) {
        return cn('col-auto', className)
      }

      const baseSpan = `col-span-${span}`
      const responsiveSpan = responsive
        ? Object.entries(responsive)
            .map(
              ([breakpoint, spanCount]) => `${breakpoint}:col-span-${spanCount}`
            )
            .join(' ')
        : ''

      const baseStart = start ? `col-start-${start}` : ''
      const responsiveStart = startResponsive
        ? Object.entries(startResponsive)
            .map(
              ([breakpoint, startPos]) => `${breakpoint}:col-start-${startPos}`
            )
            .join(' ')
        : ''

      const baseEnd = end ? `col-end-${end}` : ''
      const responsiveEnd = endResponsive
        ? Object.entries(endResponsive)
            .map(([breakpoint, endPos]) => `${breakpoint}:col-end-${endPos}`)
            .join(' ')
        : ''

      return cn(
        baseSpan,
        responsiveSpan,
        baseStart,
        responsiveStart,
        baseEnd,
        responsiveEnd,
        className
      )
    }, [
      span,
      responsive,
      start,
      startResponsive,
      end,
      endResponsive,
      auto,
      className,
    ])

    return <div ref={ref} className={colClasses} {...props} />
  }
)
Col.displayName = 'Col'

export { Col }
