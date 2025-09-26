// Mock 数据生成器 - 符合 @visactor/vmind 格式
export interface MockChartData {
  type: string
  data: Array<{
    id: string
    values: Array<{
      x: string | number
      y: number
      category?: string
      [key: string]: any
    }>
  }>
  xField: string
  yField: string
  seriesField?: string
  title?: {
    text: string
    visible: boolean
  }
  axes?: Array<{
    orient: string
    title?: {
      text: string
      visible: boolean
    }
  }>
  tooltip?: {
    visible: boolean
    fields: Array<{
      key: string
      label: string
    }>
  }
}

// 生成月度部署量折线图数据
export const generateMonthlyDeploymentData = (): MockChartData => {
  const months = [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月',
  ]
  const data = months.map((month, index) => ({
    x: month,
    y: Math.floor(Math.random() * 100) + 20 + index * 5,
    category: '部署量',
  }))

  return {
    type: 'line',
    data: [
      {
        id: 'deploymentData',
        values: data,
      },
    ],
    xField: 'x',
    yField: 'y',
    seriesField: 'category',
    title: {
      text: '2024年各月组件部署量趋势',
      visible: true,
    },
    axes: [
      {
        orient: 'left',
        title: {
          text: '部署量',
          visible: true,
        },
      },
      {
        orient: 'bottom',
        title: {
          text: '月份',
          visible: true,
        },
      },
    ],
    tooltip: {
      visible: true,
      fields: [
        { key: 'x', label: '月份' },
        { key: 'y', label: '部署量' },
      ],
    },
  }
}

// 生成多系列折线图数据（不同组件类型）
export const generateMultiSeriesData = (): MockChartData => {
  const months = [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月',
  ]
  const components = ['obd', 'obproxy', 'observer', 'obagent']

  const data = months.flatMap((month) =>
    components.map((component) => ({
      x: month,
      y: Math.floor(Math.random() * 50) + 10,
      category: component,
    }))
  )

  return {
    type: 'line',
    data: [
      {
        id: 'multiSeriesData',
        values: data,
      },
    ],
    xField: 'x',
    yField: 'y',
    seriesField: 'category',
    title: {
      text: '2024年各组件部署量对比',
      visible: true,
    },
    axes: [
      {
        orient: 'left',
        title: {
          text: '部署量',
          visible: true,
        },
      },
      {
        orient: 'bottom',
        title: {
          text: '月份',
          visible: true,
        },
      },
    ],
    tooltip: {
      visible: true,
      fields: [
        { key: 'x', label: '月份' },
        { key: 'y', label: '部署量' },
        { key: 'category', label: '组件类型' },
      ],
    },
  }
}

// 生成时间序列折线图数据
export const generateTimeSeriesData = (): MockChartData => {
  const dates = []
  const startDate = new Date('2024-01-01')

  // 生成30天的数据
  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)
    dates.push(date.toISOString().split('T')[0])
  }

  const data = dates.map((date, index) => ({
    x: date,
    y: Math.floor(Math.random() * 200) + 50 + Math.sin(index * 0.2) * 30,
    category: '日部署量',
  }))

  return {
    type: 'line',
    data: [
      {
        id: 'timeSeriesData',
        values: data,
      },
    ],
    xField: 'x',
    yField: 'y',
    seriesField: 'category',
    title: {
      text: '最近30天部署量趋势',
      visible: true,
    },
    axes: [
      {
        orient: 'left',
        title: {
          text: '部署量',
          visible: true,
        },
      },
      {
        orient: 'bottom',
        title: {
          text: '日期',
          visible: true,
        },
      },
    ],
    tooltip: {
      visible: true,
      fields: [
        { key: 'x', label: '日期' },
        { key: 'y', label: '部署量' },
      ],
    },
  }
}

// 根据查询类型返回不同的 mock 数据
export const getMockDataByQuery = (query: string): MockChartData => {
  const lowerQuery = query.toLowerCase()

  if (
    lowerQuery.includes('多') ||
    lowerQuery.includes('对比') ||
    lowerQuery.includes('量') ||
    lowerQuery.includes('占比') ||
    lowerQuery.includes('组件')
  ) {
    return generateMultiSeriesData()
  } else if (
    lowerQuery.includes('天') ||
    lowerQuery.includes('日') ||
    lowerQuery.includes('周') ||
    lowerQuery.includes('月') ||
    lowerQuery.includes('最近')
  ) {
    return generateTimeSeriesData()
  } else {
    return generateMonthlyDeploymentData()
  }
}

// 生成流式响应数据
export const generateStreamResponse = (query: string) => {
  const chartData = getMockDataByQuery(query)

  return {
    message: `根据您的查询"${query}"，我生成了相应的数据可视化图表。`,
    chartParams: {
      dimension: ['时间'],
      metric: ['部署量'],
      sql: `SELECT time_period, deployment_count FROM deployments WHERE ${
        query.includes('2024')
          ? 'year = 2024'
          : 'date >= CURDATE() - INTERVAL 30 DAY'
      } ORDER BY time_period`,
    },
    chartData: chartData,
  }
}
