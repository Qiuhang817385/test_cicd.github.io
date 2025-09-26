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

type AgentMessage = AgentLocalMessage | AgentAIMessage

const prompts = [
  '查看 2024 年每个月各个组件的部署量',
  '查看最近 1 周部署量 Top3 的组件',
  '按周查看最近一个月 obd 的部署量和占比',
]

const placeholderPromptsItems = [
  {
    key: '1',
    label: (
      <Space align="start">
        <FireOutlined style={{ color: '#faad14' }} />
        <span>分析示例</span>
      </Space>
    ),
    children: prompts.map((item, index) => {
      return {
        key: `${index}`,
        description: item,
      }
    }),
  },
]

const senderPromptsItems = prompts.map((item, index) => {
  return {
    key: `${index}`,
    description: item,
    icon: <FireOutlined style={{ color: '#faad14' }} />,
  }
})

export default function CarouselComponent() {
  const [content, setContent] = useState('')

  const abortRef = useRef(() => {})

  useEffect(() => {
    return () => {
      abortRef.current()
    }
  }, [])

  const [agent] = useXAgent<AgentMessage>({
    request: async ({ message }, { onSuccess, onError, onUpdate }) => {
      try {
        const abortController = new AbortController()
        abortRef.current = () => {
          abortController.abort()
        }

        // 这也是 sessionId
        const currentActiveKey = 'temp_1'
        const isTempConversation = currentActiveKey?.includes('temp_')

        const response = await fetch('/api/stream', {
          signal: abortController.signal,
          method: 'POST',
          body: JSON.stringify({
            // db_name:dbNameRef.current,
            db_name: 'ob',
            text: message?.content,
            ...(isTempConversation
              ? {
                  auto_session: true,
                }
              : {
                  session_id: toNumber(currentActiveKey),
                }),
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        console.log('response', response)

        if (response.status !== 200) {
          // throw new Error('Response status is not 200')
          onError(new Error('Response status is not 200'))
          return
        }

        const reader = response.body?.getReader()

        if (!reader) {
          onError(new Error('Response body is not readable'))
          return
        }

        const decoder = new TextDecoder()

        let fullMessage = ''
        let chart: ChartResponse = {}

        while (true) {
          const { done, value } = await reader.read()
          if (done) {
            onSuccess({
              type: 'ai',
              // content: fullMessage,
              list: [
                {
                  type: 'chart',
                  content: {
                    message: fullMessage,
                    charts: [chart],
                  },
                },
              ],
            })
          }

          // const chunk = decoder.decode(value, { stream: true })
          const chunk = decoder.decode(value)
          const lines = chunk
            .split('\n')
            .filter((line) => line.trim() !== '' && line.startsWith('data:'))

          for (const line of lines) {
            const data = line.slice(6)
            if (data === '[DONE]') {
              continue
            }

            try {
              const parsed = JSON.parse(data)
              if (parsed.message) {
                fullMessage += parsed.message
                onUpdate({
                  type: 'ai',
                  list: [
                    {
                      type: 'chart',
                      content: {
                        message: fullMessage,
                        charts: [chart],
                      },
                    },
                  ],
                })
              } else if (parsed.data) {
                chart = {
                  ...chart,
                  data: [...(chart.data || []), ...parsed.data],
                }

                onUpdate({
                  type: 'ai',
                  list: [
                    {
                      type: 'chart',
                      content: {
                        message: fullMessage,
                        charts: [chart],
                      },
                    },
                  ],
                })
              } else {
                chart = {
                  ...chart,
                  chart_params: {
                    ...chart.chart_params,
                    ...parsed,
                  },
                }

                onUpdate({
                  type: 'ai',
                  list: [
                    {
                      type: 'chart',
                      content: {
                        message: fullMessage,
                        charts: [chart],
                      },
                    },
                  ],
                })
              }
            } catch (error) {}
          }

          // fullMessage += chunk
          // onUpdate(chunk)
        }
      } catch (error) {}

      return {
        type: 'ai',
        content: message,
      }
    },
  })

  const { onRequest, messages, parsedMessages, setMessages } = useXChat({
    agent,
    parser: (agentMessage) => {
      const list = agentMessage.content ? [agentMessage] : agentMessage?.list

      return (list || []).map((item) => {
        return {
          role: item.type,
          content: item.content,
        }
      })
    },
  })

  const items = parsedMessages.map(({ id, message }) => {
    return {
      key: id,
      ...message,
    }
  })

  const roles: GetProp<typeof Bubble.List, 'roles'> = {
    local: {
      placement: 'end',
      avatar: {
        icon: <UserOutlined />,
        style: {
          backgroundColor: '#1677ff',
        },
      },
    },
    ai: {
      placement: 'start',
      variant: 'outlined',
      avatar: {
        icon: <RobotOutlined />,
        style: {
          backgroundColor: '#1677ff',
        },
      },
    },
    chart: {
      placement: 'start',
      variant: 'outlined',
      avatar: {
        icon: <PieChartOutlined />,
        style: {
          backgroundColor: '#1677ff',
        },
      },
      messageRender: ({
        message,
        charts,
      }: {
        message: string
        charts: ChartResponse[]
      }) => {
        return (
          <div>
            <ReactMarkdown>{message}</ReactMarkdown>
            <div>
              {charts
                .filter((item) => {
                  return Object.keys(item).length > 0
                })
                .flatMap((chart) => {
                  return (
                    <div>
                      {/* <Chart
                        // dbName={dbName}
                        db_name={'ob'}
                        chart={chart}
                        chartConfig={{
                          height: 300,
                        }}
                      /> */}
                    </div>
                  )
                })}
            </div>
          </div>
        )
      },
    },
  }

  const onSubmit = (nextContent: string) => {
    if (!nextContent) return
    onRequest({
      type: 'local',
      content: nextContent,
    })
    setContent('')
  }

  const onPromptsItemClick = (info) => {
    onRequest({
      type: 'local',
      content: info.data.description,
    })
    // setContent('')
  }

  const placeholderNode = (
    <Space direction="vertical" size={16}>
      <Welcome
        variant="borderless"
        title="ChatBI"
        description="可以问我数据查询/数据分析相关的问题"
      />
      <Prompts
        items={placeholderPromptsItems}
        style={{
          width: '100%',
        }}
        onItemClick={onPromptsItemClick}
      />
    </Space>
  )

  return (
    <div className="font-sans p-18 pb-20">
      <Bubble.List
        items={
          items.length > 0
            ? items
            : [
                {
                  content: placeholderNode,
                  variant: 'borderless',
                },
              ]
        }
        roles={roles}
      />
    </div>
  )
}
