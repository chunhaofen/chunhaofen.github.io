/**
 * 项目数据类型定义
 * 定义了个人主页中展示的项目的数据结构
 */

/**
 * 项目接口
 * 包含项目的所有必需和可选字段
 */
export interface Project {
  /** 项目唯一标识符 */
  id: string
  
  /** 项目标题 */
  title: string
  
  /** 项目简短描述 */
  description: string
  
  /** 项目图标（emoji 或图片路径） */
  icon: string
  
  /** 项目标签列表 */
  tags: string[]
  
  /** 项目排序顺序（数字越小越靠前） */
  order: number
  
  /** 是否为特色项目（可选） */
  featured?: boolean
  
  /** 项目相关链接 */
  links: {
    /** GitHub 仓库链接（可选） */
    github?: string
    /** npm 包链接（可选） */
    npm?: string
    /** 文档链接（可选） */
    docs?: string
    /** 演示链接（可选） */
    demo?: string
  }
  
  /** 项目徽章列表（可选） */
  badges?: Array<{
    /** 徽章替代文本 */
    alt: string
    /** 徽章图片 URL */
    src: string
  }>
  
  /** 项目核心特性列表 */
  features: string[]
  
  /** 项目技术栈列表 */
  techStack: string[]
  
  /** 项目版本号（可选） */
  version?: string
  
  /** 发布日期（可选） */
  releaseDate?: string
}

/**
 * 项目数据数组
 * 存储所有要展示的项目
 */
export const projects: Project[] = [
  {
    id: 'electron-infra-kit',
    title: 'electron-infra-kit',
    description: 'Electron 应用的综合基础设施工具包，提供窗口管理、IPC 路由和状态同步功能',
    icon: '⚡',
    tags: ['Electron', 'TypeScript', 'Window Manager', 'IPC'],
    order: 1,
    featured: true,
    links: {
      github: 'https://github.com/chunhaofen/electron-infra-kit',
      npm: 'https://www.npmjs.com/package/electron-infra-kit',
      docs: 'https://github.com/chunhaofen/electron-infra-kit#readme'
    },
    badges: [
      {
        alt: 'npm version',
        src: 'https://img.shields.io/npm/v/electron-infra-kit.svg'
      },
      {
        alt: 'npm downloads',
        src: 'https://img.shields.io/npm/dm/electron-infra-kit.svg'
      },
      {
        alt: 'CI status',
        src: 'https://github.com/chunhaofen/electron-infra-kit/actions/workflows/ci.yml/badge.svg'
      }
    ],
    features: [
      '窗口管理器 - 生命周期管理、状态持久化、插件系统',
      'IPC 路由 - 类型安全的通信，支持依赖注入',
      '消息总线 - 基于 MessageChannel 的跨窗口实时状态同步',
      '配置管理器 - 持久化配置，支持 Zod 验证'
    ],
    techStack: ['Electron', 'TypeScript', 'Zod', 'MessageChannel'],
    version: '0.1.2',
    releaseDate: '2024-01-15'
  },
  {
    id: 'electron-infra-kit-docs',
    title: 'electron-infra-kit-docs',
    description: 'electron-infra-kit 的完整文档站点',
    icon: '📚',
    tags: ['Documentation', 'VitePress'],
    order: 2,
    featured: false,
    links: {
      github: 'https://github.com/chunhaofen/electron-infra-kit-docs',
      docs: 'https://github.com/chunhaofen/electron-infra-kit-docs'
    },
    features: [
      '完整的 API 文档',
      '使用指南和最佳实践',
      '示例代码和教程'
    ],
    techStack: ['VitePress', 'Markdown']
  },
  {
    id: 'electron-infra-showcase',
    title: 'electron-infra-showcase',
    description: 'electron-infra-kit 的官方示例项目，展示框架的强大功能',
    icon: '🎯',
    tags: ['Electron', 'Vue', 'TypeScript', 'Demo'],
    order: 3,
    featured: true,
    links: {
      github: 'https://github.com/chunhaofen/electron-infra-showcase'
    },
    features: [
      '多窗口数据同步演示',
      'IPC 路由系统示例',
      '完整的项目结构和最佳实践'
    ],
    techStack: ['Electron', 'Vue 3', 'TypeScript', 'Element Plus']
  }
]
