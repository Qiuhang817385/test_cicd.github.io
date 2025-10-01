// 一个加载状态 UI，它会利用 React Suspense 自动包裹 page.tsx。
// 当页面内容正在加载时，Next.js 会自动显示 loading.tsx 的内容，提供即时的加载反馈
export default function Loading() {
  // 你可以使用任何 UI 库的骨架屏
  return <h2>🌀 加载中...</h2>
}
