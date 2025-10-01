// app/flow/layout.tsx
'use client' // 标记为客户端组件
import '@xyflow/react/dist/style.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function FlowLayout(props: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* 侧边栏导航 */}
      <nav className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <svg
              className="w-8 h-8 mr-3 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            xFlow
          </h2>
          <p className="text-sm text-gray-500 mt-1">流程图编辑器</p>
        </div>

        <div className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/flow"
                className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                  pathname === '/flow'
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <svg
                  className="w-5 h-5 mr-3"
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
                流程图
              </Link>
            </li>

            <li>
              <Link
                href="/flow/settings"
                className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                  pathname === '/flow/settings'
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                设置
              </Link>
            </li>
          </ul>
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">xFlow v1.0.0</div>
        </div>
      </nav>

      {/* 主内容区域 */}
      <div className="flex-1 flex flex-col">{props.children}</div>
    </div>
  )
}
