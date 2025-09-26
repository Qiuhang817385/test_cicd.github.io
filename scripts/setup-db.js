#!/usr/bin/env node

/**
 * 数据库设置脚本
 * 用于快速设置 Prisma 数据库和示例数据
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log('🚀 开始设置数据库...')

try {
  // 检查 .env 文件是否存在
  const envPath = path.join(process.cwd(), '.env')
  if (!fs.existsSync(envPath)) {
    console.log('⚠️  未找到 .env 文件，请先配置数据库连接')
    console.log('   创建 .env 文件并添加 DATABASE_URL')
    process.exit(1)
  }

  // 生成 Prisma 客户端
  console.log('📦 生成 Prisma 客户端...')
  execSync('npx prisma generate', { stdio: 'inherit' })

  // 运行数据库迁移
  console.log('🔄 运行数据库迁移...')
  execSync('npx prisma migrate dev --name init', { stdio: 'inherit' })

  // 可选：添加示例数据
  console.log('📊 添加示例数据...')
  execSync('npx prisma db seed', { stdio: 'inherit' })

  console.log('✅ 数据库设置完成！')
  console.log('   访问 http://localhost:3000/prisma-demo 查看演示')
  console.log('   运行 npx prisma studio 查看数据库管理界面')

} catch (error) {
  console.error('❌ 数据库设置失败:', error.message)
  process.exit(1)
}
