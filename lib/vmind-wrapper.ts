// VMind 兼容性包装器 - 用于 Next.js 环境
import VMind, { Model } from '@visactor/vmind'

// 检查是否在浏览器环境中
const isBrowser = typeof window !== 'undefined'

// 创建 VMind 实例的工厂函数
export const createVMind = () => {
  if (!isBrowser) {
    // 在服务端渲染时返回一个模拟对象
    return {
      getFieldInfo: () => ({}),
      generateChart: async () => ({
        spec: {
          type: 'line',
          data: { values: [] },
          xField: 'x',
          yField: 'y',
        },
      }),
    }
  }

  try {
    // 在浏览器环境中创建真实的 VMind 实例
    return new VMind({
      url: 'https://api.deepseek.com/v1',
      model: Model.DEEPSEEK_V3,
      headers: {
        'api-key': 'API_KEY',
      },
    })
  } catch (error) {
    console.warn('VMind 初始化失败，使用模拟对象:', error)
    // 如果初始化失败，返回模拟对象
    return {
      getFieldInfo: () => ({}),
      generateChart: async () => ({
        spec: {
          type: 'line',
          data: { values: [] },
          xField: 'x',
          yField: 'y',
        },
      }),
    }
  }
}

// 导出 VMind 实例
export const vmind = createVMind()
