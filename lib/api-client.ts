// API客户端 - 支持GitHub Pages和Vercel双环境
const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.GITHUB_PAGES === 'true'
      ? 'https://your-vercel-app.vercel.app' // 替换为你的Vercel应用URL
      : '/api'
    : '/api'

export class ApiClient {
  private baseUrl: string

  constructor() {
    this.baseUrl = API_BASE_URL
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status}`)
    }

    return response.json()
  }

  // Posts API
  async getPosts() {
    return this.request('/api/posts')
  }

  async getPost(id: string) {
    return this.request(`/api/posts/${id}`)
  }

  async createPost(data: any) {
    return this.request('/api/posts', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updatePost(id: string, data: any) {
    return this.request(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deletePost(id: string) {
    return this.request(`/api/posts/${id}`, {
      method: 'DELETE',
    })
  }

  // Users API
  async getUsers() {
    return this.request('/api/users')
  }

  // Movies API
  async getMovies() {
    return this.request('/api/movies')
  }
}

export const apiClient = new ApiClient()
