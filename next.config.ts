import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // 注释掉 output: 'export' 以支持 API 路由
  // output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/test_cicd.github.io' : '',
  webpack: (config, { isServer }) => {
    // 排除 react-native-fetch-blob 依赖
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native-fetch-blob': false,
    }

    // 忽略 react-native 相关的模块
    config.resolve.fallback = {
      ...config.resolve.fallback,
      'react-native': false,
      'react-native-fetch-blob': false,
    }

    // 添加 externals 配置
    if (isServer) {
      config.externals = [
        ...(config.externals || []),
        'react-native-fetch-blob',
      ]
    }

    return config
  },
}

export default nextConfig
