// 2.2 响应式导航栏与主题切换
// components/Navbar.tsx
'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="bg-white dark:bg-gray-900 border-b px-4 py-2 flex items-center justify-between">
      <Link href="/" className="font-bold text-xl text-primary-600">
        商城
      </Link>
            
      <button
        className="sm:hidden"
        aria-label="展开菜单"
        onClick={() => setOpen(!open)}
      >
        <span className="material-icons">menu</span>      
      </button>
            
      <ul className={`sm:flex gap-6 ${open ? 'block' : 'hidden'} sm:block`}>
        ...       
      </ul>
      {/* 主题切换按钮 */}      
      <button
        className="ml-4 p-2 rounded bg-gray-200 dark:bg-gray-700"
        aria-label="切换主题"
        onClick={() => {
          document.documentElement.classList.toggle('dark')
        }}
      >
        <span className="material-icons">dark_mode</span>      
      </button>
          
    </nav>
  )
}
