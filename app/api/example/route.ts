import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const startTime = Date.now()

  console.log('API 请求开始')

  // 模拟一些处理时间
  await new Promise((resolve) => setTimeout(resolve, 100))

  const duration = Date.now() - startTime

  return NextResponse.json({
    message: 'Hello World',
    user: 'Guest',
    duration: `${duration}ms`,
    timestamp: new Date().toISOString(),
  })
}
export async function POST(request: NextRequest) {
  const startTime = Date.now()

  console.log('API 请求开始')

  // 模拟一些处理时间
  await new Promise((resolve) => setTimeout(resolve, 100))

  const duration = Date.now() - startTime

  const { message } = await request.json()
  return NextResponse.json({
    message: 'Hello World',
    user: 'Guest',
    duration: `${Date.now() - startTime}ms`,
    timestamp: new Date().toISOString(),
  })
}
