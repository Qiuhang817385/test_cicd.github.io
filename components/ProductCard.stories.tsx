import type { Meta, StoryObj } from '@storybook/react'
import ProductCard from './ProductCard'

const meta: Meta<typeof ProductCard> = {
  title: '组件库/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '商品标题',
    },
    price: {
      control: 'number',
      description: '商品价格',
    },
    image: {
      control: 'text',
      description: '商品图片URL',
    },
    onClick: {
      action: 'clicked',
      description: '点击事件',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// 默认故事
export const Default: Story = {
  args: {
    title: 'iPhone 15',
    price: 6999,
    image: '/iphone15.jpg',
  },
}

// 不同价格的故事
export const Expensive: Story = {
  args: {
    title: 'MacBook Pro',
    price: 15999,
    image: '/macbook.jpg',
  },
}

export const Cheap: Story = {
  args: {
    title: 'AirPods',
    price: 1299,
    image: '/airpods.jpg',
  },
}

// 长标题测试
export const LongTitle: Story = {
  args: {
    title: 'Apple iPhone 15 Pro Max 256GB 深空黑色 全网通5G手机',
    price: 8999,
    image: '/iphone15-pro.jpg',
  },
}

// 无图片测试
export const NoImage: Story = {
  args: {
    title: '虚拟商品',
    price: 99,
    image: '/placeholder.jpg',
  },
}

// 点击事件测试
export const WithClick: Story = {
  args: {
    title: '可点击商品',
    price: 2999,
    image: '/clickable.jpg',
    onClick: () => alert('商品被点击了！'),
  },
}
