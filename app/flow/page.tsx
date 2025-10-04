// app/flow/page.tsx
'use client' // 标记为客户端组件
import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Node,
  Edge,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import AnimatedButton from '@/components/AnimatedButton'

const CustomNode = ({ data }: { data: any }) => (
  <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200 min-w-[200px] group">
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center">
        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
        <h3 className="font-bold text-gray-800 text-lg">{data.label}</h3>
      </div>
      {data.image && (
        <div className="relative w-20 h-24 mx-auto rounded-lg overflow-hidden border-2 border-gray-100">
          <Image
            src={data.image}
            alt={data.label}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
            sizes="80px"
          />
        </div>
      )}
      <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
        节点 ID: {data.id || 'unknown'}
      </div>
    </div>
  </div>
)

const initialNodes: Node[] = [
  { id: 'n1', position: { x: 0, y: 0 }, data: { label: '开始节点' } },
  { id: 'n2', position: { x: 0, y: 150 }, data: { label: '处理节点' } },
  { id: 'n3', position: { x: 300, y: 150 }, data: { label: '决策节点' } },
  { id: 'n4', position: { x: 300, y: -50 }, data: { label: '分支节点' } },
  { id: 'n5', position: { x: 0, y: -150 }, data: { label: '并行节点' } },
  {
    id: 'n6',
    position: { x: -300, y: 200 },
    data: { label: '图片节点', image: '/img/292206.jpg' },
    type: 'custom',
  },
]

// 动态边
const animatedEdge = {
  id: 'n2-n3',
  source: 'n2',
  target: 'n3',
  animated: true,
}

const initialEdges: Edge[] = [
  { id: 'n1-n2', source: 'n1', target: 'n2' },
  animatedEdge,
  // { id: 'n1-n4', source: 'n1', target: 'n4' },
]

export default function UserProfile() {
  useEffect(() => {
    fetch('/api/example')
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error('API 请求失败:', error))
  }, [])

  const nodeTypes = { custom: CustomNode }

  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(initialEdges)

  const onNodesChange = useCallback((changes: any) => {
    return setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot))
  }, [])
  const onEdgesChange = useCallback((changes: any) => {
    return setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot))
  }, [])
  const onConnect = useCallback((params: any) => {
    // setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    const newEdge = { id: `edge-${nodes.length + 1}`, ...params }
    return setEdges((prev) => [...prev, newEdge])
  }, [])

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* 顶部工具栏 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <AnimatedButton
            style={{ width: 216 }}
            onClick={() => {
              console.log('点击了按钮')
            }}
          >
            点击我
          </AnimatedButton>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">流程图编辑器</h1>
            <p className="text-sm text-gray-500 mt-1">
              拖拽节点创建连接，构建你的流程图
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              添加节点
            </button>
            <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              导出
            </button>
          </div>
        </div>
      </div>

      {/* 流程图区域 */}
      <div className="flex-1 p-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 h-full overflow-hidden">
          <ReactFlow
            nodeTypes={nodeTypes}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            className="bg-gray-50"
            defaultEdgeOptions={{
              style: { stroke: '#3B82F6', strokeWidth: 2 },
              type: 'smoothstep',
            }}
            connectionLineStyle={{ stroke: '#3B82F6', strokeWidth: 2 }}
          />
        </div>
      </div>

      {/* 底部状态栏 */}
      <div className="bg-white border-t border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span>节点数: {nodes.length}</span>
            <span>连接数: {edges.length}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>已保存</span>
          </div>
        </div>
      </div>
    </div>
  )
}
