import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/posts - 获取所有文章
export async function GET() {
  try {
    // const posts = await prisma.posts.findMany({
    //   include: {
    //     author: true, // 包含作者信息
    //   },
    //   orderBy: {
    //     createdAt: 'desc', // 按创建时间倒序排列
    //   },
    // })

    const posts = await prisma.movieCorpus.findMany({
      where: {
        year: 1993,
      },
    })

    return NextResponse.json({
      success: true,
      data: posts,
    })
  } catch (error) {
    console.error('获取文章列表失败:', error)
    return NextResponse.json(
      { success: false, error: '获取文章列表失败' },
      { status: 500 }
    )
  }
}

// POST /api/posts - 创建新文章
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, authorId, published = false } = body

    if (!title || !authorId) {
      return NextResponse.json(
        { success: false, error: '标题和作者ID是必填项' },
        { status: 400 }
      )
    }

    // 检查作者是否存在
    const author = await prisma.users.findUnique({
      where: { id: authorId },
    })

    if (!author) {
      return NextResponse.json(
        { success: false, error: '作者不存在' },
        { status: 400 }
      )
    }

    const post = await prisma.posts.create({
      data: {
        title,
        content,
        authorId,
        published,
      },
      include: {
        author: true,
      },
    })

    return NextResponse.json({
      success: true,
      data: post,
    })
  } catch (error) {
    console.error('创建文章失败:', error)
    return NextResponse.json(
      { success: false, error: '创建文章失败' },
      { status: 500 }
    )
  }
}
