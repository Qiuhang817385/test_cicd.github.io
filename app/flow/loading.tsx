// 一个加载状态 UI，它会利用 React Suspense 自动包裹 page.tsx。
// 当页面内容正在加载时，Next.js 会自动显示 loading.tsx 的内容，提供即时的加载反馈
export default function Loading() {
  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* 加载页面头部 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">加载中...</h1>
        <p className="text-sm text-gray-500 mt-1">正在加载页面内容</p>
      </div>

      {/* 加载内容区域 */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
          {/* 加载动画 */}
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>

          {/* 加载文本 */}
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            正在加载设置
          </h2>
          <p className="text-gray-600 mb-6">
            请稍候，我们正在为您准备页面内容...
          </p>

          {/* 加载进度条 */}
          <div className="w-64 bg-gray-200 rounded-full h-2 mx-auto">
            <div
              className="bg-blue-600 h-2 rounded-full animate-pulse"
              style={{ width: '60%' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}
