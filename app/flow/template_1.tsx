'use client'
// 与 layout.tsx 类似，但它在每次导航时都会创建一个新的实例，状态不会被保留。
// 适用于需要每次进入都执行 useEffect 或重新获取数据的场景。
import { useEffect } from 'react'

export default function Template() {
  useEffect(() => {
    console.log('每次都会执行')
  }, [])
  return <div>Template</div>
}
