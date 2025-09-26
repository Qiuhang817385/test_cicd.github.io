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

const CustomNode = ({ data }: { data: any }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm min-w-[200px]">
    <div className="text-center space-y-3">
      <h3 className="font-semibold text-gray-800">{data.label}</h3>
      {data.image && (
        // <div className="relative w-24 h-24 mx-auto">
        <div className="relative w-18 h-32 mx-auto">
          <Image
            src={data.image}
            alt={data.label}
            fill
            // className="object-cover rounded-md"
            sizes="96px"
          />
        </div>
      )}
    </div>
  </div>
)

const initialNodes: Node[] = [
  { id: 'n1', position: { x: 0, y: 0 }, data: { label: '节点1' } },
  { id: 'n2', position: { x: 0, y: 100 }, data: { label: '节点2' } },
  { id: 'n3', position: { x: 300, y: 100 }, data: { label: '节点3' } },
  { id: 'n4', position: { x: 300, y: -100 }, data: { label: '节点4' } },
  { id: 'n5', position: { x: 0, y: -100 }, data: { label: '节点5' } },
  {
    id: 'n6',
    position: { x: -300, y: 200 },
    data: { label: '节点4', image: '/img/292206.jpg' },
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
    <div className="font-sans grid items-center justify-items-center p-18 pb-20">
      <div
        style={{ width: '80vw', height: '80vh' }}
        className="border-2 border-red-500"
      >
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        />
      </div>
    </div>
  )
}
