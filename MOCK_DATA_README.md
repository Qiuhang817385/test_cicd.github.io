# Mock 数据使用说明

## 概述

本项目为 ChatBI 功能提供了完整的 mock 数据支持，符合 `@visactor/vmind` 库的数据格式要求，主要用于折线图数据可视化。

## 文件结构

```
lib/
├── mock-data.ts          # Mock 数据生成器
app/
├── api/stream/route.ts   # 流式 API 接口
├── test-mock/page.tsx    # Mock 数据测试页面
└── chatBi/page.tsx       # 主要的 ChatBI 页面
```

## 功能特性

### 1. 多种折线图类型支持

- **月度部署量趋势图**：12 个月的数据，模拟增长趋势
- **多系列对比图**：不同组件类型的部署量对比
- **时间序列图**：最近 30 天的日部署量趋势

### 2. 智能查询匹配

根据用户查询内容自动选择合适的图表类型：

- 包含"多"、"对比"、"组件" → 多系列对比图
- 包含"天"、"日"、"最近" → 时间序列图
- 其他查询 → 月度趋势图

### 3. 流式数据响应

模拟真实的 AI 分析过程：

1. 发送分析开始消息
2. 返回图表参数（维度、指标、SQL）
3. 流式返回图表数据
4. 发送分析结果总结

## 数据格式

### VChart 折线图数据格式

```typescript
{
  type: 'line',
  data: [
    {
      id: 'deploymentData',
      values: [
        { x: '1月', y: 25, category: '部署量' },
        { x: '2月', y: 30, category: '部署量' },
        // ... 更多数据点
      ]
    }
  ],
  xField: 'x',
  yField: 'y',
  seriesField: 'category',
  title: {
    text: '2024年各月组件部署量趋势',
    visible: true
  },
  axes: [
    {
      orient: 'left',
      title: { text: '部署量', visible: true }
    },
    {
      orient: 'bottom',
      title: { text: '月份', visible: true }
    }
  ],
  tooltip: {
    visible: true,
    fields: [
      { key: 'x', label: '月份' },
      { key: 'y', label: '部署量' }
    ]
  }
}
```

## 使用方法

### 1. 在 ChatBI 页面中使用

访问 `/chatBi` 页面，输入查询语句，系统会自动调用 mock 数据接口。

### 2. 测试 Mock 数据

访问 `/test-mock` 页面可以：

- 测试不同的查询语句
- 查看生成的 mock 数据
- 验证数据格式和统计信息

### 3. 自定义 Mock 数据

在 `lib/mock-data.ts` 中添加新的数据生成函数：

```typescript
export const generateCustomData = (): MockChartData => {
  // 自定义数据生成逻辑
  return {
    type: 'line',
    data: [
      /* 数据 */
    ],
    // ... 其他配置
  }
}
```

## API 接口

### POST /api/stream

**请求体：**

```json
{
  "db_name": "ob",
  "text": "查看2024年每个月各个组件的部署量",
  "auto_session": true
}
```

**响应：**
流式返回，包含：

- `message`: 分析消息
- `dimension`, `metric`, `sql`: 图表参数
- `data`: 图表数据数组
- `[DONE]`: 结束标记

## 示例查询

- "查看 2024 年每个月各个组件的部署量"
- "查看最近 1 周部署量 Top3 的组件"
- "按周查看最近一个月 obd 的部署量和占比"
- "查看最近 30 天部署量趋势"
- "对比不同组件的部署情况"

## 技术实现

- 使用 `ReadableStream` 实现流式响应
- 支持 SSE (Server-Sent Events) 格式
- 符合 `@visactor/vmind` 数据规范
- TypeScript 类型安全
- 响应式设计，支持移动端

## 注意事项

1. Mock 数据每次生成都是随机的，用于演示目的
2. 实际生产环境需要替换为真实的数据源
3. 流式响应有 1 秒的模拟延迟，模拟真实 AI 处理时间
4. 数据格式严格按照 VChart 规范设计
