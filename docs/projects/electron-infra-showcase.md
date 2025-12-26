---
title: electron-infra-showcase
description: electron-infra-kit 的官方示例项目
---

# electron-infra-showcase

> electron-infra-kit 的官方示例项目，展示框架的强大功能和最佳实践

## 项目简介

electron-infra-showcase 是一个完整的 Electron 应用示例，展示了如何使用 electron-infra-kit 框架构建现代化的桌面应用。项目包含了框架所有核心功能的实际应用场景，是学习和参考的最佳资源。

## 核心功能演示

### 🪟 多窗口数据同步演示

展示如何使用消息总线实现多个窗口之间的实时数据同步：

- 主窗口与子窗口的状态同步
- 跨窗口的主题切换
- 实时数据更新和广播
- 窗口间的消息传递

### 🔌 IPC 路由系统示例

演示类型安全的进程间通信：

- 主进程与渲染进程的双向通信
- 类型安全的 API 调用
- 依赖注入的使用
- 错误处理和异常捕获
- 中间件的应用

### 🎯 窗口管理最佳实践

展示窗口管理器的完整功能：

- 窗口的创建和销毁
- 窗口状态的持久化
- 窗口位置和大小的记忆
- 多窗口的协调管理
- 窗口插件系统的使用

### ⚙️ 配置管理演示

展示配置管理器的使用：

- 应用配置的持久化
- 配置的验证和类型安全
- 默认配置的处理
- 配置的动态更新

## 技术栈

- **Electron** - 跨平台桌面应用框架
- **Vue 3** - 渐进式前端框架
- **TypeScript** - 类型安全的 JavaScript
- **Element Plus** - Vue 3 组件库
- **electron-infra-kit** - 基础设施工具包
- **Vite** - 下一代前端构建工具

## 项目结构

```
electron-infra-showcase/
├── src/
│   ├── main/              # 主进程代码
│   │   ├── index.ts       # 主进程入口
│   │   ├── windows/       # 窗口管理
│   │   └── ipc/           # IPC 路由
│   ├── renderer/          # 渲染进程代码
│   │   ├── main/          # 主窗口
│   │   ├── settings/      # 设置窗口
│   │   └── components/    # 共享组件
│   └── preload/           # 预加载脚本
├── resources/             # 应用资源
└── build/                 # 构建配置
```

## 功能演示说明

### 1. 主题切换演示

展示如何使用消息总线在所有窗口间同步主题设置：

- 在任意窗口切换主题
- 所有打开的窗口实时更新
- 主题设置持久化保存

### 2. 数据同步演示

展示多窗口间的数据同步：

- 在主窗口修改数据
- 子窗口实时显示更新
- 双向数据同步

### 3. 窗口管理演示

展示窗口管理的各种功能：

- 创建不同类型的窗口
- 窗口状态的保存和恢复
- 窗口间的父子关系
- 窗口的显示和隐藏

### 4. IPC 通信演示

展示类型安全的 IPC 通信：

- 异步 API 调用
- 错误处理
- 进度反馈
- 取消操作

## 快速开始

### 克隆项目

```bash
git clone https://github.com/chunhaofen/electron-infra-showcase.git
cd electron-infra-showcase
```

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建应用

```bash
# Windows
npm run build:win

# macOS
npm run build:mac

# Linux
npm run build:linux
```

## 学习路径

1. **基础使用** - 从主进程入口开始，了解框架的初始化
2. **窗口管理** - 学习如何创建和管理窗口
3. **IPC 通信** - 掌握进程间通信的最佳实践
4. **状态同步** - 理解消息总线的使用场景
5. **配置管理** - 学习配置的持久化和验证

## 相关链接

- [GitHub 仓库](https://github.com/chunhaofen/electron-infra-showcase)
- [electron-infra-kit 主项目](https://github.com/chunhaofen/electron-infra-kit)
- [完整文档](https://github.com/chunhaofen/electron-infra-kit-docs)

## 贡献

欢迎提交 Issue 和 Pull Request 来改进示例项目！

## 许可证

MIT License

---

**提示**: 这个示例项目是学习 electron-infra-kit 的最佳起点。建议先运行项目，体验各项功能，然后再深入研究代码实现。
