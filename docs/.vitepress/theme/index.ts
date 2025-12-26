import DefaultTheme from 'vitepress/theme'
import type { App } from 'vue'
import './style.css'
import ProjectCard from './components/ProjectCard.vue'
import ProjectGrid from './components/ProjectGrid.vue'
import Badge from './components/Badge.vue'
import NotFound from './components/NotFound.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component('ProjectCard', ProjectCard)
    app.component('ProjectGrid', ProjectGrid)
    app.component('Badge', Badge)
  },
  // 自定义 404 页面
  NotFound
}
