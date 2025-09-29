# 双平台部署指南

本项目支持同时部署到 GitHub Pages 和 Vercel，实现静态站点和 API 路由的完美结合。

## 部署架构

```
GitHub Pages (静态)     Vercel (API服务)
     ↓                      ↓
  前端页面               API路由 + 数据库
     ↓                      ↓
  调用Vercel API ←─────────┘
```

## 环境变量配置

### 1. GitHub Pages 部署

```bash
# 在 GitHub Actions 中设置
GITHUB_PAGES=true
VERCEL_APP_URL=https://your-app.vercel.app
```

### 2. Vercel 部署

```bash
# 在 Vercel 中设置
GITHUB_PAGES=false
DATABASE_URL=your_database_url
```

## 部署步骤

### 1. 部署到 Vercel（API 服务）

1. 连接 GitHub 仓库到 Vercel
2. 设置环境变量：
   - `GITHUB_PAGES=false`
   - `DATABASE_URL=your_database_url`
3. 部署完成后，记录 Vercel 应用 URL

### 2. 部署到 GitHub Pages（静态站点）

1. 在 GitHub 仓库设置中启用 Pages
2. 设置环境变量：
   - `GITHUB_PAGES=true`
   - `VERCEL_APP_URL=https://your-app.vercel.app`
3. 推送代码触发自动部署

## 构建命令

```bash
# 开发环境
npm run dev

# GitHub Pages 构建
npm run build:github-pages

# Vercel 构建
npm run build:vercel
```

## API 调用方式

项目使用 `lib/api-client.ts` 自动处理不同环境的 API 调用：

- **Vercel 环境**: 直接调用 `/api/*` 路由
- **GitHub Pages 环境**: 调用 Vercel 应用的 API

## 注意事项

1. **数据库**: 只在 Vercel 上配置数据库连接
2. **API 密钥**: 敏感信息只在 Vercel 上设置
3. **CORS**: 确保 Vercel API 允许 GitHub Pages 域名访问
4. **缓存**: 考虑添加适当的缓存策略

## 故障排除

### GitHub Pages 无法调用 API

- 检查 `VERCEL_APP_URL` 是否正确
- 确认 Vercel 应用已部署且运行正常
- 检查 CORS 设置

### 构建失败

- 检查环境变量设置
- 确认 TypeScript 类型错误已解决
- 查看构建日志获取详细错误信息
