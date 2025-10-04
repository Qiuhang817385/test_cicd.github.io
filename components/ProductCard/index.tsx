// 2.1 封装可复用的卡片组件（支持 Tailwind 与 CSS Modules）
// components/ProductCard.tsx
import styles from './ProductCard.module.css'
import Image from 'next/image'

interface ProductCardProps {
  title: string
  price: number
  image: string
  onClick?: () => void
}

export default function ProductCard({
  title,
  price,
  image,
  onClick,
}: ProductCardProps) {
  return (
    <div
      className={`rounded-lg shadow-md p-4 bg-white dark:bg-gray-800 hover:shadow-xl transition ${styles.card}`}
      tabIndex={0}
      role="button"
      aria-label={`查看商品 ${title}`}
      onClick={onClick}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick?.()}
    >
            
      <Image
        src={image}
        alt={title}
        width={320}
        height={160}
        className="w-full h-40 object-cover rounded"
        loading="lazy"
      />
            
      <h2 className="mt-2 text-lg font-bold text-gray-900 dark:text-white">
        {title}
      </h2>
            <p className="text-primary-600 font-semibold">￥{price}</p>    
    </div>
  )
}
