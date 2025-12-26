<template>
  <div class="not-found">
    <div class="not-found-content">
      <h1 class="not-found-title">404</h1>
      <p class="not-found-quote">页面走丢了...</p>
      <p class="not-found-description">
        抱歉，你访问的页面不存在。可能是链接错误或页面已被移除。
      </p>
      <div class="not-found-actions">
        <a href="/" class="btn-home">返回首页</a>
        <a href="/projects/" class="btn-projects">查看项目</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 404 页面组件
</script>

<style scoped>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background: var(--vp-c-bg);
}

.not-found-content {
  text-align: center;
  max-width: 600px;
}

.not-found-title {
  font-size: 6rem;
  font-weight: 700;
  line-height: 1;
  margin: 0;
  background: linear-gradient(120deg, var(--vp-c-brand) 0%, var(--vp-c-brand-dark) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.not-found-quote {
  font-size: 1.5rem;
  margin: 1.5rem 0;
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.not-found-description {
  font-size: 1rem;
  color: var(--vp-c-text-2);
  margin: 1rem 0 2rem;
  line-height: 1.6;
}

.not-found-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-home,
.btn-projects {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-home {
  background: var(--vp-c-brand);
  color: white;
}

.btn-home:hover {
  background: var(--vp-c-brand-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-projects {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.btn-projects:hover {
  background: var(--vp-c-bg-mute);
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .not-found-title {
    font-size: 4rem;
  }

  .not-found-quote {
    font-size: 1.25rem;
  }

  .not-found-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .btn-home,
  .btn-projects {
    width: 100%;
  }
}
</style>
