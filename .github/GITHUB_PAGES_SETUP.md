# GitHub Pages 配置指南

本文档说明如何在 GitHub 仓库中配置 GitHub Pages 以使用 GitHub Actions 进行部署。

## 配置步骤

### 1. 启用 GitHub Pages

1. 打开 GitHub 仓库页面
2. 点击 **Settings** (设置) 标签
3. 在左侧菜单中找到 **Pages** 选项
4. 在 **Build and deployment** (构建和部署) 部分：
   - **Source** (源): 选择 **GitHub Actions**
   - 这将允许使用我们创建的 `.github/workflows/deploy.yml` 工作流进行部署

### 2. 验证配置

配置完成后：

1. 推送代码到 `main` 分支
2. 在仓库的 **Actions** 标签中查看工作流运行状态
3. 等待构建和部署完成（通常需要 1-3 分钟）
4. 部署成功后，在 **Settings > Pages** 中会显示网站 URL

### 3. 自定义域名配置（可选）

如果需要使用自定义域名：

1. 在 **Settings > Pages** 的 **Custom domain** 部分输入域名
2. 在域名提供商处添加 DNS 记录：
   - 对于根域名（example.com）：添加 A 记录指向 GitHub Pages IP
   - 对于子域名（www.example.com）：添加 CNAME 记录指向 `<username>.github.io`
3. 等待 DNS 传播（可能需要几分钟到几小时）
4. 勾选 **Enforce HTTPS** 启用 HTTPS

### 4. 验证部署

部署成功后，访问以下 URL 之一：

- 默认 URL: `https://<username>.github.io/`
- 自定义域名: `https://your-custom-domain.com/`

## 故障排除

### 工作流失败

如果 GitHub Actions 工作流失败：

1. 检查 **Actions** 标签中的错误日志
2. 常见问题：
   - 依赖安装失败：检查 `package.json` 和 `package-lock.json`
   - 类型检查失败：运行 `npm run type-check` 本地验证
   - 构建失败：运行 `npm run build` 本地验证

### 页面无法访问

如果部署成功但页面无法访问：

1. 检查 **Settings > Pages** 中的部署状态
2. 确认 `base` 配置正确（在 `.vitepress/config.ts` 中）
3. 清除浏览器缓存后重试

### 自定义域名问题

如果自定义域名无法工作：

1. 使用 `dig` 或 `nslookup` 验证 DNS 记录
2. 等待 DNS 传播完成
3. 检查域名提供商的 DNS 配置

## 相关链接

- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [VitePress 部署指南](https://vitepress.dev/guide/deploy)
