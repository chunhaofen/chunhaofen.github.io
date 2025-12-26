<template>
  <article class="project-card">
    <div class="project-icon">{{ project.icon }}</div>
    <h3 class="project-title">{{ project.title }}</h3>
    <p class="project-description">{{ project.description }}</p>
    
    <div class="project-tags">
      <span v-for="tag in project.tags" :key="tag" class="tag">
        {{ tag }}
      </span>
    </div>
    
    <div class="project-links">
      <a 
        v-if="project.links.github" 
        :href="project.links.github" 
        class="btn-secondary"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
      <a 
        v-if="project.links.npm" 
        :href="project.links.npm" 
        class="btn-secondary"
        target="_blank"
        rel="noopener noreferrer"
      >
        npm
      </a>
      <a 
        :href="`/projects/${project.id}`" 
        class="btn-primary"
      >
        查看详情
      </a>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Project } from '../../data/projects'

defineProps<{
  project: Project
}>()
</script>

<style scoped>
.project-card {
  padding: 2rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  transition: all 0.3s ease;
  background: var(--vp-c-bg);
}

.project-card:hover {
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
}

.project-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.project-title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.project-description {
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
  line-height: 1.6;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tag {
  padding: 0.25rem 0.75rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.project-links {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.875rem;
  transition: all 0.2s;
  display: inline-block;
}

.btn-primary {
  background: var(--vp-c-brand);
  color: white;
}

.btn-primary:hover {
  background: var(--vp-c-brand-dark);
}

.btn-secondary {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.btn-secondary:hover {
  background: var(--vp-c-bg-mute);
}
</style>
