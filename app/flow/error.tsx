'use client' // 错误组件必须是客户端组件
// 一个错误处理 UI，它会利用 React Error Boundary 自动包裹 page.tsx。
// 当页面或其子组件抛出错误时，会显示 error.tsx 的内容，并提供一个函数来尝试重新渲染。

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset?: () => void
}) {
  useEffect(() => {
    // 可以将错误上报给日志服务
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>出错了！</h2>      
      <button onClick={() => reset?.()}>再试一次</button>    
    </div>
  )
}
