// app/user/page.tsx
'use client' // 标记为客户端组件
import { useState, useEffect } from 'react'

interface User {
  id: number
  name: string
  email: string
}

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true) // 模拟网络请求
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const fetchedUser: User = {
          id: 1,
          name: '邱航',
          email: 'qiuhang@example.com',
        }
        setUser(fetchedUser)
      } catch (err) {
        setError('用户信息加载失败')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  if (loading) {
    return <p>加载中...</p>
  }

  if (error) {
    return <p style={{ color: 'red' }}>错误：{error}</p>
  }

  if (!user) {
    return <p>没有找到用户。</p>
  }

  return (
    <div className="font-sans grid items-center justify-items-center p-18 pb-20">
      <h1>用户资料</h1>      
      <p>姓名: {user.name}</p>
      <p>邮箱: {user.email}</p>
    </div>
  )
}
