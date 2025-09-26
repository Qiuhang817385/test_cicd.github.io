import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/users - 获取所有用户
export async function GET() {
  try {
    const users = await prisma.movieCorpus.findMany({
      where: {
        year: 1993,
      },
    })

    return NextResponse.json({
      success: true,
      data: users,
    })
  } catch (error) {
    console.error('获取用户列表失败:', error)
    return NextResponse.json(
      { success: false, error: '获取用户列表失败' },
      { status: 500 }
    )
  }
}

// POST /api/users - 创建新用户
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name } = body

    if (!email) {
      return NextResponse.json(
        { success: false, error: '邮箱是必填项' },
        { status: 400 }
      )
    }

    const user = await prisma.users.create({
      data: {
        email,
        name,
      },
    })

    return NextResponse.json({
      success: true,
      data: user,
    })
  } catch (error) {
    console.error('创建用户失败:', error)

    // 处理唯一约束错误
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { success: false, error: '该邮箱已被使用' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: '创建用户失败' },
      { status: 500 }
    )
  }
}
