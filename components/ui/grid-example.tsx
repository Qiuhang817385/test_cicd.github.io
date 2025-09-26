import { Container } from './container'
import { Grid } from './grid'
import { Col } from './col'
import { Button } from './button'

/**
 * 栅格系统使用示例
 * 这个文件展示了如何使用 Container、Grid 和 Col 组件
 */
export function GridExample() {
  return (
    <div className="space-y-8 p-8">
      <h1 className="text-3xl font-bold">栅格系统示例</h1>

      {/* 基础容器示例 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">基础容器</h2>
        <Container className="bg-gray-100 p-4 rounded">
          <p>这是一个基础容器，具有最大宽度和内边距</p>
        </Container>
      </section>

      {/* 基础栅格示例 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">基础栅格 (3列)</h2>
        <Container>
          <Grid cols={3} gap={4}>
            <Col span={1} className="bg-blue-100 p-4 rounded">
              <p>列 1</p>
            </Col>
            <Col span={1} className="bg-green-100 p-4 rounded">
              <p>列 2</p>
            </Col>
            <Col span={1} className="bg-red-100 p-4 rounded">
              <p>列 3</p>
            </Col>
          </Grid>
        </Container>
      </section>

      {/* 响应式栅格示例 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">响应式栅格</h2>
        <Container>
          <Grid cols={1} responsive={{ sm: 2, md: 3, lg: 4 }} gap={4}>
            {Array.from({ length: 8 }, (_, i) => (
              <Col key={i} span={1} className=" p-4 rounded">
                <p>响应式列 {i + 1}</p>
              </Col>
            ))}
          </Grid>
        </Container>
      </section>

      {/* 不同跨度示例 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">不同跨度</h2>
        <Container>
          <Grid cols={12} gap={4}>
            <Col span={6} className="bg-yellow-100 p-4 rounded">
              <p>占 6 列</p>
            </Col>
            <Col span={3} className="bg-pink-100 p-4 rounded">
              <p>占 3 列</p>
            </Col>
            <Col span={3} className="bg-indigo-100 p-4 rounded">
              <p>占 3 列</p>
            </Col>
          </Grid>
        </Container>
      </section>

      {/* 自动填充示例 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">自动填充栅格</h2>
        <Container>
          <Grid autoFit gap={4} minColWidth="200px">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="bg-orange-100 p-4 rounded">
                <p>自动填充项 {i + 1}</p>
              </div>
            ))}
          </Grid>
        </Container>
      </section>

      {/* 复杂布局示例 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">复杂布局</h2>
        <Container>
          <Grid cols={12} gap={4}>
            {/* 头部 */}
            <Col span={12} className="bg-gray-200 p-4 rounded">
              <p className="text-center font-semibold">头部区域</p>
            </Col>

            {/* 侧边栏 + 主内容 */}
            <Col span={3} className="bg-blue-200 p-4 rounded">
              <p>侧边栏</p>
            </Col>
            <Col span={9} className="bg-green-200 p-4 rounded">
              <p>主内容区域</p>
            </Col>

            {/* 底部 */}
            <Col span={12} className="bg-gray-200 p-4 rounded">
              <p className="text-center font-semibold">底部区域</p>
            </Col>
          </Grid>
        </Container>
      </section>
    </div>
  )
}
