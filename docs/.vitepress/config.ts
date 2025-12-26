import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'ChunhaoFen',
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
      copyright: 'Copyright © 2024-present ChunhaoFen'
    },

    // 侧边栏
    sidebar: {
      '/projects/': [
        {
          text: '项目列表',
          items: [
            { text: 'electron-infra-kit', link: '/projects/electron-infra-kit' },
            { text: 'electron-infra-kit-docs', link: '/projects/electron-infra-kit-docs' },
            { text: 'electron-infra-showcase', link: '/projects/electron-infra-showcase' }
          ]
        }
      ]
    }
  },
  
  // 构建配置
  base: '/',
  outDir: '../dist',
  
  // 性能优化：启用代码分割和压缩
  vite: {
    build: {
      // 启用 CSS 代码分割
      cssCodeSplit: true,
      // 启用压缩
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, // 生产环境移除 console
          drop_debugger: true
        }
      }
    },
    // 优化依赖预构建
    optimizeDeps: {
      include: ['vue']
    }
  },
  
  // SEO 配置
  head: [
    // Favicon
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    
    // Theme color
    ['meta', { name: 'theme-color', content: '#667eea' }],
    
    // SEO meta tags
    ['meta', { name: 'keywords', content: 'Electron, TypeScript, 开源项目, electron-infra-kit, 桌面应用开发' }],
    ['meta', { name: 'author', content: 'ChunhaoFen' }],
    
    // Open Graph / Facebook
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { property: 'og:site_name', content: 'ChunhaoFen' }],
    ['meta', { property: 'og:title', content: 'ChunhaoFen - Electron 开发者' }],
    ['meta', { property: 'og:description', content: 'Electron 开发者，专注于构建高质量的桌面应用基础设施。展示 electron-infra-kit 及相关开源项目。' }],
    ['meta', { property: 'og:url', content: 'https://chunhaofen.github.io/' }],
    ['meta', { property: 'og:image', content: 'https://chunhaofen.github.io/og-image.png' }],
    
    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'ChunhaoFen - Electron 开发者' }],
    ['meta', { name: 'twitter:description', content: 'Electron 开发者，专注于构建高质量的桌面应用基础设施。' }],
    ['meta', { name: 'twitter:image', content: 'https://chunhaofen.github.io/og-image.png' }],
    
    // 字体加载优化：使用系统字体栈，避免外部字体加载
    ['style', {}, `
      :root {
        --vp-font-family-base: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        --vp-font-family-mono: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
      }
    `]
  ],

  // Markdown 配置
  markdown: {
    lineNumbers: true
  },

  // 启用 sitemap 生成
  sitemap: {
    hostname: 'https://chunhaofen.github.io'
  }
})
