---
layout: home

hero:
  name: "ChunhaoFen"
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
    details: Electron 应用的综合基础设施工具包，提供窗口管理、IPC 路由和状态同步功能
    link: /projects/electron-infra-kit
  - icon: 📚
    title: electron-infra-kit-docs
    details: 完整的文档和使用指南，帮助开发者快速上手
    link: /projects/electron-infra-kit-docs
  - icon: 🎯
    title: electron-infra-showcase
    details: 官方示例项目，展示框架的强大功能和最佳实践
    link: /projects/electron-infra-showcase
---

<script setup>
import ProjectGrid from './.vitepress/theme/components/ProjectGrid.vue'
</script>

## 我的项目

<ProjectGrid />
