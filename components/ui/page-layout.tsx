import * as React from 'react'
import { cn } from '@/lib/utils'
import { Container } from './container'
import { Grid } from './grid'
import { Col } from './col'

export interface PageLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 页面标题
   */
  title?: string
  /**
   * 页面描述
   */
  description?: string
  /**
   * 是否居中显示内容
   * @default true
   */
  centered?: boolean
  /**
   * 是否显示背景渐变
   * @default true
   */
  showBackground?: boolean
  /**
   * 容器的最大宽度
   * @default "xl"
   */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full'
  /**
   * 垂直内边距
   * @default "lg"
   */
  verticalPadding?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
}

const PageLayout = React.forwardRef<HTMLDivElement, PageLayoutProps>(
  (
    {
      className,
      title,
      description,
      centered = true,
      showBackground = true,
      maxWidth = 'xl',
      verticalPadding = 'lg',
      children,
      ...props
    },
    ref
  ) => {
    const paddingClasses = {
      sm: 'py-8',
      md: 'py-12',
      lg: 'py-16',
      xl: 'py-20',
      '2xl': 'py-24',
      '3xl': 'py-36',
      '4xl': 'py-48',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'min-h-screen',
          showBackground && 'bg-gradient-to-br from-background to-muted/20',
          className
        )}
        {...props}
      >
        <Container
          maxWidth={maxWidth}
          className={paddingClasses[verticalPadding]}
        >
          <Grid cols={1} gap={8} className={centered ? 'text-center' : ''}>
            <Col span={1}>
              {(title || description) && (
                <div className="space-y-4 mb-8">
                  {title && (
                    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                      {title}
                    </h1>
                  )}
                  {description && (
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                      {description}
                    </p>
                  )}
                </div>
              )}
              <div className="space-y-6">{children}</div>
            </Col>
          </Grid>
        </Container>
      </div>
    )
  }
)
PageLayout.displayName = 'PageLayout'

export { PageLayout }
