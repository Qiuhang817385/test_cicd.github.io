'use client'

import { ChartResponse } from '../page'
import { VChart } from '@visactor/react-vchart'
import { useEffect, useState } from 'react'
import { Segmented, Table } from 'antd'
import { merge } from 'lodash'
import { vmind } from '@/lib/vmind-wrapper'
// import SyntaxHighlighter from 'react-syntax-highlighter'

interface ChartProps {
  db_name: string
  chart: ChartResponse
  chartConfig: any
}

const Chart: React.FC<ChartProps> = ({
  db_name,
  chart,
  chartConfig: customChartConfig,
}) => {
  const [tab, settab] = useState('chart')

  const [chartConfig, setchartConfig] = useState<any>({
    type: 'line',
    data: {
      values: [],
    },
  })

  const noDimension =
    chart.chart_params?.dimension.length === 0 ||
    chart.chart_params?.dimension.includes('无')

  const getChartConfig = async () => {
    const defaultDimension = Object.keys(chart?.data?.[0] || {})?.[0]

    const dataset =
      chart?.data?.map((item) => {
        return noDimension
          ? {
              ...item,
              dimension: defaultDimension,
            }
          : item
      }) || []

    try {
      // 使用动态导入避免 SSR 问题
      const fieldInfo = vmind.getFieldInfo(dataset)

      const { spec } = await vmind.generateChart(
        '使用合适的图表展示数据，不要使用渐变色，图例位于图表下方',
        fieldInfo,
        dataset
      )

      setchartConfig(spec)
    } catch (error) {
      console.warn('VMind 生成图表失败，使用默认配置:', error)

      // 如果 VMind 失败，使用默认的折线图配置
      const fallbackSpec = {
        type: 'line',
        data: {
          values: dataset,
        },
        xField: noDimension
          ? defaultDimension
          : (chart.chart_params?.dimension || [])[0],
        yField: (chart.chart_params?.metric || [])[0],
        title: {
          text: '数据可视化图表',
          visible: true,
        },
        axes: [
          {
            orient: 'left',
            title: {
              text: (chart.chart_params?.metric || [])[0] || '数值',
              visible: true,
            },
          },
          {
            orient: 'bottom',
            title: {
              text: (chart.chart_params?.dimension || [])[0] || '维度',
              visible: true,
            },
          },
        ],
        tooltip: {
          visible: true,
        },
      }

      setchartConfig(fallbackSpec)
    }
  }

  useEffect(() => {
    getChartConfig()
  }, [chart])

  const xField = noDimension ? [] : chart.chart_params?.dimension || []
  const yField = chart.chart_params?.metric || []

  const chartData = chart.data || []

  let columns: any[] = []

  xField.forEach((item) => {
    columns.push({
      title: item,
      dataIndex: item,
    })
  })

  yField.forEach((item) => {
    columns.push({
      title: item,
      dataIndex: item,
      align: 'right',
      sorter: (a: any, b: any) => a[item] - b[item],
    })
  })

  const sql = chart.chart_params?.sql || ''

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '10px',
      }}
    >
      <Segmented
        value={tab}
        onChange={(value) => settab(value)}
        options={[
          { label: 'Chart', value: 'chart' },
          { label: 'Table', value: 'table' },
          { label: 'SQL', value: 'sql' },
        ]}
      />
      {tab === 'chart' && (
        <VChart
          {...merge(chartConfig, {
            ...customChartConfig,
          })}
        />
      )}
      {tab === 'table' && <Table columns={columns} dataSource={chartData} />}
      {tab === 'sql' && (
        <div>
          {sql ? (
            // <SyntaxHighlighter language="sql">{sql}</SyntaxHighlighter>
            <pre>{sql}</pre>
          ) : (
            'No SQL'
          )}
        </div>
      )}
    </div>
  )
}

export default Chart
