'use client' // 错误组件必须是客户端组件
// 一个错误处理 UI，它会利用 React Error Boundary 自动包裹 page.tsx。
// 当页面或其子组件抛出错误时，会显示 error.tsx 的内容，并提供一个函数来尝试重新渲染。

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset?: () => void
}) {
  const router = useRouter()
  const [isRetrying, setIsRetrying] = useState(false)

  useEffect(() => {
    // 可以将错误上报给日志服务
    console.error('Flow页面错误:', error)
  }, [error])

  // 处理重新加载
  const handleRetry = async () => {
    setIsRetrying(true)
    console.log('zhix')
    try {
      // 调用reset函数重新渲染组件
      reset?.()
    } catch (err) {
      console.error('重试失败:', err)
    } finally {
      setIsRetrying(false)
    }
  }

  // 处理返回首页
  const handleGoHome = () => {
    router.push('/flow')
  }

  // 处理返回上页
  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/flow')
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* 错误页面头部 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">错误页面</h1>
        <p className="text-sm text-gray-500 mt-1">页面加载时遇到了问题</p>
      </div>

      {/* 错误内容区域 */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
            {/* 错误图标 */}
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>

            {/* 错误标题 */}
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              页面加载失败
            </h2>

            {/* 错误描述 */}
            <p className="text-gray-600 mb-6">
              很抱歉，页面在加载过程中遇到了问题。这可能是由于网络连接问题或服务器错误导致的。
            </p>

            {/* 错误详情（开发环境显示） */}
            {process.env.NODE_ENV === 'development' && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  错误详情：
                </h3>
                <code className="text-xs text-red-600 break-all">
                  {error.message}
                </code>
                {error.digest && (
                  <div className="mt-2 text-xs text-gray-500">
                    错误ID: {error.digest}
                  </div>
                )}
              </div>
            )}

            {/* 操作按钮 */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleRetry}
                disabled={isRetrying}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
              >
                {isRetrying ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    重试中...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    重新加载
                  </>
                )}
              </button>

              <button
                onClick={handleGoHome}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
                  />
                </svg>
                返回首页
              </button>

              <button
                onClick={handleGoBack}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                返回上页
              </button>
            </div>

            {/* 帮助信息 */}
            <div className="mt-6 text-xs text-gray-500">
              <p>如果问题持续存在，请联系技术支持</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
