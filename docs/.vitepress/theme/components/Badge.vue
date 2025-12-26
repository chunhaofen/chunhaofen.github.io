<template>
  <img 
    v-if="!hasError"
    :src="src" 
    :alt="alt" 
    class="badge"
    @error="handleError"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  src: string
  alt: string
}>()

const hasError = ref(false)

const handleError = () => {
  hasError.value = true
}
</script>

<style scoped>
.badge {
  display: inline-block;
  margin: 0.25rem;
  vertical-align: middle;
}
</style>
