# 性能优化说明

## 已实施的优化

### 1. 构建优化
- **代码分割**: 启用 CSS 代码分割，按需加载样式
- **压缩**: 使用 Terser 压缩 JavaScript，移除 console 和 debugger
- **分块策略**: 将 Vue 和 VitePress 分离为独立 vendor chunks
- **依赖预构建**: 优化 Vue 依赖的预构建

### 2. 字体加载策略
- **系统字体栈**: 使用系统原生字体，避免外部字体加载延迟
- **无网络请求**: 不依赖 Google Fonts 等外部字体服务
- **即时渲染**: 字体立即可用，无 FOIT/FOUT 问题

### 3. 图片优化建议
- **WebP 格式**: 建议使用 WebP 格式替代 PNG/JPG
- **响应式图片**: 为不同设备提供不同尺寸
- **懒加载**: VitePress 自动处理图片懒加载

### 4. 资源加载
- **徽章 CDN**: 使用 shields.io CDN 加载徽章
- **外部资源**: 最小化外部依赖

## 性能指标目标

- 首屏加载时间: < 2 秒
- Time to Interactive: < 3 秒
- Lighthouse 性能分数: > 95
- 构建时间: < 30 秒

## 监控建议

1. 定期运行 Lighthouse 审计
2. 使用 `npm run build` 检查构建产物大小
3. 使用浏览器开发者工具分析加载性能

## 图片优化工具

如需转换图片为 WebP 格式，可使用：
- 在线工具: https://squoosh.app/
- CLI 工具: `npm install -g @squoosh/cli`
- 批量转换: `squoosh-cli --webp auto *.{jpg,png}`
