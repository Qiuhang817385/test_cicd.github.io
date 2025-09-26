import { Button } from './button'
import { CustomLink } from './link'
import { PageLayout } from './page-layout'
import { Container } from './container'
import { Grid } from './grid'
import { Col } from './col'
import { spacing } from '@/lib/spacing'

/**
 * 布局和间距使用示例
 * 展示如何使用 shadcn 优化后的布局系统
 */
export function LayoutExamples() {
  return (
    <div className="space-y-16">
      {/* 基础页面布局示例 */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">基础页面布局</h2>
        <div className="border rounded-lg p-6 bg-muted/20">
          <PageLayout
            title="示例页面"
            description="这是一个使用 PageLayout 组件的示例"
            maxWidth="lg"
            verticalPadding="md"
          >
            <div className="flex gap-4 justify-center">
              <Button>主要操作</Button>
              <Button variant="outline">次要操作</Button>
            </div>
          </PageLayout>
        </div>
      </section>

      {/* 间距系统示例 */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">间距系统</h2>
        <Container>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-4">垂直间距</h3>
              <div className="space-y-4">
                <div className={`${spacing.sm} bg-blue-50 p-4 rounded`}>
                  <div className="bg-blue-200 h-8 rounded"></div>
                  <div className="bg-blue-200 h-8 rounded"></div>
                </div>
                <div className={`${spacing.md} bg-green-50 p-4 rounded`}>
                  <div className="bg-green-200 h-8 rounded"></div>
                  <div className="bg-green-200 h-8 rounded"></div>
                </div>
                <div className={`${spacing.lg} bg-purple-50 p-4 rounded`}>
                  <div className="bg-purple-200 h-8 rounded"></div>
                  <div className="bg-purple-200 h-8 rounded"></div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">水平间距</h3>
              <div className="space-y-4">
                <div
                  className={`${spacing.horizontal.sm} flex bg-orange-50 p-4 rounded`}
                >
                  <div className="bg-orange-200 w-16 h-8 rounded"></div>
                  <div className="bg-orange-200 w-16 h-8 rounded"></div>
                  <div className="bg-orange-200 w-16 h-8 rounded"></div>
                </div>
                <div
                  className={`${spacing.horizontal.md} flex bg-pink-50 p-4 rounded`}
                >
                  <div className="bg-pink-200 w-16 h-8 rounded"></div>
                  <div className="bg-pink-200 w-16 h-8 rounded"></div>
                  <div className="bg-pink-200 w-16 h-8 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 响应式布局示例 */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">响应式布局</h2>
        <Container>
          <Grid cols={1} responsive={{ sm: 2, md: 3, lg: 4 }} gap={4}>
            {Array.from({ length: 8 }, (_, i) => (
              <Col key={i} span={1}>
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-lg text-center">
                  <h4 className="font-medium">卡片 {i + 1}</h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    响应式栅格项目
                  </p>
                </div>
              </Col>
            ))}
          </Grid>
        </Container>
      </section>

      {/* 链接组件示例 */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">链接组件</h2>
        <Container>
          <div className="flex flex-wrap gap-4">
            <CustomLink href="#" variant="default">
              主要链接
            </CustomLink>
            <CustomLink href="#" variant="secondary">
              次要链接
            </CustomLink>
            <CustomLink href="#" variant="outline">
              轮廓链接
            </CustomLink>
            <CustomLink href="#" variant="ghost">
              幽灵链接
            </CustomLink>
            <CustomLink href="#" variant="link">
              文本链接
            </CustomLink>
          </div>
        </Container>
      </section>

      {/* 复杂布局示例 */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">复杂布局</h2>
        <Container>
          <Grid cols={12} gap={6}>
            {/* 头部 */}
            <Col span={12}>
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg text-center">
                <h3 className="text-xl font-semibold">页面头部</h3>
                <p className="text-blue-100 mt-2">使用 12 列栅格系统</p>
              </div>
            </Col>

            {/* 侧边栏 */}
            <Col span={12} responsive={{ md: 3 }}>
              <div className="bg-gray-100 p-6 rounded-lg">
                <h4 className="font-medium mb-4">侧边栏</h4>
                <div className="space-y-2">
                  <CustomLink
                    href="#"
                    variant="ghost"
                    className="w-full justify-start"
                  >
                    菜单项 1
                  </CustomLink>
                  <CustomLink
                    href="#"
                    variant="ghost"
                    className="w-full justify-start"
                  >
                    菜单项 2
                  </CustomLink>
                  <CustomLink
                    href="#"
                    variant="ghost"
                    className="w-full justify-start"
                  >
                    菜单项 3
                  </CustomLink>
                </div>
              </div>
            </Col>

            {/* 主内容 */}
            <Col span={12} responsive={{ md: 9 }}>
              <div className="bg-white border p-6 rounded-lg">
                <h4 className="font-medium mb-4">主内容区域</h4>
                <p className="text-muted-foreground mb-4">
                  这里是主要内容区域，可以放置各种内容组件。
                </p>
                <div className="flex gap-4">
                  <Button>操作按钮</Button>
                  <Button variant="outline">取消</Button>
                </div>
              </div>
            </Col>

            {/* 底部 */}
            <Col span={12}>
              <div className="bg-gray-50 p-6 rounded-lg text-center text-muted-foreground">
                <p>页面底部 - 版权信息等</p>
              </div>
            </Col>
          </Grid>
        </Container>
      </section>
    </div>
  )
}
