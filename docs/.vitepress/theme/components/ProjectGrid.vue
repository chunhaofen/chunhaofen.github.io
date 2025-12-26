<template>
  <div class="projects-grid">
    <ProjectCard 
      v-for="project in sortedProjects" 
      :key="project.id" 
      :project="project" 
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ProjectCard from './ProjectCard.vue'
import { projects } from '../../data/projects'

const sortedProjects = computed(() => {
  return [...projects].sort((a, b) => a.order - b.order)
})
</script>

<style scoped>
.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

@media (min-width: 768px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
