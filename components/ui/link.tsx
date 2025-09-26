import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const linkVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface CustomLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  href: string
  asChild?: boolean
}

const CustomLink = React.forwardRef<HTMLAnchorElement, CustomLinkProps>(
  ({ className, variant, size, href, children, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        href={href}
        className={cn(linkVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </Link>
    )
  }
)
CustomLink.displayName = 'CustomLink'

export { CustomLink, linkVariants }
