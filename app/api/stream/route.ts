import { NextRequest, NextResponse } from 'next/server'
import { generateStreamResponse } from '@/lib/mock-data'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('收到请求:', body)

    const query = body.text || '查看2024年每个月各个组件的部署量'
    const mockResponse = generateStreamResponse(query)

    // 创建可读流
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      start(controller) {
        // 发送消息开始
        const messageStart =
          'data: ' +
          JSON.stringify({
            message: '正在分析您的数据查询请求...\n\n',
          }) +
          '\n\n'
        controller.enqueue(encoder.encode(messageStart))

        // 模拟处理延迟
        setTimeout(() => {
          // 发送图表参数
          const chartParams =
            'data: ' + JSON.stringify(mockResponse.chartParams) + '\n\n'
          controller.enqueue(encoder.encode(chartParams))

          // 发送图表数据
          const dataChunk =
            'data: ' +
            JSON.stringify({
              data: mockResponse.chartData.data[0].values,
            }) +
            '\n\n'
          controller.enqueue(encoder.encode(dataChunk))

          // 发送完成消息
          const messageEnd =
            'data: ' +
            JSON.stringify({
              message: `\n\n${mockResponse.message}`,
            }) +
            '\n\n'
          controller.enqueue(encoder.encode(messageEnd))

          // 结束流
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        }, 1000)
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    console.error('API 错误:', error)
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 })
  }
}

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
