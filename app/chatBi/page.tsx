// app/user/page.tsx
'use client' // 标记为客户端组件
import { useState, useEffect, useRef } from 'react'
import {
  Bubble,
  Conversations,
  Prompts,
  Sender,
  Welcome,
  useXChat,
  useXAgent,
} from '@ant-design/x'
import { type Conversation } from '@ant-design/x/es/conversations/interface'
import { Space } from 'antd'
import {
  FireOutlined,
  PieChartOutlined,
  RobotOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { toNumber } from 'lodash'
import type { GetProp, GetRef } from 'antd'
import ReactMarkdown from 'react-markdown'
import Chart from './chart'

export type ChartResponse = {
  data?: Record<string, any>[] | null
  chart_params?: ChartParams | null
}

type ChartParams = {
  dimension: string[]
  metric: string[]
  sql: string
}

type AgentLocalMessage = {
  type: 'local'
  content: string
}

type AgentAIMessage = {
  type: 'ai'
  content: string
  list?: {
    type: 'chart'
    content: {
      message?: string
      charts?: ChartResponse[]
    }
  }[]
}

export default function CarouselComponent() {
  const iframeUrl = 'http://umi-github-io.vercel.app/'

  return (
    <div className="font-sans p-18 pb-20">
      <iframe
        title="共享存储演示"
        src={iframeUrl}
        // data-language={language || 'zh-CN'}
        style={{ width: '100%', border: '0px', height: '100vh' }}
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        scrolling="auto"
      />
    </div>
  )
}
