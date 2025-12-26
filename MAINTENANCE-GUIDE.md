# 维护指南

本文档提供了网站日常维护和更新的详细指南。

## 目录
- [日常维护](#日常维护)
- [内容更新](#内容更新)
- [添加新项目](#添加新项目)
- [样式修改](#样式修改)
- [配置更新](#配置更新)
- [故障排除](#故障排除)
- [性能优化](#性能优化)
- [安全更新](#安全更新)

## 日常维护

### 每周检查
- [ ] 检查 GitHub Actions 工作流状态
- [ ] 验证网站可访问性
- [ ] 检查外部链接有效性
- [ ] 查看 npm 包更新

### 每月检查
- [ ] 运行性能测试 (Lighthouse)
- [ ] 检查依赖安全漏洞
- [ ] 更新项目统计数据（Stars、下载量）
- [ ] 备份重要数据

### 每季度检查
- [ ] 更新依赖包到最新稳定版本
- [ ] 审查和优化构建配置
- [ ] 检查浏览器兼容性
- [ ] 更新文档

## 内容更新

### 更新项目信息

#### 1. 更新项目数据
编辑 `docs/.vitepress/data/projects.ts`:

```typescript
{
  id: 'electron-infra-kit',
  title: 'electron-infra-kit',
  description: '更新后的描述',
  // ... 其他字段
  version: '0.2.0',  // 更新版本号
  releaseDate: '2024-02-01'  // 更新发布日期
}
```

#### 2. 更新项目详情页
编辑 `docs/projects/项目名.md`:

```markdown
# 项目名

> 更新后的简介

## 新增特性

- 新特性 1
- 新特性 2

## 版本信息

- 当前版本: v0.2.0
- 发布日期: 2024-02-01
```

#### 3. 验证和部署
```bash
# 验证数据格式
npm run validate-projects

# 本地预览
npm run dev

# 构建测试
npm run build

# 提交更改
git add .
git commit -m "docs: 更新项目信息"
git push origin master
```

### 更新关于页面
编辑 `docs/about.md`:

```markdown
---
title: 关于我
---

# 关于我

更新个人简介...
```

### 更新主页内容
编辑 `docs/index.md`:

```markdown
---
layout: home

hero:
  name: "Your Name"
  text: "更新后的标语"
  tagline: 更新后的副标题
---
```

## 添加新项目

### 完整流程

#### 步骤 1: 添加项目数据
编辑 `docs/.vitepress/data/projects.ts`:

```typescript
export const projects: Project[] = [
  // ... 现有项目
  {
    id: 'new-project',              // 唯一标识符，用于 URL
    title: 'New Project',           // 显示名称
    description: '项目简短描述',     // 一句话描述
    icon: '🚀',                     // Emoji 图标
    tags: ['Tag1', 'Tag2'],         // 技术标签
    order: 4,                       // 显示顺序（数字越小越靠前）
    featured: true,                 // 是否为特色项目
    links: {
      github: 'https://github.com/username/new-project',
      npm: 'https://www.npmjs.com/package/new-project',
      docs: 'https://docs.example.com',
      demo: 'https://demo.example.com'
    },
    badges: [                       // 可选：徽章
      {
        alt: 'npm version',
        src: 'https://img.shields.io/npm/v/new-project.svg'
      },
      {
        alt: 'npm downloads',
        src: 'https://img.shields.io/npm/dm/new-project.svg'
      }
    ],
    features: [                     // 核心特性列表
      '特性 1 - 详细说明',
      '特性 2 - 详细说明',
      '特性 3 - 详细说明'
    ],
    techStack: ['Tech1', 'Tech2', 'Tech3'],  // 技术栈
    version: '1.0.0',               // 可选：当前版本
    releaseDate: '2024-01-01'       // 可选：发布日期
  }
]
```

#### 步骤 2: 创建项目详情页
创建 `docs/projects/new-project.md`:

```markdown
---
title: New Project
description: 项目描述
---

<script setup>
import Badge from '../.vitepress/theme/components/Badge.vue'
</script>

# New Project

> 项目的简短介绍，一两句话说明项目的核心价值

<div class="badges">
  <Badge src="https://img.shields.io/npm/v/new-project.svg" alt="npm version" />
  <Badge src="https://img.shields.io/npm/dm/new-project.svg" alt="npm downloads" />
  <Badge src="https://github.com/username/new-project/actions/workflows/ci.yml/badge.svg" alt="CI" />
</div>

## 核心特性

- 🎯 **特性 1** - 详细说明
- ⚡ **特性 2** - 详细说明
- 🔧 **特性 3** - 详细说明

## 技术栈

- 技术 1 >= 版本号
- 技术 2 >= 版本号
- 技术 3

## 快速开始

\`\`\`bash
# 安装
npm install new-project

# 或使用 pnpm
pnpm add new-project
\`\`\`

## 基本使用

\`\`\`typescript
import { something } from 'new-project'

// 示例代码
const example = something()
\`\`\`

## 高级功能

### 功能 1

说明和示例代码...

### 功能 2

说明和示例代码...

## API 文档

详细的 API 说明...

## 链接

- [GitHub 仓库](https://github.com/username/new-project)
- [npm 包](https://www.npmjs.com/package/new-project)
- [完整文档](https://docs.example.com)
- [在线演示](https://demo.example.com)

## 版本信息

- 当前版本: v1.0.0
- 发布日期: 2024-01-01

## 许可证

MIT License
```

#### 步骤 3: 验证
```bash
# 验证项目数据格式
npm run validate-projects

# 启动开发服务器
npm run dev

# 访问 http://localhost:5173 查看效果
# 检查主页是否显示新项目卡片
# 检查项目详情页是否正常显示
```

#### 步骤 4: 测试
```bash
# 运行所有测试
npm run test

# 类型检查
npm run type-check

# 构建测试
npm run build

# 链接检查
npm run check-links
```

#### 步骤 5: 部署
```bash
# 提交更改
git add .
git commit -m "feat: 添加新项目 new-project"
git push origin master

# GitHub Actions 会自动构建和部署
```

### 项目排序

项目按 `order` 字段排序，数字越小越靠前：

```typescript
{
  order: 1  // 第一个显示
}
{
  order: 2  // 第二个显示
}
```

要调整顺序，只需修改 `order` 值。

## 样式修改

### 全局样式
编辑 `docs/.vitepress/theme/style.css`:

```css
/* 修改主题色 */
:root {
  --vp-c-brand: #667eea;
  --vp-c-brand-light: #747bff;
  --vp-c-brand-dark: #535bf2;
}

/* 修改字体 */
:root {
  --vp-font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

### 组件样式
编辑组件的 `<style scoped>` 部分：

```vue
<!-- docs/.vitepress/theme/components/ProjectCard.vue -->
<style scoped>
.project-card {
  /* 修改卡片样式 */
  padding: 2rem;
  border-radius: 12px;
}
</style>
```

### 响应式断点
在 `style.css` 中修改断点：

```css
/* 移动端 */
@media (max-width: 768px) {
  /* 样式 */
}

/* 平板 */
@media (min-width: 768px) and (max-width: 1024px) {
  /* 样式 */
}

/* 桌面 */
@media (min-width: 1024px) {
  /* 样式 */
}
```

## 配置更新

### VitePress 配置
编辑 `docs/.vitepress/config.ts`:

```typescript
export default defineConfig({
  // 站点元数据
  title: '网站标题',
  description: '网站描述',
  
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
      { icon: 'github', link: 'https://github.com/username' }
    ]
  }
})
```

### 添加新页面到导航
```typescript
nav: [
  { text: '首页', link: '/' },
  { text: '项目', link: '/projects/' },
  { text: '博客', link: '/blog/' },  // 新增
  { text: '关于', link: '/about' }
]
```

### SEO 配置
```typescript
head: [
  ['link', { rel: 'icon', href: '/favicon.svg' }],
  ['meta', { name: 'theme-color', content: '#667eea' }],
  ['meta', { property: 'og:title', content: '网站标题' }],
  ['meta', { property: 'og:description', content: '网站描述' }]
]
```

## 故障排除

### 构建失败

#### 问题: 依赖安装失败
```bash
# 清理并重新安装
rm -rf node_modules pnpm-lock.yaml
npm install
```

#### 问题: 类型错误
```bash
# 运行类型检查查看详细错误
npm run type-check

# 常见问题：
# 1. 缺少类型定义 -> 安装 @types/包名
# 2. 接口不匹配 -> 检查 projects.ts 中的数据
```

#### 问题: 构建超时
```bash
# 增加 Node.js 内存限制
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

### 开发服务器问题

#### 问题: 端口被占用
```bash
# 使用其他端口
npm run dev -- --port 3000
```

#### 问题: 热更新不工作
```bash
# 清理缓存
rm -rf docs/.vitepress/cache
npm run dev
```

### 部署问题

#### 问题: GitHub Actions 失败
1. 查看 Actions 日志
2. 检查错误步骤
3. 本地复现问题
4. 修复后重新推送

#### 问题: 网站显示旧内容
1. 清除浏览器缓存
2. 等待 CDN 刷新（5-10 分钟）
3. 检查 GitHub Pages 部署状态

### 链接检查失败

#### 问题: 外部链接 404
```bash
# 更新 linkinator.config.json 跳过失效链接
{
  "skip": [
    "^https?://(?!localhost)",
    "^mailto:",
    "失效的链接"
  ]
}
```

## 性能优化

### 图片优化
```bash
# 使用 WebP 格式
# 提供多种尺寸
# 使用懒加载
```

### 代码分割
VitePress 自动按路由分割代码，无需手动配置。

### 构建优化
```typescript
// docs/.vitepress/config.ts
export default defineConfig({
  vite: {
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true
        }
      }
    }
  }
})
```

### 性能监控
```bash
# 使用 Lighthouse
npm install -g lighthouse
lighthouse https://chunhaofen.github.io

# 或使用在线工具
# https://pagespeed.web.dev/
```

## 安全更新

### 检查漏洞
```bash
# 检查依赖漏洞
npm audit

# 自动修复
npm audit fix

# 查看详细报告
npm audit --json
```

### 更新依赖
```bash
# 检查过期包
npm outdated

# 更新所有包到最新版本
npm update

# 更新主要版本
npm install package@latest
```

### 定期更新
建议每月更新一次依赖：

```bash
# 1. 更新 package.json
npm update

# 2. 测试
npm run test
npm run build

# 3. 提交
git add package.json pnpm-lock.yaml
git commit -m "chore: 更新依赖"
git push
```

## 备份和恢复

### 备份
```bash
# 备份整个仓库
git clone https://github.com/chunhaofen/chunhaofen.github.io.git backup

# 或创建分支
git checkout -b backup-2024-12-26
git push origin backup-2024-12-26
```

### 恢复
```bash
# 从备份恢复
git checkout backup-2024-12-26
git checkout -b main
git push origin main --force

# 或回滚到特定提交
git revert <commit-hash>
git push
```

## 监控和分析

### GitHub Actions 监控
- 访问: https://github.com/chunhaofen/chunhaofen.github.io/actions
- 设置通知: Settings > Notifications

### 网站分析（可选）
可以添加 Google Analytics：

```typescript
// docs/.vitepress/config.ts
export default defineConfig({
  head: [
    ['script', { 
      async: '', 
      src: 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX' 
    }],
    ['script', {}, `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    `]
  ]
})
```

## 联系和支持

### 获取帮助
- VitePress 文档: https://vitepress.dev/
- GitHub Issues: https://github.com/chunhaofen/chunhaofen.github.io/issues
- VitePress Discord: https://chat.vitejs.dev/

### 报告问题
创建 GitHub Issue 时请包含：
1. 问题描述
2. 复现步骤
3. 预期行为
4. 实际行为
5. 环境信息（浏览器、Node.js 版本等）

---

**最后更新**: 2024-12-26
**维护者**: chunhaofen
