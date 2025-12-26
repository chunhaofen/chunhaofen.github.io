# 链接检查配置

本项目使用 [linkinator](https://github.com/JustinBeckwith/linkinator) 来检查网站中的链接有效性。

## 本地运行链接检查

### 1. 构建网站

首先需要构建网站以生成静态文件：

```bash
npm run build
```

### 2. 运行链接检查

```bash
npm run check-links
```

这将检查 `dist` 目录中所有 HTML 文件的内部链接。

## 配置说明

链接检查配置位于 `linkinator.config.json` 文件中：

```json
{
  "recurse": true,              // 递归检查所有页面
  "silent": false,              // 显示详细输出
  "concurrency": 25,            // 并发请求数
  "timeout": 5000,              // 请求超时时间（毫秒）
  "retry": false,               // 不重试失败的请求
  "skip": [...]                 // 跳过的链接模式
}
```

### 跳过的链接

以下类型的链接会被跳过检查：

1. **外部链接**: 所有 `http://` 和 `https://` 链接（除了 localhost）
2. **邮件链接**: `mailto:` 链接

### 为什么只检查内部链接？

外部链接检查可能会：
- 导致构建时间过长
- 因为外部服务暂时不可用而导致误报
- 触发某些网站的反爬虫机制
- 在 CI 环境中可能因为网络限制而失败

内部链接检查可以快速发现：
- 断开的页面链接
- 错误的文件路径
- 缺失的资源文件

## 常见的"错误"

### 1. favicon.ico 404

这是预期的，如果项目中没有添加 favicon.ico 文件。可以：
- 添加 favicon.ico 到 `docs/public/` 目录
- 或者在 linkinator 配置中忽略它

### 2. 不带 .html 扩展名的链接 404

VitePress 在开发模式和某些配置下会生成不带 `.html` 的链接（如 `/projects/electron-infra-kit`）。
这些链接在实际部署后会正常工作，因为：
- GitHub Pages 会自动处理这些路径
- VitePress 的路由系统会正确解析

如果这些"错误"困扰你，可以：
- 在 VitePress 配置中设置 `cleanUrls: false`
- 或在 linkinator 配置中忽略这些特定路径

## CI/CD 集成

链接检查已集成到 GitHub Actions 工作流中（`.github/workflows/deploy.yml`）：

```yaml
- name: Check links
  run: npm run check-links
  continue-on-error: true
```

注意：
- `continue-on-error: true` 表示即使链接检查失败，部署仍会继续
- 这是因为某些"错误"（如 favicon 或 cleanUrls）是预期的
- 可以在 Actions 日志中查看链接检查结果

## 手动检查外部链接

如果需要检查外部链接，可以临时修改配置：

```bash
# 检查所有链接（包括外部）
npx linkinator dist --recurse
```

或者创建一个单独的配置文件 `linkinator.external.config.json`：

```json
{
  "recurse": true,
  "timeout": 10000,
  "retry": true,
  "skip": [
    "https://img\\.shields\\.io/.*",
    "https://github\\.com/.*/actions/.*"
  ]
}
```

然后运行：

```bash
npx linkinator dist --config linkinator.external.config.json
```

## 修复链接问题

### 添加 favicon

在 `docs/public/` 目录创建或添加 `favicon.ico` 文件。

### 修复内部链接

1. 检查 Markdown 文件中的链接路径
2. 确保链接的目标文件存在
3. 使用相对路径或绝对路径（从 `/` 开始）

### 忽略特定链接

在 `linkinator.config.json` 的 `skip` 数组中添加正则表达式：

```json
{
  "skip": [
    "^https?://(?!localhost)",
    "^mailto:",
    "/favicon\\.ico$",
    "/projects/[^.]+$"
  ]
}
```

## 最佳实践

1. **定期运行**: 在每次重大更新后运行链接检查
2. **修复内部链接**: 优先修复真正的内部链接错误
3. **忽略预期错误**: 配置 skip 规则忽略已知的"误报"
4. **文档化**: 记录跳过特定链接的原因
5. **本地测试**: 在推送前本地运行链接检查

## 相关资源

- [Linkinator GitHub](https://github.com/JustinBeckwith/linkinator)
- [Linkinator 文档](https://github.com/JustinBeckwith/linkinator#readme)
- [VitePress 部署指南](https://vitepress.dev/guide/deploy)
