# ChunhaoFen 个人主页

> 基于 VitePress 构建的简洁、现代的个人主页，展示 electron-infra-kit 及相关开源项目。

🌐 **在线访问**: [https://chunhaofen.github.io](https://chunhaofen.github.io)

## 📋 项目简介

这是一个使用 VitePress 构建的静态网站，用于展示个人开源项目，特别是 electron-infra-kit 系列项目。网站设计简洁，注重性能和可维护性。

### 主要特性

- ⚡ **快速**: 基于 Vite 的极速开发体验和构建
- 📝 **Markdown 优先**: 使用 Markdown 编写内容，简单易维护
- 🎨 **响应式设计**: 完美适配桌面、平板和移动设备
- 🔍 **SEO 优化**: 完整的 meta 标签和 Open Graph 配置
- 🚀 **性能优化**: 代码分割、压缩、系统字体等优化措施
- 🧩 **组件化**: 使用 Vue 3 组件实现可复用的 UI

## 🛠️ 技术栈

- **静态站点生成器**: [VitePress](https://vitepress.dev/) 1.x
- **构建工具**: [Vite](https://vitejs.dev/) 5.x
- **前端框架**: [Vue](https://vuejs.org/) 3.x
- **语言**: TypeScript
- **样式**: CSS (使用 CSS Variables)
- **托管**: GitHub Pages
- **CI/CD**: GitHub Actions

## 📁 项目结构

```
chunhaofen.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 部署配置
├── docs/
│   ├── .vitepress/
│   │   ├── config.ts           # VitePress 配置文件
│   │   ├── theme/              # 自定义主题
│   │   │   ├── index.ts        # 主题入口
│   │   │   ├── style.css       # 自定义样式
│   │   │   └── components/     # Vue 组件
│   │   │       ├── ProjectCard.vue
│   │   │       ├── ProjectGrid.vue
│   │   │       └── Badge.vue
│   │   └── data/
│   │       ├── projects.ts     # 项目数据
│   │       └── validate-projects.ts
│   ├── projects/               # 项目详情页
│   │   ├── index.md
│   │   ├── electron-infra-kit.md
│   │   ├── electron-infra-kit-docs.md
│   │   └── electron-infra-showcase.md
│   ├── public/                 # 静态资源
│   │   ├── favicon.svg
│   │   └── ...
│   ├── index.md                # 主页
│   └── about.md                # 关于页面
├── dist/                       # 构建输出目录
├── package.json
├── tsconfig.json
└── README.md                   # 本文件
```

## 🚀 本地开发

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0 (推荐) 或 npm >= 9.0.0

### 安装依赖

```bash
# 使用 pnpm (推荐)
pnpm install

# 或使用 npm
npm install
```

### 开发命令

```bash
# 启动开发服务器 (http://localhost:5173)
pnpm dev

# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview

# TypeScript 类型检查
pnpm type-check

# 验证项目数据
pnpm validate-projects

# 运行测试
pnpm test

# 检查链接有效性 (需要先构建)
pnpm check-links

# 分析构建产物大小
pnpm analyze-bundle
```

### 开发流程

1. 克隆仓库并安装依赖
2. 运行 `pnpm dev` 启动开发服务器
3. 在浏览器中访问 `http://localhost:5173`
4. 编辑 Markdown 文件或 Vue 组件，保存后自动热更新
5. 使用 `pnpm build` 构建生产版本
6. 使用 `pnpm preview` 预览构建结果

## 📝 内容维护

### 添加新项目

#### 1. 更新项目数据

编辑 `docs/.vitepress/data/projects.ts`，添加新项目：

```typescript
export const projects: Project[] = [
  // ... 现有项目
  {
    id: 'new-project',              // 唯一标识符
    title: 'New Project',           // 项目名称
    description: '项目简短描述',     // 简短描述
    icon: '🚀',                     // Emoji 图标
    tags: ['Tag1', 'Tag2'],         // 技术标签
    order: 4,                       // 显示顺序
    featured: true,                 // 是否为特色项目
    links: {
      github: 'https://github.com/username/new-project',
      npm: 'https://www.npmjs.com/package/new-project',
      docs: 'https://docs.example.com'
    },
    badges: [                       // 可选：徽章
      {
        alt: 'npm version',
        src: 'https://img.shields.io/npm/v/new-project.svg'
      }
    ],
    features: [                     // 核心特性列表
      '特性 1',
      '特性 2'
    ],
    techStack: ['Tech1', 'Tech2'],  // 技术栈
    version: '1.0.0',               // 可选：版本号
    releaseDate: '2024-01-01'       // 可选：发布日期
  }
]
```

#### 2. 创建项目详情页

在 `docs/projects/` 目录下创建新的 Markdown 文件 `new-project.md`：

```markdown
---
title: New Project
description: 项目描述
---

<script setup>
import Badge from '../.vitepress/theme/components/Badge.vue'
</script>

# New Project

> 项目简短介绍

<div class="badges">
  <Badge src="https://img.shields.io/npm/v/new-project.svg" alt="npm version" />
</div>

## 核心特性

- 特性 1
- 特性 2

## 技术栈

- 技术 1
- 技术 2

## 快速开始

\`\`\`bash
npm install new-project
\`\`\`

## 链接

- [GitHub 仓库](https://github.com/username/new-project)
- [npm 包](https://www.npmjs.com/package/new-project)
```

#### 3. 更新导航（可选）

如果需要在侧边栏添加新项目，编辑 `docs/.vitepress/config.ts`：

```typescript
sidebar: {
  '/projects/': [
    {
      text: '项目列表',
      items: [
        // ... 现有项目
        { text: 'New Project', link: '/projects/new-project' }
      ]
    }
  ]
}
```

#### 4. 验证和测试

```bash
# 验证项目数据格式
pnpm validate-projects

# 启动开发服务器查看效果
pnpm dev

# 构建并检查
pnpm build
```

### 更新现有项目

直接编辑对应的文件：
- **数据更新**: `docs/.vitepress/data/projects.ts`
- **内容更新**: `docs/projects/项目名.md`

### 修改样式

- **全局样式**: 编辑 `docs/.vitepress/theme/style.css`
- **组件样式**: 编辑对应组件的 `<style>` 部分

### 更新配置

编辑 `docs/.vitepress/config.ts` 修改：
- 网站标题、描述
- 导航栏
- 侧边栏
- SEO 配置
- 构建选项

## 🚢 部署

### 自动部署

项目配置了 GitHub Actions，当代码推送到 `main` 分支时会自动：

1. 安装依赖
2. 运行类型检查
3. 构建生产版本
4. 部署到 GitHub Pages

### 手动部署

```bash
# 构建
pnpm build

# 部署到 GitHub Pages (需要配置 gh-pages)
# 或直接推送到 main 分支触发自动部署
git add .
git commit -m "Update content"
git push origin main
```

### GitHub Pages 配置

1. 进入仓库 Settings > Pages
2. Source 选择 "GitHub Actions"
3. 等待部署完成
4. 访问 `https://username.github.io`

## 🧪 测试

### 类型检查

```bash
pnpm type-check
```

### 组件测试

```bash
pnpm test
```

### 链接检查

```bash
# 先构建
pnpm build

# 检查链接
pnpm check-links
```

### 性能测试

使用 Lighthouse 或 WebPageTest 测试：
- 首屏加载时间
- Time to Interactive
- 性能分数

## 📊 性能优化

项目已实施以下优化：

### 构建优化
- ✅ CSS 代码分割
- ✅ JavaScript 压缩（Terser）
- ✅ 移除生产环境 console
- ✅ Vendor chunks 分离

### 资源优化
- ✅ 系统字体栈（无外部字体加载）
- ✅ 图片懒加载（VitePress 内置）
- ✅ 徽章使用 CDN

### SEO 优化
- ✅ 完整的 meta 标签
- ✅ Open Graph 配置
- ✅ Twitter Card 配置
- ✅ Sitemap 自动生成
- ✅ Favicon 配置

详见 `docs/.vitepress/performance-notes.md`

## 🔧 故障排除

### 构建失败

```bash
# 清理依赖重新安装
rm -rf node_modules pnpm-lock.yaml
pnpm install

# 清理缓存
rm -rf .vitepress/cache dist
```

### 类型错误

```bash
# 运行类型检查查看详细错误
pnpm type-check
```

### 开发服务器无法启动

```bash
# 检查端口是否被占用
lsof -i :5173

# 或使用其他端口
pnpm dev -- --port 3000
```

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📮 联系方式

- GitHub: [@chunhaofen](https://github.com/chunhaofen)
- 网站: [https://chunhaofen.github.io](https://chunhaofen.github.io)

## 🙏 致谢

- [VitePress](https://vitepress.dev/) - 优秀的静态站点生成器
- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具

---

**最后更新**: 2024-12-26
