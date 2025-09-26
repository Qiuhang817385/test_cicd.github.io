import { Button } from '@/components/ui/button'
import { CustomLink } from '@/components/ui/link'
import { PageLayout } from '@/components/ui/page-layout'

export default function Home() {
  return (
    <PageLayout
      title="欢迎来到我的 Next.js"
      description="简单测试一下 Next.js 的 CICD 流程。"
      maxWidth="4xl"
    >
      {/* <iframe
        src="https://udify.app/chatbot/Ko1vKp40LAhaonJD"
        style="width: 100%; height: 100%; min-height: 700px"
        frameborder="0"
        allow="microphone"
      ></iframe> */}

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
        <CustomLink href="/prisma-demo" className="w-full sm:w-auto">
          🗄️ Prisma 数据库演示
        </CustomLink>
        <CustomLink href="/flow" className="w-full sm:w-auto">
          👉 查看 xflow
        </CustomLink>
        <CustomLink href="/chatBi" className="w-full sm:w-auto">
          👉 chatBI
        </CustomLink>
        <CustomLink
          href="https://www.oceanbase.com/demo#series"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto"
        >
          👉 查看 OB 官网 Demo
        </CustomLink>
        <CustomLink
          href="https://www.oceanbasesearch.site/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto"
        >
          👉 Atlas Hybrid Search
        </CustomLink>
      </div>
      {/* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
        <CustomLink href="/flow" className="w-full sm:w-auto">
          👉 查看 xflow
        </CustomLink>
      </div> */}
    </PageLayout>
  )
}
