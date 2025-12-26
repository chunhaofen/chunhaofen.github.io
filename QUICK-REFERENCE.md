# 快速参考指南

## 常用命令

### 开发
```bash
npm run dev              # 启动开发服务器 (http://localhost:5173)
npm run build            # 构建生产版本
npm run preview          # 预览构建结果
```

### 测试和验证
```bash
npm run test             # 运行单元测试
npm run type-check       # TypeScript 类型检查
npm run validate-projects # 验证项目数据
npm run check-links      # 检查链接有效性
```

### 分析
```bash
npm run analyze-bundle   # 分析构建产物大小
```

## 文件结构速查

### 核心文件
```
docs/
├── .vitepress/
│   ├── config.ts              # VitePress 配置
│   ├── theme/
│   │   ├── index.ts           # 主题入口
│   │   ├── style.css          # 全局样式
│   │   └── components/        # Vue 组件
│   └── data/
│       └── projects.ts        # 项目数据
├── index.md                   # 主页
├── about.md                   # 关于页面
└── projects/                  # 项目详情页
    ├── index.md
    ├── electron-infra-kit.md
    ├── electron-infra-kit-docs.md
    └── electron-infra-showcase.md
```

### 配置文件
```
.github/workflows/deploy.yml   # GitHub Actions 部署配置
package.json                   # 项目依赖和脚本
tsconfig.json                  # TypeScript 配置
vitest.config.ts              # 测试配置
linkinator.config.json        # 链接检查配置
```

## 快速操作

### 添加新项目（3 步）
1. 编辑 `docs/.vitepress/data/projects.ts` 添加项目数据
2. 创建 `docs/projects/项目名.md` 详情页
3. 提交并推送到 master 分支

### 更新项目信息（2 步）
1. 编辑 `docs/.vitepress/data/projects.ts` 或 `docs/projects/项目名.md`
2. 提交并推送到 master 分支

### 修改样式（2 步）
1. 编辑 `docs/.vitepress/theme/style.css` 或组件样式
2. 提交并推送到 master 分支

### 更新配置（2 步）
1. 编辑 `docs/.vitepress/config.ts`
2. 提交并推送到 master 分支

## 项目数据字段

### 必需字段
```typescript
{
  id: string              // 唯一标识符
  title: string           // 项目名称
  description: string     // 简短描述
  icon: string           // Emoji 图标
  tags: string[]         // 技术标签
  order: number          // 显示顺序
  links: {               // 链接
    github?: string
    npm?: string
    docs?: string
    demo?: string
  }
  features: string[]     // 核心特性
  techStack: string[]    // 技术栈
}
```

### 可选字段
```typescript
{
  featured?: boolean     // 是否特色项目
  badges?: Array<{       // 徽章
    alt: string
    src: string
  }>
  version?: string       // 版本号
  releaseDate?: string   // 发布日期
}
```

## 常见任务

### 本地开发流程
```bash
# 1. 启动开发服务器
npm run dev

# 2. 编辑文件（自动热更新）
# 3. 在浏览器中查看效果 (http://localhost:5173)

# 4. 构建测试
npm run build

# 5. 预览构建结果
npm run preview
```

### 部署流程
```bash
# 1. 确保所有测试通过
npm run test
npm run type-check
npm run build

# 2. 提交更改
git add .
git commit -m "描述更改"

# 3. 推送到 GitHub
git push origin master

# 4. GitHub Actions 自动部署
# 访问 https://github.com/chunhaofen/chunhaofen.github.io/actions 查看状态
```

### 故障排除流程
```bash
# 1. 清理缓存和依赖
rm -rf node_modules pnpm-lock.yaml
rm -rf docs/.vitepress/cache dist

# 2. 重新安装
npm install

# 3. 运行测试
npm run type-check
npm run test
npm run build

# 4. 如果问题持续，查看日志
# - GitHub Actions 日志
# - 浏览器控制台
# - 终端输出
```

## 重要链接

### 项目相关
- 网站: https://chunhaofen.github.io
- 仓库: https://github.com/chunhaofen/chunhaofen.github.io
- Actions: https://github.com/chunhaofen/chunhaofen.github.io/actions
- Issues: https://github.com/chunhaofen/chunhaofen.github.io/issues

### 文档
- VitePress: https://vitepress.dev/
- Vue 3: https://vuejs.org/
- TypeScript: https://www.typescriptlang.org/
- Vitest: https://vitest.dev/

### 工具
- GitHub Pages: https://docs.github.com/pages
- GitHub Actions: https://docs.github.com/actions
- Lighthouse: https://pagespeed.web.dev/

## 性能指标

### 目标
- 首屏加载: < 2 秒
- Time to Interactive: < 3 秒
- Lighthouse 性能分数: > 95
- 构建时间: < 30 秒

### 检查
```bash
# 本地构建时间
npm run build

# 在线性能测试
# 访问 https://pagespeed.web.dev/
# 输入 https://chunhaofen.github.io
```

## Git 工作流

### 分支策略
- `master`: 主分支，自动部署到生产环境
- `feature/*`: 功能分支（可选）
- `fix/*`: 修复分支（可选）

### 提交信息规范
```
feat: 添加新功能
fix: 修复问题
docs: 更新文档
style: 样式调整
refactor: 代码重构
test: 测试相关
chore: 构建/工具相关
```

### 示例
```bash
git commit -m "feat: 添加新项目 xxx"
git commit -m "fix: 修复移动端布局问题"
git commit -m "docs: 更新维护指南"
git commit -m "style: 优化项目卡片样式"
```

## 环境要求

### 开发环境
- Node.js >= 18.0.0
- npm >= 9.0.0 或 pnpm >= 8.0.0
- Git >= 2.0.0

### 浏览器支持
- Chrome/Edge >= 90
- Firefox >= 88
- Safari >= 14
- iOS Safari >= 14
- Android Chrome >= 90

## 联系方式

- GitHub: [@chunhaofen](https://github.com/chunhaofen)
- Issues: [提交问题](https://github.com/chunhaofen/chunhaofen.github.io/issues)

---

**提示**: 将此文件加入书签以便快速查阅！
