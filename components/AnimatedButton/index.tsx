// 2.3 动画按钮与 Framer Motion
// components/AnimatedButton.tsx
'use client'
import { motion } from 'framer-motion'

export default function AnimatedButton({
  children,
  ...props
}: {
  children: React.ReactNode
  style: React.CSSProperties
  onClick?: () => void
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="px-4 py-2 rounded bg-primary-600   font-bold shadow"
      {...props}
    >
      {children}
    </motion.button>
  )
}
