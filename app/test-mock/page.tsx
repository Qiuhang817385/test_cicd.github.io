'use client'

import { useState, useEffect } from 'react'
import { generateStreamResponse } from '@/lib/mock-data'

export default function TestMockPage() {
  const [mockData, setMockData] = useState<any>(null)
  const [query, setQuery] = useState('查看2024年每个月各个组件的部署量')

  const testMockData = () => {
    const response = generateStreamResponse(query)
    setMockData(response)
  }

  const testQueries = [
    '查看2024年每个月各个组件的部署量',
    '查看最近1周部署量Top3的组件',
    '按周查看最近一个月obd的部署量和占比',
    '查看最近30天部署量趋势',
    '对比不同组件的部署情况',
  ]

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mock 数据测试页面</h1>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">测试查询语句：</label>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
            placeholder="输入查询语句"
          />
          <button
            onClick={testMockData}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            测试
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {testQueries.map((testQuery, index) => (
            <button
              key={index}
              onClick={() => setQuery(testQuery)}
              className="px-3 py-1 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
            >
              {testQuery}
            </button>
          ))}
        </div>
      </div>

      {mockData && (
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">消息内容：</h3>
            <p className="text-gray-700">{mockData.message}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">图表参数：</h3>
            <pre className="text-sm bg-white p-3 rounded border overflow-auto">
              {JSON.stringify(mockData.chartParams, null, 2)}
            </pre>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">图表数据：</h3>
            <pre className="text-sm bg-white p-3 rounded border overflow-auto max-h-96">
              {JSON.stringify(mockData.chartData, null, 2)}
            </pre>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">数据统计：</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {mockData.chartData.data[0].values.length}
                </div>
                <div className="text-sm text-gray-600">数据点数量</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {Math.max(
                    ...mockData.chartData.data[0].values.map((d: any) => d.y)
                  )}
                </div>
                <div className="text-sm text-gray-600">最大值</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {Math.min(
                    ...mockData.chartData.data[0].values.map((d: any) => d.y)
                  )}
                </div>
                <div className="text-sm text-gray-600">最小值</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round(
                    mockData.chartData.data[0].values.reduce(
                      (sum: number, d: any) => sum + d.y,
                      0
                    ) / mockData.chartData.data[0].values.length
                  )}
                </div>
                <div className="text-sm text-gray-600">平均值</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
