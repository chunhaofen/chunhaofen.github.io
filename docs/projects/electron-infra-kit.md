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
  <Badge src="https://github.com/chunhaofen/electron-infra-kit/actions/workflows/ci.yml/badge.svg" alt="CI status" />
</div>

## 核心特性

- 🪟 **窗口管理器** - 生命周期管理、状态持久化、插件系统
- 🔌 **IPC 路由** - 类型安全的通信，支持依赖注入
- 🌉 **消息总线** - 基于 MessageChannel 的跨窗口实时状态同步
- ⚙️ **配置管理器** - 持久化配置，支持 Zod 验证

## 技术栈

- **Electron** >= 22.0.0
- **TypeScript** >= 5.0.0
- **Zod** - 数据验证
- **MessageChannel API** - 跨窗口通信

## 快速开始

### 安装

```bash
npm install electron-infra-kit
```

### 基础使用

```typescript
import { createElectronToolkit } from 'electron-infra-kit'

// 创建工具包实例
const { windowManager, ipcRouter, messageBus } = createElectronToolkit({
  isDevelopment: process.env.NODE_ENV === 'development',
})

// 使用窗口管理器
const mainWindow = windowManager.create('main', {
  width: 1200,
  height: 800,
  webPreferences: {
    preload: path.join(__dirname, 'preload.js')
  }
})

// 使用 IPC 路由
ipcRouter.handle('user:get', async (userId: string) => {
  return await getUserById(userId)
})

// 使用消息总线
messageBus.subscribe('theme:changed', (theme) => {
  console.log('Theme changed to:', theme)
})
```

## 主要功能模块

### 窗口管理器

提供完整的窗口生命周期管理：

- 窗口创建和销毁
- 状态持久化（位置、大小）
- 插件系统支持
- 窗口间通信

### IPC 路由系统

类型安全的进程间通信：

- 自动类型推导
- 依赖注入支持
- 中间件机制
- 错误处理

### 消息总线

基于 MessageChannel 的实时状态同步：

- 跨窗口状态同步
- 发布/订阅模式
- 类型安全的消息传递
- 自动清理机制

### 配置管理器

持久化配置管理：

- 支持 Zod 验证
- 自动保存
- 类型安全
- 默认值支持

## 相关链接

- [GitHub 仓库](https://github.com/chunhaofen/electron-infra-kit)
- [npm 包](https://www.npmjs.com/package/electron-infra-kit)
- [完整文档](https://github.com/chunhaofen/electron-infra-kit#readme)
- [示例项目](https://github.com/chunhaofen/electron-infra-showcase)

## 版本信息

- **当前版本**: v0.1.2
- **发布日期**: 2024-01-15
- **许可证**: MIT

## 贡献

欢迎提交 Issue 和 Pull Request！

## 支持

如果这个项目对你有帮助，欢迎给个 Star ⭐️
