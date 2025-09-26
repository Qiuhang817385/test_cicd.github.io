/**
 * 间距工具类
 * 基于 shadcn/ui 设计系统的间距规范
 */

export const spacing = {
  // 基础间距
  xs: 'space-y-1', // 4px
  sm: 'space-y-2', // 8px
  md: 'space-y-4', // 16px
  lg: 'space-y-6', // 24px
  xl: 'space-y-8', // 32px
  '2xl': 'space-y-12', // 48px
  '3xl': 'space-y-16', // 64px

  // 水平间距
  horizontal: {
    xs: 'space-x-1',
    sm: 'space-x-2',
    md: 'space-x-4',
    lg: 'space-x-6',
    xl: 'space-x-8',
    '2xl': 'space-x-12',
    '3xl': 'space-x-16',
  },

  // 内边距
  padding: {
    xs: 'p-1',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
    '2xl': 'p-12',
    '3xl': 'p-16',
  },

  // 外边距
  margin: {
    xs: 'm-1',
    sm: 'm-2',
    md: 'm-4',
    lg: 'm-6',
    xl: 'm-8',
    '2xl': 'm-12',
    '3xl': 'm-16',
  },

  // 响应式间距
  responsive: {
    mobile: 'space-y-4 sm:space-y-6',
    tablet: 'space-y-6 md:space-y-8',
    desktop: 'space-y-8 lg:space-y-12',
  },
} as const

export type SpacingSize = keyof typeof spacing
export type HorizontalSpacingSize = keyof typeof spacing.horizontal
export type PaddingSize = keyof typeof spacing.padding
export type MarginSize = keyof typeof spacing.margin
