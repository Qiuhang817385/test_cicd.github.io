const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main () {
  console.log('🌱 开始添加示例数据...')

  // 创建示例用户
  const user1 = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      email: 'alice@example.com',
      name: 'Alice',
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      email: 'bob@example.com',
      name: 'Bob',
    },
  })

  // 创建示例文章
  const post1 = await prisma.post.upsert({
    where: { id: 'post-1' },
    update: {},
    create: {
      id: 'post-1',
      title: '欢迎使用 Prisma',
      content: '这是一篇关于 Prisma ORM 的介绍文章。Prisma 是一个现代化的数据库 ORM，提供了类型安全的数据库访问。',
      published: true,
      authorId: user1.id,
    },
  })

  const post2 = await prisma.post.upsert({
    where: { id: 'post-2' },
    update: {},
    create: {
      id: 'post-2',
      title: 'Next.js 15 新特性',
      content: 'Next.js 15 带来了许多令人兴奋的新特性，包括改进的性能和更好的开发体验。',
      published: true,
      authorId: user2.id,
    },
  })

  const post3 = await prisma.post.upsert({
    where: { id: 'post-3' },
    update: {},
    create: {
      id: 'post-3',
      title: '草稿文章',
      content: '这是一篇草稿文章，还没有发布。',
      published: false,
      authorId: user1.id,
    },
  })

  console.log('✅ 示例数据添加完成！')
  console.log(`   创建了 ${await prisma.user.count()} 个用户`)
  console.log(`   创建了 ${await prisma.post.count()} 篇文章`)
}

main()
  .catch((e) => {
    console.error('❌ 添加示例数据失败:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
