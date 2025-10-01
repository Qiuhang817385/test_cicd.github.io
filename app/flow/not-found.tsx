//  当 notFound() 函数被调用或 URL 不匹配任何路由时，会显示此 UI。
'use client' // 错误组件必须是客户端组件
import { useEffect } from 'react'
import Link from 'next/link'

export default function NotFound({}: {}) {
  return (
    <div>
      未找到页面，请返回
      <Link href="/flow">返回首页</Link>    
    </div>
  )
}
