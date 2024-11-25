<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Chevron from '@/components/icons/chevron.svg?component'
import type { TreeListItemHTMLAttributes } from '../TreeList/types'

interface Props extends /* @vue-ignore */ TreeListItemHTMLAttributes {
  page: string
  text: string
  toggleExpanded?: () => void
}

defineProps<Props>()
</script>

<template>
  <RouterLink
    :to="{ name: 'page', params: { page } }"
    @click="toggleExpanded"
    class="link"
    :title="text"
  >
    <span class="text">{{ text }}</span>
    <span
      class="expand-indicator"
      v-if="$attrs['aria-expanded'] !== undefined"
      @click.prevent.stop="toggleExpanded"
    >
      <Chevron aria-hidden />
    </span>
  </RouterLink>
</template>

<style scoped>
.link {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  background-color: transparent;
  color: var(--text-color-muted);
  text-decoration: none;
  transition:
    background-color 100ms ease-in,
    color 75ms ease;
  scroll-margin-top: 72px;
  outline: none;
}

.link[aria-current='page'] {
  background-color: var(--background-color-primary);
  color: var(--text-color-primary);
  font-weight: 600;
}

.link:focus-visible {
  outline: 2px solid var(--outline-color);
  outline-offset: -2px;
}

.link:hover:not([aria-current='page']),
.link:active:not([aria-current='page']) {
  color: var(--text-color);
  background-color: var(--background-color-accent-light);
}

.text {
  flex-grow: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.link:has(.expand-indicator) {
  position: relative;
  padding-right: 34px;
}

.expand-indicator {
  display: flex;
  place-items: center;
  flex-shrink: 0;
  position: absolute;
  right: 0;
  inset-block: 0;
  padding: 10px 8px;
  background-color: transparent;
  transition: background-color 100ms ease-in;
}

.link:not([aria-current='page']) .expand-indicator:hover {
  background-color: var(--background-color-accent-dark);
}

.expand-indicator svg {
  width: 16px;
  height: 16px;
  transition: transform 100ms ease-in-out;
}

[aria-expanded='true'] .expand-indicator svg {
  transform: rotate(90deg);
}
</style>
