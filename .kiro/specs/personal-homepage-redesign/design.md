# 设计文档

## 概述

本设计文档描述了一个基于 VitePress 的简洁、现代的个人主页的技术架构和实现方案。VitePress 是一个专为文档和内容站点设计的静态站点生成器，基于 Vite 和 Vue 3，提供了出色的开发体验和性能。

设计目标：
- **简洁性**: 使用 VitePress 的简单配置和 Markdown 内容
- **可维护性**: Markdown 文件易于编辑，配置简单直观
- **响应式**: VitePress 内置响应式设计
- **性能**: 基于 Vite 的快速构建和热更新
- **扩展性**: 支持 Vue 组件，易于自定义

## 架构

### 整体架构

```
开发环境
    ↓
Markdown 文件 + Vue 组件
    ↓
VitePress 构建 (Vite + Vue 3)
    ↓
静态 HTML/CSS/JS
    ↓
GitHub Pages 部署
    ↓
用户访问
```

### 技术栈

- **静态站点生成器**: VitePress 1.x
- **构建工具**: Vite 5.x
- **前端框架**: Vue 3（仅用于自定义组件）
- **内容格式**: Markdown + Frontmatter
- **样式**: CSS/SCSS（支持 CSS Variables）
- **托管**: GitHub Pages
- **CI/CD**: GitHub Actions

### 为什么选择 VitePress？

1. **简单**: 配置简单，Markdown 优先
2. **快速**: Vite 提供极快的开发体验
3. **现代**: 基于 Vue 3，支持自定义组件
4. **主题**: 内置美观的默认主题，易于自定义
5. **SEO**: 自动生成 sitemap，支持 SSG
6. **维护**: 只需编辑 Markdown 文件，无需复杂操作

### 目录结构

```
chunhaofen.github.io/
├── .vitepress/
│   ├── config.ts              # VitePress 配置
│   ├── theme/
│   │   ├── index.ts           # 主题入口
│   │   ├── style.css          # 自定义样式
│   │   └── components/        # 自定义 Vue 组件
│   │       ├── ProjectCard.vue
│   │       ├── ProjectGrid.vue
│   │       └── Badge.vue
│   └── data/
│       └── projects.ts        # 项目数据
├── docs/
│   ├── index.md               # 主页
│   ├── projects/
│   │   ├── index.md           # 项目列表页
│   │   ├── electron-infra-kit.md
│   │   ├── electron-infra-kit-docs.md
│   │   └── electron-infra-showcase.md
│   ├── about.md               # 关于页面
│   └── public/                # 静态资源
│       └── images/
├── package.json
├── tsconfig.json
└── README.md
```


## 组件和接口

### 1. VitePress 配置 (.vitepress/config.ts)

```typescript
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Your Name',
  description: 'Electron 开发者 | 开源项目展示',
  lang: 'zh-CN',
  
  // 主题配置
  themeConfig: {
    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '项目', link: '/projects/' },
      { text: '关于', link: '/about' }
    ],
    
    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/chunhaofen' }
    ],
    
    // 页脚
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Your Name'
    }
  },
  
  // 构建配置
  base: '/',
  outDir: '../dist',
  
  // SEO
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#667eea' }]
  ]
})
```

### 2. 项目数据模型 (.vitepress/data/projects.ts)

```typescript
export interface Project {
  id: string
  title: string
  description: string
  icon: string
  tags: string[]
  order: number
  featured?: boolean
  links: {
    github?: string
    npm?: string
    docs?: string
    demo?: string
  }
  badges?: Array<{
    alt: string
    src: string
  }>
  features: string[]
  techStack: string[]
  version?: string
  releaseDate?: string
}

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
```

### 3. 项目卡片组件 (.vitepress/theme/components/ProjectCard.vue)

```vue
<template>
  <article class="project-card">
    <div class="project-icon">{{ project.icon }}</div>
    <h3 class="project-title">{{ project.title }}</h3>
    <p class="project-description">{{ project.description }}</p>
    
    <div class="project-tags">
      <span v-for="tag in project.tags" :key="tag" class="tag">
        {{ tag }}
      </span>
    </div>
    
    <div class="project-links">
      <a 
        v-if="project.links.github" 
        :href="project.links.github" 
        class="btn-secondary"
        target="_blank"
      >
        GitHub
      </a>
      <a 
        v-if="project.links.npm" 
        :href="project.links.npm" 
        class="btn-secondary"
        target="_blank"
      >
        npm
      </a>
      <a 
        :href="`/projects/${project.id}`" 
        class="btn-primary"
      >
        查看详情
      </a>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Project } from '../../data/projects'

defineProps<{
  project: Project
}>()
</script>

<style scoped>
.project-card {
  padding: 2rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.project-card:hover {
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
}

.project-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.project-title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.project-description {
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
  line-height: 1.6;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tag {
  padding: 0.25rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.project-links {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.btn-primary {
  background: var(--vp-c-brand);
  color: white;
}

.btn-primary:hover {
  background: var(--vp-c-brand-dark);
}

.btn-secondary {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.btn-secondary:hover {
  background: var(--vp-c-bg-mute);
}
</style>
```

### 4. 项目网格组件 (.vitepress/theme/components/ProjectGrid.vue)

```vue
<template>
  <div class="projects-grid">
    <ProjectCard 
      v-for="project in sortedProjects" 
      :key="project.id" 
      :project="project" 
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ProjectCard from './ProjectCard.vue'
import { projects } from '../../data/projects'

const sortedProjects = computed(() => {
  return [...projects].sort((a, b) => a.order - b.order)
})
</script>

<style scoped>
.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

@media (min-width: 768px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
```

### 5. 徽章组件 (.vitepress/theme/components/Badge.vue)

```vue
<template>
  <img 
    :src="src" 
    :alt="alt" 
    class="badge"
    @error="handleError"
  />
</template>

<script setup lang="ts">
defineProps<{
  src: string
  alt: string
}>()

const handleError = (e: Event) => {
  const target = e.target as HTMLImageElement
  target.style.display = 'none'
}
</script>

<style scoped>
.badge {
  display: inline-block;
  margin: 0.25rem;
  vertical-align: middle;
}
</style>
```


## 数据模型

### 项目数据结构

如上所述，项目数据存储在 `.vitepress/data/projects.ts` 中，使用 TypeScript 接口定义类型。

**优势**:
- 类型安全
- IDE 自动补全
- 易于维护和扩展
- 可以在任何 Vue 组件中导入使用

### Markdown 文件结构

#### 主页 (docs/index.md)

```markdown
---
layout: home

hero:
  name: "Your Name"
  text: "Electron 开发者"
  tagline: 专注于构建高质量的桌面应用基础设施
  actions:
    - theme: brand
      text: 查看项目
      link: /projects/
    - theme: alt
      text: 关于我
      link: /about

features:
  - icon: ⚡
    title: electron-infra-kit
    details: Electron 应用的综合基础设施工具包
    link: /projects/electron-infra-kit
  - icon: 📚
    title: electron-infra-kit-docs
    details: 完整的文档和使用指南
    link: /projects/electron-infra-kit-docs
  - icon: 🎯
    title: electron-infra-showcase
    details: 官方示例项目，展示框架功能
    link: /projects/electron-infra-showcase
---

<script setup>
import ProjectGrid from './.vitepress/theme/components/ProjectGrid.vue'
</script>

## 我的项目

<ProjectGrid />
```

#### 项目详情页 (docs/projects/electron-infra-kit.md)

```markdown
---
title: electron-infra-kit
description: Electron 应用的综合基础设施工具包
---

<script setup>
import Badge from '../.vitepress/theme/components/Badge.vue'
</script>

# electron-infra-kit

> Electron 应用的综合基础设施工具包，提供窗口管理、IPC 路由和状态同步功能

<div class="badges">
  <Badge src="https://img.shields.io/npm/v/electron-infra-kit.svg" alt="npm version" />
  <Badge src="https://img.shields.io/npm/dm/electron-infra-kit.svg" alt="npm downloads" />
  <Badge src="https://github.com/chunhaofen/electron-infra-kit/actions/workflows/ci.yml/badge.svg" alt="CI" />
</div>

## 核心特性

- 🪟 **窗口管理器** - 生命周期管理、状态持久化、插件系统
- 🔌 **IPC 路由** - 类型安全的通信，支持依赖注入
- 🌉 **消息总线** - 基于 MessageChannel 的跨窗口实时状态同步
- ⚙️ **配置管理器** - 持久化配置，支持 Zod 验证

## 技术栈

- Electron >= 22.0.0
- TypeScript >= 5.0.0
- Zod
- MessageChannel API

## 快速开始

```bash
npm install electron-infra-kit
```

```typescript
import { createElectronToolkit } from 'electron-infra-kit'

const { windowManager, ipcRouter, messageBus } = createElectronToolkit({
  isDevelopment: process.env.NODE_ENV === 'development',
})
```

## 链接

- [GitHub 仓库](https://github.com/chunhaofen/electron-infra-kit)
- [npm 包](https://www.npmjs.com/package/electron-infra-kit)
- [完整文档](https://github.com/chunhaofen/electron-infra-kit#readme)
- [示例项目](https://github.com/chunhaofen/electron-infra-showcase)

## 版本信息

- 当前版本: v0.1.2
- 发布日期: 2024-01-15
```

#### 关于页面 (docs/about.md)

```markdown
---
title: 关于我
---

# 关于我

你好！我是一名专注于 Electron 桌面应用开发的开发者。

## 技术背景

- 熟悉 Electron、TypeScript、Vue 等技术栈
- 专注于构建高质量的桌面应用基础设施
- 热衷于开源项目和技术分享

## 开源项目

我维护着 electron-infra-kit 系列项目，旨在为 Electron 开发者提供一套完整的基础设施解决方案。

## 联系方式

- GitHub: [@chunhaofen](https://github.com/chunhaofen)
- Email: your-email@example.com

## 技术兴趣

- 桌面应用开发
- 跨进程通信
- 状态管理
- 开发者工具
```


## 正确性属性

*属性是一个特征或行为，应该在系统的所有有效执行中保持为真。本质上，它是关于系统应该做什么的正式陈述。属性作为人类可读规范和机器可验证正确性保证之间的桥梁。*

### 属性反思

基于 VitePress 的实现，我们需要调整一些属性以适应新的技术栈：

**简化的属性**:
1. VitePress 内置了很多功能（导航、响应式、SEO），减少了需要验证的自定义属性
2. Vue 组件提供了类型安全，减少了运行时错误
3. 构建时验证可以捕获大部分配置错误

**保留的核心属性**:
- 项目数据完整性
- 组件渲染正确性
- 链接有效性
- 响应式布局（由 VitePress 主题保证）

### 核心属性

**属性 1: 项目数据完整性**
*对于任意*项目对象，必须包含所有必需字段（id, title, description, icon, tags, order, links, features, techStack）
**验证: 需求 4.3**

**属性 2: 项目卡片渲染完整性**
*对于任意*项目，ProjectCard 组件应该渲染项目的图标、标题、描述、标签和链接
**验证: 需求 1.3**

**属性 3: 项目排序一致性**
*对于任意*项目列表，项目应该按照 order 字段升序排列
**验证: 需求 4.5**

**属性 4: 链接有效性**
*对于任意*项目的外部链接（GitHub, npm, docs），链接应该是有效的 HTTPS URL
**验证: 需求 2.1, 2.3, 5.5**

**属性 5: 徽章优雅降级**
*对于任意*徽章图片，当加载失败时应该隐藏而不是显示破损图标
**验证: 需求 8.5**

**属性 6: TypeScript 类型安全**
*对于任意*项目数据和组件 props，应该通过 TypeScript 类型检查
**验证: 需求 4.3**

**属性 7: Markdown 文件有效性**
*对于任意*项目详情 Markdown 文件，应该包含有效的 frontmatter 和内容
**验证: 需求 2.2**

**属性 8: 响应式布局断点**
*对于任意*视口宽度，ProjectGrid 应该根据断点（768px, 1024px）显示正确的列数（1/2/3列）
**验证: 需求 1.4, 6.4**

## 错误处理

### 构建时错误

1. **TypeScript 类型错误**
   - 检测: TypeScript 编译器
   - 处理: 构建失败，显示类型错误
   - 预防: 使用严格的 TypeScript 配置

2. **VitePress 配置错误**
   - 检测: VitePress 构建过程
   - 处理: 构建失败，显示配置错误
   - 示例: 无效的导航链接、缺失的文件

3. **Markdown 语法错误**
   - 检测: VitePress Markdown 解析器
   - 处理: 构建警告或失败
   - 预防: 使用 Markdown linter

### 运行时错误

1. **组件渲染错误**
   - 场景: Vue 组件抛出异常
   - 处理: Vue 错误边界捕获
   - 示例: 缺失的 props、无效的数据

2. **外部资源加载失败**
   - 场景: 徽章图片、外部链接失效
   - 处理: 
     - 徽章使用 @error 事件隐藏
     - 链接在新标签打开，失败由浏览器处理

3. **数据访问错误**
   - 场景: 访问不存在的项目数据
   - 处理: TypeScript 类型系统在编译时捕获
   - 运行时: 使用可选链和空值合并

### 开发时错误

1. **热更新错误**
   - 检测: Vite HMR
   - 处理: 在浏览器中显示错误覆盖层
   - 修复: 保存文件后自动恢复

2. **依赖错误**
   - 检测: npm/pnpm
   - 处理: 安装失败，显示错误信息
   - 预防: 使用 package-lock.json 锁定版本

## 测试策略

### 类型检查

```bash
# TypeScript 类型检查
npm run type-check
```

**验证**:
- 项目数据类型正确
- 组件 props 类型正确
- 配置文件类型正确

### 构建测试

```bash
# VitePress 构建
npm run build
```

**验证**:
- 所有 Markdown 文件成功解析
- 所有 Vue 组件成功编译
- 生成的静态文件完整

### 链接检查

使用工具检查生成的 HTML 中的链接：

```bash
# 使用 linkinator 或类似工具
npx linkinator dist --recurse
```

**验证**:
- 内部链接有效
- 外部链接可访问（可选）

### 组件测试（可选）

使用 Vitest + Vue Test Utils 测试组件：

```typescript
import { mount } from '@vue/test-utils'
import ProjectCard from './ProjectCard.vue'

describe('ProjectCard', () => {
  it('renders project information', () => {
    const project = {
      id: 'test',
      title: 'Test Project',
      description: 'Test Description',
      icon: '🎯',
      tags: ['Tag1', 'Tag2'],
      order: 1,
      links: { github: 'https://github.com/test' },
      features: ['Feature 1'],
      techStack: ['Tech 1']
    }
    
    const wrapper = mount(ProjectCard, {
      props: { project }
    })
    
    expect(wrapper.text()).toContain('Test Project')
    expect(wrapper.text()).toContain('Test Description')
  })
})
```

### 视觉回归测试（可选）

使用 Playwright 进行截图对比：

```typescript
import { test, expect } from '@playwright/test'

test('homepage looks correct', async ({ page }) => {
  await page.goto('http://localhost:5173')
  await expect(page).toHaveScreenshot('homepage.png')
})
```

### 测试执行流程

```
代码提交
    ↓
GitHub Actions 触发
    ↓
安装依赖 (npm install)
    ↓
类型检查 (npm run type-check)
    ↓
构建 (npm run build)
    ↓
链接检查 (linkinator)
    ↓
所有测试通过 → 部署到 GitHub Pages
    ↓
测试失败 → 通知开发者
```

## 性能优化

### VitePress 内置优化

1. **代码分割**
   - 自动按路由分割代码
   - 懒加载非首屏内容

2. **静态资源优化**
   - 自动压缩 HTML/CSS/JS
   - 图片优化建议

3. **预渲染**
   - SSG 生成静态 HTML
   - 首屏快速加载

### 自定义优化

1. **图片优化**
   - 使用 WebP 格式
   - 提供多种尺寸
   - 使用 VitePress 的图片优化插件

2. **字体优化**
   - 使用系统字体栈
   - 或使用 Google Fonts 的 display=swap

3. **外部资源**
   - 徽章使用 CDN
   - 延迟加载非关键资源

### 性能指标目标

- 首屏加载时间: < 2 秒
- Time to Interactive: < 3 秒
- Lighthouse 性能分数: > 95
- 构建时间: < 30 秒

## 部署和维护

### 部署配置

#### GitHub Actions (.github/workflows/deploy.yml)

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      
      - name: Install dependencies
        run: npm ci
      
      - name: Type check
        run: npm run type-check
      
      - name: Build
        run: npm run build
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 维护指南

#### 1. 添加新项目

**步骤**:
1. 在 `.vitepress/data/projects.ts` 中添加项目数据
2. 在 `docs/projects/` 创建新的 Markdown 文件
3. 提交并推送，自动部署

**示例**:
```typescript
// .vitepress/data/projects.ts
export const projects: Project[] = [
  // ... 现有项目
  {
    id: 'new-project',
    title: 'New Project',
    description: 'Project description',
    icon: '🚀',
    tags: ['Tag1', 'Tag2'],
    order: 4,
    links: {
      github: 'https://github.com/username/new-project'
    },
    features: ['Feature 1', 'Feature 2'],
    techStack: ['Tech 1', 'Tech 2']
  }
]
```

```markdown
<!-- docs/projects/new-project.md -->
---
title: New Project
description: Project description
---

# New Project

项目详细内容...
```

#### 2. 更新现有项目

直接编辑对应的文件：
- 数据更新: `.vitepress/data/projects.ts`
- 内容更新: `docs/projects/项目名.md`

#### 3. 修改样式

编辑 `.vitepress/theme/style.css` 或组件的 `<style>` 部分

#### 4. 更新配置

编辑 `.vitepress/config.ts`

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview

# 类型检查
npm run type-check
```

### 监控和分析

1. **GitHub Insights**
   - 查看部署状态
   - 监控仓库活动

2. **Google Analytics**（可选）
   - 在 `.vitepress/config.ts` 中配置
   - 跟踪页面访问

3. **性能监控**
   - 定期运行 Lighthouse
   - 使用 WebPageTest

## 可访问性

VitePress 默认主题已经考虑了可访问性，但我们需要确保：

1. **语义化 HTML**
   - 使用正确的标题层级
   - 使用语义化标签

2. **键盘导航**
   - 所有交互元素可通过键盘访问
   - 清晰的焦点指示器

3. **颜色对比**
   - 确保文本与背景对比度足够
   - 使用 VitePress 的颜色变量

4. **替代文本**
   - 所有图片提供 alt 属性
   - 徽章提供有意义的 alt 文本

5. **ARIA 标签**
   - 为自定义组件添加适当的 ARIA 属性

## 未来扩展

### 短期扩展（1-2 个月）

1. **博客功能**
   - 添加 `docs/blog/` 目录
   - 配置博客侧边栏
   - 支持标签和分类

2. **搜索功能**
   - 使用 VitePress 内置的本地搜索
   - 或集成 Algolia DocSearch

3. **深色模式**
   - VitePress 内置支持
   - 自定义深色模式颜色

### 长期扩展（3-6 个月）

1. **多语言支持**
   - 使用 VitePress 的 i18n 功能
   - 提供中英文版本

2. **评论系统**
   - 集成 Giscus（基于 GitHub Discussions）
   - 为项目和博客添加评论

3. **RSS 订阅**
   - 使用 VitePress 插件生成 RSS
   - 提供博客订阅

4. **项目统计**
   - 自动获取 GitHub Stars
   - 显示 npm 下载量
   - 使用 GitHub API

## 技术优势总结

### VitePress vs Jekyll

| 特性 | VitePress | Jekyll |
|------|-----------|--------|
| 学习曲线 | 低（熟悉 Vue 更容易） | 中（需要学习 Ruby/Liquid） |
| 构建速度 | 极快（Vite） | 慢 |
| 热更新 | 毫秒级 | 秒级 |
| 类型安全 | TypeScript 支持 | 无 |
| 组件化 | Vue 组件 | Liquid 模板 |
| 生态系统 | 现代前端生态 | Ruby 生态 |
| 维护性 | 高 | 中 |

### VitePress vs 纯 HTML

| 特性 | VitePress | 纯 HTML |
|------|-----------|---------|
| 开发体验 | 优秀 | 基础 |
| 内容管理 | Markdown | HTML |
| 组件复用 | Vue 组件 | 手动复制 |
| 构建优化 | 自动 | 手动 |
| SEO | 内置支持 | 需手动配置 |
| 维护成本 | 低 | 高 |

**结论**: VitePress 提供了最佳的开发体验和维护性，同时保持了简单性。
