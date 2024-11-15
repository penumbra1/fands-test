<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Chevron from '@/components/icons/chevron.svg?component'

defineProps<{ page: string; text: string; expands?: boolean }>()
</script>

<template>
  <RouterLink :to="{ name: 'page', params: { page } }" class="link">
    <span>{{ text }}</span>
    <Chevron v-if="expands" class="expand-indicator" />
  </RouterLink>
</template>

<style scoped>
.link {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  margin-block: 2px;
  background-color: transparent;
  color: var(--text-color-muted);
  text-decoration: none;
  transition:
    background-color 100ms ease-in,
    color 75ms ease;
}

.link[aria-current='page'] {
  background-color: var(--background-color-primary);
  color: var(--text-color-primary);
  font-weight: 600;
}

.link:hover:not([aria-current='page']) {
  color: var(--text-color);
  background-color: var(--background-color-accent);
}

.link > span {
  flex-grow: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.expand-indicator {
  display: block;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  transition: transform 100ms ease-in-out;
}

[aria-expanded='true'] .expand-indicator {
  transform: rotate(90deg);
}
</style>
