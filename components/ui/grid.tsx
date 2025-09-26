import * as React from 'react'
import { cn } from '@/lib/utils'

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 栅格列数
   * @default 12
   */
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  /**
   * 响应式栅格列数配置
   */
  responsive?: {
    sm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
    md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
    lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
    xl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
    '2xl'?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  }
  /**
   * 栅格间距
   * @default 4
   */
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  /**
   * 是否启用自动填充
   * @default false
   */
  autoFit?: boolean
  /**
   * 自动填充时的最小列宽（仅当 autoFit 为 true 时有效）
   * @default "250px"
   */
  minColWidth?: string
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      className,
      cols = 12,
      responsive,
      gap = 4,
      autoFit = false,
      minColWidth = '250px',
      ...props
    },
    ref
  ) => {
    const gridClasses = React.useMemo(() => {
      if (autoFit) {
        return cn('grid', `gap-${gap}`, className)
      }

      const baseCols = `grid-cols-${cols}`
      const responsiveCols = responsive
        ? Object.entries(responsive)
            .map(
              ([breakpoint, colCount]) => `${breakpoint}:grid-cols-${colCount}`
            )
            .join(' ')
        : ''

      return cn('grid', baseCols, responsiveCols, `gap-${gap}`, className)
    }, [cols, responsive, gap, autoFit, className])

    const gridStyle = autoFit
      ? {
          gridTemplateColumns: `repeat(auto-fit, minmax(${minColWidth}, 1fr))`,
        }
      : undefined

    return (
      <div ref={ref} className={gridClasses} style={gridStyle} {...props} />
    )
  }
)
Grid.displayName = 'Grid'

export { Grid }
