# My App

这是一个基于 [Next.js](https://nextjs.org) 和 [shadcn/ui](https://ui.shadcn.com) 构建的现代化 Web 应用。

## 功能特性

- ⚡ **Next.js 15** - 最新的 React 框架
- 🎨 **shadcn/ui** - 现代化的 UI 组件库
- 🎯 **TypeScript** - 类型安全的开发体验
- 🎨 **Tailwind CSS** - 实用优先的 CSS 框架
- 📱 **响应式设计** - 内置栅格系统支持
- 🌙 **深色模式** - 支持明暗主题切换
- 🗄️ **Prisma ORM** - 现代化的数据库 ORM 工具
- 🚀 **API 路由** - 完整的 RESTful API 接口

## 布局系统

项目内置了完整的布局系统，基于 shadcn/ui 设计规范，提供一致的间距和布局体验：

### 核心组件

- **Container** - 容器组件，提供最大宽度和内边距控制
- **Grid** - 栅格组件，支持 12 列栅格系统和自动填充
- **Col** - 列组件，支持响应式列跨度和定位
- **PageLayout** - 页面布局组件，统一页面结构
- **CustomLink** - 自定义链接组件，支持多种样式变体

### 间距系统

项目提供了统一的间距工具类，基于 shadcn/ui 设计规范：

```tsx
import { spacing } from "@/lib/spacing"

// 垂直间距
<div className={spacing.md}> // 16px 间距
<div className={spacing.lg}> // 24px 间距

// 水平间距
<div className={spacing.horizontal.md}> // 16px 水平间距

// 响应式间距
<div className={spacing.responsive.mobile}> // 移动端优化间距
```

### 使用示例

```tsx
import { PageLayout, Container, Grid, Col, CustomLink } from "@/components/ui"

// 基础页面布局
<PageLayout
  title="页面标题"
  description="页面描述"
  maxWidth="xl"
  verticalPadding="lg"
>
  <div className="space-y-6">
    <Button>主要操作</Button>
    <CustomLink href="/path" variant="secondary">
      次要链接
    </CustomLink>
  </div>
</PageLayout>

// 栅格布局
<Container>
  <Grid cols={3} gap={4}>
    <Col span={1}>列 1</Col>
    <Col span={1}>列 2</Col>
    <Col span={1}>列 3</Col>
  </Grid>
</Container>

// 响应式栅格
<Grid
  cols={1}
  responsive={{ sm: 2, md: 3, lg: 4 }}
  gap={4}
>
  <Col span={1}>响应式列</Col>
</Grid>
```

## 数据库配置

项目集成了 Prisma ORM，支持 PostgreSQL 数据库。请按以下步骤配置：

### 1. 环境变量配置

创建 `.env` 文件并配置数据库连接：

```env
# 数据库连接配置
DATABASE_URL="postgresql://username:password@localhost:5432/myapp_db?schema=public"

# 或者使用 SQLite 进行快速测试
# DATABASE_URL="file:./dev.db"
```

### 2. 数据库迁移

```bash
# 生成 Prisma 客户端
npx prisma generate

# 运行数据库迁移（首次运行）
npx prisma migrate dev --name init

# 查看数据库（可选）
npx prisma studio
```

### 3. 数据模型

项目包含以下数据模型：

- **User** - 用户模型（邮箱、姓名、创建时间等）
- **Post** - 文章模型（标题、内容、发布状态、作者关联等）

## API 接口

项目提供了完整的 RESTful API 接口：

### 用户接口

- `GET /api/users` - 获取所有用户（包含关联文章）
- `POST /api/users` - 创建新用户

### 文章接口

- `GET /api/posts` - 获取所有文章（包含作者信息）
- `POST /api/posts` - 创建新文章
- `GET /api/posts/[id]` - 获取单个文章
- `PUT /api/posts/[id]` - 更新文章
- `DELETE /api/posts/[id]` - 删除文章

### 请求示例

```bash
# 创建用户
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "name": "用户名"}'

# 创建文章
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title": "文章标题", "content": "文章内容", "authorId": "用户ID", "published": true}'
```

## 开始使用

首先，启动开发服务器：

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
# 或
bun dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

### 演示页面

- **主页** - 项目概览和导航
- **Prisma 演示** - 数据库 CRUD 操作演示 (`/prisma-demo`)
- **流程图** - XFlow 流程图组件 (`/flow`)
- **聊天 BI** - 智能聊天界面 (`/chatBi`)

你可以通过修改 `app/page.tsx` 来开始编辑页面。文件保存后页面会自动更新。

项目使用 [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) 自动优化和加载 [Geist](https://vercel.com/font) 字体。

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
