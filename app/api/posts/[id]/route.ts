import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/posts/[id] - 获取单个文章
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.posts.findUnique({
      where: { id: params.id },
      include: {
        author: true,
      },
    })

    if (!post) {
      return NextResponse.json(
        { success: false, error: '文章不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: post,
    })
  } catch (error) {
    console.error('获取文章失败:', error)
    return NextResponse.json(
      { success: false, error: '获取文章失败' },
      { status: 500 }
    )
  }
}

// PUT /api/posts/[id] - 更新文章
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { title, content, published } = body

    const post = await prisma.posts.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(content !== undefined && { content }),
        ...(published !== undefined && { published }),
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
    console.error('更新文章失败:', error)

    if (
      error instanceof Error &&
      error.message.includes('Record to update not found')
    ) {
      return NextResponse.json(
        { success: false, error: '文章不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { success: false, error: '更新文章失败' },
      { status: 500 }
    )
  }
}

// DELETE /api/posts/[id] - 删除文章
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.post.delete({
      where: { id: params.id },
    })

    return NextResponse.json({
      success: true,
      message: '文章删除成功',
    })
  } catch (error) {
    console.error('删除文章失败:', error)

    if (
      error instanceof Error &&
      error.message.includes('Record to delete does not exist')
    ) {
      return NextResponse.json(
        { success: false, error: '文章不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { success: false, error: '删除文章失败' },
      { status: 500 }
    )
  }
}
