# Prisma 快速开始指南

## 🚀 快速开始

### 1. 配置数据库连接

创建 `.env` 文件并配置您的数据库连接：

```env
# PostgreSQL 数据库
DATABASE_URL="postgresql://username:password@localhost:5432/myapp_db?schema=public"

# 或者使用 SQLite 进行快速测试
# DATABASE_URL="file:./dev.db"
```

### 2. 运行数据库设置脚本

```bash
# 一键设置数据库（推荐）
pnpm run db:setup

# 或者手动执行以下步骤：
npx prisma generate
npx prisma migrate dev --name init
pnpm run db:seed
```

### 3. 启动开发服务器

```bash
pnpm dev
```

访问 [http://localhost:3000/prisma-demo](http://localhost:3000/prisma-demo) 查看演示。

## 📊 数据模型

### User（用户）

- `id` - 唯一标识符
- `email` - 邮箱地址（唯一）
- `name` - 用户姓名
- `createdAt` - 创建时间
- `updatedAt` - 更新时间
- `posts` - 关联的文章列表

### Post（文章）

- `id` - 唯一标识符
- `title` - 文章标题
- `content` - 文章内容
- `published` - 是否发布
- `createdAt` - 创建时间
- `updatedAt` - 更新时间
- `authorId` - 作者 ID（外键）
- `author` - 作者信息

## 🔧 常用命令

```bash
# 生成 Prisma 客户端
npx prisma generate

# 创建新的数据库迁移
npx prisma migrate dev --name migration_name

# 重置数据库
npx prisma migrate reset

# 查看数据库（图形界面）
pnpm run db:studio

# 添加示例数据
pnpm run db:seed
```

## 🌐 API 接口

### 用户接口

- `GET /api/users` - 获取所有用户
- `POST /api/users` - 创建用户

### 文章接口

- `GET /api/posts` - 获取所有文章
- `POST /api/posts` - 创建文章
- `GET /api/posts/[id]` - 获取单个文章
- `PUT /api/posts/[id]` - 更新文章
- `DELETE /api/posts/[id]` - 删除文章

## 🐛 故障排除

### 1. 数据库连接失败

- 检查 `.env` 文件中的 `DATABASE_URL` 是否正确
- 确保数据库服务正在运行
- 验证用户名、密码和数据库名称

### 2. Prisma 客户端生成失败

```bash
# 清理并重新生成
rm -rf node_modules/.prisma
npx prisma generate
```

### 3. 迁移失败

```bash
# 重置数据库并重新迁移
npx prisma migrate reset
npx prisma migrate dev --name init
```

## 📚 更多资源

- [Prisma 官方文档](https://www.prisma.io/docs)
- [Next.js API 路由文档](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [TypeScript 类型定义](https://www.typescriptlang.org/docs)
